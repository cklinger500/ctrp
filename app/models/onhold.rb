# == Schema Information
#
# Table name: onholds
#
#  id                 :integer          not null, primary key
#  onhold_desc        :text
#  onhold_date        :date
#  onhold_reason_id   :integer
#  trial_id           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  uuid               :string(255)
#  lock_version       :integer          default(0)
#  onhold_reason_code :string(255)
#  offhold_date       :date
#

class Onhold < ActiveRecord::Base
  include BasicConcerns

  belongs_to :onhold_reason
  belongs_to :trial
end
