json.trial_versions do
  begin
      json.array!(@trial_versions) do |trial_version|
        p "************* STARTING TRIAL VERSIONING ******"
        p trial_version.transaction_id

    json.extract! trial_version, :event, :created_at
    json.nci_id trial_version.object_changes["nci_id"]?  trial_version.object_changes["nci_id"][1] : nil
    json.lead_protocol_id trial_version.object_changes["lead_protocol_id"]?  trial_version.object_changes["lead_protocol_id"][1] : nil
    json.official_title trial_version.object_changes["official_title"]?  trial_version.object_changes["official_title"][1] : nil
    json.program_code trial_version.object_changes["program_code"]?  trial_version.object_changes["program_code"][1] : nil
    json.grant_question trial_version.object_changes["grant_question"]?  trial_version.object_changes["grant_question"][1] : nil
    json.ind_ide_question trial_version.object_changes["ind_ide_question"]?  trial_version.object_changes["ind_ide_question"][1] : nil
    json.pilot trial_version.object_changes["pilot"]?  trial_version.object_changes["pilot"][1] : nil

    if trial_version.object_changes["study_source_id"]
      json.study_source StudySource.find_by_id(trial_version.object_changes["study_source_id"][1]).name
    end

    if trial_version.object_changes["phase_id"]
      json.phase Phase.find_by_id(trial_version.object_changes["phase_id"][1]).name
    end

    if trial_version.object_changes["responsible_party_id"]
      json.responsible_party ResponsibleParty.find_by_id(trial_version.object_changes["responsible_party_id"][1]).name
    end

    if trial_version.object_changes["primary_purpose_id"]
      json.primary_purpose PrimaryPurpose.find_by_id(trial_version.object_changes["primary_purpose_id"][1]).name
    end

    json.primary_purpose_other trial_version.object_changes["primary_purpose_other"]?  trial_version.object_changes["primary_purpose_other"][1] : nil


    if trial_version.object_changes["secondary_purpose_id"]
      json.secondary_purpose SecondaryPurpose.find_by_id(trial_version.object_changes["secondary_purpose_id"][1]).name
    end

    json.secondary_purpose_other trial_version.object_changes["secondary_purpose_other"]?  trial_version.object_changes["secondary_purpose_other"][1] : nil


    if trial_version.object_changes["pi_id"]
        per=Person.find_by_id(trial_version.object_changes["pi_id"][1])
      json.pi  per.fullname if per
    end


    if trial_version.object_changes["lead_org_id"]
      org=Organization.find_by_id(trial_version.object_changes["lead_org_id"][1])
      json.lead_org  org.name if org
    end

    if trial_version.object_changes["sponsor_id"]
      org=Organization.find_by_id(trial_version.object_changes["sponsor_id"][1])
      json.sponsor  org.name if org
    end

    if trial_version.object_changes["investigator_id"]
      per=Person.find_by_id(trial_version.object_changes["investigator_id"][1])
      json.investigator  per.fullname if per
    end



    if trial_version.object_changes["research_category_id"]
      json.research_category ResearchCategory.find_by_id(trial_version.object_changes["research_category_id"][1]).name
    end

    if trial_version.object_changes["accrual_disease_term_id"]
      json.accrual_disease_term AccrualDiseaseTerm.find_by_id(trial_version.object_changes["accrual_disease_term_id"][1]).name
    end


    json.investigator_title trial_version.object_changes["investigator_title"]?  trial_version.object_changes["investigator_title"][1] : nil


    if trial_version.object_changes["investigator_aff_id"]
      org=Organization.find_by_id(trial_version.object_changes["investigator_aff_id"][1])
      json.investigator_aff_id  org.name if org
    end

    json.acronym trial_version.object_changes["acronym"]?  trial_version.object_changes["acronym"][1] : nil
    json.keywords trial_version.object_changes["keywords"]?  trial_version.object_changes["keywords"][1] : nil
    json.send_trial trial_version.object_changes["send_trial"]?  trial_version.object_changes["send_trial"][1] : nil

    json.brief_title trial_version.object_changes["brief_title"]?  trial_version.object_changes["brief_title"][1] : nil
    json.brief_summary trial_version.object_changes["brief_summary"]?  trial_version.object_changes["brief_summary"][1] : nil
    json.detailed_description trial_version.object_changes["detailed_description"]?  trial_version.object_changes["detailed_description"][1] : nil
    json.objective trial_version.object_changes["objective"]?  trial_version.object_changes["objective"][1] : nil
    json.accruals trial_version.object_changes["accruals"]?  trial_version.object_changes["accruals"][1] : nil

    if trial_version.object_changes["study_model_id"]
      json.study_model StudyModel.find_by_id(trial_version.object_changes["study_model_id"][1]).name
    end

    json.study_model_other trial_version.object_changes["study_model_other"]?  trial_version.object_changes["study_model_other"][1] : nil

    if trial_version.object_changes["time_perspective_id"]
      json.time_perspective TimePerspective.find_by_id(trial_version.object_changes["time_perspective_id"][1]).name
    end

    json.time_perspective_other trial_version.object_changes["time_perspective_other"]?  trial_version.object_changes["time_perspective_other"][1] : nil

    json.accept_vol trial_version.object_changes["min_age"]?  trial_version.object_changes["min_age"][1] : nil
    json.min_age trial_version.object_changes["min_age"]?  trial_version.object_changes["min_age"][1] : nil
    json.max_age trial_version.object_changes["max_age"]?  trial_version.object_changes["max_age"][1] : nil

    if trial_version.object_changes["board_approval_status_id"]
      json.board_approval_status BoardApprovalStatus.find_by_id(trial_version.object_changes["board_approval_status_id"][1]).name
    end

    if trial_version.object_changes["intervention_model_id"]
      json.intervention_model InterventionModel.find_by_id(trial_version.object_changes["intervention_model_id"][1]).name
    end

    if trial_version.object_changes["masking_id"]
      json.masking Masking.find_by_id(trial_version.object_changes["masking_id"][1]).name
    end

    json.masking_role_caregiver trial_version.object_changes["masking_role_caregiver"]?  trial_version.object_changes["masking_role_caregiver"][1] : nil
    json.masking_role_investigator trial_version.object_changes["masking_role_investigator"]?  trial_version.object_changes["masking_role_investigator"][1] : nil
    json.masking_role_outcome_assessor trial_version.object_changes["masking_role_outcome_assessor"]?  trial_version.object_changes["masking_role_outcome_assessor"][1] : nil
    json.masking_role_subject trial_version.object_changes["masking_role_subject"]?  trial_version.object_changes["masking_role_subject"][1] : nil

    if trial_version.object_changes["allocation_id"]
      json.allocation Allocation.find_by_id(trial_version.object_changes["allocation_id"][1]).name
    end

    if trial_version.object_changes["study_classification_id"]
      json.study_classification StudyClassification.find_by_id(trial_version.object_changes["study_classification_id"][1]).name
    end

    if trial_version.object_changes["gender_id"]
      json.gender Gender.find_by_id(trial_version.object_changes["gender_id"][1]).name
    end
    if trial_version.object_changes["min_age_unit_id"]
      json.min_age AgeUnit.find_by_id(trial_version.object_changes["gender_id"][1]).name
      end
    if trial_version.object_changes["max_age_unit_id"]
      json.max_age AgeUnit.find_by_id(trial_version.object_changes["gender_id"][1]).name
    end
    if trial_version.object_changes["anatomic_site_id"]
      json.anatomic_site AnatomicSite.find_by_id(trial_version.object_changes["anatomic_site_id"][1]).name
    end

    json.num_of_arms trial_version.object_changes["num_of_arms"]?  trial_version.object_changes["num_of_arms"][1] : nil
    json.verification_date trial_version.object_changes["verification_date"]?  trial_version.object_changes["verification_date"][1] : nil
    json.sampling_method trial_version.object_changes["sampling_method"]?  trial_version.object_changes["sampling_method"][1] : nil
    json.study_pop_desc trial_version.object_changes["study_pop_desc"]?  trial_version.object_changes["study_pop_desc"][1] : nil
    json.board_name trial_version.object_changes["board_name"]?  trial_version.object_changes["board_name"][1] : nil

    if trial_version.object_changes["board_affiliation_id"]
      org=Organization.find_by_id(trial_version.object_changes["board_affiliation_id"][1])
      json.board_affiliation  org.name if org
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


    subs = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "Submission",trial_version.transaction_id)

    if subs
        subs.each do |sub|
           json.submission_number  sub.object_changes["submission_num"]?  sub.object_changes["submission_num"][1]:nil
           json.submission_date sub.object_changes["submission_date"]? sub.object_changes["submission_date"][1]:nil
           #json.submission_type sub.object_changes["submission_type_id"]? SubmissionMethod.find_by_id(sub.object_changes["submission_type_id"][1]).name:nil
        end
    end


    json.other_ids  ""
    other_ids = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "OtherId",trial_version.transaction_id)
     if other_ids
      other_ids_string = ""
      delimiter = " | "
      other_ids.each do |o|
        protocol_id = decorate(o,"protocol_id")
        name= decorate_lookup(o,"protocol_id_origin_id",ProtocolIdOrigin)
        o.event == "destroy"? destroy_sign = " (D) " : destroy_sign=""
        other_ids_string = other_ids_string + delimiter + protocol_id.to_s + "   " + name + destroy_sign + delimiter
      end
      json.other_ids  other_ids_string
     end


    json.outcome_measures  ""
    outcome_measures = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "OutcomeMeasure",trial_version.transaction_id)
    if outcome_measures
      outcome_measures_string = ""
      delimiter = " | "
      outcome_measures.each do |o|
        title = decorate(o,"title")
        description = decorate(o,"description")
        time_frame = decorate(o,"time_frame")
        safety_issue = decorate(o,"safety_issue")
        name= decorate_lookup(o,"outcome_measure_type_id",OutcomeMeasureType)
        o.event == "destroy"? destroy_sign = " (D) " : destroy_sign=""
        outcome_measures_string = outcome_measures_string + delimiter + name.to_s + " ,  " + title.to_s + " , " + time_frame.to_s + " , " + description.to_s + " ,  " + safety_issue.to_s + destroy_sign + delimiter
      end
      #end
      json.outcome_measures  outcome_measures_string

    end


    json.grants  ""
    grants = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "Grant",trial_version.transaction_id)
    if grants
      grants_string = ""
      delimiter = " | "
      grants.each do |o|
        institute_code = decorate(o,"institute_code")
        funding_mechanism = decorate(o,"funding_mechanism")
        serial_number = decorate(o,"serial_number")
        nci = decorate(o,"nci")
        o.event == "destroy"? destroy_sign = " (D) " : destroy_sign=""
        grants_string = grants_string + delimiter +  funding_mechanism.to_s + " ,  " + institute_code.to_s + "  , " + nci.to_s + "  , " + serial_number.to_s + destroy_sign  + delimiter
      end
      json.grants  grants_string
    end

    json.eligibility_criteria  ""
    eligibility_criteria = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "OtherCriterium",trial_version.transaction_id)
    if eligibility_criteria
      eligibility_criterias_string = ""
      delimiter = " | "
      eligibility_criteria.each do |o|

        criteria_type = decorate(o,"criteria_type")
        criteria_desc = decorate(o,"criteria_desc")

        o.event == "destroy"? destroy_sign = " (D) " : destroy_sign=""
        eligibility_criterias_string = eligibility_criterias_string + delimiter +  criteria_type.to_s + " ,  " + criteria_desc.to_s + destroy_sign  + delimiter
      end
      json.eligibility_criteria  eligibility_criterias_string
    end

    json.associated_trials  ""
    associated_trials = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "AssociatedTrial",trial_version.transaction_id)
    p associated_trials
        if associated_trials
      associated_trials_string = ""
      delimiter = " | "
      associated_trials.each do |o|
        trial_identifier = decorate(o,"trial_identifier")
        name= decorate_lookup(o,"identifier_type_id",IdentifierType)
        o.event == "destroy"? destroy_sign = " (D) " : destroy_sign=""
        associated_trials_string = associated_trials_string + delimiter +  trial_identifier.to_s + " ,  " + name.to_s + destroy_sign  + delimiter
      end
      json.associated_trials  associated_trials_string
    end

        json.interventions  ""
        interventions = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "Intervention",trial_version.transaction_id)
        p interventions
        if interventions
          interventions_string = " "
          interventions.each do |o|
            name = decorate(o,"name")
            other_name = decorate(o, "other_name")
            description = decorate(o, "description")
            #intervention_type= decorate_lookup(o,"intervention_type_id",InterventionType)
            str = concatenate(o,interventions_string,name, other_name, description)
            interventions_string = interventions_string + str
          end
          json.interventions  interventions_string
        end

        json.arms_groups  ""
        arms_groups = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "ArmsGroup",trial_version.transaction_id)
        p arms_groups
        if arms_groups
          arms_groups_string = " "
          arms_groups.each do |o|
            label = decorate(o,"label")
            arms_groups_type = decorate(o, "arms_groups_type")
            description = decorate(o, "description")
            #intervention_type= decorate_lookup(o,"intervention_type_id",InterventionType)
            str = concatenate(o,arms_groups_string,label, arms_groups_type, description)
            arms_groups_string = arms_groups_string + str
          end
          json.arms_groups  arms_groups_string
        end

        json.sub_groups  ""
        sub_groups = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "SubGroup",trial_version.transaction_id)
        p sub_groups
        if sub_groups
          sub_groups_string = " "
          sub_groups.each do |o|
            label = decorate(o,"label")
            description = decorate(o, "description")
            str = concatenate(o,sub_groups_string,label,description)
            sub_groups_string = sub_groups_string + str
          end
          json.sub_groups  sub_groups_string
        end

        json.trial_owners  ""
