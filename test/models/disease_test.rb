# == Schema Information
#
# Table name: diseases
#
#  id               :integer          not null, primary key
#  preferred_name   :string(255)
#  code             :string(255)
#  thesaurus_id     :string(255)
#  display_name     :string(255)
#  parent_preferred :text
#  trial_id         :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#  rank             :string(255)
#
# Indexes
#
#  index_diseases_on_trial_id  (trial_id)
#

require 'test_helper'

class DiseaseTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
