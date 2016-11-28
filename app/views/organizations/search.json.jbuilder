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
        :phone,
        :extension,
        :ctrp_id,
        :aff_families_names,
        :multiview_ctep_id
      json.updated_by @read_all_access ? organization.updated_by : nil
      json.created_by @read_all_access ? organization.created_by : nil
      json.created_at @read_all_access ? organization.created_at : nil
      json.updated_at @read_all_access ? organization.updated_at : nil
      json.association_date @read_all_access ? organization.association_date : nil
      json.service_request_name @read_all_access ? organization.service_request_name : nil
      json.service_request_id @read_all_access ? organization.service_request_id : nil
      json.processing_status @read_all_access ? organization.processing_status : nil
      json.ctep_id organization.multiview_ctep_id
      json.source_context organization.source_context_name
      json.source_status organization.source_status_name
      json.source_context_code @read_all_access ? organization.source_context_code : nil
      json.source_status_code @read_all_access ? organization.source_status_code : nil
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
