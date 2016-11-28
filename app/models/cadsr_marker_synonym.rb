# == Schema Information
#
# Table name: cadsr_marker_synonyms
#
#  id                     :integer          not null, primary key
#  alternate_name         :string
#  cadsr_marker_id        :integer
#  cadsr_marker_status_id :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  uuid                   :string(255)
#  lock_version           :integer          default(0)
#
# Indexes
#
#  index_cadsr_marker_synonyms_on_cadsr_marker_id         (cadsr_marker_id)
#  index_cadsr_marker_synonyms_on_cadsr_marker_status_id  (cadsr_marker_status_id)
#

class CadsrMarkerSynonym < ActiveRecord::Base
  include BasicConcerns
  belongs_to  :cadsr_marker
  belongs_to  :cadsr_marker_status
end
