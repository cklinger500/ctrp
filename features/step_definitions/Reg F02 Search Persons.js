/**
 * Created by singhs10 on 3/18/16.
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var menuItemList = require('../support/PoCommonBar');
var moment = require('moment');
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var orgPage = require('../support/ListOfOrganizationsPage');
var underscore = require('underscore');
var assert = require('assert');

module.exports = function () {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var menuItem = new menuItemList();
    var searchPerson = new listOfPeoplePage();
    var searchOrg = new orgPage();

    this.Given(/^the following parameters of a Person exist:$/, function (table) {
        return browser.sleep(25).then(function () {
            personTable = table.hashes();
            for (var i = 0; i < personTable.length; i++) {
                if (personTable[i].PersonFirstName === 'shiFNameTrial') {
                    personLastNameValue = personTable[i].PersonLastName;
                    personEmailValue = personTable[i].email;
                    personPhoneValue = personTable[i].phone;
                    projectFunctions.createPersonForSearchWithParameters('ctrptrialsubmitter', 'trPfx', personTable[i].PersonFirstName, 'trMdl', personTable[i].PersonLastName, 'trSfx', personTable[i].email, personTable[i].phone, personTable[i].Affiliation, 'trAlias', 'trAdd1', 'trAdd2', 'Latvia', 'Jelgava', 'trCity', '20089', 'trOrg@email.com', '434-345-4543', '556-679-9230');
                } else if (personTable[i].PersonFirstName === 'shiFNameTrRegF02 vw') {
                    personLastNameValue = personTable[i].PersonLastName;
                    personEmailValue = personTable[i].email;
                    personPhoneValue = personTable[i].phone;
                    projectFunctions.createPersonForSearchWithParameters('ctrptrialsubmitter', personTable[i].Prefix, personTable[i].PersonFirstName, personTable[i].PersonMiddleName, personTable[i].PersonLastName, personTable[i].Suffix, personTable[i].email, personTable[i].phone, personTable[i].OrgAffiliation, 'trAlias', 'trAdd1', 'trAdd2', 'Latvia', 'Jelgava', 'trCity', '20089', 'trOrg@email.com', '434-345-4543', '556-679-9230');
                } else {
                    assert.fail(0, 1, 'No Match found to create a Person');
                }
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have selected the option "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            if (arg1 === 'Search Persons') {
                menuItem.clickPeople();
                menuItem.clickListPeople();
                searchPerson.clickClear();
            }
            else if (arg1 === 'Search Organizations') {
                projectFunctions.searchOrganizationLink();
                searchPerson.clickClear();
            }
            else {
                assert.fail(0, 1, ' ***** No Match found ***** ');
                // callback(new Error(" ***** No Match found ***** "));
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.When(/^I provide the Source ID (.*) of the Person$/, function (sourceID) {
        return browser.sleep(25).then(function () {
            if (sourceID === '23880989') {
                perSourceId.then(function (value) {
                    console.log('Person Source ID is:' + value);
                    searchPerson.setPersonSourceId(value);
                });
                // browser.sleep(25).then(callback);
            }
            else if (sourceID === '23880') {
                perSourceId.then(function (value) {
                    console.log('Person Source ID is:' + value);
                    searchPerson.setPersonSourceId(value.slice(0, 5));
                });
                //browser.sleep(25).then(callback);
            }
            else if (sourceID === '23880*') {
                perSourceId.then(function (value) {
                    console.log('Person Source ID is:' + value);
                    searchPerson.setPersonSourceId(value.slice(0, 5) + '*');
                });
                //browser.sleep(25).then(callback);
            }
            else if (sourceID === '238809') {
                perSourceId.then(function (value) {
                    console.log('Person Source ID is:' + value);
                    searchPerson.setPersonSourceId(value.slice(0, 6));
                });
                //browser.sleep(25).then(callback);
            }
            else if (sourceID === '') {
                searchPerson.setPersonSourceId(sourceID);
                //  browser.sleep(25).then(callback);
            }
            else {
                assert.fail(0, 1, ' ***** No Source ID found ***** ');
                //  callback(new Error(" ***** No Source ID found ***** "));
            }
        });
    });

    this.When(/^I provide the First Name (.*) of the Person$/, function (firstName) {
        return browser.sleep(25).then(function () {
            if (firstName === 'shiFNameTrial') {
                per4.then(function (value) {
                    searchPerson.setPersonFirstName(value);
                });
            }
            else if (firstName !== '') {
                searchPerson.setPersonFirstName(firstName);
            }
        });
        // browser.sleep(25).then(callback);
    });

    this.When(/^I provide the Last Name (.*) of the Person$/, function (lastName) {
        return browser.sleep(25).then(function () {
            if (lastName !== '') {
                searchPerson.setPersonLastName(lastName);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I provide the Email (.*) of the Person$/, function (email) {
        return browser.sleep(25).then(function () {
            if (email !== '') {
                searchPerson.setPersonEmail(email);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I provide the Phone (.*) of the Person$/, function (phone) {
        return browser.sleep(25).then(function () {
            if (phone !== '') {
                searchPerson.setPersonPhone(phone);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I provide the Organization Affiliation (.*) of the Person$/, function (organizationAffiliation) {
        return browser.sleep(25).then(function () {
            if (organizationAffiliation === 'shiPerOrgAffTrial') {
                cukeOrganization.then(function (value) {
                    searchPerson.setPersonOrgAffiliation(value);
                });
            }
            else if (organizationAffiliation !== '') {
                searchPerson.setPersonOrgAffiliation(organizationAffiliation);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.When(/^I provide the Exact Match condition (.*)$/, function (exactMatch) {
        return browser.sleep(25).then(function () {
            if (exactMatch === 'checked') {
                searchOrg.clickExactSearch('true');
                //  browser.sleep(25).then(callback);
            }
            else if (exactMatch === 'unchecked') {
                searchOrg.clickExactSearch('false');
                //browser.sleep(25).then(callback);
            }
            else {
                assert.fail(0, 1, ' ***** No match found ***** ');
                //callback(new Error(" ***** No match found ***** "));
            }
        });
    });

    this.Then(/^the system should display Active Person records in the CTRP context matching the search criteria$/, function (callback) {
        callback();
    });

    this.Given(/^the Person Search Results (.*) will display the following sorted by Person Last Name:$/, function (result, table) {
        return browser.sleep(25).then(function () {
            element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
                if (state === true) {
                    searchOrg.searchResultHeader.getText().then(function (value) {
                        console.log('value of Person Search Result');
                        console.log(value);
                        searchOrg.searchResultMenu.click();
                        element(by.xpath('//*[@id="menuitem-4"]/button')).click();
                        element(by.xpath('//*[@id="menuitem-6"]/button')).click();
                        element(by.xpath('//*[@id="menuitem-8"]/button')).click();
                        element(by.xpath('//*[@id="menuitem-10"]/button')).click();
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 2).then(function () {
                            searchOrg.searchResultHeader.getText().then(function (value2) {
                                var list1 = value.toString().replace(/\n/g, " ");
                                var listArr = list1.split(",");
                                for (var i = 0; i < listArr.length; i++)
                                    listArr[i] = listArr[i].trim();
                                var list2 = value2.toString().replace(/\n/g, " ");
                                var listArr2 = list2.split(",");
                                for (var j = 0; j < listArr2.length; j++)
                                    listArr2[j] = listArr2[j].trim();
                                searchResultCombine = underscore.union(listArr, listArr2);
                                console.log('value of Person Search Result Combine');
                                console.log(searchResultCombine);
                                personSearchResultColumn = table.raw();
                                console.log('value of Person Search Result from Table');
                                console.log(personSearchResultColumn.toString().split(","));
                                expect(searchResultCombine).to.eql(personSearchResultColumn.toString().split(","));
                                element(by.xpath('//*[@id="menuitem-5"]/button')).click();
                                element(by.xpath('//*[@id="menuitem-7"]/button')).click();
                                element(by.xpath('//*[@id="menuitem-9"]/button')).click();
                                element(by.xpath('//*[@id="menuitem-11"]/button')).click();
                            });
                        });
                    });
                }
            });
            searchPerson.personFirstName.getAttribute('value').then(function (personFirstName) {
                console.log('personFirstName here is:' + personFirstName);
                searchPerson.personLastName.getAttribute('value').then(function (personLastName) {
                    console.log('personLastName here is:' + personLastName);
                    searchPerson.personOrgAffiliation.getAttribute('value').then(function (personOrgAffiliation) {
                        console.log('personOrgAffiliation here is:' + personOrgAffiliation);
                        searchPerson.personSourceId.getAttribute('value').then(function (personSourceId) {
                            console.log('personSourceId here is:' + personSourceId);
                            searchPerson.personEmail.getAttribute('value').then(function (personEmail) {
                                console.log('personEmail here is:' + personEmail);
                                searchPerson.personPhone.getAttribute('value').then(function (personPhone) {
                                    console.log('personPhone here is:' + personPhone);
                                    if (personFirstName === '' && personLastName === '' && personOrgAffiliation === '' && personSourceId === '' && personEmail === '' && personPhone === '') {
                                        expect(menuItem.searchEmptyCriteria.getText()).to.eventually.equal(result);
                                    }
                                    if (personFirstName !== '') {
                                        per4.then(function (value) {
                                            expect(projectFunctions.inSearchResults(value)).to.become(result);
                                        });
                                    }
                                    if (personLastName !== '') {
                                        expect(projectFunctions.inSearchResults(personLastNameValue)).to.become(result);
                                    }
                                    if (personOrgAffiliation !== '') {
                                        cukeOrganization.then(function (value) {
                                            expect(projectFunctions.inSearchResults(value)).to.become(result);
                                        });
                                    }
                                    if (personSourceId !== '') {
                                        perSourceId.then(function (value) {
                                            expect(projectFunctions.inSearchResults(value)).to.become(result);
                                        });
                                    }
                                    if (personEmail !== '') {
                                        expect(projectFunctions.inSearchResults(personEmailValue)).to.become(result);
                                    }
                                    if (personPhone !== '') {
                                        expect(projectFunctions.inSearchResults(personPhoneValue)).to.become(result);
                                    }
                                });
                            });
                        });
                    });
                });
            });
            //  browser.sleep(25).then(callback);
        });
    });


    this.Given(/^the Exact Search is checked by default$/, function () {
        return browser.sleep(25).then(function () {
            //menuItem.clickPeople();
            //menuItem.clickListPeople();
            searchOrg.exactSearch.isSelected().should.eventually.equal(true);
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I can uncheck the Exact Search$/, function () {
        return browser.sleep(25).then(function () {
            searchOrg.clickExactSearch('false');
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^the source context will be "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            menuItem.search_Page.getText().then(function (value) {
                console.log('value of Search Page' + value);
                if (value === 'Search Organizations * for wild card (e.g. university* for any university)') {
                    searchOrg.trialOrgSearchSrcContext.getText().should.eventually.equal(arg1);
                    //             browser.sleep(25).then(callback);
                }
                else if (value === 'Search Persons * for wild card (e.g. John*)') {
                    searchPerson.trialPersonSearchSrcContext.getText().should.eventually.equal(arg1);
                    //           browser.sleep(25).then(callback);
                }
                else {
                    assert.fail(0, 1, ' ***** No match for the Title ***** ');
                    //         callback(new Error(" ***** No match found for the Title ***** "));
                }
            });
        });
    });

    this.Given(/^the source status will be "([^"]*)"$/, function (arg1) {
        return browser.sleep(25).then(function () {
            menuItem.search_Page.getText().then(function (value) {
                console.log('value of Search Page' + value);
                if (value === 'Search Organizations * for wild card (e.g. university* for any university)') {
                    searchOrg.trialOrgSearchSrcStatus.getText().should.eventually.equal(arg1);
                    //           browser.sleep(25).then(callback);
                }
                else if (value === 'Search Persons * for wild card (e.g. John*)') {
                    searchPerson.trialPersonSearchSrcStatus.getText().should.eventually.equal(arg1);
                    //             browser.sleep(25).then(callback);
                }
                else {
                    assert.fail(0, 1, ' ***** No match found for the Titl ***** ');
                    // callback(new Error(" ***** No match found for the Title ***** "));
                }
            });
        });
    });


};



