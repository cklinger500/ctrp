class AddSeveralColumnsToMilestoneWrappers < ActiveRecord::Migration
  def change
    add_column :milestone_wrappers, :comment, :text
    add_reference :milestone_wrappers, :milestone_type, index: true
    add_foreign_key :milestone_wrappers, :milestone_types
  end
end
