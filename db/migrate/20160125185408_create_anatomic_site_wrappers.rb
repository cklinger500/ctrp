class CreateAnatomicSiteWrappers < ActiveRecord::Migration
  def change
    create_table :anatomic_site_wrappers do |t|
      t.references :anatomic_site, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :anatomic_site_wrappers, :anatomic_sites
    add_foreign_key :anatomic_site_wrappers, :trials
  end
end
