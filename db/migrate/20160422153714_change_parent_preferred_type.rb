class ChangeParentPreferredType < ActiveRecord::Migration
  def self.up
    change_column :diseases, :parent_preferred, :text
  end
  def self.down
    change_column :diseases, :parent_preferred, :string
  end
end
