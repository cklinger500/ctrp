/**
 * Author: Shamim Ahmed
 * Date: 08/24/2016
 * Feature: PAS F02 Add and Edit Trial Design.Feature
 *
 * Note: In the PAA search screen it has dependency on the seeded data
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
//Participating Site
var abstractionParticipatingSite = require('../support/abstractionParticipating');
//Trial Status
var abstractionTrialStatus = require('../support/abstractionTrailStatuses');
//Left Navigation
var abstractionLeftNavigationMenus = require('../support/abstractionLeftNav');
//Scientific trial description
var scientificTrialDesc = require('../support/scientificTrialDesc');
//Scientific Outcome Measures
var scientificOutcome = require('../support/scientificOutcomeMeasures');
//Scientific Associated Trial
var scientificAssociatedTrial = require('../support/scientificAssociatedTrials');
//Scientific Trial Design
var scientificTrialDesign = require('../support/scientificTrialDesign');
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
    var participatingSite = new abstractionParticipatingSite();
    var trialStatus = new abstractionTrialStatus();
    var leftNav = new abstractionLeftNavigationMenus();
    var trialDesc = new scientificTrialDesc();
    var outcome = new scientificOutcome();
    var associated = new scientificAssociatedTrial();
    var trialDesign = new scientificTrialDesign();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchPeople = new searchPeoplePage();
    var searchTableHeader = '';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1789';
    var pageTtitle = 'Trial Design';
    var briefSummary ='Test Brief Summary';
    var objectives = 'Test Objectives';
    var detailedDescription = 'Test Detailed Description';
    var briefTitle = 'Test Brief Title Multi-Dose Phase II Trial of Rosuvastatin to Lower Circulating Tissue Factor Bearing Microparticles in Metastatic Breast Cancer title';
    var charLftStr = 'Test Brief Title Multi-Dose Phase II Trial of Rosuvastatin to Lower Circulating Tissue Factor verify';
    var decrCharLft = '4982 characters left';
    var decrCharLftObjective = '31985 characters left';
    var decrCharLftObjectiveA = '31800 characters left';
    var decrCharLftDetail = '31975 characters left';
    var decrCharLftDetailA = '31800 characters left';
    var noCharLft = '0 characters left';
    var errorMSGBT = 'Brief Title is Required';
    var errorMSGBS = 'Summary is Required';
    var clinicalResearchCategoryValue = '';
    var clinicalResearchCategoryNewValue = '';
    var optionA = '';
    var optionB = '';
    var optionC = '';
    var optionD = '';
    var crcValueA = '';
    var crcValueB = '';
    var fieldA = '';
    var fieldB = '';
    var fieldC = '';
    var fieldD = '';
    var fieldE = '';
    var fieldF = '';
    var fieldG = '';
    var fieldH = '';
    var fieldI = '';
    var fieldJ = '';
    var fieldK = '';
    var fieldL = '';
    var fieldM = '';


    /*
     Scenario: #1 I can change Clinical research Category for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Design screen
     When I view the prefilled Clinical Research Category value
     Then I can select a different value

     |Interventional             |
     |Expanded Access            |
     |Observational              |
     |Ancillary Correlative      |
     */

    this.Given(/^I am on the Trial Design screen$/, function () {
        return browser.sleep(25).then(function() {
            leftNav.clickScientificTrialDesign();
            leftNav.checkPanelTitle(pageTtitle, '6');
        });
    });

    this.When(/^I view the prefilled Clinical Research Category value$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.researchCategoryLst.$('option:checked').getText().then(function (value) {
                var crntCRCValue = '' + value + '';
                function retCRCVal() {
                    return crntCRCValue;
                }
                clinicalResearchCategoryValue = retCRCVal();
                console.log('System Identified [' + clinicalResearchCategoryValue + '] as the current Clinical Research Category value');
            });
        });
    });

    this.Then(/^I can select a different value$/, function (table) {
        return browser.sleep(25).then(function() {
            var clinicalRCVal = table.raw();
            optionCRCValues = clinicalRCVal.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + optionCRCValues +']');
            var optionCRC = optionCRCValues.toString().split("\n");
                optionA = optionCRC[0]; //Interventional
                optionB = optionCRC[1]; //Expanded Access
                optionC = optionCRC[2]; //Observational
                optionD = optionCRC[3]; //Ancillary Correlative

            if (clinicalResearchCategoryValue === optionA) {
                trialDesign.selectClinicalResearchCategory(optionB);
                helper.wait_for(6000);
                var pasNewCRCValue = optionB; //Expanded Access
                function retNewCRCValue() {
                    return pasNewCRCValue;
                }
                clinicalResearchCategoryNewValue = retNewCRCValue();
                trialDesign.clickSaveTrialDesign();
                verifyCurrentCRC(clinicalResearchCategoryNewValue, "Verifying Clinical Research Category Selected Value from the list");
            }
            if (clinicalResearchCategoryValue === optionB) {
                trialDesign.selectClinicalResearchCategory(optionC);
                helper.wait_for(6000);
                var pasNewCRCValue = optionC; //Observational
                function retNewCRCValue() {
                    return pasNewCRCValue;
                }
                clinicalResearchCategoryNewValue = retNewCRCValue();
                trialDesign.clickSaveTrialDesign();
                verifyCurrentCRC(clinicalResearchCategoryNewValue, "Verifying Clinical Research Category Selected Value from the list");
            }
            if (clinicalResearchCategoryValue === optionC) {
                trialDesign.selectClinicalResearchCategory(optionD);
                helper.wait_for(6000);
                var pasNewCRCValue = optionD; //Ancillary Correlative
                function retNewCRCValue() {
                    return pasNewCRCValue;
                }
                clinicalResearchCategoryNewValue = retNewCRCValue();
                trialDesign.clickSaveTrialDesign();
                verifyCurrentCRC(clinicalResearchCategoryNewValue, "Verifying Clinical Research Category Selected Value from the list");
            }
            if (clinicalResearchCategoryValue === optionD) {
                trialDesign.selectClinicalResearchCategory(optionA);
                helper.wait_for(6000);
                var pasNewCRCValue = optionA; //Interventional
                function retNewCRCValue() {
                    return pasNewCRCValue;
                }
                clinicalResearchCategoryNewValue = retNewCRCValue();
                trialDesign.clickSaveTrialDesign();
                verifyCurrentCRC(clinicalResearchCategoryNewValue, "Verifying Clinical Research Category Selected Value from the list");
            }

            function verifyCurrentCRC(expectCRC, errorMessage) {
                helper.getVerifyListValue(trialDesign.researchCategoryLst, expectCRC, errorMessage);
            }
        });
    });

    /*
     Scenario:#1a Fields displayed when Clinical Research Category is set to "Interventional" or "Expanded Access"
     Given I am on the Trial Design Screen
     When the Clinical Research Category Selected type is
     |Interventional|
     |Expanded Access|
     Then the Trial Design Fields below will be displayed

     |Clinical Research Category (Interventional, Expanded Access)|
     |Primary Purpose|
     |Secondary Purpose|
     |Trial Phase|
     |Is this a pilot?|
     |Intervention Model|
     |Masking|
     |Allocation|
     |Study Classification|
     |Number of Arms/Groups|
     |Target Enrollment|
     |Final Enrollment for CT.gov|
     |Accruals|
     */

    this.Given(/^I am on the Trial Design Screen$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.alertMsgOK();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            commonFunctions.alertMsgOK();
            pageMenu.clickSearchTrialAbstractor();
            login.clickWriteMode('On');
            pageMenu.clickTrials();
            pageMenu.clickSearchTrialsPA();
            helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.clickLinkText(leadProtocolID);
            leftNav.scientificCheckOut();
            leftNav.clickScientificTrialDesign();
            leftNav.checkPanelTitle(pageTtitle, '6');
        });
    });

    this.When(/^the Clinical Research Category Selected type is$/, function (table) {
        return browser.sleep(25).then(function() {
            var clinicalRCVal = table.raw();
            optionCRCValues = clinicalRCVal.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + optionCRCValues +']');
            var optionCRC = optionCRCValues.toString().split("\n");
            optionA = optionCRC[0]; //Interventional or Observational
            optionB = optionCRC[1]; //Expanded Access or Ancillary Correlative
        });
    });

    this.Then(/^the Trial Design Fields below will be displayed$/, function (table) {
        return browser.sleep(25).then(function() {
            var fieldsTDsgn = table.raw();
            fieldsOptions = fieldsTDsgn.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + fieldsOptions +']');
            var tdFiledsList = fieldsOptions.toString().split("\n");
            crcFld = tdFiledsList[0];
            var crcValSplit = crcFld.toString().split(" (");
            if (optionA === 'Interventional'){
                fieldA = crcValSplit[0];  //Clinical Research Category
                fieldB = tdFiledsList[2]; //Primary Purpose
                fieldC = tdFiledsList[3]; //Secondary Purpose
                fieldD = tdFiledsList[4]; //Trial Phase
                fieldE = tdFiledsList[5]; //Is this a pilot?
                fieldF = tdFiledsList[6]; //Intervention Model
                fieldG = tdFiledsList[7]; //Masking
                fieldH = tdFiledsList[8]; //Allocation
                fieldI = tdFiledsList[9]; //Study Classification
                fieldJ = tdFiledsList[10]; //Number of Arms/Groups
                fieldK = tdFiledsList[11]; //Target Enrollment
                fieldL = tdFiledsList[12]; //Final Enrollment for CT.gov
                fieldM = tdFiledsList[13]; //Accruals
            } else {
                fieldA = crcValSplit[0];  //Clinical Research Category
                fieldB = tdFiledsList[2]; //Primary Purpose
                fieldC = tdFiledsList[3]; //Trial Phase
                fieldD = tdFiledsList[4]; //Is this a pilot?
                fieldE = tdFiledsList[5]; //Study Model
                fieldF = tdFiledsList[6]; //Time Perspective
                fieldG = tdFiledsList[7]; //Bio-specimen Retention
                fieldH = tdFiledsList[8]; //Bio-specimen Description
                fieldI = tdFiledsList[9]; //Number of Arms/Groups
                fieldJ = tdFiledsList[10]; //Target Enrollment
                fieldK = tdFiledsList[11]; //Final Enrollment for CT.gov
                fieldL = tdFiledsList[12]; //Accruals
            }
            trialDesign.researchCategoryLst.$('option:checked').getText().then(function (value) {
                var crntCRCValue = '' + value + '';
                //Interventional
                if (crntCRCValue === 'Interventional' && optionA === 'Interventional'){
                    console.log('Test 1');
                    console.log('System Identified [' + optionA + '] as the current Clinical Research Category value');
                    verifyTrlDsgnInterOrExpndAcs();
                } else if (crntCRCValue !== 'Interventional' && optionA === 'Interventional'){
                    console.log('Test 2');
                    trialDesign.selectClinicalResearchCategory(optionA);
                    verifyTrlDsgnInterOrExpndAcs();
                }
                //Expanded Access
                if (crntCRCValue === 'Expanded Access' && optionB === 'Expanded Access'){
                    console.log('Test 3');
                    console.log('System Identified [' + optionB + '] as the current Clinical Research Category value');
                    verifyTrlDsgnInterOrExpndAcs();
                } else if (crntCRCValue !== 'Expanded Access' && optionB === 'Expanded Access'){
                    console.log('Test 4');
                    trialDesign.selectClinicalResearchCategory(optionB);
                    verifyTrlDsgnInterOrExpndAcs();
                }
                //Observational
                if (crntCRCValue === 'Observational' && optionA === 'Observational'){
                    console.log('Test 5');
                    console.log('System Identified [' + optionA + '] as the current Clinical Research Category value');
                    verifyTrlDsgnObserOrAncillary();
                } else if (crntCRCValue !== 'Observational' && optionA === 'Observational'){
                    console.log('Test 6');
                    trialDesign.selectClinicalResearchCategory(optionA);
                    verifyTrlDsgnObserOrAncillary();
                }
                //Ancillary Correlative
                if (crntCRCValue === 'Ancillary Correlative' && optionB === 'Ancillary Correlative'){
                    console.log('Test 7');
                    console.log('System Identified [' + optionB + '] as the current Clinical Research Category value');
                    verifyTrlDsgnObserOrAncillary();
                } else if (crntCRCValue !== 'Ancillary Correlative' && optionB === 'Ancillary Correlative'){
                    console.log('Test 8');
                    trialDesign.selectClinicalResearchCategory(optionB);
                    verifyTrlDsgnObserOrAncillary();
                }
            });
            //Ancillary Correlative
            function verifyTrlDsgnInterOrExpndAcs (){
                helper.getVerifyLabel(trialDesign.clinicalResearchCategoryLbl, fieldA+":", "Verifying Clinical Research Category field");
                helper.verifyElementDisplayed(trialDesign.researchCategoryLst, true);
                helper.getVerifyLabel(trialDesign.primaryPurposeLbl, fieldB+":", "Verifying Primary Purpose field");
                helper.verifyElementDisplayed(trialDesign.primaryPurposeLst, true);
                helper.getVerifyLabel(trialDesign.secondaryPurposeLbl, fieldC+":", "Verifying Secondary Purpose field");
                helper.verifyElementDisplayed(trialDesign.secondaryPurposeLst, true);
                helper.getVerifyLabel(trialDesign.trialPhaseLbl, fieldD+":", "Verifying Trial Phase field");
                helper.verifyElementDisplayed(trialDesign.trialPhaseLst, true);
                helper.getVerifyLabel(trialDesign.isThisAPilotLbl, fieldE+":", "Verifying Is this a pilot field");
                helper.verifyElementDisplayed(trialDesign.isThisAPilotYes, true);
                helper.verifyElementDisplayed(trialDesign.isThisAPilotNo, true);
                helper.getVerifyLabel(trialDesign.interventionModelLbl, fieldF+":", "Verifying Intervention Model field");
                helper.verifyElementDisplayed(trialDesign.interventionModelLst, true);
                helper.getVerifyLabel(trialDesign.maskingLbl, fieldG+":", "Verifying Masking field");
                helper.verifyElementDisplayed(trialDesign.maskingLst, true);
                helper.getVerifyLabel(trialDesign.allocationLbl, fieldH+":", "Verifying Allocation field");
                helper.verifyElementDisplayed(trialDesign.allocationLst, true);
                helper.getVerifyLabel(trialDesign.studyClassificationLbl, fieldI+":", "Verifying Study Classification field");
                helper.verifyElementDisplayed(trialDesign.studyClassficationLst, true);
                helper.getVerifyLabel(trialDesign.numberOfArmsLbl, fieldJ+":", "Verifying Number of Arms/Group field");
                helper.verifyElementDisplayed(trialDesign.numberOfArmsTxt, true);
                helper.getVerifyLabel(trialDesign.targetEnrollmentLbl, fieldK+":", "Verifying Target Enrollment field");
                helper.verifyElementDisplayed(trialDesign.targetEnrollmentTxt, true);
                helper.getVerifyLabel(trialDesign.finalEnrollmentLbl, fieldL+":", "Verifying Final enrollment for CT.gov field");
                helper.verifyElementDisplayed(trialDesign.finalEnrollmentTxt, true);
                helper.getVerifyLabel(trialDesign.accrualsLbl, fieldM+":", "Verifying Accruals field");
                helper.verifyElementDisplayed(trialDesign.accrualsView, true);
            }
            function verifyTrlDsgnObserOrAncillary (){
                helper.getVerifyLabel(trialDesign.clinicalResearchCategoryLbl, fieldA+":", "Verifying Clinical Research Category field");
                helper.verifyElementDisplayed(trialDesign.researchCategoryLst, true);
                helper.getVerifyLabel(trialDesign.primaryPurposeLbl, fieldB+":", "Verifying Primary Purpose field");
                helper.verifyElementDisplayed(trialDesign.primaryPurposeLst, true);
                helper.getVerifyLabel(trialDesign.trialPhaseLbl, fieldC+":", "Verifying Secondary Purpose field");
                helper.verifyElementDisplayed(trialDesign.trialPhaseLst, true);
                helper.getVerifyLabel(trialDesign.isThisAPilotLbl, fieldD+":", "Verifying Is this a pilot field");
                helper.verifyElementDisplayed(trialDesign.isThisAPilotYes, true);
                helper.verifyElementDisplayed(trialDesign.isThisAPilotNo, true);
                helper.getVerifyLabel(trialDesign.studyModelLbl, fieldE+":", "Verifying Study Model field");
                helper.verifyElementDisplayed(trialDesign.studyModelLst, true);
                helper.getVerifyLabel(trialDesign.timePerspectiveLbl, fieldF+":", "Verifying Time Perspective field");
                helper.verifyElementDisplayed(trialDesign.timePerspectiveLst, true);
                helper.getVerifyLabel(trialDesign.bioSpecimenRetentionLbl, fieldG+":", "Verifying Bio-specimen Retention field");
                helper.verifyElementDisplayed(trialDesign.bioSpecimenRetentionLst, true);
                helper.getVerifyLabel(trialDesign.bioSpecimenDescriptionLbl, fieldH+":", "Verifying Bio-specimen Description field");
                helper.verifyElementDisplayed(trialDesign.bioSpecimenDescriptionTxt, true);
                helper.getVerifyLabel(trialDesign.numberOfArmsLbl, fieldI+":", "Verifying Number of Arms/Group field");
                helper.verifyElementDisplayed(trialDesign.numberOfArmsTxt, true);
                helper.getVerifyLabel(trialDesign.targetEnrollmentLbl, fieldJ+":", "Verifying Target Enrollment field");
                helper.verifyElementDisplayed(trialDesign.targetEnrollmentTxt, true);
                helper.getVerifyLabel(trialDesign.finalEnrollmentLbl, fieldK+":", "Verifying Final enrollment for CT.gov field");
                helper.verifyElementDisplayed(trialDesign.finalEnrollmentTxt, true);
                helper.getVerifyLabel(trialDesign.accrualsLbl, fieldL+":", "Verifying Accruals field");
                helper.verifyElementDisplayed(trialDesign.accrualsView, true);
            }
        });
    });

    /*
     Scenario:#1c Fields displayed when Clinical Research Category is set to "Observational" or "Ancillary Correlative"
     Given I am on the Trial Design Screen
     When the Clinical Research Category Selected type is
     |Observational|
     |Ancillary Correlative|
     Then the Trial Design Fields below will be displayed

     |Clinical Research Category (Observational, Ancillary Correlative)|
     |Primary Purpose|
     |Trial Phase|
     |Is this a pilot?|
     |Study Model|
     |Time Perspective|
     |Bio-Specimen Retention|
     |Bio-Specimen Description|
     |Number of Arms/Groups|
     |Target Enrollment|
     |Final Enrollment for CT.gov|
     |Accruals|
     */

    // Covered in previous step defination

    /*
     Scenario: #2 I can add and edit trial design for an Interventional Clinical Research Category trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am at the Trial Design screen
     And the Clinical Research Category value

     |Interventional|
     |Expanded Access|

     And I can select a different value for Primary Purpose type
     |Primary Purpose          |
     |Treatment                |
     |Prevention               |
     |Supportive Care          |
     |Screening                |
     |Diagnostic               |
     |Health Services Research |
     |Basic Science            |
     |Other                    |
     And I can select a different value for Secondary Purpose Type:
     |Secondary Purpose Type |
     |Ancillary-Correlative  |
     |Other                  |
     |No                     |
     And I can select a different value for Trial Phase type:
     |Trial Phase |
     |0           |
     |I           |
     |I/II        |
     |II          |
     |II/III      |
     |III         |
     |IV          |
     |NA          |
     And I can select a different value for the question"Is this a pilot" type
     |Is this a pilot |
     |yes             |
     |no              |
     And I can select a value for Intervention Model type
     |Intervention Model |
     |Single Group Assignment|
     |Parallel Assignment |
     |Crossover Assignment|
     |Factorial Assignment|
     And I can add or edit a value for Number of Arms/Groups
     And I can select a value for Masking:
     |Masking      |
     |Open Label   |
     |Single Blind |
     |Double Blind |
     And I can select a value for Allocation:
     |Allocation                  |
     |Randomized |
     |Non-Randomized        |
     |N/A                          |
     And I can select a value for Study Classification:
     |Study Classification              |
     |Safety Study                      |
     |Safety/Efficacy Study             |
     |Efficacy Study                    |
     |Bio-equivalence Study                    |
     |Bio-availability Study   |
     |Pharmacokinetics Study                  |
     |Pharmacodynamics Study                  |
     |Pharmacokinetics/dynamics Study |
     |N/A                                |
     And I can add or edit a value for Target Enrollment
     And I can add or edit a value for Final Enrollment for ClinicalTrials.gov
     And the value of Accruals will be displayed
     When When I select Save at the trial design screen
     Then the Interventional Trial Design for the trial will be associated with the trial
     And the message Record Updated displays
     */

    this.Given(/^I am at the Trial Design screen$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.alertMsgOK();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            commonFunctions.alertMsgOK();
            pageMenu.clickSearchTrialAbstractor();
            login.clickWriteMode('On');
            pageMenu.clickTrials();
            pageMenu.clickSearchTrialsPA();
            helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.clickLinkText(leadProtocolID);
            leftNav.scientificCheckOut();
            leftNav.clickScientificTrialDesign();
            leftNav.checkPanelTitle(pageTtitle, '6');
        });
    });

    this.Given(/^the Clinical Research Category value$/, function (table) {
        return browser.sleep(25).then(function() {
            var crcInExmTbl = table.raw();
            crcOptions = crcInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + crcOptions +']');
            var crcList = crcOptions.toString().split("\n");
            crcA = crcList[1]; // Interventional
            crcB = crcList[2]; // Expanded Access
            trialDesign.selectClinicalResearchCategory(crcA);
        });
    });

    this.Given(/^I can select a different value for Primary Purpose type$/, function (table) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can select a different value for Secondary Purpose Type:$/, function (table) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can select a different value for Trial Phase type:$/, function (table) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can select a different value for the question"([^"]*)" type$/, function (arg1, table) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can select a value for Intervention Model type$/, function (table) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can add or edit a value for Number of Arms\/Groups$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can select a value for Masking:$/, function (table) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can select a value for Allocation:$/, function (table) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can select a value for Study Classification:$/, function (table) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can add or edit a value for Target Enrollment$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I can add or edit a value for Final Enrollment for ClinicalTrials\.gov$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^the value of Accruals will be displayed$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.When(/^When I select Save at the trial design screen$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^the Interventional Trial Design for the trial will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {

        });
    });



};
