class AddIndexCCodeToNcitInterventions < ActiveRecord::Migration
  def change
    add_index :ncit_interventions, :c_code
  end
end
