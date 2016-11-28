class AddIndexToNcitInterventions < ActiveRecord::Migration
  def change
    add_index :ncit_interventions, :preferred_name
  end
end
