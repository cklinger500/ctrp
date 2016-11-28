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


var abstractionTrialCollaborators = function(){

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
     * Trial Collaborators object(s)
     */

    this.trailCollaboratorsHeader = element(by.css('h4.panel-title'));


    this.collaboratorsAddButton = element(by.css('button[ng-click="trialDetailView.setAddMode()"]'));
    this.collaboratorsDeleteButton = element(by.id('delete')); //by.buttonText('Delete Collaborators')
    this.collaboratorsSearchOrgButton = element(by.css('#org_search_modal'));

    /*
     * List of Collaborators Table object(s)
     */

    this.collaboratorsTableList = element(by.css('.table.table-bordered.table-striped.table-hover'));
    this.collaboratorsTableListAll = element.all(by.css('.table.table-bordered.table-striped.table-hover tbody tr'));
    this.collaboratorsTableListTHead = element(by.css('.table.table-bordered.table-striped.table-hover thead'));
    this.collaboratorsTableTHeadColA = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(01)'));
    this.collaboratorsTableTHeadColB = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(02)'));
    this.collaboratorsTableTHeadColC = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(03)'));

    this.collaboratorsTableTBody = element(by.css('.table.table-bordered.table-striped.table-hover tbody'));
    this.collaboratorsTableTBodyRowAColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(01)'));
    this.collaboratorsTableTBodyRowAColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02)'));
    this.collaboratorsTableTBodyRowAColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(03)'));

    this.collaboratorsTableTBodyRowBColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(01)'));
    this.collaboratorsTableTBodyRowBColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02)'));
    this.collaboratorsTableTBodyRowBColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(03)'));

    this.collaboratorsTableTBodyRowCColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(01)'));
    this.collaboratorsTableTBodyRowCColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02)'));
    this.collaboratorsTableTBodyRowCColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(03)'));

    this.collaboratorsTableTBodyRowDColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(01)'));
    this.collaboratorsTableTBodyRowDColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02)'));
    this.collaboratorsTableTBodyRowDColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(03)'));

    this.collaboratorsTableTBodyRowEColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(01)'));
    this.collaboratorsTableTBodyRowEColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02)'));
    this.collaboratorsTableTBodyRowEColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(03)'));

    this.collaboratorsTableTBodyRowFColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(01)'));
    this.collaboratorsTableTBodyRowFColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02)'));
    this.collaboratorsTableTBodyRowFColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(03)'));

    this.collaboratorsTableTBodyRowGColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(01)'));
    this.collaboratorsTableTBodyRowGColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02)'));
    this.collaboratorsTableTBodyRowGColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(03)'));

    this.collaboratorsTableTBodyRowHColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(01)'));
    this.collaboratorsTableTBodyRowHColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02)'));
    this.collaboratorsTableTBodyRowHColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(03)'));

    this.collaboratorsTableTBodyRowAColCSelect = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(03) input'));
    this.collaboratorsTableTBodyRowBColCSelect = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(03) input'));
    this.collaboratorsTableTBodyRowCColCSelect = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(03) input'));
    this.collaboratorsTableTBodyRowDColCSelect = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(03) input'));
    this.collaboratorsTableTBodyRowEColCSelect = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(03) input'));
    this.collaboratorsTableTBodyRowFColCSelect = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(03) input'));
    this.collaboratorsTableTBodyRowGColCSelect = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(03) input'));
    this.collaboratorsTableTBodyRowHColCSelect = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(03) input'));

    /*
     * In Line Editing
     */
    this.inLineEditingLink = element(by.css('span[ng-click="edit()"]'));
    this.inLineEditingTextBox = element(by.css('input.form-control.input-sm')); //by.css('.form-control.input-sm')
    this.inLineEditingCancelButton = element(by.id('cancel_edit_btn'));
    this.inLineEditingSaveButton = element(by.buttonText('Save'));


    /*
     * Add Collaborators object(s)
     */

    this.collaboratorsConfirmSelectedOrg = element(by.css('.form-control.input-sm.animated-item'));
    this.collaboratorsSave = element(by.buttonText('Save'));
    this.collaboratorsCancelButton = element(by.css('button[ng-click="trialDetailView.reload()"]'));

    //this.requiredMessageAddCollaborators = element(by.css('div[ng-show="regInfoSafetyView.approvalNumRequired"] .help-block.ng-scope'));
    //this.collaboratorsReset = element(by.css('button[ng-click="regInfoSafetyView.resetHumanSafetyInfo()"]'));

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
    //Trial Collaborators page object(s)
    //***********************************

    //Add Collaborator : Button
    this.clickAddCollaboratorButton = function(){
        helper.clickButton(this.collaboratorsAddButton, "Add Collaborator Button");
    };

    //Delete Collaborator : Button
    this.clickDeleteCollaborator = function(){
        helper.clickButton(this.collaboratorsDeleteButton, "Add Collaborator Button");
    };

    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.collaboratorsSave,"Save - button");
    };

    //Cancel : Button
    this.clickCancel = function(){
        helper.clickButton(this.collaboratorsCancelButton,"Cancel - button");
    };

    //***********************************
    //In Line Editing
    //***********************************
    //In Editing : Link
    this.clickInLineEditingLink = function(){
        helper.clickButton(this.inLineEditingLink,"Inline Editing - Link");
    };

    //In Editing : Link
    this.clickInLineEditingTextBox = function(){
        helper.clickButton(this.inLineEditingTextBox,"Inline Editing - Text Box");
    };

    //In Line Editing Text : Text Box
    this.setInLineEditingText = function(getEditedValToBeSet)  {
        helper.setValue(this.inLineEditingTextBox,getEditedValToBeSet,"In Line Editing - Text Box field value entered:["+getEditedValToBeSet+"]");
    };

    //In Line Editing Cancel : Button
    this.clickInLineEditingCancel = function(){
        helper.clickButton(this.inLineEditingCancelButton,"In Line Editing Cancel - button");
    };

    //In Line Editing Save : Button
    this.clickInLineEditingSave = function(){
        helper.clickButton(this.inLineEditingSaveButton,"In Line Editing Save - button");
    };


    //***********************************
    //Verify Trial Collaborators
    //***********************************


    //***********************************
    //Screen Methods - Trial Collaborators
    //***********************************

    //Select all the org from list of org except <getUnselectedOrgName>
    this.selectAllListOfOrgExcept = function(getUnselectedOrgName){
        var runTimeVal = '';
        var runTimeFlagTorF = '';
        var runTimeFlagCondition = 'false';
        this.waitForElement(this.collaboratorsTableTBodyRowAColA, "List of Collaborators Table");
        this.collaboratorsTableListAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=0; i<(rows.length); i++){
                if (i === 0){
                    console.log('Test 1');
                    listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02)')).getText('value');
                    listCollbrtrNm.then(function(Test1){
                        if (Test1 !== getUnselectedOrgName){
                            element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(03) input')).click();
                        };
                    });
                }
                if (i === 1){
                    console.log('Test 2');
                    listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02)')).getText('value');
                    listCollbrtrNm.then(function(Test2){
                        if (Test2 !== getUnselectedOrgName){
                            element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(03) input')).click();
                        };
                    });
                }
                if (i === 2){
                    console.log('Test 3');
                    listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02)')).getText('value');
                    listCollbrtrNm.then(function(Test3){
                        if (Test3 !== getUnselectedOrgName){
                            element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(03) input')).click();
                        };
                    });
                }
                if (i === 3){
                    console.log('Test 4');
                    listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02)')).getText('value');
                    listCollbrtrNm.then(function(Test4){
                        if (Test4 !== getUnselectedOrgName){
                            element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(03) input')).click();
                        };
                    });
                }
                if (i === 4){
                    console.log('Test 5');
                    listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02)')).getText('value');
                    listCollbrtrNm.then(function(Test5){
                        if (Test5 !== getUnselectedOrgName){
                            element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(03) input')).click();
                        };
                    });
                }
                if (i === 5){
                    console.log('Test 6');
                    listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02)')).getText('value');
                    listCollbrtrNm.then(function(Test6){
                        if (Test6 !== getUnselectedOrgName){
                            element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(03) input')).click();
                        };
                    });
                }
                if (i === 6){
                    console.log('Test 7');
                    listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02)')).getText('value');
                    listCollbrtrNm.then(function(Test7){
                        if (Test7 !== getUnselectedOrgName){
                            element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(03) input')).click();
                        };
                    });
                }
                if (i === 7){
                    console.log('Test 8');
                    listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02)')).getText('value');
                    listCollbrtrNm.then(function(Test8){
                        if (Test8 !== getUnselectedOrgName){
                            element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(03) input')).click();
                        };
                    });
                }
            };
        });
    };

    //Find Added Orginization Name on the List of Collaborators Name column
    this.findOrgOnTheTableList = function(getExpectedValue){
        var runTimeVal = '';
        var runTimeFlagTorF = '';
        var runTimeFlagCondition = 'false';
        this.waitForElement(this.collaboratorsTableTBodyRowAColA, "List of Collaborators Table");
        this.collaboratorsTableListAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                console.log('i:['+i+']');
                listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+i+') td:nth-child(02)')).getText('value');
                listCollbrtrNm.then(function(value){
                    console.log('Expected Name:['+getExpectedValue+']');
                    console.log('Actual Name:['+value+']');
                    if (value === getExpectedValue){
                        console.log('Curent Row:['+i+'] and Name:['+value+']');
                        expect(value.toString()).to.eql(getExpectedValue.toString());
                        runTimeVal = ''+value+'';
                        runTimeFlagTorF = 'true'
                    } else if(i === rows.length && !value === getExpectedValue){
                        runTimeFlagTorF = 'false'
                    }
                    if (runTimeFlagCondition === runTimeFlagTorF){
                        console.log('Condition')
                        expect(runTimeVal.toString()).to.eql(getExpectedValue.toString());
                    }
                });
            };
        });
    };

    //Select Any Name from the the list of collaborators table
    this.selectAllOrg = function(){
        this.waitForElement(this.collaboratorsTableTBodyRowAColA, "List of Collaborators Table");
        this.collaboratorsTableListAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                console.log('i:['+i+']');
                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+i+') td:nth-child(03) input')).click();
            };
        });
    };

    //Select Org
    this.selectOrg = function(getIVal){
                console.log('i:['+getIVal+']');
                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+getIVal+') td:nth-child(03) input')).click();
    };

    //Select Any Name from the the list of collaborators table
    this.selectAllOrgExcept = function(getExceptOrgNm){
        this.waitForElement(this.collaboratorsTableTBodyRowAColA, "List of Collaborators Table");
        this.collaboratorsTableListAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var e=1; e<(rows.length+1); e++){
                console.log('e:['+e+']');
                if (e===(rows.length+1)){
                    e = (rows.length);
                }
                listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+e+') td:nth-child(02)')).getText('value');
                listCollbrtrNm.then(function(value){
                    if (value === getExceptOrgNm){
                        console.log('Unselected Identified Org:['+getExceptOrgNm+']');
                    } else if (value === !getExceptOrgNm){
                        this.selectOrg(e);
                    }
                    console.log('Expected Name(selectAllOrgExcept):['+getExceptOrgNm+']');
                    console.log('Actual Name(selectAllOrgExcept):['+value+']');
                });
            };
        });
    };

    //Verify the list of collaborators table row's has been deleted
    this.verifyListOfCollboratorsNameExists = function(expectedOrgNmbr){
        this.waitForElement(this.collaboratorsTableList, "List of Collaborators Table");
        this.collaboratorsTableListAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            expect((rows.length).toString()).to.eql(expectedOrgNmbr.toString());
        });
    };

    //Edit Collaborators Name
    this.findOrgOnTheTableAndEdit = function(getExpectedValue){
        var runTimeVal = '';
        var runTimeFlagTorF = '';
        var runTimeFlagCondition = 'false';
        this.waitForElement(this.collaboratorsTableTBodyRowAColA, "List of Collaborators Table");
        this.collaboratorsTableListAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                console.log('i:['+i+']');
                listCollbrtrNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+i+') td:nth-child(02)')).getText('value');
                listCollbrtrNm.then(function(value){
                    console.log('Expected Name:['+getExpectedValue+']');
                    console.log('Actual Name:['+value+']');
                    if (value === getExpectedValue){
                        console.log('Curent Row:['+i+'] and Name:['+value+']');
                        expect(value.toString()).to.eql(getExpectedValue.toString());
                        runTimeVal = ''+value+'';
                        runTimeFlagTorF = 'true'
                    } else if(i === rows.length && !value === getExpectedValue){
                        runTimeFlagTorF = 'false'
                    }
                    if (runTimeFlagCondition === runTimeFlagTorF){
                        console.log('Condition')
                        expect(runTimeVal.toString()).to.eql(getExpectedValue.toString());
                    }
                });
            };
        });
    };

    //Wait For Element : Wait
    this.waitForElement = function (element, label) {
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

module.exports = abstractionTrialCollaborators;
