class AddCreatedByToMilestoneWrappers < ActiveRecord::Migration
  def change
    add_column :milestone_wrappers, :created_by, :string, :limit => 255
  end
end
