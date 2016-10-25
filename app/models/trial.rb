# == Schema Information
#
# Table name: trials
#
#  id                            :integer          not null, primary key
#  nci_id                        :string(255)
#  lead_protocol_id              :string(255)
#  official_title                :text
#  pilot                         :string(255)
#  primary_purpose_other         :string(255)
#  secondary_purpose_other       :text
#  program_code                  :string(255)
#  grant_question                :string(255)
#  start_date                    :date
#  start_date_qual               :string(255)
#  primary_comp_date             :date
#  primary_comp_date_qual        :string(255)
#  comp_date                     :date
#  comp_date_qual                :string(255)
#  ind_ide_question              :string(255)
#  intervention_indicator        :string(255)
#  sec801_indicator              :string(255)
#  data_monitor_indicator        :string(255)
#  history                       :json
#  study_source_id               :integer
#  phase_id                      :integer
#  primary_purpose_id            :integer
#  secondary_purpose_id          :integer
#  responsible_party_id          :integer
#  lead_org_id                   :integer
#  pi_id                         :integer
#  sponsor_id                    :integer
#  investigator_id               :integer
#  created_at                    :datetime         not null
#  updated_at                    :datetime
#  uuid                          :string(255)
#  lock_version                  :integer          default(0)
#  research_category_id          :integer
#  accrual_disease_term_id       :integer
#  investigator_title            :string(255)
#  investigator_aff_id           :integer
#  created_by                    :string(255)
#  updated_by                    :string(255)
#  is_draft                      :boolean
#  admin_checkout                :text
#  scientific_checkout           :text
#  check_in_comment              :text
#  process_priority              :string(255)
#  process_comment               :text
#  xml_required                  :string(255)
#  acronym                       :string(255)
#  keywords                      :text
#  nih_nci_div                   :string(255)
#  nih_nci_prog                  :string(255)
#  send_trial                    :string(255)
#  board_approval_num            :string(255)
#  brief_title                   :text
#  brief_summary                 :text
#  detailed_description          :text
#  objective                     :text
#  target_enrollment             :integer
#  final_enrollment              :integer
#  accruals                      :integer
#  accept_vol                    :string(255)
#  min_age                       :integer
#  max_age                       :integer
#  assigned_to_id                :integer
#  board_approval_status_id      :integer
#  intervention_model_id         :integer
#  masking_id                    :integer
#  allocation_id                 :integer
#  study_classification_id       :integer
#  gender_id                     :integer
#  min_age_unit_id               :integer
#  max_age_unit_id               :integer
#  num_of_arms                   :integer
#  verification_date             :date
#  sampling_method               :string(255)
#  study_pop_desc                :text
#  board_name                    :string(255)
#  board_affiliation_id          :integer
#  masking_role_caregiver        :boolean
#  masking_role_investigator     :boolean
#  masking_role_outcome_assessor :boolean
#  masking_role_subject          :boolean
#  study_model_other             :string(255)
#  time_perspective_other        :string(255)
#  study_model_id                :integer
#  time_perspective_id           :integer
#  biospecimen_retention_id      :integer
#  biospecimen_desc              :text
#  internal_source_id            :integer
#  nci_specific_comment          :string(4000)
#  send_trial_flag               :string
#  is_rejected                   :boolean
#
# Indexes
#
#  index_trials_on_accrual_disease_term_id   (accrual_disease_term_id)
#  index_trials_on_allocation_id             (allocation_id)
#  index_trials_on_assigned_to_id            (assigned_to_id)
#  index_trials_on_biospecimen_retention_id  (biospecimen_retention_id)
#  index_trials_on_board_affiliation_id      (board_affiliation_id)
#  index_trials_on_board_approval_status_id  (board_approval_status_id)
#  index_trials_on_gender_id                 (gender_id)
#  index_trials_on_internal_source_id        (internal_source_id)
#  index_trials_on_intervention_model_id     (intervention_model_id)
#  index_trials_on_investigator_aff_id       (investigator_aff_id)
#  index_trials_on_investigator_id           (investigator_id)
#  index_trials_on_lead_org_id               (lead_org_id)
#  index_trials_on_masking_id                (masking_id)
#  index_trials_on_max_age_unit_id           (max_age_unit_id)
#  index_trials_on_min_age_unit_id           (min_age_unit_id)
#  index_trials_on_phase_id                  (phase_id)
#  index_trials_on_pi_id                     (pi_id)
#  index_trials_on_primary_purpose_id        (primary_purpose_id)
#  index_trials_on_research_category_id      (research_category_id)
#  index_trials_on_responsible_party_id      (responsible_party_id)
#  index_trials_on_secondary_purpose_id      (secondary_purpose_id)
#  index_trials_on_sponsor_id                (sponsor_id)
#  index_trials_on_study_classification_id   (study_classification_id)
#  index_trials_on_study_model_id            (study_model_id)
#  index_trials_on_study_source_id           (study_source_id)
#  index_trials_on_time_perspective_id       (time_perspective_id)
#

