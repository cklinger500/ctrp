# == Schema Information
#
# Table name: trial_histories
#
#  id            :integer          not null, primary key
#  snapshot      :json
#  submission_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  uuid          :string(255)
#  lock_version  :integer          default(0)
#
# Indexes
#
#  index_trial_histories_on_submission_id  (submission_id)
#

require 'test_helper'

class TrialHistoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
