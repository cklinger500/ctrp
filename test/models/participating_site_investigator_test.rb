# == Schema Information
#
# Table name: participating_site_investigators
#
#  id                    :integer          not null, primary key
#  participating_site_id :integer
#  person_id             :integer
#  set_as_contact        :boolean
#  investigator_type     :string(255)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  uuid                  :string(255)
#  lock_version          :integer          default(0)
#
# Indexes
#
#  index_participating_site_investigators_on_participating_site_id  (participating_site_id)
#  index_participating_site_investigators_on_person_id              (person_id)
#

require 'test_helper'

class ParticipatingSiteInvestigatorTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
