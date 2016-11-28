class ProtocolIdOriginsController < ApplicationController
  before_action :set_protocol_id_origin, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /protocol_id_origins
  # GET /protocol_id_origins.json
  def index
    @protocol_id_origins = ProtocolIdOrigin.all
  end

  # GET /protocol_id_origins/1
  # GET /protocol_id_origins/1.json
  def show
  end

  # GET /protocol_id_origins/new
  def new
    @protocol_id_origin = ProtocolIdOrigin.new
  end

  # GET /protocol_id_origins/1/edit
  def edit
  end

  # POST /protocol_id_origins
  # POST /protocol_id_origins.json
  def create
    @protocol_id_origin = ProtocolIdOrigin.new(protocol_id_origin_params)

    respond_to do |format|
      if @protocol_id_origin.save
        format.html { redirect_to @protocol_id_origin, notice: 'Protocol id origin was successfully created.' }
        format.json { render :show, status: :created, location: @protocol_id_origin }
      else
        format.html { render :new }
        format.json { render json: @protocol_id_origin.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /protocol_id_origins/1
  # PATCH/PUT /protocol_id_origins/1.json
  def update
    respond_to do |format|
      if @protocol_id_origin.update(protocol_id_origin_params)
        format.html { redirect_to @protocol_id_origin, notice: 'Protocol id origin was successfully updated.' }
        format.json { render :show, status: :ok, location: @protocol_id_origin }
      else
        format.html { render :edit }
        format.json { render json: @protocol_id_origin.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /protocol_id_origins/1
  # DELETE /protocol_id_origins/1.json
  def destroy
    @protocol_id_origin.destroy
    respond_to do |format|
      format.html { redirect_to protocol_id_origins_url, notice: 'Protocol id origin was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_protocol_id_origin
      @protocol_id_origin = ProtocolIdOrigin.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def protocol_id_origin_params
      params.require(:protocol_id_origin).permit(:code, :name)
    end
end
