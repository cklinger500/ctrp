/**
 * Created by singhs10 on 1/25/16.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var moment = require('moment');
var assert = require('assert');
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var searchTrialPage = require('../support/searchTrialPage');
var trialMenuItemList = require('../support/trialCommonBar');

module.exports = function () {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var searchTrial = new searchTrialPage();
    var trialMenuItem = new trialMenuItemList();

    /*********************
     * Validation message *
     *********************/
    var warningMsgApproved = 'WARNING: Interim status [In Review] is missing';
    var warningMsgWithdrawnActiveEBI = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing';
    var warningMsgClosedToAccrualTemporarilyClosedToAccrual = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing';
    var warningMsgClosedToAccrualAndIntervention = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing';
    var warningMsgTemporarilyClosedToAccrualAndIntervention = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing';
    var warningMsgCompleteAdministrativelyComplete = 'WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing';
    var errorMsgStatus = 'Trial Status is Required';
    var errorMsgStatusStatusDate = 'Status Date and Status are Required';
    var errorMsgStatusStatusDateStudyStopped = 'Status Date, Status and Why Study Stopped are Required';
    var errorMsgTrialStatusFuture = 'The Status Date should not be in the future';
    var errorMsgTrialStartDate = 'Trial Start Date is Required';
    var errorMsgTrialPrimaryCompletionDate = 'Primary Completion Date is Required';
    var errorMsgTrialCompletionDate = 'Completion Date is Required';
    var errorMsgTrialStartDateType = 'Trial Start Date Type is Required';
    var errorMsgTrialPrimaryCompletionDateType = 'Primary Completion Date Type is Required';
    var errorMsgTrialCompletionDateType = 'Completion Date Type is Required';
    var errorMsgTrialStartDatePastTypeAnticipated = 'Trial Start Date type cannot be Anticipated if Trial Start Date is in the past';
    var errorMsgTrialPrimaryCompletionDatePastTypeAnticipated = 'Primary Completion Date type cannot be Anticipated if Primary Completion Date is in the past';
    var errorMsgTrialCompletionDatePastTypeAnticipated = 'Completion Date type cannot be Anticipated if Completion Date is in the past';
    var errorMsgTrialStartDateFutureTypeActual = 'Trial Start Date type cannot be Actual if Trial Start Date is in the future';
    var errorMsgTrialPrimaryCompletionDateFutureTypeActual = 'Primary Completion Date type cannot be Actual if Primary Completion Date is in the future';
    var errorMsgTrialCompletionDateFutureTypeActual = 'Completion Date type cannot be Actual if Completion Date is in the future';
    var primaryCompletionDateErrorMessageWithTrialStartDate = 'The Primary Completion Date should be the same as, or later than, the Trial Start Date';
    var completionDateErrorMessageWithTrialPrimaryCompletionDate = 'The Completion Date should be the same as, or later than, the Primary Completion Date';


    this.Given(/^I am on the Register Trial Status screen$/, function (callback) {
        callback();
    });

    this.When(/^I add a trial status from (.*) to trial status (.*) along with why study stopped reason (.*) and same day rule (.*) the respective checks (.*) will be there$/, function (statusFrom, statusTo, whyStudyStopped, Sameday, errorsWarnings, table) {
        return browser.sleep(25).then(function () {
            statusTable = table.hashes();
            for (var i = 0; i < statusTable.length; i++) {
                var convErrorsWarningsString = statusTable[i].errorsWarnings.toString().replace(/\\n/g, "\n", -1);
                console.log('**************** Error Warning String *************');
                console.log(convErrorsWarningsString);
                if (statusTable[i].statusFrom === 'STATUSZERO') {
                    console.log('**************** STATUS FROM *************');
                    console.log(statusTable[i].statusFrom);
                } else {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                    console.log('**************** STATUS FROM *************');
                    console.log(statusTable[i].statusFrom);
                    addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                    if (statusTable[i].whyStudyStopped === '') {
                        expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                    } else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete')) {
                        expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(true);
                        addTrial.setAddTrialWhyStudyStopped(statusTable[i].whyStudyStopped);
                    } else {
                        expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                    }
                    addTrial.clickAddTrialAddStatusButton();
                    if (statusTable[i].statusFrom !== statusTable[i].statusTo) {
                        if (statusTable[i].whyStudyStopped === '') {
                            if (statusTable[i].statusFrom === 'In Review') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
                            } else if (statusTable[i].statusFrom === 'Approved') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgApproved);
                            } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgWithdrawnActiveEBI);
                            } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgClosedToAccrualTemporarilyClosedToAccrual);
                            } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgClosedToAccrualAndIntervention);
                            } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgTemporarilyClosedToAccrualAndIntervention);
                            } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgCompleteAdministrativelyComplete);
                            }
                        } else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete')) {
                            if (statusTable[i].statusFrom === 'In Review') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '');
                            } else if (statusTable[i].statusFrom === 'Approved') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, warningMsgApproved);
                            } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, warningMsgWithdrawnActiveEBI);
                            } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, warningMsgClosedToAccrualTemporarilyClosedToAccrual);
                            } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, warningMsgClosedToAccrualAndIntervention);
                            } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, warningMsgTemporarilyClosedToAccrualAndIntervention);
                            } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, warningMsgCompleteAdministrativelyComplete);
                            }
                        } else {
                            if (statusTable[i].statusFrom === 'In Review') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
                            } else if (statusTable[i].statusFrom === 'Approved') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgApproved);
                            } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgWithdrawnActiveEBI);
                            } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgClosedToAccrualTemporarilyClosedToAccrual);
                            } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgClosedToAccrualAndIntervention);
                            } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgTemporarilyClosedToAccrualAndIntervention);
                            } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                                projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgCompleteAdministrativelyComplete);
                            }
                        }
                    }
                }
                if (statusTable[i].statusTo === 'STATUSZERO') {
                    console.log('**************** STATUS TO *************');
                    console.log(statusTable[i].statusTo);
                } else {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                    console.log('**************** STATUS TO *************');
                    console.log(statusTable[i].statusTo);
                    addTrial.selectAddTrialStatus(statusTable[i].statusTo);
                    if (statusTable[i].whyStudyStopped === '') {
                        expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                    } else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusTo === 'Withdrawn' || statusTable[i].statusTo === 'Temporarily Closed to Accrual' || statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusTo === 'Administratively Complete')) {
                        expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(true);
                        addTrial.setAddTrialWhyStudyStopped(statusTable[i].whyStudyStopped);
                    } else {
                        expect(addTrial.addTrialWhyStudyStopped.isEnabled()).to.become(false);
                    }
                    addTrial.clickAddTrialAddStatusButton();
                    if (statusTable[i].statusFrom !== statusTable[i].statusTo) {
                        if (statusTable[i].whyStudyStopped === '') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', convErrorsWarningsString);
                        } else if (statusTable[i].whyStudyStopped !== '' && (statusTable[i].statusTo === 'Withdrawn' || statusTable[i].statusTo === 'Temporarily Closed to Accrual' || statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusTo === 'Administratively Complete')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, convErrorsWarningsString);
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', convErrorsWarningsString);
                        }
                    } else {
                        projectFunctionsRegistry.verifyAddTrialDuplicateStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', statusTable[i].whyStudyStopped, convErrorsWarningsString);
                        if (statusTable[i].statusFrom === 'In Review') {
                            expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal('');
                        } else if (statusTable[i].statusFrom === 'Approved') {
                            expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(warningMsgApproved);
                        } else if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Active' || statusTable[i].statusFrom === 'Enrolling by Invitation') {
                            expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(warningMsgWithdrawnActiveEBI);
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(warningMsgClosedToAccrualTemporarilyClosedToAccrual);
                        } else if (statusTable[i].statusFrom === 'Closed to Accrual and Intervention') {
                            expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(warningMsgClosedToAccrualAndIntervention);
                        } else if (statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(warningMsgTemporarilyClosedToAccrualAndIntervention);
                        } else if (statusTable[i].statusFrom === 'Complete' || statusTable[i].statusFrom === 'Administratively Complete') {
                            expect(addTrial.addTrialErrorWarningTable.get(0).getText()).to.eventually.equal(warningMsgCompleteAdministrativelyComplete);
                        }
                    }
                }
                addTrial.clickAddTrialResetButton();
            }
            // browser.sleep(25).then(callback);
        });
    });


    this.Then(/^no error or warning should be displayed in the validation messages column$/, function (callback) {
        callback();
        // browser.sleep(25).then(callback);
    });

    this.When(/^I add a (.*) and status transitions from (.*)$/, function (statusDate, statusTransitions, table) {
        return browser.sleep(25).then(function () {
            statusTable = table.hashes();
            for (var i = 0; i < statusTable.length; i++) {
                console.log('Status Trnasitions');
                var splitTO = statusTable[i].statusTransitions.replace(/'/g, "").split(" TO ");
                console.log(splitTO);
                console.log('Length after split' + splitTO.length);
                for (var j = 0; j < splitTO.length; j++) {
                    addTrial.clickAddTrialDateField('0');
                    var jIn = j + 1;
                    addTrial.clickAddTrialDateFieldPreviousMonth('0' + jIn);
                    addTrial.selectAddTrialStatus(splitTO[j]);
                    if (splitTO[j] === 'Withdrawn' || splitTO[j] === 'Temporarily Closed to Accrual' || splitTO[j] === 'Temporarily Closed to Accrual and Intervention' || splitTO[j] === 'Administratively Complete') {
                        addTrial.setAddTrialWhyStudyStopped('Reason for Study stopped added cuke test');
                        addTrial.clickAddTrialAddStatusButton();
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(splitTO[j], moment().subtract(1, 'months').startOf('month').add(j, 'day').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                    }
                    else {
                        addTrial.clickAddTrialAddStatusButton();
                        projectFunctionsRegistry.verifyAddTrialStatusInformation(splitTO[j], moment().subtract(1, 'months').startOf('month').add(j, 'day').format('DD-MMM-YYYY'), '', '', '');
                    }
                }
                addTrial.clickAddTrialResetButton();
            }
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^no errors\-warnings will be displayed$/, function (callback) {
        callback();
    });

    this.When(/^I add a trial date (.*) and trial status from (.*) to trial date (.*) trial status (.*) with the (.*) then the respective checks (.*) will be there$/, function (statusDateFrom, statusFrom, statusDateTo, statusTo, condition, errorsWarnings, table) {
        return browser.sleep(25).then(function () {
            statusTable = table.hashes();
            for (var i = 0; i < statusTable.length; i++) {
                if (statusTable[i].statusDateFrom === 'Date Entered past' && statusTable[i].condition === 'all the previous Status before Active has been added') {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.selectAddTrialStatus('In Review');
                    addTrial.clickAddTrialAddStatusButton();
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                    addTrial.selectAddTrialStatus('Approved');
                    addTrial.clickAddTrialAddStatusButton();
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                } else if (statusTable[i].statusDateFrom === 'Date in Future') {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldNextMonth('01');
                } else if (statusTable[i].statusDateFrom === 'Date Entered past') {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                } else {
                    if (statusTable[i].condition === 'all the previous Status before Active has been added') {
                        addTrial.clickAddTrialDateField('0');
                        addTrial.clickAddTrialDateFieldPreviousMonth('01');
                        addTrial.selectAddTrialStatus('In Review');
                        addTrial.clickAddTrialAddStatusButton();
                        addTrial.clickAddTrialDateField('0');
                        addTrial.clickAddTrialDateFieldPreviousMonth('01');
                        addTrial.selectAddTrialStatus('Approved');
                        addTrial.clickAddTrialAddStatusButton();
                    } else if (/^all the previous Status before Active including Active/.test(statusTable[i].condition)) {
                        //else if (statusTable[i].condition === /all the previous Status before Active including Active*/) {
                        addTrial.clickAddTrialDateField('0');
                        addTrial.clickAddTrialDateFieldPreviousMonth('01');
                        addTrial.selectAddTrialStatus('In Review');
                        addTrial.clickAddTrialAddStatusButton();
                        addTrial.clickAddTrialDateField('0');
                        addTrial.clickAddTrialDateFieldPreviousMonth('01');
                        addTrial.selectAddTrialStatus('Approved');
                        addTrial.clickAddTrialAddStatusButton();
                        addTrial.clickAddTrialDateField('0');
                        addTrial.clickAddTrialDateFieldPreviousMonth('01');
                        addTrial.selectAddTrialStatus('Active');
                        addTrial.clickAddTrialAddStatusButton();
                    }
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                }
                addTrial.selectAddTrialStatus(statusTable[i].statusFrom);
                if (statusTable[i].statusFrom === 'Withdrawn' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Administratively Complete') {
                    addTrial.setAddTrialWhyStudyStopped('Reason for Study stopped added cuke test');
                    addTrial.clickAddTrialAddStatusButton();
                    if (statusTable[i].statusDateFrom === 'Date Entered past') {
                        if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', warningMsgApproved);
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing');
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                        }
                    } else if (statusTable[i].statusDateFrom === 'Date in Future') {
                        if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', warningMsgApproved);
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing');
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                        }
                    } else {
                        if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', warningMsgApproved);
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing');
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                        }
                    }
                } else {
                    addTrial.clickAddTrialAddStatusButton();
                    if (statusTable[i].statusDateFrom === 'Date Entered past') {
                        if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', warningMsgApproved);
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing');
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                        }
                    } else if (statusTable[i].statusDateFrom === 'Date in Future') {
                        if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', warningMsgApproved);
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing');
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                        }
                    } else {
                        if (statusTable[i].statusFrom === 'Approved') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', warningMsgApproved);
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing');
                        } else if (statusTable[i].condition === 'all the previous Status before Active has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', 'WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusFrom, moment().format('DD-MMM-YYYY'), '', '', '');
                        }
                    }
                }
                if (statusTable[i].statusDateTo === 'Date Entered past') {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldPreviousMonth('01');
                } else if (statusTable[i].statusDateTo === 'Date in Future') {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateFieldNextMonth('01');
                } else {
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                }
                addTrial.selectAddTrialStatus(statusTable[i].statusTo);
                if (statusTable[i].statusTo === 'Withdrawn' || statusTable[i].statusTo === 'Temporarily Closed to Accrual' || statusTable[i].statusTo === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusTo === 'Administratively Complete') {
                    addTrial.setAddTrialWhyStudyStopped('Reason for Study stopped added cuke test');
                    addTrial.clickAddTrialAddStatusButton();
                    if (statusTable[i].statusDateTo === 'Date Entered past') {
                        if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', statusTable[i].errorsWarnings);
                        }
                    } else if (statusTable[i].statusDateTo === 'Date in Future') {
                        if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', statusTable[i].errorsWarnings);
                        }
                    } else {
                        if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', '');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', 'Reason for Study stopped added cuke test', statusTable[i].errorsWarnings);
                        }
                    }
                } else {
                    addTrial.clickAddTrialAddStatusButton();
                    if (statusTable[i].statusDateTo === 'Date Entered past') {
                        if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', statusTable[i].errorsWarnings);
                        }
                    } else if (statusTable[i].statusDateTo === 'Date in Future') {
                        if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention' || statusTable[i].statusFrom === 'Closed to Accrual')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().add(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', statusTable[i].errorsWarnings);
                        }
                    } else {
                        if (statusTable[i].condition === 'all the previous Status before Active has been added' && (statusTable[i].statusFrom === 'Temporarily Closed to Accrual' || statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', '');
                        } else if (statusTable[i].condition === 'all the previous Status before Active including Active before Closed to Accrual has been added' && statusTable[i].statusFrom === 'Closed to Accrual') {
                            //  projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', '');
                            expect(addTrial.addTrialErrorWarningTable.get(2).getText()).to.eventually.equal('');
                            expect(addTrial.addTrialErrorWarningTable.get(4).getText()).to.eventually.equal(statusTable[i].errorsWarnings);
                        } else if (statusTable[i].condition === 'all the previous Status before Active including Active before Temporarily Closed to Accrual has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual') {
                            expect(addTrial.addTrialErrorWarningTable.get(2).getText()).to.eventually.equal('');
                            expect(addTrial.addTrialErrorWarningTable.get(4).getText()).to.eventually.equal(statusTable[i].errorsWarnings);
                        } else if (statusTable[i].condition === 'all the previous Status before Active including Active before Temporarily Closed to Accrual and Intervention has been added' && statusTable[i].statusFrom === 'Temporarily Closed to Accrual and Intervention') {
                            expect(addTrial.addTrialErrorWarningTable.get(2).getText()).to.eventually.equal('');
                            expect(addTrial.addTrialErrorWarningTable.get(4).getText()).to.eventually.equal(statusTable[i].errorsWarnings);
                        }
                        else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation(statusTable[i].statusTo, moment().format('DD-MMM-YYYY'), '', '', statusTable[i].errorsWarnings);
                        }
                    }
                }
                addTrial.clickAddTrialResetButton();
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I click on the Trial status list$/, function (callback) {
        //  browser.sleep(25).then(callback);
        callback();
    });

    this.Then(/^the order of trial status list should be$/, function (table) {
        return browser.sleep(25).then(function () {
            trialStatusList = table.raw();
            console.log('value of table' + trialStatusList);
            addTrial.addTrialStatusList.getText().then(function (value) {
                console.log('From screen table value');
                console.log(value);
                console.log('From Table converted to arrary value');
                console.log(trialStatusList.toString().split(","));
                expect(value).to.eql(trialStatusList.toString().split(","));
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I click on Review Trial without any Trial Status$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I should get an error message as "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            if (arg1 === errorMsgStatus) {
                expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
            }
            else if (arg1 === errorMsgStatusStatusDate) {
                addTrial.clickAddTrialAddStatusButton();
                /****** Status Date and Status both not provided *********/
                expect(projectFunctionsRegistry.verifyTrialValidationMessage(arg1)).to.become('true');
                /****** Status Date provided but Status not provided *********/
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.clickAddTrialAddStatusButton();
                expect(projectFunctionsRegistry.verifyTrialValidationMessage(arg1)).to.become('true');
                /****** Status Date not provided but Status provided *********/
                addTrial.clickAddTrialResetButton();
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                expect(projectFunctionsRegistry.verifyTrialValidationMessage(arg1)).to.become('true');
                /****** Status Date and Status both provided so no error *********/
                addTrial.clickAddTrialResetButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                addTrial.selectAddTrialStatus('In Review');
                addTrial.clickAddTrialAddStatusButton();
                expect(projectFunctionsRegistry.verifyTrialValidationMessage(arg1)).to.become('false');
            }
            else if (arg1 === errorMsgStatusStatusDateStudyStopped) {
                for (var i = 0; i < trialStatusStudyStoppedItems.length; i++) {
                    addTrial.clickAddTrialResetButton();
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialStatus(trialStatusStudyStoppedItems[i]);
                    addTrial.clickAddTrialAddStatusButton();
                    expect(projectFunctionsRegistry.verifyTrialValidationMessage(arg1)).to.become('true');
                }
            }
            else {
                assert.fail(0, 1, 'No assertion is there for the provided error message: ' + arg1 + '\n 1.Make sure correct error message is provided. \n 2. OR make sure the Step is there to verify the error msg.');
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^On Add Trial Status if Status Date or Status is missing$/, function (callback) {
        callback();
    });

    this.Given(/^On Add Trial Status when the Status selected is$/, function (table) {
        return browser.sleep(25).then(function () {
            trialStatusStudyStoppedList = table.raw();
            trialStatusStudyStoppedItems = trialStatusStudyStoppedList.toString().split(",");
            console.log('trialStatusStudyStoppedList');
            console.log(trialStatusStudyStoppedList);
            console.log('trialStatusStudyStoppedItems');
            console.log(trialStatusStudyStoppedItems);
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^Why Study Stopped reason is not provided$/, function (callback) {
        callback();
    });

    this.When(/^I select a Status Date in Past$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateFieldPreviousMonth('01');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^It should not give any error message for status date$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialStatus('In Review');
            addTrial.clickAddTrialAddStatusButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^the added date format should be DD\-MMM\-YYYY format$/, function () {
        return browser.sleep(25).then(function () {
            /*************** Verify the date format in Trial Status table ************/
            addTrial.addTrialStatusDateTableVerifyDateExist.isPresent().then(function (result) {
                if (result) {
                    addTrial.addTrialStatusDateTable.getText().then(function (value) {
                        if (value.toString() === moment().format('DD-MMM-YYYY')) {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation('In Review', moment().format('DD-MMM-YYYY'), '', '', '');
                        } else {
                            projectFunctionsRegistry.verifyAddTrialStatusInformation('In Review', moment().subtract(1, 'months').startOf('month').format('DD-MMM-YYYY'), '', '', '');
                        }
                    });
                }
            });
            /*************** Verify the date format in Trial Start Date ************/
            addTrial.addTrialStartDate.getAttribute('value').then(function (value) {
                if (value !== '') {
                    addTrial.getVerifyAddTrialStartDate(moment().format('DD-MMM-YYYY'));
                }
            });
            /*************** Verify the date format in Trial Primary Completion Date ************/
            addTrial.addTrialPrimaryCompletionDate.getAttribute('value').then(function (value) {
                if (value !== '') {
                    addTrial.getVerifyAddTrialPrimaryCompletionDate(moment().format('DD-MMM-YYYY'));
                }
            });
            /*************** Verify the date format in Trial Completion date ************/
            addTrial.addTrialCompletionDate.getAttribute('value').then(function (value) {
                if (value !== '') {
                    addTrial.getVerifyAddTrialCompletionDate(moment().format('DD-MMM-YYYY'));
                }
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select a Status Date in Today$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialResetButton();
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateToday();
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select a Status Date in Future$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialResetButton();
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateFieldNextMonth('01');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^It should give an error message for future status date$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialStatus('In Review');
            addTrial.clickAddTrialAddStatusButton();
            expect(projectFunctionsRegistry.verifyTrialValidationMessage(errorMsgTrialStatusFuture)).to.become('true');
            expect(addTrial.addTrialStatusDateTableVerifyDateExist.isPresent()).to.become(false);
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^When I add a trial status$/, function () {
        return browser.sleep(25).then(function () {
            var userWhoWillCreateTrial = 'ctrptrialsubmitter';
            var storeLeadProtocolId = 'Ld ID' + typeOfTrial.substring(0, 3) + moment().format('MMMDoYY hmm');
            projectFunctionsRegistry.createOrgforTrial('leadOrgSS', typeOfTrial, '0',userWhoWillCreateTrial );
            /** Stores the value of Lead Org **/
            storeLeadOrg = cukeOrganization.then(function (value) {
                console.log('This is the Lead Organization that is added' + value);
                return value;
            });
        browser.driver.wait(function () {
            console.log('wait here');
            return true;
        }, 10).then(function () {

            /****** Create Principal Investigator ********/
            projectFunctionsRegistry.createPersonforTrial('prinInvSS', typeOfTrial, '0', userWhoWillCreateTrial);

            /** Stores the value of Principal Investigator **/
            storePI = cukePerson.then(function (value) {
                console.log('This is the Principal Investigator that is added' + value);
                return value;
            });
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 10).then(function () {

                /****** Create Sponsor Organization ********/
                projectFunctionsRegistry.createOrgforTrial('sponOrg', typeOfTrial, '1', userWhoWillCreateTrial);

                /** Stores the value of Sponsor Org **/
                storeSponsorOrg = cukeOrganization.then(function (value) {
                    console.log('This is the Sponsor Organization that is added' + value);
                    return value;
                });
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {

                    /****** Create Data Table 4 Funding Source Organization ********/
                    projectFunctionsRegistry.createOrgforTrial('dataTblOrg', typeOfTrial, '2', userWhoWillCreateTrial);

                    /** Stores the value of Data Table 4 Funding Source Org **/
                    storeFundingSrcOrg = cukeOrganization.then(function (value) {
                        console.log('This is the Funding Source Organization that is added' + value);
                        return value;
                    });

                    /**** Trial Identifiers ****/
                        //  storeLeadProtocolId.then(function (value) {
                    console.log('This is the Lead Organization Trial Identifier that is added' + storeLeadProtocolId);
                    addTrial.setAddTrialLeadProtocolIdentifier(storeLeadProtocolId);
                    //  });

                    /**** Trial Details ****/
                    addTrial.setAddTrialOfficialTitle('Trial Created by Cuke Test script - SS.' + ' ' + moment().format('MMMDoYY'));
                    addTrial.selectAddTrialPhase('I');
                    addTrial.selectAddTrialResearchCategory('Interventional');
                    addTrial.selectAddTrialPrimaryPurpose('Screening');
                    addTrial.selectAddTrialAccrualDiseaseTerminology('SDC');

                    /**** Lead Organization/Principal Investigator ****/
                    /***** This will add the Lead Org  if Lead org is not there ******/
                    addTrial.addTrialLeadOrganization.getAttribute('value').then(function (value) {
                        console.log('value of Lead Org"' + value + '"is this');
                        if (value === '') {

                            storeLeadOrg.then(function (value) {
                                projectFunctionsRegistry.selectOrgforTrial(value, '0');
                            });
                        }
                    });

                    /***** This will add the Principal Investigator if PI is not there ******/
                    addTrial.addTrialPrincipalInvestigator.getAttribute('value').then(function (value) {
                        console.log('value of PI"' + value + '"is this');
                        if (value.trim() === '') {
                            storePI.then(function (value) {
                                projectFunctionsRegistry.selectPerForTrial(value, '0');
                            });
                        }
                    });

                    /**** Sponsor ****/
                    /***** This will add the Sponsor Org if Sponsor Org is not there ******/
                    addTrial.addTrialSponsor.getAttribute('value').then(function (value) {
                        console.log('value of Sponsor Org"' + value + '"is this');
                        if (value === '') {
                            storeSponsorOrg.then(function (value) {
                                projectFunctionsRegistry.selectOrgforTrial(value, '1');
                            });
                        }
                    });

                    /**** Data Table 4 Information ****/
                    /***** This will add the Funding Source Org if it is not there******/
                    addTrial.addTrialDataTable4FundingSourceValues.getAttribute('value').then(function (value) {
                        console.log('value of data table Org"' + value + '"is this');
                        if (value === '') {

                            storeFundingSrcOrg.then(function (value) {
                                projectFunctionsRegistry.selectOrgforTrial(value, '2');
                            });
                        }
                    });

                    /**** NIH Grant Information (for NIH funded Trials) ****/
                    addTrial.selectAddTrialFundedByNCIOption('no');

                    /**** Trial Status ****/
                    addTrial.clickAddTrialDateField('0');
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialStatus('Approved');
                    addTrial.setAddTrialStatusComment('Status Comment cuke');
                    addTrial.clickAddTrialAddStatusButton();

                    /**** Trial Dates ****/
                    addTrial.clickAddTrialDateField(1);
                    addTrial.clickAddTrialDateFieldPreviousMonth('10');
                    addTrial.selectAddTrialStartDateOption('0');
                    addTrial.clickAddTrialDateField(2);
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialPrimaryCompletionDateOption('0');
                    addTrial.clickAddTrialDateField(3);
                    addTrial.clickAddTrialDateFieldNextMonth('10');
                    addTrial.selectAddTrialCompletionDateOption('1');

                    /**** FDA IND/IDE Information for applicable trials ****/
                    addTrial.selectAddTrialFDAIND_IDEOption('no');


                    trialDoc.trialRelatedFileUpload('reg', '1', 'testSampleDocFile.docx');
                    trialDoc.trialRelatedFileUpload('reg', '2', 'testSampleXlsFile.xls');
                });
            });
        });
        });
    });

    this.Then(/^a new trial status will appear in the Trial Status History$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.verifyAddTrialStatusInformation('Approved', moment().format('DD-MMM-YYYY'), 'Status Comment cuke', '', 'WARNING: Interim status [In Review] is missing');
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I click on the delete button in the Actions column for a selected status$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.clickDeleteTrialStatusInformation('Approved');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^Please provide a comment box will be displayed$/, function (callback) {
       callback();
    });

    this.Given(/^I must provide a comment explaining why deleting this trial status$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.setAddTrialStatusDeleteReason('Delete Reason');
        });
    });

    this.When(/^the comment is entered in the provided box$/, function (callback) {
        callback();
    });

    this.Given(/^click on the delete button$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialStatusDeleteCommitButton();
        });
    });

    this.Then(/^the selected status will be marked as deleted$/, function () {
        return browser.sleep(25).then(function () {
            var deletedRowValue = moment().format('DD-MMM-YYYY') + ' Approved ' + 'Status Comment cuke. Delete Reason';
            addTrial.addTrialStatusDeletedStatus.getText().then(function(value){
                //console.log('value of deleted row in screen :');
                //console.log(value);
                //console.log('provided delete value');
                //console.log(deletedRowValue);
                expect(value).to.eql([deletedRowValue]);
            });
        });
    });

    this.Given(/^the record will be deleted after the trial is submitted$/, function () {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialReviewButton.isPresent()).to.eventually.equal(true, 'Verify In Review Button is present');
            expect(addTrial.addTrialSubmitButton.isPresent()).to.eventually.equal(false ,'Verify Submit Button is NOT present');
            addTrial.clickAddTrialDateField('0');
            addTrial.clickAddTrialDateToday();
            addTrial.selectAddTrialStatus('In Review');
            addTrial.setAddTrialStatusComment('Adding new Trial Status after Deleting -Approved- Trial Status');
            addTrial.clickAddTrialAddStatusButton();
            expect(addTrial.addTrialReviewButton.isPresent()).to.eventually.equal(false, 'Verify In Review Button is NOT present');
            expect(addTrial.addTrialSubmitButton.isPresent()).to.eventually.equal(true, 'Verify Submit Button is present');
            addTrial.addTrialAddStatusTable.getText().then(function(value){
                //console.log('value of Status Table in screen :');
                //console.log(value);
                var statusTblApprovedStatus = moment().format('DD-MMM-YYYY') + ' Approved ' + 'Status Comment cuke. Delete Reason';
                var statusTableInReviewStatus = moment().format('DD-MMM-YYYY') + ' In Review ' + 'Adding new Trial Status after Deleting -Approved- Trial Status';
                //console.log('expected value of Status Table');
                //console.log([statusTblApprovedStatus, statusTableInReviewStatus]);
                expect(value).to.eql([statusTblApprovedStatus, statusTableInReviewStatus]);
            });
            addTrial.clickAddTrialReviewButton();
            addTrial.getViewTrialStatusDate(moment().format('DD-MMM-YYYY'));
            addTrial.getViewTrialStatus('In Review');
            nciID = addTrial.viewTrialNCIID.getText();
            nciID.then(function(value) {
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
                searchTrial.setSearchTrialProtocolID(value);
                searchTrial.clickSearchTrialSearchButton();
                searchTrial.clickSearchTrialMyTrials();
                expect(projectFunctions.inSearchResults(value)).to.eventually.equal('true', 'Verify Trial is present in Search Result');
                searchTrial.clickSearchTrialActionButton();
                searchTrial.clickSearchTrialsUpdateButton();
            });
            addTrial.addTrialAddStatusTable.getText().then(function(value){
                //console.log('value of Status Table in screen :');
                //console.log(value);
                var statusTbl = moment().format('DD-MMM-YYYY') + ' In Review ' + 'Adding new Trial Status after Deleting -Approved- Trial Status';
                //console.log('expected value of Status Table');
                //console.log(statusTbl);
                expect(value).to.eql([statusTbl]);
            });
        });
    });

    this.Given(/^I am on the Trial Dates Section$/, function (callback) {
        callback();
    });

    this.Given(/^I must enter Trial Dates values type$/, function (table) {
        return browser.sleep(25).then(function () {
            trialStatusStudyStoppedList = table.raw();
            trialStatusStudyStoppedItems = trialStatusStudyStoppedList.toString().split(",");
            addTrial.clickAddTrialDateField('1');
            addTrial.clickAddTrialDateToday();
            addTrial.clickAddTrialDateField('2');
            addTrial.clickAddTrialDateToday();
            addTrial.clickAddTrialDateField('3');
            addTrial.clickAddTrialDateToday();
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I must Select Trial Date type for every Trial Date value$/, function (table) {
        return browser.sleep(25).then(function () {
            trialStatusStudyStoppedList = table.raw();
            trialStatusStudyStoppedItems = trialStatusStudyStoppedList.toString().split(",");
            addTrial.selectAddTrialStartDateOption('0');
            addTrial.selectAddTrialStartDateOption('1');
            addTrial.selectAddTrialPrimaryCompletionDateOption('0');
            addTrial.selectAddTrialPrimaryCompletionDateOption('1');
            addTrial.selectAddTrialCompletionDateOption('0');
            addTrial.selectAddTrialCompletionDateOption('1');
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have clicked on the review button$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^no errors should be displayed$/, function () {
        return browser.sleep(25).then(function () {
            expect(projectFunctions.verifyWarningMessage(errorMsgTrialStartDate)).to.become('false');
            expect(projectFunctions.verifyWarningMessage(errorMsgTrialStartDateType)).to.become('false');
            expect(projectFunctions.verifyWarningMessage(errorMsgTrialPrimaryCompletionDate)).to.become('false');
            expect(projectFunctions.verifyWarningMessage(errorMsgTrialPrimaryCompletionDateType)).to.become('false');
            expect(projectFunctions.verifyWarningMessage(errorMsgTrialCompletionDate)).to.become('false');
            expect(projectFunctions.verifyWarningMessage(errorMsgTrialCompletionDateType)).to.become('false');
            addTrial.getVerifyAddTrialStartDate(moment().format('DD-MMM-YYYY'));
            addTrial.verifyAddTrialStartDateOption('1', true);
            addTrial.getVerifyAddTrialPrimaryCompletionDate(moment().format('DD-MMM-YYYY'));
            addTrial.verifyAddTrialPrimaryCompletionDateOption('1', true);
            addTrial.getVerifyAddTrialCompletionDate(moment().format('DD-MMM-YYYY'));
            addTrial.verifyAddTrialCompletionDateOption('1', true);
            //browser.sleep(25).then(callback);
        });
    });


    this.When(/^I have not entered a Trial Date values for$/, function (table) {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialStartDate('');
            addTrial.getVerifyAddTrialPrimaryCompletionDate('');
            addTrial.getVerifyAddTrialCompletionDate('');
            addTrial.clickAddTrialReviewButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^an error message type will be displayed$/, function (table) {
        return browser.sleep(25).then(function () {
            errorTableTrialDate = table.raw();
            for (var i = 0; i < errorTableTrialDate.length; i++) {
                expect(projectFunctions.verifyWarningMessage(errorTableTrialDate[i].toString())).to.become('true');
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have not entered a Trial Date type for the mandatory Trial Dates$/, function (table) {
        return browser.sleep(25).then(function () {
            addTrial.verifyAddTrialStartDateOption('0', false);
            addTrial.verifyAddTrialPrimaryCompletionDateOption('0', false);
            addTrial.verifyAddTrialCompletionDateOption('0', false);
            addTrial.verifyAddTrialStartDateOption('1', false);
            addTrial.verifyAddTrialPrimaryCompletionDateOption('1', false);
            addTrial.verifyAddTrialCompletionDateOption('1', false);
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the error message type will be displayed$/, function (table) {
        return browser.sleep(25).then(function () {
            errorTableTrialDateType = table.raw();
            for (var i = 0; i < errorTableTrialDateType.length; i++) {
                expect(projectFunctions.verifyWarningMessage(errorTableTrialDateType[i].toString())).to.become('true');
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^Current Trial Status is (.*) then for the "([^"]*)" below rules for "([^"]*)" (.*) along with the error (.*) should be there$/, function (TrialStatusType, arg1, arg2, DateTypeActual, DateTypeActualError, table) {
        return browser.sleep(25).then(function () {
            trialDateTable = table.hashes();
            for (var i = 0; i < trialDateTable.length; i++) {
                addTrial.clickAddTrialResetButton();
                addTrial.clickAddTrialDateField('0');
                addTrial.clickAddTrialDateToday();
                console.log('**************** CURRENT TRIAL STATUS *************');
                console.log(trialDateTable[i].TrialStatusType);
                addTrial.selectAddTrialStatus(trialDateTable[i].TrialStatusType);
                if (trialDateTable[i].TrialStatusType === 'Withdrawn' || trialDateTable[i].TrialStatusType === 'Temporarily Closed to Accrual' || trialDateTable[i].TrialStatusType === 'Temporarily Closed to Accrual and Intervention' || trialDateTable[i].TrialStatusType === 'Administratively Complete') {
                    addTrial.setAddTrialWhyStudyStopped('Reason for Study stopped added cuke test SS');
                }
                addTrial.clickAddTrialAddStatusButton();
                if (arg2 === 'Actual') {
                    if (arg1 === 'Trial Start Date') {
                        addTrial.clickAddTrialDateField('1');
                        addTrial.clickAddTrialDateToday();
                        addTrial.selectAddTrialStartDateOption('0');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialStartDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualError);
                        addTrial.clickAddTrialDateField('1');
                        addTrial.clickAddTrialDateClear();
                        addTrial.clickAddTrialDateField('1');
                        addTrial.clickAddTrialDateFieldPreviousMonth('01');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialStartDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualError);
                    }
                    else if (arg1 === 'Primary Completion Date') {
                        addTrial.clickAddTrialDateField('2');
                        addTrial.clickAddTrialDateToday();
                        addTrial.selectAddTrialPrimaryCompletionDateOption('0');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualError);
                        addTrial.clickAddTrialDateField('2');
                        addTrial.clickAddTrialDateClear();
                        addTrial.clickAddTrialDateField('2');
                        addTrial.clickAddTrialDateFieldPreviousMonth('01');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualError);
                    }
                    else if (arg1 === 'Completion Date') {
                        addTrial.clickAddTrialDateField('3');
                        addTrial.clickAddTrialDateToday();
                        addTrial.selectAddTrialCompletionDateOption('0');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialCompletionDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualError);
                        addTrial.clickAddTrialDateField('3');
                        addTrial.clickAddTrialDateClear();
                        addTrial.clickAddTrialDateField('3');
                        addTrial.clickAddTrialDateFieldPreviousMonth('01');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialCompletionDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeActualError);
                    }
                }
                else if (arg2 === 'Anticipated') {
                    if (arg1 === 'Trial Start Date') {
                        addTrial.clickAddTrialDateField('1');
                        addTrial.clickAddTrialDateToday();
                        addTrial.selectAddTrialStartDateOption('1');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialStartDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedError);
                        addTrial.clickAddTrialDateField('1');
                        addTrial.clickAddTrialDateClear();
                        addTrial.clickAddTrialDateField('1');
                        addTrial.clickAddTrialDateFieldNextMonth('01');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialStartDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedError);
                    }
                    else if (arg1 === 'Primary Completion Date') {
                        addTrial.clickAddTrialDateField('2');
                        addTrial.clickAddTrialDateToday();
                        addTrial.selectAddTrialPrimaryCompletionDateOption('1');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedError);
                        addTrial.clickAddTrialDateField('2');
                        addTrial.clickAddTrialDateClear();
                        addTrial.clickAddTrialDateField('2');
                        addTrial.clickAddTrialDateFieldNextMonth('01');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialPrimaryCompletionDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedError);
                    }
                    else if (arg1 === 'Completion Date') {
                        addTrial.clickAddTrialDateField('3');
                        addTrial.clickAddTrialDateToday();
                        addTrial.selectAddTrialCompletionDateOption('1');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialCompletionDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedError);
                        addTrial.clickAddTrialDateField('3');
                        addTrial.clickAddTrialDateClear();
                        addTrial.clickAddTrialDateField('3');
                        addTrial.clickAddTrialDateFieldNextMonth('01');
                        addTrial.clickAddTrialReviewButton();
                        expect(addTrial.addTrialCompletionDateErrorMessageForTrialStatus.getText()).to.eventually.equal(trialDateTable[i].DateTypeAnticipatedError);
                    }

                }
            }
            //browser.sleep(25).then(callback);
        });
    });

    //this.When(/^Current Trial Status is (.*) then for the "([^"]*)" below rules for "([^"]*)" (.*) along with warning (.*) should be there$/, function (arg1, arg2, TrialStatusType, DateTypeAnticipated, DateTypeAnticipatedWarning, table, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback();
    //});

    this.Given(/^I am on the Trial Dates Screen$/, function (callback) {
        callback();
    });

    this.When(/^the Trial date is in the past$/, function () {
        return browser.sleep(25).then(function () {
            console.log('******* Trial Start Date Verification Date in Past *********');
            addTrial.clickAddTrialDateField('1');
            addTrial.clickAddTrialDateFieldPreviousMonth('01');
            console.log('******* Trial Primary Completion Date Verification Date in Past *********');
            addTrial.clickAddTrialDateField('2');
            addTrial.clickAddTrialDateFieldPreviousMonth('01');
            console.log('******* Trial Completion Date Verification Date in Past *********');
            addTrial.clickAddTrialDateField('3');
            addTrial.clickAddTrialDateFieldPreviousMonth('01');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Trial date type must be actual$/, function () {
        return browser.sleep(25).then(function () {
            console.log('******* Trial Start Date Actual Type Option Verification in Past *********');
            addTrial.selectAddTrialStartDateOption('0');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            console.log('******* Trial Start Date Anticipated Type Option Verification in Past *********');
            addTrial.selectAddTrialStartDateOption('1');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal(errorMsgTrialStartDatePastTypeAnticipated);
            console.log('******* Trial Primary Completion Date Actual Type Option Verification in Past *********');
            addTrial.selectAddTrialPrimaryCompletionDateOption('0');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            console.log('******* Trial Primary Completion Date Anticipated Type Option Verification in Past *********');
            addTrial.selectAddTrialPrimaryCompletionDateOption('1');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal(errorMsgTrialPrimaryCompletionDatePastTypeAnticipated);
            console.log('******* Trial Completion Date Actual Type Option Verification in Past *********');
            addTrial.selectAddTrialCompletionDateOption('0');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            console.log('******* Trial Completion Date Anticipated Type Option Verification in Past *********');
            addTrial.selectAddTrialCompletionDateOption('1');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal(errorMsgTrialCompletionDatePastTypeAnticipated);
            //  browser.sleep(25).then(callback);
        });
    });

    this.When(/^the Trial date is today$/, function () {
        return browser.sleep(25).then(function () {
            console.log('******* Trial Start Date Verification Date Today *********');
            addTrial.clickAddTrialDateField('1');
            addTrial.clickAddTrialDateToday();
            console.log('******* Trial Primary Completion Date Verification Date Today *********');
            addTrial.clickAddTrialDateField('2');
            addTrial.clickAddTrialDateToday();
            console.log('******* Trial Completion Date Verification Date Today *********');
            addTrial.clickAddTrialDateField('3');
            addTrial.clickAddTrialDateToday();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Trial Date type could be actual$/, function () {
        return browser.sleep(25).then(function () {
            console.log('******* Trial Start Date Actual Type Option Verification for Today *********');
            addTrial.selectAddTrialStartDateOption('0');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            console.log('******* Trial Primary Completion Date Actual Type Option Verification for Today *********');
            addTrial.selectAddTrialPrimaryCompletionDateOption('0');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            console.log('******* Trial Completion Date Actual Type Option Verification for Today *********');
            addTrial.selectAddTrialCompletionDateOption('0');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^the Trial date Type could be anticipated$/, function () {
        return browser.sleep(25).then(function () {
            console.log('******* Trial Start Date Anticipated Type Option Verification for Today *********');
            addTrial.selectAddTrialStartDateOption('1');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            console.log('******* Trial Primary Completion Date Anticipated Type Option Verification for Today *********');
            addTrial.selectAddTrialPrimaryCompletionDateOption('1');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            console.log('******* Trial Completion Date Anticipated Type Option Verification for Today *********');
            addTrial.selectAddTrialCompletionDateOption('1');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^the Trial date is in the future$/, function () {
        return browser.sleep(25).then(function () {
            console.log('******* Trial Start Date Verification Date in Future *********');
            addTrial.clickAddTrialDateField('1');
            addTrial.clickAddTrialDateFieldNextMonth('01');
            console.log('******* Trial Completion Date Verification Date in Future *********');
            addTrial.clickAddTrialDateField('2');
            addTrial.clickAddTrialDateFieldNextMonth('01');
            console.log('******* Trial Completion Date Verification Date in Future *********');
            addTrial.clickAddTrialDateField('3');
            addTrial.clickAddTrialDateFieldNextMonth('01');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Trial date type must always be anticipated$/, function () {
        return browser.sleep(25).then(function () {
            console.log('******* Trial Start Date Actual Type Option Verification in Future *********');
            addTrial.selectAddTrialStartDateOption('0');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal(errorMsgTrialStartDateFutureTypeActual);
            console.log('******* Trial Start Date Anticipated Type Option Verification in Future *********');
            addTrial.selectAddTrialStartDateOption('1');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialStartDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            console.log('******* Trial Primary Completion Date Actual Type Option Verification in Future *********');
            addTrial.selectAddTrialPrimaryCompletionDateOption('0');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal(errorMsgTrialPrimaryCompletionDateFutureTypeActual);
            console.log('******* Trial Primary Completion Date Anticipated Type Option Verification in Future *********');
            addTrial.selectAddTrialPrimaryCompletionDateOption('1');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialPrimaryCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            console.log('******* Trial Completion Date Actual Type Option Verification in Future *********');
            addTrial.selectAddTrialCompletionDateOption('0');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal(errorMsgTrialCompletionDateFutureTypeActual);
            console.log('******* Trial Completion Date Anticipated Type Option Verification in Future *********');
            addTrial.selectAddTrialCompletionDateOption('1');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialCompletionDateErrorMessageActualAnticipated.getText()).to.eventually.equal('');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^The Trial Start Date can be in the past, present, or future$/, function () {
        return browser.sleep(25).then(function () {
            console.log('******* Trial Start Date Verification Date in Past *********');
            addTrial.clickAddTrialDateField('1');
            addTrial.clickAddTrialDateFieldPreviousMonth('01');
            addTrial.clickAddTrialReviewButton();
            expect(projectFunctions.verifyWarningMessage(errorMsgTrialStartDate)).to.become('false');
            console.log('******* Trial Start Date Verification Date Today *********');
            addTrial.clickAddTrialDateField('1');
            addTrial.clickAddTrialDateToday();
            addTrial.clickAddTrialReviewButton();
            expect(projectFunctions.verifyWarningMessage(errorMsgTrialStartDate)).to.become('false');
            console.log('******* Trial Start Date Verification Date in Future *********');
            addTrial.clickAddTrialDateField('1');
            addTrial.clickAddTrialDateFieldNextMonth('01');
            addTrial.clickAddTrialReviewButton();
            expect(projectFunctions.verifyWarningMessage(errorMsgTrialStartDate)).to.become('false');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^The Completion Date is always the same as, or later than, the Primary Completion Date$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialResetButton();
            addTrial.clickAddTrialDateField('2');
            addTrial.clickAddTrialDateToday();
            console.log('******* Trial Completion Date Verification Date in Past as compare to Primary Completion Date *********');
            addTrial.clickAddTrialDateField('3');
            addTrial.clickAddTrialDateFieldPreviousMonth('01');
            addTrial.clickAddTrialReviewButton();
            browser.sleep(5000);
            expect(addTrial.addTrialCompletionDateErrorMessageWithTrialPrimaryCompletionDate.getText()).to.eventually.equal(completionDateErrorMessageWithTrialPrimaryCompletionDate);
            console.log('******* Trial Completion Date Verification Date in Today as compare to Primary Completion Date *********');
            addTrial.clickAddTrialDateField('3');
            addTrial.clickAddTrialDateToday();
            addTrial.clickAddTrialReviewButton();
            browser.sleep(5000);
            expect(addTrial.addTrialCompletionDateErrorMessageWithTrialPrimaryCompletionDate.getText()).to.eventually.equal('');
            console.log('******* Trial Completion Date Verification Date in later as compare to Primary Completion Date *********');
            addTrial.clickAddTrialDateField('3');
            addTrial.clickAddTrialDateFieldNextMonth('01');
            addTrial.clickAddTrialReviewButton();
            browser.sleep(5000);
            expect(addTrial.addTrialCompletionDateErrorMessageWithTrialPrimaryCompletionDate.getText()).to.eventually.equal('');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^The Primary Completion Date is always the same as, or later than, the Trial Start Date$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialResetButton();
            addTrial.clickAddTrialDateField('1');
            addTrial.clickAddTrialDateToday();
            console.log('******* Trial Primary Completion Date Verification Date in Past as compare to Trial Start Date *********');
            addTrial.clickAddTrialDateField('2');
            addTrial.clickAddTrialDateFieldPreviousMonth('01');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialPrimaryCompletionDateErrorMessageWithTrialStartDate.getText()).to.eventually.equal(primaryCompletionDateErrorMessageWithTrialStartDate);
            console.log('******* Trial Primary Completion Date Verification Date in Today as compare to Trial Start Date *********');
            addTrial.clickAddTrialDateField('2');
            addTrial.clickAddTrialDateToday();
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialPrimaryCompletionDateErrorMessageWithTrialStartDate.getText()).to.eventually.equal('');
            console.log('******* Trial Primary Completion Date Verification Date in later as compare to Trial Start Date *********');
            addTrial.clickAddTrialDateField('2');
            addTrial.clickAddTrialDateFieldNextMonth('01');
            addTrial.clickAddTrialReviewButton();
            expect(addTrial.addTrialPrimaryCompletionDateErrorMessageWithTrialStartDate.getText()).to.eventually.equal('');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I am on the Trial Status Section$/, function (callback) {
        callback();
    });

};