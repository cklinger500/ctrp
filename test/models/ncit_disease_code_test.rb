# == Schema Information
#
# Table name: ncit_disease_codes
#
#  id                :integer          not null, primary key
#  disease_code      :string(255)
#  nt_term_id        :string(255)
#  preferred_name    :string(1000)
#  menu_display_name :string(1000)
#  ncit_status_id    :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#
# Indexes
#
#  index_ncit_disease_codes_on_ncit_status_id  (ncit_status_id)
#

require 'test_helper'

class NcitDiseaseCodeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
