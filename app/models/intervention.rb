# == Schema Information
#
# Table name: interventions
#
#  id                   :integer          not null, primary key
#  name                 :string(1000)
#  other_name           :string(1000)
#  description          :text
#  intervention_type_id :integer
#  trial_id             :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#  index                :integer
#  c_code               :string
#
# Indexes
#
#  index_interventions_on_c_code                (c_code)
#  index_interventions_on_intervention_type_id  (intervention_type_id)
#  index_interventions_on_trial_id              (trial_id)
#

class Intervention < TrialBase
  include BasicConcerns

  # belongs_to :intervention_type_cancer_gov, :class_name => 'InterventionType'
  # belongs_to :intervention_type_ct_gov, :class_name => 'InterventionType'

  belongs_to :intervention_type
  belongs_to :trial
  has_many :arms_groups_interventions_associations, dependent: :destroy

  validates :description, length: {maximum: 1000}

  after_save :update_intervention_type

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

  # update intervention types for all records with the same intervention name if the intervention type changes for this intervention
  def update_intervention_type
    if self.c_code_was == self.c_code and self.intervention_type_id_was != self.intervention_type_id
      Intervention.where(c_code: self.c_code).update_all(intervention_type_id: self.intervention_type_id)
    end
  end

end
