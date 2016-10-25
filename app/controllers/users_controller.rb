class UsersController < ApplicationController
  before_action :set_user, :only => :index
  before_filter :wrapper_authenticate_user, only: [:search] unless Rails.env.test?

  attr_accessor :gsa_text

  # GET /users
  # GET /users.json
  #currently unused
  def index
    # The Current User logged in
    Rails.logger.info "@user = #{@user.inspect}"
    @users = []
  end

  def show
    show_user = User.find_by_username(params[:username])
    @userReadAccess  = userReadAccess(show_user)
    if @userReadAccess
      @user = show_user
      @families = Family.find_unexpired_matches_by_org(@user.organization_id)
      @userWriteAccess = userWriteAccess(show_user)
    end
  end

  def update

    roles = {}
    roles["ROLE_ACCOUNT-APPROVER"] = "Account Approver",
    roles["ROLE_RO"] = "Read Only"
    roles["ROLE_SUPER"] = "Super"
    roles["ROLE_ADMIN"] = "Admin"
    roles["ROLE_CURATOR"] = "Curator"
    roles["ROLE_ABSTRACTOR"] = "Abstractor",
    roles["ROLE_TRIAL-SUBMITTER"] = "Trial Submitter"
    roles["ROLE_SITE-SU"] = "Site Administrator"
    roles["ROLE_SERVICE-REST"] = "Service Rest"

    current_user = current_site_user
    @user = User.find(params[:user][:id])
    if current_user.role != 'ROLE_ACCOUNT-APPROVER' &&
        current_user.role != 'ROLE_SITE-SU' &&
        current_user.role != 'ROLE_ADMIN' &&
        current_user.role != 'ROLE_SUPER' &&
        current_user.role != 'ROLE_ABSTRACTOR'
      params[:user][:role] = @user.role
      if params[:user][:user_status_id] != @user.user_status_id && current_user.id == @user.id
        params[:user][:user_status_id] = UserStatus.find_by_code('INR').id
      else
        params[:user][:user_status_id] = @user.user_status_id
      end
    elsif current_user.role != 'ROLE_ADMIN' || current_user.role != 'ROLE_ACCOUNT-APPROVER'
      params[:user][:domain] = current_user.domain
    end

    initalUserRole = @user.role
    initalUserStatusId = @user.user_status_id
    initalUserStatusDate = @user.status_date

    newUser = false
    justRegistered = false
    if params[:user_status_id] != initalUserStatusId
      params[:user][:status_date] = Time.current
      if params[:user_status_id] == UserStatus.find_by_code('ACT').id
        newUser = true
        if initalUserStatusDate == nil
          justRegistered = true
        end
      end
    end

    rejectUpdate = false
    if (!approverAccess(current_user) && newUser) || (!approverAccess(current_user) && (@user.username != user_params[:username]))
      rejectUpdate = true
    elsif (@user.username != user_params[:username]) && approverAccess(current_user)
      @name_change = true
    end

    sendActivationEmail = false
    if params[:send_activation_email] == true
      sendActivationEmail = true
    end

    Rails.logger.info "In Users Controller, update before user = #{@user.inspect}"
    @families = Family.find_unexpired_matches_by_org(@user.organization_id)
    respond_to do |format|
      #must be correct admin for the org, or with correct role or user him/herself
      if userWriteAccess(@user) && @user.update_attributes(user_params) && !rejectUpdate
        if (user_params[:role] == 'ROLE_SITE-SU' &&  initalUserRole != 'ROLE_SITE-SU') || newUser || sendActivationEmail
          if justRegistered && @user.domain == "NIHEXT"
            mail_template = MailTemplate.find_by_code('USER_ACCOUNT_ACTIVATION')
          else
            mail_template = MailTemplate.find_by_code('USER_REGISTRATION_ACTIVATION')
          end

          site_admins_array = (User.family_unexpired_matches_by_org(user_params[:organization_id]).matches('role', 'ROLE_SITE-SU')).pluck(:email)

          if @user.receive_email_notifications && site_admins_array.any?
            mail_template.to.gsub!('${user_email}',    "#{user_params[:email]},#{site_admins_array.join(',')}" )
          elsif @user.receive_email_notifications?
            mail_template.to.gsub!('${user_email}',    "#{user_params[:email]}" )
          elsif site_admins_array.any?
            mail_template.to.gsub!('${user_email}',    "#{site_admins_array.join(',')}" )
          end

          unless mail_template.to.blank?
            mail_template.body_html.gsub!('${user_name}',      "#{user_params[:first_name]} #{user_params[:last_name]}")
            mail_template.body_html.gsub!('${user_username}',  user_params[:username])
            mail_template.body_html.gsub!('${user_role}',  roles[user_params[:role]])
            mail_template.to.gsub!('${user_email}',    "#{user_params[:email]},#{(User.family_unexpired_matches_by_org(user_params[:organization_id]).matches('role', 'ROLE_SITE-SU')).pluck(:email).join(',')}" )
            mail_template.body_html.gsub!('${user_phone}',     "#{(user_params[:phone] ? user_params[:phone] : '')} #{(user_params[:phone_ext] ? ' ext ' + user_params[:phone_ext] : '')}" )
            mail_template.body_html.gsub!('${user_org}',       (user_params[:organization_id] ? Organization.find(user_params[:organization_id]).name : '') )
            mail_template.body_html.gsub!('${date}',           (Time.now).strftime('%v') )

            CtrpMailerWrapper.send_email(mail_template, nil)
          end

        end

        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render json: @user}
      else
        @user.errors.add('error', 'Not authorized to make changes.')
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end

    Rails.logger.info "In Users Controller, update after user = #{@user.inspect}"
  end

  def request_admin_access
    begin
      mail_template = MailTemplate.find_by_code('USER_ADMIN_REQUEST')

      mail_template.body_html.sub!('${username}', params[:username])

      CtrpMailer.general_email(mail_template.from, mail_template.to, mail_template.cc, mail_template.bcc, mail_template.subject, mail_template.body_text, mail_template.body_html).deliver_now

      @success = [true]
    rescue  Exception => e
      logger.warn "USER ADMIN REQUEST: Email delivery error = #{e}"
      @success = [false]
    end
  end

  def gsa

    yml_content = YAML.load_file(Rails.root.join('config', 'locales').to_s + '/en.yml')
    #Rails.logger.debug "yml_content = #{yml_content.inspect}"
    # It is critical to make sure that we dont loose the current_user when going through
    # the GSA Acceptance
    user = nil
    if @current_user.nil?
      @current_user = get_user
    end
    user = @current_user

    auth_string = request.headers['Authorization']
    if !auth_string.blank?
      Rails.logger.debug "UserController, GSA, auth_string = #{auth_string.inspect}"
      token = auth_string.split(" ")[1]
      Rails.logger.debug "UserController, GSA, auth_string = #{token.inspect}"
      user_id = decode_token(token)
      Rails.logger.debug "UserController, GSA, user_id = #{user_id.inspect}"
      user = User.find(user_id)
      @current_user = user
      Rails.logger.debug "UserController, GSA, user = #{user.username.inspect}" unless user.nil?
    end

    Rails.logger.debug "IN GSA @current_user = #{@current_user}"

    unless user.nil?
      authenticate_user(user)

      nih_user_gsa_msg = AppSetting.find_by_code('NIH_GSA_MSG') ? AppSetting.find_by_code('NIH_GSA_MSG')["big_value"] : ''
      non_nih_user_gsa_msg = AppSetting.find_by_code('NON_NIH_GSA_MSG') ? AppSetting.find_by_code('NON_NIH_GSA_MSG')["big_value"] : ''

      if user.is_a?(LocalUser)
        gsa_text = non_nih_user_gsa_msg
      elsif user.is_a?(LdapUser)
        gsa_text = nih_user_gsa_msg
      else
        gsa_text = non_nih_user_gsa_msg
      end
    else
      gsa_text = non_nih_user_gsa_msg
    end

    render :status => 200, :json => { :success => true, :gsa => "#{gsa_text}", :info => "GSA Msg"}

