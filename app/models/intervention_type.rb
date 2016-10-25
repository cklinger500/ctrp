# == Schema Information
#
# Table name: intervention_types
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  name         :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#  category     :string
#

class InterventionType < ActiveRecord::Base
  include BasicConcerns

  # has_many :intervention_type_cancer_gov, :class_name => 'Intervention', :foreign_key => :intervention_type_cancer_gov_id
  # has_many :intervention_type_clinicaltrials_gov, :class_name => 'Intervention', :foreign_key => :intervention_type_ct_gov_id
  has_many :intervention
  validates :code, uniqueness: true

end
