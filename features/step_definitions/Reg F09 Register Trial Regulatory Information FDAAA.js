;
/**
 * Created by singhs10 on 12/29/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');

module.exports = function () {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();

    this.Given(/^I am on the Register Trial Regulatory Information screen$/, function (callback) {
        callback();
    });

    this.Given(/^I have noted that "([^"]*)""([^"]*)""([^"]*)"$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function () {
            console.log(arg1 + '\"' + arg2 + '\"' + arg3);
            addTrial.getVerifyAddTrialRegulatoryInformationText(arg1 + '\"' + arg2 + '\"' + arg3);
            // browser.sleep(25).then(callback);
        });
    });


    this.When(/^I have selected the Responsible Party type as:$/, function (table) {
        return browser.sleep(25).then(function () {
            trialResponsibleParty = table.raw();
            console.log('value of Responsible Party table' + trialResponsibleParty);
            addTrial.addTrialResponsiblePartyList.getText().then(function (value) {
                console.log(value);
                expect(value).to.eql(trialResponsibleParty.toString().split(","));
            });
            addTrial.selectAddTrialResponsibleParty('Sponsor');
            addTrial.getVerifyAddTrialResponsibleParty('Sponsor');
        });
        //  browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected one or more of the Trial Oversight Authority Country and Organization Names from the provided list$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialOversightAuthorityCountry('Gabon');
            addTrial.selectAddTrialOversightAuthorityOrganization('Ministry of Health');
            addTrial.clickAddTrialAddOversightAuthorityButton();
            addTrial.selectAddTrialOversightAuthorityCountry('Italy');
            addTrial.selectAddTrialOversightAuthorityOrganization('The Italian Medicines Agency');
            addTrial.clickAddTrialAddOversightAuthorityButton();
            projectFunctionsRegistry.verifyAddTrialOversightCountryOrganization('Gabon', 'Ministry of Health');
            projectFunctionsRegistry.verifyAddTrialOversightCountryOrganization('Italy', 'The Italian Medicines Agency');
        });
        // browser.sleep(25).then(callback);
    });

    this.Given(/^the FDA Regulated Intervention Indicator will be defaulted to the "([^"]*)" setting$/, function (arg1) {
        return browser.sleep(25).then(function () {
            addTrial.verifyAddTrialFDARegulatedInterventionIndicator('0', false);
            addTrial.verifyAddTrialFDARegulatedInterventionIndicator('1', false);
            addTrial.verifyAddTrialFDARegulatedInterventionIndicator('2', true);
        });
        //  browser.sleep(25).then(callback);
    });

    this.Given(/^the Section (\d+) Indicator will be defaulted to the "([^"]*)" setting$/, function (arg1, arg2) {
        return browser.sleep(25).then(function () {
            addTrial.verifyAddTrialSection801Indicator('0', false);
            addTrial.verifyAddTrialSection801Indicator('1', false);
            addTrial.verifyAddTrialSection801Indicator('2', true);
        });
        //  browser.sleep(25).then(callback);
    });

    this.Given(/^the Data Monitoring Committee Appointed Indicator will be defaulted to the "([^"]*)" setting$/, function (arg1) {
        return browser.sleep(25).then(function () {
            addTrial.verifyAddTrialDataMonitoringCommitteeAppointedIndicator('0', false);
            addTrial.verifyAddTrialDataMonitoringCommitteeAppointedIndicator('1', false);
            addTrial.verifyAddTrialDataMonitoringCommitteeAppointedIndicator('2', true);
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have the option to change the defaulted "([^"]*)" setting to either "([^"]*)" or "([^"]*)"for FDA Regulated Intervention Indicator$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('0');
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('1');
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('2');
        });
        //  browser.sleep(25).then(callback);
    });

    this.Given(/^I have the option to change the defaulted "([^"]*)" setting to either"([^"]*)"or "([^"]*)" for Section (\d+) Indicator$/, function (arg1, arg2, arg3, arg4) {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialSection801Indicator('0');
            addTrial.selectAddTrialSection801Indicator('1');
            addTrial.selectAddTrialSection801Indicator('2');
            addTrial.selectAddTrialSection801Indicator('1');
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have the option to change the defaulted "([^"]*)" setting to either "([^"]*)"or "([^"]*)" for Data Monitoring Committee Appointed Indicator$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('0');
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('1');
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('2');
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('1');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected"([^"]*)" or "([^"]*)"for FDA Regulated Intervention Indicator$/, function (arg1, arg2) {
        return browser.sleep(25).then(function () {
            addTrial.verifyAddTrialFDARegulatedInterventionIndicator('0', false);
            addTrial.verifyAddTrialFDARegulatedInterventionIndicator('1', false);
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('0');
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('1');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have select either "([^"]*)" or "([^"]*)" for Section (\d+) Indicator$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function () {
            //   addTrial.verifyAddTrialSection801Indicator('0', false);
            addTrial.verifyAddTrialSection801Indicator('1', false);
            addTrial.selectAddTrialSection801Indicator('0');
            addTrial.selectAddTrialSection801Indicator('1');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected either "([^"]*)" or "([^"]*)" for Data Monitoring Committee Appointed Indicator$/, function (arg1, arg2) {
        return browser.sleep(25).then(function () {
            addTrial.verifyAddTrialDataMonitoringCommitteeAppointedIndicator('0', false);
            addTrial.verifyAddTrialDataMonitoringCommitteeAppointedIndicator('1', false);
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('0');
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('1');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Register Trial Regulatory Information section will not indicate any errors during Trial Review$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            addTrial.getVerifyAddTrialResponsibleParty('Sponsor');
            projectFunctionsRegistry.verifyAddTrialOversightCountryOrganization('Gabon', 'Ministry of Health');
            projectFunctionsRegistry.verifyAddTrialOversightCountryOrganization('Italy', 'The Italian Medicines Agency');
            addTrial.verifyAddTrialFDARegulatedInterventionIndicator('2', true);
            addTrial.verifyAddTrialSection801Indicator('1', true);
            addTrial.verifyAddTrialDataMonitoringCommitteeAppointedIndicator('1', true);
            //  browser.sleep(25).then(callback);
        });
    });

    this.When(/^I select the Responsible Party type as the "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            responsiblePartySelected = arg1;
            addTrial.selectAddTrialResponsibleParty(arg1);
            addTrial.getVerifyAddTrialResponsibleParty(arg1);
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Sponsor Organization will be recorded as the Responsible Party$/, function (callback) {
        callback();
    });

    this.Then(/^the Principal Investigator selected will be recorded as the Responsible Party Investigator$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createPersonforTrial('shiTrialPerson0', typeOfTrial, '0', 'ctrptrialsubmitter');
            addTrial.selectAddTrialResponsibleParty('Principal Investigator');
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                storePrincipalInvestigator = cukePerson.then(function (value) {
                    console.log('value of PERSON' + value);
                    addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
                    return value;
                });
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^the Investigator Title will be displayed as "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialInvestigatorTitle(arg1);
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^the Investigator Title may be edited$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.setAddTrialInvestigatorTitle('Principal Investigator Title Edited');
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^the Investigator Affiliation will be the Sponsor Organization$/, function () {
        return browser.sleep(25).then(function () {
            if(responsiblePartySelected === 'Principal Investigator') {
                projectFunctionsRegistry.createOrgforTrial('shiTrialOrg1', typeOfTrial, '1', 'ctrptrialsubmitter');
                addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                //storePrincipalInvestigator.then(function (value) {
                //    projectFunctionsRegistry.selectPerForTrial(value,'0');
                //    addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                //    addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                //    addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                //    addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
                //});
                //cukePerson.then(function (value) {
                //    console.log('value of PERSON' + value);
                //    projectFunctionsRegistry.selectPerForTrial(value,'1');
                //    addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
                //});
                addTrial.getVerifyAddTrialInvestigatorTitle('Principal Investigator');
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 40).then(function () {
                    storePrincipalInvestigatorAffOrg = cukeOrganization.then(function (value) {
                        console.log('value of Org' + value);
                        addTrial.getVerifyAddTrialInvestigatorAffiliation(value);
                        return value;
                    });
                });
            }
            if(responsiblePartySelected === 'Sponsor-Investigator') {
                projectFunctionsRegistry.createOrgforTrial('shiTrialOrg1', typeOfTrial, '1', 'ctrptrialsubmitter');
                addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                storePrincipalInvestigator.then(function (value) {
                    projectFunctionsRegistry.selectPerForTrial(value, '0');
                    addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                    addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                    addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                    addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
                });
                cukePerson.then(function (value) {
                    console.log('value of PERSON' + value);
                    projectFunctionsRegistry.selectPerForTrial(value, '1');
                    addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
                });
                addTrial.getVerifyAddTrialInvestigatorTitle('Principal Investigator');
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 40).then(function () {
                    cukeOrganization.then(function (value) {
                        console.log('value of Org' + value);
                        addTrial.getVerifyAddTrialInvestigatorAffiliation(value);
                        return value;
                    });
                });
            }
            //  browser.sleep(25).then(callback);
        });
    });


    //this.Given(/^the Investigator Affiliation will be the Principal Investigator's organization affiliation$/, function (callback) {
    //    storePrincipalInvestigatorAffOrg = cukeOrganization.then(function (value) {
    //        console.log('value of Principal Investigator affiliation Organization' + value);
    //        addTrial.getVerifyAddTrialInvestigatorAffiliation(value);
    //        return value;
    //    });
    //    browser.sleep(25).then(callback);
    //});

    this.Given(/^the Investigator Affiliation can be changed$/, function () {
        return browser.sleep(25).then(function () {
            /* Create or use an Org to affiliate Person Org **/
            projectFunctionsRegistry.createOrgforTrial('shiTrialPIOrg0', typeOfTrial, '3', 'ctrptrialsubmitter');
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                /* Verify the Org is affiliated **/
                cukeOrganization.then(function (value) {
                    console.log('value of Principal Investigator affiliation Organization' + value);
                    addTrial.getVerifyAddTrialInvestigatorAffiliation(value);
                });
                /* Click Reset and add the Principal Investigator fields again*/
                addTrial.clickAddTrialResetButton();
                addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                storePrincipalInvestigator.then(function (value) {
                    projectFunctionsRegistry.selectPerForTrial(value, '0');
                    addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
                });
                addTrial.getVerifyAddTrialInvestigatorTitle('Principal Investigator');
                storePrincipalInvestigatorAffOrg.then(function (value) {
                    projectFunctionsRegistry.selectOrgforTrial(value, '1');
                    addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                    addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                    addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                    addTrial.getVerifyAddTrialInvestigatorAffiliation(value);
                });
                cukeOrganization.then(function (value) {
                    projectFunctionsRegistry.selectOrgforTrial(value, '3');
                    addTrial.getVerifyAddTrialInvestigatorAffiliation(value);
                });
                /* Click Review and verify the Principal Investigator fields again*/
                addTrial.clickAddTrialReviewButton();
                storePrincipalInvestigator.then(function (value) {
                    addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
                });
                addTrial.getVerifyAddTrialInvestigatorTitle('Principal Investigator');
                cukeOrganization.then(function (value) {
                    addTrial.getVerifyAddTrialInvestigatorAffiliation(value);
                });

            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^The field type must be entered$/, function (table) {
        return browser.sleep(25).then(function () {
            addTrial.clickAddTrialReviewButton();
            //   browser.sleep(25).then(callback);
        });
    });

    this.When(/^the field type is not entered$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.getVerifyAddTrialInvestigator(' ');
            addTrial.setAddTrialInvestigatorTitle('');
            addTrial.getVerifyAddTrialInvestigatorTitle('');
            addTrial.getVerifyAddTrialInvestigatorAffiliation('');
            addTrial.clickAddTrialReviewButton();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the error type will be displayed$/, function (table) {
        return browser.sleep(25).then(function () {
            errorTable = table.raw();
            for (var i = 0; i < errorTable.length; i++) {
                // console.log(errorTable);
                console.log(errorTable[i].toString());
                expect(projectFunctions.verifyWarningMessage(errorTable[i].toString())).to.become('true');
            }
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Principal Investigator will be populated in Investigator field as default$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createPersonforTrial('shiTrialPerson0', typeOfTrial, '0', 'ctrptrialsubmitter');
            addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
            addTrial.selectAddTrialResponsibleParty('Principal Investigator');
            addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                storePrincipalInvestigator = cukePerson.then(function (value) {
                    console.log('value of PERSON' + value);
                    addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
                    return value;
                });
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have performed a person search in Search Persons for Investigator$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createPersonforTrial('shiTrialPersonInv0', typeOfTrial, '1', 'ctrptrialsubmitter');
        });
        // browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a person as an Investigator$/, function (callback) {
        //  projectFunctionsRegistry.createPersonforTrial('shiTrialPersonInv0',typeOfTrial, '1');
        callback();
    });

    this.Then(/^the person selected will be recorded as the Sponsor-Investigator$/, function () {
        return browser.sleep(25).then(function () {
            cukePerson.then(function (value) {
                console.log('value of PERSON' + value);
                addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^the Investigation Affiliation will be the Sponsor Organization$/, function () {
        return browser.sleep(25).then(function () {
            projectFunctionsRegistry.createOrgforTrial('shiTrialOrg1', typeOfTrial, '1', 'ctrptrialsubmitter');
            addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
            addTrial.selectAddTrialResponsibleParty('Principal Investigator');
            addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
            storePrincipalInvestigator.then(function (value) {
                projectFunctionsRegistry.selectPerForTrial(value, '0');
                addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
            });
            cukePerson.then(function (value) {
                console.log('value of PERSON' + value);
                projectFunctionsRegistry.selectPerForTrial(value, '1');
                addTrial.getVerifyAddTrialInvestigator('lName, ' + value);
            });
            addTrial.getVerifyAddTrialInvestigatorTitle('Principal Investigator');
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                cukeOrganization.then(function (value) {
                    console.log('value of Org' + value);
                    addTrial.getVerifyAddTrialInvestigatorAffiliation(value);
                    return value;
                });
            });
        });
        //  browser.sleep(25).then(callback);
    });

    this.Given(/^the Investigator Affiliation cannot be changed$/, function () {
        return browser.sleep(7000).then(function () {
            expect(addTrial.addTrialOrgSearchModel.get(3).isDisplayed()).to.become(false);
        });
        // browser.sleep(25).then(callback);
    });

    this.When(/^I have selected "([^"]*)" for FDA Regulated Intervention Indicator$/, function (arg1) {
        return browser.sleep(25).then(function () {
            if (arg1 === 'NA') {
                addTrial.selectAddTrialFDARegulatedInterventionIndicator('2');
            }
            else if (arg1 === 'No') {
                addTrial.clickAddTrialResetButton();
                addTrial.selectAddTrialFDARegulatedInterventionIndicator('0');
            }
            else if (arg1 === 'Yes') {
                addTrial.clickAddTrialResetButton();
                addTrial.selectAddTrialFDARegulatedInterventionIndicator('1');
            }
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I can select "([^"]*)", "([^"]*)", "([^"]*)" for the Section (\d+) Indicator field$/, function (arg1, arg2, arg3, arg4) {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialSection801Indicator.get(0).isEnabled()).to.become(true);
            expect(addTrial.addTrialSection801Indicator.get(1).isEnabled()).to.become(true);
            expect(addTrial.addTrialSection801Indicator.get(2).isEnabled()).to.become(true);
            addTrial.selectAddTrialSection801Indicator('0');
            addTrial.selectAddTrialSection801Indicator('1');
            addTrial.selectAddTrialSection801Indicator('2');
            //  browser.sleep(25).then(callback);
        });
    });


    this.Given(/^I have selected "([^"]*)", "([^"]*)", "([^"]*)" for Data Monitoring Committee Appointed Indicator$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialDataMonitoringCommitteeAppointedIndicator.get(0).isEnabled()).to.become(true);
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('0');
            expect(addTrial.addTrialDataMonitoringCommitteeAppointedIndicator.get(1).isEnabled()).to.become(true);
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('1');
            expect(addTrial.addTrialDataMonitoringCommitteeAppointedIndicator.get(2).isEnabled()).to.become(true);
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('2');
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('1');
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Section (\d+) Indicator will be set to "([^"]*)"$/, function (arg1, arg2) {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialSection801Indicator.get(0).isEnabled()).to.become(true);
            addTrial.verifyAddTrialSection801Indicator('0', true);
            expect(addTrial.addTrialSection801Indicator.get(1).isEnabled()).to.become(false);
            addTrial.verifyAddTrialSection801Indicator('1', false);
            expect(addTrial.addTrialSection801Indicator.get(2).isEnabled()).to.become(false);
            addTrial.verifyAddTrialSection801Indicator('2', false);
        });
        //  browser.sleep(25).then(callback);
    });

    this.Then(/^I can select only "([^"]*)" or "([^"]*)" for Section (\d+) Indicator$/, function (arg1, arg2, arg3) {
        return browser.sleep(25).then(function () {
            expect(addTrial.addTrialSection801Indicator.get(0).isEnabled()).to.become(true);
            expect(addTrial.addTrialSection801Indicator.get(1).isEnabled()).to.become(true);
            expect(addTrial.addTrialSection801Indicator.get(2).isEnabled()).to.become(false);
            addTrial.selectAddTrialSection801Indicator('0');
            addTrial.selectAddTrialSection801Indicator('1');
            //   browser.sleep(25).then(callback);
        });
    });


    //this.When(/^I have selected"([^"]*)"for FDA Regulated Intervention Indicator$/, function (arg1, callback) {
    //    addTrial.selectAddTrialFDARegulatedInterventionIndicator('0');
    //    browser.sleep(25).then(callback);
    //});
    //
    //this.Given(/^I have noted that Section (\d+) Indicator is set to "([^"]*)"$/, function (arg1, arg2, callback) {
    //    expect(addTrial.addTrialSection801Indicator.get(0).isEnabled()).to.become(true);
    //    addTrial.verifyAddTrialSection801Indicator('0', true);
    //    expect(addTrial.addTrialSection801Indicator.get(1).isEnabled()).to.become(false);
    //    browser.sleep(25).then(callback);
    //});

    //this.When(/^I have selected "([^"]*)" for FDA Regulated Intervention Indicator$/, function (arg1, callback) {
    //    addTrial.clickAddTrialResetButton();
    //    addTrial.selectAddTrialFDARegulatedInterventionIndicator('1');
    //    browser.sleep(25).then(callback);
    //});
    //
    //this.Then(/^I can select "([^"]*)" or "([^"]*)" for Section (\d+) Indicator$/, function (arg1, arg2, arg3, callback) {
    //    expect(addTrial.addTrialSection801Indicator.get(0).isEnabled()).to.become(true);
    //    expect(addTrial.addTrialSection801Indicator.get(1).isEnabled()).to.become(true);
    //    addTrial.selectAddTrialSection801Indicator('0');
    //    addTrial.selectAddTrialSection801Indicator('1');
    //    browser.sleep(25).then(callback);
    //});

    this.When(/^I add a duplicate Trial Oversight Authority and Organization Names$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.selectAddTrialOversightAuthorityCountry('Gabon');
            addTrial.selectAddTrialOversightAuthorityOrganization('Ministry of Health');
            addTrial.clickAddTrialAddOversightAuthorityButton();
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the Register Trial Regulatory Information section will indicate duplicate errors during Trial Review$/, function () {
        return browser.sleep(25).then(function () {
            addTrial.verifyAddTrialDuplicateCountryOrganizationMessage('Gabon Ministry of Health');
            //  browser.sleep(25).then(callback);
        });
    });


};

