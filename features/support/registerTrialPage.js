/**
 * Created by singhs10 on 11/7/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');

var registerTrial = function(){

    /** Trial Identifiers **/
    this.addTrialIdentifiersSection = element(by.linkText('Trial Identifiers'));
    this.addTrialStudySource = element(by.model('trialDetailView.curTrial.study_source_id'));
    this.addTrialLeadProtocolIdentifier = element(by.model('trialDetailView.curTrial.lead_protocol_id'));
    this.trialNCIID = element.all(by.binding('trialDetailView.curTrial.nci_id'));
    this.addTrialProtocolIDOrigin = element(by.model('trialDetailView.protocol_id_origin_id'));
    this.addTrialProtocolIDOriginList = element.all(by.binding('origin.name'));
    this.addTrialProtocolID = element(by.model('trialDetailView.protocol_id'));
    this.addTrialAddProtocolButton = element(by.css('button[ng-click="trialDetailView.addOtherId()"]'));
    this.addTrialVerifyOtherTrialIdentifier = element.all(by.css('tr[ng-repeat="otherId in trialDetailView.addedOtherIds track by $index"]'));
    this.addTrialVerifyOtherTrialIdentifierExist = element(by.css('tr[ng-repeat="otherId in trialDetailView.addedOtherIds track by $index"]'));
    this.addTrialVerifyOtherTrialIdentifierTable =  element.all(by.binding('otherId.protocol_id'));
    this.addTrialLeadProtocolIdValidationMessage = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.lead_protocol_id) || (trial_form.lead_protocol_id.$error.required && trialDetailView.showLpiError)"]'));
    this.addTrialRemoveOtherTrialIdentifier = element(by.css('table[ng-show="trialDetailView.addedOtherIds.length > 0"]')).all(by.css('.glyphicon.glyphicon-remove-circle'));

    /** Trial Details **/
    this.addTrialDetailsSection = element(by.linkText('Trial Details'));
    this.addTrialOfficialTitle = element(by.model('trialDetailView.curTrial.official_title'));
    this.addTrialPhase = element(by.model('trialDetailView.curTrial.phase_id'));
    this.addTrialPhaseList = element(by.model('trialDetailView.curTrial.phase_id')).all(by.css('option[label]'));
    this.addTrialPilotOption = element.all(by.model('trialDetailView.curTrial.pilot'));
    this.addTrialResearchCategory = element(by.model('trialDetailView.curTrial.research_category_id'));
    this.addTrialResearchCategoryList = element(by.model('trialDetailView.curTrial.research_category_id')).all(by.css('option[label]'));
    this.addTrialPrimaryPurpose = element(by.model('trialDetailView.curTrial.primary_purpose_id'));
    this.addTrialPrimaryPurposeList = element(by.model('trialDetailView.curTrial.primary_purpose_id')).all(by.css('option[label]'));
    this.addTrialPrimaryPurposeOtherDescription = element(by.model('trialDetailView.curTrial.primary_purpose_other'));
    this.addTrialSecondaryPurpose = element(by.model('trialDetailView.curTrial.secondary_purpose_id'));
    this.addTrialSecondaryPurposeList = element(by.model('trialDetailView.curTrial.secondary_purpose_id')).all(by.css('option[label]'));
    this.addTrialSecondaryPurposeOtherDescription = element(by.model('trialDetailView.curTrial.secondary_purpose_other'));
    this.addTrialAccrualDiseaseTerminology = element(by.model('trialDetailView.curTrial.accrual_disease_term_id'));
    this.addTrialAccrualDiseaseTerminologyList = element(by.model('trialDetailView.curTrial.accrual_disease_term_id')).all(by.css('option[label]'));

    /** Lead Organization/Principal Investigator **/
    this.addTrialLeadOrganization = element(by.css('input[name="lead_org_name"]'));
    this.addTrialPrincipalInvestigator = element(by.css('input[name="pi_name1"]'));

    /** Sponsor **/
    this.addTrialSponsor = element(by.css('input[name="sponsor_name"]'));

    /** Data Table 4 Information **/
    this.addTrialDataTable4FundingSourceValues = element.all(by.css('div[ng-repeat="fs in trialDetailView.addedFses track by $index"]')).all(by.css('input[disabled]'));
    this.addTrialDataTable4ProgramCode = element(by.model('trialDetailView.curTrial.program_code'));

    /** NIH Grant Information **/
    this.addTrialFundedByNCIQuestion = element(by.css('div[is-open="trialDetailView.accordions[6]"]')).all(by.css('.control-label.col-xs-12.col-sm-3'));
    this.addTrialFundedByNCIOption = element.all(by.model('trialDetailView.curTrial.grant_question'));
    this.addTrialFundingMechanism = element(by.model('trialDetailView.funding_mechanism'));
    this.addTrialInstituteCode = element(by.model('trialDetailView.institute_code'));
    this.addTrialSerialNumberBox = element(by.binding('$select.placeholder')); //element(by.css('span[aria-label="Select box activate"]'));//element(by.model('trialDetailView.serial_number'));
    this.addTrialSerialNumberField = element(by.css('input[ng-model="$select.search"]'));
    this.addTrialSerialNumberSelect = element(by.css('.ui-select-choices-row.select2-highlighted'));
    this.addTrialSerialNumberVerify = element(by.css('.select2-choice.ui-select-match'));
    this.addTrialNCIDivisionProgramCode = element(by.model('trialDetailView.nci'));
    this.addTrialAddGrantInfoButton = element(by.css('button[ng-click="trialDetailView.addGrant()"]'));
    this.addTrialVerifyGrantTable = element.all(by.css('tr[ng-repeat="grant in trialDetailView.addedGrants track by $index"]'));
    this.addTrialVerifyGrantTableExist = element(by.css('tr[ng-repeat="grant in trialDetailView.addedGrants track by $index"]'));
    this.addTrialRemoveGrantValues = element(by.css('table[ng-show="trialDetailView.addedGrants.length > 0"]')).all(by.css('.glyphicon.glyphicon-remove-circle'));

    /** Trial Status **/
    this.addTrialStatusDate = element(by.model('trialDetailView.status_date'));
    this.addTrialStatus = element(by.model('trialDetailView.trial_status_id'));
    this.addTrialStatusList = element.all(by.css('option[ng-repeat="trialStatus in trialDetailView.trialStatusArr"]'));
    this.addTrialStatusComment = element(by.model('trialDetailView.status_comment'));
    this.addTrialWhyStudyStopped = element(by.model('trialDetailView.why_stopped'));
    this.addTrialAddStatusButton = element(by.css('button[ng-click="trialDetailView.addStatus()"]'));
    this.addTrialAddStatusTable = element.all(by.css('tr[ng-repeat="status in trialDetailView.addedStatuses track by $index"]'));
    this.addTrialAddStatusTableExist = element(by.css('tr[ng-repeat="status in trialDetailView.addedStatuses track by $index"]'));
    this.addTrialStatusDateTableVerifyDateExist = element(by.binding('status.status_date'));
    this.addTrialStatusDateTable = element.all(by.binding('status.status_date'));
    this.addTrialStatusNameTable = element.all(by.binding('status.trial_status_name'));
    this.addTriaCommentTable = element.all(by.binding('status.comment'));
    this.addTrialWhyStudyStoppedTable = element.all(by.binding('status.why_stopped'));
    this.addTrialErrorWarningTable = element.all(by.css('.col-md-4.status-error'));
    this.addTrialRemoveTrialStatus = element(by.css('table[ng-show="trialDetailView.addedStatuses.length > 0"]')).all(by.css('.glyphicon.glyphicon-remove-circle'));
    this.addTrialStatusWhyDeletedReason = element(by.model('model.why_deleted'));
    this.addTrialStatusWhyDeletedCommit = element(by.id('commit_deletion_comment'));
    this.addTrialStatusDeletedStatus = element.all(by.css('.animated-item.deleted-text'));


    /** Trial Dates **/
    this.addTrialStartDate = element(by.model('trialDetailView.curTrial.start_date'));
    this.addTrialStartDateOption = element.all(by.model('trialDetailView.curTrial.start_date_qual'));
    this.addTrialStartDateErrorMessage = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.start_date_qual)"]'));
    this.addTrialStartDateErrorMessageActualAnticipated = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.sdq_dummy2)"]'));
    this.addTrialStartDateErrorMessageForTrialStatus = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.sdq_dummy)"]'));
    this.addTrialPrimaryCompletionDate = element(by.model('trialDetailView.curTrial.primary_comp_date'));
    this.addTrialPrimaryCompletionDateOption = element.all(by.model('trialDetailView.curTrial.primary_comp_date_qual'));
    this.addTrialPrimaryCompletionDateErrorMessage = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.primary_comp_date_qual)"]'));
    this.addTrialPrimaryCompletionDateErrorMessageActualAnticipated = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.pcd_dummy2)"]'));
    this.addTrialPrimaryCompletionDateErrorMessageForTrialStatus = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.pcd_dummy)"]'));
    this.addTrialPrimaryCompletionDateErrorMessageWithTrialStartDate = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.pcd_dummy3)"]'));
    this.addTrialCompletionDate = element(by.model('trialDetailView.curTrial.comp_date'));
    this.addTrialCompletionDateOption = element.all(by.model('trialDetailView.curTrial.comp_date_qual'));
    this.addTrialCompletionDateErrorMessage = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.comp_date_qual)"]'));
    this.addTrialCompletionDateErrorMessageActualAnticipated = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.cd_dummy2)"]'));
    this.addTrialCompletionDateErrorMessageForTrialStatus = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.cd_dummy)"]'));
    this.addTrialCompletionDateErrorMessageWithTrialPrimaryCompletionDate = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.cd_dummy3)"]'));

    /** FDA IND/IDE Information **/
    this.addTrialFDAIND_IDETypesQuestion = element(by.css('div[is-open="trialDetailView.accordions[9]"]')).all(by.css('.control-label.col-xs-12.col-sm-3'));
    this.addTrialFDAIND_IDEOption = element.all(by.model('trialDetailView.curTrial.ind_ide_question'));
    this.addTrialFDAIND_IDETypes = element(by.model('trialDetailView.ind_ide_type'));
    this.addTrialFDAIND_IDETypesList = element.all(by.css('.ind-ide-type'));
    this.addTrialFDAIND_IDENumber = element(by.model('trialDetailView.ind_ide_number'));
    this.addTrialFDAIND_IDEGrantor = element(by.model('trialDetailView.grantor'));
    this.addTrialFDAIND_IDEGrantorList = element.all(by.binding('grantor'));
    this.addTrialFDAIND_IDEHolderType = element(by.model('trialDetailView.holder_type_id'));
    this.addTrialFDAIND_IDEHolderTypeList = element.all(by.css('option[ng-repeat="holderType in trialDetailView.holderTypeArr"]'));
    this.addTrialFDAProgramCode = element(by.model('trialDetailView.nih_nci'));
    this.addTrialFDAProgramCodeList = element.all(by.binding('nihNci.code'));
    this.addTrialAddIND_IDEButton = element(by.css('button[ng-click="trialDetailView.addIndIde()"]'));
    this.addTrialVerifyIND_IDETable = element.all(by.css('tr[ng-repeat="indIde in trialDetailView.addedIndIdes track by $index"]'));
    this.addTrialVerifyIND_IDETableExist = element(by.css('tr[ng-repeat="indIde in trialDetailView.addedIndIdes track by $index"]'));

    /** Regulatory Information **/
    this.addTrialRegulatoryInformationText = element(by.css('.control-label.col-xs-12.col-sm-7'));
    this.addTrialResponsibleParty = element(by.model('trialDetailView.curTrial.responsible_party_id'));
    this.addTrialResponsiblePartyList = element(by.model('trialDetailView.curTrial.responsible_party_id')).all(by.css('option[label]'));
    this.addTrialInvestigator = element(by.css('input[name="investigator_name1"]'));
    this.addTrialInvestigatorTitle = element(by.model('trialDetailView.curTrial.investigator_title'));
    this.addTrialInvestigatorAffiliation = element(by.css('input[name="inv_aff_name1"]'));
    this.addTrialOversightAuthorityCountry = element(by.model('trialDetailView.authority_country'));
    this.addTrialOversightAuthorityOrganization = element(by.model('trialDetailView.authority_org'));
    this.addTrialAddOversightAuthorityButton = element(by.css('button[ng-click="trialDetailView.addAuthority()"]'));
    this.addTrialVerifyOversightCountryOrganization = element.all(by.css('tr[ng-repeat="authority in trialDetailView.addedAuthorities track by $index"]'));
    this.addTrialVerifyOversightCountryOrganizationExist = element(by.css('tr[ng-repeat="authority in trialDetailView.addedAuthorities track by $index"]'));
    this.addTrialFDARegulatedInterventionIndicator = element.all(by.model('trialDetailView.curTrial.intervention_indicator'));
    this.addTrialSection801Indicator = element.all(by.model('trialDetailView.curTrial.sec801_indicator'));
    this.addTrialDataMonitoringCommitteeAppointedIndicator = element.all(by.model('trialDetailView.curTrial.data_monitor_indicator'));
    this.addTrialDuplicateCountryOrganizationMessage = element(by.binding('trialDetailView.addAuthorityError'));

    /** Trial Related Documents **/
    this.addTrialVerifyAddedDocs = element.all(by.binding('document.file_name'));
    this.addTrialVerifyAddedOtherDocsDescriptionOnly = element(by.binding('document.document_subtype'));
    this.addTrialVerifyAddedOtherDocsDescription = element.all(by.binding('document.document_subtype'));
    this.addTrialAcceptedFileExtensionMsg = element.all(by.binding('trialDetailView.acceptedFileExtensions'));
    this.addTrialAddMoreDocsButton = element(by.css('button[ng-click="trialDetailView.addOtherDoc()"]'));
    this.addTrialOtherDocsDescription = element.all(by.model('trialDetailView.other_document_subtypes[$index]'));

    /**buttons**/
    this.addTrialResetButton = element(by.css('button[ng-click="trialDetailView.reset()"]'));//element(by.css('button[ng-click="trialDetailView.reload()"]'));
    this.addTrialReviewSubmitButton = element(by.css('button[type="submit"]'));
    this.addTrialSaveDraftButton = element(by.css('button[ng-click="trialDetailView.saveDraft()"]'));
    this.addTrialReviewButton = element(by.buttonText('Review'));
    this.addTrialSubmitButton = element(by.buttonText('Submit'));

    /**Org Search Model**/
    this.addTrialOrgSearchModel = element.all(by.id('org_search_modal'));//.get(2).click()

    /**Person Search Model**/
    this.addTrialPersonSearchModel = element.all(by.id('person_search_modal'));

    /**Validation message**/
    this.addTrialValidationMessage = element.all(by.css('.add-association-error'));
    this.addTrialDocumentNoteMessage = element.all(by.css('.text-left.text-block'));

    /**Date fields**/
    this.addTrialDateFields = element.all(by.css('.glyphicon.glyphicon-calendar'));
    this.addTrialDateClickToday = element(by.css('.uib-datepicker-popup.dropdown-menu')).element(by.buttonText('Today'));
    //this.addTrialDateClickToday = element(by.model('date')).element(by.buttonText('Today'));
    this.addTrialDateClickClear = element(by.css('.uib-datepicker-popup.dropdown-menu')).element(by.buttonText('Clear'));
   // this.addTrialDateClickClear = element(by.model('date')).element(by.buttonText('Clear'));
   this.addTrialDateClickPreviousMonth = element(by.css('.uib-datepicker-popup.dropdown-menu')).$('.glyphicon.glyphicon-chevron-left');
    //this.addTrialDateClickPreviousMonth = element(by.model('date')).$('.glyphicon.glyphicon-chevron-left');//element(by.css('.glyphicon.glyphicon-chevron-left'));
    this.addTrialDateClickNextMonth = element(by.css('.uib-datepicker-popup.dropdown-menu')).$('.glyphicon.glyphicon-chevron-right');
    //this.addTrialDateClickNextMonth = element(by.model('date')).$('.glyphicon.glyphicon-chevron-right');//element(by.css('.glyphicon.glyphicon-chevron-right'));
    this.addTrialDateClickYearMonthDate = element(by.css('.uib-datepicker-popup.dropdown-menu')).$('button[role="heading"]');
  //  this.addTrialDateClickYearMonthDate = element(by.model('date')).$('button[role="heading"]');//element(by.css('button[role="heading"]'));


    /******************
     * View Trial *
     ******************/

    /** Trial Identifiers **/
    this.viewTrialLeadProtocolIdentifier = element(by.binding('viewTrialView.curTrial.lead_protocol_id'));
    this.viewTrialNCIID = element(by.binding('viewTrialView.curTrial.nci_id'));
    this.viewTrialOtherIdentifierNameValue =  element.all(by.binding('otherId.protocol_id'));
    this.viewTrialOtherIdentifierValuePresent =  element(by.css('td.col-md-6.protocol-id'));
    this.viewTrialOtherIdentifierAllValues =  element.all(by.css('td.col-md-6.protocol-id'));
    this.viewTrialOtherIdentifierAllValuesTbl =  element.all(by.css('tr[ng-repeat="otherId in viewTrialView.curTrial.other_ids track by $index"]'));

    /** Trial Details **/
    this.viewTrialOfficialTitle = element(by.binding('viewTrialView.curTrial.official_title'));
    this.viewTrialPhase = element(by.binding('viewTrialView.curTrial.phase.name'));
    this.viewTrialPilotOption = element(by.binding('viewTrialView.curTrial.pilot'));
    this.viewTrialResearchCategory = element(by.binding('viewTrialView.curTrial.research_category.name'));
    this.viewTrialPrimaryPurpose = element(by.binding('viewTrialView.curTrial.primary_purpose.name'));
    this.viewTrialPrimaryPurposeOtherDescription = element(by.model('trialDetailView.curTrial.primary_purpose_other'));
    this.viewTrialSecondaryPurpose = element(by.binding('viewTrialView.curTrial.secondary_purpose.name'));
    this.viewTrialSecondaryPurposeOtherDescription = element(by.model('trialDetailView.curTrial.secondary_purpose_other'));
    this.viewTrialAccrualDiseaseTerminology = element(by.binding('viewTrialView.curTrial.accrual_disease_term.name'));

    /** Lead Organization/Principal Investigator **/
    this.viewTrialLeadOrganization = element(by.binding('viewTrialView.curTrial.lead_org.name'));
    this.viewTrialPrincipalInvestigator = element(by.binding('viewTrialView.curTrial.pi.lname + ', ' + viewTrialView.curTrial.pi.fname'));

    /** Sponsor **/
    this.viewTrialSponsor = element(by.binding('viewTrialView.curTrial.sponsor.name'));

    /** Data Table 4 Information **/
    this.viewTrialDataTable4FundingSourceValues = element(by.binding('funding_source.name'));
    this.viewTrialDataTable4ProgramCode = element(by.binding('viewTrialView.curTrial.program_code'));

    /** NIH Grant Information **/
    this.viewTrialFundedByNCIOption = element.all(by.model('trialDetailView.curTrial.grant_question'));
    this.viewTrialFundingMechanism = element(by.model('trialDetailView.funding_mechanism'));
    this.viewTrialInstituteCode = element(by.model('trialDetailView.institute_code'));
    this.viewTrialSerialNumberBox = element(by.binding('$select.placeholder')); //element(by.css('span[aria-label="Select box activate"]'));//element(by.model('trialDetailView.serial_number'));
    this.viewTrialSerialNumberField = element(by.css('input[ng-model="$select.search"]'));
    this.viewTrialSerialNumberSelect = element(by.css('.ui-select-choices-row.select2-highlighted'));
    this.viewTrialSerialNumberVerify = element(by.css('.select2-choice.ui-select-match'));
    this.viewTrialNCIDivisionProgramCode = element(by.model('trialDetailView.nci'));
    this.viewTrialviewGrantInfoButton = element(by.css('button[ng-click="trialDetailView.addGrant()"]'));
   // this.viewTrialVerifyGrantTable = element.all(by.css('tr[ng-repeat="grant in trialDetailView.viewedGrants track by $index"]'));
    this.viewTrialVerifyGrantTable = element.all(by.css('tr[ng-repeat="grant in viewTrialView.curTrial.grants track by $index"]'));

    /** Trial Status **/
    this.viewTrialStatusDate = element(by.binding('viewTrialView.curTrial.current_trial_status_date'));
    this.viewTrialStatus = element(by.binding('viewTrialView.curTrial.current_trial_status'));
    this.viewTrialStatusComment = element(by.model('trialDetailView.status_comment'));
    this.viewTrialWhyStudyStopped = element(by.model('trialDetailView.why_stopped'));

    /** Trial Dates **/
    this.viewTrialStartDate = element(by.binding('viewTrialView.curTrial.start_date'));
    this.viewTrialStartDateOption = element(by.binding('viewTrialView.curTrial.start_date_qual'));
    this.viewTrialPrimaryCompletionDate = element(by.binding('viewTrialView.curTrial.primary_comp_date'));
    this.viewTrialPrimaryCompletionDateOption = element(by.binding('viewTrialView.curTrial.primary_comp_date_qual'));
    this.viewTrialCompletionDate = element(by.binding('viewTrialView.curTrial.comp_date'));
    this.viewTrialCompletionDateOption = element(by.binding('viewTrialView.curTrial.comp_date_qual'));

    /** FDA IND/IDE Information **/
    this.viewTrialFDAIND_IDEOption = element.all(by.model('trialDetailView.curTrial.ind_ide_question'));
    this.viewTrialFDAIND_IDETypes = element(by.model('trialDetailView.ind_ide_type'));
    this.viewTrialFDAIND_IDETypesList = element.all(by.css('.ind-ide-type'));
    this.viewTrialFDAIND_IDENumber = element(by.model('trialDetailView.ind_ide_number'));
    this.viewTrialFDAIND_IDEGrantor = element(by.model('trialDetailView.grantor'));
    this.viewTrialFDAIND_IDEGrantorList = element.all(by.binding('grantor'));
    this.viewTrialFDAIND_IDEHolderType = element(by.model('trialDetailView.holder_type_id'));
    this.viewTrialFDAIND_IDEHolderTypeList = element.all(by.css('option[ng-repeat="holderType in trialDetailView.holderTypeArr"]'));
    this.viewTrialFDAProgramCode = element(by.model('trialDetailView.nih_nci'));
    this.viewTrialFDAProgramCodeList = element.all(by.binding('nihNci.code'));
    this.viewTrialAddIND_IDEButton = element(by.css('button[ng-click="trialDetailView.addIndIde()"]'));
   // this.viewTrialVerifyIND_IDETable = element.all(by.css('tr[ng-repeat="indIde in trialDetailView.addedIndIdes track by $index"]'));
    this.viewTrialVerifyIND_IDETable = element.all(by.css('tr[ng-repeat="indIde in viewTrialView.curTrial.ind_ides track by $index"]'));


    /** Regulatory Information **/
    this.viewTrialRegulatoryInformationText = element(by.css('.control-label.col-xs-12.col-sm-7'));
    this.viewTrialResponsibleParty = element(by.binding('viewTrialView.curTrial.responsible_party.name'));
    this.viewTrialResponsiblePartyList = element(by.model('trialDetailView.curTrial.responsible_party_id')).all(by.css('option[label]'));
    this.viewTrialInvestigator = element(by.css('input[name="investigator_name1"]'));
    this.viewTrialInvestigatorTitle = element(by.model('trialDetailView.curTrial.investigator_title'));
    this.viewTrialInvestigatorAffiliation = element(by.css('input[name="inv_aff_name1"]'));
    this.viewTrialOversightAuthorityCountry = element(by.model('trialDetailView.authority_country'));
    this.viewTrialOversightAuthorityOrganization = element(by.model('trialDetailView.authority_org'));
    this.viewTrialAddOversightAuthorityButton = element(by.css('button[ng-click="trialDetailView.addAuthority()"]'));
   // this.viewTrialVerifyOversightCountryOrganization = element.all(by.css('tr[ng-repeat="authority in trialDetailView.viewedAuthorities track by $index"]'));
    this.viewTrialVerifyOversightCountryOrganization = element.all(by.css('tr[ng-repeat="authority in viewTrialView.curTrial.oversight_authorities track by $index"]'));
    this.viewTrialFDARegulatedInterventionIndicator = element(by.binding('viewTrialView.curTrial.intervention_indicator'));
    this.viewTrialSection801Indicator = element(by.binding('viewTrialView.curTrial.sec801_indicator'));
    this.viewTrialDataMonitoringCommitteeAppointedIndicator = element(by.binding('viewTrialView.curTrial.data_monitor_indicator'));
    this.viewTrialDuplicateCountryOrganizationMessage = element(by.binding('trialDetailView.addAuthorityError'));

    /** Trial Related Documents **/
    this.viewTrialVerifyviewedDocsExist = element(by.binding('f.file_name'));//element(by.binding('document.file_name'));
    this.viewTrialVerifyviewedDocs = element.all(by.binding('f.file_name')); //element.all(by.binding('document.file_name'));
    this.viewTrialVerifyviewedOtherDocsDescription = element.all(by.binding('document.document_subtype'));
    this.viewTrialAcceptedFileExtensionMsg = element.all(by.binding('trialDetailView.acceptedFileExtensions'));
    this.viewTrialAddMoreDocsButton = element(by.css('button[ng-click="trialDetailView.addOtherDoc()"]'));
    this.viewTrialOtherDocsDescription = element.all(by.model('trialDetailView.other_document_subtypes[$index]'));

    /** Trial Participating Sites **/
    this.viewParticipatingSiteNamePresent = element(by.binding('ps.organization.name'));
    this.viewParticipatingSiteName = element.all(by.binding('ps.organization.name'));
    this.viewTrialPsticipatingSites = element.all(by.css('tr[ng-repeat="ps in viewTrialView.curTrial.participating_sites track by $index"]'));

    /** Trial Expand - Collapse **/
    this.trialCollapseAll = element(by.css('button[ng-show="!trialDetailView.collapsed"]'));
    this.trialExpandAll = element(by.css('button[ng-show="trialDetailView.collapsed"]'));


    /** Character Limit**/
    this.addTrialLeadOrgIdentifierCharacter = element(by.binding('30 - trialDetailView.curTrial.lead_protocol_id.length'));
    this.addTrialOtherTrialIdentifierCharacter = element(by.binding('30 - trialDetailView.protocol_id.length'));
    this.addTrialOfficialTitleCharacter = element(by.binding('600 - trial_form.official_title.$viewValue.length'));
    this.addTrialPrimaryPurposeDescriptionCharacter = element(by.binding('200 - trial_form.primary_purpose_other.$viewValue.length'));
    this.addTrialSecondaryPurposeDescriptionCharacter = element(by.binding('1000 - trial_form.secondary_purpose_other.$viewValue.length'));
    this.addTrialInvestigatorTitleCharacter = element(by.binding('254 - trialDetailView.curTrial.investigator_title.length '));
    this.addTrialWhyStudyStoppedCharacter = element();
    this.addTrialStatusCommentCharacter = element();

    var helper = new helperFunctions();
    var self = this;

    /********** Trial Identifiers **********/

    this.getVerifyTrialIdentifiersSection = function()  {
        expect(this.addTrialIdentifiersSection.getText()).to.eventually.equal('Trial Identifiers');
    };

    this.getVerifyTrialStudySource = function(studySource)  {
        helper.getVerifyListValue(this.addTrialStudySource,studySource,"Get Trial Study Source field");
    };

    this.setAddTrialLeadProtocolIdentifier = function(trialLeadProtocolIdentifier)  {
        helper.setValue(this.addTrialLeadProtocolIdentifier,trialLeadProtocolIdentifier,"Add Trial by Lead Protocol Identifier field");
    };

    this.selectAddTrialProtocolIDOrigin = function(trialProtocolIDOrigin)  {
        helper.selectValueFromList(this.addTrialProtocolIDOrigin,trialProtocolIDOrigin,"Add Trial by Protocol ID Origin field");
    };

    this.setAddTrialProtocolID = function(trialProtocolID)  {
        helper.setValue(this.addTrialProtocolID,trialProtocolID,"Add Trial by Protocol ID field");
    };

    this.clickAddTrialAddProtocolButton = function(){
        helper.clickButton(this.addTrialAddProtocolButton,"Add Trial Protocol ID Add button");
    };

    this.getVerifyAddTrialLeadProtocolIdentifier = function(trialLeadProtocolIdentifier){
        helper.getVerifyValue(this.addTrialLeadProtocolIdentifier,trialLeadProtocolIdentifier,"Add Trial by Lead Protocol Identifier field");
    };

    /********** Trial Details **********/

    this.getVerifyTrialDetailsSection = function()  {
        expect(this.addTrialDetailsSection.getText()).to.eventually.equal('Trial Details');
    };

    this.setAddTrialOfficialTitle= function(trialOfficialTitle)  {
        helper.setValue(this.addTrialOfficialTitle,trialOfficialTitle,"Add Trial by Official Title field");
    };

    this.selectAddTrialPhase = function(trialPhase)  {
        var  selectTrialPhase =  element(by.xpath('//*[@id="phase"]/option[.="' + trialPhase + '"]'));
        var  selectTrialPhaseDefault =  element(by.xpath('//*[@id="phase"]/option[.="-Select a Phase-"]'));
        if(trialPhase === '') {
            helper.selectValue(selectTrialPhaseDefault,'-Select a Phase-',"Add Trial by Phase field");
        } else{
            helper.selectValue(selectTrialPhase,trialPhase,"Add Trial by Phase field");
        }
        //Commenting below to select the Exact value
        // if (trialPhase !== ''){
        // helper.selectValueFromList(this.addTrialPhase,trialPhase,"Add Trial by Phase ID field");
        // }
    };

    this.selectAddTrialPilotOption = function(trialPilotOption)  {
        if(trialPilotOption.toUpperCase() === 'NO'){
            helper.clickRadioButton(this.addTrialPilotOption, '0', "Add Trial by Pilot Option field");
        } else if(trialPilotOption.toUpperCase() === 'YES'){
            helper.clickRadioButton(this.addTrialPilotOption, '1', "Add Trial by Pilot Option field");
        } else {
            helper.clickRadioButton(this.addTrialPilotOption, trialPilotOption, "Add Trial by Pilot Option field");
        }
    };

    this.selectAddTrialResearchCategory = function(trialResearchCategory)  {
        if(trialResearchCategory !== '') {
            helper.selectValueFromList(this.addTrialResearchCategory, trialResearchCategory, "Add Trial by Research Category field");
        }
    };

    this.selectAddTrialPrimaryPurpose = function(trialPrimaryPurpose)  {
        if(trialPrimaryPurpose !== '') {
            helper.selectValueFromList(this.addTrialPrimaryPurpose, trialPrimaryPurpose, "Add Trial by Primary Purpose field");
        }
    };

    this.setAddTrialPrimaryPurposeOtherDescription= function(PrimaryPurposeOtherDescription)  {
        helper.setValue(this.addTrialPrimaryPurposeOtherDescription,PrimaryPurposeOtherDescription,"Add Trial by Primary Purpose Other Description field");
    };

    this.selectAddTrialSecondaryPurpose = function(trialSecondaryPurpose)  {
        if(trialSecondaryPurpose !== '') {
            helper.selectValueFromList(this.addTrialSecondaryPurpose, trialSecondaryPurpose, "Add Trial by Secondary Purpose field");
        }
    };

    this.setAddTrialSecondaryPurposeOtherDescription = function(SecondaryPurposeOtherDescription)  {
        helper.setValue(this.addTrialSecondaryPurposeOtherDescription,SecondaryPurposeOtherDescription,"Add Trial by Secondary Purpose Other Description field");
    };

    this.selectAddTrialAccrualDiseaseTerminology = function(trialAccrualDiseaseTerminology)  {
        if(trialAccrualDiseaseTerminology !== '') {
            helper.selectValueFromList(this.addTrialAccrualDiseaseTerminology, trialAccrualDiseaseTerminology, "Add Trial by Accrual Disease Terminology field");
        }
    };


    this.getVerifyAddTrialOfficialTitle= function(trialOfficialTitle)  {
        helper.getVerifyValue(this.addTrialOfficialTitle,trialOfficialTitle,"Add Trial by Official Title field");
    };

    this.getVerifyAddTrialPhase = function(trialPhase)  {
        helper.getVerifyListValue(this.addTrialPhase,trialPhase,"Add Trial by Phase ID field");
    };

    this.getVerifyAddTrialPilotOption = function(trialPilotOption)  {
        if (trialPilotOption === '0') {
            expect(this.addTrialPilotOption.get(0).isSelected()).to.eventually.equal(true);
        }
        else if (trialPilotOption === '1') {
            expect(this.addTrialPilotOption.get(1).isSelected()).to.eventually.equal(true);
        }
    };

    this.getVerifyAddTrialResearchCategory = function(trialResearchCategory)  {
        helper.getVerifyListValue(this.addTrialResearchCategory,trialResearchCategory,"Add Trial by Research Category field");
    };

    this.getVerifyAddTrialPrimaryPurpose = function(trialPrimaryPurpose)  {
        helper.getVerifyListValue(this.addTrialPrimaryPurpose,trialPrimaryPurpose,"Add Trial by Primary Purpose field");
    };

    this.getVerifyAddTrialSecondaryPurpose = function(trialSecondaryPurpose)  {
        helper.getVerifyListValue(this.addTrialSecondaryPurpose,trialSecondaryPurpose,"Add Trial by Secondary Purpose field");
    };

    this.getVerifyAddTrialAccrualDiseaseTerminology = function(trialAccrualDiseaseTerminology)  {
        helper.getVerifyListValue(this.addTrialAccrualDiseaseTerminology,trialAccrualDiseaseTerminology,"Add Trial by Accrual Disease Terminology field");
    };

    /********** Lead Organization/Principal Investigator **********/

    this.getVerifyAddTrialLeadOrganization = function(trialLeadOrganization){
        helper.getVerifyValue(this.addTrialLeadOrganization,trialLeadOrganization,"Add Trial by Lead Organization field");
    };

    this.getVerifyAddTrialPrincipalInvestigator = function(principalInvestigator){
        helper.getVerifyValue(this.addTrialPrincipalInvestigator,principalInvestigator,"Add Trial by Principal Investigator field");
    };

    /********** Sponsor/Responsible Party **********/

    this.getVerifyAddTrialSponsor = function(trialSponsor){
        helper.getVerifyValue(this.addTrialSponsor,trialSponsor,"Add Trial by Sponsor field");
    };

    /**********  Data Table 4 Information **********/

    this.getVerifyAddTrialFundingSource = function(trialFundingSource){
        this.addTrialDataTable4FundingSourceValues.getAttribute('value').then(function(value){
            console.log('****Funding Src Org****');
            console.log(value);
        });
        expect(this.addTrialDataTable4FundingSourceValues.getAttribute('value')).to.eventually.eql(trialFundingSource);
    };

    this.setAddTrialDataTable4ProgramCode = function(trialDataTable4ProgramCode)  {
        helper.setValue(this.addTrialDataTable4ProgramCode ,trialDataTable4ProgramCode,"Add Trial by Data Table4 Program code field");
    };

    this.getVerifyAddTrialDataTable4ProgramCode = function(trialDataTable4ProgramCode){
        helper.getVerifyValue(this.addTrialDataTable4ProgramCode,trialDataTable4ProgramCode,"Add Trial by Data Table4 Program code field");
    };

    /**********  NIH Grant Information **********/

    this.selectAddTrialFundedByNCIOption = function(trialFundedByNCIOption)  {
        if(trialFundedByNCIOption.toUpperCase() === 'YES'){
            helper.clickRadioButton(this.addTrialFundedByNCIOption,'0',"Add Trial funded by NCI option field");
        } else if(trialFundedByNCIOption.toUpperCase() === 'NO'){
            helper.clickRadioButton(this.addTrialFundedByNCIOption,'1',"Add Trial funded by NCI option field");
        } else {
            helper.clickRadioButton(this.addTrialFundedByNCIOption,trialFundedByNCIOption,"Add Trial funded by NCI option field");
        }
    };

    this.selectAddTrialFundingMechanism = function(trialFundingMechanism)  {
        if(trialFundingMechanism !== '') {
            helper.selectValueFromList(this.addTrialFundingMechanism, trialFundingMechanism, "Add Trial by Funding Mechanism field");
        }
    };

    this.selectAddTrialInstituteCode = function(trialInstituteCode)  {
        if(trialInstituteCode !== '') {
            helper.selectValueFromList(this.addTrialInstituteCode, trialInstituteCode, "Add Trial by Institute Code field");
        }
    };

    this.setAddTrialSerialNumber = function(trialSerialNumber)  {
        this.addTrialSerialNumberBox.click();
        helper.setValue(this.addTrialSerialNumberField ,trialSerialNumber,"Add Trial by Serial Number field");
    };

    this.selectAddTrialNCIDivisionProgramCode = function(trialNCIDivisionProgramCode)  {
        if(trialNCIDivisionProgramCode !== '') {
            helper.selectValueFromList(this.addTrialNCIDivisionProgramCode, trialNCIDivisionProgramCode, "Add Trial by NCI Division Program code field");
        }
    };

    this.clickAddTrialAddGrantInfoButton = function(){
        helper.clickButton(this.addTrialAddGrantInfoButton,"Add Trial Grant Information Add button");
    };

    this.verifyAddTrialFundedByNCIOption = function(trialFundedByNCIOption, result)  {
        if (trialFundedByNCIOption === '0') {
            expect(this.addTrialFundedByNCIOption.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (trialFundedByNCIOption === '1') {
            expect(this.addTrialFundedByNCIOption.get(1).isSelected()).to.eventually.equal(result);
        }
    };

    /**********  Trial Status **********/

    this.setAddTrialStatusDate = function(trialStatusDate)  {
        helper.setValue(this.addTrialStatusDate ,trialStatusDate,"Add Trial by Status Date field");
    };

    this.selectAddTrialStatus = function(trialStatus)  {
        var  selectTrialStatus =  element(by.xpath('//*[@id="trial_status"]/option[.="' + trialStatus + '"]'));
        var  selectTrialStatusDefault =  element(by.xpath('//*[@id="trial_status"]/option[.="-Select a Trial Status-"]'));
        if(trialStatus === '') {
            helper.selectValue(selectTrialStatusDefault,'-Select a Trial Status-',"Add Trial by trial Status field");
        } else{
            helper.selectValue(selectTrialStatus,trialStatus,"Add Trial by trial Status field");
        }
    };

    this.setAddTrialStatusComment = function(trialStatusComment)  {
        helper.setValue(this.addTrialStatusComment ,trialStatusComment,"Add Trial Status Comment field");
    };

    this.setAddTrialWhyStudyStopped = function(trialWhyStudyStopped)  {
        helper.setValue(this.addTrialWhyStudyStopped ,trialWhyStudyStopped,"Add Trial by Why Study Stopped field");
    };

    this.clickAddTrialAddStatusButton = function(){
        helper.clickButton(this.addTrialAddStatusButton,"Add Trial Status Add button");
    };

    this.setAddTrialStatusDeleteReason = function(trialStatusDeleteReason)  {
        helper.setValue(this.addTrialStatusWhyDeletedReason ,trialStatusDeleteReason,"Add Trial Status Delete Reason field");
    };

    this.clickAddTrialStatusDeleteCommitButton = function(){
        helper.clickButton(this.addTrialStatusWhyDeletedCommit,"Add Trial Status Delete Commit button");
    };

    /********** Trial Dates **********/

    this.setAddTrialStartDate = function(trialStartDate)  {
        helper.setValue(this.addTrialStartDate ,trialStartDate,"Add Trial by Trial Start Date field");
    };

    this.getVerifyAddTrialStartDate= function(trialStartDate)  {
        helper.getVerifyValue(this.addTrialStartDate,trialStartDate,"Add Trial by Trial Start Date field");
    };

    this.selectAddTrialStartDateOption = function(trialStartDateOption)  {
        helper.clickRadioButton(this.addTrialStartDateOption,trialStartDateOption,"Add Trial by Start Date option field");
    };

    this.verifyAddTrialStartDateOption = function(trialStartDateOption, result)  {
        if (trialStartDateOption === '0') {
            expect(this.addTrialStartDateOption.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (trialStartDateOption === '1') {
            expect(this.addTrialStartDateOption.get(1).isSelected()).to.eventually.equal(result);
        }
    };

    this.setAddTrialPrimaryCompletionDate= function(trialPrimaryCompletionDate)  {
        helper.setValue(this.addTrialPrimaryCompletionDate ,trialPrimaryCompletionDate,"Add Trial by Primary Completion Date field");
    };

    this.getVerifyAddTrialPrimaryCompletionDate = function(trialPrimaryCompletionDate)  {
        helper.getVerifyValue(this.addTrialPrimaryCompletionDate,trialPrimaryCompletionDate,"Add Trial by Primary Completion Date field");
    };

    this.selectAddTrialPrimaryCompletionDateOption = function(trialPrimaryCompletionDateOption)  {
        helper.clickRadioButton(this.addTrialPrimaryCompletionDateOption,trialPrimaryCompletionDateOption,"Add Trial by Primary Completion Date option field");
    };

    this.verifyAddTrialPrimaryCompletionDateOption = function(trialPrimaryCompletionDateOption, result)  {
        if (trialPrimaryCompletionDateOption === '0') {
            expect(this.addTrialPrimaryCompletionDateOption.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (trialPrimaryCompletionDateOption === '1') {
            expect(this.addTrialPrimaryCompletionDateOption.get(1).isSelected()).to.eventually.equal(result);
        }
    };

    this.setAddTrialCompletionDate = function(trialCompletionDate)  {
        helper.setValue(this.addTrialCompletionDate ,trialCompletionDate,"Add Trial by Completion Date field");
    };

    this.getVerifyAddTrialCompletionDate = function(trialCompletionDate)  {
        helper.getVerifyValue(this.addTrialCompletionDate,trialCompletionDate,"Add Trial by Completion Date field");
    };

    this.selectAddTrialCompletionDateOption = function(trialCompletionDateOption)  {
        helper.clickRadioButton(this.addTrialCompletionDateOption,trialCompletionDateOption,"Add Trial by Completion Date Option field");
    };

    this.verifyAddTrialCompletionDateOption = function(trialCompletionDateOption, result)  {
        if (trialCompletionDateOption === '0') {
            expect(this.addTrialCompletionDateOption.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (trialCompletionDateOption === '1') {
            expect(this.addTrialCompletionDateOption.get(1).isSelected()).to.eventually.equal(result);
        }
    };

    /********** FDA IND/IDE Information **********/

    this.selectAddTrialFDAIND_IDEOption = function(trialFDAIND_IDEOption)  {
        if(trialFDAIND_IDEOption.toUpperCase() === 'YES'){
            helper.clickRadioButton(this.addTrialFDAIND_IDEOption,'0',"Add Trial funded by FDA_IND option field");
        } else if(trialFDAIND_IDEOption.toUpperCase() === 'NO'){
            helper.clickRadioButton(this.addTrialFDAIND_IDEOption,'1',"Add Trial funded by FDA_IND option field");
        } else {
            helper.clickRadioButton(this.addTrialFDAIND_IDEOption,trialFDAIND_IDEOption,"Add Trial funded by FDA_IND option field");
        }
    };

    this.selectAddTrialFDAIND_IDETypes = function(trialFDAIND_IDETypes)  {
        if(trialFDAIND_IDETypes !== '') {
            helper.selectValueFromList(this.addTrialFDAIND_IDETypes, trialFDAIND_IDETypes, "Add Trial by IND/IDE Types field");
        }
    };

    this.setAddTrialFDAIND_IDENumber = function(trialFDAIND_IDENumber)  {
        helper.setValue(this.addTrialFDAIND_IDENumber ,trialFDAIND_IDENumber,"Add Trial by IND/IDE Number field");
    };

    this.selectAddTrialFDAIND_IDEGrantor = function(trialFDAIND_IDEGrantor)  {
        if(trialFDAIND_IDEGrantor !== '') {
            helper.selectValueFromList(this.addTrialFDAIND_IDEGrantor, trialFDAIND_IDEGrantor, "Add Trial by IND/IDE Grantor field");
        }
    };

    this.selectAddTrialFDAIND_IDEHolderType = function(trialFDAIND_IDEHolderType)  {
        if(trialFDAIND_IDEHolderType !== '') {
            helper.selectValueFromList(this.addTrialFDAIND_IDEHolderType, trialFDAIND_IDEHolderType, "Add Trial by IND/IDE Holder Type field");
        }
    };

    this.selectAddTrialFDAProgramCode = function(trialFDAProgramCode)  {
        if(trialFDAProgramCode !== '') {
            helper.selectValueFromList(this.addTrialFDAProgramCode, trialFDAProgramCode, "Add Trial by FDA IND/IDE Program Code field");
        }
    };

    this.clickAddTrialAddIND_IDEButton = function(){
        helper.clickButton(this.addTrialAddIND_IDEButton,"Add Trial FDA IND/IDE Add button");
    };

    this.verifyAddTrialFDAIND_IDEOption = function(trialFDAIND_IDEOption, result)  {
        if (trialFDAIND_IDEOption === '0') {
            expect(this.addTrialFDAIND_IDEOption.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (trialFDAIND_IDEOption === '1') {
            expect(this.addTrialFDAIND_IDEOption.get(1).isSelected()).to.eventually.equal(result);
        }
    };

    /********** Regulatory Information **********/

    this.getVerifyAddTrialRegulatoryInformationText = function(trialRegulatoryInformationText){
        helper.getVerifyheader(this.addTrialRegulatoryInformationText,trialRegulatoryInformationText,"Add Trial by Regulatory Information Header Text field");
    };


    this.selectAddTrialResponsibleParty = function(trialResponsibleParty)  {
        if(trialResponsibleParty !== '') {
            helper.selectValueFromList(this.addTrialResponsibleParty, trialResponsibleParty, "Add Trial by Responsible Party field");
        }
    };

    this.getVerifyAddTrialResponsibleParty = function(trialResponsibleParty)  {
        helper.getVerifyListValue(this.addTrialResponsibleParty,trialResponsibleParty,"Add Trial by Responsible Party field");
    };

    this.getVerifyAddTrialInvestigator = function(trialInvestigator){
        helper.getVerifyValue(this.addTrialInvestigator,trialInvestigator,"Add Trial by Investigator field");
    };

    this.setAddTrialInvestigatorTitle = function(trialInvestigatorTitle)  {
        helper.setValue(this.addTrialInvestigatorTitle ,trialInvestigatorTitle,"Add Trial by Investigator Title field");
    };

    this.getVerifyAddTrialInvestigatorTitle= function(trialInvestigatorTitle)  {
        helper.getVerifyValue(this.addTrialInvestigatorTitle,trialInvestigatorTitle,"Add Trial by Investigator Title field");
    };

    this.getVerifyAddTrialInvestigatorAffiliation = function(trialInvestigatorAffiliation){
        helper.getVerifyValue(this.addTrialInvestigatorAffiliation,trialInvestigatorAffiliation,"Add Trial by Investigator Affiliation field");
    };

    this.selectAddTrialOversightAuthorityCountry = function(trialOversightAuthorityCountry)  {
        if(trialOversightAuthorityCountry !== '') {
            helper.selectValueFromList(this.addTrialOversightAuthorityCountry, trialOversightAuthorityCountry, "Add Trial by Trial Oversight Authority Country field");
        }
    };

    this.selectAddTrialOversightAuthorityOrganization = function(trialOversightAuthorityOrganization)  {
        if(trialOversightAuthorityOrganization !== '') {
            helper.selectValueFromList(this.addTrialOversightAuthorityOrganization, trialOversightAuthorityOrganization, "Add Trial by Trial Oversight Authority Organization field");
        }
    };

    this.clickAddTrialAddOversightAuthorityButton = function() {
        helper.clickButton(this.addTrialAddOversightAuthorityButton,"Add Trial Oversight Authority Add button");
    };

    this.selectAddTrialFDARegulatedInterventionIndicator = function(trialFDARegulatedInterventionIndicator)  {
        if(trialFDARegulatedInterventionIndicator.toUpperCase() === 'NO'){
            helper.clickRadioButton(this.addTrialFDARegulatedInterventionIndicator,'0',"Add Trial by Trial FDA Regulated Intervention Indicator Option field");
        } else if(trialFDARegulatedInterventionIndicator.toUpperCase() === 'YES'){
            helper.clickRadioButton(this.addTrialFDARegulatedInterventionIndicator,'1',"Add Trial by Trial FDA Regulated Intervention Indicator Option field");
        } else if (trialFDARegulatedInterventionIndicator.toUpperCase() === 'N/A' ||  trialFDARegulatedInterventionIndicator.toUpperCase() === 'NA') {
            helper.clickRadioButton(this.addTrialFDARegulatedInterventionIndicator,'2',"Add Trial by Trial FDA Regulated Intervention Indicator Option field");
        } else {
            helper.clickRadioButton(this.addTrialFDARegulatedInterventionIndicator,trialFDARegulatedInterventionIndicator,"Add Trial by Trial FDA Regulated Intervention Indicator Option field");
        }
    };

    this.selectAddTrialSection801Indicator = function(trialSection801Indicator)  {
        if(trialSection801Indicator.toUpperCase() === 'NO'){
            helper.clickRadioButton(this.addTrialSection801Indicator,'0',"Add Trial by Trial Section 801 Indicator Option field");
        } else if(trialSection801Indicator.toUpperCase() === 'YES'){
            helper.clickRadioButton(this.addTrialSection801Indicator,'1',"Add Trial by Trial Section 801 Indicator Option field");
        } else if (trialSection801Indicator.toUpperCase() === 'N/A' ||  trialSection801Indicator.toUpperCase() === 'NA') {
            helper.clickRadioButton(this.addTrialSection801Indicator,'2',"Add Trial by Trial Section 801 Indicator Option field");
        } else {
            helper.clickRadioButton(this.addTrialSection801Indicator,trialSection801Indicator,"Add Trial by Trial Section 801 Indicator Option field");
        }
    };

    this.selectAddTrialDataMonitoringCommitteeAppointedIndicator= function(trialDataMonitoringCommitteeAppointedIndicator)  {
        if(trialDataMonitoringCommitteeAppointedIndicator.toUpperCase() === 'NO'){
            helper.clickRadioButton(this.addTrialDataMonitoringCommitteeAppointedIndicator,'0',"Add Trial by Trial Data Monitoring Committee Appointed Indicator Option field");
        } else if(trialDataMonitoringCommitteeAppointedIndicator.toUpperCase() === 'YES'){
            helper.clickRadioButton(this.addTrialDataMonitoringCommitteeAppointedIndicator,'1',"Add Trial by Trial Data Monitoring Committee Appointed Indicator Option field");
        } else if (trialDataMonitoringCommitteeAppointedIndicator.toUpperCase() === 'N/A' ||  trialDataMonitoringCommitteeAppointedIndicator.toUpperCase() === 'NA') {
            helper.clickRadioButton(this.addTrialDataMonitoringCommitteeAppointedIndicator,'2',"Add Trial by Trial Data Monitoring Committee Appointed Indicator Option field");
        } else {
            helper.clickRadioButton(this.addTrialDataMonitoringCommitteeAppointedIndicator,trialDataMonitoringCommitteeAppointedIndicator,"Add Trial by Trial Data Monitoring Committee Appointed Indicator Option field");
        }
    };

    this.verifyAddTrialFDARegulatedInterventionIndicator = function(trialFDARegulatedInterventionIndicator, result)  {
        if (trialFDARegulatedInterventionIndicator === '0') {
            expect(this.addTrialFDARegulatedInterventionIndicator.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (trialFDARegulatedInterventionIndicator === '1') {
            expect(this.addTrialFDARegulatedInterventionIndicator.get(1).isSelected()).to.eventually.equal(result);
        }
        else if (trialFDARegulatedInterventionIndicator === '2') {
            expect(this.addTrialFDARegulatedInterventionIndicator.get(2).isSelected()).to.eventually.equal(result);
        }
    };

    this.verifyAddTrialSection801Indicator = function(trialSection801Indicator, result)  {
        if (trialSection801Indicator === '0') {
            expect(this.addTrialSection801Indicator.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (trialSection801Indicator === '1') {
            expect(this.addTrialSection801Indicator.get(1).isSelected()).to.eventually.equal(result);
        }
        else if (trialSection801Indicator === '2') {
            expect(this.addTrialSection801Indicator.get(2).isSelected()).to.eventually.equal(result);
        }
    };

    this.verifyAddTrialDataMonitoringCommitteeAppointedIndicator= function(trialDataMonitoringCommitteeAppointedIndicator, result)  {
        if (trialDataMonitoringCommitteeAppointedIndicator === '0') {
            expect(this.addTrialDataMonitoringCommitteeAppointedIndicator.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (trialDataMonitoringCommitteeAppointedIndicator === '1') {
            expect(this.addTrialDataMonitoringCommitteeAppointedIndicator.get(1).isSelected()).to.eventually.equal(result);
        }
        else if (trialDataMonitoringCommitteeAppointedIndicator === '2') {
            expect(this.addTrialDataMonitoringCommitteeAppointedIndicator.get(2).isSelected()).to.eventually.equal(result);
        }
    };

    this.verifyAddTrialDuplicateCountryOrganizationMessage = function(duplicateCountryOrgName)  {
            expect(this.addTrialDuplicateCountryOrganizationMessage.getText()).to.eventually.equal(duplicateCountryOrgName + ' already exists');
        };

    /*************** Trial Related Documents ****************/

    this.clickAddTrialAddOtherDocButton = function(){
        helper.clickButton(this.addTrialAddMoreDocsButton,"Add Trial Add More Docs button");
    };

    this.setAddTrialOtherDocsDescription= function(indexOfDescriptionField, descriptionText)  {
        this.addTrialOtherDocsDescription.get(indexOfDescriptionField).sendKeys(descriptionText);
        expect(this.addTrialOtherDocsDescription.get(indexOfDescriptionField).getAttribute('value')).to.eventually.equal(descriptionText);
           };


    /*************************************** Verify Trial Page *********************************/



    /********** Verify Trial Identifiers **********/

    this.getViewTrialLeadProtocolIdentifier = function(trialLeadProtocolIdentifier)  {
        helper.getVerifyLabel(this.viewTrialLeadProtocolIdentifier,trialLeadProtocolIdentifier,"View Trial by Lead Protocol Identifier field");
    };

    this.getViewTrialOtherIdentifier = function(trialLeadProtocolIdentifier){
        helper.getVerifyLabel(this.viewTrialOtherIdentifierNameValue,trialLeadProtocolIdentifier,"View Trial by Other Protocol Identifier field");
    };


    /********** Verify Trial Details **********/

    this.getViewTrialOfficialTitle= function(trialOfficialTitle)  {
        helper.getVerifyLabel(this.viewTrialOfficialTitle,trialOfficialTitle,"View Trial by Official Title field");
    };

    this.getViewTrialPhase = function(trialPhase)  {
        helper.getVerifyLabel(this.viewTrialPhase,trialPhase,"View Trial by Phase ID field");
    };

    this.getViewTrialPilotOption = function(trialPilotOption)  {
        helper.getVerifyLabelUP(this.viewTrialPilotOption,trialPilotOption,"View Trial by Pilot Option field");
    };

    this.getViewTrialResearchCategory = function(trialResearchCategory)  {
        helper.getVerifyLabel(this.viewTrialResearchCategory,trialResearchCategory,"View Trial by Research Category field");
    };

    this.getViewTrialPrimaryPurpose = function(trialPrimaryPurpose)  {
        helper.getVerifyLabel(this.viewTrialPrimaryPurpose,trialPrimaryPurpose,"View Trial by Primary Purpose field");
    };

    //this.getViewTrialPrimaryPurposeOtherDescription= function(PrimaryPurposeOtherDescription)  {
    //  //  helper.getVerifyLabel(this.addTrialPrimaryPurposeOtherDescription,PrimaryPurposeOtherDescription,"View Trial by Primary Purpose Other Description field");
    //};

    this.getViewAddTrialSecondaryPurpose = function(trialSecondaryPurpose)  {
        helper.getVerifyLabel(this.viewTrialSecondaryPurpose,trialSecondaryPurpose,"View Trial by Secondary Purpose field");
    };

    //this.getViewTrialSecondaryPurposeOtherDescription = function(SecondaryPurposeOtherDescription)  {
    // //   helper.getVerifyLabel(this.addTrialSecondaryPurposeOtherDescription,SecondaryPurposeOtherDescription,"View Trial by Secondary Purpose Other Description field");
    //};

    this.getViewTrialAccrualDiseaseTerminology = function(trialAccrualDiseaseTerminology)  {
        helper.getVerifyLabel(this.viewTrialAccrualDiseaseTerminology,trialAccrualDiseaseTerminology,"View Trial by Accrual Disease Terminology field");
    };


    /********** Verify Lead Organization/Principal Investigator **********/

    this.getViewTrialLeadOrganization = function(trialLeadOrganization){
        helper.getVerifyLabel(this.viewTrialLeadOrganization,trialLeadOrganization,"View Trial by Lead Organization field");
    };

    this.getViewTrialPrincipalInvestigator = function(principalInvestigator){
        helper.getVerifyLabel(this.viewTrialPrincipalInvestigator,principalInvestigator,"View Trial by Principal Investigator field");
    };


    /********** Verify Sponsor/Responsible Party **********/

    this.getViewTrialSponsor = function(trialSponsor){
        helper.getVerifyLabel(this.viewTrialSponsor,trialSponsor,"View Trial by Sponsor field");
    };


    /**********  Verify Data Table 4 Information **********/

    this.getViewTrialFundingSource = function(trialFundingSource){
        helper.getVerifyLabel(this.viewTrialDataTable4FundingSourceValues,trialFundingSource,"View Trial by Funding Source field");
    };

    this.getViewTrialProgramCode = function(trialProgramCode){
        helper.getVerifyLabel(this.viewTrialDataTable4ProgramCode,trialProgramCode,"View Trial by Program Code field");
    };


    /********** Verify Grant **********/

    this.getViewTrialGrantTable = function(trialGrant){
        expect(this.viewTrialVerifyGrantTable.getText()).to.eventually.eql(trialGrant, 'Verify Trial Grant table');
    };

    /********** Verify Trial Status **********/

    this.getViewTrialStatusDate = function(trialStatusDate)  {
        helper.getVerifyLabel(this.viewTrialStatusDate ,trialStatusDate,"View Trial by Status Date field");
    };

    this.getViewTrialStatus = function(trialStatus)  {
            helper.getVerifyLabel(this.viewTrialStatus,trialStatus,"View Trial by trial Status field");
    };


    /********** Verify Trial Dates **********/

    this.getViewTrialStartDate= function(trialStartDate)  {
        helper.getVerifyLabel(this.viewTrialStartDate,trialStartDate,"View Trial by Trial Start Date field");
    };

    this.getViewTrialStartDateOption = function(trialStartDateOption)  {
        helper.getVerifyLabelUP(this.viewTrialStartDateOption,trialStartDateOption,"View Trial by Start Date option field");
    };

    this.getViewTrialPrimaryCompletionDate= function(trialPrimaryCompletionDate)  {
        helper.getVerifyLabel(this.viewTrialPrimaryCompletionDate ,trialPrimaryCompletionDate,"View Trial by Primary Completion Date field");
    };

    this.getViewTrialPrimaryCompletionDateOption = function(trialPrimaryCompletionDateOption)  {
        helper.getVerifyLabelUP(this.viewTrialPrimaryCompletionDateOption,trialPrimaryCompletionDateOption,"View Trial by Primary Completion Date option field");
    };

    this.getViewTrialCompletionDate = function(trialCompletionDate)  {
        helper.getVerifyLabel(this.viewTrialCompletionDate ,trialCompletionDate,"View Trial by Completion Date field");
    };

    this.getViewTrialCompletionDateOption = function(trialCompletionDateOption)  {
        helper.getVerifyLabelUP(this.viewTrialCompletionDateOption,trialCompletionDateOption,"View Trial by Completion Date Option field");
    };


    /********** Verify IND IDE **********/

    this.getViewTrialINDIDETable = function(trialINDIDE){
        expect(this.viewTrialVerifyIND_IDETable.getText()).to.eventually.eql(trialINDIDE, 'Verify Trial IND IDE table');
    };

    /********** Verify Regulatory Information **********/



    this.getViewTrialResponsibleParty = function(trialResponsibleParty)  {
        helper.getVerifyLabel(this.viewTrialResponsibleParty,trialResponsibleParty,"View Trial by Trial Responsible Party field");
    };

    this.getViewTrialOversightAuthority = function(trialOversightAuthority){
        expect(this.viewTrialVerifyOversightCountryOrganization.getText()).to.eventually.eql(trialOversightAuthority, 'Verify Trial Oversight Authority table');
    };

    this.getViewTrialFDARegulatedInterventionIndicator = function(trialFDARegulatedInterventionIndicator)  {
        helper.getVerifyLabelUP(this.viewTrialFDARegulatedInterventionIndicator,trialFDARegulatedInterventionIndicator,"View Trial by Trial FDA Regulated Intervention Indicator Option field");
    };

    this.getViewTrialSection801Indicator = function(trialSection801Indicator)  {
        helper.getVerifyLabelUP(this.viewTrialSection801Indicator,trialSection801Indicator,"View Trial by Trial Section 801 Indicator Option field");
    };

    this.getViewTrialDataMonitoringCommitteeAppointedIndicator= function(trialDataMonitoringCommitteeAppointedIndicator)  {
        helper.getVerifyLabelUP(this.viewTrialDataMonitoringCommitteeAppointedIndicator,trialDataMonitoringCommitteeAppointedIndicator,"View Trial by Trial Data Monitoring Committee Appointed Indicator Option field");
    };


    /*************** Verify Trial Related Documents ****************/

    this.getViewTrialDoc = function(){
        helper.getVerifyLabel(this.viewTrialVerifyviewedDocs,"View Trial Docs ");
    };

    /*************** Verify Participating Sites ****************/

    this.getViewTrialParticipatingSites = function(participatingSites){
        this.viewTrialPsticipatingSites.getText().then(function(value){
            //console.log('-----------PS from App');
            //console.log(value);
            //console.log('------------PS from table');
            //console.log(participatingSites);
              expect(value).to.eql(participatingSites, 'Verification of Grid values for Participating Site');
        });
       // expect(this.viewTrialPsticipatingSites.getText()).to.eventually.eql(participatingSites);
    };


    /*************** Buttons ****************/

    this.clickAddTrialResetButton = function(){
        helper.clickButton(this.addTrialResetButton,"Add Trial Reset button");
    };

    this.clickAddTrialReviewButton = function(){
        helper.clickButton(this.addTrialReviewSubmitButton,"Add Trial Review button");
    };

    this.clickAddTrialSaveDraftButton = function(){
        helper.clickButton(this.addTrialSaveDraftButton,"Add Trial Save Draft button");
    };

    /*************** Org Model Search **************/

    this.clickAddTrialOrgSearchModel = function(index){
        helper.clickButtonNoHeaderIndex(this.addTrialOrgSearchModel,index, "Organization Model Search button");
    };

    /*************** Person Model Search **************/

    this.clickAddTrialPersonSearchModel = function(index){
        helper.clickButtonNoHeaderIndex(this.addTrialPersonSearchModel,index, "Person Model Search button");
    };

    /*************** Date fields **************/

    this.clickAddTrialDateField = function(index){
        helper.clickButtonNoHeaderIndex(this.addTrialDateFields,index, "Date Field button");
    };

    this.clickAddTrialDateToday = function(){
        helper.clickButtonNoHeader(this.addTrialDateClickToday, "Today button on Add Date field");
    };

    this.clickAddTrialDateClear = function(){
        helper.clickButtonNoHeader(this.addTrialDateClickClear, "Clear button on Add Date field");
    };

    this.clickAddTrialDateFieldPreviousMonth = function(dateofPreviousMonth){
        helper.clickButtonNoHeader(this.addTrialDateClickPreviousMonth, "Previous Month button on Add Date field");
        element(by.buttonText(dateofPreviousMonth)).click();
    };

    this.clickAddTrialDateFieldDifferentYear = function(year, month, date){
        helper.clickButtonNoHeader(this.addTrialDateClickYearMonthDate, "Month on Add Date field");
        helper.clickButtonNoHeader(this.addTrialDateClickYearMonthDate, "Year on Add Date field");
        element(by.buttonText(year)).click();
        element(by.buttonText(month)).click();
        element(by.buttonText(date)).click();
    };

    this.clickAddTrialDateFieldDifferentMonth = function(month, date ){
        helper.clickButtonNoHeader(this.addTrialDateClickYearMonthDate, "Month on Add Date field");
        element(by.buttonText(month)).click();
        element(by.buttonText(date)).click();
    };

    this.clickAddTrialDateFieldNextMonth = function(dateofNextMonth){
        helper.clickButtonNoHeader(this.addTrialDateClickNextMonth, "Next Month button on Add Date field");
        element(by.buttonText(dateofNextMonth)).click();
    };

    this.clickExpandAll = function() {
        this.trialExpandAll.isPresent().then(function (statePresent) {
            if (statePresent) {
                self.trialExpandAll.isDisplayed().then(function (stateDisplayed) {
                    if (!stateDisplayed) {
                        self.trialCollapseAll.click();
                    }
                    self.trialExpandAll.click();
                });
            }
        });
    };

    this.clickCollapseAll = function() {
        this.trialCollapseAll.isPresent().then(function (statePresent) {
            if (statePresent) {
                self.trialCollapseAll.isDisplayed().then(function (stateDisplayed) {
                    if (!stateDisplayed) {
                        self.trialExpandAll.click();
                    }
                    self.trialCollapseAll.click();
                });
            }
        });
    };
};

module.exports = registerTrial;