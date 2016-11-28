class EvaluationTypesController < ApplicationController
  before_action :set_evaluation_type, only: [:show, :edit, :update, :destroy]

  # GET /evaluation_types
  # GET /evaluation_types.json
  def index
    @evaluation_types = EvaluationType.all.order(:id)
  end

  # GET /evaluation_types/1
  # GET /evaluation_types/1.json
  def show
  end

  # GET /evaluation_types/new
  def new
    @evaluation_type = EvaluationType.new
  end

  # GET /evaluation_types/1/edit
  def edit
  end

  # POST /evaluation_types
  # POST /evaluation_types.json
  def create
    @evaluation_type = EvaluationType.new(evaluation_type_params)

    respond_to do |format|
      if @evaluation_type.save
        format.html { redirect_to @evaluation_type, notice: 'Evaluation type was successfully created.' }
        format.json { render :show, status: :created, location: @evaluation_type }
      else
        format.html { render :new }
        format.json { render json: @evaluation_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /evaluation_types/1
  # PATCH/PUT /evaluation_types/1.json
  def update
    respond_to do |format|
      if @evaluation_type.update(evaluation_type_params)
        format.html { redirect_to @evaluation_type, notice: 'Evaluation type was successfully updated.' }
        format.json { render :show, status: :ok, location: @evaluation_type }
      else
        format.html { render :edit }
        format.json { render json: @evaluation_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /evaluation_types/1
  # DELETE /evaluation_types/1.json
  def destroy
    @evaluation_type.destroy
    respond_to do |format|
      format.html { redirect_to evaluation_types_url, notice: 'Evaluation type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_evaluation_type
      @evaluation_type = EvaluationType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def evaluation_type_params
      params[:evaluation_type]
    end
end
