class ColumnChangesOnTwoTables < ActiveRecord::Migration
  def change
    remove_column :other_criteria, :criteria_name, :text
    remove_column :other_criteria, :operator, :string
    remove_column :other_criteria, :value, :string
    remove_column :other_criteria, :unit, :string

    remove_column :diseases, :in_xml, :string
    add_column :diseases, :rank, :string, :limit => 255
  end
end
