class CreateTrialOwnerships < ActiveRecord::Migration
  def change
    create_table :trial_ownerships do |t|
      t.references :trial, index: true
      t.references :user, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trial_ownerships, :trials
    add_foreign_key :trial_ownerships, :users
  end
end
