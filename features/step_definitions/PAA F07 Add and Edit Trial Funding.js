/**
 * Author: Shamim Ahmed
 * Date: 01/08/2015
 * Feature: PAA F07 Add and Edit Trial Funding
 *
 * Note: In the PA search screen it has dependency on the seed data
 */

//Common dependencies
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

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
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
//Regulatory Information - Trail Funding
var abstractionRegulatoryTrialFunding = require('../support/abstractionTrialFunding');



module.exports = function() {

    var login = new loginPage();
    var helper = new helperMethods();
    var projectFunctions = new projectFunctionMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var nciSpecific = new abstractionNCISpecific();
    var indIDE = new abstractionRegulatoryINDIDE();
    var trialFunding = new abstractionRegulatoryTrialFunding();
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
    var leadProtocolIDD = 'CTRP_01_1781';
    var searchResultCountText = 'Trial Search Results';
    var nciGrantQueVal = '';

    var fundingMechanismSelectedFirst = 'R01';
    var instituteCodeSelectedFirst = 'CA';
    var programCodeSelectedFirst = 'OD';
    var grantSerialNumberFirst = '142587';
    var grantEntireSerialNumberFirst = 'Serial Number: 142587\nOrganization: UNIVERSITY OF ALABAMA AT BIRMINGHAM\nProject Title: Phase-sensitive x-ray breast tomosynthesis\nPI: Fese Mokube';
    var grantValueFirst = '142587';
    var fundingMechanismSelectedSecond = 'F32';
    var instituteCodeSelectedSecond = 'CA';
    var programCodeSelectedSecond = 'TRP';
    var grantSerialNumberSecond = '153978';
    var grantEntireSerialNumberSecond = '153978 - MASSACHUSETTS GENERAL HOSPITAL; Proliferation-promoting activities of pRB; BARRY SLECKMAN';
    var grantValueSecond = '153978';

    /*********************
     * Validation message *
     *********************/
    var grantRequired = 'Grant is required';
    var emtpyGrantField = 'Please select a Funding Mechanism, Institute Code, enter a Serial Number and select a NCI Division/Program Code';

    /*
     Scenario: #1 I can indicate that the trial does not have an associated grant
     Given I am logged into the CTRP Protocol Abstraction application to abstract
     And I have selected trail
     And I am on the Trial Funding Screen
     When I have selected "No" for the question "Is this trial funded by a NCI Grant?"
     Then the FDAAA required Grant Information for the trial will be complete
     */

    this.Given(/^I am logged into the CTRP Protocol Abstraction application to abstract$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
        });
    });

    this.Given(/^I have selected trial$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
        });
    });

    this.Given(/^I am on the Trial Funding Screen$/, function () {
        return browser.sleep(25).then(function() {
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDA);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickLinkText(leadProtocolIDA);
            commonFunctions.adminCheckOut();
            trialFunding.clickAdminDataTrialFunding();
        });
    });

    this.When(/^I have selected "([^"]*)" for the NCI Grant question "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
            var getQueNCIGrant = arg2;
            console.log('NCI Grant Que?: ' + getQueNCIGrant);
            var getYesNoFlag = arg1;
            console.log('Condition: ' + getYesNoFlag);
            trialFunding.nciGrantQuelbl.getText().then(function (value) {
                var pasNCIGrantQue = '' + value + '';

                function retNciGrantQueVal() {
                    return pasNCIGrantQue;
                };
                nciGrantQueVal = retNciGrantQueVal();
                console.log('System Identified [' + nciGrantQueVal + '] as the current NCI Grant value');
            });
            if (arg2 === nciGrantQueVal) {
                trialFunding.verifyNCIGrantlblValue(getQueNCIGrant);
            }
            ;
            if (arg1 === 'No') {
                trialFunding.selectNCIGrantQueRdo('1');
            } else if (arg1 === 'Yes') {
                trialFunding.selectNCIGrantQueRdo('0');
            }
        });
    });

    this.Then(/^the FDAAA required Grant Information for the trial will not be complete$/, function () {
        return browser.sleep(25).then(function() {
            trialFunding.verifyNCIGrantYesOrNoOption('1', true);
            //Fudning Mechanism Fields
            helper.verifyElementDisplayed(trialFunding.nciGrantFundingMechanism, false);
            helper.verifyElementDisplayed(trialFunding.nciGrantInstitueCode, false);
            helper.verifyElementDisplayed(trialFunding.nciGrantSerialNumber, false);
            helper.verifyElementDisplayed(trialFunding.nciGrantNCIDivisionProgCode, false);
            helper.verifyElementDisplayed(trialFunding.nciGrantAddButton, false);
            //Fudning Mechanism Labels
            helper.verifyElementDisplayed(trialFunding.nciGrantLblFundingMechanism, false);
            helper.verifyElementDisplayed(trialFunding.nciGrantLblInstitueCode, false);
            helper.verifyElementDisplayed(trialFunding.nciGrantLblSerialNumber, false);
            helper.verifyElementDisplayed(trialFunding.nciGrantLblNCIDivisionProgCode, false);
        });
    });

    /*
     Scenario: #2 I can indicate that the trial has one or more associated grant
     Given I am logged into the CTRP Protocol Abstraction application to abstract
     And I have selected trial
     And I am on the Trial Funding Screen
     And I have selected "Yes" for the NCI Grant question "Is this trial funded by a NCI Grant?"
     When I have selected the Funding Mechanism from a list
     And I have selected the Institute Code from a list
     And I have selected the NCI Division/Program Code from a list
     And I have entered the Grant Serial Number
     Then the FDAAA required Grant Information for the trial will be complete
     */

    this.When(/^I have look for the funding mechanism serial number and entered the serial number$/, function () {
        return browser.sleep(25).then(function() {
            addTrial.setAddTrialSerialNumber(grantSerialNumberFirst);
            console.log('This checks for Grant Serial number has Serial Number, Organization, Project Title, and Contact Principal Investigator');
            expect(addTrial.addTrialSerialNumberSelect.getText()).to.eventually.equal(grantEntireSerialNumberFirst);
        });
    });

    this.Then(/^the FDAAA required Grant Information for the trial will be complete$/, function () {
        return browser.sleep(25).then(function() {
            trialFunding.clickAddGrantButton();
            helper.wait_for(9000);
        });
    });








};