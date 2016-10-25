class ImportTrialLogDataController < ApplicationController
  before_action :set_import_trial_log_datum, only: [:show, :edit, :update, :destroy]

  # GET /import_trial_log_data
  # GET /import_trial_log_data.json
  def index
    @import_trial_log_data = ImportTrialLogDatum.all
  end

  # GET /import_trial_log_data/1
  # GET /import_trial_log_data/1.json
  def show
  end

  # GET /import_trial_log_data/new
  def new
    @import_trial_log_datum = ImportTrialLogDatum.new
  end

  # GET /import_trial_log_data/1/edit
  def edit
  end

  # POST /import_trial_log_data
  # POST /import_trial_log_data.json
  def create
    @import_trial_log_datum = ImportTrialLogDatum.new(import_trial_log_datum_params)

    respond_to do |format|
      if @import_trial_log_datum.save
        format.html { redirect_to @import_trial_log_datum, notice: 'Import trial log datum was successfully created.' }
        format.json { render :show, status: :created, location: @import_trial_log_datum }
      else
        format.html { render :new }
        format.json { render json: @import_trial_log_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /import_trial_log_data/1
  # PATCH/PUT /import_trial_log_data/1.json
  def update
    respond_to do |format|
      if @import_trial_log_datum.update(import_trial_log_datum_params)
        format.html { redirect_to @import_trial_log_datum, notice: 'Import trial log datum was successfully updated.' }
        format.json { render :show, status: :ok, location: @import_trial_log_datum }
      else
        format.html { render :edit }
        format.json { render json: @import_trial_log_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /import_trial_log_data/1
  # DELETE /import_trial_log_data/1.json
  def destroy
    @import_trial_log_datum.destroy
    respond_to do |format|
      format.html { redirect_to import_trial_log_data_url, notice: 'Import trial log datum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_import_trial_log_datum
      @import_trial_log_datum = ImportTrialLogDatum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def import_trial_log_datum_params
      params.fetch(:import_trial_log_datum, {})
    end
end
