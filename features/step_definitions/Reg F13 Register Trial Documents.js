/**
 * Author: singhs10
 * Date: 12/08/2015
 * Feature: Reg F13 Register Trial Documents
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


module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();

    var testSampleDocFile = 'testSampleDocFile1997_2004v.doc';
    var testSampleDocxFile = 'testSampleDocFile.docx';
    var testSampleDocFile_IRB = 'testSampleDocFile_IRB.docx';
    var testSampleDocmFile = 'testSampleDocmFile.docm';
    var testSampleEXCELFile = 'testSampleEXCELFile.xlsx';
    var testSampleXlsFile = 'testSampleXlsFile.xls';
    var testSampleXlsmFile = 'testSampleXlsmFile.xlsm';
    var testSampleXlsbFile = 'testSampleXlsbFile.xlsb';
    var testSamplePDFFile = 'testSamplePDFFile.pdf';
    var testSampleRichTextFile = 'testSampleRichTextFile.rtf';
    var testSampleTxtFile = 'testSampleTextFile.txt';
    var testSampleCSVFile = 'testSampleCSVFile.csv';
    var testSampleMSGFile = 'testSampleMSGFile.msg';
    var testSampleHtmlFile = 'testSampleHtmlFile.html';
    var testSampleXMLFile = 'testSampleXMLFile.xml';
    var DescriptionFirstDoc = 'Description for first doc';
    var DescriptionSecondDoc = 'Description for second doc';


    /*
     Scenario Outline: #1 I can attach Trial Related Documents to a trial registration
     Given I have selected the option to register a trial <TrialType>
     And I am on the Register Trial Related Documents screen
     When I have selected a file to attach as the Protocol Document
     And I have selected a file to attach as the IRB Approval
     And I have selected a file to attach as the list of Participating Sites
     And I have selected a file to attach as the Informed Consent Document
     And I have selected one or more files to attach as Other file and entered the description of the file
     Then the Register Trial Related Document for the trial registration will not indicate an errors during Trial Review

     Examples:
     |TrialType                |
     |National                 |
     |Externally Peer-Reviewed |
     |Institutional            |
     */

    this.Given(/^I am on the Register Trial Related Documents screen$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.setAddTrialLeadProtocolIdentifier('docSS ' + typeOfTrial.substring(0, 3) + moment().format('MMMDoYY h m'));
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have noted the message$/, function (string) {
        return browser.sleep(25).then(function () {
            addTrial.addTrialDocumentNoteMessage.get(0).getText().then(function (value1) {
                addTrial.addTrialDocumentNoteMessage.get(1).getText().then(function (value2) {
                    var finalString = value1 + '\n' + value2;
                    expect(string).to.equal(finalString, 'Verification of Note Message in Document Section');
                });
            });
        });
    });


    this.When(/^I have selected a file to attach as the Protocol Document$/, function () {
        return browser.sleep(25).then(function () {
            trialDoc.trialRelatedFileUpload('reg', '1', testSampleDocxFile);
            expect(trialDoc.trailFileUploadProtocol.getAttribute('value')).to.eventually.equal(testSampleDocxFile);
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected a file to attach as the IRB Approval$/, function () {
        return browser.sleep(25).then(function () {
            trialDoc.trialRelatedFileUpload('reg', '2', testSampleDocFile_IRB);
            expect(trialDoc.trailFileUploadIRB.getAttribute('value')).to.eventually.equal(testSampleDocFile_IRB);
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected a file to attach as the list of Participating Sites$/, function () {
        return browser.sleep(25).then(function () {
            trialDoc.trialRelatedFileUpload('reg', '3', testSampleEXCELFile);
            expect(trialDoc.trailFileUploadParticipating.getAttribute('value')).to.eventually.equal(testSampleEXCELFile);
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected a file to attach as the Informed Consent Document$/, function () {
        return browser.sleep(25).then(function () {
            trialDoc.trialRelatedFileUpload('reg', '4', testSamplePDFFile);
            expect(trialDoc.trailFileUploadInformed.getAttribute('value')).to.eventually.equal(testSamplePDFFile);
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected one or more files to attach as Other file and entered the description of the file$/, function () {
        return browser.sleep(25).then(function () {
            trialDoc.trialRelatedFileUpload('reg', '5', testSampleRichTextFile);
            addTrial.setAddTrialOtherDocsDescription(0, DescriptionFirstDoc);
            expect(trialDoc.trailFileUploadOther.getAttribute('value')).to.eventually.equal(testSampleRichTextFile);
            addTrial.clickAddTrialAddOtherDocButton();
            trialDoc.trialRelatedFileUpload('reg', '6', testSampleXlsmFile);
            expect(trialDoc.trailFileUploadOtherNext.getAttribute('value')).to.eventually.equal(testSampleXlsmFile);
            addTrial.setAddTrialOtherDocsDescription(1, DescriptionSecondDoc);
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Register Trial Related Document for the trial registration will not indicate an errors during Trial Review$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialSaveDraftButton();
            browser.wait(function () {
                return element(by.linkText(testSampleDocxFile)).isPresent().then(function (state) {
                    if (state === true) {
                        return element(by.linkText(testSampleDocxFile)).isDisplayed().then(function (state2) {
                            return state2 === true;
                        });
                    } else {
                        return false;
                    }
                });
            }, 25000, "Save draft page with Uploaded documents did not appear");
            addTrial.addTrialVerifyAddedOtherDocsDescription.getText().then(function (value) {
                console.log('value of added docs array with description');
                console.log(value);
                console.log(testSampleRichTextFile + '\n' + DescriptionFirstDoc, testSampleXlsmFile + '\n' + DescriptionSecondDoc);
                expect(value.sort()).to.eql([testSampleRichTextFile + '\n' + DescriptionFirstDoc, testSampleXlsmFile + '\n' + DescriptionSecondDoc].sort(), 'Verification of Other docs with description');
            });
            addTrial.addTrialVerifyAddedDocs.getText().then(function (value) {
                console.log('value of added docs array');
                console.log(value);
                console.log(testSampleDocxFile, testSampleDocFile_IRB, testSampleEXCELFile, testSamplePDFFile, testSampleXlsmFile, testSampleRichTextFile);
                expect(value.sort()).to.eql([testSampleDocxFile, testSampleDocFile_IRB, testSampleEXCELFile, testSamplePDFFile, testSampleRichTextFile, testSampleXlsmFile].sort(), 'Verification of Added Documents');

            });
            //  expect(addTrial.addTrialVerifyAddedDocs.getText()).to.eventually.eql([ testSampleDocxFile, testSampleDocFile_IRB, testSampleEXCELFile, testSamplePDFFile, testSampleRichTextFile, testSampleXlsmFile ], 'Verification of Added Documents');
            //  expect(addTrial.addTrialVerifyAddedOtherDocsDescription.getText()).to.eventually.eql([ testSampleRichTextFile + '\n' + DescriptionFirstDoc, testSampleXlsmFile + '\n' + DescriptionSecondDoc ], 'Verification of Other docs with description');
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have not attached a file as the Protocol Document$/, function (callback) {
        expect(trialDoc.trailFileUploadProtocol.getAttribute('value')).to.eventually.equal('').and.notify(callback);
    });

    this.Given(/^I have not attached a file as the IRB Approval$/, function (callback) {
        expect(trialDoc.trailFileUploadIRB.getAttribute('value')).to.eventually.equal('').and.notify(callback);
    });

    this.Then(/^Trial Related Documents section will indicate an error$/, function (table) {
        return browser.sleep(25).then(function () {
            errorTableDoc = table.raw();
            for (var i = 0; i < errorTableDoc.length; i++) {
                console.log(errorTableDoc[i].toString());
                expect(projectFunctions.verifyWarningMessage(errorTableDoc[i].toString())).to.become('true');
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have selected a file to attach from the list below as a trial document$/, function (table, callback) {
        tableFileList = table.raw();
        browser.sleep(25).then(callback);
    });

    this.Then(/^The Trial Related Documents section will not indicate any errors during Trial Review$/, function () {
        return browser.sleep(25).then(function () {
            for (var i = 0; i < tableFileList.length; i++) {
                addTrial.clickAddTrialResetButton();
                console.log(tableFileList[i].toString());
                //  if (tableFileList[i].toString() !== ''){
                if (tableFileList[i].toString() === 'Pdf') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSamplePDFFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSamplePDFFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSamplePDFFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSamplePDFFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSamplePDFFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);
                }
                else if (tableFileList[i].toString() === 'Doc') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSampleDocFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSampleDocFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSampleDocFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSampleDocFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSampleDocFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);
                }
                else if (tableFileList[i].toString() === 'docx') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSampleDocxFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSampleDocxFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSampleDocxFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSampleDocxFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSampleDocxFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);
                }
                else if (tableFileList[i].toString() === 'docm') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSampleDocmFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSampleDocmFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSampleDocmFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSampleDocmFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSampleDocmFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);
                }
                else if (tableFileList[i].toString() === 'Xls') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSampleXlsFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSampleXlsFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSampleXlsFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSampleXlsFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSampleXlsFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);
                }
                else if (tableFileList[i].toString() === 'xlsx') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSampleEXCELFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSampleEXCELFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSampleEXCELFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSampleEXCELFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSampleEXCELFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);
                }
                else if (tableFileList[i].toString() === 'xlsm') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSampleXlsmFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSampleXlsmFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSampleXlsmFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSampleXlsmFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSampleXlsmFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);
                }
                else if (tableFileList[i].toString() === 'xlsb') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSampleXlsbFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSampleXlsbFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSampleXlsbFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSampleXlsbFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSampleXlsbFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);
                }
                else if (tableFileList[i].toString() === 'Rtf') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSampleRichTextFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSampleRichTextFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSampleRichTextFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSampleRichTextFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSampleRichTextFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);
                }
                else if (tableFileList[i].toString() === 'Txt') {
                    trialDoc.trialRelatedFileUpload('reg', '1', testSampleTxtFile);
                    trialDoc.trialRelatedFileUpload('reg', '2', testSampleTxtFile);
                    trialDoc.trialRelatedFileUpload('reg', '3', testSampleTxtFile);
                    trialDoc.trialRelatedFileUpload('reg', '4', testSampleTxtFile);
                    trialDoc.trialRelatedFileUpload('reg', '5', testSampleTxtFile);
                    expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql(['', '', '', '', '']);

                }
                else {
                    throw new Error(" ***** No match found for the given file Type in Test Script ***** ");
                }
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^the file selected is not from the file list$/, function (callback) {
        callback();
    });

    this.Then(/^an error will be displayed "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            if (arg1 === 'Lead Organization Trial Identifier is Required') {
                expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
            }
            if (arg1 === 'Select a valid file. Allowed file types: pdf,doc,docx,docm,xls,xlsx,xlsm,xlsb,rtf,txt') {
                addTrial.clickAddTrialResetButton();
                trialDoc.trialRelatedFileUpload('reg', '1', testSampleCSVFile);
                trialDoc.trialRelatedFileUpload('reg', '2', testSampleCSVFile);
                trialDoc.trialRelatedFileUpload('reg', '3', testSampleCSVFile);
                trialDoc.trialRelatedFileUpload('reg', '4', testSampleCSVFile);
                trialDoc.trialRelatedFileUpload('reg', '5', testSampleCSVFile);
                addTrial.clickAddTrialReviewButton();
                expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql([arg1, arg1, arg1, arg1, arg1]);
                addTrial.clickAddTrialResetButton();
                trialDoc.trialRelatedFileUpload('reg', '1', testSampleMSGFile);
                trialDoc.trialRelatedFileUpload('reg', '2', testSampleMSGFile);
                trialDoc.trialRelatedFileUpload('reg', '3', testSampleMSGFile);
                trialDoc.trialRelatedFileUpload('reg', '4', testSampleMSGFile);
                trialDoc.trialRelatedFileUpload('reg', '5', testSampleMSGFile);
                addTrial.clickAddTrialReviewButton();
                expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql([arg1, arg1, arg1, arg1, arg1]);
                addTrial.clickAddTrialResetButton();
                trialDoc.trialRelatedFileUpload('reg', '1', testSampleHtmlFile);
                trialDoc.trialRelatedFileUpload('reg', '2', testSampleHtmlFile);
                trialDoc.trialRelatedFileUpload('reg', '3', testSampleHtmlFile);
                trialDoc.trialRelatedFileUpload('reg', '4', testSampleHtmlFile);
                trialDoc.trialRelatedFileUpload('reg', '5', testSampleHtmlFile);
                addTrial.clickAddTrialReviewButton();
                expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql([arg1, arg1, arg1, arg1, arg1]);
                addTrial.clickAddTrialResetButton();
                trialDoc.trialRelatedFileUpload('reg', '1', testSampleXMLFile);
                trialDoc.trialRelatedFileUpload('reg', '2', testSampleXMLFile);
                trialDoc.trialRelatedFileUpload('reg', '3', testSampleXMLFile);
                trialDoc.trialRelatedFileUpload('reg', '4', testSampleXMLFile);
                trialDoc.trialRelatedFileUpload('reg', '5', testSampleXMLFile);
                addTrial.clickAddTrialReviewButton();
                expect(addTrial.addTrialAcceptedFileExtensionMsg.getText()).to.eventually.eql([arg1, arg1, arg1, arg1, arg1]);
            }
            //  browser.sleep(25).then(callback);
        });
    });


};
