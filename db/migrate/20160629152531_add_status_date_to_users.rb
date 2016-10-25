class AddStatusDateToUsers < ActiveRecord::Migration
  def change
    add_column :users, :status_date, :datetime
  end
end
