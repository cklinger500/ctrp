# == Schema Information
#
# Table name: arms_groups_interventions_associations
#
#  id              :integer          not null, primary key
#  arms_group_id   :integer
#  intervention_id :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#  lock_version    :integer          default(0)
#
# Indexes
#
#  index_arms_groups_interventions_associations_on_arms_group_id    (arms_group_id)
#  index_arms_groups_interventions_associations_on_intervention_id  (intervention_id)
#

class ArmsGroupsInterventionsAssociation < ActiveRecord::Base
  include BasicConcerns

  belongs_to :arms_group
  belongs_to :intervention
end
