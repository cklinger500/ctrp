class ChangeSubmissionDatesNullable < ActiveRecord::Migration
  def change
    change_column :submissions, :created_at, :timestamp, :null => true
    change_column :submissions, :updated_at, :timestamp, :null => true
  end
end
