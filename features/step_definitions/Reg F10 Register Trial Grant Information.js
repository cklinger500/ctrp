/**
 * Created by singhs10 on 1/8/16.
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

    /*********************
     * Parameters *
     *********************/
    var fundingMechanismSelectedFirst = 'R01';
    var instituteCodeSelectedFirst = 'CA';
    var programCodeSelectedFirst = 'OD';
    var grantSerialNumberFirst = '142587';
    var grantEntireSerialNumberFirst = '142587 - UNIVERSITY OF ALABAMA AT BIRMINGHAM; Phase-sensitive x-ray breast tomosynthesis; Fese Mokube';
    var grantValueFirst = '142587';
    var fundingMechanismSelectedSecond = 'F32';
    var instituteCodeSelectedSecond = 'CA';
    var programCodeSelectedSecond = 'TRP';
    var grantSerialNumberSecond = '153978';
    var grantEntireSerialNumberSecond = '153978 - MASSACHUSETTS GENERAL HOSPITAL; Proliferation-promoting activities of pRB; BARRY SLECKMAN';
    var grantValueSecond = '153978';

    /*********************
     * Validation message *
     *********************/
    var grantRequired = 'Grant is required';
    var emtpyGrantField = 'Please select a Funding Mechanism, Institute Code, enter a Serial Number and select a NCI Division/Program Code';


    this.Given(/^I am on the Register Trial Grant Information screen$/, function (callback) {
        callback();
    });

    this.When(/^I have selected "([^"]*)" for the question "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function () {
            addTrial.addTrialFundedByNCIQuestion.getText().then(function (value) {
                console.log('value of Question1');
                console.log(value);
                console.log('provided Question1');
                console.log(arg2);
                if (value.toString() === arg2) {
                    addTrial.verifyAddTrialFundedByNCIOption('0', true);
                    addTrial.verifyAddTrialFundedByNCIOption('1', false);
                    if (arg1 === 'No') {
                        addTrial.selectAddTrialFundedByNCIOption('1');
                    }
                    else if (arg1 === 'Yes') {
                        addTrial.selectAddTrialFundedByNCIOption('0');
                    }
                }
            });
            addTrial.addTrialFDAIND_IDETypesQuestion.getText().then(function (value) {
                console.log('value of Question2');
                console.log(value);
                console.log('provided Question2');
                console.log(arg2);
                if (value.toString() === arg2) {
                    addTrial.verifyAddTrialFDAIND_IDEOption('0', true);
                    addTrial.verifyAddTrialFDAIND_IDEOption('1', false);
                    if (arg1 === 'No') {
                        addTrial.selectAddTrialFDAIND_IDEOption('1');
                    }
                    else if (arg1 === 'Yes') {
                        addTrial.selectAddTrialFDAIND_IDEOption('0');
                    }
                }
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Register Trial Grant Information section will not indicate any errors during Trial Review$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            addTrial.verifyAddTrialFundedByNCIOption('1', true);
            expect(addTrial.addTrialFundingMechanism.isDisplayed()).to.become(false);
            expect(projectFunctions.verifyWarningMessage(grantRequired)).to.become('false');
            // browser.sleep(25).then(callback);
        });
    });


    this.When(/^I have selected the Funding Mechanism from a list$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialFundingMechanism(fundingMechanismSelectedFirst);
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the Institute Code from a list$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialInstituteCode(instituteCodeSelectedFirst);
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the NCI Division\/Program Code from a list$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialNCIDivisionProgramCode(programCodeSelectedFirst);
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have entered a partial Grant Serial Number$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.setAddTrialSerialNumber(grantSerialNumberFirst);
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^CTRP will search the IMPACII database view of Grant Information for serial numbers that contain the institute code and partial Grant Serial Number entered$/, function (callback) {
        callback();
    });

    this.Given(/^CTRP will display Grant Serial Number, Organization, Project Title, and Contact Principal Investigator that match the partial Grant Serial Number$/, function (callback) {
        console.log('This checks for Grant Serial number has Serial Number, Organization, Project Title, and Contact Principal Investigator');
        expect(addTrial.addTrialSerialNumberSelect.getText()).to.eventually.equal(grantEntireSerialNumberFirst).and.notify(callback);
    });

    this.Given(/^I can select from the Grant Serial Numbers displayed$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.addTrialSerialNumberSelect.click();
            expect(addTrial.addTrialSerialNumberVerify.getText()).to.eventually.equal(grantValueFirst);
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I can click on the add button to add the grant$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialAddGrantInfoButton();
            projectFunctionsRegistry.verifyAddTrialGrantInformation(fundingMechanismSelectedFirst, instituteCodeSelectedFirst, grantValueFirst, programCodeSelectedFirst);
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have entered the information for a NCI Grant$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialFundingMechanism(fundingMechanismSelectedFirst);
            addTrial.selectAddTrialInstituteCode(instituteCodeSelectedFirst);
            addTrial.selectAddTrialNCIDivisionProgramCode(programCodeSelectedFirst);
            addTrial.setAddTrialSerialNumber(grantSerialNumberFirst);
            console.log('This checks for Grant Serial number has Serial Number, Organization, Project Title, and Contact Principal Investigator');
            expect(addTrial.addTrialSerialNumberSelect.getText()).to.eventually.equal(grantEntireSerialNumberFirst);
            addTrial.addTrialSerialNumberSelect.click();
            expect(addTrial.addTrialSerialNumberVerify.getText()).to.eventually.equal(grantValueFirst);
            addTrial.clickAddTrialAddGrantInfoButton();
            projectFunctionsRegistry.verifyAddTrialGrantInformation(fundingMechanismSelectedFirst, instituteCodeSelectedFirst, grantValueFirst, programCodeSelectedFirst);
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will be able to select "([^"]*)" and enter the information for multiple Grants$/, function (arg1) {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialFundingMechanism(fundingMechanismSelectedSecond);
            addTrial.selectAddTrialInstituteCode(instituteCodeSelectedSecond);
            addTrial.selectAddTrialNCIDivisionProgramCode(programCodeSelectedSecond);
            addTrial.setAddTrialSerialNumber(grantSerialNumberSecond);
            console.log('This checks for Grant Serial number has Serial Number, Organization, Project Title, and Contact Principal Investigator');
            expect(addTrial.addTrialSerialNumberSelect.getText()).to.eventually.equal(grantEntireSerialNumberSecond);
            addTrial.addTrialSerialNumberSelect.click();
            expect(addTrial.addTrialSerialNumberVerify.getText()).to.eventually.equal(grantValueSecond);
            addTrial.clickAddTrialAddGrantInfoButton();
            projectFunctionsRegistry.verifyAddTrialGrantInformation(fundingMechanismSelectedFirst, instituteCodeSelectedFirst, grantValueFirst, programCodeSelectedFirst);
            projectFunctionsRegistry.verifyAddTrialGrantInformation(fundingMechanismSelectedSecond, instituteCodeSelectedSecond, grantValueSecond, programCodeSelectedSecond);
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have not selected the Funding Mechanison from the drop down list$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialFundingMechanism.getAttribute('value')).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not selected the Institute Code from the drop down list$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialInstituteCode.getAttribute('value')).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not entered a Trial Serial Number$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialSerialNumberBox.getText()).to.eventually.equal('Enter serial number...');
            addTrial.addTrialSerialNumberBox.click();
            expect(addTrial.addTrialSerialNumberField.getText()).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not selected a NCI Division\/Program Code from the drop down list$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialNCIDivisionProgramCode.getAttribute('value')).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Register Trial Grant Information section will indicate the error "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have NOT entered ALL Grant NIH Information type$/, function (table) {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialFundingMechanism.getAttribute('value')).to.eventually.equal('');
            expect(addTrial.addTrialInstituteCode.getAttribute('value')).to.eventually.equal('');
            expect(addTrial.addTrialSerialNumberBox.getText()).to.eventually.equal('Enter serial number...');
            addTrial.addTrialSerialNumberBox.click();
            expect(addTrial.addTrialSerialNumberField.getText()).to.eventually.equal('');
            expect(addTrial.addTrialNCIDivisionProgramCode.getAttribute('value')).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have clicked on the ADD button to add a grant$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialAddGrantInfoButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^A message will be displayed "([^"]*)"$/, function (arg1, callback) {
        expect(projectFunctionsRegistry.verifyTrialValidationMessage(arg1)).to.become('true').and.notify(callback);
    });

};
