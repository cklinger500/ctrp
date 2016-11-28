class CtGovImportExportsController < ApplicationController
  before_action :set_ct_gov_import_export, only: [:show, :edit, :update, :destroy]

  # GET /ct_gov_import_exports
  # GET /ct_gov_import_exports.json
  def index
    @ct_gov_import_exports = CtGovImportExport.all
  end

  # GET /ct_gov_import_exports/1
  # GET /ct_gov_import_exports/1.json
  def show
  end

  # GET /ct_gov_import_exports/new
  def new
    @ct_gov_import_export = CtGovImportExport.new
  end

  # GET /ct_gov_import_exports/1/edit
  def edit
  end

  # POST /ct_gov_import_exports
  # POST /ct_gov_import_exports.json
  def create
    @ct_gov_import_export = CtGovImportExport.new(ct_gov_import_export_params)

    respond_to do |format|
      if @ct_gov_import_export.save
        format.html { redirect_to @ct_gov_import_export, notice: 'Ct gov import export was successfully created.' }
        format.json { render :show, status: :created, location: @ct_gov_import_export }
      else
        format.html { render :new }
        format.json { render json: @ct_gov_import_export.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ct_gov_import_exports/1
  # PATCH/PUT /ct_gov_import_exports/1.json
  def update
    respond_to do |format|
      if @ct_gov_import_export.update(ct_gov_import_export_params)
        format.html { redirect_to @ct_gov_import_export, notice: 'Ct gov import export was successfully updated.' }
        format.json { render :show, status: :ok, location: @ct_gov_import_export }
      else
        format.html { render :edit }
        format.json { render json: @ct_gov_import_export.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ct_gov_import_exports/1
  # DELETE /ct_gov_import_exports/1.json
  def destroy
    @ct_gov_import_export.destroy
    respond_to do |format|
      format.html { redirect_to ct_gov_import_exports_url, notice: 'Ct gov import export was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ct_gov_import_export
      @ct_gov_import_export = CtGovImportExport.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ct_gov_import_export_params
      params.fetch(:ct_gov_import_export, {})
    end
end
