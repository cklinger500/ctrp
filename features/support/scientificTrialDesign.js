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
//Left Navigation
var abstractionLeftNavigationMenus = require('../support/abstractionLeftNav');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var scientificTrialDesign = function(){

    var commonFunctions = new abstractionCommonMethods();
    var leftNav = new abstractionLeftNavigationMenus();
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
    this.trialPhaseLstModel = element.all(by.model('designView.trialDetailObj.phase_id'));

    this.isThisAPilotYes = element(by.id('is_this_pilot_yes'));
    this.isThisAPilotNo = element(by.id('is_this_pilot_no'));
    this.isThisAPilot = element.all(by.model('designView.trialDetailObj.pilot'));

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
    this.descriptionOfOtherPrimaryPurposeLbl = element(by.id('desc_op_lbl'));
    this.descriptionOfOtherSecondaryPurposeTxt = element(by.id('description_other2'));
    this.descriptionOfOtherSecondaryPurposeLbl = element(by.id('desc_other_sp_lbl'));
    this.descriptionOfOtherStudyModelTxt = element(by.id('study_model_other'));
    this.descriptionOfOtherStudyModelLbl = element(by.id('desc_other_study_model_lbl'));
    this.descriptionOfOtherTimePerspectiveTxt = element(by.id('time_perspective_other'));
    this.descriptionOfOtherTimePerspectiveLbl = element(by.id('desc_other_tp_lbl'));

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

    //Masking Roles Labels
    this.maskingRolesLbl = element.all(by.css('.checkbox.checkbox-info>label'));
    this.maskingRolesMsg = element.all(by.css('.help-block'));

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

    this.setPrimaryOtherDescription = function(txt)  {
        self.waitForTrialDesignElement(self.descriptionOfOtherPrimaryPurposeTxt, "Waiting For: Description of Other Primary Purpose - Text field");
        helper.setValue(self.descriptionOfOtherPrimaryPurposeTxt, txt, "Description of Other Primary Purpose - Text field");
    };

    this.setSecondaryOtherDescription = function(txt)  {
        self.waitForTrialDesignElement(self.descriptionOfOtherSecondaryPurposeTxt, "Waiting For: Description of Other Secondary Purpose - Text field");
        helper.setValue(self.descriptionOfOtherSecondaryPurposeTxt, txt, "Description of Other Secondary Purpose - Text field");
    };

    this.setStudyModelOtherDescription = function(txt)  {
        self.waitForTrialDesignElement(self.descriptionOfOtherStudyModelTxt, "Waiting For: Description of Other Study Model - Text field");
        helper.setValue(self.descriptionOfOtherStudyModelTxt, txt, "Description of Other Study Model - Text field");
    };

    this.setTimePerspectiveOtherDescription = function(txt)  {
        self.waitForTrialDesignElement(self.descriptionOfOtherTimePerspectiveTxt, "Waiting For: Description of Other Time Perspective - Text field");
        helper.setValue(self.descriptionOfOtherTimePerspectiveTxt, txt, "Description of Other Time Perspective - Text field");
    };

    this.verifyPrimaryPurposeOther = function(expLbltxt, expText){
        this.waitForElement(self.descriptionOfOtherPrimaryPurposeTxt, 'Waiting For Description of Other Primary Purpose Text Field');
        this.waitForElement(self.descriptionOfOtherPrimaryPurposeLbl, 'Waiting For Description of Other Primary Purpose Label Field');
        self.descriptionOfOtherPrimaryPurposeLbl.getText().then(function(lblTxt){
            console.log('Labels value identified as: ['+ lblTxt +']');
            expect(expLbltxt.toString()).to.eql(lblTxt.toString());
        });
        if (expText !== ''){
            commonFunctions.verifyTextFieldValue(self.descriptionOfOtherPrimaryPurposeTxt, expText);
        }
    };

    this.verifySecondaryPurposeOther = function(expLbltxt, expText){
        this.waitForElement(self.descriptionOfOtherSecondaryPurposeTxt, 'Waiting For Description of Other Secondary Purpose Text Field');
        this.waitForElement(self.descriptionOfOtherSecondaryPurposeLbl, 'Waiting For Description of Other Secondary Purpose Label Field');
        self.descriptionOfOtherSecondaryPurposeLbl.getText().then(function(lblTxt){
            console.log('Labels value identified as: ['+ lblTxt +']');
            expect(expLbltxt.toString()).to.eql(lblTxt.toString());
        });
        if (expText !== ''){
            commonFunctions.verifyTextFieldValue(self.descriptionOfOtherSecondaryPurposeTxt, expText);
        }
    };

    this.verifyStudyModelOther = function(expLbltxt, expText){
        this.waitForElement(self.descriptionOfOtherStudyModelTxt, 'Waiting For Description of Other Study Model Text Field');
        this.waitForElement(self.descriptionOfOtherStudyModelLbl, 'Waiting For Description of Other Study Model Label Field');
        self.descriptionOfOtherStudyModelLbl.getText().then(function(lblTxt){
            console.log('Labels value identified as: ['+ lblTxt +']');
            expect(expLbltxt.toString()).to.eql(lblTxt.toString());
        });
        if (expText !== ''){
            commonFunctions.verifyTextFieldValue(self.descriptionOfOtherStudyModelTxt, expText);
        }
    };

    this.verifyTimePerspectiveOther = function(expLbltxt, expText){
        this.waitForElement(self.descriptionOfOtherTimePerspectiveTxt, 'Waiting For Description of Other Time Perspective Text Field');
        this.waitForElement(self.descriptionOfOtherTimePerspectiveLbl, 'Waiting For Description of Other Time Perspective Label Field');
        self.descriptionOfOtherTimePerspectiveLbl.getText().then(function(lblTxt){
            console.log('Labels value identified as: ['+ lblTxt +']');
            expect(expLbltxt.toString()).to.eql(lblTxt.toString());
        });
        if (expText !== ''){
            commonFunctions.verifyTextFieldValue(self.descriptionOfOtherTimePerspectiveTxt, expText);
        }
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

    this.reorderRowByDragAndDrop = function(){
        browser.actions()
            .mouseDown(element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(02)')))
            .mouseMove(element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(02)')))
            .mouseUp()
            .perform();
    };

    //Wait For Element : Wait
    this.waitForTrialDesignElement = function (element, label) {
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

    this.verifyMaskingRolesLables = function (index, expectedVal){
        this.waitForElement(self.maskingRolesLbl.get(index), 'Waiting For Masking Roles');
        self.maskingRolesLbl.get(index).getText().then(function(lblTxt){
            console.log('Masking Roles Labels: ['+ index +'] identified as: ['+ lblTxt +']');
            expect(expectedVal.toString()).to.eql(lblTxt.toString());
        });
    };

    this.verifyScientificTrialDesign = function(){
        return leftNav.scientificTrialDesign.isDisplayed().then(function (state2) {
            return state2 === true;
        });
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

    //this.verifyResearchCategoryLookup = function(expResearchCat){
    //    this.waitForElement(self.researchCategoryVw, 'Waiting For Page title');
    //    self.researchCategoryVw.getText().then(function(result) {
    //        console.log('Current Research Category value: '+result+'');
    //        if (result !== '') {
    //            var expResearchCatVal = 'System Identified the research category value: '+result+'';
    //            var actResearchCatVal = 'System Identified the research category value: '+result+'';
    //            expect(expResearchCatVal.toString()).to.eql(actResearchCatVal.toString());
    //            if (expResearchCat != ''){
    //                expect(self.researchCategoryVw.getText()).to.eventually.equal(expResearchCat);
    //            }
    //        } else {
    //            var expResCatVal = 'Unable to display Expected Research Category: '+result+'';
    //            var actResCatVal = 'Unable to display Actual Research Category: '+result+'';
    //            expect(expResCatVal.toString()).to.eql(actResCatVal.toString());
    //        }
    //    });
    //};
    //
    //this.verifyOfficialTitleLookup = function(expOfficialTitle){
    //    this.waitForElement(self.officialTitleVw, 'Waiting For Page title');
    //    self.officialTitleVw.getText().then(function(result) {
    //        if (result != '') {
    //            var expResearchCatVal = 'System Identified the Official Title value: '+result+'';
    //            var actResearchCatVal = 'System Identified the Official Title value: '+result+'';
    //            expect(expResearchCatVal.toString()).to.eql(actResearchCatVal.toString());
    //            if (expOfficialTitle != ''){
    //                //expect(self.officialTitleVw.getText()).to.eventually.equal(expOfficialTitle).then(function (pass){console.log('Passed:'+pass);}, function(err){console.log('Error:'+err); browser.sleep(25).then(callback);});
    //                expect(self.officialTitleVw.getText()).to.eventually.equal(expOfficialTitle);
    //            }
    //        } else {
    //            var expResCatVal = 'Unable to display Expected Official Title';
    //            var actResCatVal = 'Unable to display Actual Official Title';
    //            expect(expResCatVal.toString()).to.eql(actResCatVal.toString());
    //        }
    //    });
    //};
    //
    //this.verifyViewAssociatedTrialNCI = function (expLeadOrgTrialID, expNCIID, expProtocolID1, expProtocolID2, expProtocolID3){
    //    this.waitForElement(self.viewLeadOrgTrialID, 'Waiting For View Associated Trial Page');
    //    expect(self.viewLeadOrgTrialID.getText()).to.eventually.equal(expLeadOrgTrialID);
    //    expect(self.viewNCIID.getText()).to.eventually.equal(expNCIID);
    //    if (expProtocolID1 !== ''){
    //        self.viewProtocolID1.isDisplayed().then(function(result) {
    //            if (result) {
    //                expect(self.viewProtocolID1.getText()).to.eventually.equal(expProtocolID1);
    //            }
    //        });
    //    } else if (expProtocolID2 !== ''){
    //        self.viewProtocolID2.isDisplayed().then(function(result) {
    //            if (result) {
    //                expect(self.viewProtocolID2.getText()).to.eventually.equal(expProtocolID2);
    //            }
    //        });
    //    } else if (expProtocolID3 !== ''){
    //        self.viewProtocolID3.isDisplayed().then(function(result) {
    //            if (result) {
    //                expect(self.viewProtocolID3.getText()).to.eventually.equal(expProtocolID3);
    //            }
    //        });
    //    }
    //};

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
