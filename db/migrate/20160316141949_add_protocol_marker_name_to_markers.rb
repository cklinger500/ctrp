class AddProtocolMarkerNameToMarkers < ActiveRecord::Migration
  def change
    add_column :markers, :protocol_marker_name, :string, :limit => 255
  end
end
