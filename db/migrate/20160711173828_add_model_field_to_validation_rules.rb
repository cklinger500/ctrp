class AddModelFieldToValidationRules < ActiveRecord::Migration
  def change
    add_column :validation_rules, :model, :string
  end
end
