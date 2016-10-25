/**
 * Author: Shamim Ahmed
 * Date: 02/16/2016
 * Feature: PAA F01 Add and Edit General Trial Details
 *
 * Note: In the PAA search screen it has dependency on the seed data.
 *
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
//
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var errorCatch = require('../support/gulpfile');


module.exports = function() {

    var login = new loginPage();
    var helper = new helperMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var trialCollaborators = new abstractionCollaborators();
    var trialDetails = new abstractionTrialDetails();
    var searchOrg = new OrgPage();
    var searchPeople = new searchPeoplePage();
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolIDD = 'CTRP_01_1781';
    var identifierRnd = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbr = ''+identifierRnd+'';
    var identifierRndA = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbrEdited = ''+identifierRndA+'';

    var orgSearchNameA = 'Boston Medical Center';
    var orgSearchNameB = 'Boston University School Of Public Health';
    var orgSearchNameC = 'National Cancer Institute';
    var orgSearchNameD = 'Memorial Hospital Colorado Springs';
    var personFNmA = 'Alessandra';
    var personLNmA = 'Ferrajol';
    var personFNmB = 'Kristi';
    var personLNmB = 'Graves';
    var optionA = 'Identifier Type';
    var optionB = 'Value';
    var optionC = 'Edit';
    var optionD = 'Delete';
    var identifierCTEP = 'CTEP Identifier';
    var identifierDCP = 'DCP Identifier';
    var officialTitle = 'A Randomised, Double-blind, Placebo Controlled, Multi-center Phase III Study to Evaluate the Efficacy and Safety of Pazopanib (GW786034) Compared to Placebo in Patients With Locally Advanced and/or Metastatic Renal Cell Carcinoma';
    var officialTitleEdit = 'Edit A Randomised, Double-blind, Placebo Controlled, Multi-center Phase III Study to Evaluate the Efficacy and Safety of Pazopanib';
    var acronymA = 'Randomised';
    var acronymB = 'Pazopanib';
    var keywordA = 'Metastatic';
    var keywordB = 'Pazopanib';
    var cntralCntctEmail = 'cythomas@wakehealth.edu';
    var cntralCntctEmailEdit = 'cythomas@wakehealth.com';
    var cntralCntctPh = '434-243-6143';
    var cntralCntctPhEdit = '434-243-6143';
    var cntralCntctPhExtension = '1234';
    var cntralCntctPhExtensionEdit = '4321';
    var cntralCntctGeneralName = 'FName LName';
    var cntralCntctGeneralNameEdit = 'FNameReset LNameReset';
    var cntralCntctGeneralEmail = 'shamim.ahmed@nih.gov';
    var cntralCntctGeneralEmailEdit = 'ahmeds6@mail.nih.gov';
    var cntralCntctGeneralPh = '240-276-6978';
    var cntralCntctGeneralPhEdit = '202-509-3188';
    var cntralCntctGeneralPhExtension = '1234';
    var cntralCntctGeneralPhExtensionEdit = '4321';
    var cntralCntctGeneralNameReq = 'Central contact name is Required';
    var officialTitleReq = 'Official Title is Required';
    var buildEmailAdd = '';

    /*
     Scenario: #1 I can enter the different Protocol Identifiers for a trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     When I can edit the lead organization trial identifier
     And I can optionally enter or edit one or more Other Trial Identifiers
     Then the Protocol Identifier section will be complete
     */

    this.Given(/^I have selected a trial to abstract$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.alertMsgOK();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            commonFunctions.alertMsgOK();
        });
    });

    this.Given(/^I am on the General Trial Details screen$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.clickSearchTrialAbstractor();
            login.clickWriteMode('On');
            pageMenu.clickTrials();
            pageMenu.clickSearchTrialsPA();
            helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.clickLinkText(leadProtocolIDD);
            commonFunctions.adminCheckOut();
            trialDetails.clickAdminDataGeneralTrial();
            trialCollaborators.waitForElement(trialDetails.generalTrailAcronym, "General Trail Details - Acronym");
            helper.verifyElementDisplayed(trialDetails.generalTrailAcronym, true);
            helper.verifyElementDisplayed(trialDetails.generalTrailOfficialTitle, true);
            helper.verifyElementDisplayed(trialDetails.generalTrailKeywords, true);
            helper.verifyElementDisplayed(trialDetails.generalTrailIdentifier, true);
            helper.verifyElementDisplayed(trialDetails.generalTrailIdentifierTextBox, true);
            helper.verifyElementDisplayed(trialDetails.generalTrailIdentifierAddButton, true);
            trialDetails.findIndentifierToVerifyEditDelete(identifierCTEP, 'delete', '');
            trialDetails.findIndentifierToVerifyEditDelete(identifierDCP, 'delete', '');
            trialDetails.selectCentralContactRdo(trialDetails.generalTrailCentralContactRadio, 'None', 'Central Contact - General');
            trialDetails.clickSave();
        });
    });

    this.When(/^I can edit the lead organization trial identifier$/, function () {
        return browser.sleep(25).then(function() {
            helper.verifyTableRowText(trialDetails.generalTrailTableTHeadColA, optionA, "Identifier Type");
            helper.verifyTableRowText(trialDetails.generalTrailTableTHeadColB, optionB, "Value");
            helper.verifyTableRowText(trialDetails.generalTrailTableTHeadColC, optionC, "Edit");
            helper.verifyTableRowText(trialDetails.generalTrailTableTHeadColD, optionD, "Delete");
            trialDetails.selectIdentifier(identifierCTEP);
            trialDetails.setIdentifierTextBox(identifierNmbr);
            trialDetails.clickIdentifierAddButton();
            trialDetails.clickSave();
            trialDetails.findIndentifierToVerifyEditDelete(identifierCTEP, 'edit', '');
            trialDetails.setIdentifierTextBox(identifierNmbrEdited);
            trialDetails.clickIdentifierConfirmButton();
            trialDetails.clickSave();
            trialDetails.findIndentifierToVerifyEditDelete(identifierCTEP, 'verify', identifierNmbrEdited);
            trialDetails.clickSave();
        });
    });

    this.When(/^I can optionally enter or edit one or more Other Trial Identifiers$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.selectIdentifier(identifierDCP);
            trialDetails.setIdentifierTextBox(identifierNmbr);
            trialDetails.clickIdentifierAddButton();
            trialDetails.clickSave();
        });
    });

    this.Then(/^the Protocol Identifier section will be complete$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.findIndentifierToVerifyEditDelete(identifierDCP, 'verify', identifierNmbr);
        });
    });

    /*
     Scenario: #1a Duplicate and format rules for Other Trial Identifiers
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     Then I should be allowed to enter one "ClinicalTrials.gov Identifier"
     And I should be allowed to enter more than one unique IDs with "Obsolete ClinicalTrials.gov Identifier"
     And the "Obsolete ClinicalTrials.gov Identifier" must not be the same as the "ClinicalTrials.gov Identifier"
     And I should verify for valid "ClinicalTrials.gov Identifier" format as NCT followed by 8 numeric characters <NCT00000000>
     And I should verify for valid "Obsolete ClinicalTrials.gov Identifier" format as NCT followed by 8 numeric characters <NCT00000000>
     And I should be allowed to enter more than one unique IDs with "Duplicate NCI Identifier"
     And the "Duplicate NCI Identifier" must not be the same as the "NCI Trial ID"
     And I should check for valid "Duplicate NCI Identifier" format as NCI-YYYY-nnnnn <NCI-2016-00123>
     And I should be allowed to enter more than one unique IDs with "Other Identifier"
     And I should be allowed to enter more than one unique IDs with "Duplicate NCI Identifier"
     And I should be allowed to enter one "DCP Identifier" with unique IDs
     And I should be allowed to enter one "CTEP Identifier" with unique IDs
     And I should be allowed to enter one "CCR Identifier" with unique IDs
     And I should be allowed to enter one "CDR Identifier" with unique IDs
     And all Trial Identifiers should not be more than 30 characters in Length
     Then the Protocol Identifiers section will indicate zero errors
     */

    this.Then(/^I should be allowed to enter one "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^I should be allowed to enter more than one unique IDs with "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^the "([^"]*)" must not be the same as the "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^I should verify for valid "([^"]*)" format as NCT followed by (\d+) numeric characters (.*)$/, function (arg1, arg2, NCT00000000) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^I should check for valid "([^"]*)" format as NCI\-YYYY\-nnnnn (.*)$/, function (arg1, NCI201600123) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^I should be allowed to enter one "([^"]*)" with unique IDs$/, function (arg1) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^all Trial Identifiers should not be more than (\d+) characters in Length$/, function (arg1) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^the Protocol Identifiers section will indicate zero errors$/, function () {
        return browser.sleep(25).then(function() {

        });
    });


    /*
     Scenario: #2 I can enter the Acronym and Official Title for a trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     When I edit the Official Title for the trial
     And I can optionally enter or edit the Acronym for the trial
     Then the title section will be complete

     Updated:
     Scenario: #2 I can enter the Acronym and Official Title for a trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     When I edit the Official Title for the trial
     And the official Title should not be more than 600 characters in length
     And I can optionally enter or edit the Acronym for the trial
     And the Acronym should not be more than 14 characters long
     Then the title section will be complete
     */

    this.When(/^I edit the Official Title for the trial$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.setOfficialTitle(officialTitleEdit);
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailOfficialTitle, officialTitleEdit, "Verifying the Official Title");
            trialDetails.setOfficialTitle(officialTitle);
            trialDetails.clickSave();
        });
    });

    this.When(/^the official Title should not be more than (\d+) characters in length$/, function (arg1) {
        return browser.sleep(25).then(function() {
            // Write code here that turns the phrase above into concrete actions
        });
    });

    this.When(/^I can optionally enter or edit the Acronym for the trial$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.setAcronym(acronymA);
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailAcronym, acronymA, "Verifying the Acronym");
        });
    });

    this.When(/^the Acronym should not be more than (\d+) characters long$/, function (arg1) {
        return browser.sleep(25).then(function() {
            // Write code here that turns the phrase above into concrete actions
        });
    });

    this.Then(/^the title section will be complete$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.setAcronym(acronymB);
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailAcronym, acronymB, "Verifying the Acronym");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailOfficialTitle, officialTitle, "Verifying the Official Title");
        });
    });

    /*
     Scenario: #3 I can enter the Keywords for a trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     When I can enter or edit the Keywords for the trial identifier
     Then the Keywords section will be complete
     */

    this.When(/^I can enter or edit the Keywords for the trial identifier$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.setKeywords(keywordA);
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailKeywords, keywordA, "Verifying the Keywords");
            trialDetails.setKeywords(keywordB);
            trialDetails.clickSave();
        });
    });

    this.Then(/^the Keywords section will be complete$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailKeywords, keywordB, "Verifying the Keywords");
        });
    });

    /*
     Scenario: #4 I can associate an organization as the Lead Organization on a clinical trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And I have selected organization look-up
     When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, IRB) are displayed
     Then I can select an organization from the list or search for an organization
     And the selected organization will be associated to the trail as the Lead Organization
     */

    this.Given(/^I have selected organization look\-up$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSearchOrgButtonByIndex('0');
        });
    });

    this.When(/^a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial \(Lead, IRB\) are displayed$/, function () {
        return browser.sleep(25).then(function() {
            searchOrg.setOrgName(orgSearchNameD);
            searchOrg.clickSearchButton();
        });
    });

    this.Then(/^I can select an organization from the list or search for an organization$/, function () {
        return browser.sleep(25).then(function() {
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
        });
    });

    this.Then(/^the selected organization will be associated to the trail as the Lead Organization$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailLeadOrganization, orgSearchNameD, "Verifying the Lead Organization Name");
        });
    });

    /*
     Scenario: #5 I can associate a person as the Principal Investigator on a clinical trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     When I have performed a person look-up
     And I have selected a person as the trial's Principal Investigator in the General Trial Details Screens
     Then the selected person will be associated to the trial as Principal Investigator
     */

    this.When(/^I have performed a person look\-up$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSearchPersonsButtonByIndex('0');
        });
    });

    this.When(/^I have selected a person as the trial's Principal Investigator in the General Trial Details Screens$/, function () {
        return browser.sleep(25).then(function() {
            searchOrg.clickExactSearch('true');
            searchPeople.setPersonFirstName(personFNmA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
        });
    });

    this.Then(/^the selected person will be associated to the trial as Principal Investigator$/, function () {
        return browser.sleep(25).then(function() {
            var buildPrincipalInvestigatorNM = '' + personFNmA + ' ' + personLNmA + '';
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailPrincipalInvestigator, buildPrincipalInvestigatorNM, "Verifying the Principal Investigator");
        });
    });

    /*
     Scenario: #6 I can associate an organization as the Sponsor Organization on a clinical trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And I have selected Sponsor organization look-up
     When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (Lead , IRB) are displayed
     Then I can select an organization from the list or search for an organization
     And the selected organization will be associated to the trail as the Sponsor
     */

    this.Given(/^I have selected Sponsor organization look\-up$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSearchOrgButtonByIndex('1');
        });
    });

    this.When(/^a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial \(sponsor, IRB\) are displayed$/, function () {
        return browser.sleep(25).then(function() {
            searchOrg.setOrgName(orgSearchNameD);
            searchOrg.clickSearchButton();
        });
    });

    this.Then(/^the selected organization will be associated to the trail as the Sponsor$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailSponsor, orgSearchNameD, "Verifying the Sponsor Organization Name");
        });
    });

    /*
     Scenario: #7 I can associate the Primary Investigator as the Central Contact or for the trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And I am in the Central Contact section
     And selected the radio button for PI
     And the phone #, extension and e-mail address is displayed
     Then I can edit the phone #, extension and e-mail address
     And the PI, phone #, extension and e-mail address will be associated with this trail
     */

    this.Given(/^I am in the Central Contact section$/, function () {
        return browser.sleep(25).then(function() {
            var dataPI = 'PI';
            var dataPerson = 'Person';
            var dataGeneral = 'General';
            helper.verifyElementDisplayed(trialDetails.generalTrailCentralContactRadio.get(0), true);
            helper.verifyElementDisplayed(trialDetails.generalTrailCentralContactRadio.get(1), true);
            helper.verifyElementDisplayed(trialDetails.generalTrailCentralContactRadio.get(2), true);
            helper.verifyElementDisplayed(trialDetails.generalTrailCentralContactRadio.get(3), true);
            trialDetails.generalTrailCentralContactRdoLbls.get(1).getText().then(function (valuePI) {
                console.log('Central Contact Radio Labels:[' + valuePI + ']');
                expect(valuePI.toString()).to.eql(dataPI.toString());
            });
            trialDetails.generalTrailCentralContactRdoLbls.get(2).getText().then(function (valuePerson) {
                console.log('Central Contact Radio Labels:[' + valuePerson + ']');
                expect(valuePerson.toString()).to.eql(dataPerson.toString());
            });
            trialDetails.generalTrailCentralContactRdoLbls.get(3).getText().then(function (valueGeneral) {
                console.log('Central Contact Radio Labels:[' + valueGeneral + ']');
                expect(valueGeneral.toString()).to.eql(dataGeneral.toString());
            });
        });
    });

    this.Given(/^selected the radio button for PI$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.selectCentralContactRdo(trialDetails.generalTrailCentralContactRadio, 'PI', 'Central Contact - PI');
        });
    });

    this.Given(/^the phone \#, extension and e\-mail address is displayed$/, function () {
        return browser.sleep(25).then(function() {
            helper.verifyElementDisplayed(trialDetails.generalTrailCentralContactName, true);
            helper.verifyElementDisplayed(trialDetails.generalTrailCentralContactEmail, true);
            helper.verifyElementDisplayed(trialDetails.generalTrailCentralContactPhone, true);
            helper.verifyElementDisplayed(trialDetails.generalTrailCentralContactPhoneExt, true);
        });
    });

    this.Then(/^I can edit the phone \#, extension and e\-mail address$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.setCentralContactEmail(cntralCntctEmail);
            trialDetails.setCentralContactPhone(cntralCntctPh);
            trialDetails.setCentralContactPhoneExtension(cntralCntctPhExtension);
            trialDetails.clickSave();
            trialDetails.setCentralContactEmail(cntralCntctEmailEdit);
            trialDetails.setCentralContactPhone(cntralCntctPhEdit);
            trialDetails.setCentralContactPhoneExtension(cntralCntctPhExtensionEdit);
            trialDetails.clickSave();
        });
    });

    this.Then(/^the PI, phone \#, extension and e\-mail address will be associated with this trail$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactEmail, cntralCntctEmailEdit, "Verifying the Lead Organization Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhone, cntralCntctPhEdit, "Verifying the Lead Organization Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhoneExt, cntralCntctPhExtensionEdit, "Verifying the Lead Organization Name");
        });
    });

    /*
     Scenario: #8 I can associate a person as the Central Contact or for the trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And I am in the Central Contact section
     And I select the radio button for Person
     And preform a person look up and select a person
     And the selected Person, their phone #, extension and e-mail address will be displayed
     Then I can edit the phone # and e-mail address
     And the Person, phone #, extension and e-mail address will be associated with this trail
     */

    this.Given(/^I select the radio button for Person$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.selectCentralContactRdo(trialDetails.generalTrailCentralContactRadio, 'Person', 'Central Contact - Person');
        });
    });

    this.Given(/^preform a person look up and select a person$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSearchPersonsButtonByIndex('1');
            searchOrg.clickExactSearch('true');
            searchPeople.setPersonFirstName(personFNmB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
        });
    });

    this.Given(/^the selected Person, their phone \#, extension and e\-mail address will be displayed$/, function () {
        return browser.sleep(25).then(function() {
            var buildCentralcontactNM = '' + personFNmB + '  ' + personLNmB + '';
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactName, buildCentralcontactNM, "Verifying the Central Contact Name");
        });
    });

    this.Then(/^I can edit the phone \# and e\-mail address$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.setCentralContactEmail(cntralCntctEmail);
            trialDetails.setCentralContactPhone(cntralCntctPh);
            trialDetails.setCentralContactPhoneExtension(cntralCntctPhExtension);
            trialDetails.clickSave();
            trialDetails.setCentralContactEmail(cntralCntctEmailEdit);
            trialDetails.setCentralContactPhone(cntralCntctPhEdit);
            trialDetails.setCentralContactPhoneExtension(cntralCntctPhExtensionEdit);
            trialDetails.clickSave();
        });
    });

    this.Then(/^the Person, phone \#, extension and e\-mail address will be associated with this trail$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactEmail, cntralCntctEmailEdit, "Verifying the Lead Organization Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhone, cntralCntctPhEdit, "Verifying the Lead Organization Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhoneExt, cntralCntctPhExtensionEdit, "Verifying the Lead Organization Name");
        });
    });

    /*
     Scenario: #9 I can associate General Central Contact for the trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And I am in the Central Contact section
     And I select the radio button for General Contact
     And I enter the Central Contact Name
     And I enter either a Central Contact Phone Number and extension or Central Contact E-Mail Address or both
     Then the selected Central Contact, Phone #, extension and e-mail address will be Central contact for the trial
     */

    this.Given(/^I select the radio button for General Contact$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.selectCentralContactRdo(trialDetails.generalTrailCentralContactRadio, 'General', 'Central Contact - General');
        });
    });

    this.Given(/^I enter the Central Contact Name$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.setCentralContactName('');
            trialDetails.clickSave();
            trialDetails.generalTrailCentralContactNameReq.getText().then(function (valueReq) {
                console.log('Central Contact Name Required:[' + valueReq + ']');
                expect(valueReq.toString()).to.eql(cntralCntctGeneralNameReq.toString());
            });
            trialDetails.setCentralContactName(cntralCntctGeneralName);
        });
    });

    this.Given(/^I enter either a Central Contact Phone Number and extension or Central Contact E\-Mail Address or both$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.setCentralContactEmail('');
            trialDetails.setCentralContactPhone(cntralCntctGeneralPh);
            trialDetails.setCentralContactPhoneExtension(cntralCntctGeneralPhExtension);
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactName, cntralCntctGeneralName, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactEmail, '', "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhone, cntralCntctGeneralPh, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhoneExt, cntralCntctGeneralPhExtension, "Verifying the Central Contact Name");
            trialDetails.setCentralContactEmail(cntralCntctGeneralEmail);
            trialDetails.setCentralContactPhone('');
            trialDetails.setCentralContactPhoneExtension('');
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactName, cntralCntctGeneralName, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactEmail, cntralCntctGeneralEmail, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhone, '', "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhoneExt, '', "Verifying the Central Contact Name");
            trialDetails.setCentralContactEmail(cntralCntctGeneralEmail);
            trialDetails.setCentralContactPhone(cntralCntctGeneralPh);
            trialDetails.setCentralContactPhoneExtension(cntralCntctGeneralPhExtension);
            trialDetails.clickSave();
        });
    });

    this.Then(/^the selected Central Contact, Phone \#, extension and e\-mail address will be Central contact for the trial$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactName, cntralCntctGeneralName, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactEmail, cntralCntctGeneralEmail, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhone, cntralCntctGeneralPh, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhoneExt, cntralCntctGeneralPhExtension, "Verifying the Central Contact Name");
        });
    });

    /*
     Scenario: #10 Save General Trials Details information
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     When select save
     Then the information entered or edited on the General Trails Details screen will be saved to the trial record
     */

    this.When(/^select save$/, function () {
        return browser.sleep(25).then(function() {
            //Pre Save
            trialDetails.clickSearchOrgButtonByIndex('0');
            searchOrg.setOrgName(orgSearchNameA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            trialDetails.clickSave();
            //Acronym
            trialDetails.setAcronym(acronymA);
            //Official Title
            trialDetails.setOfficialTitle(officialTitleEdit);
            //Keyword
            trialDetails.setKeywords(keywordB);
            //Trial Identifier
            trialDetails.selectIdentifier(identifierCTEP);
            trialDetails.setIdentifierTextBox(identifierNmbr);
            trialDetails.clickIdentifierAddButton();
            //Lead Org
            trialDetails.clickSearchOrgButtonByIndex('0');
            searchOrg.setOrgName(orgSearchNameC);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Lead Person
            trialDetails.clickSearchPersonsButtonByIndex('0');
            searchOrg.clickExactSearch('true');
            searchPeople.setPersonFirstName(personFNmB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Sponsor
            trialDetails.clickSearchOrgButtonByIndex('1');
            searchOrg.setOrgName(orgSearchNameD);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Central Contact
            trialDetails.selectCentralContactRdo(trialDetails.generalTrailCentralContactRadio, 'General', 'Central Contact - General');
            trialDetails.setCentralContactName(cntralCntctGeneralName);
            trialDetails.setCentralContactEmail(cntralCntctGeneralEmail);
            trialDetails.setCentralContactPhone(cntralCntctGeneralPh);
            trialDetails.setCentralContactPhoneExtension(cntralCntctGeneralPhExtension);
            //Click Save
            trialDetails.clickSave();
        });
    });

    this.Then(/^the information entered or edited on the General Trails Details screen will be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailAcronym, acronymA, "Verifying the Acronym");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailOfficialTitle, officialTitleEdit, "Verifying the Official Title");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailKeywords, keywordB, "Verifying the Keywords");
            trialDetails.findIndentifierToVerifyEditDelete(identifierCTEP, 'verify', identifierNmbr);
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailLeadOrganization, orgSearchNameC, "Verifying the Lead Organization Name");
            var buildCentralcontactNM = '' + personFNmB + ' ' + personLNmB + '';
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailPrincipalInvestigator, buildCentralcontactNM, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailSponsor, orgSearchNameD, "Verifying the Sponsor Organization Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactName, cntralCntctGeneralName, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactEmail, cntralCntctGeneralEmail, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhone, cntralCntctGeneralPh, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhoneExt, cntralCntctGeneralPhExtension, "Verifying the Central Contact Name");
        });
    });

    /*
     Scenario: #11 Cancel General Trials Details information
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     When select Reset
     Then the information entered or edited on the General Trails Details screen will not be saved to the trial record
     And the General Trial Details screen will be refreshed with the existing data
     */

    this.When(/^select Reset$/, function () {
        return browser.sleep(25).then(function() {
            //Pre Save
            trialDetails.clickSearchOrgButtonByIndex('0');
            searchOrg.setOrgName(orgSearchNameA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            trialDetails.clickSave();
            //Acronym
            trialDetails.setAcronym(acronymA);
            //Official Title
            trialDetails.setOfficialTitle(officialTitleEdit);
            //Keyword
            trialDetails.setKeywords(keywordB);
            //Trial Identifier
            trialDetails.selectIdentifier(identifierCTEP);
            trialDetails.setIdentifierTextBox(identifierNmbr);
            trialDetails.clickIdentifierAddButton();
            //Lead Org
            trialDetails.clickSearchOrgButtonByIndex('0');
            searchOrg.setOrgName(orgSearchNameC);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Lead Person
            trialDetails.clickSearchPersonsButtonByIndex('0');
            searchOrg.clickExactSearch('true');
            searchPeople.setPersonFirstName(personFNmB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Sponsor
            trialDetails.clickSearchOrgButtonByIndex('1');
            searchOrg.setOrgName(orgSearchNameD);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Central Contact
            trialDetails.selectCentralContactRdo(trialDetails.generalTrailCentralContactRadio, 'General', 'Central Contact - General');
            trialDetails.setCentralContactName(cntralCntctGeneralName);
            trialDetails.setCentralContactEmail(cntralCntctGeneralEmail);
            trialDetails.setCentralContactPhone(cntralCntctGeneralPh);
            trialDetails.setCentralContactPhoneExtension(cntralCntctGeneralPhExtension);
            //Click Save
            trialDetails.clickSave();
            //Reset
            //Acronym
            trialDetails.setAcronym(acronymB);
            //Official Title
            trialDetails.setOfficialTitle(officialTitle);
            //Keyword
            trialDetails.setKeywords(keywordA);
            //Trial Identifier
            trialDetails.selectIdentifier(identifierDCP);
            trialDetails.setIdentifierTextBox(identifierNmbrEdited);
            trialDetails.clickIdentifierAddButton();
            //Lead Org
            trialDetails.clickSearchOrgButtonByIndex('0');
            searchOrg.setOrgName(orgSearchNameA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Lead Person
            trialDetails.clickSearchPersonsButtonByIndex('0');
            searchOrg.clickExactSearch('true');
            searchPeople.setPersonFirstName(personFNmA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Sponsor
            trialDetails.clickSearchOrgButtonByIndex('1');
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Central Contact
            trialDetails.selectCentralContactRdo(trialDetails.generalTrailCentralContactRadio, 'General', 'Central Contact - General');
            trialDetails.setCentralContactName(cntralCntctGeneralNameEdit);
            trialDetails.setCentralContactEmail(cntralCntctGeneralEmailEdit);
            trialDetails.setCentralContactPhone(cntralCntctGeneralPhEdit);
            trialDetails.setCentralContactPhoneExtension(cntralCntctGeneralPhExtensionEdit);
            //Click Reset
            trialDetails.clickReset();
        });
    });

    this.Then(/^the information entered or edited on the General Trails Details screen will not be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailAcronym, acronymA, "Verifying the Acronym");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailOfficialTitle, officialTitleEdit, "Verifying the Official Title");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailKeywords, keywordB, "Verifying the Keywords");
            trialDetails.findIndentifierToVerifyEditDelete(identifierCTEP, 'verify', identifierNmbr);
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailLeadOrganization, orgSearchNameC, "Verifying the Lead Organization Name");
            var buildCentralcontactNM = '' + personFNmB + ' ' + personLNmB + '';
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailPrincipalInvestigator, buildCentralcontactNM, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailSponsor, orgSearchNameD, "Verifying the Sponsor Organization Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactName, cntralCntctGeneralName, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactEmail, cntralCntctGeneralEmail, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhone, cntralCntctGeneralPh, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhoneExt, cntralCntctGeneralPhExtension, "Verifying the Central Contact Name");
        });
    });

    this.Then(/^the General Trial Details screen will be refreshed with the existing data$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    /*
     Scenario: #12 Protocol ID not null
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And the protocol ID is Null
     When I select save
     Then a warning message will appear �Please enter the Protocol Identifier�
     */

    this.Given(/^the protocol ID is Null$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.findIndentifierToVerifyEditDelete('Lead Organization Trial ID', 'edit', '');
            trialDetails.setIdentifierTextBox('');
            trialDetails.clickIdentifierConfirmButton();
        });
    });

    this.When(/^I select save$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSave();
        });
    });

    this.Then(/^a warning message will appear "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
            trialDetails.findIndentifierToVerifyEditDelete('Lead Organization Trial ID', 'verify', 'CTRP_01_1781');
            console.log('Warning message can not be verified. Since there are no such warning message');
        });
    });

    /*
     Scenario: #13 Official Title not null
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And the Official Title is Null
     When I select save
     Then a warning message will appear �Please enter the Official Title�
     */

    this.Given(/^the Official Title is Null$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.setOfficialTitle('');
        });
    });

    this.Then(/^a warning message will appear �Official Title is Required�$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.generalTrailCentralContactNameReq.getText().then(function (valueReq) {
                console.log('Central Contact Name required message:[' + valueReq + ']');
                expect(valueReq.toString()).to.eql(officialTitleReq.toString());
            });
        });
    });

    /*
     Scenario: #14 Lead Organization is not null
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And the Lead Organization is Null
     When I select save
     Then a warning message will appear �Please enter the Lead Organization�
     */

    this.Given(/^the Lead Organization is Null$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSearchOrgButtonByIndex('0');
            searchOrg.setOrgName(orgSearchNameA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
        });
    });

    this.Then(/^a warning message will appear �Lead Organization is Required�$/, function () {
        return browser.sleep(25).then(function() {
            var leadOrgNull = '';
            leadOrgTxtVal = trialDetails.generalTrailLeadOrganization.getAttribute('value');
            leadOrgTxtVal.then(function (valueLedOrg) {
                console.log('Lead Organization value:[' + valueLedOrg + ']');
                if (valueLedOrg !== '') {
                    leadOrgNull = 'ValueIsNotNull';
                } else {
                    leadOrgNull = 'Value Is Null';
                }
                var verifValIsNotNull = 'ValueIsNotNull';
                expect(verifValIsNotNull.toString()).to.eql(leadOrgNull.toString());
            });
        });
    });

    /*
     Scenario: #15 Principal Investigator is not null
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And the Principal Investigator is Null
     When I select save
     Then a warning message will appear �Please enter the Principal Investigator�
     */

    this.Given(/^the Principal Investigator is Null$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSearchPersonsButtonByIndex('0');
            searchOrg.clickExactSearch('true');
            searchPeople.setPersonFirstName(personFNmA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
        });
    });

    this.Then(/^a warning message will appear �Principal Investigator is Required�$/, function () {
        return browser.sleep(25).then(function() {
            var piNull = '';
            piTxtVal = trialDetails.generalTrailPrincipalInvestigator.getAttribute('value');
            piTxtVal.then(function (valuePI) {
                console.log('Principal Investigator value:[' + valuePI + ']');
                if (valuePI !== '') {
                    piNull = 'ValueIsNotNull';
                } else {
                    piNull = 'Value Is Null';
                }
                var verifValIsNotNull = 'ValueIsNotNull';
                expect(verifValIsNotNull.toString()).to.eql(piNull.toString());
            });
        });
    });

    /*
     Scenario: #16 Sponsor is not null
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     And the Sponsor is Null
     When I select save
     Then a warning message will appear �Please enter the Sponsor�
     */

    this.Given(/^the Sponsor is Null$/, function () {
        return browser.sleep(25).then(function() {
            trialDetails.clickSearchOrgButtonByIndex('1');
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
        });
    });

    this.Then(/^a warning message will appear �Sponsor is Required�$/, function () {
        return browser.sleep(25).then(function() {
            var sponNull = '';
            spnTxtVal = trialDetails.generalTrailSponsor.getAttribute('value');
            spnTxtVal.then(function (valueSpn) {
                console.log('Sponsor value:[' + valueSpn + ']');
                if (valueSpn !== '') {
                    sponNull = 'ValueIsNotNull';
                } else {
                    sponNull = 'Value Is Null';
                }
                var verifValIsNotNull = 'ValueIsNotNull';
                expect(verifValIsNotNull.toString()).to.eql(sponNull.toString());
                expect(orgSearchNameB.toString()).to.eql(valueSpn.toString());
            });
        });
    });

    /*
     Scenario: # 17 e-mail address format
     Given I know which e-mail address I want to edit
     And I am logged in to CTRP application
     And I have selected e-mail address field
     And I change the e-mail address in the format "text"@"text"."text"
     When I change the e-mail address and the format is not "text"@"text"."text"
     Then the system displays a warning message that says "The E-mail address is incorrect"
     */

    this.Given(/^I know which e\-mail address I want to edit$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I have selected e\-mail address field$/, function () {
        return browser.sleep(25).then(function() {
            //Central Contact
            trialDetails.selectCentralContactRdo(trialDetails.generalTrailCentralContactRadio, 'General', 'Central Contact - General');
            trialDetails.setCentralContactName(cntralCntctGeneralNameEdit);
            trialDetails.setCentralContactPhone(cntralCntctGeneralPhEdit);
            trialDetails.setCentralContactPhoneExtension(cntralCntctGeneralPhExtensionEdit);
        });
    });

    this.Given(/^I change the e\-mail address in the format "([^"]*)"@"([^"]*)"\."([^"]*)"$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function() {
            buildEmailAdd = '' + arg1 + '@' + arg2 + '.' + arg3 + '';
            trialDetails.setCentralContactEmail(buildEmailAdd);
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactName, cntralCntctGeneralNameEdit, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactEmail, buildEmailAdd, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhone, cntralCntctGeneralPhEdit, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhoneExt, cntralCntctGeneralPhExtensionEdit, "Verifying the Central Contact Name");
        });
    });

    this.When(/^I change the e\-mail address and the format is not "([^"]*)"@"([^"]*)"\."([^"]*)"$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function() {
            buildEmailAdd = 'invalid' + arg1 + 'email' + arg2 + 'test' + arg3 + '';
            trialDetails.setCentralContactEmail(buildEmailAdd);
            trialDetails.clickSave();
        });
    });

    this.Then(/^the system displays a warning message that says "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactName, cntralCntctGeneralNameEdit, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhone, cntralCntctGeneralPhEdit, "Verifying the Central Contact Name");
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailCentralContactPhoneExt, cntralCntctGeneralPhExtensionEdit, "Verifying the Central Contact Name");
            helper.verifyElementDisplayedByIndex(trialDetails.redSignWarning, '1', true);
        });
    });



};
