class CreateInterventions < ActiveRecord::Migration
  def change
    create_table :interventions do |t|
      t.string :name, :limit => 255
      t.string :other_name, :limit => 255
      t.text :description
      # t.references :intervention_type_cancer_gov, index: true
      # t.references :intervention_type_ct_gov, index: true
      t.references :intervention_type, index: true
      t.references :trial, index: true
      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :interventions, :intervention_types
    add_foreign_key :interventions, :trials
  end
end
