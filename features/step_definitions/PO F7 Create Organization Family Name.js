/**
 * Created by singhs10 on 10/1/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var menuItemList = require('../support/PoCommonBar');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var selectList = require('../support/CommonSelectList');
var projectFunctionsPage= require('../support/projectMethods');
var moment = require('moment');


module.exports = function() {
    var menuItem = new menuItemList();
    var searchFamily = new listFamilyPage();
    var addFamily = new familyPage();
    var selectItem =new selectList();
    var projectFunctions = new projectFunctionsPage();

    this.Given(/^I select the option to add Organization Family$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickAddFamily();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a new family name (.*)$/, function (familyName, callback) {
        addFamily.setAddFamilyName(familyName + moment().format('MMMDoYY hmmss'));
        fam4 = addFamily.addFamilyName.getAttribute('value');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a family type (.*)$/, function (familyType, callback) {
       selectItem.selectFamilyType(familyType);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a family status (.*)$/, function (familyStatus, callback) {
        selectItem.selectFamilyStatus(familyStatus);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I save the family information$/, function (callback) {
        addFamily.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^a new family name (.*) with family type (.*) and family status (.*) will be created and return result (.*)$/, function (familyName, familyType, familyStatus, result, callback) {
        menuItem.clickOrganizations();
        menuItem.clickListFamily();
        fam4.then(function(value2)
        {console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            expect(projectFunctions.inSearchResults(value2)).to.become(result);
            element(by.linkText(value2)).click();
            addFamily.familyVerifyAddName(value2);
            addFamily.familyVerifyAddStatus(familyStatus);
            addFamily.familyVerifyAddType(familyType);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a family name (.*)$/, function (familyName, callback) {
        addFamily.setAddFamilyName(familyName);
        browser.sleep(25).then(callback);
    });

    this.Then(/^an error (.*) will be displayed for family name (.*), family type (.*) and family status (.*)$/, function (response, familyName, familyType, familyStatus, callback) {
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function() {
            if(familyName === 'Albert Einstein Cancer Center') {
                expect(projectFunctions.verifyWarningMessage(response)).to.become('true');
            }
            else if(familyName === '') {
                expect(projectFunctions.verifyWarningMessage(response)).to.become('true');
            }
            else if(familyType === '') {
                expect(projectFunctions.verifyWarningMessage(response)).to.become('true');
            }
            else if(familyStatus === '') {
                expect(projectFunctions.verifyWarningMessage(response)).to.become('true');
            }
        });
        browser.sleep(25).then(callback);
    });


};