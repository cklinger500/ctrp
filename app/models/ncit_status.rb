# == Schema Information
#
# Table name: ncit_statuses
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  name         :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

class NcitStatus < ActiveRecord::Base
  include BasicConcerns

  has_many  :ncit_interventions
end
