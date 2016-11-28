class ChangeDescriptionColumnInNcitInterventions < ActiveRecord::Migration
  def change
    rename_column :ncit_interventions, :description, :definition
  end
end
