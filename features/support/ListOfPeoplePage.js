/**
 * Created by singhs10 on 8/9/15.
 */

var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

ListOfPeoplePage = function () {

    this.personFirstName = element(by.model('searchParams.fname'));
    this.personLastName = element(by.model('searchParams.lname'));
    this.personOrgAffiliation = element(by.model('page_view.organization_name')); //element(by.model('searchParams.affiliated_org_name'));
    this.personPoId = element(by.model('searchParams.ctrp_id'));
    this.personSourceContext = element(by.model('searchParams.source_context'));
    this.personSourceId = element(by.model('searchParams.source_id'));
    this.personSourceStatus = element(by.model('searchParams.source_status'));
    this.personPrefix = element(by.model('searchParams.prefix'));
    this.personSuffix = element(by.model('searchParams.suffix'));
    this.personEmail = element(by.model('searchParams.email'));
    this.personPhone = element(by.model('searchParams.phone'));
    this.personUpdateBy = element(by.model('searchParams.updated_by'));
    this.personLastUpdatedStartDate = element(by.model('searchParams.startDate'));
    this.personLastUpdatedEndDate = element(by.model('searchParams.endDate'));
    this.personSearchButton = element(by.css('#submission_btn'));// element(by.css('button[ng-click="searchPeople()"]'));
    this.personClearButton = element(by.css('button[ng-click="resetSearch()"]'));
    this.trialPersonSearchSrcContext = element(by.binding('sourceContextArr[0].name'));
    this.trialPersonSearchSrcStatus = element(by.binding('sourceStatusArr[0].name'));

    var listPerson = new helper();

    this.setPersonFirstName = function(personFirstName){
        listPerson.setValue(this.personFirstName,personFirstName,"Person by First Name field");
    };

    this.setPersonLastName = function(personLastName){
        listPerson.setValue(this.personLastName,personLastName,"Person by Last Name field");
    };

    this.setPersonOrgAffiliation = function(personOrgAffiliation){
        listPerson.setValue(this.personOrgAffiliation,personOrgAffiliation,"Person by Org Affiliation field");
    };

    this.setPersonPoId = function(personPoId){
        listPerson.setValue(this.personPoId,personPoId,"Person by PO ID field");
    };

    this.selectPersonSourceContext = function(personSourceContext){
        listPerson.selectValue(this.personSourceContext,personSourceContext,"Person by Source Context field");
    };

    this.setPersonSourceId = function(personSourceId){
        listPerson.setValue(this.personSourceId,personSourceId,"Person by SourceID field");
    };

    this.selectPersonSourceStatus = function(personSourceStatus){
        listPerson.selectValue(this.personSourceStatus,personSourceStatus,"Person by Source Status field");
    };

    this.setPersonPrefix = function(personPrefix){
        listPerson.setValue(this.personPrefix,personPrefix,"Person by Prefix field");
    };

    this.setPersonSuffix = function(personSuffix){
        listPerson.setValue(this.personSuffix,personSuffix,"Person by Suffix field");
    };

    this.setPersonEmail = function(personEmail){
        listPerson.setValue(this.personEmail,personEmail,"Person by Email field");
    };

    this.setPersonPhone = function(personPhone){
        listPerson.setValue(this.personPhone,personPhone,"Person by Phone field");
    };

    this.setPersonUpdatedBy= function(personUpdatedBy){
        listPerson.setValue(this.personUpdateBy,personUpdatedBy,"Person by Updated by field");
    };

    this.setPersonLastUpdatedStartDate = function(personLastUpdatedStartDate){
        listPerson.setValue(this.personLastUpdatedStartDate,personLastUpdatedStartDate,"Person by Last Updated Start Date field");
    };

    this.setPersonLastUpdatedEndDate = function(personLastUpdatedEndDate){
        listPerson.setValue(this.personLastUpdatedEndDate,personLastUpdatedEndDate,"Person by Last Updated End Date field");
    };

    this.clickSearch = function(){
        listPerson.clickButton(this.personSearchButton,"Person by Search button");
    };

    this.clickClear = function(){
        listPerson.clickButton(this.personClearButton, "Person by Clear button");
    };


};
module.exports = ListOfPeoplePage;
