/**
 * Created by singhs10 on 10/19/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var menuItemList = require('../support/PoCommonBar');
var personPage = require('../support/AddPersonPage');
var helper = require('../support/helper');
var moment = require('moment');
var loginPage = require('../support/LoginPage');
var projectFunctionsPage= require('../support/projectMethods');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');


module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var search = new listOfPeoplePage();
    var person = new personPage();
    var projectFunctions = new projectFunctionsPage();
    var orgEffectiveDate = '19-Oct-2015';
    var orgExpirationDate = '19-Oct-2020';
    var commonFunctions = new abstractionCommonMethods();

    this.Given(/^I know which person's organizational affiliation I want to change$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40)
            .then(function(){
                menuItem.clickHomeEnterOrganizations();
                login.clickWriteMode('On');
                projectFunctions.createPersonWithAffiliatedOrg('Mr','SScuke','Shia','Singh','Kt','singh@cukePR.com','222-444-5555','ShiOrg','08-Oct-2015','25-Oct-2020');
            });
        browser.sleep(25).then(callback);
    });

    this.When(/^I change a Person's Affiliated Organization with Effective Date and Expiration Date and save it$/, function (callback) {
        cukeOrganization.then(function(value) {
            projectFunctions.setOrgPersonAffiliatedEffectiveDate(value,orgEffectiveDate);
            projectFunctions.setOrgPersonAffiliatedExpirationDate(value,orgExpirationDate);
        });
        person.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Person record Affiliated Organization information should be updated$/, function (callback) {
        cukePerson.then(function(value) {
            menuItem.clickPeople();
            menuItem.clickListPeople();
            search.setPersonFirstName(value);
            search.clickSearch();
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
            person.getVerifyAddPerFName(value);
        });
        cukeOrganization.then(function(value) {
            projectFunctions.verifyOrgAffiliated(value);
            projectFunctions.verifyOrgPersonAffiliatedEffectiveDate(value,moment(new Date(orgEffectiveDate)).format('DD-MMM-YYYY'));
            projectFunctions.verifyOrgPersonAffiliatedExpirationDate(value,moment(new Date(orgExpirationDate)).format('DD-MMM-YYYY'));
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^logout$/, function (callback) {
        login.logout();
        browser.sleep(25).then(callback);
    });

};
