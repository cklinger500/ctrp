/**
 * Created by singhs10 on 4/18/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var menuItemList = require('../support/PoCommonBar');
var moment = require('moment');
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var orgPage = require('../support/ListOfOrganizationsPage');
var personPage = require('../support/AddPersonPage');
var underscore = require('underscore');

module.exports = function () {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var menuItem = new menuItemList();
    var searchPerson = new listOfPeoplePage();
    var searchOrg = new orgPage();
    var addPerson = new personPage();

    this.Given(/^I have completed a person search$/, function () {
        return browser.sleep(25).then(function () {
            menuItem.clickPeople();
            menuItem.clickListPeople();
            searchPerson.clickClear();
            per4.then(function (value) {
                searchPerson.setPersonFirstName(value);
            });
            searchOrg.clickSearchButton();
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have cliked on the name of the person I want to view$/, function () {
        return browser.sleep(25).then(function () {
            per4.then(function (value) {
                element(by.linkText(value)).click();
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the View Person screen opens with the page title as "([^"]*)"$/, function (arg1, callback) {
        expect(menuItem.add_Person_Page.getText()).to.eventually.equal(arg1).and.notify(callback);
    });

    this.Then(/^I will view person details type$/, function (table) {
        return browser.sleep(25).then(function () {
            viewPersonTable = table.rowsHash();
            console.log('****Table for View Person****');
            console.log(viewPersonTable);
            addPerson.getVerifyAddPerPrefix(viewPersonTable['Prefix']);
            per4.then(function (value) {
                addPerson.getVerifyAddPerFName(value);
            });
            addPerson.getVerifyAddPerMName(viewPersonTable['Middle Name']);
            addPerson.getVerifyAddPerLName(viewPersonTable['Last Name']);
            addPerson.getVerifyAddPerSuffix(viewPersonTable['Suffix']);
            addPerson.getVerifyAddPerSourceContext(viewPersonTable['Source Context']);
            perSourceId.then(function (value) {
                expect(addPerson.addPersonSourceId.getText()).to.eventually.equal(value);
            });
            addPerson.getVerifyAddPerSourceStatus(viewPersonTable['Source Status']);
            addPerson.getVerifyAddPerEmail(viewPersonTable['Email']);
            addPerson.getVerifyAddPerPhone(viewPersonTable['Phone Number']);
            cukeOrganization.then(function (value) {
                projectFunctions.verifyOrgAffiliated(value);
                var defaultEffectiveDate = moment().format('DD-MMM-YYYY');
                projectFunctions.verifyOrgPersonAffiliatedEffectiveDate(value, defaultEffectiveDate);
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I should not be allowed to edit person parameters$/, function () {
        return browser.sleep(25).then(function () {
            expect(addPerson.addPersonPrefix.isEnabled()).to.eventually.equal(false);
            expect(addPerson.addPersonFirstName.isEnabled()).to.eventually.equal(false);
            expect(addPerson.addPersonSecondName.isEnabled()).to.eventually.equal(false);
            expect(addPerson.addPersonLastName.isEnabled()).to.eventually.equal(false);
            expect(addPerson.addPersonSuffix.isEnabled()).to.eventually.equal(false);
            expect(addPerson.addPersonSourceContext.isEnabled()).to.eventually.equal(false);
            expect(addPerson.addPersonSourceStatus.isEnabled()).to.eventually.equal(false);
            expect(addPerson.addPersonEmail.isEnabled()).to.eventually.equal(false);
            expect(addPerson.addPersonPhone.isEnabled()).to.eventually.equal(false);//.and.notify(callback);
        });
    });

    this.Then(/^I should not be allowed to delete a person$/, function (callback) {
        callback();
    });

    this.Then(/^I should not view, edit or delete comments added by curators$/, function (callback) {
        expect(addPerson.addPersonComment.get(1).isPresent()).to.eventually.equal(false).and.notify(callback);
    });

    this.Then(/^the "([^"]*)" button should be invisible to the user$/, function (arg1, callback) {
        expect(searchOrg.orgModelSearch.isPresent()).to.eventually.equal(false).and.notify(callback);
    });

    this.Then(/^the following button type should also be invisible to the user$/, function (table) {
        return browser.sleep(25).then(function () {
            expect(addPerson.personSaveButton.isPresent()).to.eventually.equal(false);
            expect(addPerson.personResetButton.isPresent()).to.eventually.equal(false);
            expect(addPerson.personDeleteButton.isPresent()).to.eventually.equal(false);//.and.notify(callback);
        });
    });


};



