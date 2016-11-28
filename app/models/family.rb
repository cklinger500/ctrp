# == Schema Information
#
# Table name: families
#
#  id               :integer          not null, primary key
#  name             :string(255)
#  family_status_id :integer
#  family_type_id   :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#  ctrp_id          :integer
#
# Indexes
#
#  index_families_on_family_status_id  (family_status_id)
#  index_families_on_family_type_id    (family_type_id)
#

class Family < ActiveRecord::Base
  include BasicConcerns

  has_many :family_memberships
  has_many :organizations, through: :family_memberships
  belongs_to :family_status
  belongs_to :family_type
  accepts_nested_attributes_for :family_memberships, allow_destroy: true

  validates :name, presence: true
  validates :family_status_id, presence: true
  validates :family_type_id, presence:true

  before_destroy :check_for_organization

  after_create   :save_id_to_ctrp_id

  private

  def save_id_to_ctrp_id
    #if
      #self.source_context_id == SourceContext.find_by_code("CTRP").id
      self.ctrp_id = self.id
      #self.source_id = self.id
      self.save!
    #end
  end

  def check_for_organization
    unless family_memberships.size == 0
      self.errors[:organization] << "Cannot delete Family while an Organization belongs to it."
      return false
    end
  end

  #scopes for search API
  scope :matches, -> (column, value) { where("#{column} = ?", "#{value}") }

  scope :with_family_status, -> (value) { where("family_statuses.name = ?", "#{value}") }
  scope :with_family_type, -> (value) { where("family_types.name = ?", "#{value}") }

  scope :sort_by_col, -> (column, order) {
    if column == 'family_status'
      order("family_statuses.name #{order}")
    elsif column == 'family_type'
      order("family_types.name #{order}")
    elsif column == 'aff_org_count'
      order("families_by_org_count.org_count #{order}")
    else
      order("LOWER(families.#{column}) #{order}")
    end
  }

  scope :find_unexpired_matches_by_org, -> (value) {
    familyFamilies = FamilyMembership.where(
        organization_id: value
    ).where("(family_memberships.effective_date < '#{DateTime.now}' or family_memberships.effective_date is null)
        and (family_memberships.expiration_date > '#{DateTime.now}' or family_memberships.expiration_date is null)")
          .pluck(:family_id)
    where(id: familyFamilies)
  }

  scope :all_families_data, -> () {
    join_clause = "LEFT JOIN family_statuses ON families.family_status_id = family_statuses.id "
    join_clause += "LEFT JOIN family_types ON families.family_type_id = family_types.id "
    join_clause += "LEFT JOIN
                    (select family_id, count(family_id) as org_count from family_memberships
                    group by family_id) as families_by_org_count
                    on families_by_org_count.family_id = families.id "
    select_clause = "
      families.*,
      family_statuses.name as family_status_name,
      family_types.name as family_type_name,
       (
          CASE
            WHEN families_by_org_count.org_count IS NOT null
            THEN families_by_org_count.org_count
            ELSE 0
          END
       ) as aff_org_count
    "
    joins(join_clause).select(select_clause)
  }
end
