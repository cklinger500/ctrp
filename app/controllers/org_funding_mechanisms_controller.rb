class OrgFundingMechanismsController < ApplicationController
  before_action :set_org_funding_mechanism, only: [:show, :edit, :update, :destroy]

  # GET /org_funding_mechanisms
  # GET /org_funding_mechanisms.json
  def index
    @org_funding_mechanisms = OrgFundingMechanism.all
  end

  # GET /org_funding_mechanisms/1
  # GET /org_funding_mechanisms/1.json
  def show
  end

  # GET /org_funding_mechanisms/new
  def new
    @org_funding_mechanism = OrgFundingMechanism.new
  end

  # GET /org_funding_mechanisms/1/edit
  def edit
  end

  # POST /org_funding_mechanisms
  # POST /org_funding_mechanisms.json
  def create
    @org_funding_mechanism = OrgFundingMechanism.new(org_funding_mechanism_params)

    respond_to do |format|
      if @org_funding_mechanism.save
        format.html { redirect_to @org_funding_mechanism, notice: 'Org funding mechanism was successfully created.' }
        format.json { render :show, status: :created, location: @org_funding_mechanism }
      else
        format.html { render :new }
        format.json { render json: @org_funding_mechanism.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /org_funding_mechanisms/1
  # PATCH/PUT /org_funding_mechanisms/1.json
  def update
    respond_to do |format|
      if @org_funding_mechanism.update(org_funding_mechanism_params)
        format.html { redirect_to @org_funding_mechanism, notice: 'Org funding mechanism was successfully updated.' }
        format.json { render :show, status: :ok, location: @org_funding_mechanism }
      else
        format.html { render :edit }
        format.json { render json: @org_funding_mechanism.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /org_funding_mechanisms/1
  # DELETE /org_funding_mechanisms/1.json
  def destroy
    @org_funding_mechanism.destroy
    respond_to do |format|
      format.html { redirect_to org_funding_mechanisms_url, notice: 'Org funding mechanism was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_org_funding_mechanism
      @org_funding_mechanism = OrgFundingMechanism.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def org_funding_mechanism_params
      params.fetch(:org_funding_mechanism, {})
    end
end
