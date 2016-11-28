# == Schema Information
#
# Table name: validation_rules
#
#  id          :integer          not null, primary key
#  code        :string
#  section     :string
#  item        :string
#  rule        :string
#  description :text
#  remark      :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  model       :string
#  category    :string
#

require 'test_helper'

class ValidationRuleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
