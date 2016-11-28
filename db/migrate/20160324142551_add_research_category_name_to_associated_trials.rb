class AddResearchCategoryNameToAssociatedTrials < ActiveRecord::Migration
  def change
    add_column :associated_trials, :research_category_name, :string
  end
end