=begin
        trial_owners = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "SubGroup",trial_version.transaction_id)
        p trial_owners
        if trial_owners
          trial_owners_string = " "
          trial_owners.each do |o|
            label = decorate(o,"label")
            description = decorate(o, "description")
            str = concatenate(o,trial_owners_string,label,description)
            trial_owners_string = trial_owners_string + str
          end
          json.trial_owners  trial_owners_string
          end
=end



        json.trial_documents  ""
        trial_documents = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "TrialDocument",trial_version.transaction_id)
        p trial_documents
        if trial_documents
          trial_documents_string = " "
          trial_documents.each do |o|
            file_name = decorate(o,"file_name")
            document_type = decorate(o, "document_type")
            document_subtype = decorate(o, "document_subtype")
            str = concatenate(o,trial_documents_string,file_name, document_type, document_subtype)
            trial_documents_string = trial_documents_string + str
          end
          json.trial_documents  trial_documents_string
        end

        ##alternative titles

        ##central contacts

        ##citations

        ##collabarators
        json.collabarators  ""
        collabarators = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "TrialDocument",trial_version.transaction_id)
        p collabarators
        if collabarators
          collabarators_string = " "
          collabarators.each do |o|
            org_name = decorate(o,"org_name")

            str = concatenate(o,collabarators_string,org_name)
            collabarators_string = collabarators_string + str
          end
          json.collabarators  collabarators_string
        end

        ##collabarators
        json.collabarators  ""
        collabarators = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "Collaborator",trial_version.transaction_id)
        p collabarators
        if collabarators
          collabarators_string = " "
          collabarators.each do |o|
            org_name = decorate(o,"org_name")

            str = concatenate(o,collabarators_string,org_name)
            collabarators_string = collabarators_string + str
          end
          json.collabarators  collabarators_string
        end

        ##ind_ides
        json.ind_ides  ""
        ind_ides = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "IndIde",trial_version.transaction_id)
        p ind_ides
        if ind_ides
          ind_ides_string = " "
          ind_ides.each do |o|
            ind_ide_type = decorate(o,"ind_ide_type")
            grantor = decorate(o,"grantor")
            nih_nci = decorate(o,"nih_nci")
            ind_ide_number = decorate(o,"ind_ide_number")
            holder_type= decorate_lookup(o,"holder_type_id",HolderType)
            str = concatenate(o,ind_ides_string,ind_ide_type,grantor,nih_nci,ind_ide_number,holder_type)
            ind_ides_string = ind_ides_string + str
          end
          json.ind_ides  ind_ides_string
        end

        ##milestones
        json.milestones  ""
        milestones = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "MilestoneWrapper",trial_version.transaction_id)
        p milestones
        if milestones
          milestones_string = " "
          milestones.each do |o|
            milestone_name= decorate_lookup(o,"milestone_id",Milestone)
            ##milestone_name= decorate_lookup(o,"submission_id",Milestone)
            str = concatenate(o,milestones_string,milestone_name)
            milestones_string = milestones_string + str
          end
          json.milestones  milestones_string
        end

        ##oversight_authorities
        json.oversight_authorities  ""
        oversight_authorities = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "OversightAuthority",trial_version.transaction_id)
        p oversight_authorities
        if oversight_authorities
          oversight_authorities_string = " "
          oversight_authorities.each do |o|
            country = decorate(o,"country")
            organization = decorate(o,"organization")

            ##milestone_name= decorate_lookup(o,"submission_id",Milestone)
            str = concatenate(o,oversight_authorities_string,country,organization)
            oversight_authorities_string = oversight_authorities_string + str
          end
          json.oversight_authorities  oversight_authorities_string
        end

