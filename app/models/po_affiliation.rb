# == Schema Information
#
# Table name: po_affiliations
#
#  id                       :integer          not null, primary key
#  person_id                :integer
#  organization_id          :integer
#  po_affiliation_status_id :integer
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  uuid                     :string(255)
#  lock_version             :integer          default(0)
#  effective_date           :datetime
#  expiration_date          :datetime
#
# Indexes
#
#  index_po_affiliations_on_organization_id           (organization_id)
#  index_po_affiliations_on_person_id                 (person_id)
#  index_po_affiliations_on_po_affiliation_status_id  (po_affiliation_status_id)
#

class PoAffiliation < ActiveRecord::Base
  include BasicConcerns

  belongs_to :person
  belongs_to :organization
  belongs_to :po_affiliation_status

  #validates :effective_date, presence: true
end
