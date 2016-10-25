# == Schema Information
#
# Table name: participating_sites
#
#  id                     :integer          not null, primary key
#  protocol_id            :string(255)
#  program_code           :string(255)
#  contact_name           :string(255)
#  contact_phone          :string(255)
#  contact_email          :string(255)
#  trial_id               :integer
#  organization_id        :integer
#  person_id              :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  uuid                   :string(255)
#  lock_version           :integer          default(0)
#  extension              :string(255)
#  contact_type           :string(255)
#  local_trial_identifier :string
#
# Indexes
#
#  index_participating_sites_on_organization_id  (organization_id)
#  index_participating_sites_on_person_id        (person_id)
#  index_participating_sites_on_trial_id         (trial_id)
#

class ParticipatingSite < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
  belongs_to :organization
  belongs_to :person
  has_many :site_rec_status_wrappers, -> { order 'site_rec_status_wrappers.status_date, site_rec_status_wrappers.id' }
  has_many :participating_site_investigators, -> { order 'participating_site_investigators.id' }
  has_many :people, through: :participating_site_investigators

  validates :contact_name, length: {maximum: 125}
  validates :contact_phone, length: {maximum: 44}
  validates :contact_email, length: {maximum: 254}

  accepts_nested_attributes_for :site_rec_status_wrappers, allow_destroy: true
  accepts_nested_attributes_for :participating_site_investigators, allow_destroy: true

  ## Audit Trail Callbacks
  after_save :touch_trial
  after_destroy :touch_trial


  def touch_trial
    find_current_user = nil
    updated_by = nil
    last_version_transaction_id = 0
    last_version = self.versions.last
    last_version_transaction_id = last_version.transaction_id if last_version
    user_id = last_version.whodunnit if last_version
    find_current_user = User.find_by_id(user_id) if user_id
    if find_current_user
      updated_by = find_current_user.username
    end
    does_trial_modified_during_this_transaction_size = 0
    does_trial_modified_during_this_transaction = TrialVersion.where("item_type= ? and transaction_id= ?","Trial", last_version_transaction_id)
    does_trial_modified_during_this_transaction_size = does_trial_modified_during_this_transaction.size if does_trial_modified_during_this_transaction
    ##If trail has been modified during the same transaction , then there is no need to update Trail again to create another version.
    if does_trial_modified_during_this_transaction_size == 0
      self.trial.update(updated_by:updated_by, updated_at:Time.now)
    end
  end


  def current_status_name
    self.site_rec_status_wrappers.last.site_recruitment_status.name if self.site_rec_status_wrappers.last.present?
  end

  def site_pi
    site_pi = nil

    self.participating_site_investigators.each do |ps_inv|
      if ps_inv.investigator_type == 'Principal Investigator'
        site_pi = ps_inv.person
      end
    end

    return site_pi
  end

  scope :by_value, ->  (value) {
    joins(:organization).where("organizations.name ilike  ?","#{value.to_s}")
  }


end
