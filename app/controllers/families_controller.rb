class FamiliesController < ApplicationController
  before_action :set_family, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?
  before_action :set_paper_trail_whodunnit, only: [:create,:update, :destroy]

  # GET /families
  # GET /families.json
  def index
    @families = Family.all
  end

  # GET /families/1
  # GET /families/1.json
  def show
    @export_data = Family.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render :json => @export_data.to_json(:include => :family_memberships) }
    end
  end

  # GET /families/new
  def new
    @family = Family.new
  end

  # GET /families/1/edit
  def edit
  end

  # POST /families
  # POST /families.json
  def create
    @family = Family.new(family_params)

    respond_to do |format|
      if @family.save
        format.html { redirect_to @family, notice: 'Family was successfully created.' }
        format.json { render :show, status: :created, location: @family }
      else
        format.html { render :new }
        format.json { render json: @family.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /families/1
  # PATCH/PUT /families/1.json
  def update
    respond_to do |format|
      if @family.update(family_params)
        format.html { redirect_to @family, notice: 'Family was successfully updated.' }
        format.json { render :show, status: :ok, location: @family }
      else
        format.html { render :edit }
        format.json { render json: @family.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /families/1
  # DELETE /families/1.json
  def destroy
    respond_to do |format|
      if @family.destroy
        format.html { redirect_to families_url, notice: 'Family was successfully destroyed.' }
        format.json { head :no_content }
      else
        format.html { redirect_to families_url, alert: @family.errors }
        format.json { render json: @family.errors, status: :unprocessable_entity  }
      end
    end
  end

# GET /get_orgs/1.json
  def get_orgs
    @organizations = Family.find_by_id(params[:id]).organizations if Family.find_by_id(params[:id]).present?
    respond_to do |format|
      format.json { render 'organizations/index' }
    end
  end

  def search
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?

    if params[:allrows] != true
      params[:rows] = 20 if params[:rows].blank?
    else
      params[:rows] = nil
    end

    params[:sort] = 'name' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?
    print "ke;;;;;;;";
    print params[:wc_search];

    if params[:ctrp_id].present? || params[:name].present? || params[:family_status].present? || params[:family_type].present?
      @families = Family.all
      @families = @families.matches('id', params[:ctrp_id]) if params[:ctrp_id].present?
      @families = @families.matches_wc('name', params[:name],params[:wc_search]) if params[:name].present?
      @families = @families.with_family_status(params[:family_status]) if params[:family_status].present?
      @families = @families.with_family_type(params[:family_type]) if params[:family_type].present?
      @families = @families.sort_by_col(params[:sort], params[:order]).group(:'families.id')

      if params[:rows] != nil
        @families = @families.page(params[:start]).per(params[:rows])
      end
    else
      @families = []
    end
  end

  #Method to check for Uniqueness while creating families - check on name. These are to be presented as warnings and not errors, hence cannot be part of before-save callback.
  def unique
    is_unique = true
    count = 0

    if params.has_key?(:family_name)
      count = Family.where("lower(name)=?", params[:family_name].downcase).count;
    end

    print "count "
    print count

    if params[:family_exists] == true
      @dbFamily = Family.find(params[:family_id]);
      if @dbFamily != nil
        print " db family "
        print @dbFamily.name

        if params[:family_name] == @dbFamily.name
          print " both are equal. Must not warn "
          is_unique = true;
        else
          if count > 0
            print " both are different. Must warn. "
            is_unique = false
          end
        end
      end
    elsif params[:family_exists] == false && count > 0
      is_unique = false
    end

    p " is unique? "
    p is_unique

    respond_to do |format|
      format.json {render :json => {:name_unique => is_unique}}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_family
      @family = Family.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def family_params
      print @params;
      params.require(:family).permit(:name, :family_status_id, :family_type_id, :lock_version,
                                     family_memberships_attributes: [:id, :_destroy, :organization_id,
                                                                     :family_relationship_id, :effective_date,
                                                                     :expiration_date, :lock_version])
    end
end
