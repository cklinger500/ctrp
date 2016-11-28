class CadsrMarkersController < ApplicationController
  before_action :set_marker_cadsr, only: [:show, :edit, :update, :destroy]

  # GET /marker_cadsrs
  # GET /marker_cadsrs.json
  def index
    @cadsr_markers = CadsrMarker.all
  end

  # GET /marker_cadsrs/1
  # GET /marker_cadsrs/1.json
  def show
  end

  # GET /marker_cadsrs/new
  def new
    @cadsr_marker = CadsrMarker.new
  end

  # GET /marker_cadsrs/1/edit
  def edit
  end

  # POST /marker_cadsrs
  # POST /marker_cadsrs.json
  def create
    @cadsr_marker = CadsrMarker.new(marker_cadsr_params)

    respond_to do |format|
      if @cadsr_marker.save
        format.html { redirect_to @cadsr_marker, notice: 'Marker cadsr was successfully created.' }
        format.json { render :show, status: :created, location: @cadsr_marker }
      else
        format.html { render :new }
        format.json { render json: @cadsr_marker.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /marker_cadsrs/1
  # PATCH/PUT /marker_cadsrs/1.json
  def update
    respond_to do |format|
      if @cadsr_marker.update(marker_cadsr_params)
        format.html { redirect_to @cadsr_marker, notice: 'Marker cadsr was successfully updated.' }
        format.json { render :show, status: :ok, location: @cadsr_marker }
      else
        format.html { render :edit }
        format.json { render json: @cadsr_marker.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /marker_cadsrs/1
  # DELETE /marker_cadsrs/1.json
  def destroy
    @cadsr_marker.destroy
    respond_to do |format|
      format.html { redirect_to marker_cadsrs_url, notice: 'Marker cadsr was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def search

    pv_name = params[:pv_name]
    highlight_query_text = params[:highlight_query_text]
    case_sensitive_search =  params[:case_sensitive_search]
    cadsr_id = params[:public_id]

    p pv_name
    p highlight_query_text
    p case_sensitive_search
    p cadsr_id
    p "true" if Integer("123") rescue nil?


    @cadsr_markers=CadsrMarker.all

    if (!cadsr_id.nil? && cadsr_id !="")
      p "cadsr_id is not nil"
       p cadsr_id
      if (Integer(cadsr_id) rescue nil?)
        @cadsr_markers=@cadsr_markers.matches('cadsr_id',cadsr_id)
      else
       @cadsr_markers=[]
      end
    end


    if(!pv_name.nil? && pv_name !="" && !@cadsr_markers.nil? && @cadsr_markers.length > 0)
      @cadsr_markers = matches_wc(@cadsr_markers, 'pv_name', pv_name,case_sensitive_search)
    end

    if (@cadsr_markers.nil? )
        @cadsr_markers=[];
    end








    # @cadsr_markers =CadsrMarker.where("pv_name = ? ", pv_name) #params[:trial_id],start_date,end_date).order('created_at desc')

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_marker_cadsr
      @cadsr_marker = CadsrMarker.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def marker_cadsr_params
      params.require(:marker_cadsr).permit(:name, :meaning, :description, :cadsr_id, :source_status_id, :nv_term_identifier, :pv_name)
    end
end
