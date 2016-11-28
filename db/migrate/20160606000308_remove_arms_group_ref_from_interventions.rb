class RemoveArmsGroupRefFromInterventions < ActiveRecord::Migration
  def change
    remove_foreign_key :interventions,:arms_group
    remove_reference :interventions, :arms_group
  end
end
