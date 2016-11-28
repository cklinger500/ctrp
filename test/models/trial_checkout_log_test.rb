# == Schema Information
#
# Table name: trial_checkout_logs
#
#  id               :integer          not null, primary key
#  trial_id         :integer
#  abstraction_type :string
#  category         :string
#  username         :string
#  full_name        :string
#  user_id          :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  result           :string
#  checkin_comment  :text
#
# Indexes
#
#  index_trial_checkout_logs_on_trial_id  (trial_id)
#  index_trial_checkout_logs_on_user_id   (user_id)
#

require 'test_helper'

class TrialCheckoutLogTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
