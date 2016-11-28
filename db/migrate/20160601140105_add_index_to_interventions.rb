class AddIndexToInterventions < ActiveRecord::Migration
  def change
    add_index :interventions, :c_code
  end
end
