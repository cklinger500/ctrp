@trial.current_user = @current_user
p "***********"
json.extract! @trial, :id, :nci_id, :lead_protocol_id, :official_title, :pilot, :research_category_id, :masking_id, :biospecimen_retention_id, :biospecimen_desc,
              :masking_role_caregiver, :masking_role_investigator, :masking_role_outcome_assessor, :masking_role_subject, :accept_vol, :min_age, :max_age, :min_age_unit_id, :max_age_unit_id, :gender_id,
              :research_category, :allocation_id, :study_classification_id, :target_enrollment, :final_enrollment, :study_model_id, :study_model_other, :study_pop_desc, :sampling_method,
              :primary_purpose_other, :secondary_purpose_other, :investigator_title, :program_code, :grant_question,
              :start_date, :start_date_qual, :primary_comp_date, :primary_comp_date_qual, :comp_date, :comp_date_qual,
              :ind_ide_question, :intervention_indicator, :sec801_indicator, :data_monitor_indicator, :history, :accruals,
              :study_source_id, :phase_id, :phase, :primary_purpose_id, :primary_purpose, :secondary_purpose_id, :secondary_purpose, :responsible_party_id, :responsible_party,
              :accrual_disease_term_id, :accrual_disease_term, :lead_org_id, :pi_id, :sponsor_id, :investigator_id, :investigator_aff_id, :time_perspective_id, :time_perspective_other,
              :created_at, :updated_at, :created_by, :updated_by, :study_source, :lead_org, :pi, :sponsor,
              :investigator, :investigator_aff, :other_ids, :trial_funding_sources, :funding_sources, :grants,
              :trial_status_wrappers, :ind_ides, :oversight_authorities, :trial_documents, :associated_trials, :other_criteria, :is_draft, :lock_version,
              :brief_title, :brief_summary, :objective, :detailed_description, :intervention_model_id, :num_of_arms,
              :is_owner, :research_category, :admin_checkout, :scientific_checkout, :process_priority, :process_comment, :nci_specific_comment,
              :nih_nci_div, :nih_nci_prog, :alternate_titles, :acronym, :keywords, :central_contacts, :board_name, :board_affiliation_id,
              :board_approval_num, :board_approval_status_id, :available_family_orgs, :verification_date, :submission_nums, :uuid, :is_rejected
p "*************** after"
avr_id  = ProcessingStatus.find_by_code("AVR").id
vnr_id = ProcessingStatus.find_by_code("VNR").id
json.actions @trial.actions(avr_id,vnr_id)
json.other_ids do
  json.array!(@trial.other_ids) do |id|
    json.extract! id, :trial_id, :id, :protocol_id_origin_id, :protocol_id_origin, :protocol_id
  end
end

json.trial_funding_sources do
  json.array!(@trial.trial_funding_sources) do |source|
    json.extract! source, :trial_id, :id, :organization_id
    json.set! :source_name, Organization.find(source.organization_id).name
  end
end

json.trial_status_wrappers do
  json.array!(@trial.trial_status_wrappers) do |status|
    json.extract! status, :trial_id, :id, :status_date, :why_stopped, :trial_status_id, :trial_status, :comment, :created_at, :updated_at
  end
end

json.anatomic_site_wrappers do
  json.array!(@trial.anatomic_site_wrappers) do |anatomic_site_wrapper|
    json.extract! anatomic_site_wrapper, :trial_id, :id, :anatomic_site_id, :anatomic_site, :created_at, :updated_at
  end
end

json.ind_ides do
  json.array!(@trial.ind_ides) do |ind_ide|
    json.extract! ind_ide, :trial_id, :id, :ind_ide_type, :grantor, :nih_nci, :holder_type_id, :holder_type, :ind_ide_number
  end
end

json.associated_trials do
  json.array!(@trial.associated_trials) do |associated_trial|
    json.extract! associated_trial, :trial_id, :id, :trial_identifier, :identifier_type_id, :official_title, :research_category_name
    # json.set! :trial_detail, associated_trial.trial_id.nil? ? nil : Trial.find(associated_trial.trial_id)
    json.set! :associated_trial_id, associated_trial.trial_identifier.start_with?('NCI') ? Trial.find_by_nci_id(associated_trial.trial_identifier).id : nil
  end
end

json.other_criteria do
  json.array!(@trial.other_criteria.reorder(:index)) do |oc|
    json.extract! oc, :id, :index, :criteria_type, :trial_id, :lock_version, :criteria_desc, :_destroy
  end
end

json.trial_documents do
  json.array!(@trial.trial_documents) do |document|
    json.extract! document, :id, :file, :file_name, :document_type, :document_subtype, :is_latest, :created_at, :updated_at, :added_by_id, :status, :why_deleted, :source_document
    json.set! :added_by, document.added_by_id.nil? ? '' : User.find(document.added_by_id)   #document.added_by_id
  end
