json.families do
  json.array!(@families) do |family|
    json.extract! family, :id, :name,:family_status_id, :aff_org_count, :family_type_id
    json.family_status family.family_status_name
    json.family_type family.family_type_name
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @families.respond_to?(:total_count) ? @families.total_count : @families.size
json.sort params[:sort]
json.order params[:order]