=begin
      ##participating_sites
        json.participating_sites  ""
        participating_sites = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "MilestoneWrapper",trial_version.transaction_id)
        p participating_sites
        if participating_sites
          participating_sites_string = " "
          participating_sites.each do |o|
            milestone_name= decorate_lookup(o,"milestone_id",Milestone)
            ##milestone_name= decorate_lookup(o,"submission_id",Milestone)
            str = concatenate(o,participating_sites_string,milestone_name)
            participating_sites_string = participating_sites_string + str
          end
          json.participating_sites  participating_sites_string
        end
=end


        ##trial_statuses
        json.trial_statuses  ""
        trial_statuses = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "TrialStatusWrapper",trial_version.transaction_id)
        p trial_statuses
        if trial_statuses
          trial_statuses_string = " "
          trial_statuses.each do |o|
            why_stopped = decorate(o,"why_stopped")
            status_date = decorate(o,"status_date")
            trial_status= decorate_lookup(o,"trial_status_id",TrialStatus)
            str = concatenate(o,trial_statuses_string,status_date,why_stopped,trial_status)
            trial_statuses_string = trial_statuses_string + str
          end
          json.trial_statuses  trial_statuses_string
        end





=begin
|Disease and Condition (multiple) xxxx  diseases.preferred_name, diseases.code, diseases.thesaurus_id, diseases.display name  |
|Interventions (multiple)xxxx interventions.name, other_name, description, intervention_type_id  intervention_types.code, name  |
|arms_groups (multiple) xxxx arms_groups.label,type,description, intervention_id intervention_types.code, name |
|Subgroup Stratification Criteria (multiple) xxxx sub_groups.code, sub_groups.description |