end

json.outcome_measures do
  json.array!(@trial.outcome_measures.reorder(:index)) do |outcome_measure|
    json.extract! outcome_measure, :id, :title, :time_frame, :description, :safety_issue,:outcome_measure_type_id,:index
    json.outcome_measure_type outcome_measure.outcome_measure_type.present? ? outcome_measure.outcome_measure_type.name : nil
  end
end

json.sub_groups do
  json.array!(@trial.sub_groups.reorder(:index)) do |sub_group|
    json.extract! sub_group, :id, :label, :description,:index
  end
end

json.bio_markers do
  json.array!(@trial.markers) do |marker|
    json.extract! marker, :id,:protocol_marker_name, :evaluation_type_other,:assay_type_other,:specimen_type_other,:record_status,:biomarker_use_id,:cadsr_marker_id
    json.biomarker_use marker.biomarker_use.present? ? marker.biomarker_use.name : nil

    marker.record_status == "Active" ? name = marker.name.gsub("name:", "") : name = marker.name
    json.name name
    json.assay_type_associations MarkerAssayTypeAssociation.where("marker_id = ? ", marker.id)
    json.eval_type_associations MarkerEvalTypeAssociation.where("marker_id = ? ", marker.id)
    json.spec_type_associations MarkerSpecTypeAssociation.where("marker_id = ? ", marker.id)
    json.biomarker_purpose_associations MarkerBiomarkerPurposeAssociation.where("marker_id = ?", marker.id)

    at_array =MarkerAssayTypeAssociation.where("marker_id = ? ", marker.id).pluck(:assay_type_id)
    assay_types= AssayType.where(id: at_array)
    json.assay_types assay_types
    assay_types = assay_types.pluck(:code)
    if assay_types.include? AssayType.find_by_code("Other").code
      assay_types.delete(AssayType.find_by_code("Other").code)
      assay_types.push(marker.assay_type_other + " (Other)")
    end
    json.assay_types_array assay_types.inspect[1...-1].gsub('"',"")

    et_array =MarkerEvalTypeAssociation.where("marker_id = ? ", marker.id).pluck(:evaluation_type_id)
    eval_types= EvaluationType.where(id: et_array)
    json.eval_types eval_types
    eval_types = eval_types.pluck(:code)


    if eval_types.include? EvaluationType.find_by_code("Other").code
      eval_types.delete(EvaluationType.find_by_code("Other").code)
      eval_types.push(marker.evaluation_type_other + " (Other)")
    end
    json.eval_types_array eval_types.inspect[1...-1].gsub('"',"")

    st_array =MarkerSpecTypeAssociation.where("marker_id = ? ", marker.id).pluck(:specimen_type_id)
    spec_types= SpecimenType.where(id: st_array)
    json.spec_types spec_types

    spec_types = spec_types.pluck(:code)

    if spec_types.include? SpecimenType.find_by_code("Other").code
      spec_types.delete(SpecimenType.find_by_code("Other").code)
      spec_types.push(marker.specimen_type_other + " (Other)")
    end

    json.spec_types_array spec_types.inspect[1...-1].gsub('"',"")

    biomarker_purpose_array = MarkerBiomarkerPurposeAssociation.where("marker_id = ? ", marker.id).pluck(:biomarker_purpose_id)
    biomarker_purposes = BiomarkerPurpose.where(id: biomarker_purpose_array)
    json.biomarker_purposes biomarker_purposes
    json.biomarker_purposes_array biomarker_purposes.pluck(:code).inspect[1...-1].gsub('"',"")

  end
end

json.interventions do
  json.array!(@trial.interventions.reorder(:index)) do |intervention|
    json.extract! intervention, :id, :name, :description, :other_name, :lock_version, :intervention_type_id, :trial_id, :index, :c_code
    json.set! :intervention_type_name, intervention.intervention_type_id.nil? ? '' : InterventionType.find(intervention.intervention_type_id).nil? ? '' : InterventionType.find(intervention.intervention_type_id).name
  end
end




json.collaborators do
  json.array!(@trial.collaborators) do |collaborator|
    json.extract! collaborator, :id, :organization_id, :org_name
  end
end

json.collaborators_attributes do
  json.array!(@trial.collaborators) do |collaborator|
    json.extract! collaborator, :id, :organization_id, :org_name
  end
end

@trial.participating_sites = @trial.participating_sites_with_active_orgs

