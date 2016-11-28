class AddExplanationToTrialStatus < ActiveRecord::Migration
  def change
    add_column :trial_statuses, :explanation, :string
  end
end
