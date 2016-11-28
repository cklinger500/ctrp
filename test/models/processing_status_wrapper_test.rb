# == Schema Information
#
# Table name: processing_status_wrappers
#
#  id                   :integer          not null, primary key
#  status_date          :date
#  processing_status_id :integer
#  trial_id             :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#  submission_id        :integer
#
# Indexes
#
#  index_processing_status_wrappers_on_processing_status_id  (processing_status_id)
#  index_processing_status_wrappers_on_submission_id         (submission_id)
#  index_processing_status_wrappers_on_trial_id              (trial_id)
#

require 'test_helper'

class ProcessingStatusWrapperTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
