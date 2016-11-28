class AddDeletedByDeletionDateToTrialDocs < ActiveRecord::Migration
  def change
    add_column :trial_documents, :deleted_by, :string
    add_column :trial_documents,  :deletion_date, :date
  end
end
