/**
 * Created by singhs10 on 6/3/16.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var helperFunctions = require('../support/helper');
var moment = require('moment');
var searchTrialPage = require('../support/searchTrialPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
var loginPage = require('../support/LoginPage');
var importTrialPage = require('../support/registerImportTrialPage');
var menuItemList = require('../support/PoCommonBar');
var databaseConnection = require('../support/databaseConnection');
var Q = require('q');
var assert = require('assert');
var participatingSitePage = require('../support/registerAddParticipatingSite');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var searchPeoplePage = require('../support/ListOfPeoplePage');


module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();
    var searchTrial = new searchTrialPage();
    var commonFunctions = new abstractionCommonMethods();
    var login = new loginPage();
    var importTrial = new importTrialPage();
    var menuItem = new menuItemList();
    var dbConnect = new databaseConnection();
    var participatingSite = new participatingSitePage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();


    var invalidNCTIDErrorMsg = 'A study with the given identifier is not found in ClinicalTrials.gov.';
    var duplicateNCTIDErrorMsg = 'A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page.';
    var duplicateLeadOrgAndLeadOrgIDErrorMsg = 'Combination of Lead Organization Trial ID and Lead Organization must be unique.';

    var invalidNCTID = 'NCT99999999';
    var duplicateNCTID = 'NCT02790398';
    var NCTID = '';//'';//'';//'NCT02796586';//''//'NCT02795156'//'NCT02799225'
    var NCTIDWithOfficialTitle = 'NCT02619799';
    var NCTIDWithNoOfficialTitle = 'NCT00000144';
    var NCTIDExpandedAccess = 'NCT02496689';
    var NCTIDDuplicateNotRJTorSTR = 'NCT02796586';
    var NCTIDDuplicateRJT = 'NCT02808455';
    var NCTIDDuplicateSTR = 'NCT02813278';
    var LeadIDDuplicateNotRJTorSTR = 'NCT02807077';
    var LeadIDDuplicateRJT = 'NCT02258412';
    var LeadIDDuplicateSTR = 'NCT00000369';
    var NCTIDVerifyViewScreen = 'NCT02644096';
    var NCTIDAddPS = 'NCT02799225';

    var getDBConnection = '';


    this.Given(/^I have selected the option to Import an Industrial or Other Trial$/, function () {
        return browser.sleep(25).then(function () {
            //    browser.get('ui/#/main/sign_in');
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
                projectFunctionsRegistry.selectTrials('Industrial/Other');
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I am on the Import ClinicalTrials\.gov Trials screen$/, function (callback) {
        callback();
    });

    this.When(/^I have entered a NCT Number$/, function (callback) {
        NCTID = NCTIDWithOfficialTitle;
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Search Studies feature will indicate if the NCT ID is a valid NCT ID in ClinicalTrials\.gov$/, function () {
        return browser.sleep(25).then(function () {
            importTrial.setAddImportClinicalTrialID(invalidNCTID);
            importTrial.clickAddImportSearchStudiesButton();
            expect(menuItem.addWarningMessage.getText()).to.eventually.eql(invalidNCTIDErrorMsg.split(), 'Validation of error message when invalid NCT ID is provided.');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Search Studies feature will indicate if a trial with the NCT ID has been registered in CTRP$/, function () {
        return browser.sleep(25).then(function () {
            importTrial.setAddImportClinicalTrialID(duplicateNCTID);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === invalidNCTIDErrorMsg || value.toString() === duplicateNCTIDErrorMsg || value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    console.log('Do nothing; NCT ID already exist');
                }
                else {
                    importTrial.clickAddImportTrialButton();
                }
            });
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(duplicateNCTID);
            importTrial.clickAddImportSearchStudiesButton();
            expect(menuItem.addWarningMessage.getText()).to.eventually.eql(duplicateNCTIDErrorMsg.split(), 'Validation of error message when duplicate NCT ID is provided.');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the option to import an Industrial trial$/, function () {
        return browser.sleep(25).then(function () {
            browser.get('ui/#/main/sign_in');
            commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
            trialMenuItem.clickHomeSearchTrial();
            login.clickWriteMode('On');
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^the Search Studies feature indicates that the trial has not been registered in CTRP$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.parseXMLFromCtGov(NCTID);
            importTrial.setAddImportClinicalTrialID(NCTID);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg) {
                    dbConnect.dbConnectionImportTrial(NCTID, getDBConnection);
                }
                if (value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    ctGovElement.then(function (value) {
                        dbConnect.dbConnectionImportTrialUpdateLeadID(value.clinical_study.id_info.org_study_id, getDBConnection);
                    });
                }
                if (value.toString() === invalidNCTIDErrorMsg) {
                    assert.fail(0, 1, 'Import Trial not completed for the given NCT ID -- ' + NCTID + ' -- .Error Message :' + value);
                }
            });
            importTrial.setAddImportClinicalTrialID(NCTID);
            importTrial.clickAddImportSearchStudiesButton();
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^the trial NCT ID, Status, and Study Title, Conditions, and Interventions are displayed$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.verifyImportedTrialInfo();
            //browser.sleep(25).then(callback);
        });
    });


    this.When(/^the imported Clinical Trial does not have an Official Title$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.parseXMLFromCtGov(NCTIDWithNoOfficialTitle);
            importTrial.setAddImportClinicalTrialID(NCTIDWithNoOfficialTitle);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg) {
                    dbConnect.dbConnectionImportTrial(NCTIDWithNoOfficialTitle, getDBConnection);
                }
                if (value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    ctGovElement.then(function (value) {
                        dbConnect.dbConnectionImportTrialUpdateLeadID(value.clinical_study.id_info.org_study_id, getDBConnection);
                    });
                }
                if (value.toString() === invalidNCTIDErrorMsg) {
                    assert.fail(0, 1, 'Import Trial not completed for the given NCT ID -- ' + NCTIDWithNoOfficialTitle + ' -- .Error Message :' + value);
                }
            });
            importTrial.setAddImportClinicalTrialID(NCTIDWithNoOfficialTitle);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg || value.toString() === invalidNCTIDErrorMsg || value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    assert.fail(0, 1, 'Import Trial not completed for the given NCT ID -- ' + nctID + ' -- .Error Message :' + value);
                }
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Clinical Trial Brief Title should be displayed in the search results$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.verifyImportedTrialInfo();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I can import the trial information from ClinicalTrials\.gov into CTRP$/, function () {
        return browser.sleep(25).then(function () {
            importTrial.clickAddImportTrialButton();
            addTrial.viewTrialNCIID.isPresent().then(function (state) {
                if (state) {
                    nciIDOfTrial = addTrial.viewTrialNCIID.getText().then(function (nciIDTrial) {
                        console.log('Trial NCI ID is ----> ' + nciIDTrial);
                        return nciIDTrial;
                    });
                } else {
                    assert.fail(0, 1, 'NCI ID is not there for the Imported Trial');
                }
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the trial Study Souce will be listed as Industrial$/, function (callback) {
        callback().pending();
    });

    this.Then(/^the XML from ClinicalTrials\.gov will be attached to the trial document$/, function () {
        return browser.sleep(25).then(function () {
            nciIDOfTrial.then(function (value) {
                dbConnect.dbConnVerifyDocumentImpTrial(value, getDBConnection);
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the trial milestone "([^"]*)" will be added with date of the import$/, function (arg1, table) {
        return browser.sleep(25).then(function () {
            nciIDOfTrial.then(function (value) {
                dbConnect.dbConnVerifyMilestoneImpTrial(value, getDBConnection);
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the trial milestone "([^"]*)" will be added with the date of the import$/, function (arg1, table) {
        return browser.sleep(25).then(function () {
            nciIDOfTrial.then(function (value) {
                dbConnect.dbConnVerifyMilestoneImpTrial(value, getDBConnection);
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have entered a NCT Number where Study Type is ClinicalTrials\.gov is Expanded Access$/, function (callback) {
        NCTID = NCTIDExpandedAccess;
        browser.sleep(25).then(callback);
    });

    this.Then(/^the trial Research Category will be listed as Expanded Access$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.viewTrialResearchCategory.isPresent().then(function (state) {
                if (state) {
                    expect(addTrial.viewTrialResearchCategory.getText()).to.eventually.eql('Expanded Access', 'Validation of Research Category field');
                } else {
                    assert.fail(0, 1, 'Research Category field is not there');
                }
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the trial status will match the trial status in ClinicalTrials\.gov as:$/, function (table) {
        return browser.sleep(25).then(function () {
            ctGovElement.then(function (value) {
                addTrial.viewTrialStatus.isPresent().then(function (state) {
                    if (state) {
                        addTrial.viewTrialStatus.getText().then(function (trialStatusUI) {
                            expect(trialStatusUI).to.eql(value.clinical_study.overall_status, 'Validation of Research Category field');
                        });
                    } else {
                        assert.fail(0, 1, 'Research Category field is not there');
                    }
                });
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^the NCT Number is associated with a Trial which has NOT been Rejected OR Submission Terminated$/, function () {
        return browser.sleep(25).then(function () {
            importTrial.setAddImportClinicalTrialID(NCTIDDuplicateNotRJTorSTR);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg || value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    console.log('Do nothing; NCT ID already exist');
                }
                else if (value.toString() === invalidNCTIDErrorMsg) {
                    console.log('NCT ID is invalid');
                    assert.fail(0, 1, 'Provided NCT ID is not valid. Error message in UI: ' + value.toString());
                }
                else {
                    console.log('Import the Trial');
                    importTrial.clickAddImportTrialButton();
                    expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true);
                }
            });
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                dbConnect.dbConnVerifyTrialRejectedORSubmissionTerminated(NCTIDDuplicateNotRJTorSTR, 'no', 'no', getDBConnection);
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Trial with the entered NCT number should NOT be allowed to be imported$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(NCTIDDuplicateNotRJTorSTR);
            importTrial.clickAddImportSearchStudiesButton();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the error message will be displayed "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            expect(menuItem.addWarningMessage.getText()).to.eventually.eql(arg1.split(), 'Validation of error message when duplicate NCT ID is provided.');
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^the NCT Number is associated with a Trial which has been Rejected OR Submission Terminated$/, function () {
        return browser.sleep(25).then(function () {
            importTrial.setAddImportClinicalTrialID(NCTIDDuplicateSTR);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg || value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    console.log('Do nothing; NCT ID already exist');
                }
                else if (value.toString() === invalidNCTIDErrorMsg) {
                    console.log('NCT ID is invalid');
                    assert.fail(0, 1, 'Provided NCT ID is not valid. Error message in UI: ' + value.toString());
                }
                else {
                    console.log('Import the Trial');
                    importTrial.clickAddImportTrialButton();
                    expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true);
                }
            });
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                dbConnect.dbConnVerifyTrialRejectedORSubmissionTerminated(NCTIDDuplicateSTR, 'no', 'yes', getDBConnection);
            });
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(NCTIDDuplicateRJT);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg || value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    console.log('Do nothing; NCT ID already exist');
                }
                else if (value.toString() === invalidNCTIDErrorMsg) {
                    console.log('NCT ID is invalid');
                    assert.fail(0, 1, 'Provided NCT ID is not valid. Error message in UI: ' + value.toString());
                }
                else {
                    console.log('Import the Trial');
                    importTrial.clickAddImportTrialButton();
                    expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true);
                }
            });
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                dbConnect.dbConnVerifyTrialRejectedORSubmissionTerminated(NCTIDDuplicateRJT, 'yes', 'no', getDBConnection);
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Trial with the entered NCT number should be allowed to be imported$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(NCTIDDuplicateSTR);
            importTrial.clickAddImportSearchStudiesButton();
            expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true, 'Verify Trial is imported and NCI ID is present for trial which was submission terminated before');
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(NCTIDDuplicateRJT);
            importTrial.clickAddImportSearchStudiesButton();
            expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true, 'Verify Trial is imported and NCI ID is present for trial which was rejected before');
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^the lead organization and lead organization ID for the trial to be imported match the lead organization and lead organization ID for a trial registered in CTRP which has NOT been Rejected OR Submission Terminated$/, function () {
        return browser.sleep(25).then(function () {
            importTrial.setAddImportClinicalTrialID(LeadIDDuplicateNotRJTorSTR);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg || value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    console.log('Do nothing; NCT ID already exist');
                }
                else if (value.toString() === invalidNCTIDErrorMsg) {
                    console.log('NCT ID is invalid');
                    assert.fail(0, 1, 'Provided NCT ID is not valid. Error message in UI: ' + value.toString());
                }
                else {
                    console.log('Import the Trial');
                    importTrial.clickAddImportTrialButton();
                    expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true);
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                        dbConnect.dbConnectionImportTrialUpdateNCTId(LeadIDDuplicateNotRJTorSTR, getDBConnection);
                    });
                }
            });

            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^The Trial with the associated lead organization and lead organization ID should not be allowed to be imported$/, function () {
        return browser.sleep(25).then(function () {
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                dbConnect.dbConnVerifyTrialRejectedORSubmissionTerminated(LeadIDDuplicateNotRJTorSTR, 'no', 'no', getDBConnection);
            });
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(LeadIDDuplicateNotRJTorSTR);
            importTrial.clickAddImportSearchStudiesButton();
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^the lead organization and lead organization ID for the trial to be imported match the lead organization and lead organization ID for a trial registered in CTRP which has been Rejected OR Submission Terminated$/, function () {
        return browser.sleep(25).then(function () {
            importTrial.setAddImportClinicalTrialID(LeadIDDuplicateSTR);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg || value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    console.log('Do nothing; NCT ID already exist');
                }
                else if (value.toString() === invalidNCTIDErrorMsg) {
                    console.log('NCT ID is invalid');
                    assert.fail(0, 1, 'Provided NCT ID is not valid. Error message in UI: ' + value.toString());
                }
                else {
                    console.log('Import the Trial');
                    importTrial.clickAddImportTrialButton();
                    expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true);
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                        dbConnect.dbConnectionImportTrialUpdateNCTId(LeadIDDuplicateSTR, getDBConnection);
                    });
                }
            });
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(LeadIDDuplicateRJT);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg || value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    console.log('Do nothing; NCT ID already exist');
                }
                else if (value.toString() === invalidNCTIDErrorMsg) {
                    console.log('NCT ID is invalid');
                    assert.fail(0, 1, 'Provided NCT ID is not valid. Error message in UI: ' + value.toString());
                }
                else {
                    console.log('Import the Trial');
                    importTrial.clickAddImportTrialButton();
                    expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true);
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                        dbConnect.dbConnectionImportTrialUpdateNCTId(LeadIDDuplicateRJT, getDBConnection);
                    });
                }
            });

            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^The Trial with the associated lead organization and lead organization ID should be allowed to be imported$/, function () {
        return browser.sleep(25).then(function () {
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                dbConnect.dbConnVerifyTrialRejectedORSubmissionTerminated(LeadIDDuplicateSTR, 'no', 'yes', getDBConnection);
            });
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(LeadIDDuplicateSTR);
            importTrial.clickAddImportSearchStudiesButton();
            expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true, 'Verify Trial is imported and Lead protocol ID and Lead Org is present for trial which was Submission Terminated before');
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                dbConnect.dbConnVerifyTrialRejectedORSubmissionTerminated(LeadIDDuplicateRJT, 'yes', 'no', getDBConnection);
            });
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(LeadIDDuplicateRJT);
            importTrial.clickAddImportSearchStudiesButton();
            expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true, 'Verify Trial is imported and Lead protocol ID and Lead Org is present for trial which was rejected before');

            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have imported the trial successfully$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.parseXMLFromCtGov(NCTIDVerifyViewScreen);
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(NCTIDVerifyViewScreen);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg) {
                    dbConnect.dbConnectionImportTrial(NCTIDVerifyViewScreen, getDBConnection);
                }
                if (value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    ctGovElement.then(function (value) {
                        dbConnect.dbConnectionImportTrialUpdateLeadID(value.clinical_study.id_info.org_study_id, getDBConnection);
                    });
                }
                if (value.toString() === invalidNCTIDErrorMsg) {
                    assert.fail(0, 1, 'Import Trial not completed for the given NCT ID -- ' + NCTIDVerifyViewScreen + ' -- .Error Message :' + value);
                }
            });
            importTrial.setAddImportClinicalTrialID(NCTIDVerifyViewScreen);
            importTrial.clickAddImportSearchStudiesButton();
            importTrial.clickAddImportTrialButton();
            //  browser.sleep(25).then(callback);
        });
    });


    this.Then(/^the trial information will be displayed including$/, function (table) {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.verifyImportedTrialViewPage();
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I can select the "([^"]*)" function to add my site as a participating site$/, function (arg1) {
        return browser.sleep(25).then(function () {
            assert.fail(0, 1, 'Button not present to Add PS after Importing Trial');
            // browser.sleep(25).then(callback);
        });
    });


    this.Given(/^I have completed the import$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createPersonforTrialfromPO('sitePIImportedTrial');
            projectFunctionsRegistry.parseXMLFromCtGov(NCTIDAddPS);
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            login.clickWriteMode('On');
            importTrial.setAddImportClinicalTrialID(NCTIDAddPS);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === duplicateNCTIDErrorMsg) {
                    dbConnect.dbConnectionImportTrial(NCTIDAddPS, getDBConnection);
                }
                if (value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    ctGovElement.then(function (value) {
                        dbConnect.dbConnectionImportTrialUpdateLeadID(value.clinical_study.id_info.org_study_id, getDBConnection);
                    });
                }
                if (value.toString() === invalidNCTIDErrorMsg) {
                    assert.fail(0, 1, 'Import Trial not completed for the given NCT ID -- ' + NCTIDAddPS + ' -- .Error Message :' + value);
                }
            });
            importTrial.setAddImportClinicalTrialID(NCTIDAddPS);
            importTrial.clickAddImportSearchStudiesButton();
            importTrial.clickAddImportTrialButton();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the option to "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            //trialMenuItem.clickTrials();
            //trialMenuItem.clickListSearchTrialLink();
            //searchTrial.setSearchTrialProtocolID(NCTIDAddPS);
            //searchTrial.selectSearchTrialStudySource('Industrial');
            //searchTrial.clickSearchTrialSearchButton();
            //searchTrial.clickSearchTrialAllTrials();
            //searchTrial.clickSearchTrialActionButton();
            //searchTrial.clickSearchTrialsAddSiteButton();
            assert.fail(0, 1, 'Button not present to Add PS after Importing Trial');
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I can enter my Local Trial Identifier$/, function () {
        return browser.sleep(25).then(function () {
            participatingSite.setAddPSLocalId('local Trial Identifier 1234 cuke');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^look\-up and add the Site Principal Investigator$/, function () {
        return browser.sleep(25).then(function () {
            per4.then(function (value) {
                addTrial.clickAddTrialPersonSearchModel('0');
                searchOrg.clickExactSearch('true');
                searchPeople.setPersonFirstName(value);
                searchPeople.clickSearch();
                searchOrg.selectOrgModelItem();
                searchOrg.clickOrgModelConfirm();
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^enter a Program Code$/, function () {
        return browser.sleep(25).then(function () {
            participatingSite.setAddPSSiteProgramCode('site Prg Code cuke 99');
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^enter the Recruitment Status and and Recruitment Status Date$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialDateField(0);
            addTrial.clickAddTrialDateToday();
            participatingSite.selectAddPSTrialStatus('In Review');
            participatingSite.clickAddPSAddStatusButton();
            participatingSite.clickAddPSSaveButton();
            //browser.sleep(25).then(callback);
        });
    });


};