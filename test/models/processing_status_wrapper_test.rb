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

require 'test_helper'

class ProcessingStatusWrapperTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
