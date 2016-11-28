/**
 * Created by singhs10 on 10/1/16.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var helperFunctions = require('../support/helper');
var moment = require('moment');
var databaseConnection = require('../support/databaseConnection');
var searchTrialPage = require('../support/searchTrialPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
var loginPage = require('../support/LoginPage');
var trialDataVerificationPage = require('../support/registerVerifyTrialDataPage');
var assert = require('assert');


module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchTrial = new searchTrialPage();
    var login = new loginPage();
    var commonFunctions = new abstractionCommonMethods();
    var verifyTrialData = new trialDataVerificationPage();
    var dbConnect = new databaseConnection();


    var userCtrpTrialSubmitter = 'ctrptrialsubmitter';
    var trialTypeNational = 'National';
    var leadOrgIdentifierNational = 'SSLdOrg ';
    var clinicalIdentifierIDonUpdate = 'NCT22446688';
    var officialTitleNT = 'Trial Created by Cuke Test script - SS.';
    var phaseNT = 'I/II';
    var researchCategory = 'Observational';
    var primaryPurposeNT = 'Diagnostic';
    var secondaryPurpose = '';
    var accrualDisease = 'ICD9';
    var leadOrgNT = 'leadOrgSS';
    var principalInvNT = 'prinInvSS';
    var sponsorOrgNT = 'sponOrg';
    var dataTableOrg = 'dataTblOrg';
    var programCode = '';
    var grantOption = 'no';
    var grantFundingMechanism = '';
    var grantInstituteCode = '';
    var grantSerialNumber = '';
    var grantNCIDivisionCode = '';
    var trialStatus = 'In Review';
    var trialComment = '';
    var trialWhyStudyStopped = '';
    var INDIDEOption = 'no';
    var INDIDEType = '';
    var INDIDENumber = '';
    var INDIDEGrantor = '';
    var INDIDEHolder = '';
    var INDIDEInstitution = '';
    var responsibleParty = '';
    var trialOversightCountry = '';
    var trialOversightOrg = '';
    var FDARegulatedIndicator = '';
    var section801Indicator = '';
    var dataMonitoringIndicator = '';
    var protocolDoc = 'testSampleDocFile.docx';
    var IRBDoc = 'testSampleXlsFile.xls';
    var participatingSiteDoc = '';
    var informedConsentDoc = '';
    var otherDoc = '';
    var submitTrial = 'SUBMITTRIAL';

    var getDBConnection = '';

    this.Given(/^I am in the CTRP Registration application$/, function () {
        return browser.sleep(25).then(function () {
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
            });
        });
    });

    this.Given(/^I have selected the option to search my trials in CTRP \(trials where I am listed as owner\)$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createTrial(userCtrpTrialSubmitter, trialTypeNational, leadOrgIdentifierNational, '', '', '', officialTitleNT, phaseNT, '', researchCategory, primaryPurposeNT, secondaryPurpose,
                accrualDisease, leadOrgNT, principalInvNT, sponsorOrgNT, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, trialStatus, trialComment, trialWhyStudyStopped,
                INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
                protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, submitTrial);
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                leadProtocolIDNT = leadProtocolID;
                nciIDNT = nciID;
                otherIDNT = otherIDs;
                trialOfficialTitleNT = officialTitle;
                trialPhaseNT = phase;
                trialPurposeNT = purpose;
                principalInvestigatorNT = principalInvestigator;
                leadOrganizationNT = leadOrganization;
                sponsorNT = sponsor;
                participatingSiteNT = participatingSiteInTrial;
            });
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
                nciIDNT.then(function (trialNciIDNT) {
                    dbConnect.dbConnAddAllMilestoneProcessingStatus(trialNciIDNT,getDBConnection);
                    searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result');
                });
            });
        });
    });

    this.When(/^I select the Verify Data option on one of my trial from the trial results available actions$/, function () {
        return browser.sleep(25).then(function () {
            searchTrial.clickSearchTrialActionButton();
            searchTrial.clickSearchTrialsVerifyDataButton();
        });
    });

    this.Then(/^the Trial Verification Data information will be displayed including$/, function (table) {
        return browser.sleep(25).then(function () {
            nciIDNT.then(function (trialNciIDNT) {
                verifyTrialData.getTDNCIID(trialNciIDNT);
            });
            verifyTrialData.viewTDNCTID.isPresent().then(function(state){
                if(state){
                    verifyTrialData.viewTDNCTID.isDisplayed().then(function(displayValue){
                        if(displayValue){
                            otherIDNT.then(function (trialOtherIDNT) {
                                console.log('value of NCT ID');
                                console.log(trialOtherIDNT);
                                verifyTrialData.getTDNCTID(trialOtherIDNT.toString());
                            });
                        } else {
                            assert.fail(0,1, 'Clinical Trial Identifier field is not Displayed in the Screen');
                        }

                    });
                } else {
                    assert.fail(0,1, 'Clinical Trial Identifier field is not Present in the Screen');
                }
            });
            leadProtocolIDNT.then(function (trialLeadProtocolIDNT) {
                verifyTrialData.getTDLeadOrgId(trialLeadProtocolIDNT);
            });
            trialOfficialTitleNT.then(function (trialOfficialTitleNT) {
                verifyTrialData.getTDOfficialTitle(trialOfficialTitleNT);
            });
            verifyTrialData.viewTDVerificationDate.isPresent().then(function(state){
                if(state){
                    verifyTrialData.viewTDVerificationDate.isDisplayed().then(function(displayValue){
                        if(!displayValue){
                            assert.fail(0,1, 'Current Verification Date field is not Displayed in the Screen');
                        }
                    });
                } else {
                    assert.fail(0,1, 'Current Verification Date field is not Present in the Screen');
                }
            });
            nciIDNT.then(function(value) {
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
                searchTrial.setSearchTrialProtocolID(value);
                searchTrial.clickSearchTrialSearchButton();
                searchTrial.clickSearchTrialMyTrials();
                expect(projectFunctions.inSearchResults(value)).to.eventually.equal('true', 'Verify Trial is present in Search Result');
                searchTrial.clickSearchTrialActionButton();
                searchTrial.clickSearchTrialsUpdateButton();


                addTrial.addTrialVerifyOtherTrialIdentifierTable.filter(function (name) {
                    return name.getText().then(function (text) {
                        console.log('text is' + text + 'Item to be verified' + clinicalIdentifierIDonUpdate);
                        return text === clinicalIdentifierIDonUpdate;
                    });
                }).then(function (filteredElements) {
                    console.log('filtered elements' + filteredElements);
                    // Only the elements that passed the filter will be here. This is an array.
                    if (filteredElements.length > 0) {
                        // element.all(by.css('.glyphicon.glyphicon-remove-circle')).get(0).click();
                        addTrial.addTrialRemoveOtherTrialIdentifier.click();
                        //addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'ClinicalTrials.gov Identifier')).click();
                        //addTrial.setAddTrialProtocolID(clinicalIdentifierIDonUpdate);
                        //addTrial.clickAddTrialAddProtocolButton();
                    }
                    else {
                        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'ClinicalTrials.gov Identifier')).click();
                        addTrial.setAddTrialProtocolID(clinicalIdentifierIDonUpdate);
                        addTrial.clickAddTrialAddProtocolButton();
                    }
                });

                addTrial.clickAddTrialReviewButton();
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
                searchTrial.setSearchTrialProtocolID(value);
                searchTrial.clickSearchTrialSearchButton();
                searchTrial.clickSearchTrialMyTrials();
                expect(projectFunctions.inSearchResults(value)).to.eventually.equal('true', 'Verify Trial is present in Search Result');
                searchTrial.clickSearchTrialActionButton();
                searchTrial.clickSearchTrialsVerifyDataButton();
                verifyTrialData.getTDNCIID(value);
                verifyTrialData.viewTDNCTID.isPresent().then(function(state){
                    if(state){
                        verifyTrialData.viewTDNCTID.isDisplayed().then(function(displayValue){
                            if(displayValue){
                                    verifyTrialData.getTDNCTID(clinicalIdentifierIDonUpdate);
                            } else {
                                assert.fail(0,1, 'Clinical Trial Identifier field is not Displayed in the Screen second test');
                            }

                        });
                    } else {
                        assert.fail(0,1, 'Clinical Trial Identifier field is not Present in the Screen second test');
                    }
                });
                leadProtocolIDNT.then(function (trialLeadProtocolIDNT) {
                    verifyTrialData.getTDLeadOrgId(trialLeadProtocolIDNT);
                });
                trialOfficialTitleNT.then(function (trialOfficialTitleNT) {
                    verifyTrialData.getTDOfficialTitle(trialOfficialTitleNT);
                });
                verifyTrialData.viewTDVerificationDate.isPresent().then(function(state){
                    if(state){
                        verifyTrialData.viewTDVerificationDate.isDisplayed().then(function(displayValue){
                            if(!displayValue){
                                assert.fail(0,1, 'Current Verification Date field is not Displayed in the Screen');
                            }
                        });
                    } else {
                        assert.fail(0,1, 'Current Verification Date field is not Present in the Screen');
                    }
                });
            });
        });
    });

    this.When(/^I click on the Save Verification Record Button$/, function () {
        return browser.sleep(25).then(function () {
            verifyTrialData.clickAddTDSaveButton();

        });
    });

    this.When(/^I click on the "([^"]*)" button for "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function () {
            verifyTrialData.getTDDialogText(arg2);
            verifyTrialData.clickAcceptTDDialogButton();
        });
    });

    this.Then(/^the current Verification Date will be saved with today's date$/, function () {
        return browser.sleep(25).then(function () {
            verifyTrialData.getTDVerificationDate(moment().format('DD-MMM-YYYY'));

        });
    });

    this.Then(/^I can view the current Verification Date displayed on the Trial Data Verification Screen$/, function (table) {
        return browser.sleep(25).then(function () {
            nciIDNT.then(function (trialNciIDNT) {
                verifyTrialData.getTDNCIID(trialNciIDNT);
            });
            verifyTrialData.getTDNCTID(clinicalIdentifierIDonUpdate);
            leadProtocolIDNT.then(function (trialLeadProtocolIDNT) {
                verifyTrialData.getTDLeadOrgId(trialLeadProtocolIDNT);
            });
            trialOfficialTitleNT.then(function (trialOfficialTitleNT) {
                verifyTrialData.getTDOfficialTitle(trialOfficialTitleNT);
            });
            verifyTrialData.getTDVerificationDate(moment().format('DD-MMM-YYYY'));
        });
    });

    this.Given(/^I am on the Trial Data Verification Screen$/, function () {
        return browser.sleep(25).then(function () {
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
            });
            projectFunctionsRegistry.createTrial(userCtrpTrialSubmitter, trialTypeNational, leadOrgIdentifierNational, clinicalIdentifierID, '', '', officialTitleNT, phaseNT, '', researchCategory, primaryPurposeNT, secondaryPurpose,
                accrualDisease, leadOrgNT, principalInvNT, sponsorOrgNT, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, trialStatus, trialComment, trialWhyStudyStopped,
                INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
                protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, submitTrial);
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                leadProtocolIDNT = leadProtocolID;
                nciIDNT = nciID;
                otherIDNT = otherIDs;
                trialOfficialTitleNT = officialTitle;
                trialPhaseNT = phase;
                trialPurposeNT = purpose;
                principalInvestigatorNT = principalInvestigator;
                leadOrganizationNT = leadOrganization;
                sponsorNT = sponsor;
                participatingSiteNT = participatingSiteInTrial;
            });
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
                nciIDNT.then(function (trialNciIDNT) {
                    searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result');
                    searchTrial.clickSearchTrialActionButton();
                    searchTrial.clickSearchTrialsVerifyDataButton();
                    currentVerificationDate = verifyTrialData.viewTDVerificationDate.getText();
                });
            });
        });
    });

    this.When(/^When I click on the Save Verification Record Button$/, function () {
        return browser.sleep(25).then(function () {
            verifyTrialData.clickAddTDSaveButton();
        });
    });

    this.When(/^I click on the "([^"]*)" Button for "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function () {
            verifyTrialData.getTDDialogText(arg2);
            verifyTrialData.clickCancelTDDialogButton();
        });
    });

    this.Then(/^the Last Verified Date will not be changed$/, function () {
        return browser.sleep(25).then(function () {
            currentVerificationDate.then(function (value) {
                verifyTrialData.getTDVerificationDate(value);
            });
        });
    });


};
