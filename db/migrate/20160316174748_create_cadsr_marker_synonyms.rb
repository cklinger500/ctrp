class CreateCadsrMarkerSynonyms < ActiveRecord::Migration
  def change
    create_table :cadsr_marker_synonyms do |t|
      t.string     :alternate_name
      t.references :cadsr_marker, index: true
      t.references :cadsr_marker_status, index: true
      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :cadsr_marker_synonyms, :cadsr_markers
    add_foreign_key :cadsr_marker_synonyms, :cadsr_marker_statuses

  end
end
