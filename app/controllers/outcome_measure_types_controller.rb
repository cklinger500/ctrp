class OutcomeMeasureTypesController < ApplicationController
  before_action :set_outcome_measure_type, only: [:show, :edit, :update, :destroy]

  # GET /outcome_measure_types
  # GET /outcome_measure_types.json
  def index
    @outcome_measure_types = OutcomeMeasureType.all
  end

  # GET /outcome_measure_types/1
  # GET /outcome_measure_types/1.json
  def show
  end

  # GET /outcome_measure_types/new
  def new
    @outcome_measure_type = OutcomeMeasureType.new
  end

  # GET /outcome_measure_types/1/edit
  def edit
  end

  # POST /outcome_measure_types
  # POST /outcome_measure_types.json
  def create
    @outcome_measure_type = OutcomeMeasureType.new(outcome_measure_type_params)

    respond_to do |format|
      if @outcome_measure_type.save
        format.html { redirect_to @outcome_measure_type, notice: 'Outcome measure type was successfully created.' }
        format.json { render :show, status: :created, location: @outcome_measure_type }
      else
        format.html { render :new }
        format.json { render json: @outcome_measure_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /outcome_measure_types/1
  # PATCH/PUT /outcome_measure_types/1.json
  def update
    respond_to do |format|
      if @outcome_measure_type.update(outcome_measure_type_params)
        format.html { redirect_to @outcome_measure_type, notice: 'Outcome measure type was successfully updated.' }
        format.json { render :show, status: :ok, location: @outcome_measure_type }
      else
        format.html { render :edit }
        format.json { render json: @outcome_measure_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /outcome_measure_types/1
  # DELETE /outcome_measure_types/1.json
  def destroy
    @outcome_measure_type.destroy
    respond_to do |format|
      format.html { redirect_to outcome_measure_types_url, notice: 'Outcome measure type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outcome_measure_type
      @outcome_measure_type = OutcomeMeasureType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def outcome_measure_type_params
      params[:outcome_measure_type]
    end
end
