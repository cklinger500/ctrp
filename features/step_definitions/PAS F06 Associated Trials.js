/**
 * Author: Shamim Ahmed
 * Date: 07/25/2016
 * Feature: PAS F04 Associated Trial.Feature
 *
 * Note: In the PAA search screen it has dependency on the seeded data
 */

//Common dependencies
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');

//Required dependencies
//Login dependencies
var loginPage = require('../support/LoginPage');
//helper methods
var helperMethods = require('../support/helper');
//Project Related methods dependencies
var projectFunctionMethods= require('../support/projectMethods');
//Menu bar dependencies
var abstractionPageMenu = require('../support/abstractionCommonBar');
//Abstraction search page dependencies
var abstractionTrialSearchPage = require('../support/abstractionSearchTrialPage');
//Abstraction common dependencies
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
//Abstraction NCI Specific Information
var abstractionNCISpecific = require('../support/abstractionNCISpecificInfo');
//List of Organization
var OrgPage = require('../support/ListOfOrganizationsPage');
//Organization Search
var orgSearch = require('../support/abstractionOrganizationSearch');
//Person Search
var searchPeoplePage = require('../support/ListOfPeoplePage');
//Regulatory Information - IND/IDE
var abstractionRegulatoryINDIDE = require('../support/abstractionRegulatoryIND');
//Regulatory Information - Human Subject Safety
var abstractionRegulatoryHuman = require('../support/abstractionRegulatoryHuman');
//Collaborators
var abstractionCollaborators = require('../support/abstractionTrialCollaborators');
//General Trial Details
var abstractionTrialDetails = require('../support/abstractionTrialDetails');
//Regulatory Information - FDAAA
var abstractionRegulatoryInfoFDAA = require('../support/abstractionRegulatoryInfo');
//Trial Related Document
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
//Participating Site
var abstractionParticipatingSite = require('../support/abstractionParticipating');
//Trial Status
var abstractionTrialStatus = require('../support/abstractionTrailStatuses');
//Left Navigation
var abstractionLeftNavigationMenus = require('../support/abstractionLeftNav');
//Scientific trial description
var scientificTrialDesc = require('../support/scientificTrialDesc');
//Scientific Outcome Measures
var scientificOutcome = require('../support/scientificOutcomeMeasures');
//Scientific Associated Trial
var scientificAssociatedTrial = require('../support/scientificAssociatedTrials');
//
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function() {

    var login = new loginPage();
    var helper = new helperMethods();
    var projectFunctions = new projectFunctionMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var nciSpecific = new abstractionNCISpecific();
    var indIDE = new abstractionRegulatoryINDIDE();
    var humanSafety = new abstractionRegulatoryHuman();
    var trialCollaborators = new abstractionCollaborators();
    var trialDetails = new abstractionTrialDetails();
    var fdaaa = new abstractionRegulatoryInfoFDAA();
    var trialDoc = new abstractionTrialRelatedDocument();
    var participatingSite = new abstractionParticipatingSite();
    var trialStatus = new abstractionTrialStatus();
    var leftNav = new abstractionLeftNavigationMenus();
    var trialDesc = new scientificTrialDesc();
    var outcome = new scientificOutcome();
    var associated = new scientificAssociatedTrial();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchPeople = new searchPeoplePage();
    var searchTableHeader = '';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1789';
    var leadProtocolIDA = 'CTRP_01_1781';
    var leadProtocolIDB = 'CTRP_01_1797';
    var nctIDA = 'NCT00334282';
    var nctIDB = 'NCT02348710';
    var nciIDA = 'NCI-2015-01997';
    var nciIDB = 'NCI-2011-02309';
    var nciIDNotFound = 'NCI-2016-NOTFOUND';
    var nciIDRejected = 'NCI-2017-01010';
    var optionA = '';
    var optionB = '';
    var pageTitle = 'List of Associated Trials';
    var pageTitleA = 'Associated Trial Details';
    var identifierTypeA = 'NCI';
    var identifierTypeB = 'NCT';
    var trialTypeA = 'Interventional';
    var officialTitleA = 'A Randomised, Double-blind, Placebo Controlled, Multi-center Phase III Study to Evaluate the Efficacy and Safety of Pazopanib (GW786034) Compared to Placebo in Patients With Locally Advanced and/or Metastatic Renal Cell Carcinoma';


    /*
     Scenario: #1 I can add an Associated Trial for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Associated Trials screen
     When  I have selected the Add button
     Then I am on the Add Associated Trial screen
     And I must select <IdentifierType>
     |IdentifierType  |
     |NCI              |
     |NCT              |
     And I must enter the Trial Identifier
     When I click the Look Up Trial button
     Then the Requested Trial is retrieved
     |Identifier type  |Retrieved from         |
     |NCI              |CTRP                   |
     |NCT              |ClinicalTrials.gov     |
     And the Clinical Research Category populates
     And the Official Title populates
     When I have clicked the Save button
     Then the associated study displays on the Associated Trials screen
     And the Message Record Created displays
     And the Associated Trial will be associated with the trial
     */

    this.Given(/^I am on the Associated Trials screen$/, function () {
        return browser.sleep(25).then(function() {
            leftNav.clickScientificAssociatedTrials();
            associated.checkAssociatedTrialPageTitle(pageTitle, 'list');
            associated.deleteAllAssociatedTrialList('yes');
        });
    });

    this.When(/^I have selected the Add button$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickAddAssociatedTrial();
        });
    });

    this.Then(/^I am on the Add Associated Trial screen$/, function () {
        return browser.sleep(25).then(function() {
            associated.checkAssociatedTrialPageTitle(pageTitleA, 'details');
        });
    });

    this.Then(/^I must select (.*)$/, function (IdentifierType, table) {
        return browser.sleep(25).then(function() {
            var idenType = table.raw();
            optionType = idenType.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + idenType + ']');
            var optionTypeSplt = optionType.toString().split("\n");
            optionA = optionTypeSplt[1];
            optionB = optionTypeSplt[2];
            associated.selectIdentifierType(optionA);
        });
    });

    this.Then(/^I must enter the Trial Identifier$/, function () {
        return browser.sleep(25).then(function() {
            associated.setTrialIdentifierTxt(nciIDA);
        });

    });

    this.When(/^I click the Look Up Trial button$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickLookupTrial();
        });
    });

    this.Then(/^the Requested Trial is retrieved from the respective system \(CTRP for NCI and ClinicalTrials\.gov for NCT\)$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^the Clinical Research Category populates$/, function () {
        return browser.sleep(25).then(function() {
            associated.verifyResearchCategoryLookup(trialTypeA);
        });
    });

    this.Then(/^the Official Title populates$/, function () {
        return browser.sleep(25).then(function() {
            associated.verifyOfficialTitleLookup(officialTitleA);
        });
    });

    this.When(/^I have clicked the Save button$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickSaveAssociated();
        });
    });

    this.Then(/^the associated study displays on the Associated Trials screen$/, function () {
        return browser.sleep(25).then(function() {
            associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'verify', optionA, trialTypeA, officialTitleA);
        });
    });

    this.Then(/^the Message Record Created displays$/, function () {
        return browser.sleep(25).then(function() {
            console.log('Popup successful message verification is out of scope');
        });
    });

    this.Then(/^the Associated Trial will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            associated.verifyAssociatedListTableTHead();
        });
    });

    this.Then(/^I can select the (.*) and the trial is (.*) displayed$/, function (IdentifierIdentifier, Retrievedfrom, table) {
        return browser.sleep(25).then(function() {
            associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'link', optionA, trialTypeA, officialTitleA);
            associated.verifyViewAssociatedTrialNCI(leadProtocolIDA, nciIDA, nctIDA, '', '');
            associated.clickViewCloseBtn();
        });
    });

    /*

     Scenario: #2   corresponding Associated Trial records will be created for both associated trials
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Associated Trials screen
     When  I have selected the Add button
     Then I am on the Add Associated Trial screen
     And the added Associated Trial is a CTRP study
     When the Associated Trial is displayed on the Associated Trials screen
     Then the <AssociatedTrialFields> on the Associated Trials screen of the Associated Trial study are added

     Scenario Outline: #2   corresponding Associated Trial records will be created for both associated trials
     Given the added Associated Trial is a CTRP study
     When the Associated Trial is displayed on the Associated Trials screen
     Then the <AssociatedTrialFields> on the Associated Trials screen of the Associated Trial study are added

     |AssociatedTrialFields        |
     |Identifier Type              |
     |Trial Identifier             |
     |Clinical Research Category   |
     |Official Title               |
     */

    this.Given(/^I am on the Add Associated Trials screen$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.clickSearchTrialAbstractor();
            pageMenu.clickTrials();
            pageMenu.clickSearchTrialsPA();
            helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.clickLinkText(leadProtocolID);
            leftNav.scientificCheckOut();
            leftNav.clickScientificAssociatedTrials();
            associated.checkAssociatedTrialPageTitle(pageTitle, 'list');
            associated.deleteAllAssociatedTrialList('yes');
            associated.clickAddAssociatedTrial();
        });
    });

    this.Given(/^the added Associated Trial is a CTRP study$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.When(/^the Associated Trial is displayed on the Associated Trials screen$/, function () {
        return browser.sleep(25).then(function() {
            associated.selectIdentifierType(identifierTypeA);
            associated.setTrialIdentifierTxt(nciIDA);
            associated.clickLookupTrial();
        });
    });

    this.Then(/^the (.*) on the Associated Trials screen of the Associated Trial study are added$/, function (AssociatedTrialFields, table) {
        return browser.sleep(25).then(function() {
            var AssociatedTrialFields = table.raw();
            optionFields = AssociatedTrialFields.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + AssociatedTrialFields + ']');
            var optionTypeSplt = optionFields.toString().split("\n");
            optionFieldsA = optionTypeSplt[1];
            optionFieldsB = optionTypeSplt[2];
            optionFieldsC = optionTypeSplt[3];
            optionFieldsD = optionTypeSplt[4];
            helper.getVerifyLabel(associated.identifierTypeLstLbl, optionFieldsA, 'Verify Identifier Type field');
            helper.getVerifyLabel(associated.trialIdentifierTxtLbl, optionFieldsB, 'Verify Trial Identifier field');
            helper.getVerifyLabel(associated.researchCategoryVwLbl, optionFieldsC, 'Verify Research Category field');
            helper.getVerifyLabel(associated.officialTitleVwLbl, optionFieldsD, 'Verify Official Title field');
            associated.clickSaveAssociated();
            associated.verifyAssociatedListTableTHead();
            associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'verify', identifierTypeA, trialTypeA, officialTitleA);
        });
    });

    /*
     Scenario: #3 Associated Trial is not found
     Given I am on the Add Associated Trials screen
     And  I have selected Identifier Type
     And I have entered the Trial Identifier
     And I have selected the Look Up Trial button
     When trial identifer is not found
     Then the message 'Trial is not found' displays
     */

    this.Given(/^I have selected Identifier Type$/, function () {
        return browser.sleep(25).then(function() {
            associated.selectIdentifierType(identifierTypeA);
        });
    });

    this.Given(/^I have entered the Trial Identifier$/, function () {
        return browser.sleep(25).then(function() {
            associated.setTrialIdentifierTxt(nciIDNotFound);
        });
    });

    this.Given(/^I have selected the Look Up Trial button$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickLookupTrial();
        });
    });

    this.When(/^trial identifer is not found$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^the message 'Trial is not found' displays$/, function () {
        return browser.sleep(25).then(function() {
            msgNotFound = 'Trial is not found';
            commonFunctions.verifyTxtByIndex(associated.notFoundMsg, msgNotFound, '0', 'Verify Trial is not found message');
        });
    });

    /*
     Scenario: #3a Associated Trial is not rejected
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Add Associated Trials screen
     And I have selected Identifier Type of NCI
     And I have entered the rejected Trial Identifier
     And I have selected the Look Up Trial button
     And the trial does not have a last active submission
     Then the message 'Trial is not found' displays
     */

    this.Given(/^I have selected Identifier Type of NCI$/, function () {
        return browser.sleep(25).then(function() {
            associated.selectIdentifierType(identifierTypeA);
        });
    });

    this.Given(/^I have entered the rejected Trial Identifier$/, function () {
        return browser.sleep(25).then(function() {
            associated.setTrialIdentifierTxt(nciIDRejected);
        });
    });

    this.Given(/^the trial does not have a last active submission$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.clickSearchTrialAbstractor();
            pageMenu.clickTrials();
            pageMenu.clickSearchTrialsPA();
            helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(nciIDRejected);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.clickLinkText(nciIDRejected);
            checkLastActiveSubmission = 'Last Submitter:';
            associated.verifyTrialOverview('9', checkLastActiveSubmission);
        });
    });

    /*
     Scenario:  #4 Trial Identifier information not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Add Associated Trials screen
     And the Trial Identifier is Null
     When I click on 'Look Up Trial' button
     Then an error message will appear "Trial Identifier is Required”
     */

    this.Given(/^the Trial Identifier is Null$/, function () {
        return browser.sleep(25).then(function() {
            associated.setTrialIdentifierTxt('');
        });
    });

    this.When(/^I click on 'Look Up Trial' button$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickLookupTrial();
        });
    });

    this.Then(/^an error message will appear "Trial Identifier is Required”$/, function () {
        return browser.sleep(25).then(function() {
            errorMSGTI = 'Trial Identifier is Required';
            commonFunctions.verifyTxtByIndex(associated.requiredMsg, errorMSGTI, '0', 'Verify Trial Identifier is Required');
        });
    });

    /*
     Scenario:  #5 Identifier Type not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Add Associated Trials screen
     And the Identifier Type is Null
     When I click on 'Look Up Trial' button
     Then an error message will appear "Identifier Type is Required”
     */

    this.Given(/^the Identifier Type is Null$/, function () {
        return browser.sleep(25).then(function() {
            var idenTypNull = '-- Please select a trial identifier type...';
            associated.selectIdentifierType(idenTypNull);
        });
    });

    this.Then(/^an error message will appear "Identifier Type is Required”$/, function () {
        return browser.sleep(25).then(function() {
            errorMSGIT = 'Identifier Type is Required';
            commonFunctions.verifyTxtByIndex(associated.requiredMsg, errorMSGIT, '0', 'Verify Identifier Type is Required');
        });
    });

    /*
     Scenario: #6 Deleted Associated Trials
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Associated Trials screen
     And I have checked the Delete box for an Associated Trial
     And I have selected the delete check box for another Associated Trial
     When I have clicked on Delete button
     Then the message displays 'click OK to remove selected Associated Trial(s) from the study. Click Cancel to abort'
     When I have clicked on the cancel button
     Then the Associated Trial(s) is not removed
     And no message displays
     And I have clicked on OK
     Then the Associated Trial will be removed from the trial
     When I have clicked the Select All button
     Then the Delete check box is checked for all entries
     When I have clicked on Delete button
     Then the message displays 'Click OK to remove selected Associated Trial(s) from the study. Click Cancel to abort'
     When I have clicked on the cancel button
     Then the Associated Trial is not removed
     And no message displays
     When I click on the OK button
     Then the Associated Trial(s) is removed from the trial record
     And the message ‘Record(s) deleted’ displays
     */

    this.Given(/^I have checked the Delete box for an Associated Trial$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickAddAssociatedTrial();
            associated.selectIdentifierType(identifierTypeA);
            associated.setTrialIdentifierTxt(nciIDA);
            associated.clickLookupTrial();
            associated.clickSaveAssociated();
            associated.clickAddAssociatedTrial();
            associated.selectIdentifierType(identifierTypeA);
            associated.setTrialIdentifierTxt(nciIDB);
            associated.clickLookupTrial();
            associated.clickSaveAssociated();
        });
    });

    this.Given(/^I have selected the delete check box for another Associated Trial$/, function () {
        return browser.sleep(25).then(function() {
            associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'delete', identifierTypeA, trialTypeA, officialTitleA);
        });
    });

    this.When(/^I have clicked on Delete button$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^the message displays 'click OK to remove selected Associated Trial\(s\) from the study\. Click Cancel to abort'$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.When(/^I have clicked on the cancel button$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickDeleteSelectedAssocaited('cancel');
        });
    });

    this.Then(/^the Associated Trial\(s\) is not removed$/, function () {
        return browser.sleep(25).then(function() {
            associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'verify', identifierTypeA, trialTypeA, officialTitleA);
        });
    });

    this.Then(/^no message displays$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^I have clicked on OK$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickDeleteSelectedAssocaited('yes');
        });
    });

    this.Then(/^the Associated Trial will be removed from the trial$/, function () {
        return browser.sleep(25).then(function() {
            associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'notexists', identifierTypeA, trialTypeA, officialTitleA);
        });
    });

    this.When(/^I have clicked the Select All button$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickAddAssociatedTrial();
            associated.selectIdentifierType(identifierTypeA);
            associated.setTrialIdentifierTxt(nciIDA);
            associated.clickLookupTrial();
            associated.clickSaveAssociated();
            associated.selectAllAssociatedTrial();
        });
    });

    this.Then(/^the Delete check box is checked for all entries$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.When(/^I have clicked on Delete button for all entries$/, function () {
        //associated.clickDeleteButton();
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^the message displays 'Click OK to remove selected Associated Trial\(s\) from the study\. Click Cancel to abort'$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^the Associated Trial is not removed$/, function () {
        return browser.sleep(25).then(function() {
            associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'verify', identifierTypeA, trialTypeA, officialTitleA);
            associated.selectAllAssociatedTrial();
        });
    });

    this.When(/^I click on the OK button$/, function () {
        return browser.sleep(25).then(function() {
            associated.deleteAllAssociatedTrialList('yes');
        });
    });

    this.Then(/^the Associated Trial\(s\) is removed from the trial record$/, function () {
        return browser.sleep(25).then(function() {
            associated.verifyDeleteAllAssociatedTrialList();
        });
    });

    this.Then(/^the message ‘Record\(s\) deleted’ displays$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    /*
     Scenario: #7 Reset Add Associated Trial for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Add Associated Trials screen
     And I have entered Identifier Type and Trial Identifier
     And I have selected 'Look Up Trial' button
     And Clinical Research Category and Official Title have populated
     When I select the Reset button
     Then the information on the Add Associated Trial screen will not be saved to the trial record
     And the Associated Trials screen displays
     */

    this.Given(/^I have entered Identifier Type and Trial Identifier$/, function () {
        return browser.sleep(25).then(function() {
            associated.selectIdentifierType(identifierTypeA);
            associated.setTrialIdentifierTxt(nciIDA);
        });
    });

    this.Given(/^I have selected 'Look Up Trial' button$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickLookupTrial();
        });
    });

    this.Given(/^Clinical Research Category and Official Title have populated$/, function () {
        return browser.sleep(25).then(function() {
            associated.verifyResearchCategoryLookup(trialTypeA);
            associated.verifyOfficialTitleLookup(officialTitleA);
        });
    });

    this.When(/^I select the Reset button$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickResetAssociated();
        });
    });

    this.Then(/^the information on the Add Associated Trial screen will not be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            associated.clickBackToAssociatedTrialList();
        });
    });

    this.Then(/^the Associated Trials screen displays$/, function () {
        return browser.sleep(25).then(function() {
            associated.verifyDeleteAllAssociatedTrialList();
        });
    });


};
