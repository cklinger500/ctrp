class AddSendTrialFlagToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :send_trial_flag, :string
  end
end
