class CreateNcitDiseaseParents < ActiveRecord::Migration
  def change
    create_table :ncit_disease_parents do |t|
      t.string :parent_disease_code, :limit => 255
      t.references :ncit_status, index: true
      t.references :child, references: :ncit_disease_codes, index: true
      t.references :parent, references: :ncit_disease_codes, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :ncit_disease_parents, :ncit_statuses
    add_foreign_key :ncit_disease_parents, :ncit_disease_codes, column: :child_id
    add_foreign_key :ncit_disease_parents, :ncit_disease_codes, column: :parent_id
  end
end
