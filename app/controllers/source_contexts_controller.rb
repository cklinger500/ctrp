class SourceContextsController < ApplicationController
  before_action :set_source_context, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /source_contexts
  # GET /source_contexts.json
  def index
    #TODO need to use constant for ROLE_CURATOR and ROLE_SUPER
    if User.org_write_access(@current_user)
       @source_contexts = SourceContext.all
    else
      #TODO need to use constant for 'CTRP'
      @source_contexts = [SourceContext.find_by_code("CTRP")]
    end
  end

  # GET /source_contexts/1
  # GET /source_contexts/1.json
  def show
  end

  # GET /source_contexts/new
  def new
    @source_context = SourceContext.new
  end

  # GET /source_contexts/1/edit
  def edit
  end

  # POST /source_contexts
  # POST /source_contexts.json
  def create
    @source_context = SourceContext.new(source_context_params)

    respond_to do |format|
      if @source_context.save
        format.html { redirect_to @source_context, notice: 'Source context was successfully created.' }
        format.json { render :show, status: :created, location: @source_context }
      else
        format.html { render :new }
        format.json { render json: @source_context.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /source_contexts/1
  # PATCH/PUT /source_contexts/1.json
  def update
    respond_to do |format|
      if @source_context.update(source_context_params)
        format.html { redirect_to @source_context, notice: 'Source context was successfully updated.' }
        format.json { render :show, status: :ok, location: @source_context }
      else
        format.html { render :edit }
        format.json { render json: @source_context.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /source_contexts/1
  # DELETE /source_contexts/1.json
  def destroy
    @source_context.destroy
    respond_to do |format|
      format.html { redirect_to source_contexts_url, notice: 'Source context was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_source_context
      @source_context = SourceContext.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def source_context_params
      params.require(:source_context).permit(:code, :name)
    end
end
