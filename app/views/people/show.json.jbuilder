json.extract! @person, :id, :source_id, :fname, :mname, :lname, :prefix, :suffix, :email, :phone, :source_status_id,
              :source_context_id, :po_affiliations, :created_at, :updated_at, :created_by, :updated_by,
              :lock_version, :uuid, :created_at, :updated_at, :processing_status, :ctrp_id, :association_start_date,
              :service_request_id, :registration_type, :extension


ctrp_context_id = SourceContext.find_by_code('CTRP').id
ctep_context_id = SourceContext.find_by_code('CTEP').id
ctep_active_source_status = SourceStatus.where(source_context_id: ctep_context_id, code: 'ACT')
# ctep_active_source_status_id = ctep_active_source_status.present? ? ctep_active_source_status[0].id : -1
# active_source_statuses = SourceStatus.where(code: 'ACT').pluck(:id)

json.set! :is_ctrp_context, ctrp_context_id == @person.source_context_id # flag if this person is ctrp context
json.set! :service_request, ServiceRequest.find(@person.service_request_id).name if @person.service_request_id.present?
json.set! :source_status, SourceStatus.find(@person.source_status_id).name if @person.source_status_id.present?
json.set! :source_context, SourceContext.find(@person.source_context_id).name if @person.source_context_id.present?

@associated_persons = Person.where(ctrp_id: @person.ctrp_id) #if !@person.ctrp_id.nil? && @person.source_context_id == ctrp_context_id
@associated_persons = @associated_persons.reject { |p| p.id == @person.id } # remove self

json.associated_persons do
  json.array!(@associated_persons) do |p|
    json.merge! p.attributes # get all the attributes in person
    json.set! :ctrp_source_id, p.source_id if p.source_context_id == ctrp_context_id
    json.set! :is_ctrp_context, ctrp_context_id == p.source_context_id
    json.set! :has_association, p.source_context_id == ctrp_context_id && Person.where(ctrp_id: p.ctrp_id).size > 1 # if ctrp context, does it have associated CTEPs ?
    json.set! :context_person_id, @person.id # use the CTRP person id as the context person id
    # json.set! :source_id, nil if p.source_context_id == ctrp_context_id # this seems identifical to CTEP ID in the grid
    json.set! :source_context, SourceContext.find(p.source_context_id).name if p.source_context_id.present?
    json.set! :source_status, SourceStatus.find(p.source_status_id).name if p.source_status_id.present?
    json.set! :service_request, ServiceRequest.find(p.service_request_id).name if p.service_request_id.present?
    json.set! :affiliated_orgs, p.po_affiliations.map { |po_affiliation| po_affiliation.organization.name }.join("; ")
  end
end