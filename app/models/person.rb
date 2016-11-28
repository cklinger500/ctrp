# == Schema Information
#
# Table name: people
#
#  id                :integer          not null, primary key
#  source_id         :string(255)
#  prefix            :string(255)
#  suffix            :string(255)
#  email             :string(255)
#  phone             :string(255)
#  source_status_id  :integer
#  source_context_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  fname             :string(255)
#  mname             :string(255)
#  lname             :string(255)
#  ctrp_id           :integer
#  created_by        :string
#  updated_by        :string
#  extension         :string(255)
#
# Indexes
#
#  index_people_on_source_context_id  (source_context_id)
#  index_people_on_source_status_id   (source_status_id)
#
# rubocop:disable ClassLength

class Person < ActiveRecord::Base
  include BasicConcerns

  has_many :po_affiliations
  has_many :organizations, through: :po_affiliations
  belongs_to :source_status
  belongs_to :source_context
  belongs_to :service_request
  #belongs_to :source_cluster
  has_many :trial_co_pis
  has_many :copi_trials, through: :trial_co_pis, source: :trial
  has_many :pi_trials, foreign_key: :pi_id, class_name: "Trial"
  has_many :investigator_trials, foreign_key: :investigator_id, class_name: "Trial"
  has_many :participating_site_investigators, -> { order 'participating_site_investigators.id' }
  has_many :participating_sites, through: :participating_site_investigators

  #Restful attributes
  attr_accessor :edit_type
  attr_accessor :coming_from
  attr_accessor :current_user

  attr_accessor :is_associated

  accepts_nested_attributes_for :po_affiliations, allow_destroy: true

  validates :fname, presence: true
  validates :fname, length: {maximum: 62}
  validates :lname, presence: true
  validates :lname, length: {maximum: 62}
  validates :phone, length: {maximum: 60}
  validates :extension, length: {maximum: 30}
  validates :email, length: {maximum: 254}

  before_validation :check_phone_or_email
  before_destroy :check_for_organization
  after_create   :save_id_to_ctrp_id

  def fullname

    fullname = self.lname if self.lname
    if fullname && self.fname
      fullname = fullname.concat(" ,")
      fullname =  fullname.concat(self.fname)
    end

    if fullname && self.mname
      fullname = fullname.concat(" ,")
      fullname =  fullname.concat(self.mname)
    end
    fullname.nil? ? "" :fullname

  end

  def nullifiable
    return Person.joins(:source_context, :source_status)
               .where("ctrp_id = ? AND source_contexts.code = ? AND source_statuses.code = ?", self.ctrp_id, "CTEP", "ACT")
               .blank?
  end


  private

  # Method to check for the presence of phone or email. If both are empty, then return false
  def check_phone_or_email
    if (self.phone.nil? || self.phone.empty?) && (self.email.nil? || self.email.empty?)
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

  def check_for_organization
    unless po_affiliations.size == 0
      self.errors[:organization] << "Cannot delete Person while it belongs to an Organization."
      return false
    end
  end


  def self.nullify_duplicates(params)

    self.transaction do
      @toBeNullifiedPerson = Person.find_by_id(params[:id_to_be_nullified])
      @toBeRetainedPerson =  Person.find_by_id(params[:id_to_be_retained])

      raise ActiveRecord::RecordNotFound if @toBeNullifiedPerson.nil? or @toBeRetainedPerson.nil?

      @toBeNullifiedPerCtepOrNot=SourceContext.find_by_id(@toBeNullifiedPerson.source_context_id).code == "CTEP"
      @toBeRetainedPerCtepOrNot=SourceContext.find_by_id(@toBeRetainedPerson.source_context_id).code == "CTEP"
      p @toBeNullifiedPerCtepOrNot
      p @toBeRetainedPerCtepOrNot

      if @toBeNullifiedPerCtepOrNot || @toBeRetainedPerCtepOrNot
        raise "CTEP persons can not be nullified"
      end

      poAffiliationsOfNullifiedPerson = PoAffiliation.where(person_id:@toBeNullifiedPerson.id)

      poAffiliationsOfRetainedPerson  = PoAffiliation.where(person_id:@toBeRetainedPerson.id)

      orgs = poAffiliationsOfRetainedPerson.collect{|x| x.organization_id}

      ##Iterating through po_afilliations of to be nullified person and assigning to retained person.
      ##
      poAffiliationsOfNullifiedPerson.each do |po_affiliation|
        #new_po_aff=po_affiliation.clone;# Should be careful when choosing between dup and clone. See more details in Active Record dup and clone documentation.
        if(!orgs.include?po_affiliation.organization_id)
          po_affiliation.person_id=@toBeRetainedPerson.id
          po_affiliation.save!
        else
          po_affiliation.destroy!
        end
      end

      ## handle trial-related associations
      if @toBeNullifiedPerson.pi_trials.present?
        @toBeNullifiedPerson.pi_trials.each do |trial|
          trial.pi_id = @toBeRetainedPerson.id
          trial.save!
        end
      end


      if @toBeNullifiedPerson.investigator_trials.present?
        @toBeNullifiedPerson.investigator_trials.each do |trial|
          trial.investigator_id = @toBeRetainedPerson.id
          trial.save!
        end
      end


      if @toBeNullifiedPerson.trial_co_pis.present?
        @toBeNullifiedPerson.trial_co_pis.each do |co_pi|
          co_pi.person_id = @toBeRetainedPerson.id
          co_pi.save!
        end
      end

      # ## participating site investigators
      if @toBeNullifiedPerson.participating_site_investigators.present?
        @toBeNullifiedPerson.participating_site_investigators.each do |ps_investigator|
          ps_investigator.person_id = @toBeRetainedPerson.id
          ps_investigator.save!
        end
      end

      ## Destroy to_be_nullified_person
      ##
      @toBeNullifiedPerson.source_status_id=SourceStatus.ctrp_context_source_statuses.find_by_code('NULLIFIED').id
      @toBeNullifiedPerson.save!
    end
  end

  # Scope definitions for people search
  scope :matches, -> (column, value) { where("#{column} = ?", "#{value}") }

  scope :with_source_context, -> (value) { joins(:source_context).where("source_contexts.name = ?", "#{value}") }

  scope :ctep_person_with_ctrp_id, -> (value) { joins(:source_context).where("source_contexts.code = 'CTEP' AND ctrp_id = ?", "#{value}")}

  # search against source_status for the given source_context_id
  scope :with_source_status_context, -> (value, source_context_id) { joins(:source_status).where("source_statuses.code = ? AND source_statuses.source_context_id = ?", "#{value}", "#{source_context_id}") }

  scope :with_source_status_only, -> (value) { joins(:source_status).where("source_statuses.code = ?", "#{value}")} # with searching against all source_context

  scope :find_ctrp_matches, -> (params) {

    query_obj = joins(:po_affiliations)
    # query_obj = query_obj.where('po_affiliations.person_id = people.id')
    query_obj = query_obj.where('people.fname = ?', params[:fname]) unless params[:fname].nil?
    query_obj = query_obj.where('people.lname = ?', params[:lname]) unless params[:lname].nil?
    query_obj

    # joins("LEFT OUTER JOIN po_affiliations on people.id = po_affiliations.person_id").where("people.fname = ? OR people.lname = ?", params[:fname], params[:lname])
    #.where("people.lname = ?", params[:lname])
  }

  scope :sort_by_col, -> (column, order) {
    if ['source_context', 'source_status'].include? column
      column += "_name"
    elsif column == 'po_affiliation'
      joins("LEFT_JOIN_po_affiliations ON po_affiliations.id = people.po_affiliation_id").order("po_affiliations.id #{order}").group(:'po_affiliations.id')
    end
    order("#{column} #{order}")
  }

  scope :affiliated_with_organization, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:organizations).where("organizations.name ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:organizations).where("organizations.name ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:organizations).where("organizations.name ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:organizations).where("organizations.name ilike ?", "#{value}")
    end
  }

  scope :affiliated_with_organization_id, -> (value) {
    joins(:organizations).where("organizations.id = #{value}")
  }

  scope :updated_date_range, -> (dates) {
    start_date = DateTime.parse(dates[0])
    end_date = DateTime.parse(dates[1])
    where("people.updated_at BETWEEN ? and ?", start_date, end_date)
  }

  scope :all_people_data, -> () {
    join_clause = "
      LEFT JOIN service_requests ON people.service_request_id = service_requests.id
      INNER JOIN source_contexts ON people.source_context_id = source_contexts.id
      INNER JOIN source_statuses ON people.source_status_id = source_statuses.id
      LEFT JOIN (
              SELECT people_for_ctep.ctrp_id as ctep_ctrp_id, string_agg(people_for_ctep.source_id, '; ') as ctep_id
              from people as people_for_ctep
              INNER JOIN source_contexts ON source_contexts.id = people_for_ctep.source_context_id
              where source_contexts.code = 'CTEP' and people_for_ctep.ctrp_id is not null
              GROUP BY people_for_ctep.ctrp_id
      ) as all_cteps_by_ctrp_id on people.ctrp_id = ctep_ctrp_id
    "

    select_clause = "
      DISTINCT people.*,
      service_requests.name as service_request_name,
       (
          CASE
            WHEN people.extension IS NOT null AND people.extension <> ''
            THEN COALESCE(people.phone, '') || ' | ' || COALESCE(people.extension, '')
            ELSE people.phone
          END
       ) as phone_with_ext,
       (
          CASE
            WHEN source_contexts.code = 'CTEP'
            THEN people.source_id
            ELSE all_cteps_by_ctrp_id.ctep_id
          END
       ) as multiview_ctep_id,
      source_statuses.name as source_status_name,
      source_contexts.name as source_context_name
    "
    joins(join_clause).select(select_clause)
  }
end
