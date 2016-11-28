/**
 * Author: Shamim Ahmed
 * Date: 02/08/2016
 * Page Object: Abstraction NCI Specific Information Page
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionRegulatoryHuman = function(){

    /*
     * Admin Data
     */

    //General Trial Details
    this.adminDataGeneralTrial = element(by.css('a[ui-sref="main.pa.trialOverview.generalTrialDetails"]'));
    //Regulatory Information - FDAAA
    this.adminDataRegulatoryInfoFDA = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryFda"]'));
    //Regulatory Information - Human Subject Safety
    this.adminDataRegulatoryInfoHumanSfty = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInfoHumanSafety"]'));
    //Regulatory Information - IND/EDE
    this.adminDataRegulatoryInfoIND = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInd"]'));
    //Trial Status
    //Trial Funding
    this.adminDataTrialFunding = element(by.css('a[ui-sref="main.pa.trialOverview.funding"]'));
    //NCI Specific Information
    this.adminDataNciSpecific = element(by.css('a[ui-sref="main.pa.trialOverview.nciInfo"]'));

    /*
     * Human Subject Safety object(s)
     */

    this.humanSafetyBorad = element(by.css('h4.panel-title'));

    this.humanSafetyBoradApprovalStatus = element(by.model('regInfoSafetyView.trialDetailsObj.board_approval_status_id'));
    this.humanSafetyBoradApprovalStatusAll = element.all(by.model('regInfoSafetyView.trialDetailsObj.board_approval_status_id'));
    this.humanSafetyBoradApprovalStatuslbl = element(by.css('label[for="board_approval_status"]')); //by.css('.control-label.col-xs-12.col-sm-4')
    this.humanSafetyBoradAfiliationSearchOrgButton = element(by.id('org_search_modal')); // by.css('#org_search_modal')
    this.humanSafetyBoradAffiliation = element(by.model('regInfoSafetyView.trialDetailsObj.board_affiliated_org.name'));
    this.humanSafetyBoradAffiliationlbl = element(by.css('label[for="board_affiliation"]'));
    this.humanSafetyBoradContactAddress = element(by.model('regInfoSafetyView.trialDetailsObj.board_affiliated_org.address'));
    this.humanSafetyBoradContactAddresslbl = element(by.css('label[for="board_affiliation_address"]'));
    this.humanSafetyBoradContactCity = element(by.model('regInfoSafetyView.trialDetailsObj.board_affiliated_org.city'));
    this.humanSafetyBoradContactCitylbl = element(by.css('label[for="board_affiliation_city"]'));
    this.humanSafetyBoradStateProvince = element(by.model('regInfoSafetyView.trialDetailsObj.board_affiliated_org.state_province'));
    this.humanSafetyBoradStateProvincelbl = element(by.css('label[for="board_affiliation_state"]'));
    this.humanSafetyBoradZipPostalCode = element(by.model('regInfoSafetyView.trialDetailsObj.board_affiliated_org.postal_code'));
    this.humanSafetyBoradZipPostalCodelbl = element(by.css('label[for="board_affiliation_zipcode"]'));
    this.humanSafetyBoradCountry = element(by.model('regInfoSafetyView.trialDetailsObj.board_affiliated_org.country'));
    this.humanSafetyBoradCountrylbl = element(by.css('label[for="board_affiliation_country"]'));
    this.humanSafetyBoradPhone = element(by.model('regInfoSafetyView.trialDetailsObj.board_affiliated_org.phone'));
    this.humanSafetyBoradPhonelbl = element(by.css('label[for="board_affiliation_phone"]'));
    this.humanSafetyBoradEmail = element(by.model('regInfoSafetyView.trialDetailsObj.board_affiliated_org.email'));
    this.humanSafetyBoradEmaillbl = element(by.css('label[for="board_affiliation_email"]'));
    this.humanSafetyBoradName = element(by.model('regInfoSafetyView.trialDetailsObj.board_name'));
    this.humanSafetyBoradNamelbl = element(by.css('label[for="board_name"]'));
    this.humanSafetyBoradApprovalNumber = element(by.model('regInfoSafetyView.trialDetailsObj.board_approval_num'));
    this.humanSafetyBoradApprovalNumberlbl = element(by.css('label[for="approval_number"]'));
    //this.humanSafetyBorad = element();

    this.humanSafetySave = element(by.buttonText('Save'));
    this.humanSafetyReset = element(by.css('button[ng-click="regInfoSafetyView.resetHumanSafetyInfo()"]'));

    this.requiredMessageApprovalNumber = element(by.css('div[ng-show="regInfoSafetyView.approvalNumRequired"] .help-block.ng-scope'));
    this.requiredMessageBoardAffiliation = element(by.xpath('//uib-accordion/div/div/div[2]/div/div/form/div[3]/div[1]/div[1]/span[2]/span'));
    this.requiredMessageBoardName = element(by.xpath('//uib-accordion/div/div/div[2]/div/div/form/div[3]/div[9]/div/span[2]/span')); //uib-accordion/div/div/div[2]/div/div/form/div[3]/div[9]/div/span[2]/span



    var helper = new helperFunctions();

    //***********************************
    //Admin Data
    //***********************************

    //General Trial Details: Click Left Navigation Link
    this.clickAdminDataGeneralTrial = function(){
        helper.clickButton(this.adminDataGeneralTrial, "General Trial Details Admin Data Button");
    };

    //Regulatory Information - FDAAA: Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoFDA = function(){
        helper.clickButton(this.adminDataRegulatoryInfoFDA, "Regulatory Information - FDAAA Admin Data Button");
    };

    //Regulatory Information - Human Subject Safety : Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoHumanSafety = function(){
        helper.clickButton(this.adminDataRegulatoryInfoHumanSfty, "Regulatory Information - Human Subject Safety Admin Data Button");
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

    //***********************************
    //Human Subject Safety page object(s)
    //***********************************

    //Board Approval Status : Drop down
    this.selectBoardApprovalStatus = function(getStatus)  {
        helper.selectValueFromList(this.humanSafetyBoradApprovalStatus, getStatus, "Board Approval Status - drop down field selected as:["+getStatus+"]");
    };

    //Board Name : Text Box
    this.setBoardName = function(getBoardNm)  {
        helper.setValue(this.humanSafetyBoradName,getBoardNm,"Board Name - Text Box field value entered:["+getBoardNm+"]");
    };

    //Board Approval Number : Text Box
    this.setBoardApprovalNumber = function(getBoardAppvlNm)  {
        helper.setValue(this.humanSafetyBoradApprovalNumber,getBoardAppvlNm,"Board Name - Text Box field value entered:["+getBoardAppvlNm+"]");
    };

    //Board Affiliation Search Organization : Lookup Button
    this.clickBoardAffiliationSearchOrganizationButton = function(){
        helper.clickButton(this.humanSafetyBoradAfiliationSearchOrgButton, "NCI Specific Information Admin Data Button");
    };

    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.humanSafetySave,"Save - button");
    };

    //Reset : Button
    this.clickReset = function(){
        helper.clickButton(this.humanSafetyReset,"Reset - button");
    };

    //***********************************
    //Verify Board Affiliation
    //***********************************






};

module.exports = abstractionRegulatoryHuman;
