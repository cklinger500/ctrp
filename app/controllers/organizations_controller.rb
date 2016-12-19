#
# rubocop:disable ClassLength

class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]
  ## Please comment the next two lines if you donot want the Authorization checks
  before_filter :wrapper_authenticate_user, :except => [:search, :select, :index] unless Rails.env.test?
  before_action :set_glob_vars, only: [:create, :edit, :dis_associate, :update, :destroy, :clone]
  before_action :set_paper_trail_whodunnit, only: [:create,:update, :destroy, :curate, :clone, :dis_associate]

  respond_to :html, :json


  swagger_controller :organizations, "Organizations"

  swagger_api :index do
    summary "Fetches all Organization items"
    notes "This lists all organizations"
    response :unauthorized
    response :not_acceptable
    response :requested_range_not_satisfiable
  end

  swagger_api :show do
    summary "Fetches Organization by id"
    notes "This gets an organization by id"
    param :path, :id, :integer, :required, "Organization Id"
    #param :header, 'Authorization', :string, :required, 'Authentication token'
    response :unauthorized
    response :not_acceptable
    response :requested_range_not_satisfiable
  end

  # GET /organizations
  # GET /organizations.json
  def index
    @organizations =  Organization.all
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
    return if !@write_access
  end

  # POST /organizations
  # POST /organizations.json
  def create
    return if !@write_access
    @organization = Organization.new(organization_params)
    @organization.source_status_id = SourceStatus.ctrp_context_source_statuses.find_by_code('ACT').id
    @organization.source_context_id = SourceContext.find_by_code('CTRP').id
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
    return if !@write_access
    @organization.updated_by = @current_user.username unless @current_user.nil?
    if isAssociatedOrgUpdate
      saveAndRenderAssociatedOrgs
    elsif @organization.source_context_id == @ctrpId || @organization.source_context_id == @ctepId
      saveAndRenderUpdatedOrg
    end
  end

  # DELETE /organizations/1
  # DELETE /organizations/1.json
  def destroy
    return if !@write_access
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

  def nullifiable
    nullifiable = false
    nullifiable_org = Organization.find_by_id(params[:id])
    if !nullifiable_org.blank?
      nullifiable = nullifiable_org.nullifiable
    end
    respond_to do |format|
      format.json {render :json => {:nullifiable => nullifiable}}
    end
  end

  def curate

    respond_to do |format|
      if Organization.nullify_duplicates(params)
        format.json { render :json => {:nullify_success => true}}
        format.html { render :json => {:nullify_success => true}}
      else
        format.json { render json: @organization.errors, status: :unprocessable_entity  }
      end

    end

  end


  def dis_associate
    @associated_orgs = []
    return if !@write_access
    active_org = Organization.find_by_id(params[:id])
    if params[:remove_ids] && params[:ctrp_id]
      params[:remove_ids].each do |org|
        contextOrg = Organization.find_by_id(org[:id])
        dissassociated_org = disAssociateTwoOrgs params[:ctrp_id], contextOrg
        dissassociated_org.validations_to_skip = ["address","city"]
        dissassociated_org.save
      end
      @associated_orgs = filterSearch Organization.all_orgs_data().where(:ctrp_id => active_org.ctrp_id), params
      @active_context = 'CTRP'
    end
    respond_to do |format|
      format.json { render :associated }
    end
  end

  def associated
      @associated_orgs = []
      active_org = (filter_by_role Organization.all_orgs_data().where(:id => params[:id]), params)[0]
      if associatedOrgAccessByAdmin active_org
        @associated_orgs = filterSearch Organization.all_orgs_data().where(:ctrp_id => active_org.ctrp_id), params
        @active_context = active_org.source_context_name
      elsif associatedOrgSingleAccess active_org, params
        @associated_orgs.push(active_org)
        @active_context = active_org.source_context_name unless @associated_orgs.blank?
      end
      @ctep_with_associable_ctrps = ctepGetAssociableCTRPs @associated_orgs unless @associated_orgs.blank?
      @write_access = User.org_write_access(@current_user)
      @read_all_access = User.org_read_all_access(@current_user)
  end

  def ctepGetAssociableCTRPs associated_orgs
    ctep_org = associated_orgs.select { |org| org.source_context_code == 'CTEP' }[0]

    #<Organization id: 9990007, source_id: "9999995", name: "CTEP ORG For Testing 3", address: "9607 Medical Center Dr", address2: nil, city: "Frederick", state_province: "Maryland", postal_code: "20850", country: "United States", email: "ncictrpdev@mail.nih.gov", phone: "240-276-0000", source_status_id: 5, source_context_id: 1, created_at: "2016-11-09 16:34:40", updated_at: "2016-11-09 21:14:15", uuid: "b91983f4-8ae8-44d0-97cb-06d381b28ba5", lock_version: 4, ctrp_id: 2118412, created_by: nil, updated_by: "ctrpadmin", extension: nil, processing_status: "Complete", address3: nil, service_request_id: 4, ctep_org_type_id: 1, org_funding_mechanism_id: nil, association_date: "2016-11-09 21:09:42">]

    if !ctep_org.blank?
      #associable qualifiers
      associableQualifiers = {
          wc_search: true,
          name:                 ctep_org[:name],
          state_province:       ctep_org[:state_province],
          city:                 ctep_org[:city],
          country:              ctep_org[:country]
      }
      @associable = (searchOrgs associableQualifiers)
                        .matches("source_statuses.code", "ACT")
                        .matches("source_contexts.code", "CTRP")
                        .distinct
                        .size
    end
  end

  def search
    if parse_request_header
      wrapper_authenticate_user
    end

    processParams

    @organizations = []

    org_keys = %w[ name source_context source_id source_status family_name address address2 city
                    ctrp_id state_province country postal_code email phone updated_by date_range_arr]
    if (params.keys & org_keys).any?
      getSearchResults getSortBy, params
    end
    @read_all_access = User.org_read_all_access(@current_user)
    @write_access = User.org_write_access(@current_user)
  end

  def clone
    return if !@write_access
    ctepOrg = Organization.find_by_id(params[:org_id])
    ctepOrg.processing_status = 'Complete'
    ctepOrg.updated_by = @current_user.username unless @current_user.nil?
    ctepOrg.updated_at = Time.zone.now
    @organization = Organization.new(ctepOrg.attributes)
    @organization.id                = nil
    @organization.processing_status = 'Complete'
    @organization.source_context_id = SourceContext.find_by_code("CTRP").id
    @organization.source_status_id = SourceStatus.where(:source_context_id => @organization.source_context_id, :code => 'ACT')[0].id
    @organization.created_by = current_user.username unless @current_user.nil?
    @organization.created_at = Time.zone.now
    @organization.updated_by = @organization.created_by
    @organization.updated_at = @organization.created_at
    @rc_tp = true
    respond_to do |format|
      if @organization.save
        ctepOrg = associateTwoOrgs @organization.ctrp_id, ctepOrg
        ctepOrg.save
        @associated_orgs = filterSearch Organization.all_orgs_data().where(:ctrp_id => @organization.ctrp_id), params
        @active_context = 'CTRP'
        format.json { render :associated }
      else
        format.html { render :edit }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  #Method to check for Uniqueness while creating organizations - check on name & source context. These are to be presented as warnings and not errors, hence cannot be part of before-save callback.
  def unique
    is_unique = true
    if params[:org_exists] == true && params[:org_name] && params[:org_id]

      #edit
      #if on the Edit screen, then check for name changes and ignore if database & screen names are the same.
      #if params[:org_name] == @dbOrg.name, both are equal. Must not warn
      #However if on the edit screen and the user types in a name that is the same as another org, then complain, both are different. Must warn.
      is_unique = Organization.where("id <> #{params[:org_id]} AND name = '#{params[:org_name]}'").blank?
    elsif params[:org_exists] == true && params[:org_name]

      #new
      is_unique = Organization.find_by_name(params[:org_name]).blank?
    end

    respond_to do |format|
      format.json {render :json => {:name_unique => is_unique}}
    end
  end

  private

  def getSearchResults sortBy, searchParams
    @organizations = searchOrgs searchParams
    @organizations = @organizations.order("#{sortBy} #{searchParams[:order]}")
    @total = @organizations.distinct.size # get total: faster here than in jbuilder (jbuilder counts array; here we use SQL COUNT(*) - faster)
    unless params[:rows].nil? || @organizations.blank? # finally paginate
      @organizations = Kaminari.paginate_array(@organizations).page(searchParams[:start]).per(searchParams[:rows])
    end
  end

  def searchOrgs searchParams
    return filterSearch Organization.all_orgs_data(), searchParams # get complete resultset
  end

  def get_match resultOrgs, searchParams
    matches_to_accept = 'country,processing_status'
    matches_to_accept.split(",").each do |filter|
      resultOrgs = resultOrgs.matches(filter, searchParams[filter].gsub(/\\/,'\&\&') ) if searchParams[filter].present?
    end
    resultOrgs = resultOrgs.matches('ctrp_id', searchParams[:ctrp_id]) if searchParams[:ctrp_id].present?
    return resultOrgs
  end

  def get_match_wc resultOrgs, searchParams
    wc_matches_to_accept = 'address,address2,updated_by,city,state_province,postal_code,email,phone'
    wc_matches_to_accept.split(",").each do |filter|
      resultOrgs = matches_wc(resultOrgs, filter, searchParams[filter].gsub(/\\/,'\&\&'), searchParams[:wc_search]) if searchParams[filter].present? && params[filter] != '*'
    end
    return resultOrgs
  end

  def filter_by_role resultOrgs, searchParams
    if @current_user && User.org_read_all_access(@current_user)
      resultOrgs = resultOrgs.where("source_contexts.name" => searchParams[:source_contextfilter]) if searchParams[:source_contextfilter].present?
      resultOrgs = resultOrgs.matches("source_statuses.name", searchParams[:source_status]) if searchParams[:source_status].present?
      resultOrgs = resultOrgs.matches("source_contexts.name", searchParams[:source_context]) if searchParams[:source_context].present?
    else
      resultOrgs = resultOrgs.matches("source_statuses.code", "ACT").matches("source_contexts.code", "CTRP")
    end
    return resultOrgs
  end

  def modelFilterSearch resultOrgs, searchParams
    # direct from model
    resultOrgs = filter_by_role resultOrgs, searchParams
    resultOrgs = get_match resultOrgs, searchParams
    resultOrgs = get_match_wc resultOrgs, searchParams
    return resultOrgs
  end

  def manilpulatedFilterSearch resultOrgs, searchParams
    # manipulated filter not direct from model
    resultOrgs = filterBySourceId resultOrgs, searchParams
    resultOrgs = filterByName resultOrgs, searchParams
    resultOrgs = filterByDate resultOrgs, searchParams
    resultOrgs = filterByFamily resultOrgs, searchParams

    return resultOrgs
  end

  def associatedOrgAccessByAdmin org
    return User.org_read_all_access(@current_user) && !org.blank? && !org.ctrp_id.blank?
  end

  def associatedOrgSingleAccess org, searchParams
    return searchParams[:id] && searchParams[:remove_ids].blank? && !org.blank?
  end

  def filterBySourceId resultOrgs, searchParams
    resultOrgs = resultOrgs.match_source_id_from_joins(searchParams[:source_id].gsub(/\\/,'\&\&'), searchParams[:wc_search]) if searchParams[:source_id].present?

    return resultOrgs
  end

  def filterByName resultOrgs, searchParams
    resultOrgs = resultOrgs.match_name_from_joins(searchParams[:name].gsub(/\\/,'\&\&'), (searchParams[:alias] == true) , searchParams[:wc_search]) if searchParams[:name].present?

    return resultOrgs
  end

  def filterByDate resultOrgs, searchParams
    resultOrgs = resultOrgs.updated_date_range(searchParams[:date_range_arr]) if searchParams[:date_range_arr].present? and searchParams[:date_range_arr].count == 2
    return resultOrgs
  end

  def filterByFamily resultOrgs, searchParams
    resultOrgs = resultOrgs.with_family(searchParams[:family_name].gsub(/\\/,'\&\&'), searchParams[:wc_search]) if searchParams[:family_name].present? && searchParams[:family_name] != '*'
    return resultOrgs
  end

  def filterSearch resultOrgs, searchParams
    # direct from model
    resultOrgs = modelFilterSearch resultOrgs, searchParams

    # direct from joins
    resultOrgs = resultOrgs.where("unexpired_family_membership.family_name" => nil) if searchParams[:no_family].present?
    resultOrgs = resultOrgs.where("service_requests.name" => searchParams[:service_request_name]) if searchParams[:service_request_name].present?

    # manipulated filter not direct from model
    resultOrgs = manilpulatedFilterSearch resultOrgs, searchParams
    return resultOrgs
  end

  def associateTwoOrgs ctrpOrgId, org
    org.processing_status = 'Complete'
    org.updated_by = @current_user.username unless @current_user.nil?
    org.updated_at = DateTime.now
    org.ctrp_id            = ctrpOrgId
    org.service_request_id = ServiceRequest.find_by_code('NULL').id
    org.association_date = DateTime.now
    return org
  end

  def disAssociateTwoOrgs ctrpOrgId, org
    if ctrpOrgId == org.ctrp_id
      org.processing_status = 'Incomplete'
      org.updated_by = @current_user.username unless @current_user.nil?
      org.updated_at = Time.zone.now
      org.ctrp_id            = nil
      org.service_request_id = nil
      org.association_date = nil
    end
    return org
  end

  def saveAndRenderAssociatedOrgs
    @organization.validations_to_skip = ["address","city"]
    respond_to do |format|
      @organization = associateTwoOrgs organization_params[:ctrp_id], @organization
      if @organization.source_context_id == @ctepId
        old_orgs = Organization.where({:ctrp_id => organization_params[:ctrp_id], :source_context_id => @ctepId}).where('id <> ' + (@organization.id).to_s).where('source_context_id <> ' + (@nlmId).to_s)
        old_orgs.update_all(ctrp_id: nil) if !old_orgs.blank?
      end
      if @organization.save
        @associated_orgs = filterSearch Organization.all_orgs_data().where(:ctrp_id => @organization.ctrp_id), params
        @active_context = 'CTRP'
        format.json { render :associated }
      else
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  def saveAndRenderUpdatedOrg
    @organization.validations_to_skip = ["address","city"]
    respond_to do |format|
      if @organization.update(organization_params.except(:ctrp_id))
        @active_context = 'CTRP'
        format.html { redirect_to @organization, notice: 'Organization was successfully updated.' }
        format.json { render :show, status: :ok, location: @organization }
      else
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_organization
    @organization = Organization.find_by_id(params[:id])
  end

  def set_glob_vars
    @ctepId = SourceContext.find_by_code("CTEP").id
    @nlmId = SourceContext.find_by_code("NLM").id
    @ctrpId = SourceContext.find_by_code("CTRP").id
    @write_access = User.org_write_access(@current_user)
    @read_all_access = User.org_read_all_access(@current_user)
  end

  def isAssociatedOrgUpdate
    return organization_params[:ctrp_id] && @organization.ctrp_id != organization_params[:ctrp_id] && ( @organization.source_context_id == @ctepId || @organization.source_context_id == @nlmId )
  end

  def processParams
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 20 if params[:rows].blank?
    if params[:allrows] == true
      params[:rows] = nil
    end
    params[:sort] = 'name' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?
  end

  def getSortBy
    sortBy = (['source_context', 'source_status'].include? params[:sort]) ? params[:sort]  += "_name" : params[:sort]
    return sortBy
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def organization_params
    params.require(:organization).permit(:source_id, :name, :address, :address2, :address3, :city, :state_province, :postal_code,
                                         :country, :email, :phone, :extension, :source_status_id, :ctrp_id, :association_date,
                                         :source_context_id, :lock_version, :processing_status, :service_request_id,
                                         name_aliases_attributes: [:id,:organization_id,:name,:_destroy])
  end
end
