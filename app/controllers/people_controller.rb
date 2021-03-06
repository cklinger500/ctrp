class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?
  before_action :set_paper_trail_whodunnit, only: [:create,:update, :destroy]

  skip_authorize_resource :only => [:search]
  #http_basic_authenticate_with name: "ctrpadmin", password: "Welcome02", except: :index

  # GET /people
  # GET /people.json
  def index
    @people = Person.all
  end

  # GET /people/1
  # GET /people/1.json
  def show
  end

  # GET /people/new
  def new
    @person = Person.new
  end

  # GET /people/1/edit
  def edit
  end

  # POST /people
  # POST /people.json
  def create
    if request.nil? || request.content_type.nil?
      print "request.content_type is nil"
    else
      print "hello request type is :: " + request.content_type
    end
    @person = Person.new(person_params)
    @person.created_by = @current_user.username unless @current_user.nil?
    @person.updated_by = @person.created_by

    respond_to do |format|
      if @person.save
        format.html { redirect_to @person, notice: 'Person was successfully created.' }
        format.json { render :show, status: :created, location: @person }
      else
        format.html { render :new }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end


  end

  # PATCH/PUT /people/1
  # PATCH/PUT /people/1.json
  def update

    p "processing status: #{person_params}"
    @person.updated_by = @current_user.username unless @current_user.nil?
    respond_to do |format|
      #@person.po_affiliations.destroy
      if @person.update(person_params)
        format.html { redirect_to @person, notice: 'Person was successfully updated.' }
        format.json { render :show, status: :ok, location: @person }
      else
        format.html { render :edit }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /people/1
  # DELETE /people/1.json
  def destroy
    respond_to do |format|
      if @person.destroy
        format.html { redirect_to people_url, notice: 'Person was successfully destroyed.' }
        format.json { head :no_content }
      else
        format.html { redirect_to people_url, alert: @person.errors }
        format.json { render json: @person.errors, status: :unprocessable_entity  }
      end
    end
  end

  def nullifiable
    nullifiable = false
    cur_person = Person.find_by_id(params[:id])

    if !cur_person.blank?
      nullifiable = cur_person.nullifiable
    end
    respond_to do |format|
      format.json {render :json => {:nullifiable => nullifiable}}
    end
  end

  def curate

    respond_to do |format|
      if Person.nullify_duplicates(params)
        format.json { render :json => {:nullify_success => true}}
        format.html { render :json => {:nullify_success => true}}
        # format.html { redirect_to people_url, notice: 'Person was successfully curated.' }
      else
        format.json { render :json => {:nullify_success => false}}
        # format.json { render json: @person.errors, status: :unprocessable_entity  }
      end

    end

  end

  def search
    print params
    print @params
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 20 if params[:rows].blank?
    params[:sort] = 'lname' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if params[:ctrp_id].present? || params[:source_id].present? ||
        params[:fname].present? || params[:lname].present? || params[:prefix].present? ||
        params[:suffix].present? || params[:email].present? || params[:phone].present? ||
        params[:source_context].present? || params[:source_status].present? || params[:date_range_arr].present? ||
        params[:updated_by].present? || params[:affiliated_org_name].present? || params[:processing_status].present? ||
        params[:service_request].present? || params[:organization_id].present?

      @people = Person.all_people_data()
      @people = @people.affiliated_with_organization(params[:affiliated_org_name]) if params[:affiliated_org_name].present?
      @people = @people.affiliated_with_organization_id(params[:organization_id]) if params[:organization_id].present?
      @people = @people.updated_date_range(params[:date_range_arr]) if params[:date_range_arr].present? and params[:date_range_arr].count == 2
      @people = @people.matches('id', params[:ctrp_id]) if params[:ctrp_id].present?
      @people = @people.matches('processing_status', params[:processing_status]) if params[:processing_status].present?
      @people = matches_wc(@people, 'updated_by', params[:updated_by],params[:wc_search]) if params[:updated_by].present?
      @people = matches_wc(@people, 'source_id',params[:source_id],params[:wc_search]) if params[:source_id].present?
      @people = matches_wc(@people, 'fname', params[:fname],params[:wc_search]) if params[:fname].present?
      @people = matches_wc(@people, 'lname', params[:lname],params[:wc_search]) if params[:lname].present?
      @people = matches_wc(@people, 'prefix', params[:prefix],params[:wc_search]) if params[:prefix].present?
      @people = matches_wc(@people, 'suffix', params[:suffix],params[:wc_search]) if params[:suffix].present?
      @people = matches_wc(@people, 'email', params[:email],params[:wc_search]) if params[:email].present?
      @people = matches_wc(@people, 'phone', params[:phone].gsub(/\\/,'\&\&'),params[:wc_search]) if params[:phone].present?
      @people = @people.matches('service_request_id', params[:service_request]) if params[:service_request].present?


      if @current_user && (@current_user.role == "ROLE_CURATOR" || @current_user.role == "ROLE_SUPER" || @current_user.role == "ROLE_ABSTRACTOR" ||
          @current_user.role == "ROLE_ADMIN" || @current_user.role == "ROLE_ABSTRACTOR-SU")
        @people = @people.matches("source_statuses.code", params[:source_status]) if params[:source_status].present?
        @people = @people.matches("source_contexts.code", params[:source_context]) if params[:source_context].present?
      else
        # TODO need constant for CTRP
        @people = @people.matches("source_statuses.code", "ACT").matches("source_contexts.code", "CTRP")
      end
      @people = @people.page(params[:start]).per(params[:rows])

      @people = @people.sort_by_col(params[:sort], params[:order]).page(params[:start]).per(params[:rows])
    else
      @people = []
    end
  end


  # associate a CTEP person to a ctrp_id (CTRP person)
  def associate_person
    associated_ctep_person = nil

    if params.has_key?(:ctep_person_id) and params.has_key?(:ctrp_id)
      # remove existing assocation to the ctrp person first:
      ctep_source_context_id = SourceContext.find_by_code('CTEP').id
      temp_cteps = Person.where(ctrp_id: params[:ctrp_id], source_context_id: ctep_source_context_id)
      temp_cteps.each { |per| per.update_attributes('ctrp_id': nil, 'association_start_date': nil) }

      # remove existing association to the ctrp person first
      ctep_source_context_id = SourceContext.find_by_code('CTEP').id
      temp_cteps = Person.where(ctrp_id: params[:ctrp_id], source_context_id: ctep_source_context_id)
      temp_cteps.each { |per| per.update_attributes('ctrp_id': nil, 'association_start_date': nil) }

      associated_ctep_person = Person.find(params[:ctep_person_id])
      if !associated_ctep_person.nil?
        associated_ctep_person.ctrp_id = params[:ctrp_id]
        associated_ctep_person.update_attributes('ctrp_id': params[:ctrp_id], 'association_start_date': Time.now, 'processing_status': 'Complete')
      end

    end
    respond_to do |format|
      format.json { render :json => {:person => associated_ctep_person} }
    end
  end

  def remove_association
    success = false
    if params.has_key?(:ctep_person_id)
      associated_ctep_person = Person.find(params[:ctep_person_id])
      if !associated_ctep_person.nil? && associated_ctep_person.source_context_id == SourceContext.find_by_code('CTEP').id
        success = associated_ctep_person.update_attributes('ctrp_id': nil, 'association_start_date': nil, 'processing_status': 'Incomplete')
      end
    end

    respond_to do |format|
      format.json { render :json => {:is_removed => success, :removed_person => associated_ctep_person } }
    end
  end

  def clone_ctep

    if params.has_key?(:ctep_person_id)
      # @matched = find_matches(params[:ctep_person_id])
      ctep_person = Person.find(params[:ctep_person_id])
      ctep_person_source_status_code = SourceStatus.find(ctep_person.source_status_id).code
      ctrp_source_context_id = SourceContext.find_by_code('CTRP').id
      @matched = Person.where(fname: ctep_person.fname, lname: ctep_person.lname, source_context_id: ctrp_source_context_id)
      p "@matched.size1: #{@matched.size}"
      # @matched = @matched.with_source_status_context('ACT', ctrp_source_context_id)
      p "@matched.size2: #{@matched.size}"
      # TODO: match against the state and address in affiliated organization

      @is_cloned = false
      if (@matched.size > 0 && params[:force_clone] == true) || @matched.size == 0
        clone = ctep_person.dup   # TODO: reserve associations here for the clone ???
        clone.source_context_id = ctrp_source_context_id
        clone.source_status_id = SourceStatus.find_by_code(ctep_person_source_status_code).id
        clone.association_start_date = nil
        @matched = [clone]
        # @matched.processing_status = nil
        # @matched.registration_type = nil
        # @matched.service_request_id = nil
        @is_cloned = clone.save()
        # link the CTEP to the new CTRP person clone
        ctep_person.update_attributes('ctrp_id': clone.ctrp_id, 'association_start_date': Time.now, 'processing_status': 'Complete')
      end
    end
  end


  #Method to check for Uniqueness while creating persons - check on First & Last name. These are to be presented as warnings and not errors, hence cannot be part of before-save callback.
  def unique
    print params[:person_fname]
    print params[:person_lname]
    print params[:source_context_id]
    print params[:person_exists]
    print "Person ID "
    print params[:person_id]

