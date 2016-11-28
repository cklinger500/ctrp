/**
 * Created by singhs10 on 10/19/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var menuItemList = require('../support/PoCommonBar');
var helper = require('../support/helper');
var moment = require('moment');
var loginPage = require('../support/LoginPage');
var projectFunctionsPage= require('../support/projectMethods');
var addOrganizationPage = require('../support/AddOrganizationPage');
var listOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');


module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var searchOrg = new listOfOrganizationPage();
    var addOrg = new addOrganizationPage();
    var projectFunctions = new projectFunctionsPage();
    var aliasToAdd = 'shiAlias';
    var commonFunctions = new abstractionCommonMethods();


    this.Given(/^I know the name of the alias I wish to add for an organization$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            projectFunctions.createOrganization('shiOrg','alias','add1','add2','United States','Florida','avenue','24567','s@s.com','222-4444-555','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the function Add Alias$/, function (callback) {
        projectFunctions.createUniqueOrgAlias(aliasToAdd);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the Add Alias information screen$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the alias name of the organization I wish to add for the selected organization$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^I submit my request$/, function (callback) {
        addOrg.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should add the alias name to the list of alias names for the selected organization$/, function (callback) {
        cukeAlias.then(function(value) {
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
        });
        cukeOrganization.then(function(value) {
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
        });
        cukeAlias.then(function(value) {
            expect(projectFunctions.verifyOrgAlias(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

};
