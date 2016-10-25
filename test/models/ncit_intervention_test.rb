# == Schema Information
#
# Table name: ncit_interventions
#
#  id               :integer          not null, primary key
#  preferred_name   :string
#  synonyms         :string
#  definition       :text
#  ncit_status_id   :integer
#  type_code        :string
#  ct_gov_type_code :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  c_code           :string
#
# Indexes
#
#  index_ncit_interventions_on_c_code          (c_code)
#  index_ncit_interventions_on_ncit_status_id  (ncit_status_id)
#  index_ncit_interventions_on_preferred_name  (preferred_name)
#

require 'test_helper'

class NcitInterventionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
