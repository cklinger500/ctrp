class AddSubmissionRefToProcessingStatusWrappers < ActiveRecord::Migration
  def change
    add_reference :processing_status_wrappers, :submission, index: true
    add_foreign_key :processing_status_wrappers, :submissions
  end
end
