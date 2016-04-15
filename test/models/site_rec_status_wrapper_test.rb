# == Schema Information
#
# Table name: site_rec_status_wrappers
#
#  id                         :integer          not null, primary key
#  status_date                :date
#  site_recruitment_status_id :integer
#  participating_site_id      :integer
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  uuid                       :string(255)
#  lock_version               :integer          default(0)
#  comments                   :text
#

require 'test_helper'

class SiteRecStatusWrapperTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
