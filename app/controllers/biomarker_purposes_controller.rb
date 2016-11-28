class BiomarkerPurposesController < ApplicationController
  before_action :set_biomarker_purpose, only: [:show, :edit, :update, :destroy]

  # GET /biomarker_purposes
  # GET /biomarker_purposes.json
  def index
    @biomarker_purposes = BiomarkerPurpose.all.order(:id)
  end

  # GET /biomarker_purposes/1
  # GET /biomarker_purposes/1.json
  def show
  end

  # GET /biomarker_purposes/new
  def new
    @biomarker_purpose = BiomarkerPurpose.new
  end

  # GET /biomarker_purposes/1/edit
  def edit
  end

  # POST /biomarker_purposes
  # POST /biomarker_purposes.json
  def create
    @biomarker_purpose = BiomarkerPurpose.new(biomarker_purpose_params)

    respond_to do |format|
      if @biomarker_purpose.save
        format.html { redirect_to @biomarker_purpose, notice: 'Bio marker purpose was successfully created.' }
        format.json { render :show, status: :created, location: @biomarker_purpose }
      else
        format.html { render :new }
        format.json { render json: @biomarker_purpose.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /biomarker_purposes/1
  # PATCH/PUT /biomarker_purposes/1.json
  def update
    respond_to do |format|
      if @biomarker_purpose.update(biomarker_purpose_params)
        format.html { redirect_to @biomarker_purpose, notice: 'Bio marker purpose was successfully updated.' }
        format.json { render :show, status: :ok, location: @biomarker_purpose }
      else
        format.html { render :edit }
        format.json { render json: @biomarker_purpose.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /biomarker_purposes/1
  # DELETE /biomarker_purposes/1.json
  def destroy
    @biomarker_purpose.destroy
    respond_to do |format|
      format.html { redirect_to biomarker_purposes_url, notice: 'Bio marker purpose was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_biomarker_purpose
      @biomarker_purpose = BiomarkerPurpose.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def biomarker_purpose_params
      params[:biomarker_purpose]
    end
end
