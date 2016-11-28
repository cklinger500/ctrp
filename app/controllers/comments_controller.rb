class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?
  skip_authorize_resource :only => [:count, :comments_for_instance]

  # GET /comments
  # GET /comments.json
  def index
    comments = Comment.all
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
  end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # GET /comments/1/edit
  def edit
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment = Comment.new(comment_params)

    respond_to do |format|
      if @comment.save
        format.html { redirect_to @comment, notice: 'Comment was successfully created.' }
        format.json { render :show, status: :created, location: @comment }
      else
        format.html { render :new }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /comments/1
  # PATCH/PUT /comments/1.json
  def update
    respond_to do |format|
      if @comment.update(comment_params)
        format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
        format.json { render :show, status: :ok, location: @comment }
      else
        format.html { render :edit }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to comments_url, notice: 'Comment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  #GET a count of the comments for the given instance_uuid in url (field is optional in url)
  def count
    if !params.has_key?(:uuid) #instance_uuid
      num_comments = 0
    else
      comments = Comment.where("instance_uuid = ?", params[:uuid])
      comments = comments.matches('field', params[:field]) if params.has_key?(:field)
      num_comments = comments.size
    end
    respond_to do |format|
      format.json { render :json => {:count => num_comments} }
    end
  end

  #GET the comments for the given instance_uuid in url (field is optional in url)
  def comments_for_instance
    comments = []
    if params.has_key?(:uuid) #instance_uuid
      comments = Comment.where("instance_uuid = ?", params[:uuid])
      comments = comments.matches('field', params[:field]) if params.has_key?(:field)
      comments = comments.order('created_at DESC').all
    end

    respond_to do |format|
      format.json {render :json => {:comments => comments}}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:content, :instance_uuid, :username, :fullname, :model, :field, :parent_id)
    end
end
