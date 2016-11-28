# == Schema Information
#
# Table name: trial_documents
#
#  id               :integer          not null, primary key
#  file             :string
#  file_name        :string(255)
#  document_type    :string(255)
#  document_subtype :string(255)
#  added_by_id      :integer
#  trial_id         :integer
#  created_at       :datetime
#  updated_at       :datetime
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#  submission_id    :integer
#  status           :string           default("active")
#  why_deleted      :string
#  source_document  :string           default("Registry")
#  deleted_by       :string
#  deletion_date    :date
#
# Indexes
#
#  index_trial_documents_on_added_by_id    (added_by_id)
#  index_trial_documents_on_submission_id  (submission_id)
#  index_trial_documents_on_trial_id       (trial_id)
#

class TrialDocument < TrialBase

  belongs_to :added_by, class_name: "User"
  belongs_to :trial
  belongs_to :submission

  cattr_accessor :replaced_doc_id

  mount_uploader :file, TrialDocumentUploader

  before_create :save_submission_id

  ## Audit Trail Callbacks
  after_save :touch_trial
  after_destroy :touch_trial


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
    if does_trial_modified_during_this_transaction_size == 0 && self.trial.present?
      self.trial.update(updated_by:updated_by, updated_at:Time.now)
    end
  end


  # Return true if this is the latest document uploaded in its document type
  def is_latest
    latest_doc = TrialDocument.where("trial_id = ? AND document_type = ?", self.trial_id, self.document_type).order(:id).last
    return latest_doc.id == self.id
  end

  def save_submission_id
    self.submission_id = self.trial.submissions.last.id if self.trial.present? && self.trial.submissions.last.present?
  end
end
