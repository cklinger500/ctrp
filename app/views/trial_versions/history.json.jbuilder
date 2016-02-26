json.trial_versions do
  json.array!(@trial_versions) do |trial_version|
    json.extract! trial_version, :event, :created_at
    json.nci_id trial_version.object_changes["nci_id"]?  trial_version.object_changes["nci_id"][1] : nil
    json.lead_protocol_id trial_version.object_changes["lead_protocol_id"]?  trial_version.object_changes["lead_protocol_id"][1] : nil
    json.official_title trial_version.object_changes["official_title"]?  trial_version.object_changes["official_title"][1] : nil
    json.program_code trial_version.object_changes["program_code"]?  trial_version.object_changes["program_code"][1] : nil
    json.grant_question trial_version.object_changes["grant_question"]?  trial_version.object_changes["grant_question"][1] : nil
    json.ind_ide_question trial_version.object_changes["ind_ide_question"]?  trial_version.object_changes["ind_ide_question"][1] : nil


    if trial_version.object_changes["primary_purpose_id"]
      json.primary_purpose PrimaryPurpose.find_by_id(trial_version.object_changes["primary_purpose_id"][1]).name
    end


    if trial_version.object_changes["pi_id"]
        per=Person.find_by_id(trial_version.object_changes["pi_id"][1])
      json.pi  per.fname + " , " + per.lname
    end

    if trial_version.object_changes["lead_org_id"]
      org=Organization.find_by_id(trial_version.object_changes["lead_org_id"][1])
      json.lead_org  org.name
    end

    if trial_version.object_changes["sponsor_id"]
      org=Organization.find_by_id(trial_version.object_changes["sponsor_id"][1])
      json.sponsor  org.name
    end



    json.start_date trial_version.object_changes["start_date"]?  trial_version.object_changes["start_date"][1] : nil
    json.start_date_qual trial_version.object_changes["start_date_qual"]?  trial_version.object_changes["start_date_qual"][1] : nil
    json.primary_comp_date trial_version.object_changes["primary_comp_date"]?  trial_version.object_changes["primary_comp_date"][1] : nil
    json.primary_comp_date_qual trial_version.object_changes["primary_comp_date_qual"]?  trial_version.object_changes["primary_comp_date_qual"][1] : nil
    json.comp_date trial_version.object_changes["comp_date"]?  trial_version.object_changes["comp_date"][1] : nil
    json.comp_date_qual trial_version.object_changes["comp_date_qual"]?  trial_version.object_changes["comp_date_qual"][1] : nil
    json.ind_ide_question trial_version.object_changes["ind_ide_question"]?  trial_version.object_changes["ind_ide_question"][1] : nil
    json.intervention_indicator trial_version.object_changes["intervention_indicator"]?  trial_version.object_changes["intervention_indicator"][1] : nil
    json.sec801_indicator trial_version.object_changes["sec801_indicator"]?  trial_version.object_changes["sec801_indicator"][1] : nil
    json.data_monitor_indicator trial_version.object_changes["data_monitor_indicator"]?  trial_version.object_changes["data_monitor_indicator"][1] : nil


    json.other_ids  ""
    other_ids = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "OtherId",trial_version.transaction_id)
     if other_ids
      other_ids_string = ""
      delimiter = ""
      other_ids.each do |o|
        case o.event
          when "destroy"
            #p o.object
            p o.event
            protocol_id = o.object["protocol_id"]
            protocol_id_origin_id = o.object["protocol_id_origin_id"]
          when "create" || "update"
            p o.event
            p o.object_changes
            protocol_id = o.object_changes["protocol_id"][1]
            protocol_id_origin_id = o.object_changes["protocol_id_origin_id"][1]
          else
            protocol_id =""
            protocol_id_origin_id=""
        end
        #name = ProtocolIdOrigin.find_by_protocol_id_origin_id(protocol_id_origin_id).pluck(:nam) if !protocol_id_origin_id
        #next if o.protocol_id_origin.nil?
        #name = o.protocol_id_origin.name
        #unless name.nil?
        #name.gsub!("Identifier", "")
        o.event == "destroy"? destroy_sign = " (D) " : destroy_sign=""

       p color_field_tag destroy_sign
        p destroy_sign
        other_ids_string = other_ids_string + delimiter + protocol_id.to_s + "   " + protocol_id_origin_id.to_s + destroy_sign
        delimiter = ";"

     end
      #end
      json.other_ids  other_ids_string

     end





    json.url trial_version_url(trial_version, format: :json)
  end
end

=begin
|NCI ID (nci_id)|
|Lead Protocol (lead_protocol_id)|
|official_title|
|pilot|
|program_code|
|grant_question|
|start_date|
|start_date_qual|
|primary_comp_date|
|primary_comp_date_qual|
|comp_date|
|comp_date_qual|
|ind_ide_question|
|intervention_indicator|
|sec801_indicator|
|data_monitor_indicator|
|Study Source (study_source_id:study_sources/Name)|
|Phase (phase_id)|
|primary purpose (primary_purpose_id:  primary_purposes/Name)|
|primary_purpose_other|
|secondary purpose (secondary_purpose_id: secondary_purposes/Name)|
|secondary_purpose_other|
|responsible party (responsible_party_id:responsible_parties/name)|
|Lead Org (lead_org_id:Organizations/Name)|
|PI (pi_id:People/Last Name, First Name, Middle Name)|
|Sponsor (sponsor_id:  Organizations/Name)|
|Investigator (investigator_id: People/Last Name, First Name, Middle Name)|
|created_at|
|updated_at|
|research category (research_category_id:  research_categories/Name)|
|accrual disease term (accrual_disease_term_id: accrual_disease_terms/name)|
|investigator_title|
|investigator aff id (investigator_aff_id: Organizations/Name)|
|created_by|
|updated_by|
|process_priority|
|process_comment|
|acronym|
|keywords|
|nih_nci_div|
|nih_nci_prog|
|send_trial|
|board_approval_num|
|brief_title|
|brief_summary|
|detailed_description|
|objectives|
|target_enrollment|
|final_enrollment|
|accruals|
|study Model: study_models.name|
|study_model_other|
|time perspectives:  time_perspectives.name |
|time_perspective_other |
|accept_vol|
|min_age|
|max_age|
|owner (owner_id:  Users/Username)|
|board_approval_status (board_approval_status_id: board_approval_status/name)|
|intervention_model (intervention_model_id:  intervention_models/name)|
|masking (masking_id: maskings.name|
|masking_role_subject
|masking_role_investigator
|masking_role_caregiver
|masking_role_outcome_assessor
|allocations (allocation_id: allocations.Name)|
|study_classification (study_classification_id: study_classifications.Name)|
|gender (gender_id: genders/Name)|
|min_age_unit (min_age_unit_id: age_unit.name)|
|max_age_unit (max_age_unit_id: age_unit.name))|
|anatomic_site (anatomic_site_id:  anatomic_sites.Name)|
|num_of_arms|
|verification_date|
|sampling_method|
|study_pop_desc|
|board_name|
|board_affiliation (board_affiliation_id:  Organizations.name)|
|submission number|
|Submission date|
|Submission type|
|Submission source|
|Submission Method|
|Admendment Number|
|Milestone Name|
=end