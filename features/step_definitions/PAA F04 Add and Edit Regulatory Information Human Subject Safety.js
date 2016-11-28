/**
 * Author: Shamim Ahmed
 * Date: 02/08/2016
 * Feature: PAA F04 Add and Edit Regulatory Information Human Subject Safety
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
//Regulatory Information - IND/IDE
var abstractionRegulatoryINDIDE = require('../support/abstractionRegulatoryIND');
//Regulatory Information - Human Subject Safety
var abstractionRegulatoryHuman = require('../support/abstractionRegulatoryHuman');
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
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    //var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchTableHeader = '';
    var nciID = 'NCI-2014-00894';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1776';
    var leadProtocolIDA = 'CTRP_01_1777';
    var leadProtocolIDB = 'CTRP_01_1778';
    var leadProtocolIDC = 'CTRP_01_17'+randNmbr;
    var leadProtocolIDD = 'CTRP_01_1786';
    var searchResultCountText = 'Trial Search Results';
    var indIDEAssociatedQueVal = '';
    var indTypVal = 'IND';
    var ideTypVal = 'IDE';
    var aprvlNumberRnd = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var boardApprovNmbr = '';
    var getBoardName = 'TestBoardName'+moment().format('MMMDoYY hmmss');
    var boardNm = '';
    var orgSearchNameA = 'Boston Medical Center';
    var orgSearchNameB = 'Boston University School Of Public Health';
    var buildSelectionOpton = '';
    var indIDENmbrA = 'BBIND13794';
    var indIDENmbrB = 'IND108498';
    var indIDENmbrC = '102902';
    var boardApprovalStatusCrntVal = '';
    var boardApprovalStatusSelect = 'Select a status';
    var boardApprovalStatusPending = 'Submitted, pending';
    var boardApprovalStatusApproved = 'Submitted, approved';
    var boardApprovalStatusExempt = 'Submitted, exempt';
    var boardApprovalStatusDenied = 'Submitted, denied';
    var boardApprovalStatusNotRequired = 'Submission not required';
    var optionA = '';
    var optionB = '';
    var optionC = '';
    var optionD = '';
    var optionE = '';
    var optionF = '';
    var optionG = '';
    var optionH = '';
    var optionI = '';
    var affiOrg = 'Affiliated Organization';
    var requiredMsgApproval = 'Board approval number is required';
    var requiredMsgAffiliation = 'Board affiliation is required';
    var requiredMsgName = 'Board name is required';



        /*
         Scenario: #1 I can add and edit Regulatory Information - Human Subject Safety for a Regulated Trial with board status approved
         Given I am logged into the CTRP Protocol Abstraction application
         And I am on the Trial Regulatory Information� Human Subject Safety screen
         When from the Board Approval Status I have selected the �Submitted, Approved� from the list of:
         |Select a status|
         |Submitted, pending|
         |Submitted, approved|
         |Submitted, exempt|
         |Submitted, denied|
         |Submission not required|
         And I have entered a Board Approval Number
         And I have entered a Board Name
         And I have selected a Board Affiliation using the organization lookup
         Then the Board Approval Status , Board Approval Number, Board Name, Board Affiliation will be associated with the trial along with the Board Affiliation�s address (street, city, state, zip, country), Phone # and e-mail address
         */

    this.Given(/^I am on the Trial Regulatory Information� Human Subject Safety screen$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDD);
            commonFunctions.adminCheckOut();
            humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
            humanSafety.humanSafetyBoradApprovalStatus.$('option:checked').getText().then(function (value) {
                var pasAprvlStts = '' + value + '';

                function retBoardApprovalStatusVal() {
                    return pasAprvlStts;
                }

                boardApprovalStatusCrntVal = retBoardApprovalStatusVal();
                console.log('System Identified [' + boardApprovalStatusCrntVal + '] as the current Board Approval Statuses selected value');
            });
        });
    });

    this.When(/^from the Board Approval Status I have selected the �Submitted, Approved� from the list of:$/, function (table) {
        return browser.sleep(25).then(function() {
            if (boardApprovalStatusCrntVal === 'Submitted, approved') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, pending') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, exempt') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, denied') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submission not required') {
                searchAndSelectOrg();
            }
            ;
            function searchAndSelectOrg() {
                console.log('test current')
                humanSafety.selectBoardApprovalStatus(boardApprovalStatusSelect);
                humanSafety.clickSave();
                helper.wait_for(250);
                humanSafety.clickAdminDataGeneralTrial();
                humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
                helper.wait_for(2500);
            };
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            var strVal = '';
            humanSafetyOptions = table.raw();
            strVal = humanSafetyOptions.toString().replace(/,/g, "\n", -1);
            console.log('Board Approval Status defined value(s) in the data table:[' + strVal + ']');
            humanSafety.humanSafetyBoradApprovalStatus.getText().then(function (items) {
                console.log('Board Approval Status value(s) in the list object:[' + items + ']');
                //expect(items.toString().split("\n")).to.eql(strVal.toString().split("\n"));
            });
            var tableDataSplt = strVal.toString().split("\n");
            optionA = tableDataSplt[0];
            optionB = tableDataSplt[1];
            optionC = tableDataSplt[2];
            optionD = tableDataSplt[3];
            optionE = tableDataSplt[4];
            optionF = tableDataSplt[6];
            optionG = tableDataSplt[7];
            optionH = tableDataSplt[8];
            optionI = tableDataSplt[9];
            buildSelectionOpton = '' + optionD + ',' + optionE + '';
            console.log('buildSelectionOpton:[' + buildSelectionOpton + ']');
            humanSafety.selectBoardApprovalStatus(buildSelectionOpton);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
            //helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
        });
    });

    this.When(/^I have entered a Board Approval Number$/, function () {
        return browser.sleep(25).then(function() {
            boardApprovNmbr = '' + aprvlNumberRnd + '';
            humanSafety.setBoardApprovalNumber(boardApprovNmbr);
        });
    });

    this.When(/^I have entered a Board Name$/, function () {
        return browser.sleep(25).then(function() {
            boardNm = '' + getBoardName + '';
            humanSafety.setBoardName(boardNm);
        });
    });

    this.When(/^I have selected a Board Affiliation using the organization lookup$/, function () {
        return browser.sleep(25).then(function() {
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            humanSafety.clickSave();
            //helper.wait_for(250);
            //humanSafety.clickAdminDataGeneralTrial();
            //humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
        });
    });

    this.Then(/^the Board Approval Status , Board Approval Number, Board Name, Board Affiliation will be associated with the trial along with the Board Affiliation�s address \(street, city, state, zip, country\), Phone \# and e\-mail address$/, function () {
        return browser.sleep(25).then(function() {
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradContactAddress, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradContactCity, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradStateProvince, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradZipPostalCode, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradCountry, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradPhone, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradEmail, true);
            //helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
            nciSpecific.getVerifyListValue(humanSafety.humanSafetyBoradApprovalStatus, buildSelectionOpton, "Board Approval Status - field validation");
            //commonFunctions.verifyValueFromTextBox(humanSafety.humanSafetyBoradApprovalNumber, boardApprovNmbr, "Board Approval Number - field value validation");
            commonFunctions.verifyValueFromTextBox(humanSafety.humanSafetyBoradName, boardNm, "Board Name - field value validation");
            commonFunctions.verifyValueFromTextBox(humanSafety.humanSafetyBoradAffiliation, orgSearchNameB, "Board Affiliation - field value validation");
        });
    });

    /*
     Scenario: #2 I can add and edit Regulatory Information - Human Subject Safety for a Regulated Trial with board status pending, board status denied, or board status exempt
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information� Human Subject Safety screen
     When I have selected either of the Board Approval Status� of �Submitted, Pending�, �Submitted, Denied�, or �Submitted, Exempt� from the list of:
     |Select a status|
     |Submitted, pending|
     |Submitted, approved|
     |Submitted, exempt|
     |Submitted, denied|
     |Submission not required|
     And I have entered a Board Name
     And I have selected a Board Affiliation using the organization lookup
     Then the Board Approval Status , Board Approval Number, Board Name, Board Affiliation will be associated with the trial along with the Board Affiliation�s address (street, city, state, zip, country), Phone # and e-mail address
     */

    this.When(/^I have selected either of the Board Approval Status� of �Submitted, Pending�, �Submitted, Denied�, or �Submitted, Exempt� from the list of:$/, function (table) {
        return browser.sleep(25).then(function() {
            if (boardApprovalStatusCrntVal === 'Submitted, approved') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, pending') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, exempt') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, denied') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submission not required') {
                searchAndSelectOrg();
            }
            function searchAndSelectOrg() {
                console.log('test current')
                humanSafety.selectBoardApprovalStatus(boardApprovalStatusSelect);
                humanSafety.clickSave();
                helper.wait_for(250);
                humanSafety.clickAdminDataGeneralTrial();
                humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
                helper.wait_for(2500);
            }

            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            var strVal = '';
            humanSafetyOptions = table.raw();
            strVal = humanSafetyOptions.toString().replace(/,/g, "\n", -1);
            console.log('Board Approval Status defined value(s) in the data table:[' + strVal + ']');
            humanSafety.humanSafetyBoradApprovalStatus.getText().then(function (items) {
                console.log('Board Approval Status value(s) in the list object:[' + items + ']');
                //expect(items.toString().split("\n")).to.eql(strVal.toString().split("\n"));
            });
            var tableDataSplt = strVal.toString().split("\n");
            optionA = tableDataSplt[0];
            optionB = tableDataSplt[1];
            optionC = tableDataSplt[2];
            optionD = tableDataSplt[3];
            optionE = tableDataSplt[4];
            optionF = tableDataSplt[6];
            optionG = tableDataSplt[7];
            optionH = tableDataSplt[8];
            optionI = tableDataSplt[9];
            buildSelectionOpton = '' + optionB + ',' + optionC + '';
            console.log('buildSelectionOpton:[' + buildSelectionOpton + ']');
            humanSafety.selectBoardApprovalStatus(buildSelectionOpton);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, false);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
        });
    });

    /*
     Scenario: #3 I can add and edit Regulatory Information - Human Subject Safety for a Regulated Trial with board status of Not Required
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information� Human Subject Safety screen
     When from the Board Approval Status I have selected the �Submission Not Required� from the list of:
     |Select a status|
     |Submitted, pending|
     |Submitted, approved|
     |Submitted, exempt|
     |Submitted, denied|
     |Submission not required|
     Then the Board Approval Status will be associated with the trial
     */

    this.When(/^from the Board Approval Status I have selected the �Submission Not Required� from the list of:$/, function (table) {
        return browser.sleep(25).then(function() {
            if (boardApprovalStatusCrntVal === 'Submitted, approved') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, pending') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, exempt') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, denied') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submission not required') {
                searchAndSelectOrg();
            }
            ;
            function searchAndSelectOrg() {
                console.log('test current')
                humanSafety.selectBoardApprovalStatus(boardApprovalStatusSelect);
                humanSafety.clickSave();
                helper.wait_for(250);
                humanSafety.clickAdminDataGeneralTrial();
                humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
                helper.wait_for(2500);
            };
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            var strVal = '';
            humanSafetyOptions = table.raw();
            strVal = humanSafetyOptions.toString().replace(/,/g, "\n", -1);
            console.log('Board Approval Status defined value(s) in the data table:[' + strVal + ']');
            humanSafety.humanSafetyBoradApprovalStatus.getText().then(function (items) {
                console.log('Board Approval Status value(s) in the list object:[' + items + ']');
                //expect(items.toString().split("\n")).to.eql(strVal.toString().split("\n"));
            });
            var tableDataSplt = strVal.toString().split("\n");
            optionA = tableDataSplt[0];
            optionB = tableDataSplt[1];
            optionC = tableDataSplt[2];
            optionD = tableDataSplt[3];
            optionE = tableDataSplt[4];
            optionF = tableDataSplt[6];
            optionG = tableDataSplt[7];
            optionH = tableDataSplt[8];
            optionI = tableDataSplt[9];
            buildSelectionOpton = '' + optionI + '';
            console.log('buildSelectionOpton:[' + buildSelectionOpton + ']');
            humanSafety.selectBoardApprovalStatus(buildSelectionOpton);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, false);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, false);
        });
    });

    this.Then(/^the Board Approval Status will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            nciSpecific.getVerifyListValue(humanSafety.humanSafetyBoradApprovalStatus, buildSelectionOpton, "Board Approval Status - field validation");
        });
    });

    /*
     Scenario: #4 Save Regulatory Information - Human Subject Safety
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information� Human Subject Safety screen
     When select save at the Regulatory Information� Human Subject Safety screen
     Then the information entered or edited on the Regulatory Information - Human Subject Safety screen will be saved to the trial record
     */

    this.When(/^select save at the Regulatory Information� Human Subject Safety screen$/, function () {
        return browser.sleep(25).then(function() {
            if (boardApprovalStatusCrntVal === 'Submitted, approved') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, pending') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, exempt') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, denied') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submission not required') {
                searchAndSelectOrg();
            }
            function searchAndSelectOrg() {
                console.log('test current')
                humanSafety.selectBoardApprovalStatus(boardApprovalStatusSelect);
                humanSafety.clickSave();
                helper.wait_for(250);
                humanSafety.clickAdminDataGeneralTrial();
                humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
                helper.wait_for(2500);
            }

            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            buildSelectionOpton = '' + boardApprovalStatusPending + '';
            console.log('buildSelectionOpton:[' + buildSelectionOpton + ']');
            humanSafety.selectBoardApprovalStatus(buildSelectionOpton);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
            //helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
            //boardApprovNmbr = ''+aprvlNumberRnd+'';
            //humanSafety.setBoardApprovalNumber(boardApprovNmbr);
            boardNm = '' + getBoardName + '';
            humanSafety.setBoardName(boardNm);
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            humanSafety.clickSave();
            helper.wait_for(2500);
            //humanSafety.clickAdminDataGeneralTrial();
            //humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            humanSafety.clickSave();
            //helper.wait_for(250);
            //humanSafety.clickAdminDataGeneralTrial();
            //humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
        });
    });

    this.Then(/^the information entered or edited on the Regulatory Information \- Human Subject Safety screen will be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradContactAddress, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradContactCity, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradStateProvince, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradZipPostalCode, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradCountry, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradPhone, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradEmail, true);
            //helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
            nciSpecific.getVerifyListValue(humanSafety.humanSafetyBoradApprovalStatus, buildSelectionOpton, "Board Approval Status - field validation");
            //commonFunctions.verifyValueFromTextBox(humanSafety.humanSafetyBoradApprovalNumber, boardApprovNmbr, "Board Approval Number - field value validation");
            commonFunctions.verifyValueFromTextBox(humanSafety.humanSafetyBoradName, boardNm, "Board Name - field value validation");
            commonFunctions.verifyValueFromTextBox(humanSafety.humanSafetyBoradAffiliation, orgSearchNameA, "Board Affiliation - field value validation");
        });
    });

    /*
     Scenario: #5 Cancel Regulatory Information
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Register Trial Regulatory Information - Human Subject Safety screen
     When I select Reset
     Then the information entered or edited on the Regulatory Information - Human Subject Safety screen will not be saved to the trial record
     And the screen will be refreshed with the existing data
     */

    this.When(/^I select Reset$/, function () {
        return browser.sleep(25).then(function() {
            if (boardApprovalStatusCrntVal === 'Submitted, approved') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, pending') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, exempt') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, denied') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submission not required') {
                searchAndSelectOrg();
            }
            function searchAndSelectOrg() {
                console.log('test current')
                humanSafety.selectBoardApprovalStatus(boardApprovalStatusSelect);
                humanSafety.clickSave();
                helper.wait_for(250);
                humanSafety.clickAdminDataGeneralTrial();
                humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
                helper.wait_for(2500);
            }
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            buildSelectionOpton = '' + boardApprovalStatusPending + '';
            console.log('buildSelectionOpton:[' + buildSelectionOpton + ']');
            humanSafety.selectBoardApprovalStatus(buildSelectionOpton);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
            //helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
            //boardApprovNmbr = ''+aprvlNumberRnd+'';
            //humanSafety.setBoardApprovalNumber(boardApprovNmbr);
            boardNm = '' + getBoardName + '';
            humanSafety.setBoardName(boardNm);
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            humanSafety.clickReset();
        });
    });

    this.Then(/^the information entered or edited on the Regulatory Information \- Human Subject Safety screen will not be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            //humanSafety.clickAdminDataGeneralTrial();
            //humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
        });
    });

    this.Then(/^the Regulatory Information� Human Subject Safety screen will be refreshed with the existing data$/, function () {
        return browser.sleep(25).then(function() {
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            nciSpecific.getVerifyListValue(humanSafety.humanSafetyBoradApprovalStatus, boardApprovalStatusSelect, "Board Approval Status - field validation");
        });
    });

    /*
     Scenario: #6 Regulatory Information - Human Subject Safety screen Information must be complete for status of approved
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information� Human Subject Safety screen
     When I have selected a Board Approval Status of �Submitted, Approved�
     And the trial is not Imported (Trials.internal_source_id Internal_Sources.name is not "imported")
     And I have not entered an Approval Number
     And I have not entered a Board Name
     And I have not selected a Board Affiliation
     And selected Save at the Regulatory Information� Human Subject Safety screen
     Then the system will display an Error that Approval Number, Board Name, Board Affiliation must be entered in order to associate the Regulatory Information - Human Subject Safety Information for the trial
     */

    this.When(/^I have selected a Board Approval Status of �Submitted, Approved�$/, function () {
        return browser.sleep(25).then(function() {
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            buildSelectionOpton = '' + boardApprovalStatusApproved + '';
            console.log('buildSelectionOpton:[' + buildSelectionOpton + ']');
            humanSafety.selectBoardApprovalStatus(buildSelectionOpton);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
        });
    });

    this.When(/^the trial is not Imported \(Trials\.internal_source_id Internal_Sources\.name is not "([^"]*)"\)$/, function (arg1) {
        return browser.sleep(25).then(function() {
            humanSafety.humanSafetyBoradAffiliation.getAttribute().then(function (value) {
                var getAffiCrntVal = value;
                if (getAffiCrntVal === affiOrg) {
                    arg1 === true;
                }
                ;
            });
        });
    });

    this.When(/^I have not entered an Approval Number$/, function () {
        return browser.sleep(25).then(function() {
            boardApprovNmbr = '';
            humanSafety.setBoardApprovalNumber(boardApprovNmbr);
        });
    });

    this.When(/^I have not entered a Board Name$/, function () {
        return browser.sleep(25).then(function() {
            boardNm = '';
            humanSafety.setBoardName(boardNm);
        });
    });

    this.When(/^I have not selected a Board Affiliation$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.verifyValueFromTextBox(humanSafety.humanSafetyBoradAffiliation, '', "Board Affiliation - field value validation");
        });
    });

    this.When(/^selected Save at the Regulatory Information� Human Subject Safety screen$/, function () {
        return browser.sleep(25).then(function() {
            humanSafety.clickSave();
        });
    });

    this.Then(/^the system will display an Error that Approval Number, Board Name, Board Affiliation must be entered in order to associate the Regulatory Information \- Human Subject Safety Information for the trial$/, function () {
        return browser.sleep(25).then(function() {
            helper.getVerifyRequired(humanSafety.requiredMessageApprovalNumber, requiredMsgApproval, "Board Approval Number - Required field validation");
            helper.getVerifyRequired(humanSafety.requiredMessageBoardAffiliation, requiredMsgAffiliation, "Board Affiliation - Required field validation");
            helper.getVerifyRequired(humanSafety.requiredMessageBoardName, requiredMsgName, "Board Name - Required field validation");
        });
    });

    /*
     Scenario: #7 Regulatory Information - Human Subject Safety screen Information must be complete � �Submitted, Pending�, �Submitted. Denied�, or �Submitted, Exempt�
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information� Human Subject Safety screen
     When I have selected either of the Board Approval Status� of �Submitted, Pending�, �Submitted. Denied�, or �Submitted, Exempt�
     And the trial is not Imported
     And I have not entered a Board Name
     And I have not selected a Board Affiliation
     And selected Save at the Regulatory Information� Human Subject Safety screen
     Then the system will display an Error that Board Name and Board Affiliation must be entered in order to associate the Regulatory Information - Human Subject Safety Information for the trial
     */

    this.When(/^I have selected either of the Board Approval Status� of �Submitted, Pending�, �Submitted\. Denied�, or �Submitted, Exempt�$/, function () {
        return browser.sleep(25).then(function() {
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            buildSelectionOpton = '' + boardApprovalStatusExempt + '';
            console.log('buildSelectionOpton:[' + buildSelectionOpton + ']');
            humanSafety.selectBoardApprovalStatus(buildSelectionOpton);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
            //helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
        });
    });

    this.When(/^the trial is not Imported$/, function () {
        return browser.sleep(25).then(function() {
            humanSafety.humanSafetyBoradAffiliation.getAttribute().then(function (value) {
                var getAffiCrntVal = value;
                if (getAffiCrntVal === affiOrg) {
                    commonFunctions.verifyValueFromTextBox(humanSafety.humanSafetyBoradAffiliation, '', "Board Affiliation - field value validation");
                }
                ;
            });
        });
    });

    this.Then(/^the system will display an Error that Board Name and Board Affiliation must be entered in order to associate the Regulatory Information \- Human Subject Safety Information for the trial$/, function () {
        return browser.sleep(25).then(function() {
            helper.getVerifyRequired(humanSafety.requiredMessageBoardAffiliation, requiredMsgAffiliation, "Board Affiliation - Required field validation");
            helper.getVerifyRequired(humanSafety.requiredMessageBoardName, requiredMsgName, "Board Name - Required field validation");
        });
    });

    /*
     Scenario: #8 I can add and edit the Board Affiliation
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information� Human Subject Safety screen
     And I have selected organization look-up at the Regulatory Information� Human Subject Safety screen
     When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed in the lookup window
     Then the selected organization will associated with the trial as the Board Affiliation along with the Board
     */

    this.Given(/^I have selected organization look\-up at the Regulatory Information� Human Subject Safety screen$/, function () {
        return browser.sleep(25).then(function() {
            if (boardApprovalStatusCrntVal === 'Submitted, approved') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, pending') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, exempt') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, denied') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submission not required') {
                searchAndSelectOrg();
            }
            function searchAndSelectOrg() {
                console.log('test current')
                humanSafety.selectBoardApprovalStatus(boardApprovalStatusSelect);
                humanSafety.clickSave();
                helper.wait_for(250);
                humanSafety.clickAdminDataGeneralTrial();
                humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
                helper.wait_for(2500);
            }

            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            buildSelectionOpton = '' + boardApprovalStatusPending + '';
            console.log('buildSelectionOpton:[' + buildSelectionOpton + ']');
            humanSafety.selectBoardApprovalStatus(buildSelectionOpton);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
            //helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
            //boardApprovNmbr = ''+aprvlNumberRnd+'';
            //humanSafety.setBoardApprovalNumber(boardApprovNmbr);
            boardNm = '' + getBoardName + '';
            humanSafety.setBoardName(boardNm);
            organizationSearch.clickSearchOrganization();
        });
    });

    this.When(/^a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial \(sponsor, Lead, IRB\) are displayed in the lookup window$/, function () {
        return browser.sleep(25).then(function() {
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            humanSafety.clickSave();
            //helper.wait_for(250);
            //humanSafety.clickAdminDataGeneralTrial();
            //humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
        });
    });

    this.Then(/^the selected organization will associated with the trial as the Board Affiliation along with the Board$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.verifyValueFromTextBox(humanSafety.humanSafetyBoradAffiliation, orgSearchNameB, "Board Affiliation - field value validation");
        });
    });

    /*
     Scenario Outline: #9 Hide non required fields for  Regulatory Information - Human Subject Safety
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information� Human Subject Safety screen
     When from the Board Approval Status I have selected the following <Status> from the list of:
     Then the following fields <Board Approval Status>, <Board Approval Number>, <Board Affiliation and Address>, <Board Name> will be displayed:

     Examples:
     |Status                 |Board Approval Status|Board Approval Number|Board Affiliation and Address|Board Name|
     |Select a status        |Displayed            |Hidden  		     |Hidden                       |Hidden    |
     |Submitted, approved    |Displayed            |Displayed            |Displayed                    |Displayed |
     |Submitted, exempt      |Displayed            |Hidden               |Displayed                    |Displayed |
     |Submitted, pending     |Displayed            |Hidden               |Displayed                    |Displayed |
     |Submitted, denied      |Displayed            |Hidden               |Displayed                    |Displayed |
     |Submission not required|Displayed            |Hidden               |Hidden                       |Hidden    |

     */

    this.When(/^from the Board Approval Status I have selected the following (.*) from the list of:$/, function (Status) {
        return browser.sleep(25).then(function() {
            if (boardApprovalStatusCrntVal === 'Submitted, approved') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, pending') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, exempt') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submitted, denied') {
                searchAndSelectOrg();
            } else if (boardApprovalStatusCrntVal === 'Submission not required') {
                searchAndSelectOrg();
            }
            function searchAndSelectOrg() {
                console.log('test current')
                humanSafety.selectBoardApprovalStatus(boardApprovalStatusSelect);
                humanSafety.clickSave();
                helper.wait_for(250);
                humanSafety.clickAdminDataGeneralTrial();
                humanSafety.clickAdminDataRegulatoryInfoHumanSafety();
                helper.wait_for(2500);
            }

            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatuslbl, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetySave, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyReset, true);
            helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
            buildSelectionOpton = '' + Status + '';
            console.log('buildSelectionOpton:[' + buildSelectionOpton + ']');
            humanSafety.selectBoardApprovalStatus(buildSelectionOpton);
            nciSpecific.getVerifyListValue(humanSafety.humanSafetyBoradApprovalStatus, buildSelectionOpton, "Board Approval Status - field validation");
        });
    });

    this.Then(/^the following fields (.*), (.*), (.*), (.*) will be displayed:$/, function (BoardApprovalStatus, BoardApprovalNumber, BoardAffiliationAndAddress, BoardName) {
        return browser.sleep(25).then(function() {
            //BoardApprovalStatus
            if (BoardApprovalStatus === 'Displayed') {
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalStatus, true);
            }
            //BoardApprovalNumber
            if (BoardApprovalNumber === 'Displayed') {
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, true);
            } else if (BoardApprovalNumber === 'Hidden') {
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradApprovalNumber, false);
            }
            //BoardAffiliationAndAddress
            if (BoardAffiliationAndAddress === 'Displayed') {
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, true);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradContactAddress, true);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradContactCity, true);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradStateProvince, true);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradZipPostalCode, true);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradCountry, true);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradPhone, true);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradEmail, true);
            } else if (BoardAffiliationAndAddress === 'Hidden') {
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradAffiliation, false);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradContactAddress, false);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradContactCity, false);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradStateProvince, false);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradZipPostalCode, false);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradCountry, false);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradPhone, false);
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradEmail, false);
            }
            //BoardName
            if (BoardName === 'Displayed') {
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, true);
            } else if (BoardName === 'Hidden') {
                helper.verifyElementDisplayed(humanSafety.humanSafetyBoradName, false);
            }
        });
    });

};