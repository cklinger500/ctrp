class ChangeAnatomicSiteWrappersUpdateNullable < ActiveRecord::Migration
  def change
    change_column :anatomic_site_wrappers, :updated_at, :timestamp, :null => true
  end
end
