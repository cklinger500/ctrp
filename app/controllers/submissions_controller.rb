class SubmissionsController < ApplicationController
  before_action :set_submission, only: [:show, :edit, :update, :destroy]

  @@impTrial = InternalSource.find_by_code('IMP').id
  @@proTrial = InternalSource.find_by_code('PRO').id

  # GET /submissions
  # GET /submissions.json
  def index
    @submissions = Submission.all
  end

  # GET /submissions/1
  # GET /submissions/1.json
  def show
  end

  # GET /submissions/new
  def new
    @submission = Submission.new
  end

  # GET /submissions/1/edit
  def edit
  end

  # POST /submissions
  # POST /submissions.json
  def create
    @submission = Submission.new(submission_params)

    respond_to do |format|
      if @submission.save
        format.html { redirect_to @submission, notice: 'Sub group was successfully created.' }
        format.json { render :show, status: :created, location: @submission }
      else
        format.html { render :new }
        format.json { render json: @submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /submissions/1
  # PATCH/PUT /submissions/1.json
  def update
    respond_to do |format|
      if @submission.update(submission_params)
        format.html { redirect_to @submission, notice: 'Submission was successfully updated.' }
        format.json { render :show, status: :ok, location: @submission }
      else
        format.html { render :edit }
        format.json { render json: @submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /submissions/1
  # DELETE /submissions/1.json
  def destroy
    @submission.destroy
    respond_to do |format|
      format.html { redirect_to submissions_url, notice: 'Submission was successfully destroyed.' }
      format.json { head :no_content }
    end
  end



  # GET /user_trial_submissions/search.json
  def search

    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    if params[:sort].blank?
      params[:sort] = 'submission_received_date'
    elsif params[:sort] == 'business_days_since_submitted'
      params[:sort] = 'submission_received_date'
      if params[:order].downcase == 'asc'
        params[:order] = 'desc'
      elsif params[:order].downcase == 'desc'
        params[:order] = 'asc'
      end
    end
    params[:order] = 'asc' if params[:order].blank?

    @trial_submissions = Submission.matchesTrialSubmissions(params, @@impTrial, @@proTrial)
    @trial_submissions = get_onhold_statuses @trial_submissions, params[:onhold_statuses]
    @trial_submissions = get_submission_types_requested @trial_submissions, params[:submission_types]
    @trial_submissions = get_check_box_selections @trial_submissions, params[:onhold_statuses_reasons], "onhold_code = '{selected}'"
    @trial_submissions = get_check_box_selections @trial_submissions, params[:trial_milestone_dates], "latest_milestones.{selected} IS NOT NULL"
    @trial_submissions = get_check_box_selections @trial_submissions, params[:trial_milestone_dates], "latest_milestones.{selected} IS NOT NULL"
    @trial_submissions = get_check_box_selections @trial_submissions, params[:current_process_statuses], "latest_milestones.current_processing_status_code = '{selected}'"

    @userReadAccess  = userReadAccess  current_site_user
    @userWriteAccess = userWriteAccess current_site_user
    unless @userReadAccess == false && @userWriteAccess == false
      @trial_submissions = @trial_submissions.order("#{params[:sort]} #{params[:order]}")
      unless params[:rows].nil?
        @trial_submissions = @trial_submissions.page(params[:start]).per(params[:rows])
      end
    end

    @searchAccess = true
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_submission
    @submission = Submission.find(params[:id])
  end

  def get_onhold_statuses submissions, onhold_statuses_requested
    if !onhold_statuses_requested.blank?

      ## note here that actual date comparisons are done in model. All dates are active dates
      ## meaning offhold_dates and onhold_dates are not future dates
      not_currently_onhold_query = "(trial_onholds.onhold_date IS NULL OR trial_onholds.offhold_date IS NOT NULL)"
      ever_onhold_query = "(trial_onholds.onhold_date IS NOT NULL)"

      conditions = []
      if onhold_statuses_requested[:onhold]
        conditions.push("NOT #{not_currently_onhold_query}")
      end
      if onhold_statuses_requested[:not_onhold]
        conditions.push("#{not_currently_onhold_query}")
      end
      if onhold_statuses_requested[:ever_onhold]
        conditions.push("#{ever_onhold_query}")
      end
      submissions = submissions.where(conditions.join(" OR "))
    end
    return submissions
  end

  def get_submission_types_requested submissions, submission_types_requested
    if !submission_types_requested.blank?
      conditions = []
      if submission_types_requested[:amendment]
        conditions.push("(trials.internal_source_id = #{@@proTrial} AND submissions.submission_num > 1)")
      end
      if submission_types_requested[:original]
        conditions.push("(trials.internal_source_id = #{@@proTrial} AND submissions.submission_num = 1)")
      end
      if submission_types_requested[:update]
        conditions.push("(trials.internal_source_id = #{@@impTrial})")
      end
      submissions = submissions.where(conditions.join(" OR "))
    end
    return submissions
  end

  def get_check_box_selections submissions, selections, db_code
    if !selections.blank?
      conditions = []
      selections.select {|_k,v| v == true}.keys.each do  |selection|
        conditions.push("(#{db_code.dup.sub! '{selected}', selection})")
      end
      submissions = submissions.where(conditions.join(" OR "))
    end
    return submissions
  end

  def current_site_user
    user = nil
    auth_string = request.headers['Authorization']
    if !auth_string.blank?
      token = auth_string.split(" ")[1]
      user_id = decode_token(token)
      user = User.find(user_id)
    end
    user
  end

  def userReadAccess userToUpdate
    user = current_site_user
    write_access = userWriteAccess user
    user && userToUpdate ? (user.role == 'ROLE_RO' || write_access)  : false
  end

  def userWriteAccess userToUpdate
    rolesAllow = ['ROLE_ADMIN','ROLE_ACCOUNT-APPROVER','ROLE_ABSTRACTOR','ROLE_SUPER']
    user = current_site_user
    user && userToUpdate ? (rolesAllow.include? user.role) : false
  end

  def searchAccess
    rolesAllow = ['ROLE_RO','ROLE_ADMIN','ROLE_ACCOUNT-APPROVER','ROLE_ABSTRACTOR','ROLE_SUPER']
    user = current_site_user
    user ? ( (rolesAllow.include? user.role)  || (isSiteAdminForOrg user, user.organization_id) ) : false
  end

  def isSiteAdminForOrg user, orgId
    family = FamilyMembership.find_by_organization_id(orgId)
    if family
      org_users = User.family_unexpired_matches_by_org(orgId)
    else
      org_users = User.matches('organization_id', orgId)
    end
    user_found = org_users.find_by_id user.id
    user_found && user_found.role == "ROLE_SITE-SU"
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def submission_params
    params[:submission].permit(:id,:amendment_num,:amendment_date,:amendment_reason_id,:acknowledge,:acknowledge_comment, :owner_user_id,
    :expected_abstraction_completion_date,:expected_abstraction_completion_date_comments,:acknowledge_date,:acknowledged_by,:business_days_since_submitted )
  end
end
