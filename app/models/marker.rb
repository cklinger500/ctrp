# == Schema Information
#
# Table name: markers
#
#  id                    :integer          not null, primary key
#  name                  :string(255)
#  record_status         :string(255)
#  biomarker_use_id      :integer
#  trial_id              :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  uuid                  :string(255)
#  lock_version          :integer          default(0)
#  evaluation_type_other :string(255)
#  assay_type_other      :string(255)
#  specimen_type_other   :string(255)
#  protocol_marker_name  :string(255)
#  cadsr_marker_id       :integer
#
# Indexes
#
#  index_markers_on_biomarker_use_id  (biomarker_use_id)
#  index_markers_on_cadsr_marker_id   (cadsr_marker_id)
#  index_markers_on_trial_id          (trial_id)
#

class Marker < TrialBase
  include BasicConcerns

  belongs_to :biomarker_use
  belongs_to :trial
  has_many   :marker_assay_type_associations, dependent: :destroy
  has_many   :marker_eval_type_associations, dependent: :destroy
  has_many   :marker_spec_type_associations, dependent: :destroy
  has_many   :marker_biomarker_purpose_associations, dependent: :destroy

  validates :protocol_marker_name, length: { maximum: 255 }

  accepts_nested_attributes_for  :marker_assay_type_associations, allow_destroy: true
  accepts_nested_attributes_for  :marker_eval_type_associations, allow_destroy: true
  accepts_nested_attributes_for  :marker_spec_type_associations, allow_destroy: true
  accepts_nested_attributes_for  :marker_biomarker_purpose_associations, allow_destroy: true

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
