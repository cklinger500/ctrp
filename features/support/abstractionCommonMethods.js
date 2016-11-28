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


var abstractionCommonMethods = function(){
    /*******
     * Methods Description: Abstraction common helper methods
     *
     *
     *******/
    var login = new loginPage();
    var helper = new helperFunctions();
    var reader;

    /*****************************************
     * Check for the various File API support.
     *****************************************/
    this.checkFileAPI = function() {
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
    this.readText = function(filePath) {
        var output = ""; //placeholder for text output
        if(filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                output = e.target.result;
                returnContents(output);
                return output;
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }
        else if(ActiveXObject && filePath) {
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

        browser.get(configuration.uiUrl);
        //ctrp abstractor user
        if (usrID === 'ctrpabstractor'){
            login.login(configuration.abstractorUID, configuration.abstractorPWD);
            login.accept();
            helper.wait_for(5000);
        }
        //ctrp curator user
        if (usrID === 'ctrpcurator'){
            login.login(configuration.curatorUID, configuration.curatorPWD);
            login.accept();
            helper.wait_for(5000);
        }
        //ctrp trial submitter user
        if (usrID === 'ctrptrialsubmitter'){
            login.login(configuration.trialSubmitterUID, configuration.trialSubmitterPWD);
            login.accept();
            helper.wait_for(5000);
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
        }
        //ctrp curator user
        if (usrID === 'ctrpcurator'){
            login.login(configuration.curatorUID, configuration.curatorPWD);
            login.reject();
            helper.wait_for(5000);
        }
        //ctrp trial submitter user
        if (usrID === 'ctrptrialsubmitter'){
            login.login(configuration.trialSubmitterUID, configuration.trialSubmitterPWD);
            login.reject();
            helper.wait_for(5000);
        }

    }



};

module.exports = abstractionCommonMethods;
