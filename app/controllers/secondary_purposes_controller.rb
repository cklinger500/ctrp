class SecondaryPurposesController < ApplicationController
  before_action :set_secondary_purpose, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /secondary_purposes
  # GET /secondary_purposes.json
  def index
    @secondary_purposes = SecondaryPurpose.all
  end

  # GET /secondary_purposes/1
  # GET /secondary_purposes/1.json
  def show
  end

  # GET /secondary_purposes/new
  def new
    @secondary_purpose = SecondaryPurpose.new
  end

  # GET /secondary_purposes/1/edit
  def edit
  end

  # POST /secondary_purposes
  # POST /secondary_purposes.json
  def create
    @secondary_purpose = SecondaryPurpose.new(secondary_purpose_params)

    respond_to do |format|
      if @secondary_purpose.save
        format.html { redirect_to @secondary_purpose, notice: 'Secondary purpose was successfully created.' }
        format.json { render :show, status: :created, location: @secondary_purpose }
      else
        format.html { render :new }
        format.json { render json: @secondary_purpose.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /secondary_purposes/1
  # PATCH/PUT /secondary_purposes/1.json
  def update
    respond_to do |format|
      if @secondary_purpose.update(secondary_purpose_params)
        format.html { redirect_to @secondary_purpose, notice: 'Secondary purpose was successfully updated.' }
        format.json { render :show, status: :ok, location: @secondary_purpose }
      else
        format.html { render :edit }
        format.json { render json: @secondary_purpose.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /secondary_purposes/1
  # DELETE /secondary_purposes/1.json
  def destroy
    @secondary_purpose.destroy
    respond_to do |format|
      format.html { redirect_to secondary_purposes_url, notice: 'Secondary purpose was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_secondary_purpose
      @secondary_purpose = SecondaryPurpose.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def secondary_purpose_params
      params.require(:secondary_purpose).permit(:code, :name)
    end
end
