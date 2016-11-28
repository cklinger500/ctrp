class CreateNcitInterventions < ActiveRecord::Migration
  def change
    create_table :ncit_interventions do |t|
      t.string :preferred_name
      t.string :synonyms
      t.text :description
      t.references :ncit_status, index: true
      t.string :type_code
      t.string :ct_gov_type_code

      t.timestamps null: false
    end
    add_foreign_key :ncit_interventions, :ncit_statuses
  end
end
