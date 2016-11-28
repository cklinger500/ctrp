/**
 * Created by singhs10 on 8/27/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var loginPage = require('../support/LoginPage');
var listOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var menuItemList = require('../support/PoCommonBar');
var addOrganizationPage = require('../support/AddOrganizationPage');
var mainSelectItemPage = require('../support/CommonSelectList.js');
var projectFunctionsPage= require('../support/projectMethods');
var moment = require('moment');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');

module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var addOrg = new addOrganizationPage();
    var searchOrg = new listOfOrganizationPage();
    var selectItem =new mainSelectItemPage();
    var projectFunctions = new projectFunctionsPage();
    var sourceStatus = 'Pending';
    var addressEdited = '1988 S 16th Edited';
    var address2Edited = '1988 S 16th add2 Edited';
    var phoneEdited = '444-5555-666';
    var emailEdited = 'test_SS@PR.cuke';
    var cityEdited = 'Wilmington Edited';
    var countryEdited = 'Nepal';
    var stateEdited = 'Bagmati';
    var stateEditedforUS = 'Florida';
    var postalEdited = '20008';
    var commonFunctions = new abstractionCommonMethods();


    this.Given(/^I know which organization I want to edit$/, function (callback) {
        projectFunctions.createOrgforEdit();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have searched for a CTRP organization and found the one I wish to edit$/, function (callback) {
        cukeOrganization.then(function(value){
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the function Edit Organization$/, function (callback) {
        cukeOrganization.then(function(value){
            element(by.linkText(value)).click();
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the edit organization information screen$/, function (callback) {
        addOrg.getVerifyEditHeader();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change the name of the organization I wish to edit$/, function (callback) {
        cukeOrganization.then(function(value){addOrg.setAddOrgName(value + 'Edited'); });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I set the organization status to either Pending or Active$/, function (callback) {
        selectItem.selectSourceStatus(sourceStatus);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I submit my edit request$/, function (callback) {
        addOrg.clickSave();
        dateOrgEdited = moment().format('DD-MMM-YYYY H:mm');
        console.log('value of first dateorg edited' + dateOrgEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the organization name in the organization record to the new name$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value + 'Edited');
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value + 'Edited')).to.become('true');
            element(by.linkText(value + 'Edited')).click();
            addOrg.getVerifyAddOrgName(value + 'Edited');
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^my name should be listed as last update with the current date and time$/, function (callback) {
        projectFunctions.verifyLastUpdatedNameDate('organization',dateOrgEdited);
        console.log('value of second dateorg edited' + dateOrgEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the organization status should be Pending or Active as indicated$/, function (callback) {
        addOrg.getVerifyAddSourceStatus(sourceStatus);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change the address of the organization I wish to edit$/, function (callback) {
        addOrg.setAddAddress(addressEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the organization address in the organization record to the new address$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
            addOrg.getVerifyAddAddress(addressEdited);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change the phone number of the organization I wish to edit$/, function (callback) {
        addOrg.setAddPhone(phoneEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the organization phone number in the organization record to the new phone number$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
            addOrg.getVerifyAddPhone(phoneEdited);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change the email of the organization I wish to edit$/, function (callback) {
        addOrg.setAddEmail(emailEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the organization email in the organization record to the new email$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
            addOrg.getVerifyAddEmail(emailEdited);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change the city of the organization I wish to edit$/, function (callback) {
        addOrg.setAddCity(cityEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the city in the organization record to the new city$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
            addOrg.getVerifyAddCity(cityEdited);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change the state of the organization I wish to edit$/, function (callback) {
        selectItem.selectState(stateEditedforUS);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the state in the organization record to the new state$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
            addOrg.getVerifyAddState(stateEditedforUS);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change the country of the organization I wish to edit$/, function (callback) {
        selectItem.selectCountry(countryEdited);
        selectItem.selectState(stateEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the country in the organization record to the new country$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
            addOrg.getVerifyAddCountry(countryEdited);
            addOrg.getVerifyAddState(stateEdited);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change the zip code of the organization I wish to edit$/, function (callback) {
        addOrg.setAddPostalCode(postalEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the zip code in the organization record to the new zip code$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
            addOrg.getVerifyAddPostalCode(postalEdited);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change multiple parameters of the organization I wish to edit$/, function (callback) {
        cukeOrganization.then(function(value){addOrg.setAddOrgName(value + 'Edited1'); });
        addOrg.setAddAddress2(address2Edited);
        addOrg.setAddCity(cityEdited);
        selectItem.selectCountry(countryEdited);
        selectItem.selectState(stateEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change all the parameters in the organization record$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value + 'Edited1');
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value + 'Edited1')).to.become('true');
            element(by.linkText(value + 'Edited1')).click();
            addOrg.getVerifyAddOrgName(value + 'Edited1');
            addOrg.getVerifyAddAddress2(address2Edited);
            addOrg.getVerifyAddCity(cityEdited);
            addOrg.getVerifyAddCountry(countryEdited);
            addOrg.getVerifyAddState(stateEdited);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am in the Edit Organization feature$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            projectFunctions.createOrganization('shiOrg4Edit','alias','add1','add2','United States','Florida','avenue','24567','s@s.com','222-444-5555','444-6666-555');
            addOrg.setAddOrgName('test');
            selectItem.selectSourceStatus('InActive');
            addOrg.setAddAlias('editAl44');
            addOrg.clickSaveAlias();
            addOrg.setAddAlias('aliasInAliasbox');
            addOrg.setAddAddress('address1');
            addOrg.setAddAddress2('address2');
            selectItem.selectCountry('Nepal');
            selectItem.selectState('Bagmati');
            addOrg.setAddCity('city');
            addOrg.setAddPostalCode('2009');
            addOrg.setAddEmail('sdji');
            addOrg.setAddPhone('398');
            addOrg.setAddFax('879');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to cancel my changes$/, function (callback) {
        callback();
    });

    this.When(/^I select the Reset function$/, function (callback) {
        addOrg.clickReset();
        browser.sleep(25).then(callback);
    });

    this.Then(/^edit form will be refreshed with the last committed values for the selected organization$/, function (callback) {
        cukeOrganization.then(function(value){
            addOrg.getVerifyAddOrgName(value);
            expect(projectFunctions.verifyOrgAlias('alias')).to.become('true');
            expect(projectFunctions.verifyOrgAlias('editAl44')).to.become('false');
            addOrg.getVerifyAddAddress('add1');
            addOrg.getVerifyAddAddress2('add2');
            addOrg.getVerifyAddCity('avenue');
            addOrg.getVerifyAddEmail('s@s.com');
            addOrg.getVerifyAddFax('444-6666-555');
            addOrg.getVerifyAddPhone('222-444-5555');
            addOrg.getVerifyAddPostalCode('24567');
            addOrg.getVerifyAddCountry('United States');
            addOrg.getVerifyAddState('Florida');
            addOrg.getVerifyAddSourceStatusDefault('Active');
            console.log('Test the alias added in field is clear after Reset');
            addOrg.getVerifyAddOrgAlias('');
        });
        browser.sleep(25).then(callback);
    });


};
