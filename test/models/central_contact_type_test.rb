# == Schema Information
#
# Table name: central_contact_types
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  name         :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

require 'test_helper'

class CentralContactTypeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