json.participating_sites do
  json.array!(@trial.participating_sites) do |participating_site|
    json.id participating_site.id
    investigators = ""
    delimiter = ""
    if participating_site.participating_site_investigators.length > 1
      delimiter = "; "
    end
    unless participating_site.participating_site_investigators.nil?
      participating_site.participating_site_investigators.each do |inv|
        investigators = investigators + inv.person.fname + " " + inv.person.lname + delimiter
      end
    end
    json.view_investigators investigators
    json.investigator participating_site.person.present? ? participating_site.person.lname : ""
    json.contact_name participating_site.contact_name
    json.contact_phone participating_site.contact_phone
    json.extension participating_site.extension
    json.contact_email participating_site.contact_email
    json.contact_type participating_site.contact_type
    json.local_trial_identifier participating_site.local_trial_identifier
    json.protocol_id participating_site.protocol_id
    json.program_code participating_site.program_code
    json.person participating_site.person
    json.person_id participating_site.person.nil? ? nil:participating_site.person.id

    json.current_status_name participating_site.current_status_name
    json.site_pi participating_site.site_pi


    json.organization participating_site.organization
    json.site_rec_status_wrappers do
      json.array!(participating_site.site_rec_status_wrappers) do |site_rec_status_wrapper|
        json.id site_rec_status_wrapper.id
        json.status_date  site_rec_status_wrapper.status_date
        json.site_recruitment_status_id site_rec_status_wrapper.site_recruitment_status.nil? ? "" : site_rec_status_wrapper.site_recruitment_status.id
        json.site_recruitment_status  site_rec_status_wrapper.site_recruitment_status.nil? ? "" : site_rec_status_wrapper.site_recruitment_status
        json.comments  site_rec_status_wrapper.comments
      end
    end
    json.latest_site_recruitment_status  participating_site.site_rec_status_wrappers.blank? ? "" : (participating_site.site_rec_status_wrappers.last.site_recruitment_status.nil? ? "" : participating_site.site_rec_status_wrappers.last.site_recruitment_status.name)
    json.latest_site_recruitment_status_date  participating_site.site_rec_status_wrappers.blank? ? "" : participating_site.site_rec_status_wrappers.last.status_date

    json.participating_site_investigators do
      json.array!(participating_site.participating_site_investigators) do |inv|
        json.id inv.id
        json.person inv.person
        json.investigator_type inv.investigator_type
        json.set_as_contact inv.set_as_contact
        json.status_code ""
      end
    end
  end
end


json.arms_groups do
  arms_groups_interventions = []
  json.array!(@trial.arms_groups) do |ag|
    json.extract! ag, :id, :label, :arms_groups_type, :description, :trial_id

      arms_groups_interventions_array=ArmsGroupsInterventionsAssociation.where("arms_group_id = ? ", ag.id)
      json.arms_groups_interventions_array arms_groups_interventions_array

      arms_groups_interventions_array = arms_groups_interventions_array.pluck(:intervention_id)

      interventions= Intervention.where(id: arms_groups_interventions_array)
      json.arms_groups_interventions interventions

      interventions = interventions.pluck(:name)
      json.display_interventions interventions.inspect[1...-1].gsub('"',"")


  end
  end



json.diseases do
  json.array!(@trial.diseases) do |disease|
    json.extract! disease, :id, :preferred_name, :code, :thesaurus_id, :display_name, :parent_preferred, :trial_id, :rank
  end
end

json.milestone_wrappers do
  json.array!(@trial.milestone_wrappers) do |milestone|
    json.extract! milestone, :id, :milestone_date, :trial_id, :comment, :created_at, :created_by

    if milestone.milestone.present?
      json.milestone do
        json.extract! milestone.milestone, :id, :name, :code
      end
    end

    if milestone.submission.present?
      json.submission do
        json.extract! milestone.submission, :id, :submission_num, :submission_type_id
        json.set! :submission_type_code, SubmissionType.find_by_id(milestone.submission.submission_type_id).code
      end
    end

    if milestone.milestone_type.present?
      json.milestone_type do
        json.extract! milestone.milestone_type, :id, :name, :code
      end
    end
  end
end

json.onholds do
  json.array!(@trial.onholds) do |onhold|
    json.extract! onhold, :id, :onhold_desc, :onhold_date, :offhold_date

    if onhold.onhold_reason.present?
      json.onhold_reason do
        json.extract! onhold.onhold_reason, :id, :name, :code
      end
    end
  end
end

json.sitesu_sites do
  json.array!(@trial.sitesu_sites) do |ps|
    json.extract! ps, :id, :protocol_id, :program_code, :organization_id, :organization, :current_status_name, :site_pi

    json.site_rec_status_wrappers do
      json.array!(ps.site_rec_status_wrappers) do |status|
        json.extract! status, :id, :status_date, :site_recruitment_status_id, :site_recruitment_status, :comments
      end
    end

    json.participating_site_investigators do
      json.array!(ps.participating_site_investigators) do |investigator|
        json.extract! investigator, :id, :person_id, :person, :investigator_type
      end
    end
  end
