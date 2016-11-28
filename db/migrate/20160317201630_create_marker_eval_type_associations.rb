class CreateMarkerEvalTypeAssociations < ActiveRecord::Migration
  def change
    create_table :marker_eval_type_associations do |t|
      t.references :marker, index: true
      t.references :evaluation_type, index: true
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
