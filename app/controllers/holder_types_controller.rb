class HolderTypesController < ApplicationController
  before_action :set_holder_type, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /holder_types
  # GET /holder_types.json
  def index
    @holder_types = HolderType.all
  end

  # GET /holder_types/1
  # GET /holder_types/1.json
  def show
  end

  # GET /holder_types/new
  def new
    @holder_type = HolderType.new
  end

  # GET /holder_types/1/edit
  def edit
  end

  # POST /holder_types
  # POST /holder_types.json
  def create
    @holder_type = HolderType.new(holder_type_params)

    respond_to do |format|
      if @holder_type.save
        format.html { redirect_to @holder_type, notice: 'Holder type was successfully created.' }
        format.json { render :show, status: :created, location: @holder_type }
      else
        format.html { render :new }
        format.json { render json: @holder_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /holder_types/1
  # PATCH/PUT /holder_types/1.json
  def update
    respond_to do |format|
      if @holder_type.update(holder_type_params)
        format.html { redirect_to @holder_type, notice: 'Holder type was successfully updated.' }
        format.json { render :show, status: :ok, location: @holder_type }
      else
        format.html { render :edit }
        format.json { render json: @holder_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /holder_types/1
  # DELETE /holder_types/1.json
  def destroy
    @holder_type.destroy
    respond_to do |format|
      format.html { redirect_to holder_types_url, notice: 'Holder type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_holder_type
      @holder_type = HolderType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def holder_type_params
      params.require(:holder_type).permit(:code, :name)
    end
end
