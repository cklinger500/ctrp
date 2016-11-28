class BiomarkerUsesController < ApplicationController
  before_action :set_biomarker_use, only: [:show, :edit, :update, :destroy]

  # GET /biomarker_uses
  # GET /biomarker_uses.json
  def index
    @biomarker_uses = BiomarkerUse.all.order(:id)
  end

  # GET /biomarker_uses/1
  # GET /biomarker_uses/1.json
  def show
  end

  # GET /biomarker_uses/new
  def new
    @biomarker_use = BiomarkerUse.new
  end

  # GET /biomarker_uses/1/edit
  def edit
  end

  # POST /biomarker_uses
  # POST /biomarker_uses.json
  def create
    @biomarker_use = BiomarkerUse.new(biomarker_use_params)

    respond_to do |format|
      if @biomarker_use.save
        format.html { redirect_to @biomarker_use, notice: 'Bio marker use was successfully created.' }
        format.json { render :show, status: :created, location: @biomarker_use }
      else
        format.html { render :new }
        format.json { render json: @biomarker_use.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /biomarker_uses/1
  # PATCH/PUT /biomarker_uses/1.json
  def update
    respond_to do |format|
      if @biomarker_use.update(biomarker_use_params)
        format.html { redirect_to @biomarker_use, notice: 'Bio marker use was successfully updated.' }
        format.json { render :show, status: :ok, location: @biomarker_use }
      else
        format.html { render :edit }
        format.json { render json: @biomarker_use.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /biomarker_uses/1
  # DELETE /biomarker_uses/1.json
  def destroy
    @biomarker_use.destroy
    respond_to do |format|
      format.html { redirect_to biomarker_uses_url, notice: 'Bio marker use was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_biomarker_use
      @biomarker_use = BiomarkerUse.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def biomarker_use_params
      params[:biomarker_use]
    end
end
