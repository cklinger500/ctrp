class CreateArmsGroupsInterventionsAssociations < ActiveRecord::Migration
  def change
    create_table :arms_groups_interventions_associations do |t|
      t.references :arms_group, index: true
      t.references :intervention, index: true
      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :arms_groups_interventions_associations, :arms_groups
    add_foreign_key :arms_groups_interventions_associations, :interventions
  end
end
