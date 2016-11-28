class AddCheckinCommentToTrialCheckoutLog < ActiveRecord::Migration
  def change
    add_column :trial_checkout_logs, :checkin_comment, :text
  end
end
