class AddSubmissionRefToTrialDocuments < ActiveRecord::Migration
  def change
    add_reference :trial_documents, :submission, index: true
    add_foreign_key :trial_documents, :submissions
  end
end
