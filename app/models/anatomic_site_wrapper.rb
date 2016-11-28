# == Schema Information
#
# Table name: anatomic_site_wrappers
#
#  id               :integer          not null, primary key
#  anatomic_site_id :integer
#  trial_id         :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#
# Indexes
#
#  index_anatomic_site_wrappers_on_anatomic_site_id  (anatomic_site_id)
#  index_anatomic_site_wrappers_on_trial_id          (trial_id)
#

class AnatomicSiteWrapper < ActiveRecord::Base
  include BasicConcerns

  belongs_to :anatomic_site
  belongs_to :trial
end
