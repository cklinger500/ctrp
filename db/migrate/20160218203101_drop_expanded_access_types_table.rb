class DropExpandedAccessTypesTable < ActiveRecord::Migration
  def up
    drop_table :expanded_access_types if ActiveRecord::Base.connection.table_exists? 'expanded_access_types'
  end

  def down
  end
end
