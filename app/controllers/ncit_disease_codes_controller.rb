class NcitDiseaseCodesController < ApplicationController
  before_action :set_ncit_disease_code, only: [:show, :edit, :update, :destroy]

  # GET /ncit_disease_codes
  # GET /ncit_disease_codes.json
  def index
    @ncit_disease_codes = NcitDiseaseCode.all
  end

  # GET /ncit_disease_codes/1
  # GET /ncit_disease_codes/1.json
  def show
  end

  # GET /ncit_disease_codes/new
  def new
    @ncit_disease_code = NcitDiseaseCode.new
  end

  # GET /ncit_disease_codes/1/edit
  def edit
  end

  # POST /ncit_disease_codes
  # POST /ncit_disease_codes.json
  def create
    @ncit_disease_code = NcitDiseaseCode.new(ncit_disease_code_params)

    respond_to do |format|
      if @ncit_disease_code.save
        format.html { redirect_to @ncit_disease_code, notice: 'Ncit disease code was successfully created.' }
        format.json { render :show, status: :created, location: @ncit_disease_code }
      else
        format.html { render :new }
        format.json { render json: @ncit_disease_code.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ncit_disease_codes/1
  # PATCH/PUT /ncit_disease_codes/1.json
  def update
    respond_to do |format|
      if @ncit_disease_code.update(ncit_disease_code_params)
        format.html { redirect_to @ncit_disease_code, notice: 'Ncit disease code was successfully updated.' }
        format.json { render :show, status: :ok, location: @ncit_disease_code }
      else
        format.html { render :edit }
        format.json { render json: @ncit_disease_code.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ncit_disease_codes/1
  # DELETE /ncit_disease_codes/1.json
  def destroy
    @ncit_disease_code.destroy
    respond_to do |format|
      format.html { redirect_to ncit_disease_codes_url, notice: 'Ncit disease code was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_tree
    if NcitDiseaseCode.exists?(params[:disease_id])
      @ncit_tree = generate_tree(NcitDiseaseCode.find(params[:disease_id]))
    else
      @ncit_tree = {}
    end
  end

  def search
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 20 if params[:rows].blank?
    params[:sort] = 'lead_protocol_id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if params[:disease_name].present?
      @diseases = NcitDiseaseCode.all
      @diseases = @diseases.with_name(params[:disease_name], params[:synonym]).group(:'ncit_disease_codes.id').order(:preferred_name).limit(300)
    else
      @diseases = []
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ncit_disease_code
      @ncit_disease_code = NcitDiseaseCode.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ncit_disease_code_params
      params.require(:ncit_disease_code).permit(:disease_code, :nt_term_id, :preferred_name, :menu_display_name)
    end

  # Generate tree given a node
  def generate_tree (current_disease)
    current_node = {id: current_disease.id, Name: current_disease.menu_display_name, nt_term_id: current_disease.nt_term_id, __children__: [], __expanded__: true}
    queue = Queue.new
    queue.push(current_node)
    path_arr = []

    while !queue.empty? do
      current_node = queue.pop
      current_disease = NcitDiseaseCode.find(current_node[:id])

      if current_disease.parents.length == 0
        # A complete path
        path_arr.append(current_node)
      else
        # For each parent, create a new path
        current_disease.parents.each do |parent|
          parent_node = {id: parent.id, Name: parent.menu_display_name, nt_term_id: parent.nt_term_id, __children__: [], __expanded__: true}
          # Make a deep copy before appending the child
          parent_node[:__children__].append(current_node.deep_dup)
          queue.push(parent_node)
        end
      end
    end

    # Get unique set of root nodes
    set = Set.new
    path_arr.each do |path|
      set.add(path[:id])
    end

    tree_arr = []
    set.each do |root_id|
      merged_path = {}
      path_arr.each do |path|
        if path[:id] == root_id
          merged_path = merge_two_path(merged_path, path)
        end
      end
      tree_arr.append(merged_path)
    end

    return tree_arr
  end

  # Merge two tree path with same root
  def merge_two_path (path1, path2)
    if path1.empty?
      return path2
    else
      # Save the root
      root_node = path1

      parent_node = path1
      path2 = get_first_child(path2)
      path1 = find_same_child(path1, path2)
      # Find the node where two paths diverge
      while path1.present? && path2.present? && path1[:id] == path2[:id]
        parent_node = path1
        path2 = get_first_child(path2)
        path1 = find_same_child(path1, path2)
      end
      # Two children diverge from the same parent
      parent_node[:__children__].append(path2)

      return root_node
    end
  end

  # Find the first child
  def get_first_child (node)
    if node[:__children__].length > 0
      return node[:__children__][0]
    else
      return nil
    end
  end

  # Find node2 in node1's children
  def find_same_child (node1, node2)
    node1[:__children__].each do |child|
      if child.present? && node2.present? && child[:id] == node2[:id]
        return child
      end
    end

    return nil
  end
end
