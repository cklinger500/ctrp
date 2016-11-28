# == Schema Information
#
# Table name: cadsr_marker_statuses
#
#  id           :integer          not null, primary key
#  code         :string
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

class CadsrMarkerStatus < ActiveRecord::Base
  include BasicConcerns
  validates :code, uniqueness: true
end
