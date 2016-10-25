/**
 * Created by singhs10 on 11/5/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var trialCommonBar = function(){

    var homeSearchTrial = element(by.css('a[href="#/main/trials"]'));
    this.homeRegisterTrial = element(by.css('a[href="#/main/new-trial/nat"]'));
    this.mainTrialsLink = element(by.linkText('Trials')) ;
    this.searchTrialLink = element(by.linkText('Search Trials'));
    this.registerTrialLink = element(by.linkText('Register Trial'));
    this.registerNationalTrial = element(by.css('a[href="#/main/new-trial/nat"]'));//by.linkText('National')
    this.registerExternallyPeerReviewedTrial = element(by.css('a[href="#/main/new-trial/epr"]'));
    this.registerInstitutional = element(by.css('a[href="#/main/new-trial/ins"]'));
    this.pageHeaderTextTrial = element(by.css('div.row > h4'));
    this.pageHeaderText = element(by.css('div.row > h4'));

    var helper = new helperFunctions();
    this.search_Trial_Header_Text = 'Search Trials * for wild card';
    this.register_Trial_Header_Text = 'Register Trial';
    this.register_Import_Trial_Header_Text = 'Import ClinicalTrials.gov Trials';

    var self = this;

    this.clickHomeSearchTrial = function(){
        homeSearchTrial.isPresent().then(function(retVal){
            console.log('value of ret val : ' + retVal);
            if (retVal === true) {
                homeSearchTrial.isDisplayed().then(function(state){
                    if(state) {
                        helper.clickLink(homeSearchTrial, "Home Search Trial link");
                        expect(self.pageHeaderText.getText()).to.eventually.equal(self.search_Trial_Header_Text);
                    }
                    else {
                        console.log('Home link not Displayed');
                    }
                });
            }
        });
    };


    this.clickHomeRegisterTrial = function(){
        helper.clickLink(this.homeRegisterTrial, "Home Register Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(this.register_Trial_Header_Text);
    };

    this.clickTrials = function(){
        helper.clickLink(this.mainTrialsLink, "Trial link");
    };

    this.clickListSearchTrialLink = function(){
        helper.clickLink(this.searchTrialLink, "Search Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(this.search_Trial_Header_Text);
    };

    this.clickRegisterTrialLink = function(){
        helper.clickLink(this.registerTrialLink, "Register Trial link");
    };

    this.clickRegisterNationalTrialLink = function(){
        browser.get('ui/#/main/new-trial/nat');
      //  http://ctrp-ci.nci.nih.gov/ctrp/ui/#/main/new_trial/NAT
      //  element(by.linkText('Register Trial')).sendKeys(protractor.Key.RIGHT);
      ////  browser.actions().mouseMove(element(by.linkText('Search Trials')).find()).perform();
      //  browser.sleep(10000);
      //  //browser.driver.actions().
      //  element(by.css('a[href="#/main/new_trial/NAT"]')).click();//.then(function(elm){
      //    //  elm[0].click();
      // // });
     //   helper.clickLink(this.registerNationalTrial, "Register National Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(this.register_Trial_Header_Text);
    };

    this.clickRegisterExternallyPeerReviewedTrialLink = function(){
        browser.get('ui/#/main/new-trial/epr');
       // helper.clickLink(this.registerExternallyPeerReviewedTrial, "Register Externally Peer Reviewed Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(this.register_Trial_Header_Text);
    };

    this.clickRegisterInstitutionalTrialLink = function(){
        browser.get('ui/#/main/new-trial/ins');
       // helper.clickLink(this.registerInstitutional, "Register Institutional Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(this.register_Trial_Header_Text);
    };

    this.clickRegisterIndustrialOtherTrialLink = function(){
        browser.get('ui/#/main/import-trial');
        expect(this.pageHeaderText.getText()).to.eventually.equal(this.register_Import_Trial_Header_Text);
    };

    this.verifyRegisterTrial = function(){
        expect(this.pageHeaderText.getText()).to.eventually.equal(this.register_Trial_Header_Text);
    };

};

module.exports = trialCommonBar;
