class AddIndexToIntervention < ActiveRecord::Migration
  def change
    add_column :interventions, :index, :integer
  end
end
