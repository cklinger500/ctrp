/**
 * Author: Shamim Ahmed
 * Date: 01/09/2015
 * Page Object: Abstraction Trial Funding
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionTrialFunding = function(){

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

    //NCI Grant page object

    this.nciGrantQuelbl = element(by.css('.control-label.col-xs-12.col-sm-4')); //by.css('label.control-label.col-xs-12.col-sm-6')
    this.nciGrantQueRdo = element.all(by.model('trialDetailView.curTrial.grant_question')); //by.css('input[ng-model="trialDetailView.curTrial.ind_ide_question"]')

    //Funding Mechanism Fields
    this.nciGrantFundingMechanism = element(by.model('trialDetailView.funding_mechanism'));
    this.nciGrantInstitueCode = element(by.model('trialDetailView.institute_code'));
    this.nciGrantSerialNumber = element(by.model('$select.search'));

    this.nciGrantSerialNumberBox = element(by.binding('$select.placeholder')); //element(by.css('span[aria-label="Select box activate"]'));//element(by.model('trialDetailView.serial_number'));
    this.nciGrantSerialNumberField = element(by.css('input[ng-model="$select.search"]'));
    this.nciGrantSerialNumberSelect = element(by.css('.ui-select-choices-row.select2-highlighted'));
    this.nciGrantSerialNumberVerify = element(by.css('.select2-choice.ui-select-match'));

    this.nciGrantNCIDivisionProgCode = element(by.model('trialDetailView.nci'));
    this.nciGrantAddButton = element(by.css('button[ng-click="trialDetailView.addGrant()"]'));

    //Funding Mechanism Labels
    this.nciGrantLblFundingMechanism = element(by.css('.table.table-striped.table-condensed>thead>tr>th:nth-child(01)'));
    this.nciGrantLblInstitueCode = element(by.css('.table.table-striped.table-condensed>thead>tr>th:nth-child(02)'));
    this.nciGrantLblSerialNumber = element(by.css('.table.table-striped.table-condensed>thead>tr>th:nth-child(03)'));
    this.nciGrantLblNCIDivisionProgCode = element(by.css('.table.table-striped.table-condensed>thead>tr>th:nth-child(04)'));

    //Save and Reset Buttons
    this.nciGrantSave = element(by.buttonText('Save'));
    this.nciGrantReset = element(by.css('button[ng-click="trialDetailView.reload()"]'));

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

    //NCI Grant page object

    //Is this trial funded by an NCI grant? : Radio Button
    this.selectNCIGrantQueRdo = function(nciGrantQueYesOrNo)  {
        helper.clickRadioButton(this.nciGrantQueRdo,nciGrantQueYesOrNo,"Is this trial funded by an NCI grant? - radio button field selected as:["+nciGrantQueYesOrNo+"]");
    };

    //Verify Is this trial funded by an NCI grant? value : Label
    this.verifyNCIGrantlblValue = function(getLblValue){
        helper.getVerifyLabel(this.nciGrantQuelbl,getLblValue,"Is this trial funded by an NCI grant? field");
    };

    //Verify NCI Grant options
    this.verifyNCIGrantYesOrNoOption = function(getNCIGrantYesOrNoOption, result)  {
        if (getNCIGrantYesOrNoOption === '0') {
            expect(this.nciGrantQueRdo.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (getNCIGrantYesOrNoOption === '1') {
            expect(this.nciGrantQueRdo.get(1).isSelected()).to.eventually.equal(result);
        }
    };



    //NCI Grant
    this.clickAddGrantButton = function(){
        helper.clickButton(this.nciGrantAddButton,"NCI Grant Add button");
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

module.exports = abstractionTrialFunding;
