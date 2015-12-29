# == Schema Information
#
# Table name: tempgrants
#
#  id                :integer          not null, primary key
#  serial_number     :integer
#  institution_name  :string
#  project_title     :string
#  funding_mechanism :string
#  institute_code    :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_tempgrants_on_funding_mechanism  (funding_mechanism)
#  index_tempgrants_on_institute_code     (institute_code)
#

require 'test_helper'

class TempgrantsTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
