class AddCommentsToGrants < ActiveRecord::Migration
  def change
    add_column :grants, :deletion_comment, :text
    add_column :grants, :deleted_at, :timestamp
    add_column :grants, :deleted_by_username, :string
  end
end
