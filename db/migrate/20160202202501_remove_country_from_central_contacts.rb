class RemoveCountryFromCentralContacts < ActiveRecord::Migration
  def change
    remove_column :central_contacts, :country, :string
  end
end
