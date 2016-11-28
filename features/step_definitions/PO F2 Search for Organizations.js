/**
 * Created by singhs10 on 7/16/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var loginPage = require('../support/LoginPage');
var listOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var menuItemList = require('../support/PoCommonBar');
var addOrganizationPage = require('../support/AddOrganizationPage');
var mainSelectItemPage = require('../support/CommonSelectList.js');
var projectFunctionsPage= require('../support/projectMethods');
var moment = require ('moment');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
//var Q = require('q');


module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var searchOrg = new listOfOrganizationPage();
    var addOrg = new addOrganizationPage();
    var selectItem =new mainSelectItemPage();
    var projectFunctions = new projectFunctionsPage();
    var commonFunctions = new abstractionCommonMethods();
    var CTEPID = 'ACRN';

    this.Given(/^I know the name of the organization I wish to search for$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
      //  login.login('ctrpcurator', 'Welcome01');
     //   login.accept();
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            projectFunctions.createOrganization('shiOrg1', 'alias', 'add1', 'add2', 'United States', 'Florida', 'avenue', '24567', 's@s.com', '222-4444-555', '444-6666-555');
            storeOrg1 = cukeOrganization.then(function(value) {
                console.log('This is the first org that is added' + value);
                return value;
            });
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            menuItem.clickOrganizations();
            menuItem.clickAddOrganizations();
            projectFunctions.createOrganization('singhOrg2', 'alias2', 'add1', 'add2', 'United States', 'Florida', 'avenue', '24567', 's@s.com', '222-4444-555', '444-6666-555');
            browser.driver.wait(function() {
                console.log('wait here');
                return true;
            }, 4000).then(function() {
                cukeOrganization.then(function(value) {
                    console.log('This is the second Org:' + value);
                    menuItem.clickOrganizations();
                    menuItem.clickListOrganizations();
                    searchOrg.setOrgName(value);
                    searchOrg.clickSearchButton();
                    expect(projectFunctions.inSearchResults(value)).to.become('true');
                    element(by.linkText(value)).click();
                    storeOrg1.then(function(value) {
                        console.log('This is the first1 org that will be added in Alias' + value);
                        addOrg.setAddAlias(value);
                        addOrg.clickSaveAlias();
                        addOrg.clickSave();
                    });
                });
            });
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am logged in to CTRP$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
      //  login.login('ctrpadmin', 'Welcome01');
        //login.accept();
        //menuItem.clickHomeEnterOrganizations();
        //login.clickWriteMode('On');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the option to search for an organization$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial name of the organization I wish to search for$/, function (callback) {
        storeOrg1.then(function (value) {
            console.log('This is the first Org for search:' + value);
            searchOrg.setOrgName(value);
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I indicate to include aliases$/, function (callback) {
        searchOrg.checkAlias(false);
        browser.sleep(25).then(callback);
    });

    this.When(/^I submit my search request$/, function (callback) {
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the name or the alias$/, function (callback) {
        storeOrg1.then(function (value) {
            console.log('This is the first Org:' + value);
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
        });
        cukeOrganization.then(function (value) {
            console.log('This is the second Org which contains the alias:' + value);
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I indicate to not search Aliases$/, function (callback) {
        searchOrg.checkAlias(true);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the name$/, function (callback) {
        storeOrg1.then(function (value) {
            console.log('This is the first Org:' + value);
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
        });
        cukeOrganization.then(function (value) {
            console.log('This is the second Org that has the first Org Alias:' + value);
            expect(projectFunctions.inOrgSearchResults(value)).to.become('false');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the Source Context and Source ID of the organization I wish to search for$/, function (callback) {
       callback();
    });

    this.When(/^I provide the Source Context and Source ID of the organization I wish to search for$/, function (callback) {
        selectItem.selectSourceContext('CTEP');
        searchOrg.setSourceId(CTEPID);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the CTEP ID$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults(CTEPID)).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the PO Organization ID of the organization I wish to search for$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the PO Organization ID of the organization I wish to search for$/, function (callback) {
        orgSourceId.then(function(value) {
           console.log('This is the CTRP ID of added Org' + value);
            searchOrg.setSourceId(value);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the Source ID for the Source Context$/, function (callback) {
        orgSourceId.then(function(value) {
            console.log('This is the CTRP ID of added Org' + value);
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the Family name to which the organization I wish to search for belongs to$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial Family name of the organization I wish to search for$/, function (callback) {
        cukeFamily.then(function(value) {
            console.log('This is the family created for Org-Family search:' + value);
            searchOrg.setFamilyName(value);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that are members of the Family Name$/, function (callback) {
        cukeFamily.then(function(value) {
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the city I wish to search for$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial city of the organization I wish to search for$/, function (callback) {
        searchOrg.setCity('searchCity');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the city$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('searchCity')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the state I wish to search for$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the state from a list of states displayed by CTRP$/, function (callback) {
        selectItem.selectCountrySearchOrg('Benin');
        selectItem.selectStateSearchOrg('Donga');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the state$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('Donga')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the country I wish to search for$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the country from a list of countries displayed by CTRP$/, function (callback) {
        selectItem.selectCountrySearchOrg('Benin');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the country$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('Benin')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the zip code I wish to search for$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial zip code of the organization I wish to search for$/, function (callback) {
        searchOrg.setPostalCode('46578');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the zip code$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('46578')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the organization phone number I wish to search for$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial phone number of the organization I wish to search for$/, function (callback) {
        searchOrg.setPhone('222-487-8956');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations with matching phone numbers$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('222-487-8956')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know multiple parameters of the organization I wish to search for$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the search organizations screen$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the parameters of the organization I wish to search for$/, function (callback) {
        orgSearch.then(function(value){
            searchOrg.setOrgName(value);
            selectItem.selectCountrySearchOrg('Benin');
            selectItem.selectStateSearchOrg('Donga');
            searchOrg.setCity('searchCity');
            searchOrg.setPostalCode('46578');
            searchOrg.setEmail('searchOrg@email.com');
            searchOrg.setPhone('222-487-8956');
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain all of the entered parameters$/, function (callback) {
        orgSearch.then(function(value){
          //  Q.all([
                expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            expect(projectFunctions.inOrgSearchResults('Benin')).to.become('true');
            expect(projectFunctions.inOrgSearchResults('Donga')).to.become('true');
            expect(projectFunctions.inOrgSearchResults('searchCity')).to.become('true');
            expect(projectFunctions.inOrgSearchResults('46578')).to.become('true');
            expect(projectFunctions.inOrgSearchResults('searchOrg@email.com')).to.become('true');
            expect(projectFunctions.inOrgSearchResults('222-487-8956')).to.become('true');
           // ]).should.notify(callback);
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the date of the curator date I wish to search for$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am logged in to CTRP PO application$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
     //   login.login('ctrpcurator', 'Welcome01');
    //    login.accept();
        menuItem.clickHomeEnterOrganizations();
        login.clickWriteMode('On');
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the curator date of the organization I wish to search for$/, function (callback) {
        curatorDate = moment().format('DD-MMM-YYYY');
        searchOrg.setOrgLastUpdatedStartDate(curatorDate);
        searchOrg.setOrgLastUpdatedEndDate(curatorDate);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the curator date$/, function (callback) {
            expect(projectFunctions.inOrgSearchResults('Active')).to.become('true').and.notify(callback);
    });

    this.Given(/^I know the name of the curator user name I wish to search for$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the curator user name of the organization I wish to search for$/, function (callback) {
        searchOrg.setOrgLastUpdatedName('ctrpcurator');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the curator user name$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('ctrpcurator')).to.become('true').and.notify(callback);
    });


    this.Given(/^I know the status of the organization I wish to search for$/, function (callback) {
        callback();
    });

    this.Given(/^I am on a search organizations screen$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the status of the organization I wish to search for$/, function (table, callback) {
        selectItem.selectSourceStatus('Pending');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that have a matching organization status$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('Pending')).to.become('true');
    browser.sleep(25).then(callback);
    });

    this.Given(/^I know the parameters of organization I wish to search for$/, function (callback) {
        callback();
    });

    this.When(/^I provide the partial name with wild card '\*' of the (.*) I wish to search for$/, function (OrganizationName, callback) {
        if(OrganizationName !== '') {
            searchOrg.setOrgName(OrganizationName);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I indicate to include or not include a (.*)$/, function (SearchAliases, callback) {
        if(SearchAliases === 'No'){
            searchOrg.checkAlias(true);
        }
        if(SearchAliases === 'Yes'){
            searchOrg.checkAlias(false);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Source Context (.*)$/, function (SourceContext, callback) {
        selectItem.selectSourceContext(SourceContext);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Source ID (.*)$/, function (SourceID, callback) {
        if (SourceID !== '') {
            searchOrg.setSourceId(SourceID);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Source Status (.*)$/, function (SourceStatus, callback) {
        selectItem.selectSourceStatus(SourceStatus);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Family Name (.*)$/, function (FamilyName, callback) {
        if(FamilyName !== '') {
            searchOrg.setFamilyName(FamilyName);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the City (.*)$/, function (City, callback) {
        if(City !== ''){
            searchOrg.setCity(City);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I select the State (.*) from a list of state names$/, function (State, callback) {
        selectItem.selectStateSearchOrg(State);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Country (.*) where the default will be "All Countries"$/, function (Country, callback) {
        selectItem.selectCountrySearchOrg(Country);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Phone Number (.*)$/, function (PhoneNumber, callback) {
        if(PhoneNumber !== '') {
            searchOrg.setPhone(PhoneNumber);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Email (.*)$/, function (Email, callback) {
        if (Email !== '') {
            searchOrg.setEmail(Email);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Curator Name (.*)$/, function (CuratorName, callback) {
        if(CuratorName !== ''){
            searchOrg.setOrgLastUpdatedName(CuratorName);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I enter the Curator Date (.*)$/, function (CuratorDate, callback) {
        if (CuratorDate !== ''){
            searchOrg.setOrgLastUpdatedStartDate(CuratorDate);
            searchOrg.setOrgLastUpdatedEndDate(CuratorDate);
        }
        browser.sleep(25).then(callback);
    });


    this.Then(/^the system should display (.*) with organizations that match the search criteria Organization Name (.*), Search Aliases (.*), Source Context (.*), Source ID (.*), Source Status (.*), Family Name (.*), City (.*), Country (.*), State (.*), Phone Number (.*), Email (.*), Curator Name (.*), Curator Date (.*)$/, function (Result, OrganizationName, SearchAliases, SourceContext, SourceID, SourceStatus, FamilyName, City, Country, State, PhoneNumber, Email, CuratorName, CuratorDate, callback) {
        //searchOrg.orgName.getAttribute('value').then(function(orgName){
        //    console.log('orgName here is:' + orgName);
        //    searchOrg.sourceContext.$('option:checked').getText().then(function(sourceContext){
        //        console.log('sourceContext here is:' + sourceContext);
        //        searchOrg.sourceStatus.$('option:checked').getText().then(function(sourceStatus){
        //            console.log('sourceStatus here is:' + sourceStatus);
        //            searchOrg.sourceId.getAttribute('value').then(function(sourceId){
        //                console.log('sourceId here is:' + sourceId);
        //                searchOrg.familyName.getAttribute('value').then(function(familyName){
        //                    console.log('familyName here is:' + familyName);
        //                    searchOrg.city.getAttribute('value').then(function(city){
        //                        console.log('city here is:' + city);
        //                        searchOrg.orgUpdatedByName.getAttribute('value').then(function(orgUpdatedByName){
        //                            console.log('orgUpdatedByName here is:' + orgUpdatedByName);
        //                            searchOrg.postalCode.getAttribute('value').then(function(postalCode){
        //                                console.log('postalCode here is:' + postalCode);
        //                                searchOrg.country.$('option:checked').getText().then(function(country){
        //                                    console.log('country here is:' + country);
        //                                    searchOrg.phone.getAttribute('value').then(function(phone){
        //                                        console.log('phone here is:' + phone);
        //                                        searchOrg.email.getAttribute('value').then(function(email){
        //                                            console.log('email here is:' + email);
        //                                            searchOrg.state.$('option:checked').getText().then(function(state) {
        //                                                console.log('state here is:' + state);
        //                                                searchOrg.orgUpdatedStartDate.getAttribute('value').then(function(state) {
        //                                                    console.log('state here is:' + state);
        //                                                    searchOrg.orgUpdatedEndDate.getAttribute('value').then(function (state) {
        //                                                        console.log('state here is:' + state);
        //                                                        searchOrg.orgUpdatedByName.getAttribute('value').then(function (state) {
        //                                                            console.log('state here is:' + state);
        //                                                            if (orgName === '' && sourceContext === 'All Contexts' && sourceStatus === 'Select a Status' && sourceId === '' && familyName === '' && city === '' && postalCode === '' && country === 'All Countries' && phone === '' && email === '' && state === 'All States/Provinces') {
        //                                                                menuItem.verifyEmptySearchCriteria(callback);
        //                                                            } else {
        //                                                                console.log('in the else statement');
                                                                        expect(projectFunctions.inOrgSearchResults('Active')).to.become(Result).and.notify(callback);
        //                                                                //expect(projectFunctions.inOrgSearchResults('Wake Forest University at Clemmons')).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(SourceContext)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(SourceID)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(SourceStatus)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(FamilyName)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(City)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(Country)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(State)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(PhoneNumber)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(Email)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(CuratorName)).to.become(Result);
        //                                                                //expect(projectFunctions.inOrgSearchResults(CuratorDate)).to.become(Result).and.notify(callback);
        //                                                            }
        //                                                        });
        //                                                    });
        //                                                });
        //                                            });
        //                                        });
        //                                    });
        //                                });
        //                            });
        //                        });
        //                    });
        //                });
        //            });
        //        });
        //    });
        //});
    });

    this.Given(/^the following fields should be displayed:$/, function (table, callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^the result should be sorted by Organization Name$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^I searched without providing any search parameters$/, function (callback) {
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I should get message as "([^"]*)"$/, function (arg1, callback) {
        menuItem.verifyEmptySearchCriteria(arg1, callback);
    });

    this.Then(/^I searched without any search parameters and Search Alias box unchecked$/, function (callback) {
        searchOrg.checkAlias(true);
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });


    this.Given(/^I want to see the detail information of organization when linked with Family$/, function (callback) {
        projectFunctions.createOrgforSearch();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select an organization name in the search results$/, function (callback) {
        orgSearch.then(function(value) {
            console.log('This is the Org:' + value);
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();});
        browser.sleep(25).then(callback);
    });

    this.Then(/^the complete family organization information will be displayed including:$/, function (table, callback) {
        expect(addOrg.verifyAddOrgLabels('CTRP ID:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Name:')).to.become('true');
           expect(addOrg.verifyAddOrgLabels('Name Alias:')).to.become('true');
             expect(addOrg.verifyAddOrgLabels('Source Context:')).to.become('true');
           expect(addOrg.verifyAddOrgLabels('Source ID:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Source Status:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Address 1:')).to.become('true');
             expect(addOrg.verifyAddOrgLabels('Address 2:')).to.become('true');
             expect(addOrg.verifyAddOrgLabels('City:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('State:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Country:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Families:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Email:')).to.become('true');
            expect(addOrg.verifyAddOrgLabels('Fax:')).to.become('true');
           addOrg.verifyAddOrgPostalCodeLabel();
            addOrg.verifyAddOrgPhoneLabel();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to see the detail information of organization$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
      //  login.login('ctrpcurator', 'Welcome01');
      //  login.accept();
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            projectFunctions.createOrganization('shiOrg','alias','add1','add2','United States','Florida','avenue','24567','s@s.com','222-4444-555','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I select organization name in the search results$/, function (callback) {
        cukeOrganization.then(function(value) {
            console.log('This is the Org:' + value);
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            element(by.linkText(value)).click();
        });
        browser.sleep(25).then(callback);
    });


    this.Then(/^the complete organization information will be displayed including:$/, function (table, callback) {
        expect(addOrg.verifyAddOrgLabels('CTRP ID:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Name:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Name Alias:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Source Context:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Source ID:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Source Status:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Address 1:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Address 2:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('City:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('State:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Country:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Families:')).to.become('false');
        expect(addOrg.verifyAddOrgLabels('Email:')).to.become('true');
        expect(addOrg.verifyAddOrgLabels('Fax:')).to.become('true');
        addOrg.verifyAddOrgPostalCodeLabel();
        addOrg.verifyAddOrgPhoneLabel();
        browser.sleep(25).then(callback);
    });


    this.Given(/^I want to search for an Organization with wild card$/, function (callback) {
        callback();
    });

    this.Given(/^I am on a Organization search screen$/, function (callback) {
        callback();
    });

    this.Given(/^Exact Search is selected$/, function (callback) {
        projectFunctions.createOrgforSearch();
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        searchOrg.clickExactSearch('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^Exact Search is not selected$/, function (callback) {
        projectFunctions.createOrgforSearch();
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        searchOrg.clickExactSearch('false');
        browser.sleep(25).then(callback);
    });

    this.Then(/^Organization Search Results will display all found organizations$/, function (callback) {
        callback();
    });


    this.When(/^I enter "([^"]*)" in a search field$/, function (arg1, callback) {
        orgSearch.then(function(value){
            var splitOrgName = value.split(" ",1);
            console.log('value of Split Org : ' + splitOrgName);
           searchOrg.setOrgName(splitOrgName + '*');
            searchOrg.clickSearchButton();
            console.log('value of Split Org : ' + value);
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
            searchOrg.clickClearButton();
            browser.driver.wait(function() {
                console.log('wait here');
                return true;
            }, 4000).then(function() {
                orgSourceId.then(function(value) {
                    console.log('This is the CTRP ID of added Org' + value);
                    var splitOrgSrcID = value.slice(0,7);
                    console.log('value of Split Org Source ID : ' + splitOrgSrcID);
                    searchOrg.setSourceId(splitOrgSrcID + '*');
                    searchOrg.clickSearchButton();
                    expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
                });
            });
        });
        searchOrg.clickClearButton();
        searchOrg.setCity('searchCi*');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('searchCity')).to.become('true');
        searchOrg.clickClearButton();
        cukeFamily.then(function(value){
            var splitFamName = value.split(" ",1);
            console.log('value of Split Family : ' + splitFamName);
            searchOrg.setFamilyName(splitFamName + '*');
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true');
        });
        searchOrg.clickClearButton();
        searchOrg.setPostalCode('4657*');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('46578')).to.become('true');
        searchOrg.clickClearButton();
        searchOrg.setPhone('222-487-89*');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('222-487-8956')).to.become('true');
        searchOrg.clickClearButton();
        searchOrg.setEmail('searchOrg@em*');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('searchOrg@email.com')).to.become('true');
        searchOrg.clickClearButton();
        searchOrg.setOrgLastUpdatedName('ctrpcu*');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('ctrpcurator')).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the search will perform a wild card search$/, function (callback) {
        callback();
    });

    this.Given(/^I want to clear the organization search fields$/, function (callback) {
        searchOrg.setOrgName('test');
        searchOrg.checkAlias(true);
        selectItem.selectSourceContext('CTEP');
        selectItem.selectSourceStatus('Active');
        searchOrg.setSourceId('56AB');
        searchOrg.setFamilyName('fam1');
        searchOrg.setCity('city');
        searchOrg.setPostalCode('5462');
        selectItem.selectCountrySearchOrg('Nepal');
        searchOrg.setPhone('782');
        searchOrg.setEmail('etj j');
        selectItem.selectState('Bagmati');
        searchOrg.setOrgLastUpdatedStartDate('07-Oct-2015');
        searchOrg.setOrgLastUpdatedEndDate('07-Oct-2015');
        searchOrg.setOrgLastUpdatedName('ret');
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });


    this.When(/^I select the Clear option$/, function (callback) {
        searchOrg.clickClearButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^all values in all fields will be cleared$/, function (callback) {
        expect(searchOrg.orgName.getAttribute('value')).to.eventually.equal('');
        expect(searchOrg.sourceContext.$('option:checked').getText()).to.eventually.equal('All Contexts');
        expect(searchOrg.sourceStatus.$('option:checked').getText()).to.eventually.equal('Select a Status');
        expect(searchOrg.sourceId.getAttribute('value')).to.eventually.equal('');
        expect(searchOrg.familyName.getAttribute('value')).to.eventually.equal('');
        expect(searchOrg.city.getAttribute('value')).to.eventually.equal('');
        expect(searchOrg.orgUpdatedByName.getAttribute('value')).to.eventually.equal('');
        expect(searchOrg.postalCode.getAttribute('value')).to.eventually.equal('');
        expect(searchOrg.country.$('option:checked').getText()).to.eventually.equal('All Countries');
        expect(searchOrg.phone.getAttribute('value')).to.eventually.equal('');
        expect(searchOrg.email.getAttribute('value')).to.eventually.equal('');
        expect(searchOrg.state.$('option:checked').getText()).to.eventually.equal('All States/Provinces');
        expect(searchOrg.alias.isSelected()).to.eventually.equal(true);
        expect(searchOrg.orgUpdatedStartDate.getAttribute('value')).to.eventually.equal('');
        expect(searchOrg.orgUpdatedEndDate.getAttribute('value')).to.eventually.equal('').and.notify(callback);
    });

    this.When(/^I have entered the "([^"]*)" organization name$/, function (arg1, callback) {
            orgSearch.then(function (value) {
                if(arg1 === 'exact') {
                    searchOrg.setOrgName(value);
                }
                else if(arg1 === 'partial') {
                    var splitOrgName = value.split(" ",1);
                    console.log('value of Split Org : ' + splitOrgName.toString());
                    searchOrg.setOrgName(splitOrgName.toString());
                }
                searchOrg.clickSearchButton();
                console.log('value of Org : ' + value);
            });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the exact Organization name will be displayed on the organization search results table$/, function (callback) {
        orgSearch.then(function(value) {
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true').and.notify(callback);
        });
    });

    this.When(/^I have entered the "([^"]*)" Source ID$/, function (arg1, callback) {
        searchOrg.clickClearButton();
            orgSourceId.then(function (value) {
                console.log('This is the CTRP ID of added Org' + value);
                if(arg1 === 'exact') {
                    searchOrg.setSourceId(value);
                }
                else if(arg1 === 'partial') {
                    var splitOrgSrcID = value.slice(0,7);
                    console.log('value of Split Org Source ID : ' + splitOrgSrcID);
                    searchOrg.setSourceId(splitOrgSrcID);
                }
                searchOrg.clickSearchButton();
            });
        browser.sleep(25).then(callback);
    });

    this.Then(/^The exact Source ID will be displayed on the Organization search results table$/, function (callback) {
        orgSourceId.then(function(value) {
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true').and.notify(callback);
        });
    });

    this.When(/^I have entered the "([^"]*)" City$/, function (arg1, callback) {
        searchOrg.clickClearButton();
        if(arg1 === 'exact') {
            searchOrg.setCity('searchCity');
        }
        else if(arg1 === 'partial') {
            searchOrg.setCity('searchCi');
        }
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the exact City name will be displayed on the Organization search results table$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('searchCity')).to.become('true').and.notify(callback);
    });

    this.When(/^I have entered the "([^"]*)" username$/, function (arg1, callback) {
        searchOrg.clickClearButton();
        if(arg1 === 'exact') {
            searchOrg.setOrgLastUpdatedName('ctrpcurator');
        }
        else if(arg1 === 'partial') {
            searchOrg.setOrgLastUpdatedName('ctrpcurat');
        }
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^The exact username will be displayed on the Organization search results table$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('ctrpcurator')).to.become('true').and.notify(callback);
    });

    this.When(/^I have entered the "([^"]*)" Family Name$/, function (arg1, callback) {
        searchOrg.clickClearButton();
        cukeFamily.then(function(value){
            if(arg1 === 'exact') {
                searchOrg.setFamilyName(value);
            }
            else if(arg1 === 'partial') {
                var splitOrgFamID = value.split(" ",1);
                console.log('value of Split Org Family ID : ' + splitOrgFamID.toString());
                searchOrg.setFamilyName(splitOrgFamID.toString());
            }
            searchOrg.clickSearchButton();
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the exact Family Name will be displayed on the Organization search results table$/, function (callback) {
        cukeFamily.then(function(value){
            expect(projectFunctions.inOrgSearchResults(value)).to.become('true').and.notify(callback);
        });
    });

    this.When(/^I have entered the "([^"]*)" Postal Code$/, function (arg1, callback) {
        searchOrg.clickClearButton();
        if(arg1 === 'exact') {
            searchOrg.setPostalCode('46578');
        }
        else if(arg1 === 'partial') {
            searchOrg.setPostalCode('4657');
        }
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the exact Postal Code will be displayed on the Organization search results table$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('46578')).to.become('true').and.notify(callback);
    });

    this.When(/^I have entered the "([^"]*)" phone number$/, function (arg1, callback) {
        searchOrg.clickClearButton();
        if(arg1 === 'exact') {
            searchOrg.setPhone('222-487-8956');
        }
        else if(arg1 === 'partial') {
            searchOrg.setPhone('222-487-89');
        }
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the exact phone number will be displayed on the Organization search results table$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('222-487-8956')).to.become('true').and.notify(callback);
    });

    this.When(/^I have entered the "([^"]*)" email$/, function (arg1, callback) {
        searchOrg.clickClearButton();
        if(arg1 === 'exact') {
            searchOrg.setEmail('searchOrg@email.com');
        }
        else if(arg1 === 'partial') {
            searchOrg.setEmail('searchOrg@email');
        }
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the exact email will be displayed on the Organization search results table$/, function (callback) {
        expect(projectFunctions.inOrgSearchResults('searchOrg@email.com')).to.become('true').and.notify(callback);
    });

    this.Given(/^I dont provide the Exact criteria$/, function (callback) {
        orgSearch.then(function(value){
            var splitOrgName = value.split(" ",1);
            console.log('value of Split Org : ' + splitOrgName);
            searchOrg.setOrgName(splitOrgName.toString());
            searchOrg.clickSearchButton();
            console.log('value of Split Org : ' + value);
            expect(projectFunctions.inOrgSearchResults(value)).to.become('false');
            searchOrg.clickClearButton();
            browser.driver.wait(function() {
                console.log('wait here');
                return true;
            }, 40).then(function() {
                orgSourceId.then(function(value) {
                    console.log('This is the CTRP ID of added Org' + value);
                    var splitOrgSrcID = value.slice(0,7);
                    console.log('value of Split Org Source ID : ' + splitOrgSrcID);
                    searchOrg.setSourceId(splitOrgSrcID);
                    searchOrg.clickSearchButton();
                    expect(projectFunctions.inOrgSearchResults(value)).to.become('false');
                });
            });
        });
        searchOrg.clickClearButton();
        searchOrg.setCity('searchCi');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('searchCity')).to.become('false');
        searchOrg.clickClearButton();
        cukeFamily.then(function(value){
            var splitFamName = value.split(" ",1);
            console.log('value of Split Family : ' + splitFamName.toString());
            searchOrg.setFamilyName(splitFamName.toString());
            searchOrg.clickSearchButton();
            expect(projectFunctions.inOrgSearchResults(value)).to.become('false');
        });
        searchOrg.clickClearButton();
        searchOrg.setPostalCode('4657');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('46578')).to.become('false');
        searchOrg.clickClearButton();
        searchOrg.setPhone('222-487-89');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('222-487-8956')).to.become('false');
        searchOrg.clickClearButton();
        searchOrg.setEmail('searchOrg@em');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('searchOrg@email.com')).to.become('false');
        searchOrg.clickClearButton();
        searchOrg.setOrgLastUpdatedName('ctrpcu');
        searchOrg.clickSearchButton();
        expect(projectFunctions.inOrgSearchResults('ctrpcurator')).to.become('false');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the search result should not be displayed$/, function (callback) {
        callback();
    });


};