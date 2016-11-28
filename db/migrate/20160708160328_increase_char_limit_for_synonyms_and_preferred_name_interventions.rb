class IncreaseCharLimitForSynonymsAndPreferredNameInterventions < ActiveRecord::Migration
  def change
    change_column :interventions, :name, :string, :limit => 1000
    change_column :interventions, :other_name, :string, :limit => 1000
  end
end
