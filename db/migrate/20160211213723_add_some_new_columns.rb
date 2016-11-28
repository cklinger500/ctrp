class AddSomeNewColumns < ActiveRecord::Migration
  def change
    add_column :associated_trials, :official_title, :text
    add_column :markers, :evaluation_type_other, :string, :limit => 255
    add_column :markers, :assay_type_other, :string, :limit => 255
    add_column :markers, :specimen_type_other, :string, :limit => 255
  end
end
