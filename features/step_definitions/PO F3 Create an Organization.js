/**
 * Created by singhs10 on 8/7/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var loginPage = require('../support/LoginPage');
var listOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var menuItemList = require('../support/PoCommonBar');
var addOrganizationPage = require('../support/AddOrganizationPage');
var mainSelectItemPage = require('../support/CommonSelectList');
var projectFunctionsPage= require('../support/projectMethods');
var moment = require ('moment');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');

module.exports = function() {
    var projectFunctions = new projectFunctionsPage();
    var login = new loginPage();
    var menuItem = new menuItemList();
    var searchOrg = new listOfOrganizationPage();
    var addOrg = new addOrganizationPage();
    var selectItem =new mainSelectItemPage();
    var organization_search_create = 'ShSOrg PR-CU';
    var address1 = '9605 Medical Center Drive, Suite 370';
    var address2 = '9650 Medical Center Drive, Suite 777';
    var country = 'Nepal';//'United States';
    var state = 'Seti';//'Maryland';
    var city = 'Rockville';
    var postalCode = '21046';
    var email = 'protractor_cucumbertest@nih.gov';
    var phone = '444-555-6666';
    var fax = '222-444-7777';
    var sourceStatus_Pending = 'Pending';
    var sourceStatus_Active = 'Active';
    var duplicate_org_name = 'Ochsner Baptist Medical Center';
    var sourceContext = '1'; // '1' selects CTRP
    var sourceID = 'CT 007';
    var commonFunctions = new abstractionCommonMethods();

    this.Given(/^I am a Curator and on the Add Organization screen$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            menuItem.clickOrganizations();
            menuItem.clickAddOrganizations();
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I look at the default values$/, function (callback) {
        addOrg.getVerifyAddOrgName('');
        addOrg.getVerifyAddOrgAlias('');
        addOrg.getVerifyAddAddress('');
        addOrg.getVerifyAddAddress2('');
        addOrg.getVerifyAddCity('');
        addOrg.getVerifyAddEmail('');
        addOrg.getVerifyAddFax('');
        addOrg.getVerifyAddPhone('');
        addOrg.getVerifyAddPostalCode('');
        addOrg.getVerifyAddState('Select a state or province');
        browser.sleep(25).then(callback);
    });

    this.Then(/^I will see "([^"]*)" as the default for Country$/, function (arg1, callback) {
        addOrg.getVerifyAddCountry(arg1);
        browser.sleep(25).then(callback);
    });

    this.Then(/^I will see "([^"]*)" as the default for Source Status$/, function (arg1, callback) {
        addOrg.getVerifyAddSourceStatusDefault(arg1);
        /***** This checks that in list only "Active" is there ********/
        addOrg.addSourceStatusList.getText().then(function(value) {
            console.log(value);
            expect(value).to.eql(arg1.toString().split(","));
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am have selected the Add Organization function$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickAddOrganizations();
        browser.sleep(25).then(callback);
    });



    this.Given(/^I have complete a Search for Organization$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        searchOrg.setOrgName(organization_search_create + moment().format('MMMDoYY hmmss'));
        orgToCreate = searchOrg.orgName.getAttribute('value');
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the information for the organization I wish to create$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickAddOrganizations();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full name of the organization$/, function (callback) {
        orgToCreate.then(function(value1) {
            console.log('Add Org' + value1);
            addOrg.setAddOrgName(value1);
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the address(\d+) of the organization$/, function (arg1, callback) {
        addOrg.setAddAddress(address1);
        addOrg.setAddAddress2(address2);
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the country as "([^"]*)"$/, function (arg1, callback) {
        selectItem.selectCountry(arg1);
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the state or province of the organization based on the country$/, function (callback) {
        addOrg.addCountry.$('option:checked').getText().then(function(value){
            if (value === 'United States') {
                console.log('value of county:' + value);
                selectItem.selectState('Maryland');
            }
            else
            selectItem.selectState(state);
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the city of the organization$/, function (callback) {
        addOrg.setAddCity(city);
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the zip code of the organization$/, function (callback) {
        addOrg.setAddPostalCode(postalCode);
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the Phone number of the organization$/, function (callback) {
        addOrg.setAddPhone(phone);
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the email of the organization$/, function (callback) {
        addOrg.setAddEmail(email);
        browser.sleep(25).then(callback);
    });


    this.When(/^I provide the Fax number of the organization$/, function (callback) {
        addOrg.setAddFax('444-5656');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I submit my create request$/, function (callback) {
        addOrg.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should create an organization record that contains:$/, function (table, callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        orgToCreate.then(function(value2) {
            console.log('Search org - ' + value2);
            searchOrg.setOrgName(value2);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value2)).to.become('true');
            element(by.linkText(value2)).click();
            addOrg.getVerifyAddOrgName(value2);
            addOrg.getVerifyAddAddress(address1);
            addOrg.getVerifyAddAddress2(address2);
            addOrg.getVerifyAddCity(city);
            addOrg.getVerifyAddEmail(email);
            addOrg.getVerifyAddFax('444-5656');
            addOrg.getVerifyAddPhone(phone);
            addOrg.getVerifyAddPostalCode(postalCode);
            addOrg.getVerifyAddState('Maryland');
            addOrg.getVerifyAddCountry('United States');
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the organization status should be Active/, function (callback) {
        addOrg.getVerifyAddSourceStatus(sourceStatus_Active);
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the country other than the "([^"]*)"$/, function (arg1, callback) {
        selectItem.selectCountry(country);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should create an organization record that does not contains zipcode:$/, function (table, callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        orgToCreate.then(function(value2) {
            console.log('Search org - ' + value2);
            searchOrg.setOrgName(value2);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value2)).to.become('true');
            element(by.linkText(value2)).click();
            addOrg.getVerifyAddOrgName(value2);
            addOrg.getVerifyAddAddress(address1);
            addOrg.getVerifyAddAddress2(address2);
            addOrg.getVerifyAddCity(city);
            addOrg.getVerifyAddEmail(email);
            addOrg.getVerifyAddFax('444-5656');
            addOrg.getVerifyAddPhone(phone);
            addOrg.getVerifyAddPostalCode('');
            addOrg.getVerifyAddState(state);
            addOrg.getVerifyAddCountry(country);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should create an organization record that contains only email:$/, function (table, callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        orgToCreate.then(function(value2) {
            console.log('Search org - ' + value2);
            searchOrg.setOrgName(value2);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value2)).to.become('true');
            element(by.linkText(value2)).click();
            addOrg.getVerifyAddOrgName(value2);
            addOrg.getVerifyAddAddress(address1);
            addOrg.getVerifyAddAddress2(address2);
            addOrg.getVerifyAddCity(city);
            addOrg.getVerifyAddEmail(email);
            addOrg.getVerifyAddFax('');
            addOrg.getVerifyAddPhone('');
            addOrg.getVerifyAddPostalCode(postalCode);
            addOrg.getVerifyAddState('Maryland');
            addOrg.getVerifyAddCountry('United States');
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should create an organization record that contains only phone:$/, function (table, callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        orgToCreate.then(function(value2) {
            console.log('Search org - ' + value2);
            searchOrg.setOrgName(value2);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value2)).to.become('true');
            element(by.linkText(value2)).click();
            addOrg.getVerifyAddOrgName(value2);
            addOrg.getVerifyAddAddress(address1);
            addOrg.getVerifyAddAddress2(address2);
            addOrg.getVerifyAddCity(city);
            addOrg.getVerifyAddEmail('');
            addOrg.getVerifyAddFax('444-5656');
            addOrg.getVerifyAddPhone(phone);
            addOrg.getVerifyAddPostalCode(postalCode);
            addOrg.getVerifyAddState('Maryland');
            addOrg.getVerifyAddCountry('United States');
        });
        browser.sleep(25).then(callback);
    });


    this.Given(/^I know the name of the organization I wish to create$/, function (callback) {
        projectFunctions.createOrganization('dupOrgtest','al','add1','add2','United States', 'Iowa', 'dupCity', '67897', 's@s.com', '676-2452-111', '45687');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I provide the full name of the organization I wish to create$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickAddOrganizations();
        cukeOrganization.then(function(value){
            addOrg.setAddOrgName(value);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should indicate with a warning that the organization is a duplicate name in the same context$/, function (callback) {
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function(){
            expect(projectFunctions.verifyWarningMessage('Warning: Organization exists in the database. Please verify and create a new Organization record.')).to.become('true').and.notify(callback);
        });
        // browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the create organization feature$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickAddOrganizations();
        addOrg.setAddOrgName('test');
        addOrg.setAddAlias('alias');
        addOrg.clickSaveAlias();
        addOrg.setAddAlias('alias2');
        addOrg.setAddAddress('address1');
        addOrg.setAddAddress2('address2');
        selectItem.selectCountry(country);
        selectItem.selectState(state);
        addOrg.setAddCity('city');
        addOrg.setAddPostalCode('2009');
        addOrg.setAddEmail('email@hotmail.com');
        addOrg.setAddPhone('398');
        addOrg.setAddFax('879');
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the clear option on create organization$/, function (callback) {
        addOrg.clickClear();
        browser.sleep(25).then(callback);
    });


    this.Then(/^all values in create organization for all fields will be cleared$/, function (callback) {
        addOrg.getVerifyAddOrgName('');
        addOrg.getVerifyAddOrgAlias('');
        addOrg.getVerifyAddAddress('');
        addOrg.getVerifyAddAddress2('');
        addOrg.getVerifyAddCity('');
        addOrg.getVerifyAddEmail('');
        addOrg.getVerifyAddFax('');
        addOrg.getVerifyAddPhone('');
        addOrg.getVerifyAddPostalCode('');
        addOrg.getVerifyAddState('Select a state or province');
        addOrg.getVerifyAddCountry('United States');
        addOrg.getVerifyAddSourceStatusDefault('Active');
        browser.sleep(25).then(callback);
    });




};