end


  def search
    access = searchAccess
    if access
      Rails.logger.info "In User controller params = #{params.inspect}"
      # Pagination/sorting params initialization
      params[:start] = 1 if params[:start].blank?
      sortBy = params[:sort]
      if sortBy == 'user_org_name'
        sortBy = 'user_org.name'
      end

      if params[:trial_id].present? && !params[:trial_id].nil?
        @users = User.matches_join().users_own_trial(params[:trial_id])
      else
        @users = User.matches_join()
      end

      if (abstractionAccess current_user)
        if params[:family_id].present?
            @users = @users.family_unexpired_matches_by_family(params[:family_id]) unless @users.blank?
        elsif params[:organization_id].present?
            @users = @users.matches('organization_id', params[:organization_id]) unless @users.blank?
        end
      end

      if ['ROLE_SITE-SU'].include? current_user.role
        any_membership = FamilyMembership.find_by_organization_id(current_user.organization_id)
        @families = Family.find_unexpired_matches_by_org(current_user.organization_id)
        @users = @users.where(role: ['ROLE_TRIAL-SUBMITTER','ROLE_SITE-SU']).matches_all_registered()
        if any_membership
            @users = @users.family_unexpired_matches_by_org(current_user.organization_id) unless @users.blank?
        else
            @users = @users.matches('organization_id', current_user.organization_id) unless @users.blank?
        end
      elsif !(['ROLE_ADMIN','ROLE_SUPER','ROLE_ADMIN','ROLE_ABSTRACTOR','ROLE_ABSTRACTOR-SU','ROLE_ACCOUNT-APPROVER'].include? current_user.role) || params[:registered_users] == true
          @users = @users.matches_all_registered()
          @users = @users.matches_all_active()
      end

      if current_user.role != 'ROLE_SUPER' && current_user.role != 'ROLE_ADMIN' && current_user.role != 'ROLE_ABSTRACTOR' && current_user.role != 'ROLE_ABSTRACTOR-SU' && current_user.role != 'ROLE_ACCOUNT-APPROVER'
        @users = @users.matches_wc('user_statuses', [UserStatus.find_by_code('ACT').id, UserStatus.find_by_code('INR').id]) unless @users.blank?
      end

      @searchType = current_user.role

      @users = @users.matches_wc('username', params[:username]) if params[:username].present? unless @users.blank?
      @users = @users.matches_wc('first_name', params[:first_name]) if params[:first_name].present? unless @users.blank?
      @users = @users.matches_wc('last_name', params[:last_name]) if params[:last_name].present? unless @users.blank?
      @users = @users.matches_wc('email', params[:email]) if params[:email].present? unless @users.blank?
      @users = @users.matches_wc('site_admin', params[:site_admin])  if !params[:site_admin].nil? unless @users.blank?
      @users = @users.matches_wc('user_status_id', params[:user_status_id]) if params[:user_status_id].present? unless @users.blank?
      @users = @users.matches_wc('user_org_name', params[:user_org_name])  if params[:user_org_name].present? unless @users.blank?
      @users = @users.matches_wc('organization_family', params[:organization_family])  if params[:organization_family].present? unless @users.blank?
      @users = @users.matches_wc('organization_id', params[:organization_id])  if params[:organization_id].present? unless @users.blank?

      if sortBy != 'admin_role' && sortBy != 'organization_family'
        @users = @users.order(sortBy ? "#{sortBy} #{params[:order]}" : "last_name ASC, first_name ASC") unless @users.blank?
      elsif sortBy == 'admin_role'
        temp0 = []
        temp1 = []
        @users.each do |user|
          if user.role == 'ROLE_SITE-SU'
            temp0.push(user)
          else
            temp1.push(user)
          end
        end
        if params[:order].upcase == 'DESC'
          @users = (temp0 + temp1)
        else
          @users = (temp1 + temp0)
        end
      end

      @users = remove_repeated(@users, sortBy, params[:order])

      unless params[:rows].nil?
        @users = Kaminari.paginate_array(@users).page(params[:start]).per(params[:rows]) unless @users.blank?
      end
      Rails.logger.info "In User controller, search @users = #{@users.inspect}"
    end
    @userSearchAccess = access
  end

  private

  def remove_repeated(array, sortBy, order)
    found = Hash.new(0)
    uniqueArr = []
    array.each{ |val|
      if found[val.id] == 0
        org_family_name = ''
        if val.organization_id.present?
           families = Family.find_unexpired_matches_by_org(val.organization_id)
           if families
             families.each{|family| org_family_name += family.name + ', '}
             org_family_name = org_family_name.chomp(", ")
           end
        end
        val.organization_family = org_family_name
        uniqueArr.push(val)
        found[val.id] = 1
      end
    }

    if order && sortBy == 'organization_family'
      if  order.downcase == "asc"
        uniqueArr = uniqueArr.sort_by { |hsh| hsh.organization_family }
      elsif order.downcase == "desc"
        uniqueArr = uniqueArr.sort_by { |hsh| hsh.organization_family }.reverse
      end
    end

    uniqueArr
  end

  def isSiteAdminForOrg user, orgId
      family = FamilyMembership.find_by_organization_id(orgId)
      if family
        org_users = User.family_unexpired_matches_by_org(orgId)
      else
        org_users = User.matches('organization_id', orgId)
      end
      user_found = org_users.find_by_id user.id
      user_found && user_found.role == "ROLE_SITE-SU"
  end

  def current_site_user
    auth_string = request.headers['Authorization']
    if !auth_string.blank?
      token = auth_string.split(" ")[1]
      user_id = decode_token(token)
      user = User.find(user_id)
    end
    user
  end

  def userReadAccess userToUpdate
    if current_site_user
      user = current_site_user
    end
    user && userToUpdate ? (user.role == 'ROLE_RO' || (userToUpdate && user.id == userToUpdate.id) || (userWriteAccess userToUpdate) ) : false
  end


  def approverAccess user
    ['ROLE_ADMIN','ROLE_ACCOUNT-APPROVER'].include? user.role
  end

  def abstractionAccess user
    ['ROLE_ADMIN','ROLE_ACCOUNT-APPROVER','ROLE_SUPER','ROLE_ABSTRACTOR'].include? user.role
  end

  def userWriteAccess userToUpdate
    if current_site_user
      user = current_site_user
    end
    user && userToUpdate ?
        ( ( (abstractionAccess user) || (userToUpdate && user.id == userToUpdate.id) ||
        (userToUpdate && userToUpdate.organization_id && (isSiteAdminForOrg user, userToUpdate.organization_id)) ) &&
            ( !(!(abstractionAccess user) && (abstractionAccess userToUpdate))) ) : false
  end

  def searchAccess
    if current_site_user
      user = current_site_user
    end
    user ?
        ( user.role == 'ROLE_RO' || (abstractionAccess user) || (isSiteAdminForOrg user, user.organization_id) ) : false
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    unless params.nil? || params[:id].nil? || params[:username].nil?
      @user = User.find(params[:id]) || User.find(params[:username])
    else
      @user = current_user || current_local_user || current_ldap_user || current_omniauth_user
    end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:username, :email, :zipcode, :first_name, :last_name,
                                 :middle_name, :receive_email_notifications,  :updated_at, :created_at, :role,
                                 :street_address, :organization_id, :user_org_name, :country, :state, :prs_organization_name, :city,
                                 :phone, :phone_ext, :user_status_id, :status_date)
  end
end
