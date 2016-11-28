class AssayTypesController < ApplicationController
  before_action :set_assay_type, only: [:show, :edit, :update, :destroy]

  # GET /assay_types
  # GET /assay_types.json
  def index
    @assay_types = AssayType.all.order(:id)
  end

  # GET /assay_types/1
  # GET /assay_types/1.json
  def show
  end

  # GET /assay_types/new
  def new
    @assay_type = AssayType.new
  end

  # GET /assay_types/1/edit
  def edit
  end

  # POST /assay_types
  # POST /assay_types.json
  def create
    @assay_type = AssayType.new(assay_type_params)

    respond_to do |format|
      if @assay_type.save
        format.html { redirect_to @assay_type, notice: 'Assay type was successfully created.' }
        format.json { render :show, status: :created, location: @assay_type }
      else
        format.html { render :new }
        format.json { render json: @assay_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /assay_types/1
  # PATCH/PUT /assay_types/1.json
  def update
    respond_to do |format|
      if @assay_type.update(assay_type_params)
        format.html { redirect_to @assay_type, notice: 'Assay type was successfully updated.' }
        format.json { render :show, status: :ok, location: @assay_type }
      else
        format.html { render :edit }
        format.json { render json: @assay_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /assay_types/1
  # DELETE /assay_types/1.json
  def destroy
    @assay_type.destroy
    respond_to do |format|
      format.html { redirect_to assay_types_url, notice: 'Assay type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_assay_type
      @assay_type = AssayType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def assay_type_params
      params[:assay_type]
    end
end
