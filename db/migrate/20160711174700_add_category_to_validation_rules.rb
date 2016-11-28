class AddCategoryToValidationRules < ActiveRecord::Migration
  def change
    add_column :validation_rules, :category, :string
  end
end
