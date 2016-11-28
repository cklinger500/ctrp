class SiteRecruitmentStatusesController < ApplicationController
  before_action :set_site_recruitment_status, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /site_recruitment_statuses
  # GET /site_recruitment_statuses.json
  def index
    @site_recruitment_statuses = SiteRecruitmentStatus.all
  end

  # GET /site_recruitment_statuses/1
  # GET /site_recruitment_statuses/1.json
  def show
  end

  # GET /site_recruitment_statuses/new
  def new
    @site_recruitment_status = SiteRecruitmentStatus.new
  end

  # GET /site_recruitment_statuses/1/edit
  def edit
  end

  # POST /site_recruitment_statuses
  # POST /site_recruitment_statuses.json
  def create
    @site_recruitment_status = SiteRecruitmentStatus.new(site_recruitment_status_params)

    respond_to do |format|
      if @site_recruitment_status.save
        format.html { redirect_to @site_recruitment_status, notice: 'Site recruitment status was successfully created.' }
        format.json { render :show, status: :created, location: @site_recruitment_status }
      else
        format.html { render :new }
        format.json { render json: @site_recruitment_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /site_recruitment_statuses/1
  # PATCH/PUT /site_recruitment_statuses/1.json
  def update
    respond_to do |format|
      if @site_recruitment_status.update(site_recruitment_status_params)
        format.html { redirect_to @site_recruitment_status, notice: 'Site recruitment status was successfully updated.' }
        format.json { render :show, status: :ok, location: @site_recruitment_status }
      else
        format.html { render :edit }
        format.json { render json: @site_recruitment_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /site_recruitment_statuses/1
  # DELETE /site_recruitment_statuses/1.json
  def destroy
    @site_recruitment_status.destroy
    respond_to do |format|
      format.html { redirect_to site_recruitment_statuses_url, notice: 'Site recruitment status was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_site_recruitment_status
      @site_recruitment_status = SiteRecruitmentStatus.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def site_recruitment_status_params
      params[:site_recruitment_status]
    end
end
