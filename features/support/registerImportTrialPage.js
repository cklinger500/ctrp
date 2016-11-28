/**
 * Created by singhs10 on 4/28/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');

var importTrialPage = function() {

    this.addImportClinicalTrialID = element(by.model('importTrialView.searchParams.nct_id'));
    this.addImportSearchStudiesButton = element(by.css('button[ng-click="importTrialView.searchTrials()"]'));
    this.addImportTrialButton = element(by.css('button[ng-click="importTrialView.importTrial()"]'));
    this.addImportViewNCTIDInTbl = element(by.binding('importTrialView.nct_id'));
    this.addImportViewStatusInTbl = element(by.binding('importTrialView.status'));
    this.addImportViewTitleCondIntInTbl = element(by.binding('importTrialView.official_title'));

    var helper = new helperFunctions();

    this.setAddImportClinicalTrialID = function(clinicalTrialID)  {
        helper.setValue(this.addImportClinicalTrialID,clinicalTrialID,"Import Trial by Clinical Trial ID field");
    };

    this.clickAddImportSearchStudiesButton = function(){
        helper.clickButton(this.addImportSearchStudiesButton,"Import Trial Search Studies Add button");
    };

    this.clickAddImportTrialButton = function(){
        helper.clickButton(this.addImportTrialButton,"Import Trial Add button");
    };

    this.setAddTrialLeadProtocolIdentifier = function(trialLeadProtocolIdentifier)  {
        helper.setValue(this.addTrialLeadProtocolIdentifier,trialLeadProtocolIdentifier,"Add Trial by Lead Protocol Identifier field");
    };

    this.setAddTrialLeadProtocolIdentifier = function(trialLeadProtocolIdentifier)  {
        helper.setValue(this.addTrialLeadProtocolIdentifier,trialLeadProtocolIdentifier,"Add Trial by Lead Protocol Identifier field");
    };
};

module.exports = importTrialPage;