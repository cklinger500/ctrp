class ChangeTrialOwnershipsDatesNullable < ActiveRecord::Migration
  def change
    change_column :trial_ownerships, :created_at, :timestamp, :null => true
    change_column :trial_ownerships, :updated_at, :timestamp, :null => true
  end
end

