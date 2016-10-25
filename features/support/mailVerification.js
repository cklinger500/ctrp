/**
 * Created by singhs10 on 4/7/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var should = chai.should();
var helperFunctions = require('../support/helper');
var fs = require('fs');
var testConfiguration = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testConfig/';

var mailVerificationfunction = function() {

    this.gmailEmailField = by.id('Email');
    this.gmailNextButtonafterEmail = by.id('next');
    this.gmailPasswordField = by.id('Passwd');
    this.gmailSignInButton = by.id('signIn');
    this.gmailStaySignedIn = by.id('PersistentCookie');

    this.gmailSignInUser = by.xpath('//*[@id="gb"]/div[1]/div[1]/div[1]/div/span');
    this.gmailSearchField = by.id('gbqfq');
    this.gmailSearchEmailButton = by.xpath('//*[@id="gbqfb"]');
    this.gmailclickfirstEmail = by.xpath('//div[5]/div/div/table/tbody/tr[1]');
    this.gmailEntireEmailText = by.xpath('//*[@id=":7z"]/div[1]/div[2]');
    this.gmailEmailBody = By.className("a3s");
    this.gmailVerifySuccessLoginWithPrimaryTab = by.xpath('//*[@id=":2z"]/div[5]');
    var helper = new helperFunctions();
    var self = this;

    var configurationFile;
    console.log('file path'+testConfiguration);
    configurationFile = ''+testConfiguration+'/testSettings.json';
    var configuration = JSON.parse(
        fs.readFileSync(configurationFile)
    );

    /***
     *
     * @param gmailURL
     * @param gmailEmailID
     * @param gmailEmailToBeSearched
     * @param textOfEmailToBeVerified
     * @param callback
     */
       this.gmailMailVerification = function (gmailURL, gmailEmailID, gmailEmailToBeSearched, textOfEmailToBeVerified, callback) {
        console.log(configuration.trialSubmitterEmail);
        console.log(configuration.trialSubmitterEmailPwd);
        browser.driver.get(gmailURL);
        if (gmailEmailID === 'ctrptrialsubmitter@gmail.com'){
            self.gmailLogin(gmailURL, gmailEmailID, configuration.trialSubmitterEmailFirstName, configuration.trialSubmitterEmailPwd);
        }
        browser.driver.isElementPresent(this.gmailVerifySuccessLoginWithPrimaryTab).then(function (state) {
            if (state === true) {
                return  console.log('Gmail Login successful');}
            else {
                callback(new Error('Gmail Login unsuccessful'));
            }

        });
        helper.setValueNonAngularPage(this.gmailSearchField, gmailEmailToBeSearched, 'Search field');
           browser.sleep(5000);
        helper.clickButtonNonAngularPage(this.gmailSearchEmailButton, 'Search Email button');
           browser.sleep(5000);
           browser.driver.isElementPresent(this.gmailclickfirstEmail).then(function (state) {
               if (state === true) {
                   helper.clickButtonNonAngularPage(self.gmailclickfirstEmail, 'First Email');
                   browser.sleep(5000);
               }
               else {
                   callback(new Error('Gmail Email not present'));
               }

           });
     //   helper.clickButtonNonAngularPage(this.gmailclickfirstEmail, 'First Email');
           if(textOfEmailToBeVerified !== '') {
               browser.driver.findElement(this.gmailEmailBody).getText().then(function (value) {
                   console.log('value of email body without send information:\n' + value + '\n');
                   expect(value).to.equal(textOfEmailToBeVerified);
               });
           }
    };

    this.gmailLogin = function (gmailURL,gmailEmailID, userName, password){
        browser.driver.isElementPresent(this.gmailVerifySuccessLoginWithPrimaryTab).then(function(result) {
            if (result) {
                //Whatever if it is true (displayed)
                browser.driver.findElement(self.gmailSignInUser).getText().then(function(value)   {
                    console.log('Logged in User Name is : ' + value);
                    if (value === userName) {
                        console.log(userName + ' already logged in');
                    }
                    else {
                        browser.driver.get('https://accounts.google.com/logout');
                        browser.driver.get(gmailURL);
                        helper.setValueNonAngularPage(self.gmailEmailField, gmailEmailID, 'Email field on Sign In Page');
                        helper.clickButtonNonAngularPage(self.gmailNextButtonafterEmail, 'Next button on Email Sign In Page');
                        helper.setValueNonAngularPage(self.gmailPasswordField, password, 'Password field ');
                        browser.driver.findElement(self.gmailStaySignedIn).isSelected().then (function(value) {
                            console.log('value of Stay Signed In Button : ' + value);
                            if (value) {
                                helper.clickButtonNonAngularPage(self.gmailStaySignedIn, 'Stay Signed In Button');
                            }
                        });
                        helper.clickButtonNonAngularPage(self.gmailSignInButton, 'Sign In Button');
                    }
                });
            } else {
                helper.setValueNonAngularPage(self.gmailEmailField,gmailEmailID, 'Email field on Sign In Page');
                helper.clickButtonNonAngularPage(self.gmailNextButtonafterEmail, 'Next button on Email Sign In Page');
                helper.setValueNonAngularPage(self.gmailPasswordField, password,'Password field ');
                browser.driver.findElement(self.gmailStaySignedIn).isSelected().then (function(value) {
                    console.log('value of Stay Signed In Button : ' + value);
                    if (value) {
                        helper.clickButtonNonAngularPage(self.gmailStaySignedIn, 'Stay Signed In Button');
                    }
                });
                helper.clickButtonNonAngularPage(self.gmailSignInButton, 'Sign In Button');
            }
        });
    };


    this.getLastEmail1 = function getLastEmail() {
        var deferred = protractor.promise.defer();
        console.log("Waiting for an email...");

        mailListener1.on("mail", function(mail){
            deferred.fulfill(mail);
        });
        return deferred.promise;
    }

};
module.exports = mailVerificationfunction;