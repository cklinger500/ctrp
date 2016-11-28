class ChangeTrialDocumentsDatesNullable < ActiveRecord::Migration
  def change
    change_column :trial_documents, :created_at, :timestamp, :null => true
    change_column :trial_documents, :updated_at, :timestamp, :null => true
  end
end
