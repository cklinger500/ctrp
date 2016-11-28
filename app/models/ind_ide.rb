# == Schema Information
#
# Table name: ind_ides
#
#  id             :integer          not null, primary key
#  ind_ide_type   :string(255)
#  grantor        :string(255)
#  nih_nci        :string(255)
#  holder_type_id :integer
#  trial_id       :integer
#  created_at     :datetime
#  updated_at     :datetime
#  uuid           :string(255)
#  lock_version   :integer          default(0)
#  ind_ide_number :string(255)
#
# Indexes
#
#  index_ind_ides_on_holder_type_id  (holder_type_id)
#  index_ind_ides_on_trial_id        (trial_id)
#

class IndIde < TrialBase
  include BasicConcerns

  belongs_to :holder_type
  belongs_to :trial

  validates :ind_ide_type, presence: true
  validates :grantor, presence: true
  validates :holder_type, presence: true
  validates :ind_ide_number, presence: true
  ## Audit Trail Callbacks
  after_save :touch_trial
  after_destroy :touch_trial

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

end
