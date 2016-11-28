/**
 * Created by singhs10 on 10/8/15.
 */

//var plumber = require('gulp-plumber');
//var coffee = require('gulp-coffee');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var menuItemList = require('../support/PoCommonBar');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var moment = require('moment');
var loginPage = require('../support/LoginPage');
var addOrgPage = require('../support/AddOrganizationPage');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var projectFunctionsPage= require('../support/projectMethods');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');


module.exports = function() {
    var menuItem = new menuItemList();
    var searchFamily = new listFamilyPage();
    var addFamily = new familyPage();
    var login = new loginPage();
    var addOrg = new addOrgPage();
    var searchOrg = new searchOrgPage();
    var projectFunctions = new projectFunctionsPage();
    var selectItem =new selectList();
    var commonFunctions = new abstractionCommonMethods();
    //gulp.src('./src/*.ext').pipe(plumber()).pipe(coffee()).pipe(gulp.dest('./dist'));


    this.Given(/^I know which organization I wish to assign to an Organization Family$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            projectFunctions.createOrganization('org4Fam', 'alss', 'add1', 'add2', 'United States', 'Maryland', 'city', '20908', 'em@eml.com', '222-222-7878', '5555');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am have selected the option to search Families$/, function (callback) {
        projectFunctions.createFamily('SSFamilyCuke', 'Active', 'NIH');
        menuItem.clickOrganizations();
        menuItem.clickListFamily();
        browser.sleep(25).then(callback);
    });

    this.Given(/^a list of Family Names is displayed$/, function (callback) {
        cukeFamily.then(function(value2)
        {console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            expect(projectFunctions.inSearchResults(value2)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I select a Family to edit$/, function (callback) {
        cukeFamily.then(function(value2)
        {element(by.linkText(value2)).click();
            addFamily.familyVerifyAddName(value2);
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the option to Add Family Membership$/, function (callback) {
        searchOrg.clickOrgSearchModel();
        browser.sleep(25).then(callback);
    });

    this.When(/^I Search Organizations and select an Organization$/, function (callback) {
        cukeOrganization.then(function(value4){
            console.log('search Organization - ' + value4);
            searchOrg.setOrgName(value4);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select an effective date which is defaulted to the current date$/, function (callback) {
        searchOrg.verifyDefaultAffiliatedOrgEffectiveDate();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select an expiration date which is defaulted to null$/, function (callback) {
        searchOrg.verifyDefaultAffiliatedOrgExpirationDate();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select either Organization or Affiliate Family Relationship$/, function (callback) {
        selectItem.selectOrgFamilyRelationship('Affiliation');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Family is updated with the CTRP ID, CTEP ID, Organization Name, Family Relationship, effective date, and expiration date$/, function (callback) {
        addFamily.clickSave();
        addFamily.familyVerifyMembershipSize('1');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know which Family I want to update$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            projectFunctions.createOrganization('org4Fam', 'alss', 'add1', 'add2', 'United States', 'Maryland', 'city', '20908', 'em@eml.com', '222-222-7878', '5555');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^the Family Organizations are displayed$/, function (callback) {
        searchOrg.clickOrgSearchModel();
         cukeOrganization.then(function(value4){
           console.log('search Organization - ' + value4);
        searchOrg.setOrgName(value4);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
         });
        addFamily.clickSave();
        menuItem.clickOrganizations();
        menuItem.clickListFamily();
        cukeFamily.then(function(value2)
        {console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            element(by.linkText(value2)).click();});
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the option to remove an organization from a Family$/, function (callback) {
        searchOrg.clickOrgAffiliatedRemove();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Family will be updated and the selected organization removed$/, function (callback) {
        addFamily.clickSave();
        addFamily.familyVerifyMembershipSize('0');
        browser.sleep(25).then(callback);
    });


};
