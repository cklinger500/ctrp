/**
 * Created by singhs10 on 10/5/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var MenuItemList = require('../support/PoCommonBar');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var projectFunctionsPage= require('../support/projectMethods');
var moment = require('moment');


module.exports = function() {
    var menuItem = new MenuItemList();
    var searchFamily = new listFamilyPage();
    var addFamily = new familyPage();
    var selectItem =new selectList();
    var projectFunctions = new projectFunctionsPage();

    this.Given(/^I select the option to edit Organization Family$/, function (callback) {
       callback();
    });

    this.Given(/^I have selected family name to edit$/, function (callback) {
        projectFunctions.createFamily('shiFam PRcuke', 'Active', 'NIH');
        menuItem.clickOrganizations();
        menuItem.clickListFamily();
       browser.sleep(25).then(callback);
    });

    this.Given(/^I have changed the family name$/, function (callback) {
        cukeFamily.then(function(value2) {
            console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            expect(projectFunctions.inSearchResults(value2)).to.become('true');
            element(by.linkText(value2)).click();
            addFamily.familyVerifyEditHeader();
            addFamily.setAddFamilyName(value2 + 'Edited');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have changed the family type (.*)$/, function (familyType, callback) {
        selectItem.selectFamilyType(familyType);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have changed the family status (.*)$/, function (familyStatus, callback) {
        selectItem.selectFamilyStatus(familyStatus);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I save the Family information$/, function (callback) {
        addFamily.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the family name with family type (.*) and family status (.*) will be updated and return result (.*)$/, function (familyType, familyStatus, result, callback) {
        menuItem.clickOrganizations();
        menuItem.clickListFamily();
        cukeFamily.then(function(value2) {
            console.log('Edited family- ' + value2);
            searchFamily.setFamilyName(value2 + 'Edited');
            searchFamily.clickSearchButton();
            expect(projectFunctions.inSearchResults(value2 + 'Edited')).to.become(result);
            element(by.linkText(value2 + 'Edited')).click();
            addFamily.familyVerifyEditHeader();
            addFamily.familyVerifyAddName(value2 + 'Edited');
            addFamily.familyVerifyAddStatus(familyStatus);
            addFamily.familyVerifyAddType(familyType);
        });
        browser.sleep(25).then(callback);
    });



    this.Given(/^I have changed the family name (.*) to edit$/, function (familyName, callback) {
        cukeFamily.then(function(value2) {
            console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            expect(projectFunctions.inSearchResults(value2)).to.become('true');
            element(by.linkText(value2)).click();
            addFamily.familyVerifyEditHeader();
            addFamily.setAddFamilyName(familyName);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system will notify any error for family name (.*), family type (.*) and family status (.*) with (.*)$/, function (familyName, familyType, familyStatus, response, callback) {
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 40).then(function() {
            if(familyName === 'Albert Einstein Cancer Center') {
                console.log('response1 ' + response);
                expect(projectFunctions.verifyWarningMessage(response)).to.become('true');
            }
            else if(familyName === '') {
                console.log('reponse2 ' + response);
                expect(projectFunctions.verifyWarningMessage(response)).to.become('true');
            }
            else if(familyType === '') {
                console.log('reponse3 ' + response);
                expect(projectFunctions.verifyWarningMessage(response)).to.become('true');
            }
            else if(familyStatus === '') {
                console.log('reponse4 ' + response);
                expect(projectFunctions.verifyWarningMessage(response)).to.become('true');
            }
    });
        browser.sleep(25).then(callback);
    });


};
