# == Schema Information
#
# Table name: marker_assay_type_associations
#
#  id            :integer          not null, primary key
#  marker_id     :integer
#  assay_type_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  uuid          :string(255)
#  lock_version  :integer          default(0)
#

class MarkerAssayTypeAssociation < ActiveRecord::Base
  include BasicConcerns
  belongs_to  :marker
  belongs_to  :assay_type
end
