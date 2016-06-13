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

    @trial_ownerships = TrialOwnership.all
    @trial_ownerships = @trial_ownerships.matches('user_id', params[:user_id])
    @trial_ownerships = @trial_ownerships.order("#{params[:sort]} #{params[:order]}")
    unless params[:rows].nil?
      @trial_ownerships = @trial_ownerships.page(params[:start]).per(params[:rows])
    end
    @trial_ownerships
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

    if trialIdsToAdd && trialIdsToAdd.length > 0 && userIdsToAdd && userIdsToAdd.length > 0
      trialIdsToAdd.each do |trialId|
        userIdsToAdd.each do |userId|
          if !TrialOwnership.exists?(trial_id: trialId, user_id: userId, ended_at: nil)
            TrialOwnership.create(trial_id: trialId, user_id: userId)
          end
        end
      end
    end

    @results_msgs = 'success'
    @results_msgs
  end

  # POST /trial_ownerships/end
  # POST /trial_ownerships/end.json
  def end
    @results_msgs = 'fail'
    begin
      toEnd = TrialOwnership.where(:ended_at => nil, :user_id => params[:user_id])
      unless params[:ids].nil?
        #to only end selected
        toEnd = toEnd.where(:id => params[:ids])
      end
      toEnd.update_all(:ended_at => Time.now)
      @results_msgs = 'success'
    rescue
      puts "Error ending trial ownership"
    ensure
      @results_msgs
    end
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
    idsToEnd = params[:ids]
    ownerUserId = params[:from_user_id]
    if idsToEnd && idsToEnd.length > 0
      #transfer selected
      toEnd = TrialOwnership.where(id: idsToEnd)
      toEnd.update_all(:ended_at => Time.now)

      params[:transfers].each do |transfer|
        if !TrialOwnership.exists?(trial_id: transfer["trial_id"], user_id: transfer["user_id"], ended_at: nil)
          TrialOwnership.create(trial_id: transfer["trial_id"], user_id: transfer["user_id"])
        end
      end
    elsif ownerUserId
      #transfer all
      toEnd = TrialOwnership.where(user_id: ownerUserId, ended_at: nil)
      trialIds = toEnd.pluck(:trial_id)
      toEnd.update_all(:ended_at => Time.now)
      params[:transfers].each do |transfer|
        trialIds.each do |trial|
          if !TrialOwnership.exists?(trial_id: trial, user_id: transfer["user_id"], ended_at: nil)
            TrialOwnership.create(trial_id: trial, user_id: transfer["user_id"])
          end
        end
      end
    end

    @results_msgs = 'success'
    @results_msgs
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
    # Use callbacks to share common setup or constraints between actions.
    def set_trial_ownership
      @trial_ownership = TrialOwnership.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trial_ownership_params
      params.permit(:trial_id, :user_id)
    end
end
