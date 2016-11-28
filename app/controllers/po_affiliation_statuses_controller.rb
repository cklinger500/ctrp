class PoAffiliationStatusesController < ApplicationController
  before_action :set_po_affiliation_status, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /po_affiliation_statuses
  # GET /po_affiliation_statuses.json
  def index
    @po_affiliation_statuses = PoAffiliationStatus.all
  end

  # GET /po_affiliation_statuses/1
  # GET /po_affiliation_statuses/1.json
  def show
  end

  # GET /po_affiliation_statuses/new
  def new
    @po_affiliation_status = PoAffiliationStatus.new
  end

  # GET /po_affiliation_statuses/1/edit
  def edit
  end

  # POST /po_affiliation_statuses
  # POST /po_affiliation_statuses.json
  def create
    @po_affiliation_status = PoAffiliationStatus.new(po_affiliation_status_params)

    respond_to do |format|
      if @po_affiliation_status.save
        format.html { redirect_to @po_affiliation_status, notice: 'Po affiliation status was successfully created.' }
        format.json { render :show, status: :created, location: @po_affiliation_status }
      else
        format.html { render :new }
        format.json { render json: @po_affiliation_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /po_affiliation_statuses/1
  # PATCH/PUT /po_affiliation_statuses/1.json
  def update
    respond_to do |format|
      if @po_affiliation_status.update(po_affiliation_status_params)
        format.html { redirect_to @po_affiliation_status, notice: 'Po affiliation status was successfully updated.' }
        format.json { render :show, status: :ok, location: @po_affiliation_status }
      else
        format.html { render :edit }
        format.json { render json: @po_affiliation_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /po_affiliation_statuses/1
  # DELETE /po_affiliation_statuses/1.json
  def destroy
    @po_affiliation_status.destroy
    respond_to do |format|
      format.html { redirect_to po_affiliation_statuses_url, notice: 'Po affiliation status was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_po_affiliation_status
      @po_affiliation_status = PoAffiliationStatus.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def po_affiliation_status_params
      params[:po_affiliation_status]
    end
end
