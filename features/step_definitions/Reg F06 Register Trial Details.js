/**
 * Created by singhs10 on 11/28/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var underscore = require('underscore');
var assert = require('assert');


module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();

    this.Given(/^I am on the Register Trial Details screen$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyTrialDetailsSection();
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have entered the trial's title$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.setAddTrialOfficialTitle('shiTrialOfficialTitle');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the trial phase types:$/, function (table) {
        return browser.sleep(25).then(function () {
            trialPhase = table.raw();
            console.log('value of table' + trialPhase);
            addTrial.addTrialPhaseList.getText().then(function (value) {
                console.log(value);
                expect(value).to.eql(trialPhase.toString().split(","));
            });
            addTrial.selectAddTrialPhase('I');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the "([^"]*)" if the study is a pilot study or left the option"([^"]*)" as the default$/, function (arg1, arg2) {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialPilotOption.get(0).isSelected()).to.eventually.equal(true);
            addTrial.selectAddTrialPilotOption('1');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the appropriate Clinical Research Category Types:$/, function (table) {
        return browser.sleep(25).then(function () {
            trialResearchCategory = table.raw();
            console.log('value of table' + trialResearchCategory);
            addTrial.addTrialResearchCategoryList.getText().then(function (value) {
                console.log(value);
                expect(value).to.eql(trialResearchCategory.toString().split(","));
            });
            addTrial.selectAddTrialResearchCategory('Observational');
        });
        // browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the Trial's Primary Purpose Type:$/, function (table) {
        return browser.sleep(25).then(function () {
            trialPrimaryPurpose = table.raw();
            console.log('value of table' + trialPrimaryPurpose);
            addTrial.addTrialPrimaryPurposeList.getText().then(function (value) {
                console.log(value);
                expect(value).to.eql(trialPrimaryPurpose.toString().split(","));
            });
            addTrial.selectAddTrialPrimaryPurpose('Diagnostic');
            //    browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the Trial's Secondary Purpose Type:$/, function (table) {
        return browser.sleep(25).then(function () {
            trialSecondaryPurpose = table.raw();
            console.log('value of table' + trialSecondaryPurpose);
            addTrial.addTrialSecondaryPurposeList.getText().then(function (value) {
                console.log(value);
                expect(value).to.eql(trialSecondaryPurpose.toString().split(","));
            });
            addTrial.selectAddTrialSecondaryPurpose('Ancillary-Correlative');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selceted the Trial's Accrual Disease Terminology Type:$/, function (table) {
        return browser.sleep(25).then(function () {
            trialAccrualDisease = table.raw();
            console.log('value of table' + trialAccrualDisease);
            addTrial.addTrialAccrualDiseaseTerminologyList.getText().then(function (value) {
                console.log(value);
                expect(value).to.eql(trialAccrualDisease.toString().split(","));
            });
            addTrial.selectAddTrialAccrualDiseaseTerminology('ICD10');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Trial Details section will be complete$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialOfficialTitle('shiTrialOfficialTitle');
            addTrial.getVerifyAddTrialPhase('I');
            addTrial.getVerifyAddTrialPilotOption('1');
            addTrial.getVerifyAddTrialResearchCategory('Observational');
            addTrial.getVerifyAddTrialPrimaryPurpose('Diagnostic');
            addTrial.getVerifyAddTrialSecondaryPurpose('Ancillary-Correlative');
            addTrial.getVerifyAddTrialAccrualDiseaseTerminology('ICD10');
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have not entered The official Title$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialOfficialTitle('');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not entered the trial Phase type$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialPhase('-Select a Phase-');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not entered the Clinical Research Category type$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialResearchCategory('-Select a Clinical Research Category-');
        });
        // browser.sleep(25).then(callback);
    });

    this.Given(/^I have not entered the trial Primary Purpose$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialPrimaryPurpose('-Select a Primary Purpose-');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have not entered the Accrual Disease Terminology type$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialAccrualDiseaseTerminology('-Select an Accrual Disease Terminology-');
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Trial Details field (.*) section will indicate an error (.*)$/, function (FieldType, error, table) {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            errorTable = table.hashes();
            for (var i = 0; i < errorTable.length; i++) {
                expect(projectFunctions.verifyWarningMessage(errorTable[i].error)).to.become('true');
            }
            //   browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select "([^"]*)" as the Trial Primary Purpose$/, function (arg1) {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialPrimaryPurpose(arg1);
            addTrial.clickAddTrialReviewButton();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I must provide the Primary Purpose other description$/, function () {
        return browser.sleep(25).then(function () {
            expect(projectFunctions.verifyWarningMessage('Other Primary Purpose is Required')).to.become('true');
            addTrial.setAddTrialPrimaryPurposeOtherDescription('Primary Purpose Other Description');
            expect(projectFunctions.verifyWarningMessage('Other Primary Purpose is Required')).to.become('false');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I select "([^"]*)" as the Trial Secondary Purpose$/, function (arg1) {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialSecondaryPurpose(arg1);
            addTrial.clickAddTrialReviewButton();
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I must provide the Secondary Purpose other description$/, function () {
        return browser.sleep(25).then(function () {
            expect(projectFunctions.verifyWarningMessage('Other Secondary Purpose is Required')).to.become('true');
            addTrial.setAddTrialSecondaryPurposeOtherDescription('Secondary Purpose Other Description');
            expect(projectFunctions.verifyWarningMessage('Other Secondary Purpose is Required')).to.become('false');
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^a comment appears below the field to display the number of characters available to enter into the field$/, function (table) {
        return browser.sleep(25).then(function () {
            characterFieldTable = table.hashes();
            for (var i = 0; i < characterFieldTable.length; i++) {
                characterFieldTable[i].NumberOfCharactersLeft = characterFieldTable[i]['Number of Characters left']; //Adding this step to convert the column name from 'Number of Characters left' TO NumberOfCharactersleft
                var characters = +characterFieldTable[i].NumberOfCharactersLeft.match( /\d+/g);
                var charactersString = characterFieldTable[i].NumberOfCharactersLeft.match( /[a-zA-Z]+/g);
                var newCharacters = characters - 1 ;
                var charactersLengthTable = newCharacters +' '+ charactersString.join(" ");
                if(characterFieldTable[i].Field === 'Official Title') {
                    addTrial.setAddTrialOfficialTitle('s');
                    expect(addTrial.addTrialOfficialTitleCharacter.getText()).to.eventually.equal(charactersLengthTable, 'Verification of Character Length failed');
                } else if(characterFieldTable[i].Field === 'Describe "Other" Primary Purpose (When Primary Purpose is selected as Other)') {
                    addTrial.selectAddTrialPrimaryPurpose('Other');
                    addTrial.setAddTrialPrimaryPurposeOtherDescription('s');
                    expect(addTrial.addTrialPrimaryPurposeDescriptionCharacter.getText()).to.eventually.equal(charactersLengthTable, 'Verification of Character Length failed');
                } else if(characterFieldTable[i].Field === 'Describe "Other" Secondary Purpose (When Secondary Purpose is selected as Other)') {
                    addTrial.selectAddTrialSecondaryPurpose('Other');
                    addTrial.setAddTrialSecondaryPurposeOtherDescription('s');
                    expect(addTrial.addTrialSecondaryPurposeDescriptionCharacter.getText()).to.eventually.equal(charactersLengthTable, 'Verification of Character Length failed');
                } else if(characterFieldTable[i].Field === 'Lead Organization Trial Identifier'){
                    addTrial.setAddTrialLeadProtocolIdentifier('s');
                    expect(addTrial.addTrialLeadOrgIdentifierCharacter.getText()).to.eventually.equal(charactersLengthTable, 'Verification of Character Length failed');
                } else if(characterFieldTable[i].Field === 'Other Trial Identifier'){
                    addTrial.setAddTrialProtocolID('s');
                    expect(addTrial.addTrialOtherTrialIdentifierCharacter.getText()).to.eventually.equal(charactersLengthTable, 'Verification of Character Length failed');
                } else if(characterFieldTable[i].Field === 'Investigator Title'){
                    addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                    addTrial.setAddTrialInvestigatorTitle('s');
                    expect(addTrial.addTrialInvestigatorTitleCharacter.getText()).to.eventually.equal(charactersLengthTable, 'Verification of Character Length failed');
                    addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                    addTrial.setAddTrialInvestigatorTitle('s');
                    expect(addTrial.addTrialInvestigatorTitleCharacter.getText()).to.eventually.equal(charactersLengthTable, 'Verification of Character Length failed');
                } else if(characterFieldTable[i].Field === 'Why Study Stopped'){
                    addTrial.selectAddTrialStatus('Withdrawn');
                    addTrial.setAddTrialWhyStudyStopped('s');
                    assert.fail(0,1,'Character counter for Why Study Stopped is not there');
                   // expect(addTrial.addTrialWhyStudyStoppedCharacter.getText()).to.eventually.equal(charactersLengthTable, 'Verification of Character Length failed');
                } else if(characterFieldTable[i].Field === 'Comment'){
                    addTrial.setAddTrialStatusComment('s');
                    assert.fail(0,1,'Character counter for Status Comment field is not there');
                   // expect(addTrial.addTrialStatusCommentCharacter.getText()).to.eventually.equal(charactersLengthTable, 'Verification of Character Length failed');
                }
                else  {
                    assert.fail(0,1,'No Step defined for given character length --> ' + characterFieldTable[i].Field + ',' + characterFieldTable[i].NumberOfCharactersLeft + ' <-- Please add a step for it.');
                }
            }
        });
    });

    this.When(/^all the characters mentioned above for field have been entered$/, function (callback) {
        callback();
    });

};
