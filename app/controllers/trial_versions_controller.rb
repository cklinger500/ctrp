class TrialVersionsController < ApplicationController
  helper TrialVersionsHelper

#before_action :set_version, only: [:show,  :update, :destroy]

def diff
end

# GET /versions
# GET /versions.json
def index
  #@data_tables = ActiveRecord::Base.connection.tables
  #@model_options = @data_tables.map{|u| [ u ] }
  #@data_tables =TrialVersion.find_by_sql("select distinct item_type from trial_versions");
  #print @data_tables
  #@trial_versions = TrialVersion.find_by_sql("select distinct item_id,item_type from trial_versions order by item_type");
  @trial_versions = TrialVersion.all
  #respond_to do |format|
    #if @trial.save
      #format.html { redirect_to @versions, notice: 'Trial was successfully created.' }
     # format.json { render :show, status: :created, location: @versions }
    #else
     # format.html { render :new }
      #format.json { render json: @trial.errors, status: :unprocessable_entity }
    #end
end

# GET /versions/1
# GET /versions/1.json
def show
end

# DELETE /versions/1
# DELETE /versions/1.json
def destroy
  @version.destroy
  respond_to do |format|
    format.html { redirect_to versions_url, notice: 'Version was successfully destroyed.' }
    format.json { head :no_content }
  end
end


def history

  params[:start] = 1 if params[:start].blank?
  params[:rows]  = 20 if params[:rows].blank?
  params[:order] = 'asc' if params[:order].blank?

  params[:start_date].nil? ? start_date =nil : start_date = params[:start_date].to_date.beginning_of_day
  params[:end_date].nil? ? end_date=nil : end_date = params[:end_date].to_date.end_of_day

  @trial_versions =TrialVersion.where("item_type = ? AND item_id = ? and created_at BETWEEN ? AND ? ", "Trial",params[:trial_id],start_date,end_date).order('created_at desc') if start_date && end_date
  @trial_versions =TrialVersion.where("item_type = ? AND item_id = ? and created_at > ? ", "Trial",params[:trial_id],start_date).order('created_at desc') if start_date && !end_date
  @trial_versions =TrialVersion.where("item_type = ? AND item_id = ? and created_at < ? ", "Trial",params[:trial_id],end_date).order('created_at desc') if !start_date && end_date
  @trial_versions =TrialVersion.where("item_type = ? AND item_id = ?", "Trial", params[:trial_id]).order('created_at desc') if !start_date && !end_date

  @trial_versions = @trial_versions.page(params[:start]).per(params[:rows])


end

  def updates_history
  ##find all versions with given trial ; extract trial id and transaction id
  params[:start] = 1 if params[:start].blank?
  params[:rows]  = 10 if params[:rows].blank?

  submission_type= SubmissionType.find_by_code("UPD")

   @submissions =Submission.where("trial_id =? AND submission_type_id=? ", params[:trial_id],submission_type.id)
   @submissions = @submissions.page(params[:start]).per(params[:rows])

  #@trial_versions =TrialVersion.where("item_type = ? AND item_id = ? AND event=? ", "Trial",params[:trial_id], "update").order('created_at desc')

    ## find submission
  end

  def submissions_history

    params[:start] = 1 if params[:start].blank?
    params[:rows]  = 5 if params[:rows].blank?
    params[:sort]  = 'submission_num'
    params[:order] = 'asc' if params[:order].blank?


    @submissions =Submission.where("trial_id =? ", params[:trial_id]).order(updated_at: :DESC)
    #@submissions = @submissions.page(params[:start]).per(params[:rows])

    ##pagination
    @submissions = @submissions.group(:'submissions.id').page(params[:start]).per(params[:rows])

  end

private
# Use callbacks to share common setup or constraints between actions.
def set_version
 # @version = TrialVersion.find(params[:id])
end

# Never trust parameters from the scary internet, only allow the white list through.
def version_params
  params[:version]
end
end