#    exists = false
    is_unique = true
    count = 0

    #Get count of person record with the same name - can be the existing record (if the user is on the edit screen)
      if params.has_key?(:person_fname) && params.has_key?(:person_lname) && params.has_key?(:source_context_id)
        count = Person.where("lower(fname)=?", params[:person_fname].downcase).where("lower(lname)=?",params[:person_lname].downcase).where("source_context_id=?", params[:source_context_id]).count;
      end

      print "count "
      print count

      if params[:person_exists] == true
        @dbPerson = Person.find(params[:person_id]);
        if @dbPerson != nil
          print " db person "
          print @dbPerson.fname
          print @dbPerson.lname

          #if on the Edit screen, then check for name changes and ignore if database & screen names are the same.
          if params[:person_fname] == @dbPerson.fname && params[:person_lname] == @dbPerson.lname
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
      elsif params[:person_exists] == false && count > 0
        is_unique = false
      end

    respond_to do |format|
#        format.json {render :json => {:name_unique => !exists}}
      format.json {render :json => {:name_unique => is_unique}}
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      @person = Person.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def person_params
      params.require(:person).permit(:source_id, :id, :fname, :mname, :lname, :prefix, :suffix, :email, :phone, :extension,
                                     :source_status_id, :source_context_id, :lock_version, :processing_status,
                                     :registration_type, :force_clone, :service_request_id,
                                     po_affiliations_attributes: [:id, :organization_id, :effective_date,
                                                                  :expiration_date, :po_affiliation_status_id,
                                                                  :lock_version, :_destroy])
    end
end
