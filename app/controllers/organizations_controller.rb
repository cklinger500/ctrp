class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]
  ## Please comment the next two lines if you donot want the Authorization checks
  before_filter :wrapper_authenticate_user, :except => [:search, :select] unless Rails.env.test?
  before_action :set_paper_trail_whodunnit, only: [:create,:update, :destroy, :curate]

  respond_to :html, :json


  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = Organization.all_orgs_data()
  end

  # GET /organizations/1
  # GET /organizations/1.json
  def show
  end

  # GET /organizations/new
  def new
    @organization = Organization.new
  end

  # GET /organizations/1/edit
  def edit
  end

  # POST /organizations
  # POST /organizations.json
  def create
    @organization = Organization.new(organization_params)
    @organization.created_by = @current_user.username unless @current_user.nil?
    @organization.updated_by = @organization.created_by
    @organization.created_at = Time.zone.now
    @organization.updated_at = Time.zone.now

    respond_to do |format|
      if @organization.save
        format.html { redirect_to @organization, notice: 'Organization was successfully created.' }
        format.json { render :show, status: :created, location: @organization }
      else

        format.html { render :new }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update
    @organization.updated_by = @current_user.username unless @current_user.nil?

    if organization_params[:new_ctep_org_id] then
      @ctepchange = updateOlderContextAssociation "CTEP", organization_params[:ctrp_id], organization_params[:new_ctep_org_id]
    end
    if organization_params[:new_nlm_org_id] then
      @nlmchange = updateOlderContextAssociation "NLM", organization_params[:ctrp_id], organization_params[:new_nlm_org_id]
    end

    respond_to do |format|
      if @organization.update(organization_params.except(:new_ctep_org_id, :new_nlm_org_id))
        format.html { redirect_to @organization, notice: 'Organization was successfully updated.' }
        format.json { render :show, status: :ok, location: @organization }
      else
        format.html { render :edit }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /organizations/1
  # DELETE /organizations/1.json
  def destroy
    respond_to do |format|
      if @organization.destroy
        format.html { redirect_to organizations_url, notice: 'Organization was successfully destroyed.' }
        format.json { head :no_content }
      else
        format.html { redirect_to people_url, alert: @person.errors }
        format.json { render json: @organization.errors, status: :unprocessable_entity  }
      end
    end
  end



  def curate

    respond_to do |format|
      if Organization.nullify_duplicates(params)
        format.html { redirect_to organizations_url, notice: 'Organization was successfully curated.' }
      else
        format.json { render json: @organization.errors, status: :unprocessable_entity  }
      end

    end

  end

  def select

    Rails.logger.debug "In Organization Controller, select"
    Rails.logger.debug "In Organization Controller, params = #{params.select}"

    if local_user_signed_in?
      user = current_local_user
      Rails.logger.debug "In Organization Controller, current_local_user = #{current_local_user.inspect}"
    elsif ldap_user_signed_in?
      user = current_ldap_user
      Rails.logger.debug "In Organization Controller, current_ldap_user = #{current_ldap_user.inspect}"
    end
    if !params.blank? && !params["selected_org_id"].blank?
      org_id = params["selected_org_id"]
      old_org_id = user.organization_id
      if org_id == "0"
        user.organization_id = nil
      else
        user.organization_id = org_id
        # When a User changes his organization, he must be reapproved
        if !old_org_id.nil?
          user.user_status_id = UserStatus.find_by_code('INR').id
        end
      end
      user.save!
    end
    respond_to do |format|
        format.html { redirect_to users_path }
    end

  end

  def search
    # Pagination/sorting params initialization
    Rails.logger.info "In Organization Controller, search"
    params[:start] = 1 if params[:start].blank?
    if params[:allrows] != true
      params[:rows] = 20 if params[:rows].blank?
    else
      params[:rows] = nil
    end
    params[:sort] = 'name' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?
    # Param alias is boolean, use has_key? instead of blank? to avoid false positive when the value of alias is false
    params[:alias] = true if !params.has_key?(:alias)

    if parse_request_header
      wrapper_authenticate_user
    end
    @organizations = []
    org_keys = %w[ name source_context source_id source_status family_name address address2 city
                    state_province country postal_code email phone updated_by date_range_arr]
    # Scope chaining, reuse the scope definition
    if (params.keys & org_keys).any?

      # get complete resultset
      @organizations = filterSearch Organization.all_orgs_data()

      # order
      sortBy = params[:sort]
      if ['source_context', 'source_status'].include? sortBy
        sortBy  += "_name"
      end
      @organizations = @organizations.order("#{sortBy} #{params[:order]}")

      # get total: faster here than in jbuilder (jbuilder counts array; here we use SQL COUNT(*) - faster)
      @total = @organizations.size

      # finally paginate
      unless params[:rows].nil?
        @organizations = Kaminari.paginate_array(@organizations).page(params[:start]).per(params[:rows]) unless @organizations.blank?
      end

    end
  end

  def filterSearch resultOrgs
    if @current_user && User.org_write_access(@current_user)
      resultOrgs = resultOrgs.where("source_contexts.name" => params[:source_contextfilter]) if params[:source_contextfilter].present? && !resultOrgs.blank?
      resultOrgs = resultOrgs.matches("source_statuses.name", params[:source_status]) if params[:source_status].present? && !resultOrgs.blank?
      resultOrgs = resultOrgs.matches("source_contexts.name", params[:source_context]) if params[:source_context].present? && !resultOrgs.blank?
    else # TODO need constant for Active
      resultOrgs = resultOrgs.matches("source_statuses.name", "Active") if !resultOrgs.blank?
      resultOrgs = resultOrgs.matches("source_contexts.name", "CTRP") if !resultOrgs.blank?
    end

    resultOrgs = resultOrgs.match_source_id_from_joins(params[:source_id]) if params[:source_id].present? && !resultOrgs.blank?
    resultOrgs = resultOrgs.match_name_from_joins(params[:name], params[:alias], params[:wc_search]) if params[:name].present? && !resultOrgs.blank?

    resultOrgs = resultOrgs.updated_date_range(params[:date_range_arr]) if params[:date_range_arr].present? and params[:date_range_arr].count == 2 && !resultOrgs.blank?
    resultOrgs = resultOrgs.with_family(params[:family_name]) if params[:family_name].present? && !resultOrgs.blank? && params[:family_name] != '*'
    resultOrgs = resultOrgs.where("unexpired_family_membership.family_name" => nil) if params[:no_family].present? && !resultOrgs.blank?

    resultOrgs = resultOrgs.with_service_request(params[:service_request]) if params[:service_request].present? && !resultOrgs.blank?

    matches_to_look_for = 'country,processing_status'.split(",")
    matches_to_look_for.each do |filter|
      resultOrgs = resultOrgs.matches(filter, params[filter]) if params[filter].present? && !resultOrgs.blank?
    end

    wc_matches_to_look_for = 'address,address2,updated_by,city,state_province,postal_code,email,phone'.split(",")
    wc_matches_to_look_for.each do |filter|
      resultOrgs = resultOrgs.matches_wc(filter, params[filter], params[:wc_search]) if params[filter].present? && !resultOrgs.blank? && params[filter] != '*'
    end
    return resultOrgs
  end

  def clone
    @organizations = Organization.new(Organization.find(params[:org_id]).attributes)
    @organizations.id = nil
    @organizations.save
  end

  def countOrgsWithSameName
    count = 0
    #Get count of organization record with the same name - can be the existing record (if the user is on the edit screen)
    if params.has_key?(:org_name) && params.has_key?(:source_context_id)
      count = Organization.where("lower(name)=?", params[:org_name].downcase).where("source_context_id=?", params[:source_context_id]).count;
    end
    return count
  end

  #Method to check for Uniqueness while creating organizations - check on name & source context. These are to be presented as warnings and not errors, hence cannot be part of before-save callback.
  def unique
    count = countOrgsWithSameName
    is_unique = true

    if params[:org_exists] == true
      @dbOrg = Organization.find(params[:org_id])
      #if on the Edit screen, then check for name changes and ignore if database & screen names are the same.
      #if params[:org_name] == @dbOrg.name, both are equal. Must not warn
      #However if on the edit screen and the user types in a name that is the same as another org, then complain, both are different. Must warn.
      if !@dbOrg.nil? && !(params[:org_name] == @dbOrg.name || count == 0)
        is_unique = false
      end
    elsif params[:org_exists] == false && count > 0
      is_unique = false
    end

    respond_to do |format|
      format.json {render :json => {:name_unique => is_unique}}
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_organization
    @organization = Organization.find(params[:id])
  end

  def updateOlderContextAssociation context_val, ctrp_id_val, new_context_org_id
    old_orgs = Organization.where({:ctrp_id => ctrp_id_val, :source_context_id => SourceContext.find_by_code(context_val).id})
                   .where('id NOT IN (?)', [ctrp_id_val, new_context_org_id])
    old_orgs.update_all(ctrp_id: nil) if !old_orgs.blank?
    new_org = Organization.where('id = ?', new_context_org_id)
    if new_org[0].ctrp_id != ctrp_id_val
      new_org.update_all(ctrp_id: ctrp_id_val) if !new_org.blank?
    else
      new_org = []
    end
    return (old_orgs.size + new_org.size) > 0
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def organization_params
    params.require(:organization).permit(:source_id, :name, :address, :address2, :address3, :city, :state_province, :postal_code,
                                         :country, :email, :phone, :extension, :source_status_id, :ctrp_id,
                                         :source_context_id, :lock_version, :processing_status, :new_ctep_org_id, :new_nlm_org_id,
                                         name_aliases_attributes: [:id,:organization_id,:name,:_destroy])
  end
end
