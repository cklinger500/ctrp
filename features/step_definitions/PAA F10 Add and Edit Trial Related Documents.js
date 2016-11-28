/**
 * Author: Shamim Ahmed
 * Date: 03/22/2016
 * Feature: PAA F10 Add and Edit Trial Related Documents
 *
 * Note: In the PAA search screen it has dependency on the seed data
 */

//Common dependencies
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');

//Required dependencies
//Login dependencies
var loginPage = require('../support/LoginPage');
//helper methods
var helperMethods = require('../support/helper');
//Project Related methods dependencies
var projectFunctionMethods= require('../support/projectMethods');
//Menu bar dependencies
var abstractionPageMenu = require('../support/abstractionCommonBar');
//Abstraction search page dependencies
var abstractionTrialSearchPage = require('../support/abstractionSearchTrialPage');
//Abstraction common dependencies
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
//Abstraction NCI Specific Information
var abstractionNCISpecific = require('../support/abstractionNCISpecificInfo');
//List of Organization
var OrgPage = require('../support/ListOfOrganizationsPage');
//Organization Search
var orgSearch = require('../support/abstractionOrganizationSearch');
//Person Search
var searchPeoplePage = require('../support/ListOfPeoplePage');
//Regulatory Information - IND/IDE
var abstractionRegulatoryINDIDE = require('../support/abstractionRegulatoryIND');
//Regulatory Information - Human Subject Safety
var abstractionRegulatoryHuman = require('../support/abstractionRegulatoryHuman');
//Collaborators
var abstractionCollaborators = require('../support/abstractionTrialCollaborators');
//General Trial Details
var abstractionTrialDetails = require('../support/abstractionTrialDetails');
//Regulatory Information - FDAAA
var abstractionRegulatoryInfoFDAA = require('../support/abstractionRegulatoryInfo');
//Trial Related Document
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');


