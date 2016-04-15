# == Schema Information
#
# Table name: oversight_authorities
#
#  id           :integer          not null, primary key
#  country      :string(255)
#  organization :string(255)
#  trial_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

require 'test_helper'

class OversightAuthorityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
