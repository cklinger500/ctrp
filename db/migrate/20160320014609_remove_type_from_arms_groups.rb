class RemoveTypeFromArmsGroups < ActiveRecord::Migration
  def change
    remove_column :arms_groups, :type, :string
    add_column :arms_groups, :arms_groups_type, :string
  end
end
