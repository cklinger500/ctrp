class OrganizationRevisited < ActiveRecord::Migration
    def change
      add_column :organizations, :processing_status, :string
      add_column :organizations, :address3, :string
    end
end
