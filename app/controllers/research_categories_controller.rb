class ResearchCategoriesController < ApplicationController
  before_action :set_research_category, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /research_categories
  # GET /research_categories.json
  def index
    @research_categories = ResearchCategory.all
  end

  # GET /research_categories/1
  # GET /research_categories/1.json
  def show
  end

  # GET /research_categories/new
  def new
    @research_category = ResearchCategory.new
  end

  # GET /research_categories/1/edit
  def edit
  end

  # POST /research_categories
  # POST /research_categories.json
  def create
    @research_category = ResearchCategory.new(research_category_params)

    respond_to do |format|
      if @research_category.save
        format.html { redirect_to @research_category, notice: 'Research category was successfully created.' }
        format.json { render :show, status: :created, location: @research_category }
      else
        format.html { render :new }
        format.json { render json: @research_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /research_categories/1
  # PATCH/PUT /research_categories/1.json
  def update
    respond_to do |format|
      if @research_category.update(research_category_params)
        format.html { redirect_to @research_category, notice: 'Research category was successfully updated.' }
        format.json { render :show, status: :ok, location: @research_category }
      else
        format.html { render :edit }
        format.json { render json: @research_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /research_categories/1
  # DELETE /research_categories/1.json
  def destroy
    @research_category.destroy
    respond_to do |format|
      format.html { redirect_to research_categories_url, notice: 'Research category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_research_category
      @research_category = ResearchCategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def research_category_params
      params.require(:research_category).permit(:code, :name)
    end
end
