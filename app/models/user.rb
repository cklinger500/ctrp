# == Schema Information
#
# Table name: users
#
#  id                          :integer          not null, primary key
#  email                       :string(255)      default(""), not null
#  username                    :string(255)      default(""), not null
#  encrypted_password          :string(255)      default(""), not null
#  type                        :string
#  provider                    :string(255)
#  uid                         :string(255)
#  role                        :string(255)
#  reset_password_token        :string(255)
#  reset_password_sent_at      :datetime
#  remember_created_at         :datetime
#  sign_in_count               :integer          default(0), not null
#  current_sign_in_at          :datetime
#  last_sign_in_at             :datetime
#  current_sign_in_ip          :string(255)
#  last_sign_in_ip             :string(255)
#  failed_attempts             :integer          default(0), not null
#  unlock_token                :string(255)
#  locked_at                   :datetime
#  created_at                  :datetime
#  updated_at                  :datetime
#  first_name                  :string
#  last_name                   :string
#  middle_name                 :string
#  prs_organization_name       :string
#  receive_email_notifications :boolean
#  role_requested              :string
#  organization_id             :integer
#  source                      :string
#  user_status_id              :integer
#  phone                       :string
#  phone_ext                   :string
#  city                        :string
#  domain                      :string
#  status_date                 :datetime
#
# Indexes
#
#  index_users_on_organization_id       (organization_id)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#  index_users_on_user_status_id        (user_status_id)
#  index_users_on_username              (username) UNIQUE
#
# rubocop:disable ClassLength
#

