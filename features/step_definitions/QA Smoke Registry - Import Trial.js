/**
 * Created by singhs10 on 7/25/16.
 */
/**
 * Created by singhs10 on 7/15/16.
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
var registryMessagePage = require('../support/RegistryMessage');
var phoneFormat = require('phoneformat.js');



module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchTrial = new searchTrialPage();
    var login = new loginPage();
    var importTrial = new importTrialPage();
    var menuItem = new menuItemList();
    var dbConnect = new databaseConnection();
    var participatingSite = new participatingSitePage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();
    var registryMessage = new registryMessagePage();

    var getDBConnection = '';

    var protocolDoc = 'testSampleDocFile.docx';
    var IRBDoc = 'testSampleXlsFile.xls';


    this.Given(/^I want to import a Trial with NCT ID (.*)$/, function (NCTID) {
        return browser.sleep(25).then(function () {
            NCTIDCurrent = NCTID;
            projectFunctionsRegistry.parseXMLFromCtGov(NCTID);

            //ctGovElement.then(function (value) {
            //    projectFunctionsRegistry.createOrgForImportedTrial(value.clinical_study.sponsors.lead_sponsor.agency, 'ctrptrialsubmitter');
            //});
            ctGovElement.then(function (value) {
               // console.log('value of ct.gov entire');
               // console.log(value);
                console.log('value of ct.gov prim comp date');
                console.log(value.clinical_study.primary_completion_date);
                console.log(value.clinical_study.primary_completion_date.type);
                console.log('value of ct.gov comp date');
                console.log(value.clinical_study.completion_date);
                console.log(value.clinical_study.completion_date.type);

            });
            projectFunctionsRegistry.selectTrials('Industrial/Other');
            importTrial.setAddImportClinicalTrialID(NCTID);
            importTrial.clickAddImportSearchStudiesButton();
            menuItem.addWarningMessage.getText().then(function (value) {
                if (value.toString() === registryMessage.duplicateNCTIDErrorMsg) {
                    console.log('Duplicate error NCT message');
                    console.log(registryMessage.duplicateNCTIDErrorMsg);
                    dbConnect.dbConnectionImportTrial(NCTID, getDBConnection);
                }
                if (value.toString() === registryMessage.duplicateLeadOrgAndLeadOrgIDErrorMsg) {
                    console.log('Duplicate error Lead ORg and Lead ORg ID message');
                    console.log(registryMessage.duplicateLeadOrgAndLeadOrgIDErrorMsg);
                    ctGovElement.then(function (value) {
                        dbConnect.dbConnectionImportTrialUpdateLeadID(value.clinical_study.id_info.org_study_id, getDBConnection);
                    });
                }
                if (value.toString() === registryMessage.invalidNCTIDErrorMsg) {
                    console.log('Invalid NCT ID message');
                    console.log(registryMessage.invalidNCTIDErrorMsg);
                    assert.fail(0, 1, 'Import Trial not completed for the given NCT ID -- ' + NCTID + ' -- .Error Message :' + value);
                }
            });
            importTrial.setAddImportClinicalTrialID(NCTID);
            importTrial.clickAddImportSearchStudiesButton();
            importTrial.clickAddImportTrialButton();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^After Importing it should display the Imported Trial information$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.verifyImportedTrialViewPage();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I should be able to search with that Imported NCTID$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            searchTrial.setSearchTrialProtocolID(NCTIDCurrent);
            searchTrial.selectSearchTrialStudySource('Industrial');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialAllTrials();
            expect(projectFunctions.inSearchResults(NCTIDCurrent)).to.eventually.equal('true', ' Verification of Imported Trial in Search Result');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I want to add a Participating Site$/, function () {
        return browser.sleep(25).then(function () {
            searchTrial.clickSearchTrialActionButton();
            searchTrial.clickSearchTrialsAddSiteButton();
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I want to add a Participating Site with Organization name: (.*), Local Trial Identifier: (.*), Site Principal Investigator: (.*), Program Code: (.*), Trial Recruitment Status Date: (.*), Trial Status: (.*), Comment: (.*)$/, function (PSOrgName, PSLclTrId, PSSitePI, PSPgmCode, PSStatusDate, PSStatus, PSComment) {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createPersonforTrialfromPO(PSSitePI);
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
                login.clickWriteMode('On');
                searchTrial.setSearchTrialProtocolID(NCTIDCurrent);
                searchTrial.selectSearchTrialStudySource('Industrial');
                searchTrial.clickSearchTrialSearchButton();
                searchTrial.clickSearchTrialAllTrials();
                searchTrial.clickSearchTrialActionButton();
                searchTrial.clickSearchTrialsAddSiteButton();
                participatingSite.addPSOrgName.$('option:checked').getText().then(function (psOrgName) {
                    console.log('Trial Organization Name in Participating Site page is ----> ' + psOrgName);
                    PSLclTrIdOrgi = PSLclTrId;
                    participatingSite.setAddPSLocalId(PSLclTrId);
                    per4.then(function (sitePIValue) {
                        addTrial.clickAddTrialPersonSearchModel('0');
                        searchOrg.clickExactSearch('true');
                        searchPeople.setPersonFirstName(sitePIValue);
                        searchPeople.clickSearch();
                        searchOrg.selectOrgModelItem();
                        searchOrg.clickOrgModelConfirm();

                        participatingSite.setAddPSSiteProgramCode(PSPgmCode);
                        addTrial.clickAddTrialDateField(0);
                        addTrial.clickAddTrialDateFieldDifferentYear(moment(PSStatusDate, 'DD-MMM-YYYY').format('YYYY'), moment(PSStatusDate, 'DD-MMM-YYYY').format('MMMM'), moment(PSStatusDate, 'DD-MMM-YYYY').format('DD'));
                        participatingSite.selectAddPSTrialStatus(PSStatus);
                        participatingSite.setAddPSTrialComment(PSComment);
                        participatingSite.clickAddPSAddStatusButton();
                        participatingSite.selectAddPSContactType('site investigator');
                      //  participatingSite.setAddPSContactName('PS Singh Cuke');
                        participatingSite.setAddPSContactEmailAddress('singh@contact.com');
                        participatingSite.setAddPSContactPhone('687-657-8976');
                        participatingSite.setAddPSContactPhoneExtension('01');
                        participatingSite.clickAddPSSaveButton();
                        var formattedPhone = phoneFormat.formatLocal('US', '687-657-8976');
                        viewPS = psOrgName + ' ' + 'SinghTrialImp, ' + sitePIValue + ' ' + PSLclTrId  + ' ' + PSPgmCode + ' ' + PSStatus + ' ' + PSStatusDate + ' ' + 'SinghTrialImp, ' + sitePIValue + ' ' + 'singh@contact.com' + ' ' +  formattedPhone + ' x01';
                     //   viewPS = psOrgName + ' '  + sitePIValue + ' SinghTrialImp' + ' ' + PSLclTrId  + ' ' + PSPgmCode + ' ' + PSStatus + ' ' + PSStatusDate + ' ' + sitePIValue + ' SinghTrialImp' + ' ' + 'singh@contact.com' + ' ' +  '687-657-8976 ext. 01';
                        console.log('View PS tbl in View page');
                        console.log(viewPS);
                    });
                });
            });
            //   browser.sleep(25).then(callback);
        });
    });


    this.Then(/^I should be able to see the added Participating site$/, function () {
        return browser.sleep(25).then(function () {
            dbConnect.dbConnectionPSViewTable('ctrptrialsubmitter', viewPS, getDBConnection);
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I want to update the Participating Site$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            searchTrial.setSearchTrialProtocolID(NCTIDCurrent);
            searchTrial.selectSearchTrialStudySource('Industrial');
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialAllTrials();
            searchTrial.clickSearchTrialActionButton();
            searchTrial.clickSearchTrialsUpdateMySiteButton();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I want to update the Local Trial Identifier and Save it$/, function () {
        return browser.sleep(25).then(function () {
            PSLclTrIdUpd = 'UPDLcl ' + moment().format('MMDo');
            participatingSite.setAddPSLocalId(PSLclTrIdUpd);
            participatingSite.clickAddPSSaveButton();
            //   browser.sleep(25).then(callback);
        });
    });

    this.Then(/^It should display the updated Participating Site Information$/, function () {
        return browser.sleep(25).then(function () {
            viewUpdatedPS = viewPS.replace(PSLclTrIdOrgi, PSLclTrIdUpd);
            console.log('Updated PArticipating site:');
            console.log(viewUpdatedPS);
            dbConnect.dbConnectionPSViewTable('ctrptrialsubmitter', viewUpdatedPS, getDBConnection);
            login.clickWriteMode('On');
           // addTrial.getViewTrialParticipatingSites(viewUpdatedPS.split());
            //    browser.sleep(25).then(callback);
        });
    });
};
