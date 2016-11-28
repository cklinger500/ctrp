json.people do
  json.array!(@people) do |person|
    json.extract! person,
                  :id,
                  :source_id,
                  :fname,
                  :mname,
                  :lname,
                  :prefix,
                  :suffix,
                  :email,
                  :phone,
                  :extension,
                  :updated_at,
                  :ctrp_id,
                  :updated_by,
                  :processing_status,
                  :source_status_id,
                  :source_context_id,
                  :service_request_id,
                  :multiview_ctep_id,
                  :service_request_name
    json.source_context person.source_context_name
    json.source_status person.source_status_name
    json.service_request person.service_request_name
    json.url person_url(person, format: :json)
    #eager loading po_affiliations
    json.affiliated_orgs_count person.po_affiliations.length
    json.affiliated_orgs person.po_affiliations.map{ |po_affiliation| po_affiliation.organization.name}.join("; ")

  end
end
json.start params[:start]
json.rows params[:rows]
json.total @people.respond_to?(:total_count) ? @people.total_count : @people.size
json.sort params[:sort]
json.order params[:order]