class  User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  #devise  :registerable,
  #       :recoverable, :trackable, :validatable,
   #      :confirmable, :lockable, :timeoutable, :omniauthable
  devise :timeoutable, :validatable
  belongs_to :organization
  belongs_to :user_status
  has_many :trial_ownerships, -> { order 'trial_ownerships.id' }
  has_many :trials, through: :trial_ownerships
  has_many :trial_checkout_logs

  attr_accessor :organization_name
  attr_accessor :organization_family
  attr_accessor :selected_functions

  #Define roles here to drive dropdown menu when adding users
  ROLES = %i[ROLE_RO ROLE_SUPER ROLE_ADMIN ROLE_CURATOR ROLE_ABSTRACTOR ROLE_ABSTRACTOR-SU ROLE_TRIAL-SUBMITTER ROLE_ACCRUAL-SUBMITTER ROLE_SITE-SU ROLE_SERVICE-REST]

  validates :username, presence: true, uniqueness: { case_sensitive: false }

  scope :matches, -> (column, value) { where("users.#{column} = ?", "#{value}") }

  scope :matches_wc, -> (column, value) {
    str_len = 0

    if column != "site_admin" && column != "organization_id" && column != "user_status_id" && column != "organization_family_id"
      str_len = value.length
    end

    column_str = ""
    if column == "user_org_name"
      column_str = "user_org.name"
    elsif column == "organization_family"
      column_str = "families.name"
    elsif column != "site_admin"
      column_str = "users.#{column}"
    end

    if column == 'site_admin'
      if  value == true
        where("users.role IN ('ROLE_SITE-SU')")
      else
        where("users.role NOT IN ('ROLE_SITE-SU')")
      end
    elsif column == 'user_statuses'
      where("users.user_status_id in (#{value.join(',')})")
    elsif column == 'user_status_id' || column == 'organization_id'
      where("#{column_str} = #{value}")
    elsif value[0] == '*' && value[str_len - 1] != '*'
      where("#{column_str} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("#{column_str} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("#{column_str} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      where("#{column_str} ilike ?", "#{value}")
    end
  }

  scope :matches_join, -> () {
    join_clause  = "LEFT JOIN organizations user_org ON user_org.id = users.organization_id "
    join_clause += "LEFT JOIN family_memberships on family_memberships.organization_id = user_org.id "
    join_clause += "LEFT JOIN families on family_memberships.family_id = families.id "
    join_clause += "LEFT JOIN user_statuses on users.user_status_id = user_statuses.id"
    joins(join_clause).select("
      users.*,
      user_org.name as user_org_name,
       (
          CASE
            WHEN users.role = 'ROLE_SITE-SU'
              THEN 'Yes'
            ELSE 'No'
          END
       ) as admin_role,
      user_org.name as user_org_name,
       (
          CASE
            WHEN users.receive_email_notifications = true
              THEN 'Yes'
            ELSE 'No'
          END
       ) as receive_emails,
      user_statuses.name as user_status_name
    ")
  }

  scope :matches_all_registered, -> () {
    where("status_date is NOT NULL")
  }

  scope :matches_all_active, -> () {

    familyOrganizations = FamilyMembership.where(
        "(family_memberships.effective_date <= '#{DateTime.now}' or family_memberships.effective_date is null)
        and (family_memberships.expiration_date >= '#{DateTime.now}' or family_memberships.expiration_date is null)")
                              .pluck(:organization_id)

    familiedUsers = User.where(organization_id: familyOrganizations)
    unFamiliedUsers = User.where.not(organization_id: FamilyMembership.pluck(:organization_id))
    allActiveUserIds = familiedUsers.pluck(:id) + unFamiliedUsers.pluck(:id)

    where(id: allActiveUserIds)
  }

  scope :family_unexpired_matches_by_family, -> (value) {
    familyOrganizations = FamilyMembership.where(
        family_id: value
    ).where("(family_memberships.effective_date <= '#{DateTime.now}' or family_memberships.effective_date is null)
        and (family_memberships.expiration_date >= '#{DateTime.now}' or family_memberships.expiration_date is null)")
    .pluck(:organization_id)

    where(organization_id: familyOrganizations)

  }

  scope :family_unexpired_matches_by_org, -> (value) {
    familyMemberships = FamilyMembership.where(
        organization_id: value
    ).where("(family_memberships.effective_date <= '#{DateTime.now}' or family_memberships.effective_date is null)
        and (family_memberships.expiration_date >= '#{DateTime.now}' or family_memberships.expiration_date is null)")
        .pluck(:family_id)

    activeFamilies = Family.where(
        id: familyMemberships
    ).where(family_status_id: FamilyStatus.find_by_code('ACTIVE').id).pluck(:id)

    familyOrganizations = FamilyMembership.where(
        family_id: activeFamilies
    ).where("(family_memberships.effective_date <= '#{DateTime.now}' or family_memberships.effective_date is null)
        and (family_memberships.expiration_date >= '#{DateTime.now}' or family_memberships.expiration_date is null)")
        .pluck(:organization_id)

    where(organization_id: familyOrganizations)

  }
  scope :users_own_trial, -> (value) {
    join_clause = "LEFT JOIN trial_ownerships on users.id = trial_ownerships.user_id"
    joins(join_clause).where("trial_id = #{value} AND trial_ownerships.ended_at is null")
  }

  attr_accessor :password

  def to_param
    username
  end

  def self.get_roles
    ROLES
  end

  def process_approval
    # When an ADMIN approves of the user request for privileges, the role is updated
    # if it is not already chosen and the status is changed
    if self.role.blank?
      if self.organization_id.blank?
        self.role = "ROLE_RO"
      else
        self.role = "ROLE_SITE-SU"
      end
    end

    self.save!

  end

  def get_write_mode
    privileges_json = []

    case self.role
      when "ROLE_RO"
        privileges_json = [{po_write_mode: false}, {registry_write_mode: false}, {user_write_mode: true}, {pa_write_mode: false}]
      when  "ROLE_SUPER"
        privileges_json = [{po_write_mode: true}, {registry_write_mode: true}, {user_write_mode: true}, {pa_write_mode: true}]
      when  "ROLE_ADMIN"
        privileges_json = [{po_write_mode: true}, {registry_write_mode: true}, {user_write_mode: true}, {pa_write_mode: true}]
      when  "ROLE_CURATOR"
        privileges_json = [{po_write_mode: true}, {registry_write_mode: false}, {user_write_mode: true}, {pa_write_mode: false}]
      when  "ROLE_TRIAL-SUBMITTER"
        privileges_json = [{po_write_mode: false}, {registry_write_mode: true}, {user_write_mode: true}, {pa_write_mode: false}]
      when  "ROLE_ACCRUAL-SUBMITTER"
        privileges_json = [{po_write_mode: false}, {registry_write_mode: false}, {user_write_mode: true}, {pa_write_mode: false}]
      when  "ROLE_SITE-SU"
        privileges_json = [{po_write_mode: false}, {registry_write_mode: true}, {user_write_mode: true}, {pa_write_mode: false}]
      when  "ROLE_ABSTRACTOR"
        privileges_json = [{po_write_mode: false}, {registry_write_mode: true}, {user_write_mode: true}, {pa_write_mode: true}]
      when  "ROLE_ABSTRACTOR-SU"
        privileges_json = [{po_write_mode: false}, {registry_write_mode: true}, {user_write_mode: true}, {pa_write_mode: true}]
      when  "ROLE_ACCOUNT-APPROVER"
        privileges_json = [{po_write_mode: false}, {registry_write_mode: false}, {user_write_mode: true}, {pa_write_mode: false}]
    end

    return privileges_json
  end


  def self.org_write_access(current_user)
    return ['ROLE_CURATOR','ROLE_ADMIN','ROLE_SUPER'].include? current_user.role
  end

  def self.org_read_all_access(current_user)
    return ['ROLE_RO','ROLE_CURATOR','ROLE_ADMIN','ROLE_SUPER','ROLE_ABSTRACTOR'].include? current_user.role
  end

  def ldap_before_save
    Rails.logger.info "In ldap_before_save"
    self.email = Devise::LDAP::Adapter.get_ldap_param(self.username,"mail").first
    Rails.logger.info "In ldap_before_save email = #{email.inspect}"
  end

  def self.custom_find_by_username(username_value)
    user = nil
    unless username_value.blank?
      user = User.find_by_username(username_value.downcase)
    end
    Rails.logger.debug "User, custom_find_by_username user = #{user.inspect}"
    user
  end

  def log_debug
    if self.is_a?(LocalUser)
      Rails.logger.debug "\nIn User, log_debug, LocalUser #{self.inspect} " unless self.blank?
    elsif self.is_a?(LdapUser)
      Rails.logger.debug "In User, log_debug, LdapUser #{self.inspect} " unless self.blank?
    else
      Rails.logger.debug "In User, log_debug,OmniauthUser #{self.inspect} " unless self.blank?
    end
  end

  # Array of all organizations in the families of user's organization
  ##Following method is going to be retired as this wll replace that following
  def family_orgs
    family_orgs = []

    if self.organization.present?
      family_orgs.append(self.organization)

      self.organization.families.each do |family|
        family.organizations.each do |org|
          family_orgs.append(org)
        end
      end
    end

    return family_orgs.uniq
  end


  def family_organizations
    organization = self.organization
    families = organization.families ##As an organization can have more than one family
    family_status_id = FamilyStatus.find_by_code('ACTIVE').id
    #org_status_id = SourceStatus.find_by_code('ACT').id
    dateLimit = Date.today
    if !families.nil?
        family_organizations = families.where("family_status_id= ? and (family_memberships.expiration_date > '#{dateLimit}' or family_memberships.expiration_date is null)",family_status_id ).pluck(:organization_id)
    else
        ##if user's organization is an orphan
      family_organizations =Array.new().push(organization.id)
    end
    return family_organizations
  end

  private

  def compare_username(username_value)
    self.username.downcase == username_value.downcase
  end

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def password_required?
    false
  end
end
