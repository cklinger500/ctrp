/**
 * Created by singhs10 on 4/19/16.
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
var addOrganizationPage = require('../support/AddOrganizationPage');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var underscore = require('underscore');


module.exports = function () {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var menuItem = new menuItemList();
    var searchPerson = new listOfPeoplePage();
    var searchOrg = new orgPage();
    var addPerson = new personPage();
    var addOrg = new addOrganizationPage();
    var searchFamily = new listFamilyPage();
    var addFamily = new familyPage();

    this.Given(/^I have completed an organization search$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctions.searchOrganizationLink();
            searchPerson.clickClear();
            orgSearch.then(function (value) {
                searchOrg.setOrgName(value);
            });
            searchOrg.clickSearchButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I click on the organization name$/, function () {
        return browser.sleep(25).then(function () {
            orgSearch.then(function (value) {
                element(by.linkText(value)).click();
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will be able to view Organization details type$/, function (table) {
        return browser.sleep(25).then(function () {
            viewOrgTable = table.rowsHash();
            console.log('****Table for View Organization****');
            console.log(viewOrgTable);
            orgSearch.then(function (value) {
                addOrg.getVerifyAddOrgName(value);
            });
            addOrg.getVerifyAddSourceContext(viewOrgTable['SourceContext']);
            orgSourceId.then(function (value) {
                expect(addOrg.addOrgCTRPID.getText()).to.eventually.equal(value);
            });
            addOrg.getVerifyAddSourceStatus(viewOrgTable['SourceStatus']);
            expect(projectFunctions.verifyOrgAlias(viewOrgTable['NameAlias'])).to.become('true');
            addOrg.getVerifyAddAddress(viewOrgTable['Address1']);
            addOrg.getVerifyAddAddress2(viewOrgTable['Address2']);
            addOrg.getVerifyAddCountry(viewOrgTable['Country']);
            addOrg.getVerifyAddState(viewOrgTable['State']);
            addOrg.getVerifyAddCity(viewOrgTable['City']);
            addOrg.getVerifyAddPostalCode(viewOrgTable['PostalCode']);
            addOrg.getVerifyAddEmail(viewOrgTable['Email']);
            addOrg.getVerifyAddPhone(viewOrgTable['Phone']);
         //   addOrg.getVerifyAddFax(viewOrgTable['Fax']);
            cukeFamily.then(function (value) {
                expect(addOrg.addVerifyOrgFamilyName.getText()).to.eventually.equal(value);
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I should not be allowed to edit organization parameters$/, function () {
        return browser.sleep(25).then(function () {
            expect(addOrg.addOrgName.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addSourceContext.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addSourceStatus.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addAlias.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addAddress.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addAddress2.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addCountry.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addState.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addCity.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addPostalCode.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addEmail.isEnabled()).to.eventually.equal(false);
            expect(addOrg.addPhone.isEnabled()).to.eventually.equal(false);
         //   expect(addOrg.addFax.isEnabled()).to.eventually.equal(false);//.and.notify(callback);
        });
    });

    this.When(/^I click on Families Link$/, function () {
        return browser.sleep(25).then(function () {
            cukeFamily.then(function (value) {
                element(by.linkText(value)).click();
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will view family details type$/, function (table) {
        return browser.sleep(25).then(function () {
            cukeFamily.then(function (value) {
                addFamily.familyVerifyAddName(value);
            });
            addFamily.familyVerifyAddType('NIH');
            addFamily.familyVerifyAddStatus('Active');
            addFamily.familyVerifyMembershipSize('1');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will view Organization details type$/, function (table) {
        return browser.sleep(25).then(function () {
            orgSearch.then(function (value) {
                projectFunctions.verifyOrgAffiliated(value);
                projectFunctions.verifyOrgAffiliatedEffectiveDateFamily(value, '05-May-2015');
                projectFunctions.verifyOrgAffiliatedExpirationDateFamily(value, '15-Apr-2018');
                expect(addFamily.familyOrgRelationship.$('option:checked').getText()).to.eventually.equal('Organizational');
                orgSourceId.then(function (orgSourceId) {
                    expect(addFamily.familyOrgSourceID.getText()).to.eventually.equal(orgSourceId);
                });
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^family detail might include all Organization statuses type$/, function (table, callback) {
        callback();
    });

    this.Then(/^user can click to view details of these Organizations$/, function () {
        return browser.sleep(25).then(function () {
            orgSearch.then(function (value) {
                element(by.linkText(value)).click();
            });
            cukeFamily.then(function (value) {
                element(by.linkText(value)).click();
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^Once on Family View page, user can also Search for another Family by going to Search Family$/, function () {
        return browser.sleep(25).then(function () {
            menuItem.clickListFamily();
            cukeFamily.then(function (value) {
                searchFamily.setFamilyName(value);
                searchFamily.clickSearchButton();
                expect(projectFunctions.inSearchResults(value)).to.become('true');
            });
            // browser.sleep(250).then(callback);
        });
    });


};

