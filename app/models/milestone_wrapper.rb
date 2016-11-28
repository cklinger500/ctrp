# == Schema Information
#
# Table name: milestone_wrappers
#
#  id                :integer          not null, primary key
#  milestone_date    :date
#  milestone_id      :integer
#  trial_id          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  submission_id     :integer
#  comment           :text
#  milestone_type_id :integer
#  created_by        :string(255)
#
# Indexes
#
#  index_milestone_wrappers_on_milestone_id       (milestone_id)
#  index_milestone_wrappers_on_milestone_type_id  (milestone_type_id)
#  index_milestone_wrappers_on_submission_id      (submission_id)
#  index_milestone_wrappers_on_trial_id           (trial_id)
#

class MilestoneWrapper < TrialBase
  include BasicConcerns

  belongs_to :milestone
  belongs_to :milestone_type
  belongs_to :submission
  belongs_to :trial

  before_create :save_type
  after_create :recording_triggers

  ## Audit Trail Callbacks
  after_save :touch_trial
  after_destroy :touch_trial


  def touch_trial

    if self.trial.edit_type.nil?
    ##Note down edit_type is null when milestone is being added from abstraction page, so we need to touch trial only in this case
    ##Since trial edit_type is not nil when it is registering and amending or updating then trial get updated for sure so to avoid dead lock this condition check is essential.
      find_current_user = nil
      updated_by = nil
      last_version_transaction_id = 0
      last_version = self.versions.last
      last_version_transaction_id = last_version.transaction_id if last_version
      user_id = last_version.whodunnit if last_version
      find_current_user = User.find_by_id(user_id) if user_id
      if find_current_user
        updated_by = find_current_user.username
      end
      does_trial_modified_during_this_transaction_size = 0
      does_trial_modified_during_this_transaction = TrialVersion.where("item_type= ? and transaction_id= ?","Trial", last_version_transaction_id)
      does_trial_modified_during_this_transaction_size = does_trial_modified_during_this_transaction.size if does_trial_modified_during_this_transaction
      ##If trail has been modified during the same transaction , then there is no need to update Trail again to create another version.
      if does_trial_modified_during_this_transaction_size == 0
        self.trial.update(updated_by:updated_by, updated_at:Time.now)
      end

    end

  end


  def save_type
    if self.milestone.present?
      if ['APS', 'APC', 'RAQ', 'AQS', 'AQC'].include? self.milestone.code
        self.milestone_type = MilestoneType.find_by_code('ADM')
      elsif ['SPS', 'SPC', 'RSQ', 'SQS', 'SQC'].include? self.milestone.code
        self.milestone_type = MilestoneType.find_by_code('SCI')
      else
        self.milestone_type = MilestoneType.find_by_code('GEN')
      end
    end
  end

  def recording_triggers
    if self.milestone.present?
      if self.milestone.code == 'STR'
        stm = ProcessingStatus.find_by_code('STM')
        if self.submission.present? && stm.present?
          ProcessingStatusWrapper.create(status_date: Date.today, processing_status: stm, submission: self.submission, trial: self.trial)
        end
      elsif self.milestone.code == 'SAC'
        acc = ProcessingStatus.find_by_code('ACC')
        if self.submission.present? && acc.present?
          ProcessingStatusWrapper.create(status_date: Date.today, processing_status: acc, submission: self.submission, trial: self.trial)
        end
      elsif self.milestone.code == 'SRE'
        sre = ProcessingStatus.find_by_code('SRE')
        if self.submission.present? && sre.present?
          ProcessingStatusWrapper.create(status_date: Date.today, processing_status: sre, submission: self.submission, trial: self.trial)
        end
      elsif self.milestone.code == 'SRJ'
        if self.submission.present?
          rej = ProcessingStatus.find_by_code('REJ')
          if rej.present?
            ProcessingStatusWrapper.create(status_date: Date.today, processing_status: rej, submission: self.submission, trial: self.trial)
          end
          self.submission.status = 'Rejected'
          self.submission.save

          if self.submission.submission_type.code == 'ORI'
            self.trial.is_rejected = true
            self.trial.save
          elsif self.submission.submission_type.code == 'AMD'
            # Rollback
            trial_service = TrialService.new({trial: self.trial})
            trial_service.rollback(self.submission.id)
          end
        end
      elsif self.milestone.code == 'APC'
        MilestoneWrapper.create(milestone: Milestone.find_by_code('RAQ'), submission: self.submission, trial: self.trial, created_by: 'CTRP application')
      elsif self.milestone.code == 'SPC'
        MilestoneWrapper.create(milestone: Milestone.find_by_code('RSQ'), submission: self.submission, trial: self.trial, created_by: 'CTRP application')
      elsif self.milestone.code == 'AQC'
        sqc = Milestone.find_by_code('SQC')
        if self.submission.present? && sqc.present? && self.trial.contains_milestone?(self.submission.id, sqc.id)
          MilestoneWrapper.create(milestone: Milestone.find_by_code('RTS'), submission: self.submission, trial: self.trial, created_by: 'CTRP application')
        end
      elsif self.milestone.code == 'SQC'
        aqc = Milestone.find_by_code('AQC')
        if self.submission.present? && aqc.present? && self.trial.contains_milestone?(self.submission.id, aqc.id)
          MilestoneWrapper.create(milestone: Milestone.find_by_code('RTS'), submission: self.submission, trial: self.trial, created_by: 'CTRP application')
        end
      elsif self.milestone.code == 'RTS'
        self.trial.verification_date = self.created_at
        self.trial.save
        abs = ProcessingStatus.find_by_code('ABS')
        if self.submission.present? && abs.present?
          ProcessingStatusWrapper.create(status_date: Date.today, processing_status: abs, submission: self.submission, trial: self.trial)
        end
      elsif self.milestone.code == 'TSR'
        vfp = ProcessingStatus.find_by_code('VFP')
        if self.submission.present? && vfp.present?
          ProcessingStatusWrapper.create(status_date: Date.today, processing_status: vfp, submission: self.submission, trial: self.trial)
        end
        # Should generate Trial Summary Report each time when this milestone has been added to Trial.
        #Calling service to generate Trial Summary Report
        CreateTrialSummaryReportService.new({
                                                trial_id: self.trial.id, store_file_on_server:true
                                            }).generate_tsr_in_rtf
      elsif self.milestone.code == 'IAV'
        self.trial.verification_date = self.created_at
        self.trial.save
        avr = ProcessingStatus.find_by_code('AVR')
        if self.submission.present? && avr.present?
          ProcessingStatusWrapper.create(status_date: Date.today, processing_status: avr, submission: self.submission, trial: self.trial)
        end
      elsif self.milestone.code == 'ONG'
        avr = ProcessingStatus.find_by_code('AVR')
        sts = Milestone.find_by_code('STS')
        if self.submission.present? && avr.present? && sts.present? && self.trial.current_process_status_code(self.submission.id) == 'VNR' && self.trial.contains_milestone?(self.submission.id, sts.id)
          ProcessingStatusWrapper.create(status_date: Date.today, processing_status: avr, submission: self.submission, trial: self.trial)
        end
        self.trial.verification_date = self.created_at
        self.trial.save
      elsif self.milestone.code == 'LRD'
        if self.submission.present?
          rej = ProcessingStatus.find_by_code('REJ')
          if rej.present?
            ProcessingStatusWrapper.create(status_date: Date.today, processing_status: rej, submission: self.submission, trial: self.trial)
          end

          self.trial.is_rejected = true
          self.trial.save
        end
      end
    end
  end

  scope :by_value, ->  (value) {
    joins(:milestone).where("milestone_wrappers.milestone_id = milestones.id and milestones.code = ?","#{value.to_s}")
  }

  scope :latest, -> {
    order("updated_at DESC").first
  }

end
