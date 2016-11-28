class MarkerAssayTypeAssociationsController < ApplicationController
  before_action :set_marker_assay_type_association, only: [:show, :edit, :update, :destroy]

  # GET /marker_assay_type_associations
  # GET /marker_assay_type_associations.json
  def index
    @marker_assay_type_associations = MarkerAssayTypeAssociation.all
  end

  # GET /marker_assay_type_associations/1
  # GET /marker_assay_type_associations/1.json
  def show
  end


  # GET /marker_assay_type_associations/new
  def new
    @marker_assay_type_association = MarkerAssayTypeAssociation.new
  end

  # GET /marker_assay_type_associations/1/edit
  def edit
  end

  # POST /marker_assay_type_associations
  # POST /marker_assay_type_associations.json
  def create
    @marker_assay_type_association = MarkerAssayTypeAssociation.new(marker_assay_type_association_params)

    respond_to do |format|
      if @marker_assay_type_association.save
        format.html { redirect_to @marker_assay_type_association, notice: 'Marker assay type association was successfully created.' }
        format.json { render :show, status: :created, location: @marker_assay_type_association }
      else
        format.html { render :new }
        format.json { render json: @marker_assay_type_association.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /marker_assay_type_associations/1
  # PATCH/PUT /marker_assay_type_associations/1.json
  def update
    respond_to do |format|
      if @marker_assay_type_association.update(marker_assay_type_association_params)
        format.html { redirect_to @marker_assay_type_association, notice: 'Marker assay type association was successfully updated.' }
        format.json { render :show, status: :ok, location: @marker_assay_type_association }
      else
        format.html { render :edit }
        format.json { render json: @marker_assay_type_association.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /marker_assay_type_associations/1
  # DELETE /marker_assay_type_associations/1.json
  def destroy
    @marker_assay_type_association.destroy
    respond_to do |format|
      format.html { redirect_to marker_assay_type_associations_url, notice: 'Marker assay type association was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_marker_assay_type_association
#      @marker_assay_type_association = MarkerAssayTypeAssociation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def marker_assay_type_association_params
      params[:marker_assay_type_association]
    end
end
