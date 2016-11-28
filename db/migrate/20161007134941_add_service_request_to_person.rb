class AddServiceRequestToPerson < ActiveRecord::Migration
  def change
    add_column :people, :service_request, :string
  end
end
