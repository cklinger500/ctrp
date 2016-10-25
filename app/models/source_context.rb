# == Schema Information
#
# Table name: source_contexts
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  name         :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

class SourceContext < ActiveRecord::Base
  include BasicConcerns
  has_many :source_statuses
  validates :code, uniqueness: true
end
