class SpecimenTypesController < ApplicationController
  before_action :set_specimen_type, only: [:show, :edit, :update, :destroy]

  # GET /specimen_types
  # GET /specimen_types.json
  def index
    @specimen_types = SpecimenType.all.order(:id)
  end

  # GET /specimen_types/1
  # GET /specimen_types/1.json
  def show
  end

  # GET /specimen_types/new
  def new
    @specimen_type = SpecimenType.new
  end

  # GET /specimen_types/1/edit
  def edit
  end

  # POST /specimen_types
  # POST /specimen_types.json
  def create
    @specimen_type = SpecimenType.new(specimen_type_params)

    respond_to do |format|
      if @specimen_type.save
        format.html { redirect_to @specimen_type, notice: 'Specimen type was successfully created.' }
        format.json { render :show, status: :created, location: @specimen_type }
      else
        format.html { render :new }
        format.json { render json: @specimen_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /specimen_types/1
  # PATCH/PUT /specimen_types/1.json
  def update
    respond_to do |format|
      if @specimen_type.update(specimen_type_params)
        format.html { redirect_to @specimen_type, notice: 'Specimen type was successfully updated.' }
        format.json { render :show, status: :ok, location: @specimen_type }
      else
        format.html { render :edit }
        format.json { render json: @specimen_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /specimen_types/1
  # DELETE /specimen_types/1.json
  def destroy
    @specimen_type.destroy
    respond_to do |format|
      format.html { redirect_to specimen_types_url, notice: 'Specimen type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_specimen_type
      @specimen_type = SpecimenType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def specimen_type_params
      params[:specimen_type]
    end
end
