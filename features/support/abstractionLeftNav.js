/**
 * Author: Shamim Ahmed
 * Date: 06/27/2016
 * Page Object: Abstraction Left Navigation Tree
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



var abstractionLeftNav = function(){

    var helper = new helperFunctions();
    var self = this;
    /***********************************************
     *  Top Menu
     ***********************************************/
    this.menuHome = element(by.css('a[href="#/main/welcome"]'));

    /************************************************************************
     *  Admin & Scientific Check Out and Check In and Back to Search Results
     ************************************************************************/

    this.adminCheckOutBtn = element(by.id('admin_checkout'));
    this.adminCheckInBtn = element(by.id('admin_checkin'));
    this.scientificCheckOutBtn = element(by.id('scientific_checkout'));
    this.scientificCheckInBtn = element(by.id('scientific_checkin'));
    this.backToSearchResultBtn = element(by.id('back_to_search'));

    /***********************************************
     *  Admin Data
     ***********************************************/

    this.adminDataGeneralTrial = element(by.css('a[ui-sref="main.pa.trialOverview.generalTrialDetails"]'));
    this.adminDataRegulatoryInfoFDA = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryFda"]'));
    this.adminDataRegulatoryInfoHumanSfty = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInfoHumanSafety"]'));
    this.adminDataRegulatoryInfoIND = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInd"]'));
    this.adminDataTrialStatus = element(by.css('a[ui-sref="main.pa.trialOverview.paTrialStatus"]'));
    this.adminDataTrialFunding = element(by.css('a[ui-sref="main.pa.trialOverview.funding"]'));
    this.adminDataCollaborators = element(by.css('a[ui-sref="main.pa.trialOverview.collaborators"]'));
    this.adminDataNciSpecific = element(by.css('a[ui-sref="main.pa.trialOverview.nciInfo"]'));
    this.adminDataTrialRelatedDocument = element(by.css('a[ui-sref="main.pa.trialOverview.paTrialRelatedDocs"]'));
    this.adminDataTrialParticipatingSite = element(by.css('a[ui-sref="main.pa.trialOverview.participatingSites"]'));

    /***********************************************
     *  Scientific Data
     ***********************************************/

    this.scientificTrialDesign = element(by.css('a[ui-sref="main.pa.trialOverview.trialDesign"]'));
    this.scientificTrialDescription = element(by.css('a[ui-sref="main.pa.trialOverview.trialDescription"]'));
    this.scientificInterventions = element(by.css('a[ui-sref="main.pa.trialOverview.intervention"]'));
    this.scientificArmsGroups = element(by.css('a[ui-sref="main.pa.trialOverview.armsGroups"]'));
    this.scientificEligibilityCriteria = element(by.css('a[ui-sref="main.pa.trialOverview.eligibilityCriteria"]'));
    this.scientificAssociatedTrials = element(by.css('a[ui-sref="main.pa.trialOverview.associatedTrials"]'));
    this.scientificDiseasesConditions = element(by.css('a[ui-sref="main.pa.trialOverview.disease"]'));
    this.scientificDataTable = element(by.css('a[ui-sref="main.pa.trialOverview.anatomicSites"]'));
    this.scientificOutcome = element(by.css('a[ui-sref="main.pa.trialOverview.trialOutcomeMeasures"]'));
    this.scientificSubGroups = element(by.css('a[ui-sref="main.pa.trialOverview.trialSubGroups"]'));
    this.scientificBiomarkers = element(by.css('a[ui-sref="main.pa.trialOverview.bioMarkers"]'));

    /***********************************************
     *  Complete
     ***********************************************/
    this.completeAbstractionValidation = element(by.linkText('Abstraction Validation'));
    this.completeResultsInformation = element(by.linkText('Results Information'));

    /***********************************************
     *  Panel Title
     ***********************************************/
    this.panelTitle = element.all(by.css('.panel-title'));


    //***********************************
    // Menu
    //***********************************

    this.clickHome = function(){
        helper.clickButton(this.menuHome, "Home Button");
    };

    //***********************************
    // Complete
    //***********************************

    this.clickCompleteAbstractionValidation = function(){
        helper.clickButton(this.completeAbstractionValidation, "Abstraction Validation Button");
    };
    this.clickCompleteResultsInformation = function(){
        helper.clickButton(this.completeResultsInformation, "Results Information Button");
    };

    //***********************************
    // Scientific Data
    //***********************************

    this.clickScientificTrialDesign = function(){
        helper.clickButton(this.scientificTrialDesign, "Trial Design Button");
    };
    this.clickScientificTrialDescription = function(){
        helper.clickButton(this.scientificTrialDescription, "Trial Description Button");
    };
    this.clickScientificInterventions = function(){
        helper.clickButton(this.scientificInterventions, "Interventions Button");
    };
    this.clickScientificArmsGroups = function(){
        helper.clickButton(this.scientificArmsGroups, "Arms Groups Button");
    };
    this.clickScientificEligibilityCriteria = function(){
        helper.clickButton(this.scientificEligibilityCriteria, "Eligibility Criteria Button");
    };
    this.clickScientificAssociatedTrials = function(){
        helper.clickButton(this.scientificAssociatedTrials, "Associated Trials Button");
    };
    this.clickScientificDiseasesConditions = function(){
        helper.clickButton(this.scientificDiseasesConditions, "Diseases Conditions Button");
    };
    this.clickScientificDataTable = function(){
        helper.clickButton(this.scientificDataTable, "Data Table Button");
    };
    this.clickScientificOutcome = function(){
        helper.clickButton(this.scientificOutcome, "Outcome Button");
    };
    this.clickScientificSubGroups = function(){
        helper.clickButton(this.scientificSubGroups, "Sub Groups Button");
    };
    this.clickScientificBiomarkers = function(){
        helper.clickButton(this.scientificBiomarkers, "Biomarkers Button");
    };

    //***********************************
    // Admin Data
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

    //Trial Related Document : Click Left Navigation Link
    this.clickAdminDataTrialRelatedDocument = function(){
        helper.clickButton(this.adminDataTrialRelatedDocument, "Trial Related Document Admin Data Button");
    };

    //Participating Sites : Click Left Navigation Link
    this.clickAdminDataParticipatingSites = function(){
        helper.clickButton(this.adminDataTrialParticipatingSite, "Participating Sites Admin Data Button");
    };

    /*****************************************
     * Panel Title
     *****************************************/
    this.checkPanelTitle = function (titleTXT, index){
        this.waitForElement(self.panelTitle.get(index), 'Waiting For Page title');
        self.panelTitle.get(index).isDisplayed().then(function(result) {
            if (result) {
                expect(self.panelTitle.get(index).getText()).to.eventually.equal(titleTXT);
            }
        });
    };

    /*****************************************
     * Admin Checkout
     *****************************************/
    this.adminCheckOut = function (){
        self.adminCheckInBtn.isDisplayed().then(function(result) {
            if (result) {
                self.adminCheckInBtn.getText().then(function(value)   {
                    if (value === 'Admin Check In') {
                        console.log('Trial has been already checked out');
                    }
                });
            } else {
                self.clickAdminCheckOutButton();
            }
        });
    };

    this.clickAdminCheckOutButton = function(){
        helper.clickButton(self.adminCheckOutBtn,"Admin Check Out - button");
    };

    /*****************************************
     * Scientific Checkout
     *****************************************/
    this.scientificCheckOut = function (){
        self.scientificCheckInBtn.isDisplayed().then(function(result) {
            if (result) {
                self.scientificCheckInBtn.getText().then(function(value)   {
                    if (value === 'Scientific Check In') {
                        console.log('Trial has been already checked out');
                    }
                });
            } else {
                self.clickScintificCheckOutButton();
            }
        });
    };

    this.clickScintificCheckOutButton = function(){
        helper.clickButton(self.scientificCheckOutBtn,"Scientific Check Out - button");
    };

    this.clickBackToSearchResults = function(){
        helper.clickButton(this.backToSearchResultBtn, "Back to Trial Search Results Screen - Button");
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

module.exports = abstractionLeftNav;
