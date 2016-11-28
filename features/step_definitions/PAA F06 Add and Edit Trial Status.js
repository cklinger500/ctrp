/**
 * Author: Shamim Ahmed
 * Date: 05/10/2016
 * Feature: PAA F06 Add and Edit Trial Status.Feature
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
//Trial Status
var abstractionTrialStatus = require('../support/abstractionTrailStatuses');
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
    var leadProtocolIDE = 'CTRP_01_1794';
    var leadProtocolIDF = 'CTRP_01_1782';
    var searchResultCountText = 'Trial Search Results';
    var identifierRnd = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbr = ''+identifierRnd+'';
    var identifierRndA = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbrEdited = ''+identifierRndA+'';
    var getBoardName = 'TestBoardName'+moment().format('MMMDoYY hmmss');
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
    var optionA = '';
    var optionB = '';
    var optionC = '';
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
    var currentDate = '';
    var futureDate = '';
    var futureDateTwoMonth = '';
    var futureDateThreeMonth = '';
    var pastDate = '';
    var replacePastDate = '';
    var replaceStartDate = '';
    var replacePrimaryDate = '';
    var replaceCompletionDate = '';
    var hlodReasonA = '';
    var hlodReasonC = '';
    var transRlsLink = '';
    var dateRlsLink = '';

    /*********************
     * Validation message *
     *********************/
    var errorStatusAlreadyExists = 'Status already exists';
    var warningMsgApproved = 'WARNING: Interim status [In Review] is missing';
    var warningMsgWithdrawnActiveEBI = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing';
    var warningMsgClosedToAccrualTemporarilyClosedToAccrual = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing';
    var warningMsgClosedToAccrualAndIntervention = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing';
    var warningMsgTemporarilyClosedToAccrualAndIntervention = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing';
    var warningMsgCompleteAdministrativelyComplete = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing';
    var errorMsgStatus = 'Trial Status is required';
    var errorMsgStatusStatusDate = 'Please provide a Status Date, select a Status';
    var errorMsgStatusStatusDateStudyStopped = 'Please provide a Status Date, select a Status and enter Why Study Stopped';
    var errorMsgTrialStatusFuture = 'The Status Date should not be in the future';
    var errorMsgTrialStartDate = 'Trial Start Date is required';
    var errorMsgTrialPrimaryCompletionDate = 'Primary Completion Date is required';
    var errorMsgTrialCompletionDate = 'Completion Date is required';
    var errorMsgTrialStartDateType = 'Trial Start Date Type is required';
    var errorMsgTrialPrimaryCompletionDateType = 'Primary Completion Date Type is required';
    var errorMsgTrialCompletionDateType = 'Completion Date Type is required';
    var errorMsgTrialStartDatePastTypeAnticipated = 'Trial Start Date type cannot be Anticipated if Trial Start Date is in the past';
    var errorMsgTrialPrimaryCompletionDatePastTypeAnticipated = 'Primary Completion Date type cannot be Anticipated if Primary Completion Date is in the past';
    var errorMsgTrialCompletionDatePastTypeAnticipated = 'Completion Date type cannot be Anticipated if Completion Date is in the past';
    var errorMsgTrialStartDateFutureTypeActual = 'Trial Start Date type cannot be Actual if Trial Start Date is in the future';
    var errorMsgTrialPrimaryCompletionDateFutureTypeActual = 'Primary Completion Date type cannot be Actual if Primary Completion Date is in the future';
    var errorMsgTrialCompletionDateFutureTypeActual = 'Completion Date type cannot be Actual if Completion Date is in the future';
    var primaryCompletionDateErrorMessageWithTrialStartDate = 'The Primary Completion Date should be the same as, or later than, the Trial Start Date';
    var completionDateErrorMessageWithTrialPrimaryCompletionDate = 'The Completion Date should be the same as, or later than, the Primary Completion Date';

    /*
     Scenario: #1 I can enter a trial status and trial status date for a trial
     */
    this.Given(/^I am on the Trial Status Screen$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickLinkText(leadProtocolID);
            commonFunctions.adminCheckOut();
            trialDoc.clickAdminDataTrialStatus();
        });
    });

    this.Given(/^I have selected trail$/, function () {
        return browser.sleep(25).then(function() {
        trialCollaborators.waitForElement(trialStatus.statuesesStatusDate , "Trial Status Screen");
        });
    });

    this.Given(/^I have selected a trial status from the list of:$/, function (table) {
        return browser.sleep(25).then(function() {
        tableValues = table.raw();
        var strVal = '';
        strVal = tableValues.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strVal +']');
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionB = tableDataSplt[1];
        trialStatus.selectStatus(tblOptionB);
        });
    });

    this.Given(/^I have entered or selected a Current Trial Status Date$/, function () {
        return browser.sleep(25).then(function() {
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplit = currentDate.toString().split("-");
        crtnDateDay = dateSplit[0];
        crntDateMonth = dateSplit[1];
        crntDateYear = dateSplit[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.clickAddTrialStatus();
        trialStatus.verifyTrialStatusTblHdr();
        });
    });

    this.Given(/^I have entered or selected a Trial Start Date$/, function () {
        return browser.sleep(25).then(function() {
        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplit = pastDate.toString().split("-");
        pstDateDay = dateSplit[0];
        pstDateMonth = dateSplit[1];
        pstDateYear = dateSplit[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        });
    });

    this.Given(/^I have selected the Trial Start Date Type of "([^"]*)" , "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
        console.log('Trial Start Date Type selected as: '+arg1);
        //Selected the Date type on the previous step
        });
    });

    this.Given(/^I have entered or selected a Primary Completion Date$/, function () {
        return browser.sleep(25).then(function() {
        futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
        console.log('Next two month ahead future date: '+futureDateTwoMonth);
        var dateSplit = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplit[0];
        futrDateMonth = dateSplit[1];
        futrDateYear = dateSplit[2];
        trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');
        });
    });

    this.Given(/^I have selected the Primary Completion Date Type of "([^"]*)" , "([^"]*)", "([^"]*)"$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function() {
        console.log('Primary Completion Date Type selected as: '+arg2);
        //Selected the Date type on the previous step
        });
    });

    this.Given(/^I have entered or selected a Completion Date$/, function () {
        return browser.sleep(25).then(function() {
        var dateSplit = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplit[0];
        futrDateMonth = dateSplit[1];
        futrDateYear = dateSplit[2];
        trialStatus.setCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');
        });
    });

    this.Given(/^I have selected the Completion Date Type of "([^"]*)" , "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
        console.log('Completion Date Type selected as: '+arg2);
        //Selected the Date type on the previous step
        replacePastDate = trialDoc.replaceMonth(pastDate);
        replacePrimaryDate = trialDoc.replaceMonth(futureDateTwoMonth);
        replaceCompletionDate = trialDoc.replaceMonth(futureDateTwoMonth);
        trialStatus.verifyTrialDates ('all', replacePastDate, 'Actual', replacePrimaryDate, 'Anticipated', replaceCompletionDate, 'Anticipated');
        });
    });

    this.Given(/^have entered or edited the Trial On Hold Reason Comments when the trial status is:$/, function (table) {
        return browser.sleep(25).then(function() {
            //To edit trial status utilizing trial status from (I have selected a trial status from the list of)steps
            trialStatus.findTrialStatusVerfEdtDel(tblOptionB, 'edit', '');
            var holdReasonTableValues = table.raw();
            var strValHoldReason = '';
            strValHoldReason = holdReasonTableValues.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strValHoldReason + ']');
            var hldRsnTableDataSplt = strValHoldReason.toString().split("\n");
            hlodReasonA = hldRsnTableDataSplt[0];
            hlodReasonB = hldRsnTableDataSplt[1];
            hlodReasonC = hldRsnTableDataSplt[2];
            hlodReasonD = hldRsnTableDataSplt[3];
            /* Table Reference
             |Administratively Complete|
             |Withdrawn|
             |Temporarily Closed to Accrual|
             |Temporarily Closed to Accrual and Intervention|
             */
            trialStatus.selectStatus(hlodReasonA);
            trialStatus.setStatusComment('Status Comment due to: ' + hlodReasonA + '');
            trialStatus.setWhyStudyStopped('Why Study Stopped: ' + hlodReasonA + '');
            trialStatus.clickEditTrialStatusConfirm();
            trialStatus.findTrialStatusVerfEdtDel(hlodReasonA, 'verify', '');
        });
    });

    this.Given(/^have entered or edited the Trial Status Comments$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.setTrialComments('Trial Status Comment '+currentDate+'');
        });
    });

    this.Given(/^have entered or edited the Additional Comments$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.setTrialComments('Trial Status Comment '+futureDate+'');
        });
    });

    this.When(/^I select Save$/, function () {
        return browser.sleep(25).then(function() {
            trialStatus.clickSave();
        });
    });

    this.Then(/^the trial status and dates will be checked against validation rules and associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.verifyTrialDates ('all', replacePastDate, 'Actual', replacePrimaryDate, 'Anticipated', replaceCompletionDate, 'Anticipated');
        });
    });

    this.Then(/^the trial status and date will be displayed as trial status history with any errors or warnings from the Trial Status Transition Rules$/, function () {
        return browser.sleep(25).then(function() {
        var expectedErrWarnings = 'ERROR: Invalid Transition';
        trialStatus.findTrialStatusVerfEdtDel(hlodReasonA, 'verifyErrors', expectedErrWarnings);
        });
    });

    /*
     Scenario: #2 I can enter a trial status and invalid trial status date for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected trail
     And I have selected a trial status
     And I have entered or selected a Current Trial Status Date
     And I have entered or selected a Trial Start Date
     And I have selected the Trial Start Date Type of "Actual" , "Anticipated"
     And I have entered or selected a Primary Completion Date
     And I have selected the Primary Completion Date Type of "Actual" , "Anticipated", "NA"
     And I have entered or selected a Completion Date
     And I have selected the Completion Date Type of "Actual" , "Anticipated"
     And have entered or edited the Trial Status Comments
     And have entered or edited the Trial On Hold Reason Comments with the trial status is:
     |Administratively Complete|
     |Withdrawn|
     |Temporarily Closed to Accrual|
     |Temporarily Closed to Accrual and Intervention|
     And have entered or edited the any Additional Trial Status Comments
     When I select Save
     Then the trial status and dates will be checked against validation rules and associated with the trial
     And a warning will be displayed for the incorrect status transitions, dates and date types
     */

    this.Given(/^I have selected traial$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.clickBackToSearchResults();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDB);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDB);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialStatus();
        trialCollaborators.waitForElement(trialStatus.statuesesStatusDate , "Trial Status Screen");
        });
    });

    this.Given(/^I have selected a trial status$/, function () {
        return browser.sleep(25).then(function() {
        tblOptionB = 'Temporarily Closed to Accrual and Intervention';
        trialStatus.selectStatus(tblOptionB);
        });
    });

    this.Given(/^have entered or edited the Trial On Hold Reason Comments with the trial status is:$/, function (table) {
        return browser.sleep(25).then(function() {
            //To edit trial status utilizing trial status from (I have selected a trial status from the list of)steps
            trialStatus.findTrialStatusVerfEdtDel(tblOptionB, 'edit', '');
            var holdReasonTableValues = table.raw();
            var strValHoldReason = '';
            strValHoldReason = holdReasonTableValues.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strValHoldReason + ']');
            var hldRsnTableDataSplt = strValHoldReason.toString().split("\n");
            hlodReasonA = hldRsnTableDataSplt[0];
            hlodReasonB = hldRsnTableDataSplt[1];
            hlodReasonC = hldRsnTableDataSplt[2];
            hlodReasonD = hldRsnTableDataSplt[3];
            /* Table Reference
             |Administratively Complete|
             |Withdrawn|
             |Temporarily Closed to Accrual|
             |Temporarily Closed to Accrual and Intervention|
             */
            trialStatus.selectStatus(hlodReasonC);
            trialStatus.setStatusComment('Status Comment due to: ' + hlodReasonC + '');
            trialStatus.setWhyStudyStopped('Why Study Stopped: ' + hlodReasonC + '');
            trialStatus.clickEditTrialStatusConfirm();
            trialStatus.findTrialStatusVerfEdtDel(hlodReasonC, 'verify', '');
        });
    });

    this.Given(/^have entered or edited the any Additional Trial Status Comments$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.setTrialComments('Additional Trial Status Comment '+futureDate+'');
        });
    });

    this.Then(/^a warning will be displayed for the incorrect status transitions, dates and date types$/, function () {
        return browser.sleep(25).then(function() {
        var expectedErrWarnings = 'ERROR: Invalid Transition';
        trialStatus.findTrialStatusVerfEdtDel(hlodReasonC, 'verifyErrors', expectedErrWarnings);
        });
    });

    /*
     Scenario: #3 Cancel Trial Status
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status screen
     When I select Reset at the trial status screen
     Then the information entered or edited on the Trial Status screen will not be saved to the trial record
     And the screen will be refreshed with the existing data trial status data
     */

    this.Given(/^I am on the Trial Status screen$/, function () {
        return browser.sleep(25).then(function() {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialStatus();
        });
    });

    this.When(/^I select Reset at the trial status screen$/, function () {
        return browser.sleep(25).then(function() {
            tblOptionC = 'Temporarily Closed to Accrual';
            trialStatus.selectStatus(tblOptionC);
            currentDate = trialDoc.getCrrentDte();
            console.log('current date: ' + currentDate);
            var dateSplitA = currentDate.toString().split("-");
            crtnDateDay = dateSplitA[0];
            crntDateMonth = dateSplitA[1];
            crntDateYear = dateSplitA[2];
            trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
            trialStatus.clickAddTrialStatus();
            trialStatus.verifyTrialStatusTblHdr();

            pastDate = trialDoc.getPastDate();
            console.log('future date: ' + futureDate);
            var dateSplitB = pastDate.toString().split("-");
            pstDateDay = dateSplitB[0];
            pstDateMonth = dateSplitB[1];
            pstDateYear = dateSplitB[2];
            trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');

            futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
            console.log('Next two month ahead future date: ' + futureDateTwoMonth);
            var dateSplitC = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplitC[0];
            futrDateMonth = dateSplitC[1];
            futrDateYear = dateSplitC[2];
            trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');

            var dateSplitD = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplitD[0];
            futrDateMonth = dateSplitD[1];
            futrDateYear = dateSplitD[2];
            trialStatus.setCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');

            trialStatus.clickSave();

            trialStatus.findTrialStatusVerfEdtDel(tblOptionC, 'verify', '');
            tblOptionD = 'Temporarily Closed to Accrual and Intervention';
            trialStatus.selectStatus(tblOptionD);
            currentDate = trialDoc.getCrrentDte();
            console.log('current date: ' + currentDate);
            var dateSplitE = currentDate.toString().split("-");
            crtnDateDay = dateSplitE[0];
            crntDateMonth = dateSplitE[1];
            crntDateYear = dateSplitE[2];
            trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
            trialStatus.clickAddTrialStatus();
            trialStatus.verifyTrialStatusTblHdr();

            trialStatus.clickReset();

        });
    });

    this.Then(/^the information entered or edited on the Trial Status screen will not be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.findTrialStatusVerfEdtDel(tblOptionD, 'notExists', '');
        });
    });

    this.Then(/^the screen will be refreshed with the existing data trial status data$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.findTrialStatusVerfEdtDel(tblOptionC, 'verify', '');
        });
    });

    /*
     Scenario: #4 PA Trial Status Transition Rules
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And I can view the Trial Status Transition Rules Information text "Please refer to the Trial Status Transition Rules:" displayed in the Trial Statuses section below the Trial Statuses Table
     When I have clicked on the Trial Status Transition Rules text
     And Trial Status Transition Rules is a Web Link "https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Transition+Rules"
     Then the Trial Status Transition Rules user guide page will be displayed
     */

    this.Given(/^I can view the Trial Status Transition Rules Information text "([^"]*)" displayed in the Trial Statuses section below the Trial Statuses Table$/, function (arg1) {
        return browser.sleep(25).then(function() {
        trialStatus.verifyTransitionRulesRef(arg1, '1');
        });
    });

    this.When(/^Trial Status Transition Rules is a Web Link "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
        trialStatus.verifyTransitionRulesRef(arg1, '2');
        transRlsLink = ''+arg1+'';
        });
    });

    this.When(/^I have clicked on the Trial Status Transition Rules text$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.clickLinkText(transRlsLink);
        });
    });

    this.Then(/^the Trial Status Transition Rules user guide page will be displayed$/, function () {
        return browser.sleep(25).then(function() {
        var wikiPageTitle = 'Trial Status Transition Rules';
        trialStatus.verifyWikiTitle(wikiPageTitle);
        });
    });

    /*
     Scenario: #5 PA Trial Status Rules for Start and Completion Dates Rules
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And I can view the Trial Status Rules for Start and Completion DatesRules Information text "Please refer to the Trial Status Rules for Start and Completion Dates Rules:" displayed in the Trial Dates section
     And the Trial Status Rules for Start and Completion Dates Rules is a Web Link "https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Rules+for+Start+and+Completion+Dates"
     When I have clicked on the Trial Status Rules for Start and Completion Dates text
     Then the Trial Status Rules for Start and Completion Dates Rules user guide page will be displayed
     */

    this.Given(/^I can view the Trial Status Rules for Start and Completion DatesRules Information text "([^"]*)" displayed in the Trial Dates section$/, function (arg1) {
        return browser.sleep(25).then(function() {
        trialStatus.verifyDatesRulesRef(arg1, '1');
        });
    });

    this.Given(/^the Trial Status Rules for Start and Completion Dates Rules is a Web Link "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
        trialStatus.verifyDatesRulesRef(arg1, '2');
        dateRlsLink = ''+arg1+'';
        });
    });

    this.When(/^I have clicked on the Trial Status Rules for Start and Completion Dates text$/, function () {
        return browser.sleep(25).then(function() {
        commonFunctions.clickLinkText(dateRlsLink);
        });
    });

    this.Then(/^the Trial Status Rules for Start and Completion Dates Rules user guide page will be displayed$/, function () {
        return browser.sleep(25).then(function() {
        var wikiPageTitle = 'Trial Status Rules for Start and Completion Dates';
        trialStatus.verifyWikiTitle(wikiPageTitle);
        });
    });

    /*
     Scenario: #6 PA Trial Status Comments (Why Study Stopped?)
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Then the information list appears below the Why Study Stopped?
     |Administratively Complete,Withdrawn,Temporarily Closed to Accrual,Temporarily Closed to Accrual and Intervention|
     */

    this.Then(/^the information list appears below the Why Study Stopped\?$/, function (table) {
        return browser.sleep(25).then(function() {
        var whyStpdTableValues = table.raw();
        var strValHoldReason = '';
        strValHoldReason = whyStpdTableValues.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strValHoldReason +']');
        var hldRsnTableDataSplt = strValHoldReason.toString().split("\n");
        whyStpA = hldRsnTableDataSplt[0];
        whyStpB = hldRsnTableDataSplt[1];
        whyStpC = hldRsnTableDataSplt[2];
        whyStpD = hldRsnTableDataSplt[3];
        trialStatus.selectStatus(whyStpA);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setStatusComment('Status Comment due to: '+ whyStpA + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpA + '');
        helper.wait_for(300);
        trialStatus.selectStatus(whyStpB);
        trialStatus.setStatusComment('Status Comment due to: '+ whyStpB + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpB + '');
        helper.wait_for(300);
        trialStatus.selectStatus(whyStpC);
        trialStatus.setStatusComment('Status Comment due to: '+ whyStpC + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpC + '');
        helper.wait_for(300);
        trialStatus.selectStatus(whyStpD);
        trialStatus.setStatusComment('Status Comment due to: '+ whyStpD + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpD + '');
        });
    });

    /*
     Scenario: #7 PA Trial Status Comments (Trial Status Values)
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Then the information text appears below for each Trial Status when it is selected:
     |In Review - The trial is in development and waiting for final approval.|
     |Approved - Trial has been approved.|
     |Active - The trial is open for Accrual.|
     |Temporarily Closed to Accrual - Trial is temporarily not accruing.|
     |Temporarily Closed to Accrual and Intervention - Trial has been closed to participant accrual. No participants are receiving treatment/intervention, but participants are still being followed according to the primary objectives of the study.|
     |Closed to Accrual - Trial has been closed to participant accrual. Participants are still receiving treatment/intervention.|
     |Closed to Accrual and Intervention - Trial is temporarily not accruing. Participants are not receiving intervention.|
     |Complete - Trial has been closed to accrual; participants have completed treatment/intervention, and the study has met its primary objectives.|
     |Administratively Complete - Trial has been completed prematurely (for example, due to poor accrual, insufficient drug supply, IND closure, etc.)|
     |Withdrawn - Trial has been withdrawn from development and review.|
     |Available - Currently available for this treatment|
     |No longer available - Was available for this treatment previously but is not currently available and will not be available in the future|
     |Temporarily not available - Not currently available for this treatment, but is expected to be available in the future|
     |Approved for marketing - Treatment has been approved for sale to the public.|
     */

    this.Then(/^the information text appears below for each Trial Status when it is selected:$/, function (table) {
        return browser.sleep(25).then(function() {
        var statusTxtTableValues = table.raw();
        txtA = statusTxtTableValues[0];
        txtB = statusTxtTableValues[1];
        txtC = statusTxtTableValues[2];
        txtD = statusTxtTableValues[3];
        txtE = statusTxtTableValues[4];
        txtF = statusTxtTableValues[5];
        txtG = statusTxtTableValues[6];
        txtH = statusTxtTableValues[7];
        txtI = statusTxtTableValues[8];
        txtJ = statusTxtTableValues[9];
        var txtAStts = txtA.toString().split(" - ");
        var txtBStts = txtB.toString().split(" - ");
        var txtCStts = txtC.toString().split(" - ");
        var txtDStts = txtD.toString().split(" - ");
        var txtEStts = txtE.toString().split(" - ");
        var txtFStts = txtF.toString().split(" - ");
        var txtGStts = txtG.toString().split(" - ");
        var txtHStts = txtH.toString().split(" - ");
        var txtIStts = txtI.toString().split(" - ");
        var txtJStts = txtJ.toString().split(" - ");
        console.log('txtAStts'+txtAStts[0]);
        var trialStatusPageBody = trialStatus.trialStatusPage;
        trialStatus.selectStatus(txtAStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtAStts[1]);
        trialStatus.selectStatus(txtBStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtBStts[1]);
        trialStatus.selectStatus(txtCStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtCStts[1]);
        trialStatus.selectStatus(txtDStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtDStts[1]);
        trialStatus.selectStatus(txtEStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtEStts[1]);
        trialStatus.selectStatus(txtFStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtFStts[1]);
        trialStatus.selectStatus(txtGStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtGStts[1]);
        trialStatus.selectStatus(txtHStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtHStts[1]);
        trialStatus.selectStatus(txtIStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtIStts[1]);
        trialStatus.selectStatus(txtJStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtJStts[1]);
        });
    });

    /*
     Scenario: #8 PA Trial Status Why Study Stopped? field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Then information text appears below the Why Study Stopped? field to display the number of characters available to enter into the field.
     |160 characters left|
     */

    this.Then(/^information text appears below the Why Study Stopped\? field to display the number of characters available to enter into the field\.$/, function (table) {
        return browser.sleep(25).then(function() {
        var expChaLeft = '132 characters left';
        var actChaLeft = 'Comment characters left test';
        var cmntCharaLftTableValues = table.raw();
        txtA = cmntCharaLftTableValues[0];
        console.log('Comment Total Characters Left Checkpoint: '+txtA);
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setStatusComment(actChaLeft);
        helper.wait_for(300);
        var commentCharLft = trialStatus.commentCharaLeft;
        expect(commentCharLft.getText()).to.eventually.contain(expChaLeft);
        //trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpA + '');
        });
    });

    /*
     Scenario: #9 PA Trial Status Comments field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Then information text appears below the Comments field to display the number of characters available to enter into the field.
     |160 characters left|
     */

    this.Then(/^information text appears below the Comments field to display the number of characters available to enter into the field\.$/, function (table) {
        return browser.sleep(25).then(function() {
        var expChaLeft = '122 characters left';
        var actChaLeft = 'Why Study Stopped characters left test';
        var whyCharaLftTableValues = table.raw();
        txtA = whyCharaLftTableValues[0];
        console.log('Why Study Stopped Total Characters Left Checkpoint: '+txtA);
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setWhyStudyStopped(actChaLeft);
        helper.wait_for(300);
        var commentCharLft = trialStatus.whyStdyCharaLeft;
        expect(commentCharLft.getText()).to.eventually.contain(expChaLeft);
        //trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpA + '');
        });
    });

    /*
     Scenario: #10 I can not enter an invalid trial status for a non-expanded access trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected trail
     And the Clinical Research Category is not Expanded Access
     Then the trial status will not be selectable:
     |Available |
     |No longer available|
     |Temporarily not available|
     |Approved for marketing|
     */

    this.Given(/^the Clinical Research Category is not Expanded Access$/, function () {
        return browser.sleep(25).then(function() {
        console.log('Expanded Access');
        });
    });

    this.Then(/^the trial status will not be selectable:$/, function (table) {
        return browser.sleep(25).then(function() {
        var dfltStatus = 'Select a status';
        var statusTableValues = table.raw();
        stsA = statusTableValues[0];
        stsB = statusTableValues[1];
        stsC = statusTableValues[2];
        stsD = statusTableValues[3];
        trialStatus.selectDisableStatus(stsA);
        helper.getVerifyListValue(trialStatus.statuesesStatus, dfltStatus, 'Verifying default value');
        trialStatus.selectDisableStatus(stsB);
        helper.getVerifyListValue(trialStatus.statuesesStatus, dfltStatus, 'Verifying default value');
        trialStatus.selectDisableStatus(stsC);
        helper.getVerifyListValue(trialStatus.statuesesStatus, dfltStatus, 'Verifying default value');
        trialStatus.selectDisableStatus(stsD);
        helper.getVerifyListValue(trialStatus.statuesesStatus, dfltStatus, 'Verifying default value');
        });
    });

    /*
     Scenario: #11 Selection of Primary Completion Date Type "NA" - DCP
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected trail
     And I have selected the Primary Completion Date
     And I have selected the Primary Completion Date Type  "NA"
     And the trial does not have a DCP Trial Identifier
     And I select Save
     Then an Error will be displayed "Primary Completion Date Type of NA is only available for DCP Trials"
     */

    this.Given(/^I have selected the Primary Completion Date$/, function () {
        return browser.sleep(25).then(function() {
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.clickAddTrialStatus();
        trialStatus.verifyTrialStatusTblHdr();
        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplitB = pastDate.toString().split("-");
        pstDateDay = dateSplitB[0];
        pstDateMonth = dateSplitB[1];
        pstDateYear = dateSplitB[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        });
    });

    this.Given(/^I have selected the Primary Completion Date Type  "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
        futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
        console.log('Next two month ahead future date: '+futureDateTwoMonth);
        var dateSplitC = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitC[0];
        futrDateMonth = dateSplitC[1];
        futrDateYear = dateSplitC[2];
        trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, arg1);
        });
    });

    this.Given(/^the trial does not have a DCP Trial Identifier$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.clickSave();
        });
    });

    this.Then(/^an Error will be displayed "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
        //var anError = 'Primary Completion Date Type of "NA" is only available for DCP Trials';
        var anError = arg1.toString().replace(/NA/g, '"NA"', -1);
        console.log('anError: '+anError);
        trialStatus.primaryCompletionDateNAErr.getText().then(function(text){
            console.log('text: '+text);
            if (anError === text){
                helper.getVerifyRequired(trialStatus.primaryCompletionDateNAErr, anError, 'Verifying'+anError+'');
            } else {
                helper.getVerifyRequired(trialStatus.primaryCompletionDateNAErr, anError, 'Unable to Verifying'+anError+'');
            }
        });
        });
    });

    /*
     Scenario: #12 Selection of Primary Completion Date Type "NA" - Non Interventional
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected a Interventional trail
     And I have selected the Primary Completion Date
     And I have selected the Primary Completion Date Type  "NA"
     And the trial is Interventional
     And I select Save
     Then an Error will be displayed "Primary Completion Date Type of NA is only available for Non-Interventional Trials"
     */

    this.Given(/^I have selected a Interventional trail$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.clickBackToSearchResults();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDB);
        commonFunctions.selectMultiListItem(pageSearchTrail.searchTrialResearchCategory, 'Interventional', '9');
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDB);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialStatus();
        trialCollaborators.waitForElement(trialStatus.statuesesStatusDate , "Trial Status Screen");
        });
    });

    this.Given(/^the trial is Interventional$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.researchCategory.getText().then(function(text){
            console.log('text: '+text);
            helper.getVerifyRequired(trialStatus.researchCategory, 'Interventional', 'Verifying the trial research category as Interventional');
        });
        });
    });

    /*
     Scenario: #13 Selection of Primary Completion Date - DCP
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected trail
     And I have not entered a Primary Completion Date
     And the trial does not have a DCP Trial Identifier
     And I select Save
     Then an Error will be displayed "Primary Completion Date is Required"

     Updated:

     Scenario: #13 Selection of Primary Completion Date - DCP
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And I have selected the trial that does not have a DCP Trial Identifier
     And I have not entered a Primary Completion Date
     And I select Save
     Then the system displayed an Error "Primary Completion Date is Required"
     */

    this.Given(/^I have selected the trial that does not have a DCP Trial Identifier$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.clickBackToSearchResults();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialStatus();
        trialCollaborators.waitForElement(trialStatus.statuesesStatusDate , "Trial Status Screen");
        });
    });

    this.Given(/^I have not entered a Primary Completion Date$/, function () {
        return browser.sleep(25).then(function() {
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.clickAddTrialStatus();
        trialStatus.verifyTrialStatusTblHdr();

        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplitB = pastDate.toString().split("-");
        pstDateDay = dateSplitB[0];
        pstDateMonth = dateSplitB[1];
        pstDateYear = dateSplitB[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        });
    });

    this.Then(/^the system displayed an Error "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
        //var anError = 'Primary Completion Date Type is Required';
        var anError = ''+arg1+' for Interventional trial';
        console.log('anError: '+anError);
        trialStatus.primaryCompletionDateErr.getText().then(function(text){
            console.log('text: '+text);
            if (anError === text){
                helper.getVerifyRequired(trialStatus.primaryCompletionDateErr, anError, 'Verifying'+anError+'');
            } else {
                helper.getVerifyRequired(trialStatus.primaryCompletionDateErr, anError, 'Unable to Verifying'+anError+'');
            }
        });
        });
    });

    /*
     Scenario: #14 Selection of Primary Completion Date Non Interventional
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And I have selected the trial that is interventional
     And I have not entered a Primary Completion Date
     And I select Save
     Then the system displayed an Error "Primary Completion Date Type is required"
     */

    this.Given(/^I have selected the trial that is interventional$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.clickBackToSearchResults();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialStatus();
        trialCollaborators.waitForElement(trialStatus.statuesesStatusDate , "Trial Status Screen");
        trialStatus.researchCategory.getText().then(function(text){
            console.log('text: '+text);
            helper.getVerifyRequired(trialStatus.researchCategory, 'Interventional', 'Verifying the trial research category as Interventional');
        });
        });
    });

    /*
     Scenario: #15 Start Date not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And I have selected the trial that is interventional
     And I have not entered a Start Date
     And I select Save
     Then the system displayed an Error "Start Date is Required"
     */

    this.Given(/^I have not entered a Start Date$/, function () {
        return browser.sleep(25).then(function() {
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.clickAddTrialStatus();
        trialStatus.verifyTrialStatusTblHdr();

        futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
        console.log('Next two month ahead future date: '+futureDateTwoMonth);
        var dateSplitC = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitC[0];
        futrDateMonth = dateSplitC[1];
        futrDateYear = dateSplitC[2];
        trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');

        var dateSplitD = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitD[0];
        futrDateMonth = dateSplitD[1];
        futrDateYear = dateSplitD[2];
        trialStatus.setCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');
        });
    });

    this.Then(/^an Error "([^"]*)" displayed$/, function (arg1) {
        return browser.sleep(25).then(function() {
        if (arg1 === 'Start date is Required'){
            commonFunctions.verifyTxtByIndex(trialStatus.trialStartDateErr, arg1, '0', 'Trial Start Date required error verification');
        } else if(arg1 === 'Start Date Type is Required'){
            commonFunctions.verifyTxtByIndex(trialStatus.trialStartDateErr, arg1, '0', 'Trial Start Date Type required error verification');
        } else{
            commonFunctions.verifyTxtByIndex(trialStatus.trialStartDateErr, arg1, '0', 'Trial Start Date required error verification');
        }
        });
    });

    /*
     Scenario: #16 Start Date Type not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected trail
     And I have not entered a Start Date Type
     And I select Save
     Then an Error "Start Date Type is Required" displayed
     */

    this.Given(/^I have not entered a Start Date Type$/, function () {
        return browser.sleep(25).then(function() {
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.clickAddTrialStatus();
        trialStatus.verifyTrialStatusTblHdr();

        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplitB = pastDate.toString().split("-");
        pstDateDay = dateSplitB[0];
        pstDateMonth = dateSplitB[1];
        pstDateYear = dateSplitB[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, '');

        futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
        console.log('Next two month ahead future date: '+futureDateTwoMonth);
        var dateSplitC = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitC[0];
        futrDateMonth = dateSplitC[1];
        futrDateYear = dateSplitC[2];
        trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');

        var dateSplitD = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitD[0];
        futrDateMonth = dateSplitD[1];
        futrDateYear = dateSplitD[2];
        trialStatus.setCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');
        });
    });

    /*
     Scenario Outline: #17 Trial Status Transition Rules - Statuszero
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And I have selected the trial and trial status is <trialStatus>
     When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed

     |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                             |
     |STATUSZERO	                                    |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                            |
     |STATUSZERO	                                    |In Review	                                    |			        |yes    |                                                                                                                                                                                                                                                                            |
     |STATUSZERO	                                    |Approved	                                    |		            |yes    | WARNING: Interim status [In Review] is missing	                                                                                                                                                                                                                         |
     |STATUSZERO	                                    |Withdrawn	                                    |Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                             |
     |STATUSZERO	                                    |Active	                                        |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                             |
     |STATUSZERO	                                    |Enrolling by Invitation	                    |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                             |
     |STATUSZERO                                       |Closed to Accrual	                            |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                             |
     |STATUSZERO	                                    |Closed to Accrual and Intervention	            |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                     |
     |STATUSZERO	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                             |
     |STATUSZERO	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                         |
     |STATUSZERO	                                    |Complete	                                    |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing|
     |STATUSZERO	                                    |Administratively Complete	                    |Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing|
     */

    this.Given(/^I have selected the trial and trial status is (.*)$/, function (statusTrial) {
        return browser.sleep(25).then(function() {
            trialStatus.clickBackToSearchResults();
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDE);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickLinkText(leadProtocolIDE);
            commonFunctions.adminCheckOut();
            trialDoc.clickAdminDataTrialStatus();
            trialCollaborators.waitForElement(trialStatus.statuesesStatusDate, "Trial Status Screen");
            trialStatus.trialStatusTbleExists.isDisplayed().then(function (dispC) {
                console.log('Trial Status Table Exists: ' + dispC);
                if (dispC) {
                    trialStatus.findTrialStatusToDel('delete');
                }
            });
            pastDate = trialDoc.getPastDate();
            console.log('future date: ' + futureDate);
            var dateSplitB = pastDate.toString().split("-");
            pstDateDay = dateSplitB[0];
            pstDateMonth = dateSplitB[1];
            pstDateYear = dateSplitB[2];
            trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');

            futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
            console.log('Next two month ahead future date: ' + futureDateTwoMonth);
            var dateSplitC = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplitC[0];
            futrDateMonth = dateSplitC[1];
            futrDateYear = dateSplitC[2];
            trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');
            trialStatus.clickSave();
        });
    });

    this.When(/^I add a trial status from (.*) to trial status (.*) along with why study stopped reason (.*) and same day rule (.*) the respective checks (.*) will be displayed$/, function (statusFrom, statusTo, whyStudyStopped, Sameday, errorsWarnings, table) {
        return browser.sleep(25).then(function() {
            statusTable = table.hashes();
            for (var i = 0; i < statusTable.length; i++) {
                var convErrorsWarningsString = statusTable[i].errorsWarnings.toString().replace(/\\n/g, "\n", -1);
                console.log('****** Error Warning String *****');
                console.log(convErrorsWarningsString);
                console.log('*********************************');

                if (statusTable[i].statusFrom === 'STATUSZERO') {
                    if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'STATUSZERO') {
                        helper.verifyElementDisplayed(trialStatus.trialStatusTble, false);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusToA = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'STATUSZERO' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        deleteTrialStatus();
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                    }
                    /*
                     |statusFrom	                                |statusTo	                                    |whyStudyStopped   |Sameday |errorsWarnings	                                                                                                                                                                                                                       |
                     |In Review	                                    |STATUSZERO	                                    |			       |yes     |                                                                                                                                                                                                                                      |
                     |In Review	                                    |In Review	                                    |			       |yes     |ERROR: Duplicate [In Review] status is not allowed	                                                                                                                                                                                   |
                     |In Review	                                    |Approved	                                    |			       |yes     |                                                                                                                                                                                                                                      |
                     |In Review	                                    |Withdrawn	                                    |Add Stopped Reason|yes	    |                                                                                                                                                                                                                                      |
                     |In Review	                                    |Active                                       	|			       |yes     |WARNING: Interim status [Approved] is missing                                                                                                                                                                                         |
                     |In Review	                                    |Enrolling by Invitation                        |			       |yes     |WARNING: Interim status [Approved] is missing                                                                                                                                                                                         |
                     |In Review	                                    |Closed to Accrual                            	|			       |yes     |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                           |
                     |In Review	                                    |Closed to Accrual and Intervention	            |			       |yes     |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                   |
                     |In Review	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason|yes	    |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                           |
                     |In Review	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason|yes	    |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing                                                                        |
                     |In Review	                                    |Complete	                                    |			       |yes     |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing           |
                     |In Review	                                    |Administratively Complete	                    |Add Stopped Reason|yes	    |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	       |

                     */
                } else if (statusTable[i].statusFrom === 'In Review') {
                    if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'In Review') {
                        //var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        //deleteTrialStatus();
                        //statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'In Review' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('In Review convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                        |
                     |Approved	                                        |STATUSZERO                                   	|			        |yes    |                                                                                                                                                                                                                                                                           |
                     |Approved	                                        |In Review	                                    |			        |yes    |ERROR: Invalid status transition from [Approved] to [In Review] 	                                                                                                                                                                                                    |
                     |Approved	                                        |Approved	                                    |			        |yes    |ERROR: Duplicate [Approved] status is not allowed	                                                                                                                                                                                                                    |
                     |Approved	                                        |Withdrawn	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
                     |Approved	                                        |Active	                                        |			        |yes    |                                                                                                                                                                                                                                                                           |
                     |Approved	                                        |Enrolling by Invitation	                    |			        |yes    |                                                                                                                                                                                                                                                                           |
                     |Approved	                                        |Closed to Accrual	                            |			        |yes    |WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                        |
                     |Approved	                                        |Closed to Accrual and Intervention	            |			        |yes    |WARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                |
                     |Approved	                                        |Temporarily Closed to Accrual  	            |Add Stopped Reason	|yes    |WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                        |
                     |Approved	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                                                                                                                    |
                     |Approved	                                        |Complete	                                    |			        |yes    |ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                            |
                     |Approved	                                        |Administratively Complete	                    |Add Stopped Reason	|yes    |ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                              |

                     */
                } else if (statusTable[i].statusFrom === 'Approved') {
                    if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Approved convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                |statusTo	                                    |whyStudyStopped    |Sameday   |errorsWarnings	                                                                                                                                               |
                     |Withdrawn	                                    |STATUSZERO	                                    |Add Stopped Reason |yes       |                                                                                                                                                               |
                     |Withdrawn	                                    |In Review	                                    |Add Stopped Reason |yes       |ERROR: Invalid status transition from [Withdrawn] to [In Review] 	                                                                                           |
                     |Withdrawn	                                    |Approved                                     	|Add Stopped Reason	|yes       |ERROR: Invalid status transition from [Withdrawn] to [Approved] 	                                                                                           |
                     |Withdrawn	                                    |Withdrawn	                                    |Add Stopped Reason	|yes       |ERROR: Duplicate [Withdrawn] status is not allowed	                                                                                                           |
                     |Withdrawn	                                    |Active	                                        |Add Stopped Reason	|yes       |ERROR: Invalid status transition from [Withdrawn] to [Active]	                                                                                               |
                     |Withdrawn	                                    |Enrolling by Invitation	                    |Add Stopped Reason	|yes       |ERROR: Invalid status transition from [Withdrawn] to [Enrolling by Invitation]	                                                                               |
                     |Withdrawn	                                    |Closed to Accrual	                            |Add Stopped Reason	|yes       |ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual]	                                                                                   |
                     |Withdrawn	                                    |Closed to Accrual and Intervention	            |Add Stopped Reason	|yes       |ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual and Intervention]                                                                     |
                     |Withdrawn	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|yes       |ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual]	                                                                       |
                     |Withdrawn	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes       |ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual and Intervention]                                                         |
                     |Withdrawn	                                    |Complete	                                    |Add Stopped Reason	|yes       |ERROR: Invalid status transition from [Withdrawn] to [Complete]	                                                                                           |
                     |Withdrawn	                                    |Administratively Complete	                    |Add Stopped Reason	|yes       |ERROR: Invalid status transition from [Withdrawn] to [Administratively Complete]	                                                                                                                                                                                            |
                     */
                } else if (statusTable[i].statusFrom === 'Withdrawn') {
                    if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Withdrawn' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Withdrawn convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
                     |Active	                                        |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                           |
                     |Active	                                        |In Review	                                    |			        |yes    |ERROR: Invalid status transition from [Active] to [In Review]	                                                                                                                                                                                                                |
                     |Active	                                        |Approved	                                    |			        |yes    |ERROR: Invalid status transition from [Active] to [Approved]	                                                                                                                                                                                                                |
                     |Active	                                        |Withdrawn	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
                     |Active	                                        |Active	                                        |			        |yes    |ERROR: Duplicate [Active] status is not allowed	                                                                                                                                                                                                                            |
                     |Active	                                        |Enrolling by Invitation	                    |			        |yes    |ERROR: Invalid status transition from [Active] to [Enrolling by Invitation]	                                                                                                                                                                                                |
                     |Active	                                        |Closed to Accrual	                            |			        |no     |WARNING: Statuses [Active] and [Closed to Accrual] have the same date                                                                                                                                                                                      |
                     |Active	                                        |Closed to Accrual and Intervention             |			        |no     |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Statuses [Active] and [Closed to Accrual and Intervention] have the same date                                                                                                                |
                     |Active	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|no     |WARNING: Statuses [Active] and [Temporarily Closed to Accrual] have the same date  	                                                                                                                                                                        |
                     |Active	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|no     |WARNING: Statuses [Active] and [Temporarily Closed to Accrual and Intervention] have the same date                                                                                                                                                         |
                     |Active	                                        |Complete	                                    |			        |yes    |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |
                     |Active	                                        |Administratively Complete	                    |Add Stopped Reason	|yes    |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
                     */
                } else if (statusTable[i].statusFrom === 'Active') {
                    if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Active convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday   |errorsWarnings	                                                                                                                                                                                                                                                                |
                     |Enrolling by Invitation	                        |STATUSZERO	                                    |			        |yes       |                                                                                                                                                                                                                                                                        |
                     |Enrolling by Invitation	                        |In Review	                                    |			        |yes       |ERROR: Invalid status transition from [Enrolling by Invitation] to [In Review]	                                                                                                                                                                                                |
                     |Enrolling by Invitation	                        |Approved	                                    |			        |yes       |ERROR: Invalid status transition from [Enrolling by Invitation] to [Approved]	                                                                                                                                                                                                |
                     |Enrolling by Invitation	                        |Withdrawn	                                    |Add Stopped Reason	|yes       |                                                                                                                                                                                                                                                                        |
                     |Enrolling by Invitation	                        |Active	                                        |			        |yes       |ERROR: Invalid status transition from [Enrolling by Invitation] to [Active]                                                                                                                                                                                                    |
                     |Enrolling by Invitation	                        |Enrolling by Invitation	                    |			        |yes       |ERROR: Duplicate [Enrolling by Invitation] status is not allowed	                                                                                                                                                                                                            |
                     |Enrolling by Invitation	                        |Closed to Accrual	                            |			        |no        |WARNING: Statuses [Enrolling by Invitation] and [Closed to Accrual] have the same date                                                                                                                                                                                                                                                                        |
                     |Enrolling by Invitation	                        |Closed to Accrual and Intervention             |			        |no        |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Statuses [Enrolling by Invitation] and [Closed to Accrual and Intervention] have the same date 	                                                                                                                                                                                                                        |
                     |Enrolling by Invitation	                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|no        |WARNING: Statuses [Enrolling by Invitation] and [Temporarily Closed to Accrual] have the same date                                                                                                                                                                                                                                                                       |
                     |Enrolling by Invitation	                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|no        |WARNING: Statuses [Enrolling by Invitation] and [Temporarily Closed to Accrual and Intervention] have the same date                                                                                                                                                                                                                                                                       |
                     |Enrolling by Invitation	                        |Complete	                                    |			        |yes       |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
                     |Enrolling by Invitation	                        |Administratively Complete	                    |Add Stopped Reason	|yes       |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
                     */
                } else if (statusTable[i].statusFrom === 'Enrolling by Invitation') {
                    if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Enrolling by Invitation' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Enrolling by Invitation convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
                     |Closed to Accrual	                            |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                           |
                     |Closed to Accrual	                            |In Review	                                    |			        |yes    |ERROR: Invalid status transition from [Closed to Accrual] to [In Review]	                                                                                                                                                                                                    |
                     |Closed to Accrual                             |Approved	                                    |			        |yes    |ERROR: Invalid status transition from [Closed to Accrual] to [Approved]	                                                                                                                                                                                                    |
                     |Closed to Accrual                            	|Withdrawn	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                                    |
                     |Closed to Accrual                            	|Active	                                        |			        |yes    |ERROR: Invalid status transition from [Closed to Accrual] to [Active]	                                                                                                                                                                                                        |
                     |Closed to Accrual                            	|Enrolling by Invitation	                    |			        |yes    |ERROR: Invalid status transition from [Closed to Accrual] to [Enrolling by Invitation]	                                                                                                                                                                                        |
                     |Closed to Accrual                            	|Closed to Accrual	                            |			        |yes    |ERROR: Duplicate [Closed to Accrual] status is not allowed 	                                                                                                                                                                                                                |
                     |Closed to Accrual                            	|Closed to Accrual and Intervention             |			        |yes    |                                                                                                                                                                                                                                                                               |
                     |Closed to Accrual	                            |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual]	                                                                                                                                                                                |
                     |Closed to Accrual	                            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                |
                     |Closed to Accrual	                            |Complete	                                    |			        |yes    |WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |
                     |Closed to Accrual	                            |Administratively Complete	                    |Add Stopped Reason	|yes    |WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |
                     */
                } else if (statusTable[i].statusFrom === 'Closed to Accrual') {
                    if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
                     |Closed to Accrual and Intervention	            |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                          |
                     |Closed to Accrual and Intervention	            |In Review	                                    |			        |yes    |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                                    |
                     |Closed to Accrual and Intervention	            |Approved	                                    |			        |yes    |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                                    |
                     |Closed to Accrual and Intervention	            |Withdrawn	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                                    |
                     |Closed to Accrual and Intervention	            |Active	                                        |			        |yes    |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Active]	                                                                                                                                                                                        |
                     |Closed to Accrual and Intervention	            |Enrolling by Invitation	                    |			        |yes    |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Enrolling by Invitation]	                                                                                                                                                                    |
                     |Closed to Accrual and Intervention	            |Closed to Accrual	                            |			        |yes    |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Closed to Accrual]	                                                                                                                                                                            |
                     |Closed to Accrual and Intervention	            |Closed to Accrual and Intervention             |			        |yes    |ERROR: Duplicate [Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                                |
                     |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                                |
                     |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                 |
                     |Closed to Accrual and Intervention	            |Complete	                                    |			        |yes    |                                                                                                                                                                                                                                                                        |
                     |Closed to Accrual and Intervention	            |Administratively Complete	                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                        |
                     */
                } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                    if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
                     |Temporarily Closed to Accrual                  	|STATUSZERO	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                            |
                     |Temporarily Closed to Accrual                  	|In Review	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [In Review]	                                                                                                                                                                                        |
                     |Temporarily Closed to Accrual                  	|Approved	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Approved]	                                                                                                                                                                                        |
                     |Temporarily Closed to Accrual                  	|Withdrawn	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                        |
                     |Temporarily Closed to Accrual                  	|Active	                                        |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                                 |
                     |Temporarily Closed to Accrual                  	|Enrolling by Invitation	                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                                |
                     |Temporarily Closed to Accrual                  	|Closed to Accrual	                            |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
                     |Temporarily Closed to Accrual  	                |Closed to Accrual and Intervention             |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
                     |Temporarily Closed to Accrual                  	|Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |ERROR: Duplicate [Temporarily Closed to Accrual] status is not allowed	                                                                                                                                                                                                        |
                     |Temporarily Closed to Accrual  	                |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
                     |Temporarily Closed to Accrual  	                |Complete	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Complete]	                                                                                                                                                                                        |
                     |Temporarily Closed to Accrual  	                |Administratively Complete	                    |Add Stopped Reason	|yes    |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |
                     */
                } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                    if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday  |errorsWarnings	                                                                                                                                                                                                                                                                |
                     |Temporarily Closed to Accrual and Intervention	|STATUSZERO	                                    |Add Stopped Reason	|yes      |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing                                                                                                                                                                                                                                                                         |
                     |Temporarily Closed to Accrual and Intervention	|In Review	                                    |Add Stopped Reason	|yes      |ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                        |
                     |Temporarily Closed to Accrual and Intervention	|Approved	                                    |Add Stopped Reason	|yes      |ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                        |
                     |Temporarily Closed to Accrual and Intervention	|Withdrawn	                                    |Add Stopped Reason	|yes      |ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                        |
                     |Temporarily Closed to Accrual and Intervention	|Active	                                        |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
                     |Temporarily Closed to Accrual and Intervention	|Enrolling by Invitation	                    |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
                     |Temporarily Closed to Accrual and Intervention	|Closed to Accrual	                            |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
                     |Temporarily Closed to Accrual and Intervention	|Closed to Accrual and Intervention             |Add Stopped Reason	|yes      |WARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                                                                        |
                     |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual                  |Add Stopped Reason	|yes      |ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                    |
                     |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes      |ERROR: Duplicate [Temporarily Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                    |
                     |Temporarily Closed to Accrual and Intervention	|Complete	                                    |Add Stopped Reason	|yes      |ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Complete]	                                                                                                                                                                        |
                     |Temporarily Closed to Accrual and Intervention	|Administratively Complete	                    |Add Stopped Reason	|yes      |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
                     */
                } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                    if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Temporarily Closed to Accrual and Intervention convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday |errorsWarnings	                                                                                                                                                                                                                                                                |
                     |Complete	                                        |STATUSZERO	                                    |			        |yes     |                                                                                                                                                                                                                                                                           |
                     |Complete	                                        |In Review	                                    |			        |yes     |ERROR: Invalid status transition from [Complete] to [In Review]	                                                                                                                                                                                                            |
                     |Complete                                    	    |Approved	                                    |			        |yes     |ERROR: Invalid status transition from [Complete] to [Approved]	                                                                                                                                                                                                                |
                     |Complete                                    	    |Withdrawn	                                    |Add Stopped Reason	|yes     |ERROR: Invalid status transition from [Complete] to [Withdrawn]	                                                                                                                                                                                                            |
                     |Complete                                    	    |Active	                                        |			        |yes     |ERROR: Invalid status transition from [Complete] to [Active]	                                                                                                                                                                                                                |
                     |Complete	                                        |Enrolling by Invitation	                    |			        |yes     |ERROR: Invalid status transition from [Complete] to [Enrolling by Invitation]	                                                                                                                                                                                                |
                     |Complete	                                        |Closed to Accrual	                            |			        |yes     |ERROR: Invalid status transition from [Complete] to [Closed to Accrual]	                                                                                                                                                                                                    |
                     |Complete	                                        |Closed to Accrual and Intervention             |			        |yes     |ERROR: Invalid status transition from [Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                                       |
                     |Complete	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes     |ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                                        |
                     |Complete	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes     |ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                           |
                     |Complete	                                        |Complete	                                    |			        |yes     |ERROR: Duplicate [Complete] status is not allowed	                                                                                                                                                                                                                            |
                     |Complete	                                        |Administratively Complete	                    |Add Stopped Reason	|yes     |ERROR: Invalid status transition from [Complete] to [Administratively Complete]	                                                                                                                                                                                            |
                     */
                } else if (statusTable[i].statusFrom === 'Complete') {
                    if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Complete' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                    /*
                     |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
                     |Administratively Complete	                    |STATUSZERO	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
                     |Administratively Complete	                    |In Review	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [In Review]	                                                                                                                                                                                            |
                     |Administratively Complete	                    |Approved	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [Approved]	                                                                                                                                                                                            |
                     |Administratively Complete	                    |Withdrawn	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [Withdrawn]	                                                                                                                                                                                            |
                     |Administratively Complete	                    |Active	                                        |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [Active]	                                                                                                                                                                                                |
                     |Administratively Complete	                    |Enrolling by Invitation	                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [Enrolling by Invitation]	                                                                                                                                                                                |
                     |Administratively Complete	                    |Closed to Accrual	                            |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual]	                                                                                                                                                                                    |
                     |Administratively Complete	                    |Closed to Accrual and Intervention             |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                      |
                     |Administratively Complete	                    |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                        |
                     |Administratively Complete	                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual and Intervention]	                                                                                                                                                        |
                     |Administratively Complete	                    |Complete	                                    |Add Stopped Reason	|yes    |ERROR: Invalid status transition from [Administratively Complete] to [Complete]	                                                                                                                                                                                            |
                     |Administratively Complete	                    |Administratively Complete	                    |Add Stopped Reason	|yes    |ERROR: Duplicate [Administratively Complete] status is not allowed	                                                                                                                                                                                                            |
                     */
                } else if (statusTable[i].statusFrom === 'Administratively Complete') {
                    if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'STATUSZERO') {
                        var statusInStatusToA = '' + statusTable[i].statusFrom + '';
                        statusAndTrialsDate(statusInStatusToA, whyStudyStopped);
                        trialStatus.clickSave();
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToA, 'verifyErrors', convErrorsWarningsString);
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'In Review') {
                        var statusInStatusFromB = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToB = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToB, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToB, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromB, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Approved') {
                        var statusInStatusFromC = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToC = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToC, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToC, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromC, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Withdrawn') {
                        var statusInStatusFromD = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToD = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToD, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToD, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromD, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Active') {
                        var statusInStatusFromE = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToE = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToE, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToE, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromE, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Enrolling by Invitation') {
                        var statusInStatusFromF = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToF = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToF, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToF, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromF, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Closed to Accrual') {
                        var statusInStatusFromG = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToG = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToG, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToG, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromG, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Closed to Accrual and Intervention') {
                        var statusInStatusFromH = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToH = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToH, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToH, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromH, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Temporarily Closed to Accrual') {
                        var statusInStatusFromI = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToI = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToI, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToI, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromI, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention') {
                        var statusInStatusFromJ = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToJ = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToJ, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToJ, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromJ, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Complete') {
                        var statusInStatusFromK = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToK = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToK, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        trialStatus.findTrialStatusVerfEdtDel(statusInStatusToK, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromK, whyStudyStopped);
                        trialStatus.clickSave();
                    } else if (statusTable[i].statusFrom === 'Administratively Complete' && statusTable[i].statusTo === 'Administratively Complete') {
                        var statusInStatusFromL = '' + statusTable[i].statusFrom + '';
                        var statusInStatusToL = '' + statusTable[i].statusTo + '';
                        statusAndTrialsDate(statusInStatusToL, whyStudyStopped);
                        trialStatus.clickSave();
                        console.log('Administratively Complete convErrorsWarningsString: ' + convErrorsWarningsString);
                        //errorStatusAlreadyExists = 'Status already exists';
                        commonFunctions.verifyTxtByIndex(trialStatus.statusAlreadyExists, errorStatusAlreadyExists, '0', 'Status already exists error verification');
                        //trialStatus.findTrialStatusVerfEdtDel(statusInStatusToL, 'verifyErrors', convErrorsWarningsString);
                        deleteTrialStatus();
                        trialStatus.clickSave();
                        statusAndTrialsDate(statusInStatusFromL, whyStudyStopped);
                        trialStatus.clickSave();
                    }
                }
            }
            function statusAndTrialsDate(selectStatus, whyStudyStopped) {
                var statusToSelect = '' + selectStatus + '';
                if (statusToSelect === 'Complete') {
                    console.log('Trial Status identified as Complete');
                    trialStatus.selectStatusByXpath(statusToSelect);
                } else if (statusToSelect === 'Administratively Complete') {
                    console.log('Trial Status identified as Administratively Complete');
                    trialStatus.selectStatusByXpath(statusToSelect);
                } else if (statusToSelect === 'Approved') {
                    console.log('Trial Status identified as Approved');
                    trialStatus.selectStatusByXpath(statusToSelect);
                } else if (statusToSelect === 'Closed to Accrual') {
                    console.log('Trial Status identified as Closed to Accrual');
                    trialStatus.selectStatusByXpath(statusToSelect);
                } else {
                    trialStatus.selectStatus(statusToSelect);
                }
                currentDate = trialDoc.getCrrentDte();
                console.log('current date: ' + currentDate);
                var dateSplitA = currentDate.toString().split("-");
                crtnDateDay = dateSplitA[0];
                crntDateMonth = dateSplitA[1];
                crntDateYear = dateSplitA[2];
                trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
                if (whyStudyStopped === 'Add Stopped Reason') {
                    trialStatus.setStatusComment('Status Comment: ' + whyStudyStopped + '');
                    trialStatus.setWhyStudyStopped('Why Study Stopped: ' + whyStudyStopped + '');
                }
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
                trialStatus.setTrialStartDate(crntDateYear, crntDateMonth, crtnDateDay, 'Actual');
                trialStatus.setPrimaryCompletionDate(crntDateYear, crntDateMonth, crtnDateDay, 'Anticipated');
            }

            function deleteTrialStatus() {
                trialStatus.trialStatusTbleExists.isDisplayed().then(function (dispC) {
                    console.log('Trial Status Table Exists: ' + dispC);
                    if (dispC) {
                        trialStatus.findTrialStatusToDel('delete');
                    }
                });
            }
        });
    });

    /*
     Scenario Outline: #18 I can enter a trial status and trial status date for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And the Trial Information source is "Protocol"
     When I add a <status date> and a status <statusType> and explained why study stopped <whyStudyStopped>

     |status date                                            |statusType                                    |whyStudyStopped             |
     |Date Entered                                           |In Review                                     |                            |
     |Future Date based on previous status entered           |Approved                                      | 					         |
     |Future Date based on previous status entered           |Active                                        |                   	     |
     |Future Date based on previous status entered           |Enrolling by invitation                       |                            |
     |Future Date based on previous status entered           |Closed to accrual                             |                            |
     |Future Date based on previous status entered           |Close to accrual and Intervention             |                            |
     |Future Date based on previous status entered           |Temporarily Closed to accrual                 |Text                        |
     |Future Date based on previous status entered           |Temporarily closed to accrual and Intervention|Text                        |
     |Future Date based on previous status entered           |Withdrawn                                     |                            |
     |Future Date based on previous status entered           |Administratively Complete                     |Text                        |
     |Future Date based on previous status entered           |Complete                                      |Text                        |

     Then no errors will be displayed
     */

    this.Given(/^the Trial Information source is (.*)$/, function (sourceTrial) {
        return browser.sleep(25).then(function() {
            trialStatus.clickBackToSearchResults();
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDE);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickLinkText(leadProtocolIDE);
            commonFunctions.adminCheckOut();
            trialDoc.clickAdminDataTrialStatus();
            trialCollaborators.waitForElement(trialStatus.statuesesStatusDate, "Trial Status Screen");
            trialStatus.trialStatusTbleExists.isDisplayed().then(function (dispC) {
                console.log('Trial Status Table Exists: ' + dispC);
                if (dispC) {
                    trialStatus.findTrialStatusToDel('delete');
                }
            });
            pastDate = trialDoc.getPastDate();
            console.log('future date: ' + futureDate);
            var dateSplitB = pastDate.toString().split("-");
            pstDateDay = dateSplitB[0];
            pstDateMonth = dateSplitB[1];
            pstDateYear = dateSplitB[2];
            trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');

            futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
            console.log('Next two month ahead future date: ' + futureDateTwoMonth);
            var dateSplitC = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplitC[0];
            futrDateMonth = dateSplitC[1];
            futrDateYear = dateSplitC[2];
            trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');
            trialStatus.clickSave();
        });
    });

    this.When(/^I add a (.*) and a status (.*) and explained why study stopped (.*)$/, function (statusDate, statusType, whyStudyStopped, table) {
        return browser.sleep(25).then(function() {
        statusTable = table.hashes();
        for (var i = 0; i < statusTable.length; i++) {
            var convStatusDateString = statusTable[i].statusType.toString().replace(/\\n/g, "\n", -1);
            console.log('****** Status Type String *****');
            console.log(convStatusDateString);
            console.log('*********************************');
            if (statusTable[i].statusType === 'In Review'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                currentDate = trialDoc.getCrrentDte();
                console.log('current date: '+currentDate);
                var dateSplitA = currentDate.toString().split("-");
                crtnDateDay = dateSplitA[0];
                crntDateMonth = dateSplitA[1];
                crntDateYear = dateSplitA[2];
                trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            } else if(statusTable[i].statusType === 'Approved'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            } else if(statusTable[i].statusType === 'Active'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            }  else if(statusTable[i].statusType === 'Enrolling by Invitation'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextThreeMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            }  else if(statusTable[i].statusType === 'Closed to Accrual'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextFourMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            } else if(statusTable[i].statusType === 'Closed to Accrual and Intervention'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextFourMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            } else if(statusTable[i].statusType === 'Temporarily Closed to Accrual'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextFiveMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            } else if(statusTable[i].statusType === 'Temporarily Closed to Accrual and Intervention'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextFiveMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            } else if(statusTable[i].statusType === 'Withdrawn'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextFiveMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            } else if(statusTable[i].statusType === 'Administratively Complete'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextFiveMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            } else if(statusTable[i].statusType === 'Complete'){
                var statusToSelect = ''+ statusTable[i].statusType +'';
                trialStatus.selectStatusByXpath(statusToSelect);
                futureDateTwoMonth = trialDoc.getFutureDateNextFiveMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
            }
        }
        trialStatus.clickSave();
        });
    });

    this.Then(/^no errors will be displayed$/, function () {
        return browser.sleep(25).then(function() {
        var noErrorsWarningsString = '';
        trialStatus.findTrialStatusVerfEdtDel('In Review', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Approved', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Active', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Enrolling by Invitation', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Closed to Accrual', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Closed to Accrual and Intervention', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Temporarily Closed to Accrual', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Temporarily Closed to Accrual and Intervention', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Withdrawn', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Administratively Complete', 'verifyErrors', noErrorsWarningsString);
        trialStatus.findTrialStatusVerfEdtDel('Complete', 'verifyErrors', noErrorsWarningsString);
        });
    });

    /*
     Scenario Outline:#19 I can enter a trial status and trial status date for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And the Trial Information source is "Protocol"
     When I add a trial date <statusDateFrom> and trial status from <statusFrom> to trial date <statusDateTo> trial status <statusTo> along with why study stopped reason <whyStudyStopped> the respective checks <errorsWarnings> will be there

     |statusDateFrom   |statusFrom   |statusDateTo                                    |statusTo	    |whyStudyStopped    |errorsWarnings	                                           |
     |Date Entered Now |Approved     |Same Date entered later                         |In Review    |                   |Warning: Invalid Transition from [Approved] to [In Review]|
     |Date Entered Now |Approved     |Different Date in the Future                    |In Review    |                   |Warning: Invalid Transition from [Approved] to [In Review]|
     |Date Entered past|Active       |Date entered Now                                |Aproved      |                   |Warning: Invalid Transition from [Active] to [Approved]   |
     */

    this.When(/^I add a trial date (.*) and trial status from (.*) to trial date (.*) trial status (.*) along with why study stopped reason (.*) the respective checks (.*) will be there$/, function (statusDateFrom, statusFrom, statusDateTo, statusTo, whyStudyStopped, errorsWarnings, table) {
        return browser.sleep(25).then(function() {
        statusTable = table.hashes();
        for (var i = 0; i < statusTable.length; i++) {
            var convErrorsWarningsString = statusTable[i].errorsWarnings.toString().replace(/\\n/g, "\n", -1);
            console.log('****** Status Error String *****');
            console.log(convErrorsWarningsString);
            console.log('*********************************');
            if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'In Review' && statusTable[i].statusDateFrom === 'Date Entered Now' && statusTable[i].statusDateTo === 'Same Date entered later') {
                var statusFromSelect = ''+ statusTable[i].statusFrom +'';
                var statusToSelect = ''+ statusTable[i].statusTo +'';
                //Future Date
                futureDateTwoMonth = trialDoc.getFutureDateNextFiveMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                //Current Date
                currentDate = trialDoc.getCrrentDte();
                console.log('current date: '+currentDate);
                var dateSplitA = currentDate.toString().split("-");
                crtnDateDay = dateSplitA[0];
                crntDateMonth = dateSplitA[1];
                crntDateYear = dateSplitA[2];
                //Past Date
                pastDate = trialDoc.getPastDate();
                console.log('future date: '+futureDate);
                var dateSplitB = pastDate.toString().split("-");
                pstDateDay = dateSplitB[0];
                pstDateMonth = dateSplitB[1];
                pstDateYear = dateSplitB[2];
                //From
                trialStatus.selectStatusByXpath(statusFromSelect);
                trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusFromSelect + '');
                //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
                //To
                trialStatus.selectStatusByXpath(statusToSelect);
                trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
                //Save
                trialStatus.clickSave();
                //Verification
                trialStatus.findTrialStatusVerfEdtDel(statusToSelect, 'verifyErrors', convErrorsWarningsString);
                trialStatus.trialStatusTbleExists.isDisplayed().then(function(dispC){
                    console.log('Trial Status Table Exists: ' + dispC);
                    if (dispC) {
                        trialStatus.findTrialStatusToDel('delete');
                    }
                });
                trialStatus.clickSave();
            } else if (statusTable[i].statusFrom === 'Approved' && statusTable[i].statusTo === 'In Review' && statusTable[i].statusDateFrom === 'Date Entered Now' && statusTable[i].statusDateTo === 'Different Date in the Future') {
                var statusFromSelect = ''+ statusTable[i].statusFrom +'';
                var statusToSelect = ''+ statusTable[i].statusTo +'';
                //Future Date
                futureDateTwoMonth = trialDoc.getFutureDateNextFiveMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                //Current Date
                currentDate = trialDoc.getCrrentDte();
                console.log('current date: '+currentDate);
                var dateSplitA = currentDate.toString().split("-");
                crtnDateDay = dateSplitA[0];
                crntDateMonth = dateSplitA[1];
                crntDateYear = dateSplitA[2];
                //Past Date
                pastDate = trialDoc.getPastDate();
                console.log('future date: '+futureDate);
                var dateSplitB = pastDate.toString().split("-");
                pstDateDay = dateSplitB[0];
                pstDateMonth = dateSplitB[1];
                pstDateYear = dateSplitB[2];
                //From
                trialStatus.selectStatusByXpath(statusFromSelect);
                trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusFromSelect + '');
                //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
                //To
                trialStatus.selectStatusByXpath(statusToSelect);
                trialStatus.setStatusDate(futrDateYear, futrDateMonth, futrDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
                //Save
                trialStatus.clickSave();
                //Verification
                trialStatus.findTrialStatusVerfEdtDel(statusToSelect, 'verifyErrors', convErrorsWarningsString);
                trialStatus.trialStatusTbleExists.isDisplayed().then(function(dispC){
                    console.log('Trial Status Table Exists: ' + dispC);
                    if (dispC) {
                        trialStatus.findTrialStatusToDel('delete');
                    }
                });
                trialStatus.clickSave();
            } else if (statusTable[i].statusFrom === 'Active' && statusTable[i].statusTo === 'Approved' && statusTable[i].statusDateFrom === 'Date Entered past' && statusTable[i].statusDateTo === 'Date entered Now') {
                var statusFromSelect = ''+ statusTable[i].statusFrom +'';
                var statusToSelect = ''+ statusTable[i].statusTo +'';
                //Future Date
                futureDateTwoMonth = trialDoc.getFutureDateNextFiveMonth();
                console.log('future date: '+futureDateTwoMonth);
                var dateSplit = futureDateTwoMonth.toString().split("-");
                futrDateDay = dateSplit[0];
                futrDateMonth = dateSplit[1];
                futrDateYear = dateSplit[2];
                //Current Date
                currentDate = trialDoc.getCrrentDte();
                console.log('current date: '+currentDate);
                var dateSplitA = currentDate.toString().split("-");
                crtnDateDay = dateSplitA[0];
                crntDateMonth = dateSplitA[1];
                crntDateYear = dateSplitA[2];
                //Past Date
                pastDate = trialDoc.getPastDate();
                console.log('future date: '+futureDate);
                var dateSplitB = pastDate.toString().split("-");
                pstDateDay = dateSplitB[0];
                pstDateMonth = dateSplitB[1];
                pstDateYear = dateSplitB[2];
                //From
                trialStatus.selectStatusByXpath(statusFromSelect);
                trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusFromSelect + '');
                //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
                //To
                trialStatus.selectStatusByXpath(statusToSelect);
                trialStatus.setStatusDate(pstDateYear, pstDateMonth, pstDateDay);
                trialStatus.setStatusComment('Status Comment: '+ statusToSelect + '');
                //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
                trialStatus.clickAddTrialStatus();
                trialStatus.verifyTrialStatusTblHdr();
                //Save
                trialStatus.clickSave();
                //Verification
                trialStatus.findTrialStatusVerfEdtDel(statusToSelect, 'verifyErrors', convErrorsWarningsString);
                trialStatus.trialStatusTbleExists.isDisplayed().then(function(dispC){
                    console.log('Trial Status Table Exists: ' + dispC);
                    if (dispC) {
                        trialStatus.findTrialStatusToDel('delete');
                    }
                });
                trialStatus.clickSave();
            }
        }
        });
    });

    /*
     Scenario Outline: #20 Rules for Status/Dates relationships
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And the Trial Information source is "Protocol"
     When Current Trial Status is <TrialStatusType>
     Then The Trial date Type is <DateType>

     Examples:
     |TrialStatusType                          |DateType                                             |
     |Active                                   |Trial Start Date must be Actual                      |
     |Enrolling by Invitation                  |Trial Start Date must be Actual                      |
     |Closed to Accrual                        |Trial Start Date must be Actual                      |
     |Closed to Accrual and Intervention       |Trial Start Date must be Actual                      |
     |Temp Closed to Accrual                   |Trial Start Date must be Actual                      |
     |Temp Closed to Accrual and Intervention  |Trial Start Date must be Actual                      |
     |Complete                                 |All date types must be Actual                        |
     |Administratively Complete                |Trial Start Date must be Actual                      |
     |In Review                                |Trial Start Date could be Actual or Anticipated      |
     |Approved                                 |Trial Start Date could be Actual or Anticipated      |
     */

    this.When(/^Current Trial Status is (.*)$/, function (TrialStatusType) {
        return browser.sleep(25).then(function() {
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.selectStatusByXpath(TrialStatusType);
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setStatusComment('Status Comment: '+ TrialStatusType + '');
        //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
        trialStatus.clickAddTrialStatus();
        trialStatus.clickSave();
        trialStatus.verifyTrialStatusTblHdr();
        });
    });

    this.Then(/^The Trial date Type is (.*)$/, function (DateType) {
        return browser.sleep(25).then(function() {
        if (DateType === 'Trial Start Date must be Actual'){
            pastDate = trialDoc.getPastDate();
            console.log('future date: '+futureDate);
            var dateSplitB = pastDate.toString().split("-");
            pstDateDay = dateSplitB[0];
            pstDateMonth = dateSplitB[1];
            pstDateYear = dateSplitB[2];
            trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');

            futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
            console.log('Next two month ahead future date: '+futureDateTwoMonth);
            var dateSplitC = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplitC[0];
            futrDateMonth = dateSplitC[1];
            futrDateYear = dateSplitC[2];
            trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');

            var dateSplit = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplit[0];
            futrDateMonth = dateSplit[1];
            futrDateYear = dateSplit[2];
            trialStatus.setCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');

            trialStatus.clickSave();

            replaceStartDate = trialDoc.replaceMonth(pastDate);
            replacePrimaryDate = trialDoc.replaceMonth(futureDateTwoMonth);
            replaceCompletionDate = trialDoc.replaceMonth(futureDateTwoMonth);

            trialStatus.verifyTrialDates ('all', replaceStartDate, 'Actual', replacePrimaryDate, 'Anticipated', replaceCompletionDate, 'Anticipated');
        } else if (DateType === 'All date types must be Actual'){
            pastDate = trialDoc.getPastDate();
            console.log('future date: '+futureDate);
            var dateSplitB = pastDate.toString().split("-");
            pstDateDay = dateSplitB[0];
            pstDateMonth = dateSplitB[1];
            pstDateYear = dateSplitB[2];
            trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');

            futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
            console.log('Next two month ahead future date: '+futureDateTwoMonth);
            var dateSplitC = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplitC[0];
            futrDateMonth = dateSplitC[1];
            futrDateYear = dateSplitC[2];
            trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Actual');

            var dateSplit = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplit[0];
            futrDateMonth = dateSplit[1];
            futrDateYear = dateSplit[2];
            trialStatus.setCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Actual');

            trialStatus.clickSave();

            replaceStartDate = trialDoc.replaceMonth(pastDate);
            replacePrimaryDate = trialDoc.replaceMonth(futureDateTwoMonth);
            replaceCompletionDate = trialDoc.replaceMonth(futureDateTwoMonth);
            trialStatus.verifyTrialDates ('all', replaceStartDate, 'Actual', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        } else if (DateType === 'Trial Start Date could be Actual or Anticipated'){
            pastDate = trialDoc.getPastDate();
            console.log('future date: '+futureDate);
            var dateSplitB = pastDate.toString().split("-");
            pstDateDay = dateSplitB[0];
            pstDateMonth = dateSplitB[1];
            pstDateYear = dateSplitB[2];
            trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');

            futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
            console.log('Next two month ahead future date: '+futureDateTwoMonth);
            var dateSplitC = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplitC[0];
            futrDateMonth = dateSplitC[1];
            futrDateYear = dateSplitC[2];
            trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Actual');

            var dateSplit = futureDateTwoMonth.toString().split("-");
            futrDateDay = dateSplit[0];
            futrDateMonth = dateSplit[1];
            futrDateYear = dateSplit[2];
            trialStatus.setCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Actual');
            trialStatus.clickSave();
            trialStatus.setTrialStartDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');
            trialStatus.clickSave();

            replacePastDate = trialDoc.replaceMonth(futureDateTwoMonth);
            replacePrimaryDate = trialDoc.replaceMonth(futureDateTwoMonth);
            replaceCompletionDate = trialDoc.replaceMonth(futureDateTwoMonth);

            trialStatus.verifyTrialDates ('all', replacePastDate, 'Anticipated', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        }
        });
    });

    /*
     Scenario: #21 Rules for Study Date types
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And the Trial Information source is "Protocol"
     When the Trial date is in the past
     Then the Trial date type must be actual
     When  the Trial date is today
     Then the Trial Date type could be actual
     And the Trial date Type could be anticipated
     When the Trial date is in the future
     Then the Trial date type must always be anticipated
     */

    


    /*
     Scenario: #22 general rules for Study Date values are as follows
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And the Trial Information source is "Protocol"
     And The Trial Start Date can be in the past, present, or future
     And The Trial Start Date can be in the past, present, or future
     And The Completion Date is always the same as, or later than, the Primary Completion Date
     And The Primary Completion Date is always the same as, or later than, the Trial Start Date
     And The Primary Completion Date can be earlier than the Current Trial Status Dates Complete
     When the Primary Completion Date is Actual
     Then the primary Completion Date can be earlier than the Current Trial Status Dates Administratively Complete
     And The Completion Date is always the same as, or later than, the Primary Completion Date

     Updated:
     Scenario: #22 general rules for Study Date values are as follows
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And the Trial Information source is "Protocol"
     And the Trial status Start Date can be in the past, present, or future
     And the Trial status Primary Completion Date is always the same as, or later than, the Trial Start Date
     And the Primary Completion Date can be earlier than the Current Trial Status Dates Complete
     And the Trial status Completion Date is always the same as, or later than, the Primary Completion Date
     When the Primary Completion Date is Actual
     Then the primary Completion Date can be earlier than the Current Trial Status Dates Administratively Complete
     And the Trial status Completion Date is always the same as, or later than, the Primary Completion Date

     */

    this.Given(/^the Trial status Start Date can be in the past, present, or future$/, function () {
        return browser.sleep(25).then(function() {
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.selectStatusByXpath('Complete');
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setStatusComment('Status Comment: Complete');
        //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
        trialStatus.clickAddTrialStatus();
        trialStatus.clickSave();
        //past
        getTrialStartDate = trialDoc.getPastDate();
        console.log('getTrialStartDate: '+getTrialStartDate);
        var dateSplitE = getTrialStartDate.toString().split("-");
        slctDateDay = dateSplitE[0];
        slctDateMonth = dateSplitE[1];
        slctDateYear = dateSplitE[2];
        console.log('slctDateDay :'+slctDateDay);
        console.log('slctDateMonth :'+slctDateMonth);
        console.log('slctDateYear :'+slctDateYear);
        trialStatus.setTrialStartDate(slctDateYear, slctDateMonth, slctDateDay, 'Actual');
        futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
        console.log('Next two month ahead future date: '+futureDateTwoMonth);
        var dateSplitC = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitC[0];
        futrDateMonth = dateSplitC[1];
        futrDateYear = dateSplitC[2];
        trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Actual');
        futureDateThreeMonth = trialDoc.getFutureDateNextThreeMonth();
        var dateSplitD = futureDateThreeMonth.toString().split("-");
        futrDateDayThree = dateSplitD[0];
        futrDateMonthThree = dateSplitD[1];
        futrDateYearThree = dateSplitD[2];
        trialStatus.setCompletionDate(futrDateYearThree, futrDateMonthThree, futrDateDayThree, 'Actual');
        trialStatus.clickSave();
        verifyStartDate = trialDoc.replaceMonth(getTrialStartDate);
        verifyPrimaryDate = trialDoc.replaceMonth(futureDateTwoMonth);
        verifyCompletionDate = trialDoc.replaceMonth(futureDateThreeMonth);
        console.log('verifyStartDate :'+verifyStartDate);
        console.log('verifyPrimaryDate :'+verifyPrimaryDate);
        console.log('verifyCompletionDate :'+verifyCompletionDate);
        console.log('pastDate :'+pastDate);
        console.log('futureDateTwoMonth :'+futureDateTwoMonth);
        console.log('futureDateThreeMonth :'+futureDateThreeMonth);
        trialStatus.verifyTrialDates ('all', verifyStartDate, 'Actual', verifyPrimaryDate, 'Actual', verifyCompletionDate, 'Actual');
        //present
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplit = currentDate.toString().split("-");
        crtnDateDay = dateSplit[0];
        crntDateMonth = dateSplit[1];
        crntDateYear = dateSplit[2];
        trialStatus.setTrialStartDate(crntDateYear, crntDateMonth, crtnDateDay, 'Actual');
        trialStatus.clickSave();
        replaceStartDate = trialDoc.replaceMonth(currentDate);
        trialStatus.verifyTrialDates ('all', replaceStartDate, 'Actual', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        //future
        replaceStartDate = trialDoc.replaceMonth(futureDateTwoMonth);
        trialStatus.setTrialStartDate(futrDateYear, futrDateMonth, futrDateDay, 'Actual');
        trialStatus.clickSave();
        trialStatus.verifyTrialDates ('all', replaceStartDate, 'Actual', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        });
    });

    this.Given(/^the Trial status Primary Completion Date is always the same as, or later than, the Trial Start Date$/, function () {
        return browser.sleep(25).then(function() {
        //Same Primary Completion Date
        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplitB = pastDate.toString().split("-");
        pstDateDay = dateSplitB[0];
        pstDateMonth = dateSplitB[1];
        pstDateYear = dateSplitB[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        trialStatus.setPrimaryCompletionDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
        console.log('Next two month ahead future date: '+futureDateTwoMonth);
        var dateSplitC = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitC[0];
        futrDateMonth = dateSplitC[1];
        futrDateYear = dateSplitC[2];
        futureDateThreeMonth = trialDoc.getFutureDateNextThreeMonth();
        var dateSplitD = futureDateThreeMonth.toString().split("-");
        futrDateDayThree = dateSplitD[0];
        futrDateMonthThree = dateSplitD[1];
        futrDateYearThree = dateSplitD[2];
        trialStatus.setCompletionDate(futrDateYearThree, futrDateMonthThree, futrDateDayThree, 'Actual');
        trialStatus.clickSave();
        replacePastDate = trialDoc.replaceMonth(pastDate);
        replacePrimaryDate = trialDoc.replaceMonth(pastDate);
        replaceCompletionDate = trialDoc.replaceMonth(futureDateThreeMonth);
        trialStatus.verifyTrialDates ('all', replacePastDate, 'Actual', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        //later
        trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Actual');
        trialStatus.clickSave();
        replaceStartDate = trialDoc.replaceMonth(pastDate);
        replacePrimaryDate = trialDoc.replaceMonth(futureDateTwoMonth);
        trialStatus.verifyTrialDates ('all', replaceStartDate, 'Actual', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        });
    });

    this.Given(/^the Primary Completion Date can be earlier than the Current Trial Status Dates Complete$/, function () {
        return browser.sleep(25).then(function() {
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.selectStatusByXpath('Complete');
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setStatusComment('Status Comment: Complete');
        //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
        trialStatus.clickAddTrialStatus();
        trialStatus.clickSave();
        //Same Primary Completion Date
        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplitB = pastDate.toString().split("-");
        pstDateDay = dateSplitB[0];
        pstDateMonth = dateSplitB[1];
        pstDateYear = dateSplitB[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        trialStatus.setPrimaryCompletionDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        futureDateThreeMonth = trialDoc.getFutureDateNextThreeMonth();
        var dateSplitD = futureDateThreeMonth.toString().split("-");
        futrDateDayThree = dateSplitD[0];
        futrDateMonthThree = dateSplitD[1];
        futrDateYearThree = dateSplitD[2];
        trialStatus.setCompletionDate(futrDateYearThree, futrDateMonthThree, futrDateDayThree, 'Actual');
        trialStatus.clickSave();
        replacePastDate = trialDoc.replaceMonth(pastDate);
        replacePrimaryDate = trialDoc.replaceMonth(pastDate);
        replaceCompletionDate = trialDoc.replaceMonth(futureDateThreeMonth);
        trialStatus.verifyTrialDates ('all', replacePastDate, 'Actual', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        });
    });

    this.Given(/^the Trial status Completion Date is always the same as, or later than, the Primary Completion Date$/, function () {
        return browser.sleep(25).then(function() {
        //Same Primary Completion Date
        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplitB = pastDate.toString().split("-");
        pstDateDay = dateSplitB[0];
        pstDateMonth = dateSplitB[1];
        pstDateYear = dateSplitB[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        trialStatus.setPrimaryCompletionDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        trialStatus.setCompletionDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        trialStatus.clickSave();
        replacePastDate = trialDoc.replaceMonth(pastDate);
        replacePrimaryDate = trialDoc.replaceMonth(pastDate);
        replaceCompletionDate = trialDoc.replaceMonth(pastDate);
        trialStatus.verifyTrialDates ('all', replacePastDate, 'Actual', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        futureDateThreeMonth = trialDoc.getFutureDateNextThreeMonth();
        var dateSplitD = futureDateThreeMonth.toString().split("-");
        futrDateDayThree = dateSplitD[0];
        futrDateMonthThree = dateSplitD[1];
        futrDateYearThree = dateSplitD[2];
        trialStatus.setCompletionDate(futrDateYearThree, futrDateMonthThree, futrDateDayThree, 'Actual');
        trialStatus.clickSave();
        replacePastDate = trialDoc.replaceMonth(pastDate);
        replacePrimaryDate = trialDoc.replaceMonth(pastDate);
        replaceCompletionDate = trialDoc.replaceMonth(futureDateThreeMonth);
        trialStatus.verifyTrialDates ('all', replacePastDate, 'Actual', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        });
    });

    this.When(/^the Primary Completion Date is Actual$/, function () {
        return browser.sleep(25).then(function() {
        // Write code here that turns the phrase above into concrete actions
        });
    });

    this.Then(/^the primary Completion Date can be earlier than the Current Trial Status Dates Administratively Complete$/, function () {
        return browser.sleep(25).then(function() {
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.selectStatusByXpath('Administratively Complete');
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setStatusComment('Status Comment: Administratively Complete');
        //trialStatus.setWhyStudyStopped('Status Comment: '+ statusTable[i].whyStudyStopped + '');
        trialStatus.clickAddTrialStatus();
        trialStatus.clickSave();
        //Same Primary Completion Date
        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplitB = pastDate.toString().split("-");
        pstDateDay = dateSplitB[0];
        pstDateMonth = dateSplitB[1];
        pstDateYear = dateSplitB[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        trialStatus.setPrimaryCompletionDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        futureDateThreeMonth = trialDoc.getFutureDateNextThreeMonth();
        var dateSplitD = futureDateThreeMonth.toString().split("-");
        futrDateDayThree = dateSplitD[0];
        futrDateMonthThree = dateSplitD[1];
        futrDateYearThree = dateSplitD[2];
        trialStatus.setCompletionDate(futrDateYearThree, futrDateMonthThree, futrDateDayThree, 'Actual');
        trialStatus.clickSave();
        replacePastDate = trialDoc.replaceMonth(pastDate);
        replacePrimaryDate = trialDoc.replaceMonth(pastDate);
        replaceCompletionDate = trialDoc.replaceMonth(futureDateThreeMonth);
        trialStatus.verifyTrialDates ('all', replacePastDate, 'Actual', replacePrimaryDate, 'Actual', replaceCompletionDate, 'Actual');
        });
    });

    this.Then(/^the Trial status Completion Date is always the same as, or later than, the Primary Completion Date$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    /*
     Scenario: #23 Delete Trial Status Comment not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status screen
     When I select Delete a Trial Status
     And I have not entered a Comment
     Then the will display the error "A comment must be entered"
     */

    this.When(/^I select Delete a Trial Status$/, function () {
        return browser.sleep(25).then(function() {
        trialStatus.trialStatusTbleExists.isDisplayed().then(function(dispC){
            console.log('Trial Status Table Exists: ' + dispC);
            if (dispC) {
                trialStatus.findTrialStatusToDel('delete');
            }
        });
        });
    });

    this.When(/^I have not entered a Comment$/, function () {
        return browser.sleep(25).then(function() {
            console.log('The delete comment feature has not been implemented');
        });
    });

    this.Then(/^the will display the error "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
            // Write code here that turns the phrase above into concrete actions
        });
    });



};
