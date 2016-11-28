/**
 * Author: Shamim Ahmed
 * Date: 04/10/2016
 * Page Object: Participating Site
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');

var helperFunctions = require('../support/helper');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var abstractionParticipating = function(){


    var helper = new helperFunctions();
    var self = this;
    /*
     * Participating Site object(s)
     */

    //Add Participating Site
    this.addParticipatingSiteBtn = element(by.id('add_participating_site'));
    this.deleteSelectedBtn = element(by.id('delete'));
    this.deleteSelectedOKBtn = element(by.id('confirmed_btn'));
    this.deleteSelectedCancelBtn = element(by.id('cancel_confirm_btn'));


    var listOfPartSiteTableHdrs = new Array("PO ID", "PO Name", "Investigators", "Site Recruitment Status", "Site Recruitment Status Date", "Primary Contact", "Edit");

    this.listOfPartSteTbl = element(by.css('#list_participating_site_tbl tbody'));
    this.listOfPartSteTblAll = element.all(by.css('#list_participating_site_tbl tbody tr'));

    this.poIdlistOfPartSteTblHeadInv = element(by.css('#list_participating_site_tbl thead tr th:nth-child(01)'));
    this.poNamelistOfPartSteTblHeadInv = element(by.css('#list_participating_site_tbl thead tr th:nth-child(02)'));
    this.investiglistOfPartSteTblHeadInv = element(by.css('#list_participating_site_tbl thead tr th:nth-child(03)'));
    this.siteRecSttslistOfPartSteTblHeadInv = element(by.css('#list_participating_site_tbl thead tr th:nth-child(04)'));
    this.siteRecSttsDatelistOfPartSteTblHeadInv = element(by.css('#list_participating_site_tbl thead tr th:nth-child(05)'));
    this.primaryContactlistOfPartSteTblHeadInv = element(by.css('#list_participating_site_tbl thead tr th:nth-child(06)'));
    this.editlistOfPartSteTblHeadInv = element(by.css('#list_participating_site_tbl thead tr th:nth-child(07)'));
    this.selectlistOfPartSteTblHeadInv = element(by.css('#list_participating_site_tbl thead tr th:nth-child(08) input'));

    //Participating Site Tab(s)
    this.participatingSiteTab = element(by.id('participating_site'));
    this.investigatorsTab = element(by.id('investigators'));
    this.contactTab = element(by.id('contactTab'));

    //Add Organization
    this.searchOrgnaizationsBtn = element(by.id('org_search_modal'));
    this.orgnizationTxt = element(by.model('psView.currentParticipatingSite.organization.name')); //by.id('organization')
    this.cityTxt = element(by.model('psView.city'));
    this.stateTxt = element(by.model('psView.state_province'));
    this.countryTxt = element(by.model('psView.country'));
    this.zipPostalCodeTxt = element(by.model('psView.postal_code'));

    this.orgnizationLbl = element(by.css('label[for="organization"]'));
    this.cityLbl = element(by.css('label[for="city"]'));
    this.stateLbl = element(by.css('label[for="state_province"]'));
    this.countryLbl = element(by.css('.control-label.col-xs-12.col-sm-3'));
    this.zipPostalCodeLbl = element(by.css('label.control-label.col-xs-12.col-sm-3'));

    //Program Code
    this.programCodeTxt = element(by.model('psView.currentParticipatingSite.program_code'));
    this.programCodeLbl = element(by.css('label[for="program_code"]'));

    //Local Trial Identifier
    this.identifierTxt = element(by.model('psView.currentParticipatingSite.local_trial_identifier'));
    this.identifierLbl = element();

    //Site Recruitment
    this.statusDateTxt = element(by.id('status_date'));
    this.statusDateCurntSelect = element()
    this.statusDateLbl = element(by.css('.table.table-striped.table-condensed thead tr th:nth-child(01)'));
    this.statusList = element(by.id('siteRecStatus_select'));
    this.statusLbl = element(by.css('.table.table-striped.table-condensed thead tr th:nth-child(02)'));
    this.commentTxt = element(by.model('psView.current_site_recruitment.comments'));
    this.commentLbl = element(by.css('.table.table-striped.table-condensed thead tr th:nth-child(03)'));
    this.addBtn = element(by.css('.table.table-striped.table-condensed tbody tr td:nth-child(04) button'));

    this.statusDateTblHead = element(by.css('#site_recruitment_tbl thead tr th:nth-child(01)'));
    this.statusTblHead = element(by.css('#site_recruitment_tbl thead tr th:nth-child(02)'));
    this.commentTblHead= element(by.css('#site_recruitment_tbl thead tr th:nth-child(03)'));
    this.errorsTblHead= element(by.css('#site_recruitment_tbl thead tr th:nth-child(04)'));
    this.eidtTblHead= element(by.css('#site_recruitment_tbl thead tr th:nth-child(05)'));
    this.deleteTblHead= element(by.css('#site_recruitment_tbl thead tr th:nth-child(06)'));

    this.tbleRWAColA = element(by.css('#site_recruitment_tbl tbody tr td:nth-child(01)'));
    this.tbleRWAColB = element(by.css('#site_recruitment_tbl tbody tr td:nth-child(02)'));
    this.tbleRWAColC = element(by.css('#site_recruitment_tbl tbody tr td:nth-child(03)'));
    this.tbleRWAColD = element(by.css('#site_recruitment_tbl tbody tr td:nth-child(04)'));
    this.tbleRWAColE = element(by.css('#site_recruitment_tbl tbody tr td:nth-child(05) button'));
    this.tbleRWAColF = element(by.css('#site_recruitment_tbl tbody tr td:nth-child(06) button'));

    //Investigators
    this.searchPersonsBtn = element(by.id('person_search_modal'));
    this.investigatorName = element(by.id('principal_investigator'));

    this.poIDTbl = element(by.css('#investigator_tbl'));
    this.poIDTblAll = element.all(by.css('#investigator_tbl tbody tr'));

    this.poIDTblHeadInv = element(by.css('#investigator_tbl thead tr th:nth-child(01)'));
    this.lastNameTblHeadInv = element(by.css('#investigator_tbl thead tr th:nth-child(02)'));
    this.firstNameTblHeadInv = element(by.css('#investigator_tbl thead tr th:nth-child(03)'));
    this.roleTblHeadInv = element(by.css('#investigator_tbl thead tr th:nth-child(04)'));
    this.statusCodeTblHeadInv = element(by.css('#investigator_tbl thead tr th:nth-child(05)'));
    this.primaryContactTblHeadInv = element(by.css('#investigator_tbl thead tr th:nth-child(06)'));
    this.eidtTblHeadInv = element(by.css('#investigator_tbl thead tr th:nth-child(07)'));
    this.deleteTblHeadInv = element(by.css('#investigator_tbl thead tr th:nth-child(08)'));

    this.tbleInvRWAColA = element(by.css('#investigator_tbl tbody tr:nth-child(01) td:nth-child(01)'));
    this.tbleInvRWAColB = element(by.css('#investigator_tbl tbody tr:nth-child(01) td:nth-child(02)'));
    var tbleInvRWAColC = element(by.css('#investigator_tbl tbody tr:nth-child(01) td:nth-child(03)'));
    this.tbleInvRWAColD = element(by.css('#investigator_tbl tbody tr:nth-child(01) td:nth-child(04)'));
    this.tbleInvRWAColE = element(by.css('#investigator_tbl tbody tr:nth-child(01) td:nth-child(05)'));
    this.tbleInvRWAColF = element(by.css('#investigator_tbl tbody tr:nth-child(01) td:nth-child(06)'));
    var tbleInvRWAColG = element(by.css('#investigator_tbl tbody tr:nth-child(01) td:nth-child(07) button'));
    this.tbleInvRWAColH = element(by.css('#investigator_tbl tbody tr:nth-child(01) td:nth-child(08) button'));

    this.tbleInvRWBColA = element(by.css('#investigator_tbl tbody tr:nth-child(02) td:nth-child(01)'));
    this.tbleInvRWBColB = element(by.css('#investigator_tbl tbody tr:nth-child(02) td:nth-child(02)'));
    var tbleInvRWBColC = element(by.css('#investigator_tbl tbody tr:nth-child(02) td:nth-child(03)'));
    this.tbleInvRWBColD = element(by.css('#investigator_tbl tbody tr:nth-child(02) td:nth-child(04)'));
    this.tbleInvRWBColE = element(by.css('#investigator_tbl tbody tr:nth-child(02) td:nth-child(05)'));
    this.tbleInvRWBColF = element(by.css('#investigator_tbl tbody tr:nth-child(02) td:nth-child(06)'));
    var tbleInvRWBColG = element(by.css('#investigator_tbl tbody tr:nth-child(02) td:nth-child(07) button'));
    this.tbleInvRWBColH = element(by.css('#investigator_tbl tbody tr:nth-child(02) td:nth-child(08) button'));

    //Investigator Edit
    this.editPOID = element(by.id('person_id'));
    this.editLastName = element(by.id('last_name'));
    this.editFirstName = element(by.id('first_name'));
    this.eidtRole = element(by.model('psView.current_investigator.investigator_type')); //(by.css('.table.table-striped.table-condensed tbody tr td:nth-child(4) #investigator_type_select'));
    this.editSetAsPrimaryContactCheck = element(by.css('.table.table-striped.table-condensed tbody tr td:nth-child(5) #set_contact')); //.table.table-striped.table-condensed tbody tr td:nth-child(5) input
    this.editInvestigatorCancel = element(by.css('.table.table-striped.table-condensed tbody tr td:nth-child(6) #edit_remove')); //.table.table-striped.table-condensed tbody tr td:nth-child(6) button:nth-child(1)
    this.editInvestigatorConfirm = element(by.css('.table.table-striped.table-condensed tbody tr td:nth-child(6) #edit_ok')); //.table.table-striped.table-condensed tbody tr td:nth-child(6) button:nth-child(2)

    //Contact Tab
    this.contactType = element(by.css('#contact_type_0'));
    this.contactPrimaryContact = element(by.css('#investigator'));
    this.contactEmailAddress = element(by.css('#email'));
    this.contactPhoneNumber = element(by.css('#phone'));
    this.contactPhoneNumberExtension = element(by.css('#phone_extension'));

    //Save and Reset
    this.saveParticipatingBtn = element(by.id('submit_pacticipating'));
    this.saveInvestigatorsBtn = element(by.id('submit_investigators'));
    this.saveContactBtn = element(by.id('submit_contact'));
    this.resetBtn = element(by.css('button[ng-disabled="psView.current_site_recruitment.edit"]'));

    //Back to Participating Site List
    this.backParticipatingSiteListParticipating = element(by.id('participating_back'));
    this.backParticipatingSiteListInvestigators = element(by.id('investigator_back'));
    this.backParticipatingSiteListContact = element(by.id('contact_back'));

    //Reset
    this.resetBtnParticipating = element(by.id('participating_reset'));
    this.resetBtnInvestigators = element(by.id('investigator_reset'));
    this.resetBtnContact = element(by.id('contact_reset'));

    //page Header
    this.trialDocHeader = element(by.css('h4.panel-title'));

    //Labels Text
    this.trialDocTitle = element(by.css('h4.ng-scope'));

    this.findPrsnFNameVerfEdtDel = function(exFName, what){
        this.poIDTblAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    fNm('1', exFName, what);
                } else if (i === 2){
                    console.log('i:['+i+']');
                    fNm('2', exFName, what);
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', exFName, what);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', exFName, what);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', exFName, what);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', exFName, what);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', exFName, what);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', exFName, what);
                }
            }
        });
        function fNm(iVal, expFName, whatToDo){
            var tableFName = element(by.css('#investigator_tbl tbody tr:nth-child('+iVal+') td:nth-child(3)'));
            getFName = tableFName.getText('value');
            getFName.then(function(Test1){
                console.log("First Name:["+Test1+"]");
                if(expFName === Test1){
                    if (whatToDo === 'verify'){
                        expect(expFName.toString()).to.eql(Test1.toString());
                    } else if(whatToDo === 'edit'){
                        var editDataRw = element(by.css('#investigator_tbl tbody tr:nth-child('+iVal+') td:nth-child(07) button'));
                        helper.clickButton(editDataRw, "Edit - Button");
                    } else if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('#investigator_tbl tbody tr:nth-child('+iVal+') td:nth-child(08) button'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    }
                }
            });
        }
    };

    this.editInvestigatorByFirstName = function(expFName){
        this.poIDTblAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    tbleInvRWAColC.isDisplayed().then(function (retA) {
                        if (retA) {
                            getFirstNameA = tbleInvRWAColC.getText('value');
                            getFirstNameA.then(function(Test1){
                                if(expFName === Test1){
                                    helper.clickButton(tbleInvRWAColG, "Edit - Button");
                                }
                            });
                        }
                    });
                } else if (i === 2){
                    console.log('i:['+i+']');
                    tbleInvRWBColC.isDisplayed().then(function (retB) {
                        if (retB) {
                            getFirstNameB = tbleInvRWBColC.getText('value');
                            getFirstNameB.then(function(Test2){
                                if(expFName === Test2){
                                    helper.clickButton(tbleInvRWBColG, "Edit - Button");
                                }
                            });
                        }
                    });
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', exFName, what);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', exFName, what);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', exFName, what);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', exFName, what);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', exFName, what);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', exFName, what);
                }
            }
        });
        function fNm(iVal, expFName, whatToDo){
            var tableFName = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(3)'));
            getFName = tableFName.getText('value');
            getFName.then(function(Test1){
                console.log("First Name:["+Test1+"]");
                if(expFName === Test1){
                    if (whatToDo === 'verify'){
                        expect(expFName.toString()).to.eql(Test1.toString());
                    } else if(whatToDo === 'edit'){
                        var editDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(07) button'));
                        helper.clickButton(editDataRw, "Edit - Button");
                    } else if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(08) button'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    }
                }
            });
        }
    };

    //Click Add Participating Site - Button
    this.clickAddParticipatingSite = function(){
        helper.clickButton(this.addParticipatingSiteBtn, "Add Participating Site - Button");
    };

    this.clickParticipatingSiteTab = function(){
        helper.clickButton(this.participatingSiteTab, "Participating Site - Tab");
    };

    this.clickInvestigatorsTab = function(){
        helper.clickButton(this.investigatorsTab, "Investigators - Tab");
    };

    this.clickContactTab = function(){
        helper.clickButton(this.contactTab, "Contact - Tab");
    };

    this.clickSearchOrganization = function(){
        helper.clickButton(this.searchOrgnaizationsBtn, "Search Organization - Button");
    };

    this.setProgramCode = function(getProgramCode){
        helper.setValue(this.programCodeTxt, getProgramCode, "Program Code - Text Field");
    };

    this.setIdentifier = function(getIdentifier){
        helper.setValue(this.identifierTxt, getIdentifier, "Identifier - Text Field");
    };

    this.clickStatusDate = function(){
        this.statusDateTxt.click();
        //helper.setReadOnlyFieldValue(this.statusDateTxt, getStatusDate, "Status Date - Date Text Field");
    };

    this.selectStatus = function(status)  {
        helper.selectValueFromList(this.statusList, status, "Status - List field");
    };

    this.setSiteRecruitmentComment = function(getComment){
        helper.setValue(this.commentTxt, getComment, "Comment - Text Field");
    };

    this.clickSiteRecruitmentAdd = function(){
        helper.clickButton(this.addBtn, "Add - Button");
    };

    this.clickSaveButtonParticipating = function () {
        helper.clickButton(this.saveParticipatingBtn, "Save - Button");
    };

    this.clickSaveButtonInvestigators = function () {
        helper.clickButton(this.saveInvestigatorsBtn, "Save - Button");
    };

    this.clickSaveButtonContact = function () {
        helper.clickButton(this.saveContactBtn, "Save - Button");
    };

    this.clickSaveButtonByIndex = function (getIndex) {
        helper.clickButtonByIndex(this.saveBtn, getIndex, "Save - Button");
    };

    this.clickResetButtonParticipating = function () {
        helper.clickButton(this.resetBtnParticipating, "Reset - Button");
    };

    this.clickResetButtonInvestigators = function () {
        helper.clickButton(this.resetBtnInvestigators, "Reset - Button");
    };

    this.clickResetButtonContact = function () {
        helper.clickButton(this.resetBtnContact, "Reset - Button");
    };

    this.clickBackToParticipatingSitesListPartcipating = function (){
        helper.clickButton(this.backParticipatingSiteListParticipating, "Back To Participating Sites List - Button");
    };

    this.clickBackToParticipatingSitesListInvestigators = function (){
        helper.clickButton(this.backParticipatingSiteListInvestigators, "Back To Participating Sites List - Button");
    };

    this.clickBackToParticipatingSitesListContact = function (){
        helper.clickButton(this.backParticipatingSiteListContact, "Back To Participating Sites List - Button");
    };

    this.clickSearchPersons = function(){
        helper.clickButton(this.searchPersonsBtn, "Search Persons - Button");
    };

    //Investigator Edit
    this.selectEditRole = function(eRole)  {
        var errorMessage = 'Role field';
        var fldName = this.eidtRole;
        fldName.element(by.cssContainingText('option', eRole)).click();
        console.log(errorMessage + ' ' + eRole + " Value selected");
        fldName.$('option:checked').getText().then(function (value){
            console.log('Value of item selected in list : ' + value.trim());
            //expect(value.trim()).to.equal(fieldValue);
        });
    };

    this.selectHelperEditRole = function(eRole)  {
        helper.selectValueFromList(this.eidtRole, eRole, "Select Role");
    };

    this.back_checkSetAsPrimaryContact = function (){
        var getObject = this.editSetAsPrimaryContactCheck;
        getObject.click();
        //this.checkCheckBox(this.editSetAsPrimaryContactCheck, true);
    };

    this.checkSetAsPrimaryContact = function(exactSearchTrueFalseValue){
        this.editSetAsPrimaryContactCheck.isSelected().then (function(value) {
            console.log('value of check box : ' + value);
            console.log('value of passed exact Search' + exactSearchTrueFalseValue);
            if (value === false && exactSearchTrueFalseValue === 'true') {
                console.log('value of check box1' + value);
                console.log('value of passed check box1' + exactSearchTrueFalseValue);
                helper.clickButton(self.editSetAsPrimaryContactCheck,"Set as Primary Contact");
            }
            else if (value  === true && exactSearchTrueFalseValue === 'false') {
                console.log('value of check box2' + value);
                console.log('value of passed check box2' + exactSearchTrueFalseValue);
                helper.clickButton(self.editSetAsPrimaryContactCheck,"Set as Primary Contact");
            }
        });
    };

    this.clickEditCancel = function(){
        helper.clickButton(this.editInvestigatorCancel, "Edit Cancel - Button");
    };

    this.clickEditConfirm = function(){
        helper.clickButton(this.editInvestigatorConfirm, "Edit Confirm - Button");
    };

    this.checkCheckBoxa = function(obj, booleanCondition) {
        var getObject = obj;
        if (getObject.isSelected() != booleanCondition && booleanCondition) {
            getObject.isSelected().then(function (selected) {
                if (selected) {
                    console.log('if true then check it');
                    getObject.click();
                }
            });
        } else {
            getObject.isSelected().then(function (selected) {
                if (!selected) {
                    console.log('if false then uncheck it');
                    getObject.click();
                }
            });
        }
    };

    this.checkCheckBox = function(obj, booleanCondition) {
        var getObject = obj;
        if (getObject.isSelected() != booleanCondition) {
            console.log('check box test');
            getObject.isSelected().then(function (selected) {
                console.log('selected 1: '+selected);
                if (!selected) {
                    console.log('if true then check it');
                    getObject.click();
                }
            });
        } else {
            getObject.isSelected().then(function (selected) {
                console.log('selected 2: '+selected);
                if (selected) {
                    console.log('if false then uncheck it');
                    getObject.click();
                }
            });
        }
    };

    this.verifyEditPOID = function (vPOID){
        helper.getVerifyValue(this.editPOID, vPOID, "Verifying POID - Field");
    };

    this.verifyEditLastName = function (vLastName){
        helper.getVerifyValue(this.editLastName, vLastName, "Verifying Last Name - Field");
    };

    this.verifyEditLastName = function (vFirstName){
        helper.getVerifyValue(this.editFirstName, vFirstName, "Verifying First Name - Field");
    };

    //Verifying Add Organization
    this.verifyOrg = function(orgNm){
        helper.getVerifyValue(this.orgnizationTxt, orgNm, "Verifying Organization - Field");
    };

    this.verifyCity = function(city){
        helper.getVerifyValue(this.cityTxt, city, "Verifying City - Field");
    };

    this.verifyState = function(state){
        helper.getVerifyValue(this.stateTxt, state, "Verifying State - Field");
    };

    this.verifyCountry = function(country){
        helper.getVerifyValue(this.cityTxt, country, "Verifying Country - Field");
    };

    this.verifyZip = function(zip){
        helper.getVerifyValue(this.zipPostalCodeTxt, zip, "Verifying Zip/Postal Code - Field");
    };

    //Verifying Program Code
    this.verifyProgramCode = function(prgmCode){
        helper.getVerifyValue(this.programCodeTxt, prgmCode, "Verifying Program Code - Field");
    };

    //Verifying Identifier
    this.verifyIdentifier = function(identifier){
        helper.getVerifyValue(this.identifierTxt, identifier, "Verifying Identifier - Field");
    };


    //Error
    this.verifyErrorMsg = function (expErrorMsg) {
        helper.getVerifyRequired(this.trialDocErrorMsg, expErrorMsg, "Error Message");
    };

    this.verifyRequiredErrorMsg = function (expReqErrorMsg) {
        helper.getVerifyRequired(this.trialDocRequiredErrorMsg, expReqErrorMsg, "Required Error Message");
    };

    this.verifyDocErrorMsg = function (expErrorMsg) {
        helper.getVerifyRequired(this.trailDocDupErrorMsg, expErrorMsg, "Document Exists Error Message");
    };

    this.verifyListOfParticipatingSitesTable = function (){
        helper.verifyTableRowText(this.poIdlistOfPartSteTblHeadInv, listOfPartSiteTableHdrs[0], "PO ID - Table Header");
        helper.verifyTableRowText(this.poNamelistOfPartSteTblHeadInv, listOfPartSiteTableHdrs[1], "PO Name - Table Header");
        helper.verifyTableRowText(this.investiglistOfPartSteTblHeadInv, listOfPartSiteTableHdrs[2], "Investigators - Table Header");
        helper.verifyTableRowText(this.siteRecSttslistOfPartSteTblHeadInv, listOfPartSiteTableHdrs[3], "Site Recruitment Status - Table Header");
        helper.verifyTableRowText(this.siteRecSttsDatelistOfPartSteTblHeadInv, listOfPartSiteTableHdrs[4], "Site Recruitment Status Date - Table Header");
        helper.verifyTableRowText(this.primaryContactlistOfPartSteTblHeadInv, listOfPartSiteTableHdrs[5], "Primary Contact - Table Header");
        helper.verifyTableRowText(this.editlistOfPartSteTblHeadInv, listOfPartSiteTableHdrs[6], "Edit - Table Header");
    };

    this.selectAllListOfParticipatingSitesTable = function () {
        helper.clickButton(this.selectlistOfPartSteTblHeadInv, "Select All - List of Participating Site");
    };

    this.clickDeleteSelected = function () {
        helper.clickButton(this.deleteSelectedBtn, "Delete Selected - Button");
    };

    this.clickDeleteSelectedOKButton = function () {
        helper.clickButton(this.deleteSelectedOKBtn, "Delete Selected - OK - Button");
        helper.wait_for(9000);
    };

    this.clickDeleteSelectedCancelButton = function () {
        helper.clickButtonNoHeader(this.deleteSelectedCancelBtn, "Delete Selected - Cancel - Button");
    };

    //Contact Tab - Action
    this.selectType = function (getType){
        helper.clickRadioButton(this.contactType, getType, "General Contact Type");
    };

    this.selectPrimaryContact = function (getContact){
        //helper.selectValueFromList(this.contactPrimaryContact, getContact, "Primary Contact");
        var fieldName = this.contactPrimaryContact;
        var errorMessage = "Primary Contact"
        //this.wait(fieldName, errorMessage);
        fieldName.element(by.cssContainingText('option', getContact)).click();
        console.log(errorMessage + ' ' + getContact + " Value selected");
    };

    this.setEmailAddress = function (getEmail){
        helper.setValue(this.contactEmailAddress, getEmail, "Email Address");
    };

    this.setPhoneNumber = function (getPhone){
        helper.setValue(this.contactPhoneNumber, getPhone, "Phone Number");
    };

    this.setPhoneNumberExt = function (getPhoneExt){
        helper.setValue(this.contactPhoneNumberExtension, getPhoneExt, "Phone Number Extension");
    };

    //Contact Tab - Verification
    this.verifyType = function (getTypeByIndx){
        helper.getVerifyRadioSelection(this.contactType, getTypeByIndx, "Verify General Contact Type");
    };

    this.verifyPrimaryContact = function (getContact){
        helper.getVerifyListValue(this.contactPrimaryContact, getContact, "Verify Primary Contact");
    };

    this.verifyEmailAddress = function (getEmail){
        helper.getVerifyValue(this.contactEmailAddress, getEmail, "Verify Email Address");
    };

    this.verifyPhoneNumber = function (getPhone){
        helper.getVerifyValue(this.contactPhoneNumber, getPhone, "Verify Phone Number");
    };

    this.verifyPhoneNumberExt = function (getPhoneExt){
        helper.getVerifyValue(this.contactPhoneNumberExtension, getPhoneExt, "Verify Phone Number Extension");
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

    this.errorHandaler = function (expVal, actVal){
        try {
            if (expVal === actVal) {
                //do nothing
            } else {
                throw new Error('Expected assertion: (' + expVal + ') has no match with Actual value: (' + actVal + ')');
            }
        } catch (err) {
            callback(err.message);
        }
    };


};

module.exports = abstractionParticipating;
