/**
 * Author: Shamim Ahmed
 * Date: 04/01/2016
 * Feature: PAA F08 Add and Edit Trial Participating Sites.Feature
 *
 * Note: In the PAA search screen it has dependency on the seed data
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
////Registry
//var regTrialDate = require('../support/registerTrial');



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
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    //var regDate = new regTrialDate();
    //var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchPeople = new searchPeoplePage();
    var searchTableHeader = '';
    var nciID = 'NCI-2014-00894';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1776';
    var leadProtocolIDA = 'CTRP_01_1777';
    var leadProtocolIDB = 'CTRP_01_1778';
    var leadProtocolIDC = 'CTRP_01_17'+randNmbr;
    var leadProtocolIDD = 'CTRP_01_1781';
    var leadProtocolIDE = 'CTRP_01_1782';
    var leadProtocolIDF = 'CTRP_01_1783';
    var leadProtocolIDG = 'CTRP_01_1784';
    var leadProtocolIDH = 'CTRP_01_1785';
    var leadProtocolIDI = 'CTRP_01_1786';
    var searchResultCountText = 'Trial Search Results';
    var identifierRnd = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbr = ''+identifierRnd+'';
    var identifierRndA = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbrEdited = ''+identifierRndA+'';
    var getBoardName = 'TestBoardName'+moment().format('MMMDoYY hmmss');
    var boardNm = '';
    var orgSearchNameA = 'Boston Medical Center';
    var orgSearchNameB = 'Boston University School Of Public Health';
    var orgSearchNameC = 'National Cancer Institute';
    var orgSearchNameD = 'ZZZ test org for test accounts';
    var personFNmA = 'Alessandra';
    var personLNmA = 'Ferrajol';
    var personFNmB = 'Kristi';
    var personLNmB = 'Graves';
    var personFNmC = 'Diane';
    var personLNmC = 'Roulston';
    var optionA = 'Identifier Type';
    var optionB = 'Value (Click for editing)';
    var optionC = 'Deletion';
    var optionD = '';
    var optionE = '';
    var optionF = '';
    var optionG = '';
    var optionH = '';
    var optionI = '';
    var tblOptionA = '';
    var tblOptionB = '';
    var tblOptionC = '';
    var tblOptionD = '';
    var tblOptionE = '';
    var tblOptionF = '';
    var tblOptionG = '';
    var tblOptionH = '';
    var tblOptionI = '';
    var tblOptionJ = '';
    var tblOptionK = '';
    var tblRoleOptionA = '';
    var tblRoleOptionB = '';
    var dateDay = '';
    var dateMonth = '';
    var dateYear = '';
    var primaryContactRT = '';
    var emailAddressRT = '';
    var phoneNumberRT = '';
    var phoneNumberExtRT = '';


    /*
     Scenario Outline: #1 I can add one or more a participating sites for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Participating Site Page
     And I have selected an organization <Organization name> with the Organization look up
     And I have entered or edited the Local Trial Identifier <Local Trial Identifier>
     And I have selected one or more Site Recruitment Status <Site Recruitment Status>
     And I have selected one or more Site Recruitment status date <Site Recruitment Status Date>
     And I have entered Site Recruitment status comments <Site Recruitment status comments>
     And I have entered the program code <Site Specific Program Code>
     And I have entered a Target Accrual Number <Target Accrual Number>
     And I have selected one or more Investigators <Site Principal Investigator> for each Participating Site with the person look up
     And I have selected the role for each investigator <Site Principal Investigator Role>
     |Principal Investigator|
     |Sub Investigator|
     And I have selected the �Set as Site Contact" for an investigator when the investigator is the Participating site contact
     And I have edited the phone number for the investigator contact <Phone>
     And I have edited the phone number extension <Ext> for the investigator contact
     And I have edited the contact e-mail for the contact <e-mail address>
     And I have selected the �Set as Site Contact" for a central contact <Central Contact> when the central contact for the participating site is generic
     And I have added or edited the contact phone number for the contact <Phone>
     And I have added or edited the contact phone number extension <Ext> for the contact
     And I have added or edited the contact e-mail for the contact <e-mail address>
     Then the participating site information will be associated with the trial
     And the organization address information <Org City> <Org State> <Org Country><Org zip code> will be associated with the trial
     And the system will display the list of participating sites ordered assending alphanumeric by participationg site name
     And the system will display a message that the Participating Site Has been Updated <Message>
     And the Participating Site table can be sorted by
     |Organiztion ID|
     |Organization Name|
     Examples:
     |Organization name |Org City|Org State|Org Country|Org zip code|Local Trial Identifier|Site Recruitment Status|Site Recruitment Status Date|Site Recruitment status comments|Site Specific Program Code|Target Accrual Number|Site Principal Investigator|Site Principal Investigator Role|Central Contact      |Phone         |Ext |e-mail address|Warning/Error|Message|
     |Mayo              |New York|NY       |USA        |10101       |123                   |Approved               |30-Sep-2015                 |Free Text                       |48                        |100                  |Jane Doe                   |Principal Investigator          |Jane Doe             |212-123-4567  |1234|jane@mayo.com |             |Participating Site Has been Updated|
     |MD Anderson       |New York|NY       |USA        |10101       |123a                  |Approved               |30-sep-2015                 |comments                        |123abc                    |25                   |john Smith                 |Principal Investigator          |Clinical Trial Center|1-888-123-4567|4567|CTC@mda.com   |             |Participating Site Has been Updated|
     |Wake Forest       |Trenton |NJ       |USA        |10101       |123b                  |Approved               |30-Sep-2015                 |<null>                          |<null>                    |null                 |John Doe                   |Sub  Investigator               |Jane Doe             |212-123-4567  |1111|<null>        |             |Participating Site Has been Updated|
     */

    this.Given(/^I am on the Participating Site Page$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataParticipatingSites();
        trialCollaborators.waitForElement(participatingSite.addParticipatingSiteBtn , "Add Participating Site - Button");
        participatingSite.listOfPartSteTbl.isDisplayed().then(function(dispC){
            console.log('List of Participating Sites boolean status: ' + dispC);
            if (dispC === true) {
                participatingSite.verifyListOfParticipatingSitesTable();
                participatingSite.selectAllListOfParticipatingSitesTable();
                participatingSite.clickDeleteSelected();
                participatingSite.clickDeleteSelectedOKButton();
            }
        });
        participatingSite.clickAddParticipatingSite();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected an organization (.*) with the Organization look up$/, function (OrganizationName, callback) {
        participatingSite.clickSearchOrganization();
        trialDetails.clickSearchOrgButtonByIndex('0');
        searchOrg.setOrgName(OrganizationName);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered the program code (.*)$/, function (SiteSpecificProgramCode, callback) {
        participatingSite.setProgramCode(SiteSpecificProgramCode);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered or edited the Local Trial Identifier (.*)$/, function (LocalTrialIdentifier, callback) {
        participatingSite.setIdentifier(LocalTrialIdentifier);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected one or more Site Recruitment Status (.*)$/, function (SiteRecruitmentStatus, callback) {
        participatingSite.selectStatus(SiteRecruitmentStatus);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected one or more Site Recruitment status date (.*)$/, function (SiteRecruitmentStatusDate, callback) {
        participatingSite.clickStatusDate();
        var dateSplit = SiteRecruitmentStatusDate.toString().split("-");
        dateDay = dateSplit[0];
        dateMonth = dateSplit[1];
        dateYear = dateSplit[2];
        addTrial.clickAddTrialDateFieldDifferentYear(dateYear, dateMonth, dateDay);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered Site Recruitment status comments (.*)$/, function (SiteRecruitmentStatusComments, callback) {
        participatingSite.setSiteRecruitmentComment(SiteRecruitmentStatusComments);
        participatingSite.clickSiteRecruitmentAdd();
        participatingSite.clickSaveButtonParticipating();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a Target Accrual Number (.*)$/, function (TargetAccrualNumber, callback) {
        console.log("Dev team did not implemented this feature on the participating site tab");
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected one or more Investigators (.*) for each Participating Site with the person look up$/, function (SitePrincipalInvestigator, callback) {
        participatingSite.clickInvestigatorsTab();
        //trialCollaborators.waitForElement(participatingSite.investigatorName, "Investigators Name - Read only - Field");
        participatingSite.clickSearchPersons();
        //trialDetails.clickSearchPersonsButtonByIndex('0');
        searchOrg.clickExactSearch('true');
        searchPeople.setPersonFirstName(personFNmB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        browser.sleep(2500).then(callback);
    });

    this.Given(/^I have selected the role for each investigator (.*)$/, function (SitePrincipalInvestigatorRole, table, callback) {
        console.log('Site Principal Investigator Role: ['+ SitePrincipalInvestigatorRole + ']');
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strVal +']');
        var tableDataSplt = strVal.toString().split("\n");
        tblRoleOptionA = tableDataSplt[0];
        tblRoleOptionB = tableDataSplt[1];
        //helper.selectValueFromList(participatingSite.eidtRole, SitePrincipalInvestigatorRole, "Select Role");
        participatingSite.eidtRole.$('option:checked').getText().then(function (curntSelection){
            console.log('Current Role Selected as:['+curntSelection+']');
            if (curntSelection != SitePrincipalInvestigatorRole){
                //participatingSite.selectEditRole(SitePrincipalInvestigatorRole);
            }
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the �Set as Site Contact" for an investigator when the investigator is the Participating site contact$/, function (callback) {
        participatingSite.findPrsnFNameVerfEdtDel(personFNmB, 'edit');
        participatingSite.checkSetAsPrimaryContact("true");
        participatingSite.clickEditConfirm();
        participatingSite.clickSaveButtonInvestigators();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have edited the phone number for the investigator contact (.*)$/, function (Phone, callback) {

        browser.sleep(25).then(callback);
    });

    this.Given(/^I have edited the phone number extension (.*) for the investigator contact$/, function (Ext, callback) {

        browser.sleep(25).then(callback);
    });

    this.Given(/^I have edited the contact e\-mail for the contact (.*)$/, function (eMailAddress, callback) {

        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the �Set as Site Contact" for a central contact (.*) when the central contact for the participating site is generic$/, function (CentralContact, callback) {
        primaryContactRT = ''+ CentralContact +'';
        participatingSite.clickContactTab();
        participatingSite.selectPrimaryContact(primaryContactRT);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have added or edited the contact phone number for the contact (.*)$/, function (Phone, callback) {
        phoneNumberRT = ''+ Phone +'';
        participatingSite.setPhoneNumber(phoneNumberExtRT);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have added or edited the contact phone number extension (.*) for the contact$/, function (Ext, callback) {
        phoneNumberExtRT = ''+ Ext +'';
        participatingSite.setPhoneNumberExt(phoneNumberExtRT);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have added or edited the contact e\-mail for the contact (.*)$/, function (eMailAddress, callback) {
        emailAddressRT = ''+ eMailAddress +'';
        participatingSite.setEmailAddress(emailAddressRT);
        participatingSite.clickSaveButtonContact();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the participating site information will be associated with the trial$/, function (callback) {
        participatingSite.clickInvestigatorsTab();
        participatingSite.clickParticipatingSiteTab();
        participatingSite.clickContactTab();
        participatingSite.verifyType('0');
        participatingSite.verifyPrimaryContact(primaryContactRT);
        participatingSite.verifyEmailAddress(emailAddressRT);
        participatingSite.verifyPhoneNumber(phoneNumberRT);
        participatingSite.verifyPhoneNumberExt(phoneNumberExtRT);
        browser.sleep(25).then(callback);
    });

    this.Given(/^the organization address information (.*) (.*) (.*) (.*) will be associated with the trial$/, function (OrgCity, OrgState, OrgCountry, OrgZipCode, callback) {
        participatingSite.clickParticipatingSiteTab();
        helper.wait(participatingSite.orgnizationTxt, "Organization");
        helper.wait(participatingSite.programCodeTxt, "Program Code");
        helper.wait(participatingSite.identifierTxt, "Local Trial Identifier");
        trialDetails.verifyTextFieldValue(participatingSite.cityTxt, OrgCity, "Verifying the Org City Name");
        trialDetails.verifyTextFieldValue(participatingSite.stateTxt, OrgState, "Verifying the Org State Name");
        trialDetails.verifyTextFieldValue(participatingSite.countryTxt, OrgCountry, "Verifying the Org Country Name");
        trialDetails.verifyTextFieldValue(participatingSite.zipPostalCodeTxt, OrgZipCode, "Verifying the Org Zip Code");
        browser.sleep(25).then(callback);
    });

    this.Given(/^the system will display the list of participating sites ordered assending alphanumeric by participationg site name$/, function (callback) {
        participatingSite.clickBackToParticipatingSitesListPartcipating();

        browser.sleep(25).then(callback);
    });

    this.Given(/^the system will display a message that the Participating Site Has been Updated (.*)$/, function (Message, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the Participating Site table can be sorted by$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


};
