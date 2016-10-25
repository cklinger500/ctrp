class ParticipatingSitesController < ApplicationController
  before_action :set_participating_site, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  before_action :set_paper_trail_whodunnit, only: [:create,:update, :destroy]

  # GET /participating_sites
  # GET /participating_sites.json
  def index
    @participating_sites = ParticipatingSite.all
  end

  # GET /participating_sites/1
  # GET /participating_sites/1.json
  def show
  end

  # GET /participating_sites/new
  def new
    @participating_site = ParticipatingSite.new
  end

  # GET /participating_sites/1/edit
  def edit
  end

  # POST /participating_sites
  # POST /participating_sites.json
  def create
    @participating_site = ParticipatingSite.new(participating_site_params)

    respond_to do |format|
      if @participating_site.save
        format.html { redirect_to @participating_site, notice: 'Participating site was successfully created.' }
        format.json { render :show, status: :created, location: @participating_site }
      else
        format.html { render :new }
        format.json { render json: @participating_site.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /participating_sites/1
  # PATCH/PUT /participating_sites/1.json
  def update
    respond_to do |format|
      if @participating_site.update(participating_site_params)
        format.html { redirect_to @participating_site, notice: 'Participating site was successfully updated.' }
        format.json { render :show, status: :ok, location: @participating_site }
      else
        format.html { render :edit }
        format.json { render json: @participating_site.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /participating_sites/1
  # DELETE /participating_sites/1.json
  def destroy
    @participating_site.site_rec_status_wrappers.delete_all
    @participating_site.participating_site_investigators.delete_all
    @participating_site.destroy
    respond_to do |format|
      format.html { redirect_to participating_sites_url, notice: 'Participating site was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def validate_status
    @validation_msgs = []
    transition_matrix = JSON.parse(AppSetting.find_by_code('SR_STATUS_TRANSITION').big_value)
    statuses = params['statuses']

    if statuses.present? && statuses.size > 0
      statuses.each_with_index do |e, i|
        if i == 0
          from_status_code = 'STATUSZERO'
        else
          from_status_code = statuses[i - 1]['sr_status_code']
        end
        to_status_code = statuses[i]['sr_status_code']

        # Flag that indicates if the two status dates are the same
        if from_status_code == 'STATUSZERO'
          same_date = false
        else
          same_date = statuses[i - 1]['status_date'] == statuses[i]['status_date']
        end

        validation_msg = convert_validation_msg(transition_matrix[from_status_code][to_status_code], from_status_code, to_status_code, same_date)
        @validation_msgs.append(validation_msg)
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_participating_site
      @participating_site = ParticipatingSite.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def participating_site_params
      params[:participating_site].permit(:protocol_id, :program_code, :local_trial_identifier, :contact_name, :contact_phone, :contact_email, :contact_type, :extension, :trial_id, :organization_id, :person_id,
                                         site_rec_status_wrappers_attributes: [:id, :status_date, :site_recruitment_status_id, :comments, :_destroy],
                                         participating_site_investigators_attributes: [:id, :participating_site_id, :person_id, :set_as_contact, :investigator_type, :_destroy])
    end

  # Convert status code to name in validation messages
  def convert_validation_msg (msg, from_status_code, to_status_code, same_date)
    if msg.has_key?('warnings')
      msg['warnings'].each do |warning|
        statusObj = SiteRecruitmentStatus.find_by_code(warning['status']) if warning.has_key?('status')
        warning['status'] = statusObj.name if statusObj.present?

        if warning.has_key?('message')
          if warning['message'] == 'Invalid Transition'
            fromStatusObj = TrialStatus.find_by_code(from_status_code)
            warning['from'] = fromStatusObj.name if fromStatusObj.present?
            toStatusObj = TrialStatus.find_by_code(to_status_code)
            warning['to'] = toStatusObj.name if toStatusObj.present?
          elsif warning['message'] == 'Duplicate'
            dupStatusObj = TrialStatus.find_by_code(from_status_code)
            warning['dupStatus'] = dupStatusObj.name if dupStatusObj.present?
          elsif warning['message'] == 'Same Day'
            fromStatusObj = TrialStatus.find_by_code(from_status_code)
            warning['from'] = fromStatusObj.name if fromStatusObj.present?
            toStatusObj = TrialStatus.find_by_code(to_status_code)
            warning['to'] = toStatusObj.name if toStatusObj.present?
            warning['sameDate'] = same_date
          end
        end
      end
    end

    if msg.has_key?('errors')
      msg['errors'].each do |error|
        statusObj = SiteRecruitmentStatus.find_by_code(error['status']) if error.has_key?('status')
        error['status'] = statusObj.name if statusObj.present?

        if error.has_key?('message')
          if error['message'] == 'Invalid Transition'
            fromStatusObj = TrialStatus.find_by_code(from_status_code)
            error['from'] = fromStatusObj.name if fromStatusObj.present?
            toStatusObj = TrialStatus.find_by_code(to_status_code)
            error['to'] = toStatusObj.name if toStatusObj.present?
          elsif error['message'] == 'Duplicate'
            dupStatusObj = TrialStatus.find_by_code(from_status_code)
            error['dupStatus'] = dupStatusObj.name if dupStatusObj.present?
          end
        end
      end
    end

    return msg
  end
end
