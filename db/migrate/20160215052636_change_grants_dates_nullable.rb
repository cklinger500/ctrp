class ChangeGrantsDatesNullable < ActiveRecord::Migration
  def change
    change_column :grants, :created_at, :timestamp, :null => true
    change_column :grants, :updated_at, :timestamp, :null => true
  end
end
