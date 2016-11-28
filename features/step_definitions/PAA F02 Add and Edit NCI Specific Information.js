/**
 * Author: Shamim Ahmed
 * Date: 01/08/2015
 * Feature: PAA F02 Add and Edit NCI Specific Information
 *
 * Note: In the PA search screen it has dependency on the seed data
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
//Regulatory Information - IND/IDE
var abstractionRegulatoryINDIDE = require('../support/abstractionRegulatoryIND');
//Regulatory Information - Human Subject Safety
var abstractionRegulatoryHuman = require('../support/abstractionRegulatoryHuman');
//Collaborators
var abstractionCollaborators = require('../support/abstractionTrialCollaborators');
//General Trial Details
var abstractionTrialDetails = require('../support/abstractionTrialDetails');
//Regulatory Information - FDAAA
var abstractionRegulatoryInfoFDAA = require('../support/abstractionRegulatoryInfo');
//List of Organization
var OrgPage = require('../support/ListOfOrganizationsPage');
//Organization Search
var orgSearch = require('../support/abstractionOrganizationSearch');


module.exports = function() {
    var login = new loginPage();
    var helper = new helperMethods();
    var projectFunctions = new projectFunctionMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var nciSpecific = new abstractionNCISpecific();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var indIDE = new abstractionRegulatoryINDIDE();
    var humanSafety = new abstractionRegulatoryHuman();
    var trialCollaborators = new abstractionCollaborators();
    var trialDetails = new abstractionTrialDetails();
    var fdaaa = new abstractionRegulatoryInfoFDAA();
    var searchTableHeader = '';
    var nciID = 'NCI-2014-00894';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1776';
    var leadProtocolIDA = 'CTRP_01_1777';
    var leadProtocolIDB = 'CTRP_01_1778';
    var leadProtocolIDC = 'CTRP_01_17'+randNmbr;
    var leadProtocolIDD = 'CTRP_01_1781';
    var leadProtocolIDE = 'CTRP_01_1787';
    var leadProtocolIDF = 'CTRP_01_1789';
    var leadProtocolIDG = 'CTRP_01_1790';
    var leadProtocolIDH = 'CTRP_01_1792';
    var leadProtocolIDI = 'CTRP_01_1794';
    var leadProtocolIDJ = 'CTRP_01_1780';
    var searchResultCountText = 'Trial Search Results';
    var adminDataNCISpecific = 'NCI specific information';
    var nciSpecificStudySourceVal = '';
    var nciSpecificStudySourceResltVal = '';
    var orgSearchCntryList = 'All Countries';
    var orgSearchNameA = 'Boston Medical Center';
    var orgSearchNameB = 'Boston University School Of Public Health';
    var orgSearchNameC = 'National Cancer Institute';
    var orgSearchNameD = 'Wake Forest University at Clemmons';
    var orgSearchNameE = 'NCI - Center for Cancer Research';
    var nciSpecificFundingSourceValA = '';
    var programCode = '7771234';
    var programCdeEdit = '8881234';
    var nciSpecificDepIdVal = '';
    var nciSpecificDepIDValSelect = '-Select a NIH/NCI Division/Department Identifier-';
    var nciSpecificDepIDValCCR = 'CCR';
    var nciSpecificDepIDValCTEP = 'CTEP';
    var nciSpecificDepIDValDCP = 'DCP';
    var nciSpecificDepIDValNHBLI = 'NHBLI';
    var nciSpecificDeptIDResltVal = '';
    var nciSpecificProgramIdVal = '';
    var nciSpecificProgramIdValSelect = '-Select a NIH/NCI Program ID-';
    var nciSpecificProgramIdValBIQSFP = 'BIQSFP';
    var nciSpecificProgramIdValSPORE = 'SPORE';
    var nciSpecificProgramIdValSteering = 'Steering Commitee Reviewed';
    var nciSpecificProgramIdResultVal = '';
    var nciSpecificCommnetsAdd = 'Test Comments Added to the Comments fields';
    var nciSpecificCommnetsEdit = 'Test Comments Edited to the Comments fields';
    var verfiStudySourceVal = '';
    var verfiSpecificStudySourceRsltVal = '';
    var nciSpecificProgramCodeVal = '';
    var nciSpecificCurrentCommentVal = '';
    var convPrgCde = '';
    var convComment = '';
    var verfiSpecificStudySourceRequired = '';
    var msgStduySourceReq = 'Study Source is required';
    var msgFundingSourceReq = 'Funding Source is required';
    var sendCTDotGovQueVal = '';
    var glblArg = '';
    var getOptionA = '';
    var getOptionB = '';
    var conditionCrntItrn = '';

    /*
     Scenario: #1 I can view and edit the value for Study Source
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     And see the value for Study Source
     When I select a different Study Source value of National, Externally Peer-Reviewed, Institutional, Industrial, or Other
     Then the selected value for Study Source will be associated with the trial
     */

    this.Given(/^I am logged into the CTRP PA application$/, function () {
        return browser.sleep(25).then(function() {
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
        });
    });

    this.Given(/^I am on the NCI Specific Information screen$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolID);
            //nciSpecific.clickAdminCheckOut();
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
        });
    });

    this.Given(/^see the value for Study Source$/, function () {
        return browser.sleep(25).then(function () {
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';

                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }

                nciSpecificStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + nciSpecificStudySourceVal + '] as the current Study Source selected value');
            });
        });
    });

    this.When(/^I select a different Study Source value of National, Externally Peer\-Reviewed, Institutional, Industrial, or Other$/, function () {
        return browser.sleep(25).then(function () {
            if (nciSpecificStudySourceVal === 'National') {
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';

                function retNCISpecNewVal() {
                    return pasNCISpecNewVal;
                }

                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            }
            if (nciSpecificStudySourceVal === 'Externally Peer-Reviewed') {
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';

                function retNCISpecNewVal() {
                    return pasNCISpecNewVal;
                }

                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            }
            if (nciSpecificStudySourceVal === 'Institutional') {
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';

                function retNCISpecNewVal() {
                    return pasNCISpecNewVal;
                }

                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            }
            if (nciSpecificStudySourceVal === 'Industrial') {
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';

                function retNCISpecNewVal() {
                    return pasNCISpecNewVal;
                }

                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            }
            if (nciSpecificStudySourceVal === 'Other') {
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';

                function retNCISpecNewVal() {
                    return pasNCISpecNewVal;
                }

                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            }
            nciSpecific.clickFundingSourceOrganizationDel();
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            nciSpecific.clickSave();
        });
    });

    this.Then(/^the selected value for Study Source will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
        nciSpecific.clickAdminDataGeneralTrial();
        nciSpecific.clickAdminDataNCISpecificInformation();
        console.log('Expected Study source value to verify: '+nciSpecificStudySourceResltVal);
        nciSpecific.getVerifyListValue(nciSpecific.nciSpecificStudySource,nciSpecificStudySourceResltVal,"Study Source field validation");
        login.logout();
        });
    });

    /*
     Scenario: #2 I can associate one or more organizations as the Specific Funding Source for a clinical trial
     Given I have selected a trial to abstract
     And I am on the NCI Specific Information page screen
     And I have selected organization look-up
     When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
     Then the selected organization will be associated to the trial as Specific Funding Source
     */

    this.Given(/^I am on the NCI Specific Information page screen$/, function () {
        return browser.sleep(25).then(function() {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDE);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDE);
        commonFunctions.adminCheckOut();
        nciSpecific.clickAdminDataNCISpecificInformation();
        });
    });

    this.Given(/^I have selected funding source organization look\-up$/, function () {
        return browser.sleep(25).then(function() {
        nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function(value){
            var pasNCISpecStudySource = ''+value+'';
            function retNciSpecificStudySourceVal(){
                return pasNCISpecStudySource;
            }
            nciSpecificStudySourceVal = retNciSpecificStudySourceVal();
            console.log('System Identified ['+nciSpecificStudySourceVal+'] as the current Study Source selected value');
            if (nciSpecificStudySourceVal === 'National'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Externally Peer-Reviewed'){
                nciSpecific.selectStudySource('Institutional');
                var pasNCISpecNewVal = 'Institutional';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Institutional'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Industrial'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
            if (nciSpecificStudySourceVal === 'Other'){
                nciSpecific.selectStudySource('National');
                var pasNCISpecNewVal = 'National';
                function retNCISpecNewVal(){
                    return pasNCISpecNewVal;
                }
                nciSpecificStudySourceResltVal = retNCISpecNewVal();
            };
        });
        nciSpecific.clickFundingSourceOrganizationDel();
        helper.wait_for(3000);
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameA);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        });
    });

    this.When(/^a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial \(sponsor, Lead, IRB\) are displayed$/, function () {
        return browser.sleep(25).then(function() {
            nciSpecific.clickSave();
        });
    });

    this.Then(/^the selected organization will be associated to the trial as Specific Funding Source$/, function () {
        return browser.sleep(25).then(function() {
            nciSpecific.clickAdminDataGeneralTrial();
            nciSpecific.clickAdminDataNCISpecificInformation();
            helper.wait_for(3000);
            nciSpecific.verifyFundingSourceOrg(orgSearchNameA);
            nciSpecific.clickFundingSourceOrganizationDel();
            nciSpecific.clickSave();
        });
    });

    /*
     Scenario: #3 I can unassociate one or more organizations from the Specific Funding Source for a clinical trial
     Given I have selected a trial to abstract
     And I am on the NCI Specific Information page screen
     When I have selected the organization to remove from the trial's Specific Funding Source
     Then the selected organization will not be associated to the trial as Specific Funding Source
     */

    this.When(/^I have selected the organization to remove from the trial's Specific Funding Source$/, function () {
        return browser.sleep(25).then(function() {
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';

                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }
                nciSpecificStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + nciSpecificStudySourceVal + '] as the current Study Source selected value');
                if (nciSpecificStudySourceVal === 'National') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Externally Peer-Reviewed') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Institutional') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Industrial') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Other') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
            });
            nciSpecific.clickFundingSourceOrganizationDel();
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            nciSpecific.clickSave();
            helper.wait_for(3000);
            nciSpecific.clickAdminDataGeneralTrial();
            nciSpecific.clickAdminDataNCISpecificInformation();
        });
    });

    this.Then(/^the selected organization will not be associated to the trial as Specific Funding Source$/, function () {
        return browser.sleep(25).then(function() {
            //nciSpecific.verifyFundingSourceOrg(orgSearchNameB);
            nciSpecific.clickAdminDataGeneralTrial();
            nciSpecific.clickAdminDataNCISpecificInformation();
            nciSpecific.clickFundingSourceOrganizationDel();
            nciSpecific.clickSave();
            helper.wait_for(3000);
            nciSpecific.clickAdminDataGeneralTrial();
            nciSpecific.clickAdminDataNCISpecificInformation();
            //nciSpecific.verifyFundingSourceOrg('');
        });
    });

    /*
     Scenario: #4 I can view and edit the Program Code
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     When I select the Program Code field I can edit the value for Program Code
     Then the selected value for Program Code will be associated with the trial
     */

    this.When(/^I select the Program Code field I can edit the value for Program Code$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDC);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDC);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';

                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }

                nciSpecificStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + nciSpecificStudySourceVal + '] as the current Study Source selected value');
                if (nciSpecificStudySourceVal === 'National') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Externally Peer-Reviewed') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Institutional') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Industrial') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Other') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
            });
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            nciSpecific.setProgramCode(programCode);
            nciSpecific.clickSave();
            nciSpecific.clickAdminDataGeneralTrial();
            nciSpecific.clickAdminDataNCISpecificInformation();
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDC);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDC);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            nciSpecific.setProgramCode(programCdeEdit);
            nciSpecific.clickSave();
        });
    });

    this.Then(/^the selected value for Program Code will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDC);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1,1);
            commonFunctions.clickLinkText(leadProtocolIDC);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            nciSpecific.verifyProgramCode(programCdeEdit);
        });
    });

    /*
     Scenario: #5 I can view and edit the values for NIH/NCI Division/Department Identifier
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     And see the value for NIH/NCI Division/Department Identifier
     When I select one or more values from the for the NIH/NCI Division/Department Identifier (CCR, CTEP, DCP, NHLBI)
     Then the selected value(s) for NIH/NCI Division/Department Identifier will be associated with the trial
     */

    this.Given(/^see the value for NIH\/NCI Division\/Department Identifier$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDF);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDF);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            //Study Source
            commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';

                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }

                verfiStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + verfiStudySourceVal + '] as the current Study Source selected value');
                if (verfiStudySourceVal === 'National') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Externally Peer-Reviewed') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Institutional') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Industrial') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Other') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
            });
            //Funding Source
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Program Code
            nciSpecific.nciSpecificProgramCode.getAttribute().then(function (value) {
                var pasProgramCode = '' + value + '';

                function retNciSpecificProgramCodeVal() {
                    return pasProgramCode;
                }

                nciSpecificProgramCodeVal = retNciSpecificProgramCodeVal();
            });
            nciSpecific.setProgramCode(programCode);
            //Department Identifier
            nciSpecific.nciSpecificDepartmentIdentifier.$('option:checked').getText().then(function (value) {
                var pasNCISpecDepId = '' + value + '';

                function retNciSpecificDepIdVal() {
                    return pasNCISpecDepId;
                }

                nciSpecificDepIdVal = retNciSpecificDepIdVal();
                console.log('System Identified [' + nciSpecificDepIdVal + '] as the current NIH/NCI Division/Department Identifier selected value');
            });
        });
    });

    this.When(/^I select one or more values from the for the NIH\/NCI Division\/Department Identifier \(CCR, CTEP, DCP, NHLBI\)$/, function () {
        return browser.sleep(25).then(function() {
            if (nciSpecificDepIdVal === nciSpecificDepIDValSelect) {
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;

                function retNCISpecDeptIDNewVal() {
                    return pasNCISpecDeptIDNewVal;
                }

                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            }
            if (nciSpecificDepIdVal === nciSpecificDepIDValCCR) {
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;

                function retNCISpecDeptIDNewVal() {
                    return pasNCISpecDeptIDNewVal;
                }

                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            }
            if (nciSpecificDepIdVal === nciSpecificDepIDValDCP) {
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;

                function retNCISpecDeptIDNewVal() {
                    return pasNCISpecDeptIDNewVal;
                }

                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            }
            if (nciSpecificDepIdVal === nciSpecificDepIDValCTEP) {
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;

                function retNCISpecDeptIDNewVal() {
                    return pasNCISpecDeptIDNewVal;
                }

                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            }
            if (nciSpecificDepIdVal === nciSpecificDepIDValNHBLI) {
                nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;

                function retNCISpecDeptIDNewVal() {
                    return pasNCISpecDeptIDNewVal;
                }

                nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
            }
            nciSpecific.clickSave();
        });
    });

    this.Then(/^the selected value\(s\) for NIH\/NCI Division\/Department Identifier will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDF);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1,1);
            commonFunctions.clickLinkText(leadProtocolIDF);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            nciSpecific.getVerifyListValue(nciSpecific.nciSpecificDepartmentIdentifier,nciSpecificDeptIDResltVal,"NIH/NCI Division/Department Identifier");
            login.logout();
        });
    });

    /*
     Scenario: #6 I can view and edit the values for NIH/NCI Division/Department Identifier
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     And see the value for NIH/NCI Program Id
     When I select one or more values from the for the NIH/NCI Program Identifier (BIQSFP, SPORE, Steering Committee Reviewed)
     Then the selected value(s) for NIH/NCI Program Identifier will be associated with the trial
     */

    this.Given(/^see the value for NIH\/NCI Program Id$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDF);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDF);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            //nciSpecific.clickFundingSourceOrganizationDel();
            //Study Source
            commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';

                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }

                verfiStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + verfiStudySourceVal + '] as the current Study Source selected value');
                if (verfiStudySourceVal === 'National') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Externally Peer-Reviewed') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Institutional') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Industrial') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Other') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
            });
            //Funding Source
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Program Code
            nciSpecific.nciSpecificProgramCode.getAttribute().then(function (value) {
                var pasProgramCode = '' + value + '';

                function retNciSpecificProgramCodeVal() {
                    return pasProgramCode;
                }

                nciSpecificProgramCodeVal = retNciSpecificProgramCodeVal();
            });
            nciSpecific.setProgramCode(programCode);
            //Program ID
            nciSpecific.nciSpecificProgramID.$('option:checked').getText().then(function (value) {
                var pasNCISpecProgramId = '' + value + '';

                function retNciSpecificProgramIdVal() {
                    return pasNCISpecProgramId;
                }

                nciSpecificProgramIdVal = retNciSpecificProgramIdVal();
                console.log('System Identified [' + nciSpecificProgramIdVal + '] as the current NIH/NCI Program Identifier selected value');
            });
        });
    });

    this.When(/^I select one or more values from the for the NIH\/NCI Program Identifier \(BIQSFP, SPORE, Steering Committee Reviewed\)$/, function () {
        return browser.sleep(25).then(function() {
            if (nciSpecificProgramIdVal === '') {
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                function retNCISpecProgIDNewVal() {
                    return pasNCISpecProgIDNewVal;
                }

                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            }
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValSelect) {
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                function retNCISpecProgIDNewVal() {
                    return pasNCISpecProgIDNewVal;
                }

                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            }
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValBIQSFP) {
                nciSpecific.selectProgramID(nciSpecificProgramIdValSPORE);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValSPORE;

                function retNCISpecProgIDNewVal() {
                    return pasNCISpecProgIDNewVal;
                }

                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            }
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValSPORE) {
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                function retNCISpecProgIDNewVal() {
                    return pasNCISpecProgIDNewVal;
                }

                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            }
            if (nciSpecificProgramIdVal === nciSpecificProgramIdValSteering) {
                nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                function retNCISpecProgIDNewVal() {
                    return pasNCISpecProgIDNewVal;
                }

                nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
            }
            nciSpecific.clickSave();
        });
    });

    this.Then(/^the selected value\(s\) for NIH\/NCI Program Identifier will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDF);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1,1);
            commonFunctions.clickLinkText(leadProtocolIDF);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            nciSpecific.getVerifyListValue(nciSpecific.nciSpecificProgramID,nciSpecificProgramIdResultVal,"NIH/NCI Program Id");
            login.logout();
        });
    });

    /*
     Scenario: #7 I can view and edit the �Send Trial Information to ClinicalTrials.gov?�
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     And the Trial Sponsor is "National Cancer Institute" (Trial/Sponsor_ID where organizations/name = "National Cancer Institute")
     And the Trial Lead Organization is not "NCI - Center for Cancer Research" (Trial/Lead_Org_ID where Organizations/Name = "NCI - Center for Cancer Research")
     And the Trial processing status is "Verification Pending", "Abstracted", "Abstraction Verified No Response", or "Abstraction Verified Response"
     And the Trial Overall Status is not "Complete", "Administratively Complete" or "Terminated"
     And the trial Research Category is "Interventional" (Trial/Research_Category_id where Research_Categories/Name = "Interventional")
     When I select the radio button for Yes or No for �Send Trial Information to ClinicalTrials.gov?�
     Then the selected value for �Send Trial Information to ClinicalTrials.gov?� will be Yes or No
     */

    this.Given(/^the Trial Sponsor is "([^"]*)" \(Trial\/Sponsor_ID where organizations\/name = "([^"]*)"\)$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
            var getArg1National = arg1;
            var getArg2National = arg2;
            console.log('Arg1 Value:'+getArg1National);
            console.log('Arg2 Value:'+getArg2National);
            trialDetails.clickAdminDataGeneralTrial();
            trialDetails.clickSearchOrgButtonByIndex('1');
            searchOrg.setOrgName(getArg1National);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailSponsor, arg1, "Verifying the Sponsor Organization Name");
        });
    });

    this.Given(/^the Trial Lead Organization is not "([^"]*)" \(Trial\/Lead_Org_ID where Organizations\/Name = "([^"]*)"\)$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
            var getArg1NCI = arg1;
            var getArg2NCI = arg2;
            console.log('Arg1 Value:' + getArg1NCI);
            console.log('Arg2 Value:' + getArg2NCI);
            trialDetails.clickAdminDataGeneralTrial();
            trialDetails.clickSearchOrgButtonByIndex('0');
            searchOrg.setOrgName(getArg1NCI);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailLeadOrganization, getArg1NCI, "Verifying the Lead Organization Name");
        });
    });

    this.Given(/^the Trial processing status is "([^"]*)", "([^"]*)", "([^"]*)", or "([^"]*)"$/, function (arg1, arg2, arg3, arg4) {
        return browser.sleep(25).then(function() {
            var matchArg = '';
            nciSpecific.clickAdminDataNCISpecificInformation();
            //commonFunctions.waitForElement(nciSpecific.nciSpecificProgramCode, "Program Code");
            var getArg1ProcessingStatus = 'Processing Status: '+arg1;
            var getArg2ProcessingStatus = 'Processing Status: '+arg2;
            var getArg3ProcessingStatus = 'Processing Status: '+arg3;
            var getArg4ProcessingStatus = 'Processing Status: '+arg4;
            console.log('Arg1 Value: '+getArg1ProcessingStatus);
            console.log('Arg2 Value: '+getArg2ProcessingStatus);
            console.log('Arg3 Value: '+getArg3ProcessingStatus);
            console.log('Arg4 Value: '+getArg4ProcessingStatus);
            nciSpecific.trialOverviewProcessingStatus.getText().then(function(value){
                if(value === getArg1ProcessingStatus){
                    console.log('Verifying: '+value);
                    nciSpecific.verifyProcessingStatus(getArg1ProcessingStatus);
                }else if(value === getArg2ProcessingStatus){
                    console.log('Verifying: '+value);
                    nciSpecific.verifyProcessingStatus(getArg2ProcessingStatus);
                }else if(value === getArg3ProcessingStatus){
                    console.log('Verifying: '+value);
                    nciSpecific.verifyProcessingStatus(getArg3ProcessingStatus);
                }else if(value === getArg4ProcessingStatus){
                    console.log('Verifying: '+value);
                    nciSpecific.verifyProcessingStatus(getArg4ProcessingStatus);
                }
            });
        });
    });

    this.Given(/^the Trial Overall Status is not "([^"]*)", "([^"]*)" or "([^"]*)"$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function() {

        });
    });

    this.Given(/^the trial Clinical Research Category is "([^"]*)" \(Trial\/Clinica_Research_Category_id where Clinical_Research_Categories\/Name = "([^"]*)"\)$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
            var getArg1ResearchCategory = 'Clinical Research Category: '+arg1;
            var getArg2ResearchCategory = 'Clinical Research Category: '+arg2;
            nciSpecific.verifyResearchCategory(getArg1ResearchCategory);
        });
    });

    this.Given(/^the trial Research Category is "([^"]*)" \(Trial\/Research_Category_id where Research_Categories\/Name = "([^"]*)"\)$/, function (arg1, arg2) {
        return browser.sleep(25).then(function() {
            var getArg1ResearchCategory = 'Clinical Research Category: '+arg1;
            var getArg2ResearchCategory = 'Clinical Research Category: '+arg2;
            nciSpecific.verifyResearchCategory(getArg1ResearchCategory);
        });
    });

    this.When(/^I select the radio button for Yes or No for �Send Trial Information to ClinicalTrials\.gov\?�$/, function () {
        return browser.sleep(25).then(function() {
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';
                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }
                nciSpecificStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + nciSpecificStudySourceVal + '] as the current Study Source selected value');
                if (nciSpecificStudySourceVal === 'National') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Externally Peer-Reviewed') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Institutional') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Industrial') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
                if (nciSpecificStudySourceVal === 'Other') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    nciSpecificStudySourceResltVal = retNCISpecNewVal();
                }
            });
            nciSpecific.clickFundingSourceOrganizationDel();
            helper.wait_for(3000);
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameC);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            var arg1 = 'No';
            var arg2 = 'Yes';
            var arg3 = 'Send Trial Information to ClinicalTrials.gov?';
            //nciSpecific.nciSpecificSendCTDotGovLbl.getText().then(function(value){
            //    var pasVal = ''+value+'';
            //    function retVal(){
            //        return pasVal;
            //    };
            //    sendCTDotGovQueVal = retVal();
            //    console.log('Send to CTDotGov Element Value ['+sendCTDotGovQueVal+']');
            //});
            //expect(sendCTDotGovQueVal.toString()).to.eql(arg3.toString());
            //Verifying Yes or No Condition
            nciSpecific.nciSpecificSendTrialRadio.get(1).isSelected().then(function (condition2) {
                if (condition2 === true) {
                    glblArg = 'Yes';
                }
            });
            nciSpecific.nciSpecificSendTrialRadio.get(0).isSelected().then(function (condition1) {
                if (condition1 === true) {
                    glblArg = 'No';
                }
            });
            nciSpecific.clickSave();
            helper.wait_for(3400);
            nciSpecific.clickAdminDataGeneralTrial();
            nciSpecific.clickAdminDataNCISpecificInformation();
        });
    });

    this.Then(/^the selected value for �Send Trial Information to ClinicalTrials\.gov\?� will be Yes or No$/, function () {
        return browser.sleep(25).then(function() {
            var arg3 = 'Send Trial Information to ClinicalTrials.gov?';
            //Select send to trial CTDotGov
            if (glblArg === 'No'){
                nciSpecific.selectSendTrial('1');
            } else if(glblArg === 'Yes'){
                nciSpecific.selectSendTrial('0');
            }
            //Save
            nciSpecific.clickSave();
            helper.wait_for(3400);
            nciSpecific.clickAdminDataGeneralTrial();
            nciSpecific.clickAdminDataNCISpecificInformation();
            helper.wait_for(3000);
            console.log('Current Selection: ['+glblArg+']');
            //expect(sendCTDotGovQueVal).to.eql(arg3);
            if (glblArg === 'Yes'){
                nciSpecific.verifySendToTrialCTDotGov('0', true);
            } else if(glblArg === 'No'){
                nciSpecific.verifySendToTrialCTDotGov('1', true);
            }
        });
    });

    /*
     Scenario: #8 I can view and edit the NCI Specific Information Comments
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     When I select the Comments field I can enter or edit comments
     Then the information entered for Comments will be associated with the trial
     */

    this.When(/^I select the Comments field I can enter or edit comments$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDG);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDG);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            //Study Source
            commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';

                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }

                verfiStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + verfiStudySourceVal + '] as the current Study Source selected value');
                if (verfiStudySourceVal === 'National') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Externally Peer-Reviewed') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Institutional') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Industrial') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Other') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
            });
            //Funding Source
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            nciSpecific.setComment(nciSpecificCommnetsAdd);
            nciSpecific.clickSave();
            helper.wait_for(9000);
            nciSpecific.clickAdminDataGeneralTrial();
            nciSpecific.clickAdminDataNCISpecificInformation();
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDG);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDG);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            nciSpecific.verifyComment(nciSpecificCommnetsAdd);
            nciSpecific.setComment(nciSpecificCommnetsEdit);
            nciSpecific.clickSave();
        });
    });

    this.Then(/^the information entered for Comments will be associated with the trial$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDG);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1,1);
            commonFunctions.clickLinkText(leadProtocolIDG);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            nciSpecific.verifyComment(nciSpecificCommnetsEdit);
        });
    });

    /*
     Scenario: #9 Save NCI Specific Information
     Given I have selected a trial to abstract
     And I am on the NCI Specific Information screen
     When select save
     Then the information entered or edited on the NCI Specific Information screen will be saved to the trial record

     var verfiStudySourceVal = '';
     var verfiSpecificStudySourceRsltVal = '';
     */

    this.When(/^select save NCI Specific Information$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDA);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDA);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            //Study Source
            commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';
                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }
                verfiStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + verfiStudySourceVal + '] as the current Study Source selected value');
                if (verfiStudySourceVal === 'National') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Externally Peer-Reviewed') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Institutional') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Industrial') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Other') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
            });
            //Funding Source
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Program Code
            nciSpecific.setProgramCode(programCode);
            //NIH/NCI Department Identifiers
            nciSpecific.nciSpecificDepartmentIdentifier.$('option:checked').getText().then(function (value) {
                var pasNCISpecDepId = '' + value + '';

                function retNciSpecificDepIdVal() {
                    return pasNCISpecDepId;
                }
                nciSpecificDepIdVal = retNciSpecificDepIdVal();
                console.log('System Identified [' + nciSpecificDepIdVal + '] as the current NIH/NCI Division/Department Identifier selected value');
                if (nciSpecificDepIdVal === nciSpecificDepIDValSelect) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
                if (nciSpecificDepIdVal === nciSpecificDepIDValCCR) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
                if (nciSpecificDepIdVal === nciSpecificDepIDValDCP) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
                if (nciSpecificDepIdVal === nciSpecificDepIDValCTEP) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
                if (nciSpecificDepIdVal === nciSpecificDepIDValNHBLI) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
            });
            //NIH/NCI Identifiers
            nciSpecific.nciSpecificProgramID.$('option:checked').getText().then(function (value) {
                var pasNCISpecProgramId = '' + value + '';

                function retNciSpecificProgramIdVal() {
                    return pasNCISpecProgramId;
                }
                nciSpecificProgramIdVal = retNciSpecificProgramIdVal();
                console.log('System Identified [' + nciSpecificProgramIdVal + '] as the current NIH/NCI Program Identifier selected value');
                if (nciSpecificProgramIdVal === '') {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
                if (nciSpecificProgramIdVal === nciSpecificProgramIdValSelect) {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
                if (nciSpecificProgramIdVal === nciSpecificProgramIdValBIQSFP) {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValSPORE);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValSPORE;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
                if (nciSpecificProgramIdVal === nciSpecificProgramIdValSPORE) {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
                if (nciSpecificProgramIdVal === nciSpecificProgramIdValSteering) {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
            });
            //Send Trial Information to ClinicalTrials.gov

            //Comments
            nciSpecific.setComment(nciSpecificCommnetsAdd);
            //Save
            nciSpecific.clickSave();
        });
    });

    this.Then(/^the information entered or edited on the NCI Specific Information screen will be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDA);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDA);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            console.log('Expected Study Source: ' + verfiSpecificStudySourceRsltVal);
            nciSpecific.getVerifyListValue(nciSpecific.nciSpecificStudySource, verfiSpecificStudySourceRsltVal, "Study Source field validation");
            console.log('Expected Funding Source Organization: ' + orgSearchNameA);
            nciSpecific.verifyFundingSourceOrg(orgSearchNameA);
            console.log('Expected Program Code: ' + programCode);
            nciSpecific.verifyProgramCode(programCode);
            console.log('Expected NIH/NCI Department Identifiers: ' + nciSpecificDeptIDResltVal);
            nciSpecific.getVerifyListValue(nciSpecific.nciSpecificDepartmentIdentifier, nciSpecificDeptIDResltVal, "NIH/NCI Division/Department Identifier");
            console.log('Expected NIH/NCI Program Id: ' + nciSpecificProgramIdResultVal);
            nciSpecific.getVerifyListValue(nciSpecific.nciSpecificProgramID, nciSpecificProgramIdResultVal, "NIH/NCI Program Id");
            console.log('Expected Comments: ' + nciSpecificCommnetsAdd);
            nciSpecific.verifyComment(nciSpecificCommnetsAdd);
            //nciSpecific.clickFundingSourceOrganizationDel();
            nciSpecific.clickSave();
        });
    });

    /*
     Scenario: #10 Cancel NCI Specific Information
     Given I have selected a trial to abstract
     And I am on the NCI Specific Information screen
     When I select Reset NCI Specific Information
     Then the information entered or edited on the NCI Specific Information screen will not be saved to the trial record
     And the screen will be refreshed with the existing data
     */
    this.When(/^I select Reset NCI Specific Information$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDB);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDB);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            //Study Source
            commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';

                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }
                verfiStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + verfiStudySourceVal + '] as the current Study Source selected value');
                if (verfiStudySourceVal === 'National') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Externally Peer-Reviewed') {
                    nciSpecific.selectStudySource('Institutional');
                    var pasNCISpecNewVal = 'Institutional';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Institutional') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Industrial') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
                if (verfiStudySourceVal === 'Other') {
                    nciSpecific.selectStudySource('National');
                    var pasNCISpecNewVal = 'National';

                    function retNCISpecNewVal() {
                        return pasNCISpecNewVal;
                    }

                    verfiSpecificStudySourceRsltVal = retNCISpecNewVal();
                }
            });
            //Funding Source
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            //Program Code
            nciSpecific.nciSpecificProgramCode.getAttribute().then(function (value) {
                var pasProgramCode = '' + value + '';
                function retNciSpecificProgramCodeVal() {
                    return pasProgramCode;
                }
                nciSpecificProgramCodeVal = retNciSpecificProgramCodeVal();
            });
            nciSpecific.setProgramCode(programCode);
            //NIH/NCI Department Identifiers
            nciSpecific.nciSpecificDepartmentIdentifier.$('option:checked').getText().then(function (value) {
                var pasNCISpecDepId = '' + value + '';
                function retNciSpecificDepIdVal() {
                    return pasNCISpecDepId;
                }
                nciSpecificDepIdVal = retNciSpecificDepIdVal();
                console.log('System Identified [' + nciSpecificDepIdVal + '] as the current NIH/NCI Division/Department Identifier selected value');
                if (nciSpecificDepIdVal === nciSpecificDepIDValSelect) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
                if (nciSpecificDepIdVal === nciSpecificDepIDValCCR) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
                if (nciSpecificDepIdVal === nciSpecificDepIDValDCP) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValCCR);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValCCR;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
                if (nciSpecificDepIdVal === nciSpecificDepIDValCTEP) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
                if (nciSpecificDepIdVal === nciSpecificDepIDValNHBLI) {
                    nciSpecific.selectDepartmentIdentifier(nciSpecificDepIDValDCP);
                    var pasNCISpecDeptIDNewVal = nciSpecificDepIDValDCP;

                    function retNCISpecDeptIDNewVal() {
                        return pasNCISpecDeptIDNewVal;
                    }

                    nciSpecificDeptIDResltVal = retNCISpecDeptIDNewVal();
                }
            });
            //NIH/NCI Identifiers
            nciSpecific.nciSpecificProgramID.$('option:checked').getText().then(function (value) {
                var pasNCISpecProgramId = '' + value + '';

                function retNciSpecificProgramIdVal() {
                    return pasNCISpecProgramId;
                }

                nciSpecificProgramIdVal = retNciSpecificProgramIdVal();
                console.log('System Identified [' + nciSpecificProgramIdVal + '] as the current NIH/NCI Program Identifier selected value');
                if (nciSpecificProgramIdVal === '') {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
                if (nciSpecificProgramIdVal === nciSpecificProgramIdValSelect) {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
                if (nciSpecificProgramIdVal === nciSpecificProgramIdValBIQSFP) {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValSPORE);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValSPORE;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
                if (nciSpecificProgramIdVal === nciSpecificProgramIdValSPORE) {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
                if (nciSpecificProgramIdVal === nciSpecificProgramIdValSteering) {
                    nciSpecific.selectProgramID(nciSpecificProgramIdValBIQSFP);
                    var pasNCISpecProgIDNewVal = nciSpecificProgramIdValBIQSFP;

                    function retNCISpecProgIDNewVal() {
                        return pasNCISpecProgIDNewVal;
                    }

                    nciSpecificProgramIdResultVal = retNCISpecProgIDNewVal();
                }
            });
            //Send Trial Information to ClinicalTrials.gov
            //Comments
            nciSpecific.nciSpecificComments.getAttribute().then(function (value) {
                var pasCurrntComment = '' + value + '';

                function retNciSpecificCommentVal() {
                    return pasCurrntComment;
                }

                nciSpecificCurrentCommentVal = retNciSpecificCommentVal();
            });
            nciSpecific.setComment(nciSpecificCommnetsAdd);
            //Reset
            nciSpecific.clickReset();
        });
    });

    this.Then(/^the information entered or edited on the NCI Specific Information screen will not be saved to the trial record$/, function () {
        return browser.sleep(25).then(function() {
            console.log('Expected Study Source: ' + verfiStudySourceVal);
            helper.getVerifyListValue(nciSpecific.nciSpecificStudySource, verfiStudySourceVal, "Study Source field validation");
            //console.log('Expected Funding Source Organization: '+verfiStudySourceVal);
            //nciSpecific.verifyFundingSourceOrg(verfiStudySourceVal);
            if (nciSpecificProgramCodeVal === '') {
                convPrgCde = 'null';
            } else {
                convPrgCde = nciSpecificProgramCodeVal;
            }
            console.log('Expected Program Code: ' + convPrgCde);
            nciSpecific.verifyProgramCode(convPrgCde);
            console.log('Expected NIH/NCI Department Identifiers: ' + nciSpecificDepIdVal);
            helper.getVerifyListValue(nciSpecific.nciSpecificDepartmentIdentifier, nciSpecificDepIdVal, "NIH/NCI Division/Department Identifier");
            console.log('Expected NIH/NCI Program Id: ' + nciSpecificProgramIdVal);
            helper.getVerifyListValue(nciSpecific.nciSpecificProgramID, nciSpecificProgramIdVal, "NIH/NCI Program Id");
            if (nciSpecificCurrentCommentVal === '') {
                convComment = 'null';
            } else {
                convComment = nciSpecificCurrentCommentVal;
            }
            console.log('Expected Comments: ' + convComment);
            nciSpecific.verifyComment(convComment);
        });
    });

    this.Then(/^the screen will be refreshed with the existing data$/, function () {
        return browser.sleep(25).then(function() {

        });
    });

    /*
     Scenario Outline: #11 I cannot change the �Send Trial Information to ClinicalTrials.gov? - greyed out
     Given I am logged into the CTRP PA application
     And I am on the NCI Specific Information screen
     When the following <conditions> exist
     Then the label and element for �Send Trial Information to ClinicalTrials.gov?� will not greyed out and not editible

     Examples:
     |Conditions|Field|
     |Trial is sponsored by "National Cancer Institute"|trials.sponsor_id Organizations.name = "National Cancer Institute"|
     |Trial Lead Organization is "NCI - Center for Cancer Research"|trials.lead_org_id Organizations.name = "NCI - Center for Cancer Research"|
     |Trial processing status is not "Verification Pending"|processing_status_wrappers.processing_status_id processing_statuses.name not = "Verification Pending"|
     |Trial processing status is not "Abstracted"|processing_status_wrappers.processing_status_id processing_statuses.name not = "Abstracted"|
     |Trial processing status is not "Abstraction Verified Response"|processing_status_wrappers.processing_status_id processing_statuses.name not = "Abstraction Verified Response"|
     |Trial processing status is not "Abstraction Verified No Response"|processing_status_wrappers.processing_status_id processing_statuses.name not = "Abstraction Verified No Response"|
     |Trial Overall Status is "Complete"|trial_status_wrappers.trial_status_id trial_statuses.name = "Complete"|
     |Trial Overall Status is "Administratively Complete"|trial_status_wrappers.trial_status_id trial_statuses.name = "Administratively Complete"|
     |Trial Overall Status is "Terminated"|trial_status_wrappers.trial_status_id trial_statuses.name = "Terminated"|
     |Trial Research Category is not "Interventional"|trials.Research_catagory_id Research_catagories.name not = "Interventional"|
     */

    this.Given(/^I am at the NCI Specific Information screen to abstract$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
        });
    });

    this.When(/^the following (.*) and (.*) exist$/, function (Conditions, Field) {
        return browser.sleep(25).then(function() {
            var conditionReplc = Conditions.toString().replace(/"/g, "\n", -1);
            var conditionSplt = conditionReplc.split("\n");
            conditionCrntItrn = conditionSplt[1];
            console.log('Current condition:[' + conditionCrntItrn + ']');
            if (conditionCrntItrn === "National Cancer Institute") {
                searchTrialToAbstract(leadProtocolID);
                sponsorLeadOrg();
            }
            if (conditionCrntItrn === "NCI - Center for Cancer Research") {
                searchTrialToAbstract(leadProtocolID);
                sponsorLeadOrg();
            }
            if (conditionCrntItrn === "Verification Pending") {
                searchTrialToAbstract(leadProtocolID);
                helper.wait_for(3000);
            }
            if (conditionCrntItrn === "Abstracted") {
                searchTrialToAbstract(leadProtocolID);
                helper.wait_for(3000);
            }
            if (conditionCrntItrn === "Abstraction Verified Response") {
                searchTrialToAbstract(leadProtocolIDB);
                helper.wait_for(3000);
                var getArg1ProcessingStatus = 'Processing Status: ' + conditionCrntItrn;
                console.log('Expected Processing Status Value: ' + getArg1ProcessingStatus);
                nciSpecific.trialOverviewProcessingStatus.getText().then(function (value) {
                    if (value === getArg1ProcessingStatus) {
                        console.log('Verifying: ' + value);
                        nciSpecific.verifyProcessingStatus(getArg1ProcessingStatus);
                    }
                });
            }
            if (conditionCrntItrn === "Abstraction Verified No Response") {
                searchTrialToAbstract(leadProtocolID);
                helper.wait_for(3000);
                var getArg1ProcessingStatus = 'Processing Status: ' + conditionCrntItrn;
                console.log('Expected Processing Status Value: ' + getArg1ProcessingStatus);
                nciSpecific.trialOverviewProcessingStatus.getText().then(function (value) {
                    if (value === getArg1ProcessingStatus) {
                        console.log('Verifying: ' + value);
                        nciSpecific.verifyProcessingStatus(getArg1ProcessingStatus);
                    }
                });
            }
            if (conditionCrntItrn === "Complete") {
                searchTrialToAbstract(leadProtocolIDD);
                helper.wait_for(3000);
                var getTrialStatus = 'Current Trial Status: ' + conditionCrntItrn;
                nciSpecific.trialOverviewCurrentTrialStatus.getText().then(function (value) {
                    if (value === getTrialStatus) {
                        console.log('Verifying: ' + value);
                        nciSpecific.verifyCurrentTrialStatus(getTrialStatus);
                    }
                });
            }
            if (conditionCrntItrn === "Administratively Complete") {
                searchTrialToAbstract(leadProtocolIDJ);
                helper.wait_for(3000);
                var getTrialStatus = 'Current Trial Status: ' + conditionCrntItrn;
                nciSpecific.trialOverviewCurrentTrialStatus.getText().then(function (value) {
                    if (value === getTrialStatus) {
                        console.log('Verifying: ' + value);
                        nciSpecific.verifyCurrentTrialStatus(getTrialStatus);
                    }
                });
            }
            if (conditionCrntItrn === "Terminated") {
                searchTrialToAbstract(leadProtocolID);
                helper.wait_for(3000);
            }
            if (conditionCrntItrn === "Interventional") {
                searchTrialToAbstract(leadProtocolIDJ);
                helper.wait_for(3000);
                var getResearchCategory = 'Clinical Research Category: ' + conditionCrntItrn;
                nciSpecific.trialOverviewResearchCategory.getText().then(function (value) {
                    if (value === getResearchCategory) {
                        console.log('Verifying: ' + value);
                        nciSpecific.verifyResearchCategory(getResearchCategory);
                    }
                });
            }
            nciSpecific.clickAdminDataNCISpecificInformation();
            helper.wait_for(3000);
            nciSpecific.nciSpecificSendCTDotGovLbl.isPresent().then(function (booln) {
                if (booln) {
                    nciSpecific.nciSpecificSendTrialRadio.get(1).isSelected().then(function (condition2) {
                        if (condition2 === true) {
                            glblArg = 'Yes';
                        }
                    });
                    nciSpecific.nciSpecificSendTrialRadio.get(0).isSelected().then(function (condition1) {
                        if (condition1 === true) {
                            glblArg = 'No';
                        }
                    });
                }
            });
            function searchTrialToAbstract(searchByID) {
                pageSearchTrail.setSearchTrialProtocolID(searchByID);
                pageSearchTrail.clickSearchTrialSearchButton();
                commonFunctions.verifyPASearchResultCount(searchResultCountText);
                commonFunctions.clickGridFirstLink(1, 1);
                commonFunctions.clickLinkText(searchByID);
                commonFunctions.adminCheckOut();
                nciSpecific.clickAdminDataNCISpecificInformation();
            }
            function sponsorLeadOrg() {
                trialDetails.clickAdminDataGeneralTrial();
                helper.wait_for(3000);
                trialDetails.clickSearchOrgButtonByIndex('1');
                searchOrg.setOrgName(orgSearchNameC);
                searchOrg.clickSearchButton();
                searchOrg.selectOrgModelItem();
                searchOrg.clickOrgModelConfirm();
                trialDetails.clickSave();
                trialDetails.verifyTextFieldValue(trialDetails.generalTrailSponsor, orgSearchNameC, "Verifying the Sponsor Organization Name");
                trialDetails.clickAdminDataGeneralTrial();
                trialDetails.clickSearchOrgButtonByIndex('0');
                searchOrg.setOrgName(orgSearchNameE);
                searchOrg.clickSearchButton();
                searchOrg.selectOrgModelItem();
                searchOrg.clickOrgModelConfirm();
                trialDetails.clickSave();
                trialDetails.verifyTextFieldValue(trialDetails.generalTrailLeadOrganization, orgSearchNameE, "Verifying the Lead Organization Name");
            }
        });
    });

    this.Then(/^the label and element for �Send Trial Information to ClinicalTrials\.gov\?� will not greyed out and not editable$/, function () {
        return browser.sleep(25).then(function() {
            function selectYesOrNoAndVerifySelection() {
                //helper.verifyElementPresents(nciSpecific.nciSpecificSendCTDotGovLbl, true);
                var arg3 = 'Send Trial Information to ClinicalTrials.gov?';
                //Select send to trial CTDotGov
                if (glblArg === 'No') {
                    nciSpecific.selectSendTrial('1');
                } else if (glblArg === 'Yes') {
                    nciSpecific.selectSendTrial('0');
                }
                //Save
                nciSpecific.clickSave();
                console.log('Current Selection: [' + glblArg + ']');
                if (glblArg === 'Yes') {
                    nciSpecific.verifySendToTrialCTDotGov('0', true);
                } else if (glblArg === 'No') {
                    nciSpecific.verifySendToTrialCTDotGov('1', true);
                }
            }
            if (conditionCrntItrn === "National Cancer Institute") {
                selectYesOrNoAndVerifySelection();
            }
            if (conditionCrntItrn === "NCI - Center for Cancer Research") {
                selectYesOrNoAndVerifySelection();
            }
            if (conditionCrntItrn === "Verification Pending") {

            }
            if (conditionCrntItrn === "Abstracted") {

            }
            if (conditionCrntItrn === "Abstraction Verified Response") {
                helper.verifyElementPresents(nciSpecific.nciSpecificSendCTDotGovLbl, false);
            }
            if (conditionCrntItrn === "Abstraction Verified No Response") {
                helper.verifyElementPresents(nciSpecific.nciSpecificSendCTDotGovLbl, true);
            }
            if (conditionCrntItrn === "Complete") {
                helper.verifyElementPresents(nciSpecific.nciSpecificSendCTDotGovLbl, false);
            }
            if (conditionCrntItrn === "Administratively Complete") {
                helper.verifyElementPresents(nciSpecific.nciSpecificSendCTDotGovLbl, false);
            }
            if (conditionCrntItrn === "Terminated") {

            }
            if (conditionCrntItrn === "Interventional") {
                helper.verifyElementPresents(nciSpecific.nciSpecificSendCTDotGovLbl, false);
            }
        });
    });

    /*
     Scenario: #11a I cannot view the �Send Trial Information to ClinicalTrials.gov?�
     Given I am logged into the CTRP PA application
     And I am at the NCI Specific Information screen
     When the following condition exist to send the trail to the ClinicalTrials.gov
     |Trial is not sponsored by|National Cancer Institute|
     Then the label and element for �Send Trial Information to ClinicalTrials.gov?� will not be visible
     */

    this.Given(/^I am at the NCI Specific Information screen$/, function () {
        return browser.sleep(25).then(function() {
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDE);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDE);
            //nciSpecific.clickAdminCheckOut();
            commonFunctions.adminCheckOut();
            trialDetails.clickAdminDataGeneralTrial();
            //nciSpecific.clickAdminDataNCISpecificInformation();
        });
    });

    this.When(/^the following condition exist to send the trail to the ClinicalTrials\.gov$/, function (table) {
        return browser.sleep(25).then(function() {
            trialSponsorCondtions = table.raw();
            console.log('value of table' + trialSponsorCondtions);
            strVal = trialSponsorCondtions.toString().replace(/,/g, "\n", -1);
            console.log('List of Table Values:[' + strVal + ']');
            var tableDataSplt = strVal.toString().split("\n");
            getOptionA = tableDataSplt[0];
            getOptionB = tableDataSplt[1];
            console.log('Condition:[' + getOptionB + ']');
            trialDetails.clickSearchOrgButtonByIndex('1');
            searchOrg.setOrgName(orgSearchNameA);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailSponsor, orgSearchNameA, "Verifying the Sponsor Organization Name");
            trialDetails.clickAdminDataGeneralTrial();
            trialDetails.clickSearchOrgButtonByIndex('0');
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
            trialDetails.clickSave();
            trialDetails.verifyTextFieldValue(trialDetails.generalTrailLeadOrganization, orgSearchNameB, "Verifying the Lead Organization Name");
            helper.wait_for(2500);
            nciSpecific.clickAdminDataNCISpecificInformation();
        });
    });

    this.Then(/^the label and element for �Send Trial Information to ClinicalTrials\.gov\?� will not be visible$/, function () {
        return browser.sleep(25).then(function() {
            helper.verifyElementPresents(nciSpecific.nciSpecificSendCTDotGovLbl, false);
        });
    });

    /*
     Scenario: #12 Study Source is not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the NCI Specific Information screen
     And I have not selected a Study Source
     When I select Save to verify Study Source is required
     Then an Error message will appear "Study Source is required”
     */

    this.Given(/^I have not selected a Study Source$/, function () {
        return browser.sleep(25).then(function () {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDH);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDH);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            //commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';
                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }
                verfiStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + verfiStudySourceVal + '] as the current Study Source selected value');
                if (verfiStudySourceVal === '-Select a Study Source-') {
                    nciSpecific.selectStudySource('-Select a Study Source-');
                    var pasNCISpecReqNewVal = '-Select a Study Source-';
                    function retNCISpecReqNewVal() {
                        return pasNCISpecReqNewVal;
                    }
                    verfiSpecificStudySourceRequired = retNCISpecReqNewVal();
                } else {
                    nciSpecific.selectStudySource('-Select a Study Source-');
                    var pasNCISpecReqNewVal = '-Select a Study Source-';
                    function retNCISpecReqNewVal() {
                        return pasNCISpecReqNewVal;
                    }
                    verfiSpecificStudySourceRequired = retNCISpecReqNewVal();
                }
            });
            //Funding Source
            organizationSearch.clickSearchOrganization();
            searchOrg.setOrgName(orgSearchNameB);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
        });
    });

    this.When(/^I select Save to verify Study Source is required$/, function () {
        return browser.sleep(25).then(function() {
            nciSpecific.clickSave();
        });
    });

    this.Then(/^an Error message will appear "Study Source is required”$/, function () {
        return browser.sleep(25).then(function() {
            nciSpecific.verifyStudySourceReq(msgStduySourceReq);
        });
    });

    /*
     Scenario: #13 Funding Source is not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the NCI Specific Information screen
     And I have not selected a Funding Source
     When I select Save to verify Funding Source is required
     Then an Error message will appear "Funding Source is required”
     */

    this.Given(/^I have not selected a Funding Source$/, function () {
        return browser.sleep(25).then(function() {
            login.logout();
            commonFunctions.onPrepareLoginTest('ctrpabstractor');
            pageMenu.homeSearchTrials.click();
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDI);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.verifyPASearchResultCount(searchResultCountText);
            commonFunctions.clickGridFirstLink(1, 1);
            commonFunctions.clickLinkText(leadProtocolIDI);
            commonFunctions.adminCheckOut();
            nciSpecific.clickAdminDataNCISpecificInformation();
            //commonFunctions.wait(nciSpecific.nciSpecificStudySource, 'Study Source');
            nciSpecific.nciSpecificStudySource.$('option:checked').getText().then(function (value) {
                var pasNCISpecStudySource = '' + value + '';
                function retNciSpecificStudySourceVal() {
                    return pasNCISpecStudySource;
                }
                verfiStudySourceVal = retNciSpecificStudySourceVal();
                console.log('System Identified [' + verfiStudySourceVal + '] as the current Study Source selected value');
                if (verfiStudySourceVal === '-Select a Study Source-') {
                    nciSpecific.selectStudySource('Indsutrial');
                    var pasNCISpecReqNewVal = 'Indsutrial';
                    function retNCISpecReqNewVal() {
                        return pasNCISpecReqNewVal;
                    }
                    verfiSpecificStudySourceRequired = retNCISpecReqNewVal();
                } else {
                    //Do nothing
                }
            });
            nciSpecific.clickFundingSourceOrganizationDel();
        });
    });

    this.When(/^I select Save to verify Funding Source is required$/, function () {
        return browser.sleep(25).then(function() {
            nciSpecific.clickSave();
        });
    });

    this.Then(/^an Error message will appear "Funding Source is required”$/, function () {
        return browser.sleep(25).then(function() {
            nciSpecific.verifyFundingSourceReq(msgFundingSourceReq);
        });
    });


};
