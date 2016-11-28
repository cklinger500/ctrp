/**
 * Author: Shamim Ahmed
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
//var chaiParam = require('chai-param');
var should = chai.should();
// var   param = chaiParam.param;
var ListOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var addOrgPage = require('../support/AddOrganizationPage');
var LoginPage = require('../support/LoginPage.js');
var MenuItem = require('../support/PoCommonBar');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var personPage = require('../support/AddPersonPage');
var searchPersonPage = require('../support/ListOfPeoplePage');
var projectFunctionsPage = require('../support/projectMethods');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var assert = require('assert');
var searchTrialPage = require('../support/searchTrialPage');

module.exports = function() {
    var menuItemList = new MenuItem();
    var searchFamily = new listFamilyPage();
    var Search = new ListOfOrganizationPage();
    var addOrg = new addOrgPage();
    var login = new LoginPage();
    var addPerson = new personPage();
    var projectFunctions = new projectFunctionsPage();
    var searchPerson = new searchPersonPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var searchTrial = new searchTrialPage();
    var passedPromise = '';
    var failedPromise = '';
    var noAssert = 'Call';
    var gErr = '';

    this.Given(/^the user login into the ctrp application$/, function () {
        return browser.sleep(25).then(function() {
            browser.get('ui/#/main/sign_in');
            login.login('ctrptrialsubmitter', 'Welcome01');
            login.accept();
            menuItemList.clickHomeEnterOrganizations();
            trialMenuItem.clickHomeSearchTrial();
            //if (passedPromise === 'Passed') {
            //    passedPromise = 'Next';
            //    callback();
            //} else if (failedPromise === 'Failed') {
            //    passedPromise = 'Next';
            //    failedPromise = 'Next';
            //} else if (noAssert === 'Call') {
            //    passedPromise = 'Next';
            //    failedPromise = 'Next';
            //    browser.sleep(25).then(callback);
            //}
        });
    });

    this.Then(/^step definition test first attempt$/, function () {
        return browser.sleep(25).then(function() {
            trialMenuItem.clickHomeSearchTrial();
            searchTrial.setSearchTrialProtocolID('*');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialMyTrials();
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(true)//.then(function (pass){console.log('Passed :'+pass);passedPromise='Passed'; noAssert = 'Next';},function(err){passedPromise = 'Next'; failedPromise = 'Next'; noAssert = 'Next'; console.log('Error:'+err);if(err !== ''){callback(err);}});
            console.log('###########################true#########################################');
            searchTrial.setSearchTrialProtocolID('*');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialMyTrials();
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(false)//.then(function (pass){console.log('Passed :'+pass);passedPromise='Passed'; noAssert = 'Next';},function(err){passedPromise = 'Next'; failedPromise = 'Next'; noAssert = 'Next'; console.log('Error:'+err);if(err !== ''){callback(err);}});
            console.log('###########################true#########################################');
        });
    });

    this.Then(/^step definition test second attempt$/, function () {
        return browser.sleep(25).then(function() {
            trialMenuItem.clickHomeSearchTrial();
            searchTrial.setSearchTrialProtocolID('*');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialMyTrials();
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(true)//.then(function (pass){console.log('Passed :'+pass);passedPromise='Passed'; noAssert = 'Next';},function(err){passedPromise = 'Next'; failedPromise = 'Next'; noAssert = 'Next'; console.log('Error:'+err);if(err !== ''){callback(err);}});
            console.log('###########################true#########################################');
            searchTrial.setSearchTrialProtocolID('*');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialMyTrials();
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(false)//.then(function (pass){console.log('Passed :'+pass);passedPromise='Passed'; noAssert = 'Next';},function(err){passedPromise = 'Next'; failedPromise = 'Next'; noAssert = 'Next'; console.log('Error:'+err);if(err !== ''){callback(err);}});
            console.log('###########################true#########################################');
        });
    });

    this.Then(/^step definition test third attempt$/, function () {
        return browser.sleep(25).then(function() {
            trialMenuItem.clickHomeSearchTrial();
            searchTrial.setSearchTrialProtocolID('*');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialMyTrials();
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(true)//.then(function (pass){console.log('Passed :'+pass);passedPromise='Passed'; noAssert = 'Next';},function(err){passedPromise = 'Next'; failedPromise = 'Next'; noAssert = 'Next'; console.log('Error:'+err);if(err !== ''){callback(err);}});
            console.log('###########################true#########################################');
            searchTrial.setSearchTrialProtocolID('*');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialMyTrials();
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(false);
            console.log('###########################true#########################################');
        });
    });

    this.Then(/^step definition test fourth attempt$/, function () {
        return browser.sleep(25).then(function() {
            trialMenuItem.clickHomeSearchTrial();
            searchTrial.setSearchTrialProtocolID('*');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialMyTrials();
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(true);
            console.log('###########################true#########################################');
            searchTrial.setSearchTrialProtocolID('*');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialMyTrials();
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(false);
            console.log('###########################true#########################################');
        });
    });




}

