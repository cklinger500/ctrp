class AddStatusRefToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :user_status, index: true
    add_foreign_key :users, :user_statuses
  end
end
