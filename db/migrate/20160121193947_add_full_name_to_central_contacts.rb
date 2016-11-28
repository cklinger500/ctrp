class AddFullNameToCentralContacts < ActiveRecord::Migration
  def change
    add_column :central_contacts, :fullname, :string
  end
end
