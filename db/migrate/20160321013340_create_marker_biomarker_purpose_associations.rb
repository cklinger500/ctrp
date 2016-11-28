class CreateMarkerBiomarkerPurposeAssociations < ActiveRecord::Migration
  def change
    create_table :marker_biomarker_purpose_associations do |t|
      t.references :marker, index: true
      t.references :biomarker_purpose, index: {:name => "index_on_biomarker_purpose"}
      t.timestamps null: false
      t.ctrp_base_columns

    end
    add_foreign_key :marker_biomarker_purpose_associations, :markers
    add_foreign_key :marker_biomarker_purpose_associations, :biomarker_purposes
  end

end
