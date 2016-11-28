/**
 * Created by singhs10 on 9/17/15.
 **/

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var menuItemList = require('../support/PoCommonBar');
var personPage = require('../support/AddPersonPage');
var orgPage = require('../support/ListOfOrganizationsPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var moment = require('moment');
var loginPage = require('../support/LoginPage');
var projectFunctionsPage= require('../support/projectMethods');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');


module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var searchPerson = new listOfPeoplePage();
    var addPerson = new personPage();
    var searchOrg = new orgPage();
    var selectItem =new selectList();
    var projectFunctions = new projectFunctionsPage();
    var commonFunctions = new abstractionCommonMethods();

    this.Given(/^I know multiple parameters of the person I wish to search for$/, function (table, callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 40).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            menuItem.clickPeople();
            menuItem.clickListPeople();
            searchPerson.setPersonFirstName('shiFName' + moment().format('MMMDoYY h'));
            per4 = searchPerson.personFirstName.getAttribute('value');
            searchPerson.clickSearch();
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
                if(state === true) {
                    console.log('Person exists');
                    per4.then(function(value){
                        element(by.linkText(value)).click();
                        perSourceId = addPerson.addPersonSourceId.getText();
                        cukeOrganization = addPerson.addPersonAffiliatedOrgName.getText();
                    });
                }
                else {
                    projectFunctions.createOrganization('shiPerOrgAff','als1','add1','add2','United States','Texas','city56','20980','shiPerson@mail.com','240-7809-855','490332');
                    browser.driver.wait(function() {
                        console.log('wait here');
                        return true;
                    }, 40).then(function() {
                        menuItem.clickPeople();
                        menuItem.clickAddPerson();
                        addPerson.setAddPersonPrefix('prefix');
                        per4.then(function (value1) {
                            console.log('Add first Name' + value1);
                            addPerson.setAddPersonFirstName(value1);
                        });
                        addPerson.setAddPersonSecondName('Rauniyar');
                        addPerson.setAddPersonLastName('shiLName');
                        addPerson.setAddPersonSuffix('suffix');
                        addPerson.setAddPersonEmail('shiPercuke@pr.com');
                        addPerson.setAddPersonPhone('420-567-8906');
                        searchOrg.clickOrgSearchModel();
                        cukeOrganization.then(function (value) {
                            searchOrg.setOrgName(value);
                            searchOrg.clickSearchButton();
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        });
                        addPerson.clickSave();
                        perSourceId = addPerson.addPersonSourceId.getText();
                    });
                }
            });
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the search persons screen$/, function (callback) {
        menuItem.clickPeople();
        menuItem.clickListPeople();
        browser.sleep(25).then(callback);
    });

    this.When(/^I want to search with first name (.*)$/, function (firstName, callback) {
        if(firstName === 'shiFName' ) {
            per4.then(function (value) {
                searchPerson.setPersonFirstName(value);
            });
        }
        else if (firstName !== '') {
                searchPerson.setPersonFirstName(firstName);
            }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with last name (.*)$/, function (lastName, callback) {
        if (lastName !== '') {
            searchPerson.setPersonLastName(lastName);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Person affiliated organization (.*)$/, function (PersonAffiliatedOrganization, callback) {
        if(PersonAffiliatedOrganization === 'shiPerOrgAff' ) {
            cukeOrganization.then(function (value) {
                searchPerson.setPersonOrgAffiliation(value);
            });
        }
        else if (PersonAffiliatedOrganization !== '') {
                searchPerson.setPersonOrgAffiliation(PersonAffiliatedOrganization);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Source Context (.*)$/, function (SourceContext, callback) {
        selectItem.selectSourceContext(SourceContext);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Source ID (.*)$/, function (SourceID, callback) {
        if(SourceID === '65000000') {
            perSourceId.then(function (value) {
                console.log('Person Source ID is:' + value);
                searchPerson.setPersonSourceId(value);
            });
        }
        else if (SourceID !== '') {
            searchPerson.setPersonSourceId(SourceID);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Source Status (.*)$/, function (SourceStatus, callback) {
        selectItem.selectSourceStatus(SourceStatus);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Person email (.*)$/, function (PersonEmail, callback) {
        if (PersonEmail !== '') {
            searchPerson.setPersonEmail(PersonEmail);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Person phone number (.*)$/, function (PersonPhoneNumber, callback) {
        if (PersonPhoneNumber !== '') {
            searchPerson.setPersonPhone(PersonPhoneNumber);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search for Person Records last updated by (.*) and (.*)$/, function (StartDate, EndDate, callback) {
        updatedDate = moment().format('DD-MMM-YYYY');
        if(StartDate === 'today' && EndDate === 'today' ) {
            searchPerson.setPersonLastUpdatedStartDate(updatedDate);
            searchPerson.setPersonLastUpdatedEndDate(updatedDate);
        }
        else {
            searchPerson.setPersonLastUpdatedStartDate('');
            searchPerson.setPersonLastUpdatedEndDate('');
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search for Person records last updated by (.*)$/, function (Username, callback) {
        if (Username !== '') {
            searchPerson.setPersonUpdatedBy(Username);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I submit my search request for Person Search$/, function (callback) {
        searchPerson.clickSearch();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the search results (.*) should display the following sorted by Last Name:$/, function (result, table, callback) {
        //searchPerson.personFirstName.getAttribute('value').then(function(personFirstName){
        //    console.log('personFirstName here is:' + personFirstName);
        //    searchPerson.personSourceContext.$('option:checked').getText().then(function(personSourceContext){
        //        console.log('personSourceContext here is:' + personSourceContext);
        //        searchPerson.personSourceStatus.$('option:checked').getText().then(function(personSourceStatus){
        //            console.log('personSourceStatus here is:' + personSourceStatus);
                    searchPerson.personOrgAffiliation.getAttribute('value').then(function(personOrgAffiliation){
                        console.log('personOrgAffiliation here is:' + personOrgAffiliation);
        //                searchPerson.personSourceId.getAttribute('value').then(function(personSourceId){
        //                    console.log('personSourceId here is:' + personSourceId);
        //                    searchPerson.personLastName.getAttribute('value').then(function(personLastName){
        //                        console.log('personLastName here is:' + personLastName);
        //                        searchPerson.personEmail.getAttribute('value').then(function(personEmail){
        //                            console.log('personEmail here is:' + personEmail);
        //                            searchPerson.personPhone.getAttribute('value').then(function(personPhone){
        //                                console.log('personPhone here is:' + personPhone);
        //                                    searchPerson.personUpdateBy.getAttribute('value').then(function(personUpdateBy){
        //                                        console.log('personUpdateBy here is:' + personUpdateBy);
                                                searchPerson.personLastUpdatedStartDate.getAttribute('value').then(function(personLastUpdatedStartDate){
                                                    console.log('personLastUpdatedStartDate here is:' + personLastUpdatedStartDate);
                                                        searchPerson.personLastUpdatedEndDate.getAttribute('value').then(function(personLastUpdatedEndDate) {
                                                            console.log('personLastUpdatedEndDate here is:' + personLastUpdatedEndDate);
                                                                   if (personLastUpdatedStartDate === '' && personLastUpdatedEndDate === '') {
                                                                       expect(projectFunctions.inSearchResults('CTRP')).to.become('true').and.notify(callback);
                                                                    }
                                                                   else if (personOrgAffiliation !== '') {
                                                                       cukeOrganization.then(function (value) {
                                                                           console.log('Org affiliation search in result : ' + value);
                                                                           expect(projectFunctions.inSearchResults(value)).to.become('true').and.notify(callback);
                                                                       });
                                                                   }
                                                                   else {
        //                                                                console.log('in the else statement');
                                                                          expect(projectFunctions.inSearchResults('Active')).to.become('true').and.notify(callback);
                                                                    }
                                                        });
       //                                             });
       //                                         });
       //                             });
       //                         });
       //                     });
       //                 });
       //             });
       //         });
           });
       });
       });
       //

    this.Given(/^I have selected the option to search persons$/, function (callback) {
        callback();
    });

    this.Given(/^Exact Search is checked on search person$/, function (callback) {
        projectFunctions.createPersonforSearch();
        menuItem.clickPeople();
        menuItem.clickListPeople();
        searchOrg.clickExactSearch('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^Exact Search is not checked on search person$/, function (callback) {
        projectFunctions.createPersonforSearch();
        menuItem.clickPeople();
        menuItem.clickListPeople();
        searchOrg.clickExactSearch('false');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have entered the "([^"]*)" person First Name$/, function (arg1, callback) {
        per4.then(function (value) {
            if(arg1 === 'exact') {
                searchPerson.setPersonFirstName(value);
            }
            else if(arg1 === 'partial') {
                var splitPerName = value.split(" ",1);
                console.log('value of Split Person : ' + splitPerName.toString());
                searchPerson.setPersonFirstName(splitPerName.toString());
            }
            searchPerson.clickSearch();
            console.log('value of Person : ' + value);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the person First Name will be displayed on the People Search Results table$/, function (callback) {
        per4.then(function(value) {
            expect(projectFunctions.inSearchResults(value)).to.become('true').and.notify(callback);
        });
    });

    this.When(/^I have entered the "([^"]*)" person Last Name$/, function (arg1, callback) {
        searchPerson.clickClear();
        if(arg1 === 'exact') {
            searchPerson.setPersonLastName('shiLName');
        }
        else if(arg1 === 'partial') {
            searchPerson.setPersonLastName('shiL');
        }
        searchPerson.clickSearch();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the person Last Name will be displayed on the People Search Results table$/, function (callback) {
        expect(projectFunctions.inSearchResults('shiLName')).to.become('true').and.notify(callback);
    });

    this.When(/^I have entered the "([^"]*)" Source ID for Person$/, function (arg1, callback) {
        searchPerson.clickClear();
        perSourceId.then(function (value) {
            console.log('This is the CTRP ID of added Person' + value);
            if(arg1 === 'exact') {
                searchPerson.setPersonSourceId(value);
            }
            else if(arg1 === 'partial') {
                var splitPerSrcID = value.slice(0,7);
                console.log('value of Split Org Source ID : ' + splitPerSrcID);
                searchPerson.setPersonSourceId(splitPerSrcID);
            }
            searchPerson.clickSearch();
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^The Source ID will be displayed on the People Search Results table$/, function (callback) {
        perSourceId.then(function (value) {
            expect(projectFunctions.inSearchResults(value)).to.become('true').and.notify(callback);
        });
    });

    this.When(/^I have entered the "([^"]*)" Email for Person$/, function (arg1, callback) {
        searchPerson.clickClear();
        if(arg1 === 'exact') {
            searchPerson.setPersonEmail('shiPercuke@pr.com');
        }
        else if(arg1 === 'partial') {
            searchPerson.setPersonEmail('shiPercuke');
        }
        searchPerson.clickSearch();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Email will be displayed on the People Search Results table$/, function (callback) {
        expect(projectFunctions.inSearchResults('shiPercuke@pr.com')).to.become('true').and.notify(callback);
    });

    this.When(/^I have entered the "([^"]*)" Affiliation$/, function (arg1, callback) {
        searchPerson.clickClear();
        cukeOrganization.then(function (value) {
            console.log('This is the aff org of added Person' + value);
            if(arg1 === 'exact') {
                searchPerson.setPersonOrgAffiliation(value);
            }
            else if(arg1 === 'partial') {
                var splitOrgName = value.split(" ",1);
                console.log('value of Split Org : ' + splitOrgName.toString());
                searchPerson.setPersonOrgAffiliation(splitOrgName.toString());
            }
            searchPerson.clickSearch();
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Affiliation will be displayed on the People Search Results table$/, function (callback) {
      //  cukeOrganization.then(function(value) {
            expect(projectFunctions.inSearchResults('CTRP')).to.become('true').and.notify(callback);
        //});
    });

    this.When(/^I have entered the "([^"]*)" Phone Number for Person$/, function (arg1, callback) {
        searchPerson.clickClear();
        if(arg1 === 'exact') {
            searchPerson.setPersonPhone('420-567-8906');
        }
        else if(arg1 === 'partial') {
            searchPerson.setPersonPhone('420-567');
        }
        searchPerson.clickSearch();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Phone Number will be displayed on the People Search Results table$/, function (callback) {
        expect(projectFunctions.inSearchResults('420-567-8906')).to.become('true').and.notify(callback);
    });

    this.When(/^I have entered the "([^"]*)" Username for Person$/, function (arg1, callback) {
        searchPerson.clickClear();
        if(arg1 === 'exact') {
            searchPerson.setPersonUpdatedBy('ctrpcurator');
        }
        else if(arg1 === 'partial') {
            searchPerson.setPersonUpdatedBy('ctrpcurat');
        }
        searchPerson.clickSearch();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Username will be displayed on the People Search Results table$/, function (callback) {
        expect(projectFunctions.inSearchResults('ctrpcurator')).to.become('true').and.notify(callback);
    });

    this.Given(/^I dont provide the Exact criteria for Person$/, function (callback) {
            per4.then(function (value) {
                    var splitPerName = value.split(" ",1);
                    console.log('value of Split Person : ' + splitPerName.toString());
                    searchPerson.setPersonFirstName(splitPerName.toString());
                searchPerson.clickSearch();
                console.log('value of Person : ' + value);
                expect(projectFunctions.inSearchResults(value)).to.become('false');
            });
            searchPerson.clickClear();
                searchPerson.setPersonLastName('shiLNa');
            searchPerson.clickSearch();
            expect(projectFunctions.inSearchResults('shiLName')).to.become('false');
            searchPerson.clickClear();
            perSourceId.then(function (value) {
                    var splitPerSrcID = value.slice(0,7);
                    console.log('value of Split Org Source ID : ' + splitPerSrcID);
                    searchPerson.setPersonSourceId(splitPerSrcID);
                searchPerson.clickSearch();
                expect(projectFunctions.inSearchResults(value)).to.become('false');
            });
            searchPerson.clickClear();
                searchPerson.setPersonEmail('shiPercuke');
            searchPerson.clickSearch();
        expect(projectFunctions.inSearchResults('shiPercuke@pr.com')).to.become('false');
            searchPerson.clickClear();
            cukeOrganization.then(function (value) {
                console.log('This is the aff org of added Person' + value);
                    var splitOrgName = value.split(" ",1);
                    console.log('value of Split Org : ' + splitOrgName.toString());
                    searchPerson.setPersonOrgAffiliation(splitOrgName.toString());
                searchPerson.clickSearch();
            expect(projectFunctions.inSearchResults('CTRP')).to.become('false');
        });
            searchPerson.clickClear();
                searchPerson.setPersonPhone('420-567');
            searchPerson.clickSearch();
        expect(projectFunctions.inSearchResults('420-567-8906')).to.become('false');
            searchPerson.clickClear();
                searchPerson.setPersonUpdatedBy('ctrpcurat');
            searchPerson.clickSearch();
        expect(projectFunctions.inSearchResults('ctrpcurator')).to.become('false');
        browser.sleep(25).then(callback);
        });


};