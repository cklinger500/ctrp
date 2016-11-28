class ChangeIndideDatesNullable < ActiveRecord::Migration
    def change
      change_column :ind_ides, :created_at, :timestamp, :null => true
      change_column :ind_ides, :updated_at, :timestamp, :null => true
    end
end
