/**
 * Created by singhs10 on 9/29/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var menuItemList = require('../support/PoCommonBar');
var personPage = require('../support/AddPersonPage');
var orgPage = require('../support/ListOfOrganizationsPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var moment = require('moment');
var loginPage = require('../support/LoginPage');
var projectFunctionsPage= require('../support/projectMethods');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');


module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var search = new listOfPeoplePage();
    var person = new personPage();
    var searchOrg = new orgPage();
    var selectItem =new selectList();
    var projectFunctions = new projectFunctionsPage();
    var sourceStatus = 'Pending';
    var phoneEditTo = '422-522-6622';
    var emailEditTo = 'ssingh@cukeEdited.test';
    var prefixEditTo = 'Mr Edited';
    var middleNameEditTo = 'Shia Edited';
    var lastNameEditTo = 'Singh Edited';
    var suffixEditTo = 'Kt Edited';
    var orgEffectiveDate = '08-Oct-2015';
    var orgExpirationDate = '25-Oct-2020';
    var commonFunctions = new abstractionCommonMethods();


    this.Given(/^I know which Person record I want to edit$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 40).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            projectFunctions.createPerson('Mr', 'SScuke', 'Shia', 'Singh', 'Kt', 'singh@cukePR.com', '222-444-5555');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have searched for a Person record and found the one I wish to edit$/, function (callback) {
        menuItem.clickPeople();
        menuItem.clickListPeople();
        search.setPersonFirstName(cukePerson);
        search.clickSearch();
        cukePerson.then(function(value) {
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the function Edit Person$/, function (callback) {
        element(by.linkText(cukePerson)).click();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the edit Person information screen$/, function (callback) {
      person.verifyPersonEditHeader();
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the name of the Person I wish to edit$/, function (callback) {
        cukePerson.then(function(value) {
            person.setAddPersonFirstName(value + 'Edited');
        });
        browser.sleep(25).then(callback);
    });


    this.When(/^I set the Person status to either Pending or Active$/, function (callback) {
        selectItem.selectSourceStatus(sourceStatus);
        browser.sleep(25).then(callback);
    });

    this.When(/^I submit my edit request for Person$/, function (callback) {
        person.clickSave();
        personEditedDateTime = moment().format('DD-MMM-YYYY H:mm');
        console.log('Date time when Save is : ' + personEditedDateTime);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the Person name in the Person record to the new name$/, function (callback) {
        cukePerson.then(function(value) {
            menuItem.clickPeople();
            menuItem.clickListPeople();
            search.setPersonFirstName(value + 'Edited');
            search.clickSearch();
            expect(projectFunctions.inSearchResults(value + 'Edited')).to.become('true');
            element(by.linkText(value + 'Edited')).click();
        });
        projectFunctions.verifyLastUpdatedNameDate('person',personEditedDateTime);
        browser.sleep(25).then(callback);
    });

    this.Then(/^my name should be listed as last update with the current date and time for Person$/, function (callback) {
     //   person.personVerifyLastUpdatedNameDate(dateTimeNow);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the person status should be Pending or Active as indicated$/, function (callback) {
     //   person.getVerifyAddPerSourceStatus(sourceStatus);
        browser.sleep(25).then(callback);
    });


    this.When(/^I change the phone number of the Person I wish to edit$/, function (callback) {
            person.setAddPersonPhone(phoneEditTo);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the phone number in the Person record to the new phone number$/, function (callback) {
        cukePerson.then(function(value1) {
            console.log('set first Name' + value1);
            menuItem.clickPeople();
            menuItem.clickListPeople();
            search.setPersonFirstName(value1);
            search.setPersonPhone(phoneEditTo);
            search.clickSearch();
            expect(projectFunctions.inSearchResults(value1)).to.become('true');
            element(by.linkText(value1)).click();
            person.getVerifyAddPerFName(value1);
            person.getVerifyAddPerPhone(phoneEditTo);
        });
        projectFunctions.verifyLastUpdatedNameDate('person',personEditedDateTime);
        browser.sleep(25).then(callback);
    });


    this.When(/^I change the email of the Person I wish to edit$/, function (callback) {
        person.setAddPersonEmail(emailEditTo);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the email address in the Person record to the new email address$/, function (callback) {
        cukePerson.then(function(value1) {
            menuItem.clickPeople();
            menuItem.clickListPeople();
            console.log('set first Name' + value1);
            search.setPersonFirstName(value1);
            search.setPersonEmail(emailEditTo);
            search.clickSearch();
            expect(projectFunctions.inSearchResults(value1)).to.become('true');
            expect(projectFunctions.inSearchResults(emailEditTo)).to.become('true');
            element(by.linkText(value1)).click();
            person.getVerifyAddPerFName(value1);
            person.getVerifyAddPerEmail(emailEditTo);
        });
        projectFunctions.verifyLastUpdatedNameDate('person',personEditedDateTime);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know which Person with affiliated Organization record I want to edit$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40)
            .then(function(){
                menuItem.clickHomeEnterOrganizations();
                login.clickWriteMode('On');
                projectFunctions.createPersonWithAffiliatedOrg('Mr','SScuke','Shia','Singh','Kt','singh@cukePR.com','222-444-5555','ShiOrg','','');
            });
        browser.sleep(25).then(callback);
    });


    this.Given(/^I select an Affiliated Organization$/, function (callback) {
        cukeOrganization.then(function(value) {
            console.log('Affiliated Organization: '+ value);
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the effective date or expiration date of the Affiliated Organization I wish to edit$/, function (callback) {
        searchOrg.setAffiliatedOrgEffectiveDate(orgEffectiveDate);
        searchOrg.setAffiliatedOrgExpirationDate(orgExpirationDate);
        person.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the effective date or expiration date of the Affiliated Organization in the Person Record$/, function (callback) {
        cukePerson.then(function(value) {
            menuItem.clickPeople();
            menuItem.clickListPeople();
            search.setPersonFirstName(value);
            search.clickSearch();
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
        });
            searchOrg.verifyAffiliatedOrgEffectiveDate(moment(new Date(orgEffectiveDate)).format('DD-MMM-YYYY'));
            searchOrg.verifyAffiliatedOrgExpirationDate(moment(new Date(orgExpirationDate)).format('DD-MMM-YYYY'));
        browser.sleep(25).then(callback);
    });

    this.Then(/^I select the function to add an Affiliated Organization$/, function (callback) {
        projectFunctions.createOrganization('aff_Org','alias','add1','add2','Nepal','Bagmati','Kathmandu','24567','s@s.com','222-4444-555','444-6666-555');
        menuItem.clickPeople();
        menuItem.clickListPeople();
        cukePerson.then(function(value) {
            search.setPersonFirstName(value);
            search.clickSearch();
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
        });
        searchOrg.clickOrgSearchModel();
        browser.sleep(25).then(callback);
    });


    this.When(/^I select an additional Affiliated organization$/, function (callback) {
        searchOrg.setOrgName(cukeOrganization);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I enter the Affiliate organization effective date$/, function (callback) {
        cukeOrganization.then(function(value) {
            console.log('value of affiliated org:' + value);
            projectFunctions.setOrgPersonAffiliatedEffectiveDate(value,orgEffectiveDate);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should add the Affiliated Organization with the effective date in the Person Record$/, function (callback) {
        cukePerson.then(function(value) {
            menuItem.clickPeople();
            menuItem.clickListPeople();
            search.setPersonFirstName(value);
            search.clickSearch();
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
        });
        cukeOrganization.then(function(value) {
            projectFunctions.verifyOrgAffiliated(value);
            projectFunctions.verifyOrgPersonAffiliatedEffectiveDate(value,moment(new Date(orgEffectiveDate)).format('DD-MMM-YYYY'));
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the Person Prefix$/, function (callback) {
        person.setAddPersonPrefix(prefixEditTo);
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the Person First Name$/, function (callback) {
        cukePerson.then(function(value) {
            person.setAddPersonFirstName(value + 'Edited');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the Person Middle Name$/, function (callback) {
        person.setAddPersonSecondName(middleNameEditTo);
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the Person Last Name$/, function (callback) {
        person.setAddPersonLastName(lastNameEditTo);
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the Person Suffix$/, function (callback) {
        person.setAddPersonSuffix(suffixEditTo);
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the Person Email$/, function (callback) {
        person.setAddPersonEmail(emailEditTo);
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the Person Phone$/, function (callback) {
        person.setAddPersonPhone(phoneEditTo);
        browser.sleep(25).then(callback);
    });

    this.When(/^I change an Affiliated Organization and Effective Date and Expiration Date$/, function (callback) {
        cukeOrganization.then(function(value) {
            projectFunctions.setOrgPersonAffiliatedEffectiveDate(value,orgEffectiveDate);
            projectFunctions.setOrgPersonAffiliatedExpirationDate(value,orgExpirationDate);
        });
        person.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should update the Person record with the edited information$/, function (callback) {
        cukePerson.then(function(value) {
            menuItem.clickPeople();
            menuItem.clickListPeople();
            search.setPersonFirstName(value + 'Edited');
            search.clickSearch();
            expect(projectFunctions.inSearchResults(value + 'Edited')).to.become('true');
            element(by.linkText(value + 'Edited')).click();
            person.getVerifyAddPerFName(value + 'Edited');
        });
        person.getVerifyAddPerPrefix(prefixEditTo);
        person.getVerifyAddPerMName(middleNameEditTo);
        person.getVerifyAddPerLName(lastNameEditTo);
        person.getVerifyAddPerSuffix(suffixEditTo);
        person.getVerifyAddPerEmail(emailEditTo);
        person.getVerifyAddPerPhone(phoneEditTo);
        cukeOrganization.then(function(value) {
            projectFunctions.verifyOrgAffiliated(value);
            projectFunctions.verifyOrgPersonAffiliatedEffectiveDate(value,moment(new Date(orgEffectiveDate)).format('DD-MMM-YYYY'));
            projectFunctions.verifyOrgPersonAffiliatedExpirationDate(value,moment(new Date(orgExpirationDate)).format('DD-MMM-YYYY'));
        });
        browser.sleep(25).then(callback);
    });

};
