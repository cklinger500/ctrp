class CreateOrgFundingMechanisms < ActiveRecord::Migration
  def change
    create_table :org_funding_mechanisms do |t|
      t.static_member_base_columns
      t.string :record_status
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
