class CtepOrgTypesController < ApplicationController
  before_action :set_ctep_org_type, only: [:show, :edit, :update, :destroy]

  # GET /ctep_org_types
  # GET /ctep_org_types.json
  def index
    @ctep_org_types = CtepOrgType.all
  end

  # GET /ctep_org_types/1
  # GET /ctep_org_types/1.json
  def show
  end

  # GET /ctep_org_types/new
  def new
    @ctep_org_type = CtepOrgType.new
  end

  # GET /ctep_org_types/1/edit
  def edit
  end

  # POST /ctep_org_types
  # POST /ctep_org_types.json
  def create
    @ctep_org_type = CtepOrgType.new(ctep_org_type_params)

    respond_to do |format|
      if @ctep_org_type.save
        format.html { redirect_to @ctep_org_type, notice: 'Ctep org type was successfully created.' }
        format.json { render :show, status: :created, location: @ctep_org_type }
      else
        format.html { render :new }
        format.json { render json: @ctep_org_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ctep_org_types/1
  # PATCH/PUT /ctep_org_types/1.json
  def update
    respond_to do |format|
      if @ctep_org_type.update(ctep_org_type_params)
        format.html { redirect_to @ctep_org_type, notice: 'Ctep org type was successfully updated.' }
        format.json { render :show, status: :ok, location: @ctep_org_type }
      else
        format.html { render :edit }
        format.json { render json: @ctep_org_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ctep_org_types/1
  # DELETE /ctep_org_types/1.json
  def destroy
    @ctep_org_type.destroy
    respond_to do |format|
      format.html { redirect_to ctep_org_types_url, notice: 'Ctep org type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ctep_org_type
      @ctep_org_type = CtepOrgType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ctep_org_type_params
      params.fetch(:ctep_org_type, {})
    end
end