|trial owners (multiple) xxxx trial_ownerships.user_id: users.username|
|trial documents (multiple) xxxx trial_documents.filename, document_type, document_subtype|
|alternative titles (multiple) xxxx alternate_titles.category,  title  (???source) |

|central contacts (multiple) xxxx central_contacts.phone, email, central_contact_type_id: central_contact_types.name, person_id: people.fname, mname, lname |

|citations (multiple) xxxx citations.description, pub_med_id, results_reference|
|collaborators (multiple) xxxx collaborators.org_name,organization_id: organizations.name  |
| grants (multiple) xxxx grants.funding_mechanism, institute_code,nci,serial_number |

|Ind ( multiple) xxxx ind_ides.ind_ide_type, grantor, nih_nci,holder_type_id, expanded_access, exempt, ind_ide_number, expanded_access_type_id: expanded_access_types.name|
|links (multiple) xxxx  links.description|
|Milestones (multiple) xxxx milestone_wrappers.milestone_date, milestone_id: milestones.name, submission_id: submission_types.name|
|submissions (multiple) xxxx submission.submission_num, submission_date, amendment_date,amendment_reason_id: cccc, submission_type_id: cccc, submission_source_id: submission_sources.name, submission_method_id: submission_methods.name|

| oversight_authorities (multiple) xxxx oversight_authorities.country, organization|
| participating_sites (multiple) xxxx participating_sites.protocol_id, program_code, contact_name, contact_phone, contact_email, organization_id: organizations.name, person_id: people.fname, mname, lname|