class Trial < TrialBase
  include Filterable
  include TableLoggable
  include ActiveRecord::UnionScope

  # Disabled optimistic locking
  self.locking_column = :dummy_column

  belongs_to :study_source
  belongs_to :phase
  belongs_to :research_category
  belongs_to :primary_purpose
  belongs_to :secondary_purpose
  belongs_to :accrual_disease_term
  belongs_to :responsible_party
  belongs_to :lead_org, class_name: "Organization"
  belongs_to :pi, class_name: "Person"
  belongs_to :sponsor, class_name: "Organization"
  belongs_to :investigator, class_name: "Person"
  belongs_to :investigator_aff, class_name: "Organization"
  has_many :other_ids, -> { order 'other_ids.id' }
  has_many :ind_ides, -> { order 'ind_ides.id' }
  has_many :grants, -> { order 'grants.id' }
  has_many :trial_status_wrappers, -> { order 'trial_status_wrappers.status_date, trial_status_wrappers.id' }
  has_many :trial_funding_sources, -> { order 'trial_funding_sources.id' }
  has_many :funding_sources, through: :trial_funding_sources, source: :organization
  has_many :trial_co_lead_orgs
  has_many :co_lead_orgs, through: :trial_co_lead_orgs, source: :organization
  has_many :trial_co_pis
  has_many :co_pis, through: :trial_co_pis, source: :person
  has_many :oversight_authorities, -> { order 'oversight_authorities.id' }
  has_many :trial_documents, -> { order ('trial_documents.id desc') }
  has_many :mail_logs, -> { order 'mail_logs.id'}

  # PA fields
  belongs_to :assigned_to, class_name: "User"
  belongs_to :board_approval_status
  belongs_to :board_affiliation, class_name: "Organization"
  belongs_to :intervention_model
  belongs_to :masking
  belongs_to :allocation
  belongs_to :study_classification
  belongs_to :gender
  belongs_to :min_age_unit, class_name: "AgeUnit"
  belongs_to :max_age_unit, class_name: "AgeUnit"
  belongs_to :study_model
  belongs_to :time_perspective
  belongs_to :biospecimen_retention
  belongs_to :internal_source
  has_many :submissions, -> { order 'submissions.id' }
  has_many :milestone_wrappers, -> { order 'milestone_wrappers.id' }
  has_many :onholds, -> { order 'onholds.id' }
  has_many :associated_trials, -> { order 'associated_trials.id' }
  has_many :alternate_titles, -> { order 'alternate_titles.id' }
  has_many :central_contacts, -> { order 'central_contacts.id' }
  has_many :outcome_measures, -> { order 'outcome_measures.id' }
  has_many :other_criteria, -> { order 'other_criteria.id' }
  has_many :markers, -> { order 'markers.id' }
  has_many :interventions, -> { order 'interventions.id' }
  has_many :arms_groups, -> { order 'arms_groups.id' }
  has_many :sub_groups, -> { order 'sub_groups.id' }
  has_many :participating_sites, -> { order 'participating_sites.id' }
  has_many :ps_orgs, through: :participating_sites, source: :organization
  has_many :citations, -> { order 'citations.id' }
  has_many :links, -> { order 'links.id' }
  has_many :diseases, -> { order 'diseases.id' }
  has_many :processing_status_wrappers, -> { order 'processing_status_wrappers.id' }
  has_many :collaborators, -> { order 'collaborators.id' }
  has_many :trial_ownerships, -> { order 'trial_ownerships.id' }
  has_many :users, through: :trial_ownerships
  has_many :anatomic_site_wrappers, -> { order 'anatomic_site_wrappers.id' }
  has_many :trial_checkout_logs, -> { order 'trial_checkout_logs.id'}

  attr_accessor :edit_type
  attr_accessor :coming_from
  attr_accessor :current_user

  accepts_nested_attributes_for :interventions, allow_destroy: true
  accepts_nested_attributes_for :associated_trials, allow_destroy: true
  accepts_nested_attributes_for :arms_groups, allow_destroy: true
  accepts_nested_attributes_for :other_ids, allow_destroy: true
  accepts_nested_attributes_for :trial_funding_sources, allow_destroy: true
  accepts_nested_attributes_for :grants, allow_destroy: true
  accepts_nested_attributes_for :trial_status_wrappers, allow_destroy: true
  accepts_nested_attributes_for :ind_ides, allow_destroy: true
  accepts_nested_attributes_for :oversight_authorities, allow_destroy: true
  accepts_nested_attributes_for :trial_documents, allow_destroy: false
  accepts_nested_attributes_for :submissions, allow_destroy: true

  accepts_nested_attributes_for :central_contacts, allow_destroy: true
  accepts_nested_attributes_for :alternate_titles, allow_destroy: true
  accepts_nested_attributes_for :participating_sites, allow_destroy: true
  accepts_nested_attributes_for :collaborators, allow_destroy: true
  accepts_nested_attributes_for :outcome_measures, allow_destroy: true
  accepts_nested_attributes_for :anatomic_site_wrappers, allow_destroy: true
  accepts_nested_attributes_for :other_criteria, allow_destroy: true
  accepts_nested_attributes_for :sub_groups, allow_destroy: true
  accepts_nested_attributes_for :markers, allow_destroy: true
  accepts_nested_attributes_for :diseases, allow_destroy: true
  accepts_nested_attributes_for :milestone_wrappers, allow_destroy: true
  accepts_nested_attributes_for :processing_status_wrappers, allow_destroy: true
  accepts_nested_attributes_for :onholds, allow_destroy: true
  accepts_nested_attributes_for :citations, allow_destroy: true
  accepts_nested_attributes_for :links, allow_destroy: true
  accepts_nested_attributes_for :trial_ownerships, allow_destroy: true

  validates :lead_protocol_id, presence: true
  #validates :lead_protocol_id, uniqueness: { scope: :lead_org_id, message: "Combination of Lead Organization Trial ID and Lead Organization must be unique" }
  validate :lead_protocol_id_lead_org_id_uniqueness
  validates :official_title, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :official_title, length: {maximum: 600}
  validates :brief_title, length: {maximum: 300}
  validates :brief_summary, length: {maximum: 5000}
  validates :detailed_description, length: {maximum: 32000}
  validates :objective, length: {maximum: 32000}
  validates :primary_purpose_other, length: {maximum: 200}
  validates :secondary_purpose_other, length: {maximum: 1000}
  validates :study_model_other,length: {maximum: 200}
  validates :time_perspective_other, length: {maximum: 200}
  validates :biospecimen_desc, length: {maximum: 1000}
  validates :study_pop_desc, length: {maximum: 1000}

  validates :acronym, length: {maximum: 14}
  validates :lead_protocol_id, length: {maximum: 30}
  validates :board_name, length: {maximum: 255}
  validates :phase, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :pilot, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :research_category, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :primary_purpose, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :accrual_disease_term, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :lead_org, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :pi, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :sponsor, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :grant_question, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :ind_ide_question, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :start_date, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :start_date_qual, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :primary_comp_date, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :primary_comp_date_qual, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :comp_date, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'
  validates :comp_date_qual, presence: true, if: 'is_draft == false && edit_type != "import" && edit_type != "imported_update" && (internal_source.nil? || internal_source.code != "IMP")'

  def lead_protocol_id_lead_org_id_uniqueness
    if id.present?
      dup_trial = Trial.joins(:lead_org).where('organizations.id = ? AND lead_protocol_id = ? AND trials.id <> ?', lead_org, lead_protocol_id, id)
    else
      dup_trial = Trial.joins(:lead_org).where('organizations.id = ? AND lead_protocol_id = ?', lead_org, lead_protocol_id)
    end
    dup_trial = dup_trial.filter_rejected

    if dup_trial.length > 0
      errors.add(:lead_protocol_id, 'Combination of Lead Organization Trial ID and Lead Organization must be unique')
    end
  end

  before_create :save_history
  before_create :save_internal_source
  before_save :generate_status
  before_save :check_indicator
  after_create :create_ownership

  # The set_defaults will only work if the object is new
  after_initialize :set_defaults, unless: :persisted?


  # Array of actions can be taken on this Trial
  def actions
    actions = []

    if self.internal_source && self.internal_source.code == 'PRO'

      #When trial is Protocol
      if self.users.include? self.current_user
        if self.is_draft
          actions.append('complete')
        else
          actions.append('update')
          processing_status_wrappers = self.processing_status_wrappers.pluck(:processing_status_id)
          p processing_status_wrappers
          if (processing_status_wrappers.include? ProcessingStatus.find_by_code("AVR").id) || (processing_status_wrappers.include? ProcessingStatus.find_by_code("VNR").id)
            actions.append('amend')
            actions.append('verify-data')
            actions.append('view-tsr')
          end
        end
      end


    elsif self.internal_source && self.internal_source.code == 'IMP'
      #When Trial is Imported
      if self.current_user && self.current_user.role == 'ROLE_SITE-SU'
        #Have Site Admin Privileges
        #
          flag=0;
          self.current_user.family_organizations.each do |org|
            if self.ps_orgs.include?(org)
                flag =1;
                break;
            end
          end
          if flag == 1
            actions.append('manage-sites') #
          else
            actions.append('manage-sites') #
          end


      else
        #Do not have site Admin Privileges
        #
        if self.current_user &&  self.ps_orgs.include?(self.current_user.organization)
            # Associated org has been added as participating site
            actions.append('update-my-site')
          elsif self.current_user && self.current_user.organization.present?
            # Associated org hasn't been added as participating site
            actions.append('add-my-site')
          end
        end
    else
      #Actions will be null if trial belongs to none of the above types
    end

    return actions
  end

  # Participating site ID that has this user's associated org
  def my_site_id
    if self.current_user.present? && self.current_user.role != 'ROLE_SITE-SU'
      self.participating_sites.each do |e|
        if self.current_user.organization.present? && e.organization.present? && e.organization.id == self.current_user.organization.id
          return e.id
        end
      end
    else
      return nil
    end
  end

  # Array of participating sites that site-su user can edit
  def sitesu_sites
    sitesu_sites = []

    if self.current_user.present? && self.current_user.role == 'ROLE_SITE-SU'
      self.participating_sites.each do |e|
        if self.current_user.family_orgs.include? e.organization
          sitesu_sites.append(e)
        end
      end
    end

    return sitesu_sites
  end

  # Array of orgs in user's associated org's family
  def available_family_orgs
    #return self.current_user.family_orgs - self.ps_orgs if self.current_user.present?
    return self.current_user.family_orgs if self.current_user.present?
  end

  def is_owner
    if self.users.include? self.current_user
      return true
    else
      return false
    end
  end

  def is_sponsor_nci?
    return (!self.sponsor.nil? && self.sponsor.name == "National Cancer Institute") ? true:false
  end

  def is_lead_org_nci_ccr?
    return (!self.lead_org.nil? &&  self.lead_org.name == "NCI - Center for Cancer Research") ? true:false
  end

  def set_send_trial_info_flag
    send_trial_flag = false

    #And the Trial Sponsor is "National Cancer Institute" (Trial/Sponsor_ID where organizations/name = "National Cancer Institute")
    #send_trial_flag = is_sponsor_nci?
    #return if !send_trial_flag

    # And Trial Lead Organization is "NCI - Center for Cancer Research"|trials.lead_org_id Organizations.name = "NCI - Center for Cancer Research"|
    #send_trial_flag = is_lead_org_nci_ccr?
    #return if !send_trial_flag

    latest_processing_status = processing_status_wrappers.empty? ? nil:processing_status_wrappers.last.processing_status.name
    if latest_processing_status.nil?
      return false
    end
    # And the Trial processing status is �Verification Pending�, "Abstracted", "No Response�, or �Abstracted, Response�
    if ['Verification Pending','Abstracted', 'Abstraction Verified Response', 'Abstraction Verified No Response'].include? latest_processing_status
      send_trial_flag = true
    end
    # And the Trial Overall Status is not �Complete�, �Administratively Complete� or �Terminated�
    latest_trial_status = trial_status_wrappers.empty? ? nil:trial_status_wrappers.last.trial_status.name
    if latest_trial_status.nil?
      return false
    end
    if ['Complete','Administratively Complete'].include? latest_trial_status
      return false
    end
    # And the trial Research Category is "Interventional" (Trial/Research_Category_id where Research_Categories/Name = "Interventional")
    # ResearchCategory.find_or_create_by(code: 'INT', name: 'Interventional')
    if !self.research_category.nil? && self.research_category.name == 'Interventional'
      send_trial_flag = true
    else
      send_trial_flag = false
    end
    return send_trial_flag
  end

  def pa_editable_check
    return false if self.current_user.nil?
    pa_editable = false
    Rails.logger.info "current_user = #{self.current_user.inspect}"
    if ["ROLE_ADMIN", "ROLE_SUPER"].include?(self.current_user.role)
      pa_editable = true
    elsif ["ROLE_ABSTRACTOR", "ROLE_ABTRACTOR_SU"].include?(self.current_user.role)
      if self.admin_checkout || self.scientific_checkout
        pa_editable = true
      end
    end
    pa_editable
  end

  def checked_out_by_current_user(user)
    return false if user.nil?
    checked_out = false
    Rails.logger.info "user = #{user.inspect}"
    if ((self.admin_checkout && eval(self.admin_checkout)[:by] == user)  ||
        (self.scientific_checkout && eval(self.scientific_checkout)[:by] == user))
      checked_out = true
    end
    checked_out
  end

  def submission_nums
    self.submissions.pluck('submission_num').uniq
  end

  # Most recent active non-update submission
  def most_recent_active_submission
    upd = SubmissionType.find_by_code('UPD')
    if upd.present?
      return Submission.joins(:submission_type).where('trial_id = ? AND submission_types.id <> ? AND submissions.status = ?', self.id, upd.id, 'Active').order('submission_num desc').first
    else
      return nil
    end
  end

  # Most recent non-update submission
  def most_recent_submission
    upd = SubmissionType.find_by_code('UPD')
    if upd.present?
      return Submission.joins(:submission_type).where('trial_id = ? AND submission_types.id <> ?', self.id, upd.id).order('submission_num desc').first
    else
      return nil
    end
  end

  # Current submission based on rejection status
  def current_submission
    if self.is_rejected
      return most_recent_submission
    else
      return most_recent_active_submission
    end
  end

  # Return true if this trial contains the specified milestone with specific submission ID
  def contains_milestone?(submission_id, milestone_id)
    target = MilestoneWrapper.where('trial_id = ? AND submission_id = ? AND milestone_id = ?', self.id, submission_id, milestone_id)
    return target.size > 0 ? true : false
  end

  # Return true if the last milestone of the specified submission matches the milestone_code
  def is_last_milestone?(submission_id, milestone_code)
    target = MilestoneWrapper.where('trial_id = ? AND submission_id = ?', self.id, submission_id).order('id').last
    if target.present? && target.milestone.code == milestone_code
      return true
    else
      return false
    end
  end

  def current_process_status_code(submission_id)
    target = ProcessingStatusWrapper.where('trial_id = ? AND submission_id = ?', self.id, submission_id).order('id').last
    if target.present? && target.processing_status.present?
      return target.processing_status.code
    else
      return nil
    end
  end

  def current_processing_status
    if self.current_submission.present?
      target = ProcessingStatusWrapper.where('trial_id = ? AND submission_id = ?', self.id, self.current_submission.id).order('id').last
      if target.present?
        return target.processing_status
      end
    else
      return nil
    end
  end

  def active_onhold_exists?
    self.onholds.each do |onhold|
      if onhold.offhold_date.nil?
        return true
      end
    end
    return false
  end

  def update_need_ack?
    self.submissions.each do |submission|
      if submission.submission_type && submission.submission_type.code == 'UPD' && submission.acknowledge == 'No'
        return true
      end
    end
    return false
  end

  # Return validation errors for adding a milestone to a set of milestones with specific submission ID
  def validate_milestone(submission_id, milestone_id)
    validation_msgs = {}
    validation_msgs[:errors] = []
    milestone_to_add = Milestone.find(milestone_id)

    if milestone_to_add.code == 'VPS'
      if !is_last_milestone?(submission_id, 'SRD')
        validation_msgs[:errors].push('Submission Received Date milestone must exist')
      end
    elsif milestone_to_add.code == 'VPC'
      if !is_last_milestone?(submission_id, 'VPS')
        validation_msgs[:errors].push('Validation Processing Start Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
    elsif milestone_to_add.code == 'SAC'
      if !is_last_milestone?(submission_id, 'VPC')
        validation_msgs[:errors].push('Validation Processing Completed Date milestone must exist')
      end
    elsif milestone_to_add.code == 'APS'
      sac = Milestone.find_by_code('SAC')
      if sac.present? && !contains_milestone?(submission_id, sac.id)
        validation_msgs[:errors].push('Submission Acceptance Date milestone must exist')
      end
    elsif milestone_to_add.code == 'APC'
      aps = Milestone.find_by_code('APS')
      if aps.present? && !contains_milestone?(submission_id, aps.id)
        validation_msgs[:errors].push('Administrative Processing Start Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
      if self.admin_checkout.present?
        validation_msgs[:errors].push('Cannot be recorded if Trail is checked out for Administrative processing')
      end
    elsif milestone_to_add.code == 'RAQ'
      if !is_last_milestone?(submission_id, 'APC')
        validation_msgs[:errors].push('Administrative Processing Completed Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
    elsif milestone_to_add.code == 'AQS'
      raq = Milestone.find_by_code('RAQ')
      if raq.present? && !contains_milestone?(submission_id, raq.id)
        validation_msgs[:errors].push('Ready for Administrative QC Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
    elsif milestone_to_add.code == 'AQC'
      aqs = Milestone.find_by_code('AQS')
      if aqs.present? && !contains_milestone?(submission_id, aqs.id)
        validation_msgs[:errors].push('Administrative QC Start Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
      if self.admin_checkout.present?
        validation_msgs[:errors].push('Cannot be recorded if Trail is checked out for Administrative processing')
      end
    elsif milestone_to_add.code == 'SPS'
      sac = Milestone.find_by_code('SAC')
      if sac.present? && !contains_milestone?(submission_id, sac.id)
        validation_msgs[:errors].push('Submission Acceptance Date milestone must exist')
      end
    elsif milestone_to_add.code == 'SPC'
      sps = Milestone.find_by_code('SPS')
      if sps.present? && !contains_milestone?(submission_id, sps.id)
        validation_msgs[:errors].push('Scientific Processing Start Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if self.scientific_checkout.present?
        validation_msgs[:errors].push('Cannot be recorded if Trail is checked out for Scientific processing')
      end
    elsif milestone_to_add.code == 'RSQ'
      if !is_last_milestone?(submission_id, 'SPC')
        validation_msgs[:errors].push('Scientific Processing Completed Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
    elsif milestone_to_add.code == 'SQS'
      rsq = Milestone.find_by_code('RSQ')
      if rsq.present? && !contains_milestone?(submission_id, rsq.id)
        validation_msgs[:errors].push('Ready for Scientific QC Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
    elsif milestone_to_add.code == 'SQC'
      sqs = Milestone.find_by_code('SQS')
      if sqs.present? && !contains_milestone?(submission_id, sqs.id)
        validation_msgs[:errors].push('Scientific QC Start Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if self.scientific_checkout.present?
        validation_msgs[:errors].push('Cannot be recorded if Trail is checked out for Scientific processing')
      end
    elsif milestone_to_add.code == 'RTS'
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
    elsif milestone_to_add.code == 'TSR'
      rts = Milestone.find_by_code('RTS')
      if rts.present? && !contains_milestone?(submission_id, rts.id)
        validation_msgs[:errors].push('Ready for Trial Summary Report Date milestone must exist')
      end
      if ['SUB', 'AMS', 'ACC', 'REJ'].include?(current_process_status_code(submission_id))
        validation_msgs[:errors].push('Cannot be recorded because the most current processing status is "Submitted", "Amendment Submitted", "Accepted" or "Rejected')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
    elsif milestone_to_add.code == 'STS'
      tsr = Milestone.find_by_code('TSR')
      if tsr.present? && !contains_milestone?(submission_id, tsr.id)
        validation_msgs[:errors].push('Trial Summary Report Date milestone must exist')
      end
    elsif milestone_to_add.code == 'IAV'
      rts = Milestone.find_by_code('RTS')
      if rts.present? && !contains_milestone?(submission_id, rts.id)
        validation_msgs[:errors].push('Ready for Trial Summary Report Date milestone must exist')
      end
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
    elsif milestone_to_add.code == 'ONG'
      if active_onhold_exists?
        validation_msgs[:errors].push('Cannot be recorded because at least one active "on-hold" record exists')
      end
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
    elsif milestone_to_add.code == 'LRD'
      if update_need_ack?
        validation_msgs[:errors].push('Cannot be recorded because at least one update needs to be acknowledged')
      end
    end

    # Duplication check
    if !['STR', 'SRE', 'TSR', 'STS', 'ONG'].include?(milestone_to_add.code)
      if contains_milestone?(submission_id, milestone_id)
        validation_msgs[:errors].push('This milestone cannot be recorded multiple times')
      end
    end

    return validation_msgs
  end

  def ctg_id
    ctg = ProtocolIdOrigin.find_by_code('NCT')
    if ctg.present?
      ctg_id = OtherId.where('trial_id = ? AND protocol_id_origin_id = ?', self.id, ctg.id).first
      if ctg_id.present?
        return ctg_id.protocol_id
      else
        return nil
      end
    else
      return nil
    end
  end

  def submitter
    ori = SubmissionType.find_by_code('ORI')
    if ori.present?
      original_sub = Submission.where('trial_id = ? AND submission_type_id = ?', self.id, ori.id).first
      if original_sub.present? && original_sub.user.present? && original_sub.user.first_name.present? && original_sub.user.last_name.present?
        return original_sub.user.last_name + ', ' + original_sub.user.first_name
      else
        return nil
      end
    else
      return nil
    end
  end

  def last_updated_at
    upd = SubmissionType.find_by_code('UPD')
    if upd.present?
      last_update = Submission.where('trial_id = ? AND submission_type_id = ?', self.id, upd.id).order('id desc').first
      if last_update.present?
        return last_update.created_at
      else
        return nil
      end
    else
      return nil
    end
  end

  def last_updated_by
    upd = SubmissionType.find_by_code('UPD')
    if upd.present?
      last_update = Submission.where('trial_id = ? AND submission_type_id = ?', self.id, upd.id).order('id desc').first
      if last_update.present? && last_update.user.present? && last_update.user.first_name.present? && last_update.user.last_name.present?
        return last_update.user.last_name + ', ' + last_update.user.first_name
      else
        return nil
      end
    else
      return nil
    end
  end

  def last_amended_at
    amd = SubmissionType.find_by_code('AMD')
    if amd.present?
      last_amend = Submission.where('trial_id = ? AND submission_type_id = ?', self.id, amd.id).order('id desc').first
      if last_amend.present?
        return last_amend.created_at
      else
        return nil
      end
    else
      return nil
    end
  end

  def last_amended_by
    amd = SubmissionType.find_by_code('AMD')
    if amd.present?
      last_amend = Submission.where('trial_id = ? AND submission_type_id = ?', self.id, amd.id).order('id desc').first
      if last_amend.present? && last_amend.user.present? && last_amend.user.first_name.present? && last_amend.user.last_name.present?
        return last_amend.user.last_name + ', ' + last_amend.user.first_name
      else
        return nil
      end
    else
      return nil
    end
  end

  def onhold_reason
    self.onholds.each do |onhold|
      if onhold.offhold_date.nil?
        if onhold.onhold_reason.present?
          return onhold.onhold_reason.name
        else
          return nil
        end
      end
    end

    return nil
  end

  def has_atleast_one_active_update_sub_with_not_acked
    upd = SubmissionType.find_by_code('UPD')
    if upd.present?
      subs = Submission.where('trial_id = ? AND submission_type_id = ? and status = ? and acknowledge = ?', self.id, upd.id, 'Active','No')
      if subs.count == 0
        return false
      else
        return true
      end
    else
      return false
    end

  end

  def has_atleast_one_active_amendment_sub
    amd = SubmissionType.find_by_code('AMD')
    if amd.present?
      subs = Submission.where('trial_id = ? AND submission_type_id = ? and status = ?', self.id, amd.id, 'Active')
      if subs.count == 0
        return false
      else
        return true
      end
    else
      return false
    end

  end

  ##Returns sites with onlly active orgs.
  def participating_sites_with_active_orgs
    participating_sites_with_active_orgs = []
      self.participating_sites.each do |e|
        if SourceStatus.find_by_id(Organization.find_by_id(e.organization_id).source_status_id).code == 'ACT'
          participating_sites_with_active_orgs.push(e)
        end
      end
    return participating_sites_with_active_orgs
  end

  private

  def save_history
    history = {lead_org: self.lead_org, pi: self.pi}
    self.history = history.to_json
  end

  def save_internal_source
    if self.edit_type == 'import'
      self.internal_source = InternalSource.find_by_code('IMP')
    else
      self.internal_source = InternalSource.find_by_code('PRO')
    end
  end

  def generate_status
    if !self.is_draft && self.nci_id.nil?
      # Generate NCI ID
      current_year = Time.new.year.to_s
      largest_id = Trial.where('nci_id ilike ?', "%NCI-#{current_year}-%").order('nci_id desc').pluck('nci_id').first
      if largest_id.nil?
        new_id = "NCI-#{current_year}-00001"
      else
        new_id = largest_id.next
      end
      self.nci_id = new_id

      # New Submission
      if self.edit_type == 'import'
        new_submission = self.submissions.last
      else
        ori = SubmissionType.find_by_code('ORI')
        if self.coming_from == 'rest'
          user = self.current_user
          case user.organization.name
            when "CTEP"
              sub_source = SubmissionSource.find_by_code('CTEP')
            when "CCR"
              sub_source = SubmissionSource.find_by_code('CCR')
            when "DCP"
              sub_source = SubmissionSource.find_by_code('DCP')
            else
              sub_source = SubmissionSource.find_by_code('CCT')
          end

          sub_method = SubmissionMethod.find_by_code('RSV')
        else
          sub_source = SubmissionSource.find_by_code('CCT')
          sub_method = SubmissionMethod.find_by_code('REG')
        end
        new_submission = Submission.create(submission_num: 1, submission_date: Date.today, trial: self, user: self.current_user, submission_type: ori, submission_source: sub_source, submission_method: sub_method)
      end

      # New Milestone
      srd = Milestone.find_by_code('SRD')
      MilestoneWrapper.create(milestone_date: Date.today, milestone: srd, trial: self, submission: new_submission, created_by: 'CTRP application')

      # New Processing Status
      sub = ProcessingStatus.find_by_code('SUB')
      ProcessingStatusWrapper.create(status_date: Date.today, processing_status: sub, trial: self, submission: new_submission)

      # Populate Submission ID for documents uploaded in draft stage
      self.trial_documents.each do |doc|
        doc.submission = new_submission
        doc.save
      end
    elsif self.edit_type == 'update'
      largest_sub_num = Submission.where('trial_id = ?', self.id).order('submission_num desc').pluck('submission_num').first
      # Don't increment submission number for updates
      new_sub_number = largest_sub_num.present? ? largest_sub_num : 1
      upd = SubmissionType.find_by_code('UPD')
      if self.coming_from == 'rest'
        user = self.current_user
        case user.organization.name
          when "CTEP"
            sub_source = SubmissionSource.find_by_code('CTEP')
          when "CCR"
            sub_source = SubmissionSource.find_by_code('CCR')
          when "DCP"
            sub_source = SubmissionSource.find_by_code('DCP')
          else
            sub_source = SubmissionSource.find_by_code('CCT')
        end
        sub_method = SubmissionMethod.find_by_code('RSV')
      else
        sub_source = SubmissionSource.find_by_code('CCT')
        sub_method = SubmissionMethod.find_by_code('REG')
      end
      Submission.create(submission_num: new_sub_number, submission_date: Date.today, trial: self, user: self.current_user, submission_type: upd, submission_source: sub_source, submission_method: sub_method)
    elsif self.edit_type == 'amend'
      # Populate submission number for the latest Submission and create a Milestone
      largest_sub_num = Submission.where('trial_id = ?', self.id).order('submission_num desc').pluck('submission_num').first
      amd = SubmissionType.find_by_code('AMD')
      if self.coming_from == 'rest'
        user = self.current_user
        case user.organization.name
          when "CTEP"
            sub_source = SubmissionSource.find_by_code('CTEP')
          when "CCR"
            sub_source = SubmissionSource.find_by_code('CCR')
          when "DCP"
            sub_source = SubmissionSource.find_by_code('DCP')
          else
            sub_source = SubmissionSource.find_by_code('CCT')
        end
        sub_method = SubmissionMethod.find_by_code('RSV')
      else
        sub_source = SubmissionSource.find_by_code('CCT')
        sub_method = SubmissionMethod.find_by_code('REG')
      end
      latest_submission = self.submissions.last
      latest_submission.submission_num = largest_sub_num.present? ? largest_sub_num + 1 : 1
      latest_submission.user = self.current_user
      latest_submission.submission_type = amd
      latest_submission.submission_source = sub_source
      latest_submission.submission_method = sub_method

      srd = Milestone.find_by_code('SRD')
      MilestoneWrapper.create(milestone_date: Date.today, milestone: srd, trial: self, submission: latest_submission, created_by: 'CTRP application')

      ams = ProcessingStatus.find_by_code('AMS')
      ProcessingStatusWrapper.create(status_date: Date.today, processing_status: ams, trial: self, submission: latest_submission)
    end
  end

  def check_indicator
    if self.intervention_indicator == 'No' && self.sec801_indicator != 'No'
      self.sec801_indicator = 'No'
    end
  end

  def create_ownership
    if self.internal_source.present? && self.internal_source.code != 'IMP'
      TrialOwnership.create(trial: self, user: self.current_user) if self.current_user.present?
    end
  end

  def set_defaults
    self.is_rejected = false if self.is_rejected.nil?
  end

  #scopes for search API
  #scope :matches_grant, -> (column, value) {Tempgrant.where}
  scope :matches, -> (column, value) { where("trials.#{column} = ?", "#{value}") }

  scope :matches_wc, -> (column, value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      where("trials.#{column} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("trials.#{column} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("trials.#{column} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      where("trials.#{column} ilike ?", "#{value}")
    end
  }



  scope :in_family, -> (value, dateLimit) {
    familyOrganizations = FamilyMembership.where(
        family_id: value
    ).where("family_memberships.expiration_date > '#{dateLimit}' or family_memberships.expiration_date is null")
    .pluck(:organization_id)
    where(lead_org_id: familyOrganizations)
  }

  scope :with_current_user_in_family_as_ps, -> (value) {
    current_user = value
    organization = current_user.organization
    family_organizations = current_user.family_organizations
    param = []
    family_organizations.each do |o|
      param.push(o)
    end

    family_organizations = family_organizations.join(',')
    join_clause = "LEFT JOIN participating_sites _ps1 ON _ps1.trial_id = trials.id LEFT JOIN internal_sources _is on _is.id = trials.internal_source_id "
    where_clause = " _ps1.organization_id in ("+param.join(',')+") "
    where_clause += " AND _is.code = ? "
    joins(join_clause).where(where_clause,"IMP")
  }


  scope :with_current_user_org_as_ps, -> (value) {
    current_user = value
    organization = current_user.organization
    join_clause = "LEFT JOIN participating_sites _ps ON _ps.trial_id = trials.id LEFT JOIN internal_sources _is on _is.id = trials.internal_source_id  "
    where_clause = " _ps.organization_id =? "
    where_clause += " AND _is.code =? "
    joins(join_clause).where(where_clause, organization, "IMP")
  }

  scope :in_family, -> (value, dateLimit) {
    familyOrganizations = FamilyMembership.where(
        family_id: value
    ).where("family_memberships.expiration_date > '#{dateLimit}' or family_memberships.expiration_date is null")
                              .pluck(:organization_id)
    where(lead_org_id: familyOrganizations)
  }

  scope :with_owner_and_with_current_user_org_as_ps, ->(value) {
    union_scope(with_owner(value.username),with_current_user_org_as_ps(value))
  }

  scope :with_owner_and_with_current_user_in_family_as_ps, ->(value) {
    union_scope(with_owner(value.username),with_current_user_in_family_as_ps(value))
  }

  scope :with_protocol_id, -> (value) {
    join_clause = 'LEFT JOIN other_ids ON other_ids.trial_id = trials.id'
    where_clause = 'trials.lead_protocol_id ilike ? OR trials.nci_id ilike ? OR other_ids.protocol_id ilike ?'

    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      value_exp = "%#{value[1..str_len - 1]}"
    elsif value[0] != '*' && value[str_len - 1] == '*'
      value_exp = "#{value[0..str_len - 2]}%"
    elsif value[0] == '*' && value[str_len - 1] == '*'
      value_exp = "%#{value[1..str_len - 2]}%"
    else
      value_exp = "#{value}"
    end

    joins(join_clause).where(where_clause, value_exp, value_exp, value_exp)
  }

  # scope :with_nci_id, -> (nci_id) { where(nci_id: nci_id) }

  scope :with_nci_id, -> (value) {
    where_clause = 'trials.nci_id ilike ?'
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      value_exp = "%#{value[1..str_len - 1]}"
    elsif value[0] != '*' && value[str_len - 1] == '*'
      value_exp = "#{value[0..str_len - 2]}%"
    elsif value[0] == '*' && value[str_len - 1] == '*'
      value_exp = "%#{value[1..str_len - 2]}%"
    else
      value_exp = "#{value}"
    end
    where(where_clause, value_exp, value_exp, value_exp)
  }

  scope :with_phase, -> (value) { joins(:phase).where("phases.code = ?", "#{value}") }

  scope :with_phases, -> (value) {
    conditions = []
    q = ""

    value.each_with_index { |e, i|
      if i == 0
        q = "phases.code = ?"
      else
        q += " OR phases.code = ?"
      end
      conditions.push(e[:code])
    }
    conditions.insert(0, q)

    joins(:phase).where(conditions)
  }

  scope :with_purpose, -> (value) { joins(:primary_purpose).where("primary_purposes.code = ?", "#{value}") }

  scope :with_purposes, -> (value) {
    conditions = []
    q = ""

    value.each_with_index { |e, i|
      if i == 0
        q = "primary_purposes.code = ?"
      else
        q += " OR primary_purposes.code = ?"
      end
      conditions.push(e[:code])
    }
    conditions.insert(0, q)

    joins(:primary_purpose).where(conditions)
  }

  scope :with_research_category, -> (value) { joins(:research_category).where("research_categories.code = ?", "#{value}") }

  scope :with_study_source, -> (value) { joins(:study_source).where("study_sources.code = ?", "#{value}") }

  scope :with_study_sources, -> (value) {
    conditions = []
    q = ""

    value.each_with_index { |e, i|
      if i == 0
        q = "study_sources.code = ?"
      else
        q += " OR study_sources.code = ?"
      end
      conditions.push(e[:code])
    }
    conditions.insert(0, q)

    joins(:study_source).where(conditions)
  }

  scope :with_nci_div, -> (value) {where("nih_nci_div = ?", "#{value}") }

  scope :with_nci_prog, -> (value) {where("nih_nci_prog = ?", "#{value}") }

  scope :with_pi_lname, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:pi).where("people.lname ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:pi).where("people.lname ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:pi).where("people.lname ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:pi).where("people.lname ilike ?", "#{value}")
    end
  }

  scope :with_pi_fname, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:pi).where("people.fname ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:pi).where("people.fname ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:pi).where("people.fname ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:pi).where("people.fname ilike ?", "#{value}")
    end
  }

  scope :with_lead_org, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:lead_org).where("organizations.name ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:lead_org).where("organizations.name ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:lead_org).where("organizations.name ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:lead_org).where("organizations.name ilike ?", "#{value}")
    end
  }

  scope :with_sponsor, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:sponsor).where("organizations.name ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:sponsor).where("organizations.name ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:sponsor).where("organizations.name ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:sponsor).where("organizations.name ilike ?", "#{value}")
    end
  }

  scope :with_any_org, -> (value) {
    #join_clause = "LEFT JOIN organizations lead_orgs ON lead_orgs.id = trials.lead_org_id LEFT JOIN organizations sponsors ON sponsors.id = trials.sponsor_id LEFT JOIN trial_funding_sources ON trial_funding_sources.trial_id = trials.id LEFT JOIN organizations funding_sources ON funding_sources.id = trial_funding_sources.organization_id"
    #where_clause = "lead_orgs.name ilike ? OR sponsors.name ilike ? OR funding_sources.name ilike ?"
    join_clause = "LEFT JOIN organizations lead_orgs ON lead_orgs.id = trials.lead_org_id LEFT JOIN organizations sponsors ON sponsors.id = trials.sponsor_id"
    where_clause = "lead_orgs.name ilike ? OR sponsors.name ilike ?"
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(join_clause).where(where_clause, "%#{value[1..str_len - 1]}", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(join_clause).where(where_clause, "#{value[0..str_len - 2]}%", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(join_clause).where(where_clause, "%#{value[1..str_len - 2]}%", "%#{value[1..str_len - 2]}%")
    else
      joins(join_clause).where(where_clause, "#{value}", "#{value}")
    end
  }

  scope :with_org, -> (value, type) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      value_exp = "%#{value[1..str_len - 1]}"
    elsif value[0] != '*' && value[str_len - 1] == '*'
      value_exp = "#{value[0..str_len - 2]}%"
    elsif value[0] == '*' && value[str_len - 1] == '*'
      value_exp = "%#{value[1..str_len - 2]}%"
    else
      value_exp = "#{value}"
    end

    #join_clause = "LEFT JOIN organizations lead_orgs ON lead_orgs.id = trials.lead_org_id LEFT JOIN organizations sponsors ON sponsors.id = trials.sponsor_id LEFT JOIN trial_funding_sources ON trial_funding_sources.trial_id = trials.id LEFT JOIN organizations funding_sources ON funding_sources.id = trial_funding_sources.organization_id"
    #where_clause = "lead_orgs.name ilike ? OR sponsors.name ilike ? OR funding_sources.name ilike ?"
    join_clause = "LEFT JOIN organizations lead_orgs ON lead_orgs.id = trials.lead_org_id LEFT JOIN organizations sponsors ON sponsors.id = trials.sponsor_id LEFT JOIN participating_sites ps ON ps.trial_id = trials.id LEFT JOIN organizations sites ON sites.id = ps.organization_id"
    where_clause = ""
    conditions = []

    if type.present?
      type.each_with_index { |e, i|
        where_clause += " OR " if i > 0
        if e == 'Lead Organization'
          where_clause += "lead_orgs.name ilike ?"
        elsif e == 'Sponsor'
          where_clause += "sponsors.name ilike ?"
        elsif e == 'Participating Site'
          where_clause += "sites.name ilike ?"
        end
        conditions.push(value_exp)
      }
    else
      where_clause = "lead_orgs.name ilike ? OR sponsors.name ilike ? OR sites.name ilike ?"
      conditions.push(value_exp)
      conditions.push(value_exp)
      conditions.push(value_exp)
    end

    conditions.insert(0, where_clause)

    joins(join_clause).where(conditions)
  }

  scope :with_owner, -> (value) {
    #joins(:users).where("users.username = ? AND (trials.is_draft = ? OR trials.is_draft IS ?)", value, false, nil)
    join_clause = "LEFT JOIN trial_ownerships ON trial_ownerships.trial_id = trials.id LEFT JOIN users ON users.id = trial_ownerships.user_id"
    where_clause = "trial_ownerships.ended_at IS ? AND users.username = ? AND (trials.is_draft = ? OR trials.is_draft IS ?)"
    joins(join_clause).where(where_clause, nil, value, false, nil)
  }

  scope :is_not_draft, -> {
    where("trials.is_draft = ? OR trials.is_draft IS ?", false, nil)
  }

  scope :is_draft, -> (value) {
    joins(:users).where("users.username = ? AND trials.is_draft = ?", value, true)
  }

  scope :with_internal_sources, -> (value) {
    conditions = []
    q = ""

    value.each_with_index { |e, i|
      if i == 0
        q = "internal_sources.code = ?"
      else
        q += " OR internal_sources.code = ?"
      end
      conditions.push(e[:code])
    }
    conditions.insert(0, q)

    joins(:internal_source).where(conditions)
  }


  scope :user_trials, -> (user_id) {
    trial_ownerships = TrialOwnership.matches('user_id', user_id)
    trial_ownerships = trial_ownerships.matches('internal_source_id', InternalSource.find_by_code('PRO').id)
    where(id: trial_ownerships.pluck(:trial_id))
  }

  scope :filter_rejected, -> {
    where("is_rejected = ? OR is_rejected IS NULL", FALSE)
  }

  scope :active_submissions, -> {
    where("id in (select DISTINCT ON (trial_id) trial_id from submissions where submissions.trial_id is not null AND submissions.status = 'Active')")
    joins(:internal_source).where("internal_sources.code = 'PRO'")
  }

  scope :sort_by_col, -> (params) {
    column = params[:sort]
    order = params[:order]

    if column == 'id'
      order("#{column} #{order}")
    elsif column == 'phase'
      if params[:phases].present?
        order("phases.name #{order}").group(:'phases.name')
      else
        joins("LEFT JOIN phases ON phases.id = trials.phase_id").order("phases.name #{order}").group(:'phases.name')
      end
    elsif column == 'purpose'
      if params[:purposes].present?
        order("primary_purposes.name #{order}").group(:'primary_purposes.name')
      else
        joins("LEFT JOIN primary_purposes ON primary_purposes.id = trials.primary_purpose_id").order("primary_purposes.name #{order}").group(:'primary_purposes.name')
      end
    elsif column == 'study_source'
      if params[:study_sources].present?
        order("study_sources.name #{order}").group(:'study_sources.name')
      else
        joins("LEFT JOIN study_sources ON study_sources.id = trials.study_source_id").order("study_sources.name #{order}").group(:'study_sources.name')
      end
    elsif column == 'pi'
      if params[:pi].present?
        order("people.lname #{order}").group(:'people.lname')
      else
        joins("LEFT JOIN people ON people.id = trials.pi_id").order("people.lname #{order}").group(:'people.lname')
      end
    elsif column == 'lead_org'
      if params[:org].present?
        order("lead_orgs.name #{order}").group(:'lead_orgs.name')
      else
        joins("LEFT JOIN organizations ON organizations.id = trials.lead_org_id").order("organizations.name #{order}").group(:'organizations.name')
      end
    elsif column == 'sponsor'
      if params[:org].present?
        order("sponsors.name #{order}").group(:'sponsors.name')
      else
        joins("LEFT JOIN organizations ON organizations.id = trials.sponsor_id").order("organizations.name #{order}").group(:'organizations.name')
      end
    else
      order("LOWER(trials.#{column}) #{order}")
    end
  }



end
