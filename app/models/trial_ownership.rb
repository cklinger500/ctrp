# == Schema Information
#
# Table name: trial_ownerships
#
#  id           :integer          not null, primary key
#  trial_id     :integer
#  user_id      :integer
#  created_at   :datetime
#  updated_at   :datetime
#  ended_at     :datetime
#  uuid         :string(255)
#  lock_version :integer          default(0)
#
# Indexes
#
#  index_trial_ownerships_on_trial_id  (trial_id)
#  index_trial_ownerships_on_user_id   (user_id)
#

class TrialOwnership < TrialBase
  belongs_to :trial
  belongs_to :user

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



  scope :matches, -> (column, value) {
    join_clause  = "LEFT JOIN trials owned_trial ON trial_ownerships.trial_id = owned_trial.id "
    join_clause += "LEFT JOIN users ON trial_ownerships.user_id = users.id "


    if column == 'internal_source_id'
      joins(join_clause).where("owned_trial.internal_source_id = #{value}")
     elsif column == 'user_id'
      joins(join_clause).where("owned_trial.nci_id is not null and trial_ownerships.user_id = #{value}
                                AND (is_rejected = 'f' OR is_rejected IS NULL)
                                AND trial_ownerships.trial_id is not null AND trial_ownerships.ended_at is null")
    end
  }

end
