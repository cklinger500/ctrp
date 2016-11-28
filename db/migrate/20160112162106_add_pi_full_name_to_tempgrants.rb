class AddPiFullNameToTempgrants < ActiveRecord::Migration
  def change
    add_column :tempgrants, :pi_full_name, :string, :limit => 255
  end
end
