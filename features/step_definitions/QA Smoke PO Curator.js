/**
 * Created by singhs10 on 7/14/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var moment = require('moment');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
var loginPage = require('../support/LoginPage');
var menuItemList = require('../support/PoCommonBar');
var databaseConnection = require('../support/databaseConnection');
var assert = require('assert');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var searchPeoplePage = require('../support/ListOfPeoplePage');
var addPeoplePage = require('../support/AddPersonPage');
var searchFamilyPage = require('../support/ListOfFamiliesPage');
var addFamilyPage = require('../support/AddFamilyPage');
var selectValuePage = require('../support/CommonSelectList');
var helperFunctions = require('../support/helper');


module.exports = function () {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var commonFunctions = new abstractionCommonMethods();
    var login = new loginPage();
    var menuItem = new menuItemList();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();
    var addPeople = new addPeoplePage();
    var searchFamily = new searchFamilyPage();
    var addFamily = new addFamilyPage();
    var selectValue = new selectValuePage();
    var helper = new helperFunctions();


    this.Given(/^I am logged in to CTRP PO application with User "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            commonFunctions.onPrepareLoginTest(arg1);
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                menuItem.clickHomeEnterOrganizations();
                login.clickWriteMode('On');
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I want to create an Organization with parameters$/, function (table) {
        return browser.sleep(25).then(function () {
            organizationTable = table.hashes();
            for (var i = 0; i < organizationTable.length; i++) {
                projectFunctions.createOrganization(organizationTable[i].orgName, organizationTable[i].alias, organizationTable[i].address1, organizationTable[i].address2, organizationTable[i].country, organizationTable[i].state, organizationTable[i].city, organizationTable[i].postalCode, organizationTable[i].email, organizationTable[i].phone, organizationTable[i].fax);
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I go to Search Organization page$/, function () {
        return browser.sleep(25).then(function () {
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I should be able to search with the created Organization name$/, function () {
        return browser.sleep(25).then(function () {
            cukeOrganization.then(function (value) {
                console.log('Created Org name is:' + value);
                searchOrg.setOrgName(value);
                expect(element(by.linkText(value)).isPresent()).to.eventually.equal(true, '--> ' + value + ' <-- look ahead Organization link did not appear');
                element(by.linkText(value)).click();
                expect(searchOrg.orgName.getAttribute('value')).to.eventually.equal(value, 'Selected Organization value does not match with provided Organization');
                searchOrg.clickSearchButton();
                expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I click on the Organization from Search page$/, function () {
        return browser.sleep(25).then(function () {
            cukeOrganization.then(function (value) {
                element(by.linkText(value)).click();
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^It should display Organization with above Organization parameters$/, function () {
        return browser.sleep(25).then(function () {
            cukeOrganization.then(function (value) {
                for (var i = 0; i < organizationTable.length; i++) {
                    projectFunctions.verifyCreatedOrganization(value, organizationTable[i].alias, organizationTable[i].address1, organizationTable[i].address2, organizationTable[i].country, organizationTable[i].state, organizationTable[i].city, organizationTable[i].postalCode, organizationTable[i].email, organizationTable[i].phone, organizationTable[i].fax);
                }
            });
            //   browser.sleep(25).then(callback);
        });
    });


    this.Given(/^I want to create a Family with parameters$/, function (table) {
        return browser.sleep(25).then(function () {
            familyTable = table.hashes();
            for (var i = 0; i < familyTable.length; i++) {
                projectFunctions.createFamily(familyTable[i].famName, familyTable[i].famStatus, familyTable[i].famType);
            }
            //  browser.sleep(25).then(callback);
        });
    });


    this.Then(/^I want to associate below Organization with the created Family$/, function (table) {
        return browser.sleep(25).then(function () {
            famOrganizationTable = table.hashes();
            for (var i = 0; i < famOrganizationTable.length; i++) {
                projectFunctions.createOrganization(famOrganizationTable[i].orgName, famOrganizationTable[i].alias, famOrganizationTable[i].address1, famOrganizationTable[i].address2, famOrganizationTable[i].country, famOrganizationTable[i].state, famOrganizationTable[i].city, famOrganizationTable[i].postalCode, famOrganizationTable[i].email, famOrganizationTable[i].phone, famOrganizationTable[i].fax);
            }
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                menuItem.clickOrganizations();
                menuItem.clickListFamily();
                cukeFamily.then(function (value) {
                    searchFamily.setFamilyName(value);
                    searchFamily.clickSearchButton();
                    expect(projectFunctions.inSearchResults(value)).to.become('true');
                    element(by.linkText(value)).click();
                    expect()
                });
                searchOrg.clickOrgSearchModel();
                cukeOrganization.then(function (orgValue) {
                    searchOrg.setOrgName(orgValue);
                    searchOrg.clickSearchButton();
                    searchOrg.selectOrgModelItem();
                    searchOrg.clickOrgModelConfirm();
                });
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I want to set the parameters for Organization\-Family association$/, function (table) {
        return browser.sleep(25).then(function () {
            orgFamRelTable = table.hashes();
            for (var i = 0; i < orgFamRelTable.length; i++) {
                selectValue.selectOrgFamilyRelationship(orgFamRelTable[i].orgFamRelationship);
                addTrial.clickAddTrialDateField(0);
                addTrial.clickAddTrialDateFieldDifferentYear(moment(orgFamRelTable[i].effectiveDate, 'DD-MMM-YYYY').format('YYYY'), moment(orgFamRelTable[i].effectiveDate, 'DD-MMM-YYYY').format('MMMM'), moment(orgFamRelTable[i].effectiveDate, 'DD-MMM-YYYY').format('DD'));
                addTrial.clickAddTrialDateField(1);
                addTrial.clickAddTrialDateFieldDifferentYear(moment(orgFamRelTable[i].expirationDate, 'DD-MMM-YYYY').format('YYYY'), moment(orgFamRelTable[i].expirationDate, 'DD-MMM-YYYY').format('MMMM'), moment(orgFamRelTable[i].expirationDate, 'DD-MMM-YYYY').format('DD'));
            }
            addFamily.clickSave();
            //  browser.sleep(25).then(callback);
        });
    });


    this.When(/^I go to search Family Page$/, function () {
        return browser.sleep(25).then(function () {
            menuItem.clickOrganizations();
            menuItem.clickListFamily();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I should be able to search with the created Family name$/, function () {
        return browser.sleep(25).then(function () {
            cukeFamily.then(function (value) {
                searchFamily.setFamilyName(value);
                searchFamily.clickSearchButton();
                expect(projectFunctions.inSearchResults(value)).to.become('true');
            });
            //   browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I click on the Family from Search page$/, function () {
        return browser.sleep(25).then(function () {
            cukeFamily.then(function (value) {
                element(by.linkText(value)).click();
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^It should display Family and Organization association with above parameters$/, function () {
        return browser.sleep(25).then(function () {
            cukeFamily.then(function (famValue) {
                cukeOrganization.then(function (orgValue) {
                    for (var i = 0; i < familyTable.length; i++) {
                        projectFunctions.verifyCreatedFamily(famValue, familyTable[i].famStatus, familyTable[i].famType, orgValue, orgFamRelTable[i].orgFamRelationship, orgFamRelTable[i].effectiveDate, orgFamRelTable[i].expirationDate);
                    }
                });

            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I want to create a Person with parameters$/, function (table) {
        return browser.sleep(25).then(function () {
            personTable = table.hashes();
            for (var i = 0; i < personTable.length; i++) {
                personPrefix = personTable[i].prefix;
                personFirstName = personTable[i].firstName;
                personMiddleName = personTable[i].middleName;
                personLastName = personTable[i].lastName;
                personSuffix = personTable[i].suffix;
                personEmail = personTable[i].email;
                personPhone = personTable[i].phone;
             //   projectFunctions.createPerson(personTable[i].prefix, personTable[i].firstName, personTable[i].middleName, personTable[i].lastName, personTable[i].suffix, personTable[i].email, personTable[i].phone);
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I want to associate an Organization with the created Person$/, function (table) {
        return browser.sleep(25).then(function () {
            perOrganizationTable = table.hashes();
            for (var i = 0; i < perOrganizationTable.length; i++) {
                projectFunctions.createOrganization(perOrganizationTable[i].orgName, perOrganizationTable[i].alias, perOrganizationTable[i].address1, perOrganizationTable[i].address2, perOrganizationTable[i].country, perOrganizationTable[i].state, perOrganizationTable[i].city, perOrganizationTable[i].postalCode, perOrganizationTable[i].email, perOrganizationTable[i].phone, perOrganizationTable[i].fax);
            }
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                projectFunctions.createPerson(personPrefix, personFirstName, personMiddleName, personLastName, personSuffix, personEmail, personPhone);
              //  menuItem.clickPeople();
              //  menuItem.clickListPeople();
             //   cukePerson.then(function (value) {
              //      searchPeople.setPersonFirstName(value);
               //     searchPeople.clickSearch();
               //     expect(projectFunctions.inSearchResults(value)).to.become('true');
              //      searchOrg.searchResultMenu.click();
                    //*[@id="menuitem-15"]/button
                    //element(by.xpath('//*[@id="menuitem-21"]/button')).click();
                    //element(by.xpath('//*[@id="menuitem-23"]/button')).click();
                    //element(by.xpath('//*[@id="menuitem-25"]/button')).click();
                    //element(by.xpath('//*[@id="menuitem-27"]/button')).click();
                    //element(by.xpath('//*[@id="menuitem-29"]/button')).click();
                    //element(by.xpath('//*[@id="menuitem-31"]/button')).click();
                    //element(by.xpath('//*[@id="menuitem-33"]/button')).click();
                    //searchOrg.searchResultMenu.click();
                    //browser.takeScreenshot().then(function (png) {
                    //    helper.writeScreenShot(png, process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testScreenShot/exceptionA' + moment().format('MMMDoYY hmmss') + '.png');
                    //});
                    //element(by.linkText(value)).isPresent().then(function (stateLink) {
                    //    if (stateLink === true) {
                    //        element(by.linkText(value)).isDisplayed().then(function (state2Link) {
                    //            if (state2Link)
                    //                console.log('element Person link is displayed');
                    //            element(by.linkText('LNsmokeSS')).click();
                    //            //  element(by.linkText(value)).click();
                    //        });
                    //    } else {
                    //        assert.fail(0, 1, 'Person name link did not appear');
                    //    }
                    //});
                    //browser.takeScreenshot().then(function (png) {
                    //    helper.writeScreenShot(png, process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testScreenShot/exceptionB' + moment().format('MMMDoYY hmmss') + '.png');
                    //});
                    //browser.driver.wait(function () {
                    //    console.log('wait here');
                    //    return true;
                    //}, 40).then(function () {
                    //    addPeople.addPersonFirstName.getAttribute('value').then(function (perFNAme) {
                    //        console.log("This is the Person First name in Edit Person Page" + perFNAme);
                    //        expect(perFNAme).to.equal(value, 'Verify the Person name in Edit page.');
                    //    })
                    //});
                    searchOrg.orgModelSearch.isPresent().then(function (state) {
                        if (state === true) {
                            searchOrg.orgModelSearch.isDisplayed().then(function (state2) {
                                if (state2)
                                    searchOrg.clickOrgSearchModel();
                            });
                        } else {
                            assert.fail(0, 1, 'Organization Model on Person page did not appear');
                        }
                    });
                    cukeOrganization.then(function (orgValue) {
                        searchOrg.setOrgName(orgValue);
                        searchOrg.clickSearchButton();
                        searchOrg.selectOrgModelItem();
                        searchOrg.clickOrgModelConfirm();
                    });
              //  });
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I want to set the Person\-Organization affiliations date$/, function (table) {
        return browser.sleep(25).then(function () {
            orgPerDateTable = table.hashes();
            for (var i = 0; i < orgPerDateTable.length; i++) {
                addTrial.clickAddTrialDateField(0);
                addTrial.clickAddTrialDateFieldDifferentYear(moment(orgPerDateTable[i].effectiveDate, 'DD-MMM-YYYY').format('YYYY'), moment(orgPerDateTable[i].effectiveDate, 'DD-MMM-YYYY').format('MMMM'), moment(orgPerDateTable[i].effectiveDate, 'DD-MMM-YYYY').format('DD'));
                addTrial.clickAddTrialDateField(1);
                addTrial.clickAddTrialDateFieldDifferentYear(moment(orgPerDateTable[i].expirationDate, 'DD-MMM-YYYY').format('YYYY'), moment(orgPerDateTable[i].expirationDate, 'DD-MMM-YYYY').format('MMMM'), moment(orgPerDateTable[i].expirationDate, 'DD-MMM-YYYY').format('DD'));
            }
            addPeople.clickSave();
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I go to search Person Page$/, function () {
        return browser.sleep(25).then(function () {
            menuItem.clickPeople();
            menuItem.clickListPeople();
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I should be able to search with the created Person name$/, function () {
        return browser.sleep(25).then(function () {
            cukePerson.then(function (value) {
                searchPeople.setPersonFirstName(value);
                searchPeople.clickSearch();
                expect(projectFunctions.inSearchResults(value)).to.become('true');
            });
            // browser.sleep(25).then(callback);
        });
    });

    this.Then(/^I click on the Person from Search page$/, function () {
        return browser.sleep(25).then(function () {
            cukePerson.then(function (value) {
                //  element(by.linkText(value)).click();
                element(by.linkText('LNsmokeSS')).click();
            });
            //  browser.sleep(25).then(callback);
        });
    });

    this.Then(/^It should display Person and Organization association with above parameters$/, function () {
        return browser.sleep(25).then(function () {
            cukePerson.then(function (perValue) {
                cukeOrganization.then(function (orgValue) {
                    for (var i = 0; i < personTable.length; i++) {
                        projectFunctions.verifyCreatedPerson(personTable[i].prefix, perValue, personTable[i].middleName, personTable[i].lastName, personTable[i].suffix, personTable[i].email, personTable[i].phone, orgValue, orgPerDateTable[i].effectiveDate, orgPerDateTable[i].expirationDate);
                    }
                });
            });
            //  browser.sleep(25).then(callback);
        });
    });


};