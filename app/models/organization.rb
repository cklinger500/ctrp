# == Schema Information
#
# Table name: organizations
#
#  id                :integer          not null, primary key
#  source_id         :string(255)
#  name              :string(255)
#  address           :string(255)
#  address2          :string(255)
#  city              :string(255)
#  state_province    :string(255)
#  postal_code       :string(255)
#  country           :string(255)
#  email             :string(255)
#  phone             :string(255)
#  fax               :string(255)
#  source_status_id  :integer
#  source_context_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  ctrp_id           :integer
#  created_by        :string
#  updated_by        :string
#  extension         :string(255)
#
# Indexes
#
#  index_organizations_on_source_context_id  (source_context_id)
#  index_organizations_on_source_status_id   (source_status_id)
#
# rubocop:disable ClassLength

class Organization < ActiveRecord::Base
  include BasicConcerns

  has_many :name_aliases, dependent: :delete_all
  has_many :family_memberships
  has_many :families, through: :family_memberships
  has_many :po_affiliations
  has_many :people, through: :po_affiliations
  has_many :users
  belongs_to :source_status
  belongs_to :source_context
  belongs_to :service_request
  belongs_to :ctep_org_type
  belongs_to :org_funding_mechanism
  has_many :trial_funding_sources
  has_many :fs_trials, through: :trial_funding_sources, source: :trial
  has_many :trial_co_lead_orgs
  has_many :colo_trials, through: :trial_co_lead_orgs, source: :trial
  has_many :lo_trials, foreign_key: :lead_org_id, class_name: "Trial"
  has_many :sponsor_trials, foreign_key: :sponsor_id, class_name: "Trial"
  has_many :inv_aff_trials, foreign_key: :investigator_aff_id, class_name: "Trial"

  #Restful attributes
  attr_accessor :edit_type
  attr_accessor :coming_from
  attr_accessor :current_user

  # PA fields
  has_many :board_trials, foreign_key: :board_affiliation_id, class_name: "Trial"
  has_many :participating_sites
  has_many :ps_trials, through: :participating_sites, source: :trial

  accepts_nested_attributes_for :name_aliases, allow_destroy: true

  validates :name, presence: true
  validates :name, length: {maximum: 160}

  validates_presence_of :address, :unless => "!validations_to_skip.nil? and validations_to_skip.include?('address')"
  validates_presence_of :city, :unless => "!validations_to_skip.nil? and validations_to_skip.include?('city')"


  validates :phone, length: {maximum: 60}
  validates :extension, length: {maximum: 30}
  validates :email,length: {maximum: 254}, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i},:allow_nil => true


  before_destroy :check_for_family
  before_destroy :check_for_person

  after_create   :save_id_to_ctrp_id

  attr_accessor :validations_to_skip

  # Get CTEP ID from the CTEP context org in the cluster, comma separate them if there are multiple
  def ctep_id
    ctep_id_arr = []
    ctep_id_arr = Organization.joins(:source_context).where("ctrp_id = ? AND source_contexts.code = ?", self.ctrp_id, "CTEP").pluck(:source_id) if self.ctrp_id.present?
    ctep_id_str = ""
    ctep_id_arr.each_with_index { |e, i|
      if i > 0
        ctep_id_str += ", #{e}"
      else
        ctep_id_str += e
      end
    }
    return ctep_id_str
  end


  def nullifiable
    return Organization.joins(:source_context, :source_status)
               .where("ctrp_id = ? AND source_contexts.code = ? AND source_statuses.code = ?", self.ctrp_id, "CTEP", "ACT")
               .blank?
  end

  def org_created_date
    if self.created_at.present?
      return self.created_at
    end
  end

  def org_updated_date
    if self.updated_at.present?
      return self.updated_at
    else
      return Time.zone.now
    end
  end

  private

  def nullify_references
    #All references in CTRP to the nullified organization as Lead Organization will reference the retained organization as Lead Organization
    @toBeNullifiedOrg.lo_trials.each do |trial|
      trial.lead_org_id=@toBeRetainedOrg.id
      trial.save!
    end
    #All references in CTRP to the nullified organization as Sponsor will reference the retained organization as Sponsor
    @toBeNullifiedOrg.sponsor_trials.each do |trial|
      trial.sponsor_id=@toBeRetainedOrg.id
      trial.save!
    end
  end

  def move_aliases
    #Name of the Nullified organization will be listed as an alias on the retained organization
    NameAlias.create(organization_id:@toBeRetainedOrg.id,name:@toBeNullifiedOrg.name)
    ## Aliases of nullified organizations will be moved to aliases of the retained organization
    aliasesOfNullifiedOrganization = NameAlias.where(organization_id: @toBeNullifiedOrg.id)
    aliasesOfRetainedOrganization = NameAlias.where(organization_id: @toBeRetainedOrg.id)
    aliasesNamesOfRetainedOrganization = aliasesOfRetainedOrganization.collect{|x| x.name.upcase}
    aliasesOfNullifiedOrganization.each do |al|
      if(!aliasesNamesOfRetainedOrganization.include?al.name.upcase)
        al.organization_id=@toBeRetainedOrg.id
        al.save!
      else
        al.destroy!
      end
    end
  end

  def save_id_to_ctrp_id
    if self.source_context && self.source_context.code == "CTRP"
      self.ctrp_id = self.id
      self.source_id =self.id
      self.save!
    end
  end

  def check_for_family
    unless family_memberships.size == 0
      self.errors[:family] << "Cannot delete Organization while it belongs to a Family."
      return false
    end
  end

  def check_for_person
    unless po_affiliations.size == 0
      self.errors[:person] << "Cannot delete Organization while a Person is affiliated with it."
      return false
    end
  end

  def self.nullify_duplicates(params)
    self.transaction do
      @toBeNullifiedOrg = Organization.find_by_id(params[:id_to_be_nullified])
      @toBeRetainedOrg =  Organization.find_by_id(params[:id_to_be_retained])
      raise ActiveRecord::RecordNotFound if @toBeNullifiedOrg.nil? or @toBeRetainedOrg.nil?

      @toBeNullifiedOrgCtepOrNot = SourceContext.find_by_id(@toBeNullifiedOrg.source_context_id).code == "CTEP"
      @toBeRetainedOrgCtepOrNot = SourceContext.find_by_id(@toBeRetainedOrg.source_context_id).code == "CTEP"
      #p @toBeNullifiedOrgCtepOrNot
      #p @toBeRetainedOrgCtepOrNot

      if @toBeNullifiedOrgCtepOrNot || @toBeRetainedOrgCtepOrNot
        raise "CTEP organizations can not be nullified"
      end

      #sleep(2.minutes);

      #All references in CTRP to the nullified organization as Lead Organization will reference the retained organization as Lead Organization
      @toBeNullifiedOrg.lo_trials.update_all(:lead_org_id => @toBeRetainedOrg.id)

      #All references in CTRP to the nullified organization as Sponsor will reference the retained organization as Sponsor
      @toBeNullifiedOrg.sponsor_trials.update_all(:sponsor_id => @toBeRetainedOrg.id)

      participatingSites = ParticipatingSite.where(organization_id:@toBeNullifiedOrg.id)
      participatingSites.where(organization_id:@toBeRetainedOrg.id).destroy_all
      # then update remaining
      participatingSites.update_all(:organization_id => @toBeRetainedOrg.id)

      collaborators = Collaborator.where(organization_id:@toBeNullifiedOrg.id)
      collaborators.where(organization_id:@toBeRetainedOrg.id).destroy_all
      # then update remaining
      collaborators.update_all(:organization_id => @toBeRetainedOrg.id)

      familyMemberships = FamilyMembership.where(organization_id:@toBeNullifiedOrg.id)
      familyMemberships.where(organization_id:@toBeRetainedOrg.id).destroy_all
      # then update remaining
      familyMemberships.update_all(:organization_id => @toBeRetainedOrg.id)

      User.where(organization_id:@toBeNullifiedOrg.id).update_all(:organization_id => @toBeRetainedOrg.id)

      # destroy common entries for persons
      personAssociations = PoAffiliation.where(organization_id:@toBeNullifiedOrg.id)
      personAssociations.where(organization_id:@toBeRetainedOrg.id).destroy_all
      # then update remaining
      personAssociations.update_all(:organization_id => @toBeRetainedOrg.id)

      #Name of the Nullified organization will be listed as an alias on the retained organization
      NameAlias.create(organization_id:@toBeRetainedOrg.id,name:@toBeNullifiedOrg.name)

      ## Aliases of nullified organizations will be moved to aliases of the retained organization
      NameAlias.where(organization_id: @toBeNullifiedOrg.id).update_all(:organization_id => @toBeRetainedOrg.id)

      #If both organizations had CTEP IDs only the retained organization CTEP ID will be associated with the retained organization
      #The status of the organization to be nullified will be "Nullified"
      @toBeNullifiedOrg.source_status_id=SourceStatus.ctrp_context_source_statuses.find_by_code('NULLIFIED').id;
      @toBeNullifiedOrg.save!
    end
  end

  # Scope definitions for search
  scope :contains, -> (column, value) { where("#{column} ilike ?", "%#{value}%") }

  scope :matches, -> (column, value) { where("#{column} = ?", "#{value}") }

  scope :matches_name_wc, -> (value,wc_search) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "%#{value[1..str_len - 1]}", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "#{value[0..str_len - 2]}%", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "%#{value[1..str_len - 2]}%", "%#{value[1..str_len - 2]}%")
    else
      if !wc_search
        if !value.match(/\s/).nil?
          value = value.gsub!(/\s+/, '%')
        end
        joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "%#{value}%", "%#{value}%")
      else
        joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "#{value}", "#{value}")
      end
    end
  }

  scope :match_source_id_from_joins, -> (source_id_value, wc_search) {
    str_len = source_id_value.length

    # for '*text' or '*, text'
    if source_id_value[0] == '*' && source_id_value[str_len - 1] != '*'
      where("organizations.source_id ilike ? OR all_cteps_by_ctrp_id.ctep_id ilike ?", "%#{source_id_value[1..str_len - 1]}", "%#{source_id_value[1..str_len - 1]}")

      # for 'text*' or ', text*'
    elsif source_id_value[0] != '*' && source_id_value[str_len - 1] == '*'
      where("organizations.source_id ilike ? OR all_cteps_by_ctrp_id.ctep_id ilike ?", "#{source_id_value[0..str_len - 2]}%", "#{source_id_value[0..str_len - 2]}%")

      # for '*text*'
    elsif source_id_value[0] == '*' && source_id_value[str_len - 1] == '*'
      where("organizations.source_id ilike ? OR all_cteps_by_ctrp_id.ctep_id ilike ?", "%#{source_id_value[1..str_len - 2]}%", "%#{source_id_value[1..str_len - 2]}%")

      # for 'text' or  '*, text,*' or  'text,*' or  '*, text'
    else

      if !wc_search
        if !source_id_value.match(/\s/).nil?
          source_id_value = source_id_value.gsub!(/\s+/, '%')
        end
        where("organizations.source_id ilike ? OR all_cteps_by_ctrp_id.ctep_id ilike ?", "%#{source_id_value}%", "%#{source_id_value}%")
      else
        where("organizations.source_id ilike ? OR all_cteps_by_ctrp_id.ctep_id ilike ?", "#{source_id_value}", "#{source_id_value}")
      end
    end
  }
  scope :match_name_from_joins, -> (name_value, alias_value, wc_search) {
    str_len = name_value.length
    if alias_value.present?
      if name_value[0] == '*' && name_value[str_len - 1] != '*'
        alias_name_where_clause = "organizations.name ilike ? OR name_aliases.name ilike ?", "%#{name_value[1..str_len - 1]}", "%#{name_value[1..str_len - 1]}"
      elsif name_value[0] != '*' && name_value[str_len - 1] == '*'
        alias_name_where_clause = "organizations.name ilike ? OR name_aliases.name ilike ?", "#{name_value[0..str_len - 2]}%", "#{name_value[0..str_len - 2]}%"
      elsif name_value[0] == '*' && name_value[str_len - 1] == '*'
        alias_name_where_clause = "organizations.name ilike ? OR name_aliases.name ilike ?", "%#{name_value[1..str_len - 2]}%", "%#{name_value[1..str_len - 2]}%"
      else
        if !wc_search
          if !name_value.match(/\s/).nil?
            name_value = name_value.gsub!(/\s+/, '%')
          end
          alias_name_where_clause = "organizations.name ilike ? OR name_aliases.name ilike ?", "%#{name_value}%", "%#{name_value}%"
        else
          alias_name_where_clause = "organizations.name ilike ? OR name_aliases.name ilike ?", "#{name_value}", "#{name_value}"
        end
      end
      where(alias_name_where_clause)
    else
      if name_value[0] == '*' && name_value[str_len - 1] != '*'
        name_where_clause = "organizations.name ilike ?", "%#{name_value[1..str_len - 1]}"
      elsif name_value[0] != '*' && name_value[str_len - 1] == '*'
        name_where_clause = "organizations.name ilike ?", "#{name_value[0..str_len - 2]}%"
      elsif name_value[0] == '*' && name_value[str_len - 1] == '*'
        name_where_clause = "organizations.name ilike ?", "%#{name_value[1..str_len - 2]}%"
      else
        if !wc_search
          if !name_value.match(/\s/).nil?
            name_value = name_value.gsub!(/\s+/, '%')
          end
          name_where_clause = "organizations.name ilike ?", "%#{name_value}%"
        else
          name_where_clause = "organizations.name ilike ?", "#{name_value}"
        end
      end
      where(name_where_clause)
    end
  }

  scope :with_source_context, -> (value) { joins(:source_context).where("source_contexts.name = ?", "#{value}") }

  scope :with_source_status, -> (value) { joins(:source_status).where("source_statuses.name = ?", "#{value}") }

  scope :with_service_request, -> (value) { joins(:service_request).where("service_requests.id = ?", "#{value}")}

  #this now only works after running Organization.all_orgs_data() for efficiency
  scope :with_family, -> (value, wc_search) {
    str_len = value.length

    # for '*text' or '*, text'
    if value[0] == '*' && value[str_len - 1] != '*'
      where("family_name ilike ?", "%#{value[1..str_len - 1]}")

    # for 'text*' or ', text*'
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("family_name ilike ?", "#{value[0..str_len - 2]}%")

    # for '*text*'
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("family_name ilike ?", "%#{value[1..str_len - 2]}%")

    # for 'text' or  '*, text,*' or  'text,*' or  '*, text'
    else
      if !wc_search
        if !value.match(/\s/).nil?
          value = value.gsub!(/\s+/, '%')
        end
        where("family_name ilike ?", "%#{value}%")
      else
        where("family_name ilike ?", "#{value}")
      end
    end
  }

  scope :without_family, -> () {
    joins("LEFT OUTER JOIN family_memberships on organizations.id = family_memberships.organization_id").where("family_memberships.family_id is null")
  }

  scope :sort_by_col, -> (column, order) {
    if ['source_context', 'source_status'].include? column
      column += "_name"
    end
    order("#{column} #{order}")
  }
  scope :updated_date_range, -> (dates) {
    start_date = DateTime.parse(dates[0])
    end_date = DateTime.parse(dates[1])
    where("organizations.updated_at BETWEEN ? and ?", start_date, end_date)
  }

  scope :all_orgs_data, -> () {
    join_clause = "
      LEFT JOIN ctep_org_types ON organizations.ctep_org_type_id = ctep_org_types.id
      LEFT JOIN service_requests ON organizations.service_request_id = service_requests.id
      LEFT JOIN name_aliases ON organizations.id = name_aliases.organization_id
      INNER JOIN source_contexts ON organizations.source_context_id = source_contexts.id
      INNER JOIN source_statuses ON organizations.source_status_id = source_statuses.id
      LEFT JOIN (
        SELECT  families_list.organization_id, string_agg(families_list.name, '; ') as family_name
            from
            (
              select family_memberships.id, family_memberships.organization_id, families.name from family_memberships
              LEFT JOIN families on family_memberships.family_id = families.id
              where (family_memberships.effective_date < '#{DateTime.now}' or family_memberships.effective_date is null)
                  and (family_memberships.expiration_date > '#{DateTime.now}' or family_memberships.expiration_date is null)
            ) as families_list
        GROUP BY families_list.organization_id
      )  as unexpired_family_membership ON organizations.id = unexpired_family_membership.organization_id
      LEFT JOIN (
              SELECT organizations_for_ctep.ctrp_id as ctep_ctrp_id, string_agg(organizations_for_ctep.source_id, '; ') as ctep_id from organizations as organizations_for_ctep
              INNER JOIN source_contexts ON source_contexts.id = organizations_for_ctep.source_context_id
              where source_contexts.code = 'CTEP' and organizations_for_ctep.ctrp_id is not null
              GROUP BY organizations_for_ctep.ctrp_id
      ) as all_cteps_by_ctrp_id on organizations.ctrp_id = ctep_ctrp_id
    "

    select_clause = "
      DISTINCT organizations.*,
      ctep_org_types.name as ctep_org_type_name,
      service_requests.name as service_request_name,
       (
          CASE
            WHEN organizations.extension IS NOT null AND organizations.extension <> ''
            THEN COALESCE(organizations.phone, '') || ' | ' || COALESCE(organizations.extension, '')
            ELSE organizations.phone
          END
       ) as phone_with_ext,
       (
          CASE
            WHEN source_contexts.code = 'CTEP'
            THEN organizations.source_id
            ELSE all_cteps_by_ctrp_id.ctep_id
          END
       ) as multiview_ctep_id,
      source_statuses.name as source_status_name,
      source_contexts.name as source_context_name,
      source_statuses.code as source_status_code,
      source_contexts.code as source_context_code,
       (
          CASE
            WHEN family_name is not null
            THEN family_name
            ELSE ''
          END
       ) as aff_families_names
    "
    joins(join_clause).select(select_clause)
  }
end
