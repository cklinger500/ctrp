/**
 * Author: Shamim Ahmed
 * Date: 01/09/2015
 * Page Object: Abstraction NCI Specific Information Page
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionRegulatoryIND = function(){

    //Admin Data
    //General Trial Details
    this.adminDataGeneralTrial = element(by.css('a[ui-sref="main.pa.trialOverview.generalTrialDetails"]'));
    //Regulatory Information - FDAAA
    this.adminDataRegulatoryInfoFDA = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryFda"]'));
    //Regulatory Information - Human Subject Safety
    //Regulatory Information - IND/EDE
    this.adminDataRegulatoryInfoIND = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInd"]'));
    //Trial Status
    //Trial Funding
    this.adminDataTrialFunding = element(by.css('a[ui-sref="main.pa.trialOverview.funding"]'));
    //NCI Specific Information
    this.adminDataNciSpecific = element(by.css('a[ui-sref="main.pa.trialOverview.nciInfo"]'));

    //IND/IDE page object

    this.indIDEAssociatedQuelbl = element(by.css('.control-label.col-xs-12.col-sm-6')); //by.css('label.control-label.col-xs-12.col-sm-6')
    this.indIDEAssociatedRdo = element.all(by.model('trialDetailView.curTrial.ind_ide_question')); //by.css('input[ng-model="trialDetailView.curTrial.ind_ide_question"]')
    this.indIDEAssociatedRdoCehck = element(by.model('trialDetailView.curTrial.ind_ide_question'));

    this.indIDEType = element(by.model('trialDetailView.ind_ide_type'));
    this.indIDETypeAll = element.all(by.model('trialDetailView.ind_ide_type'));
    this.indIDENumber = element(by.model('trialDetailView.ind_ide_number'));
    this.indIDEGrantor = element(by.model('trialDetailView.grantor'));
    this.indIDEGrantorAll = element.all(by.model('trialDetailView.grantor'));
    this.indIDEHolderType = element(by.model('trialDetailView.holder_type_id'));
    this.indIDEHolderTypeAll = element.all(by.model('trialDetailView.holder_type_id'));
    this.indIDEDisvisionProgramCode = element(by.model('trialDetailView.nih_nci'));
    this.indIDEDisvisionProgramCodeAll = element.all(by.model('trialDetailView.nih_nci'));
    this.indIDEAddButton = element(by.css('button[ng-click="trialDetailView.addIndIde()"]'));


    this.indIDEInfoTable = element(by.css('.table.table-bordered.table-striped.table-condensed'));

    this.indIDETblHdr = element(by.css('.table.table-bordered.table-striped.table-condensed>thead>tr:nth-child(01)'));
    this.indIDETblRowA = element(by.css('.table.table-bordered.table-striped.table-condensed>tbody>tr:nth-child(01)'));
    this.indIDETblRowB = element(by.css('.table.table-bordered.table-striped.table-condensed>tbody>tr:nth-child(02)'));

    this.indIDETblRowADel = element(by.css('.table.table-bordered.table-striped.table-condensed>tbody>tr:nth-child(01)>td:nth-child(06)>label'));
    this.indIDETblRowBDel = element(by.css('.table.table-bordered.table-striped.table-condensed>tbody>tr:nth-child(02)>td:nth-child(06)>label'));

    this.indIDESave = element(by.buttonText('Save'));
    this.indIDEReset = element(by.css('button[ng-click="trialDetailView.reload()"]'));

    this.indIDEErrMsg = element(by.css('.add-association-error'));

    var helper = new helperFunctions();


    //Admin Data
    //General Trial Details: Click Left Navigation Link
    this.clickAdminDataGeneralTrial = function(){
        helper.clickButton(this.adminDataGeneralTrial, "General Trial Details Admin Data Button");
    };

    //Regulatory Information - FDAAA: Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoFDA = function(){
        helper.clickButton(this.adminDataRegulatoryInfoFDA, "Regulatory Information - FDAAA Admin Data Button");
    };

    //Regulatory Information - IND/EDE : Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoIND = function(){
        helper.clickButton(this.adminDataRegulatoryInfoIND, "Regulatory Information - IND/EDE Admin Data Button");
    };

    //Trial Funding : Click Left Navigation Link
    this.clickAdminDataTrialFunding = function(){
        helper.clickButton(this.adminDataTrialFunding, "Trial Funding Admin Data Button");
    };

    //NCI Specific Information : Click Left Navigation Link
    this.clickAdminDataNCISpecificInformation = function(){
      helper.clickButton(this.adminDataNciSpecific, "NCI Specific Information Admin Data Button");
    };

    //IND/IDE page object

    //Does this trial have an associated IND/IDE? : Radio Button
    this.selectAssociatedINDIDERdo = function(indIDEYesOrNo)  {
        helper.clickRadioButton(this.indIDEAssociatedRdo,indIDEYesOrNo,"Does this trial have an associated IND/IDE? - radio button field selected as:["+indIDEYesOrNo+"]");
    };

    //Verify Does this trial have an associated IND/IDE? value
    this.verifyFdaIndIdelblValue = function(getLblValue){
        helper.getVerifyLabel(this.indIDEAssociatedQuelbl,getLblValue,"Does this trial have an associated IND/IDE? field");
    };

    //Verify FDA IND IDE options
    this.verifyFdaIndIdeYesOrNoOption = function(getFdaIndIdeYesOrNoOption, result)  {
        if (getFdaIndIdeYesOrNoOption === '0') {
            expect(this.indIDEAssociatedRdo.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (getFdaIndIdeYesOrNoOption === '1') {
            expect(this.indIDEAssociatedRdo.get(1).isSelected()).to.eventually.equal(result);
        }
    };

    //IND/IDE Types : Drop down
    this.selectINDIDETypes = function(indIDETyp)  {
        helper.selectValueFromList(this.indIDEType,indIDETyp,"IND/IDE Types - drop down field selected as:["+indIDETyp+"]");
    };

    //IND/IDE Number : Text Box
    this.setINDIDENumbr = function(indIDENmbr)  {
        helper.setValue(this.indIDENumber,indIDENmbr,"IND/IDE Number - Text Box field value entered:["+indIDENmbr+"]");
    };

    //IND/IDE Grantor : Drop down
    this.selectINDIDEGrantor = function(indIDEGrntr)  {
        helper.selectValueFromList(this.indIDEGrantor,indIDEGrntr,"IND/IDE Grantor - drop down field selected as:["+indIDEGrntr+"]");
    };

    //IND/IDE Holder Type : Drop down
    this.selectINDIDEHolderType = function(indIDEHldrTyp)  {
        helper.selectValueFromList(this.indIDEHolderType,indIDEHldrTyp,"IND/IDE Grantor - drop down field selected as:["+indIDEHldrTyp+"]");
    };

    //IND/IDE Division Program Code : Drop down
    this.selectINDIDEDivisionProgramCode = function(indIDEDviProgCde)  {
        helper.selectValueFromList(this.indIDEDisvisionProgramCode,indIDEDviProgCde,"IND/IDE Types - drop down field selected as:["+indIDEDviProgCde+"]");
    };

    //Delete Row A: Button
    this.clickRowADelete = function(){
        helper.clickButton(this.indIDETblRowADel,"Row A Delete - button");
    };

    //Delete Row B: Button
    this.clickRowBDelete = function(){
        helper.clickButton(this.indIDETblRowBDel,"Row B Delete - button");
    };

    //Delete Row : Table row delete
    this.clickRowDelete = function(getInt){
        helper.clickButton(element(by.css('.table.table-bordered.table-striped.table-condensed>tbody>tr:nth-child('+getInt+')>td:nth-child(06)>label')), "Deleted Table Row");
    }


    //Add : Button
    this.clickAdd = function(){
        helper.clickButton(this.indIDEAddButton,"Add - button");
    };

    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.indIDESave,"Save - button");
    };

    //Reset : Button
    this.clickReset = function(){
        helper.clickButton(this.indIDEReset,"Reset - button");
    };





};

module.exports = abstractionRegulatoryIND;
