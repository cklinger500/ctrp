/**
 * Author: Shamim Ahmed
 * Date: 07/12/2016
 * Page Object: Scientific Outcome Measures
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

var scientificOutcomeMeasures = function(){

    var commonFunctions = new abstractionCommonMethods();
    var dateFunctions = new addTrialPage();
    var helper = new helperFunctions();
    var self = this;

    /***********************************
     * List of Outcome Measure object(s)
     ***********************************/

    this.addOutcomeMeasureBtn = element(by.id('add_outcome_measure'));
    this.deleteSelectedOutcome = element(by.id('delete'));
    this.deleteConfirmOutcome = element(by.id('confirmed_btn'));
    this.deleteCancelOutcome = element(by.id('cancel_confirm_btn'));

    this.tableOutcomeAll = element.all(by.css('.table.table-bordered.table-striped.table-hover tbody tr'));
    this.tableTHeadOutcome = element(by.css('.table.table-bordered.table-striped.table-hover thead'));
    this.tableTHeadColA = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(01)'));
    this.tableTHeadColB = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(02)'));
    this.tableTHeadColC = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(03)'));
    this.tableTHeadColD = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(04)'));
    this.tableTHeadColE = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(05)'));
    this.tableTHeadColF = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(06)'));
    this.tableTHeadColG = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(07)'));
    this.tableTHeadColH = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(08)'));

    this.tableSelectAll = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(09) input'));



    /***********************************
     * Outcome Measure Details object(s)
     ***********************************/
    this.outcomeMeasureTypeLst = element(by.id('om_type'));
    this.outcomeMeasureTypeLbl = element(by.css('label[for="om_type"]'));
    this.titleTxt = element(by.id('title'));
    this.titleLbl = element.all(by.css('label[for="title"]'));
    this.timeFrameTxt = element(by.id('time_frame'));
    this.timeFrameLbl = element.all(by.css('label[for="title"]'));
    this.descriptionTxt = element(by.id('description'));
    this.descriptionLbl = element(by.css('label[for="description"]'));
    this.safetyIssueLst = element(by.id('safety_issue'));
    this.safetyIssueLbl = element(by.css('label[for="safety_issue"]'));

    this.characterLeftLbl = element.all(by.css('.help-block.ng-binding'));
    this.requiredMsg = element.all(by.css('.help-block.ng-scope'));

    this.saveOutBtn = element(by.id('submit_processing'));
    this.resetOutBtn = element(by.id('out_cm_reset'));
    this.backToOutcomeMeasuresListBtn = element(by.id('oc_site_list'));

    this.outcomePageTitleList = element(by.id('pg_title'));
    this.outcomePageTitleDetails = element(by.id('outcome_measure_details'));

    this.clickAddOutcomeMeasure = function(){
        helper.clickButton(this.addOutcomeMeasureBtn, "Add Outcome Measure - Button");
    };

    this.selectAllOutcomeMeasure = function (){
        helper.clickButton(this.tableSelectAll, "Selecte All - Button");
    };

    this.clickDeleteSelectedOutcome = function(yesCancel){
        helper.clickButton(this.deleteSelectedOutcome, "Delete Selected List of Outcome Measures - Button");
        this.waitForTrailDetailsElement(self.deleteConfirmOutcome, "Waiting for Delete Yes button to be present");
        if (yesCancel === 'yes'){
            helper.clickButton(this.deleteConfirmOutcome, "Delete Confirm - Button");
        } else if (yesCancel === 'cancel'){
            helper.clickButton(this.deleteCancelOutcome, "Delete Cancel - Button");
        }
    };

    this.deleteAllOutcomeList = function(yesOrCancel){
        self.tableTHeadOutcome.isDisplayed().then(function(result) {
            if (result === true) {
                self.selectAllOutcomeMeasure();
                self.clickDeleteSelectedOutcome(yesOrCancel);
            }
        });
    };

    this.verifyDeleteAllOutcomeList = function(){
        self.tableTHeadOutcome.isDisplayed().then(function(result) {
            if (result === false) {
                var notExistsTableA = 'Table Status : '+result+'';
                var notExistsTableB = 'Table Status : '+result+'';
                expect(notExistsTableA.toString()).to.eql(notExistsTableB.toString());
            } else if (result === true){
                var notExistsTableC = 'Table Status : '+result+'';
                var notExistsTableD = 'Table Status : '+result+' but Status should be false';
                expect(notExistsTableC.toString()).to.eql(notExistsTableD.toString());
            }
        });
    };

    this.selectOutcomeMeasureType = function(type)  {
        helper.selectValueFromList(this.outcomeMeasureTypeLst, type, "Outcome Measure Type - List field");
    };

    this.setTitleTxt = function(getTitleTxt){
        helper.setValue(this.titleTxt, getTitleTxt, 'Title');
        helper.wait_for(100);
    };

    this.setTimeFrameTxt = function(getTiemFrameTxt){
        helper.setValue(this.timeFrameTxt, getTiemFrameTxt, 'Time Frame');
        helper.wait_for(100);
    };

    this.setDescriptionTxt = function(getDescTxt){
        helper.setValue(this.descriptionTxt, getDescTxt, 'Description');
        helper.wait_for(100);
    };

    this.selectSafetyIssue = function(options)  {
        helper.selectValueFromList(this.safetyIssueLst, options, "Safety Issue - List field");
    };

    this.checkOutcomePageTitle = function (titleTXT, listOrDetails){
        if (listOrDetails === 'list'){
            this.waitForElement(self.outcomePageTitleList, 'Waiting For Page title');
            self.outcomePageTitleList.isDisplayed().then(function(result) {
                if (result) {
                    expect(self.outcomePageTitleList.getText()).to.eventually.equal(titleTXT);
                }
            });
        } else if (listOrDetails === 'details'){
            this.waitForElement(self.outcomePageTitleDetails, 'Waiting For Page title');
            self.outcomePageTitleDetails.isDisplayed().then(function(result) {
                if (result) {
                    expect(self.outcomePageTitleDetails.getText()).to.eventually.equal(titleTXT);
                }
            });
        }
    };

    this.tableTBodyRowAColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(01)'));
    var rowsLengthVal = '';
    this.findOutcomeToVerifyEditCopyDelete = function(expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf){
        this.waitForTrailDetailsElement(self.tableTBodyRowAColA, "Outcome Measures Table");
        this.tableOutcomeAll.then(function(rows){
            console.log('Indetifier Type Total Row Count:['+(rows.length)+']');
            rowsLengthVal = ''+(rows.length)+'';
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    fNm('1', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 2){
                    console.log('i:['+i+']');
                    fNm('2', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                }
            }
        });
        function fNm(iVal, expectedOutcomeType, whatToDo, titleVf, timeVf, descVf, safetyVf){
            var tableOutcomeMeasureType = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(02)'));
            getCurrentOutcomeType = tableOutcomeMeasureType.getText('value');
            getCurrentOutcomeType.then(function(typeVal){
                console.log("Outcome Measures Type:["+typeVal+"]");
                if(expectedOutcomeType === typeVal){
                    if (whatToDo === 'verify'){
                        console.log("Verifying Outcome Measures Expected Type:["+expectedOutcomeType+"]");
                        console.log("Verifying Outcome Measures Actual Type:["+typeVal+"]");
                        expect(expectedOutcomeType.toString()).to.eql(typeVal.toString());
                        if (titleVf !== ''){
                            var titleVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(03)'));
                            titleValVf = titleVal.getText('value');
                            titleValVf.then(function(titleValCr){
                                expect(titleVf.toString()).to.eql(titleValCr.toString());
                            });
                        }
                        if (timeVf !== ''){
                            var timeVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(04)'));
                            timeValVf = timeVal.getText('value');
                            timeValVf.then(function(timeValCr){
                                expect(timeVf.toString()).to.eql(timeValCr.toString());
                            });
                        }
                        if (descVf !== ''){
                            var descVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(05)'));
                            descValVf = descVal.getText('value');
                            descValVf.then(function(descValCr){
                                expect(descVf.toString()).to.eql(descValCr.toString());
                            });
                        }
                        if (safetyVf !== ''){
                            var safetyVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(06)'));
                            safetyValVf = safetyVal.getText('value');
                            safetyValVf.then(function(safetyValCr){
                                expect(safetyVf.toString()).to.eql(safetyValCr.toString());
                            });
                        }
                    }  else if(whatToDo === 'notexists'){
                        var foundRecord = 'Value : '+expectedOutcomeType+' should not be exists';
                        var notExistsRecord = 'Value : '+expectedOutcomeType+' exists';
                        expect(foundRecord.toString()).to.eql(notExistsRecord.toString());
                    } else if(whatToDo === 'edit'){
                        var editDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(07) button'));
                        helper.clickButton(editDataRw, "Edit - Button");
                    } else if(whatToDo === 'copy'){
                        var cpyDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(08) button'));
                        helper.clickButton(cpyDataRw, "Edit - Button");
                    } else if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(09) input'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    }
                }
                if (expectedOutcomeType != typeVal && iVal === '8'){
                    if (whatToDo === 'verify'){
                        console.log("Verifying Outcome Measures Expected Type:["+expectedOutcomeType+"]");
                        console.log("Verifying Outcome Measures Actual Type:["+typeVal+"]");
                        expect(expectedOutcomeType.toString()).to.eql(typeVal.toString());
                    } else if(whatToDo === 'notexists'){
                        var notExistsRecordA = 'Value : '+expectedOutcomeType+' does not exists';
                        var notExistsRecordB = 'Value : '+expectedOutcomeType+' does not exists';
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

    this.verifyDragAndDrop = function(iVal, expectedOutcomeType, titleVf, timeVf, descVf, safetyVf) {
        var outcomeMeasureType = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(02)'));
        getCurrentOutcomeType = outcomeMeasureType.getText('value');
        getCurrentOutcomeType.then(function (typeVal) {
            console.log("Outcome Measures Type:[" + typeVal + "]");
            expect(expectedOutcomeType.toString()).to.eql(typeVal.toString());
        });
        var titleVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(03)'));
        titleValVf = titleVal.getText('value');
        titleValVf.then(function (titleValCr) {
            console.log("Title:[" + titleValCr + "]");
            expect(titleVf.toString()).to.eql(titleValCr.toString());
        });
        var timeVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(04)'));
        timeValVf = timeVal.getText('value');
        timeValVf.then(function (timeValCr) {
            console.log("Time Frame:[" + timeValCr + "]");
            expect(timeVf.toString()).to.eql(timeValCr.toString());
        });
        var descVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(05)'));
        descValVf = descVal.getText('value');
        descValVf.then(function (descValCr) {
            console.log("Description:[" + descValCr + "]");
            expect(descVf.toString()).to.eql(descValCr.toString());
        });
        var safetyVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(06)'));
        safetyValVf = safetyVal.getText('value');
        safetyValVf.then(function (safetyValCr) {
            console.log("Safety Issue:[" + safetyValCr + "]");
            expect(safetyVf.toString()).to.eql(safetyValCr.toString());
        });
    };

    //Wait For Element : Wait
    this.waitForTrailDetailsElement = function (element, label) {
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

    this.verifyOutcomeMeasureLables = function (){
        var lbl = new Array("Outcome Measure Type:", "Title:", "Time Frame:", "Description:", "Safety Issue:");
        helper.getVerifyLabel(this.outcomeMeasureTypeLbl, lbl[0], "Outcome Measure Type");
        commonFunctions.verifyTxtByIndex(self.titleLbl, lbl[1], '0', 'Title');
        commonFunctions.verifyTxtByIndex(self.timeFrameLbl, lbl[2], '1', 'Time Frame');
        helper.getVerifyLabel(this.descriptionLbl, lbl[3], "Description");
        helper.getVerifyLabel(this.safetyIssueLbl, lbl[4], "Safety Issue");
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

    this.verifyOutcomeMeasureTHead = function (){
        var thd = new Array("Index", "Outcome Measure Type", "Title", "Time Frame", "Description", 'Safety Issue', 'Edit', 'Copy');
        helper.verifyTableRowText(self.tableTHeadColA, thd[0], 'Index');
        helper.verifyTableRowText(self.tableTHeadColB, thd[1], 'Outcome Measure Type');
        helper.verifyTableRowText(self.tableTHeadColC, thd[2], 'Title');
        helper.verifyTableRowText(self.tableTHeadColD, thd[3], 'Time Frame');
        helper.verifyTableRowText(self.tableTHeadColE, thd[4], 'Description');
        helper.verifyTableRowText(self.tableTHeadColF, thd[5], "Safety Issue");
        helper.verifyTableRowText(self.tableTHeadColG, thd[6], "Edit");
        helper.verifyTableRowText(self.tableTHeadColH, thd[7], "Copy");
    };

    //Save and Reset

    this.clickSaveOutcome = function(){
        helper.clickButton(this.saveOutBtn, "Save - Button");
        helper.wait_for(300);
    };

    this.clickResetOutcome = function(){
        helper.clickButton(self.resetOutBtn, "Reset - Button");
    };

    this.clickBackToOutcomeMeasuresList = function(){
        helper.clickButton(this.backToOutcomeMeasuresListBtn, "Back to Outcome Measures List page");
    };
};

module.exports = scientificOutcomeMeasures;
