class AddArmsGroupRefToInterventions < ActiveRecord::Migration
  def change
    remove_column :arms_groups, :intervention_text, :string
    add_reference :interventions, :arms_group, index: true
    add_foreign_key :interventions, :arms_groups
  end
end
