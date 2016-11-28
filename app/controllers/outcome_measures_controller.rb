class OutcomeMeasuresController < ApplicationController
  before_action :set_outcome_measure, only: [:show, :edit, :update, :destroy]
  #before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /outcome_measures
  # GET /outcome_measures.json
  def index
    @outcome_measures = OutcomeMeasure.all
  end

  # GET /outcome_measures/1
  # GET /outcome_measures/1.json
  def show
  end

  # GET /outcome_measures/new
  def new
    @outcome_measure = OutcomeMeasure.new
  end

  # GET /outcome_measures/1/edit
  def edit
  end

  #search
  def search
    @outcome_measures = OutcomeMeasure.all

  end

  # POST /outcome_measures
  # POST /outcome_measures.json
  def create
    @outcome_measure = OutcomeMeasure.new(outcome_measure_params)

    respond_to do |format|
      if @outcome_measure.save
        format.html { redirect_to @outcome_measure, notice: 'Outcome measure was successfully created.' }
        format.json { render :show, status: :created, location: @outcome_measure }
      else
        format.html { render :new }
        format.json { render json: @outcome_measure.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /outcome_measures/1
  # PATCH/PUT /outcome_measures/1.json
  def update
    respond_to do |format|
      if @outcome_measure.update(outcome_measure_params)
        format.html { redirect_to @outcome_measure, notice: 'Outcome measure was successfully updated.' }
        format.json { render :show, status: :ok, location: @outcome_measure }
      else
        format.html { render :edit }
        format.json { render json: @outcome_measure.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /outcome_measures/1
  # DELETE /outcome_measures/1.json
  def destroy
    @outcome_measure.destroy
    respond_to do |format|
      format.html { redirect_to outcome_measures_url, notice: 'Outcome measure was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outcome_measure
      @outcome_measure = OutcomeMeasure.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def outcome_measure_params
      params[:outcome_measure].permit(:trial_id,:title,:time_frame,:description,:safety_issue,:outcome_measure_type_id)
    end

end
