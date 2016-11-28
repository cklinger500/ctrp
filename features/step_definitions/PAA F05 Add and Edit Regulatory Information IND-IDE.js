/**
 * Author: Shamim Ahmed
 * Date: 01/08/2016
 * Feature: PAA F05 Add and Edit Regulatory Information IND-IDE
 *
 * Note: In the PAA search screen it has dependency on the seed data
 */

//Common dependencies
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

//Required dependencies
//Login dependencies
var loginPage = require('../support/LoginPage');
//helper methods
var helperMethods = require('../support/helper');
//Project Related methods dependencies
var projectFunctionMethods= require('../support/projectMethods');
//Menu bar dependencies
var abstractionPageMenu = require('../support/abstractionCommonBar');
//Abstraction search page dependencies
var abstractionTrialSearchPage = require('../support/abstractionSearchTrialPage');
//Abstraction common dependencies
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
//Abstraction NCI Specific Information
var abstractionNCISpecific = require('../support/abstractionNCISpecificInfo');
//List of Organization
var OrgPage = require('../support/ListOfOrganizationsPage');
//Organization Search
var orgSearch = require('../support/abstractionOrganizationSearch');
//Regulatory Information - IND/IDE
var abstractionRegulatoryINDIDE = require('../support/abstractionRegulatoryIND');
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function() {

    var login = new loginPage();
    var helper = new helperMethods();
    var projectFunctions = new projectFunctionMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var nciSpecific = new abstractionNCISpecific();
    var indIDE = new abstractionRegulatoryINDIDE();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    //var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchTableHeader = '';
    var nciID = 'NCI-2014-00894';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1776';
    var leadProtocolIDA = 'CTRP_01_1777';
    var leadProtocolIDB = 'CTRP_01_1778';
    var leadProtocolIDC = 'CTRP_01_17'+randNmbr;
    var leadProtocolIDD = 'CTRP_01_1781';
    var searchResultCountText = 'Trial Search Results';
    var indIDEAssociatedQueVal = '';
    var indTypVal = 'IND';
    var ideTypVal = 'IDE';
    var indIDENumberRnd = Math.floor(Math.random()*(99999999-77777777+1)+77777777);
    var indIDENmbrA = 'BBIND13794';
    var indIDENmbrB = 'IND108498';
    var indIDENmbrC = '102902';
    var indIDEGrntrCDER = 'CDER';
    var indIDEGrntrCBER = 'CBER';
    var indIDEHldTypNCI = 'NCI';
    var indIDEHldTypNIH = 'NIH';
    var indIDEHldTypIndustry = 'Industry';
    var indIDEHldTypOrganization = 'Organization';
    var indIDEHldTypInvestigator = 'Investigator';
    var indIDEDivProgCdeCCR = 'CCR';
    var indIDEDivProgCdeCIP = 'CIP';
    var indIDEDivProgCdeCDP = 'CDP';
    var indIDEDivProgCdeCTEP = 'CTEP';
    var indIDEDivProgCdeDCB = 'DCB';
    var indIDEDivProgCdeDCCPS = 'DCCPS';
    var indIDEDivProgCdeNLM = 'NLM-National Library of Medicine';
    var indIDEInfoTbleColeA = 'IND/IDE Types';
    var indIDEInfoTbleColeB = 'IND/IDE Number';
    var indIDEInfoTbleColeC = 'IND/IDE Grantor';
    var indIDEInfoTbleColeD = 'IND/IDE Holder Type';
    var indIDEInfoTbleColeE = 'NIH Institution, NCI Division/Program Code (if applicable)';
    var argVerification = '';
    var counttim = '';
    var counttims5 = '';
    var argVerifications5 = '';
    var verifTbleHdrs5 = '';
    var verifTbleRowAs5 = '';
    var verifTbleRowBs5 = '';
    var argVerification6 = '';
    var verifTbleHdrs6 = '';
    var verifTbleRowAs6 = '';
    var verifTbleRowBs6 = '';
    var optionA = '';
    var optionB = '';
    var optionC = '';
    var indGrantorOptionA = '';
    var indGrantorOptionB = '';
    var indGrantorOptionC = '';
    var indIDEAssociatedQueVals7 = '';
    var globalYesNoFlag = '';
    var glovalNullVal = 'null';
    var glovalSelectVal = '-Select-';
    var commonErrorMsg = 'Please select an IND/IDE Type, enter an IND/IDE Number, select an IND/IDE Grantor and IND/IDE Holder Type';
    var warnTheNIHIns = 'Warning - The NIH Institution/NCI Division/Program Code is Required';
    var warnNIHReq = 'Warning - The NIH  is Required';
    var warnINDHoldrTypReq = 'Warning - The IND/IDE Holder Type is Required';
    var warnINDNmbrReq = 'Warning - IND/IDE number is Required';
    var warnINDTypeReq = 'Warning - IND/IDE Type is Required';


    /*
     Scenario: #1 I can indicate that the trial does not have an associated IND or IDE
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information (IND/IDE) screen
     When I have selected "No" where the question "Does this trial have an associated IND/IDE?"
     Then the IND/IDE Information section will allow the entry of an IND/IDE for this trial
     */

    this.Given(/^I am on the Trial Regulatory Information \(IND\/IDE\) screen$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDD);
            commonFunctions.adminCheckOut();
            indIDE.clickAdminDataRegulatoryInfoIND();
        });
    });

    this.When(/^I have selected "([^"]*)" where the question "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
            var getAssINDIDEQue = arg2;
            console.log('FDA IND/IDE: ' + getAssINDIDEQue);
            var getYesNoFlag = arg1;
            console.log('Condition: ' + getYesNoFlag);
            indIDE.indIDEAssociatedQuelbl.getText().then(function (value) {
                var pasIindIDEQue = '' + value + '';

                function retindIDEQueVal() {
                    return pasIindIDEQue;
                }

                indIDEAssociatedQueVal = retindIDEQueVal();
                console.log('System Identified [' + indIDEAssociatedQueVal + '] as the current FDA IND/IDE value');
            })
            if (arg2 === indIDEAssociatedQueVal) {
                indIDE.verifyFdaIndIdelblValue(getAssINDIDEQue);
            }
            if (arg1 === 'No') {
                indIDE.selectAssociatedINDIDERdo('1');
            } else if (arg1 === 'Yes') {
                indIDE.selectAssociatedINDIDERdo('0');
            }
        });
    });

    this.Then(/^the IND\/IDE Information section will allow the entry of an IND\/IDE for this trial$/, function () {
        return browser.sleep(25).then(function() {
            indIDE.verifyFdaIndIdeYesOrNoOption('1', true);
            helper.verifyElementDisplayed(indIDE.indIDEType, false);
            helper.verifyElementDisplayed(indIDE.indIDENumber, false);
            helper.verifyElementDisplayed(indIDE.indIDEGrantor, false);
            helper.verifyElementDisplayed(indIDE.indIDEHolderType, false);
            helper.verifyElementDisplayed(indIDE.indIDEDisvisionProgramCode, false);
            helper.verifyElementDisplayed(indIDE.indIDEAddButton, false);
        });
    });

    /*
     Scenario: #2 I can add and edit Regulatory IND or IDE Information for a Trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information (IND/IDE) screen
     And I have selected "Yes" where the question "Does this trial have an associated IND/IDE?"
     When I have selected the IND/IDE Type from a list
     |IND|
     |IDE|
     And I have entered the IND/IDE number
     And I have selected the IND/IDE Grantor from a list based on IND or IDE selected
     |IND: CDER, CBER|
     |IDE: CDRH, CBER|
     And I have selected the IND/IDE Holder Type from a list
     |Investigator|
     |Organization|
     |Industry|
     |NIH|
     |NCI|
     And I have selected the NIH Institution or NCI Division/Program Code from a list
     |NIH Values Below:|
     |NEI-National Eye Institute|
     |NHLBI-National Heart, Lung, and Blood Institute|
     Then the IND/IDE Information for the trial will be associated with the trial
     */

    this.When(/^selected the IND\/IDE Type from a list$/, function (table) {
        return browser.sleep(25).then(function() {
            indIDE.indIDEInfoTable.all(by.css('tr')).isDisplayed().then(function (result) {
                if (result === true) {
                    indIDE.indIDEInfoTable.all(by.css('tr')).count().then(function (rowCount) {
                        counttim = rowCount;
                        console.log(counttim);
                    });
                    for (var i = 1; i < counttim; i++) {
                        console.log('Current Row' + i);
                        indIDE.clickRowDelete(i);
                    }
                }
            });
            var strVal = '';
            indIDETypeOptions = table.raw();
            strVal = indIDETypeOptions.toString().replace(/,/g, "\n", -1);
            console.log('IND/IDE Type defined value(s) in the data table:[' + strVal + ']');

            indIDE.indIDETypeAll.getText().then(function (items) {
                console.log('IND/IDE Type Actual value(s) in the list object:[' + items + ']');
                expect(items.toString().split("\n")).to.eql(strVal.toString().split("\n"));
            });
            var tableDataSplt = strVal.toString().split("\n");
            optionA = tableDataSplt[0];
            optionB = tableDataSplt[1];
            optionC = tableDataSplt[2];
            indIDE.selectINDIDETypes(optionB);
        });
    });

    this.When(/^entered the IND\/IDE number$/, function () {
        return browser.sleep(25).then(function() {
            indIDE.setINDIDENumbr(indIDENmbrC);
        });
    });

    this.When(/^selected the IND\/IDE Grantor from a list based on IND or IDE selected$/, function (table) {
        return browser.sleep(25).then(function() {
            //|IND:-Select-,CDER,CBER,IDE:-Select-,CDRH,CBER|
            var strValGrantor = '';
            indIDEGrantorOptions = table.raw();
            strValGrantor = indIDEGrantorOptions.toString().replace(/,/g, "\n", -1);
            console.log('IND/IDE Grantor defined value(s) in the data table:[' + strValGrantor + ']');
            var tableDataPreSplt = strValGrantor.toString().split("IND:");
            var tableDataGrantorSplt = tableDataPreSplt.toString().split("IDE:");
            var indGrantorSpltpre = tableDataGrantorSplt[0].toString().replace(/\r?\n?[^\r\n]*$/, "");
            var indGrantorlstComma = indGrantorSpltpre.toString().replace(/,/g, "", -1);
            var ideGrantorSpltpre = tableDataGrantorSplt[1].toString().replace(/,/g, "", -1);
            var indGrantorSplt = indGrantorlstComma.toString().replace(/,/g, "\n", -1);
            var ideGrantorSplt = ideGrantorSpltpre.toString().replace(/,/g, "\n", -1);
            console.log('IND Grantor defined value(s) in the data table:[' + indGrantorSplt + ']');
            console.log('IDE Grantor defined value(s) in the data table:[' + ideGrantorSplt + ']');
            indIDE.selectINDIDETypes(optionC);
            helper.wait_for(100);
            indIDE.indIDEGrantorAll.getText().then(function (itemsGrntr) {
                console.log('IDE Type Actual value(s) in the list obejct:[' + ideGrantorSplt + ']');
                expect(itemsGrntr.toString().split("\n")).to.eql(ideGrantorSplt.toString().split("\n"));
            });

            indIDE.selectINDIDETypes(optionB);
            helper.wait_for(100);
            indIDE.indIDEGrantorAll.getText().then(function (itemsGrntr) {
                console.log('IND Type Actual value(s) in the list object:[' + indGrantorSplt + ']');
                expect(itemsGrntr.toString().split("\n")).to.eql(indGrantorSplt.toString().split("\n"));
            });
            helper.wait_for(100);
            indIDE.setINDIDENumbr(indIDENmbrC);
            indIDE.selectINDIDEGrantor(indIDEGrntrCDER);
            //var selectIndGrantor = indGrantorSplt.toString().split("\n");
            //indGrantorOptionA = selectIndGrantor[0];
            //indGrantorOptionB = selectIndGrantor[1];
            //indGrantorOptionC = selectIndGrantor[2];
            //indIDE.selectINDIDETypes(indGrantorOptionB);
        });
    });

    this.When(/^selected the IND\/IDE Holder Type from a list$/, function (table) {
        return browser.sleep(25).then(function() {
            var strValHoldrTyp = '';
            indIDEHolderTypeOptions = table.raw();
            strValHoldrTyp = indIDEHolderTypeOptions.toString().replace(/,/g, "\n", -1);
            console.log('IND/IDE Holder Type defined value(s) in the data table:[' + strValHoldrTyp + ']');

            indIDE.indIDEHolderTypeAll.getText().then(function (itemsHldrTyp) {
                console.log('IND/IDE Holder Type Actual value(s) in the list object:[' + itemsHldrTyp + ']');
                expect(itemsHldrTyp.toString().split("\n")).to.eql(strValHoldrTyp.toString().split("\n"));
            });
            var tableDataSpltHldTyp = strValHoldrTyp.toString().split("\n");
            var selectIndIDEHldrTypNIH = tableDataSpltHldTyp[4];
            indIDE.selectINDIDEHolderType(selectIndIDEHldrTypNIH);
        });
    });

    this.When(/^selected the NIH Institution or NCI Division\/Program Code from a list$/, function (table) {
        return browser.sleep(25).then(function() {
            var verifTbleHdrs2 = '' + indIDEInfoTbleColeA + ' ' + indIDEInfoTbleColeB + ' ' + indIDEInfoTbleColeC + ' ' + indIDEInfoTbleColeD + ' ' + indIDEInfoTbleColeE + '';
            var verifTbleRowAs2 = '' + indTypVal + ' ' + indIDENmbrC + ' ' + indIDEGrntrCDER + ' ' + indIDEHldTypNIH + ' ' + indIDEDivProgCdeNLM + '';
            var strValNIHNCIPrgoCode = '';
            indIDEHolderTypeOptions = table.raw();
            strValNIHNCIPrgoCode = indIDEHolderTypeOptions.toString().replace(/,/g, "\n", -1);
            console.log('NIH Institution, NCI Division/Program Code (if applicable) defined value(s) in the data table:[' + strValNIHNCIPrgoCode + ']');
            indIDE.selectINDIDEDivisionProgramCode(indIDEDivProgCdeNLM);
            indIDE.clickAdd();
            indIDE.clickSave();
            helper.wait_for(3000);
            indIDE.clickAdminDataGeneralTrial();
            indIDE.clickAdminDataRegulatoryInfoIND();
            helper.wait_for(3000);
            helper.verifyTableRowText(indIDE.indIDETblHdr, verifTbleHdrs2, "IND/IDE Table Header(s)");
            helper.verifyTableRowText(indIDE.indIDETblRowA, verifTbleRowAs2, "IND/IDE Table Row A");
            indIDE.indIDEInfoTable.all(by.css('tr')).count().then(function (rowCount) {
                counttim = rowCount;
                console.log(counttim);
            });
        });
    });

    this.Then(/^the IND\/IDE Information for the trial will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            for (var i = 1; i < counttim; i++) {
                console.log('Current Row' + i);
                indIDE.clickRowDelete(i);
            }
            indIDE.clickSave();
            helper.wait_for(3000);
            indIDE.clickAdminDataGeneralTrial();
            indIDE.clickAdminDataRegulatoryInfoIND();
            helper.wait_for(3000);
            helper.verifyElementDisplayed(indIDE.indIDEInfoTable, false);
        });
    });

    /*
     Scenario: #3 I can add and edit Regulatory IND and IDE information for multiple IND or IDE registrations for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information (IND/IDE) screen
     And I have selected "Yes" for the IND/IDE question "Does this trial have an associated IND/IDE?"
     When I have entered the information for an IND or IDE
     Then I will be able to select "Add IND/IDE" and enter the information for multiple IND/IDEs
     */

    this.Given(/^I have selected "([^"]*)" for the IND\/IDE question "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
            var getAssINDIDEQue = arg2;
            console.log('FDA IND/IDE: ' + getAssINDIDEQue);
            var getYesNoFlag = arg1;
            console.log('Condition: ' + getYesNoFlag);
            indIDE.indIDEAssociatedQuelbl.getText().then(function (value) {
                var pasIindIDEQue = '' + value + '';

                function retindIDEQueVal() {
                    return pasIindIDEQue;
                }

                indIDEAssociatedQueVal = retindIDEQueVal();
                console.log('System Identified [' + indIDEAssociatedQueVal + '] as the current FDA IND/IDE value');
            });
            if (arg2 === indIDEAssociatedQueVal) {
                indIDE.verifyFdaIndIdelblValue(getAssINDIDEQue);
            }
            if (arg1 === 'No') {
                indIDE.selectAssociatedINDIDERdo('1');
            } else if (arg1 === 'Yes') {
                indIDE.selectAssociatedINDIDERdo('0');
            }
        });
    });

    this.When(/^I entered the information for an IND or IDE$/, function () {
        return browser.sleep(25).then(function() {
            indIDE.verifyFdaIndIdeYesOrNoOption('0', true);
            helper.verifyElementDisplayed(indIDE.indIDEType, true);
            helper.verifyElementDisplayed(indIDE.indIDENumber, true);
            helper.verifyElementDisplayed(indIDE.indIDEGrantor, true);
            helper.verifyElementDisplayed(indIDE.indIDEHolderType, true);
            helper.verifyElementDisplayed(indIDE.indIDEDisvisionProgramCode, true);
            helper.verifyElementDisplayed(indIDE.indIDEAddButton, true);
            helper.verifyElementDisplayed(indIDE.indIDEAddButton, true);
        });
    });

    this.Then(/^I am able to select "([^"]*)" and enter the information for multiple IND\/IDEs$/, function (arg1) {
        return browser.sleep(25).then(function() {
            var getArgValToSplit = arg1.split(' ');
            var splitdArgVal = getArgValToSplit[1];
            var getArgVal = splitdArgVal.split('/');
            var getArgValA = getArgVal[0];
            var getArgValB = getArgVal[1];
            var verifTbleHdr = '' + indIDEInfoTbleColeA + ' ' + indIDEInfoTbleColeB + ' ' + indIDEInfoTbleColeC + ' ' + indIDEInfoTbleColeD + ' ' + indIDEInfoTbleColeE + '';
            var verifTbleRowA = '' + indTypVal + ' ' + indIDENmbrA + ' ' + indIDEGrntrCDER + ' ' + indIDEHldTypNCI + ' ' + indIDEDivProgCdeDCCPS + '';
            var verifTbleRowB = '' + ideTypVal + ' ' + indIDENmbrC + ' ' + indIDEGrntrCBER + ' ' + indIDEHldTypNIH + ' ' + indIDEDivProgCdeNLM + '';
            var argBuildValA = '';
            var argBuildValB = '';
            console.log(getArgValA + ' and ' + getArgValB);
            if (getArgValA === indTypVal) {
                console.log('Entering IND/IDE information for: [' + indTypVal + ']');
                indIDE.selectINDIDETypes(indTypVal);
                indIDE.setINDIDENumbr(indIDENmbrA);
                indIDE.selectINDIDEGrantor(indIDEGrntrCDER);
                indIDE.selectINDIDEHolderType(indIDEHldTypNCI);
                indIDE.selectINDIDEDivisionProgramCode(indIDEDivProgCdeDCCPS);
                indIDE.clickAdd();
            }
            if (getArgValB === ideTypVal) {
                console.log('Entering IND/IDE information for: [' + ideTypVal + ']');
                indIDE.selectINDIDETypes(ideTypVal);
                indIDE.setINDIDENumbr(indIDENmbrC);
                indIDE.selectINDIDEGrantor(indIDEGrntrCBER);
                indIDE.selectINDIDEHolderType(indIDEHldTypNIH);
                indIDE.selectINDIDEDivisionProgramCode(indIDEDivProgCdeNLM);
                indIDE.clickAdd();
            }
            indIDE.indIDEInfoTable.all(by.css('tr')).count().then(function (rowCount) {
                counttim = rowCount;
                console.log(counttim);
            });
            indIDE.indIDETblHdr.getText().then(function (Htext) {
                HeadrCheck = Htext;
                console.log('Header(s):[' + HeadrCheck + ']', counttim);
            });
            indIDE.indIDETblRowA.getText().then(function (rwAText) {
                timeTocheckRowA = rwAText;
                console.log('Row A Values:' + timeTocheckRowA, counttim);
                if (timeTocheckRowA === verifTbleRowA) {
                    argBuildValA = 'IND';
                    console.log('Verification A Values:' + argBuildValA, counttim);
                }
            });
            indIDE.indIDETblRowB.getText().then(function (rwBText) {
                timeTocheckRowB = rwBText;
                console.log('Row B Values:' + timeTocheckRowB, counttim);
                if (timeTocheckRowB === verifTbleRowB) {
                    argBuildValB = 'IDE';
                    console.log('Verification B Values:' + argBuildValB, counttim);
                    argVerification = 'Add ' + argBuildValA + '/' + argBuildValB + ''; //Add IND/IDE
                    console.log('Argument verification Values:' + argVerification);
                }
            });
            indIDE.clickSave();
            helper.wait_for(2500);
            //indIDE.clickAdminDataGeneralTrial();
            //indIDE.clickAdminDataRegulatoryInfoIND();
            if (arg1 === argVerification) {
                helper.verifyTableRowText(indIDE.indIDETblHdr, verifTbleHdr, "IND/IDE Table Header(s)");
                helper.verifyTableRowText(indIDE.indIDETblRowA, verifTbleRowA, "IND/IDE Table Row A");
                helper.verifyTableRowText(indIDE.indIDETblRowB, verifTbleRowA, "IND/IDE Table Row B");
            }
        });
    });

    /*
     Scenario: #4 I can remove Regulatory IND and IDE information for one or more IND or IDE registrations for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information (IND/IDE) screen
     And I have selected "Yes" for the IND/IDE question "Does this trial have an associated IND/IDE?"
     When I have selected the IND or IDE
     Then I will be able to remove the IND or IDE information for one or more INDs or IDEs
     */

    this.When(/^I have selected the IND or IDE$/, function () {
        return browser.sleep(25).then(function() {
            var arg1 = 'Add IND/IDE'
            var getArgValToSplit = arg1.split(' ');
            var splitdArgVal = getArgValToSplit[1];
            var getArgVal = splitdArgVal.split('/');
            var getArgValA = getArgVal[0];
            var getArgValB = getArgVal[1];
            var verifTbleHdr = '' + indIDEInfoTbleColeA + ' ' + indIDEInfoTbleColeB + ' ' + indIDEInfoTbleColeC + ' ' + indIDEInfoTbleColeD + ' ' + indIDEInfoTbleColeE + '';
            var verifTbleRowA = '' + indTypVal + ' ' + indIDENmbrA + ' ' + indIDEGrntrCDER + ' ' + indIDEHldTypNCI + ' ' + indIDEDivProgCdeDCCPS + '';
            var verifTbleRowB = '' + ideTypVal + ' ' + indIDENmbrC + ' ' + indIDEGrntrCBER + ' ' + indIDEHldTypNIH + ' ' + indIDEDivProgCdeNLM + '';
            var argBuildValA = '';
            var argBuildValB = '';
            console.log(getArgValA + ' and ' + getArgValB);
            if (getArgValA === indTypVal) {
                console.log('Entering IND/IDE information for: [' + indTypVal + ']');
                indIDE.selectINDIDETypes(indTypVal);
                indIDE.setINDIDENumbr(indIDENmbrA);
                indIDE.selectINDIDEGrantor(indIDEGrntrCDER);
                indIDE.selectINDIDEHolderType(indIDEHldTypNCI);
                indIDE.selectINDIDEDivisionProgramCode(indIDEDivProgCdeDCCPS);
                indIDE.clickAdd();
            }
            if (getArgValB === ideTypVal) {
                console.log('Entering IND/IDE information for: [' + ideTypVal + ']');
                indIDE.selectINDIDETypes(ideTypVal);
                indIDE.setINDIDENumbr(indIDENmbrC);
                indIDE.selectINDIDEGrantor(indIDEGrntrCBER);
                indIDE.selectINDIDEHolderType(indIDEHldTypNIH);
                indIDE.selectINDIDEDivisionProgramCode(indIDEDivProgCdeNLM);
                indIDE.clickAdd();
            }
            indIDE.indIDEInfoTable.all(by.css('tr')).count().then(function (rowCount) {
                counttim = rowCount;
                console.log(counttim);
            });
            indIDE.indIDETblHdr.getText().then(function (Htext) {
                HeadrCheck = Htext;
                console.log('Header(s):[' + HeadrCheck + ']', counttim);
            });
            indIDE.indIDETblRowA.getText().then(function (rwAText) {
                timeTocheckRowA = rwAText;
                console.log('Row A Values:' + timeTocheckRowA, counttim);
                if (timeTocheckRowA === verifTbleRowA) {
                    argBuildValA = 'IND';
                    console.log('Verification A Values:' + argBuildValA, counttim);
                }
            });
            indIDE.indIDETblRowB.getText().then(function (rwBText) {
                timeTocheckRowB = rwBText;
                console.log('Row B Values:' + timeTocheckRowB, counttim);
                if (timeTocheckRowB === verifTbleRowB) {
                    argBuildValB = 'IDE';
                    console.log('Verification B Values:' + argBuildValB, counttim);
                    argVerification = 'Add ' + argBuildValA + '/' + argBuildValB + ''; //Add IND/IDE
                    console.log('Argument verification Values:' + argVerification);
                }
            });
            indIDE.clickSave();
            helper.wait_for(2500);

            if (arg1 === argVerification) {
                helper.verifyTableRowText(indIDE.indIDETblHdr, verifTbleHdr, "IND/IDE Table Header(s)");
                helper.verifyTableRowText(indIDE.indIDETblRowA, verifTbleRowA, "IND/IDE Table Row A");
                helper.verifyTableRowText(indIDE.indIDETblRowB, verifTbleRowB, "IND/IDE Table Row B");
            }
            indIDE.clickAdminDataGeneralTrial();
            indIDE.clickAdminDataRegulatoryInfoIND();
        });
    });

    this.Then(/^I am able to remove the IND or IDE information for one or more INDs or IDEs$/, function () {
        return browser.sleep(25).then(function() {
            indIDE.indIDEInfoTable.all(by.css('tr')).count().then(function (rowCount) {
                counttim = rowCount;
                console.log(counttim);
            });
            for (var i = 1; i < counttim; i++) {
                console.log('Current Row' + i);
                indIDE.clickRowDelete(i);
            }
            indIDE.clickSave();
            helper.wait_for(2500);
            indIDE.clickAdminDataGeneralTrial();
            indIDE.clickAdminDataRegulatoryInfoIND();
            helper.wait_for(2500);
            helper.verifyElementDisplayed(indIDE.indIDEInfoTable, false);
        });
    });

    /*
     Scenario: #5 Save Regulatory Information
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Register Trial Regulatory Information (IND/IDE) screen
     When select save to save (IND/IDE) screen
     Then the information entered or edited on the Regulatory Information (IND/IDE) screen will be saved to the trial record
     */

    this.Given(/^I am on the Register Trial Regulatory Information \(IND\/IDE\) screen$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDD);
            commonFunctions.adminCheckOut();
            indIDE.clickAdminDataRegulatoryInfoIND();
            var arg1s5 = 'Add IND/IDE'
            var getArgValToSplits5 = arg1s5.split(' ');
            var splitdArgVals5 = getArgValToSplits5[1];
            var getArgVals5 = splitdArgVals5.split('/');
            var getArgValAs5 = getArgVals5[0];
            var getArgValBs5 = getArgVals5[1];
            verifTbleHdrs5 = '' + indIDEInfoTbleColeA + ' ' + indIDEInfoTbleColeB + ' ' + indIDEInfoTbleColeC + ' ' + indIDEInfoTbleColeD + ' ' + indIDEInfoTbleColeE + '';
            verifTbleRowAs5 = '' + indTypVal + ' ' + indIDENmbrA + ' ' + indIDEGrntrCDER + ' ' + indIDEHldTypNCI + ' ' + indIDEDivProgCdeDCCPS + '';
            verifTbleRowBs5 = '' + ideTypVal + ' ' + indIDENmbrC + ' ' + indIDEGrntrCBER + ' ' + indIDEHldTypNIH + ' ' + indIDEDivProgCdeNLM + '';
            var argBuildValAs5 = '';
            var argBuildValBs5 = '';
            console.log(getArgValAs5 + ' and ' + getArgValBs5);
            if (getArgValAs5 === indTypVal) {
                console.log('Entering IND/IDE information for: [' + indTypVal + ']');
                indIDE.selectINDIDETypes(indTypVal);
                indIDE.setINDIDENumbr(indIDENmbrA);
                indIDE.selectINDIDEGrantor(indIDEGrntrCDER);
                indIDE.selectINDIDEHolderType(indIDEHldTypNCI);
                indIDE.selectINDIDEDivisionProgramCode(indIDEDivProgCdeDCCPS);
                indIDE.clickAdd();
            }
            if (getArgValBs5 === ideTypVal) {
                console.log('Entering IND/IDE information for: [' + ideTypVal + ']');
                indIDE.selectINDIDETypes(ideTypVal);
                indIDE.setINDIDENumbr(indIDENmbrC);
                indIDE.selectINDIDEGrantor(indIDEGrntrCBER);
                indIDE.selectINDIDEHolderType(indIDEHldTypNIH);
                indIDE.selectINDIDEDivisionProgramCode(indIDEDivProgCdeNLM);
                indIDE.clickAdd();
            }
            indIDE.indIDEInfoTable.all(by.css('tr')).count().then(function (rowCount) {
                counttims5 = rowCount;
                console.log(counttims5);
            });
            indIDE.indIDETblHdr.getText().then(function (Htext) {
                HeadrChecks5 = Htext;
                console.log('Header(s):[' + HeadrChecks5 + ']', counttims5);
            });
            indIDE.indIDETblRowA.getText().then(function (rwAText) {
                timeTocheckRowAs5 = rwAText;
                console.log('Row A Values:' + timeTocheckRowAs5, counttims5);
                if (timeTocheckRowAs5 === verifTbleRowAs5) {
                    argBuildValAs5 = 'IND';
                    console.log('Verification A Values:' + argBuildValAs5, counttims5);
                }
            });
            indIDE.indIDETblRowB.getText().then(function (rwBText) {
                timeTocheckRowBs5 = rwBText;
                console.log('Row B Values:' + timeTocheckRowBs5, counttims5);
                if (timeTocheckRowBs5 === verifTbleRowBs5) {
                    argBuildValBs5 = 'IDE';
                    console.log('Verification B Values:' + argBuildValBs5, counttims5);
                    argVerifications5 = 'Add ' + argBuildValAs5 + '/' + argBuildValBs5 + ''; //Add IND/IDE
                    console.log('Argument verification Values:' + argVerifications5);
                }
            });
            indIDE.clickSave();
            helper.wait_for(2500);
            indIDE.clickAdminDataGeneralTrial();
            indIDE.clickAdminDataRegulatoryInfoIND();
            if (arg1s5 === argVerifications5) {
                helper.verifyTableRowText(indIDE.indIDETblHdr, verifTbleHdrs5, "IND/IDE Table Header(s)");
                helper.verifyTableRowText(indIDE.indIDETblRowA, verifTbleRowAs5, "IND/IDE Table Row A");
                helper.verifyTableRowText(indIDE.indIDETblRowB, verifTbleRowBs5, "IND/IDE Table Row B");
            }
        });
    });

    this.When(/^select save to save \(IND\/IDE\) screen$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    this.Then(/^the information entered or edited on the Regulatory Information \(IND\/IDE\) screen will be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            for (var i = 1; i < counttims5; i++) {
                console.log('Current Row' + i);
                indIDE.clickRowDelete(i);
            }
            indIDE.clickSave();
            helper.wait_for(3000);
            indIDE.clickAdminDataGeneralTrial();
            indIDE.clickAdminDataRegulatoryInfoIND();
            helper.wait_for(2500);
            helper.verifyElementDisplayed(indIDE.indIDEInfoTable, false);
        });
    });

    /*
     Scenario: #6 Cancel Regulatory Information
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Register Trial Regulatory Information (IND/IDE) screen
     When I select Reset to not save (IND/IDE) screen
     Then the information entered or edited on the Regulatory Information (IND/IDE) screen will not be saved to the trial record
     And the screen will be refreshed with the existing data
     */

    this.When(/^I select Reset to not save \(IND\/IDE\) screen$/, function () {
        return browser.sleep(25).then(function() {
            indIDE.clickAdminDataGeneralTrial();
            indIDE.clickAdminDataRegulatoryInfoIND();
            for (var i = 1; i < counttims5; i++) {
                console.log('Current Row' + i);
                indIDE.clickRowDelete(i);
            }
            indIDE.clickSave();
            indIDE.clickAdminDataGeneralTrial();
            indIDE.clickAdminDataRegulatoryInfoIND();
            helper.wait_for(2500);
            helper.verifyElementDisplayed(indIDE.indIDEInfoTable, false);
            var arg1s6 = 'Add IND/IDE'
            var getArgValToSplits6 = arg1s6.split(' ');
            var splitdArgVals6 = getArgValToSplits6[1];
            var getArgVals6 = splitdArgVals6.split('/');
            var getArgValAs6 = getArgVals6[0];
            var getArgValBs6 = getArgVals6[1];
            verifTbleHdrs6 = '' + indIDEInfoTbleColeA + ' ' + indIDEInfoTbleColeB + ' ' + indIDEInfoTbleColeC + ' ' + indIDEInfoTbleColeD + ' ' + indIDEInfoTbleColeE + '';
            verifTbleRowAs6 = '' + indTypVal + ' ' + indIDENmbrA + ' ' + indIDEGrntrCDER + ' ' + indIDEHldTypNCI + ' ' + indIDEDivProgCdeDCCPS + '';
            verifTbleRowBs6 = '' + ideTypVal + ' ' + indIDENmbrC + ' ' + indIDEGrntrCBER + ' ' + indIDEHldTypNIH + ' ' + indIDEDivProgCdeNLM + '';
            var argBuildValAs6 = '';
            var argBuildValBs6 = '';
            console.log(getArgValAs6 + ' and ' + getArgValBs6);
            if (getArgValAs6 === indTypVal) {
                console.log('Entering IND/IDE information for: [' + indTypVal + ']');
                indIDE.selectINDIDETypes(indTypVal);
                indIDE.setINDIDENumbr(indIDENmbrA);
                indIDE.selectINDIDEGrantor(indIDEGrntrCDER);
                indIDE.selectINDIDEHolderType(indIDEHldTypNCI);
                indIDE.selectINDIDEDivisionProgramCode(indIDEDivProgCdeDCCPS);
                indIDE.clickAdd();
            }
            if (getArgValBs6 === ideTypVal) {
                console.log('Entering IND/IDE information for: [' + ideTypVal + ']');
                indIDE.selectINDIDETypes(ideTypVal);
                indIDE.setINDIDENumbr(indIDENmbrC);
                indIDE.selectINDIDEGrantor(indIDEGrntrCBER);
                indIDE.selectINDIDEHolderType(indIDEHldTypNIH);
                indIDE.selectINDIDEDivisionProgramCode(indIDEDivProgCdeNLM);
                indIDE.clickAdd();
            }
            indIDE.indIDEInfoTable.all(by.css('tr')).count().then(function (rowCount) {
                counttims6 = rowCount;
                console.log(counttims6);
            });
            indIDE.indIDETblHdr.getText().then(function (Htext) {
                HeadrChecks6 = Htext;
                console.log('Header(s):[' + HeadrChecks5 + ']', counttims5);
            });
            indIDE.indIDETblRowA.getText().then(function (rwAText) {
                timeTocheckRowAs6 = rwAText;
                console.log('Row A Values:' + timeTocheckRowAs6, counttims6);
                if (timeTocheckRowAs6 === verifTbleRowAs6) {
                    argBuildValAs6 = 'IND';
                    console.log('Verification A Values:' + argBuildValAs6, counttims6);
                }
            });
            indIDE.indIDETblRowB.getText().then(function (rwBText) {
                timeTocheckRowBs6 = rwBText;
                console.log('Row B Values:' + timeTocheckRowBs6, counttims6);
                if (timeTocheckRowBs6 === verifTbleRowBs6) {
                    argBuildValBs6 = 'IDE';
                    console.log('Verification B Values:' + argBuildValBs6, counttims6);
                    argVerifications6 = 'Add ' + argBuildValAs6 + '/' + argBuildValBs6 + ''; //Add IND/IDE
                    console.log('Argument verification Values:' + argVerifications6);
                }
            });
        });
    });

    this.Then(/^the information entered or edited on the Regulatory Information \(IND\/IDE\) screen will not be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            indIDE.clickReset();
            indIDE.clickAdminDataGeneralTrial();
            indIDE.clickAdminDataRegulatoryInfoIND();
            helper.wait_for(2500);
            helper.verifyElementDisplayed(indIDE.indIDEInfoTable, false);
        });
    });

    /*
     Scenario Outline: #7 Regulatory IND or IDE Information must be complete
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information (IND/IDE) screen
     And I have selected conditions for the question <Does this trial have an associated IND or IDE?>
     When I have not selected values the <IND/IDE Type>
     And I have not entered the <IND/IDE number>
     And I have not selected the <IND/IDE Grantor>
     And I have not selected the <IND/IDE Holder Type>
     And I have not selected the <NIH Institution or NCI Division or Program>
     And selected Save
     Then the system will display a warning <Message> that each of values that were not entered must be entered in order to associate the IND/IDE Information for the trial

     Examples:
     |Does this trial have an associated IND or IDE?|IND/IDE Type |IND/IDE number|IND/IDE Grantor|IND/IDE Holder Type |NIH Institution or NCI Division or Program|Message|
     |No|null|null|null|null|null|null|
     |Yes|IND|77782|CDER|Investigator|null|null|
     */

    this.Given(/^I have selected conditions for the question (.*)$/, function (DoesThisTrialHaveAnAssociatedINDOrIDE) {
        return browser.sleep(25).then(function() {
            //commonFunctions.waitForElement(indIDE.indIDEAssociatedRdo, "IND IDE Yes or No Radio Button");
            globalYesNoFlag = DoesThisTrialHaveAnAssociatedINDOrIDE;
            console.log('Condition: ' + globalYesNoFlag);
            if (DoesThisTrialHaveAnAssociatedINDOrIDE === 'No') {
                indIDE.selectAssociatedINDIDERdo('1');
            } else if (DoesThisTrialHaveAnAssociatedINDOrIDE === 'Yes') {
                indIDE.selectAssociatedINDIDERdo('0');
            }
        });
    });

    this.When(/^selected values the (.*)$/, function (INDIDEType) {
        return browser.sleep(25).then(function() {
            if (globalYesNoFlag === 'No') {
                if (INDIDEType === 'null') {
                    indIDE.verifyFdaIndIdeYesOrNoOption('1', true);
                    helper.verifyElementDisplayed(indIDE.indIDEType, false);
                    INDIDEType = glovalNullVal;
                }
            } else if (globalYesNoFlag === 'Yes') {
                //helper.waitForElement(indIDE.indIDEType, "Wait for the IND IDE Types");
                if (INDIDEType === 'IND') {
                    helper.verifyElementDisplayed(indIDE.indIDEType, true);
                    indIDE.selectINDIDETypes(indTypVal);
                    INDIDEType = indTypVal;
                }
                if (INDIDEType === 'null') {
                    helper.verifyElementDisplayed(indIDE.indIDEType, true);
                    indIDE.selectINDIDETypes(glovalSelectVal);
                    INDIDEType = glovalNullVal;
                }
            }
        });
    });

    this.Given(/^entered the (.*)$/, function (INDIDENumber) {
        return browser.sleep(25).then(function() {
            if (globalYesNoFlag === 'No') {
                if (INDIDENumber === 'null') {
                    helper.verifyElementDisplayed(indIDE.indIDENumber, false);
                    INDIDENumber = glovalNullVal;
                }
            } else if (globalYesNoFlag === 'Yes') {
                //helper.waitForElement(indIDE.indIDEType, "Wait for the IND IDE Types");
                if (INDIDENumber === '77782') {
                    helper.verifyElementDisplayed(indIDE.indIDENumber, true);
                    indIDE.setINDIDENumbr(INDIDENumber);
                }
                if (INDIDENumber === 'null') {
                    indIDE.setINDIDENumbr('');
                    helper.verifyElementDisplayed(indIDE.indIDENumber, true);
                    indIDE.setINDIDENumbr('');
                }
            }
        });
    });

    this.Given(/^I am able to select Grantor as (.*)$/, function (INDIDEGrantor) {
        return browser.sleep(25).then(function() {
            if (globalYesNoFlag === 'No') {
                if (INDIDEGrantor === 'null') {
                    helper.verifyElementDisplayed(indIDE.indIDEGrantor, false);
                    //INDIDEGrantor = glovalNullVal;
                }
            } else if (globalYesNoFlag === 'Yes') {
                //helper.waitForElement(indIDE.indIDEType, "Wait for the IND IDE Types");
                if (INDIDEGrantor === 'CDER') {
                    console.log('Grantor selection');
                    //helper.verifyElementDisplayed(indIDE.indIDEGrantor, true);
                    indIDE.selectINDIDEGrantor(INDIDEGrantor);
                    //INDIDEGrantor = indIDEGrntrCDER;
                }
                if (INDIDEGrantor === 'null') {
                    //helper.verifyElementDisplayed(indIDE.indIDEGrantor, true);
                    indIDE.selectINDIDEGrantor(glovalSelectVal);
                    //INDIDEGrantor = indIDEGrntrCDER;
                }
            }
        });
    });

    this.Given(/^I am able to select Holder Type as (.*)$/, function (INDIDEHolderType) {
        return browser.sleep(25).then(function() {
            if (globalYesNoFlag === 'No') {
                if (INDIDEHolderType === 'null') {
                    helper.verifyElementDisplayed(indIDE.indIDEHolderType, false);
                    //INDIDEHolderType = glovalNullVal;
                }
            } else if (globalYesNoFlag === 'Yes') {
                //helper.waitForElement(indIDE.indIDEType, "Wait for the IND IDE Types");
                if (INDIDEHolderType === 'Investigator') {
                    //helper.verifyElementDisplayed(indIDE.indIDEHolderType, true);
                    indIDE.selectINDIDEHolderType(INDIDEHolderType);
                }
                if (INDIDEHolderType === 'NCI') {
                    //helper.verifyElementDisplayed(indIDE.indIDEHolderType, true);
                    indIDE.selectINDIDEHolderType(INDIDEHolderType);
                }
                if (INDIDEHolderType === 'NIH') {
                    //helper.verifyElementDisplayed(indIDE.indIDEHolderType, true);
                    indIDE.selectINDIDEHolderType(INDIDEHolderType);
                }
                if (INDIDEHolderType === 'null') {
                    indIDE.selectINDIDEHolderType(glovalSelectVal);
                    //helper.verifyElementDisplayed(indIDE.indIDEHolderType, true);
                }
            }
            //indIDE.indIDEDisvisionProgramCode.click();
        });
    });

    this.Given(/^I am able to select NIH Institution or NCI Division or Program as (.*)$/, function (NIHInstitutionOrNCIDivisionOrProgram) {
        return browser.sleep(25).then(function() {
            if (globalYesNoFlag === 'No') {
                if (NIHInstitutionOrNCIDivisionOrProgram === 'null') {
                    helper.verifyElementDisplayed(indIDE.indIDEDisvisionProgramCode, false);
                    helper.verifyElementDisplayed(indIDE.indIDEAddButton, false);
                    NIHInstitutionOrNCIDivisionOrProgram = glovalNullVal;
                }
            } else if (globalYesNoFlag === 'Yes') {
                //helper.waitForElement(indIDE.indIDEType, "Wait for the IND IDE Types");
                if (NIHInstitutionOrNCIDivisionOrProgram === 'CTEP') {
                    //helper.verifyElementDisplayed(indIDE.indIDEDisvisionProgramCode, true);
                    //helper.verifyElementDisplayed(indIDE.indIDEAddButton, true);
                    indIDE.selectINDIDEDivisionProgramCode(NIHInstitutionOrNCIDivisionOrProgram);
                }
                if (NIHInstitutionOrNCIDivisionOrProgram === 'NLM-National Library of Medicine') {
                    //helper.verifyElementDisplayed(indIDE.indIDEDisvisionProgramCode, true);
                    //helper.verifyElementDisplayed(indIDE.indIDEAddButton, true);
                    indIDE.selectINDIDEDivisionProgramCode(NIHInstitutionOrNCIDivisionOrProgram);
                }
                if (NIHInstitutionOrNCIDivisionOrProgram === 'null') {
                    indIDE.selectINDIDEDivisionProgramCode(glovalSelectVal);
                    //helper.verifyElementDisplayed(indIDE.indIDEDisvisionProgramCode, true);
                    //helper.verifyElementDisplayed(indIDE.indIDEAddButton, true);
                    //Select Nothing
                }
            }
        });
    });

    this.Given(/^selected Save$/, function () {
        return browser.sleep(25).then(function() {
            if (globalYesNoFlag === 'No') {
                helper.verifyElementDisplayed(indIDE.indIDEAddButton, false);
            } else if (globalYesNoFlag === 'Yes') {
                helper.verifyElementDisplayed(indIDE.indIDEAddButton, true);
                indIDE.clickAdd();
            }
        });
    });

    this.Then(/^the system will display a warning (.*) that each of values that were not entered must be entered in order to associate the IND\/IDE Information for the trial$/, function (Message) {
        return browser.sleep(25).then(function() {
            if (globalYesNoFlag === 'No') {
                if (Message === 'null') {
                    //helper.getVerifyRequired(indIDE.indIDEErrMsg, commonErrorMsg, "Error Message Verification");
                    console.log('Current Warning Message:[' + Message + ']');
                }
            } else if (globalYesNoFlag === 'Yes') {
                if (Message === 'null') {
                    console.log('Current Warning Message:[' + Message + ']');
                }
                if (Message === warnTheNIHIns) {
                    helper.getVerifyRequired(indIDE.indIDEErrMsg, commonErrorMsg, "Error Message Verification");
                    console.log('Current Warning Message:[' + Message + ']');
                }
                if (Message === warnNIHReq) {
                    helper.getVerifyRequired(indIDE.indIDEErrMsg, commonErrorMsg, "Error Message Verification");
                    console.log('Current Warning Message:[' + Message + ']');
                }
                if (Message === warnINDHoldrTypReq) {
                    helper.getVerifyRequired(indIDE.indIDEErrMsg, commonErrorMsg, "Error Message Verification");
                    console.log('Current Warning Message:[' + Message + ']');
                }
                if (Message === warnINDNmbrReq) {
                    helper.getVerifyRequired(indIDE.indIDEErrMsg, commonErrorMsg, "Error Message Verification");
                    console.log('Current Warning Message:[' + Message + ']');
                }
                if (Message === warnINDTypeReq) {
                    helper.getVerifyRequired(indIDE.indIDEErrMsg, commonErrorMsg, "Error Message Verification");
                    console.log('Current Warning Message:[' + Message + ']');
                }
            }
            ;
            //login.logout();
        });
    });




};