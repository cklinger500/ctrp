# == Schema Information
#
# Table name: ncit_disease_synonyms
#
#  id                   :integer          not null, primary key
#  alternate_name       :string(1000)
#  ncit_status_id       :integer
#  ncit_disease_code_id :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#
# Indexes
#
#  index_ncit_disease_synonyms_on_ncit_disease_code_id  (ncit_disease_code_id)
#  index_ncit_disease_synonyms_on_ncit_status_id        (ncit_status_id)
#

require 'test_helper'

class NcitDiseaseSynonymTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
