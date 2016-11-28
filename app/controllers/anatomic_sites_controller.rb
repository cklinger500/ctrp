class AnatomicSitesController < ApplicationController
  before_action :set_anatomic_site, only: [:show, :edit, :update, :destroy]

  # GET /anatomic_sites
  # GET /anatomic_sites.json
  def index
    @anatomic_sites = AnatomicSite.all
  end

  # GET /anatomic_sites/1
  # GET /anatomic_sites/1.json
  def show
  end

  # GET /anatomic_sites/new
  def new
    @anatomic_site = AnatomicSite.new
  end

  # GET /anatomic_sites/1/edit
  def edit
  end

  # POST /anatomic_sites
  # POST /anatomic_sites.json
  def create
    @anatomic_site = AnatomicSite.new(anatomic_site_params)

    respond_to do |format|
      if @anatomic_site.save
        format.html { redirect_to @anatomic_site, notice: 'Anatomic site was successfully created.' }
        format.json { render :show, status: :created, location: @anatomic_site }
      else
        format.html { render :new }
        format.json { render json: @anatomic_site.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /anatomic_sites/1
  # PATCH/PUT /anatomic_sites/1.json
  def update
    respond_to do |format|
      if @anatomic_site.update(anatomic_site_params)
        format.html { redirect_to @anatomic_site, notice: 'Anatomic site was successfully updated.' }
        format.json { render :show, status: :ok, location: @anatomic_site }
      else
        format.html { render :edit }
        format.json { render json: @anatomic_site.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /anatomic_sites/1
  # DELETE /anatomic_sites/1.json
  def destroy
    @anatomic_site.destroy
    respond_to do |format|
      format.html { redirect_to anatomic_sites_url, notice: 'Anatomic site was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_anatomic_site
      @anatomic_site = AnatomicSite.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def anatomic_site_params
      params[:anatomic_site]
    end
end
