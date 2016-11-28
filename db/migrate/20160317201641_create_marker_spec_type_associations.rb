class CreateMarkerSpecTypeAssociations < ActiveRecord::Migration
  def change
    create_table :marker_spec_type_associations do |t|
      t.references :marker, index: true
      t.references :specimen_type, index: true
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
