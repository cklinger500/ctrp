class MarkerBiomarkerPurposeAssociationsController < ApplicationController
  before_action :set_marker_biomarker_purpose_association, only: [:show, :edit, :update, :destroy]

  # GET /marker_biomarker_purpose_associations
  # GET /marker_biomarker_purpose_associations.json
  def index
    @marker_biomarker_purpose_associations = MarkerBiomarkerPurposeAssociation.all
  end

  # GET /marker_biomarker_purpose_associations/1
  # GET /marker_biomarker_purpose_associations/1.json
  def show
  end

  # GET /marker_biomarker_purpose_associations/new
  def new
    @marker_biomarker_purpose_association = MarkerBiomarkerPurposeAssociation.new
  end

  # GET /marker_biomarker_purpose_associations/1/edit
  def edit
  end

  # POST /marker_biomarker_purpose_associations
  # POST /marker_biomarker_purpose_associations.json
  def create
    @marker_biomarker_purpose_association = MarkerBiomarkerPurposeAssociation.new(marker_biomarker_purpose_association_params)

    respond_to do |format|
      if @marker_biomarker_purpose_association.save
        format.html { redirect_to @marker_biomarker_purpose_association, notice: 'Marker biomarker purpose association was successfully created.' }
        format.json { render :show, status: :created, location: @marker_biomarker_purpose_association }
      else
        format.html { render :new }
        format.json { render json: @marker_biomarker_purpose_association.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /marker_biomarker_purpose_associations/1
  # PATCH/PUT /marker_biomarker_purpose_associations/1.json
  def update
    respond_to do |format|
      if @marker_biomarker_purpose_association.update(marker_biomarker_purpose_association_params)
        format.html { redirect_to @marker_biomarker_purpose_association, notice: 'Marker biomarker purpose association was successfully updated.' }
        format.json { render :show, status: :ok, location: @marker_biomarker_purpose_association }
      else
        format.html { render :edit }
        format.json { render json: @marker_biomarker_purpose_association.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /marker_biomarker_purpose_associations/1
  # DELETE /marker_biomarker_purpose_associations/1.json
  def destroy
    @marker_biomarker_purpose_association.destroy
    respond_to do |format|
      format.html { redirect_to marker_biomarker_purpose_associations_url, notice: 'Marker biomarker purpose association was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_marker_biomarker_purpose_association
      @marker_biomarker_purpose_association = MarkerBiomarkerPurposeAssociation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def marker_biomarker_purpose_association_params
      params[:marker_biomarker_purpose_association]
    end
end
