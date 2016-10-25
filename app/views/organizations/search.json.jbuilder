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
        :address3,
        :city,
        :state_province,
        :postal_code,
        :country,
        :email,
        :phone_with_ext,
        :ctrp_id,
        :aff_families_names,
        :updated_by,
        :multiview_ctep_id,
        :updated_at
        json.org_assoc_date @read_all_access ? organization.org_assoc_date : nil
        json.service_request_name @read_all_access ? organization.service_request_name : nil
        json.processing_status @read_all_access ? organization.processing_status : nil
        json.ctep_id organization.multiview_ctep_id
        json.source_context organization.source_context_name
        json.source_status organization.source_status_name
        json.url organization_url(organization, format: :json)
    end
  end
end
json.ac_tp @write_access
json.rc_tp @read_all_access
json.start params[:start]
json.rows params[:rows]
json.total @total
json.sort params[:sort]
json.order params[:order]
json.alias params[:alias]
