class MakeTrialStatusWrapperDatesNullable < ActiveRecord::Migration
  def up
    change_column :trial_status_wrappers, :created_at, :timestamp, :null => true
    change_column :trial_status_wrappers, :updated_at, :timestamp, :null => true
  end
  def down
    change_column :trial_status_wrappers, :created_at, :timestamp, :null => false
    change_column :trial_status_wrappers, :updated_at, :timestamp, :null => false
  end
end

