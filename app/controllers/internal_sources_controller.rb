class InternalSourcesController < ApplicationController
  before_action :set_internal_source, only: [:show, :edit, :update, :destroy]

  # GET /internal_sources
  # GET /internal_sources.json
  def index
    @internal_sources = InternalSource.all
  end

  # GET /internal_sources/1
  # GET /internal_sources/1.json
  def show
  end

  # GET /internal_sources/new
  def new
    @internal_source = InternalSource.new
  end

  # GET /internal_sources/1/edit
  def edit
  end

  # POST /internal_sources
  # POST /internal_sources.json
  def create
    @internal_source = InternalSource.new(internal_source_params)

    respond_to do |format|
      if @internal_source.save
        format.html { redirect_to @internal_source, notice: 'Internal source was successfully created.' }
        format.json { render :show, status: :created, location: @internal_source }
      else
        format.html { render :new }
        format.json { render json: @internal_source.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /internal_sources/1
  # PATCH/PUT /internal_sources/1.json
  def update
    respond_to do |format|
      if @internal_source.update(internal_source_params)
        format.html { redirect_to @internal_source, notice: 'Internal source was successfully updated.' }
        format.json { render :show, status: :ok, location: @internal_source }
      else
        format.html { render :edit }
        format.json { render json: @internal_source.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /internal_sources/1
  # DELETE /internal_sources/1.json
  def destroy
    @internal_source.destroy
    respond_to do |format|
      format.html { redirect_to internal_sources_url, notice: 'Internal source was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_internal_source
      @internal_source = InternalSource.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def internal_source_params
      params.require(:internal_source).permit(:code, :name)
    end
end
