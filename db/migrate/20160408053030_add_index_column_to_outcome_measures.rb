class AddIndexColumnToOutcomeMeasures < ActiveRecord::Migration
  def change
    add_column :outcome_measures, :index, :integer
  end
end
