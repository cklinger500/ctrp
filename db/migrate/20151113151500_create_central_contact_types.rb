class CreateCentralContactTypes < ActiveRecord::Migration
  def change
    create_table :central_contact_types do |t|

      t.static_member_base_columns
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
