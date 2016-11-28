class ChangeSecondaryPurposeOtherType < ActiveRecord::Migration
  def self.up
    change_column :trials, :secondary_purpose_other, :text
  end
  def self.down
    change_column :trials, :secondary_purpose_other, :string
  end
end
