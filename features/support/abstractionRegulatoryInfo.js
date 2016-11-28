/**
 * Author: Shamim Ahmed
 * Date: 02/20/2016
 * Page Object: Abstraction Regulatory Information FDAAA
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionRegulatoryInfo = function(){

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
    this.adminDataTrialStatus = element(by.css('a[ui-sref="main.pa.trialOverview.paTrialStatus"]'));
    //Trial Funding
    this.adminDataTrialFunding = element(by.css('a[ui-sref="main.pa.trialOverview.funding"]'));
    //Collaborators
    this.adminDataCollaborators = element(by.css('a[ui-sref="main.pa.trialOverview.collaborators"]'));
    //NCI Specific Information
    this.adminDataNciSpecific = element(by.css('a[ui-sref="main.pa.trialOverview.nciInfo"]'));


    /*
     * Regulatory Information object(s)
     */
    //Responsible Party
    this.regulatoryInfoResponsiblePartyList = element(by.model('trialDetailView.curTrial.responsible_party_id'));
    this.regulatoryInfoResponsiblePartyListAll = element.all(by.model('trialDetailView.curTrial.responsible_party_id'));
    this.regulatoryInfoResponsiblePartyListLbl = element(by.css('label.control-label.col-xs-12.col-sm-3'));
    //Sponsor
    this.regulatoryInfoSponsor = element(by.css('input[name="sponsor_name"]'));//by.css('input.form-control.input-sm')
    this.regulatoryInfoSponsorLbl = element(by.css('label.control-label.col-xs-12.col-sm-3'));
    //Principal Investigator
    this.regulatoryInfoInvestigator = element(by.css('input[name="investigator_name1"]'));
    this.regulatoryInfoInvestigatorTitle = element(by.model('trialDetailView.curTrial.investigator_title'));
    this.regulatoryInfoInvestigatorAffiliation = element(by.css('input[name="inv_aff_name1"]'));
    this.regulatoryInfoInvestigatorSearchOrg = element.all(by.id('org_search_modal'));
    //Sponsor Investigator
    this.regulatoryInfoInvestigatorPersonSearch = element.all(by.id('person_search_modal')); //by.css('button[ng-click="searchPerson(\\'lg\\')"]')
    //Investigator Title Wraning message
    this.regulatoryInfoResponsiblePartyInvesWaning = element(by.css('span[ng-show="ctrpbtn.trial_form.needsAttention(trial_form.investigator_title)"]'));

    //Trial Oversight Authority
    this.regulatoryInfoAuthorityCountry = element(by.model('trialDetailView.authority_country'));
    this.regulatoryInfoAuthorityOrg = element(by.model('trialDetailView.authority_org'));
    this.regulatoryInfoAuthorityAdd = element(by.css('button[ng-click="trialDetailView.addAuthority()"]'));
    this.regulatoryInfoAuthorityErr = element(by.css('.add-association-error.ng-binding'));

    //Indicator
    this.regulatoryInfoIndicatorFDA = element.all(by.model('trialDetailView.curTrial.intervention_indicator'));
    this.regulatoryInfoIndicator801 = element.all(by.model('trialDetailView.curTrial.sec801_indicator'));
    this.regulatoryInfoIndicatorData = element.all(by.model('trialDetailView.curTrial.data_monitor_indicator'));

    //Save and Reset
    this.regulatoryInfoSave = element(by.id('submit_processing'));
    this.regulatoryInfoReset = element(by.css('button[ng-click="trialDetailView.reload()"]')); //.btn.btn-warning.pull-right

    //page Header
    this.generalTrailHeader = element(by.css('h4.panel-title'));

    //Labels Text
    this.fdaaaTitle = element(by.css('h4.ng-scope'));


    this.authorityTable = element.all(by.css('.table.table-bordered.table-striped.table-condensed tbody tr'));
    this.authorityTableHeaderA = element(by.css('.table.table-bordered.table-striped.table-condensed thead tr th:nth-child(01)'));
    this.authorityTableHeaderB = element(by.css('.table.table-bordered.table-striped.table-condensed thead tr th:nth-child(02)'));
    this.authoTblColARwAExists = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(01) td:nth-child(01)'));

    var deleteA = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(1) td:nth-child(03) label'));
    var deleteB = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(2) td:nth-child(03) label'));
    var deleteC = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(3) td:nth-child(03) label'));
    var deleteD = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(4) td:nth-child(03) label'));
    var deleteE = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(5) td:nth-child(03) label'));
    var deleteF = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(6) td:nth-child(03) label'));
    var deleteG = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(7) td:nth-child(03) label'));
    var deleteH = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(8) td:nth-child(03) label'));

    var authoTblColARwA = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(01) td:nth-child(01)'));
    var authoTblColARwB = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(02) td:nth-child(01)'));
    var authoTblColARwC = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(03) td:nth-child(01)'));
    var authoTblColARwD = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(04) td:nth-child(01)'));
    var authoTblColARwE = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(05) td:nth-child(01)'));
    var authoTblColARwF = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(06) td:nth-child(01)'));
    var authoTblColARwG = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(07) td:nth-child(01)'));
    var authoTblColARwH = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(08) td:nth-child(01)'));

    var authoTblColBRwA = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(01) td:nth-child(02)'));
    var authoTblColBRwB = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(02) td:nth-child(02)'));
    var authoTblColBRwC = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(03) td:nth-child(02)'));
    var authoTblColBRwD = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(04) td:nth-child(02)'));
    var authoTblColBRwE = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(05) td:nth-child(02)'));
    var authoTblColBRwF = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(06) td:nth-child(02)'));
    var authoTblColBRwG = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(07) td:nth-child(02)'));
    var authoTblColBRwH = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(08) td:nth-child(02)'));

    var authoTblColCRwA = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(01) td:nth-child(03) label'));
    var authoTblColCRwB = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(02) td:nth-child(03) label'));
    var authoTblColCRwC = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(03) td:nth-child(03) label'));
    var authoTblColCRwD = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(04) td:nth-child(03) label'));
    var authoTblColCRwE = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(05) td:nth-child(03) label'));
    var authoTblColCRwF = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(06) td:nth-child(03) label'));
    var authoTblColCRwG = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(07) td:nth-child(03) label'));
    var authoTblColCRwH = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(08) td:nth-child(03) label'));


    var helper = new helperFunctions();


    this.findTrailAuthorityAndDeleteOrVerify = function(getAuthoCountryName, getAuthoOrgName, getDeleteConf, getVerify){
        this.waitForRegulatoryInfoElement(this.authoTblColARwAExists, "Trial Oversight Authority Table");
        this.authorityTable.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=0; i<(rows.length); i++){
                //Row 1
                if (i === 0){
                    console.log('Test 1');
                    getAuthoCntryNm = authoTblColARwA.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = authoTblColBRwA.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 1 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteA, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = authoTblColARwA.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = authoTblColBRwA.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 2
                if (i === 1){
                    console.log('Test 2');
                    getAuthoCntryNm = authoTblColARwB.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = authoTblColBRwB.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 2 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteB, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = authoTblColARwB.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = authoTblColBRwB.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 3
                if (i === 2){
                    console.log('Test 3');
                    getAuthoCntryNm = authoTblColARwC.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = authoTblColBRwC.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 3 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteC, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = authoTblColARwC.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = authoTblColBRwC.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 4
                if (i === 3){
                    console.log('Test 4');
                    getAuthoCntryNm = authoTblColARwD.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = authoTblColBRwD.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 4 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteD, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = authoTblColARwD.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = authoTblColBRwD.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 5
                if (i === 4){
                    console.log('Test 5');
                    getAuthoCntryNm = authoTblColARwE.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = authoTblColBRwE.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 5 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteE, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = authoTblColARwE.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = authoTblColBRwE.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 6
                if (i === 5){
                    console.log('Test 6');
                    getAuthoCntryNm = authoTblColARwF.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = authoTblColBRwF.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 6 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteF, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = authoTblColARwF.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = authoTblColBRwF.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 7
                if (i === 6){
                    console.log('Test 7');
                    getAuthoCntryNm = authoTblColARwG.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = authoTblColBRwG.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 7 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteG, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = authoTblColARwG.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = authoTblColBRwG.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 8
                if (i === 7){
                    console.log('Test 8');
                    getAuthoCntryNm = authoTblColARwH.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = authoTblColBRwH.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 8 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteH, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = authoTblColARwH.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = authoTblColBRwH.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //
            };
        });
    };



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

    //Trial Status : Click Left Navigation Link
    this.clickAdminDataTrialStatus = function(){
        helper.clickButton(this.adminDataTrialStatus, "Trial Funding Admin Data Button");
    };

    //Trial Funding : Click Left Navigation Link
    this.clickAdminDataTrialFunding = function(){
        helper.clickButton(this.adminDataTrialFunding, "Trial Funding Admin Data Button");
    };

    //Collaborators : Click Left Navigation Link
    this.clickAdminDataCollaborators = function(){
        helper.clickButton(this.adminDataCollaborators, "Collaborators Admin Data Button");
    };

    //NCI Specific Information : Click Left Navigation Link
    this.clickAdminDataNCISpecificInformation = function(){
      helper.clickButton(this.adminDataNciSpecific, "NCI Specific Information Admin Data Button");
    };

    //***********************************
    //Regulatory Information – FDAAA Objects(s)
    //***********************************

    //******Responsible Party*******
    this.selectResponsibleParty = function(getResponsiblePartyVal){
        helper.selectValueFromList(this.regulatoryInfoResponsiblePartyList, getResponsiblePartyVal,"Responsible Party - drop down field selected as:["+getResponsiblePartyVal+"]");
    };

    this.setInvestigatorTitle = function(getTitleVal){
        helper.setValue(this.regulatoryInfoInvestigatorTitle,getTitleVal,"Investigator Title - field");
    };


    //******Trial Oversight Authority*******
    this.selectAuthorityCountry = function(getCountryVal){
        helper.selectValueFromList(this.regulatoryInfoAuthorityCountry, getCountryVal,"Trial Oversight Authority: Country - drop down field selected as:["+getCountryVal+"]");
    };

    this.selectAuthorityOrganization = function(getOrgVal){
        helper.selectValueFromList(this.regulatoryInfoAuthorityOrg, getOrgVal,"Trial Oversight Authority: Organization - drop down field selected as:["+getOrgVal+"]");
    };

    this.clickAuthorityAddButton = function(){
        helper.clickButton(this.regulatoryInfoAuthorityAdd,"Authority Add - button");
        helper.wait_for(25);
    };

    this.verifyAuthorityErrMsg = function(getExpErrMsg) {
        helper.getVerifyRequired(this.regulatoryInfoAuthorityErr,getExpErrMsg, "Error message verification")
    };


    //**********Org or Person Search Button*************
    this.clickSearchOrgButtonByIndex = function(index){
        helper.clickButtonNoHeaderIndex(this.regulatoryInfoInvestigatorSearchOrg,index, "Search Organization Lookup button by Index:["+index+"]");
    };

    this.clickSearchPersonsButton = function(){
        helper.clickButton(this.regulatoryInfoInvestigatorPersonSearch,"Search Persons Lookup - button");
    };

    this.clickSearchPersonsButtonByIndex = function(index){
        helper.clickButtonNoHeaderIndex(this.regulatoryInfoInvestigatorPersonSearch, index, "Search Persons Lookup - button by Index");
    };

    //**************Indicators*****************
    this.selectCentralContactRdo = function(button, getRdoValue, errorMessage)  {
            if (getRdoValue === 'No') {
                button.get(0).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(0).isSelected()).to.eventually.equal(true);
            }else if (getRdoValue === 'Yes') {
                button.get(1).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(1).isSelected()).to.eventually.equal(true);
            }else if (getRdoValue === 'NA') {
                button.get(2).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(2).isSelected()).to.eventually.equal(true);
            }
    };

    //*********Save and Reset*************
    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.regulatoryInfoSave,"Save - button");
    };

    //Cancel : Button
    this.clickReset = function(){
        helper.clickButton(this.regulatoryInfoReset,"Reset - button");
    };


    //***********************************
    //Verification
    //***********************************

    this.verifyTextFieldValue = function(getFieldName, getFieldValueToVerify, getFieldDesc){
        helper.getVerifyValue(getFieldName, getFieldValueToVerify, getFieldDesc);
    };



    //Wait For Element : Wait
    this.waitForRegulatoryInfoElement = function (element, label) {
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

module.exports = abstractionRegulatoryInfo;
