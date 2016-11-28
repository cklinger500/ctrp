class AddWhyDeletedToTrialDocuments < ActiveRecord::Migration
  def change
    add_column :trial_documents, :why_deleted, :string
  end
end
