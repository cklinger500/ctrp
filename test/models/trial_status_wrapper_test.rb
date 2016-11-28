# == Schema Information
#
# Table name: trial_status_wrappers
#
#  id              :integer          not null, primary key
#  status_date     :date
#  why_stopped     :text
#  trial_status_id :integer
#  trial_id        :integer
#  created_at      :datetime
#  updated_at      :datetime
#  uuid            :string(255)
#  lock_version    :integer          default(0)
#  comment         :text
#
# Indexes
#
#  index_trial_status_wrappers_on_trial_id         (trial_id)
#  index_trial_status_wrappers_on_trial_status_id  (trial_status_id)
#

require 'test_helper'

class TrialStatusWrapperTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
