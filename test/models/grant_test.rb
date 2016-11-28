# == Schema Information
#
# Table name: grants
#
#  id                  :integer          not null, primary key
#  funding_mechanism   :string(255)
#  institute_code      :string(255)
#  nci                 :string(255)
#  trial_id            :integer
#  created_at          :datetime
#  updated_at          :datetime
#  uuid                :string(255)
#  lock_version        :integer          default(0)
#  serial_number       :string(255)
#  deletion_comment    :text
#  deleted_at          :datetime
#  deleted_by_username :string
#
# Indexes
#
#  index_grants_on_trial_id  (trial_id)
#

require 'test_helper'

class GrantTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