//
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function() {

    var login = new loginPage();
    var helper = new helperMethods();
    var projectFunctions = new projectFunctionMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var nciSpecific = new abstractionNCISpecific();
    var indIDE = new abstractionRegulatoryINDIDE();
    var humanSafety = new abstractionRegulatoryHuman();
    var trialCollaborators = new abstractionCollaborators();
    var trialDetails = new abstractionTrialDetails();
    var fdaaa = new abstractionRegulatoryInfoFDAA();
    var trialDoc = new abstractionTrialRelatedDocument();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    //var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchPeople = new searchPeoplePage();
    var searchTableHeader = '';
    var nciID = 'NCI-2014-00894';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1776';
    var leadProtocolIDA = 'CTRP_01_1777';
    var leadProtocolIDB = 'CTRP_01_1778';
    var leadProtocolIDC = 'CTRP_01_17'+randNmbr;
    var leadProtocolIDD = 'CTRP_01_1781';
    var leadProtocolIDE = 'CTRP_01_1782';
    var leadProtocolIDF = 'CTRP_01_1783';
    var leadProtocolIDG = 'CTRP_01_1784';
    var leadProtocolIDH = 'CTRP_01_1785';
    var leadProtocolIDI = 'CTRP_01_1786';
    var searchResultCountText = 'Trial Search Results';
    var indIDEAssociatedQueVal = '';
    var indTypVal = 'IND';
    var ideTypVal = 'IDE';
    var identifierRnd = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbr = ''+identifierRnd+'';
    var identifierRndA = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbrEdited = ''+identifierRndA+'';
    var getBoardName = 'TestBoardName'+moment().format('MMMDoYY hmmss');
    var boardNm = '';
    var orgSearchNameA = 'Boston Medical Center';
    var orgSearchNameB = 'Boston University School Of Public Health';
    var orgSearchNameC = 'National Cancer Institute';
    var orgSearchNameD = 'ZZZ test org for test accounts';
    var personFNmA = 'Alessandra';
    var personLNmA = 'Ferrajol';
    var personFNmB = 'Kristi';
    var personLNmB = 'Graves';
    var personFNmC = 'Diane';
    var personLNmC = 'Roulston';
    var buildSelectionOpton = '';
    var indIDENmbrA = 'BBIND13794';
    var indIDENmbrB = 'IND108498';
    var indIDENmbrC = '102902';
    var optionA = 'Identifier Type';
    var optionB = 'Value (Click for editing)';
    var optionC = 'Deletion';
    var optionD = '';
    var optionE = '';
    var optionF = '';
    var optionG = '';
    var optionH = '';
    var optionI = '';
    var tblOptionA = '';
    var tblOptionB = '';
    var tblOptionC = '';
    var tblOptionD = '';
    var tblOptionE = '';
    var tblOptionF = '';
    var tblOptionG = '';
    var tblOptionH = '';
    var tblOptionI = '';
    var tblOptionJ = '';
    var tblOptionK = '';
    var tblOptionADup = '';
    var tblOptionBDup = '';
    var tblOptionCDup = '';
    var tblOptionDDup = '';
    var tblOptionEDup = '';
    var selectOptionSelect = '- Please select a document type ...';
    var selectOptionChangeMemo = 'Change Memo Document';
    var selectOptionComplete = 'Complete Sheet';
    var selectOptionIRB = 'IRB Approval';
    var selectOptionInformed = 'Informed Consent';
    var selectOptionListOfParti = 'List of Participating Sites';
    var selectOptionOther = 'Other';
    var selectOptionProtocolDoc = 'Protocol Document';
    var selectOptionProtocolHigh = 'Protocol Highlighted Document';
    var selectOptionTSR = 'TSR';
    var randomDocSelection = '';
    var randomDocTypSelection = '';
    var getMemCrntUsrNm = '';
    var trialDocHdrs = new Array("File Name", "Document Type", "Document Subtype", "Date Added", "Added By", "Edit", "Delete");
    var getExpectedDate = '';
    var getReplacedFile = 'testSampleDocTest_Replace.docx';
    var getTestUploadFileA = 'testSampleDocTestAFile.docx';
    var getTestUploadFileB = 'testSampleDocTestBFile.docx';
    var getIRBUploadFile = 'testSampleDocFile_IRB.docx';
    var getProtocolUploadFile = 'testSampleDocFile_Protocol.docx';
    var getChangeMemoUploadFile = 'testSampleDocFile_ChangeMemo.docx';
    var getNonSupportedUploadFile = 'testSampleDocFile_invalidExt.log';
    var getInformedConsentUploadFile = 'testSampleDocFile_Consent.docx';
    var getListOfParticipatingUploadFile = 'testSampleDocFile_Participeting.docx';
    var getProtocolHighlightedDocumentUploadFile = 'testSampleDocFile_ProtocolHighlighted.docx';
    var getTSRUploadFile = 'testSampleDocFile_TSR.docx';
    var getCompleteUploadFile = 'testSampleDocFile_Complete.docx';
    var getOtherUploadFile = 'testSampleDocFile_Other.docx';

    /*
     Scenario: #1 I can add Trial Related Documents
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When I select add a document
     And have browsed and selected file to attach
     And have selected the Document type from the list of:
     |Protocol Document|
     |IRB Approval Document|
     |Informed Consent Document|
     |Participating Sites|
     |Protocol Highlighted Document|
     |TSR|
     |Complete Sheet|
     |Change Memo|
     |Other|
     And have entered a Description of the Document when the document type is Other
     Then the Trial Related Document will be associated with the trail
     And the date the document was will be listed with the document
     And the users name that added the document will be listed with the document
     And the document will be ordered by date with the newest document first
     */

    this.Given(/^I am on the Trial Related Documents screen$/, function () {
        return browser.sleep(25).then(function() {
        var datTm = new Date();
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialRelatedDocument();
        trialCollaborators.waitForElement(trialDoc.trialDocSelectADocList, "Trial Related Documents - Select a Document - Drop down");
        helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        trialDoc.trialTable.isDisplayed().then(function(condition) {
            if (condition){
                console.log("Condition: "+condition);
                trialDoc.findDeleteIconsWhereExists();
            }
        });
        trialDoc.trialTable.isDisplayed().then(function(condition) {
            if (condition){
                helper.setCommentValue(trialDoc.trialDeleteCommentBox, "Test Delete Comment - " + moment().format('MMMDoYY hmmss'), "Comment - on Delete Action - field");
                trialDoc.clickCommitCommentButton();
                helper.wait_for(9000);
                trialDoc.clickSave();
            }
        });
        });
    });

    this.When(/^I select add a document$/, function () {
        return browser.sleep(25).then(function() {
        randomDocSelection = '';
        var randomDoc = '';
        var randNmbr = Math.floor(Math.random()*(1-8+1)+9).toString();
        console.log("Random NM: "+randNmbr);
        if (randNmbr === '1'){
            randomDoc = 'testSampleEXCELFile.xlsx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '2'){
            randomDoc = 'testSampleDocFile1997_2004v.doc';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '3'){
            randomDoc = 'testSampleDocFile.docx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '4'){
            randomDoc = 'testSamplePDFFile.pdf';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '5'){
            randomDoc = 'testSampleRichTextFile.rtf';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '6'){
            randomDoc = 'testSampleDocTestFile.docx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '7'){
            randomDoc = 'testSampleDocTestAFile.docx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '8'){
            randomDoc = 'testSampleDocTestBFile.docx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '9'){
            randomDoc = 'testSampleDocTestCFile.docx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        }
        });
    });

    this.When(/^have browsed and selected file to attach$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.trialRelatedFileUpload('PA', '1', randomDocSelection);
        });
    });

    this.When(/^have selected the Document type from the list of:$/, function (table) {
        return browser.sleep(25).then(function() {
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Select Document Type value(s) in the data table:[' + strVal +']');
        trialDoc.trialDocSelectADocList.getText().then(function(items) {
            console.log('Trial Document Type value(s) in the list object:['+ items +']');
            expect(items.toString().split("\n")).to.eql(strVal.toString().split("\n"));
        });
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionA = tableDataSplt[0];
        tblOptionB = tableDataSplt[1];
        tblOptionC = tableDataSplt[2];
        tblOptionD = tableDataSplt[3];
        tblOptionE = tableDataSplt[4];
        tblOptionF = tableDataSplt[5];
        tblOptionG = tableDataSplt[6];
        tblOptionH = tableDataSplt[7];
        tblOptionI = tableDataSplt[8];
        randomDocTypSelection = '';
        var randomDocTyp = '';
        var randNb = Math.floor(Math.random()*(1-8+1)+9).toString();
        console.log("Random NM: "+randNb);
        if (randNb === '1'){
            randomDocTyp = ''+tblOptionA+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '2'){
            randomDocTyp = ''+tblOptionB+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '3'){
            randomDocTyp = ''+tblOptionC+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '4'){
            randomDocTyp = ''+tblOptionC+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '5'){
            randomDocTyp = ''+tblOptionE+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '6'){
            randomDocTyp = ''+tblOptionF+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '7'){
            randomDocTyp = ''+tblOptionI+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '8'){
            randomDocTyp = ''+tblOptionC+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '9'){
            randomDocTyp = ''+tblOptionI+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        }
        trialDoc.selectADocument(randomDocTypSelection);
        });
    });

    this.When(/^have entered a Description of the Document when the document type is Other$/, function () {
        return browser.sleep(25).then(function() {
        if (randomDocTypSelection === selectOptionOther){
            trialDoc.setSubType('Test Subtype');
        }
        });
    });

    this.Then(/^the Trial Related Document will be associated with the trail$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.clickAddButton();
        });
    });

    this.Then(/^the date the document was will be listed with the document$/, function () {
        return browser.sleep(25).then(function() {
        //Handalling Required Document Type Upload
        trialDoc.trialRelatedFileUpload('PA', '1', 'testSampleDocFile_IRB.docx');
        trialDoc.selectADocument(selectOptionIRB);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', 'testSampleDocFile_Protocol.docx');
        trialDoc.selectADocument(selectOptionProtocolDoc);
        trialDoc.clickAddButton();
        getExpectedDate = trialDoc.getCurrentDate();
        console.log("getExpectedDate: "+getExpectedDate);
        trialDoc.findDocumentAndVerifyDateAdded(randomDocSelection, getExpectedDate);
        element(by.binding('headerView.username')).getText().then(function(userNameValue){
            var crntUsrNm = userNameValue;
            function getUsrNm(){
                return crntUsrNm;
            };
            getMemCrntUsrNm = getUsrNm();
            console.log('Current User Name : ' + getMemCrntUsrNm);
        });
        });
    });

    this.Then(/^the users name that added the document will be listed with the document$/, function () {
        return browser.sleep(25).then(function() {
        var getCurrentUserName = getMemCrntUsrNm;
        console.log("getCurrentUserName: "+getCurrentUserName);
        trialDoc.findDocumentAndVerifyUserAdded(randomDocSelection, getCurrentUserName);
        trialDoc.clickSave();
        });
    });

    this.Then(/^the document will be ordered by date with the newest document first$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.verifyTrialDocTblHeaders(trialDocHdrs[0], trialDocHdrs[1], trialDocHdrs[2], trialDocHdrs[3], trialDocHdrs[4], trialDocHdrs[5], trialDocHdrs[6]);
        trialDoc.findDocumentAndVerifyFileName(randomDocSelection);
        trialDoc.findDocumentAndVerifyDocumentType(randomDocSelection, randomDocTypSelection);
        if (randomDocTypSelection === selectOptionOther){
            trialDoc.findDocumentAndVerifyDocumentSubType(randomDocSelection, 'Test Subtype');
        }
        trialDoc.findDocumentAndVerifyDateAdded(randomDocSelection, getExpectedDate);
        trialDoc.findDocumentAndVerifyUserAdded(randomDocSelection, getMemCrntUsrNm);
        });
    });

    /*
     Scenario: #2 I can Edit(revise) the file name for a Trial Related Document
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When I select add a document
     And have browsed and selected file to attach
     And have selected the Document type from the list of:
     |- Please select a document type ...|
     |Change Memo Document|
     |Complete Sheet|
     |IRB Approval|
     |Informed Consent|
     |List of Participating Sites|
     |Other|
     |Protocol Document|
     |Protocol Highlighted Document|
     |TSR|
     And have entered a Description of the Document when the document type is Other
     Then the Trial Related Document will be associated with the trail
     And the date the document was will be listed with the document
     And the users name that added the document will be listed with the document
     When I select Edit a Trial Related Document
     And have browsed and selected a new file to attach
     And have entered a Description of the Document when the document type is Other
     Then the Trial Related edited Document will be associated with the trail
     And the date the document was will be listed with the document
     And the users name that added the document will be listed with the document
     And the prior file will be annotated as Revised
     */

    this.When(/^I select Edit a Trial Related Document$/, function () {
        return browser.sleep(25).then(function() {
        console.log('Current Document to Edit : ' + randomDocSelection);
        trialDoc.findDocumentAndClickEdit(randomDocSelection);
        });
    });

    this.When(/^have browsed and selected a new file to attach$/, function () {
        return browser.sleep(25).then(function() {
            trialDoc.trialRelatedFileUpload('PA', '1', getReplacedFile);
            trialDoc.clickUpdate();
        });
    });

    this.Then(/^the Trial Related edited Document will be associated with the trail$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.findDocumentAndVerifyFileName(getReplacedFile);
        });
    });

    this.Then(/^the prior file will be annotated as Revised$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    /*
     Scenario: #3 I can Delete Trial Related Documents
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     And I select one or more documents to delete
     And enter a comment for why the document is deleted
     Then the Trial Related Document will not be visible on the Trial Related Documents screen
     And the file will be annotated as Deleted
     */

    this.Given(/^I select one or more documents to delete$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.trialTable.isDisplayed().then(function(condition) {
            if (condition){
                console.log("Condition: "+condition);
                trialDoc.findDocumentAndClickWhereDeleteExists();
                trialDoc.clickSave();
            }
        });
        });
    });

    this.Given(/^enter a comment for why the document is deleted$/, function () {
        return browser.sleep(25).then(function() {
        console.log("- enter a comment for why the document is deleted - dev team need to develop comment feature (it's not developed yet as 03252016)");
        });
    });

    this.Then(/^the Trial Related Document will not be visible on the Trial Related Documents screen$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.findDocumentDoesNotExists(randomDocSelection);
        });
    });

    this.Then(/^the file will be annotated as Deleted$/, function () {
        return browser.sleep(25).then(function() {
        console.log("- the file will be annotated as Deleted - dev team need to develop comment feature (it's not developed yet as 03252016)");
        });
    });

    /*
     Scenario: #4 Save Trial Related Documents
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When select save documents
     Then the information entered or edited on the Trial Related Documents screen will be saved to the trial record
     */

    this.When(/^select save documents$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.trialRelatedFileUpload('PA', '1', getTestUploadFileA);
        trialDoc.selectADocument(selectOptionComplete);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getIRBUploadFile);
        trialDoc.selectADocument(selectOptionIRB);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolUploadFile);
        trialDoc.selectADocument(selectOptionProtocolDoc);
        trialDoc.clickAddButton();
        element(by.binding('headerView.username')).getText().then(function(userNameValue){
            var crntUsrNm = userNameValue;
            function getUsrNm(){
                return crntUsrNm;
            };
            getMemCrntUsrNm = getUsrNm();
            console.log('Current User Name : ' + getMemCrntUsrNm);
        });
        trialDoc.clickSave();
        });
    });

    this.Then(/^the information entered or edited on the Trial Related Documents screen will be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.verifyTrialDocTblHeaders(trialDocHdrs[0], trialDocHdrs[1], trialDocHdrs[2], trialDocHdrs[3], trialDocHdrs[4], trialDocHdrs[5], trialDocHdrs[6]);
        trialDoc.findDocumentAndVerifyFileName(getTestUploadFileA);
        trialDoc.findDocumentAndVerifyDocumentType(getTestUploadFileA, selectOptionComplete);
        getExpectedDate = trialDoc.getCurrentDate();
        console.log("getExpectedDate: "+getExpectedDate);
        trialDoc.findDocumentAndVerifyDateAdded(getTestUploadFileA, getExpectedDate);
        var getCurrentUserName = getMemCrntUsrNm;
        console.log("getCurrentUserName: "+getCurrentUserName);
        trialDoc.findDocumentAndVerifyUserAdded(getTestUploadFileA, getCurrentUserName);
        trialDoc.findDocumentAndVerifyDateAdded(getTestUploadFileA, getExpectedDate);
        });
    });

    /*
     Scenario: #6 Cancel Regulatory Information
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Register Trial Related Documents screen
     When I select Reset documents
     Then the information entered or edited on the Trial Related Documents screen will not be saved to the trial record
     And the Trial Related Document screen will be refreshed with the existing data
     */

    this.When(/^I select Reset documents$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.trialRelatedFileUpload('PA', '1', getIRBUploadFile);
        trialDoc.selectADocument(selectOptionIRB);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolUploadFile);
        trialDoc.selectADocument(selectOptionProtocolDoc);
        trialDoc.clickAddButton();
        trialDoc.clickSave();
        helper.wait_for(2500);
        trialDoc.trialRelatedFileUpload('PA', '1', getTestUploadFileB);
        trialDoc.selectADocument(selectOptionComplete);
        trialDoc.clickAddButton();
        trialDoc.clickReset();
        });
    });

    this.Then(/^the information entered or edited on the Trial Related Documents screen will not be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.findDocumentDoesNotExists(getTestUploadFileB);
        });
    });

    this.Then(/^the Trial Related Document screen will be refreshed with the existing data$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.findDocumentAndVerifyFileName(getIRBUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getProtocolUploadFile);
        });
    });

    /*
     Scenario: #7 I can Not Delete the Protocol, IRB Approval Documents and Change Memo Documents
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When I select Delete one or more documents
     And have selected a document with a type of :
     |Protocol Document|
     |IRB Approval|
     |Change Memo Document|
     Then the system will display a Error message that the Protocol Document and or IRB Approval Document cannot be deleted
     */

    this.When(/^I select Delete one or more documents$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.clickBackToSearchResultsButton();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDB);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDB);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialRelatedDocument();
        trialCollaborators.waitForElement(trialDoc.trialDocSelectADocList, "Trial Related Documents - Select a Document - Drop down");
        helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        trialDoc.trialTable.isDisplayed().then(function(condition) {
            if (condition){
                console.log("Condition: "+condition);
                trialDoc.findDocumentAndClickWhereDeleteExists();
                trialDoc.clickSave();
            }
        });
        trialDoc.trialRelatedFileUpload('PA', '1', getIRBUploadFile);
        trialDoc.selectADocument(selectOptionIRB);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolUploadFile);
        trialDoc.selectADocument(selectOptionProtocolDoc);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getChangeMemoUploadFile);
        trialDoc.selectADocument(selectOptionChangeMemo);
        trialDoc.clickAddButton();
        trialDoc.clickSave();
        });
    });

    this.When(/^have selected a document with a type of :$/, function (table) {
        return browser.sleep(25).then(function() {
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Select Document Type value(s) in the data table:[' + strVal +']');
        trialDoc.trialDocSelectADocList.getText().then(function(items) {
            console.log('Trial Document Type value(s) in the list object:['+ items +']');
            //expect(items.toString().split("\n")).to.eql(strVal.toString().split("\n"));
        });
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionA = tableDataSplt[0];
        tblOptionB = tableDataSplt[1];
        tblOptionC = tableDataSplt[2];
        console.log('tblOptionA:[' + tblOptionA +']');
        console.log('tblOptionB:[' + tblOptionB +']');
        console.log('tblOptionC:[' + tblOptionC +']');
        //trialDoc.findDocumentAndVerifyDocumentType(getIRBUploadFile, tblOptionB);
        //trialDoc.findDocumentAndVerifyDocumentType(getProtocolUploadFile, tblOptionA);
        //trialDoc.findDocumentAndVerifyDocumentType(getChangeMemoUploadFile, tblOptionC);
        trialDoc.trialTable.isDisplayed().then(function(condition) {
            if (condition){
                console.log("Condition: "+condition);
                trialDoc.findDocumentAndClickWhereDeleteExists();
                trialDoc.clickSave();
            }
        });
        });
    });

    this.Then(/^the system will display a Error message that the Protocol Document and or IRB Approval Document cannot be deleted$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.findDocumentAndVerifyFileName(getProtocolUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getIRBUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getChangeMemoUploadFile);
        });
    });

    /*
     Scenario: #8 Valid Document Formats
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When I select a document to add
     And the document is not one of the valid extensions listed below
     |Pdf|
     |Doc|
     |docx|
     |docm|
     |Xls|
     |xlsx|
     |xlsm|
     |xlsb|
     |Rtf|
     |Txt|
     Then the system will display a Error message that "The selected document is not a valid document type"
     */

    this.When(/^I select a document to add$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.clickBackToSearchResultsButton();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDI);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDI);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialRelatedDocument();
        trialCollaborators.waitForElement(trialDoc.trialDocSelectADocList, "Trial Related Documents - Select a Document - Drop down");
        helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        trialDoc.selectADocument(selectOptionComplete);
        trialDoc.trialRelatedFileUpload('PA', '1', getNonSupportedUploadFile);
        });
    });

    this.When(/^the document is not one of the valid extensions listed below$/, function (table) {
        return browser.sleep(25).then(function() {
        var extSplt = getNonSupportedUploadFile.split(".");
        var extSpltVal = extSplt[1];
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Select Document Type value(s) in the data table:[' + strVal +']');
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionA = tableDataSplt[0];
        tblOptionB = tableDataSplt[1];
        tblOptionC = tableDataSplt[2];
        tblOptionD = tableDataSplt[3];
        tblOptionE = tableDataSplt[4];
        tblOptionF = tableDataSplt[5];
        tblOptionG = tableDataSplt[6];
        tblOptionH = tableDataSplt[7];
        tblOptionI = tableDataSplt[8];
        tblOptionJ = tableDataSplt[9];
        tblOptionK = tableDataSplt[10];
        expect(tblOptionA).to.not.equal(extSpltVal);
        expect(tblOptionB).to.not.equal(extSpltVal);
        expect(tblOptionC).to.not.equal(extSpltVal);
        expect(tblOptionD).to.not.equal(extSpltVal);
        expect(tblOptionE).to.not.equal(extSpltVal);
        expect(tblOptionF).to.not.equal(extSpltVal);
        expect(tblOptionG).to.not.equal(extSpltVal);
        expect(tblOptionH).to.not.equal(extSpltVal);
        expect(tblOptionI).to.not.equal(extSpltVal);
        expect(tblOptionJ).to.not.equal(extSpltVal);
        expect(tblOptionK).to.not.equal(extSpltVal);
        });
    });

    this.Then(/^the system will display a Error message that "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
        var bldErrorMsg = "Error: "+arg1+". Allowed file types: pdf,doc,docx,docm,xls,xlsx,xlsm,xlsb,rtf,txt";
        trialDoc.verifyErrorMsg(bldErrorMsg);
        });
    });

    /*
     Scenario: #9 Protocol and IRB Approval Documents are required
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     Then the following docuuments will be required
     |Protocol Document|
     |IRB Approval|
     */

    this.Then(/^the following docuuments will be required$/, function (table) {
        return browser.sleep(25).then(function() {
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Required Document Type value(s) in the data table:[' + strVal +']');
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionA = tableDataSplt[0];
        tblOptionB = tableDataSplt[1];
        trialDoc.clickBackToSearchResultsButton();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDF);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDF);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialRelatedDocument();
        trialCollaborators.waitForElement(trialDoc.trialDocSelectADocList, "Trial Related Documents - Select a Document - Drop down");
        helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        trialDoc.trialRelatedFileUpload('PA', '1', getChangeMemoUploadFile);
        trialDoc.selectADocument(selectOptionChangeMemo);
        trialDoc.clickAddButton();
        trialDoc.clickSave();
        var buildRequiredErrorMsg = "Error: Both "+tblOptionA+" and "+tblOptionB+" Document are required";
        trialDoc.verifyRequiredErrorMsg(buildRequiredErrorMsg);
        });
    });

    /*
     Scenario: #10 Mutliple documents of the same type
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When I add a new document
     And I have selected the Document type from the list of:
     |Protocol Document|
     |IRB Approval|
     |Informed Consent|
     |List of Participating Sites|
     |Protocol Highlighted Document|
     And select save on the trial related documents screen
     And there is already a Document type from the list of:
     |Protocol Document|
     |IRB Approval|
     |Informed Consent|
     |List of Participating Sites|
     |Protocol Highlighted Document|
     Then the system displays a Error message that "Error: The selected document type already exists."
     */

    this.When(/^I add a new document$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.clickBackToSearchResultsButton();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDG);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDG);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialRelatedDocument();
        trialCollaborators.waitForElement(trialDoc.trialDocSelectADocList, "Trial Related Documents - Select a Document - Drop down");
        helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        });
    });

    this.When(/^I have selected the Document type from the list of:$/, function (table) {
        return browser.sleep(25).then(function() {
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Select Document Type value(s) in the data table:[' + strVal +']');
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionA = tableDataSplt[0];
        tblOptionB = tableDataSplt[1];
        tblOptionC = tableDataSplt[2];
        tblOptionD = tableDataSplt[3];
        tblOptionE = tableDataSplt[4];
        //Protocol Document
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolUploadFile);
        trialDoc.selectADocument(tblOptionA);
        trialDoc.clickAddButton();
        //IRB Approval
        trialDoc.trialRelatedFileUpload('PA', '1', getIRBUploadFile);
        trialDoc.selectADocument(tblOptionB);
        trialDoc.clickAddButton();
        //Informed Consent
        trialDoc.trialRelatedFileUpload('PA', '1', getInformedConsentUploadFile);
        trialDoc.selectADocument(tblOptionC);
        trialDoc.clickAddButton();
        //List of Participating Sites
        trialDoc.trialRelatedFileUpload('PA', '1', getListOfParticipatingUploadFile);
        trialDoc.selectADocument(tblOptionD);
        trialDoc.clickAddButton();
        //Protocol Highlighted Document
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolHighlightedDocumentUploadFile);
        trialDoc.selectADocument(tblOptionE);
        trialDoc.clickAddButton();
        });
    });

    this.When(/^select save on the trial related documents screen$/, function () {
        return browser.sleep(25).then(function() {
        trialDoc.clickSave();
        });
    });

    this.When(/^there is already a Document type from the list of:$/, function (table) {
        return browser.sleep(25).then(function() {
        var strValDup = '';
        selectDcoumentTableValDup = table.raw();
        strValDup = selectDcoumentTableValDup.toString().replace(/,/g, "\n", -1);
        console.log('Select Document Type value(s) in the data table:[' + strValDup +']');
        var tableDataSpltDup = strValDup.toString().split("\n");
        tblOptionADup = tableDataSpltDup[0];
        tblOptionBDup = tableDataSpltDup[1];
        tblOptionCDup = tableDataSpltDup[2];
        tblOptionDDup = tableDataSpltDup[3];
        tblOptionEDup = tableDataSpltDup[4];
        //Protocol Document
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolUploadFile);
        trialDoc.selectADocument(tblOptionADup);
        trialDoc.clickAddButton();
        });
    });

    this.Then(/^the system displays a Error message that "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
        trialDoc.verifyDocErrorMsg(arg1);
        trialDoc.clickSave();
        //IRB Approval
        trialDoc.trialRelatedFileUpload('PA', '1', getIRBUploadFile);
        trialDoc.selectADocument(tblOptionBDup);
        trialDoc.clickAddButton();
        trialDoc.verifyDocErrorMsg(arg1);
        trialDoc.clickSave();
        //Informed Consent
        trialDoc.trialRelatedFileUpload('PA', '1', getInformedConsentUploadFile);
        trialDoc.selectADocument(tblOptionCDup);
        trialDoc.clickAddButton();
        trialDoc.verifyDocErrorMsg(arg1);
        trialDoc.clickSave();
        //List of Participating Sites
        trialDoc.trialRelatedFileUpload('PA', '1', getListOfParticipatingUploadFile);
        trialDoc.selectADocument(tblOptionDDup);
        trialDoc.clickAddButton();
        trialDoc.verifyDocErrorMsg(arg1);
        trialDoc.clickSave();
        //Protocol Highlighted Document
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolHighlightedDocumentUploadFile);
        trialDoc.selectADocument(tblOptionEDup);
        trialDoc.clickAddButton();
        trialDoc.verifyDocErrorMsg(arg1);
        });
    });

    /*
     Scenario: #11 View Trial Related Documents
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     Then I can see Document that have the following types:
     |Protocol Document|
     |IRB Approval|
     |Informed Consent|
     |Protocol Highlighted Document|
     |List of Participating Sites|
     |TSR|
     |Complete Sheet|
     |Change Memo Document|
     |Other|
     */

    this.Then(/^I can see Document that have the following types:$/, function (table) {
        return browser.sleep(25).then(function() {
        trialDoc.clickBackToSearchResultsButton();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDH);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDH);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialRelatedDocument();
        trialCollaborators.waitForElement(trialDoc.trialDocSelectADocList, "Trial Related Documents - Select a Document - Drop down");
        helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Select Document Type value(s) in the data table:[' + strVal +']');
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionA = tableDataSplt[0];
        tblOptionB = tableDataSplt[1];
        tblOptionC = tableDataSplt[2];
        tblOptionD = tableDataSplt[3];
        tblOptionE = tableDataSplt[4];
        tblOptionF = tableDataSplt[5];
        tblOptionG = tableDataSplt[6];
        tblOptionH = tableDataSplt[7];
        tblOptionI = tableDataSplt[8];
        //IRB Approval
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolUploadFile);
        trialDoc.selectADocument(tblOptionA);
        trialDoc.clickAddButton();
        //IRB Approval
        trialDoc.trialRelatedFileUpload('PA', '1', getIRBUploadFile);
        trialDoc.selectADocument(tblOptionB);
        trialDoc.clickAddButton();
        //Informed Consent
        trialDoc.trialRelatedFileUpload('PA', '1', getInformedConsentUploadFile);
        trialDoc.selectADocument(tblOptionC);
        trialDoc.clickAddButton();
        //Protocol Highlighted Document
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolHighlightedDocumentUploadFile);
        trialDoc.selectADocument(tblOptionD);
        trialDoc.clickAddButton();
        //List of Participating Sites
        trialDoc.trialRelatedFileUpload('PA', '1', getListOfParticipatingUploadFile);
        trialDoc.selectADocument(tblOptionE);
        trialDoc.clickAddButton();
        //TSR
        trialDoc.trialRelatedFileUpload('PA', '1', getTSRUploadFile);
        trialDoc.selectADocument(tblOptionF);
        trialDoc.clickAddButton();
        //Complete Sheet
        trialDoc.trialRelatedFileUpload('PA', '1', getCompleteUploadFile);
        trialDoc.selectADocument(tblOptionG);
        trialDoc.clickAddButton();
        //Change Memo Document
        trialDoc.trialRelatedFileUpload('PA', '1', getChangeMemoUploadFile);
        trialDoc.selectADocument(tblOptionH);
        trialDoc.clickAddButton();
        //Other
        trialDoc.trialRelatedFileUpload('PA', '1', getOtherUploadFile);
        trialDoc.selectADocument(tblOptionI);
        if (tblOptionI === selectOptionOther){
            trialDoc.setSubType('Other Subtype');
        }
        trialDoc.clickAddButton();
        //Save Doc
        trialDoc.clickSave();
        helper.wait_for(3000);
        trialDoc.findDocumentAndVerifyFileName(getProtocolUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getIRBUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getInformedConsentUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getProtocolHighlightedDocumentUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getListOfParticipatingUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getTSRUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getCompleteUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getChangeMemoUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getOtherUploadFile);
        //Document Type
        trialDoc.findDocumentAndVerifyDocumentType(getProtocolUploadFile, tblOptionA);
        trialDoc.findDocumentAndVerifyDocumentType(getIRBUploadFile, tblOptionB);
        trialDoc.findDocumentAndVerifyDocumentType(getInformedConsentUploadFile, tblOptionC);
        trialDoc.findDocumentAndVerifyDocumentType(getProtocolHighlightedDocumentUploadFile, tblOptionD);
        trialDoc.findDocumentAndVerifyDocumentType(getListOfParticipatingUploadFile, tblOptionE);
        trialDoc.findDocumentAndVerifyDocumentType(getTSRUploadFile, tblOptionF);
        trialDoc.findDocumentAndVerifyDocumentType(getCompleteUploadFile, tblOptionG);
        trialDoc.findDocumentAndVerifyDocumentType(getChangeMemoUploadFile, tblOptionH);
        trialDoc.findDocumentAndVerifyDocumentType(getOtherUploadFile, tblOptionI);
        if (tblOptionI === selectOptionOther){
            trialDoc.findDocumentAndVerifyDocumentSubType(getOtherUploadFile, 'Other Subtype');
        }
        });
    });




};
