class TrialStatusesController < ApplicationController
  before_action :set_trial_status, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /trial_statuses
  # GET /trial_statuses.json
  def index
    @trial_statuses = TrialStatus.all
  end

  # GET /trial_statuses/1
  # GET /trial_statuses/1.json
  def show
  end

  # GET /trial_statuses/new
  def new
    @trial_status = TrialStatus.new
  end

  # GET /trial_statuses/1/edit
  def edit
  end

  # POST /trial_statuses
  # POST /trial_statuses.json
  def create
    @trial_status = TrialStatus.new(trial_status_params)

    respond_to do |format|
      if @trial_status.save
        format.html { redirect_to @trial_status, notice: 'Trial status was successfully created.' }
        format.json { render :show, status: :created, location: @trial_status }
      else
        format.html { render :new }
        format.json { render json: @trial_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /trial_statuses/1
  # PATCH/PUT /trial_statuses/1.json
  def update
    respond_to do |format|
      if @trial_status.update(trial_status_params)
        format.html { redirect_to @trial_status, notice: 'Trial status was successfully updated.' }
        format.json { render :show, status: :ok, location: @trial_status }
      else
        format.html { render :edit }
        format.json { render json: @trial_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trial_statuses/1
  # DELETE /trial_statuses/1.json
  def destroy
    @trial_status.destroy
    respond_to do |format|
      format.html { redirect_to trial_statuses_url, notice: 'Trial status was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trial_status
      @trial_status = TrialStatus.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trial_status_params
      params.require(:trial_status).permit(:code, :name, :explanation)
    end
end
