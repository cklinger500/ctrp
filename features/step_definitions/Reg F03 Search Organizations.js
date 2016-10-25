/**
 * Created by singhs10 on 3/24/16.
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
var mainSelectItemPage = require('../support/CommonSelectList.js');
var assert = require('assert');

module.exports = function () {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var menuItem = new menuItemList();
    var searchPerson = new listOfPeoplePage();
    var searchOrg = new orgPage();
    var selectItem = new mainSelectItemPage();

    this.Given(/^the following parameters of an Organization exist:$/, function (table) {
        return browser.sleep(25).then(function () {
            organizationTable = table.hashes();
            for (var i = 0; i < organizationTable.length; i++) {
                if (organizationTable[i].Name === 'SopNameCancer') {
                    organizationAliasValue = organizationTable[i].Alias;
                    organizationCityValue = organizationTable[i].City;
                    organizationCountryValue = organizationTable[i].Country;
                    organizationPostalValue = organizationTable[i].PostalCode;
                    organizationPhoneValue = organizationTable[i].Phone;
                    organizationEmailValue = organizationTable[i].Email;
                    organizationStateValue = organizationTable[i].State;
                    projectFunctions.createOrgForSearchWithParameters('ctrptrialsubmitter', organizationTable[i].Name, organizationTable[i].Alias, 'tr Org Add1', 'tr Org Add2', organizationTable[i].Country, organizationTable[i].State, organizationTable[i].City, organizationTable[i].PostalCode, organizationTable[i].Email, organizationTable[i].Phone, '456-786-0981', organizationTable[i].FamilyName, 'Active', 'NIH', 'Organizational', '05', 'May', '2015', '15', 'April', '2018');
                }
                else if (organizationTable[i].Name === 'SopNameCancer RegF03vw') {
                    projectFunctions.createOrgForSearchWithParameters('ctrptrialsubmitter', organizationTable[i].Name, organizationTable[i].NameAlias, organizationTable[i].Address1, organizationTable[i].Address2, organizationTable[i].Country, organizationTable[i].State, organizationTable[i].City, organizationTable[i].PostalCode, organizationTable[i].Email, organizationTable[i].Phone, organizationTable[i].Fax, organizationTable[i].Families, 'Active', 'NIH', 'Organizational', '05', 'May', '2015', '15', 'April', '2018');
                }
                else {
                    assert.fail(0, 1, 'No Match found to create a Person');
                }
            }
            //  browser.sleep(25).then(callback);
        });
    });

    this.When(/^I provide the name (.*) of the organization$/, function (Name) {
        return browser.sleep(25).then(function () {
            if (Name === 'SopNameCancer') {
                orgSearch.then(function (value) {
                    searchOrg.setOrgName(value);
                });
            }
            else if (Name !== '') {
                searchOrg.setOrgName(Name);
            }
            // browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have checked the condition for Search Alias (.*) of the organization$/, function (Alias) {
        return browser.sleep(25).then(function () {
            if (Alias === 'Checked') {
                searchOrg.checkAlias(false);
                //browser.sleep(25).then(callback);
            }
            else if (Alias === 'Unchecked') {
                searchOrg.checkAlias(true);
                //browser.sleep(25).then(callback);
            }
            else {
                assert.fail(0, 1, ' ***** No match found ***** ');
                // callback(new Error(" ***** No match found ***** "));
            }
        });
    });

    this.Given(/^I provide the Family Name (.*) of the organization$/, function (FamilyName) {
        return browser.sleep(25).then(function () {
            if (FamilyName === 'SopFName') {
                cukeFamily.then(function (value) {
                    searchOrg.setFamilyName(value);
                });
            }
            else if (FamilyName !== '') {
                searchOrg.setFamilyName(FamilyName);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I provide the Source ID (.*) of the organization$/, function (SourceID) {
        return browser.sleep(25).then(function () {
            if (SourceID === '23654') {
                orgSourceId.then(function (value) {
                    console.log('Org Source ID is:' + value);
                    searchOrg.setSourceId(value);
                });
                //  browser.sleep(25).then(callback);
            }
            else if (SourceID === '236') {
                orgSourceId.then(function (value) {
                    console.log('Org Source ID is:' + value);
                    searchOrg.setSourceId(value.slice(0, 5));
                });
                // browser.sleep(25).then(callback);
            }
            else if (SourceID === '236*') {
                orgSourceId.then(function (value) {
                    console.log('Org Source ID is:' + value);
                    searchOrg.setSourceId(value.slice(0, 5) + '*');
                });
                // browser.sleep(25).then(callback);
            }
            else if (SourceID === '2365') {
                orgSourceId.then(function (value) {
                    console.log('Org Source ID is:' + value);
                    searchOrg.setSourceId(value.slice(0, 6));
                });
                // browser.sleep(25).then(callback);
            }
            else if (SourceID === '') {
                searchOrg.setSourceId(SourceID);
                // browser.sleep(25).then(callback);
            }
            else {
                assert.fail(0, 1, ' ***** No Source ID found ***** ');
                // callback(new Error(" ***** No Source ID found ***** "));
            }
        });
    });

    this.Given(/^I provide the City (.*) of the organization$/, function (City) {
        return browser.sleep(25).then(function () {
            if (City !== '') {
                searchOrg.setCity(City);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I provide the State (.*) of the organization$/, function (State) {
        return browser.sleep(25).then(function () {
            if (State !== '') {
                selectItem.selectStateSearchOrg(State);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I provide the Country (.*) of the organization where the default is "([^"]*)"$/, function (Country, arg1) {
        return browser.sleep(25).then(function () {
            searchOrg.country.$('option:checked').getText().should.eventually.equal(arg1);
            if (Country !== '') {
                selectItem.selectCountrySearchOrg(Country);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I provide the Postal Code (.*) of the organization$/, function (PostalCode) {
        return browser.sleep(25).then(function () {
            if (PostalCode !== '') {
                searchOrg.setPostalCode(PostalCode);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I provide the Phone (.*) of the organization$/, function (phone) {
        return browser.sleep(25).then(function () {
            if (phone !== '') {
                searchOrg.setPhone(phone);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I provide the Email (.*) of the organization$/, function (email) {
        return browser.sleep(25).then(function () {
            if (email !== '') {
                searchOrg.setEmail(email);
            }
            //browser.sleep(25).then(callback);
        });
    });

    this.Given(/^I have checked the exact macth (.*) of the organization$/, function (ExactMatch) {
        return browser.sleep(25).then(function () {
            if (ExactMatch === 'Checked') {
                searchOrg.clickExactSearch('true');
                // browser.sleep(25).then(callback);
            }
            else if (ExactMatch === 'Unchecked') {
                searchOrg.clickExactSearch('false');
                //browser.sleep(25).then(callback);
            }
            else {
                assert.fail(0, 1, ' ***** No match for Exact Match found ***** ');
                // callback(new Error(" ***** No match for Exact Match found ***** "));
            }
        });
    });

    this.Then(/^the system should display the organization with that PO Organization ID$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    this.Given(/^the (.*) will display Organizations with an Active status in the CTRP Context sorted by Organization Name:$/, function (OrganizationSearchResults, table) {
        return browser.sleep(25).then(function () {
            element(by.css('div.ui-grid-cell-contents')).isPresent().then(function (state) {
                if (state === true) {
                    searchOrg.searchResultHeader.getText().then(function (value) {
                        console.log('value of Org Search Result');
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
                                console.log('value of Org Search Result Combine');
                                console.log(searchResultCombine);
                                orgSearchResultColumn = table.raw();
                                console.log('value of Org Search Result from Table');
                                console.log(orgSearchResultColumn.toString().split(","));
                                //   expect(searchResultCombine).to.eql(orgSearchResultColumn.toString().split(","));
                                element(by.xpath('//*[@id="menuitem-5"]/button')).click();
                                element(by.xpath('//*[@id="menuitem-7"]/button')).click();
                                element(by.xpath('//*[@id="menuitem-9"]/button')).click();
                                element(by.xpath('//*[@id="menuitem-11"]/button')).click();
                                searchOrg.searchResultMenu.click();
                            });
                        });
                    });
                }
            });
            searchOrg.orgName.getAttribute('value').then(function (orgName) {
                console.log('orgName here is:' + orgName);
                searchOrg.sourceId.getAttribute('value').then(function (sourceId) {
                    console.log('sourceId here is:' + sourceId);
                    searchOrg.familyName.getAttribute('value').then(function (familyName) {
                        console.log('familyName here is:' + familyName);
                        searchOrg.city.getAttribute('value').then(function (city) {
                            console.log('city here is:' + city);
                            searchOrg.postalCode.getAttribute('value').then(function (postalCode) {
                                console.log('postalCode here is:' + postalCode);
                                searchOrg.email.getAttribute('value').then(function (email) {
                                    console.log('email here is:' + email);
                                    searchOrg.country.$('option:checked').getText().then(function (country) {
                                        console.log('country here is:' + country);
                                        searchOrg.state.$('option:checked').getText().then(function (state) {
                                            console.log('state here is:' + state);
                                            searchOrg.phone.getAttribute('value').then(function (phone) {
                                                console.log('phone here is:' + phone);
                                                if (orgName === '' && sourceId === '' && familyName === '' && city === '' && postalCode === '' && email === '' && phone === '' && country === 'All Countries' && state === 'All States/Provinces') {
                                                    expect(menuItem.searchEmptyCriteria.getText()).to.eventually.equal(OrganizationSearchResults);
                                                }
                                                if (orgName !== '') {
                                                    orgSearch.then(function (value) {
                                                        expect(projectFunctions.inOrgSearchResults(value)).to.become(OrganizationSearchResults);
                                                    });
                                                }
                                                if (city !== '') {
                                                    expect(projectFunctions.inOrgSearchResults(organizationCityValue)).to.become(OrganizationSearchResults);
                                                }
                                                if (familyName !== '') {
                                                    cukeFamily.then(function (value) {
                                                        expect(projectFunctions.inOrgSearchResults(value)).to.become(OrganizationSearchResults);
                                                    });
                                                }
                                                if (sourceId !== '') {
                                                    orgSourceId.then(function (value) {
                                                        expect(projectFunctions.inOrgSearchResults(value)).to.become(OrganizationSearchResults);
                                                    });
                                                }
                                                if (email !== '') {
                                                    expect(projectFunctions.inOrgSearchResults(organizationEmailValue)).to.become(OrganizationSearchResults);
                                                }
                                                if (phone !== '') {
                                                    expect(projectFunctions.inOrgSearchResults(organizationPhoneValue)).to.become(OrganizationSearchResults);
                                                }
                                                if (postalCode !== '') {
                                                    expect(projectFunctions.inOrgSearchResults(organizationPostalValue)).to.become(OrganizationSearchResults);
                                                }
                                                if (country !== 'All Countries') {
                                                    expect(projectFunctions.inOrgSearchResults(organizationCountryValue)).to.become(OrganizationSearchResults);
                                                }
                                                if (state !== 'All States/Provinces') {
                                                    expect(projectFunctions.inOrgSearchResults(organizationStateValue)).to.become(OrganizationSearchResults);
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
            //   browser.sleep(25).then(callback);
        });
    });


};




