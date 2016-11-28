class RemoveTypeColumnFromValidationRules < ActiveRecord::Migration
  def change
    remove_column :validation_rules, :type
  end
end
