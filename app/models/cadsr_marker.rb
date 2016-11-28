# == Schema Information
#
# Table name: cadsr_markers
#
#  id                     :integer          not null, primary key
#  name                   :string(2000)
#  meaning                :string(2000)
#  description            :text
#  cadsr_id               :integer
#  nv_term_identifier     :string(200)
#  pv_name                :string(2000)
#  cadsr_marker_status_id :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  uuid                   :string(255)
#  lock_version           :integer          default(0)
#
# Indexes
#
#  index_cadsr_markers_on_cadsr_marker_status_id  (cadsr_marker_status_id)
#

class CadsrMarker < ActiveRecord::Base
  include BasicConcerns
  has_many :cadsr_marker_synonyms
  belongs_to :cadsr_marker_status

  private

  scope :matches, -> (column, value) { where("cadsr_markers.#{column} = ?", "#{value}") }

end
