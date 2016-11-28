class AddContactTypeToParticipatingSites < ActiveRecord::Migration
  def change
    add_column :participating_sites, :contact_type, :string, :limit => 255
  end
end
