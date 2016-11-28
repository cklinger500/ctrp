# == Schema Information
#
# Table name: outcome_measures
#
#  id                      :integer          not null, primary key
#  title                   :text
#  time_frame              :string(255)
#  description             :text
#  safety_issue            :string(255)
#  outcome_measure_type_id :integer
#  trial_id                :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  uuid                    :string(255)
#  lock_version            :integer          default(0)
#  index                   :integer
#
# Indexes
#
#  index_outcome_measures_on_outcome_measure_type_id  (outcome_measure_type_id)
#  index_outcome_measures_on_trial_id                 (trial_id)
#

class OutcomeMeasure < TrialBase
  include BasicConcerns

  belongs_to :outcome_measure_type
  belongs_to :trial

  after_create :save_index

  ## Audit Trail Callbacks
  after_save :touch_trial
  after_destroy :touch_trial

  validates :title, length: {maximum: 254}
  validates :time_frame, length: {maximum: 254}
  validates :description, length: {maximum: 999}


  private

  def touch_trial
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

  def save_index
    max=OutcomeMeasure.maximum('index')
    if max.nil?
      p "max"
      new_index=0
    else
      new_index=max.next
    end
    self.index=new_index
    self.save!
  end
end
