class CadsrMarkerSynonymsController < ApplicationController
  before_action :set_marker_synonym, only: [:show, :edit, :update, :destroy]

  # GET /marker_synonyms
  # GET /marker_synonyms.json
  def index
    @cadsr_marker_synonyms = CadsrMarkerSynonym.all
  end

  # GET /marker_synonyms/1
  # GET /marker_synonyms/1.json
  def show
  end

  # GET /marker_synonyms/new
  def new
    @cadsr_marker_synonym = CadsrMarkerSynonym.new
  end

  # GET /marker_synonyms/1/edit
  def edit
  end

  # POST /marker_synonyms
  # POST /marker_synonyms.json
  def create
    @cadsr_marker_synonym = CadsrMarkerSynonym.new(marker_synonym_params)

    respond_to do |format|
      if @cadsr_marker_synonym.save
        format.html { redirect_to @cadsr_marker_synonym, notice: 'Marker synonym was successfully created.' }
        format.json { render :show, status: :created, location: @cadsr_marker_synonym }
      else
        format.html { render :new }
        format.json { render json: @cadsr_marker_synonym.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /marker_synonyms/1
  # PATCH/PUT /marker_synonyms/1.json
  def update
    respond_to do |format|
      if @cadsr_marker_synonym.update(marker_synonym_params)
        format.html { redirect_to @cadsr_marker_synonym, notice: 'Marker synonym was successfully updated.' }
        format.json { render :show, status: :ok, location: @cadsr_marker_synonym }
      else
        format.html { render :edit }
        format.json { render json: @cadsr_marker_synonym.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /marker_synonyms/1
  # DELETE /marker_synonyms/1.json
  def destroy
    @cadsr_marker_synonym.destroy
    respond_to do |format|
      format.html { redirect_to marker_synonyms_url, notice: 'Marker synonym was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_marker_synonym
      @cadsr_marker_synonym = CadsrMarkerSynonym.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def marker_synonym_params
      params.require(:marker_synonym).permit(:alternate_name)
    end
end
