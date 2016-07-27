/**
 * Created by singhs10 on 11/17/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var assert = require('assert');
var helperFunctions = require('../support/helper');
var addTrialPage = require('../support/registerTrialPage');
var searchTrialPage = require('../support/searchTrialPage');
var trialMenuItemList = require('../support/trialCommonBar');
var menuItemList = require('../support/PoCommonBar');
var addOrgPage = require('../support/AddOrganizationPage');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var searchPeoplePage = require('../support/ListOfPeoplePage');
var addPeoplePage = require('../support/AddPersonPage');
//var searchFamilyPage = require('../support/ListOfFamiliesPage');
var addFamilyPage = require('../support/AddFamilyPage');
var selectValuePage = require('../support/CommonSelectList');
var loginPage = require('../support/LoginPage');
var moment = require('moment');
//var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var underscore = require('underscore');
var projectFunctionsPage = require('../support/projectMethods');
var importTrialPage = require('../support/registerImportTrialPage');
var participatingSitePage = require('../support/registerAddParticipatingSite');
var Q = require('q');
var https = require('https');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray : false});
var concat = require('concat-stream');
var util = require('util');


var projectMethodsRegistry = function () {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var selectValue = new selectValuePage();
    var addOrg = new addOrgPage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();
    var addPeople = new addPeoplePage();
    //var searchFamily = new searchFamilyPage();
    var addFamily = new addFamilyPage();
    var helper = new helperFunctions();
    var addTrial = new addTrialPage();
    var searchTrial = new searchTrialPage();
    var trialMenuItem = new trialMenuItemList();
//    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var commonFunctions = new abstractionCommonMethods();
    var trialDoc = new abstractionTrialRelatedDocument();
    var projectFunctions = new projectFunctionsPage();
    var importTrial = new importTrialPage();
    var participatingSite = new participatingSitePage();
    var self = this;




    this.selectTrials = function (trialType) {
        if (trialType === 'National') {
            trialMenuItem.clickRegisterNationalTrialLink();
        }
        else if (trialType === 'Externally Peer-Reviewed') {
            trialMenuItem.clickRegisterExternallyPeerReviewedTrialLink();
        }
        else if (trialType === 'Institutional') {
            trialMenuItem.clickRegisterInstitutionalTrialLink();
        }
        else if (trialType === 'Industrial/Other') {
            trialMenuItem.clickRegisterIndustrialOtherTrialLink();
        }
        else {
            assert.fail(0, 1, 'Given Trial type does not match any criteria. The Trial types in the list are National, Externally Peer-Reviewed, Institutional and Industrial/Other');
        }
    };

    /*****************************************************************
     * Method: Verify Trial Other Identifiers value
     * @param protocolIDOrigin
     * @param protocolID
     *****************************************************************/
    this.verifyAddTrialOtherTrialIdentifier = function (protocolIDOrigin, protocolID) {
        return addTrial.addTrialVerifyOtherTrialIdentifier.getText().filter(function (row) {
            // Get the second column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === protocolIDOrigin;
            });
        }).then(function (rows) {
                console.log('value of row' + rows);
                expect(rows[0].element(by.css('.col-md-6.protocol-id')).getText()).to.eventually.equal(protocolID);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };

    /*****************************************************************
     * Method: Verify Trial Other Identifiers value in View Page
     * @param protocolIDOrigin
     * @param protocolID
     *****************************************************************/
    this.verifyAddTrialOtherTrialIdentifierViewPg = function (protocolIDOrigin, protocolID) {
        return addTrial.viewTrialOtherIdentifierAllValuesTbl.getText().filter(function (row) {
            // Get the second column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === protocolIDOrigin;
            });
        }).then(function (rows) {
                console.log('value of row' + rows);
                expect(rows[0].element(by.css('.col-md-6.protocol-id')).getText()).to.eventually.equal(protocolID);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };

    /*****************************************************************
     * Method: Verify Trial Other Identifiers value
     * @param anyItemInTable
     *****************************************************************/
    this.verifyAddTrialOtherTrialIdentifierTable = function (anyItemInTable) {
        return addTrial.addTrialVerifyOtherTrialIdentifierTable.filter(function (name) {
            return name.getText().then(function (text) {
                console.log('text is' + text + 'Item to be verified' + anyItemInTable);
                return text === anyItemInTable;
            });
        }).then(function (filteredElements) {
            console.log('filtered elements' + filteredElements);
            // Only the elements that passed the filter will be here. This is an array.
            if (filteredElements.length > 0) {
                return 'true';
            }
            else {
                return 'false';
            }
        });
    };

    /*****************************************************************
     * Method: Add Trial Other Identifiers value if it does not exist
     * @param anyItemInTable
     *****************************************************************/
    this.addOtherTrialIdentifier = function (anyItemInTable) {
        return addTrial.addTrialVerifyOtherTrialIdentifierTable.filter(function (name) {
            return name.getText().then(function (text) {
                console.log('text is' + text + 'Item to be verified' + anyItemInTable);
                return text === anyItemInTable;
            });
        }).then(function (filteredElements) {
            console.log('filtered elements' + filteredElements);
            // Only the elements that passed the filter will be here. This is an array.
            if (filteredElements.length > 0) {
               // element.all(by.css('.glyphicon.glyphicon-remove-circle')).get(0).click();
                addTrial.addTrialRemoveOtherTrialIdentifier.click();
                addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'Other Identifier')).click();
                addTrial.setAddTrialProtocolID('OTHupd' + projectFunctions.getRandomInt(100000, 990000));
                addTrial.clickAddTrialAddProtocolButton();
            }
            else {
                addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'Other Identifier')).click();
                addTrial.setAddTrialProtocolID('OTHupd' + projectFunctions.getRandomInt(100000, 990000));
                addTrial.clickAddTrialAddProtocolButton();
            }
        });
    };

    /*****************************************************************
     * Method: Verify Trial Oversight Authority Country Organization
     * @param country
     * @param organization
     *****************************************************************/
    this.verifyAddTrialOversightCountryOrganization = function (country, organization) {
        return addTrial.addTrialVerifyOversightCountryOrganization.getText().filter(function (row) {
            // Get the first column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === country;
            });
        }).then(function (rows) {
                console.log('value of row' + rows);
                expect(rows[0].element(by.binding('authority.organization')).getText()).to.eventually.equal(organization);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };

    /*****************************************************************
     * Method: Verify Trial Grant information value
     * @param fundingMechanism
     * @param instituteCode
     * @param serialNumber
     * @param programCode
     *****************************************************************/
    this.verifyAddTrialGrantInformation = function (fundingMechanism, instituteCode, serialNumber, programCode) {
        return addTrial.addTrialVerifyGrantTable.getText().filter(function (row) {
            // Get the first column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name');
                console.log(rowName);
                console.log('print funding name');
                console.log(fundingMechanism);
                return rowName === fundingMechanism;
            });
        }).then(function (rows) {
                console.log('value of row' + rows);
                expect(rows[0].element(by.binding('grant.institute_code')).getText()).to.eventually.equal(instituteCode);
                expect(rows[0].element(by.binding('grant.serial_number')).getText()).to.eventually.equal(serialNumber);
                expect(rows[0].element(by.binding('grant.nci')).getText()).to.eventually.equal(programCode);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };


    /*****************************************************************
     * Method: Verify Trial FDA IND/IDE information value
     * @param INDIDEType
     * @param INDIDENumber
     * @param INDIDEGrantor
     * @param INDIDEHolderType
     * @param INDIDEProgramCode
     *****************************************************************/
    this.verifyAddTrialFDA_IND_IDEInformation = function (INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolderType, INDIDEProgramCode) {
        return addTrial.addTrialVerifyIND_IDETable.getText().filter(function (row) {
            // Get the first column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name');
                console.log(rowName);
                console.log('print IND IDE name');
                console.log(INDIDEType);
                return rowName === INDIDEType;
            });
        }).then(function (rows) {
                console.log('value of row' + rows);
                expect(rows[0].element(by.binding('indIde.ind_ide_number')).getText()).to.eventually.equal(INDIDENumber);
                expect(rows[0].element(by.binding('indIde.grantor')).getText()).to.eventually.equal(INDIDEGrantor);
                expect(rows[0].element(by.binding('indIde.holder_type_name')).getText()).to.eventually.equal(INDIDEHolderType);
                expect(rows[0].element(by.binding('indIde.nih_nci')).getText()).to.eventually.equal(INDIDEProgramCode);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };


    /*****************************************************************
     * Method: Verify Trial Status information value
     * @param status
     * @param statusDate
     * @param comment
     * @param whyStudyStopped
     * @param errorsWarnings
     *****************************************************************/
    this.verifyAddTrialStatusInformation = function (status, statusDate, comment, whyStudyStopped, errorsWarnings) {
        return addTrial.addTrialAddStatusTable.getText().filter(function (row) {
            // Get the second column's text.
            return row.$$('td').get(1).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                //console.log('print row name');
                //console.log(rowName);
                //console.log('print Status');
                //console.log(status);
                return rowName === status;
            });
        }).then(function (rows) {
                //console.log('value of row' + rows);
                expect(rows[0].element(by.binding('status.status_date')).getText()).to.eventually.equal(statusDate);
                expect(rows[0].element(by.binding('status.comment')).getText()).to.eventually.equal(comment);
                expect(rows[0].element(by.binding('status.why_stopped')).getText()).to.eventually.equal(whyStudyStopped);
                expect(rows[0].element(by.css('.col-md-4.status-error')).getText()).to.eventually.equal(errorsWarnings);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };


    /*****************************************************************
     * Method: Verify Trial Status for duplicate status
     * @param status
     * @param statusDate
     * @param comment
     * @param whyStudyStopped
     * @param errorsWarnings
     *****************************************************************/
    this.verifyAddTrialDuplicateStatusInformation = function (status, statusDate, comment, whyStudyStopped, errorsWarnings) {
        expect(addTrial.addTrialStatusDateTable.get(0).getText()).to.eventually.equal(statusDate);
        expect(addTrial.addTrialStatusNameTable.get(0).getText()).to.eventually.equal(status);
        expect(addTrial.addTriaCommentTable.get(0).getText()).to.eventually.equal(comment);
        expect(addTrial.addTrialWhyStudyStoppedTable.get(0).getText()).to.eventually.equal(whyStudyStopped);
        expect(addTrial.addTrialStatusDateTable.get(1).getText()).to.eventually.equal(statusDate);
        expect(addTrial.addTrialStatusNameTable.get(1).getText()).to.eventually.equal(status);
        expect(addTrial.addTriaCommentTable.get(1).getText()).to.eventually.equal(comment);
        expect(addTrial.addTrialWhyStudyStoppedTable.get(1).getText()).to.eventually.equal(whyStudyStopped);
        expect(addTrial.addTrialErrorWarningTable.get(1).getText()).to.eventually.equal(errorsWarnings);
    };

    /*****************************************************************
     * Method: Delete Trial Status information value
     * @param status
     *****************************************************************/
    this.clickDeleteTrialStatusInformation = function (status) {
        return addTrial.addTrialAddStatusTable.getText().filter(function (row) {
            // Get the second column's text.
            return row.$$('td').get(1).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                //console.log('print row name');
                //console.log(rowName);
                //console.log('print Status');
                //console.log(status);
                return rowName === status;
            });
        }).then(function (rows) {
                //console.log('value of row' + rows);
                rows[0].element(by.css('.glyphicon.glyphicon-remove-circle')).click();
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };


    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Organization for Trial, it creates a new org then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createOrgforTrial = function (trialOrgName, trialType, indexOfOrgModel, userWhoWillCreateTrial) {
        addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
        searchOrg.clickExactSearch('true');
        searchOrg.setOrgName(trialOrgName + moment().format('MMMDoYY'));
        cukeOrganization = searchOrg.orgName.getAttribute('value');
        searchOrg.clickSearchButton();
        return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
            if (state === true) {
                console.log('Organization exists');
                searchOrg.selectOrgModelItem();
                searchOrg.clickOrgModelConfirm();
            }
            else {
                searchOrg.clickOrgModelClose();
                commonFunctions.onPrepareLoginTest('ctrpcurator');
                //login.login('ctrpcurator', 'Welcome01');
                //login.accept();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 40).then(function () {
                    menuItem.clickHomeEnterOrganizations();
                    login.clickWriteMode('On');
                    menuItem.clickOrganizations();
                    menuItem.clickAddOrganizations();
                    cukeOrganization.then(function (value) {
                        console.log('Add org Name' + value);
                        addOrg.setAddOrgName(value);
                    });
                    addOrg.setAddAlias('shAlias');
                    addOrg.clickSaveAlias();
                    addOrg.setAddAddress('9609 MedicalTrial Center Drive');
                    addOrg.setAddAddress2('9609 MedicalTrial Center Drive');
                    selectValue.selectCountry('Poland');
                    selectValue.selectState('Lubuskie');
                    addOrg.setAddCity('searchTrialCity');
                    addOrg.setAddPostalCode('55578');
                    addOrg.setAddEmail('searchTrialOrg@email.com');
                    addOrg.setAddPhone('545-487-8956');
                    addOrg.setAddFax('898-487-4242');
                    addOrg.clickSave();
                    orgSourceId = addOrg.addOrgCTRPID.getText();
                    commonFunctions.onPrepareLoginTest(userWhoWillCreateTrial);
                    //login.login('ctrptrialsubmitter', 'Welcome01');
                    //login.accept();
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                        trialMenuItem.clickHomeSearchTrial();
                        login.clickWriteMode('On');
                        self.selectTrials(trialType);//selectTrials(trialType);
                        /* Since adding Org when Responsible Party is set to 'Principal Investigator' is hidden so adding a step to select the Responsible party first*/
                        if (indexOfOrgModel === '3') {
                            addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                            addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
                        }
                        else {
                            addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
                        }
                        searchOrg.clickExactSearch('true');
                        cukeOrganization.then(function (value) {
                            console.log('Add org Name' + value);
                            searchOrg.setOrgName(value);
                        });
                        searchOrg.clickSearchButton();
                        searchOrg.selectOrgModelItem();
                        searchOrg.clickOrgModelConfirm();
                    });
                });
            }
        });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Person for Trial, it creates a new person then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createPersonforTrial = function (trialPersonName, trialType, indexOfPersonModel, userWhoWillCreateTrial) {
        addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
        searchOrg.clickExactSearch('true');
        searchPeople.setPersonFirstName(trialPersonName + moment().format('MMMDoYY'));
        cukePerson = searchPeople.personFirstName.getAttribute('value');
        searchPeople.setPersonOrgAffiliation('trialPerAffOrg' + moment().format('MMMDoYY'));
        cukeOrganization = searchPeople.personOrgAffiliation.getAttribute('value');
        searchPeople.clickSearch();
        /** This will check if Person exists or not **/
        return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
            if (state === true) {
                console.log('Person exists');
                searchOrg.selectOrgModelItem();
                searchOrg.clickOrgModelConfirm();
            }
            else {
                searchOrg.clickOrgPersonModelClose();
                //login.logout(); /// --------------------------
                // helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
                commonFunctions.onPrepareLoginTest('ctrpcurator');
                //login.login('ctrpcurator', 'Welcome01');
                //login.accept();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 40).then(function () {
                    menuItem.clickHomeEnterOrganizations();
                    login.clickWriteMode('On');
                    menuItem.clickPeople();
                    menuItem.clickAddPerson();
                    addPeople.setAddPersonPrefix('prefix');
                    cukePerson.then(function (value) {
                        console.log('Add person Name' + value);
                        addPeople.setAddPersonFirstName(value);
                    });
                    addPeople.setAddPersonSecondName('mName');
                    addPeople.setAddPersonLastName('lName');
                    addPeople.setAddPersonSuffix('suffix');
                    addPeople.setAddPersonEmail('email@eml.com');
                    addPeople.setAddPersonPhone('222-444-5555');
                    addPeople.clickSave();
                    searchOrg.clickOrgSearchModel();
                    cukeOrganization.then(function (value) {
                        console.log('Add org Name' + value);
                        searchOrg.setOrgName(value);
                    });
                    //   searchOrg.setOrgName('trialPerAffOrg' + moment().format('MMMDoYY h'));
                    //   cukeOrganization = searchOrg.orgName.getAttribute('value');
                    searchOrg.clickSearchButton();
                    return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
                        if (state === true) {
                            console.log('Organization exists');
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        }
                        else {
                            searchOrg.clickOrgModelClose();
                            menuItem.clickOrganizations();
                            menuItem.clickAddOrganizations();
                            cukeOrganization.then(function (value) {
                                console.log('Add org Name' + value);
                                addOrg.setAddOrgName(value);
                            });
                            addOrg.setAddAlias('shAlias');
                            addOrg.clickSaveAlias();
                            addOrg.setAddAddress('9609 Aff PerOrg MedicalTrial Center Drive');
                            addOrg.setAddAddress2('9609 Aff PerOrg II MedicalTrial Center Drive');
                            selectValue.selectCountry('Togo');
                            selectValue.selectState('Centre');
                            addOrg.setAddCity('searchTrialCity');
                            addOrg.setAddPostalCode('55578');
                            addOrg.setAddEmail('searchTrialOrg@email.com');
                            addOrg.setAddPhone('545-487-8956');
                            addOrg.setAddFax('898-487-4242');
                            addOrg.clickSave();
                            menuItem.clickPeople();
                            menuItem.clickListPeople();
                            searchPeople.setPersonFirstName(cukePerson);
                            searchPeople.clickSearch();
                            element(by.linkText(cukePerson)).click();
                            searchOrg.clickOrgSearchModel();
                            searchOrg.setOrgName(cukeOrganization);
                            searchOrg.clickSearchButton();
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        }
                        addPeople.clickSave();
                        commonFunctions.onPrepareLoginTest(userWhoWillCreateTrial);
                        //login.login('ctrptrialsubmitter', 'Welcome01');
                        //login.accept();
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 40).then(function () {
                            trialMenuItem.clickHomeSearchTrial();
                            login.clickWriteMode('On');
                            self.selectTrials(trialType);//selectTrials(trialType);
                            /* Since adding Person when Responsible Party is set to 'Sponsor-Investigator' is hidden so adding a step to select the Responsible party first*/
                            if (indexOfPersonModel === '1') {
                                addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                                addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
                            }
                            else {
                                addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
                            }
                            searchOrg.clickExactSearch('true');
                            cukePerson.then(function (value) {
                                console.log('Add person Name' + value);
                                searchPeople.setPersonFirstName(value);
                            });
                            searchOrg.clickSearchButton();
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        });
                    });
                });
            }
        });
    };

    /*****************************************************************
     * Method: Verify the warning message
     * @param warningText
     *****************************************************************/
    this.verifyTrialValidationMessage = function (warningText) {
        return addTrial.addTrialValidationMessage.filter(function (name) {
            return name.getText().then(function (text) {
                //  console.log('value of text : ' + text + 'and value of searched string' + warningText + '.');
                return text === warningText;
            });
        }).then(function (filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            // console.log(filteredElements);
            if (filteredElements.length > 0) {
                return 'true';
            }
            else {
                return 'false';
            }
        });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will add already existing\created Organization for Trial
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.selectOrgforTrial = function (trialOrgName, indexOfOrgModel) {
        /* Since adding Org when Responsible Party is set to 'Principal Investigator' is hidden so adding a step to select the Responsible party first*/
        if (indexOfOrgModel === '3') {
            addTrial.selectAddTrialResponsibleParty('Principal Investigator');
            addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
        }
        else {
            addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
        }
        searchOrg.clickExactSearch('true');
        searchOrg.setOrgName(trialOrgName);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will add already existing\created Person for Trial
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.selectPerForTrial = function (trialPerName, indexOfPerModel) {
        /* Since adding Person when Responsible Party is set to 'Sponsor-Investigator' is hidden so adding a step to select the Responsible party first*/
        if (indexOfPerModel === '1') {
            addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
            addTrial.clickAddTrialPersonSearchModel(indexOfPerModel);
        }
        else {
            addTrial.clickAddTrialPersonSearchModel(indexOfPerModel);
        }
        searchOrg.clickExactSearch('true');
        searchPeople.setPersonFirstName(trialPerName);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
    };


    /**
     * Method: This will Search a New Trial and if not found then create a New Trial
     * @param userWhoWillCreateTrial
     * @param trialType
     * @param leadOrgIdentifier
     * @param otherClinicalTrialID
     * @param otherObsoleteClinicalTrialID
     * @param otherIdentifier
     * @param officialTitle
     * @param phase
     * @param pilotOption
     * @param researchCategory
     * @param primaryPurpose
     * @param secondaryPurpose
     * @param accrualDisease
     * @param leadOrg
     * @param principalInv
     * @param sponsorOrg
     * @param dataTableOrg
     * @param programCode
     * @param grantOption
     * @param grantFundingMechanism
     * @param grantInstituteCode
     * @param grantSerialNumber
     * @param grantNCIDivisionCode
     * @param trialStatus
     * @param trialComment
     * @param trialWhyStudyStopped
     * @param INDIDEOption
     * @param INDIDEType
     * @param INDIDENumber
     * @param INDIDEGrantor
     * @param INDIDEHolder
     * @param INDIDEInstitution
     * @param responsibleParty
     * @param trialOversightCountry
     * @param trialOversightOrg
     * @param FDARegulatedIndicator
     * @param section801Indicator
     * @param dataMonitoringIndicator
     * @param protocolDoc
     * @param IRBDoc
     * @param participatingSiteDoc
     * @param informedConsentDoc
     * @param otherDoc
     * @param saveDraftOrSubmitTrial
     */
    this.createTrial = function (userWhoWillCreateTrial,                                                                                                             //Name of User who will create Trial
                                 trialType, leadOrgIdentifier, otherClinicalTrialID, otherObsoleteClinicalTrialID, otherIdentifier,                                  //Trial Identifiers
                                 officialTitle, phase, pilotOption, researchCategory, primaryPurpose, secondaryPurpose, accrualDisease,                              //Trial Details
                                 leadOrg, principalInv,                                                                                                              //Lead Organization/Principal Investigator
                                 sponsorOrg,                                                                                                                         //Sponsor
                                 dataTableOrg, programCode,                                                                                                          //Data Table 4 Information
                                 grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode,                                    //NIH Grant Information (for NIH funded Trials)
                                 trialStatus, trialComment, trialWhyStudyStopped,                                                                                    //Trial Status
                                 INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution,                                             //FDA IND/IDE Information for applicable trials
                                 responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,    //Regulatory Information
                                 protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc,                                                            //Trial Related Documents
                                 saveDraftOrSubmitTrial                                                                                                              //Choose whether to Save Draft OR Submit Trial
    ) {
        var saveDraft = 'SAVEDRAFT';
        var submitTrial = 'SUBMITTRIAL';
        login.loginUser.getText().then(function (loggedInUserName) {
            if (loggedInUserName === userWhoWillCreateTrial) {
                console.log('Given user already logged in');
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
            }
            else {
                commonFunctions.onPrepareLoginTest(userWhoWillCreateTrial);
                console.log('Login with different user');
                trialMenuItem.clickHomeSearchTrial();
                login.clickWriteMode('On');
                trialMenuItem.clickTrials();
                trialMenuItem.clickListSearchTrialLink();
            }
        });
        browser.driver.wait(function () {
            console.log('wait here');
            return true;
        }, 10).then(function () {

            if (leadOrgIdentifier !== '') {
                searchTrial.setSearchTrialProtocolID(leadOrgIdentifier + trialType.substring(0, 3) + ' ' + moment().format('MMMDoYY'));
            }
            storeLeadProtocolId = searchTrial.searchTrialProtocolID.getAttribute('value').then(function (value) {
                console.log('This is the Lead Organization Trial Identifier that was searched' + value);
                return value;
            });
            searchTrial.clickSearchTrialSearchButton();
            if (saveDraftOrSubmitTrial.toUpperCase() === saveDraft) {
                searchTrial.clickSearchTrialSavedDrafts();
            }
            if (saveDraftOrSubmitTrial.toUpperCase() === submitTrial) {
                searchTrial.clickSearchTrialAllTrials();
            }
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
                if (state === true) {
                    storeLeadProtocolId.then(function (value) {
                        element(by.linkText(value)).click();
                        self.importTrialFieldValues();
                        // nciID = addTrial.viewTrialNCIID.getText().then(function (nciIDTrial){
                        //  console.log('***** Trial with Lead Protocol ID " ' + value + ' " exists **********. Its NCI ID is --> ' + nciIDTrial + ' <--');
                        // });
                    });
                }
                else {
               self.createNewTrial(userWhoWillCreateTrial,trialType, leadOrgIdentifier, otherClinicalTrialID, otherObsoleteClinicalTrialID, otherIdentifier, officialTitle, phase, pilotOption, researchCategory, primaryPurpose, secondaryPurpose, accrualDisease,
                   leadOrg, principalInv, sponsorOrg, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode,
                   trialStatus, trialComment, trialWhyStudyStopped, INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution,
                   responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
                   protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, saveDraftOrSubmitTrial );

//                    self.selectTrials(trialType);
//
////      Create Lead Org, Principal Investigator, sponsor Org, DataTable Org//
//                    /****** Create Lead Organization ********/
//                    if (leadOrg !== '') {
//                        self.createOrgforTrial(leadOrg, trialType, '0', userWhoWillCreateTrial);
//
//                        /** Stores the value of Lead Org **/
//                        storeLeadOrg = cukeOrganization.then(function (value) {
//                            console.log('This is the Lead Organization that is added' + value);
//                            return value;
//                        });
//                    }
//                    browser.driver.wait(function () {
//                        console.log('wait here');
//                        return true;
//                    }, 10).then(function () {
//
//                        /****** Create Principal Investigator ********/
//                        if (principalInv !== '') {
//                            self.createPersonforTrial(principalInv, trialType, '0', userWhoWillCreateTrial);
//
//                            /** Stores the value of Principal Investigator **/
//                            storePI = cukePerson.then(function (value) {
//                                console.log('This is the Principal Investigator that is added' + value);
//                                return value;
//                            });
//                        }
//                        browser.driver.wait(function () {
//                            console.log('wait here');
//                            return true;
//                        }, 10).then(function () {
//
//                            /****** Create Sponsor Organization ********/
//                            if (sponsorOrg !== '') {
//                                self.createOrgforTrial(sponsorOrg, trialType, '1', userWhoWillCreateTrial);
//
//                                /** Stores the value of Sponsor Org **/
//                                storeSponsorOrg = cukeOrganization.then(function (value) {
//                                    console.log('This is the Sponsor Organization that is added' + value);
//                                    return value;
//                                });
//                            }
//                            browser.driver.wait(function () {
//                                console.log('wait here');
//                                return true;
//                            }, 10).then(function () {
//
//                                /****** Create Data Table 4 Funding Source Organization ********/
//                                if (dataTableOrg !== '') {
//                                    self.createOrgforTrial(dataTableOrg, trialType, '2', userWhoWillCreateTrial);
//
//                                    /** Stores the value of Data Table 4 Funding Source Org **/
//                                    storeFundingSrcOrg = cukeOrganization.then(function (value) {
//                                        console.log('This is the Funding Source Organization that is added' + value);
//                                        return value;
//                                    });
//                                }
//
//                                /**** Trial Identifiers ****/
//                                storeLeadProtocolId.then(function (value) {
//                                    console.log('This is the Lead Organization Trial Identifier that is added' + value);
//                                    addTrial.setAddTrialLeadProtocolIdentifier(value);
//                                });
//                                if (otherClinicalTrialID !== '') {
//                                    addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'ClinicalTrials.gov Identifier')).click();
//                                    addTrial.setAddTrialProtocolID(otherClinicalTrialID);
//                                    storeClinicalTrialID = addTrial.addTrialProtocolID.getAttribute('value').then(function (value) {
//                                        console.log('This is the Clinical Trial Identifier that was added' + value);
//                                        return value;
//                                    });
//                                    addTrial.clickAddTrialAddProtocolButton();
//                                }
//                                if (otherObsoleteClinicalTrialID !== '') {
//                                    addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'Obsolete ClinicalTrials.gov Identifier')).click();
//                                    addTrial.setAddTrialProtocolID(otherObsoleteClinicalTrialID);
//                                    storeObsoleteClinicalTrialID = addTrial.addTrialProtocolID.getAttribute('value').then(function (value) {
//                                        console.log('This is the Obsolete Clinical Trial Identifier that was added' + value);
//                                        return value;
//                                    });
//                                    addTrial.clickAddTrialAddProtocolButton();
//                                }
//                                if (otherIdentifier !== '') {
//                                    addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'Other Identifier')).click();
//                                    addTrial.setAddTrialProtocolID(otherIdentifier);
//                                    storeOtherClinicalTrialID = addTrial.addTrialProtocolID.getAttribute('value').then(function (value) {
//                                        console.log('This is the Other Trial Identifier that was added' + value);
//                                        return value;
//                                    });
//                                    addTrial.clickAddTrialAddProtocolButton();
//                                }
//
//                                /**** Trial Details ****/
//                                addTrial.setAddTrialOfficialTitle(officialTitle + ' ' + moment().format('MMMDoYY'));
//                                addTrial.selectAddTrialPhase(phase);
//                                if (pilotOption !== '') {
//                                    addTrial.selectAddTrialPilotOption(pilotOption);
//                                }
//                                addTrial.selectAddTrialResearchCategory(researchCategory);
//                                addTrial.selectAddTrialPrimaryPurpose(primaryPurpose);
//                                if (secondaryPurpose !== '') {
//                                    addTrial.selectAddTrialSecondaryPurpose(secondaryPurpose);
//                                }
//                                addTrial.selectAddTrialAccrualDiseaseTerminology(accrualDisease);
//
//                                /**** Lead Organization/Principal Investigator ****/
//                                /***** This will add the Lead Org  if Lead org is not there ******/
//                                if (leadOrg !== '') {
//                                    addTrial.addTrialLeadOrganization.getAttribute('value').then(function (value) {
//                                        console.log('value of Lead Org"' + value + '"is this');
//                                        if (value === '') {
//
//                                            storeLeadOrg.then(function (value) {
//                                                self.selectOrgforTrial(value, '0');
//                                            });
//                                        }
//                                    });
//                                }
//
//                                /***** This will add the Principal Investigator if PI is not there ******/
//                                if (principalInv !== '') {
//                                    addTrial.addTrialPrincipalInvestigator.getAttribute('value').then(function (value) {
//                                        console.log('value of PI"' + value + '"is this');
//                                        if (value.trim() === '') {
//                                            storePI.then(function (value) {
//                                                self.selectPerForTrial(value, '0');
//                                            });
//                                        }
//                                    });
//                                }
//
//                                /**** Sponsor ****/
//                                /***** This will add the Sponsor Org if Sponsor Org is not there ******/
//                                if (sponsorOrg !== '') {
//                                    addTrial.addTrialSponsor.getAttribute('value').then(function (value) {
//                                        console.log('value of Sponsor Org"' + value + '"is this');
//                                        if (value === '') {
//                                            storeSponsorOrg.then(function (value) {
//                                                self.selectOrgforTrial(value, '1');
//                                            });
//                                        }
//                                    });
//                                }
//
//                                /**** Data Table 4 Information ****/
//                                /***** This will add the Funding Source Org if it is not there******/
//                                if (dataTableOrg !== '') {
//                                    addTrial.addTrialDataTable4FundingSourceValues.getAttribute('value').then(function (value) {
//                                        console.log('value of data table Org"' + value + '"is this');
//                                        if (value === '') {
//
//                                            storeFundingSrcOrg.then(function (value) {
//                                                self.selectOrgforTrial(value, '2');
//                                            });
//                                        }
//                                    });
//                                }
//
//                                if (programCode !== '') {
//                                    addTrial.setAddTrialDataTable4ProgramCode(programCode);
//                                }
//
//                                /**** NIH Grant Information (for NIH funded Trials) ****/
//                                if (grantOption !== '') {
//                                    addTrial.selectAddTrialFundedByNCIOption(grantOption);
//
//                                    if (grantOption.toUpperCase() !== 'NO' && grantOption !== '1') {
//                                        addTrial.selectAddTrialFundingMechanism(grantFundingMechanism);
//                                        addTrial.selectAddTrialInstituteCode(grantInstituteCode);
//                                        addTrial.setAddTrialSerialNumber(grantSerialNumber);
//                                        addTrial.addTrialSerialNumberSelect.click();
//                                        addTrial.selectAddTrialNCIDivisionProgramCode(grantNCIDivisionCode);
//                                        addTrial.clickAddTrialAddGrantInfoButton();
//                                    }
//                                }
//
//                                /**** Trial Status ****/
//                                addTrial.clickAddTrialDateField(0);
//                                addTrial.clickAddTrialDateToday();
//                                addTrial.selectAddTrialStatus(trialStatus);
//                                if (trialComment !== '') {
//                                    addTrial.setAddTrialStatusComment(trialComment);
//                                }
//                                if (trialStatus === 'Withdrawn' || trialStatus === 'Temporarily Closed to Accrual' || trialStatus === 'Temporarily Closed to Accrual and Intervention' || trialStatus === 'Administratively Complete') {
//                                    addTrial.setAddTrialWhyStudyStopped(trialWhyStudyStopped);
//                                }
//                                addTrial.clickAddTrialAddStatusButton();
//
//                                /**** Trial Dates ****/
//                                addTrial.clickAddTrialDateField(1);
//                                addTrial.clickAddTrialDateFieldPreviousMonth('10');
//                                addTrial.selectAddTrialStartDateOption('0');
//                                addTrial.clickAddTrialDateField(2);
//                                addTrial.clickAddTrialDateToday();
//                                addTrial.selectAddTrialPrimaryCompletionDateOption('0');
//                                addTrial.clickAddTrialDateField(3);
//                                addTrial.clickAddTrialDateFieldNextMonth('10');
//                                addTrial.selectAddTrialCompletionDateOption('1');
//
//                                /**** FDA IND/IDE Information for applicable trials ****/
//                                if (INDIDEOption !== '') {
//                                    addTrial.selectAddTrialFDAIND_IDEOption(INDIDEOption);
//                                }
//                                if (INDIDEOption.toUpperCase() !== 'NO' && INDIDEOption !== '1') {
//                                    addTrial.selectAddTrialFDAIND_IDETypes(INDIDEType);
//                                    addTrial.setAddTrialFDAIND_IDENumber(INDIDENumber);
//                                    addTrial.selectAddTrialFDAIND_IDEGrantor(INDIDEGrantor);
//                                    addTrial.selectAddTrialFDAIND_IDEHolderType(INDIDEHolder);
//                                    if (INDIDEInstitution !== '') {
//                                        addTrial.selectAddTrialFDAProgramCode(INDIDEInstitution);
//                                    }
//                                    addTrial.clickAddTrialAddIND_IDEButton();
//                                }
//
//                                /**** Regulatory Information ****/
//                                if (responsibleParty !== '') {
//                                    addTrial.selectAddTrialResponsibleParty(responsibleParty);
//                                }
//                                if (trialOversightCountry !== '') {
//                                    addTrial.selectAddTrialOversightAuthorityCountry(trialOversightCountry);
//                                    addTrial.selectAddTrialOversightAuthorityOrganization(trialOversightOrg);
//                                    addTrial.clickAddTrialAddOversightAuthorityButton();
//                                }
//                                if (FDARegulatedIndicator !== '') {
//                                    addTrial.selectAddTrialFDARegulatedInterventionIndicator('0');
//                                }
//                                if (section801Indicator !== '') {
//                                    addTrial.selectAddTrialSection801Indicator('0');
//                                }
//                                if (dataMonitoringIndicator !== '') {
//                                    addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('0');
//                                }
//
//                                /**** Trial Related Documents ****/
//                                if (protocolDoc !== '') {
//                                    trialDoc.trialRelatedFileUpload('reg', '1', protocolDoc);
//                                }
//                                if (IRBDoc !== '') {
//                                    trialDoc.trialRelatedFileUpload('reg', '2', IRBDoc);
//                                }
//                                if (participatingSiteDoc !== '') {
//                                    trialDoc.trialRelatedFileUpload('reg', '3', participatingSiteDoc);
//                                }
//                                if (informedConsentDoc !== '') {
//                                    trialDoc.trialRelatedFileUpload('reg', '4', informedConsentDoc);
//                                }
//                                if (otherDoc !== '') {
//                                    trialDoc.trialRelatedFileUpload('reg', '5', otherDoc);
//                                }
//                                if (saveDraftOrSubmitTrial.toUpperCase() === saveDraft) {
//                                    addTrial.clickAddTrialSaveDraftButton();
//                                    addTrial.addTrialLeadProtocolIdValidationMessage.getText().then(function (warningMsg) {
//                                        if (warningMsg === '') {
//                                            storeLeadProtocolId.then(function (leadProtocolID) {
//                                                console.log('Draft is Save with Lead protocol ID *************   ' + leadProtocolID + '   ************ Trial Type ->  ' + trialType);
//
//                                                trialMenuItem.clickTrials();
//                                                trialMenuItem.clickListSearchTrialLink();
//                                                searchTrial.setSearchTrialProtocolID(leadProtocolID);
//                                                searchTrial.clickSavedDrafts();
//                                                element(by.linkText(leadProtocolID)).click();
//                                                self.importTrialFieldValues();
//
//                                            });
//                                        }
//                                        else {
//                                            assert.fail(0, 1, '\nDraft not Saved.\n' + 'Error message in Page:\n-->' + warningMsg);
//                                        }
//                                    });
//                                }
//                                else if (saveDraftOrSubmitTrial.toUpperCase() === submitTrial) {
//                                    return addTrial.addTrialSubmitButton.isPresent().then(function (state) {
//                                        if (state === true) {
//                                            addTrial.clickAddTrialReviewButton();
//                                            console.log('Trial Successfully created');
//                                            helper.wait(addTrial.viewTrialNCIID, 'NCI ID element on View Trial Page');
//                                            addTrial.viewTrialNCIID.getText().then(function (nciID) {
//                                                console.log('NCI ID of the Trial that was created is *************   ' + nciID + '   ************ Trial Type ->  ' + trialType);
//                                            });
//                                            self.importTrialFieldValues();
//                                        } else {
//                                            addTrial.clickAddTrialReviewButton();
//                                            menuItem.addWarningMessage.getText().then(function (warningMsg) {
//                                                addTrial.addTrialValidationMessage.getText().then(function (associationWarningMsg) {
//                                                    assert.fail(0, 1, '\nSubmit button not found in the Page, may be form has some errors.\n See below if error is listed\n' + 'Error message in Page:\n-->' + underscore.compact(warningMsg).join("\n-->") + '\nAssociation error msg in Page: \n-->' + underscore.compact(associationWarningMsg).join("\n-->"));
//                                                });
//                                            });
//                                        }
//                                    });
//                                }
//                                else {
//                                    assert.fail(0, 1, 'No Match Found with the provided Option -- ' + saveDraftOrSubmitTrial + ' -- Please choose the option either as \'SaveDraft\' OR \'SubmitTrial\'');
//                                }
//                            });
//                        });
//                    });
                }
            });
        });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Trial Organization in PO, it creates a new org then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createOrgforTrialfromPO = function (orgName) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        // login.accept();
        browser.driver.wait(function () {
            console.log('wait here');
            return true;
        }, 40).then(function () {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            searchOrg.setOrgName(orgName + moment().format('MMMDoYY'));
            cukeOrganization = searchOrg.orgName.getAttribute('value');
            searchOrg.clickSearchButton();
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
                if (state === true) {
                    console.log('Organization exists');
                    cukeOrganization.then(function (value) {
                        element(by.linkText(value)).click();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                    });
                }
                else {
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                        menuItem.clickOrganizations();
                        menuItem.clickAddOrganizations();
                        cukeOrganization.then(function (value) {
                            console.log('Add org Name' + value);
                            addOrg.setAddOrgName(value);
                        });
                        addOrg.setAddAlias('shEditAlias');
                        addOrg.clickSaveAlias();
                        addOrg.setAddAddress('9609 Medical Trial Center Drive');
                        addOrg.setAddAddress2('9609 Medical Trial2 Center Drive');
                        selectValue.selectCountry('Jordan');
                        selectValue.selectState('Irbid');
                        addOrg.setAddCity('editTrialCity');
                        addOrg.setAddPostalCode('42666');
                        addOrg.setAddEmail('editTrialOrg@email.com');
                        addOrg.setAddPhone('589-8888-956');
                        addOrg.setAddFax('898-9420-442');
                        addOrg.clickSave();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                    });
                }
            });
        });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Person for Trial, it creates a new person then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createPersonforTrialfromPO = function (perName) {
     //   browser.get('ui/#/main/sign_in');
      //  commonFunctions.onPrepareLoginTest('ctrpcurator');
        // login.accept();
        //browser.driver.wait(function () {
        //    console.log('wait here');
        //    return true;
        //}, 40).then(function () {
           // menuItem.clickHomeEnterOrganizations();
         //   login.clickWriteMode('On');
            menuItem.clickPeople();
            menuItem.clickListPeople();
            searchPeople.setPersonFirstName(perName + moment().format('MMMDoYY'));
            per4 = searchPeople.personFirstName.getAttribute('value');
            searchPeople.clickSearch();
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
                if (state === true) {
                    console.log('Person exists');
                    per4.then(function (value) {
                        element(by.linkText(value)).click();
                        perSourceId = addPeople.addPersonSourceId.getText();
                    });
                }
                else {
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                        commonFunctions.onPrepareLoginTest('ctrpcurator');
                        menuItem.clickHomeEnterOrganizations();
                        login.clickWriteMode('On');
                        menuItem.clickPeople();
                        menuItem.clickAddPerson();
                        addPeople.setAddPersonPrefix('px');
                        per4.then(function (value1) {
                            console.log('Add first Name' + value1);
                            addPeople.setAddPersonFirstName(value1);
                        });
                        addPeople.setAddPersonSecondName('Rauni');
                        addPeople.setAddPersonLastName('SinghTrialImp');
                        addPeople.setAddPersonSuffix('sx');
                        addPeople.setAddPersonEmail('shiImpTrial@pr.com');
                        addPeople.setAddPersonPhone('420-9999-906');
                        addPeople.clickSave();
                        perSourceId = addPeople.addPersonSourceId.getText();
                        commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
                        trialMenuItem.clickHomeSearchTrial();
                        login.clickWriteMode('On');
                    });
                }
            });
    };

    /**
     * Create Multiple trial for Search
     */
    this.createTrialForTrialSearch = function () {
        //Parameters for Submit Trial
        var trialTypeNational = 'National';
        var trialTypeExternal = 'Externally Peer-Reviewed';
        var trialTypeInstitutional = 'Institutional';
        var leadOrgIdentifierNational = 'SS Lead NT';
        var leadOrgIdentifierExternal = 'SS Lead EX';
        var leadOrgIdentifierInstitutional = 'SS Lead IN';
        var otherClinicalTrialIDNT = 'NCT95' + projectFunctions.getRandomInt(100000, 990000);
        var otherObsoleteClinicalTrialIDEX = 'NCT79' + projectFunctions.getRandomInt(100000, 990000);
        var otherIdentifierIN = 'OTH' + projectFunctions.getRandomInt(100000, 990000);
        var officialTitleNT = 'Trial created by Cuke test SS' + trialTypeNational;
        var officialTitleEX = 'Trial created by Cuke test SS' + trialTypeExternal;
        var officialTitleIN = 'Trial created by Cuke test SS' + trialTypeInstitutional;
        var phaseNT = 'I/II';
        var phaseEX = 'NA';
        var phaseIN = 'IV';
        var pilotOptionNT = 'yes';
        var pilotOptionEX = 'no';
        var pilotOptionIN = 'yes';
        var researchCategory = 'Interventional';
        var primaryPurposeNT = 'Screening';
        var primaryPurposeEX = 'Diagnostic';
        var primaryPurposeIN = 'Basic Science';
        var secondaryPurpose = '';
        var accrualDisease = 'SDC';
        var leadOrgNT = 'leadOrgSS srch';
        var leadOrgEX = 'leadOrgSS srch';
        var leadOrgIN = 'leadOrgSS srch';
        var principalInvNT = 'prinInvSS srch';
        var principalInvEX = 'prinInvSS srch';
        var principalInvIN = 'prinInvSS srch';
        var sponsorOrgNT = 'sponOrg srch';
        var sponsorOrgEX = 'sponOrg srch';
        var sponsorOrgIN = 'sponOrg srch';
        var dataTableOrg = 'dataTblOrg srch';
        var programCode = '';
        var grantOption = 'no';
        var grantFundingMechanism = '';
        var grantInstituteCode = '';
        var grantSerialNumber = '';
        var grantNCIDivisionCode = '';
        var trialStatus = 'In Review';
        var trialComment = '';
        var trialWhyStudyStopped = '';
        var INDIDEOption = 'no';
        var INDIDEType = '';
        var INDIDENumber = '';
        var INDIDEGrantor = '';
        var INDIDEHolder = '';
        var INDIDEInstitution = '';
        var responsibleParty = '';
        var responsiblePartySI = 'Sponsor-Investigator';
        var trialOversightCountry = '';
        var trialOversightOrg = '';
        var FDARegulatedIndicator = '';
        var section801Indicator = '';
        var dataMonitoringIndicator = '';
        var protocolDoc = 'testSampleDocFile.docx';
        var IRBDoc = 'testSampleXlsFile.xls';
        var participatingSiteDoc = '';
        var informedConsentDoc = 'testSampleDocFile.docx';
        var otherDoc = '';
        var submitTrial = 'SUBMITTRIAL';

        //Parameters for Imported Trial
        var importedNCTID = 'NCT02756546';
        var importedLeadProtocolID = 'BC (1016)';
        var importedPSOrgName = '';
        var importedPSLocalTrialIdentifier = 'shi Local Cuke ID 878';
        var importedPSSitePI = 'shi PInvestigator PS ';
        var importedPSSitePIAffOrg = 'shi PInvestigator PS Aff Org ';
        var importedPSSiteProgramCode = 'cuke Program Code 675';
        var importedPSTrialStatus = 'In Review';
        var importedPSStatusComment = 'Comment added by SS cuke script for Trial Status in Participating Site';

        //Parameters for Draft
        var trialTypeNationalDft = 'National';
        var trialTypeExternalDft = 'Externally Peer-Reviewed';
        var trialTypeInstitutionalDft = 'Institutional';
        var leadOrgIdentifierNationalDft = 'SS Lead NT Dft';
        var leadOrgIdentifierExternalDft = 'SS Lead EX Dft';
        var leadOrgIdentifierInstitutionalDft = 'SS Lead IN Dft';
        var otherClinicalTrialIDNTDft = 'NCT95' + projectFunctions.getRandomInt(100000, 990000);
        var otherObsoleteClinicalTrialIDEXDft = 'NCT79' + projectFunctions.getRandomInt(100000, 990000);
        var otherIdentifierINDft = 'OTH' + projectFunctions.getRandomInt(100000, 990000);
        var officialTitleNTDft = 'Trial created by Cuke test for Draft SS' + trialTypeNational;
        var officialTitleEXDft = 'Trial created by Cuke test for Draft SS' + trialTypeExternal;
        var officialTitleINDft = 'Trial created by Cuke test for Draft SS' + trialTypeInstitutional;
        var phaseNTDft = '0';
        var phaseEXDft = 'II/III';
        var phaseINDft = 'I/II';
        var pilotOptionNTDft = 'yes';
        var pilotOptionEXDft = 'no';
        var pilotOptionINDft = 'yes';
        var researchCategoryDft = 'Interventional';
        var primaryPurposeNTDft = 'Other';
        var primaryPurposeEXDft = 'Supportive Care';
        var primaryPurposeINDft = 'Diagnostic';
        var secondaryPurposeDft = '';
        var accrualDiseaseDft = 'SDC';
        var leadOrgNTDft = 'leadOrgSS srch Dft';
        var leadOrgEXDft = 'leadOrgSS srch Dft';
        var leadOrgINDft = 'leadOrgSS srch Dft';
        var principalInvNTDft = 'prinInvSS srch Dft';
        var principalInvEXDft = 'prinInvSS srch Dft';
        var principalInvINDft = 'prinInvSS srch Dft';
        var sponsorOrgNTDft = 'sponOrg srch Dft';
        var sponsorOrgEXDft = 'sponOrg srch Dft';
        var sponsorOrgINDft = 'sponOrg srch Dft';
        var dataTableOrgDft = 'dataTblOrg srch';
        var programCodeDft = '';
        var grantOptionDft = 'No';
        var grantFundingMechanismDft = '';
        var grantInstituteCodeDft = '';
        var grantSerialNumberDft = '';
        var grantNCIDivisionCodeDft = '';
        var trialStatusDft = 'In Review';
        var trialCommentDft = '';
        var trialWhyStudyStoppedDft = '';
        var INDIDEOptionDft = 'no';
        var INDIDETypeDft = '';
        var INDIDENumberDft = '';
        var INDIDEGrantorDft = '';
        var INDIDEHolderDft = '';
        var INDIDEInstitutionDft = '';
        var responsiblePartyDft = '';
        var trialOversightCountryDft = '';
        var trialOversightOrgDft = '';
        var FDARegulatedIndicatorDft = '';
        var section801IndicatorDft = '';
        var dataMonitoringIndicatorDft = '';
        var protocolDocDft = '';
        var IRBDocDft = '';
        var participatingSiteDocDft = '';
        var informedConsentDocDft = '';
        var otherDocDft = '';
        var saveDraft = 'SAVEDRAFT';

        var userCtrpTrialSubmitter = 'ctrptrialsubmitter';
        var userCtrpTrialSubmitter2 = 'ctrptrialsubmitter2';

        self.createTrial(userCtrpTrialSubmitter, trialTypeNational, leadOrgIdentifierNational, otherClinicalTrialIDNT, '', '', officialTitleNT, phaseNT, pilotOptionNT, researchCategory, primaryPurposeNT, secondaryPurpose,
            accrualDisease, leadOrgNT, principalInvNT, sponsorOrgNT, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, trialStatus, trialComment, trialWhyStudyStopped,
            INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
            protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, submitTrial);
        browser.driver.wait(function () {
            console.log('wait here');
            return true;
        }, 40).then(function () {
            leadProtocolIDNT = leadProtocolID;
            nciIDNT = nciID;
            otherIDNT = otherIDs;
            trialOfficialTitleNT = officialTitle;
            trialPhaseNT = phase;
            trialPurposeNT = purpose;
            principalInvestigatorNT = principalInvestigator;
            leadOrganizationNT = leadOrganization;
            sponsorNT = sponsor;
            participatingSiteNT = participatingSiteInTrial;

            self.createTrial(userCtrpTrialSubmitter, trialTypeExternal, leadOrgIdentifierExternal, '', otherObsoleteClinicalTrialIDEX, '', officialTitleEX, phaseEX, pilotOptionEX, researchCategory, primaryPurposeEX, secondaryPurpose,
                accrualDisease, leadOrgEX, principalInvEX, sponsorOrgEX, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, trialStatus, trialComment, trialWhyStudyStopped,
                INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsiblePartySI, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
                protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, submitTrial);
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                leadProtocolIDEX = leadProtocolID;
                nciIDEX = nciID;
                otherIDEX = otherIDs;
                trialOfficialTitleEX = officialTitle;
                trialPhaseEX = phase;
                trialPurposeEX = purpose;
                principalInvestigatorEX = principalInvestigator;
                leadOrganizationEX = leadOrganization;
                sponsorEX = sponsor;
                participatingSiteEX = participatingSiteInTrial;

                self.createTrial(userCtrpTrialSubmitter2, trialTypeInstitutional, leadOrgIdentifierInstitutional, '', '', otherIdentifierIN, officialTitleIN, phaseIN, pilotOptionIN, researchCategory, primaryPurposeIN, secondaryPurpose,
                    accrualDisease, leadOrgIN, principalInvIN, sponsorOrgIN, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, trialStatus, trialComment, trialWhyStudyStopped,
                    INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
                    protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, submitTrial);
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 40).then(function () {
                    leadProtocolIDIN = leadProtocolID;
                    nciIDIN = nciID;
                    otherIDIN = otherIDs;
                    trialOfficialTitleIN = officialTitle;
                    trialPhaseIN = phase;
                    trialPurposeIN = purpose;
                    principalInvestigatorIN = principalInvestigator;
                    leadOrganizationIN = leadOrganization;
                    sponsorIN = sponsor;
                    participatingSiteIN = participatingSiteInTrial;


                    self.createTrial(userCtrpTrialSubmitter2, trialTypeNationalDft, leadOrgIdentifierNationalDft, otherClinicalTrialIDNTDft, '', '', officialTitleNTDft, phaseNTDft, pilotOptionNTDft, researchCategoryDft, primaryPurposeNTDft, secondaryPurposeDft,
                        accrualDiseaseDft, leadOrgNTDft, principalInvNTDft, sponsorOrgNTDft, dataTableOrgDft, programCodeDft, grantOptionDft, grantFundingMechanismDft, grantInstituteCodeDft, grantSerialNumberDft, grantNCIDivisionCodeDft, trialStatusDft, trialCommentDft, trialWhyStudyStoppedDft,
                        INDIDEOptionDft, INDIDETypeDft, INDIDENumberDft, INDIDEGrantorDft, INDIDEHolderDft, INDIDEInstitutionDft, responsiblePartyDft, trialOversightCountryDft, trialOversightOrgDft, FDARegulatedIndicatorDft, section801IndicatorDft, dataMonitoringIndicatorDft,
                        protocolDocDft, IRBDocDft, participatingSiteDocDft, informedConsentDocDft, otherDocDft, saveDraft);
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                        leadProtocolIDDftNT = leadProtocolID;
                        nciIDDftNT = nciID;
                        otherIDDftNT = otherIDs;
                        trialOfficialTitleDftNT = officialTitle;
                        trialPhaseDftNT = phase;
                        trialPurposeDftNT = purpose;
                        principalInvestigatorDftNT = principalInvestigator;
                        leadOrganizationDftNT = leadOrganization;
                        sponsorDftNT = sponsor;
                        participatingSiteDftNT = participatingSiteInTrial;

                        self.createTrial(userCtrpTrialSubmitter, trialTypeExternalDft, leadOrgIdentifierExternalDft, '', otherObsoleteClinicalTrialIDEXDft, '', officialTitleEXDft, phaseEXDft, pilotOptionEXDft, researchCategoryDft, primaryPurposeEXDft, secondaryPurposeDft,
                            accrualDiseaseDft, leadOrgEXDft, principalInvEXDft, sponsorOrgEXDft, dataTableOrgDft, programCodeDft, grantOptionDft, grantFundingMechanismDft, grantInstituteCodeDft, grantSerialNumberDft, grantNCIDivisionCodeDft, trialStatusDft, trialCommentDft, trialWhyStudyStoppedDft,
                            INDIDEOptionDft, INDIDETypeDft, INDIDENumberDft, INDIDEGrantorDft, INDIDEHolderDft, INDIDEInstitutionDft, responsiblePartyDft, trialOversightCountryDft, trialOversightOrgDft, FDARegulatedIndicatorDft, section801IndicatorDft, dataMonitoringIndicatorDft,
                            protocolDocDft, IRBDocDft, participatingSiteDocDft, informedConsentDocDft, otherDocDft, saveDraft);
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 40).then(function () {
                            leadProtocolIDDftEX = leadProtocolID;
                            nciIDDftEX = nciID;
                            otherIDDftEX = otherIDs;
                            trialOfficialTitleDftEX = officialTitle;
                            trialPhaseDftEX = phase;
                            trialPurposeDftEX = purpose;
                            principalInvestigatorDftEX = principalInvestigator;
                            leadOrganizationDftEX = leadOrganization;
                            sponsorDftEX = sponsor;
                            participatingSiteDftEX = participatingSiteInTrial;

                            self.createTrial(userCtrpTrialSubmitter, trialTypeInstitutionalDft, leadOrgIdentifierInstitutionalDft, '', '', otherIdentifierINDft, officialTitleINDft, phaseINDft, pilotOptionINDft, researchCategoryDft, primaryPurposeINDft, secondaryPurposeDft,
                                accrualDiseaseDft, leadOrgINDft, principalInvINDft, sponsorOrgINDft, dataTableOrgDft, programCodeDft, grantOptionDft, grantFundingMechanismDft, grantInstituteCodeDft, grantSerialNumberDft, grantNCIDivisionCodeDft, trialStatusDft, trialCommentDft, trialWhyStudyStoppedDft,
                                INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
                                protocolDocDft, IRBDocDft, participatingSiteDocDft, informedConsentDocDft, otherDocDft, saveDraft);
                            browser.driver.wait(function () {
                                console.log('wait here');
                                return true;
                            }, 40).then(function () {
                                leadProtocolIDDftIN = leadProtocolID;
                                nciIDDftIN = nciID;
                                otherIDDftIN = otherIDs;
                                trialOfficialTitleDftIN = officialTitle;
                                trialPhaseDftIN = phase;
                                trialPurposeDftIN = purpose;
                                principalInvestigatorDftIN = principalInvestigator;
                                leadOrganizationDftIN = leadOrganization;
                                sponsorDftIN = sponsor;
                                participatingSiteDftIN = participatingSiteInTrial;

                                self.importTrialAndAddPS(userCtrpTrialSubmitter, importedNCTID, importedLeadProtocolID, importedPSOrgName, importedPSLocalTrialIdentifier, importedPSSitePI, importedPSSitePIAffOrg, importedPSSiteProgramCode, importedPSTrialStatus, importedPSStatusComment);
                                browser.driver.wait(function () {
                                    console.log('wait here');
                                    return true;
                                }, 40).then(function () {
                                    leadProtocolIDIMP = leadProtocolID;
                                    nciIDIMP = nciID;
                                    otherIDIMP = otherIDs;
                                    trialOfficialTitleIMP = officialTitle;
                                    trialPhaseIMP = phase;
                                    trialPurposeIMP = purpose;
                                    principalInvestigatorIMP = principalInvestigator;
                                    leadOrganizationIMP = leadOrganization;
                                    sponsorIMP = sponsor;
                                    participatingSiteIMP = participatingSiteInTrial;
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    /***
     * Import Trial : Search with NCT ID if exist then use the same one.
     */
    this.importTrialAndAddPS = function (userWhoWillImportTrial, nctID, leadProtocolID, PSOrgName, PSLocalTrialIdentifier, PSSitePI, PSSitePIAffOrg, PSSiteProgramCode, PSTrialStatus, PSStatusComment) {
        var importTrialNotFoundMsg = 'A study with the given identifier is not found in ClinicalTrials.gov.';
        var importTrialDuplicateTrialMsg = 'A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page.';
        var duplicateLeadOrgAndLeadOrgIDErrorMsg = 'Combination of Lead Organization Trial ID and Lead Organization must be unique.';
        trialMenuItem.clickTrials();
        trialMenuItem.clickListSearchTrialLink();
        searchTrial.setSearchTrialProtocolID(nctID);
        searchTrial.selectSearchTrialStudySource('Industrial');
        searchTrial.clickSearchTrialSearchButton();
        searchTrial.clickSearchTrialAllTrials();
        return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
            if (state === true) {
                searchTrial.clickSearchTrialActionButton();
                searchTrial.searchTrialsAddSiteButton.isPresent().then(function (value) {
                    if (value) {
                        searchTrial.clickSearchTrialsAddSiteButton();
                        self.importTrialAddParticipatingSites(PSOrgName, PSLocalTrialIdentifier, PSSitePI, PSSitePIAffOrg, PSSiteProgramCode, PSTrialStatus, PSStatusComment, userWhoWillImportTrial);
                        self.importTrialFieldValues();
                    }
                });
                searchTrial.searchTrialsUpdateMySiteButton.isPresent().then(function (value) {
                    if (value) {
                        searchTrial.clickSearchTrialClearButton();
                        searchTrial.setSearchTrialProtocolID(nctID);
                        searchTrial.selectSearchTrialStudySource('Industrial');
                        searchTrial.clickSearchTrialSearchButton();
                        searchTrial.clickSearchTrialAllTrials();
                        element(by.linkText(leadProtocolID)).click();
                        self.importTrialFieldValues();
                    }
                });
            }
            else {
                self.selectTrials('Industrial/Other');
                importTrial.setAddImportClinicalTrialID(nctID);
                importTrial.clickAddImportSearchStudiesButton();
                menuItem.addWarningMessage.getText().then(function (value) {
                    if (value.toString() === importTrialNotFoundMsg || value.toString() === importTrialDuplicateTrialMsg || value.toString() === duplicateLeadOrgAndLeadOrgIDErrorMsg ) {
                        assert.fail(0, 1, 'Import Trial not completed for the given NCT ID -- ' + nctID + ' -- .Error Message :' + value);
                    }
                    else {
                        importTrial.clickAddImportTrialButton();
                        trialMenuItem.clickTrials();
                        trialMenuItem.clickListSearchTrialLink();
                        searchTrial.setSearchTrialProtocolID(nctID);
                        searchTrial.selectSearchTrialStudySource('Industrial');
                        searchTrial.clickSearchTrialSearchButton();
                        searchTrial.clickSearchTrialAllTrials();
                        searchTrial.clickSearchTrialActionButton();
                        searchTrial.clickSearchTrialsAddSiteButton();
                        self.importTrialAddParticipatingSites(PSOrgName, PSLocalTrialIdentifier, PSSitePI, PSSitePIAffOrg, PSSiteProgramCode, PSTrialStatus, PSStatusComment, userWhoWillImportTrial);
                        self.importTrialFieldValues();
                    }
                });
            }
        });
    };

    /***
     * Get the Items value from Imported Trial
     */
    this.importTrialFieldValues = function () {
        var deferred1 = Q.defer();
        emptyPromise = deferred1.promise;

        //emptyPromise = Q.promise(function () {
        //});
        leadProtocolID = addTrial.viewTrialLeadProtocolIdentifier.isPresent().then(function (state) {
            if (state) {
                 return addTrial.viewTrialLeadProtocolIdentifier.getText().then(function (leadProtocolIDTrial) {
                    console.log('Trial Lead Protocol ID is ----> ' + leadProtocolIDTrial);
                    return leadProtocolIDTrial;
                });
            } else {
                console.log('Trial NCI ID does not exist in Page.');
                return Q.when('');//leadProtocolID = emptyPromise;
            }
        });

        nciID = addTrial.viewTrialNCIID.isPresent().then(function (state) {
            if (state) {
                return addTrial.viewTrialNCIID.getText().then(function (nciIDTrial) {
                    console.log('Trial NCI ID is ----> ' + nciIDTrial);
                    return nciIDTrial;
                });
            } else {
                console.log('Trial NCI ID does not exist in Page.');
                return Q.when('');//nciID = emptyPromise;
            }
        });

        otherIDs = addTrial.viewTrialOtherIdentifierValuePresent.isPresent().then(function (state) {
            if (state) {
                return addTrial.viewTrialOtherIdentifierAllValues.getText().then(function (otherIDTrial) {
                    console.log('Trial Other Identifiers are ----> ' + otherIDTrial);
                    return otherIDTrial;
                });
            } else {
                console.log('Trial Other IDs does not exist in Page.');
                return Q.when('');//otherIDs = emptyPromise;
            }
        });

        officialTitle = addTrial.viewTrialOfficialTitle.isPresent().then(function (state) {
            if (state) {
                return addTrial.viewTrialOfficialTitle.getText().then(function (trialOfficialTitle) {
                    console.log('Trial Official Title is ----> ' + trialOfficialTitle);
                    return trialOfficialTitle;
                });
            } else {
                console.log('Trial Official Title does not exist in Page.');
                return Q.when('');//officialTitle = emptyPromise;
            }
        });
        phase = addTrial.viewTrialPhase.isPresent().then(function (state) {
            if (state) {
                return addTrial.viewTrialPhase.getText().then(function (trialPhase) {
                    console.log('Trial Phase is ----> ' + trialPhase);
                    return trialPhase;
                });
            }
            else {
                console.log('Trial Phase does not exist in Page.');
                return Q.when('');//phase = emptyPromise;
            }
        });
        purpose = addTrial.viewTrialPrimaryPurpose.isPresent().then(function (state) {
            if (state) {
                return addTrial.viewTrialPrimaryPurpose.getText().then(function (trialPurpose) {
                    console.log('Trial Primary Purpose is ----> ' + trialPurpose);
                    return trialPurpose;
                });
            }
            else {
                console.log('Trial Primary Purpose does not exist in Page.');
                return Q.when('');//purpose = emptyPromise;
            }
        });


        principalInvestigator = addTrial.viewTrialPrincipalInvestigator.isPresent().then(function (state) {
            if (state) {
               // principalInvestigator =
                    return addTrial.viewTrialPrincipalInvestigator.getText().then(function (trialPrincipalInvestigator) {
                    console.log('Trial Principal Investigator is ----> ' + trialPrincipalInvestigator);
                    return trialPrincipalInvestigator;
                });
            }
            else {
                console.log('Trial Principal Investigator is does not exist in Page.');
                return Q.when('');//principalInvestigator = Q.reject();//Promise.resolve('');//Q('');//Q.promise(function () {});//Q.Deferred().resolve();//emptyPromise;
            }
        });

        leadOrganization = addTrial.viewTrialLeadOrganization.isPresent().then(function (state) {
            if (state) {
               return addTrial.viewTrialLeadOrganization.getText().then(function (trialLeadOrganization) {
                    console.log('Trial Lead Organization is ----> ' + trialLeadOrganization);
                    return trialLeadOrganization;
                });
            }
            else {
                console.log('Trial Lead Organization does not exist in Page.');
                return Q.when('');//leadOrganization = emptyPromise;
            }
        });
        sponsor = addTrial.viewTrialSponsor.isPresent().then(function (state) {
            if (state) {
                return addTrial.viewTrialSponsor.getText().then(function (trialSponsor) {
                    console.log('Trial Sponsor is ----> ' + trialSponsor);
                    return trialSponsor;
                });
            }
            else {
                console.log('Trial Sponsor does not exist in Page.');
                return Q.when('');//sponsor = emptyPromise;
            }
        });
        participatingSiteInTrial = addTrial.viewParticipatingSiteNamePresent.isPresent().then(function (state) {
            if (state) {
                return addTrial.viewParticipatingSiteName.getText().then(function (trialParticipatingSite) {
                    console.log('Trial Participating Site is ----> ' + trialParticipatingSite);
                    return trialParticipatingSite;
                });
            }
            else {
                console.log('Trial Participating Site does not exist in Page.');
                return Q.when('');//participatingSiteInTrial = emptyPromise;
            }
        });
        documents = addTrial.viewTrialVerifyviewedDocsExist.isPresent().then(function (state) {
            if (state) {
                return addTrial.viewTrialVerifyviewedDocs.getText().then(function (trialDocuments) {
                    console.log('Trial Document array is ----> ' + trialDocuments);
                    return trialDocuments;
                });
            }
            else {
                console.log('Trial Documents does not exist in Page.');
                return Q.when('');//documents = emptyPromise;
            }
        });

    };

    /***
     * Add Participating Sites for Imported Trial
     */
    this.importTrialAddParticipatingSites = function (orgName, localTrialIdentifier, sitePI, sitePIAffOrg, siteProgramCode, trialStatus, statusComment, userWhoWillImportTrial) {
        nciID = participatingSite.addPSNCIID.getText().then(function (nciIDTrial) {
            console.log('Trial NCI ID in Participating Site page is ----> ' + nciIDTrial);
            self.createPIForParticipatingSite(sitePI, sitePIAffOrg, nciIDTrial, '0', userWhoWillImportTrial);
        });
        participatingSite.addPSLeadOrgId.isPresent().then(function (state) {
            if (state) {
                leadOrgTrialID = participatingSite.addPSLeadOrgId.getText().then(function (leadOrgID) {
                    console.log('Trial Lead Org Identifier in Participating Site page is ----> ' + leadOrgID);
                });
            } else {
                console.log('Trial Lead Org Identifier in Participating Site page does not exist in Page.');
            }
        });
        participatingSite.addPSOfficialTitle.isPresent().then(function (state) {
            if (state) {
                officialTitle = participatingSite.addPSOfficialTitle.getText().then(function (trialOfficialTitle) {
                    console.log('Trial Official Title in Participating Site page is ----> ' + trialOfficialTitle);
                });
            } else {
                console.log('Trial Official Title in Participating Site page does not exist in Page.');
            }
        });
        if (orgName !== '') {
            participatingSite.selectPSOrgName(orgName);
        }
        else {
            defaultOrgName = participatingSite.addPSOrgName.$('option:checked').getText().then(function (psOrgName) {
                console.log('Trial Organization Name in Participating Site page is ----> ' + psOrgName);
            });
        }
        participatingSite.setAddPSLocalId(localTrialIdentifier);
        SitePIName = participatingSite.addPSPrincipalInvestigator.getAttribute('value').then(function (psPIName) {
            console.log('Trial Site Principal Investigator Name in Participating Site page is ----> ' + psPIName);
        });
        if (siteProgramCode !== '') {
            participatingSite.setAddPSSiteProgramCode(siteProgramCode);
        }
        addTrial.clickAddTrialDateField(0);
        addTrial.clickAddTrialDateToday();
        participatingSite.selectAddPSTrialStatus(trialStatus);
        if (statusComment !== '') {
            participatingSite.setAddPSTrialComment(statusComment);
        }
        participatingSite.clickAddPSAddStatusButton();
        participatingSite.clickAddPSSaveButton();
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Site Principal Investigator for Participating Site, it creates a new person then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createPIForParticipatingSite = function (trialPIName, trialPIOrgAff, nciIDOfTrial, indexOfPersonModel, userWhoWillCreateTrial) {
        addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
        searchOrg.clickExactSearch('true');
        searchPeople.setPersonFirstName(trialPIName + moment().format('MMMDoYY'));
        cukePerson = searchPeople.personFirstName.getAttribute('value');
        searchPeople.setPersonOrgAffiliation(trialPIOrgAff + moment().format('MMMDoYY'));
        cukeOrganization = searchPeople.personOrgAffiliation.getAttribute('value');
        searchPeople.clickSearch();
        /** This will check if Person exists or not **/
        return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
            if (state === true) {
                console.log('PI exists');
                searchOrg.selectOrgModelItem();
                searchOrg.clickOrgModelConfirm();
            }
            else {
                searchOrg.clickOrgPersonModelClose();
                commonFunctions.onPrepareLoginTest('ctrpcurator');
                //login.login('ctrpcurator', 'Welcome01');
                //login.accept();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 40).then(function () {
                    menuItem.clickHomeEnterOrganizations();
                    login.clickWriteMode('On');
                    menuItem.clickPeople();
                    menuItem.clickAddPerson();
                    addPeople.setAddPersonPrefix('prefix');
                    cukePerson.then(function (value) {
                        console.log('Add person Name' + value);
                        addPeople.setAddPersonFirstName(value);
                    });
                    addPeople.setAddPersonSecondName('mNamePS');
                    addPeople.setAddPersonLastName('lNamePS');
                    addPeople.setAddPersonSuffix('suffixPS');
                    addPeople.setAddPersonEmail('emailPS@eml.com');
                    addPeople.setAddPersonPhone('222-747-5555');
                    addPeople.clickSave();
                    searchOrg.clickOrgSearchModel();
                    cukeOrganization.then(function (value) {
                        console.log('Add org Name' + value);
                        searchOrg.setOrgName(value);
                    });
                    searchOrg.clickSearchButton();
                    return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
                        if (state === true) {
                            console.log('Organization exists');
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        }
                        else {
                            searchOrg.clickOrgModelClose();
                            menuItem.clickOrganizations();
                            menuItem.clickAddOrganizations();
                            cukeOrganization.then(function (value) {
                                console.log('Add org Name' + value);
                                addOrg.setAddOrgName(value);
                            });
                            addOrg.setAddAlias('shAlias');
                            addOrg.clickSaveAlias();
                            addOrg.setAddAddress('9609 Aff PerOrg Medical PS');
                            addOrg.setAddAddress2('9609 Aff PerOrg II Medical PS');
                            selectValue.selectCountry('Gambia');
                            selectValue.selectState('Banjul');
                            addOrg.setAddCity('PSCity');
                            addOrg.setAddPostalCode('25252');
                            addOrg.setAddEmail('PSImportedTrial@email.com');
                            addOrg.setAddPhone('545-999-8956');
                            addOrg.setAddFax('898-222-4242');
                            addOrg.clickSave();
                            menuItem.clickPeople();
                            menuItem.clickListPeople();
                            searchPeople.setPersonFirstName(cukePerson);
                            searchPeople.clickSearch();
                            element(by.linkText(cukePerson)).click();
                            searchOrg.clickOrgSearchModel();
                            searchOrg.setOrgName(cukeOrganization);
                            searchOrg.clickSearchButton();
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        }
                        addPeople.clickSave();
                        commonFunctions.onPrepareLoginTest(userWhoWillCreateTrial);
                        //login.login('ctrptrialsubmitter', 'Welcome01');
                        //login.accept();
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 40).then(function () {
                            trialMenuItem.clickHomeSearchTrial();
                            login.clickWriteMode('On');
                            searchTrial.setSearchTrialProtocolID(nciIDOfTrial);
                            searchTrial.selectSearchTrialStudySource('Industrial');
                            searchTrial.clickSearchTrialSearchButton();
                            searchTrial.clickSearchTrialMyTrials();
                            searchTrial.clickSearchTrialActionButton();
                            searchTrial.clickSearchTrialsAddSiteButton();
                            addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
                            searchOrg.clickExactSearch('true');
                            cukePerson.then(function (value) {
                                console.log('Add person Name' + value);
                                searchPeople.setPersonFirstName(value);
                            });
                            searchOrg.clickSearchButton();
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        });
                    });
                });
            }
        });
    };


    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will parse the xml from CT.gov
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.parseXMLFromCtGov = function (NCTID) {
         var deferred = Q.defer();
        ctGovElement = deferred.promise;
        parser.on('error', function (err) {
            console.log('Parser error', err);
        });
        https.get('https://clinicaltrials.gov/ct2/show/' + NCTID + '?displayxml=true', function (resp) {
            resp.on('error', function (err) {
                console.log('Error while reading', err);
            });

            resp.pipe(concat(function (buffer) {

                var str = buffer.toString();
                parser.parseString(str, function (err, result) {
                    if (err)  {
                        return deferred.reject(err);
                    }
               //     console.log('Parsed XML file', util.inspect(result, false, null));
                    return deferred.resolve(result);

                });
                return ctGovElement;
            }));

        });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will verify the Imported Trial NCT ID, Trial Status, Study Title, Intervention and Condition
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.verifyImportedTrialInfo = function() {
        ctGovElement.then(function(value) {
            importTrial.addImportViewNCTIDInTbl.getText().then(function(NCTIDUI) {
                console.log('******** NCT ID From UI *********');
                console.log(NCTIDUI);
                expect(NCTIDUI).to.eql(value.clinical_study.id_info.nct_id, 'Verification of NCI ID for Imported Trial');
            });
            importTrial.addImportViewStatusInTbl.getText().then(function(trialStatusUI) {
                console.log('******** Trial Status From UI *********');
                console.log(trialStatusUI);
                expect(trialStatusUI).to.eql(value.clinical_study.overall_status, 'Verification of Trial Status for Imported Trial');
            });
            importTrial.addImportViewTitleCondIntInTbl.getText().then(function(trialTitleCondInterventionUI) {
                console.log('******** Trial Title Condition Intervention From UI *********');
                console.log(trialTitleCondInterventionUI);
                //Check if Official title is Present in Parsed XML
                if (value.clinical_study.official_title) {
                    if (value.clinical_study.official_title === '') {
                        console.log('Official Title is Empty so use Brief Title');
                        var ctGovXMLTitle = value.clinical_study.brief_title;
                    } else {
                        console.log('Official Title is Present');
                        ctGovXMLTitle = value.clinical_study.official_title;
                    }
                } else {
                    console.log('Official Title is Not there so use Brief Title');
                    ctGovXMLTitle = value.clinical_study.brief_title;
                }

                if (Array.isArray(value.clinical_study.condition)) {
                    console.log('Condition is an ARRAY');
                    var ctGovXMLCondition = value.clinical_study.condition.join(", ");
                } else {
                    console.log('Condition is NOT an array');
                    ctGovXMLCondition = value.clinical_study.condition.toString();
                }
                //Check if Intervention is Present in Parsed XML
                if (value.clinical_study.intervention) {
                    if (Array.isArray(value.clinical_study.intervention)) {
                        console.log('Intervention is an ARRAY');
                        var arr1 = [];
                        for (var i = 0; i < value.clinical_study.intervention.length; i++) {
                            var arr2 = value.clinical_study.intervention[i].intervention_type + ': ' + value.clinical_study.intervention[i].intervention_name;
                            arr1.push(arr2);
                            console.log(arr2);
                        }
                        console.log('final Intervention arr1');
                        console.log(arr1);
                        var ctGovXMLIntervention = 'Intervention(s): ' + arr1.join(", ");
                    } else {
                        console.log('Intervention is NOT an array');
                        ctGovXMLIntervention = 'Intervention(s): ' + value.clinical_study.intervention.intervention_type + ': ' + value.clinical_study.intervention.intervention_name;
                    }
                } else {
                    ctGovXMLIntervention = 'Intervention(s):';
                }
                var studyTitleConditionIntervention = ctGovXMLTitle + '\n\n' +
                    'Condition(s): ' + ctGovXMLCondition + '\n' +
                    ctGovXMLIntervention;
                console.log('******** Trial Title Condition Intervention From XML *********');
                console.log(studyTitleConditionIntervention);
                expect(trialTitleCondInterventionUI).to.eql(studyTitleConditionIntervention, 'Verification of Trial title, Condition, Intervention for Imported Trial');
            });
        });
    };


    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will verify the View screen of Imported Trial
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.verifyImportedTrialViewPage = function() {
        expect(addTrial.viewTrialNCIID.isPresent()).to.eventually.equal(true, 'Verification of NCI ID after Importing Trial');
        browser.driver.wait(function () {
            console.log('wait here');
            return true;
        }, 40).then(function () {
            ctGovElement.then(function (value) {
                addTrial.viewTrialLeadProtocolIdentifier.isPresent().then(function (state) {
                    if (state) {
                        addTrial.viewTrialLeadProtocolIdentifier.getText().then(function (leadProtocolIDTrial) {
                            console.log('Trial Lead Protocol ID is ----> ' + leadProtocolIDTrial);
                            console.log(value.clinical_study.id_info.org_study_id);
                            expect(leadProtocolIDTrial).to.eql(value.clinical_study.id_info.org_study_id, 'Verification of Lead Protocol ID for Imported Trial');
                        });
                    } else {
                        console.log('Trial Lead Protocol ID does not exist in Page.');
                    }
                });


                //Check if Secondary ID is Present in Parsed XML
                if (value.clinical_study.id_info.secondary_id) {
                    if (Array.isArray(value.clinical_study.id_info.secondary_id )) {
                        console.log('Secondary ID is an ARRAY');
                        var ctGovXMLSecondaryID = value.clinical_study.id_info.secondary_id;
                        console.log('value of secondary id');
                        console.log(ctGovXMLSecondaryID);
                        ctGovXMLSecondaryID.push(value.clinical_study.id_info.nct_id);
                        var ctGovXMLOtherID = ctGovXMLSecondaryID;
                        console.log('value of secondary plus nct id');
                        console.log(ctGovXMLOtherID);
                        console.log(ctGovXMLSecondaryID);
                        addTrial.viewTrialOtherIdentifierAllValues.getText().then(function (otherIDTrial) {
                            expect(otherIDTrial).to.eql(ctGovXMLOtherID, 'Verification of Other ID for Imported Trial');
                        });
                    } else {
                        console.log('Secondary ID is NOT an array');
                         ctGovXMLSecondaryID = value.clinical_study.id_info.secondary_id.split();
                        ctGovXMLSecondaryID.push( value.clinical_study.id_info.nct_id);
                         ctGovXMLOtherID = ctGovXMLSecondaryID;
                        console.log('value of secondary plus nct id');
                        console.log(ctGovXMLOtherID);
                        addTrial.viewTrialOtherIdentifierAllValues.getText().then(function (otherIDTrial) {
                            expect(otherIDTrial).to.eql(ctGovXMLOtherID, 'Verification of Other ID for Imported Trial');
                        });
                    }
                }
                else {
                    ctGovXMLOtherID = value.clinical_study.id_info.nct_id;
                    addTrial.viewTrialOtherIdentifierAllValues.getText().then(function (otherIDTrial) {
                        expect(otherIDTrial.toString()).to.eql(ctGovXMLOtherID, 'Verification of Other ID for Imported Trial');
                    });
                }

                //Check if Official title is Present in Parsed XML
                if (value.clinical_study.official_title) {
                    if ( value.clinical_study.official_title === '') {
                        console.log('Official Title is Empty so use Brief Title');
                        var ctGovXMLTitle = value.clinical_study.brief_title;
                        addTrial.viewTrialOfficialTitle.getText().then(function (trialOfficialTitle) {
                            expect(trialOfficialTitle).to.eql(ctGovXMLTitle, 'Verification of Official Title for Imported Trial when Official title is not there then display brief title');
                        });
                    } else {
                        console.log('Official Title is Present');
                        ctGovXMLTitle =  value.clinical_study.official_title;
                        addTrial.viewTrialOfficialTitle.getText().then(function (trialOfficialTitle) {
                            expect(trialOfficialTitle).to.eql(ctGovXMLTitle, 'Verification of Official Title for Imported Trial');
                        });
                    }
                } else {
                    console.log('Official Title is Not there so use Brief Title');
                    ctGovXMLTitle = value.clinical_study.brief_title;
                    addTrial.viewTrialOfficialTitle.getText().then(function (trialOfficialTitle) {
                        expect(trialOfficialTitle).to.eql(ctGovXMLTitle, 'Verification of Official Title for Imported Trial when Official title is not there then display brief title');
                    });
                }

                //Check if Phase is Present in Parsed XML
                if (value.clinical_study.phase) {
                    if ( value.clinical_study.phase === 'Phase 0') {
                        console.log('Phase is Phase 0');
                        addTrial.viewTrialPhase.getText().then(function (trialPhase) {
                            expect(trialPhase).to.eql('0', 'Verification of Phase for Imported Trial when Phase is 0');
                        });
                    }
                    if (value.clinical_study.phase === 'Phase 1') {
                        console.log('Phase is Phase 1');
                        addTrial.viewTrialPhase.getText().then(function (trialPhase) {
                            expect(trialPhase).to.eql('I', 'Verification of Phase for Imported Trial when Phase is 1');
                        });
                    }
                    if (value.clinical_study.phase === 'Phase 2') {
                        console.log('Phase is Phase 2');
                        addTrial.viewTrialPhase.getText().then(function (trialPhase) {
                            expect(trialPhase).to.eql('II', 'Verification of Phase for Imported Trial when Phase is 1 & 2');
                        });
                    }
                    if (value.clinical_study.phase === 'Phase 1/Phase 2') {
                        console.log('Phase is Phase 2');
                        addTrial.viewTrialPhase.getText().then(function (trialPhase) {
                            expect(trialPhase).to.eql('I/II', 'Verification of Phase for Imported Trial when Phase is 2');
                        });
                    }
                    if (value.clinical_study.phase === 'Phase 3') {
                        console.log('Phase is Phase 3');
                        addTrial.viewTrialPhase.getText().then(function (trialPhase) {
                            expect(trialPhase).to.eql('III', 'Verification of Phase for Imported Trial when Phase is 3');
                        });
                    }
                    if (value.clinical_study.phase === 'IV') {
                        console.log('Phase is Phase 4');
                        addTrial.viewTrialPhase.getText().then(function (trialPhase) {
                            expect(trialPhase).to.eql('Phase 4', 'Verification of Phase for Imported Trial when Phase is 4');
                        });
                    }
                    if (value.clinical_study.phase === 'Phase 3/Phase 4') {
                        console.log('Phase is Phase 4');
                        addTrial.viewTrialPhase.getText().then(function (trialPhase) {
                            expect(trialPhase).to.eql('III/IV', 'Verification of Phase for Imported Trial when Phase is 3 & 4');
                        });
                    }
                    if (value.clinical_study.phase === 'N/A') {
                        console.log('Phase is N/A');
                        addTrial.viewTrialPhase.getText().then(function (trialPhase) {
                            expect(trialPhase).to.eql('NA', 'Verification of Phase for Imported Trial when Phase is N/A');
                        });
                    }
                }

                //Check if Study_type is Present in Parsed XML
                if (value.clinical_study.study_type) {
                    if (value.clinical_study.study_type === 'Interventional') {
                        console.log('Study Type is Interventional');
                        addTrial.viewTrialResearchCategory.getText().then(function (trialResearchCategory) {
                            expect(trialResearchCategory).to.eql('Interventional', 'Verification of Research Category for Imported Trial when Category is Interventional');
                        });
                    }
                    if (value.clinical_study.study_type === 'Observational [Patient Registry]') {
                        console.log('Study Type is Observational [Patient Registry]');
                        addTrial.viewTrialResearchCategory.getText().then(function (trialResearchCategory) {
                            expect(trialResearchCategory).to.eql('Observational', 'Verification of Research Category for Imported Trial when Category is Observational [Patient Registry]');
                        });
                    }
                    if (value.clinical_study.study_type === 'Observational') {
                        console.log('Study Type is Observational');
                        addTrial.viewTrialResearchCategory.getText().then(function (trialResearchCategory) {
                            expect(trialResearchCategory).to.eql('Observational', 'Verification of Research Category for Imported Trial when Category is Observational');
                        });
                    }
                    if (value.clinical_study.study_type === 'Expanded Access') {
                        console.log('Study Type is Expanded Access');
                        addTrial.viewTrialResearchCategory.getText().then(function (trialResearchCategory) {
                            expect(trialResearchCategory).to.eql('Expanded Access', 'Verification of Research Category for Imported Trial when Category is Expanded Access');
                        });
                    }
                }

                if (value.clinical_study.overall_status) {
                    if (value.clinical_study.overall_status === 'Not yet recruiting') {
                        console.log('Study overall_status is Not yet recruiting');
                        addTrial.viewTrialStatus.getText().then(function (trialStatusUI) {
                            expect(trialStatusUI).to.eql('In Review', 'Verification of Trial Status for Imported Trial');
                        });
                    }
                    else if (value.clinical_study.overall_status === 'Withdrawn') {
                        console.log('Study overall_status is Withdrawn');
                        addTrial.viewTrialStatus.getText().then(function (trialStatusUI) {
                            expect(trialStatusUI).to.eql('Withdrawn', 'Verification of Trial Status for Imported Trial');
                        });
                    }
                    else if (value.clinical_study.overall_status === 'Recruiting') {
                        console.log('Study overall_status is Recruiting');
                        addTrial.viewTrialStatus.getText().then(function (trialStatusUI) {
                            expect(trialStatusUI).to.eql('Active','Verification of Trial Status for Imported Trial');
                        });
                    }
                    else if (value.clinical_study.overall_status === 'Enrolling by Invitation') {
                        console.log('Study overall_status is Enrolling by Invitation');
                        addTrial.viewTrialStatus.getText().then(function (trialStatusUI) {
                            expect(trialStatusUI).to.eql('Enrolling by Invitation', 'Verification of Trial Status for Imported Trial');
                        });
                    }
                    else if (value.clinical_study.overall_status === 'Suspended') {
                        console.log('Study overall_status is Suspended');
                        addTrial.viewTrialStatus.getText().then(function (trialStatusUI) {
                            expect(trialStatusUI).to.eql('Temporarily Closed to Accrual', 'Verification of Trial Status for Imported Trial');
                        });
                    }
                    else if (value.clinical_study.overall_status === 'Active, not recruiting') {
                        console.log('Study overall_status is Active, not recruiting');
                        addTrial.viewTrialStatus.getText().then(function (trialStatusUI) {
                            expect(trialStatusUI).to.eql('Closed to Accrual', 'Verification of Trial Status for Imported Trial');
                        });
                    }
                    else if (value.clinical_study.overall_status === 'Terminated') {
                        console.log('Study overall_status is Terminated');
                        addTrial.viewTrialStatus.getText().then(function (trialStatusUI) {
                            expect(trialStatusUI).to.eql('Administratively Complete', 'Verification of Trial Status for Imported Trial');
                        });
                    }
                    else if (value.clinical_study.overall_status === 'Completed') {
                        console.log('Study overall_status is Completed');
                        addTrial.viewTrialStatus.getText().then(function (trialStatusUI) {
                            expect(trialStatusUI).to.eql('Complete', 'Verification of Trial Status for Imported Trial');
                        });
                    }
                    else  {
                        console.log('Study Type is no match');
                        assert.fail(0,1,'no Match for Study Status');
                    }

                }

                if (value.clinical_study.start_date) {
                    console.log('value.clinical_study.start_date');
                console.log(value.clinical_study.start_date);
                    var newStartDate = '01 ' + value.clinical_study.start_date;
                    console.log(newStartDate);
                    console.log(moment(newStartDate, 'DD MMMM YYYY').format('DD-MMM-YYYY'));
                    addTrial.viewTrialStartDate.getText().then(function (trialStartDateUI) {
                     //   expect(trialStartDateUI).to.eql(moment(newStartDate, 'DD MMMM YYYY').format('DD-MMM-YYYY'), 'Verification of Trial Start Date for Imported Trial');
                    });

                }

                if (value.clinical_study.primary_completion_date) {
                   console.log('value.clinical_study.primary_completion_date');
                    console.log(value.clinical_study.primary_completion_date);
                }
                addTrial.viewTrialLeadOrganization.isPresent().then(function(stateLeadOrg){
                    if(stateLeadOrg){
                        addTrial.viewTrialLeadOrganization.getText().then(function (trialLeadOrg) {
                        expect(trialLeadOrg).to.eql(value.clinical_study.sponsors.lead_sponsor.agency, 'Verification of Lead Org for Imported Trial');
                        });
                    }
                });
                addTrial.viewTrialDataTable4FundingSourceValues.isPresent().then(function(stateDataTbl){
                    if(stateDataTbl) {
                        addTrial.viewTrialDataTable4FundingSourceValues.getText().then(function (trialDataTblOrg) {
                            expect(trialDataTblOrg).to.eql(value.clinical_study.sponsors.lead_sponsor.agency, 'Verification of Data Tbl Org for Imported Trial');
                        });
                    }
                });
            });
        });
    };


    /**
     * Create trial for Update
     */
    this.createTrialForTrialUpdate = function () {
        //Parameters for Submit Trial
        var trialTypeNational = 'National';
        var leadOrgIdentifierNational = 'SS Lead NT Upd';
        var otherClinicalTrialIDNT = 'NCT95' + projectFunctions.getRandomInt(100000, 990000);
        var officialTitleNT = 'Trial created by Cuke test SS to test Update' + trialTypeNational;
        var phaseNT = 'I/II';
        var pilotOptionNT = 'yes';
        var researchCategory = 'Interventional';
        var primaryPurposeNT = 'Screening';
        var secondaryPurpose = '';
        var accrualDisease = 'SDC';
        var leadOrgNT = 'trialOrgSS upd';
        var principalInvNT = 'prinInvSS upd';
        var sponsorOrgNT = 'trialOrgSS upd';
        var dataTableOrg = 'trialOrgSS upd';
        var programCode = '';
        var grantOption = 'no';
        var grantFundingMechanism = '';
        var grantInstituteCode = '';
        var grantSerialNumber = '';
        var grantNCIDivisionCode = '';
        var trialStatus = 'In Review';
        var trialComment = '';
        var trialWhyStudyStopped = '';
        var INDIDEOption = 'no';
        var INDIDEType = '';
        var INDIDENumber = '';
        var INDIDEGrantor = '';
        var INDIDEHolder = '';
        var INDIDEInstitution = '';
        var responsibleParty = '';
        var responsiblePartySI = 'Sponsor-Investigator';
        var trialOversightCountry = '';
        var trialOversightOrg = '';
        var FDARegulatedIndicator = '';
        var section801Indicator = '';
        var dataMonitoringIndicator = '';
        var protocolDoc = 'testSampleDocFile.docx';
        var IRBDoc = 'testSampleXlsFile.xls';
        var participatingSiteDoc = '';
        var informedConsentDoc = 'testSampleDocFile.docx';
        var otherDoc = '';
        var submitTrial = 'SUBMITTRIAL';


        var userCtrpTrialSubmitter = 'ctrptrialsubmitter';

        self.createTrial(userCtrpTrialSubmitter, trialTypeNational, leadOrgIdentifierNational, otherClinicalTrialIDNT, '', '', officialTitleNT, phaseNT, pilotOptionNT, researchCategory, primaryPurposeNT, secondaryPurpose,
            accrualDisease, leadOrgNT, principalInvNT, sponsorOrgNT, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, trialStatus, trialComment, trialWhyStudyStopped,
            INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
            protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, submitTrial);
        browser.driver.wait(function () {
            console.log('wait here');
            return true;
        }, 40).then(function () {
            leadProtocolIDNT = leadProtocolID;
            nciIDNT = nciID;
            otherIDNT = otherIDs;
            trialOfficialTitleNT = officialTitle;
            trialPhaseNT = phase;
            trialPurposeNT = purpose;
            principalInvestigatorNT = principalInvestigator;
            leadOrganizationNT = leadOrganization;
            sponsorNT = sponsor;
            participatingSiteNT = participatingSiteInTrial;
                });
    };

    /**
     * Method: This will create a New Trial everytime
     * @param userWhoWillCreateTrial
     * @param trialType
     * @param leadOrgIdentifier
     * @param otherClinicalTrialID
     * @param otherObsoleteClinicalTrialID
     * @param otherIdentifier
     * @param officialTitle
     * @param phase
     * @param pilotOption
     * @param researchCategory
     * @param primaryPurpose
     * @param secondaryPurpose
     * @param accrualDisease
     * @param leadOrg
     * @param principalInv
     * @param sponsorOrg
     * @param dataTableOrg
     * @param programCode
     * @param grantOption
     * @param grantFundingMechanism
     * @param grantInstituteCode
     * @param grantSerialNumber
     * @param grantNCIDivisionCode
     * @param trialStatus
     * @param trialComment
     * @param trialWhyStudyStopped
     * @param INDIDEOption
     * @param INDIDEType
     * @param INDIDENumber
     * @param INDIDEGrantor
     * @param INDIDEHolder
     * @param INDIDEInstitution
     * @param responsibleParty
     * @param trialOversightCountry
     * @param trialOversightOrg
     * @param FDARegulatedIndicator
     * @param section801Indicator
     * @param dataMonitoringIndicator
     * @param protocolDoc
     * @param IRBDoc
     * @param participatingSiteDoc
     * @param informedConsentDoc
     * @param otherDoc
     * @param saveDraftOrSubmitTrial
     */
    this.createNewTrial = function (userWhoWillCreateTrial,                                                                                                             //Name of User who will create Trial
                                 trialType, leadOrgIdentifier, otherClinicalTrialID, otherObsoleteClinicalTrialID, otherIdentifier,                                  //Trial Identifiers
                                 officialTitle, phase, pilotOption, researchCategory, primaryPurpose, secondaryPurpose, accrualDisease,                              //Trial Details
                                 leadOrg, principalInv,                                                                                                              //Lead Organization/Principal Investigator
                                 sponsorOrg,                                                                                                                         //Sponsor
                                 dataTableOrg, programCode,                                                                                                          //Data Table 4 Information
                                 grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode,                                    //NIH Grant Information (for NIH funded Trials)
                                 trialStatus, trialComment, trialWhyStudyStopped,                                                                                    //Trial Status
                                 INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution,                                             //FDA IND/IDE Information for applicable trials
                                 responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,    //Regulatory Information
                                 protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc,                                                            //Trial Related Documents
                                 saveDraftOrSubmitTrial                                                                                                              //Choose whether to Save Draft OR Submit Trial
    ) {
        var saveDraft = 'SAVEDRAFT';
        var submitTrial = 'SUBMITTRIAL';
        storeLeadProtocolId = leadOrgIdentifier + trialType.substring(0, 3) + ' ' + moment().format('MMMDoYY');
        //login.loginUser.getText().then(function (loggedInUserName) {
        //    if (loggedInUserName === userWhoWillCreateTrial) {
        //        console.log('Given user already logged in');
        //        trialMenuItem.clickTrials();
        //        trialMenuItem.clickListSearchTrialLink();
        //    }
        //    else {
        //        commonFunctions.onPrepareLoginTest(userWhoWillCreateTrial);
        //        console.log('Login with different user');
        //        trialMenuItem.clickHomeSearchTrial();
        //        login.clickWriteMode('On');
        //        trialMenuItem.clickTrials();
        //        trialMenuItem.clickListSearchTrialLink();
        //    }
        //});
        //browser.driver.wait(function () {
        //    console.log('wait here');
        //    return true;
        //}, 10).then(function () {

            //if (leadOrgIdentifier !== '') {
            //    searchTrial.setSearchTrialProtocolID(leadOrgIdentifier + trialType + ' ' + moment().format('MMMDoYY'));
            //}
            //storeLeadProtocolId = searchTrial.searchTrialProtocolID.getAttribute('value').then(function (value) {
            //    console.log('This is the Lead Organization Trial Identifier that was searched' + value);
            //    return value;
            //});
            //searchTrial.clickSearchTrialSearchButton();
            //if (saveDraftOrSubmitTrial.toUpperCase() === saveDraft) {
            //    searchTrial.clickSearchTrialSavedDrafts();
            //}
            //if (saveDraftOrSubmitTrial.toUpperCase() === submitTrial) {
            //    searchTrial.clickSearchTrialAllTrials();
            //}
            //return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
            //    if (state === true) {
            //        storeLeadProtocolId.then(function (value) {
            //            element(by.linkText(value)).click();
            //            self.importTrialFieldValues();
            //            // nciID = addTrial.viewTrialNCIID.getText().then(function (nciIDTrial){
            //            //  console.log('***** Trial with Lead Protocol ID " ' + value + ' " exists **********. Its NCI ID is --> ' + nciIDTrial + ' <--');
            //            // });
            //        });
            //    }
            //    else {
                    self.selectTrials(trialType);

//      Create Lead Org, Principal Investigator, sponsor Org, DataTable Org//
                    /****** Create Lead Organization ********/
                    if (leadOrg !== '') {
                        self.createOrgforTrial(leadOrg, trialType, '0', userWhoWillCreateTrial);

                        /** Stores the value of Lead Org **/
                        storeLeadOrg = cukeOrganization.then(function (value) {
                            console.log('This is the Lead Organization that is added' + value);
                            return value;
                        });
                    }
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 10).then(function () {

                        /****** Create Principal Investigator ********/
                        if (principalInv !== '') {
                            self.createPersonforTrial(principalInv, trialType, '0', userWhoWillCreateTrial);

                            /** Stores the value of Principal Investigator **/
                            storePI = cukePerson.then(function (value) {
                                console.log('This is the Principal Investigator that is added' + value);
                                return value;
                            });
                        }
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 10).then(function () {

                            /****** Create Sponsor Organization ********/
                            if (sponsorOrg !== '') {
                                self.createOrgforTrial(sponsorOrg, trialType, '1', userWhoWillCreateTrial);

                                /** Stores the value of Sponsor Org **/
                                storeSponsorOrg = cukeOrganization.then(function (value) {
                                    console.log('This is the Sponsor Organization that is added' + value);
                                    return value;
                                });
                            }
                            browser.driver.wait(function () {
                                console.log('wait here');
                                return true;
                            }, 10).then(function () {

                                /****** Create Data Table 4 Funding Source Organization ********/
                                if (dataTableOrg !== '') {
                                    self.createOrgforTrial(dataTableOrg, trialType, '2', userWhoWillCreateTrial);

                                    /** Stores the value of Data Table 4 Funding Source Org **/
                                    storeFundingSrcOrg = cukeOrganization.then(function (value) {
                                        console.log('This is the Funding Source Organization that is added' + value);
                                        return value;
                                    });
                                }

                                /**** Trial Identifiers ****/
                              //  storeLeadProtocolId.then(function (value) {
                                    console.log('This is the Lead Organization Trial Identifier that is added' + storeLeadProtocolId);
                                    addTrial.setAddTrialLeadProtocolIdentifier(storeLeadProtocolId);
                              //  });
                                if (otherClinicalTrialID !== '') {
                                    addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'ClinicalTrials.gov Identifier')).click();
                                    addTrial.setAddTrialProtocolID(otherClinicalTrialID);
                                    storeClinicalTrialID = addTrial.addTrialProtocolID.getAttribute('value').then(function (value) {
                                        console.log('This is the Clinical Trial Identifier that was added' + value);
                                        return value;
                                    });
                                    addTrial.clickAddTrialAddProtocolButton();
                                }
                                if (otherObsoleteClinicalTrialID !== '') {
                                    addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'Obsolete ClinicalTrials.gov Identifier')).click();
                                    addTrial.setAddTrialProtocolID(otherObsoleteClinicalTrialID);
                                    storeObsoleteClinicalTrialID = addTrial.addTrialProtocolID.getAttribute('value').then(function (value) {
                                        console.log('This is the Obsolete Clinical Trial Identifier that was added' + value);
                                        return value;
                                    });
                                    addTrial.clickAddTrialAddProtocolButton();
                                }
                                if (otherIdentifier !== '') {
                                    addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', 'Other Identifier')).click();
                                    addTrial.setAddTrialProtocolID(otherIdentifier);
                                    storeOtherClinicalTrialID = addTrial.addTrialProtocolID.getAttribute('value').then(function (value) {
                                        console.log('This is the Other Trial Identifier that was added' + value);
                                        return value;
                                    });
                                    addTrial.clickAddTrialAddProtocolButton();
                                }

                                /**** Trial Details ****/
                                addTrial.setAddTrialOfficialTitle(officialTitle + ' ' + moment().format('MMMDoYY'));
                                addTrial.selectAddTrialPhase(phase);
                                if (pilotOption !== '') {
                                    addTrial.selectAddTrialPilotOption(pilotOption);
                                }
                                addTrial.selectAddTrialResearchCategory(researchCategory);
                                addTrial.selectAddTrialPrimaryPurpose(primaryPurpose);
                                if (secondaryPurpose !== '') {
                                    addTrial.selectAddTrialSecondaryPurpose(secondaryPurpose);
                                }
                                addTrial.selectAddTrialAccrualDiseaseTerminology(accrualDisease);

                                /**** Lead Organization/Principal Investigator ****/
                                /***** This will add the Lead Org  if Lead org is not there ******/
                                if (leadOrg !== '') {
                                    addTrial.addTrialLeadOrganization.getAttribute('value').then(function (value) {
                                        console.log('value of Lead Org"' + value + '"is this');
                                        if (value === '') {

                                            storeLeadOrg.then(function (value) {
                                                self.selectOrgforTrial(value, '0');
                                            });
                                        }
                                    });
                                }

                                /***** This will add the Principal Investigator if PI is not there ******/
                                if (principalInv !== '') {
                                    addTrial.addTrialPrincipalInvestigator.getAttribute('value').then(function (value) {
                                        console.log('value of PI"' + value + '"is this');
                                        if (value.trim() === '') {
                                            storePI.then(function (value) {
                                                self.selectPerForTrial(value, '0');
                                            });
                                        }
                                    });
                                }

                                /**** Sponsor ****/
                                /***** This will add the Sponsor Org if Sponsor Org is not there ******/
                                if (sponsorOrg !== '') {
                                    addTrial.addTrialSponsor.getAttribute('value').then(function (value) {
                                        console.log('value of Sponsor Org"' + value + '"is this');
                                        if (value === '') {
                                            storeSponsorOrg.then(function (value) {
                                                self.selectOrgforTrial(value, '1');
                                            });
                                        }
                                    });
                                }

                                /**** Data Table 4 Information ****/
                                /***** This will add the Funding Source Org if it is not there******/
                                if (dataTableOrg !== '') {
                                    addTrial.addTrialDataTable4FundingSourceValues.getAttribute('value').then(function (value) {
                                        console.log('value of data table Org"' + value + '"is this');
                                        if (value === '') {

                                            storeFundingSrcOrg.then(function (value) {
                                                self.selectOrgforTrial(value, '2');
                                            });
                                        }
                                    });
                                }

                                if (programCode !== '') {
                                    addTrial.setAddTrialDataTable4ProgramCode(programCode);
                                }

                                /**** NIH Grant Information (for NIH funded Trials) ****/
                                if (grantOption !== '') {
                                    addTrial.selectAddTrialFundedByNCIOption(grantOption);

                                    if (grantOption.toUpperCase() !== 'NO' && grantOption !== '1') {
                                        addTrial.selectAddTrialFundingMechanism(grantFundingMechanism);
                                        addTrial.selectAddTrialInstituteCode(grantInstituteCode);
                                        addTrial.setAddTrialSerialNumber(grantSerialNumber);
                                        addTrial.addTrialSerialNumberSelect.click();
                                        addTrial.selectAddTrialNCIDivisionProgramCode(grantNCIDivisionCode);
                                        addTrial.clickAddTrialAddGrantInfoButton();
                                    }
                                }

                                /**** Trial Status ****/
                                addTrial.clickAddTrialDateField(0);
                                addTrial.clickAddTrialDateToday();
                                addTrial.selectAddTrialStatus(trialStatus);
                                if (trialComment !== '') {
                                    addTrial.setAddTrialStatusComment(trialComment);
                                }
                                if (trialStatus === 'Withdrawn' || trialStatus === 'Temporarily Closed to Accrual' || trialStatus === 'Temporarily Closed to Accrual and Intervention' || trialStatus === 'Administratively Complete') {
                                    addTrial.setAddTrialWhyStudyStopped(trialWhyStudyStopped);
                                }
                                addTrial.clickAddTrialAddStatusButton();

                                /**** Trial Dates ****/
                                addTrial.clickAddTrialDateField(1);
                                addTrial.clickAddTrialDateFieldPreviousMonth('10');
                                addTrial.selectAddTrialStartDateOption('0');
                                addTrial.clickAddTrialDateField(2);
                                addTrial.clickAddTrialDateToday();
                                addTrial.selectAddTrialPrimaryCompletionDateOption('0');
                                addTrial.clickAddTrialDateField(3);
                                addTrial.clickAddTrialDateFieldNextMonth('10');
                                addTrial.selectAddTrialCompletionDateOption('1');

                                /**** FDA IND/IDE Information for applicable trials ****/
                                if (INDIDEOption !== '') {
                                    addTrial.selectAddTrialFDAIND_IDEOption(INDIDEOption);
                                }
                                if (INDIDEOption.toUpperCase() !== 'NO' && INDIDEOption !== '1') {
                                    addTrial.selectAddTrialFDAIND_IDETypes(INDIDEType);
                                    addTrial.setAddTrialFDAIND_IDENumber(INDIDENumber);
                                    addTrial.selectAddTrialFDAIND_IDEGrantor(INDIDEGrantor);
                                    addTrial.selectAddTrialFDAIND_IDEHolderType(INDIDEHolder);
                                    if (INDIDEInstitution !== '') {
                                        addTrial.selectAddTrialFDAProgramCode(INDIDEInstitution);
                                    }
                                    addTrial.clickAddTrialAddIND_IDEButton();
                                }

                                /**** Regulatory Information ****/
                                if (responsibleParty !== '') {
                                    addTrial.selectAddTrialResponsibleParty(responsibleParty);
                                }
                                if (trialOversightCountry !== '') {
                                    addTrial.selectAddTrialOversightAuthorityCountry(trialOversightCountry);
                                    addTrial.selectAddTrialOversightAuthorityOrganization(trialOversightOrg);
                                    addTrial.clickAddTrialAddOversightAuthorityButton();
                                }
                                if (FDARegulatedIndicator !== '') {
                                    addTrial.selectAddTrialFDARegulatedInterventionIndicator(FDARegulatedIndicator);
                                }
                                if (section801Indicator !== '') {
                                    addTrial.selectAddTrialSection801Indicator(section801Indicator);
                                }
                                if (dataMonitoringIndicator !== '') {
                                    addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator(dataMonitoringIndicator);
                                }

                                /**** Trial Related Documents ****/
                                if (protocolDoc !== '') {
                                    trialDoc.trialRelatedFileUpload('reg', '1', protocolDoc);
                                }
                                if (IRBDoc !== '') {
                                    trialDoc.trialRelatedFileUpload('reg', '2', IRBDoc);
                                }
                                if (participatingSiteDoc !== '') {
                                    trialDoc.trialRelatedFileUpload('reg', '3', participatingSiteDoc);
                                }
                                if (informedConsentDoc !== '') {
                                    trialDoc.trialRelatedFileUpload('reg', '4', informedConsentDoc);
                                }
                                if (otherDoc !== '') {
                                    trialDoc.trialRelatedFileUpload('reg', '5', otherDoc);
                                }
                                if (saveDraftOrSubmitTrial.toUpperCase() === saveDraft) {
                                    addTrial.clickAddTrialSaveDraftButton();
                                    addTrial.addTrialLeadProtocolIdValidationMessage.getText().then(function (warningMsg) {
                                        if (warningMsg === '') {
                                         //   storeLeadProtocolId.then(function (leadProtocolID) {
                                                console.log('Draft is Save with Lead protocol ID *************   ' + storeLeadProtocolId + '   ************ Trial Type ->  ' + trialType);

                                                trialMenuItem.clickTrials();
                                                trialMenuItem.clickListSearchTrialLink();
                                                searchTrial.setSearchTrialProtocolID(storeLeadProtocolId);
                                                searchTrial.clickSavedDrafts();
                                                element(by.linkText(storeLeadProtocolId)).click();
                                                self.importTrialFieldValues();

                                           // });
                                        }
                                        else {
                                            assert.fail(0, 1, '\nDraft not Saved.\n' + 'Error message in Page:\n-->' + warningMsg);
                                        }
                                    });
                                }
                                else if (saveDraftOrSubmitTrial.toUpperCase() === submitTrial) {
                                    return addTrial.addTrialSubmitButton.isPresent().then(function (state) {
                                        if (state === true) {
                                            addTrial.clickAddTrialReviewButton();
                                            console.log('Trial Successfully created');
                                            helper.wait(addTrial.viewTrialNCIID, 'NCI ID element on View Trial Page');
                                            addTrial.viewTrialNCIID.getText().then(function (nciID) {
                                                console.log('NCI ID of the Trial that was created is *************   ' + nciID + '   ************ Trial Type ->  ' + trialType);
                                            });
                                            self.importTrialFieldValues();
                                        } else {
                                            addTrial.clickAddTrialReviewButton();
                                            menuItem.addWarningMessage.getText().then(function (warningMsg) {
                                                addTrial.addTrialValidationMessage.getText().then(function (associationWarningMsg) {
                                                    assert.fail(0, 1, '\nSubmit button not found in the Page, may be form has some errors.\n See below if error is listed\n' + 'Error message in Page:\n-->' + underscore.compact(warningMsg).join("\n-->") + '\nAssociation error msg in Page: \n-->' + underscore.compact(associationWarningMsg).join("\n-->"));
                                                });
                                            });
                                        }
                                    });
                                }
                                else {
                                    assert.fail(0, 1, 'No Match Found with the provided Option -- ' + saveDraftOrSubmitTrial + ' -- Please choose the option either as \'SaveDraft\' OR \'SubmitTrial\'');
                                }
                            });
                        });
                    });
                };

};
module.exports = projectMethodsRegistry;