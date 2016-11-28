/**
 * Created by singhs10 on 12/3/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function () {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();

    this.Given(/^I am on the Register Trial Lead Organization\/Principal Investigator screen$/, function (callback) {
        callback();
    });

    this.When(/^I have performed a Lead Organization look-up in Search Organization$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createOrgforTrial('shiTrialOrg0', typeOfTrial, '0', 'ctrptrialsubmitter');
            //   browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected an Organization as the trial's Lead Organization$/, function () {
        return browser.sleep(25).then(function () {
            cukeOrganization.then(function (value) {
                console.log('value of Org' + value);
                addTrial.getVerifyAddTrialLeadOrganization(value);
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have performed a person look\-up in Search persons$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createPersonforTrial('shiTrialPerson0', typeOfTrial, '0', 'ctrptrialsubmitter');
            // browser.sleep(25).then(callback);
        });
    });


    this.Given(/^I have selected a person as the trial's Principal Investigator$/, function (callback) {
        callback();
    });

    this.Given(/^Selected persons name will be displayed as Last Name, First Name as the trial's Principal Investigator$/, function () {
        return browser.sleep(25).then(function () {
            cukePerson.then(function (value) {
                console.log('value of Org' + value);
                addTrial.getVerifyAddTrialPrincipalInvestigator('lName, ' + value);
            });
            projectFunctionsRegistry.createOrgforTrial('shiTrialOrg0', typeOfTrial, '0', 'ctrptrialsubmitter');
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Register Lead Organization\/Principal Investigator section will not indicate any errors during Trial Review$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            expect(projectFunctions.verifyWarningMessage('Lead Organization is required')).to.become('false');
            expect(projectFunctions.verifyWarningMessage('Principal Investigator is required')).to.become('false');
            //  browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have not selected an Organization as the trial's Lead Organization$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialLeadOrganization('');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not selected a person as the trial's Principal Investigator$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialPrincipalInvestigator(' ');
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Register Trial Lead Organization\/Principal Investigator screen will indicate errors as:$/, function (table) {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            errorTableLeadOrg = table.raw();
            for (var i = 0; i < errorTableLeadOrg.length; i++) {
                console.log(errorTableLeadOrg[i].toString());
                expect(projectFunctions.verifyWarningMessage(errorTableLeadOrg[i].toString())).to.become('true');
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I am on the Register Trial Sponsor Party screen$/, function (callback) {
        callback();
    });

    this.When(/^I have performed a Sponsor organization look\-up in Search Organizations$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createOrgforTrial('shiTrialOrg1', typeOfTrial, '1', 'ctrptrialsubmitter');
            //   browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected an organization as the trial's Sponsor$/, function () {
        return browser.sleep(25).then(function () {
            cukeOrganization.then(function (value) {
                console.log('value of Org' + value);
                addTrial.getVerifyAddTrialSponsor(value);
            });
            //  browser.sleep(25).then(callback);
        });
    });


    this.Then(/^the Register Trial Sponsor Party section will not indicate any errors during Trial Review$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            expect(projectFunctions.verifyWarningMessage('Sponsor is required')).to.become('false');
            //  browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have not selected an organization as the trial's Sponsor from the lookup$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialSponsor('');
            //  browser.sleep(25).then(callback);
        });
    });


    this.Then(/^the Register Trial Sponsor Party section will indicate errors during Trial Review as:$/, function (table) {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            errorTableSponsor = table.raw();
            for (var i = 0; i < errorTableSponsor.length; i++) {
                console.log(errorTableSponsor[i].toString());
                expect(projectFunctions.verifyWarningMessage(errorTableSponsor[i].toString())).to.become('true');
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I am on the Register Trial Funding Source screen$/, function (callback) {
        callback();
    });

    this.When(/^I have performed a Funding Source organization look\-up$/, function () {
        return browser.sleep(25).then(function () {
            /****** Create first Funding Source Organization ********/
            projectFunctionsRegistry.createOrgforTrial('shiTrialFundOrg2', typeOfTrial, '2', 'ctrptrialsubmitter');

            /**** Stores the value of first funding Src Org ****/
            storeFirstFundingSrc = cukeOrganization.then(function (value) {
                console.log('This is the first Funding Source Organization that is added' + value);
                return value;
            });

            /**** Validates the first Funding Src Org is added ****/
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                cukeOrganization.then(function (value) {
                    console.log(value.split());
                    addTrial.getVerifyAddTrialFundingSource(value.split());

                    /****** Create second Funding Source Organization ********/
                    projectFunctionsRegistry.createOrgforTrial('shiTrialFundOrg3', typeOfTrial, '2', 'ctrptrialsubmitter');

                    /**** Stores the value of second funding Src Org ****/
                    storeSecondFundingSrc = cukeOrganization.then(function (value) {
                        console.log('This is the second Funding Source Organization that is added' + value);
                        return value;
                    });
                });
            });
            //browser.sleep(25).then(callback);
        });
    });


    this.Given(/^I have selected one or more organizations as the trial's Funding Source$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialResetButton();

            /***** This will add the first Org again after Reset ******/
            storeFirstFundingSrc.then(function (value) {
                projectFunctionsRegistry.selectOrgforTrial(value, '2');
            });

            /***** This will add the second Org again after Reset ******/
            storeSecondFundingSrc.then(function (value) {
                projectFunctionsRegistry.selectOrgforTrial(value, '2');
            });

            /***** This will verify the first and second Org is added ******/
            storeFirstFundingSrc.then(function (firstOrg) {
                console.log('firstOrg');
                console.log(firstOrg.split());
                storeSecondFundingSrc.then(function (secondOrg) {
                    console.log('SecondOrg');
                    console.log(secondOrg.split());
                    var addedFundingSrc = (firstOrg.split()).concat(secondOrg.split());
                    console.log('Added funding Src org');
                    console.log(addedFundingSrc);
                    browser.sleep(7500);
                    addTrial.getVerifyAddTrialFundingSource(addedFundingSrc);
                });
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have entered a trial's Program Code$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.setAddTrialDataTable4ProgramCode('programCode' + typeOfTrial);
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Register Trial Funding Source screen will not indicate any errors during Trial Review$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();

            /***** This will verify the first and second Org is there after Review ******/
            storeFirstFundingSrc.then(function (firstOrg) {
                console.log('firstOrg');
                console.log(firstOrg.split());
                storeSecondFundingSrc.then(function (secondOrg) {
                    console.log('SecondOrg');
                    console.log(secondOrg.split());
                    var addedFundingSrc = (firstOrg.split()).concat(secondOrg.split());
                    console.log('Added funding Src org');
                    console.log(addedFundingSrc);
                    addTrial.getVerifyAddTrialFundingSource(addedFundingSrc);
                });
            });

            /***** This will verify the Program Code is added ******/
            addTrial.getVerifyAddTrialDataTable4ProgramCode('programCode' + typeOfTrial);

            /***** This will verify the warning for Funding Source is not there ******/
            expect(projectFunctions.verifyWarningMessage('Funding Source is Required')).to.become('false');
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have not entered one or more organizations as the trial's Funding Source$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^The Register Trial Funding Source will indicate a error as "([^"]*)"$/, function (arg1, callback) {
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true').and.notify(callback);
    });


};
