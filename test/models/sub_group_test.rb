# == Schema Information
#
# Table name: sub_groups
#
#  id           :integer          not null, primary key
#  label        :string(255)
#  description  :text
#  trial_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#  index        :integer
#
# Indexes
#
#  index_sub_groups_on_trial_id  (trial_id)
#

require 'test_helper'

class SubGroupTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
