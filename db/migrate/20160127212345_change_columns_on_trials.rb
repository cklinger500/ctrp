class ChangeColumnsOnTrials < ActiveRecord::Migration
  def change
    remove_column :trials, :receive_email, :boolean
    add_column :trials, :biospecimen_desc, :text
  end
end
