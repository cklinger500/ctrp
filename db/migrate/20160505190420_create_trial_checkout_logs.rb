class CreateTrialCheckoutLogs < ActiveRecord::Migration
  def change
    create_table :trial_checkout_logs do |t|
      t.integer :trial_id
      t.string :type
      t.string :category
      t.string :username
      t.string :full_name
      t.references :trial, index: true
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :trial_checkout_logs, :trials
    add_foreign_key :trial_checkout_logs, :users
  end
end
