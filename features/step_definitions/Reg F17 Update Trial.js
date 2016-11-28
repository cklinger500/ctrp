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
var addPeoplePage = require('../support/AddPersonPage');
var phoneFormat = require('phoneformat.js');
var userProfilePage = require('../support/userProfilePage');

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
    var addPeople = new addPeoplePage();
    var userProfile = new userProfilePage();

    var getDBConnection = '';

    var grantFundingMechanismUpd = 'R01';
    var grantInstituteCodeUpd = 'CA';
    var grantSerialNumberUpd = '131080';
    var grantNCIDivisionCodeUpd = 'CCR';

    var currentYear = moment().year();
    var previousMonth = moment().subtract(1, 'months').format('MMMM');
    var nextMonth = moment().add(1, 'months').format('MMMM');

    var protocolDoc = 'testSampleDocFile.docx';
    var IRBDoc = 'testSampleXlsFile.xls';
    var protocolDocDocmFileUpd = 'testSampleDocmFile.docm';
    var IRBEXCELFileUpd = 'testSampleEXCELFile.xlsx';
    var PSPDFFileUpd = 'testSamplePDFFile.pdf';
    var InformedConsentXlsmFileUpd = 'testSampleXlsmFile.xlsm';
    var OtherXlsbFileUpd = 'testSampleXlsbFile.xlsb';
    //  var testSamplePDFFile = 'testSamplePDFFile.pdf';
    var DescriptionFirstDoc = 'Description for first doc Update';

    var localTrialIDOrig = 'SS LocalID Cuke9918';
    var programCodeOrig = 'PC code';
    var contactNameOrig = 'SS Cuke CName';
    var contactPhoneOrig = '(768) 222-6789';
    var contactEmailOrig = 's@singh.com';
    var contactPhoneExtensionOrig = '005';

    /**** Email Verification ****/
    var emailSubjectUpd = ' NCI CTRP: Trial RECORD UPDATED for ';

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

    this.When(/^the Update option is enabled on one of my trials$/, function (callback) {
        callback();
    });

    this.When(/^I have selected the Update option$/, function () {
        return browser.sleep(25).then(function () {
            searchTrial.clickSearchTrialActionButton();
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
             addTrial.addTrialRemoveTrialStatus.then(function(items) {
                var i;
                for (i=0; i<items.length; i++) {
                    addTrial.addTrialRemoveTrialStatus.get(i).click();
                    addTrial.setAddTrialStatusDeleteReason('Delete Reason');
                    addTrial.clickAddTrialStatusDeleteCommitButton();
                }
            });
            addTrial.clickAddTrialDateField(0);
            addTrial.clickAddTrialDateFieldDifferentYear(currentYear.toString(),previousMonth.toString(),'14');
          //  addTrial.clickAddTrialDateFieldPreviousMonth('14');
            addTrial.selectAddTrialStatus('In Review');
            addTrial.setAddTrialStatusComment('Comment added testing Update Trial');
            addTrial.clickAddTrialAddStatusButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialDateField(1);
            addTrial.clickAddTrialDateFieldDifferentYear(currentYear.toString(),previousMonth.toString(),'20');
            addTrial.selectAddTrialStartDateOption('0');
            addTrial.clickAddTrialDateField(2);
            addTrial.clickAddTrialDateFieldDifferentYear(currentYear.toString(),nextMonth.toString(),'15');
            addTrial.selectAddTrialPrimaryCompletionDateOption('1');
            addTrial.clickAddTrialDateField(3);
            addTrial.clickAddTrialDateFieldDifferentYear(currentYear.toString(),nextMonth.toString(),'19');
            addTrial.selectAddTrialCompletionDateOption('0');
        });
    });

    this.Then(/^I will be able to review all existing Trial Related Documents type$/, function () {
        return browser.sleep(25).then(function () {
            existingOtherDocs = addTrial.addTrialVerifyAddedOtherDocsDescriptionOnly.isPresent().then(function (state) {
                if (state) {
                    return addTrial.addTrialVerifyAddedOtherDocsDescription.getText().then(function (trialDocsOtherDesc) {
                        var otherDocsExisting = trialDocsOtherDesc.map(function(x)
                        {
                            return x.replace(/\n.*/,'');
                        });
                        console.log('After Convert Trial Other Description without Description');
                        console.log(otherDocsExisting);
                        return otherDocsExisting;
                    });
                }
                else {
                    console.log('Trial Other Documents does not exist in Page.');
                    return Q.when([]);
                }
            });
                existingOtherDocsDesc = addTrial.addTrialVerifyAddedOtherDocsDescriptionOnly.isPresent().then(function (state) {
                    if (state) {
                        return addTrial.addTrialVerifyAddedOtherDocsDescription.getText().then(function (trialDocsOtherDesc) {
                            console.log('Trial Other documents with Decription ----> ');
                            console.log(trialDocsOtherDesc);
                            var itemsWithNewline = trialDocsOtherDesc.filter(function(y){
                                return y.match(/\n/);
                            });
                                console.log('Items with newline');
                                console.log(itemsWithNewline);
                            var otherDocsDescExisting = itemsWithNewline.map(function(x)
                            {
                                return x.replace(/.*\n/,'');
                            });
                            console.log('After Convert Trial Other Description with Description');
                            console.log(otherDocsDescExisting);
                            return otherDocsDescExisting;
                        });
                    }
                    else {
                        console.log('Trial Other Documents does not exist in Page.');
                        return Q.when([]);
                    }
                });
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
/*
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
*/

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
            });
            //  browser.sleep(25).then(callback);
        });

    this.Then(/^my trial will be updated in the CTRP application$/, function () {
        return browser.sleep(25).then(function () {
            var otherIdArray = ['Other', otherIdentifierID];
            addTrial.getViewTrialOtherIdentifier(otherIdArray);
            var grantFundingTble = grantFundingMechanismUpd + ' ' + grantInstituteCodeUpd + ' ' + grantSerialNumberUpd + ' ' + grantNCIDivisionCodeUpd;
            addTrial.getViewTrialGrantTable(grantFundingTble.split());
            addTrial.getViewTrialStatus('In Review');
            addTrial.getViewTrialStatusDate(moment().date(14).subtract(1, 'months').format('DD-MMM-YYYY'));
            addTrial.getViewTrialStartDateWithDateType(moment().date(20).subtract(1, 'months').format('DD-MMM-YYYY'),'Actual');
            addTrial.getViewTrialPrimaryCompletionDateWithDateType(moment().date(15).add(1, 'months').format('DD-MMM-YYYY'),'Anticipated');
            addTrial.getViewTrialCompletionDateWithDateType(moment().date(19).add(1, 'months').format('DD-MMM-YYYY'),'Anticipated');
            existingOtherDocs.then(function (value) {
                var arr1 = value;
                arr1.push(protocolDocDocmFileUpd, IRBEXCELFileUpd, PSPDFFileUpd, InformedConsentXlsmFileUpd, OtherXlsbFileUpd);
                var newAddedDocumentArrSort = arr1.sort();
                console.log('New array documents after sort:');
                console.log(newAddedDocumentArrSort);
                addTrial.viewTrialVerifyviewedDocs.getText().then(function (newDocSet) {
                    console.log('New array documents in Screen :');
                    console.log(newDocSet.sort());
                    expect(newDocSet.sort()).to.eql(newAddedDocumentArrSort, 'Verification of Documents on View Trial Screen after Update');
                });
            });
            existingOtherDocsDesc.then(function (existingOtherDocs) {
                var existingDocsArr1 = existingOtherDocs;
                console.log(existingDocsArr1);
                var newOtherDocsArr2 = DescriptionFirstDoc.split();
                var newCombineArr = existingDocsArr1.concat(newOtherDocsArr2);
                console.log('new Combine array');
                console.log(newCombineArr.sort());
                addTrial.viewTrialVerifyviewedOtherDocsDescription.getText().then(function (newOtherDocSet) {
                    console.log('New array Other documents description in Screen :');
                    var otherDescOnly = newOtherDocSet.filter(Boolean);
                    console.log(otherDescOnly.sort());
                    expect(otherDescOnly.sort()).to.eql(newCombineArr.sort(), 'Verification of Documents Description on View Trial Screen after Update');
                });
            });

        });


    });

    this.Then(/^the Submission source is a Cancer Center$/, function () {
        return browser.sleep(25).then(function () {
            nciIDNT.then(function (trialNciIDNT) {
                dbConnect.dbConnVerifySubmissionSource(trialNciIDNT, 'Cancer Center', getDBConnection);
            });
        });
    });

    this.Then(/^the Submission method is Registry$/, function () {
        return browser.sleep(25).then(function () {
            nciIDNT.then(function (trialNciIDNT) {
                dbConnect.dbConnVerifySubmissionMethod(trialNciIDNT, 'Registry', getDBConnection);
            });
        });
    });

    this.Then(/^Submission type is Update$/, function () {
        return browser.sleep(25).then(function () {
            nciIDNT.then(function (trialNciIDNT) {
                dbConnect.dbConnVerifySubmissionType(trialNciIDNT, 'Update', getDBConnection);
            });
        });
    });

    this.Given(/^I search for a Trial which has been accepted and has a Participating site added to it$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createTrialForTrialUpdate();
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                nciIDNT.then(function (trialNciIDNT) {
                    menuItem.clickPeople();
                    menuItem.clickListPeople();
                    principalInvestigator.then(function(PIName){
                        var PIFirstName = PIName.replace(/.*,/,'').trim();
                        console.log('PI First Name: '+ PIFirstName);
                        searchPeople.setPersonFirstName(PIFirstName);
                        searchPeople.clickSearch();
                        element(by.linkText(PIFirstName)).click();
                        addPeople.addPersonSourceId.getText().then(function(PISrcID){
                        dbConnect.dbConnAddParticipatingSiteGeneralType(trialNciIDNT,'ctrptrialsubmitter',localTrialIDOrig, programCodeOrig, contactNameOrig, contactPhoneOrig, contactEmailOrig, contactPhoneExtensionOrig,PISrcID, getDBConnection);
                    });
                    });
                    trialMenuItem.clickTrials();
                    trialMenuItem.clickListSearchTrialLink();
                    searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result for Update');
                    login.clickWriteMode('On');
                });
            });
        });
    });

    this.Then(/^I can view participating sites details$/, function (table) {
        return browser.sleep(25).then(function () {
            addTrial.addTrialPsticipatingSitesTableHeader.getText().then(function (value) {
                console.log('value from app');
                console.log(value);
                var tableValue = table.raw().toString() + ',Edit';
                var tableValueArr = tableValue.split(",");
                console.log('Table Value');
                console.log(tableValueArr);
                expect(value).to.eql(tableValueArr);
            });
        });
    });

    this.When(/^I select a participating site to edit$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.editParticipatingSiteFromGrid(userTableDBOrgID, 0);
        });
    });

    this.Then(/^an edit site pop up screen displays with field type$/, function (table) {
        return browser.sleep(25).then(function () {
            var PSFieldTypeTable = table.raw();
            for (var i = 0; i < PSFieldTypeTable.length; i++) {
             if(PSFieldTypeTable[i].toString() === 'NCI ID'){
                 nciIDNT.then(function (trialNciIDNT) {
                     participatingSite.getPSNCIID(trialNciIDNT);
                 });
             } else if(PSFieldTypeTable[i].toString() === 'Lead Org Trial Identifier'){
                 leadProtocolIDNT.then(function (trialLeadProtocolID) {
                     participatingSite.getPSLeadOrgId(trialLeadProtocolID);
                 });
             } else if(PSFieldTypeTable[i].toString() === 'Official Title'){
                 trialOfficialTitleNT.then(function (officialTitle) {
                     participatingSite.getPSOfficialTitle(officialTitle);
                 });
             } else if(PSFieldTypeTable[i].toString() === 'Organization Name'){
                 storePSOrgName.then(function (orgName) {
                     participatingSite.getVerifyPSOrgName(orgName);
                 });
             } else if(PSFieldTypeTable[i].toString() === 'Local Trial Identifier'){
                 storePSLocalID.then(function (localTrialID) {
                     participatingSite.getVerifyPSLocalId(localTrialID);
                 });
             } else if(PSFieldTypeTable[i].toString() === 'Site Principal Investigator'){
                 principalInvestigator.then(function (sitePI) {
                     participatingSite.getVerifyPSPrincipalInvestigator(sitePI);
                 });
             } else if(PSFieldTypeTable[i].toString() === 'Site Specific Program Code'){
                 storePSPC.then(function (programCode) {
                     participatingSite.getVerifyPSProgramCode(programCode);
                 });
             } else if(PSFieldTypeTable[i].toString() === 'Trial Recruitment Status:Status Date-Status'){
                 storePSStatusDate.then(function (statusDate) {
                     expect(participatingSite.addPSTrialStatusDateTable.last().getText()).to.eventually.equal(statusDate);
                 });
                 storePSStatus.then(function (status) {
                     expect(participatingSite.addPSTrialStatusTable.last().getText()).to.eventually.equal(status);
                 });

             } else if(PSFieldTypeTable[i].toString() === 'Contact Type'){
                     participatingSite.getVerifyPSContactType('General');
             } else if(PSFieldTypeTable[i].toString() === 'Contact Name'){
                 storePSContactName.then(function (contactName) {
                     participatingSite.getVerifyPSContactName(contactName);
                 });
             } else if(PSFieldTypeTable[i].toString() === 'Contact Email Address'){
                 storePSContactEmail.then(function (emailAddress) {
                     participatingSite.getVerifyPSContactEmailAddress(emailAddress);
                 });
             } else if(PSFieldTypeTable[i].toString() === 'Contact Phone Number-Extension'){
                 storePSContactPhone.then(function (contactPhone) {
                     participatingSite.getVerifyPSContactPhone(contactPhone.split('x')[0].toString());
                 });
                 storePSContactPhone.then(function (phoneExtension) {
                     participatingSite.getVerifyPSContactPhoneExtension(phoneExtension.split('x')[1].toString());
                 });
             } else{
                 assert.fail(0,1,'No Step defined for given PS field --> ' + PSFieldTypeTable[i].toString() + ' <-- Please add a step for it.');
             }
            }
        });
    });

    this.Then(/^only the participating site fields type will be editable$/, function (table) {
        return browser.sleep(25).then(function () {
            expect(participatingSite.addPSOrgName.isEnabled()).to.eventually.equal(false, 'Validating PS Organization NAme field is not Enabled');
            expect(participatingSite.addPSLocalId.isEnabled()).to.eventually.equal(false, 'Validating PS Local Trial Identifier field is not Enabled');
            expect(addTrial.addTrialPersonSearchModel.isDisplayed()).to.eventually.equal(false, 'Validating PS Site Principal Investigator button is not Enabled');
            expect(participatingSite.addPSPrincipalInvestigator.isEnabled()).to.eventually.equal(false, 'Validating PS Site Principal Investigator field is not Enabled');
            expect(participatingSite.addPSSiteProgramCode.isEnabled()).to.eventually.equal(false, 'Validating PS Program Code field is not Enabled');
            var PSEditableFieldTable = table.raw();

            for (var i = 0; i < PSEditableFieldTable.length; i++) {
                if (PSEditableFieldTable[i].toString() === 'Current Site Recruitment Status') {
                    participatingSite.addPSTrialRemoveTrialStatus.then(function(items) {
                        var i;
                        for (i=0; i<items.length; i++) {
                            participatingSite.addPSTrialRemoveTrialStatus.get(i).click();
                        }
                    });
                    participatingSite.selectAddPSTrialStatus('Approved');
                        participatingSite.setAddPSTrialComment('Comment added testing Update PS');
                } else if (PSEditableFieldTable[i].toString() === 'Current Site Recruitment Status Date') {
                    addTrial.clickAddTrialDateField(0);
                    addTrial.clickAddTrialDateFieldDifferentYear(currentYear.toString(),previousMonth.toString(),'14');
                    participatingSite.clickAddPSAddStatusButton();
                } else if (PSEditableFieldTable[i].toString() === 'Contact Type') {
                        participatingSite.selectAddPSContactType('Person');
                } else if (PSEditableFieldTable[i].toString() === 'Contact Name') {
                    dbConnect.dbConnAddPersonWithOrg('ctrpcurator', 'CTRP', 'Pfx', 'Sfx','PS@Person.com', '(240) 276-5666','Active','personCCPS' + moment().format('MMMDoYY'),'M','PSJerry','009','Complete','orgPersonCCPS' + moment().format('MMMDoYY'),'Shady Grove',
                    'Medical Center', 'Rockville', 'Maryland', '29087','United States', 'orgPersonPS@d.com','(601) 452-6744', '01','Complete', 'Active', getDBConnection);
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                            addTrial.clickAddTrialPersonSearchModel(1);
                            searchOrg.clickExactSearch('true');
                            searchPeople.setPersonFirstName(personDBFirstName);
                                searchPeople.setPersonOrgAffiliation(orgDBName);
                                searchPeople.clickSearch();
                                searchOrg.selectOrgModelItem();
                                searchOrg.clickOrgModelConfirm();
                    });
                } else if (PSEditableFieldTable[i].toString() === 'Contact Email Address') {
                        participatingSite.setAddPSContactEmailAddress('emlUpd@Person.com');
                } else if (PSEditableFieldTable[i].toString() === 'Contact Phone Number-Extension') {
                        participatingSite.setAddPSContactPhone('(601) 452-6744');
                    participatingSite.setAddPSContactPhoneExtension('09');
                } else {
                    assert.fail(0, 1, 'No Step defined for given PS field --> ' + PSEditableFieldTable[i].toString() + ' <-- Please add a step for it.');
                }
            }
        });
    });

    this.When(/^I click on the save button$/, function () {
        return browser.sleep(25).then(function () {
            participatingSite.clickAddPSSaveButton();
        });
    });

    this.Then(/^the updated participating site details will be saved in the trial record$/, function () {
        return browser.sleep(25).then(function () {
            principalInvestigator.then(function (sitePI) {
                var updStatusDate = moment().date(14).subtract(1, 'months').format('DD-MMM-YYYY');
                    projectFunctionsRegistry.verifySingleParticipatingSiteFromGrid(userTableDBOrgID, 0, userTableDBOrgID, userTableDBOrgName, sitePI, localTrialIDOrig, programCodeOrig, 'Approved', updStatusDate, 'PSJerry, ' + personDBFirstName, 'emlUpd@Person.com', '(601) 452-6744' + ' x09');
            });
        });
    });

    this.Given(/^I am on the Add Participating Site feature$/, function () {
        return browser.sleep(25).then(function () {
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
                projectFunctionsRegistry.createTrialForTrialUpdate();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 40).then(function () {
                    nciIDNT.then(function (trialNciIDNT) {
                        menuItem.clickPeople();
                        menuItem.clickListPeople();
                        principalInvestigator.then(function (PIName) {
                            var PIFirstName = PIName.replace(/.*,/, '').trim();
                            console.log('PI First Name: ' + PIFirstName);
                            searchPeople.setPersonFirstName(PIFirstName);
                            searchPeople.clickSearch();
                            element(by.linkText(PIFirstName)).click();
                            addPeople.addPersonSourceId.getText().then(function (PISrcID) {
                                localTrialID = 'SS LocalID Cuke9918';
                                dbConnect.dbConnAddParticipatingSiteGeneralType(trialNciIDNT, 'ctrptrialsubmitter', localTrialIDOrig, programCodeOrig, contactNameOrig, contactPhoneOrig, contactEmailOrig, contactPhoneExtensionOrig, PISrcID, getDBConnection);
                            });
                        });
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 40).then(function () {
                            trialMenuItem.clickTrials();
                            trialMenuItem.clickListSearchTrialLink();
                            searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                            searchTrial.clickMyTrials();
                            expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result for Update');
                            login.clickWriteMode('On');
                            searchTrial.clickSearchTrialActionButton();
                            searchTrial.clickSearchTrialsUpdateButton();
                            browser.driver.wait(function () {
                                console.log('wait here');
                                return true;
                            }, 40).then(function () {
                                projectFunctionsRegistry.editParticipatingSiteFromGrid(userTableDBOrgID, 0);
                            });
                        });
                    });
                });
            });
        });
    });

    this.Given(/^I can select Contact Type$/, function (table) {
        return  browser.sleep(25).then(function () {
            var PSContactTypeTable = table.raw();
            for (var i = 0; i < PSContactTypeTable.length; i++) {
                participatingSite.selectAddPSContactType(PSContactTypeTable[i].toString());
            }
        });
    });


    this.Given(/^I am on the Update Participating Sites screen$/, function () {
        return browser.sleep(25).then(function () {
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
                projectFunctionsRegistry.createTrialForTrialUpdate();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 40).then(function () {
                    nciIDNT.then(function (trialNciIDNT) {
                        menuItem.clickPeople();
                        menuItem.clickListPeople();
                        principalInvestigator.then(function (PIName) {
                            var PIFirstName = PIName.replace(/.*,/, '').trim();
                            console.log('PI First Name: ' + PIFirstName);
                            searchPeople.setPersonFirstName(PIFirstName);
                            searchPeople.clickSearch();
                            element(by.linkText(PIFirstName)).click();
                            storePersonEmail = addPeople.addPersonEmail.getAttribute('value');
                            storePersonPhone = addPeople.addPersonPhone.getAttribute('value');
                            storePersonPhoneExtension = addPeople.addPersonPhoneExtension.getAttribute('value');
                            addPeople.addPersonSourceId.getText().then(function (PISrcID) {
                                dbConnect.dbConnAddParticipatingSiteGeneralType(trialNciIDNT, 'ctrptrialsubmitter', localTrialIDOrig, programCodeOrig, contactNameOrig, contactPhoneOrig, contactEmailOrig, contactPhoneExtensionOrig, PISrcID, getDBConnection);
                            });
                        });
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 40).then(function () {
                            trialMenuItem.clickTrials();
                            trialMenuItem.clickListSearchTrialLink();
                            searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                            searchTrial.clickMyTrials();
                            expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result for Update');
                            login.clickWriteMode('On');
                            searchTrial.clickSearchTrialActionButton();
                            searchTrial.clickSearchTrialsUpdateButton();
                            browser.driver.wait(function () {
                                console.log('wait here');
                                return true;
                            }, 40).then(function () {
                                projectFunctionsRegistry.editParticipatingSiteFromGrid(userTableDBOrgID, 0);
                            });
                        });
                    });
                });
            });
        });
    });

    this.When(/^the contact type selected is Site Investigator$/, function () {
        return  browser.sleep(25).then(function () {
                participatingSite.selectAddPSContactType('Site Investigator');
        });
    });

    this.Then(/^the Contact Name gets populated with the Site Principal Investigator name$/, function () {
        return  browser.sleep(25).then(function () {
            principalInvestigator.then(function (sitePI) {
                participatingSite.getVerifyPSContactName(sitePI);
            });
        });
    });

    this.Then(/^the email address will be populated$/, function () {
        return  browser.sleep(25).then(function () {
            participatingSite.addPSContactType.get(0).isSelected().then(function (optionSitePI) {
                if (optionSitePI) {
                    storePersonEmail.then(function (email) {
                        participatingSite.getVerifyPSContactEmailAddress(email);
                    });
                }
            });
            participatingSite.addPSContactType.get(1).isSelected().then(function (optionPerson) {
                if (optionPerson) {
                    participatingSite.getVerifyPSContactEmailAddress('PS@Person.com');
                }
            });
        });
    });

    this.Then(/^Phone Number and Extension will be populated$/, function () {
        return  browser.sleep(25).then(function () {
            participatingSite.addPSContactType.get(0).isSelected().then(function (optionSitePI) {
                if (optionSitePI) {
                    storePersonPhone.then(function (phone) {
                        participatingSite.getVerifyPSContactPhone(phone);
                    });
                    storePersonPhoneExtension.then(function (phoneExt) {
                        participatingSite.getVerifyPSContactPhoneExtension(phoneExt);
                    });
                }
            });
            participatingSite.addPSContactType.get(1).isSelected().then(function (optionPerson) {
                if (optionPerson) {
                    participatingSite.getVerifyPSContactPhone('(240) 276-5666');
                    participatingSite.getVerifyPSContactPhoneExtension('009');
                }
            });
        });
    });

    this.Then(/^only the information type can be edited$/, function (table) {
        return  browser.sleep(25).then(function () {
            var PSEditableFieldTableSitePI = table.raw();
            for (var i = 0; i < PSEditableFieldTableSitePI.length; i++) {
                if (PSEditableFieldTableSitePI[i].toString() === 'Contact Email Address') {
                    participatingSite.setAddPSContactEmailAddress('singh@updPS.com');
                } else if (PSEditableFieldTableSitePI[i].toString() === 'Contact Phone Number-Extension') {
                    participatingSite.setAddPSContactPhone('222-678-6754');
                    participatingSite.setAddPSContactPhoneExtension('007');
                } else{
                    assert.fail(0, 1, 'No Step defined for given PS field --> ' + PSEditableFieldTableSitePI[i].toString() + ' <-- Please add a step for it.');
                }
            }
            participatingSite.clickAddPSSaveButton();
            principalInvestigator.then(function (sitePI) {
                var currentDate = moment().format('DD-MMM-YYYY');
                projectFunctionsRegistry.verifySingleParticipatingSiteFromGrid(userTableDBOrgID, 0, userTableDBOrgID, userTableDBOrgName,sitePI, localTrialIDOrig, programCodeOrig, 'In Review', currentDate, sitePI, 'singh@updPS.com', phoneFormat.formatLocal('US', '222-678-6754') + ' x007');
            });
        });
    });

    this.When(/^the contact type selected is Person$/, function () {
        return  browser.sleep(25).then(function () {
            participatingSite.selectAddPSContactType('Person');
            dbConnect.dbConnAddPersonWithOrg('ctrpcurator', 'CTRP', 'Pfx', 'Sfx', 'PS@Person.com', '(240) 276-5666', 'Active', 'personCCPS' + moment().format('MMMDoYY'), 'M', 'PSJerry', '009', 'Complete', 'orgPersonCCPS' + moment().format('MMMDoYY'), 'Shady Grove',
                'Medical Center', 'Rockville', 'Maryland', '29087', 'United States', 'orgPersonPS@d.com', '(601) 452-6744', '01', 'Complete', 'Active', getDBConnection);
        });
    });

    this.Then(/^I can select a person by conducting a Person Search$/, function () {
        return  browser.sleep(25).then(function () {
                addTrial.clickAddTrialPersonSearchModel(1);
                searchOrg.clickExactSearch('true');
                searchPeople.setPersonFirstName(personDBFirstName);
                searchPeople.setPersonOrgAffiliation(orgDBName);
                searchPeople.clickSearch();
                searchOrg.selectOrgModelItem();
                searchOrg.clickOrgModelConfirm();
        });
    });

    this.Then(/^Contact Name will be selected$/, function () {
        return  browser.sleep(25).then(function () {
    participatingSite.getVerifyPSContactName('PSJerry, ' + personDBFirstName);
        });
    });

    this.Then(/^the populated parameters can be edited$/, function () {
        return  browser.sleep(25).then(function () {
            participatingSite.setAddPSContactEmailAddress('emlUpd22@Person.com');
            participatingSite.setAddPSContactPhone('(601) 452-6799');
            participatingSite.setAddPSContactPhoneExtension('08');
            participatingSite.clickAddPSSaveButton();
            var currentDate = moment().format('DD-MMM-YYYY');
            principalInvestigator.then(function (sitePI) {
                projectFunctionsRegistry.verifySingleParticipatingSiteFromGrid(userTableDBOrgID, 0, userTableDBOrgID, userTableDBOrgName, sitePI, localTrialIDOrig, programCodeOrig, 'In Review', currentDate, 'PSJerry, ' + personDBFirstName, 'emlUpd22@Person.com', '(601) 452-6799' + ' x08');
            });
            });
    });

    this.When(/^the contact type selected is General$/, function () {
        return  browser.sleep(25).then(function () {
            participatingSite.selectAddPSContactType('Person');
            participatingSite.selectAddPSContactType('General');
        });
    });

    this.Then(/^I must enter a contact name information$/, function () {
        return  browser.sleep(25).then(function () {
participatingSite.setAddPSContactName('Rami Jr. Neil');
        });
    });

    this.Then(/^I must enter a contact Email Address$/, function () {
        return  browser.sleep(25).then(function () {
            participatingSite.setAddPSContactEmailAddress('emlUpd@Genral.com');

        });
    });

    this.Then(/^I must enter a Phone Number and Extension$/, function () {
        return  browser.sleep(25).then(function () {
            participatingSite.setAddPSContactPhone('(999) 452-6799');
            participatingSite.setAddPSContactPhoneExtension('091');
        });
    });

    this.Then(/^the entered parameters can be edited$/, function () {
        return  browser.sleep(25).then(function () {
            participatingSite.clickAddPSSaveButton();
            var currentDate = moment().format('DD-MMM-YYYY');
            principalInvestigator.then(function (sitePI) {
                projectFunctionsRegistry.verifySingleParticipatingSiteFromGrid(userTableDBOrgID, 0, userTableDBOrgID, userTableDBOrgName, sitePI, localTrialIDOrig, programCodeOrig, 'In Review', currentDate, 'Rami Jr. Neil', 'emlUpd@Genral.com', '(999) 452-6799' + ' x091');
            });
        });
    });


    this.Given(/^I am on the Trial Update screen$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createTrialForTrialUpdate();
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                nciIDNT.then(function (trialNciIDNT) {
                    menuItem.clickPeople();
                    menuItem.clickListPeople();
                    principalInvestigator.then(function (PIName) {
                        var PIFirstName = PIName.replace(/.*,/, '').trim();
                        console.log('PI First Name: ' + PIFirstName);
                        searchPeople.setPersonFirstName(PIFirstName);
                        searchPeople.clickSearch();
                        element(by.linkText(PIFirstName)).click();
                        storePersonEmail = addPeople.addPersonEmail.getAttribute('value');
                        storePersonPhone = addPeople.addPersonPhone.getAttribute('value');
                        storePersonPhoneExtension = addPeople.addPersonPhoneExtension.getAttribute('value');
                        addPeople.addPersonSourceId.getText().then(function (PISrcID) {
                            dbConnect.dbConnAddParticipatingSiteGeneralType(trialNciIDNT, 'ctrptrialsubmitter', localTrialIDOrig, programCodeOrig, contactNameOrig, contactPhoneOrig, contactEmailOrig, contactPhoneExtensionOrig, PISrcID, getDBConnection);
                        });
                    });
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                        trialMenuItem.clickTrials();
                        trialMenuItem.clickListSearchTrialLink();
                        searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                        searchTrial.clickMyTrials();
                        expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', 'Verify Trial is present in Search Result for Update');
                        login.clickWriteMode('On');
                        searchTrial.clickSearchTrialActionButton();
                        searchTrial.clickSearchTrialsUpdateButton();
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 40).then(function () {

                            storeOtherIDBeforeReset = addTrial.addTrialVerifyOtherTrialIdentifierExist.isPresent().then(function(presentState){
                                if(presentState){
                                // return   addTrial.addTrialVerifyOtherTrialIdentifierExist.isDisplayed().then(function(displayedState){
                                  //      if(displayedState){
                                            return addTrial.addTrialVerifyOtherTrialIdentifier.getText().then(function(otherID) {
                                                console.log('Other Identifier : ' + otherID);
                                                return otherID;
                                            });
                                    //    }
                                    //});
                                } else {
                                    console.log('Other ID does not exist.');
                                    return Q.when('');
                                }
                            });
                            storeNCIGrantOptionBeforeReset = addTrial.addTrialFundedByNCIOption.isSelected();
                            storeNCIGrantTblBeforeReset = addTrial.addTrialVerifyGrantTableExist.isPresent().then(function(presentState){
                                if(presentState){
                                //    addTrial.addTrialVerifyGrantTableExist.isDisplayed().then(function(displayedState){
                                    //    if(displayedState){
                                            return addTrial.addTrialVerifyGrantTable.getText().then(function(otherID) {
                                                console.log('Grant Table : ' + otherID);
                                                return otherID;
                                            });
                                      //  }
                                   // });
                                } else {
                                    console.log('Grant Tbl does not exist.');
                                    return Q.when('');
                                }
                            });
                            storeTrialStatusBeforeReset = addTrial.addTrialAddStatusTable.getText();
                            storeTrialStartDateBeforeReset = addTrial.addTrialStartDate.getAttribute('value');
                            storeTrialStartDateOptionBeforeReset = addTrial.addTrialStartDateOption.isSelected();
                            storeTrialPrimaryCompletionDateBeforeReset = addTrial.addTrialPrimaryCompletionDate.getAttribute('value');
                            storeTrialPrimaryCompletionDateOptionBeforeReset = addTrial.addTrialPrimaryCompletionDateOption.isSelected();
                            storeTrialCompletionDateBeforeReset = addTrial.addTrialCompletionDate.getAttribute('value');
                            storeTrialCompletionDateOptionBeforeReset = addTrial.addTrialCompletionDateOption.isSelected();
                            storeTrialDocumentsBeforeReset = addTrial.addTrialVerifyAddedDocs.getText();
                            storePSTblBeforeReset = addTrial.addTrialPsticipatingSitesTableExist.isPresent().then(function(presentState){
                                if(presentState){
                                //    addTrial.addTrialPsticipatingSitesTableExist.isDisplayed().then(function(displayedState){
                                    //    if(displayedState){
                                            return addTrial.addTrialPsticipatingSitesTable.getText().then(function(PSTbl) {
                                                console.log('PS Table : ' + PSTbl);
                                                return PSTbl;
                                            });
                                      //  }
                                   // });
                                } else {
                                    console.log('Participating Site Tbl does not exist.');
                                    return Q.when('');
                                }
                            });
                        });
                    });
                });
                });
            });
        });


    this.When(/^I update fields on the Trial Update screen$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'ClinicalTrials.gov Identifier')).click();
            addTrial.setAddTrialProtocolID('NCT12349876');
            addTrial.clickAddTrialAddProtocolButton();
            addTrial.selectAddTrialFundedByNCIOption('No');
            addTrial.selectAddTrialFundedByNCIOption('Yes');
            addTrial.addTrialVerifyGrantTableExist.isPresent().then(function (present) {
                if (present) {
                    addTrial.addTrialRemoveGrantValues.click();
                }
            });
            addTrial.selectAddTrialFundingMechanism('R01');
            addTrial.selectAddTrialInstituteCode('CA');
            addTrial.setAddTrialSerialNumber('142587');
            addTrial.addTrialSerialNumberSelect.click();
            addTrial.selectAddTrialNCIDivisionProgramCode('CCR');
            addTrial.clickAddTrialAddGrantInfoButton();
            addTrial.clickAddTrialDateField(0);
            addTrial.clickAddTrialDateToday();
            addTrial.selectAddTrialStatus('Approved');
            addTrial.setAddTrialStatusComment('Upd Reset');
            addTrial.clickAddTrialAddStatusButton();
            addTrial.clickAddTrialDateField(1);
            addTrial.clickAddTrialDateToday();
            addTrial.selectAddTrialStartDateOption('1');
            addTrial.clickAddTrialDateField(2);
            addTrial.clickAddTrialDateToday();
            addTrial.selectAddTrialPrimaryCompletionDateOption('1');
            addTrial.clickAddTrialDateField(3);
            addTrial.clickAddTrialDateToday();
            addTrial.selectAddTrialCompletionDateOption('0');
            trialDoc.trialRelatedFileUpload('reg', '5', OtherXlsbFileUpd);
            addTrial.setAddTrialOtherDocsDescription(0, DescriptionFirstDoc);
            projectFunctionsRegistry.editParticipatingSiteFromGrid(userTableDBOrgID, 0);
            participatingSite.setAddPSContactEmailAddress('eReset@Genral.com');
            participatingSite.setAddPSContactPhone('(777) 666-4242');
            participatingSite.setAddPSContactPhoneExtension('77');
            participatingSite.clickAddPSSaveButton();
        });
    });

    this.When(/^I click on the reset button$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialResetButton();
        });
    });

    this.Then(/^all fields updated will be cancelled$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.addTrialVerifyOtherTrialIdentifierExist.isPresent().then(function (presentState) {
                if (presentState) {
                    addTrial.addTrialVerifyOtherTrialIdentifierExist.isDisplayed().then(function (displayedState) {
                        if (displayedState) {
                            storeOtherIDBeforeReset.then(function (value) {
                                console.log('value of Other ID ******** '+ value);
                                expect(addTrial.addTrialVerifyOtherTrialIdentifier.getText()).to.eventually.eql(value,'Verification of Other ID after Reset');
                            });
                        }
                    });
                } else {
                    console.log('Other ID does not exist.');
                }
            });
            storeNCIGrantOptionBeforeReset.then(function (value) {
                expect(addTrial.addTrialFundedByNCIOption.isSelected()).to.eventually.eql(value,'Verification of Grant option after Reset');
            });
            addTrial.addTrialVerifyGrantTableExist.isPresent().then(function (presentState) {
                if (presentState) {
                    addTrial.addTrialVerifyGrantTableExist.isDisplayed().then(function (displayedState) {
                        if (displayedState) {
                            storeNCIGrantTblBeforeReset.then(function (value) {
                                expect(addTrial.addTrialVerifyGrantTable.getText()).to.eventually.eql(value, 'Verification of Grant Tbl after Reset');
                            });
                        }
                    });
                } else {
                    console.log('Grant Tbl does not exist.');
                }
            });
            storeTrialStatusBeforeReset.then(function (value) {
                expect(addTrial.addTrialAddStatusTable.getText()).to.eventually.eql(value, 'Verification of Trial Status after Reset');
            });
            storeTrialStartDateBeforeReset.then(function (value) {
                expect(addTrial.addTrialStartDate.getAttribute('value')).to.eventually.eql(value, 'Verification of Trial Start Date after Reset');
            });
            storeTrialStartDateOptionBeforeReset.then(function (value) {
                expect(addTrial.addTrialStartDateOption.isSelected()).to.eventually.eql(value, 'Verification of Trial Start Date option after Reset');
            });
            storeTrialPrimaryCompletionDateBeforeReset.then(function (value) {
                expect(addTrial.addTrialPrimaryCompletionDate.getAttribute('value')).to.eventually.eql(value, 'Verification of Primary Completion Date after Reset');
            });
            storeTrialPrimaryCompletionDateOptionBeforeReset.then(function (value) {
                expect(addTrial.addTrialPrimaryCompletionDateOption.isSelected()).to.eventually.eql(value, 'Verification of Primary Completion Date option after Reset');
            });
            storeTrialCompletionDateBeforeReset.then(function (value) {
                expect(addTrial.addTrialCompletionDate.getAttribute('value')).to.eventually.eql(value, 'Verification of Completion Date after Reset');
            });
            storeTrialCompletionDateOptionBeforeReset.then(function (value) {
                expect(addTrial.addTrialCompletionDateOption.isSelected()).to.eventually.eql(value, 'Verification of Completion Date option after Reset');
            });
            storeTrialDocumentsBeforeReset.then(function (value) {
                expect(addTrial.addTrialVerifyAddedDocs.getText()).to.eventually.eql(value, 'Verification of Trial Documents after Reset');
            });
            addTrial.addTrialPsticipatingSitesTableExist.isPresent().then(function (presentState) {
                if (presentState) {
                    addTrial.addTrialPsticipatingSitesTableExist.isDisplayed().then(function (displayedState) {
                        if (displayedState) {
                            storePSTblBeforeReset.then(function (value) {
                                expect(addTrial.addTrialPsticipatingSitesTable.getText()).to.eventually.eql(value, 'Verification of PS after Reset');
                            });
                        }
                    });
                }
            });
        });
    });

    this.Then(/^the new changes will not be saved$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            browser.wait(function () {
                return addTrial.viewTrialNCIID.isPresent().then(function (state) {
                    if (state === true) {
                        return addTrial.viewTrialNCIID.isDisplayed().then(function (state2) {
                            return state2 === true;
                        });
                    } else {
                        return false;
                    }
                });
            }, 10000, "NCI ID on View Trial page is not displayed after Submit");
            addTrial.viewTrialOtherIdentifierValuePresent.isPresent().then(function (state) {
                if (state) {
                    otherIDs.then(function (value) {
                        expect(addTrial.viewTrialOtherIdentifierAllValues.getText()).to.eventually.eql(value, 'Verification of Other ID in View Page after Reset');
                    });
                } else {
                    console.log('Trial Other IDs does not exist in Page.');
                }
            });
            addTrial.viewTrialVerifyGrantTableExist.isPresent().then(function (state) {
                if (state) {
                    grantTbl.then(function (value) {
                        expect(addTrial.viewTrialVerifyGrantTable.getText()).to.eventually.eql(value, 'Verification of Grant Table in View Page after Reset');
                    });
                } else {
                    console.log('Trial Grant does not exist in Page.');
                }
            });
            trialStatus.then(function (value) {
                expect(addTrial.viewTrialStatus.getText()).to.eventually.equal(value, 'Verification of Trial Status in View Page after Reset');
            });
            trialDate.then(function (value) {
                expect(addTrial.viewTrialStatusDate.getText()).to.eventually.equal(value, 'Verification of Trial Status Date in View Page after Reset');
            });
            trialStartDateWithOption.then(function (value) {
                expect(addTrial.viewTrialStartDate.getText()).to.eventually.equal(value, 'Verification of Trial Status Start Date with Option in View Page after Reset');
            });
            trialPrimaryStartDateOption.then(function (value) {
                expect(addTrial.viewTrialPrimaryCompletionDate.getText()).to.eventually.equal(value, 'Verification of Trial Primary Start Date with option in View Page after Reset');
            });
            trialCompletionDateOption.then(function (value) {
                expect(addTrial.viewTrialCompletionDate.getText()).to.eventually.equal(value, 'Verification of Trial Completion Date with option in View Page after Reset');
            });
            documents.then(function (value) {
                expect(addTrial.viewTrialVerifyviewedDocs.getText()).to.eventually.eql(value, 'Verification of Trial Documents in View Page after Reset');
            });
            addTrial.viewTrialPsticipatingSitesTblExist.isPresent().then(function (state) {
                if (state) {
                    participatingSiteTbl.then(function (value) {
                        expect(addTrial.viewTrialPsticipatingSites.getText()).to.eventually.eql(value, 'Verification of PS Table in View Page after Reset');
                    });
                } else {
                    console.log('Trial PS does not exist in Page.');
                }
            });
        });


                });


    this.Given(/^I am the Trial owner$/, function (callback) {
        callback();
    });

    this.Given(/^I have made enabled Trial Updates$/, function (callback) {
        callback();
    });

    this.When(/^I select the review option$/, function (callback) {
        callback();
    });

    this.Then(/^CTRP will check the updated information$/, function (callback) {
        callback();
    });

    this.Then(/^if there are no errors, I can submit the trial with indication of a successful submission$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialDateField(3);
            addTrial.clickAddTrialDateFieldDifferentYear(currentYear.toString(), nextMonth.toString(), '25');
            addTrial.selectAddTrialCompletionDateOption('1');
            addTrial.clickAddTrialReviewButton();
            helper.wait(addTrial.viewTrialNCIID, 'NCI ID element on View Trial Page');
        });
    });

    this.Then(/^the information updates will be registered in CTRP$/, function (callback) {
        callback();
    });


    this.Then(/^the "([^"]*)" will be updated$/, function (arg1) {
        return browser.sleep(25).then(function () {
            nciIDNT.then(function (trialNciIDNT) {
                dbConnect.dbConnVerifyTrialTblSingleItem(trialNciIDNT, 'verification_date', moment().format('YYYY-MM-DD') );
            });
        });
    });

    this.Then(/^an email entitled "([^"]*)" will be sent to the trial owner \(Locate Email list on the shared drive under Functional\/registration as: CTRP System Generated Emails\)$/, function (arg1) {
        return browser.sleep(25).then(function () {
               assert.fail(0,1,'Email of Update does not match with requirement');
            //leadProtocolIDNT.then(function (trialLeadProtocolID) {
            //    nciIDNT.then(function (trialNciIDNT) {
            //        trialOfficialTitleNT.then(function (trialOfficialTitle) {
            //            element(by.linkText('ctrptrialsubmitter')).click();
            //            userProfile.userProfileFirstName.getAttribute('value').then(function (userFirstName) {
            //                userProfile.userProfileLastName.getAttribute('value').then(function (userLastName) {
            //
            //                    userProfile.userProfileEmail.getAttribute('value').then(function (userCurrentEmail) {
            //                        projectFunctionsRegistry.baseEnvironment();
            //                        var emailSubject = initialEmailEnv + emailSubjectUpd + trialNciIDNT + ', ' + trialLeadProtocolID;
            //
            //                        var emailBody = '\<p>' + initialEmailEnv + '\</p><!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />\n' +
            //                            '                            \</head><body><hr> <p><b>Title: </b>' + trialOfficialTitle + '\</p>\n' +
            //                            '                            \<div>\n' +
            //                            '                                \<p><b>NCI Trial ID: </b>' + trialOfficialTitle + '\</p>\n' +
            //                            '                                \<p><b>Lead Organization Trial ID: </b>' + leadProtocolID + '\</p>\n' +
            //                            '                                \<p><b>Lead Organization: </b></p>\n' +
            //                            '                                \<p><b>CTRP-assigned Lead Organization ID: </b></p>\n' +
            //                            '                                \<p><b>Submission Date: </b></p>\n' + moment().format('DD-MMM-YYYY') +
            //                            '                            \</div>\n' +
            //                            '                            \<hr>\n' +
            //                            '                            \<p>Date: ' + moment().format('DD-MMM-YYYY') + '\</p>\n' +
            //                            '                            \ <p><b>Dear ' + userFirstName + ' ' + userLastName + '\ </b>,</p>' +
            //                                // '                            \<p><b>Dear CTRP User</b>,</p>\n' +
            //                            '                            \<p>You have saved a draft of the trial identified above for submission to the NCI Clinical Trials Reporting Program (CTRP).</p>\n\n' +
            //
            //                            '                            \<p><b>NEXT STEPS:</b></p>\n' +
            //                            '                            \<p>To retrieve and complete your submission, use the "Search Saved Drafts" feature on the "Search Trials" page in the CTRP Registration application.</p>\n' +
            //                            '                            \<p>Clinical Trials Reporting Office (CTRO) staff will not access or process your trial until you have completed the submission. </p>\n' +
            //                            '                            \<p><b>Important!</b> You can save your draft for a maximum of 30 days.</p>\n' +
            //                            '                            \<p>If you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov</p>\n' +
            //                            '                            \<p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>\n' +
            //                            '                            \</body></html>';
            //
            //                        browser.driver.wait(function () {
            //                            console.log('wait here');
            //                            return true;
            //                        }, 40).then(function () {
            //                            dbConnect.dbConnectionMailVerification('NCI', trialNciIDNT, userCurrentEmail, emailSubject, emailBody, getDBConnection);
            //                            login.clickWriteMode('On');
            //                            mailID.rows[0].then(function (value) {
            //
            //
            //                                console.log('&&&%&%&% HERE' + value);// mailID.rows[0].to);
            //                            });
            //                            //  expect(mailBodyFromDB).to.equal(emailBody, 'Verification of Email TO')
            //                        });
            //                    });
            //                });
            //            });
            //        });
            //    });
            //});
        });
    });



};