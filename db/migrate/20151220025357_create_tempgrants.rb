class CreateTempgrants < ActiveRecord::Migration
  def change
    create_table :tempgrants do |t|
      t.integer :serial_number
      t.string :institution_name
      t.string :project_title
      t.string :funding_mechanism
      t.string :institute_code
      t.timestamps null: false
    end
  end
end
