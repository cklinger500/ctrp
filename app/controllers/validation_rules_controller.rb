class ValidationRulesController < ApplicationController
  before_action :set_validation_rule, only: [:show, :edit, :update, :destroy]

  # GET /validation_rules
  # GET /validation_rules.json
  def index
    @validation_rules = ValidationRule.all
  end

  # GET /validation_rules/1
  # GET /validation_rules/1.json
  def show
  end

  # GET /validation_rules/new
  def new
    @validation_rule = ValidationRule.new
  end

  # GET /validation_rules/1/edit
  def edit
  end

  # POST /validation_rules
  # POST /validation_rules.json
  def create
    @validation_rule = ValidationRule.new(validation_rule_params)

    respond_to do |format|
      if @validation_rule.save
        format.html { redirect_to @validation_rule, notice: 'Validation rule was successfully created.' }
        format.json { render :show, status: :created, location: @validation_rule }
      else
        format.html { render :new }
        format.json { render json: @validation_rule.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /validation_rules/1
  # PATCH/PUT /validation_rules/1.json
  def update
    respond_to do |format|
      if @validation_rule.update(validation_rule_params)
        format.html { redirect_to @validation_rule, notice: 'Validation rule was successfully updated.' }
        format.json { render :show, status: :ok, location: @validation_rule }
      else
        format.html { render :edit }
        format.json { render json: @validation_rule.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /validation_rules/1
  # DELETE /validation_rules/1.json
  def destroy
    @validation_rule.destroy
    respond_to do |format|
      format.html { redirect_to validation_rules_url, notice: 'Validation rule was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def validate_trial
    trial_id = params[:trial_id]
    @trial = Trial.find(trial_id)
    trial_service = TrialService.new({trial: @trial})
    @results = trial_service.validate_abstraction()
    respond_to do |format|
      #@trial = Trial.find(1)
      format.json { render :json => @results }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_validation_rule
      @validation_rule = ValidationRule.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def validation_rule_params
      params[:validation_rule]
    end
end
