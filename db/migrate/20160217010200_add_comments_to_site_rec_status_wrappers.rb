class AddCommentsToSiteRecStatusWrappers < ActiveRecord::Migration
  def change
    add_column :site_rec_status_wrappers, :comments, :text
  end
end
