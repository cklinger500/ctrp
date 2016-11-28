class AddPhoneAndCityToUsers < ActiveRecord::Migration
  def change
    add_column :users, :phone, :string
    add_column :users, :city, :string
  end
end
