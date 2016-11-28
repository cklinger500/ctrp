class OnholdReasonsController < ApplicationController
  before_action :set_onhold_reason, only: [:show, :edit, :update, :destroy]

  # GET /onhold_reasons
  # GET /onhold_reasons.json
  def index
    @onhold_reasons = OnholdReason.all
  end

  # GET /onhold_reasons/1
  # GET /onhold_reasons/1.json
  def show
  end

  # GET /onhold_reasons/new
  def new
    @onhold_reason = OnholdReason.new
  end

  # GET /onhold_reasons/1/edit
  def edit
  end

  # POST /onhold_reasons
  # POST /onhold_reasons.json
  def create
    @onhold_reason = OnholdReason.new(onhold_reason_params)

    respond_to do |format|
      if @onhold_reason.save
        format.html { redirect_to @onhold_reason, notice: 'Onhold reason was successfully created.' }
        format.json { render :show, status: :created, location: @onhold_reason }
      else
        format.html { render :new }
        format.json { render json: @onhold_reason.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /onhold_reasons/1
  # PATCH/PUT /onhold_reasons/1.json
  def update
    respond_to do |format|
      if @onhold_reason.update(onhold_reason_params)
        format.html { redirect_to @onhold_reason, notice: 'Onhold reason was successfully updated.' }
        format.json { render :show, status: :ok, location: @onhold_reason }
      else
        format.html { render :edit }
        format.json { render json: @onhold_reason.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /onhold_reasons/1
  # DELETE /onhold_reasons/1.json
  def destroy
    @onhold_reason.destroy
    respond_to do |format|
      format.html { redirect_to onhold_reasons_url, notice: 'Onhold reason was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_onhold_reason
      @onhold_reason = OnholdReason.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def onhold_reason_params
      params.require(:onhold_reason).permit(:name, :code)
    end
end
