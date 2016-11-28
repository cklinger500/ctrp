class RemoveStreetAddressAndZipcodeAndCountryAndStateFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :street_address, :text
    remove_column :users, :zipcode, :string
    remove_column :users, :country, :string
    remove_column :users, :state, :string
    remove_column :users, :city, :string
  end
end
