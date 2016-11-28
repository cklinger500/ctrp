class SubmissionMethodsController < ApplicationController
  before_action :set_submission_method, only: [:show, :edit, :update, :destroy]

  # GET /submission_methods
  # GET /submission_methods.json
  def index
    @submission_methods = SubmissionMethod.all
  end

  # GET /submission_methods/1
  # GET /submission_methods/1.json
  def show
  end

  # GET /submission_methods/new
  def new
    @submission_method = SubmissionMethod.new
  end

  # GET /submission_methods/1/edit
  def edit
  end

  # POST /submission_methods
  # POST /submission_methods.json
  def create
    @submission_method = SubmissionMethod.new(submission_method_params)

    respond_to do |format|
      if @submission_method.save
        format.html { redirect_to @submission_method, notice: 'Submission method was successfully created.' }
        format.json { render :show, status: :created, location: @submission_method }
      else
        format.html { render :new }
        format.json { render json: @submission_method.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /submission_methods/1
  # PATCH/PUT /submission_methods/1.json
  def update
    respond_to do |format|
      if @submission_method.update(submission_method_params)
        format.html { redirect_to @submission_method, notice: 'Submission method was successfully updated.' }
        format.json { render :show, status: :ok, location: @submission_method }
      else
        format.html { render :edit }
        format.json { render json: @submission_method.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /submission_methods/1
  # DELETE /submission_methods/1.json
  def destroy
    @submission_method.destroy
    respond_to do |format|
      format.html { redirect_to submission_methods_url, notice: 'Submission method was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_submission_method
      @submission_method = SubmissionMethod.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def submission_method_params
      params.require(:submission_method).permit(:code, :name)
    end
end
