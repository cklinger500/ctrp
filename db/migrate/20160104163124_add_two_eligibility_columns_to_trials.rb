class AddTwoEligibilityColumnsToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :sampling_method, :string, :limit => 255
    add_column :trials, :study_pop_desc, :text
  end
end
