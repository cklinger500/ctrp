class AddEndedAtToTrialOwnerships < ActiveRecord::Migration
  def change
    add_column :trial_ownerships, :ended_at, :datetime
  end
end
