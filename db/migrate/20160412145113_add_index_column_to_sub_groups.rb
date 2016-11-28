class AddIndexColumnToSubGroups < ActiveRecord::Migration
  def change
    add_column :sub_groups, :index, :integer
  end
end
