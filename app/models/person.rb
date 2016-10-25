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


  # Get an array of maps of the people with the same ctrp_id
  def cluster
    tmp_arr = []
    if self.ctrp_id.present? && (self.source_status.nil? || self.source_status.code != 'NULLIFIED')
      join_clause = "LEFT JOIN source_contexts ON source_contexts.id = people.source_context_id LEFT JOIN source_statuses ON source_statuses.id = people.source_status_id"
      tmp_arr = Person.joins(join_clause).where("ctrp_id = ? AND (source_statuses.code <> ? OR source_statuses IS NULL)", self.ctrp_id, "NULLIFIED").order(:id).pluck(:id, :"source_contexts.name")
    else
      tmp_arr.push([self.id, self.source_context ? self.source_context.name : ''])
    end

    cluster_arr = []
    tmp_arr.each do |person|
      cluster_arr.push({"id": person[0], "context": person[1]})
    end

    return cluster_arr
  end

  def nullifiable
    isNullifiable =true;
    source_status_arr = []
    source_status_arr = Person.joins(:source_context).where("ctrp_id = ? AND source_contexts.code = ?", self.ctrp_id, "CTEP").pluck(:"source_status_id") if self.ctrp_id.present?
    source_status_arr.each_with_index { |e, i|
      if e.present? && SourceStatus.ctrp_context_source_statuses.find_by_id(e).code == "ACT"
        isNullifiable = false;
      end
    }
    return isNullifiable
  end

  def person_created_date
    if self.created_at.present?
#     return self.created_at.to_s(:app_time)
      return self.created_at.strftime("%d-%b-%Y %H:%M:%S %Z")
    end
  end

  def person_updated_date
    if self.updated_at.present?
      return self.updated_at.strftime("%d-%b-%Y %H:%M:%S %Z")
