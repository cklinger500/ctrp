json.array!(@trials) do |trial|
  json.extract! trial, :id, :nci_id, :lead_protocol_id, :official_title, :pilot, :research_category_id, :primary_purpose_other, :secondary_purpose_other, :investigator_title, :program_code, :grant_question, :start_date, :start_date_qual, :primary_comp_date, :primary_comp_date_qual, :comp_date, :comp_date_qual, :ind_ide_question, :intervention_indicator, :sec801_indicator, :data_monitor_indicator, :history, :study_source_id, :phase_id, :primary_purpose_id, :secondary_purpose_id, :accrual_disease_term_id, :responsible_party_id, :lead_org_id, :pi_id, :sponsor_id, :investigator_id, :investigator_aff_id
  json.url trial_url(trial, format: :json)
end
