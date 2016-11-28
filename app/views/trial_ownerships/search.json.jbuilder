
json.trial_ownerships do
  json.array!(@trial_ownerships) do |trial_ownership|

    json.extract! trial_ownership, :id, :trial_id, :user_id
    json.last_name trial_ownership.user ? trial_ownership.user.last_name : ''
    json.first_name trial_ownership.user ? trial_ownership.user.first_name : ''
    json.middle_name trial_ownership.user ? trial_ownership.user.middle_name : ''
    json.username trial_ownership.user ? trial_ownership.user.username : ''
    json.nci_id trial_ownership.trial ? trial_ownership.trial.nci_id : ''
    json.official_title trial_ownership.trial ? trial_ownership.trial.official_title : ''
    json.start_date trial_ownership.trial ? trial_ownership.trial.start_date : ''
    json.comp_date trial_ownership.trial ? trial_ownership.trial.comp_date : ''
    json.lead_protocol_id trial_ownership.trial ? trial_ownership.trial.lead_protocol_id : ''
    json.lead_org_name trial_ownership.trial && trial_ownership.trial.lead_org ? trial_ownership.trial.lead_org.name : ''
    json.lead_org_id trial_ownership.trial && trial_ownership.trial.lead_org ? trial_ownership.trial.lead_org.id : ''
    json.process_priority trial_ownership.trial && trial_ownership.trial.process_priority ? trial_ownership.trial.process_priority : ''
    json.ctep_id trial_ownership.trial && trial_ownership.trial.lead_org.ctep_id ? trial_ownership.trial.lead_org.ctep_id : ''

  end
end

json.start params[:start]
json.rows params[:rows]
json.total @trial_ownerships.respond_to?(:total_count) ? @trial_ownerships.total_count : @trial_ownerships.size
json.sort params[:sort]
json.order params[:order]