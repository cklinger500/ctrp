class AddAssociationDateToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :association_date, :timestamp
  end
end
