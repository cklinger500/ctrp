# == Schema Information
#
# Table name: markers
#
#  id                    :integer          not null, primary key
#  name                  :string(255)
#  record_status         :string(255)
#  biomarker_use_id      :integer
#  trial_id              :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  uuid                  :string(255)
#  lock_version          :integer          default(0)
#  evaluation_type_other :string(255)
#  assay_type_other      :string(255)
#  specimen_type_other   :string(255)
#  protocol_marker_name  :string(255)
#  cadsr_marker_id       :integer
#

require 'test_helper'

class MarkerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
