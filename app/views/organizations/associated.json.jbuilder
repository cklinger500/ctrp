
#json.associated_orgs @associated_orgs
json.associated_orgs do
  json.array!(@associated_orgs) do |organization|
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
                  :phone,
                  :phone_with_ext,
                  :extension,
                  :ctrp_id,
                  :source_context_id,
                  :source_status_id,
                  :source_context_name,
                  :source_status_name,
                  :families,
                  :name_aliases,
                  :ctep_id,
                  :ctep_org_type_name,
                  :aff_families_names
                json.updated_by @read_all_access ? organization.updated_by : nil
                json.created_by @read_all_access ? organization.created_by : nil
                json.created_at @read_all_access ? organization.created_at : nil
                json.updated_at @read_all_access ? organization.updated_at : nil
                json.association_date @read_all_access ? organization.association_date : nil
                json.service_request_id @read_all_access ? organization.service_request_id : nil
                json.service_request_name @read_all_access ? organization.service_request_name : nil
                json.processing_status @read_all_access ? organization.processing_status : nil
                json.source_context_code @read_all_access ? organization.source_context_code : nil
                json.source_status_code @read_all_access ? organization.source_status_code : nil
                json.uuid @write_access ? organization.uuid : nil
                json.ctep_id organization.multiview_ctep_id
  end
end
json.associable @read_all_access ? @associable : nil
json.active_context @active_context
json.active_id params[:id].to_i
json.ac_tp @write_access
json.rc_tp @read_all_access
