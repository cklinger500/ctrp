class ChangeNciSpecCommentToStringInTrials < ActiveRecord::Migration
  def change
    change_column :trials, :nci_specific_comment, :string, :limit => 4000
  end
end
