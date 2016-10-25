# == Schema Information
#
# Table name: processing_status_wrappers
#
#  id                   :integer          not null, primary key
#  status_date          :date
#  processing_status_id :integer
#  trial_id             :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#  submission_id        :integer
#
# Indexes
#
#  index_processing_status_wrappers_on_processing_status_id  (processing_status_id)
#  index_processing_status_wrappers_on_submission_id         (submission_id)
#  index_processing_status_wrappers_on_trial_id              (trial_id)
#

class ProcessingStatusWrapper < TrialBase
  belongs_to :processing_status
  belongs_to :submission
  belongs_to :trial

  ## Audit Trail Callbacks
  after_save :touch_trial
  after_destroy :touch_trial

  scope :latest, -> {
    order("updated_at DESC").first
  }

  private

  def touch_trial
    if self.trial.edit_type.nil?
      ##Note down edit_type is null when processing status is being added from abstraction page, so we need to touch trial only in this case
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

end
