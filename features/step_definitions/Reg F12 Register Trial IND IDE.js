/**
 * Created by singhs10 on 1/14/16.
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
     * Validation message *
     *********************/
    var FDAIND_IDERequired = 'IND/IDE is Required';
    var FDATableValidationMessage = 'Please select an IND/IDE Type, enter an IND/IDE Number, select an IND/IDE Grantor and IND/IDE Holder Type';

    this.Given(/^I am on the Register Trial IND\/IDE Information screen$/, function (callback) {
        callback();
    });

    this.Then(/^the IND\/IDE Information section for the trial registration will not indicate any errors during trial review$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            addTrial.verifyAddTrialFDAIND_IDEOption('1', true);
            expect(addTrial.addTrialFDAIND_IDETypes.isDisplayed()).to.become(false);
            expect(projectFunctions.verifyWarningMessage(FDAIND_IDERequired)).to.become('false');
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have selected the IND\/IDE Type:$/, function (table) {
        return browser.sleep(25).then(function () {
            IND_IDEType = table.raw();
            console.log('value of table' + IND_IDEType);
            addTrial.addTrialFDAIND_IDETypesList.getText().then(function (value) {
                console.log(value);
                expect(value).to.eql(IND_IDEType.toString().split(","));
            });
            addTrial.selectAddTrialFDAIND_IDETypes('IND');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have entered the IND\/IDE number$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.setAddTrialFDAIND_IDENumber('44225');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the IND\/IDE Grantor (.*) based on IND\/IDE type selected (.*)$/, function (Grantor, INDIDE, table) {
        return browser.sleep(25).then(function () {
            grantorTable = table.hashes();
            console.log('value of grantor table');
            console.log(grantorTable);
            var all = [];//new Array();
            var allIDE = [];
            for (var i = 0; i < grantorTable.length; i++) {
                if (grantorTable[i].INDIDE === 'IND') {
                    addTrial.selectAddTrialFDAIND_IDETypes('IND');
                    console.log('value of table for Grantor');
                    console.log(grantorTable[i].Grantor);
                    all[i] = grantorTable[i].Grantor;
                    console.log('value of table for all');
                    console.log(all.filter(Boolean));
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 25).then(function () {
                        expect(addTrial.addTrialFDAIND_IDEGrantorList.getText()).to.eventually.eql(all.filter(Boolean));
                    });
                }
                else if (grantorTable[i].INDIDE === 'IDE') {
                    addTrial.selectAddTrialFDAIND_IDETypes('IDE');
                    allIDE[i] = grantorTable[i].Grantor;
                    console.log('value of table for all IDE');
                    console.log(allIDE.filter(Boolean));
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 25).then(function () {
                        expect(addTrial.addTrialFDAIND_IDEGrantorList.getText()).to.eventually.eql(allIDE.filter(Boolean));
                    });
                }
                addTrial.selectAddTrialFDAIND_IDEGrantor('CBER');
            }
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the INDIDE Holder Type:$/, function (table) {
        return browser.sleep(25).then(function () {
            IND_IDEHolderType = table.raw();
            console.log('value of table' + IND_IDEHolderType);
            addTrial.addTrialFDAIND_IDEHolderTypeList.getText().then(function (value) {
                console.log(value);
                expect(value).to.eql(IND_IDEHolderType.toString().split(","));
            });
            addTrial.selectAddTrialFDAIND_IDEHolderType('NIH');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the NIH Institution or NCI Division\/Program from a list if the IND\/IDE Holder type$/, function (table) {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialFDAIND_IDEHolderType('Investigator');
            expect(addTrial.addTrialFDAProgramCodeList.getText()).to.eventually.be.empty;
            addTrial.selectAddTrialFDAIND_IDEHolderType('Organization');
            expect(addTrial.addTrialFDAProgramCodeList.getText()).to.eventually.be.empty;
            addTrial.selectAddTrialFDAIND_IDEHolderType('Industry');
            expect(addTrial.addTrialFDAProgramCodeList.getText()).to.eventually.be.empty;
            addTrial.selectAddTrialFDAIND_IDEHolderType('NIH');
            expect(addTrial.addTrialFDAProgramCodeList.getText()).to.eventually.not.be.empty;
            addTrial.selectAddTrialFDAIND_IDEHolderType('NCI');
            expect(addTrial.addTrialFDAProgramCodeList.getText()).to.eventually.not.be.empty;
            addTrial.selectAddTrialFDAProgramCode('RRP');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I will click on the add button to register IND\/IDE information$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialAddIND_IDEButton();
            addTrial.clickAddTrialReviewButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the IND\/IDE Information for the trial registration will not indicate any errors during Trial Review$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.verifyAddTrialFDA_IND_IDEInformation('IDE', '44225', 'CBER', 'NCI', 'RRP');
            expect(projectFunctions.verifyWarningMessage(FDAIND_IDERequired)).to.become('false');
            expect(projectFunctionsRegistry.verifyTrialValidationMessage(FDATableValidationMessage)).to.become('false');
            //browser.sleep(25).then(callback);
        });
    });


    this.When(/^I have entered the information for an IND\/IDE Type$/, function () {
        return browser.sleep(25).then(function () {
            /********** Adding first IND/IDE information ***********/
            console.log('********** Adding first IND/IDE information ***********');
            addTrial.selectAddTrialFDAIND_IDETypes('IND');
            addTrial.setAddTrialFDAIND_IDENumber('5544');
            addTrial.selectAddTrialFDAIND_IDEGrantor('CDER');
            addTrial.selectAddTrialFDAIND_IDEHolderType('NIH');
            addTrial.selectAddTrialFDAProgramCode('NHGRI-National Human Genome Research Institute');
            addTrial.clickAddTrialAddIND_IDEButton();

            /********** Adding second IND/IDE information ***********/
            console.log('********** Adding second IND/IDE information ***********');
            addTrial.selectAddTrialFDAIND_IDETypes('IDE');
            addTrial.setAddTrialFDAIND_IDENumber('67678');
            addTrial.selectAddTrialFDAIND_IDEGrantor('CDRH');
            addTrial.selectAddTrialFDAIND_IDEHolderType('Organization');
            addTrial.clickAddTrialAddIND_IDEButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will be able to select "([^"]*)" and enter the information for multiple IND\/IDEs$/, function (arg1) {
        return browser.sleep(25).then(function () {
            console.log('********** Reviewing the two IND/IDE information that was added ***********');
            addTrial.clickAddTrialReviewButton();
            projectFunctionsRegistry.verifyAddTrialFDA_IND_IDEInformation('IND', '5544', 'CDER', 'NIH', 'NHGRI-National Human Genome Research Institute');
            projectFunctionsRegistry.verifyAddTrialFDA_IND_IDEInformation('IDE', '67678', 'CDRH', 'Organization', '');
            expect(projectFunctions.verifyWarningMessage(FDAIND_IDERequired)).to.become('false');
            expect(projectFunctionsRegistry.verifyTrialValidationMessage(FDATableValidationMessage)).to.become('false');
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have NOT entered IND\/IDE information$/, function (table) {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialFDAIND_IDETypes.getAttribute('value')).to.eventually.equal('');
            expect(addTrial.addTrialFDAIND_IDENumber.getAttribute('value')).to.eventually.equal('');
            expect(addTrial.addTrialFDAIND_IDEGrantor.getAttribute('value')).to.eventually.equal('');
            expect(addTrial.addTrialFDAIND_IDEHolderType.getAttribute('value')).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have clicked on the Add IND\/IDE Button$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialAddIND_IDEButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have not selected an IND\/IDE Types$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialFDAIND_IDETypes.getAttribute('value')).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not entered IND\/IDE Number$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialFDAIND_IDENumber.getAttribute('value')).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not selected an IND\/IDE Grantor$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialFDAIND_IDEGrantor.getAttribute('value')).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not selected an IND\/IDE Holder Type$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialFDAIND_IDEHolderType.getAttribute('value')).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Register Trial FDA IND\/IDE Information for applicable trials section will indicate an error type"([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
            //browser.sleep(25).then(callback);
        });
    });


    this.When(/^I have selected the (.*) Type as$/, function (INDIDEholder, table, callback) {
        callback();
    });

    this.Given(/^I don’t provide the NIH Institution or NCI Division\/Program$/, function (callback) {
        callback();
    });

    this.Then(/^I should get the error message as (.*)$/, function (Error, table) {
        return browser.sleep(25).then(function () {
            NIHNCIErrorTable = table.hashes();
            for (var i = 0; i < NIHNCIErrorTable.length; i++) {
                if(NIHNCIErrorTable[i].INDIDEholder === 'NIH') {
                    addTrial.selectAddTrialFDAIND_IDETypes('IND');
                    addTrial.setAddTrialFDAIND_IDENumber('67678');
                    addTrial.selectAddTrialFDAIND_IDEGrantor('CBER');
                    addTrial.selectAddTrialFDAIND_IDEHolderType(NIHNCIErrorTable[i].INDIDEholder);
                    addTrial.clickAddTrialAddIND_IDEButton();
                    expect(projectFunctionsRegistry.verifyTrialValidationMessage(NIHNCIErrorTable[i].Error)).to.become('true','validation');
                }
                if(NIHNCIErrorTable[i].INDIDEholder === 'NCI') {
                    addTrial.selectAddTrialFDAIND_IDETypes('IND');
                    addTrial.setAddTrialFDAIND_IDENumber('67678');
                    addTrial.selectAddTrialFDAIND_IDEGrantor('CBER');
                    addTrial.selectAddTrialFDAIND_IDEHolderType(NIHNCIErrorTable[i].INDIDEholder);
                    addTrial.clickAddTrialAddIND_IDEButton();
                    expect(projectFunctionsRegistry.verifyTrialValidationMessage(NIHNCIErrorTable[i].Error)).to.become('true');
                }

            }
        });
    });

};