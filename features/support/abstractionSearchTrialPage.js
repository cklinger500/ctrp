/**
 * Author: Shamim Ahmed
 * Date: 12/09/2015
 * Page Object: Abstraction Search Trial page
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');
var should = chai.should();
var helperFunctions = require('../support/helper');
var addTrialPage = require('../support/registerTrialPage');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var abstractionSearchTrialPage = function(){

    var dateFunctions = new addTrialPage();
    var helper = new helperFunctions();
    var self = this;

    this.searchTrialProtocolID = element(by.model('trialView.searchParams.protocol_id'));
    this.searchTrialOfficialTitle = element(by.model('trialView.searchParams.official_title'));
    this.searchTrialIdentifiertype = element(by.model('trialView.searchParams.protocol_origin_type'));
    this.searchTrialPurpose = element(by.model('trialView.searchParams.purpose'));
    this.searchTrialPhase = element(by.model('trialView.searchParams.phase'));
    this.searchTrialPrincipalInvestigator = element(by.model('trialView.searchParams.pi'));
    this.searchTrialPilotTrial = element(by.model('trialView.searchParams.pilot'));
    this.searchTrialOrganization = element(by.model('trialView.searchParams.org'));
    this.searchTrialOrganizationType = element(by.model('trialView.searchParams.org_type'));
    this.searchTrialTrialStatus = element(by.model('trialView.searchParams.trial_status'));
    //this.searchTrialStudySource = element(by.model('trialView.searchParams.study_source')); // need to update the model name
    this.searchTrialMilestone = element(by.model('trialView.searchParams.milestone'));
    this.searchTrialProcessingStatus = element(by.id('processingStatus'));
    this.searchTrialResearchCategory = element.all(by.css('input[ng-model="$select.search"]'));
    this.searchTrialNIHNCIDivDeptIdentifier = element(by.model('trialView.searchParams.nih_nci_div'));
    this.searchTrialNIHNCIProgramIdentifier = element(by.model('trialView.searchParams.nih_nci_prog'));
    this.searchTrialSearchButton = element(by.id('submission_btn'));
    this.searchTrialClearButton = element(by.css('.glyphicon.glyphicon-remove'));


    this.searchTrialLabelProtocolID = element(by.model('trialView.searchParams.protocol_id'));
    this.searchTrialLabelOfficialTitle = element(by.model('trialView.searchParams.official_title'));
    this.searchTrialLabelIdentifiertype = element(by.model('trialView.searchParams.protocol_origin_type'));
    this.searchTrialLabelPurpose = element(by.model('trialView.searchParams.purpose'));
    this.searchTrialLabelPhase = element(by.model('trialView.searchParams.phase'));
    this.searchTrialLabelPrincipalInvestigator = element(by.model('trialView.searchParams.pi'));
    this.searchTrialLabelPilotTrial = element(by.model('trialView.searchParams.pilot'));
    this.searchTrialLabelOrganization = element(by.model('trialView.searchParams.org'));
    this.searchTrialLabelOrganizationType = element(by.model('trialView.searchParams.org_type'));
    this.searchTrialLabelTrialStatus = element(by.model('trialView.searchParams.trial_status'));
    this.searchTrialLabelStudySource = element(by.model('trialView.searchParams.study_source'));
    this.searchTrialLabelMilestone = element(by.model('trialView.searchParams.milestone'));
    this.searchTrialLabelProcessingStatus = element(by.id('processingStatus'));
    this.searchTrialLabelResearchCategory = element(by.model('trialView.searchParams.research_category'));
    this.searchTrialLabelNIHNCIDivDeptIdentifier = element(by.model('trialView.searchParams.nih_nci_div'));
    this.searchTrialLabelNIHNCIProgramIdentifier = element(by.model('trialView.searchParams.nih_nci_prog'));

    //this.searchResultTable = element(by.css('.grid.ui-grid.ng-isolate-scope.grid1452616452614')).all(by.repeater('ngRepeatolRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name'));

    this.trialSearchPageResultCount = element(by.css('div.row > h4:nth-child(2)'));



        //element(by.css('.grid.ui-grid.ng-isolate-scope.grid1452616452614'));


    var helper = new helperFunctions();

    //Protocol ID : Text Box
    this.setSearchTrialProtocolID = function(trialProtocolID)  {
        helper.setValue(this.searchTrialProtocolID,trialProtocolID,"Search Trial by Protocol ID field");
    };

    //Official Title : Text Box
    this.setSearchTrialOfficialTitle = function(trialOfficialTitle)  {
        helper.setValue(this.searchTrialOfficialTitle,trialOfficialTitle,"Search Trial by Official Title field");
    };

    //Identifier Type : Drop down
    this.selectSearchTrialIdentifiertype = function(trialIdentifierType)  {
        helper.selectValueFromList(this.searchTrialIdentifiertype,trialIdentifierType,"Search Trial by Identifier Type field");
    };

    //Purpose : Drop Down
    this.selectSearchTrialPurpose= function(trialPurpose)  {
        helper.selectValueFromList(this.searchTrialPurpose,trialPurpose,"Search Trial by Purpose field");
    };

    //Phase : Drop Down
    this.selectSearchTrialPhase = function(trialPhase)  {
        helper.selectValueFromList(this.searchTrialPhase,trialPhase,"Search Trial by Phase field");
    };

    //PI (Principal Investigator) : Text Box
    this.setSearchTrialPrincipalInvestigator = function(trialPrincipalInvestigator)  {
        helper.setValue(this.searchTrialPrincipalInvestigator,trialPrincipalInvestigator,"Search Trial by Principal Investigator field");
    };

    //Pilot Trial? : Drop Down
    this.selectSearchTrialPilotTrial = function(trialPilotTrial)  {
        helper.selectValueFromList(this.searchTrialPilotTrial,trialPilotTrial,"Search Trial by Pilot trial field");
    };

    //Organization : Text Box
    this.setSearchTrialOrganization= function(trialOrganization)  {
        helper.setValue(this.searchTrialOrganization,trialOrganization,"Search Trial by Organization field");
    };

    //Organization Type : Drop Down
    this.selectSearchTrialOrganizationType = function(trialOrganizationType)  {
        helper.selectValueFromList(this.searchTrialOrganizationType,trialOrganizationType,"Search Trial by Organization Type field");
    };

    //Trial Status : Drop Down
    this.selectSearchTrialOrganizationType = function(trialTrialStatus)  {
        helper.selectValueFromList(this.searchTrialTrialStatus,trialTrialStatus,"Search Trial by Trial Status field");
    };

    //Study Source : Drop Down
    this.selectSearchTrialStudySource = function(trialStudySource)  {
        helper.selectValueFromList(this.searchTrialStudySource,trialStudySource,"Search Trial by Study Source field");
    };

    //Milestone : Drop Down
    this.selectSearchTrialMilestone = function(trialMilestone)  {
        helper.selectValueFromList(this.searchTrialMilestone,trialMilestone,"Search Trial by Milestone field");
    };

    //Processing Status : Drop Down
    this.selectSearchTrialProcessingStatus = function(trialProcessingStatus)  {
        helper.selectValueFromList(this.searchTrialProcessingStatus,trialProcessingStatus,"Search Trial by Processing Status field");
    };

    //Research Category : Drop Down
    //this.selectSearchTrialResearchCategory = function(trialResearchCategory)  {
    //    this.searchTrialResearchCategory.click();
    //    //element(by.buttonText(trialResearchCategory)).click();
    //};

    this.selectSearchTrialResearchCategory = function(trialResearchCategory)  {
        if (trialResearchCategory !== '') {
            helper.wait(this.searchTrialResearchCategory.get(9), 'Search Trial by Research Category field');
            this.searchTrialResearchCategory.get(9).click();
            helper.wait(element(by.linkText(trialResearchCategory)), 'Search Trial Research Category with provided -- ' + trialResearchCategory + ' -- Option');
            element(by.linkText(trialResearchCategory)).click();
        }
    };

    //NIH/NCI Div/Dept Identifier : Drop Down
    this.selectSearchTrialNIHNCIDivDeptIdentifier = function(trialNIHNCIDivDeptIdentifier)  {
        helper.selectValueFromList(this.searchTrialNIHNCIDivDeptIdentifier,trialNIHNCIDivDeptIdentifier,"Search Trial by NIH/NCI Div/Dept Identifier field");
    };

    //NIH/NCI Program Identifier : Drop Down
    this.selectSearchTrialNIHNCIProgramIdentifier = function(trialNIHNCIProgramIdentifier)  {
        helper.selectValueFromList(this.searchTrialNIHNCIProgramIdentifier,trialNIHNCIProgramIdentifier,"Search Trial by NIH/NCI Program Identifier field");
    };

    //Search : Button
    this.clickSearchTrialSearchButton = function(){
        helper.clickButton(this.searchTrialSearchButton,"Search Trial Search button");
    };

    //Clear : Button
    this.clickSearchTrialClearButton = function(){
        helper.clickButton(this.searchTrialClearButton,"Search Trial Clear button");
    };

};

module.exports = abstractionSearchTrialPage;
