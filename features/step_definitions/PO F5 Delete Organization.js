/**
 * Author: Shamim Ahmed
 * Date: 09/30/2015
 * Feature: PO F5 Delete Organization
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
var helperMethods = require('../support/helper');
var moment = require('moment');
//Abstraction common dependencies
var abstractionCommonMethods = require('../support/abstractionCommonMethods');

module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var addOrg = new addOrganizationPage();
    var searchOrg = new listOfOrganizationPage();
    var selectItem =new mainSelectItemPage;
    var projectFunctions = new projectFunctionsPage();
    var helper = new helperMethods();
    var commonFunctions = new abstractionCommonMethods();
    var createdOrgNonAffi = '';
    var createdOrgAffiPerson = '';
    var createdOrgAffiFamily = '';
    var iteraCnt = '';
    var delErrMsg = 'This organization cannot be deleted';
    var sourceStatus = 'Pending';
    var addressEdited = '9605 Medical Center Drive';
    var address2Edited = '1988 S 16th add2 Edited';
    var phoneEdited = '240-276-6978';
    var emailEdited = 'test@test.com';
    var cityEdited = 'Wilmington Edited';
    var countryEdited = 'Nepal';
    var stateEdited = 'Bagmati';
    var stateEditedforUS = 'Maryland';
    var postalEdited = '20008';



    /*
     Given I know which organization I want to delete
     And I am logged in to CTRP PO application
     And I have searched for an organization and found the one I wish to delete
     When I have selected the function Delete Organization
     And I submit my delete request
     And the organization is not referenced as a lead organization on a trial
     And the organization is not referenced as a participating site on a trial
     And the organization is not referenced as a Person record Affiliated Organization
     And the organization is not referenced as a CTRP User Affiliated Organization
     And the organization is not part of a Family Organization
     Then the system will delete the organization record
     */


    this.Given(/^I know which organization I want to delete$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        //login.login('ctrpcurator', '');
        //login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            helper.wait_for(300);
            login.clickWriteMode('On');
            iteraCnt = iteraCnt + 1;
            var getCrntCnt = iteraCnt + 1;
            console.log('calculating count:'+getCrntCnt+'')
            if (getCrntCnt == 11){
                projectFunctions.createOrganization(
                    'CTRP Test Org ',
                    'Test Alias',
                    '9605 Medical Center Drive',
                    'Suite: 370-16',
                    'United States',
                    'Maryland',
                    'Rockville',
                    '20850',
                    's@s.com',
                    '240-276-6978',
                    '202-509-3188'
                );
            }
        });
        browser.sleep(50).then(callback);
    });

    this.Given(/^I have searched for an organization and found the one I wish to delete$/, function (callback) {
        cukeOrganization.then(function(value){
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inSearchResults(value)).to.become('true');
            var pasCreatedOrgNonAffi = ''+value+'';
            //return createdOrgNonAffi;
            function RetCreatedOrgNonAffi(){
                return pasCreatedOrgNonAffi;
            }
            createdOrgNonAffi = RetCreatedOrgNonAffi();
            console.log('System created non affiliated organization:['+createdOrgNonAffi+']')
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected the function Delete Organization$/, function (callback) {
        var selectCrntOrg = createdOrgNonAffi;
        element(by.linkText(selectCrntOrg)).click();
        helper.wait_for(5000)
        browser.sleep(25).then(callback);
    });

    this.When(/^I submit my delete request$/, function (callback) {
        addOrg.clickDelete();
        helper.wait_for(300);
        addOrg.clickDeleteNow();
        browser.sleep(5000).then(callback);
    });

    this.When(/^the organization is not referenced as a lead organization on a trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(250).then(callback);
    });

    this.When(/^the organization is not referenced as a participating site on a trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.sleep(250).then(callback);
    });

    this.When(/^the organization is not referenced as a Person record Affiliated Organization$/, function (callback) {
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        //login.login('ctrpcurator', '');
        //login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            helper.wait_for(1000);
            login.clickWriteMode('On');
            menuItem.clickOrganizations();
            menuItem.clickAddOrganizations();
            projectFunctions.createPersonWithAffiliatedOrg(
                'Mr',//* @param prefix,
                'TestFName',//* @param fName,
                'TestMName',//* @param mName,
                'TestLName',//* @param lName,
                'Sr',//* @param suffix,
                'test@test.com',//* @param email,
                '240-276-6978',//* @param phone,
                'Test Org Affi with Person ',//* @param affOrgName,
                '08-Oct-2015',//* @param affOrgEffectiveDate,
                '08-Oct-2016'//* @param affOrgExpirationDate
            );
            cukeOrganization.then(function(value){
                var pasCreatedOrgAffiPers = ''+value+'';
                function RetCreatedOrgAffiPers(){
                    return pasCreatedOrgAffiPers;
                }
                createdOrgAffiPerson = RetCreatedOrgAffiPers();
                console.log('System created ['+createdOrgAffiPerson+'] Organization with person affiliation');
            });
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^the organization is not referenced as a CTRP User Affiliated Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    this.When(/^the organization is not part of a Family Organization$/, function (callback) {
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        //login.login('ctrpcurator', 'Welcome01');
        //login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            helper.wait_for(300);
            login.clickWriteMode('On');
            menuItem.clickOrganizations();
            menuItem.clickAddOrganizations();
            projectFunctions.createFamilyWithMembers(
                'Test Family',//familyName,
                'Active',// familyStatus,
                'NIH',// familyType,
                'Test Org Affi with Family ',// orgMember,
                'Affiliation',// orgRelationship,
                '08-Oct-2015',// orgEffectiveDate,
                '08-Oct-2016'// orgExpirationDate
            );
            cukeOrganization.then(function(value){
                var pasCreatedOrgAffifamily = ''+value+'';
                function RetCreatedOrgAffiFamily(){
                    return pasCreatedOrgAffifamily;
                }
                createdOrgAffiFamily = RetCreatedOrgAffiFamily();
                console.log('System created ['+createdOrgAffiFamily+'] Organization with family affiliation');
            });
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system will delete the organization record$/, function (callback) {
        login.logout();
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        //login.login('ctrpcurator', 'Welcome01');
        //login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            helper.wait_for(300);
            login.clickWriteMode('On');
        });
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        searchOrg.setOrgName(createdOrgNonAffi);
        searchOrg.clickSearchButton();
        helper.wait_for(300);
        expect(projectFunctions.inSearchResults(createdOrgNonAffi)).to.become('false');
        console.log('System deleted:['+createdOrgNonAffi+'] non-affiliated Org')
        browser.sleep(25).then(callback);
    });

    /*
    Scenario: As a PO Curator, I cannot Delete Organization with Trial Records
    Given I know which organization I want to delete
    And I am logged in to CTRP PO application
    And I have searched for an organization
    And the organization is referenced as a lead organization on a trial or participating site on a trial or Person record Affiliated Organization or CTRP User Affiliated Organization or part of a Family Organization
    Then the Delete operation will stop and the error message "This organization cannot be deleted" will be displayed
    */

    this.Given(/^I have searched for an organization$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        searchOrg.setOrgName(createdOrgAffiPerson);
        searchOrg.clickSearchButton();
        helper.wait_for(10000);
        element(by.linkText(createdOrgAffiPerson)).click();
        helper.wait_for(100);
        addOrg.clickDelete();
        helper.wait_for(300);
        addOrg.clickDeleteNow();
        helper.wait_for(300);

        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        searchOrg.setOrgName(createdOrgAffiFamily);
        searchOrg.clickSearchButton();
        helper.wait_for(100);
        element(by.linkText(createdOrgAffiFamily)).click();
        helper.wait_for(100);
        addOrg.clickDelete();
        helper.wait_for(300);
        addOrg.clickDeleteNow();
        helper.wait_for(300);

        browser.sleep(250).then(callback);
    });

    this.Given(/^the organization is referenced as a lead organization on a trial or participating site on a trial or Person record Affiliated Organization or CTRP User Affiliated Organization or part of a Family Organization$/, function (callback) {
        // need to add organization affiliation verification
        browser.sleep(250).then(callback);
    });

    this.Then(/^the Delete operation will stop and the error message "([^"]*)" will be displayed$/, function (arg1, callback) {
        var getDeletErrArg = arg1;
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        searchOrg.setOrgName(createdOrgAffiPerson);
        console.log('System unable to delete:['+createdOrgAffiPerson+'] organization since it is affiliated');
        searchOrg.clickSearchButton();
        element(by.linkText(createdOrgAffiPerson)).click();
        helper.wait_for(1000);
        addOrg.getVerifyAddOrgName(createdOrgAffiPerson);
        //menuItem.clickOrganizations();
        //menuItem.clickListOrganizations();
        //searchOrg.setOrgName(createdOrgAffiFamily);
        //searchOrg.clickSearchButton();
        //helper.wait_for(100);
        //var resultStatusFamily = projectFunctions.isTextPresent(createdOrgAffiFamily);
        //console.log('Search Result Status Family:'+resultStatusFamily+'');
        browser.sleep(250).then(callback);
    });


};
