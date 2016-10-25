/**
 * Author: Shamim Ahmed
 * Date: 12/09/2015
 * Page Object: Abstraction Menu items
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionCommonBar = function(){
    /*********************************************
     * Page Object: Abstraction Dashboards & Menu
     *********************************************/
    this.homeSearchTrials = element(by.xpath('//a[contains(text(),"Search Trials")]'));
    var homeAbstractorSearchTrials = element(by.id('dash_search_trial'));
    var homeAbstractionDashboards = element(by.id('dash_abst_trial'));
    //this.homeAbstractionDashboards = element(by.xpath('//a[contains(text(),"Abstraction Dashboards")]'));
    //Top Menus
    /*********************************************
     * Home
     *********************************************/
    this.homeMenu = element(by.linkText('Home'));

    /*********************************************
     * Dashboards
     *********************************************/
    this.dashboardMenu = element(by.linkText('Dashboards'));
    this.abstractionMenu = element(by.linkText('Abstraction'));
    this.resultReportingMenu = element(by.linkText('Results Reporting'));
    this.ctGovMenu = element(by.linkText('CT.Gov Import'));

    /*********************************************
     * Organization & Families
     *********************************************/
    this.organizationAndFamiliesMenu = element(by.linkText('Organizations & Families'));
    this.searchOrganizations = element(by.linkText('Search Organizations'));
    this.searchFamilies = element(by.linkText('Search Families'));

    /*********************************************
     * Persons
     *********************************************/
    this.personsMenu = element(by.linkText('Persons'));
    this.searchPersons = element(by.linkText('Search Persons'));

    /*********************************************
     * Trials
     *********************************************/
    this.trialsMenu = element(by.linkText('Trials'));
    this.searchTrialsReg = element(by.linkText('Search Trials (Reg)'));
    this.searchTrialsPA = element(by.id('mnu_srch_trls_pa'));
    this.registerTrial = element(by.linkText('Register Trial'));

    this.clickTrials = function(){
        helper.clickLink(this.trialsMenu, "Trials - Menu");
    };

    this.clickSearchTrialsReg = function(){
        helper.clickLink(this.searchTrialsReg, "Search Trials Reg - Menu");
    };

    this.clickSearchTrialsPA = function(){
        helper.clickButton(this.searchTrialsPA, "Search Trials PA - Menu");
    };

    this.clickRegisterTrial = function(){
        helper.clickLink(this.registerTrial, "Register Trial - Menu");
    };

    /*********************************************
     * Management
     *********************************************/
    this.userManagementMenu = element(by.linkText('User Management'));

    var pageHeaderText = element(by.css('div.row > h4'));
    var helper = new helperFunctions();
    var search_Trial_Header_Text = 'Search Trials * for wild card';
    var register_Trial_Header_Text = 'Register Trial';



    this.clickSearchTrialAbstractor = function(){
        homeAbstractorSearchTrials.isPresent().then(function(retVal){
            console.log('value of ret val : ' + retVal);
            if (retVal === true) {
                helper.clickButton(homeAbstractorSearchTrials, "Dashboard: Search Trial button");
                expect(pageHeaderText.getText()).to.eventually.equal(search_Trial_Header_Text);
            }
        });
    };

    this.clickHomeAbstractionDashboards = function(){
        homeAbstractionDashboards.isPresent().then(function(retVal){
            console.log('Home page Abstraction Dashboards link value is: ' + retVal);
            if (retVal === true) {
                helper.clickLink(homeAbstractionDashboards, "Home Search Trial link");
                expect(pageHeaderText.getText()).to.eventually.equal(search_Trial_Header_Text);
            }
        });
    };

    this.clickHomeMenu = function(){
        this.homeMenu.isPresent().then(function(retValHome){
            console.log('Link Exists: ' + retValHome);
            if (retValHome === true) {
                helper.clickLink(this.homeMenu, "Home Menu link");
            }
        });
    };

    this.clickDashboardMenu = function(){
        this.dashboardMenu.isPresent().then(function(retValDash){
            console.log('Link Exists: ' + retValDash);
            if (retValDash === true) {
                helper.clickLink(this.dashboardMenu, "Home Search Trial link");
                expect(pageHeaderText.getText()).to.eventually.equal(search_Trial_Header_Text);
            }
        });
    };



};

module.exports = abstractionCommonBar;
