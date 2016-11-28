/**
 * Created by singhs10 on 9/21/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var menuItemList = require('../support/PoCommonBar');
var personPage = require('../support/AddPersonPage');
var OrgPage = require('../support/ListOfOrganizationsPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var projectFunctionsPage= require('../support/projectMethods');
var moment = require('moment');


module.exports = function() {
    var menuItem = new menuItemList();
    var searchPerson = new listOfPeoplePage();
    var addPerson = new personPage();
    var searchOrg = new OrgPage();
    var projectFunctions = new projectFunctionsPage();
    var firstName = 'ShSPerson PR-CU Fname ' ;
    var sourceStatus_Active = 'Active';

    this.Given(/^I know the first name, last name, middle name, with any prefix or suffix, phone or email, and organization affiliation of the Person$/, function (callback) {
        prefix = 'Dr.';
        middleName = 'ShSPerson PR-CU Mname' ;
        lastName = 'ShSPerson PR-CU Lname' ;
        suffix = 'Jr.';
        phone_verify = '444-555-6666' ;
        email_verify = 'test_cuke@PR.com';
        callback();
    });

    this.Given(/^I have complete a Search for Person and not found the Person in CTRP$/, function (callback) {
        projectFunctions.createOrganization('org4PersonAff', 'affOrgPerson', 'orgPersonAdd1', 'orgPersonAdd2', 'United States', 'Iowa', 'prgPersonCity', '28980', 'orgPerson@aff.com', '444-556-8989', '5670');
        menuItem.clickPeople();
        menuItem.clickListPeople();
        searchPerson.setPersonFirstName(firstName + moment().format('MMMDoYY hmmss'));
        per4 = searchPerson.personFirstName.getAttribute('value');
        searchPerson.clickSearch();
        per4.then(function(value1)  {
            expect(projectFunctions.inSearchResults(value1)).to.become('false');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected the Add Person function$/, function (callback) {
        menuItem.clickPeople();
        menuItem.clickAddPerson();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the name information of the Person I wish to create$/, function (callback) {
        addPerson.setAddPersonPrefix(prefix);
        per4.then(function(value1)  {
            console.log('Add first Name' + value1);
            addPerson.setAddPersonFirstName(value1);
        });
        addPerson.setAddPersonSecondName(middleName);
        addPerson.setAddPersonLastName(lastName);
        addPerson.setAddPersonSuffix(suffix);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I provide either the Phone (.*) or email (.*) of the Person I wish to create$/, function (Phone, Email, callback) {
        addPerson.setAddPersonEmail(Email);
        addPerson.setAddPersonPhone(Phone);
        browser.sleep(25).then(callback);
    });


    this.When(/^I have searched Organizations and selected an affiliated organization$/, function (callback) {
        searchOrg.clickOrgSearchModel();
        cukeOrganization.then(function(value) {
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            var defaultEffectiveDate = moment().format('DD-MMM-YYYY');
            projectFunctions.verifyOrgPersonAffiliatedEffectiveDate(value,defaultEffectiveDate);
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I submit my create request for Person$/, function (callback) {
        addPerson.clickSave();
        datePersonSaved =  moment().format('DD-MMM-YYYY H:mm');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should create a Person record that contains a unique PO ID, the person first name, last name, middle name, prefix, suffix, the CTEP ID as Null, the phone (.*) and\/or email (.*), and the affiliated organization$/, function (Phone, Email, callback) {
        menuItem.clickPeople();
        menuItem.clickListPeople();
        per4.then(function(value2)        {
            console.log('search person - ' + value2);
            searchPerson.setPersonFirstName(value2);
            searchPerson.clickSearch();
            expect(projectFunctions.inSearchResults(value2)).to.become('true');
            element(by.linkText(value2)).click();
            addPerson.getVerifyAddPerFName(value2);
            addPerson.getVerifyAddPerMName(middleName);
            addPerson.getVerifyAddPerLName(lastName);
            addPerson.getVerifyAddPerEmail(Email);
            addPerson.getVerifyAddPerPhone(Phone);
            addPerson.getVerifyAddPerPrefix(prefix);
            addPerson.getVerifyAddPerSuffix(suffix);
        });
        cukeOrganization.then(function(value) {
            projectFunctions.verifyOrgAffiliated(value);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Person status should be Active and the status date should be the current date and time$/, function (callback) {
        addPerson.getVerifyAddPerSourceStatus(sourceStatus_Active);
        projectFunctions.personVerifyCreatedNameDate(datePersonSaved);
        browser.sleep(25).then(callback);
    });


    this.Given(/^I am on Add Person$/, function (callback) {
        menuItem.clickPeople();
        menuItem.clickAddPerson();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I click on save person$/, function (callback) {
        addPerson.clickSave();
        browser.sleep(25).then(callback);
    });


    this.Given(/^I should get validation message "([^"]*)" for First Name$/, function (arg1, callback) {
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
        addPerson.setAddPersonFirstName('test');
        addPerson.clickSave();
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('false');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I should get validation message "([^"]*)" for Last Name$/, function (arg1, callback) {
        addPerson.clickReset();
        addPerson.clickSave();
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
        addPerson.setAddPersonLastName('testLname');
        addPerson.clickSave();
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('false');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I should get validation message "([^"]*)" for either Phone or Email$/, function (arg1, callback) {
        addPerson.clickReset();
        addPerson.clickSave();
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
        addPerson.setAddPersonEmail('test@eml.com');
        addPerson.clickSave();
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('false');
        addPerson.clickReset();
        addPerson.clickSave();
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
        addPerson.setAddPersonPhone('222-456-5675');
        addPerson.clickSave();
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('false');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter person first name which is duplicate$/, function (callback) {
        projectFunctions.createPerson('px','testDupName','midName','dupLName','sx','s@s.com','222-786-8799');
        menuItem.clickPeople();
        menuItem.clickAddPerson();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function() {
            cukePerson.then(function (value) {
                addPerson.setAddPersonFirstName(value);
           });
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter person last name which is duplicate$/, function (callback) {
        addPerson.setAddPersonLastName('dupLName');
        addPerson.setAddPersonSuffix('t1');
        addPerson.addPersonEmail.click();
        addPerson.setAddPersonLastName('dupLName');
        browser.sleep(2500).then(callback);
    });

    this.Then(/^I should get warning message "([^"]*)" for duplicate Person$/, function (arg1, callback) {
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function(){
            expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true').and.notify(callback);
    });
      //  browser.sleep(25).then(callback);
    });




};