|Processing Status processing_status_wrappers.status_date, processing_status_id: processing_statuses.name |
| Trial co leads (multiple) xxxx trial_co_lead_orgs.organization_id: organizations.name|
| Co-PIs trial_co_pis.person_id : people.fname, mname, lname|
| Trial Status trial_status_wrappers.status_date, why_stopped, trial_status_id: trial_statuses.name|

=end



    json.created_by trial_version.object_changes["created_by"]?  trial_version.object_changes["created_by"][1] : nil
    json.updated_by trial_version.object_changes["updated_by"]?  trial_version.object_changes["updated_by"][1] : nil

    json.process_priority trial_version.object_changes["process_priority"]?  trial_version.object_changes["process_priority"][1] : nil
    json.process_comment trial_version.object_changes["process_comment"]?  trial_version.object_changes["process_comment"][1] : nil
    json.nih_nci_div trial_version.object_changes["nih_nci_div"]?  trial_version.object_changes["nih_nci_div"][1] : nil
    json.nih_nci_prog trial_version.object_changes["nih_nci_prog"]?  trial_version.object_changes["nih_nci_prog"][1] : nil




    json.nci_specific_comment trial_version.object_changes["nci_specific_comment"]?  trial_version.object_changes["nci_specific_comment"][1] : nil
    json.board_name trial_version.object_changes["board_name"]?  trial_version.object_changes["board_name"][1] : nil
    json.board_affiliation_id trial_version.object_changes["board_affiliation_id"]?  trial_version.object_changes["board_affiliation_id"][1] : nil
    json.board_approval_num trial_version.object_changes["board_approval_num"]?  trial_version.object_changes["board_approval_num"][1] : nil




    p "******** ENDING TRIAL VERSION *********"

    json.url trial_version_url(trial_version, format: :json)
      end
  rescue Exception => e
    p e
  end

