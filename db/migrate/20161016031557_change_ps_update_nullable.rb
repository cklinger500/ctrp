class ChangePsUpdateNullable < ActiveRecord::Migration
  def change
    change_column :participating_sites, :updated_at, :timestamp, :null => true
  end
end
