class AddAssociationStartDateToPerson < ActiveRecord::Migration
  def change
    add_column :people, :association_start_date, :datetime
  end
end
