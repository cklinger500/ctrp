class CadsrMarkerStatusesController < ApplicationController
  before_action :set_cadsr_marker_status, only: [:show, :edit, :update, :destroy]

  # GET /cadsr_marker_statuses
  # GET /cadsr_marker_statuses.json
  def index
    @cadsr_marker_statuses = CadsrMarkerStatus.all
  end

  # GET /cadsr_marker_statuses/1
  # GET /cadsr_marker_statuses/1.json
  def show
  end

  # GET /cadsr_marker_statuses/new
  def new
    @cadsr_marker_status = CadsrMarkerStatus.new
  end

  # GET /cadsr_marker_statuses/1/edit
  def edit
  end

  # POST /cadsr_marker_statuses
  # POST /cadsr_marker_statuses.json
  def create
    @cadsr_marker_status = CadsrMarkerStatus.new(cadsr_marker_status_params)

    respond_to do |format|
      if @cadsr_marker_status.save
        format.html { redirect_to @cadsr_marker_status, notice: 'Cadsr marker status was successfully created.' }
        format.json { render :show, status: :created, location: @cadsr_marker_status }
      else
        format.html { render :new }
        format.json { render json: @cadsr_marker_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cadsr_marker_statuses/1
  # PATCH/PUT /cadsr_marker_statuses/1.json
  def update
    respond_to do |format|
      if @cadsr_marker_status.update(cadsr_marker_status_params)
        format.html { redirect_to @cadsr_marker_status, notice: 'Cadsr marker status was successfully updated.' }
        format.json { render :show, status: :ok, location: @cadsr_marker_status }
      else
        format.html { render :edit }
        format.json { render json: @cadsr_marker_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cadsr_marker_statuses/1
  # DELETE /cadsr_marker_statuses/1.json
  def destroy
    @cadsr_marker_status.destroy
    respond_to do |format|
      format.html { redirect_to cadsr_marker_statuses_url, notice: 'Cadsr marker status was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cadsr_marker_status
      @cadsr_marker_status = CadsrMarkerStatus.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def cadsr_marker_status_params
      params.require(:cadsr_marker_status).permit(:code, :name)
    end
end
