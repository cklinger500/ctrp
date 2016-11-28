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
//Common Message
var abstractionCommomMsg = require('../support/abstractionCommonMessage');
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
    var commonMsg = new abstractionCommomMsg();
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
    var trialPhaseID = 'trial_phase';
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
    var vfClnclRsrchCategryValue = '';
    var vfPrmryPrpsValue = '';
    var vfSecndryPrpsValue = '';
    var vfTrialPhaseValue = '';
    var vfIsThisAPilotValue = '';
    var vfInterventionalModelValue = '';
    var vfStudyModelValue = '';
    var vfTimePerspectiveValue = '';
    var vfbiospecimenRetentionValue = '';
    var descriptionBio = 'Test Description '+ Date.now();
    var prPrpsOtherDesc = 'Test Description of Other Primary Purpose'+ Date.now();
    var scndryPrpsOtherDesc = 'Test Description of Other Secondary Purpose'+ Date.now();
    var studyModalOtherDesc = 'Test Description of Other Study Model'+ Date.now();
    var timePerspectiveOtherDesc = 'Test Description of Other time perspective '+ Date.now();
    var vfNmbrOfArmsGrpValue = '';
    var vfMaskingValue = '';
    var vfAllocationValue = '';
    var vfClassificationValue = '';
    var vfTargetEnrollmentValue = '';
    var vfClinicalTrialsValue = '';
    var vfAccrualsValue = '';
    var maskingA = '';
    var maskingB = '';
    var maksingRolesA = 'Subject';
    var maksingRolesB = 'Investigator';
    var maksingRolesC = 'Caregiver';
    var maksingRolesD = 'Outcomes Assessor';
    var crcListValueA = 'Interventional';
    var crcListValueB = 'Expanded Access';
    var crcListValueC = 'Observational';
    var crcListValueD = 'Ancillary Correlative';
    var slctValStudyMdl = 'Cohort';
    var prmPrpsSlctVal = 'Supportive Care';
    var secondryPurposeSlctVal = 'Ancillary-Correlative';
    var trialPhaseSlctVal = 'IV';
    var pilotSlctVal = 'Yes';
    var interventionModelSlctVal = 'Single Group Assignment';
    var maskingSlctVal = 'Open Label';
    var allocationSlctVal = 'Randomized';
    var numberOfArmsGrpSlctVal = '1';
    var targetEnrollmentSlctVal = '1';


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
            leftNav.scientificTrialDesign.isPresent().then(function (value) {
                console.log('Current Trial Design button status: '+value+ '');
                if (value === true) {
                    commonFunctions.alertMsgOK();
                    leftNav.clickScientificTrialDesign();
                    commonFunctions.alertMsgOK();
                    leftNav.checkPanelTitle(pageTtitle, '6');
                } else if (value === false) {
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
                }
            });
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
            vfClnclRsrchCategryValue = crcA;
        });
    });

    this.Given(/^I can select a different value for Primary Purpose type$/, function (table) {
        return browser.sleep(25).then(function() {
            var prmryPrpsInExmTbl = table.raw();
            prmryPrpsOptions = prmryPrpsInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + prmryPrpsOptions +']');
            var prmryPrpsList = prmryPrpsOptions.toString().split("\n");
            prmryPrpsA = prmryPrpsList[1]; // Treatment
            prmryPrpsB = prmryPrpsList[2]; // Prevention
            prmryPrpsC = prmryPrpsList[3]; // Supportive Care
            prmryPrpsD = prmryPrpsList[4]; // Screening
            prmryPrpsE = prmryPrpsList[5]; // Diagnostic
            prmryPrpsF = prmryPrpsList[6]; // Health Services Research
            prmryPrpsG = prmryPrpsList[7]; // Basic Science
            prmryPrpsH = prmryPrpsList[8]; // Other
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntPrmryPrpsValue = '' + value + '';
                if (crntPrmryPrpsValue === 'Treatment'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsB);
                    vfPrmryPrpsValue = prmryPrpsB;
                } else if (crntPrmryPrpsValue === 'Prevention'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsC);
                    vfPrmryPrpsValue = prmryPrpsC;
                } else if (crntPrmryPrpsValue === 'Supportive Care'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsD);
                    vfPrmryPrpsValue = prmryPrpsD;
                } else if (crntPrmryPrpsValue === 'Screening'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsE);
                    vfPrmryPrpsValue = prmryPrpsE;
                } else if (crntPrmryPrpsValue === 'Diagnostic'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsF);
                    vfPrmryPrpsValue = prmryPrpsF;
                } else if (crntPrmryPrpsValue === 'Health Services Research'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsG);
                    vfPrmryPrpsValue = prmryPrpsG;
                } else if (crntPrmryPrpsValue === 'Basic Science'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else if (crntPrmryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else {
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                }
            });
        });
    });

    this.Given(/^I can select a different value for Secondary Purpose Type:$/, function (table) {
        return browser.sleep(25).then(function() {
            var scndryPrpsInExmTbl = table.raw();
            scndryPrpsOptions = scndryPrpsInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + scndryPrpsOptions +']');
            var scndryPrpsList = scndryPrpsOptions.toString().split("\n");
            scndryPrpsA = scndryPrpsList[1]; // Ancillary-Correlative
            scndryPrpsB = scndryPrpsList[2]; // Other
            trialDesign.secondaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntscndryPrpsValue = '' + value + '';
                if (crntscndryPrpsValue === 'Ancillary-Correlative'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsB);
                    trialDesign.setSecondaryOtherDescription('Test Description of Other Secondary Purpose');
                    vfSecndryPrpsValue = scndryPrpsB;
                } else if (crntscndryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsA);
                    vfSecndryPrpsValue = scndryPrpsA;
                } else {
                    trialDesign.selectSecondaryPurpose(scndryPrpsA);
                    vfSecndryPrpsValue = scndryPrpsA;
                }
            });
        });
    });

    this.Given(/^I can select a different value for Trial Phase type:$/, function (table) {
        return browser.sleep(25).then(function() {
            var trialPhseInExmTbl = table.raw();
            trialPhseOptions = trialPhseInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + trialPhseOptions +']');
            var trialPhseList = trialPhseOptions.toString().split("\n");
            trialPhseA = trialPhseList[1]; // 0
            trialPhseB = trialPhseList[2]; // I
            trialPhseC = trialPhseList[3]; // I/II
            trialPhseD = trialPhseList[4]; // II
            trialPhseE = trialPhseList[5]; // II/III
            trialPhseF = trialPhseList[6]; // III
            trialPhseG = trialPhseList[7]; // IV
            trialPhseH = trialPhseList[8]; // NA
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crnttrialPhseValue = '' + value + '';
                if (crnttrialPhseValue === '0'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseB);
                    vfTrialPhaseValue = trialPhseB;
                } else if (crnttrialPhseValue === 'I'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'I/II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II/III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'IV'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseH);
                    vfTrialPhaseValue = trialPhseH;
                } else if (crnttrialPhseValue === 'NA'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else {
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                }
            });
        });
    });

    this.Given(/^I can select a different value for the question"([^"]*)" type$/, function (arg1, table) {
        return browser.sleep(25).then(function() {
            var pilotInExmTbl = table.raw();
            pilotOptions = pilotInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + pilotOptions +']');
            var pilotList = pilotOptions.toString().split("\n");
            pilotA = pilotList[1]; // Yes
            pilotB = pilotList[2]; // No
            yesVal = '0';
            noVal = '1';
            trialDesign.isThisAPilot.get(yesVal).isSelected().then(function (value){
                console.log('Radio button current selection value is: '+value +'');
                if (value === false){
                    helper.clickRadioButton(trialDesign.isThisAPilot, yesVal, 'Selecting '+ pilotA +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '0', true);
                } else {
                    helper.clickRadioButton(trialDesign.isThisAPilot, noVal, 'Selecting '+ pilotB +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '1', true);
                }
            });
        });
    });

    this.Given(/^I can select a value for Intervention Model type$/, function (table) {
        return browser.sleep(25).then(function() {
            var intrvntnMdlInExmTbl = table.raw();
            intrvntnMdlOptions = intrvntnMdlInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + intrvntnMdlOptions +']');
            var intrvntnMdlList = intrvntnMdlOptions.toString().split("\n");
            intrvntnMdlA = intrvntnMdlList[1]; // Single Group Assignment
            intrvntnMdlB = intrvntnMdlList[2]; // Parallel Assignment
            intrvntnMdlC = intrvntnMdlList[3]; // Crossover Assignment
            intrvntnMdlD = intrvntnMdlList[4]; // Factorial Assignment
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntintrvntnMdlValue = '' + value + '';
                if (crntintrvntnMdlValue === 'Single Group Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlB);
                    vfInterventionalModelValue = intrvntnMdlB;
                } else if (crntintrvntnMdlValue === 'Parallel Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlC);
                    vfInterventionalModelValue = intrvntnMdlC;
                } else if (crntintrvntnMdlValue === 'Crossover Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlD);
                    vfInterventionalModelValue = intrvntnMdlD;
                } else if (crntintrvntnMdlValue === 'Factorial Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlA);
                    vfInterventionalModelValue = intrvntnMdlA;
                } else {
                    trialDesign.selectInterventionalModel(intrvntnMdlA);
                    vfInterventionalModelValue = intrvntnMdlA;
                }
            });
        });
    });

    this.Given(/^I can add or edit a value for Number of Arms\/Groups$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.numberOfArmsTxt.getText().then(function (value) {
               if (value === '0'){
                   trialDesign.setNumberOfArmsGroups('1');
                   commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                   vfNmbrOfArmsGrpValue = '1';
               } else if (value === '1'){
                   trialDesign.setNumberOfArmsGroups('2');
                   commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '2');
                   vfNmbrOfArmsGrpValue = '2';
               } else if (value === '2'){
                   trialDesign.setNumberOfArmsGroups('1');
                   commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                   vfNmbrOfArmsGrpValue = '1';
               } else {
                   trialDesign.setNumberOfArmsGroups('1');
                   commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                   vfNmbrOfArmsGrpValue = '1';
               }
            });
        });
    });

    this.Given(/^I can select a value for Masking:$/, function (table) {
        return browser.sleep(25).then(function() {
            var mskngInExmTbl = table.raw();
            mskngOptions = mskngInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + mskngOptions +']');
            var mskngList = mskngOptions.toString().split("\n");
            mskngA = mskngList[1]; // Open Label
            mskngB = mskngList[2]; // Single Blind
            mskngC = mskngList[3]; // Double Blind
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntmskngValue = '' + value + '';
                if (crntmskngValue === 'Open Label'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngB);
                    vfMaskingValue = mskngB;
                } else if (crntmskngValue === 'Single Blind'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngC);
                    vfMaskingValue = mskngC;
                } else if (crntmskngValue === 'Double Blind'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngA);
                    vfMaskingValue = mskngA;
                } else {
                    trialDesign.selectMasking(mskngA);
                    vfMaskingValue = mskngA;
                }
            });
        });
    });

    this.Given(/^I can select a value for Allocation:$/, function (table) {
        return browser.sleep(25).then(function() {
            var alloctnInExmTbl = table.raw();
            alloctnOptions = alloctnInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + alloctnOptions +']');
            var alloctnList = alloctnOptions.toString().split("\n");
            alloctnA = alloctnList[1]; // Randomized
            alloctnB = alloctnList[2]; // Non-Randomized
            alloctnC = alloctnList[3]; // N/A
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntalloctnValue = '' + value + '';
                if (crntalloctnValue === 'Randomized'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnB);
                    vfAllocationValue = alloctnB;
                } else if (crntalloctnValue === 'Non-Randomized'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnC);
                    vfAllocationValue = alloctnA;
                } else if (crntalloctnValue === 'N/A'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnA);
                    vfAllocationValue = alloctnA;
                } else {
                    trialDesign.selectAllocation(alloctnA);
                    vfAllocationValue = alloctnA;
                }
            });
        });
    });

    this.Given(/^I can select a value for Study Classification:$/, function (table) {
        return browser.sleep(25).then(function() {
            var stdyClassfctnInExmTbl = table.raw();
            stdyClassfctnOptions = stdyClassfctnInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + stdyClassfctnOptions +']');
            var stdyClassfctnList = stdyClassfctnOptions.toString().split("\n");
            stdyClassfctnA = stdyClassfctnList[1]; // Safety Study
            stdyClassfctnB = stdyClassfctnList[2]; // Safety/Efficacy Study
            stdyClassfctnC = stdyClassfctnList[3]; // Efficacy Study
            stdyClassfctnD = stdyClassfctnList[4]; // Bio-equivalence Study
            stdyClassfctnE = stdyClassfctnList[5]; // Bio-availability Study
            stdyClassfctnF = stdyClassfctnList[6]; // Pharmacokinetics Study
            stdyClassfctnG = stdyClassfctnList[7]; // Pharmacodynamics Study
            stdyClassfctnH = stdyClassfctnList[8]; // Pharmacokinetics/dynamics Study
            stdyClassfctnI = stdyClassfctnList[9]; // N/A
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crntstdyClassfctnValue = '' + value + '';
                if (crntstdyClassfctnValue === 'Safety Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnB);
                    vfClassificationValue = stdyClassfctnB;
                } else if (crntstdyClassfctnValue === 'Safety/Efficacy Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnC);
                    vfClassificationValue = stdyClassfctnC;
                } else if (crntstdyClassfctnValue === 'Efficacy Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnD);
                    vfClassificationValue = stdyClassfctnD;
                } else if (crntstdyClassfctnValue === 'Bio-equivalence Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnE);
                    vfClassificationValue = stdyClassfctnE;
                } else if (crntstdyClassfctnValue === 'Bio-availability Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnF);
                    vfClassificationValue = stdyClassfctnF;
                } else if (crntstdyClassfctnValue === 'Pharmacokinetics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnG);
                    vfClassificationValue = stdyClassfctnG;
                } else if (crntstdyClassfctnValue === 'Pharmacodynamics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else if (crntstdyClassfctnValue === 'Pharmacokinetics/dynamics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else if (crntstdyClassfctnValue === 'N/A'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else {
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                }
            });
        });
    });

    this.Given(/^I can add or edit a value for Target Enrollment$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.targetEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                    vfTargetEnrollmentValue = '1';
                } else if (value === '1'){
                    trialDesign.setTargetEnrollment('2');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '2');
                    vfTargetEnrollmentValue = '2';
                } else if (value === '2'){
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                    vfTargetEnrollmentValue = '1';
                } else {
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                    vfTargetEnrollmentValue = '1';
                }
            });
        });
    });

    this.Given(/^I can add or edit a value for Final Enrollment for ClinicalTrials\.gov$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.finalEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                    vfClinicalTrialsValue = '1';
                } else if (value === '1'){
                    trialDesign.setFinalEnrollmentForCT('2');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '2');
                    vfClinicalTrialsValue = '2';
                } else if (value === '2'){
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                    vfClinicalTrialsValue = '1';
                } else {
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                    vfClinicalTrialsValue = '1';
                }
            });
        });
    });

    this.Given(/^the value of Accruals will be displayed$/, function () {
        return browser.sleep(25).then(function() {
            //expect(trialHome.homeRegisterTrial.isDisplayed()).to.eventually.equal(false);
            trialDesign.accrualsView.isDisplayed().then(function (value){
                if(value === true){
                    expect(trialDesign.accrualsView.isDisplayed()).to.eventually.equal(true);
                } else {
                    expect(trialDesign.accrualsView.isDisplayed()).to.eventually.equal(false);
                }
                trialDesign.accrualsView.getText().then(function (txtVal){
                    if (txtVal.length >= 0 ) {
                        console.log('Current Accruals Value:'+ txtVal +'');
                        accrualsExpVal = 'Value should be '+ txtVal +' or grater';
                        accrualsActVal = 'Value should be '+ txtVal +' or grater';
                        expect(accrualsExpVal.toString()).to.eql(accrualsActVal.toString());
                    } else {
                        console.log('Current Accruals Value:'+ txtVal +'');
                        accrualsExpVal = 'Value should be 0 or grater';
                        accrualsActVal = 'Value: '+ txtVal +'';
                        expect(accrualsExpVal.toString()).to.eql(accrualsActVal.toString());
                    }
                });
            });
        });
    });

    this.When(/^When I select Save at the trial design screen$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.clickSaveTrialDesign();
        });
    });

    this.Then(/^the Interventional Trial Design for the trial will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.verifyListFieldValue(trialDesign.researchCategoryLst, vfClnclRsrchCategryValue);
            commonFunctions.verifyListFieldValue(trialDesign.primaryPurposeLst, vfPrmryPrpsValue);
            commonFunctions.verifyListFieldValue(trialDesign.secondaryPurposeLst, vfSecndryPrpsValue);
            commonFunctions.verifyListFieldValue(trialDesign.trialPhaseLst, vfTrialPhaseValue);
            commonFunctions.verifyListFieldValue(trialDesign.interventionModelLst, vfInterventionalModelValue);
            commonFunctions.verifyListFieldValue(trialDesign.maskingLst, vfMaskingValue);
            commonFunctions.verifyListFieldValue(trialDesign.allocationLst, vfAllocationValue);
            commonFunctions.verifyListFieldValue(trialDesign.studyClassficationLst, vfClassificationValue);
            commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, vfNmbrOfArmsGrpValue);
            commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, vfTargetEnrollmentValue);
            commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, vfClinicalTrialsValue);
        });
    });

    /*
     Scenario Outline:#3 Trial Design Interventional Mandatory Fields rules for PROTOCOL Information Source
     Given I am on the Trial Design Screen
     And the Clinical research Category is Interventional
     And the Information Source is 'Protocol'
     When The Trial Design field <TrialDesignField> is not entered
     And I select Save at the trial design screen
     Then An error message <TrialDesignErrorMessage> will be displayed

     Examples:
     |TrialDesignField          |TrialDesignErrorMessage           |
     |Primary Purpose           |Primary Purpose is Required       |
     |Trial Phase               |Trial Phase is Required           |
     |Intervention Model        |Intervention Model is Required    |
     |Number of Arms/Groups     |Number of Arms/Groups is Required |
     |Masking                   |Masking is Required               |
     |Allocation                |Allocation is Required            |
     |Target Enrollment         |Target Enrollment is Required     |
     */

    this.Given(/^the Clinical research Category is Interventional$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.selectClinicalResearchCategory('Interventional');
            trialDesign.selectPrimaryPurpose(prmPrpsSlctVal);
            trialDesign.selectTrialPhase(trialPhaseSlctVal);
            trialDesign.selectInterventionalModel(interventionModelSlctVal);
            trialDesign.selectMasking(maskingSlctVal);
            trialDesign.selectAllocation(allocationSlctVal);
            trialDesign.setNumberOfArmsGroups(numberOfArmsGrpSlctVal);
            trialDesign.setTargetEnrollment(targetEnrollmentSlctVal);
        });
    });

    this.Given(/^the Information Source is 'Protocol'$/, function () {
        return browser.sleep(25).then(function() {
            expSourceVal = 'Protocol';
            checkInformationSource = 'Information Source: '+expSourceVal+'';
            associated.verifyTrialOverview('13', checkInformationSource);
        });
    });

    this.When(/^The Trial Design field (.*) is not entered$/, function (TrialDesignField) {
        //prmPrpsSlctVal
        //secondryPurposeSlctVal
        //trialPhaseSlctVal
        //pilotSlctVal
        //interventionModelSlctVal
        //maskingSlctVal
        //allocationSlctVal
        //numberOfArmsGrpSlctVal
        //targetEnrollmentSlctVal
        return browser.sleep(25).then(function() {
            if (TrialDesignField === 'Primary Purpose'){
                var selectValPrimaryPurpose = '- Please select a primary purpose...';
                trialDesign.selectPrimaryPurpose(selectValPrimaryPurpose);
            } else if (TrialDesignField === 'Trial Phase'){
                var selectValTP = '- Please select a trial phase...';
                trialDesign.selectTrialPhase(selectValTP);
            } else if (TrialDesignField === 'Intervention Model'){
                var selectValIM = '- Please select an intervention model...';
                trialDesign.selectInterventionalModel(selectValIM);
            } else if (TrialDesignField === 'Number of Arms/Groups'){
                //trialDesign.setTargetEnrollment('1');
                trialDesign.setNumberOfArmsGroups('');
            } else if (TrialDesignField === 'Masking') {
                var selectValMskng = '- Please select a masking...';
                trialDesign.selectMasking(selectValMskng);
            } else if (TrialDesignField === 'Study Model'){
                //trialDesign.setNumberOfArmsGroups('1');
                var selectValStdyModel = '- Please select a study model...';
                trialDesign.selectStudyModel(selectValStdyModel);
            } else if (TrialDesignField === 'Time Perspective'){
                //trialDesign.setNumberOfArmsGroups('1');
                trialDesign.selectStudyModel(slctValStudyMdl);
                var selectValTmePrspctv = '- Please select a time perspective...';
                trialDesign.selectTimePerspective(selectValTmePrspctv);
            } else if (TrialDesignField === 'Allocation'){
                var selectValAllctn = '- Please select an allocation...';
                trialDesign.selectAllocation(selectValAllctn);
            } else if (TrialDesignField === 'Target Enrollment'){
                //trialDesign.setNumberOfArmsGroups('1');
                trialDesign.setTargetEnrollment('');
            }
        });
    });

    this.Given(/^I select Save at the trial design screen$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.clickSaveTrialDesign();
        });
    });

    this.Then(/^An error message (.*) will be displayed$/, function (TrialDesignErrorMessage) {
        return browser.sleep(25).then(function() {
            if (TrialDesignErrorMessage === 'Primary Purpose is Required ') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Primary Purpose is Required');
            } else if (TrialDesignErrorMessage === 'Trial Phase is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Trial Phase is Required');
            } else if (TrialDesignErrorMessage === 'Intervention Model is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Intervention Model is Required');
            } else if (TrialDesignErrorMessage === 'Number of Arms/Groups is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Number of Arms/Groups is Required');
            } else if (TrialDesignErrorMessage === 'Masking is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Masking is Required');
            } else if (TrialDesignErrorMessage === 'Allocation is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Allocation is Required');
            } else if (TrialDesignErrorMessage === 'Target Enrollment is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Target Enrollment is Required');
            }
            commonFunctions.alertMsgOK();
        });
    });

    /*
     Scenario Outline:#4 Trial Design Interventional Mandatory Fields rules for IMPORT Information Source
     Given I am on the Trial Design Screen
     And the Clinical research Category is Interventional
     And the Information Source is Import
     When The Trial Design field <TrialDesignField> is not entered
     And I have seleted the save Button
     Then An error message <TrialDesignErrorMessage> will be displayed

     Examples:
     |TrialDesignField          |TrialDesignErrorMessage         |
     |Primary Purpose           |Primary Purpose is Required       |
     |Trial Phase               |Trial Phase is Required           |
     */

    this.Given(/^the Information Source is Import$/, function (callback) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^I have seleted the save Button$/, function (callback) {
        return browser.sleep(25).then(function() {
            trialDesign.clickSaveTrialDesign();
        });
    });

    /*
     Scenario:#5 Masking field Rules
     Given I am on the Trial Design screen
     And the Clinical Research Category is Interventional
     When Masking field selected

     |Single Blind        |
     |Double Blind |

     Then Masking Roles(s) displays
     And a text will be displayed "Even though not mandatory on this screen, failure to select masking role(s) may lead to abstraction validation warnings/errors"
     And I Can check Subject
     And I can check Investigator
     And I can check Caregiver
     And I can check Outcome Assessor
     When When I select Save at the trial design screen
     Then the updated Masking role is associated with the trial
     And the message Record Updated displays
     */

    this.Given(/^the Clinical Research Category is Interventional$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.selectClinicalResearchCategory('Interventional');
        });
    });

    this.When(/^Masking field selected$/, function (table) {
        return browser.sleep(25).then(function() {
            var maskingInExmTbl = table.raw();
            maskingOptions = maskingInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + maskingOptions +']');
            var maskingList = maskingOptions.toString().split("\n");
            maskingA = maskingList[1]; // Single Blind
            maskingB = maskingList[2]; // Double Blind
            trialDesign.selectMasking(maskingA);
        });
    });

    this.Then(/^Masking Roles\(s\) displays$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.verifyMaskingRolesLables('0', maksingRolesA);
            trialDesign.verifyMaskingRolesLables('1', maksingRolesB);
            trialDesign.verifyMaskingRolesLables('2', maksingRolesC);
            trialDesign.verifyMaskingRolesLables('3', maksingRolesD);
            trialDesign.selectMasking('Double Blind');
            trialDesign.verifyMaskingRolesLables('0', maksingRolesA);
            trialDesign.verifyMaskingRolesLables('1', maksingRolesB);
            trialDesign.verifyMaskingRolesLables('2', maksingRolesC);
            trialDesign.verifyMaskingRolesLables('3', maksingRolesD);
        });
    });

    this.Then(/^a text will be displayed "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
            helper.selectCheckBox(trialDesign.maskingRolesSubjectCheck, 'uncheck');
            helper.selectCheckBox(trialDesign.maskingRolesInvestigatorCheck, 'uncheck');
            helper.selectCheckBox(trialDesign.maskingRolesCaregiverCheck, 'uncheck');
            helper.selectCheckBox(trialDesign.maskingRolesOutcomesAssessorCheck, 'uncheck');
            commonFunctions.verifyTxtByIndex(trialDesign.maskingRolesMsg, arg1+'.', '2', 'Verifying Masking Roles Alert Text');
        });
    });

    this.Then(/^I Can check Subject$/, function () {
        return browser.sleep(25).then(function() {
            helper.selectCheckBox(trialDesign.maskingRolesSubjectCheck, 'check');
        });
    });

    this.Then(/^I can check Investigator$/, function () {
        return browser.sleep(25).then(function() {
            helper.selectCheckBox(trialDesign.maskingRolesInvestigatorCheck, 'check');
        });
    });

    this.Then(/^I can check Caregiver$/, function () {
        return browser.sleep(25).then(function() {
            helper.selectCheckBox(trialDesign.maskingRolesCaregiverCheck, 'check');
        });
    });

    this.Then(/^I can check Outcome Assessor$/, function () {
        return browser.sleep(25).then(function() {
            helper.selectCheckBox(trialDesign.maskingRolesOutcomesAssessorCheck, 'check');
        });
    });

    this.Then(/^the updated Masking role is associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            helper.verifyCheckBoxSelection(trialDesign.maskingRolesSubjectCheck, 'check', 'Verifying Subject is checked');
            helper.verifyCheckBoxSelection(trialDesign.maskingRolesInvestigatorCheck, 'check', 'Verifying Investigator is checked');
            helper.verifyCheckBoxSelection(trialDesign.maskingRolesCaregiverCheck, 'check', 'Verifying Caregiver is checked');
            helper.verifyCheckBoxSelection(trialDesign.maskingRolesOutcomesAssessorCheck, 'check', 'Verifying Outcomes Assessor is checked');
        });
    });

    /*
     Scenario: #6 I can add and edit Trial Design for a Observational Clinical Research Category trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Design screen
     And Clinical Research Category is Observational
     And I can select a different value for Primary Purpose
     And I can select a different value for Trial Phase
     And I can select a different value for the question "Is this a pilot"
     And I can select a value for Study Model:
     |Study Model                   |
     |Cohort                        |
     |Case-Control                  |
     |Case-Only                     |
     |Case-Crossover                |
     |Ecologic or Community         |
     |Family-Based                  |
     |Other                         |
     And I can select a value for Time Perspective:
     |Time Perspective |
     |Retrospective    |
     |Prospective      |
     |Cross\sectional  |
     |Other            |
     And I can select a value for Bio-specimen Retention:
     |Biospecimen Retention |
     |None Retained          |
     |Samples with DNA       |
     |Samples Without DNA    |
     And I can enter a value for Bio-Specimen Description
     And I can enter a value for Number of Arms/Groups
     And I can enter a value for Target Enrollment
     And I can enter a value for Final Enrollment for ClinicalTrials.gov
     And the value of Accruals will be displayed
     When I have selected Save
     Then the Observational  trial design is associated with the trial
     And the message Record Updated displays
     */

    this.Given(/^Clinical Research Category is Observational$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.selectClinicalResearchCategory('Observational');
            vfClnclRsrchCategryValue = 'Observational';
        });
    });

    this.Given(/^I can select a different value for Primary Purpose$/, function () {
        return browser.sleep(25).then(function() {
            prmryPrpsA = 'Treatment';
            prmryPrpsB = 'Prevention';
            prmryPrpsC = 'Supportive Care';
            prmryPrpsD = 'Screening';
            prmryPrpsE = 'Diagnostic';
            prmryPrpsF = 'Health Services Research';
            prmryPrpsG = 'Basic Science';
            prmryPrpsH = 'Other';
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntPrmryPrpsValue = '' + value + '';
                if (crntPrmryPrpsValue === 'Treatment'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsB);
                    vfPrmryPrpsValue = prmryPrpsB;
                } else if (crntPrmryPrpsValue === 'Prevention'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsC);
                    vfPrmryPrpsValue = prmryPrpsC;
                } else if (crntPrmryPrpsValue === 'Supportive Care'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsD);
                    vfPrmryPrpsValue = prmryPrpsD;
                } else if (crntPrmryPrpsValue === 'Screening'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsE);
                    vfPrmryPrpsValue = prmryPrpsE;
                } else if (crntPrmryPrpsValue === 'Diagnostic'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsF);
                    vfPrmryPrpsValue = prmryPrpsF;
                } else if (crntPrmryPrpsValue === 'Health Services Research'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsG);
                    vfPrmryPrpsValue = prmryPrpsG;
                } else if (crntPrmryPrpsValue === 'Basic Science'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else if (crntPrmryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else {
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                }
            });
        });
    });

    this.Given(/^I can select a different value for Trial Phase$/, function () {
        return browser.sleep(25).then(function() {
            trialPhseA = '0';
            trialPhseB = 'I';
            trialPhseC = 'I/II';
            trialPhseD = 'II';
            trialPhseE = 'II/III';
            trialPhseF = 'III';
            trialPhseG = 'IV';
            trialPhseH = 'NA';
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crnttrialPhseValue = '' + value + '';
                if (crnttrialPhseValue === '0'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseB);
                    vfTrialPhaseValue = trialPhseB;
                } else if (crnttrialPhseValue === 'I'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'I/II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II/III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'IV'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseH);
                    vfTrialPhaseValue = trialPhseH;
                } else if (crnttrialPhseValue === 'NA'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else {
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                }
            });
        });
    });

    this.Given(/^I can select a different value for the question "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
            pilotA = 'Yes';
            pilotB = 'No';
            yesVal = '0';
            noVal = '1';
            trialDesign.isThisAPilot.get(yesVal).isSelected().then(function (value){
                console.log('Radio button current selection value is: '+value +'');
                if (value === false){
                    helper.clickRadioButton(trialDesign.isThisAPilot, yesVal, 'Selecting '+ pilotA +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '0', true);
                } else {
                    helper.clickRadioButton(trialDesign.isThisAPilot, noVal, 'Selecting '+ pilotB +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '1', true);
                }
            });
        });
    });

    this.Given(/^I can select a value for Study Model:$/, function (table) {
        return browser.sleep(25).then(function() {
            var studyMdlInExmTbl = table.raw();
            studyMdlOptions = studyMdlInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + studyMdlOptions +']');
            var studyMdlList = studyMdlOptions.toString().split("\n");
            studyMdlA = studyMdlList[1]; // Cohort
            studyMdlB = studyMdlList[2]; // Case-Control
            studyMdlC = studyMdlList[3]; // Case-Only
            studyMdlD = studyMdlList[4]; // Case-Crossover
            studyMdlE = studyMdlList[5]; // Ecologic or Community
            studyMdlF = studyMdlList[6]; // Family-Based
            studyMdlG = studyMdlList[7]; // Other
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntstudyMdlValue = '' + value + '';
                if (crntstudyMdlValue === 'Cohort'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlB);
                    vfStudyModelValue = studyMdlB;
                } else if (crntstudyMdlValue === 'Case-Control'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlC);
                    vfStudyModelValue = studyMdlC;
                } else if (crntstudyMdlValue === 'Case-Only'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlD);
                    vfStudyModelValue = studyMdlD;
                } else if (crntstudyMdlValue === 'Case-Crossover'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlE);
                    vfStudyModelValue = studyMdlE;
                } else if (crntstudyMdlValue === 'Ecologic or Community'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlF);
                    vfStudyModelValue = studyMdlF;
                } else if (crntstudyMdlValue === 'Family-Based'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlA);
                    vfStudyModelValue = studyMdlA;
                } else if (crntstudyMdlValue === 'Other'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlA);
                    vfStudyModelValue = studyMdlA;
                } else {
                    trialDesign.selectStudyModel(studyMdlA);
                    vfStudyModelValue = studyMdlA;
                }
            });
        });
    });

    this.Given(/^I can select a value for Time Perspective:$/, function (table) {
        return browser.sleep(25).then(function() {
            var timePrspctvInExmTbl = table.raw();
            timePrspctvOptions = timePrspctvInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + timePrspctvOptions +']');
            var timePrspctvList = timePrspctvOptions.toString().split("\n");
            timePrspctvA = timePrspctvList[1]; // Retrospective
            timePrspctvB = timePrspctvList[2]; // Prospective
            timePrspctvC = timePrspctvList[3]; // Cross sectional
            timePrspctvD = timePrspctvList[4]; // Other
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crnttimePrspctvValue = '' + value + '';
                if (crnttimePrspctvValue === 'Retrospective'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvB);
                    vfTimePerspectiveValue = timePrspctvB;
                } else if (crnttimePrspctvValue === 'Prospective'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvC);
                    vfTimePerspectiveValue = timePrspctvC;
                } else if (crnttimePrspctvValue === 'Cross sectional'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvD);
                    vfTimePerspectiveValue = timePrspctvD;
                } else if (crnttimePrspctvValue === 'Other'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvA);
                    vfTimePerspectiveValue = timePrspctvA;
                } else {
                    trialDesign.selectTimePerspective(timePrspctvA);
                    vfTimePerspectiveValue = timePrspctvA;
                }
            });
        });
    });

    this.Given(/^I can select a value for Bio\-specimen Retention:$/, function (table) {
        return browser.sleep(25).then(function() {
            var biospecimenRtentnInExmTbl = table.raw();
            biospecimenRtentnOptions = biospecimenRtentnInExmTbl.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + biospecimenRtentnOptions +']');
            var biospecimenRtentnList = biospecimenRtentnOptions.toString().split("\n");
            biospecimenRtentnA = biospecimenRtentnList[1]; // None Retained
            biospecimenRtentnB = biospecimenRtentnList[2]; // Samples with DNA
            biospecimenRtentnC = biospecimenRtentnList[3]; // Crossover Assignment
            biospecimenRtentnD = biospecimenRtentnList[4]; // Factorial Assignment
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntbiospecimenRtentnValue = '' + value + '';
                if (crntbiospecimenRtentnValue === 'None Retained'){
                    console.log('System Identified [' + crntbiospecimenRtentnValue + '] as the current Bio-specimen Retention value');
                    trialDesign.selectBioSpecimenRetention(biospecimenRtentnB);
                    vfbiospecimenRetentionValue = biospecimenRtentnB;
                } else if (crntbiospecimenRtentnValue === 'Samples with DNA'){
                    console.log('System Identified [' + crntbiospecimenRtentnValue + '] as the current Bio-specimen Retention value');
                    trialDesign.selectBioSpecimenRetention(biospecimenRtentnC);
                    vfbiospecimenRetentionValue = biospecimenRtentnC;
                } else if (crntbiospecimenRtentnValue === 'Samples Without DNA'){
                    console.log('System Identified [' + crntbiospecimenRtentnValue + '] as the current Bio-specimen Retention value');
                    trialDesign.selectBioSpecimenRetention(biospecimenRtentnD);
                    vfbiospecimenRetentionValue = biospecimenRtentnD;
                } else {
                    trialDesign.selectBioSpecimenRetention(biospecimenRtentnA);
                    vfbiospecimenRetentionValue = biospecimenRtentnA;
                }
            });
        });
    });

    this.Given(/^I can enter a value for Bio\-Specimen Description$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.setBioSpecimenDescription(descriptionBio);
        });
    });

    this.Given(/^I can enter a value for Number of Arms\/Groups$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.numberOfArmsTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                    vfNmbrOfArmsGrpValue = '1';
                } else if (value === '1'){
                    trialDesign.setNumberOfArmsGroups('2');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '2');
                    vfNmbrOfArmsGrpValue = '2';
                } else if (value === '2'){
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                    vfNmbrOfArmsGrpValue = '1';
                } else {
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                    vfNmbrOfArmsGrpValue = '1';
                }
            });
        });
    });

    this.Given(/^I can enter a value for Target Enrollment$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.targetEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                    vfTargetEnrollmentValue = '1';
                } else if (value === '1'){
                    trialDesign.setTargetEnrollment('2');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '2');
                    vfTargetEnrollmentValue = '2';
                } else if (value === '2'){
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                    vfTargetEnrollmentValue = '1';
                } else {
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                    vfTargetEnrollmentValue = '1';
                }
            });
        });
    });

    this.Given(/^I can enter a value for Final Enrollment for ClinicalTrials\.gov$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.finalEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                    vfClinicalTrialsValue = '1';
                } else if (value === '1'){
                    trialDesign.setFinalEnrollmentForCT('2');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '2');
                    vfClinicalTrialsValue = '2';
                } else if (value === '2'){
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                    vfClinicalTrialsValue = '1';
                } else {
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                    vfClinicalTrialsValue = '1';
                }
            });
        });
    });

    this.When(/^I have selected Save$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.clickSaveTrialDesign();
        });
    });

    this.Then(/^the Observational  trial design is associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.verifyListFieldValue(trialDesign.researchCategoryLst, vfClnclRsrchCategryValue);
            commonFunctions.verifyListFieldValue(trialDesign.primaryPurposeLst, vfPrmryPrpsValue);
            commonFunctions.verifyListFieldValue(trialDesign.trialPhaseLst, vfTrialPhaseValue);
            commonFunctions.verifyListFieldValue(trialDesign.studyModelLst, vfStudyModelValue);
            commonFunctions.verifyListFieldValue(trialDesign.timePerspectiveLst, vfTimePerspectiveValue);
            commonFunctions.verifyListFieldValue(trialDesign.bioSpecimenRetentionLst, vfbiospecimenRetentionValue);
            commonFunctions.verifyTextFieldValue(trialDesign.bioSpecimenDescriptionTxt, descriptionBio);
            commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, vfNmbrOfArmsGrpValue);
            commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, vfTargetEnrollmentValue);
            commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, vfClinicalTrialsValue);
        });
    });

    /*
     Scenario: #7 I can add and edit Trial Design for an Ancillary Correlative Clinical Research Category trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Design screen
     And Clinical Research Category is Ancillary Correlative
     And I can select a different value for Primary Purpose
     And I can select a different value for Trial Phase
     And I can select a different value for the question"Is this a pilot"
     And I can select a value for Study Model
     And I can select a value for Time Perspective
     And I can select a value for Bio-specimen Retention
     And I can add or edit a value for bio-Specimen Decription
     And I can add or edit a value for Number of Arms/Groups
     And I can add or edit a value for Target Enrollment
     And I can add or edit a value for Final Enrollment for ClinicalTrials.gov
     And the value of Accruals will be displayed
     When I have selected Save
     Then the Ancillary Correlative trial design is associated with the trial
     And the message Record Updated displays
     */

    this.Given(/^Clinical Research Category is Ancillary Correlative$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.selectClinicalResearchCategory('Ancillary Correlative');
            vfClnclRsrchCategryValue = 'Ancillary Correlative';
        });
    });

    this.Given(/^I can select a different value for the question"([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function() {
            pilotA = 'Yes';
            pilotB = 'No';
            yesVal = '0';
            noVal = '1';
            trialDesign.isThisAPilot.get(yesVal).isSelected().then(function (value){
                console.log('Radio button current selection value is: '+value +'');
                if (value === false){
                    helper.clickRadioButton(trialDesign.isThisAPilot, yesVal, 'Selecting '+ pilotA +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '0', true);
                } else {
                    helper.clickRadioButton(trialDesign.isThisAPilot, noVal, 'Selecting '+ pilotB +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '1', true);
                }
            });
        });
    });

    this.Given(/^I can select a value for Study Model$/, function () {
        return browser.sleep(25).then(function() {
            studyMdlA = 'Cohort';
            studyMdlB = 'Case-Control';
            studyMdlC = 'Case-Only';
            studyMdlD = 'Case-Crossover';
            studyMdlE = 'Ecologic or Community';
            studyMdlF = 'Family-Based';
            studyMdlG = 'Other';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntstudyMdlValue = '' + value + '';
                if (crntstudyMdlValue === 'Cohort'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlB);
                    vfStudyModelValue = studyMdlB;
                } else if (crntstudyMdlValue === 'Case-Control'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlC);
                    vfStudyModelValue = studyMdlC;
                } else if (crntstudyMdlValue === 'Case-Only'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlD);
                    vfStudyModelValue = studyMdlD;
                } else if (crntstudyMdlValue === 'Case-Crossover'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlE);
                    vfStudyModelValue = studyMdlE;
                } else if (crntstudyMdlValue === 'Ecologic or Community'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlF);
                    vfStudyModelValue = studyMdlF;
                } else if (crntstudyMdlValue === 'Family-Based'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlA);
                    vfStudyModelValue = studyMdlA;
                } else if (crntstudyMdlValue === 'Other'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlA);
                    vfStudyModelValue = studyMdlA;
                } else {
                    trialDesign.selectStudyModel(studyMdlA);
                    vfStudyModelValue = studyMdlA;
                }
            });
        });
    });

    this.Given(/^I can select a value for Time Perspective$/, function () {
        return browser.sleep(25).then(function() {
            timePrspctvA = 'Retrospective';
            timePrspctvB = 'Prospective';
            timePrspctvC = 'Cross sectional';
            timePrspctvD = 'Other';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crnttimePrspctvValue = '' + value + '';
                if (crnttimePrspctvValue === 'Retrospective'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvB);
                    vfTimePerspectiveValue = timePrspctvB;
                } else if (crnttimePrspctvValue === 'Prospective'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvC);
                    vfTimePerspectiveValue = timePrspctvC;
                } else if (crnttimePrspctvValue === 'Cross sectional'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvD);
                    vfTimePerspectiveValue = timePrspctvD;
                } else if (crnttimePrspctvValue === 'Other'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvA);
                    vfTimePerspectiveValue = timePrspctvA;
                } else {
                    trialDesign.selectTimePerspective(timePrspctvA);
                    vfTimePerspectiveValue = timePrspctvA;
                }
            });
        });
    });

    this.Given(/^I can select a value for Bio\-specimen Retention$/, function () {
        return browser.sleep(25).then(function() {
            biospecimenRtentnA = 'None Retained';
            biospecimenRtentnB = 'Samples with DNA';
            biospecimenRtentnC = 'Crossover Assignment';
            biospecimenRtentnD = 'Factorial Assignment';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntbiospecimenRtentnValue = '' + value + '';
                if (crntbiospecimenRtentnValue === 'None Retained'){
                    console.log('System Identified [' + crntbiospecimenRtentnValue + '] as the current Bio-specimen Retention value');
                    trialDesign.selectBioSpecimenRetention(biospecimenRtentnB);
                    vfbiospecimenRetentionValue = biospecimenRtentnB;
                } else if (crntbiospecimenRtentnValue === 'Samples with DNA'){
                    console.log('System Identified [' + crntbiospecimenRtentnValue + '] as the current Bio-specimen Retention value');
                    trialDesign.selectBioSpecimenRetention(biospecimenRtentnC);
                    vfbiospecimenRetentionValue = biospecimenRtentnC;
                } else if (crntbiospecimenRtentnValue === 'Samples Without DNA'){
                    console.log('System Identified [' + crntbiospecimenRtentnValue + '] as the current Bio-specimen Retention value');
                    trialDesign.selectBioSpecimenRetention(biospecimenRtentnD);
                    vfbiospecimenRetentionValue = biospecimenRtentnD;
                } else {
                    trialDesign.selectBioSpecimenRetention(biospecimenRtentnA);
                    vfbiospecimenRetentionValue = biospecimenRtentnA;
                }
            });
        });
    });

    this.Given(/^I can add or edit a value for bio\-Specimen Decription$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.setBioSpecimenDescription(descriptionBio);
        });
    });

    this.Then(/^the Ancillary Correlative trial design is associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.verifyListFieldValue(trialDesign.researchCategoryLst, vfClnclRsrchCategryValue);
            commonFunctions.verifyListFieldValue(trialDesign.primaryPurposeLst, vfPrmryPrpsValue);
            commonFunctions.verifyListFieldValue(trialDesign.trialPhaseLst, vfTrialPhaseValue);
            commonFunctions.verifyListFieldValue(trialDesign.studyModelLst, vfStudyModelValue);
            commonFunctions.verifyListFieldValue(trialDesign.timePerspectiveLst, vfTimePerspectiveValue);
            commonFunctions.verifyListFieldValue(trialDesign.bioSpecimenRetentionLst, vfbiospecimenRetentionValue);
            commonFunctions.verifyTextFieldValue(trialDesign.bioSpecimenDescriptionTxt, descriptionBio);
            commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, vfNmbrOfArmsGrpValue);
            commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, vfTargetEnrollmentValue);
            commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, vfClinicalTrialsValue);
        });
    });

    /*
     Scenario Outline:#8 Observational Trial Design Mandatory Fields rules for PROTOCOL Information Source
     Given I am on the Trial Design Screen
     And the Clinical research Category is Observational
     And the Information Source is 'Protocol'
     When The Trial Design field <TrialDesignField> is not entered
     And I have seleted the save Button
     Then an error message <TrialDesignErrorMessage> will be displayed
     Examples:

     |TrialDesignField      |TrialDesignErrorMessage         |
     |Primary Purpose       |Primary Purpose is Required       |
     |Trial Phase           |Trial Phase is Required           |
     |Number of Arms/Groups |Number of Arms/Groups is Required |
     |Target Enrollment     |Target Enrollment is Required        |
     */

    this.Given(/^the Clinical research Category is Observational$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.selectClinicalResearchCategory('Observational');
            vfClnclRsrchCategryValue = 'Observational';
            //Primary Purpose
            prmryPrpsA = 'Treatment';
            prmryPrpsB = 'Prevention';
            prmryPrpsC = 'Supportive Care';
            prmryPrpsD = 'Screening';
            prmryPrpsE = 'Diagnostic';
            prmryPrpsF = 'Health Services Research';
            prmryPrpsG = 'Basic Science';
            prmryPrpsH = 'Other';
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntPrmryPrpsValue = '' + value + '';
                if (crntPrmryPrpsValue === 'Treatment'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsB);
                    vfPrmryPrpsValue = prmryPrpsB;
                } else if (crntPrmryPrpsValue === 'Prevention'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsC);
                    vfPrmryPrpsValue = prmryPrpsC;
                } else if (crntPrmryPrpsValue === 'Supportive Care'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsD);
                    vfPrmryPrpsValue = prmryPrpsD;
                } else if (crntPrmryPrpsValue === 'Screening'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsE);
                    vfPrmryPrpsValue = prmryPrpsE;
                } else if (crntPrmryPrpsValue === 'Diagnostic'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsF);
                    vfPrmryPrpsValue = prmryPrpsF;
                } else if (crntPrmryPrpsValue === 'Health Services Research'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsG);
                    vfPrmryPrpsValue = prmryPrpsG;
                } else if (crntPrmryPrpsValue === 'Basic Science'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else if (crntPrmryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else {
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                }
            });
            //Trial Phase
            trialPhseA = '0';
            trialPhseB = 'I';
            trialPhseC = 'I/II';
            trialPhseD = 'II';
            trialPhseE = 'II/III';
            trialPhseF = 'III';
            trialPhseG = 'IV';
            trialPhseH = 'NA';
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crnttrialPhseValue = '' + value + '';
                if (crnttrialPhseValue === '0'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseB);
                    vfTrialPhaseValue = trialPhseB;
                } else if (crnttrialPhseValue === 'I'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'I/II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II/III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'IV'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseH);
                    vfTrialPhaseValue = trialPhseH;
                } else if (crnttrialPhseValue === 'NA'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else {
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                }
            });
            //Number of Arms Group
            trialDesign.numberOfArmsTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                } else if (value === '1'){
                    trialDesign.setNumberOfArmsGroups('2');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '2');
                } else if (value === '2'){
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                } else {
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                }
            });
            //Target Enrollment
            trialDesign.targetEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                } else if (value === '1'){
                    trialDesign.setTargetEnrollment('2');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '2');
                } else if (value === '2'){
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                } else {
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                }
            });
            trialDesign.clickSaveTrialDesign();
        });
    });

    this.Then(/^an error message (.*) will be displayed$/, function (TrialDesignErrorMessage) {
        return browser.sleep(25).then(function() {
            if (TrialDesignErrorMessage === 'Primary Purpose is Required ') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Primary Purpose is Required');
            } else if (TrialDesignErrorMessage === 'Trial Phase is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Trial Phase is Required');
            } else if (TrialDesignErrorMessage === 'Intervention Model is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Intervention Model is Required');
            } else if (TrialDesignErrorMessage === 'Number of Arms/Groups is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Number of Arms/Groups is Required');
            } else if (TrialDesignErrorMessage === 'Masking is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Masking is Required');
            } else if (TrialDesignErrorMessage === 'Allocation is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Allocation is Required');
            } else if (TrialDesignErrorMessage === 'Target Enrollment is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Target Enrollment is Required');
            } else if (TrialDesignErrorMessage === 'Study Model is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Study Model is Required');
            } else if (TrialDesignErrorMessage === 'Time Perspective is Required') {
                commonFunctions.verifyTxtByIndex(outcome.requiredMsg, TrialDesignErrorMessage, '0', 'Verifying Time Perspective is Required');
            }
            commonFunctions.alertMsgOK();
        });
    });

    /*
     Scenario Outline:#8a Observational Trial Design Mandatory Fields rules for PROTOCOL Information Source NEW Sep 2016
     Given I am on the Trial Design Screen
     And the Clinical research Category is Observational
     And the Information Source is 'Protocol'
     When The Trial Design field <TrialDesignField> is not entered
     And I have seleted the save Button
     Then an error message <TrialDesignErrorMessage> will be displayed
     Examples:

     |TrialDesignField           |TrialDesignErrorMessage         |
     |Study Model                |Study Model is Required       |
     |Time Perspective           |Time Perspective          |
     */

    //No step defination needed as this one covered on the previous steps

    /*
     Scenario Outline:#9 Observational Trial Design Mandatory Fields rules for IMPORT Information Source
     Given I am on the Trial Design Screen
     And the Clinical research Category is Observational
     And the Information Source is 'Import'
     When The Trial Design field <TrialDesignField> is not entered
     And I have seleted the save Button
     Then an error message <TrialDesignErrorMessage> will be displayed
     Examples:

     |TrialDesignField      |TrialDesignErrorMessage             |
     |Primary Purpose       |Primary Purpose is Required       |
     |Trial Phase           |Trial Phase is Required           |
     */

    this.Given(/^the Information Source is 'Import'$/, function () {
        return browser.sleep(25).then(function() {
            //expSourceVal = 'Protocol';
            //checkInformationSource = 'Information Source: '+expSourceVal+'';
            //associated.verifyTrialOverview('13', checkInformationSource);
        });
    });

    /*
     Scenario: #10 I can update and edit Trial Design for a Expanded Access Clinical Research Category trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Design screen
     And Clinical Research Category is Intervention
     When I change Clinical Research Category to Expanded Access
     And I can select a different value for Primary Purpose type:
     And I can select a different value for Secondary Purpose Type:
     And I can select a different value for Trial Phase type:
     And I can select a different value for the question"Is this a pilot" type
     And I can select a value for Intervention Model type
     And I can enter a value for Number of Arms
     And I can select a value for Masking
     And I can select a value for Allocation
     And I can select a value for Study Classification
     And I can enter a value for Target Enrollment
     And I can enter a value for Final Enrollment for ClinicalTrials.gov
     And the value of Accruals will be displayed
     And When I select Save at the trial design screen
     Then the Expanded Access trial design is associated with the trial
     And the message Record Updated displays
     */

    this.Given(/^Clinical Research Category is Intervention$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.selectClinicalResearchCategory(crcListValueA);
            vfClnclRsrchCategryValue = crcListValueA;
            trialDesign.selectPrimaryPurpose(prmPrpsSlctVal);
        });
    });

    this.When(/^I change Clinical Research Category to Expanded Access$/, function () {
        return browser.sleep(25).then(function() {
            vfClnclRsrchCategryValue = '';
            trialDesign.selectClinicalResearchCategory(crcListValueB);
            vfClnclRsrchCategryValue = crcListValueB;
            console.log('Clinical Research Category list option selected as: '+vfClnclRsrchCategryValue);
        });
    });

    this.When(/^I can select a different value for the Primary Purpose type:$/, function () {
        return browser.sleep(25).then(function() {
            prmryPrpsA = 'Treatment';
            prmryPrpsB = 'Prevention';
            prmryPrpsC = 'Supportive Care';
            prmryPrpsD = 'Screening';
            prmryPrpsE = 'Diagnostic';
            prmryPrpsF = 'Health Services Research';
            prmryPrpsG = 'Basic Science';
            prmryPrpsH = 'Other';
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntPrmryPrpsValue = '' + value + '';
                if (crntPrmryPrpsValue === 'Treatment'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsB);
                    vfPrmryPrpsValue = prmryPrpsB;
                } else if (crntPrmryPrpsValue === 'Prevention'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsC);
                    vfPrmryPrpsValue = prmryPrpsC;
                } else if (crntPrmryPrpsValue === 'Supportive Care'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsD);
                    vfPrmryPrpsValue = prmryPrpsD;
                } else if (crntPrmryPrpsValue === 'Screening'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsE);
                    vfPrmryPrpsValue = prmryPrpsE;
                } else if (crntPrmryPrpsValue === 'Diagnostic'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsF);
                    vfPrmryPrpsValue = prmryPrpsF;
                } else if (crntPrmryPrpsValue === 'Health Services Research'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsG);
                    vfPrmryPrpsValue = prmryPrpsG;
                } else if (crntPrmryPrpsValue === 'Basic Science'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else if (crntPrmryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else {
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                }
            });
        });
    });

    this.Given(/^I can select a different value for the Secondary Purpose Type:$/, function () {
        return browser.sleep(25).then(function() {
            scndryPrpsA = 'Ancillary-Correlative';
            scndryPrpsB = 'Other';
            trialDesign.secondaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntscndryPrpsValue = '' + value + '';
                if (crntscndryPrpsValue === 'Ancillary-Correlative'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsB);
                    trialDesign.setSecondaryOtherDescription('Test Description of Other Secondary Purpose');
                    vfSecndryPrpsValue = scndryPrpsB;
                } else if (crntscndryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsA);
                    vfSecndryPrpsValue = scndryPrpsA;
                } else {
                    trialDesign.selectSecondaryPurpose(scndryPrpsA);
                    vfSecndryPrpsValue = scndryPrpsA;
                }
            });
        });
    });

    this.Given(/^I can select a different value for the Trial Phase type:$/, function () {
        return browser.sleep(25).then(function() {
            trialPhseA = '0';
            trialPhseB = 'I';
            trialPhseC = 'I/II';
            trialPhseD = 'II';
            trialPhseE = 'II/III';
            trialPhseF = 'III';
            trialPhseG = 'IV';
            trialPhseH = 'NA';
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crnttrialPhseValue = '' + value + '';
                if (crnttrialPhseValue === '0'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseB);
                    vfTrialPhaseValue = trialPhseB;
                } else if (crnttrialPhseValue === 'I'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'I/II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II/III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'IV'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseH);
                    vfTrialPhaseValue = trialPhseH;
                } else if (crnttrialPhseValue === 'NA'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else {
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                }
            });
        });
    });

    this.Given(/^I select a different value for the question"([^"]*)" type$/, function (arg1) {
        return browser.sleep(25).then(function() {
            pilotA = 'Yes';
            pilotB = 'No';
            yesVal = '0';
            noVal = '1';
            trialDesign.isThisAPilot.get(yesVal).isSelected().then(function (value){
                console.log('Radio button current selection value is: '+value +'');
                if (value === false){
                    helper.clickRadioButton(trialDesign.isThisAPilot, yesVal, 'Selecting '+ pilotA +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '0', true);
                } else {
                    helper.clickRadioButton(trialDesign.isThisAPilot, noVal, 'Selecting '+ pilotB +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '1', true);
                }
            });
        });
    });

    this.Given(/^I can select a value for the Intervention Model type$/, function () {
        return browser.sleep(25).then(function() {
            intrvntnMdlA = 'Single Group Assignment';
            intrvntnMdlB = 'Parallel Assignment';
            intrvntnMdlC = 'Crossover Assignment';
            intrvntnMdlD = 'Factorial Assignment';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntintrvntnMdlValue = '' + value + '';
                if (crntintrvntnMdlValue === 'Single Group Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlB);
                    vfInterventionalModelValue = intrvntnMdlB;
                } else if (crntintrvntnMdlValue === 'Parallel Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlC);
                    vfInterventionalModelValue = intrvntnMdlC;
                } else if (crntintrvntnMdlValue === 'Crossover Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlD);
                    vfInterventionalModelValue = intrvntnMdlD;
                } else if (crntintrvntnMdlValue === 'Factorial Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlA);
                    vfInterventionalModelValue = intrvntnMdlA;
                } else {
                    trialDesign.selectInterventionalModel(intrvntnMdlA);
                    vfInterventionalModelValue = intrvntnMdlA;
                }
            });
        });
    });

    this.When(/^I can enter a value for Number of Arms$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.numberOfArmsTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                } else if (value === '1'){
                    trialDesign.setNumberOfArmsGroups('2');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '2');
                } else if (value === '2'){
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                } else {
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                }
            });
        });
    });

    this.When(/^I can select a value for Masking$/, function () {
        return browser.sleep(25).then(function() {
            mskngA = 'Open Label';
            mskngB = 'Single Blind';
            mskngC = 'Double Blind';
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntmskngValue = '' + value + '';
                if (crntmskngValue === 'Open Label'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngB);
                    vfMaskingValue = mskngB;
                } else if (crntmskngValue === 'Single Blind'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngC);
                    vfMaskingValue = mskngC;
                } else if (crntmskngValue === 'Double Blind'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngA);
                    vfMaskingValue = mskngA;
                } else {
                    trialDesign.selectMasking(mskngA);
                    vfMaskingValue = mskngA;
                }
            });
        });
    });

    this.When(/^I can select a value for Allocation$/, function () {
        return browser.sleep(25).then(function() {
            alloctnA = 'Randomized';
            alloctnB = 'Non-Randomized';
            alloctnC = 'N/A';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntalloctnValue = '' + value + '';
                if (crntalloctnValue === 'Randomized'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnB);
                    vfAllocationValue = alloctnB;
                } else if (crntalloctnValue === 'Non-Randomized'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnC);
                    vfAllocationValue = alloctnC;
                } else if (crntalloctnValue === 'N/A'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnA);
                    vfAllocationValue = alloctnA;
                } else {
                    trialDesign.selectAllocation(alloctnA);
                    vfAllocationValue = alloctnA;
                }
            });
        });
    });

    this.When(/^I can select a value for Study Classification$/, function () {
        return browser.sleep(25).then(function() {
            stdyClassfctnA = 'Safety Study';
            stdyClassfctnB = 'Safety/Efficacy Study';
            stdyClassfctnC = 'Efficacy Study';
            stdyClassfctnD = 'Bio-equivalence Study';
            stdyClassfctnE = 'Bio-availability Study';
            stdyClassfctnF = 'Pharmacokinetics Study';
            stdyClassfctnG = 'Pharmacodynamics Study';
            stdyClassfctnH = 'Pharmacokinetics/dynamics Study';
            stdyClassfctnI = 'N/A';
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crntstdyClassfctnValue = '' + value + '';
                if (crntstdyClassfctnValue === 'Safety Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnB);
                    vfClassificationValue = stdyClassfctnB;
                } else if (crntstdyClassfctnValue === 'Safety/Efficacy Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnC);
                    vfClassificationValue = stdyClassfctnC;
                } else if (crntstdyClassfctnValue === 'Efficacy Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnD);
                    vfClassificationValue = stdyClassfctnD;
                } else if (crntstdyClassfctnValue === 'Bio-equivalence Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnE);
                    vfClassificationValue = stdyClassfctnE;
                } else if (crntstdyClassfctnValue === 'Bio-availability Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnF);
                    vfClassificationValue = stdyClassfctnF;
                } else if (crntstdyClassfctnValue === 'Pharmacokinetics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnG);
                    vfClassificationValue = stdyClassfctnG;
                } else if (crntstdyClassfctnValue === 'Pharmacodynamics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else if (crntstdyClassfctnValue === 'Pharmacokinetics/dynamics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else if (crntstdyClassfctnValue === 'N/A'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else {
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                }
            });
        });
    });

    this.Then(/^the Expanded Access trial design is associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.verifyListFieldValue(trialDesign.researchCategoryLst, vfClnclRsrchCategryValue);
            commonFunctions.verifyListFieldValue(trialDesign.primaryPurposeLst, vfPrmryPrpsValue);
            commonFunctions.verifyListFieldValue(trialDesign.secondaryPurposeLst, vfSecndryPrpsValue);
            commonFunctions.verifyListFieldValue(trialDesign.trialPhaseLst, vfTrialPhaseValue);
            commonFunctions.verifyListFieldValue(trialDesign.interventionModelLst, vfInterventionalModelValue);
            commonFunctions.verifyListFieldValue(trialDesign.maskingLst, vfMaskingValue);
            commonFunctions.verifyListFieldValue(trialDesign.allocationLst, vfAllocationValue);
            commonFunctions.verifyListFieldValue(trialDesign.studyClassficationLst, vfClassificationValue);
        });
    });


    /*
     Scenario:  #11 Primary Purpose rule when value selected is "Other"
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Design screen
     When I have selected Other for Primary Purpose
     Then I must enter description in the displayed field "if Primary Purpose is "Other", describe"
     When Description is not entered in the displayed field "if Primary Purpose is "Other", describe"
     Then an error message will appear "Primary Purpose Of Other text is Required”
     */

    this.When(/^I have selected Other for Primary Purpose$/, function () {
        return browser.sleep(25).then(function() {
            prmryPrpsA = 'Treatment';
            prmryPrpsB = 'Prevention';
            prmryPrpsC = 'Supportive Care';
            prmryPrpsD = 'Screening';
            prmryPrpsE = 'Diagnostic';
            prmryPrpsF = 'Health Services Research';
            prmryPrpsG = 'Basic Science';
            prmryPrpsH = 'Other';
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntPrmryPrpsValue = '' + value + '';
                if (crntPrmryPrpsValue === prmryPrpsH){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    vfPrmryPrpsValue = prmryPrpsH;
                } else {
                    trialDesign.selectPrimaryPurpose(prmryPrpsH);
                    vfPrmryPrpsValue = prmryPrpsH;
                }
            });
        });
    });

    this.Then(/^I must enter description in the displayed field "([^"]*)"Other"([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
            prPrpsOtherLbl = 'Description of Other Primary Purpose';
            trialDesign.setPrimaryOtherDescription(prPrpsOtherDesc);
            trialDesign.clickSaveTrialDesign();
            trialDesign.verifyPrimaryPurposeOther(prPrpsOtherLbl, prPrpsOtherDesc);
        });
    });

    this.When(/^Description is not entered in the displayed field "([^"]*)"Other"([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
            prPrpsOtherLbl = 'Description of Other Primary Purpose';
            trialDesign.setPrimaryOtherDescription('');
            trialDesign.clickSaveTrialDesign();
            trialDesign.verifyPrimaryPurposeOther(prPrpsOtherLbl, '');
        });
    });

    this.Then(/^an error message will appear "Primary Purpose Of Other text is Required”$/, function () {
        return browser.sleep(25).then(function() {
            errorMSGPPO = 'Primary Purpose Of Other text is Required';
            commonFunctions.verifyTxtByIndex(outcome.requiredMsg, errorMSGPPO, '0', 'Verifying Primary Purpose Of Other text is Required');
        });
    });

    /*
     Scenario:  #12 Character display for Primary Purpose of Other
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Design screen
     And the 'If Primary Purpose is 'Other', describe' field displays
     Then a comment appears below the Primary Purpose of Other field to display the number of characters available to enter into the field.
     |200 characters left|
     And "x characters left" will be displayed as characters are added
     When 200 characters have been entered
     Then no additional text can be entered
     */

    this.Given(/^the 'If Primary Purpose is 'Other', describe' field displays$/, function () {
        return browser.sleep(25).then(function() {
            prmryPrpsA = 'Treatment';
            prmryPrpsB = 'Prevention';
            prmryPrpsC = 'Supportive Care';
            prmryPrpsD = 'Screening';
            prmryPrpsE = 'Diagnostic';
            prmryPrpsF = 'Health Services Research';
            prmryPrpsG = 'Basic Science';
            prmryPrpsH = 'Other';
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntPrmryPrpsValue = '' + value + '';
                if (crntPrmryPrpsValue === prmryPrpsH){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    vfPrmryPrpsValue = prmryPrpsH;
                } else {
                    trialDesign.selectPrimaryPurpose(prmryPrpsH);
                    vfPrmryPrpsValue = prmryPrpsH;
                }
            });
            prPrpsOtherLbl = 'Description of Other Primary Purpose';
            trialDesign.setPrimaryOtherDescription(prPrpsOtherDesc);
            trialDesign.clickSaveTrialDesign();
            trialDesign.verifyPrimaryPurposeOther(prPrpsOtherLbl, prPrpsOtherDesc);
        });
    });

    this.Then(/^a comment appears below the Primary Purpose of Other field to display the number of characters available to enter into the field\.$/, function (table) {
        return browser.sleep(25).then(function() {
            var characLft = table.raw();
            strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strCharacLft + ']');
            var strCharacLftSplt = strCharacLft.toString().split("\n");
            strCharacLftSpltA = strCharacLftSplt[0];
            strCharacLftSpltB = '146 characters left';
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftSpltB, '0', 'Verifying Description of Other Primary Purpose field Character Left message');
        });
    });

    /*
     Scenario:  #13 Secondary Purpose of Other
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Design screen
     When I have selected Other for Secondary Purpose
     Then a text box appears
     */

    this.When(/^I have selected Other for Secondary Purpose$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.selectClinicalResearchCategory(crcListValueA);
            vfClnclRsrchCategryValue = crcListValueA;
            prmryPrpsA = 'Treatment';
            prmryPrpsB = 'Prevention';
            prmryPrpsC = 'Supportive Care';
            prmryPrpsD = 'Screening';
            prmryPrpsE = 'Diagnostic';
            prmryPrpsF = 'Health Services Research';
            prmryPrpsG = 'Basic Science';
            prmryPrpsH = 'Other';
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntPrmryPrpsValue = '' + value + '';
                if (crntPrmryPrpsValue === prmryPrpsH){
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else {
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                }
            });
            scndryPrpsA = 'Ancillary-Correlative';
            scndryPrpsB = 'Other';
            trialDesign.secondaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntscndryPrpsValue = '' + value + '';
                if (crntscndryPrpsValue === 'Ancillary-Correlative'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsB);
                    vfSecndryPrpsValue = scndryPrpsB;
                } else if (crntscndryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    vfSecndryPrpsValue = scndryPrpsB;
                } else {
                    trialDesign.selectSecondaryPurpose(scndryPrpsB);
                    vfSecndryPrpsValue = scndryPrpsB;
                }
            });

        });
    });

    this.Then(/^a text box appears$/, function () {
        return browser.sleep(25).then(function() {
            scndryPrpsOtherLbl = 'Description of Other Secondary Purpose:';
            trialDesign.setSecondaryOtherDescription(scndryPrpsOtherDesc);
            trialDesign.clickSaveTrialDesign();
            trialDesign.verifySecondaryPurposeOther(scndryPrpsOtherLbl, scndryPrpsOtherDesc);
            trialDesign.descriptionOfOtherSecondaryPurposeTxt.isPresent().then(function (statusPresent){
                if (statusPresent){
                    trialDesign.descriptionOfOtherSecondaryPurposeTxt.isDisplayed().then(function (statusDisplay){
                        if (statusDisplay){
                            trialDesign.descriptionOfOtherSecondaryPurposeTxt.getAttribute('value').then(function (txtValue) {
                                if (txtValue !== '') {
                                    commonCharacterTxt = ''+ commonMsg.oneThousanCharTxt +'';
                                    trialDesign.setSecondaryOtherDescription(commonCharacterTxt);
                                    commonFunctions.verifyTxtByIndex(outcome.characterLeftLbl, commonMsg.zeroCharLeftMsg, '1', 'Verifying Description of Other Secondary Purpose field Character left message');
                                } else {
                                    commonCharacterTxt = ''+ commonMsg.oneThousanCharTxt +'';
                                    trialDesign.setSecondaryOtherDescription(commonCharacterTxt);
                                    commonFunctions.verifyTxtByIndex(outcome.characterLeftLbl, commonMsg.zeroCharLeftMsg, '1', 'Verifying Description of Other Secondary Purpose field Character left message');
                                }
                            });
                        }
                    });
                }
            });
        });
    });

    /*
     Scenario:  #14 Character display for Secondary Purpose of Other
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Design screen
     And the 'If Secondary Purpose is 'Other', describe' box displays
     Then a comment appears below the Secondary Purpose of Other field to display the number of characters available to enter into the field.
     |1000 characters left|
     And "x characters left" will be displayed as characters are added
     When 1000 characters have been entered
     Then no additional text can be entered
     */

    this.Given(/^the 'If Secondary Purpose is 'Other', describe' box displays$/, function () {
        return browser.sleep(25).then(function() {
            scndryPrpsA = 'Ancillary-Correlative';
            scndryPrpsB = 'Other';
            trialDesign.secondaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntscndryPrpsValue = '' + value + '';
                if (crntscndryPrpsValue === 'Ancillary-Correlative'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsB);
                    vfSecndryPrpsValue = scndryPrpsB;
                } else if (crntscndryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    vfSecndryPrpsValue = scndryPrpsB;
                } else {
                    trialDesign.selectSecondaryPurpose(scndryPrpsB);
                    vfSecndryPrpsValue = scndryPrpsB;
                }
            });
            scndryPrpsOtherLbl = 'Description of Other Secondary Purpose:';
            trialDesign.setSecondaryOtherDescription(scndryPrpsOtherDesc);
            trialDesign.clickSaveTrialDesign();
            trialDesign.verifySecondaryPurposeOther(scndryPrpsOtherLbl, scndryPrpsOtherDesc);
        });
    });

    this.Then(/^a comment appears below the Secondary Purpose of Other field to display the number of characters available to enter into the field\.$/, function (table) {
        return browser.sleep(25).then(function() {
            var characLft = table.raw();
            strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strCharacLft + ']');
            var strCharacLftSplt = strCharacLft.toString().split("\n");
            strCharacLftSpltA = strCharacLftSplt[0];
            if (strCharacLftSpltA === '1000 characters left'){
                strCharacLftVlue = '944 characters left';
                commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftVlue, '1', 'Verifying Description of Other Secondary Purpose field Character Left message');
            } else {
                strCharacLftVlue = '1000 characters left';
                commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftVlue, '1', 'Verifying Description of Other Secondary Purpose field Character Left message');
            }
        });
    });

    /*
     Scenario:  #15 I can Reset Trial Description screen for a Trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Design screen
     When I have selected Reset
     Then the information entered or edited on the Trial Design screen will not be saved to the trial record
     And the screen will be refreshed with the data since the last save.
     */

    this.When(/^I have selected Reset at the Trial Design screen$/, function () {
        return browser.sleep(25).then(function() {
            //CRC
            trialDesign.selectClinicalResearchCategory(crcListValueA);
            vfClnclRsrchCategryValue = crcListValueA;
            //Primary Purpose
            prmryPrpsA = 'Treatment';
            prmryPrpsB = 'Prevention';
            prmryPrpsC = 'Supportive Care';
            prmryPrpsD = 'Screening';
            prmryPrpsE = 'Diagnostic';
            prmryPrpsF = 'Health Services Research';
            prmryPrpsG = 'Basic Science';
            prmryPrpsH = 'Other';
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntPrmryPrpsValue = '' + value + '';
                if (crntPrmryPrpsValue === 'Treatment') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsB);
                    vfPrmryPrpsValue = prmryPrpsB;
                } else if (crntPrmryPrpsValue === 'Prevention') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsC);
                    vfPrmryPrpsValue = prmryPrpsC;
                } else if (crntPrmryPrpsValue === 'Supportive Care') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsD);
                    vfPrmryPrpsValue = prmryPrpsD;
                } else if (crntPrmryPrpsValue === 'Screening') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsE);
                    vfPrmryPrpsValue = prmryPrpsE;
                } else if (crntPrmryPrpsValue === 'Diagnostic') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsF);
                    vfPrmryPrpsValue = prmryPrpsF;
                } else if (crntPrmryPrpsValue === 'Health Services Research') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsG);
                    vfPrmryPrpsValue = prmryPrpsG;
                } else if (crntPrmryPrpsValue === 'Basic Science') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else if (crntPrmryPrpsValue === 'Other') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                } else {
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                    vfPrmryPrpsValue = prmryPrpsA;
                }
            });
            //Secondary Purpose
            scndryPrpsA = 'Ancillary-Correlative';
            scndryPrpsB = 'Other';
            trialDesign.secondaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntscndryPrpsValue = '' + value + '';
                if (crntscndryPrpsValue === 'Ancillary-Correlative'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsB);
                    trialDesign.setSecondaryOtherDescription('Test Description of Other Secondary Purpose');
                    vfSecndryPrpsValue = scndryPrpsB;
                } else if (crntscndryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsA);
                    vfSecndryPrpsValue = scndryPrpsA;
                } else {
                    trialDesign.selectSecondaryPurpose(scndryPrpsA);
                    vfSecndryPrpsValue = scndryPrpsA;
                }
            });
            //Trial Phase
            trialPhseA = '0';
            trialPhseB = 'I';
            trialPhseC = 'I/II';
            trialPhseD = 'II';
            trialPhseE = 'II/III';
            trialPhseF = 'III';
            trialPhseG = 'IV';
            trialPhseH = 'NA';
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crnttrialPhseValue = '' + value + '';
                if (crnttrialPhseValue === '0'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseB);
                    vfTrialPhaseValue = trialPhseB;
                } else if (crnttrialPhseValue === 'I'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'I/II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'II/III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else if (crnttrialPhseValue === 'IV'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseH);
                    vfTrialPhaseValue = trialPhseH;
                } else if (crnttrialPhseValue === 'NA'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                } else {
                    trialDesign.selectTrialPhase(trialPhseA);
                    vfTrialPhaseValue = trialPhseA;
                }
            });
            //Pilot
            pilotA = 'Yes';
            pilotB = 'No';
            yesVal = '0';
            noVal = '1';
            trialDesign.isThisAPilot.get(yesVal).isSelected().then(function (value){
                console.log('Radio button current selection value is: '+value +'');
                if (value === false){
                    helper.clickRadioButton(trialDesign.isThisAPilot, yesVal, 'Selecting '+ pilotA +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '0', true);
                } else {
                    helper.clickRadioButton(trialDesign.isThisAPilot, noVal, 'Selecting '+ pilotB +' as Is this a pilot radio button value');
                    commonFunctions.verifyIndicator(trialDesign.isThisAPilot, '1', true);
                }
            });
            //Intervention Model
            intrvntnMdlA = 'Single Group Assignment';
            intrvntnMdlB = 'Parallel Assignment';
            intrvntnMdlC = 'Crossover Assignment';
            intrvntnMdlD = 'Factorial Assignment';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntintrvntnMdlValue = '' + value + '';
                if (crntintrvntnMdlValue === 'Single Group Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlB);
                    vfInterventionalModelValue = intrvntnMdlB;
                } else if (crntintrvntnMdlValue === 'Parallel Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlC);
                    vfInterventionalModelValue = intrvntnMdlC;
                } else if (crntintrvntnMdlValue === 'Crossover Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlD);
                    vfInterventionalModelValue = intrvntnMdlD;
                } else if (crntintrvntnMdlValue === 'Factorial Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlA);
                    vfInterventionalModelValue = intrvntnMdlA;
                } else {
                    trialDesign.selectInterventionalModel(intrvntnMdlA);
                    vfInterventionalModelValue = intrvntnMdlA;
                }
            });
            //Masking
            mskngA = 'Open Label';
            mskngB = 'Single Blind';
            mskngC = 'Double Blind';
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntmskngValue = '' + value + '';
                if (crntmskngValue === 'Open Label'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngB);
                    vfMaskingValue = mskngB;
                } else if (crntmskngValue === 'Single Blind'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngC);
                    vfMaskingValue = mskngC;
                } else if (crntmskngValue === 'Double Blind'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngA);
                    vfMaskingValue = mskngA;
                } else {
                    trialDesign.selectMasking(mskngA);
                    vfMaskingValue = mskngA;
                }
            });
            //Allocation
            alloctnA = 'Randomized';
            alloctnB = 'Non-Randomized';
            alloctnC = 'N/A';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntalloctnValue = '' + value + '';
                if (crntalloctnValue === 'Randomized'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnB);
                    vfAllocationValue = alloctnB;
                } else if (crntalloctnValue === 'Non-Randomized'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnC);
                    vfAllocationValue = alloctnC;
                } else if (crntalloctnValue === 'N/A'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnA);
                    vfAllocationValue = alloctnA;
                } else {
                    trialDesign.selectAllocation(alloctnA);
                    vfAllocationValue = alloctnA;
                }
            });
            //Study Classsification
            stdyClassfctnA = 'Safety Study';
            stdyClassfctnB = 'Safety/Efficacy Study';
            stdyClassfctnC = 'Efficacy Study';
            stdyClassfctnD = 'Bio-equivalence Study';
            stdyClassfctnE = 'Bio-availability Study';
            stdyClassfctnF = 'Pharmacokinetics Study';
            stdyClassfctnG = 'Pharmacodynamics Study';
            stdyClassfctnH = 'Pharmacokinetics/dynamics Study';
            stdyClassfctnI = 'N/A';
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crntstdyClassfctnValue = '' + value + '';
                if (crntstdyClassfctnValue === 'Safety Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnC);
                    vfClassificationValue = stdyClassfctnC;
                } else if (crntstdyClassfctnValue === 'Safety/Efficacy Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnC);
                    vfClassificationValue = stdyClassfctnC;
                } else if (crntstdyClassfctnValue === 'Efficacy Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else if (crntstdyClassfctnValue === 'Bio-equivalence Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnF);
                    vfClassificationValue = stdyClassfctnF;
                } else if (crntstdyClassfctnValue === 'Bio-availability Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnF);
                    vfClassificationValue = stdyClassfctnF;
                } else if (crntstdyClassfctnValue === 'Pharmacokinetics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnG);
                    vfClassificationValue = stdyClassfctnG;
                } else if (crntstdyClassfctnValue === 'Pharmacodynamics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else if (crntstdyClassfctnValue === 'Pharmacokinetics/dynamics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else if (crntstdyClassfctnValue === 'N/A'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                    vfClassificationValue = stdyClassfctnA;
                } else {
                    trialDesign.selectStudyClassification(stdyClassfctnC);
                    vfClassificationValue = stdyClassfctnC;
                }
            });
            //Number of Arms group
            trialDesign.numberOfArmsTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                } else if (value === '1'){
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                } else if (value === '2'){
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                } else {
                    trialDesign.setNumberOfArmsGroups('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
                }
            });
            //Target Enrollment
            trialDesign.targetEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                } else if (value === '1'){
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                } else if (value === '2'){
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                } else {
                    trialDesign.setTargetEnrollment('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
                }
            });
            //Final enrollment for CT.gov
            trialDesign.finalEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                } else if (value === '1'){
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                } else if (value === '2'){
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                } else {
                    trialDesign.setFinalEnrollmentForCT('1');
                    commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
                }
            });
            //Save Initial Values to test reset function
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 200).then(function () {
                trialDesign.clickSaveTrialDesign();
            });
            //
            //Resetting Values
            //
            //CRC
            trialDesign.selectClinicalResearchCategory(crcListValueB);
            //Primary Purpose
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntPrmryPrpsValue = '' + value + '';
                if (crntPrmryPrpsValue === 'Treatment') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsB);
                } else if (crntPrmryPrpsValue === 'Prevention') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsC);
                } else if (crntPrmryPrpsValue === 'Supportive Care') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsD);
                } else if (crntPrmryPrpsValue === 'Screening') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsE);
                } else if (crntPrmryPrpsValue === 'Diagnostic') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsF);
                } else if (crntPrmryPrpsValue === 'Health Services Research') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsG);
                } else if (crntPrmryPrpsValue === 'Basic Science') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                } else if (crntPrmryPrpsValue === 'Other') {
                    console.log('System Identified [' + crntPrmryPrpsValue + '] as the current Primary Purpose value');
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                } else {
                    trialDesign.selectPrimaryPurpose(prmryPrpsA);
                }
            });
            //Secondary Purpose
            trialDesign.secondaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntscndryPrpsValue = '' + value + '';
                if (crntscndryPrpsValue === 'Ancillary-Correlative'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsB);
                    trialDesign.setSecondaryOtherDescription('Test Description of Other Secondary Purpose');
                } else if (crntscndryPrpsValue === 'Other'){
                    console.log('System Identified [' + crntscndryPrpsValue + '] as the current Secondary Purpose value');
                    trialDesign.selectSecondaryPurpose(scndryPrpsA);
                } else {
                    trialDesign.selectSecondaryPurpose(scndryPrpsA);
                }
            });
            //Trial Phase
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crnttrialPhseValue = '' + value + '';
                if (crnttrialPhseValue === '0'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseB);
                } else if (crnttrialPhseValue === 'I'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                } else if (crnttrialPhseValue === 'I/II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                } else if (crnttrialPhseValue === 'II'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                } else if (crnttrialPhseValue === 'II/III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                } else if (crnttrialPhseValue === 'III'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                } else if (crnttrialPhseValue === 'IV'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseH);
                } else if (crnttrialPhseValue === 'NA'){
                    console.log('System Identified [' + crnttrialPhseValue + '] as the current Trial Phase value');
                    trialDesign.selectTrialPhase(trialPhseA);
                } else {
                    trialDesign.selectTrialPhase(trialPhseA);
                }
            });
            //Pilot
            trialDesign.isThisAPilot.get(yesVal).isSelected().then(function (value){
                console.log('Radio button current selection value is: '+value +'');
                if (value === false){
                    helper.clickRadioButton(trialDesign.isThisAPilot, yesVal, 'Selecting '+ pilotA +' as Is this a pilot radio button value');
                } else {
                    helper.clickRadioButton(trialDesign.isThisAPilot, noVal, 'Selecting '+ pilotB +' as Is this a pilot radio button value');
                }
            });
            //Intervention Model
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntintrvntnMdlValue = '' + value + '';
                if (crntintrvntnMdlValue === 'Single Group Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlB);
                } else if (crntintrvntnMdlValue === 'Parallel Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlC);
                } else if (crntintrvntnMdlValue === 'Crossover Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlD);
                } else if (crntintrvntnMdlValue === 'Factorial Assignment'){
                    console.log('System Identified [' + crntintrvntnMdlValue + '] as the current Intervention Model value');
                    trialDesign.selectInterventionalModel(intrvntnMdlA);
                } else {
                    trialDesign.selectInterventionalModel(intrvntnMdlA);
                }
            });
            //Masking
            trialDesign.primaryPurposeLst.$('option:checked').getText().then(function (value) {
                var crntmskngValue = '' + value + '';
                if (crntmskngValue === 'Open Label'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngB);
                } else if (crntmskngValue === 'Single Blind'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngC);
                } else if (crntmskngValue === 'Double Blind'){
                    console.log('System Identified [' + crntmskngValue + '] as the current Masking value');
                    trialDesign.selectMasking(mskngA);
                } else {
                    trialDesign.selectMasking(mskngA);
                }
            });
            //Allocation
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntalloctnValue = '' + value + '';
                if (crntalloctnValue === 'Randomized'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnB);
                } else if (crntalloctnValue === 'Non-Randomized'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnC);
                } else if (crntalloctnValue === 'N/A'){
                    console.log('System Identified [' + crntalloctnValue + '] as the current Allocation value');
                    trialDesign.selectAllocation(alloctnA);
                } else {
                    trialDesign.selectAllocation(alloctnA);
                }
            });
            //Study Classsification
            trialDesign.trialPhaseLst.$('option:checked').getText().then(function (value) {
                var crntstdyClassfctnValue = '' + value + '';
                if (crntstdyClassfctnValue === 'Safety Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnB);
                } else if (crntstdyClassfctnValue === 'Safety/Efficacy Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnC);
                } else if (crntstdyClassfctnValue === 'Efficacy Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnD);
                } else if (crntstdyClassfctnValue === 'Bio-equivalence Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnE);
                } else if (crntstdyClassfctnValue === 'Bio-availability Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnF);
                } else if (crntstdyClassfctnValue === 'Pharmacokinetics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnG);
                } else if (crntstdyClassfctnValue === 'Pharmacodynamics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                } else if (crntstdyClassfctnValue === 'Pharmacokinetics/dynamics Study'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                } else if (crntstdyClassfctnValue === 'N/A'){
                    console.log('System Identified [' + crntstdyClassfctnValue + '] as the current Study Classification value');
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                } else {
                    trialDesign.selectStudyClassification(stdyClassfctnA);
                }
            });
            //Number of Arms group
            trialDesign.numberOfArmsTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setNumberOfArmsGroups('3');
                } else if (value === '1'){
                    trialDesign.setNumberOfArmsGroups('3');
                } else if (value === '2'){
                    trialDesign.setNumberOfArmsGroups('3');
                } else {
                    trialDesign.setNumberOfArmsGroups('3');
                }
            });
            //Target Enrollment
            trialDesign.targetEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setTargetEnrollment('3');
                } else if (value === '1'){
                    trialDesign.setTargetEnrollment('3');
                } else if (value === '2'){
                    trialDesign.setTargetEnrollment('3');
                } else {
                    trialDesign.setTargetEnrollment('3');
                }
            });
            //Final enrollment for CT.gov
            trialDesign.finalEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setFinalEnrollmentForCT('3');
                } else if (value === '1'){
                    trialDesign.setFinalEnrollmentForCT('3');
                } else if (value === '2'){
                    trialDesign.setFinalEnrollmentForCT('3');
                } else {
                    trialDesign.setFinalEnrollmentForCT('3');
                }
            });
            //Reset Entered Values
            browser.driver.wait(function () {
                console.log('wait here to reset the form');
                return true;
            }, 40).then(function () {
                trialDesign.clickResetTrialDesign();
            });
        });
    });

    this.Then(/^the information entered or edited on the Trial Design screen will not be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.verifyListFieldValue(trialDesign.researchCategoryLst, vfClnclRsrchCategryValue);
            commonFunctions.verifyListFieldValue(trialDesign.primaryPurposeLst, vfPrmryPrpsValue);
            commonFunctions.verifyListFieldValue(trialDesign.secondaryPurposeLst, vfSecndryPrpsValue);
            commonFunctions.verifyListFieldValue(trialDesign.trialPhaseLst, vfTrialPhaseValue);
            commonFunctions.verifyListFieldValue(trialDesign.interventionModelLst, vfInterventionalModelValue);
            commonFunctions.verifyListFieldValue(trialDesign.maskingLst, vfMaskingValue);
            commonFunctions.verifyListFieldValue(trialDesign.allocationLst, vfAllocationValue);
            commonFunctions.verifyListFieldValue(trialDesign.studyClassficationLst, vfClassificationValue);
            commonFunctions.verifyTextFieldValue(trialDesign.numberOfArmsTxt, '1');
            commonFunctions.verifyTextFieldValue(trialDesign.targetEnrollmentTxt, '1');
            commonFunctions.verifyTextFieldValue(trialDesign.finalEnrollmentTxt, '1');
        });
    });

    this.Then(/^the screen will be refreshed with the data since the last save\.$/, function () {
        return browser.sleep(25).then(function() {
            //this step covered with the previous step
        });
    });

    /*
     Scenario:  #16 Character display for Study Model of Other
     Given I am on the Trial Design screen
     And Clinical Research Category is Observational or Ancillary Correlative
     And the 'Study Model' is 'Other', describe' box displays
     Then a comment appears below the Study Model of Other field to display the number of characters available to enter into the field.
     |200 characters left|
     And "x characters left" will be displayed as characters are added
     When 200 characters have been entered
     Then no additional text can be entered
     */

    this.Given(/^Clinical Research Category is Observational or Ancillary Correlative$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.selectClinicalResearchCategory(crcListValueC);
            vfClnclRsrchCategryValue = crcListValueC;
        });
    });

    this.Given(/^the 'Study Model' is 'Other', describe' box displays$/, function () {
        return browser.sleep(25).then(function() {
            studyMdlA = 'Cohort';
            studyMdlB = 'Case-Control';
            studyMdlC = 'Case-Only';
            studyMdlD = 'Case-Crossover';
            studyMdlE = 'Ecologic or Community';
            studyMdlF = 'Family-Based';
            studyMdlG = 'Other';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntstudyMdlValue = '' + value + '';
                if (crntstudyMdlValue === 'Other'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlG);
                    vfStudyModelValue = studyMdlG;
                } else {
                    trialDesign.selectStudyModel(studyMdlG);
                    vfStudyModelValue = studyMdlG;
                }
            });
            studyModlOtherLbl = 'Description of Other Study Model:';
            trialDesign.setStudyModelOtherDescription(commonMsg.oneHundredCharTxt);
            //Number of Arms group
            trialDesign.numberOfArmsTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setNumberOfArmsGroups('3');
                } else if (value === '1'){
                    trialDesign.setNumberOfArmsGroups('3');
                } else if (value === '2'){
                    trialDesign.setNumberOfArmsGroups('3');
                } else {
                    trialDesign.setNumberOfArmsGroups('3');
                }
            });
            //Target Enrollment
            trialDesign.targetEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setTargetEnrollment('3');
                } else if (value === '1'){
                    trialDesign.setTargetEnrollment('3');
                } else if (value === '2'){
                    trialDesign.setTargetEnrollment('3');
                } else {
                    trialDesign.setTargetEnrollment('3');
                }
            });
            //Final enrollment for CT.gov
            trialDesign.finalEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setFinalEnrollmentForCT('3');
                } else if (value === '1'){
                    trialDesign.setFinalEnrollmentForCT('3');
                } else if (value === '2'){
                    trialDesign.setFinalEnrollmentForCT('3');
                } else {
                    trialDesign.setFinalEnrollmentForCT('3');
                }
            });
            trialDesign.clickSaveTrialDesign();
            trialDesign.verifyStudyModelOther(studyModlOtherLbl, commonMsg.oneHundredCharTxt);
        });
    });

    this.Then(/^a comment appears below the Study Model of Other field to display the number of characters available to enter into the field\.$/, function (table) {
        return browser.sleep(25).then(function() {
            var characLft = table.raw();
            strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strCharacLft + ']');
            var strCharacLftSplt = strCharacLft.toString().split("\n");
            strCharacLftSpltA = strCharacLftSplt[0];
            if (strCharacLftSpltA === '200 characters left'){
                strCharacLftVlue = commonMsg.oneHundredCharLeftMsg;
                commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLblStudyModel, strCharacLftVlue, '4', 'Verifying Description of Other Study Model field Character Left message');
            } else {
                strCharacLftVlue = strCharacLftSpltA;
                commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLblStudyModel, strCharacLftVlue, '4', 'Verifying Description of Other Study Model field Character Left message');
            }
        });
    });

    /*
     Scenario:  #17 Character display for Time Perspective of Other
     Given I am on the Trial Design screen
     And Clinical Research Category is Observational or Ancillary Correlative
     And the 'time Perspective' is 'Other', describe' box displays
     Then a comment appears below the Time Perspective of Other field to display the number of characters available to enter into the field.
     |200 characters left|
     And "x characters left" will be displayed as characters are added
     When 200 characters have been entered
     Then no additional text can be entered
     */

    this.Given(/^the 'time Perspective' is 'Other', describe' box displays$/, function (callback) {
        return browser.sleep(25).then(function() {
            studyMdlA = 'Cohort';
            studyMdlB = 'Case-Control';
            studyMdlC = 'Case-Only';
            studyMdlD = 'Case-Crossover';
            studyMdlE = 'Ecologic or Community';
            studyMdlF = 'Family-Based';
            studyMdlG = 'Other';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crntstudyMdlValue = '' + value + '';
                if (crntstudyMdlValue === 'Other'){
                    console.log('System Identified [' + crntstudyMdlValue + '] as the current Study Model value');
                    trialDesign.selectStudyModel(studyMdlA);
                    vfStudyModelValue = studyMdlA;
                } else {
                    trialDesign.selectStudyModel(studyMdlA);
                    vfStudyModelValue = studyMdlA;
                }
            });
            timePrspctvA = 'Retrospective';
            timePrspctvB = 'Prospective';
            timePrspctvC = 'Cross sectional';
            timePrspctvD = 'Other';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crnttimePrspctvValue = '' + value + '';
                if (crnttimePrspctvValue === 'Other'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvD);
                    vfTimePerspectiveValue = timePrspctvD;
                } else {
                    trialDesign.selectTimePerspective(timePrspctvD);
                    vfTimePerspectiveValue = timePrspctvD;
                }
            });
            timePerspectiveOtherLbl = 'Description of Other time perspective:';
            trialDesign.setTimePerspectiveOtherDescription(commonMsg.oneHundredCharTxt);
            //Number of Arms group
            trialDesign.numberOfArmsTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setNumberOfArmsGroups('3');
                } else if (value === '1'){
                    trialDesign.setNumberOfArmsGroups('3');
                } else if (value === '2'){
                    trialDesign.setNumberOfArmsGroups('3');
                } else {
                    trialDesign.setNumberOfArmsGroups('3');
                }
            });
            //Target Enrollment
            trialDesign.targetEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setTargetEnrollment('3');
                } else if (value === '1'){
                    trialDesign.setTargetEnrollment('3');
                } else if (value === '2'){
                    trialDesign.setTargetEnrollment('3');
                } else {
                    trialDesign.setTargetEnrollment('3');
                }
            });
            //Final enrollment for CT.gov
            trialDesign.finalEnrollmentTxt.getText().then(function (value) {
                if (value === '0'){
                    trialDesign.setFinalEnrollmentForCT('3');
                } else if (value === '1'){
                    trialDesign.setFinalEnrollmentForCT('3');
                } else if (value === '2'){
                    trialDesign.setFinalEnrollmentForCT('3');
                } else {
                    trialDesign.setFinalEnrollmentForCT('3');
                }
            });
            trialDesign.clickSaveTrialDesign();
            trialDesign.verifyTimePerspectiveOther(timePerspectiveOtherLbl, commonMsg.oneHundredCharTxt);
        });
    });

    this.Then(/^a comment appears below the Time Perspective of Other field to display the number of characters available to enter into the field\.$/, function (table) {
        return browser.sleep(25).then(function() {
            var characLft = table.raw();
            strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strCharacLft + ']');
            var strCharacLftSplt = strCharacLft.toString().split("\n");
            strCharacLftSpltA = strCharacLftSplt[0];
            if (strCharacLftSpltA === '200 characters left'){
                strCharacLftVlue = commonMsg.oneHundredCharLeftMsg;
                commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLblStudyModel, strCharacLftVlue, '5', 'Verifying Description of Other Study Model field Character Left message');
            } else {
                strCharacLftVlue = strCharacLftSpltA;
                commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLblStudyModel, strCharacLftVlue, '5', 'Verifying Description of Other Study Model field Character Left message');
            }
        });
    });

    /*
     Scenario: #18 Bio-specimen Description character count
     Given I am on the Trial Design screen
     When I am typing into the Bio-specimen Description  Field
     Then a comment appears below the Biospecimen Description field to display the number of characters available to enter into the field.
     |1000 characters left|
     And "x characters left" will be displayed as characters are added
     When 1000 characters have been entered
     Then no additional text can be entered
     */

    this.When(/^I am typing into the Bio\-specimen Description  Field$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.selectClinicalResearchCategory(crcListValueC);
            vfClnclRsrchCategryValue = crcListValueC;
            timePrspctvA = 'Retrospective';
            timePrspctvB = 'Prospective';
            timePrspctvC = 'Cross sectional';
            timePrspctvD = 'Other';
            trialDesign.interventionModelLst.$('option:checked').getText().then(function (value) {
                var crnttimePrspctvValue = '' + value + '';
                if (crnttimePrspctvValue === 'Other'){
                    console.log('System Identified [' + crnttimePrspctvValue + '] as the current Time Perspective value');
                    trialDesign.selectTimePerspective(timePrspctvB);
                    vfTimePerspectiveValue = timePrspctvB;
                } else {
                    trialDesign.selectTimePerspective(timePrspctvB);
                    vfTimePerspectiveValue = timePrspctvB;
                }
            });
            trialDesign.setBioSpecimenDescription(commonMsg.fiveHundredCharTxt);
        });
    });

    this.Then(/^a comment appears below the Biospecimen Description field to display the number of characters available to enter into the field\.$/, function (table) {
        return browser.sleep(25).then(function() {
            var characLft = table.raw();
            strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strCharacLft + ']');
            var strCharacLftSplt = strCharacLft.toString().split("\n");
            strCharacLftSpltA = strCharacLftSplt[0];
            if (strCharacLftSpltA === '1000 characters left'){
                strCharacLftVlue = commonMsg.fiveHundredCharLeftMsg;
                commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLblBio, strCharacLftVlue, '6', 'Verifying Description of Other Bio-specimen Description field Character Left message');
            } else {
                strCharacLftVlue = strCharacLftSpltA;
                commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLblBio, strCharacLftVlue, '6', 'Verifying Description of Other Bio-specimen Description field Character Left message');
            }
        });
    });







};
