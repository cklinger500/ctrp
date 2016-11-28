/**
 * Author: Shamim Ahmed
 * Date: 02/08/2016
 * Page Object: Abstraction General Trial Details
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var helperFunctions = require('../support/helper');


var abstractionTrialDetails = function(){

    var helper = new helperFunctions();
    var self = this;

    /*************************************
     *  Admin Data
     *************************************/

    this.adminDataGeneralTrial = element(by.css('a[ui-sref="main.pa.trialOverview.generalTrialDetails"]'));
    this.adminDataRegulatoryInfoFDA = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryFda"]'));
    this.adminDataRegulatoryInfoHumanSfty = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInfoHumanSafety"]'));
    this.adminDataRegulatoryInfoIND = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInd"]'));
    this.adminDataTrialStatus = element(by.css('a[ui-sref="main.pa.trialOverview.paTrialStatus"]'));
    this.adminDataTrialFunding = element(by.css('a[ui-sref="main.pa.trialOverview.funding"]'));
    this.adminDataCollaborators = element(by.css('a[ui-sref="main.pa.trialOverview.collaborators"]'));
    this.adminDataNciSpecific = element(by.css('a[ui-sref="main.pa.trialOverview.nciInfo"]'));

    /*************************************
     * General Trial Details object(s)
     *************************************/
    //Title
    this.generalTrailAcronym = element(by.model('generalTrialDetailView.generalTrialDetailsObj.acronym'));
    this.generalTrailOfficialTitle = element(by.model('generalTrialDetailView.generalTrialDetailsObj.official_title'));
    this.generalTrailAcronymLbl = element(by.css('label[for="acronym"]'));
    this.generalTrailOfficialTitleLbl = element(by.css('label[for="official_title"]'));

    //Keywords
    this.generalTrailKeywords = element(by.model('generalTrialDetailView.generalTrialDetailsObj.keywords'));
    this.generalTrailKeywordsLbl = element(by.css('label[for="keywords"]'));

    //Trial Identifiers
    this.generalTrailIdentifier = element(by.model('generalTrialDetailView.otherIdentifier.protocol_id_origin_id'));
    this.generalTrailIdentifierTextBox = element(by.model('generalTrialDetailView.otherIdentifier.protocol_id'));
    this.generalTrailIdentifierAddButton = element(by.css('button[ng-click="generalTrialDetailView.addOtherIdentifier()"]'));
    this.generalTrailIdentifierTable = element();
    this.generalTrailIdentifierTableIdentifierType = element();
    this.generalTrailIdentifierTableValue = element();
    this.generalTrailIdentifierTableDeletion = element();

    this.cancelEditIdentifier = element(by.id('cancel_edit_btn'));
    this.confirmEditIdentifier = element(by.id('confirm_edit_btn'));

    this.generalTrailTable = element(by.css('.table.table-bordered.table-striped.table-hover'));
    this.generalTrailTableAll = element.all(by.css('.table.table-bordered.table-striped.table-hover tbody tr'));
    this.generalTrailTableTHead = element(by.css('.table.table-bordered.table-striped.table-hover thead'));
    this.generalTrailTableTHeadColA = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(01)'));
    this.generalTrailTableTHeadColB = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(02)'));
    this.generalTrailTableTHeadColC = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(03)'));
    this.generalTrailTableTHeadColD = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(04)'));

    this.generalTrailTableTBody = element(by.css('.table.table-bordered.table-striped.table-hover tbody'));
    this.generalTrailTableTBodyRowAColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(01)'));
    this.generalTrailTableTBodyRowAColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02) span span'));
    this.generalTrailTableTBodyRowAColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(03)'));

    //Lead Organization/Principal Investigator
    this.generalTrailLeadOrganization = element(by.model('generalTrialDetailView.leadOrg.name'));
    this.generalTrailPrincipalInvestigator = element(by.model('generalTrialDetailView.principalInvestigator.name'));
    this.generalTrailLeadOrganizationLbl = element(by.css('label[for="lead_org"]'));
    this.generalTrailPrincipalInvestigatorLbl = element(by.css('label[for="pi"]'));
    this.generalTrailSearchOrganization = element.all(by.id('org_search_modal'));
    this.generalTrailSearchPerson = element.all(by.id('person_search_modal'));

    //Sponsor
    this.generalTrailSponsor = element(by.model('generalTrialDetailView.sponsor.name'));
    this.generalTrailSponsorLbl = element(by.css('label[for="sponsor"]'));
    this.generalTrailSponsorSearchOrganization = element(by.id('org_search_modal'));

    //Central Contact
    this.generalTrailCentralContactRadio = element.all(by.model('generalTrialDetailView.centralContactType'));
    //*****PI*****
    this.generalTrailCentralContactName = element(by.model('generalTrialDetailView.generalTrialDetailsObj.central_contacts[0].fullname'));
    this.generalTrailCentralContactEmail = element(by.model('generalTrialDetailView.generalTrialDetailsObj.central_contacts[0].email'));
    this.generalTrailCentralContactPhone = element(by.model('generalTrialDetailView.generalTrialDetailsObj.central_contacts[0].phone'));
    this.generalTrailCentralContactPhoneExt = element(by.model('generalTrialDetailView.generalTrialDetailsObj.central_contacts[0].extension'));
    this.generalTrailCentralContactSearchPerson = element(by.id('person_search_modal'));
    this.generalTrailCentralContactRdoLbls = element.all(by.css('.radio-inline.control-label.ng-binding.ng-scope'));
    this.generalTrailCentralContactNameReq = element.all(by.css('.form-group.has-feedback.required.has-error .help-block'));
    this.redSignWarning = element.all(by.css('.form-control-feedback.glyphicon.glyphicon-exclamation-sign.glyphicon-red'));

    //Save and Reset
    this.generalTrailSave = element(by.id('save_btn'));
    this.generalTrailReset = element(by.id('cancel_btn'));

    //page Header
    this.generalTrailHeader = element(by.css('h4.panel-title'));

     //In Line Editing
    this.inLineEditingLink = element(by.css('span[ng-click="edit()"]'));
    this.inLineEditingTextBox = element(by.css('#other_id_edit')); //by.css('.form-control.input-sm')
    this.inLineEditingCancelButton = element(by.id('cancel_edit_btn'));
    this.inLineEditingSaveButton = element(by.buttonText('Save'));

    //Table In Line Save and Cancel
    this.generalTrailTableInLineInputB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) input'));

    var deleteA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(4) button'));
    var deleteB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(4) button'));
    var deleteC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(4) button'));
    var deleteD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(4) button'));
    var deleteE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(4) button'));
    var deleteF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(4) button'));
    var deleteG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(4) button'));
    var deleteH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(4) button'));

    var identifierTypRwA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(01)'));
    var identifierTypRwB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(01)'));
    var identifierTypRwC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(01)'));
    var identifierTypRwD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(01)'));
    var identifierTypRwE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(01)'));
    var identifierTypRwF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(01)'));
    var identifierTypRwG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(01)'));
    var identifierTypRwH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(01)'));

    var identifiersEditA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(03) button'));
    var identifiersEditB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(03) button'));
    var identifiersEditC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(03) button'));
    var identifiersEditD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(03) button'));
    var identifiersEditE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(03) button'));
    var identifiersEditF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(03) button'));
    var identifiersEditG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(03) button'));
    var identifiersEditH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(03) button'));

    var IdentifierValueA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02) input'));
    var IdentifierValueB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) input'));
    var IdentifierValueC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02) input'));
    var IdentifierValueD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02) input'));
    var IdentifierValueE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02) input'));
    var IdentifierValueF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02) input'));
    var IdentifierValueG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02) input'));
    var IdentifierValueH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02) input'));



    this.findIndentifierToVerifyEditDelete = function(exIdentiType, what, exValue){
        this.waitForTrailDetailsElement(this.generalTrailTableTBodyRowAColA, "Trail Identifiers Table");
        this.generalTrailTableAll.then(function(rows){
            console.log('Indetifier Type Total Row Count:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    fNm('1', exIdentiType, what, exValue);
                } else if (i === 2){
                    console.log('i:['+i+']');
                    fNm('2', exIdentiType, what, exValue);
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', exIdentiType, what, exValue);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', exIdentiType, what, exValue);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', exIdentiType, what, exValue);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', exIdentiType, what, exValue);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', exIdentiType, what, exValue);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', exIdentiType, what, exValue);
                }
            }
        });
        function fNm(iVal, expectedIdentiType, whatToDo, valueVf){
            var tableIdentifierType = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(01)'));
            getCurrentIdnetifierType = tableIdentifierType.getText('value');
            getCurrentIdnetifierType.then(function(typeVal){
                console.log("Identified Current Identifier Type:["+typeVal+"]");
                if(expectedIdentiType === typeVal){
                    if (whatToDo === 'verify'){
                        expect(expectedIdentiType.toString()).to.eql(typeVal.toString());
                        if (valueVf !== ''){
                            var valueVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(02)'));
                            valueValVf = valueVal.getText('value');
                            valueValVf.then(function(valueValCr){
                                expect(valueVf.toString()).to.eql(valueValCr.toString());
                            });
                        }
                    } else if(whatToDo === 'edit'){
                        var editDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(03) button'));
                        helper.clickButton(editDataRw, "Edit - Button");
                    } else if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(04) button'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    }
                }
                if (expectedIdentiType != typeVal && iVal === '8'){
                    if (whatToDo === 'verify'){
                        expect(expectedIdentiType.toString()).to.eql(typeVal.toString());
                    }
                }
            });
        }
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
    //General Trial page object(s)
    //***********************************

    //*****Title*****
    //Set Acronym : Title
    this.setAcronym = function(getAcronymVal){
        helper.setValue(this.generalTrailAcronym,getAcronymVal,"Acronym - Title - field");
    };

    //Set Official Title: Title
    this.setOfficialTitle = function(getOfficialTitleVal){
        helper.setValue(this.generalTrailOfficialTitle,getOfficialTitleVal,"Official Title - Title - field");
    };

    //*****Keywords*****
    this.setKeywords = function(getKeywordsVal){
        helper.setValue(this.generalTrailKeywords,getKeywordsVal,"Keywords - Title - field");
    };

    //******Trail Identifiers*******
    this.selectIdentifier = function(getIdentifierVal){
        helper.selectValueFromList(this.generalTrailIdentifier,getIdentifierVal,"Identifier - drop down field selected as:["+getIdentifierVal+"]");
    };

    this.setIdentifierTextBox = function(getIdentifierTextVal){
        helper.setValue(this.generalTrailIdentifierTextBox,getIdentifierTextVal,"Identifier - Text - field");
    };

    //Add : Button
    this.clickIdentifierAddButton = function(){
        helper.clickButton(this.generalTrailIdentifierAddButton,"Identifier Add - button");
    };

    //Edit Cancel : Button
    this.clickIdentifierCancelButton = function(){
        helper.clickButton(this.cancelEditIdentifier, "Identifier Cancel - button");
    };

    //Edit Confirm : Button
    this.clickIdentifierConfirmButton = function(){
        helper.clickButton(this.confirmEditIdentifier, "Identifier Confirm - button");
    };

    this.verifyTrialIdentifiersTableHeader = function(){

    };

    //**********Lead Organization/Sponsor*************
    this.clickSearchOrgButtonByIndex = function(index){
        helper.clickButtonNoHeaderIndex(this.generalTrailSearchOrganization,index, "Search Organization Lookup button by Index:["+index+"]");
    };

    this.clickSearchPersonsButton = function(){
        helper.clickButton(this.generalTrailSearchPerson,"Search Persons Lookup - button");
    };

    this.clickSearchPersonsButtonByIndex = function(index){
        helper.clickButtonNoHeaderIndex(this.generalTrailSearchPerson, index, "Search Persons Lookup - button by Index");
    };

    //**************Central Contact*****************
    this.selectCentralContactRdo = function(button, getRdoValue, errorMessage)  {
            if (getRdoValue === 'None') {
                button.get(0).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(0).isSelected()).to.eventually.equal(true);
            }else if (getRdoValue === 'PI') {
                button.get(1).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(1).isSelected()).to.eventually.equal(true);
            }else if (getRdoValue === 'Person') {
                button.get(2).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(2).isSelected()).to.eventually.equal(true);
            }else if (getRdoValue === 'General') {
                button.get(3).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(3).isSelected()).to.eventually.equal(true);
            }
    };

    //Set Central Contact Name: Text Box
    this.setCentralContactName = function(getCentralContactNm){
        helper.setValue(this.generalTrailCentralContactName,getCentralContactNm,"Central Contact Name - field");
    };

    //Set Central Contact Email: Text Box
    this.setCentralContactEmail = function(getCentralContactEmail){
        helper.setValue(this.generalTrailCentralContactEmail,getCentralContactEmail,"Central Contact Email - field");
    };

    //Set Central Contact Phone: Text Box
    this.setCentralContactPhone = function(getCentralContactPhone){
        helper.setValue(this.generalTrailCentralContactPhone,getCentralContactPhone,"Central Contact Phone - field");
    };

    //Set Central Contact Phone Extension: Text Box
    this.setCentralContactPhoneExtension = function(getCentralContactPhoneExtension){
        helper.setValue(this.generalTrailCentralContactPhoneExt,getCentralContactPhoneExtension,"Central Contact Phone Extension - field");
    };



    //*********Save and Reset*************
    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.generalTrailSave,"Save - button");
    };

    //Cancel : Button
    this.clickReset = function(){
        helper.clickButton(this.generalTrailReset,"Reset - button");
    };


    //***********************************
    //Verification
    //***********************************

    this.verifyTextFieldValue = function(getFieldName, getFieldValueToVerify, getFieldDesc){
        helper.getVerifyValue(getFieldName, getFieldValueToVerify, getFieldDesc);
    };


    //***********************************
    //In Line Editing
    //***********************************
    //In Editing : Link
    this.clickInLineEditingLink = function(){
        helper.clickButton(this.inLineEditingLink,"Inline Editing - Link");
    };

    //In Editing : Link
    this.clickInLineEditingTextBox = function(getObject){
        helper.clickButton(getObject,"Inline Editing - Text Box");
    };

    //In Line Editing Text : Text Box
    this.setInLineEditingText = function(getObject, getEditedValToBeSet)  {
        helper.setValue(getObject, getEditedValToBeSet,"In Line Editing - Text Box field value entered:["+getEditedValToBeSet+"]");
    };

    //In Line Editing Cancel : Button
    this.clickInLineEditingCancel = function(){
        helper.clickButton(this.inLineEditingCancelButton,"In Line Editing Cancel - button");
    };

    //In Line Editing Save : Button
    this.clickInLineEditingSave = function(){
        helper.clickButton(this.inLineEditingSaveButton,"In Line Editing Save - button");
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




    this.findTrailIdentifierAndClickTextBoxAndSave = function(getIdentifierName, getEditedValue, getSaveFalg){
        this.waitForTrailDetailsElement(this.generalTrailTableTBodyRowAColA, "Trail Identifiers Table");
        this.generalTrailTableAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=0; i<(rows.length); i++){
                //Row 1
                if (i === 0){
                    console.log('Test 1');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test1){
                        if (Test1 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 1');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(100);
                            };
                        };
                    });
                };
                //Row 2
                if (i === 1){
                    console.log('Test 2');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test2){
                        if (Test2 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 2');
                                var IdentifierValue = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) input'));
                                helper.clickButton(IdentifierValue,"Inline Editing - Text Box");
                                helper.setValue(IdentifierValue, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(100);
                            };
                        };
                    });
                };
                //Row 3
                if (i === 2){
                    console.log('Test 3');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test3){
                        if (Test3 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 3');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 4
                if (i === 3){
                    console.log('Test 4');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test4){
                        if (Test4 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 4');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 5
                if (i === 4){
                    console.log('Test 5');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test5){
                        if (Test5 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 5');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 6
                if (i === 5){
                    console.log('Test 6');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test6){
                        if (Test6 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 6');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 7
                if (i === 6){
                    console.log('Test 7');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test7){
                        if (Test7 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 7');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 8
                if (i === 7){
                    console.log('Test 8');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test8){
                        if (Test8 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 8');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //
            };
        });
    };


};

module.exports = abstractionTrialDetails;
