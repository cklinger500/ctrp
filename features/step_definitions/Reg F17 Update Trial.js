/**
 * Created by singhs10 on 7/11/16.
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
var searchTrialPage = require('../support/searchTrialPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
var loginPage = require('../support/LoginPage');
var importTrialPage = require('../support/registerImportTrialPage');
var menuItemList = require('../support/PoCommonBar');
var databaseConnection = require('../support/databaseConnection');
var Q = require('q');
var assert = require('assert');
var participatingSitePage = require('../support/registerAddParticipatingSite');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var searchPeoplePage = require('../support/ListOfPeoplePage');
var registryMessagePage = require('../support/RegistryMessage');


module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();
    var searchTrial = new searchTrialPage();
    var commonFunctions = new abstractionCommonMethods();
    var login = new loginPage();
    var importTrial = new importTrialPage();
    var menuItem = new menuItemList();
    var dbConnect = new databaseConnection();
    var participatingSite = new participatingSitePage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();
    var registryMessage = new registryMessagePage();

    var getDBConnection = '';

    var grantFundingMechanismUpd = 'R01';
    var grantInstituteCodeUpd = 'CA';
    var grantSerialNumberUpd = '131080';
    var grantNCIDivisionCodeUpd = 'CCR';

    var protocolDoc = 'testSampleDocFile.docx';
    var IRBDoc = 'testSampleXlsFile.xls';
    var protocolDocDocmFileUpd = 'testSampleDocmFile.docm';
    var IRBEXCELFileUpd = 'testSampleEXCELFile.xlsx';
    var PSPDFFileUpd = 'testSamplePDFFile.pdf';
    var InformedConsentXlsmFileUpd = 'testSampleXlsmFile.xlsm';
    var OtherXlsbFileUpd = 'testSampleXlsbFile.xlsb';
    //  var testSamplePDFFile = 'testSamplePDFFile.pdf';
    var DescriptionFirstDoc = 'Description for first doc Update';


    this.Given(/^I have selected the option to search my trials in CTRP$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createTrialForTrialUpdate();
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
                nciIDNT.then(function (trialNciIDNT) {
                    searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result for Update');
                });
            });
            //   browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I am the Trial Owner$/, function (callback) {
        callback();
    });

    this.When(/^the Update option is enabled on one of my trials$/, function () {
        return browser.sleep(25).then(function () {
            searchTrial.clickSearchTrialActionButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have selected the Update option$/, function () {
        return browser.sleep(25).then(function () {
            searchTrial.clickSearchTrialsUpdateButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^all trial information for the latest submission will be displayed as in Registration with only Update fields enabled Type$/, function (table) {
        return browser.sleep(25).then(function () {
            //Other Trial ID//
            expect(addTrial.addTrialProtocolIDOrigin.isEnabled()).to.eventually.equal(true, 'Validating Other Trial Identifier Protocol ID Type field is Enabled');
            expect(addTrial.addTrialProtocolID.isEnabled()).to.eventually.equal(true, 'Validating Other Trial Identifier Protocol ID field is Enabled');
           // expect(addTrial.addTrialAddProtocolButton.isEnabled()).to.eventually.equal(true, 'Validating Other Trial Identifier Add Button is Enabled');

            //Grant Information//
            expect(addTrial.addTrialFundedByNCIOption.get(0).isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES field is Enabled');
            expect(addTrial.addTrialFundedByNCIOption.get(1).isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option NO field is Enabled');
            addTrial.addTrialFundedByNCIOption.get(0).isSelected().then(function (state) {
                if (state) {
                    expect(addTrial.addTrialFundingMechanism.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Funding Mechanism field is Enabled');
                    expect(addTrial.addTrialInstituteCode.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Institute Code field is Enabled');
                    expect(addTrial.addTrialSerialNumberBox.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Serial Number Box field is Enabled');
                    expect(addTrial.addTrialNCIDivisionProgramCode.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, NCI/Division field is Enabled');
                    expect(addTrial.addTrialAddGrantInfoButton.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Add Button is Enabled');
                }
                else {
                    addTrial.addTrialFundedByNCIOption.get(1).isSelected().then(function (state) {
                        if (state) {
                            addTrial.selectAddTrialFundedByNCIOption('yes');
                            expect(addTrial.addTrialFundingMechanism.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Funding Mechanism field is Enabled');
                            expect(addTrial.addTrialInstituteCode.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Institute Code field is Enabled');
                            expect(addTrial.addTrialSerialNumberBox.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Serial Number Box field is Enabled');
                            expect(addTrial.addTrialNCIDivisionProgramCode.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, NCI/Division field is Enabled');
                            expect(addTrial.addTrialAddGrantInfoButton.isEnabled()).to.eventually.equal(true, 'Validating Grant Info with Option YES, Add Button is Enabled');
                            addTrial.selectAddTrialFundedByNCIOption('no');
                        }
                    });
                }
            });

            //Trial Status//
            expect(addTrial.addTrialDateFields.get(0).isEnabled()).to.eventually.equal(true, 'Validating Trial Status Date Calender is Enabled');
            expect(addTrial.addTrialStatus.isEnabled()).to.eventually.equal(true, 'Validating Trial Status field is Enabled');
            expect(addTrial.addTrialStatusComment.isEnabled()).to.eventually.equal(true, 'Validating Trial Status Comment field is Enabled');
            addTrial.selectAddTrialStatus('Withdrawn');
            expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.eventually.equal(true, 'Validating Trial Status Why Study stopped field is Enabled');
            expect(addTrial.addTrialAddStatusButton.isEnabled()).to.eventually.equal(true, 'Validating Trial Status Add Button is Enabled');

            //Trial Dates//
            expect(addTrial.addTrialDateFields.get(1).isEnabled()).to.eventually.equal(true, 'Validating Trial Start Date Calender is Enabled');
            expect(addTrial.addTrialStartDateOption.get(0).isEnabled()).to.eventually.equal(true, 'Validating Trial Start Date with Option YES field is Enabled');
            expect(addTrial.addTrialStartDateOption.get(1).isEnabled()).to.eventually.equal(true, 'Validating Trial Start Date with Option NO field is Enabled');
            expect(addTrial.addTrialDateFields.get(2).isEnabled()).to.eventually.equal(true, 'Validating Trial Primary Completion Date Calender is Enabled');
            expect(addTrial.addTrialPrimaryCompletionDateOption.get(0).isEnabled()).to.eventually.equal(true, 'Validating Trial Primary Completion Date with Option YES field is Enabled');
            expect(addTrial.addTrialPrimaryCompletionDateOption.get(1).isEnabled()).to.eventually.equal(true, 'Validating Trial Primary Completion Date with Option NO field is Enabled');
            expect(addTrial.addTrialDateFields.get(3).isEnabled()).to.eventually.equal(true, 'Validating Trial Completion Date Calender is Enabled');
            expect(addTrial.addTrialCompletionDateOption.get(0).isEnabled()).to.eventually.equal(true, 'Validating Trial Completion Date with Option YES field is Enabled');
            expect(addTrial.addTrialCompletionDateOption.get(1).isEnabled()).to.eventually.equal(true, 'Validating Trial Completion Date with Option NO field is Enabled');
           // projectFunctionsRegistry.validateTrialFields();
        });
    });

    this.Then(/^I will be able to Update Other Protocol Identifiers to allow both additional Other Protocol Identifiers as well as removing existing$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.addOtherTrialIdentifier('Other Identifier');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will be able to Update Grant Information to allow both additional Grants as well as removing existing$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialFundedByNCIOption('yes');
            addTrial.addTrialVerifyGrantTableExist.isPresent().then(function (present) {
                if (present) {
                    addTrial.addTrialRemoveGrantValues.click();
                }
                addTrial.selectAddTrialFundingMechanism(grantFundingMechanismUpd);
                addTrial.selectAddTrialInstituteCode(grantInstituteCodeUpd);
                addTrial.setAddTrialSerialNumber(grantSerialNumberUpd);
                addTrial.addTrialSerialNumberSelect.click();
                addTrial.selectAddTrialNCIDivisionProgramCode(grantNCIDivisionCodeUpd);
                addTrial.clickAddTrialAddGrantInfoButton();
            });
        });
    });

    this.Then(/^I can delete existing and add new Trial Status and Trial Status Dates$/, function () {
        return browser.sleep(25).then(function () {
while(addTrial.addTrialAddStatusTableExist.isPresent()){
    addTrial.addTrialRemoveTrialStatus.click();
    addTrial.setAddTrialStatusDeleteReason('Delete Reason');
    addTrial.clickAddTrialStatusDeleteCommitButton();
}

            projectFunctionsRegistry.clickDeleteTrialStatusInformation('In Review');


            addTrial.addTrialStatusWhyDeletedReason.isPresent().then(function(presentState){
                if(presentState){
                    addTrial.addTrialStatusWhyDeletedReason.isDisplayed().then(function(displayedState){
                        if(displayedState){
                            addTrial.setAddTrialStatusDeleteReason('Delete Reason');
                            addTrial.clickAddTrialStatusDeleteCommitButton();
                        }
                    });
                }
            });
            addTrial.clickAddTrialDateField(0);
            addTrial.clickAddTrialDateFieldPreviousMonth('14');
            addTrial.selectAddTrialStatus('In Review');
            addTrial.setAddTrialStatusComment('Comment added testing Update Trial');
            addTrial.clickAddTrialAddStatusButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialDateField(1);
            addTrial.clickAddTrialDateFieldPreviousMonth('20');
            addTrial.selectAddTrialStartDateOption('0');
            addTrial.clickAddTrialDateField(2);
            addTrial.clickAddTrialDateFieldNextMonth('15');
            addTrial.selectAddTrialPrimaryCompletionDateOption('1');
            addTrial.clickAddTrialDateField(3);
            addTrial.clickAddTrialDateFieldNextMonth('19');
            addTrial.selectAddTrialCompletionDateOption('0');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will be able to review all existing Trial Related Documents type$/, function () {
        return browser.sleep(25).then(function () {
            existingDocs = addTrial.addTrialVerifyAddedDocs.getText().then(function (Docs) {
                return Docs;
            });
            existingDocsOtherDesc = addTrial.addTrialVerifyAddedOtherDocsDescriptionOnly.isPresent().then(function (state) {
                if (state) {
                    return addTrial.addTrialVerifyAddedOtherDocsDescription.getText().then(function (trialDocsOtherDesc) {
                        console.log('Trial Other documents with Decription ----> ' + trialDocsOtherDesc);
                        return trialDocsOtherDesc;
                    });
                }
                else {
                    console.log('Trial Other Documents does not exist in Page.');
                    return Q.when([]);
                }
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will be able to add all Trial Related Documents$/, function () {
        return browser.sleep(25).then(function () {
            trialDoc.trialRelatedFileUpload('reg', '1', protocolDocDocmFileUpd);
            expect(trialDoc.trailFileUploadProtocol.getAttribute('value')).to.eventually.equal(protocolDocDocmFileUpd);
            trialDoc.trialRelatedFileUpload('reg', '2', IRBEXCELFileUpd);
            expect(trialDoc.trailFileUploadIRB.getAttribute('value')).to.eventually.equal(IRBEXCELFileUpd);
            trialDoc.trialRelatedFileUpload('reg', '3', PSPDFFileUpd);
            expect(trialDoc.trailFileUploadParticipating.getAttribute('value')).to.eventually.equal(PSPDFFileUpd);
            trialDoc.trialRelatedFileUpload('reg', '4', InformedConsentXlsmFileUpd);
            expect(trialDoc.trailFileUploadInformed.getAttribute('value')).to.eventually.equal(InformedConsentXlsmFileUpd);
            trialDoc.trialRelatedFileUpload('reg', '5', OtherXlsbFileUpd);
            addTrial.setAddTrialOtherDocsDescription(0, DescriptionFirstDoc);
            expect(trialDoc.trailFileUploadOther.getAttribute('value')).to.eventually.equal(OtherXlsbFileUpd);
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the added documents should be added to the existing documents$/, function () {
        return browser.sleep(25).then(function () {
            existingDocs.then(function (value) {
                console.log('existing Docs value');
                console.log(value);
                expect(addTrial.addTrialVerifyAddedDocs.getText()).to.eventually.eql(value);
            });
            //  browser.sleep(25).then(callback);
        });
    });


    this.When(/^the trial has errors$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialReviewButton.isPresent()).to.eventually.equal(true,'Verification of Submit button is present');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Review Button will be displayed to Review the errors$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            //    expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal(registryMessage.trialDatesCompletionActualMessage);
            expect(addTrial.addTrialCompletionDateErrorMessageForTrialStatus.getText()).to.eventually.equal(registryMessage.trialDatesCompletionStatusMessage('In Review'));
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^the trial has no errors$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialCompletionDateOption('1');
            expect(addTrial.addTrialSubmitButton.isPresent()).to.eventually.equal(true);
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Submit button will be displayed$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialSubmitButton.isPresent()).to.eventually.equal(true);
            //browser.sleep(25).then(callback);
        });
    });


    this.When(/^I can click on the submit button$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            browser.wait(function () {
                return element(by.linkText(protocolDocDocmFileUpd)).isPresent().then(function (state) {
                    if (state === true) {
                        return element(by.linkText(protocolDocDocmFileUpd)).isDisplayed().then(function (state2) {
                            return state2 === true;
                        });
                    } else {
                        return false;
                    }
                });
            }, 10000, "View Trial page  did not appear after Submit");
            existingDocs.then(function (value) {
                var arr1 = value;
                var newAddedDocuments = protocolDocDocmFileUpd + IRBEXCELFileUpd + PSPDFFileUpd + InformedConsentXlsmFileUpd + OtherXlsbFileUpd;
                arr1.push(protocolDocDocmFileUpd, IRBEXCELFileUpd, PSPDFFileUpd, InformedConsentXlsmFileUpd, OtherXlsbFileUpd);
                var newAddedDocumentArrSort = arr1.sort();
                console.log('New array documents after sort:');
                console.log(newAddedDocumentArrSort);
                //    addTrial.addTrialVerifyAddedDocs.getText().then(function (newDocSet) {
                //       console.log('New array documents in Screen :');
                //       console.log(newDocSet.sort());
                //     expect((addTrial.addTrialVerifyAddedDocs.getText()).sort()).to.eql(newAddedDocumentArrSort);
                //   });
                addTrial.addTrialVerifyAddedDocs.getText().then(function (newDocSet) {
                    console.log('New array documents in Screen :');
                    console.log(newDocSet.sort());
                    expect(newDocSet.sort()).to.eql(newAddedDocumentArrSort);
                });
            });
            existingDocsOtherDesc.then(function (existingOtherDocs) {
                var existingDocsArr1 = existingOtherDocs;
                console.log(existingDocsArr1);
                var newOtherDocsStrings = OtherXlsbFileUpd + '\n' + DescriptionFirstDoc;
                var newOtherDocsArr2 = newOtherDocsStrings.split();
                var newCombineArr = existingDocsArr1.concat(newOtherDocsArr2);
                console.log('new Combine array');
                console.log(newCombineArr.sort());
                //addTrial.addTrialVerifyAddedOtherDocsDescription.getText().then(function (newOtherDocSet) {
                //    console.log('New array Other documents in Screen :');
                //    console.log(newOtherDocSet.sort());
                //    expect((addTrial.addTrialVerifyAddedOtherDocsDescription.getText()).sort()).to.eql(newCombineArr.sort());
                //  });
                addTrial.addTrialVerifyAddedOtherDocsDescription.getText().then(function (newOtherDocSet) {
                    console.log('New array Other documents in Screen :');
                    console.log(newOtherDocSet.sort());
                    expect(newOtherDocSet.sort()).to.eql(newCombineArr.sort());
                });
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^my trial will be updated in the CTRP application$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getViewTrialOtherIdentifier(['Other', otherIdentifierID]);
            var grantFundingTble = grantFundingMechanismUpd + ' ' + grantInstituteCodeUpd + ' ' + grantSerialNumberUpd + ' ' + grantNCIDivisionCodeUpd;
            addTrial.getViewTrialGrantTable(grantFundingTble.split());



        });


    });

    this.Then(/^the Submission source is a Cancer Center$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Submission method is Registry$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^Submission type is Update$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


    this.Then(/^shilpi I can delete existing and add new Trial Status and Trial Status Dates$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
                searchTrial.setSearchTrialProtocolID('NCI-2016-00011');
                searchTrial.clickMyTrials();
                searchTrial.clickSearchTrialActionButton();
                searchTrial.clickSearchTrialsUpdateButton();
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                while (addTrial.addTrialAddStatusTableExist.isPresent()) {
                    addTrial.addTrialRemoveTrialStatus.click();
                    addTrial.setAddTrialStatusDeleteReason('Delete Reason');
                    addTrial.clickAddTrialStatusDeleteCommitButton();
                }
            });
        });
    });

        };