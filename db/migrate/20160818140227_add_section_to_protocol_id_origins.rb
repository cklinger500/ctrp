class AddSectionToProtocolIdOrigins < ActiveRecord::Migration
  def change
    add_column :protocol_id_origins, :section, :string
  end
end
