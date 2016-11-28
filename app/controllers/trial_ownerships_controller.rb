class TrialOwnershipsController < ApplicationController
  #before_action :set_trial_ownership, only: [:show, :edit, :update, :destroy]

  # GET /trial_ownerships
  # GET /trial_ownerships.json
  def index
    @trial_ownerships = TrialOwnership.all
    @trial_ownerships = @trial_ownerships.matches()
    @trial_ownerships
  end


  # GET /trial_ownerships/search.json
  def search
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:sort] = 'nci_id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?
    @trial_ownerships = []
    if params[:user_id].present?
      @trial_ownerships = TrialOwnership.matches('user_id', params[:user_id]) if params[:user_id].present?
      @trial_ownerships = @trial_ownerships.matches('internal_source_id', InternalSource.find_by_code('PRO').id)
      @trial_ownerships = @trial_ownerships.order("#{params[:sort]} #{params[:order]}")
      unless params[:rows].nil?
        @trial_ownerships = @trial_ownerships.page(params[:start]).per(params[:rows])
      end
    end
  end

  # GET /trial_documents/1
  # GET /trial_ownerships/1.json
  def show
  end

  # GET /trial_ownerships/new
  def new
    @trial_ownerships = TrialOwnership.new
  end

  # GET /trial_ownerships/1/edit
  def edit
  end

  # POST /trial_ownerships/add
  # POST /trial_ownerships/add.json
  def add
    trialIdsToAdd = params[:trial_ids]
    userIdsToAdd = params[:user_ids]
    @results_msgs = {}

    @results_msgs[:complete] = false

    if trialIdsToAdd && trialIdsToAdd.length > 0 && userIdsToAdd && userIdsToAdd.length > 0
      addOwners userIdsToAdd, trialIdsToAdd, @results_msgs
    end

    @results_msgs[:complete] = true
  end

  # POST /trial_ownerships/end
  # POST /trial_ownerships/end.json
  def end
    @results_msgs = 'fail'

      #for single user
      unless params[:user_id].nil?
        toEnd = TrialOwnership.where(:ended_at => nil, :user_id => params[:user_id])
      end

      #for group of users
      unless params[:user_ids].nil?
        toEnd = TrialOwnership.where(:ended_at => nil, :user_id => params[:user_ids])
      end

      #for selected trials using ownership id
      unless params[:ids].nil?
        #to only end selected
        toEnd = toEnd.where(:id => params[:ids])
      end

      #for selected trials trial id
      unless params[:trial_ids].nil?
        #to only end selected
        toEnd = toEnd.where(:trial_id => params[:trial_ids])
      end

      endSelected toEnd

      @results_msgs = 'success'

  end

  # POST /trial_ownerships
  # POST /trial_ownerships.json
  def create
    Rails.logger.info "params: #{params}"

    @trial_ownership = TrialOwnership.new(trial_ownership_params)

    respond_to do |format|
      if @trial_ownership.save
        format.html { redirect_to @trial_ownership, notice: 'Trial ownership was successfully created.' }
        format.json { render :show, status: :created, location: @trial_ownership }
      else
        format.html { render :new }
        format.json { render json: @trial_ownership.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /trial_ownerships/transfer
  # POST /trial_ownerships/transfer.json
  def transfer
    trialIdsToEnd = params[:ids]
    ownerUserId = params[:from_user_id]

    @results_msgs = {}
    if trialIdsToEnd && trialIdsToEnd.length > 0
      #transfer selected
      ownershipsToEnd = TrialOwnership.where(trial_id: trialIdsToEnd, user_id: ownerUserId)
      endSelected ownershipsToEnd
      addOwners params[:to_user_ids], trialIdsToEnd, @results_msgs
    elsif ownerUserId
      #transfer all
      ownershipsToEnd = TrialOwnership.where(user_id: ownerUserId, ended_at: nil)
      trial_ids = ownershipsToEnd.pluck(:trial_id)
      endSelected ownershipsToEnd
      addOwners params[:to_user_ids], trial_ids, @results_msgs

    end

    @results_msgs[:complete] = true
  end


  # PATCH/PUT /trial_ownerships/1
  # PATCH/PUT /trial_ownerships/1.json
  def update
    respond_to do |format|
      if @trial_ownership.update(trial_ownership_params)
        format.html { redirect_to @trial_ownership, notice: 'Trial ownership was successfully updated.' }
        format.json { render :show, status: :ok, location: @trial_ownership }
      else
        format.html { render :edit }
        format.json { render json: @trial_ownership.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trial_ownerships/1
  # DELETE /trial_ownerships/1.json
  def destroy
    @trial_ownership.destroy
    respond_to do |format|
      format.html { redirect_to trial_ownerships_url, notice: 'Trial ownership was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def send_emails template, user, trials
      unless !user.receive_email_notifications || user.nil? || trials.nil? || trials.length == 0
        email_trials_str = '<hr>'
        email_trials_str += '<table><tr><th style="width:200px; text-align:left;">NCI Trial ID:</th><th>Lead Organization Trial ID:</th></tr>'
        trials.each do |trialId|
          trial = Trial.find(trialId)
          email_trials_str += '<tr><td>' + trial.nci_id + '</td><td>' + trial.lead_org_id.to_s + '</td></tr>'
        end
        email_trials_str += '</table><hr>'

        mail_template = MailTemplate.find_by_code(template)
        mail_template.body_html.sub!('${username}', user.first_name + ' ' + user.last_name)
        mail_template.body_html.sub!('${trialcontent}', email_trials_str)
        mail_template.body_html.sub!('${date}', (Time.now).strftime('%v') )
        mail_template.to = user.email

        CtrpMailerWrapper.send_email(mail_template, nil)
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_trial_ownership
      @trial_ownership = TrialOwnership.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trial_ownership_params
      params.permit(:trial_id, :user_id)
    end

    def addOwners userIdsToAdd, trialIdsToAdd, resultsMsgs
      userIdsToAdd.each do |userId|
        resultsMsgs[:trialsAdded] = Array.new
        resultsMsgs[:trialsFailed] = Array.new

        trialIdsToAdd.each do |trialId|
          if !TrialOwnership.exists?(trial_id: trialId, user_id: userId, ended_at: nil) && Trial.find(trialId).is_rejected == false

            trial_ownership_params = {trial_id: trialId, user_id: userId}
            trial_ownership = TrialOwnership.new(trial_ownership_params)

            begin
              if trial_ownership.save
                resultsMsgs[:trialsAdded].push(trialId)
              else
                resultsMsgs[:trialsFailed].push(trialId)
              end
            rescue
              resultsMsgs[:trialsFailed].push(trialId)
            ensure
            end
          else
            resultsMsgs[:trialsFailed].push(trialId)
          end
          send_emails 'TRIAL_OWNER_ADD', User.find(userId), resultsMsgs[:trialsAdded]
        end
      end
    end
    def endSelected toEnd
      userowns = {}
      toEnd.each do |ownership|
        if userowns[ownership.user_id] == nil
          userowns[ownership.user_id] = []
        end
        userowns[ownership.user_id].push(ownership.trial_id)
      end

      userowns.keys.each do |user_id|
        send_emails 'TRIAL_OWNER_REMOVE', User.find(user_id), userowns[user_id]
      end

      toEnd.update_all(:ended_at => Time.current)
    end
end
