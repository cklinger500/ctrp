/**
 * Created by singhs10 on 11/7/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var searchTrial = function(){

    this.searchTrialProtocolID = element(by.model('trialView.searchParams.protocol_id'));
    this.searchTrialOfficialTitle = element(by.model('trialView.searchParams.official_title'));
    this.searchTrialPhase = element(by.model('trialView.searchParams.phases'));
    this.searchTrialPurpose = element(by.model('trialView.searchParams.purposes'));
    this.searchTrialPilotTrial = element(by.model('trialView.searchParams.pilot'));
    this.searchTrialPrincipalInvestigator = element(by.model('trialView.searchParams.pi'));
    this.searchTrialOrganizationType = element(by.model('trialView.searchParams.org_types'));
    this.searchTrialOrganization = element(by.model('trialView.searchParams.org'));
    this.searchTrialStudySource = element(by.model('trialView.searchParams.study_sources'));
    this.searchTrialSearchButton = element(by.id('submission_btn'));
    this.searchTrialClearButton = element(by.css('.glyphicon.glyphicon-remove'));
    this.searchTrialByMyTrials = element(by.linkText('My Trials'));
    this.searchTrialByAllTrials = element(by.linkText('All Trials'));
    this.searchTrialsBySavedDrafts = element(by.linkText('Saved Drafts'));
    this.searchTrialsActionButton = element(by.buttonText('Action'));
    this.searchTrialsCompleteButton = element(by.linkText('Complete'));
    this.searchTrialsAddSiteButton = element(by.linkText('Add My Site'));
    this.searchTrialsUpdateMySiteButton = element(by.linkText('Update My Site'));
    this.searchTrialsUpdateButton = element(by.linkText('Update'));
    this.searchTrialsAmendButton = element(by.linkText('Amend'));
    this.searchTrialsVerifyDataButton = element(by.linkText('Verify Data'));
    this.searchTrialCountOfResult = element(by.binding('trialView.gridOptions.totalItems'));
    this.searchTrialMultiSelectList = element.all(by.css('input[ng-model="$select.search"]'));
    this.searchTrialNoCriteriaMessage = element(by.binding('trialView.searchWarningMessage'));
    this.searchTrialSortColumnNCITrialID = element.all(by.buttonText('NCI Trial Identifier'));
    this.searchTrialSortColumnOfficialTitle = element.all(by.buttonText('Official Title'));
    this.searchTrialSortColumnLeadOrg = element.all(by.buttonText('Lead Organization'));
    this.searchTrialSortColumnLeadOrgTrialID = element.all(by.buttonText('Lead Org Trial Identifier'));
    this.searchTrialSortColumnPrincipalInvestigator = element.all(by.buttonText('Principal Investigator'));
    this.searchTrialSortColumnClinicalTrialID = element.all(by.buttonText('ClinicalTrials.gov Identifier'));


    var self = this;



    var helper = new helperFunctions();

    this.setSearchTrialProtocolID = function(trialProtocolID)  {
        helper.setValue(this.searchTrialProtocolID,trialProtocolID,"Search Trial by Protocol ID field");
    };

    this.setSearchTrialOfficialTitle = function(trialOfficialTitle)  {
        helper.setValue(this.searchTrialOfficialTitle,trialOfficialTitle,"Search Trial by Official Title field");
    };

    this.selectSearchTrialPhase = function(trialPhase)  {
        if(trialPhase !== '') {
            helper.wait(this.searchTrialMultiSelectList.get(0), 'Search Trial by Phase field');
            this.searchTrialMultiSelectList.get(0).click();
            helper.wait(element(by.linkText(trialPhase)), 'Search TrialPhase with provided -- ' + trialPhase + ' -- Option');
            element(by.linkText(trialPhase)).click();
        }
    };

    this.selectSearchTrialPurpose= function(trialPurpose)  {
        if (trialPurpose !== '') {
            helper.wait(this.searchTrialMultiSelectList.get(3), 'Search Trial by Purpose field');
            this.searchTrialMultiSelectList.get(3).click();
            helper.wait(element(by.linkText(trialPurpose)), 'Search Trial Purpose with provided -- ' + trialPurpose + ' -- Option');
            element(by.linkText(trialPurpose)).click();
        }
    };

    this.selectSearchTrialPilotTrial = function(trialPilotTrial)  {
        helper.selectValueFromList(this.searchTrialPilotTrial,trialPilotTrial,"Search Trial by Pilot trial field");
    };

    this.setSearchTrialPrincipalInvestigator = function(trialPrincipalInvestigator)  {
        helper.setValue(this.searchTrialPrincipalInvestigator,trialPrincipalInvestigator,"Search Trial by Principal Investigator field");
    };

    this.selectSearchTrialOrganizationType = function(trialOrganizationType)  {
        if (trialOrganizationType !== '') {
            helper.wait(this.searchTrialMultiSelectList.get(1), 'Search Trial by Organization Type field');
            this.searchTrialMultiSelectList.get(1).click();
            helper.wait(element(by.linkText(trialOrganizationType)), 'Search Trial Organization with provided -- ' + trialOrganizationType + ' -- Option');
            element(by.linkText(trialOrganizationType)).click();
        }
    };

    this.setSearchTrialOrganization= function(trialOrganization)  {
        helper.setValue(this.searchTrialOrganization,trialOrganization,"Search Trial by Organization field");
    };

    this.selectSearchTrialStudySource = function(trialStudySource)  {
        if(trialStudySource !== '') {
            helper.wait(this.searchTrialMultiSelectList.get(2), 'Search Trial Study Source Field');
            this.searchTrialMultiSelectList.get(2).click();
            helper.wait(element(by.linkText(trialStudySource)), 'Search Trial Study Source with selected -- ' + trialStudySource + ' -- Option');
            element(by.linkText(trialStudySource)).click();
        }
    };

    this.clickSearchTrialSearchButton = function(){
        helper.clickButton(this.searchTrialSearchButton,"Search Trial Search button");
    };

    this.clickSearchTrialClearButton = function(){
        helper.clickButton(this.searchTrialClearButton,"Search Trial Clear button");
    };

    this.clickSearchTrialMyTrials = function(){
        helper.clickLink(this.searchTrialByMyTrials, "Search by My Trial option");
    };

    this.clickSearchTrialAllTrials = function(){
        helper.clickLink(this.searchTrialByAllTrials, "Search by All Trial option");
    };

    this.clickSearchTrialSavedDrafts = function(){
        helper.clickLink(this.searchTrialsBySavedDrafts, "Search by Saved Drafts option");
    };

    this.clickSearchTrialActionButton = function(){
        helper.clickButton(this.searchTrialsActionButton,"Search Trial Action button");
    };

    this.clickSearchTrialCompleteOption = function(){
        helper.clickLink(this.searchTrialsCompleteButton, "Search Trial Complete option on Action button");
    };

    this.clickSearchTrialsAddSiteButton = function(){
        helper.clickLink(this.searchTrialsAddSiteButton, "Search Trial Add Site option on Action button");
    };

    this.clickSearchTrialsUpdateMySiteButton = function(){
        helper.clickLink(this.searchTrialsUpdateMySiteButton, "Search Trial Update My Site option on Action button");
    };

    this.clickSearchTrialsUpdateButton = function(){
        helper.clickLink(this.searchTrialsUpdateButton, "Search Trial Update option on Action button");
    };

    this.clickSearchTrialsAmendButton = function(){
        helper.clickLink(this.searchTrialsAmendButton, "Search Trial Amend option on Action button");
    };

    this.clickSearchTrialsVerifyDataButton = function(){
        helper.clickLink(this.searchTrialsVerifyDataButton, "Search Trial Verify Data option on Action button");
    };

    this.clickMyTrials = function(){
        self.clickSearchTrialSearchButton();
        self.clickSearchTrialMyTrials();
    };

    this.clickAllTrials = function(){
        self.clickSearchTrialSearchButton();
        self.clickSearchTrialAllTrials();
    };

    this.clickSavedDrafts = function(){
        self.clickSearchTrialSearchButton();
        self.clickSearchTrialSavedDrafts();
    };

    this.countResultSearchTrial = function() {
        return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
            if (state === true) {
                self.searchTrialCountOfResult.getText().then(function (value) {
                    countOfResult = value.replace(/\D/g, '');
                    console.log('Number of Search Results Found : ' + countOfResult);
                });
            }
            else {
                countOfResult = '0' ;
            }
        });
    };

};

module.exports = searchTrial;


//*[@id="ui-select-choices-row-3-6"]/a/span