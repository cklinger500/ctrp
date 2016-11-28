@PA @global
Feature: PA F05 Trial History Information - Audit Trail.Feature  (update 6/23/16: participating sites removed.)

As any CTRP PA User, I can View the Trial History Information Audit Trail

Scenario Outline: #1 I can view Trial History Information Audit Trail
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information Audit Trail Screen
And I select View Audit Trail
Then the audit trail will be displayed for the Trial ordered by date with newest update first and include the following fields:

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
|Clinical Research category (clinical_research_category_id:  clinical_research_categories/Name)|
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
|Processing Status Name|
|Other ID (multiple) xxxx: other_ids.protocol_id, other_ids.protocol_id_origin_id:  protocol_id_origins.name|
|Markers Name (multiple) xxxx: markers.name, markers.evaluation_type_id evaluation_types.name, markers.assay_type_id assay_types.name, markers.biomarker_use_id biomarker_uses.name, markers.biomarker_purpose_id biomarker_purposes.name, marker.specimen_type_id specimen_types.name, markers.record_status|
|Outcome Measure  (multiple) xxxxx: outcome_measures.outcome_measure_type_id: outcome_measures_types.name,  outcome_measures.title, outcome_measures.time_frame, outcome_measures.description, outcome_measures.safety_issue |
|eligibility criteria (multiple) xxxx other_criteria.criteria_type, other_criteria.criteria_desc |
|Associated Trials (multiple)  xxxx associated_trials.trial_identifier, identifier_type identifier_types.code, name  |
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


|Processing Status processing_status_wrappers.status_date, processing_status_id: processing_statuses.name |
| Trial co leads (multiple) xxxx trial_co_lead_orgs.organization_id: organizations.name|
| Co-PIs trial_co_pis.person_id : people.fname, mname, lname|
| Trial Status trial_status_wrappers.status_date, Comments, why_stopped, trial_status_id: trial_statuses.name|

Examples:
|field name| data example|
|NCI-ID| NCI-2015-01299 |
|Lead Protocol| 9226 |
|official_title|Individualized Treatment for Relapsed/Refractory Acute Leukemia Based on Chemosensitivity and Genomics/Gene Expression Data|
|program_code| 45  |
|grant_question|Yes|
|start_date |September 11, 2015| 
|start_date_qual|Actual    | 
|primary_comp_date|July 01, 2019 |
|primary_comp_date_qual|Anticipated |
|comp_date   |  |
|comp_date_qual|  |
|ind_ide_question|No|
|intervention_indicator| Single Group |
|sec801_indicator|No|
|data_monitor_indicator|Yes|
|Study Source |Institutional|
|Phase |NA|
|primary purpose|Treatment|
|primary_purpose_other| |    
|secondary purpose |Ancillary-Correlative |
|secondary_purpose_other|  |
|responsible party|Sponsor|
|Lead Org|Fred Hutch/University of Washington Cancer Consortium|
|PI Last Name, First Name, Middle Name| Becker, Pamela |
|Sponsor| 	University of Washington Medical Center|
|Investigator Last Name, First Name, Middle Name | Becker, Pamela |
|Created At | July 29, 2015|
|updated_at |September 18, 2015|
|Clinical Research Category|Interventional   |
|accrual disease term|ICD9|
|investigator_title|XXX|
|investigator aff id (investigator_aff_id: Organizations/Name)|XXX|
|created_by|Dana Johnson|
|updated_by|XXX|
|process_priority|2- Normal  (AS IN 4x)|
|process_comment| |
|acronym| |
|keywords| |
|nih_nci_div|XXX|
|nih_nci_prog|XXX|
|send_trial|XXX|
|board_approval_num|9226|
|brief_title|High Throughput Drug Sensitivity Assay and Genomics- Guided Treatment of Patients with Relapsed or Refractory Acute Leukemia|
|brief_summary|This clinical trial studies the feasibility of choosing treatment based on a high throughput ex vivo drug sensitivity assay in combination with mutation analysis for patients with acute leukemia that has returned after a period of improvement or does not respond to treatment. A high throughput screening assay tests many different drugs individually or in combination that kill leukemia cells in tiny chambers at the same time. High throughput drug sensitivity assay and mutation analysis may help guide the choice most effective for an individual’s acute leukemia.|
|detailed_description|Leukemia cells obtained from blood or bone marrow are analyzed for sensitivity to both individual drugs and drug combinations via high throughput chemotherapy sensitivity assay and next generation sequencing assays. Doctors will then recommend chemotherapy regimens based on the results. After completion of the chemotherapy regimen, patients are followed up at 2-4 weeks for response, and then every 3 months for 2 years for duration of response and survival. |
|objectives|PRIMARY OBJECTIVES:I. To test patient cells in a high throughput assay against individual drugs and drug combinations within 21 days to enable optimal choice of drug combinations for therapy. II. To test gene expression that reveals activation of druggable pathways or mutations in genes that confer susceptibility to specific agents may also be considered in choice of treatment.  SECONDARY OBJECTIVES:  I. To evaluate the response to the chosen therapy.|
|target_enrollment|15|
|final_enrollment| |
|accruals|0|
|study Model: study_models.name| |
|study_model_other|Cohort OR NA|
|time perspectives |Prospective|
|time_perspective_other |  |
|accept_vol ACCEPTS HEALTHY VOLUNTEERS|No|
|gender |Both|
|min_age|3.0|
|min_age_unit |Years|
|max_age|999.0|
|max_age_unit|Years|
|owner (owner_id:  Users/Username)|XXX   |
|board_approval_status (board_approval_status_id: board_approval_status/name)|XXX|
|intervention_model (intervention_model_id:  intervention_models/name)|XXX|
|masking |Open|
|masking_role_subject|NA ??|
|masking_role_investigator|NA ??|
|masking_role_caregiver|NA ??|
|masking_role_outcome_assessor|NA ??|
|allocations |NA|
|study_classification |Efficacy|
|anatomic_site|Leukemia, not otherwise specified; Lymphoid Leukemia; Myeloid and Monocytic Leukemia|
|num_of_arms|1|
|verification_date|XXX|
|sampling_method|XXX|
|study_pop_desc|XXX|
|board_name|XXX|
|board_affiliation (board_affiliation_id:  Organizations.name)|XXX|
|submission number|1|
|Submission date|July 29, 2015|
|Submission type|Original|
|Submission source|Registy|
|Submission Method|XXX|
|Amendment Number|1|
|Milestone Name|XXX|
|Processing Status Name|XXX|
|Other ID (multiple) xxxx: other_ids.protocol_id, other_ids.protocol_id_origin_id:  protocol_id_origins.name|    |

