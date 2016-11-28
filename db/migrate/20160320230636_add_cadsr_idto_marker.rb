class AddCadsrIdtoMarker < ActiveRecord::Migration
  def change
      add_reference :markers,  :cadsr_marker, index: true
      add_foreign_key :markers, :cadsr_markers
  end
end
