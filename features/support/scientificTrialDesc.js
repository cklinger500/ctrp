/**
 * Author: Shamim Ahmed
 * Date: 06/26/2016
 * Page Object: Scientific Trial Description
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');
var should = chai.should();
var helperFunctions = require('../support/helper');
var addTrialPage = require('../support/registerTrialPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var scientificTrialDesc = function(){

    var commonFunctions = new abstractionCommonMethods();
    var dateFunctions = new addTrialPage();
    var helper = new helperFunctions();
    var self = this;

    /***********************************
     * Trial Description object(s)
     ***********************************/

    this.briefTitleTxt = element(by.id('brief_title'));
    this.briefSummaryTxt = element(by.id('brief_summary'));
    this.objectivesTxt = element(by.id('objective'));
    this.detailedDescriptionTxt = element(by.id('detailed_description'));

    this.briefTitleLbl = element.all(by.css('label[for="brief_title"]'));
    this.briefSummaryLbl = element(by.css('label[for="brief_title"]'));
    this.objecttivesLbl = element(by.css('label[for="objectives"]'));
    this.detailedDescriptionLbl = element(by.css('label[for="detailed_description"]'));

    this.characterLeftLbl = element.all(by.css('.help-block.ng-binding'));
    this.requiredMsg = element.all(by.css('.help-block.ng-scope'));

    this.saveDesc = element(by.id('submit_processing'));
    this.resetDesc = element(by.id('reset_desc'));

    this.setBriefTitleTxt = function(getBriefTitleTxt){
        helper.setValue(this.briefTitleTxt, getBriefTitleTxt, 'Brief Title');
        helper.wait_for(100);
    };

    this.setBriefSummaryTxt = function(getBriefSummaryTxt){
        helper.setValue(this.briefSummaryTxt, getBriefSummaryTxt, 'Brief Summary');
        helper.wait_for(100);
    };

    this.setObjectivesTxt = function(getObjectivesTxt){
        helper.setValue(this.objectivesTxt, getObjectivesTxt, 'Objectives');
        helper.wait_for(100);
    };

    this.setDetailedDescriptionTxt = function(getDetailedDescriptionTxt){
        helper.setValue(this.detailedDescriptionTxt, getDetailedDescriptionTxt, 'Detailed Description');
        helper.wait_for(100);
    };

    this.verifyTrialDescLables = function (){
        var lbl = new Array("Brief Title:", "Brief Summary:", "Objectives:", "Detailed Description:");
        commonFunctions.verifyTxtByIndex(self.briefTitleLbl, lbl[0], '0', 'Brief Title');
        commonFunctions.verifyTxtByIndex(self.briefTitleLbl, lbl[1], '1', 'Brief Summary');
        helper.getVerifyLabel(this.objecttivesLbl, lbl[2], "Objectives");
        helper.getVerifyLabel(this.detailedDescriptionLbl, lbl[3], "Detailed Description");
    };

    this.verifyCharLeft = function(charLeft, index){
        this.waitForElement(self.characterLeftLbl.get(index), 'Waiting For Page title');
        self.characterLeftLbl.get(index).isDisplayed().then(function(result) {
            if (result) {
                expect(self.characterLeftLbl.get(index).getText()).to.eventually.equal(charLeft);
            }
        });
    };

    //Save and Reset

    this.clickSave = function(){
        helper.clickButton(this.saveDesc, "Trial Status Save - Button");
        helper.wait_for(300);
    };

    this.clickReset = function(){
        helper.clickButton(self.resetDesc, "Trial Status Reset - Button");
    };

    this.clickBackToSearchResults = function(){
        helper.clickButton(this.trialStatusBackToSearchResultBtn, "Back to Trial Search Results Screen - Button");
    };
};

module.exports = scientificTrialDesc;
