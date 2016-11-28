/**
 * Created by wangg5 on 6/1/15.
 */

(function() {
    'use strict';

    angular.module('ctrp.module.constants', [])
        .constant('URL_CONFIGS', {
            //relative urls to the host
            'ORG_LIST': '/ctrp/organizations.json',
            'AN_ORG': '/ctrp/organizations/',
            'SEARCH_ORG': '/ctrp/organizations/search.json',
            'CURATE_ORG': '/ctrp/organizations/curate.json',
            'UNIQUE_ORG': '/ctrp/organizations/unique',
            'ASSOCIATED_ORGS': '/ctrp/organizations/associated/',
            'NULLIFIABLE': '/ctrp/organizations/nullifiable',
            'DISASSOCIATE_ORGS': '/ctrp/organizations/dis_associate/',
            'CLONE_CTEP_ORG': '/ctrp/organizations/clone.json',
            'COUNTRY_LIST': '/ctrp/countries.json',
            'STATES_IN_COUNTRY': '/ctrp/states.json?country=',
            'SOURCE_CONTEXTS': '/ctrp/source_contexts.json',
            'SOURCE_STATUSES': '/ctrp/source_statuses/search.json',
            'SOURCE_STATUSES2': '/ctrp/source_statuses.json',
            'A_USER': '/ctrp/users/',
            'A_USER_SIGNUP': '/ctrp/sign_up.json',
            'A_USER_CHANGEPASSWORD': '/ctrp/change_password',
            'USER_GSA': '/ctrp/users/gsa',
            'SEARCH_USER': '/ctrp/users/search.json',
            'USER_STATUSES': '/ctrp/users/user_statuses',
            'USER_TRIALS': '/ctrp/trial_ownerships/search.json',
            'USER_TRIALS_END': '/ctrp/trial_ownerships/end.json',
            'USER_TRIALS_ADD': '/ctrp/trial_ownerships/add.json',
            'USER_TRIALS_TRANSFER': '/ctrp/trial_ownerships/transfer.json',
            'USER_TRIALS_CREATE': '/ctrp/trial_ownerships.json',
            'USER_SUBMITTED_TRIALS': '/ctrp/trial_submissions.json',
            'SUBMISSION_EXPECT_COMPLETE': '/ctrp/trial_submission_expect_complete.json',
            'PERSON_LIST': '/ctrp/people.json',
            'A_PERSON': '/ctrp/people/',
            'CURATE_PERSON': '/ctrp/people/curate.json',
            'PO_AFF_STATUSES': '/ctrp/po_affiliation_statuses.json',
            'SEARCH_PERSON': '/ctrp/people/search.json',
            'UNIQUE_PERSON': '/ctrp/people/unique.json',
            'PERSON_NULLIFIABLE': '/ctrp/people/nullifiable/{:person_id}.json',
            'ASSOCIATE_PERSON': '/ctrp/people/associate_context/{:ctep_person_id}/{:ctrp_id}.json',
            'REMOVE_PERSON_ASSOCIATION': '/ctrp/people/association/remove/{:ctep_person_id}',
            'CLONE_CTEP_PERSON': '/ctrp/people/clone_ctep.json',  // POST
            'A_FAMILY': '/ctrp/families/',
            'FAMILY_LIST': '/ctrp/families.json',
            'SEARCH_FAMILY': '/ctrp/families/search.json',
            'FAMILY_STATUSES':'/ctrp/family_statuses.json',
            'FAMILY_TYPES':'/ctrp/family_types.json',
            'FAMILY_RELATIONSHIPS':'/ctrp/family_relationships.json',
            'UNIQUE_FAMILY': '/ctrp/families/unique.json',
            'TRIAL_LIST': '/ctrp/registry/trials.json',
            'A_TRIAL': '/ctrp/registry/trials/',
            'SEARCH_TRIAL': '/ctrp/registry/trials/search.json',
            'SEARCH_TRIAL_PA': '/ctrp/registry/trials/search_pa.json',
            'GET_GRANTS_SERIALNUMBER': '/ctrp/registry/trials/get_grants_serialnumber.json',
            'STUDY_SOURCES': '/ctrp/registry/study_sources.json',
            'PROTOCOL_ID_ORIGINS': '/ctrp/registry/protocol_id_origins.json',
            'PHASES': '/ctrp/registry/phases.json',
            'RESEARCH_CATEGORIES': '/ctrp/registry/research_categories.json',
            'PRIMARY_PURPOSES': '/ctrp/registry/primary_purposes.json',
            'SECONDARY_PURPOSES': '/ctrp/registry/secondary_purposes.json',
            'ACCRUAL_DISEASE_TERMS': '/ctrp/registry/accrual_disease_terms.json',
            'RESPONSIBLE_PARTIES': '/ctrp/registry/responsible_parties.json',
            'FUNDING_MECHANISMS': '/ctrp/registry/funding_mechanisms.json',
            'INSTITUTE_CODES': '/ctrp/registry/institute_codes.json',
            'NCI': '/ctrp/registry/nci.json',
            'TRIAL_STATUSES': '/ctrp/registry/trial_statuses.json',
            'SITE_RECRUITMENT_STATUSES': '/ctrp/registry/site_recruitment_statuses.json',
            'ANATOMIC_SITES': '/ctrp/registry/anatomic_sites.json',
            'ACCEPTED_FILE_TYPES_REG': '/ctrp/registry/accepted_file_types_for_registry.json',
            'ACCEPTED_FILE_TYPES': '/ctrp/registry/accepted_file_types.json',
            'VALIDATE_TRIAL_STATUS': '/ctrp/registry/trials/validate_status.json', // registry
            'PAA_VALIDATE_TRIAL_STATUS': '/ctrp/pa/paa_validate_trial_status.json', // PA
            'ABSTRACTION_VALIDATE_TRIAL_STATUS': '/ctrp/pa/abstraction_validate_trial_status.json', // PA
            'VALIDATE_MILESTONE': '/ctrp/registry/trials/validate_milestone.json',
            'VALIDATE_SR_STATUS': '/ctrp/registry/participating_sites/validate_status.json',
            'SEARCH_CLINICAL_TRIALS_GOV': '/ctrp/registry/trials/search_clinical_trials_gov.json',
            'IMPORT_CLINICAL_TRIALS_GOV': '/ctrp/registry/trials/import_clinical_trials_gov.json',
            'PARTICIPATING_SITE_LIST': '/ctrp/registry/participating_sites.json',
            'A_PARTICIPATING_SITE': '/ctrp/registry/participating_sites/',
            'NCI_DIV_PA': '/ctrp/pa/nih_nci_div_pa.json',
            'NCI_PROG_PA': '/ctrp/pa/nih_nci_prog_pa.json',
            'SUBMISSION_METHODS': '/ctrp/pa/submission_methods.json',
            'AUDIT_HISTORY': '/ctrp/trial_versions/history.json',
            'TRIAL_UPDATES_HISTORY': '/ctrp/trial_versions/updates_history.json',
            'TRIAL_SUBMISSIONS_HISTORY': '/ctrp/trial_versions/submissions_history.json',
            'TRIAL_DELETED_DOCUMENTS' : '/ctrp/registry/trial_documents/deleted_documents.json',
            'OUTCOME_MEASURE_TYPES': '/ctrp/outcome_measure_types.json',
            'OUTCOME_MEASURE_LIST' : '/ctrp/registry/outcome_measures.json',
            'A_OUTCOME_MEASURE' : '/ctrp/registry/outcome_measures/',
            'ASSAY_TYPES': '/ctrp/assay_types.json',
            'EVALUATION_TYPES': '/ctrp/evaluation_types.json',
            'SPECIMEN_TYPES': '/ctrp/specimen_types.json',
            'BIOMARKER_USES': '/ctrp/biomarker_uses.json',
            'BIOMARKER_PURPOSES': '/ctrp/biomarker_purposes.json',
            'SUB_GROUP_LIST' : '/ctrp/registry/sub_groups.json',
            'A_SUB_GROUP' : '/ctrp/registry/sub_groups/',
            'A_SUBMISSION' : '/ctrp/registry/submissions/',
            'CADSR_SEARCH': '/ctrp/cadsr_markers/search',
            'NCIT_DISEASE_CODE_LIST': '/ctrp/ncit_disease_codes.json',
            'NCIT_TREE': '/ctrp/ncit_disease_codes/get_tree.json',
            'SEARCH_DISEASE': '/ctrp/ncit_disease_codes/search.json',
            'COUNTRIES_LIST': '/ctrp/countries_for_registry.json',
            'AUTHORITIES_FOR_A_COUNTRY' : '/ctrp/get_authorities_for_a_country.json',
            'SERVICE_REQUESTS': '/ctrp/service_requests.json',
            'TRIALS': {
                'STATUS_WITH_ID': '/ctrp/registry/trial_statuses/{:id}.json',
                'PARTICIPATING_SITE_WITH_ID': '/ctrp/registry/participating_sites/{:id}.json',
            },

            'MILESTONES': '/ctrp/registry/milestones.json',
            'ONHOLD_REASONS': '/ctrp/registry/onhold_reasons.json',
            'PROCESSING_STATUSES': '/ctrp/registry/processing_statuses.json',
            'HOLDER_TYPES': '/ctrp/registry/holder_types.json',
            'NIH': '/ctrp/registry/nih.json',
            'TRIAL_DOCUMENT_LIST': '/ctrp/registry/trial_documents.json',

            //for comments
            'COMMENTS': {
              'COUNTS_FOR_INSTANCE': '/ctrp/instance/{:instance_uuid}/comments/count.json', //can have optional:field
              'FOR_INSTANCE': '/ctrp/instance/{:instance_uuid}/comments.json', //can have optional:field
              'WITH_ID': '/ctrp/comments/{:id}.json',  //GET, DELETE, and PATCH or PUT
              'CREATE': '/ctrp/comments.json'
            },

            //for PA
            'PA': {
                'TRIALS_CHECKOUT_IN': '/ctrp/pa/trial/{:trialId}/{:checkWhat}/{:checkoutType}.json',
                'TRIALS_CENTRAL_CONTACT_TYPES': '/ctrp/registry/trials/get_central_contact_types.json',
                'BOARD_APPROVAL_STATUSES': '/ctrp/registry/trials/get_board_approval_statuses.json',
                'TRIAL_DOCUMENT_TYPES': '/ctrp/pa/trial_document_types.json',
                'INTERVENTION_MODELS': '/ctrp/registry/trials/get_intervention_models.json',
                'MASKINGS': '/ctrp/registry/trials/get_maskings.json',
                'ALLOCATIONS': '/ctrp/registry/trials/get_allocations.json',
                'STUDY_CLASSIFICATIONS': '/ctrp/registry/trials/study_classifications.json',
                'STUDY_MODELS': '/ctrp/registry/trials/study_models.json',
                'TIME_PERSPECTIVES': '/ctrp/registry/trials/time_perspectives.json',
                'BIOSPECIMEN_RETENTIONS': '/ctrp/registry/trials/biospecimen_rententions.json',
                'GENDERS': '/ctrp/registry/trials/genders.json',
                'AGE_UNITS': '/ctrp/registry/trials/age_units.json',
                'SAMPLING_METHODS': '/ctrp/registry/sampling_methods.json',
                'TRIAL_ID_TYPES': '/ctrp/registry/trials/trial_identifier_types.json',
                'SEARCH_CLINICAL_TRIALS_GOV_IGNORE_EXITS': '/ctrp/registry/trials/search_clinical_trials_gov_ignore_exists.json',
                'SEARCH_NCI_TRIAL': '/ctrp/registry/trials/search_trial_with_nci_id.json',
                'ASSOCIATE_TRIAL': '/ctrp/associated_trials.json',
                'NCIT_INTERVENTIONS_LOOKUP': '/ctrp/registry/trials/lookup_imported_ncit_interventions.json',
                'INTERVENTION_TYPES': '/ctrp/registry/trials/get_intervention_types.json',
                'SEARCH_CTRP_INTERVENTIONS': '/ctrp/registry/trials/search_ctrp_interventions.json?c_code={:c_code}',
                'MAIL_LOGS': '/ctrp/registry/trials/get_mail_logs.json?trial_id={:trial_id}',
                'CHECKOUT_HISTORY': '/ctrp/registry/trials/get_trial_checkout_history.json?trial_id={:trial_id}',
                'INTERNAL_SOURCES': '/ctrp/registry/internal_sources.json',
                'AMENDMENT_REASONS': '/ctrp/registry/trials/amendment_reasons.json',
                'VALIDATE_ABSTRACTION': '/ctrp/model/validation_rules/trial/{:trial_id}.json',
            }
        })
        .constant('MESSAGES', {
            'STATES_AVAIL': 'states_or_provinces_available',
            'STATES_UNAVAIL': 'states_or_provinces_not_available',
            'PRIVILEGE_CHANGED': 'user_privilege_changed',
            'CURATION_MODE_CHANGED': 'curation_mode_changed',
            'DOCUMENT_UPLOADED': 'document_uploaded',
            'TRIAL_DETAIL_SAVED': 'trial_detail_saved',
            'TRIALS_CHECKOUT_IN_SIGNAL': 'trial_checkout_checkin',
        })
        .constant('DMZ_UTILS', {
            'APP_VERSION': '/ctrp/dmzutils/app_version.json',
            'APP_REL_MILESTONE': '/ctrp/dmzutils/app_rel_milestone.json',
            'LOGIN_BULLETIN': '/ctrp/dmzutils/login_bulletin.json'
        })
        .constant('PRIVILEGES', {
            //key mirrors value
            'READONLY': 'READONLY',
            'CURATOR': 'CURATOR'
        })
        .constant('FORMATS', {
            'NUMERIC': /^\d+$/
        });

})();
