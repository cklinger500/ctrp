class AddCategoryToInterventionType < ActiveRecord::Migration
  def change
    add_column :intervention_types, :category, :string
  end
end
