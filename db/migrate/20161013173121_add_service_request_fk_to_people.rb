class AddServiceRequestFkToPeople < ActiveRecord::Migration
  def change
    add_reference :people, :service_request, index:true
    add_foreign_key :people, :service_requests
  end
end