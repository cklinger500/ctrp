ctep_context_id = SourceContext.find_by_code('CTEP').id

json.people do
  json.array!(@people) do |person|
    json.extract! person, :id, :source_id, :fname, :mname, :lname, :prefix, :suffix, :email, :phone, :updated_at, :ctrp_id, :updated_by, :processing_status, :source_status_id, :source_context_id, :service_request_id
    json.source_context person.source_context.present? ? person.source_context.name : nil
    json.source_status person.source_status.present? ? person.source_status.name : nil
    json.ctep_source_id person.source_id if person.source_context_id == ctep_context_id
    json.url person_url(person, format: :json)
    #eager loading po_affiliations
    json.affiliated_orgs_count person.po_affiliations.length
    json.affiliated_orgs person.po_affiliations.map{ |po_affiliation| po_affiliation.organization.name}.join("; ")
    json.service_request ServiceRequest.find(person.service_request_id).name if person.service_request_id.present?

  end
end
json.start params[:start]
json.rows params[:rows]
json.total @people.respond_to?(:total_count) ? @people.total_count : @people.size
json.sort params[:sort]
json.order params[:order]
