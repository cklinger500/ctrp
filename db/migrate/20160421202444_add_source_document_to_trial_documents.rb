class AddSourceDocumentToTrialDocuments < ActiveRecord::Migration
  def change
    add_column :trial_documents, :source_document, :string, :default => "Registry"
  end

end
