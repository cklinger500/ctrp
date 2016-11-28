# == Schema Information
#
# Table name: ncit_disease_parents
#
#  id                  :integer          not null, primary key
#  parent_disease_code :string(255)
#  ncit_status_id      :integer
#  child_id            :integer
#  parent_id           :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  uuid                :string(255)
#  lock_version        :integer          default(0)
#
# Indexes
#
#  index_ncit_disease_parents_on_child_id        (child_id)
#  index_ncit_disease_parents_on_ncit_status_id  (ncit_status_id)
#  index_ncit_disease_parents_on_parent_id       (parent_id)
#

class NcitDiseaseParent < ActiveRecord::Base
  include BasicConcerns

  belongs_to :ncit_status
  # Self-referential many-to-many
  belongs_to :child, class_name: "NcitDiseaseCode"
  belongs_to :parent, class_name: "NcitDiseaseCode"
end
