/**
 * Author: Shamim Ahmed
 * Date: 08/24/2016
 * Page Object: Scientific Trial Design
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');
var should = chai.should();
var helperFunctions = require('../support/helper');
var addTrialPage = require('../support/registerTrialPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var scientificTrialDesign = function(){

    var commonFunctions = new abstractionCommonMethods();
    var dateFunctions = new addTrialPage();
    var helper = new helperFunctions();
    var self = this;

    /***********************************
     * Trial Design object(s)
     ***********************************/

    this.trialDesignHeader = element(by.id('trial_design_hdr'));

    //Fields
    this.researchCategoryLst = element(by.id('research_category'));
    this.primaryPurposeLst = element(by.id('primary_purpose'));
    this.secondaryPurposeLst = element(by.id('secondary_purpose'));
    this.trialPhaseLst = element(by.id('trial_phase'));

    this.isThisAPilotYes = element(by.id('is_this_pilot_yes'));
    this.isThisAPilotNo = element(by.id('is_this_pilot_no'));
    this.isThisAPilot = element(by.css('.radio-inline'));

    this.interventionModelLst = element(by.id('intervention_model'));

    this.maskingLst = element(by.id('masking'));

    this.allocationLst = element(by.id('allocation'));
    this.studyClassficationLst = element(by.id('study_classification'));

    this.numberOfArmsTxt = element(by.id('num_arms'));
    this.targetEnrollmentTxt = element(by.id('target_enrollment'));
    this.finalEnrollmentTxt = element(by.id('final_enrollment'));

    this.accrualsView = element(by.id('accruals'));

    //Observational
    this.studyModelLst = element(by.id('study_model'));
    this.timePerspectiveLst = element(by.id('time_perspective'));
    this.bioSpecimenRetentionLst = element(by.id('biospecimen_retention'));
    this.bioSpecimenDescriptionTxt = element(by.id('biospecimen_desc'));

    //Masking Roles
    this.maskingRolesSubjectCheck = element(by.id('masking_role_subject'));
    this.maskingRolesInvestigatorCheck = element(by.id('masking_role_investigator'));
    this.maskingRolesCaregiverCheck = element(by.id('masking_role_caregiver'));
    this.maskingRolesOutcomesAssessorCheck = element(by.id('masking_role_outcome_assessor'));

    //Others
    this.descriptionOfOtherPrimaryPurposeTxt = element(by.id('description_other'));
    this.descriptionOfOtherSecondaryPurposeTxt = element(by.id('description_other2'));
    this.descriptionOfOtherStudyModelTxt = element(by.id('study_model_other'));
    this.descriptionOfOtherTimePerspectiveTxt = element(by.id('time_perspective_other'));

    //Labels for Fields
    //Interventional
    this.clinicalResearchCategoryLbl = element(by.id('clinical_research_cat_lbl'));
    this.primaryPurposeLbl = element(by.id('primary_purpose_lbl'));
    this.secondaryPurposeLbl = element(by.id('sp_lbl'));
    this.trialPhaseLbl = element(by.id('trial_phase_lbl'));
    this.isThisAPilotLbl = element(by.id('is_this_pilot_lbl'));
    this.interventionModelLbl = element(by.id('intervention_model_lbl'));
    this.maskingLbl = element(by.id('maskings_lbl'));
    this.allocationLbl = element(by.id('allocation_lbl'));
    this.studyClassificationLbl = element(by.id('study_classification_labl'));
    this.numberOfArmsLbl = element(by.id('number_arms_groups_lbl'));
    this.targetEnrollmentLbl = element(by.id('target_enrollment_lbl'));
    this.finalEnrollmentLbl = element(by.id('final_enrollment_lbl'));
    this.accrualsLbl = element(by.id('accruals_lbl'));

    //Observantional
    this.studyModelLbl = element(by.id('study_model_lbl'));
    this.timePerspectiveLbl = element(by.id('tp_lbl'));
    this.bioSpecimenRetentionLbl = element(by.id('bio_specimen_retention_lbl'));
    this.bioSpecimenDescriptionLbl = element(by.id('bio_specimen_desc_lbl'));


    /***********************************
     * Trial Design Required Message
     ***********************************/

    this.notFoundMsg = element.all(by.css('.help-block.ng-binding'));
    this.requiredMsg = element.all(by.css('.help-block.ng-scope'));

    this.trialOverviewLbls = element.all(by.css('.col-sm-4.col-xs-12>p'));

    this.saveTrialDesignBtn = element(by.id('save_btn'));
    this.resetTrialDesignBtn = element(by.id('cancel_btn'));


    this.selectClinicalResearchCategory = function(optionCRC)  {
        helper.selectValueFromList(this.researchCategoryLst, optionCRC, "Clinical Research Category - List field");
    };

    this.selectPrimaryPurpose = function(optionPP)  {
        helper.selectValueFromList(this.primaryPurposeLst, optionPP, "Primary Purpose - List field");
    };

    this.selectSecondaryPurpose = function(optionSP)  {
        helper.selectValueFromList(this.secondaryPurposeLst, optionSP, "Secondary Purpose - List field");
    };

    this.selectTrialPhase = function(optionTP)  {
        helper.selectValueFromList(this.trialPhaseLst, optionTP, "Trial Phase - List field");
    };

    this.clickRadioIsThisAPilot = function(optionITAP)  {
        helper.clickRadioButton(this.isThisAPilot, optionITAP, "Is this a pilot - Radio Button");
    };

    this.selectInterventionalModel = function(optionIM)  {
        helper.selectValueFromList(this.interventionModelLst, optionIM, "Intervention Model - List field");
    };

    this.selectMasking = function(optionM)  {
        helper.selectValueFromList(this.maskingLst, optionM, "Masking - List field");
    };

    this.selectAllocation = function(optionA)  {
        helper.selectValueFromList(this.allocationLst, optionA, "Allocation - List field");
    };

    this.selectStudyClassification = function(optionSC)  {
        helper.selectValueFromList(this.studyClassficationLst, optionSC, "Study Classification - List field");
    };

    this.setNumberOfArmsGroups = function(number){
        helper.setValue(this.numberOfArmsTxt, number, 'Number of Arms Group Text -');
    };

    this.setTargetEnrollment = function(number){
        helper.setValue(this.targetEnrollmentTxt, number, 'Target Enrollment Text -');
    };

    this.setFinalEnrollmentForCT = function(number){
        helper.setValue(this.finalEnrollmentTxt, number, 'Final Enrollment for CT.gov Text -');
    };
    this.selectStudyModel = function(optionA)  {
        helper.selectValueFromList(this.studyModelLst, optionA, "Study Model - List field");
    };

    this.selectTimePerspective = function(optionA)  {
        helper.selectValueFromList(this.timePerspectiveLst, optionA, "Time Perspective - List field");
    };

    this.selectBioSpecimenRetention = function(optionA)  {
        helper.selectValueFromList(this.bioSpecimenRetentionLst, optionA, "Bio-specimen Retention - List field");
    };

    this.setBioSpecimenDescription = function(txt)  {
        helper.setValue(this.bioSpecimenDescriptionTxt, txt, "Bio-specimen Retention - Text field");
    };

    this.checkTrialDesignPageTitle = function (titleTXT){
        this.waitForElement(self.trialDesignHeader, 'Waiting For Page title');
        self.trialDesignHeader.isDisplayed().then(function(result) {
            if (result) {
                expect(self.trialDesignHeader.getText()).to.eventually.equal(titleTXT);
            }
        });
    };

    this.verifyTrialDesignLables = function (clinicalRCType, clinicalRCLbl, primaryPurps, secondryPurps, trialPhas, isThisPilot, InterventionModl, maskng, allocatn, studyClssifctn, studyModl, tmePerspectv, biospeciReten, biospeciDesc, nmbrOfArmsGrp, targetEnrollmnt, finalEnrollmntCT, accrualsLbl){
        helper.getVerifyLabel(this.clinicalResearchCategoryLbl, clinicalRCLbl, "Clinical Research Category:");
        helper.getVerifyLabel(this.primaryPurposeLbl, primaryPurps, "Primary Purpose:");
        helper.getVerifyLabel(this.secondaryPurposeLbl, secondryPurps, "Secondary Purpose:");
        helper.getVerifyLabel(this.trialPhaseLbl, trialPhas, "Trial Phase:");
        helper.getVerifyLabel(this.isThisAPilotLbl, isThisPilot, "Is this a pilot?:");
        if (clinicalRCType === 'Interventional' || clinicalRCType === 'Expanded Access'){
            //Interventional or Expanded Access
            helper.getVerifyLabel(this.interventionModelLbl, InterventionModl, "Intervention Model:");
            helper.getVerifyLabel(this.maskingLbl, maskng, "Masking:");
            helper.getVerifyLabel(this.allocationLbl, allocatn, "Allocation:");
            helper.getVerifyLabel(this.studyClassificationLbl, studyClssifctn, "Study Classification:");
        } else if (clinicalRCType === 'Observational' || clinicalRCType === 'Ancillary Correlative'){
            //Observational or Ancillary Correlative
            helper.getVerifyLabel(this.studyModelLbl, studyModl, "Study Model:");
            helper.getVerifyLabel(this.timePerspectiveLbl, tmePerspectv, "Time Perspective:");
            helper.getVerifyLabel(this.bioSpecimenRetentionLbl, biospeciReten, "Bio-specimen Retention:");
            helper.getVerifyLabel(this.bioSpecimenDescriptionLbl, biospeciDesc, "Bio-specimen Description:");
        }
        helper.getVerifyLabel(this.numberOfArmsLbl, nmbrOfArmsGrp, "Number of Arms/Groups:");
        helper.getVerifyLabel(this.targetEnrollmentLbl, targetEnrollmnt, "Target Enrollment:");
        helper.getVerifyLabel(this.finalEnrollmentLbl, finalEnrollmntCT, "Final Enrollment for CT.gov:");
        helper.getVerifyLabel(this.accrualsLbl, accrualsLbl, "Accruals:");
    };







    this.findAssociatedTrialToVerifyEditCopyDelete = function(expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf){
        this.waitForAssociatedTrailDetailsElement(self.tableTBodyRowAColA, "List of Associated Trials Table");
        this.tableAssociatedAll.then(function(rows){
            console.log('List of Associated Trials Table Total Row Count:['+(rows.length)+']');
            rowsLengthVal = ''+(rows.length)+'';
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    fNm('1', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 2){
                    console.log('i:['+i+']');
                    fNm('2', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                }
            }
        });
        function fNm(iVal, exppectedTrialIdentifier, whatToDo, identifierTypVf, trialTypVf, officialTtleVf){
            var tableTrialIdentifier = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(01)'));
            getCurrentTrialIdentifier = tableTrialIdentifier.getText('value');
            getCurrentTrialIdentifier.then(function(typeVal){
                console.log("Trial Identifier Type:["+typeVal+"]");
                if(exppectedTrialIdentifier === typeVal){
                    if (whatToDo === 'verify'){
                        console.log("Verifying Trial Identifier Expected Value:["+exppectedTrialIdentifier+"]");
                        console.log("Verifying Trial Identifier Actual Value:["+typeVal+"]");
                        expect(exppectedTrialIdentifier.toString()).to.eql(typeVal.toString());
                        if (identifierTypVf !== ''){
                            var identifierTypeVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(02)'));
                            identifierTypValVf = identifierTypeVal.getText('value');
                            identifierTypValVf.then(function(idenTypValCr){
                                expect(identifierTypVf.toString()).to.eql(idenTypValCr.toString());
                            });
                        }
                        if (trialTypVf !== ''){
                            var trialTypeVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(03)'));
                            trialTypValVf = trialTypeVal.getText('value');
                            trialTypValVf.then(function(trialTypeValCr){
                                expect(trialTypVf.toString()).to.eql(trialTypeValCr.toString());
                            });
                        }
                        if (officialTtleVf !== ''){
                            var officialVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(04)'));
                            officialValVf = officialVal.getText('value');
                            officialValVf.then(function(officialValCr){
                                expect(officialTtleVf.toString()).to.eql(officialValCr.toString());
                            });
                        }
                    } else if(whatToDo === 'notexists'){
                        var foundRecord = 'Value : '+exppectedTrialIdentifier+' should not be exists';
                        var notExistsRecord = 'Value : '+exppectedTrialIdentifier+' exists';
                        expect(foundRecord.toString()).to.eql(notExistsRecord.toString());
                    } else if(whatToDo === 'link') {
                        if (identifierTypVf === 'NCI'){
                            var linkDataRwNCI = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(01) #associated_nci a'));
                            helper.clickButton(linkDataRwNCI, "Click NCI - Link");
                        } else if (identifierTypVf === 'NCT') {
                            var linkDataRwNCT = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(01) #associated_ctdotgov a'));
                            helper.clickButton(linkDataRwNCT, "Click NCT - Link");
                        }
                    } else if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(05) input'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    }
                }
                if (exppectedTrialIdentifier != typeVal && iVal === '8'){
                    if (whatToDo === 'verify'){
                        console.log("Verifying Trial Identifier Expected value:["+exppectedTrialIdentifier+"]");
                        console.log("Verifying Trial Identifier Actual value:["+typeVal+"]");
                        expect(exppectedTrialIdentifier.toString()).to.eql(typeVal.toString());
                    } else if(whatToDo === 'notexists'){
                        var notExistsRecordA = 'Value : '+exppectedTrialIdentifier+' does not exists';
                        var notExistsRecordB = 'Value : '+exppectedTrialIdentifier+' does not exists';
                        expect(notExistsRecordA.toString()).to.eql(notExistsRecordB.toString());
                    }
                }
            });
        }
    };

    this.reorderRowByDragAndDrop = function(){
        browser.actions()
            .mouseDown(element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(02)')))
            .mouseMove(element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(02)')))
            .mouseUp()
            .perform();
    };

    //Wait For Element : Wait
    this.waitForAssociatedTrailDetailsElement = function (element, label) {
        browser.wait(function () {
            return element.isPresent().then(function (state) {
                if (state === true) {
                    return element.isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, label + " did not appear");
        browser.sleep(250);
    };



    this.verifyCharLeft = function(charLeft, index){
        this.waitForElement(self.characterLeftLbl.get(index), 'Waiting For Page title');
        self.characterLeftLbl.get(index).isDisplayed().then(function(result) {
            if (result) {
                expect(self.characterLeftLbl.get(index).getText()).to.eventually.equal(charLeft);
            }
        });
    };

    this.waitForElement = function (element, label) {
        browser.wait(function () {
            return element.isPresent().then(function (state) {
                if (state === true) {
                    return element.isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, label + " did not appear");
        browser.sleep(250);
    };

    this.verifyAssociatedListTableTHead = function (){
        var thd = new Array("Trial Identifier", "Identifier Type", "Trial Type", "Official Title");
        helper.verifyTableRowText(self.tableTHeadColA, thd[0], 'Trial Identifier');
        helper.verifyTableRowText(self.tableTHeadColB, thd[1], 'Identifier Type');
        helper.verifyTableRowText(self.tableTHeadColC, thd[2], 'Trial Type');
        helper.verifyTableRowText(self.tableTHeadColD, thd[3], 'Official Title');
    };

    this.verifyAssociatedListTableTHeadByVal = function (TrialIdentifier, IdentifierType, TrialType, OfficialTitle){
        helper.verifyTableRowText(self.tableTHeadColA, TrialIdentifier, 'Trial Identifier');
        helper.verifyTableRowText(self.tableTHeadColB, IdentifierType, 'Identifier Type');
        helper.verifyTableRowText(self.tableTHeadColC, TrialType, 'Trial Type');
        helper.verifyTableRowText(self.tableTHeadColD, OfficialTitle, 'Official Title');
    };

    this.verifyResearchCategoryLookup = function(expResearchCat){
        this.waitForElement(self.researchCategoryVw, 'Waiting For Page title');
        self.researchCategoryVw.getText().then(function(result) {
            console.log('Current Research Category value: '+result+'');
            if (result !== '') {
                var expResearchCatVal = 'System Identified the research category value: '+result+'';
                var actResearchCatVal = 'System Identified the research category value: '+result+'';
                expect(expResearchCatVal.toString()).to.eql(actResearchCatVal.toString());
                if (expResearchCat != ''){
                    expect(self.researchCategoryVw.getText()).to.eventually.equal(expResearchCat);
                }
            } else {
                var expResCatVal = 'Unable to display Expected Research Category: '+result+'';
                var actResCatVal = 'Unable to display Actual Research Category: '+result+'';
                expect(expResCatVal.toString()).to.eql(actResCatVal.toString());
            }
        });
    };

    this.verifyOfficialTitleLookup = function(expOfficialTitle){
        this.waitForElement(self.officialTitleVw, 'Waiting For Page title');
        self.officialTitleVw.getText().then(function(result) {
            if (result != '') {
                var expResearchCatVal = 'System Identified the Official Title value: '+result+'';
                var actResearchCatVal = 'System Identified the Official Title value: '+result+'';
                expect(expResearchCatVal.toString()).to.eql(actResearchCatVal.toString());
                if (expOfficialTitle != ''){
                    //expect(self.officialTitleVw.getText()).to.eventually.equal(expOfficialTitle).then(function (pass){console.log('Passed:'+pass);}, function(err){console.log('Error:'+err); browser.sleep(25).then(callback);});
                    expect(self.officialTitleVw.getText()).to.eventually.equal(expOfficialTitle);
                }
            } else {
                var expResCatVal = 'Unable to display Expected Official Title';
                var actResCatVal = 'Unable to display Actual Official Title';
                expect(expResCatVal.toString()).to.eql(actResCatVal.toString());
            }
        });
    };

    this.verifyViewAssociatedTrialNCI = function (expLeadOrgTrialID, expNCIID, expProtocolID1, expProtocolID2, expProtocolID3){
        this.waitForElement(self.viewLeadOrgTrialID, 'Waiting For View Associated Trial Page');
        expect(self.viewLeadOrgTrialID.getText()).to.eventually.equal(expLeadOrgTrialID);
        expect(self.viewNCIID.getText()).to.eventually.equal(expNCIID);
        if (expProtocolID1 !== ''){
            self.viewProtocolID1.isDisplayed().then(function(result) {
                if (result) {
                    expect(self.viewProtocolID1.getText()).to.eventually.equal(expProtocolID1);
                }
            });
        } else if (expProtocolID2 !== ''){
            self.viewProtocolID2.isDisplayed().then(function(result) {
                if (result) {
                    expect(self.viewProtocolID2.getText()).to.eventually.equal(expProtocolID2);
                }
            });
        } else if (expProtocolID3 !== ''){
            self.viewProtocolID3.isDisplayed().then(function(result) {
                if (result) {
                    expect(self.viewProtocolID3.getText()).to.eventually.equal(expProtocolID3);
                }
            });
        }
    };

    this.verifyTrialOverview = function (index, expectedVal){
        self.trialOverviewLbls.get(index).getText().then(function(overviewInfo){
            console.log('Trial Overview in index: ['+ index +'] identified as: ['+ overviewInfo +']');
            expect(expectedVal.toString()).to.eql(overviewInfo.toString());
        });
    };

    this.clickViewCloseBtn = function(){
        helper.clickButton(this.viewCloseBtn, "View Close - Button");
    };

    //Save and Reset

    this.clickSaveTrialDesign = function(){
        helper.clickButton(this.saveTrialDesignBtn, "Save - Button");
        helper.wait_for(300);
    };

    this.clickResetTrialDesign = function(){
        helper.clickButton(self.resetTrialDesignBtn, "Reset - Button");
    };

};

module.exports = scientificTrialDesign;
