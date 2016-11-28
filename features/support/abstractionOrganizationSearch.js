/**
 * Author: Shamim Ahmed
 * Date: 01/09/2015
 * Page Object: Abstraction NCI Specific Information Page
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionOrganizationSearch = function(){

    //NCI Specific Organization Button
    this.nciSpecificSearchOrganisations = element(by.id('org_search_modal')); // by.buttonText(' Search Organizations')

    //Organization Search
    this.orgSearchName = element(by.model('searchParams.name'));
    this.orgSearchSearchAlias = element(by.model('searchParams.alias')); //by.id('alias_search')
    this.orgSearchFamilyName = element(by.model('searchParams.family_name'));
    this.orgSearchSourceStatus = element(by.css('p.form-control-static'));
    this.orgSearchSourceID = element(by.model('searchParams.source_id'));
    this.orgSearchSourceContext = element(by.binding('sourceContexts[0].name'));
    this.orgSearchCity = element(by.model('searchParams.city'));
    this.orgSearchPotalCode = element(by.model('searchParams.postal_code'));
    this.orgSearchCountryList = element(by.model('searchParams.country'));
    this.orgSearchPhone = element(by.model('searchParams.phone'));
    this.orgSearchEmail = element(by.model('searchParams.email'));
    this.orgSearchStateList = element(by.model('searchParams.state_province'));
    this.orgSearchExactSearch = element(by.model('searchParams.wc_search'));
    this.orgSearchClearButton = element(by.id('reset_btn'));
    this.orgSearchSearchButton = element(by.id('submission_btn'));
    this.orgSearchSelectItem = element(by.css('div[ng-click="selectButtonClick(row, $event)"]'));
    this.orgSearchConfirmSelection = element(by.buttonText('Confirm Selection'));
    this.orgSearchClose = element();


    var helper = new helperFunctions();

    //Set Name : Organization Search
    this.setOrgSearchName = function(orgSrchNam){
        helper.setValue(this.orgSearchName,orgSrchNam,"Organization Search by Name field");
    };

    //Set Source ID : Organization Search
    this.setSourceId = function(sourceId){
        helper.setValue(this.sourceId,sourceId,"Organization Search by SourceId field");
    };

    //Search : Organization Search
    this.clickOrganizationSearch = function(){
        helper.clickButton(this.orgSearchSearchButton,"Organization Search button");
    };

    //Select Organization : Organization Search
    this.selectOrganizationFromGrid = function(){
        helper.clickButton(this.orgSearchSelectItem,"Organization list Item selection");
    };

    //Confirmation Selection : Organization Search
    this.clickOrganizationSelectionConfirmation = function(){
        helper.clickButton(this.orgSearchConfirmSelection,"Organization Selection Confirmation button");
    };
    
    //NCI Specific
    //Search Organization : Button
    this.clickSearchOrganization = function(){
        helper.clickButton(this.nciSpecificSearchOrganisations, "Search Organization button clicked");
    }

    //Verify List Value
    this.getVerifyListValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.$('option:checked').getText()).to.eventually.equal(fieldValue);
        console.log(errorMessage + " - Got value");
    };

    //Wait For Element
    this.wait = function (element, label) {
        browser.wait(function () {
            return element.isPresent().then(function (state) {
                if (state === true) {
                    return element.isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, label + " did not appear");
        browser.sleep(250);
    };

};

module.exports = abstractionOrganizationSearch;
