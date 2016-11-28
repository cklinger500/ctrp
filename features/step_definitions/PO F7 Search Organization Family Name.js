/**
 * Created by singhs10 on 10/6/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var menuItemList = require('../support/PoCommonBar');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var projectFunctionsPage= require('../support/projectMethods');
var moment = require('moment');


module.exports = function() {
    var menuItem = new menuItemList();
    var searchFamily = new listFamilyPage();
    var selectItem =new selectList();
    var projectFunctions = new projectFunctionsPage();



    this.Given(/^I select the option to search Organization Family$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListFamily();
        browser.sleep(250).then(callback);
    });

    this.Then(/^I want to search with family name (.*)$/, function (familyName, callback) {
        searchFamily.setFamilyName(familyName);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I click on Search button$/, function (callback) {
        searchFamily.clickSearchButton();
        browser.sleep(250).then(callback);
    });

    this.Then(/^In the search result for family name (.*) it shall return result (.*)$/, function (familyName, result, callback) {
        expect(projectFunctions.inSearchResults(familyName)).to.become(result);
        browser.sleep(250).then(callback);
    });

    this.Given(/^the result should be sorted by family name$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I want to search with family type (.*)$/, function (familyType, callback) {
        selectItem.selectFamilyType(familyType);
        browser.sleep(250).then(callback);
    });

    this.Then(/^In the search result for family type (.*) it shall return result (.*)$/, function (familyType, result, callback) {
        expect(projectFunctions.inSearchResults(familyType)).to.become(result);
        browser.sleep(250).then(callback);
    });

    this.Then(/^I want to search with family status (.*)$/, function (familyStatus, callback) {
        selectItem.selectFamilyStatus(familyStatus);
        browser.sleep(250).then(callback);
    });

    this.Then(/^In the search result for family status (.*) it shall return result (.*)$/, function (familyStatus, result, callback) {
        expect(projectFunctions.inSearchResults(familyStatus)).to.become(result);
        browser.sleep(250).then(callback);
    });

    this.Then(/^I want to search with family name as "([^"]*)"$/, function (arg1, callback) {
        searchFamily.setFamilyName(arg1);
        browser.sleep(250).then(callback);
    });

    this.Then(/^the search results should display the following sorted by family name$/, function (table, callback) {
      //  expect(projectFunctions.inResultsHeader('Family Name')).to.become('true');
     //   expect(projectFunctions.inResultsHeader('Family Status')).to.become('true');
     //   expect(projectFunctions.inResultsHeader('Family Type')).to.become('true');
     //   expect(projectFunctions.inResultsHeader('OrganizationFamilyMembers')).to.become('true');
     //   expect(projectFunctions.inResultsHeader('OrganizationFamilyMemberRelationship')).to.become('true');
     //   browser.sleep(250).then(callback);
        callback.pending();
    });

    this.Given(/^I want to search with family type (.*)$/, function (familyType, callback) {
        selectItem.selectFamilyType(familyType);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I want to search with family status (.*)$/, function (familyStatus, callback) {
        selectItem.selectFamilyStatus(familyStatus);
        browser.sleep(250).then(callback);
    });

    this.Then(/^In the search result for family name (.*) ,family type (.*) and family status (.*) it shall return result (.*)$/, function (familyName, familyType, familyStatus, result, callback) {
        if (familyName !== '')
        {expect(projectFunctions.inSearchResults(familyName)).to.become(result);}
        if (familyStatus !== '')
        {expect(projectFunctions.inSearchResults(familyStatus)).to.become(result);}
        if (familyType !== '')
        {expect(projectFunctions.inSearchResults(familyType)).to.become(result);}
        browser.sleep(250).then(callback);
    });

    this.Given(/^the result should be sorted by family name$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the option to Search Families$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListFamily();
        browser.sleep(25).then(callback);
    });

    this.Given(/^Exact Search box is selected in Family Search$/, function (callback) {
        searchFamily.clickFamilyExactSearch('true');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have entered the "([^"]*)" Family name$/, function (arg1, callback) {
       // searchFamily.clearSearchButton();
        if(arg1 === 'exact') {
            searchFamily.setFamilyName('Albert Einstein Cancer Center');
        }
        else if(arg1 === 'partial') {
            searchFamily.setFamilyName('Albert Einstein');
        }
        searchFamily.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Family Name will be displayed on the Family search results table$/, function (callback) {
        expect(projectFunctions.inSearchResults('Albert Einstein Cancer Center')).to.become('true').and.notify(callback);
    });

    this.Given(/^Exact Search box is Not selected in Family Search$/, function (callback) {
        searchFamily.clickFamilyExactSearch('false');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have not entered the exact Family name$/, function (callback) {
        searchFamily.setFamilyName('Albert Einstein');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Family Name will not be displayed on the Family search results table$/, function (callback) {
        expect(projectFunctions.inSearchResults('Albert Einstein Cancer Center')).to.become('false').and.notify(callback);
    });



};
