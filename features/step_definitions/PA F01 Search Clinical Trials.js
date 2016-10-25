/**
 * Author: Shamim Ahmed
 * Date: 12/10/2015
 * Feature: PA F01 Search Clinical Trials
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
//Trial Menu Item
var trialMenuItemList = require('../support/trialCommonBar');


module.exports = function() {
    var login = new loginPage();
    var helper = new helperMethods();
    var projectFunctions = new projectFunctionMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var trialMenuItem = new trialMenuItemList();

    /*
     Scenario: #1 I can search for clinical trials registered in CTRP
             Given I am logged into the CTRP Protocol Abstraction application
             And I am on the Search Clinical Trials Screen
             When I select one or more of the values to search all trials
                |Official Title|
             Then CTRP will then display the results for all the Clinical Trials Search Results
                |NCI Trial Identifier|
     */

    this.Given(/^I am logged into the CTRP Protocol Abstraction application$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.alertMsgOK();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            commonFunctions.alertMsgOK();
        });
    });

    this.Given(/^I am on the Search Clinical Trials Screen$/, function () {
        return browser.sleep(25).then(function() {
            /** Updated by Shilpi to test for both PA search screen and Registry Search screen **/
            login.loginUser.getText().then(function (loggedInUserName) {
                if (loggedInUserName === 'ctrpabstractor') {
                    //pageMenu.clickSearchTrialAbstractor();
                    //commonFunctions.verifySearchTrialsPAScreen();
                }
                if (loggedInUserName === 'ctrptrialsubmitter') {
                    trialMenuItem.clickTrials();
                    trialMenuItem.clickListSearchTrialLink();
                }
            });
        });
    });

    this.When(/^I select one or more of the values to search all trials$/, function (table) {
        return browser.sleep(25).then(function() {
            data = table.raw();
            console.log('value of table' + data);
            pageSearchTrail.setSearchTrialProtocolID('*');
            pageSearchTrail.clickSearchTrialSearchButton();
        });
    });

    this.Then(/^CTRP will then display the results for all the Clinical Trials Search Results$/, function (table) {
        return browser.sleep(25).then(function() {

        });
    });

    /*
     Scenario: #2 I can search for clinical trials by Official Title
         Given I am logged into the CTRP Protocol Abstraction application
         And I am on the Search Clinical Trials Screen
         When I enter text in the official title selection
         And select a search option
         Then the search results will display all trials that contain the official title search text
         And the alternative title text
     */

    this.When(/^I enter text in the official title selection$/, function (callback) {
        pageSearchTrail.setSearchTrialOfficialTitle('test');
        pageSearchTrail.clickSearchTrialSearchButton();
        browser.sleep(25).then(callback);
    });

    this.When(/^select a search option$/, function (callback) {
        /** Updated by Shilpi to test for both PA search screen and Registry Search screen **/
        login.loginUser.getText().then(function(loggedInUserName) {
            if(loggedInUserName === 'ctrpabstractor') {
                // Write code here that turns the phrase above into concrete actions
                callback.pending();
            }
            if(loggedInUserName === 'ctrptrialsubmitter' || loggedInUserName === 'ctrptrialsubmitter2') {
                browser.sleep(25).then(callback);
            }
        });
       // callback.pending();
    });

    this.Then(/^the search results will display all trials that contain the official title search text$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the alternative title text$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select an Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^select the search option$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that match the Organization selected for the trial from$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more Identifier Types$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^select search$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that contain that Identifier type$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I enter text in the Identifier$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that contain the identifier$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select a persons from the person name search$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials where the person selected is the principal investigator$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more trial primary purposes$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that match the primary purpose selected$/, function (callback) {
        /** Updated by Shilpi to test for both PA search screen and Registry Search screen **/
        login.loginUser.getText().then(function(loggedInUserName) {
            if(loggedInUserName === 'ctrpabstractor') {
                // Write code here that turns the phrase above into concrete actions
                callback.pending();
            }
            if(loggedInUserName === 'ctrptrialsubmitter' || loggedInUserName === 'ctrptrialsubmitter2') {
                browser.sleep(25).then(callback);
            }
        });
    });

    this.When(/^I select one or more Phases \((\d+), I, I\/II, II, II\/III, III, IV, NA\)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that have the selected Phase$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the Pilot "([^"]*)" option$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that have the Pilot criteria equal to "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more  current Trial Status'$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that have the Current Trial Status$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more Processing Status'$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that have that Processing Status$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more Milestones$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that have that Milestone$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more Hold Status'$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that have that On Hold Status$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select Trials I have checked out$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that have Trials I have checked out$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more Submission Types$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that have that Submission Type$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more Submission Methods$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that have that Submission Method$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more Study Sources$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials with matching Study Sources$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more Clinical Research Categories$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials with matching Clinical Research Category$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more NIH\/NCI Division\/Department Identifiers$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials with matching NIH\/NCI Division\/Department Identifier$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one or more NIH\/NCI Program Identifiers$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials with matching NIH\/NCI Program Identifier$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I enter select an Identifier Type "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that contain that Identifier type NCI and Duplicate NCI ID$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I enter select a Identifier Type "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the search results will display trials that contain that Identifier type ClinicalTrails\.gov \(NCT\) and Obsolete ClinicalTrails\.gov \(NCT\) ID$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });





};
