class RemoveOwnerRefFromTrials < ActiveRecord::Migration
  def self.up
    remove_foreign_key :trials, column: :owner_id
    remove_reference :trials, :owner, references: :users, index: true
  end

  def self.down
    add_reference :trials, :owner, references: :users, index: true
    add_foreign_key :trials, :users, column: :owner_id
  end
end
