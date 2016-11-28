#
# rubocop:disable ClassLength
#

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
    @user = User.find(params[:user][:id])
    if !(['ROLE_ACCOUNT-APPROVER', 'ROLE_SITE-SU', 'ROLE_ADMIN', 'ROLE_SUPER', 'ROLE_ABSTRACTOR'].include? current_site_user.role)
      params[:user][:role] = @user.role
      params[:user][:user_status_id] = (params[:user][:user_status_id] != @user.user_status_id && current_site_user.id == @user.id) ? UserStatus.find_by_code('INR').id :  @user.user_status_id
    elsif current_site_user.role != 'ROLE_ADMIN' || current_site_user.role != 'ROLE_ACCOUNT-APPROVER'
      params[:user][:domain] = current_site_user.domain
    end
    setUserInOrgStatus  # set @newUser and @justRegistered values
    rejectUpdate = false
    if (!approverAccess(current_site_user) && @newUser) || (!approverAccess(current_site_user) && (@user.username != user_params[:username]))
      rejectUpdate = true
    elsif (@user.username != user_params[:username]) && approverAccess(current_site_user)
      @name_change = true
    end
    respond_to do |format|
      if userWriteAccess(@user) && @user.update_attributes(user_params) && !rejectUpdate
        if ((user_params[:role] == 'ROLE_SITE-SU' &&  @user.role != 'ROLE_SITE-SU') || @newUser)
          send_activation_email
        end
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render json: @user}
      else
        @user.errors.add('error', 'Not authorized to make changes.')
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def gsa
    if @current_user.nil?
      @current_user = get_user
    end
    user = @current_user
    auth_string = request.headers['Authorization']
    if !auth_string.blank?
      token = auth_string.split(" ")[1]
      user_id = decode_token(token)
      user = User.find(user_id)
      @current_user = user
    end
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
    @userSearchAccess = searchAccess
    if @userSearchAccess
      params[:start] = 1 if params[:start].blank? # Pagination/sorting params initialization
      sortBy = params[:sort] && params[:sort] == 'user_org_name' ? 'user_org.name' : params[:sort]
      @users = (params[:trial_id].present? && !params[:trial_id].nil?) ? User.matches_join().users_own_trial(params[:trial_id]) : @users = User.matches_join()
      if (abstractionAccess current_user)
        get_by_family
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
      filter_by_params sortBy
      unless params[:rows].nil?
        @users = Kaminari.paginate_array(@users).page(params[:start]).per(params[:rows]) unless @users.blank?
      end
    end
  end

  private

  def get_by_family
    if params[:family_id].present?
      @users = @users.family_unexpired_matches_by_family(params[:family_id]) unless @users.blank?
    elsif params[:organization_id].present?
      @users = @users.matches('organization_id', params[:organization_id]) unless @users.blank?
    end
  end

  def filter_by_params sortBy
    wc_matches_to_accept = 'username,first_name,last_name,email,user_org_name,organization_family'
    wc_matches_to_accept.split(",").each do |filter|
      @users = @users.matches_wc(filter, params[filter].gsub(/\\/,'\&\&')) if params[filter].present? && params[filter] != '*'
    end
    @users = @users.matches_wc('site_admin', params[:site_admin])  if !params[:site_admin].nil? unless @users.blank?
    @users = @users.matches_wc('user_status_id', params[:user_status_id])  if !params[:user_status_id].nil? unless @users.blank?
    @users = @users.matches_wc('organization_id', params[:organization_id])  if !params[:organization_id].nil? unless @users.blank?
    if sortBy != 'admin_role' && sortBy != 'organization_family'
      @users = @users.order(sortBy ? "#{sortBy} #{params[:order]}" : "last_name ASC, first_name ASC") unless @users.blank?
    elsif sortBy == 'admin_role'
      admin_role_sort
    end
    @users = remove_repeated(@users, sortBy, params[:order])
  end

  def admin_role_sort
    temp0 = []
    temp1 = []
    @users.each do |user|
      if user.role == 'ROLE_SITE-SU'
        temp0.push(user)
      else
        temp1.push(user)
      end
    end
    @users = params[:order].upcase == 'DESC' ? temp0 + temp1 : temp1 + temp0
  end

  def setUserInOrgStatus
    @newUser = false
    @justRegistered = false
    systemStatusPending = (Family.find_unexpired_matches_by_org(@user.organization_id) & Family.find_unexpired_matches_by_org(params[:user][:organization_id])).length == 0
    if systemStatusPending
      params[:user_status_id] = UserStatus.find_by_code('INR').id
    end
    if (params[:user_status_id] != @user.user_status_id)
      params[:user][:status_date] = Time.current
      if params[:user_status_id] == UserStatus.find_by_code('ACT').id
        @newUser = true
        @justRegistered = (@user.status_date == nil) ? true : false
      end
    end
  end

  def send_activation_email
    mail_template = (@justRegistered && @user.domain == "NIHEXT") ? MailTemplate.find_by_code('USER_ACCOUNT_ACTIVATION') : MailTemplate.find_by_code('USER_REGISTRATION_ACTIVATION')
    site_admins_array = (User.family_unexpired_matches_by_org(user_params[:organization_id]).matches('role', 'ROLE_SITE-SU')).pluck(:email)
    if @user.receive_email_notifications && site_admins_array.any?
      mail_template.to.gsub!('${user_email}',    "#{user_params[:email]},#{site_admins_array.join(',')}" )
    elsif @user.receive_email_notifications?
      mail_template.to.gsub!('${user_email}',    "#{user_params[:email]}" )
    elsif site_admins_array.any?
      mail_template.to.gsub!('${user_email}',    "#{site_admins_array.join(',')}" )
    end
    unless mail_template.to.blank?
      mail_template.body_html.gsub!('${user_name}',       "#{user_params[:first_name]} #{user_params[:last_name]}")
      mail_template.body_html.gsub!('${user_username}',   user_params[:username])
      mail_template.body_html.gsub!('${user_role}',       (current_ctrp_user_role_details user_params[:role])['name'])
      mail_template.to.gsub!('${user_email}',             "#{user_params[:email]},#{(User.family_unexpired_matches_by_org(user_params[:organization_id]).matches('role', 'ROLE_SITE-SU')).pluck(:email).join(',')}" )
      mail_template.body_html.gsub!('${user_phone}',      "#{(user_params[:phone] ? user_params[:phone] : '')} #{(user_params[:phone_ext] ? ' ext ' + user_params[:phone_ext] : '')}" )
      mail_template.body_html.gsub!('${user_org}',        (user_params[:organization_id] ? Organization.find(user_params[:organization_id]).name : '') )
      mail_template.body_html.gsub!('${date}',            (Time.now).strftime('%v') )
      CtrpMailerWrapper.send_email(mail_template, nil)
    end
  end

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
    current_site_user && userToUpdate ?
        (current_site_user.role == 'ROLE_RO' ||
            (userToUpdate && current_site_user.id == userToUpdate.id) || (userWriteAccess userToUpdate) ) : false
  end


  def approverAccess user
    ['ROLE_ADMIN','ROLE_ACCOUNT-APPROVER'].include? user.role
  end

  def abstractionAccess user
    ['ROLE_ADMIN','ROLE_ACCOUNT-APPROVER','ROLE_SUPER','ROLE_ABSTRACTOR'].include? user.role
  end

  def userWriteAccess userToUpdate
    current_site_user && userToUpdate ?
        ( ( (abstractionAccess current_site_user) || (userToUpdate && current_site_user.id == userToUpdate.id) ||
        (userToUpdate && userToUpdate.organization_id && (userToUpdate.user_status_id == UserStatus.find_by_code('ACT').id || userToUpdate.user_status_id == UserStatus.find_by_code('INR').id) &&
            (isSiteAdminForOrg current_site_user, userToUpdate.organization_id)) ) &&
            ( !(!(abstractionAccess current_site_user) && (abstractionAccess userToUpdate))) ) : false
  end

  def searchAccess
    current_site_user ?
        ( current_site_user.role == 'ROLE_RO' || (abstractionAccess current_site_user) || (isSiteAdminForOrg current_site_user, current_site_user.organization_id) ) : false
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
