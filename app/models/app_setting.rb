# == Schema Information
#
# Table name: app_settings
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  name         :string(255)
#  description  :text
#  value        :string(255)
#  big_value    :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

class AppSetting < ActiveRecord::Base
  include BasicConcerns
  validates :code, uniqueness: true
end
