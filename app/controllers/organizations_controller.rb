class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]
  ## Please comment the next two lines if you donot want the Authorization checks
  before_filter :wrapper_authenticate_user, :except => [:search, :select] unless Rails.env.test?

  respond_to :html, :json


  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = Organization.all
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

    respond_to do |format|
      if @organization.update(organization_params)
        format.html { redirect_to @organization, notice: 'Organization was successfully updated.' }
        format.json { render :show, status: :ok, location: @organization }
      else
        p "###########################"
        p @organization.errors

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
    end
    if ldap_user_signed_in?
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
          user.approved = false
        end
      end
      user.save!
    end
    respond_to do |format|
        format.html { redirect_to users_path }
    end

  end

  def search
    p "**********>"
    p params[:wc_search]
    # Pagination/sorting params initialization
    Rails.logger.info "In Organization Controller, search"
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 20 if params[:rows].blank?
    params[:sort] = 'name' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?
    # Param alias is boolean, use has_key? instead of blank? to avoid false positive when the value of alias is false
    params[:alias] = true if !params.has_key?(:alias)

    # Scope chaining, reuse the scope definition
    if params[:name].present? || params[:source_context].present? || params[:source_id].present? || params[:source_status].present? || params[:family_name].present? || params[:address].present? || params[:address2].present? || params[:city].present? || params[:state_province].present? || params[:country].present? || params[:postal_code].present? || params[:email].present? || params[:phone].present? || params[:updated_by].present? || params[:date_range_arr].present?
      # ctrp_ids is used for retrieving the cluster of orgs when searching by source_id
      ctrp_ids = Organization.matches_wc('source_id', params[:source_id],@current_user.role).pluck(:ctrp_id) if params[:source_id].present?

      @organizations = Organization.all

      if params[:alias]
        @organizations = @organizations.matches_name_wc(params[:name],params[:wc_search]) if params[:name].present?
      else
        #@organizations = @organizations.matches_wc('name', params[:name]) if params[:name].present?
        @organizations = @organizations.matches_wc('name', params[:name],params[:wc_search]) if params[:name].present?

      end

      @organizations = @organizations.with_source_id(params[:source_id], ctrp_ids) if params[:source_id].present?


      if @current_user && (@current_user.role != "ROLE_CURATOR" && @current_user.role != "ROLE_SUPER" && @current_user.role != "ROLE_ABSTRACTOR" &&
          @current_user.role != "ROLE_ADMIN")
        # TODO need constant for Active
        @organizations = @organizations.with_source_status("Active")
        @organizations = @organizations.with_source_context("CTRP")

      else
        @organizations = @organizations.with_source_status(params[:source_status]) if params[:source_status].present?
        @organizations = @organizations.with_source_context(params[:source_context]) if params[:source_context].present?
        
      end
      @organizations = @organizations.updated_date_range(params[:date_range_arr]) if params[:date_range_arr].present? and params[:date_range_arr].count == 2
      @organizations = @organizations.matches_wc('updated_by', params[:updated_by],params[:wc_search]) if params[:updated_by].present?
      @organizations = @organizations.with_family(params[:family_name]) if params[:family_name].present?
      @organizations = @organizations.matches_wc('address', params[:address],params[:wc_search]) if params[:address].present?
      @organizations = @organizations.matches_wc('address2', params[:address2],params[:wc_search]) if params[:address2].present?
      @organizations = @organizations.matches_wc('city', params[:city],params[:wc_search]) if params[:city].present?
      @organizations = @organizations.matches_wc('state_province', params[:state_province],params[:wc_search]) if params[:state_province].present?
      @organizations = @organizations.matches('country', params[:country]) if params[:country].present?
      @organizations = @organizations.matches_wc('postal_code', params[:postal_code],params[:wc_search]) if params[:postal_code].present?
      @organizations = @organizations.matches_wc('email', params[:email],params[:wc_search]) if params[:email].present?
      @organizations = @organizations.matches_wc('phone', params[:phone],params[:wc_search]) if params[:phone].present?
      @organizations = @organizations.sort_by_col(params[:sort], params[:order]).group(:'organizations.id').page(params[:start]).per(params[:rows])
    else
      @organizations = []
    end
  end


  #Method to check for Uniqueness while creating organizations - check on name & source context. These are to be presented as warnings and not errors, hence cannot be part of before-save callback.
  def unique
    print params[:org_name]
    print params[:source_context_id]
    print params[:org_exists]
    print "Org ID "
    print params[:org_id]

#    exists = false
    is_unique = true
    count = 0

   #Get count of organization record with the same name - can be the existing record (if the user is on the edit screen)
    if params.has_key?(:org_name) && params.has_key?(:source_context_id)
      count = Organization.where("lower(name)=?", params[:org_name].downcase).where("source_context_id=?", params[:source_context_id]).count;
    end

    print "count "
    print count

    if params[:org_exists] == true
      @dbOrg = Organization.find(params[:org_id]);
      if @dbOrg != nil
        print " db organization "
        print @dbOrg.name

        #if on the Edit screen, then check for name changes and ignore if database & screen names are the same.
        if params[:org_name] == @dbOrg.name
          print " both are equal. Must not warn "
          is_unique = true;
        else
          #However if on the edit screen and the user types in a name that is the same as another org, then complain
          if count > 0
            print " both are different. Must warn. "
            is_unique = false
          end
        end
      end
    elsif params[:org_exists] == false && count > 0
      is_unique = false
    end

    p " is unique? "
    p is_unique

    respond_to do |format|
#        format.json {render :json => {:name_unique => !exists}}
      format.json {render :json => {:name_unique => is_unique}}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def organization_params
      params.require(:organization).permit(:source_id, :name, :address, :address2, :city, :state_province, :postal_code,
                                           :country, :email, :phone, :extension, :fax, :source_status_id,
                                           :source_context_id, :lock_version,
                                           name_aliases_attributes: [:id,:organization_id,:name,:_destroy])
    end
end
