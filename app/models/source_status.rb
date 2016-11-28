# == Schema Information
#
# Table name: source_statuses
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  name         :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

class SourceStatus < ActiveRecord::Base
  include BasicConcerns
  belongs_to :source_context
  #validates :code, uniqueness: true

  def self.ctrp_context_source_statuses
    ctrp_context = SourceContext.find_by_code("CTRP")
    source_statuses = SourceStatus.where(source_context:ctrp_context, record_status:"Active")
    return source_statuses
  end

  def self.ctep_context_source_statuses
    ctep_context = SourceContext.find_by_code("CTEP")
    source_statuses = SourceStatus.where(source_context:ctep_context, record_status:"Active")
    return source_statuses
  end

  def self.nlm_context_source_statuses
    nlm_context = SourceContext.find_by_code("NLM")
    source_statuses = SourceStatus.where(source_context:nlm_context, record_status:"Active")
    return source_statuses
  end

  def self.source_statuses_with_active_record_status
    source_statuses = SourceStatus.where(record_status: "Active")
    return source_statuses
  end

end
