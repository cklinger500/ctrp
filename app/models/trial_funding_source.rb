# == Schema Information
#
# Table name: trial_funding_sources
#
#  id              :integer          not null, primary key
#  trial_id        :integer
#  organization_id :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#  lock_version    :integer          default(0)
#
# Indexes
#
#  index_trial_funding_sources_on_organization_id  (organization_id)
#  index_trial_funding_sources_on_trial_id         (trial_id)
#

class TrialFundingSource < TrialBase
  include BasicConcerns

  belongs_to :trial
  belongs_to :organization
end
