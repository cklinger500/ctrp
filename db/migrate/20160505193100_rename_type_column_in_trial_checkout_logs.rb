class RenameTypeColumnInTrialCheckoutLogs < ActiveRecord::Migration
  def change
    rename_column :trial_checkout_logs, :type, :abstraction_type
  end
end