|Markers Name (multiple) xxxx: markers.name, markers.evaluation_type_id evaluation_types.name, markers.assay_type_id assay_types.name, markers.biomarker_use_id biomarker_uses.name, markers.biomarker_purpose_id biomarker_purposes.name, marker.specimen_type_id specimen_types.name, markers.record_status|XXX| 

|Outcome Measure  (multiple) xxxx|Primary, Percentage of patients we are able to test and initiate treatment within a 21 day period.,Up to 21 days,The study will be considered successful (feasibility demonstrated) if it is possible to choose and initiate a combination drug regimen within 21 days in 9 out of 15 patients. With that outcome, there would be 90% confidence that the true feasibility rate is at least 40%., No; Secondary, Rate of complete remission, Up to 2 years,,No; Secondary, Survival, Up to 2 Years, , No  |

|eligibility criteria (multiple) xxxx | Inclusion,Diagnosis of acute leukemia by World Health Organization (WHO) criteria (e.g.-acute myeloid leukemia, acute lymphoblastic leukemia, acute leukemia of ambiguous origin); Inclusion,	Prior treatment with and exhaustion of at least two regimens or lines of treatment; Inclusion, •	Eastern Cooperative Oncology Group (ECOG) performance status 0 – 3; Inclusion, •	Expectation that we can obtain about 10 million blasts from blood and/or marrow (circulating blast count of 5,000 or greater or cellular marrow with greater than or equal to 20% blasts); Inclusion, •	Bilirubin =< 1 .5 x upper limit of normal (ULN) unless elevation is thought to be due to Gilbert’s syndrome, hemolysis, or hepatic infiltration by the hematologic malignancy; Inclusion, •	Serum glutamic oxaloacetic transaminase (SGOT) (aspartate aminotransferase [AST]) and serum glutamate pyruvate transaminase (SPGT) (alanine aminotransferase [ALT]) =< 2.5 x ULN, unless elevation is thought to be due to hepatic infiltration by the hematologic malignancy; Inclusion,•	Alkaline phosphatase =< 2.5 x ULN; Inclusion, •	Serum creatinine =< 2.0 mg/dL; Inclusion, •	Informed consent; Inclusion, •	Willing to use contraception when appropriate; Exclusion, •	No other concomitant treatment for leukemia, however treatment with hydroxyurea is permitted; Exclusion, •	No other active cancer that requires systemic chemotherapy or radiation; Exclusion, •	Active systemic fungal, bacterial, viral or other infection, unless disease is under treatment with anti-microbials and/or controlled or stable; patient needs to be clinically stable as defined as being afebrile and hemodynamically stable for 24-48 hours; Exclusion, •	Significant organ compromise that will increase risk of toxicity or mortality; Exclusion, •	Pregnancy or lactation  |

