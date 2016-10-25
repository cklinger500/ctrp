class AddStatustoSourceStatuses < ActiveRecord::Migration
  def change
    add_column :source_statuses, :record_status, :string
  end
end
