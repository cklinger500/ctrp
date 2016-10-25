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

  # PA fields
  has_many :board_trials, foreign_key: :board_affiliation_id, class_name: "Trial"
  has_many :participating_sites
  has_many :ps_trials, through: :participating_sites, source: :trial

  accepts_nested_attributes_for :name_aliases, allow_destroy: true

  validates :name, presence: true
  validates :name, length: {maximum: 160}

  validates :address, presence: true
  validates :city, presence: true

  validates :phone, length: {maximum: 60}
  validates :extension, length: {maximum: 30}
  validates :email, length: {maximum: 254}

  before_destroy :check_for_family
  before_destroy :check_for_person

  after_create   :save_id_to_ctrp_id

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
    isNullifiable =true;
    source_status_arr = []
    source_status_arr = Organization.joins(:source_context).where("ctrp_id = ? AND source_contexts.code = ?", self.ctrp_id, "CTEP").pluck(:"source_status_id") if self.ctrp_id.present?
    source_status_arr.each_with_index { |e, i|
      if SourceStatus.ctrp_context_source_statuses.find_by_id(e).code == "ACT"
        isNullifiable = false;
      end
    }
    return isNullifiable
  end

  def org_assoc_date
    if self.association_date.present?
      return self.association_date.strftime("%d-%b-%Y %H:%M:%S %Z")
    end
  end

  def org_created_date
   if self.created_at.present?
#     return self.created_at.to_s(:app_time)
      return self.created_at.strftime("%d-%b-%Y %H:%M:%S %Z")
#    else
#      return Time.zone.now
    end
  end

  def org_updated_date
    if self.updated_at.present?
      return self.updated_at.strftime("%d-%b-%Y %H:%M:%S %Z")
