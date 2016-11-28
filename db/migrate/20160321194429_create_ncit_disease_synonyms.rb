class CreateNcitDiseaseSynonyms < ActiveRecord::Migration
  def change
    create_table :ncit_disease_synonyms do |t|
      t.string :alternate_name, :limit => 1000
      t.references :ncit_status, index: true
      t.references :ncit_disease_code, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :ncit_disease_synonyms, :ncit_statuses
    add_foreign_key :ncit_disease_synonyms, :ncit_disease_codes
  end
end
