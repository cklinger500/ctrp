# == Schema Information
#
# Table name: people
#
#  id                :integer          not null, primary key
#  source_id         :string(255)
#  prefix            :string(255)
#  suffix            :string(255)
#  email             :string(255)
#  phone             :string(255)
#  source_status_id  :integer
#  source_context_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  fname             :string(255)
#  mname             :string(255)
#  lname             :string(255)
#  ctrp_id           :integer
#  created_by        :string
#  updated_by        :string
#  extension         :string(255)
#

require 'test_helper'

class PersonTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
