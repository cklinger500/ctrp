class CreateCtGovImportExports < ActiveRecord::Migration
  def change
    create_table :ct_gov_import_exports do |t|
      t.string :from, :limit => 255
      t.string :to, :limit => 255
      t.string :import_or_export, :limit => 255
      t.string :model, :limit =>255
      t.timestamps null: false
      t.ctrp_base_columns
      t.timestamps null: false
    end
  end
end
