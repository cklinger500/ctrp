/**
 * Created by singhs10 on 4/15/16.
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
var mailVerificationPage = require('../support/mailVerification');
var searchTrialPage = require('../support/searchTrialPage');
var databaseConnection = require('../support/databaseConnection');
var userProfilePage = require('../support/userProfilePage');
var loginPage = require('../support/LoginPage');
var assert = require('assert');



module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();
    var emailVerify = new mailVerificationPage();
    var searchTrial = new searchTrialPage();
    var dbConnect = new databaseConnection();
    var userProfile = new userProfilePage();
    var login = new loginPage();

    var leadOrgTrialIdentifier = 'SSDftLdOg';
    var grantOption = 'yes';
    var grantFundMcm = 'R01';
    var grantInstitute = 'CA';
    var grantSerialNumber = '129687';
    var grantDivision = 'OD';
    var secondaryPurpose = 'Other';
    var secondaryPurposeOtherDescription = 'Secondary Purpose other description';
    var otherIdentifierType = 'Other Identifier';
    var otherIdentifierID = 'SS1234';
    var otherDocument = 'testSampleXlsmFile.xlsm';

    /**** Email Verification ****/
    var emailSubject = ' NCI CTRP: Trial RECORD SAVED as DRAFT for ';

    var getDBConnection = '';


    this.Given(/^I have entered the Lead Organization Trial ID$/, function () {
        return browser.sleep(25).then(function () {
            /**** Trial Identifiers ****/
            addTrial.setAddTrialLeadProtocolIdentifier(leadOrgTrialIdentifier + typeOfTrial.substring(0, 3) + ' ' + moment().format('MMMDoYY h m'));
            /** Stores the value of Lead Protocol Identifier **/
            storeLeadProtocolId = addTrial.addTrialLeadProtocolIdentifier.getAttribute('value').then(function (value) {
                console.log('This is the Lead Organization Trial Identifier that is added' + value);
                return value;
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have entered some other Trial information$/, function () {
        return browser.sleep(25).then(function () {
            if (grantOption !== '') {
                addTrial.selectAddTrialFundedByNCIOption(grantOption);
            }
            if (grantOption.toUpperCase() !== 'NO' && grantOption !== '1') {
                addTrial.selectAddTrialFundingMechanism(grantFundMcm);
                addTrial.selectAddTrialInstituteCode(grantInstitute);
                addTrial.setAddTrialSerialNumber(grantSerialNumber);
                addTrial.addTrialSerialNumberSelect.click();
                addTrial.selectAddTrialNCIDivisionProgramCode(grantDivision);
                addTrial.clickAddTrialAddGrantInfoButton();
            }
            addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', otherIdentifierType)).click();
            addTrial.setAddTrialProtocolID(otherIdentifierID);
            addTrial.clickAddTrialAddProtocolButton();
            addTrial.selectAddTrialSecondaryPurpose(secondaryPurpose);
            addTrial.setAddTrialSecondaryPurposeOtherDescription(secondaryPurposeOtherDescription);
            trialDoc.trialRelatedFileUpload('reg', '5', otherDocument);
            //  browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have selected Save as Draft$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialSaveDraftButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the CTRP application will save all information that was entered as a draft$/, function () {
        return browser.sleep(25).then(function () {
            storeLeadProtocolId.then(function (value) {
                addTrial.getVerifyAddTrialLeadProtocolIdentifier(value);
            });
            addTrial.getVerifyAddTrialSecondaryPurpose(secondaryPurpose);
            expect(addTrial.addTrialSecondaryPurposeOtherDescription.getAttribute('value')).to.eventually.equal(secondaryPurposeOtherDescription);
            projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier(otherIdentifierType, otherIdentifierID);
            projectFunctionsRegistry.verifyAddTrialGrantInformation(grantFundMcm, grantInstitute, grantSerialNumber, grantDivision);
            addTrial.addTrialVerifyAddedDocs.getText().then(function (value) {
                console.log('Value of Documents For Reg F15 draft:');
                console.log(value);
                expect(value).to.eql([otherDocument], 'Verification of Trial related Docs');
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I will be able to search for saved draft registrations$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            storeLeadProtocolId.then(function (value) {
                searchTrial.setSearchTrialProtocolID(value);
            });
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialSavedDrafts();
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I will be able to complete the registration at a future date$/, function () {
        return browser.sleep(25).then(function () {
            searchTrial.clickSearchTrialActionButton();
            searchTrial.clickSearchTrialCompleteOption();
            storeLeadProtocolId.then(function (value) {
                addTrial.getVerifyAddTrialLeadProtocolIdentifier(value);
            });
            addTrial.getVerifyAddTrialSecondaryPurpose(secondaryPurpose);
            expect(addTrial.addTrialSecondaryPurposeOtherDescription.getAttribute('value')).to.eventually.equal(secondaryPurposeOtherDescription);
            projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier(otherIdentifierType, otherIdentifierID);
            projectFunctionsRegistry.verifyAddTrialGrantInformation(grantFundMcm, grantInstitute, grantSerialNumber, grantDivision);
            addTrial.addTrialVerifyAddedDocs.getText().then(function (value) {
                console.log('Value of Documents For Reg F15 draft:');
                console.log(value);
                expect(value).to.eql([otherDocument], 'Verification of Trial related Docs');
            });

            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^the an email entitled "([^"]*)" will be sent to the user \( Emails list can be found on the share drive under functional\/Registartion: CTRP System Generated Emails\)$/, function (arg1) {
        return browser.sleep(25).then(function () {
            assert.fail(0,1,'Email of Draft does not match with requirement');
         /*   storeLeadProtocolId.then(function (leadProtocolID) {
                element(by.linkText('ctrptrialsubmitter')).click();
                userProfile.userProfileFirstName.getAttribute('value').then(function (userFirstName) {
                    userProfile.userProfileLastName.getAttribute('value').then(function (userLastName) {

                        userProfile.userProfileEmail.getAttribute('value').then(function (userCurrentEmail) {
                            projectFunctionsRegistry.baseEnvironment();
                            emailSubject = initialEmailEnv + emailSubject + leadProtocolID;

                            var emailBody = '\<p>' + initialEmailEnv + '\</p><!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />\n' +
                                '                            \</head><body><hr> <p><b>Title: </b></p>\n' +
                                '                            \<div>\n'+
                                '                                \<p><b>Lead Organization Trial ID: </b>' + leadProtocolID + '\</p>\n' +
                                '                                \<p><b>Lead Organization: </b></p>\n' +
                                '                                \<p><b>CTRP-assigned Lead Organization ID: </b></p>\n' +
                                '                                \<p><b>Submission Date: </b></p>\n' +
                                '                            \</div>\n'+
                                '                            \<hr>\n' +
                                '                            \<p>Date: ' + moment().format('DD-MMM-YYYY') + '\</p>\n' +
                                '                            \ <p><b>Dear '+ userFirstName + ' ' + userLastName + '\ </b>,</p>' +
                               // '                            \<p><b>Dear CTRP User</b>,</p>\n' +
                                '                            \<p>You have saved a draft of the trial identified above for submission to the NCI Clinical Trials Reporting Program (CTRP).</p>\n\n' +

                                '                            \<p><b>NEXT STEPS:</b></p>\n' +
                                '                            \<p>To retrieve and complete your submission, use the "Search Saved Drafts" feature on the "Search Trials" page in the CTRP Registration application.</p>\n' +
                                '                            \<p>Clinical Trials Reporting Office (CTRO) staff will not access or process your trial until you have completed the submission. </p>\n' +
                                '                            \<p><b>Important!</b> You can save your draft for a maximum of 30 days.</p>\n' +
                                '                            \<p>If you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov</p>\n' +
                                '                            \<p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>\n' +
                                '                            \</body></html>';

                            browser.driver.wait(function () {
                                console.log('wait here');
                                return true;
                            }, 40).then(function () {
                                dbConnect.dbConnectionMailVerification('leadprotocolID', leadProtocolID, userCurrentEmail, emailSubject, emailBody,getDBConnection);
                                login.clickWriteMode('On');
                                mailID.rows[0].then(function(value){


                                console.log('&&&%&%&% HERE' + value);// mailID.rows[0].to);
                                });
                              //  expect(mailBodyFromDB).to.equal(emailBody, 'Verification of Email TO')
                            });
                        });
                    });
                });
            });*/
    //    browser.sleep(25).then(callback);
        });
    });


    this.Given(/^I have not entered the Lead Organization Trial ID$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialLeadProtocolIdentifier('');
            //browser.sleep(25).then(callback);
        });
    });


};