#      return self.updated_at.to_s(:app_time)
    else
      return Time.zone.now
    end
  end


 # Get an array of maps of the orgs with the same ctrp_id
  def cluster
    tmp_arr = []
    if self.ctrp_id.present? && (self.source_status.nil? || self.source_status.code != 'NULLIFIED')
      join_clause = "LEFT JOIN source_contexts ON source_contexts.id = organizations.source_context_id LEFT JOIN source_statuses ON source_statuses.id = organizations.source_status_id"
      tmp_arr = Organization.joins(join_clause).where("ctrp_id = ? AND (source_statuses.code <> ? OR source_statuses IS NULL)", self.ctrp_id, "NULLIFIED").order(:id).pluck(:id, :"source_contexts.name")
    else
      tmp_arr.push([self.id, self.source_context ? self.source_context.name : ''])
    end

    cluster_arr = []
    tmp_arr.each do |org|
      cluster_arr.push({"id": org[0], "context": org[1]})
    end

    return cluster_arr
  end

  private

  # Method to check for the
   def check_conditional_fields
     #check for presence of phone or email. If both are empty, then return false
    if (self.phone.nil? || self.phone.empty?) && (self.email.nil? || self.email.empty?)
      return false
    end
    #If county is set to United states, then the postal_code should not be empty
     if self.country == "United States" && (self.postal_code.nil? || self.postal_code.empty?)
        return false
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
      @toBeNullifiedOrg = Organization.find_by_id(params[:id_to_be_nullified]);
      @toBeRetainedOrg =  Organization.find_by_id(params[:id_to_be_retained]);
      raise ActiveRecord::RecordNotFound if @toBeNullifiedOrg.nil? or @toBeRetainedOrg.nil?

      @toBeNullifiedOrgCtepOrNot=SourceContext.find_by_id(@toBeNullifiedOrg.source_context_id).code == "CTEP"
      @toBeRetainedOrgCtepOrNot=SourceContext.find_by_id(@toBeRetainedOrg.source_context_id).code == "CTEP"
      #p @toBeNullifiedOrgCtepOrNot
      #p @toBeRetainedOrgCtepOrNot

      if @toBeNullifiedOrgCtepOrNot || @toBeRetainedOrgCtepOrNot
        raise "CTEP organizations can not be nullified"
      end

      #sleep(2.minutes);

      #All references in CTRP to the nullified organization as Lead Organization will reference the retained organization as Lead Organization
      ##
       @toBeNullifiedOrg.lo_trials.each do |trial|
        p "To be nullified org lo trials " +trial.official_title;
        trial.lead_org_id=@toBeRetainedOrg.id;
        trial.save!;
       end


      #All references in CTRP to the nullified organization as Sponsor will reference the retained organization as Sponsor
      ##
      @toBeNullifiedOrg.sponsor_trials.each do |trial|
        p "To be nullified org sponsor trials " +trial.official_title;
        trial.sponsor_id=@toBeRetainedOrg.id;
        trial.save!;
      end

      #All references in CTRP to the nullified organization as Participating Site will reference the retained organization as Participating Site
      ## Future Implementation

      #All accrual submitted in CTRP on the nullified organization as a Participating Site will be transferred to the retained organization as a Participating Site
      ## Future Implementation

      #All persons affiliated with the nullified organization will be affiliated with the retained organization
      ##
      poAffiliationsOfNullifiedOrganization = PoAffiliation.where(organization_id:@toBeNullifiedOrg.id);

      poAffiliationsOfRetainedOrganization = PoAffiliation.where(organization_id:@toBeRetainedOrg.id);

      persons = poAffiliationsOfRetainedOrganization.collect{|x| x.person_id}

      poAffiliationsOfNullifiedOrganization.each do |po_affiliation|
        #new_po_aff=po_affiliation.clone;# Should be careful when choosing between dup and clone. See more details in Active Record dup and clone documentation.
        if(!persons.include?po_affiliation.person_id)
          po_affiliation.organization_id=@toBeRetainedOrg.id;
          po_affiliation.save!
        else
          po_affiliation.destroy!
        end

      end

      #Name of the Nullified organization will be listed as an alias on the retained organization
      ##
      NameAlias.create(organization_id:@toBeRetainedOrg.id,name:@toBeNullifiedOrg.name);

      ## Aliases of nullified organizations will be moved to aliases of the retained organization
      ##
        aliasesOfNullifiedOrganization = NameAlias.where(organization_id: @toBeNullifiedOrg.id);
        aliasesOfRetainedOrganization = NameAlias.where(organization_id: @toBeRetainedOrg.id);
        aliasesNamesOfRetainedOrganization = aliasesOfRetainedOrganization.collect{|x| x.name.upcase}

        aliasesOfNullifiedOrganization.each do |al|
        if(!aliasesNamesOfRetainedOrganization.include?al.name.upcase)
          al.organization_id=@toBeRetainedOrg.id;
          al.save!
        else
          al.destroy!
        end

      end

      #If both organizations had CTEP IDs only the retained organization CTEP ID will be associated with the retained organization


      #The status of the organization to be nullified will be "Nullified"
      ##
      @toBeNullifiedOrg.source_status_id=SourceStatus.ctrp_context_source_statuses.find_by_code('NULLIFIED').id;
      @toBeNullifiedOrg.save!
    end

  end

  # Scope definitions for search
  scope :contains, -> (column, value) { where("#{column} ilike ?", "%#{value}%") }

  scope :matches, -> (column, value) { where("#{column} = ?", "#{value}") }

  scope :matches_wc, -> (column, value,wc_search) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      where("#{column} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("#{column} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("#{column} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      if !wc_search
        if !value.match(/\s/).nil?
          value = (value.gsub! /\s+/, '%')
        end
        where("#{column} ilike ?", "%#{value}%")
      else
        where("#{column} ilike ?", "#{value}")
      end
    end
  }

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
            value = (value.gsub! /\s+/, '%')
          end
          joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "%#{value}%", "%#{value}%")
        else
          joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "#{value}", "#{value}")
      end
    end
  }

  scope :match_source_id_from_joins, -> (value) {
      source_id_clause = "organizations.source_id ilike ? OR all_cteps_by_ctrp_id.ctep_id ilike ?", "%#{value}", "%#{value}"
      where(source_id_clause)
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
            name_value = (name_value.gsub! /\s+/, '%')
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
          if !value.match(/\s/).nil?
            name_value = (name_value.gsub! /\s+/, '%')
          end
          name_where_clause = "organizations.name ilike ?", "%#{name_value}%"
        else
          name_where_clause = "organizations.name ilike ?", "#{name_value}"
        end
      end
      where(name_where_clause)
    end
  }

  scope :with_source_id, -> (value, ctrp_ids) {
    q = "organizations.source_id ilike ?"

    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      conditions = ["%#{value[1..str_len - 1]}"]
    elsif value[0] != '*' && value[str_len - 1] == '*'
      conditions = ["#{value[0..str_len - 2]}%"]
    elsif value[0] == '*' && value[str_len - 1] == '*'
      conditions = ["%#{value[1..str_len - 2]}%"]
    else
      conditions = ["#{value}"]
    end

    ctrp_ids.each_with_index { |e, i|
      if e != nil
        q += " OR organizations.ctrp_id = ?"
        conditions.push(e)
      end
    }
    conditions.insert(0, q)

    where(conditions)
  }

  scope :with_source_context, -> (value) { joins(:source_context).where("source_contexts.name = ?", "#{value}") }

  scope :with_source_status, -> (value) { joins(:source_status).where("source_statuses.name = ?", "#{value}") }

  scope :with_service_request, -> (value) { joins(:service_request).where("service_requests.id = ?", "#{value}")}

  #this now only works after running Organization.all_orgs_data() for efficiency
  scope :with_family, -> (value) {
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
      where("family_name ilike ?", "#{value}")
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