|Associated Trials (multiple)  xxxx associated_trials.trial_identifier, identifier_type identifier_types.code, name  |Expectation that we can obtain about 10 million blasts from blood and/or marrow (circulating blast count of 5,000 or greater or cellular marrow with greater than or equal to 20% blasts)

|Disease and Condition (multiple) |Acute Leukemia of Ambiguous Lineage,CDR0000670794 ,C7464 ,Acute Leukemia of Ambiguous Lineage; Recurrent Adult Acute Lymphoblastic Leukemia, CDR0000038716, C7883,Recurrent Adult Acute Lymphoblastic Leukemia; Recurrent Adult Acute Myeloid Leukemia, CDR0000038678 ,C7882 ,Recurrent Adult Acute Myeloid Leukemia; Recurrent Childhood Acute Lymphoblastic Leukemia, CDR0000042458,  C7784 , Recurrent Childhood Acute Lymphoblastic Leukemia ; Recurrent Childhood Acute Myeloid Leukemia,CDR0000038643,C9068,Recurrent Childhood Acute Myeloid Leukemia; Rafractory Childhood Acute Lymphoblastic Leukemia,,C122624,Refractory Childhood Acute Lymphoblastic Leukemia|

|Interventions (multiple)xxxx interventions.name, other_name, description, intervention_type_id  intervention_types.code, name  |Cytology Specimen Collection Procedure,Cytologic Sampling, Cytology Specimen Collection Procedure, Undergo blood or bone marrow collection,other;  Gene Expression Analysis, Gene Expression Analysis, Analysis of leukemia cell genes to identify possible drug targets, Genetic |

|arms_groups (multiple) xxxx |Treatment (chemosensitivity testing, chemotherapy), Experimental, Leukemia cells purified from blood or bone marrow samples are analyzed for sensitivity to individual drugs and drug combination and by next generation sequencing., Cytology Specimen Collection Procedure,Gene Expression Analysis|

|Subgroup Stratification Criteria (multiple) xxxx sub_groups.code, sub_groups.description |xxxx|

|trial owners (multiple)| Dana Johnson; Linda Mendelson|
|trial documents (multiple) xxxx trial_documents.filename, document_type, document_subtype|XXX|
|alternative titles (multiple) xxxx alternate_titles.category,  title  (???source) |XXX|

|central contacts (multiple) xxxx central_contacts.phone, email, central_contact_type_id: central_contact_types.name, person_id: people.fname, mname, lname |XXX|

|citations (multiple) xxxx citations.description, pub_med_id, results_reference|  XXX|
|collaborators (multiple) xxxx collaborators.org_name,organization_id: organizations.name  |XXX|

| grants (multiple)| P30, CA, OD, 15704;|
|Ind ( multiple) xxxx ind_ides.ind_ide_type, grantor, nih_nci,holder_type_id, expanded_access, exempt, ind_ide_number, expanded_access_type_id: expanded_access_types.name|XXX|
|links (multiple) xxxx  links.description|XXX|
|Milestones (multiple) xxxx milestone_wrappers.milestone_date, milestone_id: milestones.name, submission_id: submission_types.name|2015-07-29 16:22:47, Submission Received Date, SUBMISSIONTYPE;2015-07-31 00:38:32,Submission Acceptance Date,SUBMISSIONTYPE;2015-08-11 09:42:21, Administrative Processing Start Date, SUBMISSIONTYPE;   |
|submissions (multiple) xxxx submission.submission_num, submission_date, amendment_date,amendment_reason_id: cccc, submission_type_id: cccc, submission_source_id: submission_sources.name, submission_method_id: submission_methods.name|XXX|

| oversight_authorities (multiple) xxxx oversight_authorities.country, organization|XXX|


|Processing Status processing_status_wrappers.status_date, processing_status_id: processing_statuses.name |XXX|
| Trial co leads (multiple) xxxx trial_co_lead_orgs.organization_id: organizations.name|XXX|
| Co-PIs trial_co_pis.person_id : people.fname, mname, lname|XXX|
| Trial Status trial_status_wrappers.status_date, why_stopped, trial_status_id: trial_statuses.name|XXX|


Scenario: #2 I can export the results into an Excel spreadsheet
Given I have executed a search in CTRP
And the results are displayed in a table
When I select the export to Excel option
Then the contents of the search result will be export to an Excel format spreadsheet
And I will be able to open and save the spreadsheet

 Scenario: #3 Paging
      Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a Trial
      And I am on the Trial History Information Audit Trail Screen
      And I select View Audit Trail
      Then the audit trail will be displayed the trial 
      And the list will be paganiated  

Scenario: #3a Displaying Deleted values
Given I am logged into the CTRP Protocol Abstraction application 
And I have selected a Trial
And I am on the Trial History Information Audit Trail Screen 
When a value is deleted 
Then the value will be displayed with the (D) suffix

