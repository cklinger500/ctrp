/**
 * Created by singhs10 on 7/15/16.
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
var menuItemList = require('../support/PoCommonBar');
var databaseConnection = require('../support/databaseConnection');
var Q = require('q');
var assert = require('assert');
var searchPeoplePage = require('../support/ListOfPeoplePage');
var userProfilePage = require('../support/userProfilePage');
var mailVerificationPage = require('../support/mailVerification');



module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchTrial = new searchTrialPage();
    var commonFunctions = new abstractionCommonMethods();
    var login = new loginPage();
    var userProfile = new userProfilePage();
    var emailVerify = new mailVerificationPage();
    var helper = new helperFunctions();

    var getDBConnection = '';



    this.Given(/^I am logged in to CTRP Registry application with User "([^"]*)" and email id "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function () {
            loggedInUser = arg1;
            emailIDOfUser = arg2;
            commonFunctions.onPrepareLoginTest(arg1);
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
                helper.alertDialog('OK', '');
                element(by.linkText(arg1)).click();
                helper.alertDialog('OK', '');
                userProfile.userProfileEmailNotifications.get(0).isSelected().then(function (emailOption) {
                    userProfile.userProfileEmail.getAttribute('value').then(function (userCurrentEmail) {
                        console.log('Current email' + userCurrentEmail);
                        console.log('Provided email' + emailIDOfUser);

                        if (userCurrentEmail !== emailIDOfUser || !emailOption) {
                            userProfile.setAddUserEmail(emailIDOfUser);


                            userProfile.userProfilePhone.getAttribute('value').then(function (userCurrentPhone) {
                                console.log('user phone' + userCurrentPhone);
                                if (userCurrentPhone === '') {
                                    userProfile.setAddUserPhone('212-444-5656');
                                }
                            });
                            userProfile.selectAddUserEmailNotifications('yes');
                            userProfile.clickAddUserProfileSaveButton();
                        }
                        browser.sleep(5000);
                    });
                });
            });
            // browser.sleep(25).then(callback);
        });
    });


    this.Given(/^I am logged in to CTRP Registry application with User "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            loggedInUser = arg1;
            commonFunctions.onPrepareLoginTest(arg1);
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
            });
            //   browser.sleep(25).then(callback);
        });
    });


    this.Given(/^I want to create a Trial with Study Source (.*)$/, function (trialType, callback) {
        trialType1 = trialType;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Lead Organization Trial Identifier: (.*), Other Clinical Trial ID:  (.*), Other Obsolete Clinical Trial ID: (.*), Other Identifier: (.*)$/, function (leadOrgIdentifier, otherClinicalTrialID, otherObsoleteClinicalTrialID, otherIdentifier, callback) {
        leadOrgIdentifier1 = leadOrgIdentifier + moment().format('hmm');
        otherClinicalTrialID1 = otherClinicalTrialID;
        otherObsoleteClinicalTrialID1 = otherObsoleteClinicalTrialID;
        otherIdentifier1 = otherIdentifier;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Official Title: (.*), Phase: (.*), Pilot: (.*), Research Category: (.*), Primary Purpose: (.*), Secondary Purpose (.*), Accrual Disease Terminology: (.*)$/, function (officialTitle, phase, pilotOption, researchCategory, primaryPurpose, secondaryPurpose, accrualDisease, callback) {
        officialTitle1 = officialTitle;
        phase1 = phase;
        pilotOption1 = pilotOption;
        researchCategory1 = researchCategory;
        primaryPurpose1 = primaryPurpose;
        secondaryPurpose1 = secondaryPurpose;
        accrualDisease1 = accrualDisease;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Lead Organization: (.*) Principal Investigator: (.*) Sponsor: (.*) Data Table Funding Source: (.*) Program code: (.*)$/, function (leadOrg, principalInv, sponsorOrg, dataTableOrg, programCode, callback) {
        leadOrg1 = leadOrg;
        console.log('LEad org: ' + leadOrg1);
        console.log('LEad org: ' + leadOrg);
        principalInv1 = principalInv;
        console.log('Principal Investigator: ' + principalInv1);
        console.log('Principal Investigator: ' + principalInv);
        sponsorOrg1 = sponsorOrg;
        console.log('sponsor Org : ' + sponsorOrg1);
        console.log('sponsor Org : ' + sponsorOrg);
        dataTableOrg1 = dataTableOrg;
        console.log('Data Table Org : ' + dataTableOrg1);
        console.log('Data Table Org : ' + dataTableOrg);
        programCode1 = programCode;
        browser.sleep(25).then(callback);
    });

    this.Given(/^NCI Grant: (.*), Funding Mechanism: (.*), Institute Code: (.*), Serial Number: (.*), NCI Division: (.*)$/, function (grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, callback) {
        grantOption1 = grantOption;
        grantFundingMechanism1 = grantFundingMechanism;
        grantInstituteCode1 = grantInstituteCode;
        grantSerialNumber1 = grantSerialNumber;
        grantNCIDivisionCode1 = grantNCIDivisionCode;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Trial status: (.*), Comment: (.*), Why Study Stopped: (.*)$/, function (trialStatus, trialComment, trialWhyStudyStopped, callback) {
        trialStatus1 = trialStatus;
        trialComment1 = trialComment;
        trialWhyStudyStopped1 = trialWhyStudyStopped;
        browser.sleep(25).then(callback);
    });

    this.Given(/^IND IDE info: (.*),IND IDE Type: (.*),IND IDE Number: (.*), IND IDE Grantor: (.*), IND IDE Holder: (.*), IND IDE Institution: (.*)$/, function (INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, callback) {
        INDIDEOption1 = INDIDEOption;
        INDIDEType1 = INDIDEType;
        INDIDENumber1 = INDIDENumber;
        INDIDEGrantor1 = INDIDEGrantor;
        INDIDEHolder1 = INDIDEHolder;
        INDIDEInstitution1 = INDIDEInstitution;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Responsible party: (.*), Trial Oversight Country: (.*), Trial Oversight Organization: (.*), FDA Regulated Indicator: (.*), section Indicator: (.*), data Monitoring Indicator: (.*)$/, function (responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator, callback) {
        responsibleParty1 = responsibleParty;
        console.log('responsibleParty');
        console.log(responsibleParty);
        trialOversightCountry1 = trialOversightCountry;
        console.log('trialOversightCountry');
        console.log(trialOversightCountry);
        trialOversightOrg1 = trialOversightOrg;
        FDARegulatedIndicator1 = FDARegulatedIndicator;
        console.log('FDARegulatedIndicator');
        console.log(FDARegulatedIndicator);
        section801Indicator1 = section801Indicator;
        console.log('section801Indicator');
        console.log(section801Indicator);
        dataMonitoringIndicator1 = dataMonitoringIndicator;
        console.log('dataMonitoringIndicator');
        console.log(dataMonitoringIndicator);
        browser.sleep(25).then(callback);
    });

    this.Given(/^Protocol Document: (.*), IRB Approval: (.*), List of Participating Sites: (.*), Informed Consent Document: (.*), Other: (.*)$/, function (protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, callback) {
        protocolDoc1 = protocolDoc;
        IRBDoc1 = IRBDoc;
        participatingSiteDoc1 = participatingSiteDoc;
        informedConsentDoc1 = informedConsentDoc;
        otherDoc1 = otherDoc;
        browser.sleep(25).then(callback);
    });

    this.Then(/^I should be either able to Submit Trial OR Save as Draft (.*)$/, function (saveDraftOrSubmitTrial) {
        return browser.sleep(25).then(function () {
            saveDraftOrSubmitTrial1 = saveDraftOrSubmitTrial;
            projectFunctionsRegistry.createNewTrial(loggedInUser, trialType1, leadOrgIdentifier1, otherClinicalTrialID1, otherObsoleteClinicalTrialID1, otherIdentifier1, officialTitle1, phase1, pilotOption1, researchCategory1, primaryPurpose1, secondaryPurpose1, accrualDisease1, leadOrg1, principalInv1, sponsorOrg1, dataTableOrg1, programCode1, grantOption1, grantFundingMechanism1, grantInstituteCode1, grantSerialNumber1, grantNCIDivisionCode1, trialStatus1, trialComment1, trialWhyStudyStopped1, INDIDEOption1, INDIDEType1, INDIDENumber1, INDIDEGrantor1, INDIDEHolder1, INDIDEInstitution1, responsibleParty1, trialOversightCountry1, trialOversightOrg1, FDARegulatedIndicator1, section801Indicator1, dataMonitoringIndicator1, protocolDoc1, IRBDoc1, participatingSiteDoc1, informedConsentDoc1, otherDoc1, saveDraftOrSubmitTrial1);
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I go to Search Trial page$/, function () {
        return browser.sleep(25).then(function () {
            //browser.get('ui/#/main/sign_in');
            //commonFunctions.onPrepareLoginTest(loggedInUser);
            //browser.driver.wait(function () {
            //    console.log('wait here');
            //    return true;
            //}, 40).then(function () {
            //    trialMenuItem.clickHomeSearchTrial();
            //    login.clickWriteMode('On');
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            //  });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I should be able to search with the created Trial Lead Org Identifier$/, function () {
        return browser.sleep(25).then(function () {
            searchTrial.setSearchTrialProtocolID(storeLeadProtocolId);
            searchTrial.clickSearchTrialSearchButton();
            if (saveDraftOrSubmitTrial1.toUpperCase() === 'SAVEDRAFT') {
                searchTrial.clickSearchTrialSavedDrafts();
            }
            if (saveDraftOrSubmitTrial1.toUpperCase() === 'SUBMITTRIAL') {
                searchTrial.clickSearchTrialAllTrials();
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I click on the Trial from Search page$/, function () {
        return browser.sleep(25).then(function () {
            element(by.linkText(storeLeadProtocolId)).click();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^It should display Trial with above Trial parameters$/, function () {
        return browser.sleep(25).then(function () {
            if (leadOrgIdentifier1 !== '') {
                addTrial.getViewTrialLeadProtocolIdentifier(storeLeadProtocolId);
            }
            if (otherClinicalTrialID1 !== '') {
                projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierViewPg('ClinicalTrials.gov', otherClinicalTrialID1);
            }
            if (otherObsoleteClinicalTrialID1 !== '') {
                projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierViewPg('Obsolete ClinicalTrials.gov', otherObsoleteClinicalTrialID1);
            }
            if (otherIdentifier1 !== '') {
                projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierViewPg('Other', otherIdentifier1);
            }
            if (officialTitle1 !== '') {
                addTrial.getViewTrialOfficialTitle(officialTitle1 + ' ' + moment().format('MMMDoYY'));
            }
            if (phase1 !== '') {
                addTrial.getViewTrialPhase(phase1);
            }
            if (pilotOption1 !== '') {
                addTrial.getViewTrialPilotOption(pilotOption1);
            }
            if (researchCategory1 !== '') {
                addTrial.getViewTrialResearchCategory(researchCategory1);

            }
            if (primaryPurpose1 !== '') {
                addTrial.getViewTrialPrimaryPurpose(primaryPurpose1);
            }
            if (secondaryPurpose1 !== '') {
                addTrial.getViewAddTrialSecondaryPurpose(secondaryPurpose1);
            }
            if (accrualDisease1 !== '') {
                addTrial.getViewTrialAccrualDiseaseTerminology(accrualDisease1);

            }
            if (leadOrg1 !== '') {
                storeLeadOrg.then(function (value) {
                    addTrial.getViewTrialLeadOrganization(value);
                });
            }
            if (principalInv1 !== '') {
                storePI.then(function (value) {
                    addTrial.getViewTrialPrincipalInvestigator('lName, ' + value);
                });
            }
            if (sponsorOrg1 !== '') {
                storeSponsorOrg.then(function (value) {
                    addTrial.getViewTrialSponsor(value);
                });
            }
            if (dataTableOrg1 !== '') {
                storeFundingSrcOrg.then(function (value) {
                    addTrial.getViewTrialFundingSource(value);
                });
            }
            if (programCode1 !== '') {
                addTrial.getViewTrialProgramCode(programCode1);
            }
            if (grantOption1 !== '') {

            }
            if (grantFundingMechanism1 !== '') {
                var grantFundingTble = grantFundingMechanism1 + ' ' + grantInstituteCode1 + ' ' + grantSerialNumber1 + ' ' + grantNCIDivisionCode1;
                addTrial.getViewTrialGrantTable(grantFundingTble.split());
            }
            if (trialStatus1 !== '') {
                addTrial.getViewTrialStatusDate(moment().format('DD-MMM-YYYY'));
                addTrial.getViewTrialStatus(trialStatus1);
            }
            addTrial.getViewTrialStartDate(moment().date('10').subtract(1, 'months').format('DD-MMM-YYYY') + 'Actual');
            addTrial.getViewTrialPrimaryCompletionDate(moment().format('DD-MMM-YYYY') + 'Actual');
            addTrial.getViewTrialCompletionDate(moment().date('10').add(1, 'months').format('DD-MMM-YYYY') + 'Anticipated');
            if (INDIDEType1 !== '') {
                if (INDIDEInstitution1 === '') {
                    var IND_IDETble = INDIDEType1 + ' ' + INDIDENumber1 + ' ' + INDIDEGrantor1 + ' ' + INDIDEHolder1;
                    addTrial.getViewTrialINDIDETable(IND_IDETble.split());
                }
                else {
                    IND_IDETble = INDIDEType1 + ' ' + INDIDENumber1 + ' ' + INDIDEGrantor1 + ' ' + INDIDEHolder1 + ' ' + INDIDEInstitution1;
                    addTrial.getViewTrialINDIDETable(IND_IDETble.split());
                }
            }
            if (responsibleParty1 !== '') {
                addTrial.getViewTrialResponsibleParty(responsibleParty1);
            }
            if (trialOversightCountry1 !== '') {
                var trialOversightCountryTbl = trialOversightCountry1 + ' ' + trialOversightOrg1;
                addTrial.getViewTrialOversightAuthority(trialOversightCountryTbl.split());
            }
            if (FDARegulatedIndicator1 !== '') {
                addTrial.getViewTrialFDARegulatedInterventionIndicator(FDARegulatedIndicator1);
            }
            if (section801Indicator1 !== '') {
                addTrial.getViewTrialSection801Indicator(section801Indicator1);
            }
            if (dataMonitoringIndicator1 !== '') {
                addTrial.getViewTrialDataMonitoringCommitteeAppointedIndicator(dataMonitoringIndicator1);
            }
            if (protocolDoc1 !== '') {
                expect(addTrial.viewTrialVerifyviewedDocs.getText()).to.eventually.include(protocolDoc1);

            }
            if (IRBDoc1 !== '') {
                expect(addTrial.viewTrialVerifyviewedDocs.getText()).to.eventually.include(IRBDoc1);
            }
            if (participatingSiteDoc1 !== '') {
                expect(addTrial.viewTrialVerifyviewedDocs.getText()).to.eventually.include(participatingSiteDoc1);
            }
            if (informedConsentDoc1 !== '') {
                expect(addTrial.viewTrialVerifyviewedDocs.getText()).to.eventually.include(informedConsentDoc1);
            }
            if (otherDoc1 !== '') {
                expect(addTrial.viewTrialVerifyviewedDocs.getText()).to.eventually.include(otherDoc1);
            }
            //  browser.sleep(25).then(callback);
        });
    });
    //
    //beforeEach(function () {
    //    browser.get("/#login");
    //    browser.waitForAngular();
    //});

    this.Given(/^verify all the emails generated above$/, function (callback) {
        // make sure you include in options:
        //   fetchUnreadOnStart: true,
        var count = 0;

        mailListener1.on("mail", function(mail, seqno, attributes) {
            var mailuid = attributes.uid,
                toMailbox = '[Gmail]/All Mail',
                i = ++count;

            if (i > 20) {
                mailListener1.stop(); // start listening
                return;
            }

            console.log('email parsed', {
                i: i,
                subject: mail.subject,
                seqno: seqno,
                uid: attributes.uid,
                attributes: attributes
            });

            console.log('attempting to mark msg read/seen');
            mailListener1.imap.addFlags(mailuid, '\\Seen', function (err) {
                if (err) {
                    console.log('error marking message read/SEEN');
                    return;
                }

                console.log('moving ' + (seqno || '?') + ' to ' + toMailbox);
                mailListener1.imap.move(mailuid, toMailbox, function (err) {
                    if (err) {
                        console.log('error moving message');
                        return;
                    }
                    console.log('moved ' + (seqno || '?'), mail.subject);
                });
            });
        });



 //   mailListener1.start(); // start listening

// When testing this script with GMail in US it took about
// 8 seconds to get unread email list, another 40 seconds
// to archive those 20 messages (move to All Mail).
//    setTimeout(function () {
//        mailListener1.stop(); // start listening
//    }, 60*1000);
        //browser.controlFlow().await(emailVerify.getLastEmail1()).then(function (email) {
        //    expect(email.subject).toEqual("New Registration Code");
        //    expect(email.headers.to).toEqual("myemail@email.com");
        //
        //    // extract registration code from the email message
        //    //var pattern = /Registration code is: (\w+)/g;
        //    //var regCode = pattern.exec(email.text)[1];
        //
        //    console.log(email.subject);
        //});

            //if(emailIDOfUser === 'ctrptrialsubmitter@gmail.com'){
        //    nciID.then(function(nciIDValue){
        //        leadProtocolID.then(function(leadProtocolIDValue){
        //            emailVerify.gmailMailVerification(gmaillink, gmailID, 'NCI CTRP: Trial RECORD CREATED for ' + nciIDValue + ',' + leadProtocolIDValue, '', callback);
        //        });
        //    });
        //
        //}
        //else {
        //    console.log('Different Email Id is provided so Verify the email manually');
        //}
        browser.sleep(25).then(callback);
    });//();
    //}//);

};