class SiteRecStatusWrappersController < ApplicationController
  before_action :set_site_rec_status_wrapper, only: [:show, :edit, :update, :destroy]

  # GET /site_rec_status_wrappers
  # GET /site_rec_status_wrappers.json
  def index
    @site_rec_status_wrappers = SiteRecStatusWrapper.all
  end

  # GET /site_rec_status_wrappers/1
  # GET /site_rec_status_wrappers/1.json
  def show
  end

  # GET /site_rec_status_wrappers/new
  def new
    @site_rec_status_wrapper = SiteRecStatusWrapper.new
  end

  # GET /site_rec_status_wrappers/1/edit
  def edit
  end

  # POST /site_rec_status_wrappers
  # POST /site_rec_status_wrappers.json
  def create
    @site_rec_status_wrapper = SiteRecStatusWrapper.new(site_rec_status_wrapper_params)

    respond_to do |format|
      if @site_rec_status_wrapper.save
        format.html { redirect_to @site_rec_status_wrapper, notice: 'Site rec status wrapper was successfully created.' }
        format.json { render :show, status: :created, location: @site_rec_status_wrapper }
      else
        format.html { render :new }
        format.json { render json: @site_rec_status_wrapper.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /site_rec_status_wrappers/1
  # PATCH/PUT /site_rec_status_wrappers/1.json
  def update
    respond_to do |format|
      if @site_rec_status_wrapper.update(site_rec_status_wrapper_params)
        format.html { redirect_to @site_rec_status_wrapper, notice: 'Site rec status wrapper was successfully updated.' }
        format.json { render :show, status: :ok, location: @site_rec_status_wrapper }
      else
        format.html { render :edit }
        format.json { render json: @site_rec_status_wrapper.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /site_rec_status_wrappers/1
  # DELETE /site_rec_status_wrappers/1.json
  def destroy
    @site_rec_status_wrapper.destroy
    respond_to do |format|
      format.html { redirect_to site_rec_status_wrappers_url, notice: 'Site rec status wrapper was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_site_rec_status_wrapper
      @site_rec_status_wrapper = SiteRecStatusWrapper.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def site_rec_status_wrapper_params
      params[:site_rec_status_wrapper]
    end
end
