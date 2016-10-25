require 'api_trial_child_xml_mappers.rb'
class ApiTrialCreateXmlMapper
    include XML::Mapping

    text_node :clinical_trial_dot_xml_required, "clinicalTrialsDotGovXmlRequired", :default_value=>nil, :optional=>true,
              :reader=>proc{|obj,xml,default_reader|
                default_reader.call(obj,xml)
                obj.clinical_trial_dot_xml_required=BooleanMapper.map(obj.clinical_trial_dot_xml_required)
              }

    ###Trial Identifiers
    text_node :study_source_id,"category",:optional=>true,:default_value=>nil,
              :reader=>proc{|obj,xml,default_reader|
                default_reader.call(obj,xml)
                obj.study_source_id= StudySource.find_by_name(obj.study_source_id).id if !obj.study_source_id.nil?
              }
    text_node :lead_protocol_id, "leadOrgTrialID",:optional=>true,:default_value=>nil
    array_node  :otherIDs, "otherTrialID",:optional=>true, :class => String,:default_value=>[]
    array_node  :clinicalIDs, "clinicalTrialsDotGovTrialID",:optional=>true, :class => String,:default_value=>[]

    ### Trial Details
    text_node :official_title, "title",:optional=>true,:default_value=>nil
    text_node :phase_id,"phase",:optional=>true,:default_value=>nil,
              :reader=>proc{|obj,xml,default_reader|
                default_reader.call(obj,xml)
                obj.phase_id= Phase.find_by_name(obj.phase_id).id if !obj.phase_id.nil?
              }
    text_node :pilot, "pilot", :default_value=>nil, :optional=>true,
                        :reader=>proc{|obj,xml,default_reader|
                           default_reader.call(obj,xml)
                           obj.pilot=BooleanMapper.map(obj.pilot)
                         }

    choice_node :if,    'interventionalDesign',      :then, (object_node :interventionalTrial,'interventionalDesign', :class=>InterventionalTrial,:default_valuse=>nil,:optional=>true),
                :elsif, 'nonInterventionalDesign',   :then, (object_node :nonInterventionalTrial,'nonInterventionalDesign',:class=>NonInterventionalTrial, :default_value=>nil, :optional=>true),
                :else,    (text_node :name, '.')

    text_node :primary_purpose_id,"primaryPurpose",:optional=>true,:default_value=>nil,
              :reader=>proc{|obj,xml,default_reader|
                default_reader.call(obj,xml)
                obj.primary_purpose_id= PrimaryPurpose.find_by_name(obj.primary_purpose_id).id if !obj.primary_purpose_id.nil?
              }
    text_node :primary_purpose_other, "primaryPurposeOtherDescription", :optional=>true, :default_value=>nil

    text_node :accrual_disease_term_id,"accrualDiseaseTerminology",:optional=>true,:default_value=>nil,
              :reader=>proc{|obj,xml,default_reader|
                default_reader.call(obj,xml)
                obj.accrual_disease_term_id= AccrualDiseaseTerm.find_by_name(obj.accrual_disease_term_id).id if !obj.accrual_disease_term_id.nil?
              }


    ### Lead Org, PI, Sponsor
    ###
    object_node :leadOrganization, "leadOrganization", :class => ExistingOrganization,:optional=>true,:default_value=>nil
    object_node :pi, "pi", :class =>ExistingPerson,:optional=>true,:default_value=>nil
    object_node :sponsor, "sponsor", :class =>ExistingOrganization,:optional=>true,:default_value=>nil

    ###Funding Source
    ###
    array_node  :fundingSources, "summary4FundingSponsor", :class =>ExistingOrganization,:optional=>true,:default_value=>nil
    text_node :program_code, "programCode",:optional=>true, :default_valuse=>nil


    ###Grants
    ###
    text_node :grant_question, "fundedByNciGrant", :default_value=>nil, :optional=>true,
              :reader=>proc{|obj,xml,default_reader|
                default_reader.call(obj,xml)
                obj.grant_question=BooleanMapper.map(obj.grant_question)
              }
    array_node  :grants, "grant",:optional=>true, :class => GrantXml,:default_value=>[]

    ###Trial Status
    ###
    text_node :trial_status_id,"trialStatus",:optional=>true,:default_value=>nil,
              :reader=>proc{|obj,xml,default_reader|
                default_reader.call(obj,xml)
                obj.trial_status_id= TrialStatus.find_by_name(obj.trial_status_id).id if !obj.trial_status_id.nil?
              }
    text_node :why_stopped, "whyStopped",:default_value=>nil,:optional=>true
    text_node :status_date, "trialStatusDate",:default_value=>nil,:optional=>true

    ###Trial Dates
    ###
    text_node :start_date_qual, "trialStartDate/@type" ,:default_value=>nil,:optional=>true
    text_node :start_date, "trialStartDate",:default_value=>nil,:optional=>true

    text_node :primary_comp_date_qual, "primaryCompletionDate/@type" ,:default_value=>nil,:optional=>true
    text_node :primary_comp_date, "primaryCompletionDate",:default_value=>nil,:optional=>true

    text_node :comp_date_qual, "completionDate/@type" ,:default_value=>nil,:optional=>true
    text_node :comp_date, "completionDate",:default_value=>nil,:optional=>true

    ###IND,IDE
    ###
    array_node  :inds, "ind",:optional=>true, :class => IndIdeXml,:default_value=>[]
    array_node  :ides, "ide",:optional=>true, :class => IndIdeXml,:default_value=>[]

    ###Regulatory Information
    ###
    object_node :responsible_party, "responsibleParty", :class =>ResponsiblePartyXml,:optional=>true,:default_value=>nil
    object_node :regulatoryInformation, "regulatoryInformation", :class =>RegulatoryInformationXml,:optional=>true,:default_value=>nil

    ###Trial Owner
    ###
    array_node  :trialOwners, "trialOwner",:optional=>true, :class => String,:default_value=>[]

    ###Trial Docs
    ###
    text_node :protocol_document_name, "protocolDocument/@filename" ,:default_value=>nil,:optional=>true
    text_node :protocol_document_content, "protocolDocument",:default_value=>nil,:optional=>true

    text_node :irb_approval_document_name, "irbApprovalDocument/@filename" ,:default_value=>nil,:optional=>true
    text_node :irb_approval_document_content, "irbApprovalDocument",:default_value=>nil,:optional=>true

    text_node :participating_sites_document_name, "participatingSitesDocument/@filename" ,:default_value=>nil,:optional=>true
    text_node :participating_sites_document_content, "participatingSitesDocument",:default_value=>nil,:optional=>true

    text_node :informed_consent_document_name, "informedConsentDocument/@filename" ,:default_value=>nil,:optional=>true
    text_node :informed_consent_document_content, "informedConsentDocument",:default_value=>nil,:optional=>true

    text_node :change_memo_document_name, "changeMemoDocument/@filename" ,:default_value=>nil,:optional=>true
    text_node :change_memo_document_content, "changeMemoDocument",:default_value=>nil,:optional=>true

    text_node :protocol_highlight_document_name, "protocolHighlightDocument/@filename" ,:default_value=>nil,:optional=>true
    text_node :protocol_highlight_document_content, "protocolHighlightDocument",:default_value=>nil,:optional=>true

    hash_node :otherDocs, "otherDocument", "@filename" ,:optional=>true, :class => String,:default_value=>[]

    text_node :amendment_number, "amendmentNumber" ,:default_value=>nil,:optional=>true
    text_node :amendment_date, "amendmentDate" ,:default_value=>nil,:optional=>true


end

