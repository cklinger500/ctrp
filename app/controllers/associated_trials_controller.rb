class AssociatedTrialsController < ApplicationController
  before_action :set_associated_trial, only: [:show, :edit, :update, :destroy]
  ## Please comment the next two lines if you donot want the Authorization checks
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?

  # GET /associated_trials
  # GET /associated_trials.json
  def index
    @associated_trials = AssociatedTrial.all
  end

  # GET /associated_trials/1
  # GET /associated_trials/1.json
  def show
  end

  # GET /associated_trials/new
  def new
    @associated_trial = AssociatedTrial.new
  end

  # GET /associated_trials/1/edit
  def edit
  end

  # POST /associated_trials
  # POST /associated_trials.json
  def create
    @associated_trial = AssociatedTrial.new(associated_trial_params)

    respond_to do |format|
      if @associated_trial.save
        format.html { redirect_to @associated_trial, notice: 'Associated trial was successfully created.' }
        format.json { render :show, status: :created, location: @associated_trial }
      else
        format.html { render :new }
        format.json { render json: @associated_trial.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /associated_trials/1
  # PATCH/PUT /associated_trials/1.json
  def update
    respond_to do |format|
      if @associated_trial.update(associated_trial_params)
        format.html { redirect_to @associated_trial, notice: 'Associated trial was successfully updated.' }
        format.json { render :show, status: :ok, location: @associated_trial }
      else
        format.html { render :edit }
        format.json { render json: @associated_trial.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /associated_trials/1
  # DELETE /associated_trials/1.json
  def destroy
    @associated_trial.destroy
    respond_to do |format|
      format.html { redirect_to associated_trials_url, notice: 'Associated trial was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_associated_trial
      @associated_trial = AssociatedTrial.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def associated_trial_params
      params.require(:associated_trial).permit(:trial_identifier, :identifier_type_id, :trial_id, :official_title, :lock_version, :research_category_name)
    end

end