end

json.start params[:start]
json.rows params[:rows]
json.total @trial_versions.respond_to?(:total_count) ? @trial_versions.total_count : @trial_versions.size


=begin
id serial NOT NULL,
  nci_id character varying(255),
  lead_protocol_id character varying(255),
  official_title text,
  pilot character varying(255),
  primary_purpose_other character varying(255),
  secondary_purpose_other text,
  program_code character varying(255),
  grant_question character varying(255),
  start_date date,
  start_date_qual character varying(255),
  primary_comp_date date,
  primary_comp_date_qual character varying(255),
  comp_date date,
  comp_date_qual character varying(255),
  ind_ide_question character varying(255),
  intervention_indicator character varying(255),
  sec801_indicator character varying(255),
  data_monitor_indicator character varying(255),
  history json,
  study_source_id integer,
  phase_id integer,
  primary_purpose_id integer,
  secondary_purpose_id integer,
  responsible_party_id integer,
  lead_org_id integer,
  pi_id integer,
  sponsor_id integer,
  investigator_id integer,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone,
  uuid character varying(255),
  lock_version integer DEFAULT 0,
  research_category_id integer,
  accrual_disease_term_id integer,
  investigator_title character varying(255),
  investigator_aff_id integer,
  created_by character varying(255),
  updated_by character varying(255),
  is_draft boolean,
  admin_checkout text,
  scientific_checkout text,
  check_in_comment text,
  process_priority character varying(255),
  process_comment text,
  xml_required character varying(255),
  acronym character varying(255),
  keywords text,
  nih_nci_div character varying(255),
  nih_nci_prog character varying(255),
  send_trial character varying(255),
  board_approval_num character varying(255),
  brief_title text,
  brief_summary text,
  detailed_description text,
  objective text,
  target_enrollment integer,
  final_enrollment integer,
  accruals integer,
  accept_vol character varying(255),
  min_age integer,
  max_age integer,
  assigned_to_id integer,
  board_approval_status_id integer,
  intervention_model_id integer,
  masking_id integer,
  allocation_id integer,
  study_classification_id integer,
  gender_id integer,
  min_age_unit_id integer,
  max_age_unit_id integer,
  num_of_arms integer,
  verification_date date,
  sampling_method character varying(255),
  study_pop_desc text,
  board_name character varying(255),
  board_affiliation_id integer,
  masking_role_caregiver boolean,
  masking_role_investigator boolean,
  masking_role_outcome_assessor boolean,
  masking_role_subject boolean,
  study_model_other character varying(255),
  time_perspective_other character varying(255),
  study_model_id integer,
  time_perspective_id integer,
  biospecimen_retention_id integer,
  biospecimen_desc text,
  internal_source_id integer,
  nci_specific_comment character varying(4000),
  send_trial_flag character varying,
=end
