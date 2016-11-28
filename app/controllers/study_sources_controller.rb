class StudySourcesController < ApplicationController
  before_action :set_study_source, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /study_sources
  # GET /study_sources.json
  def index
    @study_sources = StudySource.all
  end

  # GET /study_sources/1
  # GET /study_sources/1.json
  def show
  end

  # GET /study_sources/new
  def new
    @study_source = StudySource.new
  end

  # GET /study_sources/1/edit
  def edit
  end

  # POST /study_sources
  # POST /study_sources.json
  def create
    @study_source = StudySource.new(study_source_params)

    respond_to do |format|
      if @study_source.save
        format.html { redirect_to @study_source, notice: 'Study source was successfully created.' }
        format.json { render :show, status: :created, location: @study_source }
      else
        format.html { render :new }
        format.json { render json: @study_source.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /study_sources/1
  # PATCH/PUT /study_sources/1.json
  def update
    respond_to do |format|
      if @study_source.update(study_source_params)
        format.html { redirect_to @study_source, notice: 'Study source was successfully updated.' }
        format.json { render :show, status: :ok, location: @study_source }
      else
        format.html { render :edit }
        format.json { render json: @study_source.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /study_sources/1
  # DELETE /study_sources/1.json
  def destroy
    @study_source.destroy
    respond_to do |format|
      format.html { redirect_to study_sources_url, notice: 'Study source was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_study_source
      @study_source = StudySource.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def study_source_params
      params.require(:study_source).permit(:code, :name)
    end
end
