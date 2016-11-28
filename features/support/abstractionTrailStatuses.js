/**
 * Author: Shamim Ahmed
 * Date: 05/10/2016
 * Page Object: Trial Status
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

var abstractionTrailStatuses = function(){

    var commonFunctions = new abstractionCommonMethods();
    var dateFunctions = new addTrialPage();
    var helper = new helperFunctions();
    var self = this;

    /*
     * Trial Status object(s)
     */

    //Trial Statuses
    this.statuesesStatusDate = element(by.model('trialStatusView.statusObj.status_date'));
    this.statuesesStatusDateCalendar = element(by.id('status_date_calendar'));
    this.statuesesStatus = element(by.model('trialStatusView.statusObj.trial_status_id')); //by.id('status_select')
    this.statuesesComment = element(by.model('trialStatusView.statusObj.comment'));
    this.statuesesWhyStoped = element(by.model('trialStatusView.statusObj.why_stopped'));
    this.statuesesAdd = element(by.id('trial_status_add_btn'));

    this.commentCharaLeft = element(by.css('.row.table-responsive .table.table-striped.table-condensed:nth-child(01) tbody tr:nth-child(1) td:nth-child(3) .ng-binding'));
    this.whyStdyCharaLeft = element(by.css('.row.table-responsive .table.table-striped.table-condensed:nth-child(01) tbody tr:nth-child(1) td:nth-child(4) .ng-binding'));

    this.trialStatusTbleExists = element.all(by.css('.table.table-bordered.table-striped.table-hover tbody'));
    this.trialStatusTbleAll = element.all(by.css('.table.table-bordered.table-striped.table-hover tbody tr'));
    this.trialStatusTble = element(by.css('.table.table-bordered.table-striped.table-hover'));

    this.tblStatusDateTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(01)'));
    this.tblStatusTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(02)'));
    this.tblCommentTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(03)'));
    this.tblWhyStopedTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(04)'));
    this.tblErrorsWarningTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(05)'));
    this.tblEditTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(06)'));
    this.tblDeleteTHd = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(07)'));

    this.tblStatusDateRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(01)'));
    this.tblStatusRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(02)'));
    this.tblCommentRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(03)'));
    this.tblWhyStopedRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(04)'));
    this.tblErrorsWarningRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(05)'));
    this.tblEditRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(06) #edit_btn'));
    this.tblDeleteRWA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(07) #delete_btn'));

    this.tblStatusDateRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(01)'));
    this.tblStatusRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(02)'));
    this.tblCommentRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(03) td:nth-child(03)'));
    this.tblWhyStopedRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(04) td:nth-child(04)'));
    this.tblErrorsWarningRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(05) td:nth-child(05)'));
    this.tblEditRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(06) td:nth-child(06) #edit_btn'));
    this.tblDeleteRWB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(07) td:nth-child(07) #delete_btn'));

    this.researchCategory = element(by.binding('paTrialOverview.trialDetailObj.research_category.name'));

    //trial status edit
    this.statuesesCancel = element(by.id('trial_status_cancel'));
    this.statuesesConfirm = element(by.id('trial_status_confirm'));
    //Status already exists
    this.statuesesAlreadyExists = element(by.css('.add-association-error.ng-binding'));

    //Trial Dates
    this.trialStartDate = element(by.id('trial_start_date'));
    this.trialStartDateCalendar = element(by.id('trial_start_date_calendar'));
    this.trialStartDateRadioActual = element(by.id('trial_start_date_radio_btn_actual'));
    this.trialStartDateRadioAnticipated = element(by.id('trial_start_date_radio_btn_anticipated'));
    this.primaryCompletionDate = element(by.id('primary_completion_date'));
    this.primaryCompletionDateCalendar = element(by.id('primary_completion_date_calendar'));
    this.primaryCompletionDateRadioActual = element(by.id('primary_completion_date_radio_btn_actual'));
    this.primaryCompletionDateRadioAnticipated = element(by.id('primary_completion_date_radio_btn_anticipated'));
    this.primaryCompletionDateRadioNA = element(by.id('primary_completion_date_radio_btn_na'));
    this.completionDate = element(by.id('completion_date'));
    this.completionDateCalendar = element(by.id('completion_date_calendar'));
    this.completionDateRadioActual = element(by.id('completion_date_radio_btn_actual'));
    this.completionDateRadioAnticipated = element(by.id('completion_date_radio_btn_anticipated'));

    this.primaryCompletionDateNAErr = element(by.id('primary_completion_date_radio_btn_na_err'));
    this.primaryCompletionDateErr = element(by.id('primary_completion_date_type_err'));
    this.trialStartDateErr = element.all(by.css('.help-block.ng-scope'));
    this.statusAlreadyExists = element.all(by.css('.add-association-error.ng-binding'));

    //Trial Comment
    this.trialComment = element(by.id('status_comment'));
    this.trialCommentAddBtn = element(by.id('trial_comment_add_btn'));
    this.trialCommentDisp = element(by.css('.trial-comments'));

    //Save and Reset
    this.trialStatusSaveBtn = element(by.id('save_btn'));
    this.trialStatusResetBtn = element(by.id('cancel_btn'));

    //Back to Search Results
    this.trialStatusBackToSearchResultBtn = element(by.id('back_to_search'));

    //Refer Rules
    this.trialStatusTransitionRules = element(by.css('.row.table-responsive>div>p'));
    this.trialStatusDatesRules = element(by.css('.row.top-offset-xs'));

    //Wiki obj
    this.wikiTitle = element(by.css('#title-text'));

    //Page class
    this.trialStatusSec = element(by.css('.row.table-responsive'));
    this.trialStatusPage = element(by.css('.trial-status'));

    //Trial Statuses

    this.setStatusDate = function(dateYear, dateMonth, dateDay){
        this.statuesesStatusDate.click();
        dateFunctions.clickAddTrialDateFieldDifferentYear(dateYear, dateMonth, dateDay);
    };

    this.selectStatus = function(getValue){
      helper.selectValueFromList(this.statuesesStatus, getValue, 'Select Status');
      helper.wait_for(200);
    };

    this.selectStatusByXpath = function(trialStatus)  {
        var  selectTrialStatus =  element(by.xpath('//*[@id="status_select"]/option[.="' + trialStatus + '"]'));
        var  selectTrialStatusDefault =  element(by.xpath('//*[@id="status_select"]/option[.="Select a status"]'));
        if(trialStatus === '') {
            helper.selectValue(selectTrialStatusDefault,'Select a status',"Default trial status");
        } else{
            helper.selectValue(selectTrialStatus, trialStatus, "Trial Status");
        }
    };

    this.selectDisableStatus = function(getValue){
        helper.selectDisableValueFromList(this.statuesesStatus, getValue, 'Select Status');
        helper.wait_for(200);
    };

    this.setStatusComment = function(getCommentValue){
      helper.setValue(this.statuesesComment, getCommentValue, 'Status comment');
      helper.wait_for(1000);
    };

    this.setWhyStudyStopped = function(getWhyStoppedValue){
      helper.setValue(this.statuesesWhyStoped, getWhyStoppedValue, 'Why Study Stopped');
    };

    this.clickAddTrialStatus = function(){
      helper.clickButton(this.statuesesAdd, "Trial Status Add - Button");
    };

    this.clickEditTrialStatusConfirm = function(){
        helper.clickButton(this.statuesesConfirm, "Trial Status Edit Confirm - Button");
    };

    this.clickEditTrialStatusCancel = function(){
        helper.clickButton(this.statuesesCancel, "Trial Status Edit Cancel - Button");
    };

    this.verifyNothingSelectedFromList = function(getValue){
        helper.getVerifyListValue(this.statuesesStatus, getValue, 'Select Status');
        helper.wait_for(200);
    };

    this.verifyTrialStatusTblHdr = function (){
        var trialSttsTblHdr = new Array("Status Date", "Status", "Comment", "Why Study Stopped", "Errors/Warnings", "Edit", "Delete");
        helper.verifyTableRowText(this.tblStatusDateTHd, trialSttsTblHdr[0], "Status Date - Table Header");
        helper.verifyTableRowText(this.tblStatusTHd, trialSttsTblHdr[1], "Status - Table Header");
        helper.verifyTableRowText(this.tblCommentTHd, trialSttsTblHdr[2], "Comment - Table Header");
        helper.verifyTableRowText(this.tblWhyStopedTHd, trialSttsTblHdr[3], "Why Study Stopped - Table Header");
        helper.verifyTableRowText(this.tblErrorsWarningTHd, trialSttsTblHdr[4], "Errors/Warnings - Table Header");
        helper.verifyTableRowText(this.tblEditTHd, trialSttsTblHdr[5], "Edit - Table Header");
        helper.verifyTableRowText(this.tblDeleteTHd, trialSttsTblHdr[6], "Delete - Table Header");
    };

    this.verifyTransitionRulesRef = function(getArg, verifyLine){
        getTranRef = this.trialStatusTransitionRules.getText('value');
        getTranRef.then(function(ref){
            console.log('Actual Reference: '+ref.replace(/\n/g, "###", -1));
            strVal = ref.toString().replace(/\n/g, "###", -1);
            console.log('replace:[' + strVal +']');
            var refLines = strVal.toString().split("###");
            refA = refLines[0];
            refB = refLines[1];
            if (verifyLine === '1'){
                expect(getArg.toString()).to.eql(refA.toString());
            } else if (verifyLine === '2'){
                expect(getArg.toString()).to.eql(refB.toString());
            }
        });
    };

    this.verifyWikiTitle = function(getTtle){
        var wikiTitleVar = element(by.css('#title-text'));
        //browser.driver.isElementPresent(wikiTitleVar).then(function(result) {
        //    if (result) {
        //        browser.driver.findElement(wikiTitleVar).getText().then(function(value)   {
        //            expect(getTtle.toString()).to.eql(value.toString());
        //        });
        //    }
        //});
        //
        //browser.driver.getAllWindowHandles().then(function(handles){
        //    browser.driver.switchTo().window(handles[1]).then(function(){
        //        helper.wait(wikiTitleVar, 'Waiting for Wiki page');
        //        expect(browser.driver.findElement(wikiTitleVar).getText().toString()).to.eql(ttle.toString());
        //        getWikiTitle = this.wikiTitle.getText('value');
        //        getWikiTitle.then(function(ttle){
        //            expect(getTtle.toString()).to.eql(ttle.toString());
        //        });
        //    });
        //});
    };

    this.verifyDatesRulesRef = function(getArg, verifyLine){
        getDatRef = this.trialStatusDatesRules.getText('value');
        getDatRef.then(function(ref){
            console.log('Actual Reference: '+ref.replace(/\n/g, "###", -1));
            strVal = ref.toString().replace(/\n/g, "###", -1);
            console.log('replace:[' + strVal +']');
            var refLines = strVal.toString().split("###");
            refC = refLines[0];
            refD = refLines[1];
            if (verifyLine === '1'){
                expect(getArg.toString()).to.eql(refC.toString());
            } else if (verifyLine === '2'){
                expect(getArg.toString()).to.eql(refD.toString());
            }
        });
    };

    this.findTrialStatusVerfEdtDel = function(exTrlStatus, what, errWarn){
        this.trialStatusTbleAll.then(function(rows){
            console.log('Trial Statuses Total Row:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    fNm('1', exTrlStatus, what, errWarn);
                } else if (i === 2){
                    console.log('i:['+i+']');
                    fNm('2', exTrlStatus, what, errWarn);
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', exTrlStatus, what, errWarn);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', exTrlStatus, what, errWarn);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', exTrlStatus, what, errWarn);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', exTrlStatus, what, errWarn);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', exTrlStatus, what, errWarn);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', exTrlStatus, what, errWarn);
                }
            }
        });
        function fNm(iVal, expTrialStats, whatToDo, errWarnings){
            var tableStatus = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(02)'));
            getStatus = tableStatus.getText('value');
            getStatus.then(function(Test1){
                console.log("Identified Current Trial Status:["+Test1+"]");
                if(expTrialStats === Test1){
                    if (whatToDo === 'verify'){
                        expect(expTrialStats.toString()).to.eql(Test1.toString());
                    } else if(whatToDo === 'edit'){
                        var editDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(06) #edit_btn'));
                        helper.clickButton(editDataRw, "Edit - Button");
                    } else if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(07) #delete_btn'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    } else if(whatToDo === 'verifyErrors'){
                        var errorsWarnings = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(05)'));
                        getErrWrngs = errorsWarnings.getText('value');
                        getErrWrngs.then(function(getErWarn){
                            expect(errWarnings.toString()).to.eql(getErWarn.toString());
                            console.log('Expected Errors/Warnings: ['+errWarnings+']');
                            console.log('Current Errors/Warnings: ['+getErWarn+']');
                        });
                    } else if (whatToDo === 'notExists'){
                        var notExpectedValue = 'Unexpected Trial Status Exists';
                        expect(expTrialStats.toString()).to.eql(notExpectedValue.toString());
                    }
                }
                if (expTrialStats != Test1){
                    if (whatToDo === 'notExists'){
                        var notExpectedValue = 'Unexpected Trial Status Does not Exists';
                        var noneExpVal = 'Unexpected Trial Status Does not Exists'
                        expect(notExpectedValue.toString()).to.eql(noneExpVal.toString());
                    }
                }
            });
        }
    };

    //Delete Status
    this.findTrialStatusToDel = function(what){
        this.trialStatusTbleAll.then(function(rows){
            console.log('Trial Statuses Total Row:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    fNm('1', what);
                } else if (i === 2){
                    console.log('i:['+i+']');
                    fNm('2', what);
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', what);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', what);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', what);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', what);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', what);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', what);
                }
            }
        });
        function fNm(iVal, whatToDo){
            var tableStatus = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(02)'));
            getStatus = tableStatus.getText('value');
            getStatus.then(function(Test1){
                console.log("Identified Current Trial Status:["+Test1+"]");
                    if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(07) #delete_btn'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    }
            });
        }
    };

    //Trial Dates

    this.setTrialStartDate = function(dateYear, dateMonth, dateDay, actulAnticptd){
        this.trialStartDate.click();
        dateFunctions.clickAddTrialDateFieldDifferentYear(dateYear, dateMonth, dateDay);
        if(actulAnticptd === 'Actual'){
            helper.clickButton(this.trialStartDateRadioActual, "Actual Radio Button");
        } else if(actulAnticptd === 'Anticipated'){
            helper.clickButton(this.trialStartDateRadioAnticipated, "Anticipated Radio Button");
        }
    };

    this.setPrimaryCompletionDate = function(dateYear, dateMonth, dateDay, actulAnticptd){
        this.primaryCompletionDate.click();
        dateFunctions.clickAddTrialDateFieldDifferentYear(dateYear, dateMonth, dateDay);
        if(actulAnticptd === 'Actual'){
            helper.clickButton(this.primaryCompletionDateRadioActual, "Actual Radio Button");
        } else if(actulAnticptd === 'Anticipated'){
            helper.clickButton(this.primaryCompletionDateRadioAnticipated, "Anticipated Radio Button");
        } else if(actulAnticptd === 'NA'){
            helper.clickButton(this.primaryCompletionDateRadioNA, "NA Radio Button");
        }
    };

    this.setCompletionDate = function(dateYear, dateMonth, dateDay, actulAnticptd){
        this.completionDate.click();
        dateFunctions.clickAddTrialDateFieldDifferentYear(dateYear, dateMonth, dateDay);
        if(actulAnticptd === 'Actual'){
            helper.clickButton(this.completionDateRadioActual, "Actual Radio Button");
        } else if(actulAnticptd === 'Anticipated'){
            helper.clickButton(this.completionDateRadioAnticipated, "Anticipated Radio Button");
        }
    };

    this.verifyTrialDates = function(requiredOrAll, startDate, startActOrAnti, primaryDate, priActOrAnti, completionDate, compActOrAnti){
        if (requiredOrAll === 'required'){
            helper.getVerifyValue(this.trialStartDate, startDate, "Verifying Trial Start Date - Field");
            if (startActOrAnti === 'Actual') {
                expect(this.trialStartDateRadioActual.isSelected()).to.eventually.equal(true);
            } else if(startActOrAnti === 'Anticipated') {
                expect(this.trialStartDateRadioAnticipated.isSelected()).to.eventually.equal(true);
            }
            helper.getVerifyValue(this.primaryCompletionDate, primaryDate, "Verifying Primary Completion Date - Field");
            if (priActOrAnti === 'Actual') {
                expect(this.primaryCompletionDateRadioActual.isSelected()).to.eventually.equal(true);
            } else if(priActOrAnti === 'Anticipated') {
                expect(this.primaryCompletionDateRadioAnticipated.isSelected()).to.eventually.equal(true);
            }
        } else if(requiredOrAll === 'all'){
            helper.getVerifyValue(this.trialStartDate, startDate, "Verifying Trial Start Date - Field");
            if (startActOrAnti === 'Actual') {
                expect(this.trialStartDateRadioActual.isSelected()).to.eventually.equal(true);
            } else if(startActOrAnti === 'Anticipated') {
                expect(this.trialStartDateRadioAnticipated.isSelected()).to.eventually.equal(true);
            }
            helper.getVerifyValue(this.primaryCompletionDate, primaryDate, "Verifying Primary Completion Date - Field");
            if (priActOrAnti === 'Actual') {
                expect(this.primaryCompletionDateRadioActual.isSelected()).to.eventually.equal(true);
            } else if(priActOrAnti === 'Anticipated') {
                expect(this.primaryCompletionDateRadioAnticipated.isSelected()).to.eventually.equal(true);
            }
            helper.getVerifyValue(this.completionDate, completionDate, "Verifying Completion Date - Field");
            if (compActOrAnti === 'Actual') {
                expect(this.completionDateRadioActual.isSelected()).to.eventually.equal(true);
            } else if(compActOrAnti === 'Anticipated') {
                expect(this.completionDateRadioAnticipated.isSelected()).to.eventually.equal(true);
            }
        }
    };

    //Trial Comments

    this.setTrialComments = function(trailCmnts){
        helper.setValue(this.trialComment, trailCmnts, 'Trial Comments');
        helper.clickButton(this.trialCommentAddBtn, "Trial Comments Add - Button");
    };


    //Save and Reset

    this.clickSave = function(){
        helper.clickButton(this.trialStatusSaveBtn, "Trial Status Save - Button");
        helper.wait_for(300);
    };

    this.clickReset = function(){
        helper.clickButton(this.trialStatusResetBtn, "Trial Status Reset - Button");
    };

    this.clickBackToSearchResults = function(){
        helper.clickButton(this.trialStatusBackToSearchResultBtn, "Back to Trial Search Results Screen - Button");
    };
};

module.exports = abstractionTrailStatuses;
