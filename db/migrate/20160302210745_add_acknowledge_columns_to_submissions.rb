class AddAcknowledgeColumnsToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :acknowledge, :string, :limit => 255
    add_column :submissions, :acknowledge_comment, :text
    add_column :submissions, :acknowledge_date, :date
    add_column :submissions, :acknowledged_by, :string, :limit => 255
  end
end
