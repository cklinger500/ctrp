class AddLegacyPsidToPs < ActiveRecord::Migration
  def change
    add_column :participating_sites, :legacy_ps_id, :integer
  end
end
