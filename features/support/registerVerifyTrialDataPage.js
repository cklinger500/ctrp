/**
 * Created by singhs10 on 10/1/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');

var registerVerifyTrialDataPage = function() {

    this.viewTDFieldsLabel = element.all(by.css('.control-label.col-xs-12.col-sm-3'));
    this.viewTDNCIID = element(by.binding('verifyTrialDataView.curTrial.nci_id'));
    this.viewTDNCTID = element(by.binding('otherId.protocol_id'));
    this.viewTDLeadOrgID = element(by.binding('verifyTrialDataView.curTrial.lead_protocol_id'));
    this.viewTDOfficialTitle = element(by.binding('verifyTrialDataView.curTrial.official_title'));
    this.viewTDVerificationDate = element(by.binding('verifyTrialDataView.curTrial.verification_date'));
    this.addTDSaveButton = element(by.id('submit_btn'));
    this.viewTDDialogText = element(by.css('.md-dialog-content-body'));
    this.acceptTDDialogText = element(by.binding('dialog.ok'));
    this.cancelTDDialogText = element(by.binding('dialog.cancel'));

    var helper = new helperFunctions();

    this.getTDNCIID = function(NCIID)  {
        helper.getVerifyLabel(this.viewTDNCIID,NCIID,"View Trial Data Verification by NCI ID field");
    };

    this.getTDNCTID = function(NCTID)  {
        helper.getVerifyLabel(this.viewTDNCTID,NCTID,"View Trial Data Verification by NCT ID field");
    };

    this.getTDLeadOrgId= function(TDLeadOrgId)  {
        helper.getVerifyLabel(this.viewTDLeadOrgID,TDLeadOrgId,"View Trial Data Verification by LeadOrgId field");
    };

    this.getTDOfficialTitle = function(TDOfficialTitle)  {
        helper.getVerifyLabel(this.viewTDOfficialTitle,TDOfficialTitle,"View Trial Data Verification by Official Title field");
    };

    this.getTDVerificationDate = function(TDOrgName){
        helper.getVerifyLabel(this.viewTDVerificationDate,TDOrgName,"View Trial Data Verification by Current Verification Date field");
    };

    this.clickAddTDSaveButton = function(){
        helper.clickButton(this.addTDSaveButton,"Add Save Verification Record Save button");
    };

    this.getTDDialogText = function(TDDialogText){
        helper.getVerifyLabel(this.viewTDDialogText,TDDialogText,"View Trial Data Verification by Confirm Dialog Text field");
    };

    this.clickAcceptTDDialogButton = function(){
        helper.clickButton(this.acceptTDDialogText,"Click Accept Verification Record Accept button");
    };

    this.clickCancelTDDialogButton = function(){
        helper.clickButton(this.cancelTDDialogText,"Click Cancel Verification Record Cancel button");
    };
};

module.exports = registerVerifyTrialDataPage;