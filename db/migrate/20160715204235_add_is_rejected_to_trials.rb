class AddIsRejectedToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :is_rejected, :boolean
  end
end
