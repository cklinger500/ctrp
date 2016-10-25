class SourceStatusesController < ApplicationController
  before_action :set_source_status, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /source_statuses
  # GET /source_statuses.json
  def index
    @source_statuses = SourceStatus.all
  end

  # GET /source_statuses/search
  # GET /source_statuses/search.json
  def search
    search_type = params[:view_type] == 'search' ? 'org_source_status_search_access' : 'org_source_status_access'
    search_context = params[:view_context] && params[:view_context].length > 1 ? params[:view_context] : 'CTRP'
    org_source_status_access = (current_ctrp_user_role_details @current_user.role)[search_type]
    administration_roles = ['ROLE_ADMIN','ROLE_ACCOUNT-APPROVER','ROLE_SUPER','ROLE_ABSTRACTOR','ROLE_CURATOR']

    #search_context
    if ( (administration_roles.include? @current_user.role) &&
          params  && params[:view_context] &&  params[:view_context].empty? &&  params[:view_type] == 'search') || params[:view_type] == 'all'
      @source_statuses = SourceStatus.all
    elsif org_source_status_access
      @source_statuses = SourceStatus.source_statuses_with_active_record_status
                             .where("source_context_id=?", SourceContext.find_by_code(search_context).id)
                             .order(code: :asc)
                             .select { |status| org_source_status_access.split(",").include? status["code"] }
    else
      #TODO need to use constant for Active
      @source_statuses = [SourceStatus.ctrp_context_source_statuses.find_by_name("Active")]

    end
  end

  # GET /source_statuses/1
  # GET /source_statuses/1.json
  def show
  end

  # GET /source_statuses/new
  def new
    @source_status = SourceStatus.new
  end

  # GET /source_statuses/1/edit
  def edit
  end

  # POST /source_statuses
  # POST /source_statuses.json
  def create
    @source_status = SourceStatus.new(source_status_params)

    respond_to do |format|
      if @source_status.save
        format.html { redirect_to @source_status, notice: 'Source status was successfully created.' }
        format.json { render :show, status: :created, location: @source_status }
      else
        format.html { render :new }
        format.json { render json: @source_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /source_statuses/1
  # PATCH/PUT /source_statuses/1.json
  def update
    respond_to do |format|
      if @source_status.update(source_status_params)
        format.html { redirect_to @source_status, notice: 'Source status was successfully updated.' }
        format.json { render :show, status: :ok, location: @source_status }
      else
        format.html { render :edit }
        format.json { render json: @source_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /source_statuses/1
  # DELETE /source_statuses/1.json
  def destroy
    @source_status.destroy
    respond_to do |format|
      format.html { redirect_to source_statuses_url, notice: 'Source status was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_source_status
      @source_status = SourceStatus.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def source_status_params
      params.require(:source_status).permit(:code, :name)
    end
end
