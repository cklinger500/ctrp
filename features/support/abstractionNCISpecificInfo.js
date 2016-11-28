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


var abstractionNCISpecificInfo = function(){

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

    //NCI Specific Information Page Objects
    this.nciSpecificStudySource = element(by.model('trialNciView.curTrial.study_source_id'));
    this.nciSpecificSearchOrganisations = element(by.id('org_search_modal')); // by.buttonText(' Search Organizations')
    this.nciSpecificProgramCode = element(by.model('trialNciView.curTrial.program_code'));
    this.nciSpecificDepartmentIdentifier = element(by.model('trialNciView.curTrial.nih_nci_div'));
    this.nciSpecificProgramID = element(by.model('trialNciView.curTrial.nih_nci_prog'));
    this.nciSpecificSendTrial = element(by.model('trialNciView.curTrial.send_trial_flag')); //by.model('trialNciView.curTrial.send_trial_flag')
    this.nciSpecificSendTrialRadio = element.all(by.model('trialNciView.curTrial.send_trial_flag'));
    this.nciSpecificSendCTDotGovLbl = element(by.css('.control-label.col-xs-12.col-sm-6'));
    this.nciSpecificComments = element(by.id('trial_nci_specific_comment'));

    this.nciSpecificAdminCheckOut = element(by.id('admin_checkout')); //by.id('admin_checkout') by.css('#admin_checkout') by.buttonText('Admin Check Out')
    this.nciSpecificAdminCheckIn = element(by.id('admin_checkin')); //by.buttonText('Admin Check In')
    this.nciSpecificAdminBackToSearchResult = element(by.buttonText('↵ Back to Search Results↵ '));

    this.nciSpecificSave = element(by.buttonText('Save'));
    this.nciSpecificReset = element(by.css('button[ng-click="trialNciView.reload()"]'));

    this.nciSpecificStudySourceRequired = element(by.css('.help-block:nth-child(02)'));
    this.nciSpecificFundingSourceRequired = element(by.css('.help-block:nth-child(03)'));

    //Organization Search
    this.orgSearchName = element(by.model('searchParams.name'));
    this.orgSearchSearchAlias = element(by.model('searchParams.alias')); //by.id('alias_search')
    this.orgSearchFamilyName = element(by.model('searchParams.family_name'));
    this.orgSearchSourceStatus = element(by.css('p.form-control-static'));
    this.orgSearchSourceID = element(by.model('searchParams.source_id'));
    this.orgSearchSourceContext = element(by.binding('sourceContexts[0].name'));
    this.orgSearchCity = element(by.model('searchParams.city'));
    this.orgSearchPotalCode = element(by.model('searchParams.postal_code'));
    this.orgSearchCountryList = element(by.model('searchParams.country'));
    this.orgSearchPhone = element(by.model('searchParams.phone'));
    this.orgSearchEmail = element(by.model('searchParams.email'));
    this.orgSearchStateList = element(by.model('searchParams.state_province'));
    this.orgSearchExactSearch = element(by.model('searchParams.wc_search'));
    this.orgSearchClearButton = element(by.id('reset_btn'));
    this.orgSearchSearchButton = element(by.id('submission_btn'));
    this.orgSearchSelectItem = element(by.css('div[ng-click="selectButtonClick(row, $event)"]'));
    this.orgSearchConfirmSelection = element(by.buttonText('Confirm Selection'));
    this.orgSearchClose = element();

    this.orgAddFundingSourceOrgA = element(by.css('.form-control.input-sm.animated-item')); // .css('input[value="Boston Medical Center"]')
    this.orgAddFundingSourceBostonMed = element(by.css('.form-control.input-sm.animated-item'))
    this.orgAddFundingSourceBostonUni = element(by.xpath('*//form/uib-accordion/div/div/div[2]/div/div[1]/fieldset[2]/div[3]/div[2]/input')); //element(by.css('input[value="Boston University School Of Public Health"]'));
    this.orgAddFundingSourceMemorialHos = element(by.xpath('*//form/uib-accordion/div/div/div[2]/div/div[1]/fieldset[2]/div[4]/div[2]/input'));

    this.orgAddFundingSourceBostonMedDel = element(by.css('.glyphicon.glyphicon-remove-circle')); // .col-xs-12.col-sm-1.btn.btn-default // by.css('.glyphicon.glyphicon-remove-circle')
    this.orgAddFundingSourceBostonUniDel = element(by.xpath('//form/uib-accordion/div/div/div[2]/div/div[1]/fieldset[2]/div[3]/label/i'));
    this.orgAddFundingSourceMemorialHosDel = element(by.xpath('//form/uib-accordion/div/div/div[2]/div/div[1]/fieldset[2]/div[4]/label/i'));

    //status
    this.trialOverviewProcessingStatus = element(by.css('.col-sm-4.col-xs-12:nth-child(3) p:nth-child(4)'));
    this.trialOverviewResearchCategory = element(by.css('.col-sm-4.col-xs-12:nth-child(2) p:nth-child(2)'));
    this.trialOverviewCurrentTrialStatus = element(by.css('.col-sm-4.col-xs-12:nth-child(3) p:nth-child(2)'));


    var helper = new helperFunctions();

    //Verify send to trial CTDotGov
    this.verifySendToTrialCTDotGov = function(getYesOrNoOption, result)  {
        if (getYesOrNoOption === '0') {
            expect(this.nciSpecificSendTrialRadio.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (getYesOrNoOption === '1') {
            expect(this.nciSpecificSendTrialRadio.get(1).isSelected()).to.eventually.equal(result);
        }
    };

    //Verify Processing Status
    this.verifyProcessingStatus = function(expProcessingStatus){
        helper.getVerifyLabel(this.trialOverviewProcessingStatus,expProcessingStatus,"Verify Processing Status");
    };

    //Verify Current Trial Status
    this.verifyCurrentTrialStatus = function(expCurntTrlStatus){
        helper.getVerifyLabel(this.trialOverviewCurrentTrialStatus,expCurntTrlStatus,"Verify Current Trial Status");
    };

    //Verify Research Category
    this.verifyResearchCategory = function(expResearchCategory){
        helper.getVerifyLabel(this.trialOverviewResearchCategory,expResearchCategory,"Verify Research Category");
    };

    //Verify Study Source Required
    this.verifyStudySourceReq = function(expStudySrcReqMsg){
        helper.getVerifyRequired(this.nciSpecificStudySourceRequired,expStudySrcReqMsg,"Study Source field");
    };

    //Verify Funding Source Required
    this.verifyFundingSourceReq = function(expFundingSrcReqMsg){
        helper.getVerifyRequired(this.nciSpecificFundingSourceRequired,expFundingSrcReqMsg,"Funding Source field");
    };

    //Verify Funding Source
    this.verifyFundingSourceOrg = function(fundingSrcOrgNm){
        helper.getVerifyValue(this.orgAddFundingSourceOrgA,fundingSrcOrgNm,"Funding Source Organization field");
    };

    //Comment program code
    this.verifyProgramCode = function(progrmCD){
      helper.getVerifyValue(this.nciSpecificProgramCode,progrmCD,"Program Code field");
    };

    //Comment verification
    this.verifyComment = function(vrfCommnt){
        helper.getVerifyValue(this.nciSpecificComments,vrfCommnt,"Comments field");
    };

    //Delete Funding Source Organization
    this.clickFundingSourceOrganizationDel = function(){
        this.orgAddFundingSourceBostonMedDel.isPresent().then(function (state) {
            console.log('Element isPresent Status: ['+state+']');
            if (state === true) {
                helper.wait_for(200);
                element(by.css('.glyphicon.glyphicon-remove-circle')).click();
                helper.wait_for(200);
                //helper.clickButton(this.orgAddFundingSourceBostonMedDel, "Funding Source Organization Delete button");
            };
        });
    };

    //Set Name : Organization Search
    this.setOrgSearchName = function(orgSrchNam){
        helper.setValue(this.orgSearchName,orgSrchNam,"Organization Search by Name field");
    };

    //Set Source ID : Organization Search
    this.setSourceId = function(sourceId){
        helper.setValue(this.sourceId,sourceId,"Organization Search by SourceId field");
    };

    //Search : Organization Search
    this.clickOrganizationSearch = function(){
        helper.clickButton(this.orgSearchSearchButton,"Organization Search button");
    };


    //Select Organization : Organization Search
    this.selectOrganizationFromGrid = function(){
        helper.clickButton(this.orgSearchSelectItem,"Organization list Item selection");
    };

    //Confirmation Selection : Organization Search
    this.clickOrganizationSelectionConfirmation = function(){
        helper.clickButton(this.orgSearchConfirmSelection,"Organization Selection Confirmation button");
    };

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

    //Study Source : Drop down
    this.selectStudySource = function(studySource)  {
        helper.selectValueFromList(this.nciSpecificStudySource,studySource,"Study Source - drop down field selected as:["+studySource+"]");
    };

    //Search Organization : Button
    this.clickSearchOrganization = function(){
        helper.clickButton(this.nciSpecificSearchOrganisations, "Search Organization button clicked");
    }

    //Program Code : Text Box
    this.setProgramCode = function(programCode)  {
        helper.setValue(this.nciSpecificProgramCode,programCode,"Program Code field value set as:["+programCode+"]");
    };

    //Department Identifier : Drop down
    this.selectDepartmentIdentifier = function(departmentID)  {
        helper.selectValueFromList(this.nciSpecificDepartmentIdentifier,departmentID,"NIH/NCI Division/Department Identifier - drop down field selected as:["+departmentID+"]");
    };

    //Program ID : Drop down
    this.selectProgramID = function(programID)  {
        helper.selectValueFromList(this.nciSpecificProgramID,programID,"NIH/NCI Program Id - drop down field selected as:["+programID+"]");
    };

    //Send Trial : Radio Button
    this.selectSendTrial = function(sendTrialYesOrNo)  {
        helper.clickRadioButton(this.nciSpecificSendTrialRadio,sendTrialYesOrNo,"Send Trial Information to ClinicalTrials.gov? - radio button field selected as:["+sendTrialYesOrNo+"]");
    };

    //Comment : Text Box
    this.setComment = function(getComment)  {
        helper.setValue(this.nciSpecificComments,getComment,"Comment field value set as:["+getComment+"]");
    };

    //Admin Check Out : Button
    this.clickAdminCheckOut = function(){
        helper.clickButton(this.nciSpecificAdminCheckOut,"Admin Check Out - button");
    };

    //Admin Check In : Button
    this.clickAdminCheckIn = function(){
        helper.clickButton(this.nciSpecificAdminCheckIn,"Admin Check In - button");
    };

    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.nciSpecificSave,"Save - button");
    };

    //Reset : Button
    this.clickReset = function(){
        helper.clickButton(this.nciSpecificReset,"Reset - button");
    };

    //Verify Study Source
    this.verifyStudySourceCurrentValue = function(){
        this.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            return value
            console.log("study source: "+value);
        });
    };

    this.getVerifyListValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.$('option:checked').getText()).to.eventually.equal(fieldValue);
        console.log(errorMessage + " - Got value");
    };

    this.wait = function (element, label) {
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


};

module.exports = abstractionNCISpecificInfo;
