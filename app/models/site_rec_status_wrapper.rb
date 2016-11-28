# == Schema Information
#
# Table name: site_rec_status_wrappers
#
#  id                         :integer          not null, primary key
#  status_date                :date
#  site_recruitment_status_id :integer
#  participating_site_id      :integer
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  uuid                       :string(255)
#  lock_version               :integer          default(0)
#  comments                   :text
#
# Indexes
#
#  index_site_rec_status_wrappers_on_participating_site_id       (participating_site_id)
#  index_site_rec_status_wrappers_on_site_recruitment_status_id  (site_recruitment_status_id)
#

class SiteRecStatusWrapper < ActiveRecord::Base
  include BasicConcerns

  belongs_to :site_recruitment_status
  belongs_to :participating_site
end
