class AddResultToTrialCheckoutLog < ActiveRecord::Migration
  def change
    add_column :trial_checkout_logs, :result, :string
  end
end