#      return self.updated_at.to_s(:app_time)
    end
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
      @toBeNullifiedPerson = Person.find_by_id(params[:id_to_be_nullified]);
      @toBeRetainedPerson =  Person.find_by_id(params[:id_to_be_retained]);
      #print "hello "+toBeRetainedPerson
      raise ActiveRecord::RecordNotFound if @toBeNullifiedPerson.nil? or @toBeRetainedPerson.nil?

      @toBeNullifiedPerCtepOrNot=SourceContext.find_by_id(@toBeNullifiedPerson.source_context_id).code == "CTEP"
      @toBeRetainedPerCtepOrNot=SourceContext.find_by_id(@toBeRetainedPerson.source_context_id).code == "CTEP"
      p @toBeNullifiedPerCtepOrNot
      p @toBeRetainedPerCtepOrNot

      if @toBeNullifiedPerCtepOrNot || @toBeRetainedPerCtepOrNot
        raise "CTEP persons can not be nullified"
      end

      poAffiliationsOfNullifiedPerson = PoAffiliation.where(person_id:@toBeNullifiedPerson.id);

      poAffiliationsOfRetainedPerson  = PoAffiliation.where(person_id:@toBeRetainedPerson.id);

      orgs = poAffiliationsOfRetainedPerson.collect{|x| x.organization_id}

      ##Iterating through po_afilliations of to be nullified person and assigning to retained person.
      ##
      poAffiliationsOfNullifiedPerson.each do |po_affiliation|
        #new_po_aff=po_affiliation.clone;# Should be careful when choosing between dup and clone. See more details in Active Record dup and clone documentation.
        if(!orgs.include?po_affiliation.organization_id)
          po_affiliation.person_id=@toBeRetainedPerson.id;
          po_affiliation.save!
        else
          po_affiliation.destroy!
        end
      end

      ## Destroy associations of to_be_nullified_person
      ##

      ## Destroy to_be_nullified_person
      ##
      @toBeNullifiedPerson.source_status_id=SourceStatus.ctrp_context_source_statuses.find_by_code('NULLIFIED').id;
      @toBeNullifiedPerson.save!
    end
  end

  # Scope definitions for people search
  scope :matches, -> (column, value) { where("people.#{column} = ?", "#{value}") }

  scope :with_source_context, -> (value) { joins(:source_context).where("source_contexts.name = ?", "#{value}") }

  # search against source_status for the given source_context_id
  scope :with_source_status_context, -> (value, source_context_id) { joins(:source_status).where("source_statuses.code = ? AND source_statuses.source_context_id = ?", "#{value}", "#{source_context_id}") }

  scope :with_source_status_only, -> (value) { joins(:source_status).where("source_statuses.code = ?", "#{value}")} # with searching against all source_context

  scope :with_service_request, -> (value) { joins(:service_request).where("service_requests.id = ?", "#{value}")}

  scope :matches_wc, -> (column, value,wc_search) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      where("people.#{column} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("people.#{column} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("people.#{column} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      if !wc_search

        if !value.match(/\s/).nil?
        value=value.gsub! /\s+/, '%'
        end
        where("people.#{column} ilike ?", "%#{value}%")
      else
        where("people.#{column} ilike ?", "#{value}")
      end
    end
  }

  scope :find_ctrp_matches, -> (params) {

    query_obj = joins(:po_affiliations)
    # query_obj = query_obj.where('po_affiliations.person_id = people.id')
    query_obj = query_obj.where('people.fname = ?', params[:fname]) unless params[:fname].nil?
    query_obj = query_obj.where('people.lname = ?', params[:lname]) unless params[:lname].nil?
    query_obj

    # joins("LEFT OUTER JOIN po_affiliations on people.id = po_affiliations.person_id").where("people.fname = ? OR people.lname = ?", params[:fname], params[:lname])
    #.where("people.lname = ?", params[:lname])
  }

  scope :all_persons_data, -> (params) {
    join_clause = "
    INNER JOIN source_contexts ON people.source_context_id = source_context.id
    INNER JOIN source_statuses ON people.source_status_id = source_statuses.id
"


    where_clause = ""
    select_clause = "
      people.*,
      source_statuses.name as source_status_name,
      source_contexts.name as source_context_name
    "

    if params && params[:ctrp_id]
      where_clause = " people.id = #{params[:ctrp_id]}"
    end
    results = nil
    if params[:fname].present?
      # results = nil
      fname = params[:fname]
      str_len = fname.length
      wc_search = params[:wc_search]
      if fname[0] == '*' && fname[str_len-1] != '*'
        results = joins(join_clause).where(where_clause).where("people.name ilike ?", "%#{fname[1..str_len-1]}%").select(select_clause)
      end
    end
    sortBy = params[:sort]
    if ['source_context', 'source_status'].include?(sortBy)
      sortBy += "_name"
    end
    results
    # results.order("#{sortBy} #{params[:order]}")

  }

  scope :sort_by_col, -> (column, order) {
    if column == 'id' || column == 'updated_at'
      order("#{column} #{order}")
    elsif column == 'source_context'
      joins("LEFT JOIN source_contexts ON source_contexts.id = people.source_context_id").order("source_contexts.name #{order}").group(:'source_contexts.name')
    elsif column == 'source_status'
      joins("LEFT JOIN source_statuses ON source_statuses.id = people.source_status_id").order("source_statuses.name #{order}").group(:'source_statuses.name')
    elsif column == 'po_affiliation'
      joins("LEFT_JOIN_po_affiliations ON po_affiliations.id = people.po_affiliation_id").order("po_affiliations.id #{order}").group(:'po_affiliations.id')
    else
      order("LOWER(people.#{column}) #{order}")
    end
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

  scope :updated_date_range, -> (dates) {
    start_date = DateTime.parse(dates[0])
    end_date = DateTime.parse(dates[1])
    where("people.updated_at BETWEEN ? and ?", start_date, end_date)
  }

end
