class RemoveColumnsFromIndIdes < ActiveRecord::Migration
  def change
    remove_reference :ind_ides, :expanded_access_type, index: true
    remove_column :ind_ides, :expanded_access, :boolean
    remove_column :ind_ides, :exempt, :boolean
  end
end
