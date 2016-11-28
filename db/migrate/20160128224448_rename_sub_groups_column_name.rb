class RenameSubGroupsColumnName < ActiveRecord::Migration
  def change
    rename_column :sub_groups, :code, :label
  end
end
