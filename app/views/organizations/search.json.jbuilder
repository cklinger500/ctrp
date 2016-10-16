json.orgs do
  if params[:no_family]
    json.array!(@organizations) do |organization|
      json.extract! organization, :id, :source_id, :name, :address, :address2, :city, :state_province, :postal_code, :country, :email, :phone
    end
  else
    json.array!(@organizations) do |organization|
      json.extract! organization,
        :id,
        :source_id,
        :name,
        :address,
        :address2,
        :city,
        :state_province,
        :postal_code,
        :country,
        :email,
        :phone,
        :ctrp_id,
        :aff_families_names,
        :org_assoc_date,
        :updated_by,
        :updated_at
        json.ctep_id organization.multiview_ctep_id
        json.source_context organization.source_context_name
        json.source_status organization.source_status_name
        json.url organization_url(organization, format: :json)
    end
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @total
json.sort params[:sort]
json.order params[:order]
json.alias params[:alias]
