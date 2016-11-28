# == Schema Information
#
# Table name: alternate_titles
#
#  id           :integer          not null, primary key
#  category     :string(255)
#  title        :text
#  trial_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#  source       :string
#
# Indexes
#
#  index_alternate_titles_on_trial_id  (trial_id)
#

require 'test_helper'

class AlternateTitleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
