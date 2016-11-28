class AddRegistrationTypeToPeople < ActiveRecord::Migration
  def change
    add_column :people, :registration_type, :string
  end
end
