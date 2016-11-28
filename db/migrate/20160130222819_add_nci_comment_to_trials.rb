class AddNciCommentToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :nci_specific_comment, :text
  end
end
