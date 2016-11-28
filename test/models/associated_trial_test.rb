# == Schema Information
#
# Table name: associated_trials
#
#  id                     :integer          not null, primary key
#  trial_identifier       :string(255)
#  identifier_type_id     :integer
#  trial_id               :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  uuid                   :string(255)
#  lock_version           :integer          default(0)
#  official_title         :text
#  research_category_name :string
#
# Indexes
#
#  index_associated_trials_on_identifier_type_id  (identifier_type_id)
#  index_associated_trials_on_trial_id            (trial_id)
#

require 'test_helper'

class AssociatedTrialTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
