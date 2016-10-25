/**
 * Author: Shamim Ahmed
 * Date: 12/09/2015
 * Page Object: Abstraction common methods
 */


//Common dependencies
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
//Login Methods
var loginPage = require('../support/LoginPage');
//Helper Methods
var helperFunctions = require('../support/helper');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testConfiguration = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testConfig/';
//Trial Common Bar
var trialMenuItemList = require('../support/trialCommonBar');
//Abstraction Common Bar
var abstractionPageMenu = require('../support/abstractionCommonBar');
//PA Common Bar
var poMenuItemList = require('../support/PoCommonBar');
//Abstraction PA Search Trial Page
var paSearchTrialPage = require('../support/abstractionSearchTrialPage');
//Abstraction NCI Specific Information
var abstractionNCISpecific = require('../support/abstractionNCISpecificInfo');
//Trial Related Document
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var util = require('util');

var abstractionCommonMethods = function() {
    /*******
     * Methods Description: Common methods to login as following user(s)
     * ctrpcurator
     * ctrpabstractor
     * ctrptrialsubmitter
     *******/
    var login = new loginPage();
    var helper = new helperFunctions();
    var trialHome = new trialMenuItemList();
    var abstractPageMenu = new abstractionPageMenu();
    var paSearch = new paSearchTrialPage();
    var poHome = new poMenuItemList();
    var reader;
    var nciSpecific = new abstractionNCISpecific();
    var trialDocCommon = new abstractionTrialRelatedDocument();
    var self = this;
    var loginTxtVerif = 'CTRP Sign In';
    var loginCredTxtVerif = 'Please sign in to continue.';
    var loginNwUsrSngVerif = 'New User? Sign Up';
    var crntTxtLoginPg = '';
    var iteraCntLg = '';
    var searchTrialsTxt = 'Search Trials * for wild card';
    var rsltCountValRT = '';
    var rsltGridValRT = '';
    var exp_del_bttn_pg_hdr = 'Delete button on Organization page';

    /*****************************************
     * Verify Search Trials(PA) screen
     *****************************************/
    this.verifySearchTrialsPAScreen = function () {
        expect(paSearch.searchTrialProtocolID.isDisplayed()).to.eventually.equal(true);
        expect(paSearch.searchTrialOfficialTitle.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialIdentifiertype.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialPurpose.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialPhase.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialPrincipalInvestigator.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialPilotTrial.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialOrganization.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialOrganizationType.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialTrialStatus.isDisplayed()).to.eventually.equal(true);
        ////expect(paSearch.searchTrialStudySource.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialMilestone.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialProcessingStatus.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialResearchCategory.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialNIHNCIDivDeptIdentifier.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialNIHNCIProgramIdentifier.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialSearchButton.isDisplayed()).to.eventually.equal(true);
        //expect(paSearch.searchTrialClearButton.isDisplayed()).to.eventually.equal(true);
    };


    /*****************************************
     * Click first link from the result grid
     *****************************************/
    this.clickGridFirstLink = function (row, col) {
        //var gridFirstCell = element.all(by.binding('grid.getCellValue(row, col)')).count();
        element.all(by.binding('grid.getCellValue(row, col)')).getText().then(function (value) {
            var rsltGrid = value;
            console.log('rsltGrid[' + rsltGrid + '');
            function RetrsltCnt() {
                return rsltGrid;
            }

            rsltGridValRT = RetrsltCnt();

        });
    };

    this.girdFirstValue = function () {
        console.log('rsltGridValRT[' + rsltGridValRT + '');
        var splitGridColVal = rsltGridValRT.split(',');
        var rwClFstVal = splitGridColVal[0];
        console.log('rwClFstVal[' + rwClFstVal + '');
    };

    /*****************************************
     * Multi Select Common Methods
     *****************************************/
    this.selectMultiListItem = function (obj, selectList, index) {
        if (selectList !== '') {
            helper.wait(obj.get(index), 'Multi-Select list');
            obj.get(index).click();
            helper.wait(element(by.linkText(selectList)), 'Select an option from the list as -- ' + selectList + '');
            element(by.linkText(selectList)).click();
        }
    };

    /*****************************************
     * Click on the link Text
     *****************************************/
    this.clickLinkText = function (lnkTxt) {
        element(by.linkText('' + lnkTxt + '')).click();
    };


    /*****************************************
     * Verify Text from a Index Object
     *****************************************/
    this.verifyTxtByIndex = function (obj, verifyTxt, index, errorMessage) {
        if (verifyTxt !== '') {
            helper.wait(obj.get(index), 'Waiting for expected text to verify');
            expect(obj.get(index).getText()).to.eventually.equal(verifyTxt);
            console.log(errorMessage + " - Required field value");
        }
    };

    /*****************************************
     * Verify Search Result Text
     *****************************************/
    this.verifyPASearchResultCount = function (txtToVerify) {
        paSearch.trialSearchPageResultCount.getText().then(function (value) {
            var rsltCnt = value;
            console.log('rsltCnt[' + rsltCnt + '');
            function RetrsltCnt() {
                return rsltCnt;
            }

            rsltCountValRT = RetrsltCnt();
            var spltValRsltCnt = rsltCountValRT.split(':');
            var rsltCntTxt = spltValRsltCnt[0];
            console.log('rsltCntTxt[' + rsltCntTxt + '');
            var rsltCntInt = spltValRsltCnt[1];
            console.log('rsltCntInt[' + rsltCntInt + '');
            var buildRsltCntStrng = '' + txtToVerify + ':' + rsltCntInt + '';
            console.log('buildRsltCntStrng[' + buildRsltCntStrng + '');
            expect(paSearch.trialSearchPageResultCount.getText()).to.eventually.equal(buildRsltCntStrng);
        });
    };

    /*****************************************
     * Check for the various File API support.
     *****************************************/
    this.checkFileAPI = function () {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            reader = new FileReader();
            return true;
        } else {
            alert('The File APIs are not fully supported, Fallback required.');
            return false;
        }
    };

    /*****************************************
     * read text input
     *****************************************/
    this.readText = function (filePath) {
        var output = "";
        if (filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                output = e.target.result;
                returnContents(output);
                return output;
            };
            reader.readAsText(filePath.files[0]);
        }
        else if (ActiveXObject && filePath) {
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                var file = reader.OpenTextFile(filePath, 1);
                output = file.ReadAll();
                file.Close();
                returnContents(output);
                return output;
            } catch (e) {
                if (e.number == -2146827859) {
                    alert('Unable to access local files due to browser security settings');
                }
            }
        }
        else {
            return false;
        }
        return true;
    };

    /*****************************************
     * Return Content or Text
     *****************************************/
    function returnContents(txt) {
        return txt;
    };

    /*****************************************
     * On Prepare Login Test Accept
     *****************************************/
    this.onPrepareLoginTest_backup = function(usrID) {
        var configurationFile;
        console.log('file path'+testConfiguration);
        configurationFile = ''+testConfiguration+'/testSettings.json';
        var configuration = JSON.parse(
            fs.readFileSync(configurationFile)
        );
        console.log(configuration.uiUrl);
        console.log(configuration.abstractorUID);
        console.log(configuration.abstractorPWD);
        console.log(configuration.curatorUID);
        console.log(configuration.curatorPWD);
        console.log(configuration.trialSubmitterUID);
        console.log(configuration.trialSubmitterPWD);
        login.logoutButton.isDisplayed().then(function (result) {
            if (result) {
                element(by.binding('headerView.username')).getText().then(function (value) {
                    if (value === usrID) {
                        console.log(usrID + ' already logged in');
                        element(by.css('a[href="#/main/welcome"]')).click();
                        helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
                    }else {
                        element(by.css('a[ng-click="headerView.logOut()"]')).click();
                        helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
                        //ctrp abstractor user
                        if (usrID === 'ctrpabstractor'){
                            login.login(configuration.abstractorUID, configuration.abstractorPWD);
                            login.accept();
                            //helper.wait_for(5000);
                            expect(abstractPageMenu.homeSearchTrials.isDisplayed()).to.eventually.equal(true);
                            expect(abstractPageMenu.homeAbstractionDashboards.isDisplayed()).to.eventually.equal(true);
                        }
                        //ctrp curator user
                        else if (usrID === 'ctrpcurator'){
                            login.login(configuration.curatorUID, configuration.curatorPWD);
                            login.accept();
                            //  helper.wait_for(5000);
                            expect(poHome.homeEnterOrganizations.isDisplayed()).to.eventually.equal(true);
                        }
                        //ctrp trial submitter user
                        else if (usrID === 'ctrptrialsubmitter'){
                            login.login(configuration.trialSubmitterUID, configuration.trialSubmitterPWD);
                            login.accept();
                            //helper.wait_for(5000);
                            expect(trialHome.homeRegisterTrial.isDisplayed()).to.eventually.equal(true);
                        }
                        //ctrp trial submitter user
                        else if (usrID === 'ctrptrialsubmitter2'){
                            login.login(configuration.trialSubmitter2UID, configuration.trialSubmitter2PWD);
                            login.accept();
                            // helper.wait_for(5000);
                            expect(trialHome.homeRegisterTrial.isDisplayed()).to.eventually.equal(true);
                        }
                        else {
                            assert.fail(0,1,'Given User Id ---- '+ usrID + ' ---- does not match any option. Please check that provided user exist in the function.');
                        }
                    }
                });
            } else {
                //ctrp abstractor user
                if (usrID === 'ctrpabstractor'){
                    login.login(configuration.abstractorUID, configuration.abstractorPWD);
                    login.accept();
                    //helper.wait_for(5000);
                    expect(abstractPageMenu.homeSearchTrials.isDisplayed()).to.eventually.equal(true);
                    expect(abstractPageMenu.homeAbstractionDashboards.isDisplayed()).to.eventually.equal(true);
                }
                //ctrp curator user
                else if (usrID === 'ctrpcurator'){
                    login.login(configuration.curatorUID, configuration.curatorPWD);
                    login.accept();
                    //  helper.wait_for(5000);
                    expect(poHome.homeEnterOrganizations.isDisplayed()).to.eventually.equal(true);
                }
                //ctrp trial submitter user
                else if (usrID === 'ctrptrialsubmitter'){
                    login.login(configuration.trialSubmitterUID, configuration.trialSubmitterPWD);
                    login.accept();
                    //helper.wait_for(5000);
                    expect(trialHome.homeRegisterTrial.isDisplayed()).to.eventually.equal(true);
                }
                //ctrp trial submitter user
                else if (usrID === 'ctrptrialsubmitter2'){
                    login.login(configuration.trialSubmitter2UID, configuration.trialSubmitter2PWD);
                    login.accept();
                    // helper.wait_for(5000);
                    expect(trialHome.homeRegisterTrial.isDisplayed()).to.eventually.equal(true);
                }
                else {
                    assert.fail(0,1,'Given User Id ---- '+ usrID + ' ---- does not match any option. Please check that provided user exist in the function.');
                }
            }
        });
    };

    /*****************************************
     * On Prepare Login Test Accept
     *****************************************/
    this.onPrepareLoginTest = function(usrID) {
       var configurationFile;
        console.log('file path'+testConfiguration);
        configurationFile = ''+testConfiguration+'/testSettings.json';
        var configuration = JSON.parse(
            fs.readFileSync(configurationFile)
        );
        console.log(configuration.uiUrl);
        console.log(configuration.abstractorUID);
        console.log(configuration.abstractorPWD);
        console.log(configuration.curatorUID);
        console.log(configuration.curatorPWD);
        console.log(configuration.trialSubmitterUID);
        console.log(configuration.trialSubmitterPWD);
        //ctrp abstractor user
        if (usrID === 'ctrpabstractor'){
            login.login(configuration.abstractorUID, configuration.abstractorPWD);
            login.accept();
            //expect(abstractPageMenu.homeSearchTrials.isDisplayed()).to.eventually.equal(true);
            //expect(abstractPageMenu.homeAbstractionDashboards.isDisplayed()).to.eventually.equal(true);
        }
        //ctrp curator user
        else if (usrID === 'ctrpcurator'){
            login.login(configuration.curatorUID, configuration.curatorPWD);
            login.accept();
          //  expect(poHome.homeEnterOrganizations.isDisplayed()).to.eventually.equal(true);//
        }
        //ctrp trial submitter user
        else if (usrID === 'ctrptrialsubmitter'){
            login.login(configuration.trialSubmitterUID, configuration.trialSubmitterPWD);
            login.accept();
         //   expect(trialHome.homeRegisterTrial.isDisplayed()).to.eventually.equal(true);
        }
        //ctrp trial submitter user
        else if (usrID === 'ctrptrialsubmitter2'){
            login.login(configuration.trialSubmitter2UID, configuration.trialSubmitter2PWD);
            login.accept();
          //  expect(trialHome.homeRegisterTrial.isDisplayed()).to.eventually.equal(true);
        }
        else {
            assert.fail(0,1,'Given User Id ---- '+ usrID + ' ---- does not match any option. Please check that provided user exist in the function.');
        }
    };

    /*****************************************
     * On Prepare Login Test Reject
     *****************************************/
    this.onPrepareLoginReject = function(usrID) {
        var configurationFile;
        console.log('file path'+testConfiguration);
        configurationFile = ''+testConfiguration+'/testSettings.json';
        var configuration = JSON.parse(
            fs.readFileSync(configurationFile)
        );
        console.log(configuration.uiUrl);
        console.log(configuration.abstractorUID);
        console.log(configuration.abstractorPWD);
        console.log(configuration.curatorUID);
        console.log(configuration.curatorPWD);
        console.log(configuration.trialSubmitterUID);
        console.log(configuration.trialSubmitterPWD);

        browser.get(configuration.uiUrl);
        //ctrp abstractor user
        if (usrID === 'ctrpabstractor'){
            login.login(configuration.abstractorUID, configuration.abstractorPWD);
            login.reject();
            helper.wait_for(5000);
            expect(abstractPageMenu.homeSearchTrials.isDisplayed()).to.eventually.equal(false);
            expect(abstractPageMenu.homeAbstractionDashboards.isDisplayed()).to.eventually.equal(false);
        }
        //ctrp curator user
        if (usrID === 'ctrpcurator'){
            login.login(configuration.curatorUID, configuration.curatorPWD);
            login.reject();
            helper.wait_for(5000);
            expect(poHome.homeEnterOrganizations.isDisplayed()).to.eventually.equal(false);
        }
        //ctrp trial submitter user
        if (usrID === 'ctrptrialsubmitter'){
            login.login(configuration.trialSubmitterUID, configuration.trialSubmitterPWD);
            login.reject();
            helper.wait_for(5000);
            expect(trialHome.homeRegisterTrial.isDisplayed()).to.eventually.equal(false);
        }

    };

    /*****************************************
     * Admin Checkout
     *****************************************/
    this.adminCheckOut = function (){
        nciSpecific.nciSpecificAdminCheckIn.isDisplayed().then(function(result) {
            if (result) {
                nciSpecific.nciSpecificAdminCheckIn.getText().then(function(value)   {
                    if (value === 'Admin Check In') {
                        console.log('Trial has been already checked out');
                    }
                });
            } else {
                nciSpecific.clickAdminCheckOut();
            }
        });
    };

    /***************************************** 
     * Alert Ok 
     *****************************************/
    this.alertMsgOK = function(){
        browser.switchTo().alert().then(
            function (alert) { alert.accept(); },
            function (err) { }
        );
    };

    /***************************************** 
     * Alert Cancel
     *****************************************/
    this.alertMsgCancel = function(){
        browser.switchTo().alert().then(
            function (alert) { alert.dismiss(); },
            function (err) { }
        );
    };

    /*****************************************
     * Wait for element
     *****************************************/
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

    this.elementIsPresent = function (element){
        var cnt = 1000;
        var getLoopState = false;
        loopBr1:
        for (var i = 0;i<cnt;i++){
            element.isPresent().then(function (getState){
                var pasVal = ''+getState+'';
                function retVal(){
                    return pasVal;
                }
                getLoopState = retVal();
                console.log('Element is Present Status:['+i+'] - ['+getLoopState+']');
            });
            if (getLoopState === true){
                break loopBr1;
            }
        }
    };

    this.elementIsPresentA = function (element){
        var i =0;
        var getLoopState = false;
        do{
            element.isPresent().then(function (getState){
                var pasVal = ''+getState+'';
                function retVal(){
                    return pasVal;
                }
                getLoopState = retVal();
                console.log('Element is Present Status ['+getLoopState+']');
            });
            if (getLoopState === true){break;}
            i++
        } while (i <= 1000);
    };

    /*****************************************
     * Verify expected value : Text Box
     *****************************************/
    this.verifyValueFromTextBox = function(obj, expectedValue, errorMessage){
        self.wait(obj, errorMessage);
        expect(obj.getAttribute('value')).to.eventually.equal(expectedValue);
        obj.isDisplayed().then(function(result) {
            if (result) {
                obj.getAttribute('value').then(function(value){
                    if (value === expectedValue){
                        console.log('Expected value from text box: '+ value +'');
                    } else {
                        throw new Error('Expected assertion: (' + expectedValue + ') has no match with Actual value: (' + value + ')');
                    }
                })
            }
        });
        //helper.getVerifyValue(obj, expectedValue, "Funding Source Organization field");
    };

    /*****************************************
     * Verify expected value : Radio Button
     *****************************************/
    this.verifyIndicator = function(getObject ,getIndicator, result)  {
        expect(getObject.get(getIndicator).isSelected()).to.eventually.equal(result);
    };

    this.getVerifyValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.getAttribute('value')).to.eventually.equal(fieldValue);
        console.log(errorMessage + " - Got value");
    };

    /***************************************
     * Set Comment on Deletion button popup
     ***************************************/
    this.clickCommentDeleteButton = function (button, commitOrCancelComment, errorMessage){
        helper.wait(button, errorMessage);
        button.click();
        console.log(errorMessage + " was clicked");
        helper.wait_for(9000);
        trialDocCommon.setCommentOnDeletion();
        if (commitOrCancelComment === 'commit'){
            trialDocCommon.clickCommitCommentButton();
        } else if(commitOrCancelComment === 'cancel'){
            trialDocCommon.clickCancelCommentButton();
        }
        if (errorMessage === exp_del_bttn_pg_hdr){
            console.log("Page header does not exists on the popup dialog box");
        } else {
            //Do nothing
        }
    };

};

module.exports = abstractionCommonMethods;
