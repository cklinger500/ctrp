/**
 * Author: Shamim Ahmed
 * Date: 06/27/2016
 * Feature: PAS F01 Add and Edit Trial Descriptions.Feature
 *
 * Note: In the PAA search screen it has dependency on the seeded data
 */

//Common dependencies
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require('moment');

//Required dependencies
//Login dependencies
var loginPage = require('../support/LoginPage');
//helper methods
var helperMethods = require('../support/helper');
//Project Related methods dependencies
var projectFunctionMethods = require('../support/projectMethods');
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
//Regulatory Information - Human Subject Safety
var abstractionRegulatoryHuman = require('../support/abstractionRegulatoryHuman');
//Trial Related Document
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
//Left Navigation
var abstractionLeftNavigationMenus = require('../support/abstractionLeftNav');
//Scientific trial description
var scientificTrialDesc = require('../support/scientificTrialDesc');
var projectFunctionsPage = require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var trialMenuItemList = require('../support/trialCommonBar');
var registryMessagePage = require('../support/RegistryMessage');


module.exports = function () {

    var login = new loginPage();
    var helper = new helperMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var leftNav = new abstractionLeftNavigationMenus();
    var trialDesc = new scientificTrialDesc();
    var registryMessage = new registryMessagePage();
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();

    var leadProtocolID = 'CTRP_01_1789';
    var pageTtitle = 'Trial Descriptions';
    var briefSummary = 'Test Brief Summary';
    var objectives = 'Test Objectives';
    var detailedDescription = 'Test Detailed Description';
    var briefTitle = 'Test Brief Title Multi-Dose Phase II Trial of Rosuvastatin to Lower Circulating Tissue Factor Bearing Microparticles in Metastatic Breast Cancer title';
    var charLftStr = 'Test Brief Title Multi-Dose Phase II Trial of Rosuvastatin to Lower Circulating Tissue Factor verify';
    var decrCharLft = '4982 characters left';
    var decrCharLftObjective = '31985 characters left';
    var decrCharLftObjectiveA = '31800 characters left';
    var decrCharLftDetail = '31975 characters left';
    var decrCharLftDetailA = '31800 characters left';
    var noCharLft = '0 characters left';
    var errorMSGBT = 'Brief Title is Required';
    var errorMSGBS = 'Summary is Required';

    /*
     Scenario: #1 I can add and edit Trial Description for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     And I have entered a value for Brief Title
     And I have entered a value for Brief Summary
     And I have entered a value for Objectives
     And I have entered a value for Detailed Description
     When I select the Save button
     Then the Trial Description for the trial will be associated with the trial
     And the message Record Updated displays
     */

    this.Given(/^I have selected a trial$/, function () {
        return browser.sleep(25).then(function () {
            pageMenu.clickSearchTrialAbstractor();
            login.clickWriteMode('On');
            pageMenu.clickTrials();
            pageMenu.clickSearchTrialsPA();
            helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.clickLinkText(leadProtocolID);
            leftNav.scientificCheckOut();
        });
    });

    this.Given(/^I am on the Trial Description screen$/, function () {
        return browser.sleep(25).then(function () {
            leftNav.clickScientificTrialDescription();
            leftNav.checkPanelTitle(pageTtitle, '6');
        });
    });

    this.Given(/^I have entered a value for Brief Title$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setBriefTitleTxt(briefTitle);
        });
    });

    this.Given(/^I have entered a value for Brief Summary$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setBriefSummaryTxt(briefSummary);
        });
    });

    this.Given(/^I have entered a value for Objectives$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setObjectivesTxt(objectives);
        });
    });

    this.Given(/^I have entered a value for Detailed Description$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setDetailedDescriptionTxt(detailedDescription);
        });
    });

    this.When(/^I select the Save button$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.clickSave();
        });
    });

    this.Then(/^the Trial Description for the trial will be associated with the trial$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.verifyTrialDescLables();
            commonFunctions.verifyValueFromTextBox(trialDesc.briefTitleTxt, briefTitle, 'Verifying Brief Title');
            commonFunctions.verifyValueFromTextBox(trialDesc.briefSummaryTxt, briefSummary, 'Verifying Brief Summary');
            commonFunctions.verifyValueFromTextBox(trialDesc.objectivesTxt, objectives, 'Verifying Objectives');
            commonFunctions.verifyValueFromTextBox(trialDesc.detailedDescriptionTxt, detailedDescription, 'Verifying Detailed Description');
        });
    });

    this.Then(/^the message Record Updated displays$/, function () {
        return browser.sleep(25).then(function () {
            console.log('Out of scope: Toaster message');
        });
    });

    /*
     Scenario: #2 Brief Title is not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial with a Information Source is 'Protocol'
     And I am on the Trial Description screen
     And information text appears above the Brief Title field as 'Mandatory at Abstraction Validation'
     When Brief Title is null
     And I select the Save button
     Then an error message will appear with the message “Brief Title is Required”
     */

    this.Given(/^I have selected a trial with a Information Source is 'Protocol'$/, function () {
        return browser.sleep(25).then(function () {
            pageMenu.clickSearchTrialAbstractor();
            pageMenu.clickTrials();
            pageMenu.clickSearchTrialsPA();
            helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
            login.clickWriteMode('On');
            commonFunctions.verifySearchTrialsPAScreen();
            pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
            pageSearchTrail.clickSearchTrialSearchButton();
            commonFunctions.clickLinkText(leadProtocolID);
            leftNav.scientificCheckOut();
        })
    });

    this.Given(/^information text appears above the Brief Title field as 'Mandatory at Abstraction Validation'$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.verifyTrialDescLables();
        });
    });

    this.When(/^Brief Title is null$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setBriefTitleTxt('');
        });
    });

    this.Then(/^an error message will appear with the message “Brief Title is Required”$/, function () {
        return browser.sleep(25).then(function () {
            commonFunctions.verifyTxtByIndex(trialDesc.requiredMsg, errorMSGBT, '0', 'Verify Brief Title is Required');
            //login.logout();
            //commonFunctions.alertMsgOK();
        });
    });

    /*
     Scenario: #3 Brief Summary is not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial with a Information Source is 'Protocol'
     And I am on the Trial Description screen
     And information text appears above the Brief Summary field as 'Mandatory at Abstraction Validation'
     When Brief Summary is null
     And I select Save
     Then an error message will appear with the message “Summary is Required”
     */

    this.Given(/^information text appears above the Brief Summary field as 'Mandatory at Abstraction Validation'$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.verifyTrialDescLables();
        });
    });

    this.When(/^Brief Summary is null$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setBriefSummaryTxt('');
        });
    });

    this.Then(/^an error message will appear with the message “Summary is Required”$/, function () {
        return browser.sleep(25).then(function () {
            commonFunctions.verifyTxtByIndex(trialDesc.requiredMsg, errorMSGBS, '0', 'Verify Brief Summary is Required');
            //login.logout();
            //commonFunctions.alertMsgOK();
        });
    });

    /*
     Scenario:  #4 I can reset Trial Description screen for a Trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     When I have selected Reset
     Then the information entered or edited on the Trial Description screen will not be saved to the trial record
     And the screen will be refreshed with the data since the last save
     */

    this.Then(/^the information entered or edited on the Trial Description screen will not be saved to the trial record$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setBriefTitleTxt(briefTitle);
            trialDesc.setBriefSummaryTxt(briefSummary);
            trialDesc.setObjectivesTxt(objectives);
            trialDesc.setDetailedDescriptionTxt(detailedDescription);
            trialDesc.clickSave();
            trialDesc.setBriefTitleTxt('Reset ' + briefTitle + '');
            trialDesc.setBriefSummaryTxt('Reset ' + briefSummary + '');
            trialDesc.setObjectivesTxt('Reset ' + objectives + '');
            trialDesc.setDetailedDescriptionTxt('Reset ' + detailedDescription + '');
        });
    });

    this.When(/^I have selected Reset$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.clickReset();
            commonFunctions.alertMsgOK();
            leftNav.clickScientificTrialDesign();
            leftNav.clickScientificTrialDescription();
        });
    });

    this.Then(/^the screen will be refreshed with the data since the last save$/, function () {
        return browser.sleep(25).then(function () {
            commonFunctions.verifyValueFromTextBox(trialDesc.briefTitleTxt, briefTitle, 'Verifying Brief Title');
            commonFunctions.verifyValueFromTextBox(trialDesc.briefSummaryTxt, briefSummary, 'Verifying Brief Summary');
            commonFunctions.verifyValueFromTextBox(trialDesc.objectivesTxt, objectives, 'Verifying Objectives');
            commonFunctions.verifyValueFromTextBox(trialDesc.detailedDescriptionTxt, detailedDescription, 'Verifying Detailed Description');
            //login.logout();
            //commonFunctions.alertMsgOK();
        });
    });

    /*
     Scenario: #5  Brief Title field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     And I am entering into Brief Title
     Then information text appears below the Brief Title field will display the number of characters available to enter into the field
     |300 characters left|
     When 300 characters have been entered
     Then no additional text can be entered
     */

    this.Given(/^I am entering into Brief Title$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setBriefTitleTxt('');
        });
    });

    this.Then(/^information text appears below the Brief Title field will display the number of characters available to enter into the field$/, function (table) {
        return browser.sleep(25).then(function () {
            var characLft = table.raw();
            strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strCharacLft + ']');
            var strCharacLftSplt = strCharacLft.toString().split("\n");
            strCharacLftSpltA = strCharacLftSplt[0];
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftSpltA, '0', 'Verifying Brief Title field Character Left message');
        });
    });

    this.When(/^(\d+) characters have been entered$/, function (arg1) {
        return browser.sleep(25).then(function () {
            var charLftInt = '' + arg1 + ' characters left';
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, charLftInt, '0', 'Verifying Brief Title Character left initial message');
            var charLftText = '' + briefTitle + '' + briefTitle + '';
            trialDesc.setBriefTitleTxt(charLftText);
        });
    });

    this.Then(/^no additional text can be entered$/, function () {
        return browser.sleep(25).then(function () {
            login.loginUser.getText().then(function (loggedInUserName) {
                if (loggedInUserName === 'ctrptrialsubmitter') {
                    trialMenuItem.pageHeaderText.getText().then(function (pageTitle) {
                        if (pageTitle === trialMenuItem.register_Trial_Header_Text) {
                            addTrial.addTrialOfficialTitle.getAttribute('value').then(function (officialTitle) {
                                if (officialTitle !== '') {
                                    addTrial.addTrialOfficialTitle.clear();
                                    addTrial.addTrialOfficialTitle.sendKeys(registryMessage.sixHundredCharactersSample + 'Additional');
                                    expect(addTrial.addTrialOfficialTitle.getAttribute('value')).to.eventually.equal(registryMessage.sixHundredCharactersSample, 'Verification of Character after adding extra');
                                    expect(addTrial.addTrialOfficialTitleCharacter.getText()).to.eventually.equal(registryMessage.zeroCharactersLeft, 'Verification of Character Length for 0 characters');
                                }
                            });
                            addTrial.addTrialPrimaryPurposeOtherDescription.isPresent().then(function (statePresent) {
                                if (statePresent) {
                                    addTrial.addTrialPrimaryPurposeOtherDescription.isDisplayed().then(function (stateDisplayed) {
                                        if (stateDisplayed) {
                                            addTrial.addTrialPrimaryPurposeOtherDescription.getAttribute('value').then(function (primaryPurpose) {
                                                if (primaryPurpose !== '') {
                                                    addTrial.addTrialPrimaryPurposeOtherDescription.clear();
                                                    addTrial.addTrialPrimaryPurposeOtherDescription.sendKeys(registryMessage.twoHundredCharactersSample + 'Additional');
                                                    expect(addTrial.addTrialPrimaryPurposeOtherDescription.getAttribute('value')).to.eventually.equal(registryMessage.twoHundredCharactersSample, 'Verification of Character after adding extra');
                                                    expect(addTrial.addTrialPrimaryPurposeDescriptionCharacter.getText()).to.eventually.equal(registryMessage.zeroCharactersLeft, 'Verification of Character Length for 0 characters');
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                            addTrial.addTrialSecondaryPurposeOtherDescription.isPresent().then(function (statePresent) {
                                if (statePresent) {
                                    addTrial.addTrialSecondaryPurposeOtherDescription.isDisplayed().then(function (stateDisplayed) {
                                        if (stateDisplayed) {
                                            addTrial.addTrialSecondaryPurposeOtherDescription.getAttribute('value').then(function (secondaryPurpose) {
                                                if (secondaryPurpose !== '') {
                                                    addTrial.addTrialSecondaryPurposeOtherDescription.clear();
                                                    addTrial.addTrialSecondaryPurposeOtherDescription.sendKeys(registryMessage.thousandCharactersSample + 'Additional');
                                                    expect(addTrial.addTrialSecondaryPurposeOtherDescription.getAttribute('value')).to.eventually.equal(registryMessage.thousandCharactersSample, 'Verification of Character after adding extra');
                                                    expect(addTrial.addTrialSecondaryPurposeDescriptionCharacter.getText()).to.eventually.equal(registryMessage.zeroCharactersLeft, 'Verification of Character Length for 0 characters');
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                            addTrial.addTrialLeadProtocolIdentifier.getAttribute('value').then(function (leadProtocolIdentifier) {
                                if (leadProtocolIdentifier !== '') {
                                    addTrial.addTrialLeadProtocolIdentifier.clear();
                                    addTrial.addTrialLeadProtocolIdentifier.sendKeys(registryMessage.thirtyCharactersSample + 'Additional');
                                    expect(addTrial.addTrialLeadProtocolIdentifier.getAttribute('value')).to.eventually.equal(registryMessage.thirtyCharactersSample, 'Verification of Character after adding extra');
                                    expect(addTrial.addTrialLeadOrgIdentifierCharacter.getText()).to.eventually.equal(registryMessage.zeroCharactersLeft, 'Verification of Character Length for 0 characters');
                                }
                            });
                            addTrial.addTrialProtocolID.getAttribute('value').then(function (otherProtocolID) {
                                if (otherProtocolID !== '') {
                                    addTrial.addTrialProtocolID.clear();
                                    addTrial.addTrialProtocolID.sendKeys(registryMessage.thirtyCharactersSample + 'Additional');
                                    expect(addTrial.addTrialProtocolID.getAttribute('value')).to.eventually.equal(registryMessage.thirtyCharactersSample, 'Verification of Character after adding extra');
                                    expect(addTrial.addTrialOtherTrialIdentifierCharacter.getText()).to.eventually.equal(registryMessage.zeroCharactersLeft, 'Verification of Character Length for 0 characters');
                                }
                            });
                            addTrial.addTrialInvestigatorTitle.isPresent().then(function (statePresent) {
                                if (statePresent) {
                                    addTrial.addTrialInvestigatorTitle.isDisplayed().then(function (stateDisplayed) {
                                        if (stateDisplayed) {
                                            addTrial.addTrialInvestigatorTitle.getAttribute('value').then(function (investigatorTitle) {
                                                if (investigatorTitle !== '') {
                                                    addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                                                    addTrial.addTrialInvestigatorTitle.clear();
                                                    addTrial.addTrialInvestigatorTitle.sendKeys(registryMessage.twoFiftyFourCharactersSample + 'Additional');
                                                    expect(addTrial.addTrialInvestigatorTitle.getAttribute('value')).to.eventually.equal(registryMessage.twoFiftyFourCharactersSample, 'Verification of Character after adding extra');
                                                    expect(addTrial.addTrialInvestigatorTitleCharacter.getText()).to.eventually.equal(registryMessage.zeroCharactersLeft, 'Verification of Character Length for 0 characters');
                                                    addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                                                    addTrial.addTrialInvestigatorTitle.clear();
                                                    addTrial.addTrialInvestigatorTitle.sendKeys(registryMessage.twoFiftyFourCharactersSample + 'Additional');
                                                    expect(addTrial.addTrialInvestigatorTitle.getAttribute('value')).to.eventually.equal(registryMessage.twoFiftyFourCharactersSample, 'Verification of Character after adding extra');
                                                    expect(addTrial.addTrialInvestigatorTitleCharacter.getText()).to.eventually.equal(registryMessage.zeroCharactersLeft, 'Verification of Character Length for 0 characters');

                                                }
                                            });
                                        }
                                    });
                                }
                            });


                        }

                    });


                }
                if (loggedInUserName === 'ctrpabstractor') {
                    commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, noCharLft, '0', 'Verifying Brief Title field Character left message');
                    //login.logout();
                    //commonFunctions.alertMsgOK();
                }
            });
        });
    });

    /*
     Scenario: #6  Brief Summary field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     And I start typing into Brief Summary
     Then the character left provided below the Brief Summary field will start to decrement
     |5000 characters left|
     When 5000 characters have been entered into Brief Summary
     Then no additional text can be entered inti Brief Summary
     */

    this.Given(/^I start typing into Brief Summary$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setBriefSummaryTxt('Test Brief Summary');
        });
    });

    this.Then(/^the character left provided below the Brief Summary field will start to decrement$/, function (table) {
        return browser.sleep(25).then(function () {
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLft, '1', 'Verifying Brief Summary field Character left message');
            trialDesc.setBriefSummaryTxt('');
            var characLft = table.raw();
            strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strCharacLft + ']');
            var strCharacLftSplt = strCharacLft.toString().split("\n");
            strCharacLftSpltA = strCharacLftSplt[0];
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftSpltA, '1', 'Verifying Brief Summary field Character left message');
        });
    });

    this.When(/^(\d+) characters have been entered into Brief Summary$/, function (arg1) {
        return browser.sleep(25).then(function () {
            var x = Array(3).join(charLftStr);
            console.log('x: ' + x);
            trialDesc.setBriefSummaryTxt(x);
            x = '' //clear var with null val
        });
    });

    this.Then(/^no additional text can be entered inti Brief Summary$/, function () {
        return browser.sleep(25).then(function () {
            var strSummaryChrcLft = '4800 characters left';
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strSummaryChrcLft, '1', 'Verifying Brief Summary field Character left message');
            console.log('System becomes unresponsive if 5000 characters load in the server memory');
        });
    });

    /*
     Scenario:  #7  Detailed Description field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     When I start typing into the Detailed Description field
     Then the limited characters provided below the Detailed Description field will start to decrement
     When 32000 characters have been entered into Detailed Description
     Then no additional text can be entered into Detailed Description
     */

    this.When(/^I start typing into the Detailed Description field$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setDetailedDescriptionTxt('Test Detailed Description');
        });
    });

    this.Then(/^the limited characters provided below the Detailed Description field will start to decrement$/, function (table) {
        return browser.sleep(25).then(function () {
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLftDetail, '3', 'Verifying Detailed Description field Character left message');
            trialDesc.setDetailedDescriptionTxt('');
            var characLft = table.raw();
            strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strCharacLft + ']');
            var strCharacLftSplt = strCharacLft.toString().split("\n");
            strCharacLftSpltA = strCharacLftSplt[0];
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftSpltA, '3', 'Verifying Detailed Description field Character left message');
        });
    });

    this.When(/^(\d+) characters have been entered into Detailed Description$/, function (arg1) {
        return browser.sleep(25).then(function () {
            var d = Array(3).join(charLftStr);
            console.log('d: ' + d);
            trialDesc.setDetailedDescriptionTxt('' + d + '');
            d = '' //clear var with null val
        });
    });

    this.Then(/^no additional text can be entered into Detailed Description$/, function () {
        return browser.sleep(25).then(function () {
            //System unable to handale runtime 32000 character
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLftDetailA, '3', 'Verifying Detailed Description field Character left message');
        });
    });

    /*
     Scenario:  #8  Objectives field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     When I start typing into Objectives field
     Then the limited characters provided below the Objectives field will will start to decrement
     |32000 characters left|
     When 32000 characters have been entered into Objectives
     Then no additional text can be entered into Objectives
     */

    this.When(/^I start typing into Objectives field$/, function () {
        return browser.sleep(25).then(function () {
            trialDesc.setObjectivesTxt('Test Objectives');
        });
    });

    this.Then(/^the limited characters provided below the Objectives field will will start to decrement$/, function (table) {
        return browser.sleep(25).then(function () {
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLftObjective, '2', 'Verifying Objectives field Character left message');
            trialDesc.setObjectivesTxt('');
            var characLft = table.raw();
            strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + strCharacLft + ']');
            var strCharacLftSplt = strCharacLft.toString().split("\n");
            strCharacLftSpltA = strCharacLftSplt[0];
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftSpltA, '2', 'Verifying Objectives field Character left message');
        });
    });

    this.When(/^(\d+) characters have been entered into Objectives$/, function (arg1) {
        return browser.sleep(25).then(function () {
            var v = Array(3).join(charLftStr);
            console.log('v: ' + v);
            trialDesc.setObjectivesTxt('' + v + '');
            v = '' //clear var with null val
        });
    });

    this.Then(/^no additional text can be entered into Objectives$/, function () {
        return browser.sleep(25).then(function () {
            //System unable to handale runtime 32000 character
            commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLftObjectiveA, '2', 'Verifying Objectives field Character left message');
        });
    });

};
