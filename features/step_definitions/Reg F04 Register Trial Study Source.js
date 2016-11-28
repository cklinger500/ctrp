/**
 * Created by singhs10 on 11/12/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var loginPage = require('../support/LoginPage');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
var helperFunctions = require('../support/helper');
var Cucumber = this;
//var context = require(process.cwd() + '/src/e2e/support/context');

//var features = Cucumber.Ast.Features();



module.exports = function() {
    var login = new loginPage();
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var commonFunctions = new abstractionCommonMethods();
    var helper = new helperFunctions();

    this.Given(/^I am logged into the CTRP Registration application$/, function () {
        return  browser.sleep(25).then(function () {
            //    browser.get('ui/#/main/sign_in');
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the option to register a trial (.*)$/, function (trialType) {
        return  browser.sleep(25).then(function () {
            typeOfTrial = trialType;
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
                if (featureNameToRun === 'Reg F11 Register Trial Dates and Trial Status' || featureNameToRun === 'Reg F14 Register Trial Review and Submit' ) {
                    if(trialType === 'National') {
                        projectFunctionsRegistry.selectTrials(trialType);}
                    else {
                        throw "Skipped (Skipping tests due to long execution time)";//Cucumber.PENDING_STEP;
                            }
                }
                else {
                    projectFunctionsRegistry.selectTrials(trialType);
                }
            });
        });
    });

    this.Then(/^I am on the Register Trial screen$/, function () {
        return  browser.sleep(25).then(function () {
            trialMenuItem.verifyRegisterTrial();
            // browser.sleep(25).then(callback);
        });
    });


    this.Given(/^CTRP will display the required registration elements for a complete protocol registration for the selected (.*)$/, function (trialType, callback) {
        return  browser.sleep(25).then(function () {
            console.log(trialType);
            addTrial.getVerifyTrialStudySource(trialType);
            // browser.sleep(25).then(callback);
        });
    });

};
