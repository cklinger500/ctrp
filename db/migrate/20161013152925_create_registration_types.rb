class CreateRegistrationTypes < ActiveRecord::Migration
  def change
    create_table :registration_types do |t|
      t.string :code, :limit => 255
      t.string :name, :limit => 255

      t.timestamps null: false
    end
  end
end
