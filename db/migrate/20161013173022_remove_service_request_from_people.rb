class RemoveServiceRequestFromPeople < ActiveRecord::Migration
  def change
    remove_column :people, :service_request
  end
end