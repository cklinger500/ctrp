# == Schema Information
#
# Table name: ncit_disease_synonyms
#
#  id                   :integer          not null, primary key
#  alternate_name       :string(1000)
#  ncit_status_id       :integer
#  ncit_disease_code_id :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#

class NcitDiseaseSynonym < ActiveRecord::Base
  include BasicConcerns

  belongs_to :ncit_status
  belongs_to :ncit_disease_code
end
