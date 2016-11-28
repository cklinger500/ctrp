class AddStatusToTrialDocument < ActiveRecord::Migration
  def change
    add_column :trial_documents, :status, :string, :default => 'active'
  end
end