end

## append the protocol_id_origin.name
unless @trial.other_ids.empty?
  oids_hash = []
  @trial.other_ids.each do |o|
    oid_hash = Hash.new
    oid_hash = {"name" => o.protocol_id_origin.name, "other_id_obj" => o}
    oids_hash << oid_hash
  end
  json.other_ids_hash oids_hash
end

json.submissions do
  json.array!(@trial.submissions) do |submission|
    json.extract! submission, :trial_id, :id, :submission_num, :submission_date, :amendment_num, :amendment_date,
                  :amendment_reason_id, :amendment_reason, :created_at, :updated_at, :user_id, :submission_source_id

    json.set! :submission_type_code, SubmissionType.find(submission.submission_type_id).nil? ? nil : SubmissionType.find(submission.submission_type_id).code
  end
end

json.current_trial_status @trial.trial_status_wrappers.present? ?
    @trial.trial_status_wrappers.last.trial_status.name : nil

json.current_trial_status_date @trial.trial_status_wrappers.present? ?
    @trial.trial_status_wrappers.last.status_date : nil

json.current_trial_why_stopped @trial.trial_status_wrappers.present? ?
    @trial.trial_status_wrappers.last.why_stopped : nil

json.processing_status @trial.current_processing_status.nil? ? nil : @trial.current_processing_status.name

# Returns a check to see if it's an amendment
json.has_amd @trial.has_atleast_one_active_amendment_sub

if SubmissionType.find_by_code('AMD')
  last_amd = @trial.submissions.where('submission_type_id = ?', SubmissionType.find_by_code('AMD').id).last
else
  last_amd = nil
end
json.last_amendment_num last_amd.amendment_num if last_amd.present?
json.last_amendment_date last_amd.amendment_date if last_amd.present?

json.submission_method @trial.current_submission.nil? ? '' : (@trial.current_submission.submission_method.nil? ? '' : @trial.current_submission.submission_method.name)

json.last_submission_type_code @trial.submissions.empty? ? '' : (@trial.submissions.last.submission_type.nil? ? '' : @trial.submissions.last.submission_type.code)

## get trial's last submitter
submitter = @trial.current_submission.nil? ? nil : (@trial.current_submission.user_id.nil? ? nil : @trial.current_submission.user)

## submitter's username
#json.submitter submitter.nil? ? '' : submitter.username
json.submitter submitter

## get the submitter's organization name
json.submitters_organization submitter.nil? ? '' : (submitter.organization.nil? ? '' : submitter.organization.name)

## @trial.board_affiliation_id = 24068

json.board_affiliated_org @trial.board_affiliation_id.nil? ? nil : @trial.board_affiliation

json.last_submission_source @trial.submissions.empty? ? '' : (@trial.submissions.last.submission_source_id.nil? ? '' : SubmissionSource.find(@trial.submissions.last.submission_source_id))

#json.sponsor_nci @trial.is_sponsor_nci?

send_trial_rules_flag = @trial.set_send_trial_info_flag ? "Yes":"No"

json.send_trial_rules_flag send_trial_rules_flag

json.send_trial_flag @trial.send_trial_flag.nil? ? send_trial_rules_flag : @trial.send_trial_flag

json.pa_editable @trial.pa_editable_check

json.internal_source @trial.internal_source_id.nil? ? nil : @trial.internal_source

#json.admin_checkout @trial.admin_checkout

#json.scientific_checkout @trial.scientific_checkout

#extract NCT Trial ID, if present
if @trial.other_ids.present?
  other_ids = @trial.other_ids
  nct_trial_id = nil

  other_ids.each do |o|
    name = o.protocol_id_origin.name
    unless name.nil?
      name.gsub!("Identifier", "")
      if name.downcase.include? "ClinicalTrials".downcase
        nct_trial_id = o.protocol_id
      end
    end
  end
  json.nct_trial_id nct_trial_id
end

json.current_submission_num @trial.current_submission.submission_num if @trial.current_submission.present?
json.current_submission_id @trial.current_submission.id if @trial.current_submission.present?
json.current_submission_type_code @trial.current_submission.submission_type.code if @trial.current_submission.present?

json.most_recent_submission_num @trial.most_recent_submission.submission_num if @trial.most_recent_submission.present?
json.most_recent_submission_id @trial.most_recent_submission.id if @trial.most_recent_submission.present?
json.most_recent_submission_type_code @trial.most_recent_submission.submission_type.code if @trial.most_recent_submission.present?
