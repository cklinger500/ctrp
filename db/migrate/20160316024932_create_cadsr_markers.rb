class CreateCadsrMarkers < ActiveRecord::Migration
  def change
    create_table :cadsr_markers do |t|
      t.string   :name ,:limit=>2000
      t.string   :meaning,:limit=>2000
      t.text     :description
      t.integer  :cadsr_id
      t.string   :nv_term_identifier,:limit=>200
      t.string   :pv_name,:limit=>2000

      t.references :cadsr_marker_status, index: true
      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :cadsr_markers, :cadsr_marker_statuses
  end
end