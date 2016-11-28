class CreateTrialVersion < ActiveRecord::Migration
  def change
    create_table :trial_versions do |t|
      t.string   :item_type, :null => false
      t.integer  :item_id,   :null => false
      t.string   :event,     :null => false
      t.string   :whodunnit
      t.text     :object
      t.datetime :created_at
      t.text     :object_changes
      t.integer  :transaction_id
    end
    add_index :trial_versions, [:item_type, :item_id]
    add_index :trial_versions,  [:transaction_id]
  end
end
