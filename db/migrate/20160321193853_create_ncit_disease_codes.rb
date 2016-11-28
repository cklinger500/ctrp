class CreateNcitDiseaseCodes < ActiveRecord::Migration
  def change
    create_table :ncit_disease_codes do |t|
      t.string :disease_code, :limit => 255
      t.string :nt_term_id, :limit => 255
      t.string :preferred_name, :limit => 1000
      t.string :menu_display_name, :limit => 1000
      t.references :ncit_status, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :ncit_disease_codes, :ncit_statuses
  end
end
