/**
 * Created by singhs10 on 5/4/16.
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
var searchTrialPage = require('../support/searchTrialPage');
var databaseConnection = require('../support/databaseConnection');
var loginPage = require('../support/LoginPage');
var orgPage = require('../support/ListOfOrganizationsPage');
var moment = require('moment');
var underscore = require('underscore');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');


module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();
    var searchTrial = new searchTrialPage();
    var dbConnect = new databaseConnection();
    var login = new loginPage();
    var searchOrg = new orgPage();

    var wildCardParameter = '*';
    var assertionErrorMessage = 'check for Official Title with parameter --> ';
    var assertionErrorMessagePhase = 'check for Phase with parameter --> ';
    var assertionErrorMessagePurpose = 'check for Phase with parameter --> ';
    var assertionErrorMessageTrialID = 'check for Trial ID with ';
    var assertionErrorMessageLeadOrg = 'check for Organization with Lead Org --> ';
    var assertionErrorMessageSponsorOrg = 'check for Organization with Sponsor Org --> ';
    var assertionErrorMessageParticipatingSite = 'check for Organization with Participating Site --> ';
    var assertionErrorMessagePrincipalInvestigator = 'check for Principal Investigator with parameter --> ';
    var assertionErrorMessageMyTrialOption = ' <-- with My Trial search option';
    var assertionErrorMessageAllTrialOption = ' <-- with All Trial search option';
    var assertionErrorMessageDraftTrialOption = ' <-- with Draft Trial search option';
    var assertionErrorMessageCompleteTrial = ' for Complete Trial where User is the owner';
    var assertionErrorMessageCompleteTrialNotOwner = ' for Complete Trial where User is not the owner';
    var assertionErrorMessageImportTrial = ' for Imported Trial';
    var assertionErrorMessageDraftTrial = ' for Draft Trial where User is the Owner';
    var assertionErrorMessageDraftTrialNotOwner = ' for Draft Trial where User is not the Owner';

    var searchOptionMyTrials = 'My Trials';
    var searchOptionAllTrials = 'All Trials';
    var searchOptionSavedDrafts = 'Saved Drafts';

    var getDBConnection = '';

    // Phase Field Search //
    var phaseSelectIAndII = 'I/II';
    var phaseSelect0 = '0';
    var phaseSelectIV = 'IV';
    var elementTableName = 'phases';
    var elementColumnName = 'name';
    var elementNameInTrialTable = 'phase_id';

    // Pilot Option Search //
    var pilotYes = 'Yes';
    var pilotNo = 'No';
    var PilotClnNmInTrialTb = 'pilot';

    // Purpose Field Search //
    var purposeDiagnostic = 'Diagnostic';
    var purposeBasicScience = 'Basic Science';
    var purposeOther = 'Other';
    var elementTableNamePurpose = 'primary_purposes';
    var elementColumnNamePurpose = 'name';
    var elementNameInTrialTablePurpose = 'primary_purpose_id';

    //Organization Type Search//
    var orgTypeLeadOrg = 'Lead Organization';
    var orgTypeSponsor = 'Sponsor';
    var orgTypeParticipatingSite = 'Participating Site';

    //Trial Source Search//
    var trialNAT = 'National';
    var trialEPR = 'Externally Peer-Reviewed';
    var trialINS = 'Institutional';
    var trialIND = 'Industrial';
    var trialOTH = 'Other';
    var elementTableNameSource = 'study_sources';
    var elementColumnNameSource = 'name';
    var elementNameInTrialTableSource = 'study_source_id ';

    this.Given(/^I know the search Parameters of trial$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createTrialForTrialSearch();
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select the option to search "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            myTrialSearchOption = arg1;
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^CTRP will display all trials with a last active submission where I am listed as a Trial Owner and the trials match the trial search criteria$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            searchTrial.setSearchTrialProtocolID(wildCardParameter);
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyMyTrialCount(countOfResult, loggedInUserName, getDBConnection);

            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Clinical Trials Search Results will display the following sorted by NCI Trial Identifier:$/, function (table) {
        return browser.sleep(25).then(function () {
            browser.driver.manage().window().maximize();
            element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
                if (state === true) {
                    searchOrg.searchResultHeader.getText().then(function (value) {
                        console.log('value of Trial Search Result before removing columns');
                        console.log(value);
                        searchOrg.searchResultMenu.click();
                        searchTrial.searchTrialSortColumnNCITrialID.get(0).click();
                        searchTrial.searchTrialSortColumnOfficialTitle.get(0).click();
                        searchTrial.searchTrialSortColumnLeadOrg.get(0).click();
                        searchTrial.searchTrialSortColumnLeadOrgTrialID.get(0).click();
                        searchTrial.searchTrialSortColumnPrincipalInvestigator.get(0).click();
                        searchTrial.searchTrialSortColumnClinicalTrialID.get(0).click();
                       // element(by.xpath('//*[@id="menuitem-2"]/button')).click();
                       // element(by.xpath('//*[@id="menuitem-6"]/button')).click();
                       // element(by.xpath('//*[@id="menuitem-8"]/button')).click();
                       // element(by.xpath('//*[@id="menuitem-10"]/button')).click();
                       // element(by.xpath('//*[@id="menuitem-12"]/button')).click();
                       // element(by.xpath('//*[@id="menuitem-14"]/button')).click();
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 2).then(function () {
                            searchOrg.searchResultHeader.getText().then(function (value2) {
                                console.log('value of Trial Search Result after removing columns');
                                console.log(value2);
                                var list1 = value.toString().replace(/\n/g, " ");
                                var listArr = list1.split(",");
                                for (var i = 0; i < listArr.length; i++)
                                    listArr[i] = listArr[i].trim();
                                var list2 = value2.toString().replace(/\n/g, " ");
                                var listArr2 = list2.split(",");
                                for (var j = 0; j < listArr2.length; j++)
                                    listArr2[j] = listArr2[j].trim();
                                searchResultCombine = underscore.compact(underscore.union(listArr, listArr2));
                                console.log('value of Trial Search Result Combine');
                                console.log(searchResultCombine);
                                trialSearchResultColumn = table.raw();
                                console.log('value of Trial Search Result from Table');
                                var searchTableFromScenarioList = trialSearchResultColumn.toString().split(",");
                                console.log(searchTableFromScenarioList);
                                var updateTableForSortedColumn = underscore.map(searchTableFromScenarioList, function (num) {
                                    return (num === 'NCI Trial Identifier') ? 'NCI Trial Identifier 1' : num
                                });
                                console.log('List of Items in Coulmn after updating the Table with sorted column');
                                console.log(updateTableForSortedColumn);
                                expect(searchResultCombine).to.eql(updateTableForSortedColumn);
                                searchTrial.searchTrialSortColumnNCITrialID.get(1).click();
                                searchTrial.searchTrialSortColumnOfficialTitle.get(1).click();
                                searchTrial.searchTrialSortColumnLeadOrg.get(1).click();
                                searchTrial.searchTrialSortColumnLeadOrgTrialID.get(1).click();
                                searchTrial.searchTrialSortColumnPrincipalInvestigator.get(1).click();
                                searchTrial.searchTrialSortColumnClinicalTrialID.get(1).click();
                                //element(by.xpath('//*[@id="menuitem-3"]/button')).click();
                                //element(by.xpath('//*[@id="menuitem-7"]/button')).click();
                                //element(by.xpath('//*[@id="menuitem-9"]/button')).click();
                                //element(by.xpath('//*[@id="menuitem-11"]/button')).click();
                                //element(by.xpath('//*[@id="menuitem-13"]/button')).click();
                                //element(by.xpath('//*[@id="menuitem-15"]/button')).click();
                            });
                        });
                    });
                }
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^CTRP will display all trials with a last active submission that match the trial search criteria$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            searchTrial.setSearchTrialProtocolID(wildCardParameter);
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialAllTrials();
            searchTrial.countResultSearchTrial();
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                dbConnect.dbConnectionVerifyAllTrialCount(countOfResult, getDBConnection);
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^CTRP will display all of my draft registrations that match the trial search criteria$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            searchTrial.setSearchTrialProtocolID(wildCardParameter);
            searchTrial.clickSearchTrialSearchButton();
            searchTrial.clickSearchTrialSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifySavedDraftCount(countOfResult, loggedInUserName, getDBConnection);
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I enter text in the title selection$/, function (callback) {
        callback();
    });


    this.Then(/^the search results will display trials that contain the title search text$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            /**** Check for Title with National Complete Trial for All Trials, My Trials and Draft search Option *****/
            trialOfficialTitleNT.then(function (trialOfficialTitleNTValue) {
                searchTrial.setSearchTrialOfficialTitle(trialOfficialTitleNTValue);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleNTValue)).to.eventually.equal('true', assertionErrorMessage + trialOfficialTitleNTValue + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleNTValue)).to.eventually.equal('true', assertionErrorMessage + trialOfficialTitleNTValue + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialOfficialTitleNTValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleNTValue + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSearchTrialClearButton();

            });

            /**** Check for Title with Institutional Complete Trial for All Trials, My Trials and Draft where user is not owner of Trial *****/
            trialOfficialTitleIN.then(function (trialOfficialTitleINValue) {
                searchTrial.setSearchTrialOfficialTitle(trialOfficialTitleINValue);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleINValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleINValue + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleINValue)).to.eventually.equal('true', assertionErrorMessage + trialOfficialTitleINValue + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialOfficialTitleINValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleINValue + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickSearchTrialClearButton();
            });
            /**** Check for Title with Imported Trial for All Trials, My Trials and Draft *****/
            trialOfficialTitleIMP.then(function (trialOfficialTitleIMPValue) {
                searchTrial.setSearchTrialOfficialTitle(trialOfficialTitleIMPValue);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleIMPValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleIMPValue + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleIMPValue)).to.eventually.equal('true', assertionErrorMessage + trialOfficialTitleIMPValue + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialOfficialTitleIMPValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleIMPValue + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSearchTrialClearButton();
            });
            /**** Check for Title with Saved Draft for All Trials, My Trials and Draft where User is the Owner of Draft *****/
            trialOfficialTitleDftEX.then(function (trialOfficialTitleDftEXValue) {
                searchTrial.setSearchTrialOfficialTitle(trialOfficialTitleDftEXValue);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleDftEXValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleDftEXValue + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleDftEXValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleDftEXValue + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialOfficialTitleDftEXValue)).to.eventually.equal('true', assertionErrorMessage + trialOfficialTitleDftEXValue + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickSearchTrialClearButton();
            });
            /**** Check for Title with Saved Draft for All Trials, My Trials and Draft where User is not the Owner of Draft *****/
            trialOfficialTitleDftNT.then(function (trialOfficialTitleDftNTValue) {
                searchTrial.setSearchTrialOfficialTitle(trialOfficialTitleDftNTValue);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleDftNTValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleDftNTValue + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrialNotOwner);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialOfficialTitleDftNTValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleDftNTValue + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrialNotOwner);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialOfficialTitleDftNTValue)).to.eventually.equal('false', assertionErrorMessage + trialOfficialTitleDftNTValue + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrialNotOwner);
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select one or more trial Phase type$/, function (table) {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            var searchTrialPhaseList = table.raw();
            console.log('value of table' + searchTrialPhaseList);
            helper.wait(searchTrial.searchTrialPhase, 'Search Trial by Phase field');
            browser.actions().mouseDown(searchTrial.searchTrialPhase).mouseUp().perform();
            searchTrial.searchTrialPhase.getText().then(function (value) {
                expect(value.toString().split("\n")).to.eql(searchTrialPhaseList.toString().split(","));
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the search results will display trials that match the Phase selected$/, function () {
        return browser.sleep(25).then(function () {
            searchTrial.selectSearchTrialPhase(phaseSelectIAndII);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableName, elementColumnName, phaseSelectIAndII, loggedInUserName, elementNameInTrialTable, searchOptionMyTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableName, elementColumnName, phaseSelectIAndII, loggedInUserName, elementNameInTrialTable, searchOptionAllTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableName, elementColumnName, phaseSelectIAndII, loggedInUserName, elementNameInTrialTable, searchOptionSavedDrafts, countOfResult, getDBConnection);

            });

            leadProtocolIDNT.then(function (trialLeadProtocolIDNT) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDNT);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('true', assertionErrorMessagePhase + phaseSelectIAndII + 'and Lead Protocol ID - ' + trialLeadProtocolIDNT + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('true', assertionErrorMessagePhase + phaseSelectIAndII + 'and Lead Protocol ID - ' + trialLeadProtocolIDNT + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelectIAndII + 'and Lead Protocol ID - ' + trialLeadProtocolIDNT + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });
            leadProtocolIDIMP.then(function (trialLeadProtocolIDIMP) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIMP);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelectIAndII + 'and Trial ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('true', assertionErrorMessagePhase + phaseSelectIAndII + 'and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelectIAndII + 'and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });
            leadProtocolIDDftIN.then(function (trialleadProtocolIDDftIN) {
                searchTrial.setSearchTrialProtocolID(trialleadProtocolIDDftIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelectIAndII + 'and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelectIAndII + 'and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('true', assertionErrorMessagePhase + phaseSelectIAndII + 'and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);

            });
            searchTrial.selectSearchTrialPhase(phaseSelect0);
            searchTrial.selectSearchTrialPhase(phaseSelectIV);
            searchTrial.setSearchTrialProtocolID('');
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithThreeSelection(elementTableName, elementColumnName, phaseSelectIAndII, phaseSelect0, phaseSelectIV, loggedInUserName, elementNameInTrialTable, searchOptionMyTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithThreeSelection(elementTableName, elementColumnName, phaseSelectIAndII, phaseSelect0, phaseSelectIV, loggedInUserName, elementNameInTrialTable, searchOptionAllTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithThreeSelection(elementTableName, elementColumnName, phaseSelectIAndII, phaseSelect0, phaseSelectIV, loggedInUserName, elementNameInTrialTable, searchOptionSavedDrafts, countOfResult, getDBConnection);

            });
            leadProtocolIDIN.then(function (trialLeadProtocolIDIN) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIV)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIV)).to.eventually.equal('true', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(phaseSelectIV)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrialNotOwner);

            });

            leadProtocolIDNT.then(function (trialLeadProtocolIDNT) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDNT);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('true', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDNT + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('true', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDNT + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDNT + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });
            leadProtocolIDIMP.then(function (trialLeadProtocolIDIMP) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIMP);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('true', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });
            leadProtocolIDDftNT.then(function (trialLeadProtocolIDDftNT) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDDftNT);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(phaseSelect0)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDDftNT + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrialNotOwner);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(phaseSelect0)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDDftNT + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrialNotOwner);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(phaseSelect0)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialLeadProtocolIDDftNT + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrialNotOwner);

            });

            leadProtocolIDDftIN.then(function (trialleadProtocolIDDftIN) {
                searchTrial.setSearchTrialProtocolID(trialleadProtocolIDDftIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('false', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(phaseSelectIAndII)).to.eventually.equal('true', assertionErrorMessagePhase + phaseSelect0 + ', ' + phaseSelectIAndII + ', ' + phaseSelectIV + ' and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);

            });


            //browser.sleep(25).then(callback);
        });
    });


    this.When(/^I select a Pilot type$/, function (table) {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            var searchTrialPilotList = table.raw();
            console.log('value of table' + searchTrialPilotList);
            searchTrial.searchTrialPilotTrial.getText().then(function (value) {
                expect(value.split("\n").splice(1, 2)).to.eql(searchTrialPilotList.toString().split(","));
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the search results will display trials that have the Pilot criteria equal to the option selected type$/, function (table) {
        return browser.sleep(25).then(function () {
            searchTrial.selectSearchTrialPilotTrial(pilotYes);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnVerifyCntTrialTbWithOneClm(PilotClnNmInTrialTb, pilotYes, loggedInUserName, searchOptionMyTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnVerifyCntTrialTbWithOneClm(PilotClnNmInTrialTb, pilotYes, loggedInUserName, searchOptionAllTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnVerifyCntTrialTbWithOneClm(PilotClnNmInTrialTb, pilotYes, loggedInUserName, searchOptionSavedDrafts, countOfResult, getDBConnection);
            });

            leadProtocolIDNT.then(function (trialLeadProtocolIDNT) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDNT);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(pilotYes)).to.eventually.equal('true', assertionErrorMessagePhase + pilotYes + 'and Lead Protocol ID - ' + trialLeadProtocolIDNT + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(pilotYes)).to.eventually.equal('true', assertionErrorMessagePhase + pilotYes + 'and Lead Protocol ID - ' + trialLeadProtocolIDNT + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(pilotYes)).to.eventually.equal('false', assertionErrorMessagePhase + pilotYes + 'and Lead Protocol ID - ' + trialLeadProtocolIDNT + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });

            leadProtocolIDIMP.then(function (trialLeadProtocolIDIMP) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIMP);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(pilotYes)).to.eventually.equal('false', assertionErrorMessagePhase + pilotYes + 'and Trial ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(pilotYes)).to.eventually.equal('false', assertionErrorMessagePhase + pilotYes + 'and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(pilotYes)).to.eventually.equal('false', assertionErrorMessagePhase + pilotYes + 'and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });

            leadProtocolIDDftIN.then(function (trialLeadProtocolIDDftIN) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDDftIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(pilotYes)).to.eventually.equal('false', assertionErrorMessagePhase + pilotYes + 'and Lead Protocol ID - ' + trialLeadProtocolIDDftIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(pilotYes)).to.eventually.equal('false', assertionErrorMessagePhase + pilotYes + 'and Lead Protocol ID - ' + trialLeadProtocolIDDftIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(pilotYes)).to.eventually.equal('true', assertionErrorMessagePhase + pilotYes + 'and Lead Protocol ID - ' + trialLeadProtocolIDDftIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);

            });
            searchTrial.setSearchTrialProtocolID('');
            searchTrial.selectSearchTrialPilotTrial(pilotNo);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnVerifyCntTrialTbWithOneClm(PilotClnNmInTrialTb, pilotNo, loggedInUserName, searchOptionMyTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnVerifyCntTrialTbWithOneClm(PilotClnNmInTrialTb, pilotNo, loggedInUserName, searchOptionAllTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnVerifyCntTrialTbWithOneClm(PilotClnNmInTrialTb, pilotNo, loggedInUserName, searchOptionSavedDrafts, countOfResult, getDBConnection);
            });

            leadProtocolIDEX.then(function (trialLeadProtocolIDEX) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDEX);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(pilotNo)).to.eventually.equal('true', assertionErrorMessagePhase + pilotNo + 'and Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(pilotNo)).to.eventually.equal('true', assertionErrorMessagePhase + pilotNo + 'and Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(pilotNo)).to.eventually.equal('false', assertionErrorMessagePhase + pilotNo + 'and Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });

            leadProtocolIDIMP.then(function (trialLeadProtocolIDIMP) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIMP);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(pilotNo)).to.eventually.equal('false', assertionErrorMessagePhase + pilotNo + 'and Trial ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(pilotNo)).to.eventually.equal('false', assertionErrorMessagePhase + pilotNo + 'and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(pilotNo)).to.eventually.equal('false', assertionErrorMessagePhase + pilotNo + 'and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });

            leadProtocolIDDftEX.then(function (trialLeadProtocolIDDftEX) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDDftEX);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(pilotNo)).to.eventually.equal('false', assertionErrorMessagePhase + pilotNo + 'and Lead Protocol ID - ' + trialLeadProtocolIDDftEX + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(pilotNo)).to.eventually.equal('false', assertionErrorMessagePhase + pilotNo + 'and Lead Protocol ID - ' + trialLeadProtocolIDDftEX + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(pilotNo)).to.eventually.equal('true', assertionErrorMessagePhase + pilotNo + 'and Lead Protocol ID - ' + trialLeadProtocolIDDftEX + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);

            });

            //browser.sleep(25).then(callback);
        });
    });


    this.When(/^I select one or more trial primary purpose type$/, function (table) {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            var searchTrialPurposeList = table.raw();
            console.log('value of table' + searchTrialPurposeList);
            helper.wait(searchTrial.searchTrialPurpose, 'Search Trial by Purpose field');
            browser.actions().mouseDown(searchTrial.searchTrialPurpose).mouseUp().perform();
            searchTrial.searchTrialPurpose.getText().then(function (value) {
                expect(value.toString().split("\n")).to.eql(searchTrialPurposeList.toString().split(","));
            });
            searchTrial.selectSearchTrialPurpose(purposeDiagnostic);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNamePurpose, elementColumnNamePurpose, purposeDiagnostic, loggedInUserName, elementNameInTrialTablePurpose, searchOptionMyTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNamePurpose, elementColumnNamePurpose, purposeDiagnostic, loggedInUserName, elementNameInTrialTablePurpose, searchOptionAllTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNamePurpose, elementColumnNamePurpose, purposeDiagnostic, loggedInUserName, elementNameInTrialTablePurpose, searchOptionSavedDrafts, countOfResult, getDBConnection);

            });

            leadProtocolIDEX.then(function (trialLeadProtocolIDEX) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDEX);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('true', assertionErrorMessagePurpose + purposeDiagnostic + 'and Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('true', assertionErrorMessagePurpose + purposeDiagnostic + 'and Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + 'and Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });
            leadProtocolIDIMP.then(function (trialLeadProtocolIDIMP) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIMP);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + 'and Trial ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('true', assertionErrorMessagePurpose + purposeDiagnostic + 'and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + 'and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });
            leadProtocolIDDftIN.then(function (trialleadProtocolIDDftIN) {
                searchTrial.setSearchTrialProtocolID(trialleadProtocolIDDftIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + 'and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + 'and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('true', assertionErrorMessagePurpose + purposeDiagnostic + 'and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);

            });
            searchTrial.selectSearchTrialPurpose(purposeBasicScience);
            searchTrial.selectSearchTrialPurpose(purposeOther);
            searchTrial.setSearchTrialProtocolID('');
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithThreeSelection(elementTableNamePurpose, elementColumnNamePurpose, purposeDiagnostic, purposeBasicScience, purposeOther, loggedInUserName, elementNameInTrialTablePurpose, searchOptionMyTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithThreeSelection(elementTableNamePurpose, elementColumnNamePurpose, purposeDiagnostic, purposeBasicScience, purposeOther, loggedInUserName, elementNameInTrialTablePurpose, searchOptionAllTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithThreeSelection(elementTableNamePurpose, elementColumnNamePurpose, purposeDiagnostic, purposeBasicScience, purposeOther, loggedInUserName, elementNameInTrialTablePurpose, searchOptionSavedDrafts, countOfResult, getDBConnection);

            });
            leadProtocolIDIN.then(function (trialLeadProtocolIDIN) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(purposeBasicScience)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ' ' + purposeOther + ' ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(purposeBasicScience)).to.eventually.equal('true', assertionErrorMessagePurpose + purposeDiagnostic + ' ' + purposeOther + ' ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(purposeBasicScience)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ' ' + purposeOther + ' ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrialNotOwner);

            });

            leadProtocolIDEX.then(function (trialLeadProtocolIDEX) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDEX);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('true', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('true', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });
            leadProtocolIDIMP.then(function (trialLeadProtocolIDIMP) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIMP);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('true', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });
            leadProtocolIDDftNT.then(function (trialLeadProtocolIDDftNT) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDDftNT);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(purposeOther)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDDftNT + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrialNotOwner);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(purposeOther)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDDftNT + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrialNotOwner);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(purposeOther)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialLeadProtocolIDDftNT + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrialNotOwner);

            });

            leadProtocolIDDftIN.then(function (trialleadProtocolIDDftIN) {
                searchTrial.setSearchTrialProtocolID(trialleadProtocolIDDftIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('false', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(purposeDiagnostic)).to.eventually.equal('true', assertionErrorMessagePurpose + purposeDiagnostic + ', ' + purposeOther + ', ' + purposeBasicScience + ' and Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);

            });

            // browser.sleep(25).then(callback);
        });
    });


    this.When(/^I enter text in the protocol identifier selection$/, function (callback) {
        callback();
    });

    this.Then(/^the search results will display trials that contain the protocol identifier search text$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            nciIDNT.then(function (trialNciIDNT) {
                searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDNT + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDNT + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDNT + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);
                otherIDNT.then(function (trialOtherIDNT) {
                    searchTrial.setSearchTrialProtocolID(trialOtherIDNT[0]);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDNT[0] + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                    searchTrial.clickAllTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDNT[0] + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                    searchTrial.clickSavedDrafts();
                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDNT[0] + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

                });
            });

            nciIDIN.then(function (trialNciIDIN) {
                searchTrial.setSearchTrialProtocolID(trialNciIDIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialNciIDIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialNciIDIN)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialNciIDIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                otherIDIN.then(function (trialOtherIDIN) {
                    searchTrial.setSearchTrialProtocolID(trialOtherIDIN[0]);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDIN[0] + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                    searchTrial.clickAllTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDIN)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDIN[0] + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                    searchTrial.clickSavedDrafts();
                    expect(projectFunctions.inSearchResults(trialNciIDIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDIN[0] + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrialNotOwner);

                });
            });

            nciIDIMP.then(function (trialNciIDIMP) {
                searchTrial.setSearchTrialProtocolID(trialNciIDIMP);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialNciIDIMP)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDIMP + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialNciIDIMP)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDIMP + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialNciIDIMP)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDIMP + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);
                otherIDIMP.then(function (trialOtherIDIMP) {
                    searchTrial.setSearchTrialProtocolID(trialOtherIDIMP[0]);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDIMP)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDIMP[0] + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                    searchTrial.clickAllTrials();
                    expect(projectFunctions.inSearchResults(trialNciIDIMP)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDIMP[0] + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                    searchTrial.clickSavedDrafts();
                    expect(projectFunctions.inSearchResults(trialNciIDIMP)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDIMP[0] + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

                });
            });

            leadProtocolIDEX.then(function (trialLeadProtocolIDEX) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDEX);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDEX)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDEX)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDEX)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDEX + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });

            leadProtocolIDIN.then(function (trialLeadProtocolIDIN) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDIN)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrialNotOwner);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrialNotOwner);

            });

            leadProtocolIDIMP.then(function (trialLeadProtocolIDIMP) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDIMP);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDIMP)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDIMP)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDIMP)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDIMP + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });

            leadProtocolIDDftNT.then(function (trialLeadProtocolIDDftNT) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDDftNT);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDDftNT)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDDftNT + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrialNotOwner);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDDftNT)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDDftNT + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrialNotOwner);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialLeadProtocolIDDftNT)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDDftNT + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrialNotOwner);
                otherIDDftNT.then(function (trialOtherIDDftNT) {
                    searchTrial.setSearchTrialProtocolID(trialOtherIDDftNT[0]);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialLeadProtocolIDDftNT)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDDftNT[0] + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrialNotOwner);
                    searchTrial.clickAllTrials();
                    expect(projectFunctions.inSearchResults(trialLeadProtocolIDDftNT)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDDftNT[0] + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrialNotOwner);
                    searchTrial.clickSavedDrafts();
                    expect(projectFunctions.inSearchResults(trialLeadProtocolIDDftNT)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDDftNT[0] + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrialNotOwner);

                });
            });

            leadProtocolIDDftIN.then(function (trialleadProtocolIDDftIN) {
                searchTrial.setSearchTrialProtocolID(trialleadProtocolIDDftIN);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(trialleadProtocolIDDftIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(trialleadProtocolIDDftIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(trialleadProtocolIDDftIN)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialleadProtocolIDDftIN + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                otherIDDftIN.then(function (trialOtherIDDftIN) {
                    searchTrial.setSearchTrialProtocolID(trialOtherIDDftIN[0]);
                    searchTrial.clickMyTrials();
                    expect(projectFunctions.inSearchResults(trialleadProtocolIDDftIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDDftIN[0] + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                    searchTrial.clickAllTrials();
                    expect(projectFunctions.inSearchResults(trialleadProtocolIDDftIN)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDDftIN[0] + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                    searchTrial.clickSavedDrafts();
                    expect(projectFunctions.inSearchResults(trialleadProtocolIDDftIN)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial Other ID - ' + trialOtherIDDftIN[0] + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);

                });
            });

            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select an organization from the organization name search look\-ahead$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            leadProtocolIDEX.then(function (trialLeadProtocolIDEX) {
                searchTrial.setSearchTrialOrganization(trialLeadProtocolIDEX);
                expect(element(by.linkText(trialLeadProtocolIDEX)).isPresent()).to.eventually.equal(true, '--> ' + trialLeadProtocolIDEX + ' <-- look ahead Organization link did not appear');
                element(by.linkText(trialLeadProtocolIDEX)).click();
                expect(searchTrial.searchTrialOrganization.getAttribute('value')).to.eventually.equal(trialLeadProtocolIDEX, 'Selected Organization value does not match with provided Organization');
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the system will search all organization where Organization type is$/, function (table, callback) {
        callback();
    });

    this.Then(/^Trials that has the selected organization will be displayed$/, function () {
        return browser.sleep(25).then(function () {
            leadOrganizationNT.then(function (leadOrganizationTrial) {
                searchTrial.setSearchTrialOrganization(leadOrganizationTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('true', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                    searchTrial.clickAllTrials();
                    expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('true', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                    searchTrial.countResultSearchTrial();
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 10).then(function () {
                        expect(countOfResult).to.equal('3', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                        searchTrial.clickSavedDrafts();
                        expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

                    });
                });
            });
            sponsorNT.then(function (sponsorOrgTrial) {
                searchTrial.setSearchTrialOrganization(sponsorOrgTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('true', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                });
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('true', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('3', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                });
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });

            leadOrganizationDftNT.then(function (leadOrganizationDftTrial) {
                searchTrial.setSearchTrialOrganization(leadOrganizationDftTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationDftTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationDftTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);

                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(leadOrganizationDftTrial)).to.eventually.equal('true', assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial + ' does not match.');
                });

            });

            sponsorDftNT.then(function (sponsorOrgDftTrial) {
                searchTrial.setSearchTrialOrganization(sponsorOrgDftTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgDftTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgDftTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);

                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(sponsorOrgDftTrial)).to.eventually.equal('true', assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial + ' does not match.');
                });

            });

            participatingSiteIMP.then(function (participatingSiteIMPTrial) {
                searchTrial.setSearchTrialOrganization(participatingSiteIMPTrial[0]);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('true', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });

            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select an organizations from an organization name search look\-ahead$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            leadProtocolIDEX.then(function (trialLeadProtocolIDEX) {
                searchTrial.setSearchTrialOrganization(trialLeadProtocolIDEX);
                expect(element(by.linkText(trialLeadProtocolIDEX)).isPresent()).to.eventually.equal(true, '--> ' + trialLeadProtocolIDEX + ' <-- look ahead Organization link did not appear');
                element(by.linkText(trialLeadProtocolIDEX)).click();
                expect(searchTrial.searchTrialOrganization.getAttribute('value')).to.eventually.equal(trialLeadProtocolIDEX, 'Selected Organization value does not match with provided Organization');
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select one or more Organization type as$/, function (table) {
        return browser.sleep(25).then(function () {
            var searchTrialOrgTypeList = table.raw();
            console.log('value of table' + searchTrialOrgTypeList);
            helper.wait(searchTrial.searchTrialOrganizationType, 'Search Trial by Phase field');
            browser.actions().mouseDown(searchTrial.searchTrialOrganizationType).mouseUp().perform();
            searchTrial.searchTrialOrganizationType.getText().then(function (value) {
                expect(value.toString().split("\n")).to.eql(searchTrialOrgTypeList.toString().split(","));
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the search results will display trials where the organization selected has the organization role selected$/, function () {
        return browser.sleep(25).then(function () {
            searchTrial.selectSearchTrialOrganizationType(orgTypeLeadOrg);
            leadOrganizationNT.then(function (leadOrganizationTrial) {
                searchTrial.setSearchTrialOrganization(leadOrganizationTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('true', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                    searchTrial.clickAllTrials();
                    expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('true', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                    searchTrial.countResultSearchTrial();
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 10).then(function () {
                        expect(countOfResult).to.equal('3', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                        searchTrial.clickSavedDrafts();
                        expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

                    });
                });
            });
            leadOrganizationDftNT.then(function (leadOrganizationDftTrial) {
                searchTrial.setSearchTrialOrganization(leadOrganizationDftTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationDftTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationDftTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);

                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(leadOrganizationDftTrial)).to.eventually.equal('true', assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial + ' does not match.');
                });

            });
            sponsorNT.then(function (sponsorOrgTrial) {
                searchTrial.setSearchTrialOrganization(sponsorOrgTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });
            participatingSiteIMP.then(function (participatingSiteIMPTrial) {
                searchTrial.setSearchTrialOrganization(participatingSiteIMPTrial[0]);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });
            searchTrial.clickSearchTrialClearButton();
            searchTrial.selectSearchTrialOrganizationType(orgTypeSponsor);
            sponsorNT.then(function (sponsorOrgTrial) {
                searchTrial.setSearchTrialOrganization(sponsorOrgTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('true', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                });
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('true', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('3', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                });
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });
            sponsorDftNT.then(function (sponsorOrgDftTrial) {
                searchTrial.setSearchTrialOrganization(sponsorOrgDftTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgDftTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgDftTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);

                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(sponsorOrgDftTrial)).to.eventually.equal('true', assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial + ' does not match.');
                });

            });
            leadOrganizationNT.then(function (leadOrganizationTrial) {
                searchTrial.setSearchTrialOrganization(leadOrganizationTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });
            participatingSiteIMP.then(function (participatingSiteIMPTrial) {
                searchTrial.setSearchTrialOrganization(participatingSiteIMPTrial[0]);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });
            searchTrial.clickSearchTrialClearButton();
            searchTrial.selectSearchTrialOrganizationType(orgTypeParticipatingSite);
            participatingSiteIMP.then(function (participatingSiteIMPTrial) {
                searchTrial.setSearchTrialOrganization(participatingSiteIMPTrial[0]);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('true', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });
            leadOrganizationNT.then(function (leadOrganizationTrial) {
                searchTrial.setSearchTrialOrganization(leadOrganizationTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });

            sponsorNT.then(function (sponsorOrgTrial) {
                searchTrial.setSearchTrialOrganization(sponsorOrgTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });
            searchTrial.selectSearchTrialOrganizationType(orgTypeLeadOrg);
            searchTrial.selectSearchTrialOrganizationType(orgTypeSponsor);
            leadOrganizationNT.then(function (leadOrganizationTrial) {
                searchTrial.setSearchTrialOrganization(leadOrganizationTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('true', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                    searchTrial.clickAllTrials();
                    expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('true', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                    searchTrial.countResultSearchTrial();
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 10).then(function () {
                        expect(countOfResult).to.equal('3', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                        searchTrial.clickSavedDrafts();
                        expect(projectFunctions.inSearchResults(leadOrganizationTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

                    });
                });
            });
            leadOrganizationDftNT.then(function (leadOrganizationDftTrial) {
                searchTrial.setSearchTrialOrganization(leadOrganizationDftTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationDftTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(leadOrganizationDftTrial)).to.eventually.equal('false', assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);

                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(leadOrganizationDftTrial)).to.eventually.equal('true', assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageLeadOrg + leadOrganizationDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial + ' does not match.');
                });

            });
            sponsorNT.then(function (sponsorOrgTrial) {
                searchTrial.setSearchTrialOrganization(sponsorOrgTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('true', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                });
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('true', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('3', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                });
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(sponsorOrgTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

            });
            sponsorDftNT.then(function (sponsorOrgDftTrial) {
                searchTrial.setSearchTrialOrganization(sponsorOrgDftTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgDftTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(sponsorOrgDftTrial)).to.eventually.equal('false', assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);

                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(sponsorOrgDftTrial)).to.eventually.equal('true', assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + sponsorOrgDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial + ' does not match.');
                });

            });
            participatingSiteIMP.then(function (participatingSiteIMPTrial) {
                searchTrial.setSearchTrialOrganization(participatingSiteIMPTrial[0]);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('true', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(participatingSiteIMPTrial[0])).to.eventually.equal('false', assertionErrorMessageParticipatingSite + participatingSiteIMPTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);

            });
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select a person from a person name search$/, function (callback) {
        callback();
    });

    this.Then(/^the search results will display trials where the person selected is principal investigator$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            principalInvestigatorNT.then(function (principalInvestigatorTrial) {
                searchTrial.setSearchTrialPrincipalInvestigator(principalInvestigatorTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(principalInvestigatorTrial)).to.eventually.equal('true', assertionErrorMessagePrincipalInvestigator + principalInvestigatorTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessagePrincipalInvestigator + principalInvestigatorTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                    searchTrial.clickAllTrials();
                    expect(projectFunctions.inSearchResults(principalInvestigatorTrial)).to.eventually.equal('true', assertionErrorMessagePrincipalInvestigator + principalInvestigatorTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                    searchTrial.countResultSearchTrial();
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 10).then(function () {
                        expect(countOfResult).to.equal('3', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessagePrincipalInvestigator + principalInvestigatorTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial + ' does not match.');
                        searchTrial.clickSavedDrafts();
                        expect(projectFunctions.inSearchResults(principalInvestigatorTrial)).to.eventually.equal('false', assertionErrorMessagePrincipalInvestigator + principalInvestigatorTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);

                    });
                });
            });
            principalInvestigatorDftIN.then(function (principalInvestigatorDftTrial) {
                searchTrial.setSearchTrialPrincipalInvestigator(principalInvestigatorDftTrial);
                searchTrial.clickMyTrials();
                expect(projectFunctions.inSearchResults(principalInvestigatorDftTrial)).to.eventually.equal('false', assertionErrorMessagePrincipalInvestigator + principalInvestigatorDftTrial + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.clickAllTrials();
                expect(projectFunctions.inSearchResults(principalInvestigatorDftTrial)).to.eventually.equal('false', assertionErrorMessagePrincipalInvestigator + principalInvestigatorDftTrial + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);

                searchTrial.clickSavedDrafts();
                expect(projectFunctions.inSearchResults(principalInvestigatorDftTrial)).to.eventually.equal('true', assertionErrorMessagePrincipalInvestigator + principalInvestigatorDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                searchTrial.countResultSearchTrial();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {
                    expect(countOfResult).to.equal('2', 'Validation of Count of trials for the search Criteria -- ' + assertionErrorMessageSponsorOrg + principalInvestigatorDftTrial + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial + ' does not match.');
                });

            });
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select one or more Study Source type$/, function (table) {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            var searchTrialStudySrcList = table.raw();
            console.log('value of table' + searchTrialStudySrcList);
            helper.wait(searchTrial.searchTrialStudySource, 'Search Trial by Study Source field');
            browser.actions().mouseDown(searchTrial.searchTrialStudySource).mouseUp().perform();
            searchTrial.searchTrialStudySource.getText().then(function (value) {
                expect(value.toString().split("\n")).to.eql(searchTrialStudySrcList.toString().split(","));
            });
            //browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the search results will display trials with a matching Study Source$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            searchTrial.selectSearchTrialStudySource(trialNAT);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialNAT, loggedInUserName, elementNameInTrialTableSource, searchOptionMyTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialNAT, loggedInUserName, elementNameInTrialTableSource, searchOptionAllTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialNAT, loggedInUserName, elementNameInTrialTableSource, searchOptionSavedDrafts, countOfResult, getDBConnection);
            });
            searchTrial.clickSearchTrialClearButton();
            searchTrial.selectSearchTrialStudySource(trialEPR);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialEPR, loggedInUserName, elementNameInTrialTableSource, searchOptionMyTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialEPR, loggedInUserName, elementNameInTrialTableSource, searchOptionAllTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialEPR, loggedInUserName, elementNameInTrialTableSource, searchOptionSavedDrafts, countOfResult, getDBConnection);
            });
            searchTrial.clickSearchTrialClearButton();
            searchTrial.selectSearchTrialStudySource(trialINS);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialINS, loggedInUserName, elementNameInTrialTableSource, searchOptionMyTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialINS, loggedInUserName, elementNameInTrialTableSource, searchOptionAllTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialINS, loggedInUserName, elementNameInTrialTableSource, searchOptionSavedDrafts, countOfResult, getDBConnection);
            });
            searchTrial.clickSearchTrialClearButton();
            searchTrial.selectSearchTrialStudySource(trialIND);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialIND, loggedInUserName, elementNameInTrialTableSource, searchOptionMyTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialIND, loggedInUserName, elementNameInTrialTableSource, searchOptionAllTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialIND, loggedInUserName, elementNameInTrialTableSource, searchOptionSavedDrafts, countOfResult, getDBConnection);
            });
            searchTrial.clickSearchTrialClearButton();
            searchTrial.selectSearchTrialStudySource(trialOTH);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialOTH, loggedInUserName, elementNameInTrialTableSource, searchOptionMyTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialOTH, loggedInUserName, elementNameInTrialTableSource, searchOptionAllTrials, countOfResult, getDBConnection);
            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithID(elementTableNameSource, elementColumnNameSource, trialOTH, loggedInUserName, elementNameInTrialTableSource, searchOptionSavedDrafts, countOfResult, getDBConnection);
            });
            searchTrial.selectSearchTrialStudySource(trialINS);
            searchTrial.selectSearchTrialStudySource(trialIND);
            searchTrial.clickMyTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithThreeSelection(elementTableNameSource, elementColumnNameSource, trialOTH, trialINS, trialIND, loggedInUserName, elementNameInTrialTableSource, searchOptionMyTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickAllTrials();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithThreeSelection(elementTableNameSource, elementColumnNameSource, trialOTH, trialINS, trialIND, loggedInUserName, elementNameInTrialTableSource, searchOptionAllTrials, countOfResult, getDBConnection);

            });
            searchTrial.clickSavedDrafts();
            searchTrial.countResultSearchTrial();
            login.loginUser.getText().then(function (loggedInUserName) {
                dbConnect.dbConnectionVerifyCountQueryWithThreeSelection(elementTableNameSource, elementColumnNameSource, trialOTH, trialINS, trialIND, loggedInUserName, elementNameInTrialTableSource, searchOptionSavedDrafts, countOfResult, getDBConnection);

            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.When(/^I have selected or entered multiple search criteria$/, function (callback) {
        callback();
    });

    this.When(/^selected a search option$/, function (callback) {
        callback();
    });

    this.Then(/^the search results will display the trials with a last active submission that match all the search criteria selected$/, function () {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            nciIDNT.then(function (trialNciIDNT) {
                searchTrial.setSearchTrialProtocolID(trialNciIDNT);
                trialOfficialTitleNT.then(function (trialOfficialTitleNTValue) {
                    searchTrial.setSearchTrialOfficialTitle(trialOfficialTitleNTValue);
                    trialPhaseNT.then(function (trialPhaseNTValue) {
                        searchTrial.selectSearchTrialPhase(trialPhaseNTValue);
                        trialPurposeNT.then(function (trialPurposeNTValue) {
                            searchTrial.selectSearchTrialPurpose(trialPurposeNTValue);
                            searchTrial.selectSearchTrialPilotTrial(pilotYes);
                            principalInvestigatorNT.then(function (principalInvestigatorTrial) {
                                searchTrial.setSearchTrialPrincipalInvestigator(principalInvestigatorTrial);
                                searchTrial.selectSearchTrialOrganizationType(orgTypeLeadOrg);
                                searchTrial.selectSearchTrialOrganizationType(orgTypeSponsor);
                                leadOrganizationNT.then(function (leadOrganizationTrial) {
                                    searchTrial.setSearchTrialOrganization(leadOrganizationTrial);
                                    searchTrial.selectSearchTrialStudySource(trialIND);
                                    searchTrial.selectSearchTrialStudySource(trialNAT);
                                    searchTrial.clickMyTrials();
                                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDNT + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageCompleteTrial);
                                    searchTrial.clickAllTrials();
                                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDNT + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageCompleteTrial);
                                    searchTrial.clickSavedDrafts();
                                    expect(projectFunctions.inSearchResults(trialNciIDNT)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial ID - ' + trialNciIDNT + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageCompleteTrial);
                                });
                            });
                        });
                    });
                });
            });
            searchTrial.clickSearchTrialClearButton();
            leadProtocolIDDftEX.then(function (trialLeadProtocolIDDftEX) {
                searchTrial.setSearchTrialProtocolID(trialLeadProtocolIDDftEX);
                trialOfficialTitleDftEX.then(function (trialOfficialTitleDftEXValue) {
                    searchTrial.setSearchTrialOfficialTitle(trialOfficialTitleDftEXValue);
                    trialPhaseDftEX.then(function (trialPhaseDftEXValue) {
                        searchTrial.selectSearchTrialPhase(trialPhaseDftEXValue);
                        trialPurposeDftEX.then(function (trialPurposeDftEXValue) {
                            searchTrial.selectSearchTrialPurpose(trialPurposeDftEXValue);
                            searchTrial.selectSearchTrialPilotTrial(pilotNo);
                            principalInvestigatorDftEX.then(function (principalInvestigatorDftEXTrial) {
                                searchTrial.setSearchTrialPrincipalInvestigator(principalInvestigatorDftEXTrial);
                                searchTrial.selectSearchTrialOrganizationType(orgTypeLeadOrg);
                                searchTrial.selectSearchTrialOrganizationType(orgTypeSponsor);
                                sponsorDftEX.then(function (sponsorDftEXTrial) {
                                    searchTrial.setSearchTrialOrganization(sponsorDftEXTrial);
                                    searchTrial.selectSearchTrialStudySource(trialEPR);
                                    searchTrial.selectSearchTrialStudySource(trialNAT);
                                    searchTrial.clickMyTrials();
                                    expect(projectFunctions.inSearchResults(trialLeadProtocolIDDftEX)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDDftEX + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageDraftTrial);
                                    searchTrial.clickAllTrials();
                                    expect(projectFunctions.inSearchResults(trialLeadProtocolIDDftEX)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDDftEX + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageDraftTrial);
                                    searchTrial.clickSavedDrafts();
                                    expect(projectFunctions.inSearchResults(trialLeadProtocolIDDftEX)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Lead Protocol ID - ' + trialLeadProtocolIDDftEX + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageDraftTrial);
                                });
                            });
                        });
                    });
                });
            });
            searchTrial.clickSearchTrialClearButton();
            nciIDIMP.then(function (trialnciIDIMP) {
                searchTrial.setSearchTrialProtocolID(trialnciIDIMP);
                trialOfficialTitleIMP.then(function (trialOfficialTitleIMPValue) {
                    searchTrial.setSearchTrialOfficialTitle(trialOfficialTitleIMPValue);
                    trialPhaseIMP.then(function (trialPhaseIMPValue) {
                        searchTrial.selectSearchTrialPhase(trialPhaseIMPValue);
                        trialPurposeIMP.then(function (trialPurposeIMPValue) {
                            searchTrial.selectSearchTrialPurpose(trialPurposeIMPValue);
                            principalInvestigatorIMP.then(function (principalInvestigatorIMPTrial) {
                                searchTrial.setSearchTrialPrincipalInvestigator(principalInvestigatorIMPTrial);
                                searchTrial.selectSearchTrialOrganizationType(orgTypeLeadOrg);
                                searchTrial.selectSearchTrialOrganizationType(orgTypeSponsor);
                                searchTrial.selectSearchTrialOrganizationType(orgTypeParticipatingSite);
                                participatingSiteIMP.then(function (participatingSiteIMPTrial) {
                                    searchTrial.setSearchTrialOrganization(participatingSiteIMPTrial);
                                    searchTrial.selectSearchTrialStudySource(trialEPR);
                                    searchTrial.selectSearchTrialStudySource(trialNAT);
                                    searchTrial.selectSearchTrialStudySource(trialIND);
                                    searchTrial.clickMyTrials();
                                    expect(projectFunctions.inSearchResults(trialnciIDIMP)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial ID - ' + trialnciIDIMP + ' ' + assertionErrorMessageMyTrialOption + assertionErrorMessageImportTrial);
                                    searchTrial.clickAllTrials();
                                    expect(projectFunctions.inSearchResults(trialnciIDIMP)).to.eventually.equal('true', assertionErrorMessageTrialID + ' Trial ID - ' + trialnciIDIMP + ' ' + assertionErrorMessageAllTrialOption + assertionErrorMessageImportTrial);
                                    searchTrial.clickSavedDrafts();
                                    expect(projectFunctions.inSearchResults(trialnciIDIMP)).to.eventually.equal('false', assertionErrorMessageTrialID + ' Trial ID - ' + trialnciIDIMP + ' ' + assertionErrorMessageDraftTrialOption + assertionErrorMessageImportTrial);
                                });
                            });
                        });
                    });
                });
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have clicked on the search button to find any trial type$/, function (table, callback) {
        callback();
    });

    this.When(/^I have not selected or entered any search criteria$/, function (callback) {
        callback();
    });

    this.Then(/^the message "([^"]*)" will be displayed$/, function (arg1) {
        return browser.sleep(25).then(function () {
            trialMenuItem.clickTrials();
            trialMenuItem.clickListSearchTrialLink();
            searchTrial.clickMyTrials();
            expect(searchTrial.searchTrialNoCriteriaMessage.getText()).to.eventually.equal(arg1, 'Validating warning message on Search Trial Page when no criteria is provided with My Trial Search Option');
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(false, 'Validating no result is displayed when no criteria is provided with My Trial Search Option');
            searchTrial.clickAllTrials();
            expect(searchTrial.searchTrialNoCriteriaMessage.getText()).to.eventually.equal(arg1, 'Validating warning message on Search Trial Page when no criteria is provided with All Trial Search Option');
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(false, 'Validating no result is displayed when no criteria is provided with All Trial Search Option');
            searchTrial.clickSavedDrafts();
            expect(searchTrial.searchTrialNoCriteriaMessage.getText()).to.eventually.equal(arg1, 'Validating warning message on Search Trial Page when no criteria is provided with Saved Draft Search Option');
            expect(element(by.css('div.ui-grid-cell-contents')).isPresent()).to.eventually.equal(false, 'Validating no result is displayed when no criteria is provided with Saved Draft Search Option');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^no Trials will be found in the results$/, function (callback) {
        callback();
    });


};