class AddIndexFieldToOtherCriteria < ActiveRecord::Migration
  def change
    add_column :other_criteria, :index, :integer
  end
end
