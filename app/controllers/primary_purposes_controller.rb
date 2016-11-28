class PrimaryPurposesController < ApplicationController
  before_action :set_primary_purpose, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /primary_purposes
  # GET /primary_purposes.json
  def index
    @primary_purposes = PrimaryPurpose.all
  end

  # GET /primary_purposes/1
  # GET /primary_purposes/1.json
  def show
  end

  # GET /primary_purposes/new
  def new
    @primary_purpose = PrimaryPurpose.new
  end

  # GET /primary_purposes/1/edit
  def edit
  end

  # POST /primary_purposes
  # POST /primary_purposes.json
  def create
    @primary_purpose = PrimaryPurpose.new(primary_purpose_params)

    respond_to do |format|
      if @primary_purpose.save
        format.html { redirect_to @primary_purpose, notice: 'Primary purpose was successfully created.' }
        format.json { render :show, status: :created, location: @primary_purpose }
      else
        format.html { render :new }
        format.json { render json: @primary_purpose.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /primary_purposes/1
  # PATCH/PUT /primary_purposes/1.json
  def update
    respond_to do |format|
      if @primary_purpose.update(primary_purpose_params)
        format.html { redirect_to @primary_purpose, notice: 'Primary purpose was successfully updated.' }
        format.json { render :show, status: :ok, location: @primary_purpose }
      else
        format.html { render :edit }
        format.json { render json: @primary_purpose.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /primary_purposes/1
  # DELETE /primary_purposes/1.json
  def destroy
    @primary_purpose.destroy
    respond_to do |format|
      format.html { redirect_to primary_purposes_url, notice: 'Primary purpose was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_primary_purpose
      @primary_purpose = PrimaryPurpose.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def primary_purpose_params
      params.require(:primary_purpose).permit(:code, :name)
    end
end
