class AddCCodeToNcitInterventions < ActiveRecord::Migration
  def change
    add_column :ncit_interventions, :c_code, :string
  end
end
