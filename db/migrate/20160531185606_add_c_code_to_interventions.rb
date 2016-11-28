class AddCCodeToInterventions < ActiveRecord::Migration
  def change
    add_column :interventions, :c_code, :string
  end
end
