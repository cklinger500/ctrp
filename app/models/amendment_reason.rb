# == Schema Information
#
# Table name: amendment_reasons
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  name         :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

class AmendmentReason < ActiveRecord::Base
  include BasicConcerns
  has_many :trials
  validates :code, uniqueness: true
end
