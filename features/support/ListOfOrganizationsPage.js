/**
 * Created by singhs10 on 7/30/15.
 */

var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require('moment');

ListOfOrganizationsPage = function () {

     this.orgName = element(by.model('searchParams.name'));
     this.alias = element(by.model('searchParams.alias'));
     this.poId = element(by.model('searchParams.ctrp_id'));
     this.phone = element(by.model('searchParams.phone'));
     this.sourceContext = element(by.model('searchParams.source_context'));
     this.sourceId = element(by.model('searchParams.source_id'));
     this.sourceStatus = element(by.model('searchParams.source_status'));
     this.address = element(by.model('searchParams.address'));
     this.address2 = element(by.model('searchParams.address2'));
     this.familyName = element(by.model('searchParams.family_name'));
     this.email = element(by.model('searchParams.email'));
     this.country = element(by.model('searchParams.country'));
     this.state = element(by.model('searchParams.state_province'));
     this.city = element(by.model('searchParams.city'));
     this.postalCode = element(by.model('searchParams.postal_code'));
    this.orgUpdatedStartDate = element(by.model('searchParams.startDate'));
    this.orgUpdatedEndDate = element(by.model('searchParams.endDate'));
    this.orgUpdatedByName = element(by.model('searchParams.updated_by'));
    this.exactSearch = element(by.model('searchParams.wc_search'));
     this.searchButton = element(by.css('#submission_btn'));//element(by.css('button[type="submit"]'));
     this.clearButton = element(by.buttonText('Clear'));
    this.orgModelSearch = element(by.id('org_search_modal'));
    this.orgModelSelectItem = element(by.css('div[ng-click="selectButtonClick(row, $event)"]'));
    this.orgModelConfirm = element(by.buttonText('Confirm Selection'));
    this.orgModelCloseButton = element(by.css('button[ng-click="advOrgSearchForm2ModalView.cancel()"]')); //element(by.css('.btn.btn-danger.pull-right'));
    this.orgModelCloseButtonAll = element.all(by.css('button[ng-click="advOrgSearchForm2ModalView.cancel()"]'));
    this.orgPersonModelCloseButton = element(by.css('button[ng-click="advPersonSearchModalView.cancel()"]'));
    this.orgPersonAffiliatedTable = element.all(by.repeater('org in personDetailView.savedSelection'));
    this.orgFamilyAffiliatedTable = element.all(by.css('div[ng-show="familyDetailView.savedSelection.length > 0"]'));
    //  this.orgAffiliatedEffectiveDate = element(by.model('org.effective_date'));
    this.orgAffiliatedEffectiveDate = element(by.model('org.effective_date'));
    this.orgAffiliatedExpirationDate = element(by.model('org.expiration_date'));
    this.orgFamilyRelationship = element(by.model('org.family_relationship_id'));
    this.orgAffiliatedRemoveButton = element(by.css('.glyphicon.glyphicon-remove-circle'));
    this.orgSearchResultsPage = element.all(by.css('div.ui-grid-viewport'));
    this.searchResultHeader = element.all(by.css('div[ui-grid-header-cell=""]'));
    this.searchResultMenu = element(by.css('.ui-grid-icon-menu'));
    this.searchResultClearFilter = element(by.buttonText('Clear all filters'));
    this.trialOrgSearchSrcContext = element(by.binding('sourceContexts[0].name'));
    this.trialOrgSearchSrcStatus = element(by.binding('sourceStatuses[0].name'));

   // this.searchResult = element.all(by.css('div[ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid"]'));//element.all(by.css('.ui-grid-row'));//element.all(by.binding('grid.getCellValue(row, col) '));
    this.pageResult = element.all(by.css('div.row'));


    var search = new helper();
    var self = this;

    this.setOrgName = function(orgName){
        search.setValue(this.orgName,orgName,"Organization Search by Name field");
    };

 /*    this.setOrgName = function(orgName){
         helper.wait(this.orgName,"Organization Search by Name field");
         this.orgName.clear();
         this.orgName.sendKeys(orgName);
     };*/

   /*  this.checkAlias = function(alias){
         search.wait(this.alias,"Organization Alias checkbox");
         var CheckBoxState = this.alias.isSelected(); //.getAttribute('checked');
         if (!CheckBoxState && alias) //check it now
            {
                this.alias.click();
            } else if (CheckBoxState && !alias) {
             console.log("trying to uncheck");
             this.alias.click();
         } else if (!CheckBoxState && !alias) {

         }

     };
*/

    this.checkAlias = function(aliass) {
        var useSslInput = this.alias;
        if (useSslInput.isSelected() != aliass && aliass) {
            useSslInput.isSelected().then(function (selected) {
                if (selected) {
                    console.log('if true then check it');
                    useSslInput.click();
                }
            });
        } else {
            useSslInput.isSelected().then(function (selected) {
                if (!selected) {
                    console.log('if false then uncheck it');
                    useSslInput.click();
                }
            });
        }
    };

/* originl check
    this.checkAlias = function(aliass) {
        var useSslInput = this.alias;
        if (useSslInput.isSelected() != aliass && aliass) {
            useSslInput.isSelected().then(function (selected) {
                if (selected) {
                    useSslInput.click();
                }
            });
        } else {
            useSslInput.isSelected().then(function (selected) {
                if (!selected) {
                    useSslInput.click();
                }
            });
        }
    }; */

     this.setPoId = function(poId){
         search.setValue(this.poId,poId,"Organization Search by PO ID field");
     };

    this.setPhone = function(phone){
        search.setValue(this.phone,phone,"Organization Search by Phone field");
    };

 /*   this.selectSourceContext = function(sourceContext){
        search.selectValue(this.sourceContext,sourceContext,"Organization Search by Source Context field");
    };
*/
     this.setSourceId = function(sourceId){
         search.setValue(this.sourceId,sourceId,"Organization Search by SourceId field");
     };


/*
     this.selectSourceStatus = function(sourceStatus){
         search.selectValue(this.sourceStatus,sourceStatus,"Organization Search by Source Status field");
     };
*/
     this.setAddress = function(address){
         search.setValue(this.address,address,"Organization Search by address field");
     };

     this.setAddress2 = function(address2){
         search.setValue(this.address2,address2,"Organization Search by Address2 field");
     };

     this.setFamilyName = function(familyName){
         search.setValue(this.familyName,familyName,"Organization Search by Family Name field");
     };

     this.setEmail = function(email){
         search.setValue(this.email,email,"Organization Search by Email field");
     };

    this.setOrgLastUpdatedStartDate = function(startDate){
        search.setValue(this.orgUpdatedStartDate,startDate,"Organization Search by Start Date field");
    };

    this.setOrgLastUpdatedEndDate = function(endDate){
        search.setValue(this.orgUpdatedEndDate,endDate,"Organization Search by End Date field");
    };

    this.setOrgLastUpdatedName = function(updatedByName){
        search.setValue(this.orgUpdatedByName,updatedByName,"Organization Search by Updated Name field");
    };
/*
     this.selectCountry = function(country){
         search.selectValue(this.country,country,"Organization Search by Country field");
     };

     this.selectState = function(state){
         search.selectValue(this.state,state,"Organization Search by State field");
     };
*/
     this.setCity = function(city){
         search.setValue(this.city,city,"Organization Search by City field");
     };

     this.setPostalCode = function(postalCode){
         search.setValue(this.postalCode,postalCode,"Organization Search by Postal Code field");
     };

     this.clickSearchButton = function(){
         search.clickButton(this.searchButton,"Organization Click Search button");
     };

     this.clickClearButton = function(){
         search.clickButton(this.clearButton,"Organization Click Clear button");
     };

    this.getOrgName = function(){
        element(by.model('searchParams.name')).getAttribute('value');
      //  search.getValue(this.orgName,"Get Organization Search by Name field");
    };

    this.inResults = function(searchString) {
        return this.searchResult.filter(function(name) {
            return name.getText().then(function(text) {
              //  console.log('text   '+text);
              //  console.log('searchstring    '+searchString);
                return text === searchString;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
            return 'true';}
            else {return 'false';}
        });
    };

    this.clickOrgSearchModel = function(){
        search.clickButtonNoHeader(this.orgModelSearch,"Organization Model Search button");
    };


    this.selectOrgModelItem = function(){
        search.clickButton(this.orgModelSelectItem,"Organization Model list Item selection");
    };

    this.clickOrgModelConfirm = function(){
        search.clickButton(this.orgModelConfirm,"Organization Model Confirm button");
    };

    this.clickOrgModelClose = function(){
        browser.takeScreenshot().then(function (png) {
            search.writeScreenShot(png, process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testScreenShot/OrgModelClick' + moment().format('MMMDoYY hmmss') + '.png');
        });
        search.clickButton(this.orgModelCloseButton,"Organization Model Close button");
        browser.takeScreenshot().then(function (png) {
            search.writeScreenShot(png, process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testScreenShot/OrgModelAfterClickClose' + moment().format('MMMDoYY hmmss') + '.png');
        });
        search.alertDialog('DISMISS','');
        browser.takeScreenshot().then(function (png) {
            search.writeScreenShot(png, process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testScreenShot/OrgModelAfterDismiss' + moment().format('MMMDoYY hmmss') + '.png');
        });
        //browser.driver.wait(function () {
        //    console.log('wait here');
        //    return true;
        //}, 5000).then(function () {
        //    self.orgModelCloseButtonAll.get(0).isPresent().then(function(retVal){
        //        console.log('value of ret val : ' + retVal);
        //        if (retVal === true) {
        //            self.orgModelCloseButtonAll.get(0).isDisplayed().then(function(state){
        //                if(state) {
        //                    browser.takeScreenshot().then(function (png) {
        //                        search.writeScreenShot(png, process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testScreenShot/OrgModelBeforeget0Click' + moment().format('MMMDoYY hmmss') + '.png');
        //                    });
        //                    self.orgModelCloseButtonAll.get(0).click();
        //                }
        //                else {
        //                    console.log('Close button not Displayed on Search Model');
        //                }
        //            });
        //        }
        //    });
        //});
    };

    this.clickOrgPersonModelClose = function(){
        search.clickButton(this.orgPersonModelCloseButton,"Organization Person Model Close button on Person Model Search");
        browser.takeScreenshot().then(function (png) {
            search.writeScreenShot(png, process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testScreenShot/PersonModelAfterClickClose' + moment().format('MMMDoYY hmmss') + '.png');
        });
        search.alertDialog('DISMISS','');
        browser.takeScreenshot().then(function (png) {
            search.writeScreenShot(png, process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testScreenShot/PersonModelAfterDismiss' + moment().format('MMMDoYY hmmss') + '.png');
        });
    };

    this.setAffiliatedOrgEffectiveDate = function(orgEffectiveDate){
        search.setValue(this.orgAffiliatedEffectiveDate,orgEffectiveDate,"Add Organization Effective Date field");
        //following will select only the default date
        //this.orgAffiliatedEffectiveDate.click();
        //element(by.css('.btn.btn-default.btn-sm.active')).click();
    };

    this.setAffiliatedOrgExpirationDate = function(orgExpirationDate){
        search.setValue(this.orgAffiliatedExpirationDate,orgExpirationDate,"Add Organization Expiration Date field");
        //following will select only the default date
        //this.orgAffiliatedExpirationDate.click();
        //element(by.css('.btn.btn-default.btn-sm.active')).click();
    };

    this.verifyAffiliatedOrgEffectiveDate = function(orgEffectiveDate){
        search.getVerifyValue(this.orgAffiliatedEffectiveDate,orgEffectiveDate,"Add Organization Effective Date field");
    };

    this.verifyAffiliatedOrgExpirationDate = function(orgExpirationDate){
        search.getVerifyValue(this.orgAffiliatedExpirationDate,orgExpirationDate,"Add Organization Expiration Date field");
    };

    this.verifyDefaultAffiliatedOrgEffectiveDate = function() {
        var datenow = moment().format('DD-MMM-YYYY');
        console.log('date=' + datenow);
            (this.orgAffiliatedEffectiveDate.getAttribute('value')).should.eventually.equal(datenow);
    };

    this.verifyDefaultAffiliatedOrgExpirationDate = function() {
        (this.orgAffiliatedExpirationDate.getAttribute('value')).should.eventually.equal('');
    };

    this.verifyOrgFamilyRelationship = function(orgFamilyRelationshipType){
        search.getVerifyValue(this.orgFamilyRelationship,orgFamilyRelationshipType,"Get and verify Org family relationship field");
    };

    this.clickOrgAffiliatedRemove = function(){
        search.clickButton(this.orgAffiliatedRemoveButton,"Organization Model Remove Affiliated Organization button");
    };

    this.clickExactSearch = function(exactSearchTrueFalseValue){
        this.exactSearch.isSelected().then (function(value) {
            console.log('value of exact search : ' + value);
            console.log('value of passed exact Search' + exactSearchTrueFalseValue);
            if (value === false && exactSearchTrueFalseValue === 'true') {
                console.log('value of exact Search1' + value);
                console.log('value of passed exact Search1' + exactSearchTrueFalseValue);
                search.clickButton(self.exactSearch,"Exact Search button");
            }
            else if (value  === true && exactSearchTrueFalseValue === 'false') {
                console.log('value of exact Search2' + value);
                console.log('value of passed exact Search2' + exactSearchTrueFalseValue);
                search.clickButton(self.exactSearch,"Exact Search button");
            }
        });
    };

};
module.exports = ListOfOrganizationsPage;