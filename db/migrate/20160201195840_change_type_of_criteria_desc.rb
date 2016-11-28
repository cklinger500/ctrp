class ChangeTypeOfCriteriaDesc < ActiveRecord::Migration
  def change
    remove_column :other_criteria, :criteria_desc, :string
    add_column :other_criteria, :criteria_desc, :text
  end
end
