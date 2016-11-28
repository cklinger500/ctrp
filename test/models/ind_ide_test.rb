# == Schema Information
#
# Table name: ind_ides
#
#  id             :integer          not null, primary key
#  ind_ide_type   :string(255)
#  grantor        :string(255)
#  nih_nci        :string(255)
#  holder_type_id :integer
#  trial_id       :integer
#  created_at     :datetime
#  updated_at     :datetime
#  uuid           :string(255)
#  lock_version   :integer          default(0)
#  ind_ide_number :string(255)
#
# Indexes
#
#  index_ind_ides_on_holder_type_id  (holder_type_id)
#  index_ind_ides_on_trial_id        (trial_id)
#

require 'test_helper'

class IndIdeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
