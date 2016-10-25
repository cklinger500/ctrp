class RemoveFaxFromOrganizations < ActiveRecord::Migration
  def change
    remove_column :organizations, :fax, :string
  end
end
