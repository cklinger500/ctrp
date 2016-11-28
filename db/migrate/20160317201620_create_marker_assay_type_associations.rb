class CreateMarkerAssayTypeAssociations < ActiveRecord::Migration
  def change
    create_table :marker_assay_type_associations do |t|

      t.references :marker, index: true
      t.references :assay_type, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :marker_assay_type_associations, :markers
    add_foreign_key :marker_assay_type_associations, :assay_types
  end
end
