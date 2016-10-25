class AddProcessingStatusToPerson < ActiveRecord::Migration
  def change
    add_column :people, :processing_status, :string
  end
end
