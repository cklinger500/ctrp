# == Schema Information
#
# Table name: arms_groups
#
#  id                :integer          not null, primary key
#  label             :string(255)
#  description       :text
#  trial_id          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  arms_groups_type  :string
#  intervention_text :string
#

require 'test_helper'

class ArmsGroupTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
