# == Schema Information
#
# Table name: trial_ownerships
#
#  id           :integer          not null, primary key
#  trial_id     :integer
#  user_id      :integer
#  created_at   :datetime
#  updated_at   :datetime
#  uuid         :string(255)
#  lock_version :integer          default(0)
#  ended_at     :datetime
#
# Indexes
#
#  index_trial_ownerships_on_trial_id  (trial_id)
#  index_trial_ownerships_on_user_id   (user_id)
#

require 'test_helper'

class TrialOwnershipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
