class CreateValidationRules < ActiveRecord::Migration
  def change
    create_table :validation_rules do |t|
      t.string :code
      t.string :section
      t.string :item
      t.string :type
      t.string :rule
      t.text :description
      t.text :remark

      t.timestamps null: false
    end
  end
end
