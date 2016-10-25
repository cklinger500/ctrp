/**
 * Created by singhs10 on 8/10/15.
 */

var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var menuItemList = require('../support/PoCommonBar');
var addOrgPage = require('../support/AddOrganizationPage');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var moment = require('moment');

AddPersonPage = function () {

    this.addPersonFirstName = element(by.model('personDetailView.curPerson.fname'));
    this.addPersonSecondName = element(by.model('personDetailView.curPerson.mname'));
    this.addPersonLastName = element(by.model('personDetailView.curPerson.lname'));
    this.addPersonSourceId = element(by.binding('personDetailView.curPerson.source_id'));
    this.addPersonSourceStatus = element(by.model('personDetailView.curPerson.source_status_id'));
    this.addPersonSourceContext = element(by.model('personDetailView.curPerson.source_context_id'));
    this.addPersonPrefix = element(by.model('personDetailView.curPerson.prefix'));
    this.addPersonSuffix = element(by.model('personDetailView.curPerson.suffix'));
    this.addPersonEmail = element(by.model('personDetailView.curPerson.email'));
    this.addPersonPhone = element(by.model('personDetailView.curPerson.phone'));
    this.addPersonAffiliatedOrgName = element(by.binding('org.name'));
    this.addPersonSearchAffiliatedOrg = element(by.model('personDetailView.orgsSearchParams.name'));
    this.addPersonAffiliatedOrg = element(by.css('select[ng-model="personDetailView.selectedOrgs"]'));
    this.addPersonSelectAllAffiliatedOrg = element(by.css('button[title="Select all"]'));
    this.addPersonRemoveAllAffiliatedOrg = element(by.css('button[title="Remove all"]'));
    this.personSaveButton = element(by.id('save_btn'));//element(by.css('button[type="submit"]')); //element(by.css('input[value="Save"]'));
    this.personResetButton = element(by.id('clear_btn'));
    this.personDeleteButton = element(by.id('confirm_btn'));
    this.addPersonHeader = element(by.binding('personDetailView.formTitleLabel'));//element(by.css('h4[ng-if="personDetailView.curPerson.new"]'));
    this.editPersonHeader = element(by.binding('personDetailView.formTitleLabel'));//element(by.css('h4[ng-if="!personDetailView.curPerson.new"]'));
    this.personLastUpdatedBy = element(by.binding('personDetailView.curPerson.updated_by'));
    this.personCreatedBy = element(by.binding('personDetailView.curPerson.created_by'));
    this.addPersonComment = element.all(by.css('ng-md-icon[icon="comment"]'));


    var personVerifyAddHeader = 'Add Person';
    var personVerifyEditHeader = 'Edit Person';
    var menuItem = new menuItemList();
    var addOrg = new addOrgPage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new listOfPeoplePage();

    var addPerson = new helper();

    this.setAddPersonFirstName = function(personFirstName){
        addPerson.setValue(this.addPersonFirstName,personFirstName,"Add Person by First Name field");
    };

    this.setAddPersonSecondName = function(personSecondName){
        addPerson.setValue(this.addPersonSecondName,personSecondName,"Add Person by Second Name field");
    };

    this.setAddPersonLastName = function(personLastName){
        addPerson.setValue(this.addPersonLastName,personLastName,"Add Person by Last Name field");
    };

    this.setAddPersonSourceId= function(personSourceId){
        addPerson.setValue(this.addPersonSourceId,personSourceId,"Add Person by Source Id field");
    };

    this.selectAddPersonSourceStatus = function(personSourceStatus){
        addPerson.selectValue(this.addPersonSourceStatus,personSourceStatus,"Add Person by Source Status field");
    };

    this.setAddPersonPrefix = function(personPrefix){
        addPerson.setValue(this.addPersonPrefix,personPrefix,"Add Person by Prefix field");
    };

    this.setAddPersonSuffix = function(personSuffix){
        addPerson.setValue(this.addPersonSuffix,personSuffix,"Add Person by Suffix field");
    };

    this.setAddPersonEmail = function(personEmail){
        addPerson.setValue(this.addPersonEmail,personEmail,"Add Person by Email field");
    };

    this.setAddPersonPhone = function(personPhone){
        addPerson.setValue(this.addPersonPhone,personPhone,"Add Person by Phone field");
    };

    this.setAddPersonSearchAffiliatedOrg = function(personSearchAffiliatedOrg){
        addPerson.setValue(this.addPersonSearchAffiliatedOrg,personSearchAffiliatedOrg,"Add Person by Affiliated Search field");
    };

    this.selectAddPersonAffiliatedOrg = function(personAffiliatedOrg){
        addPerson.setValue(this.addPersonAffiliatedOrg, personAffiliatedOrg, "Add Person by Affiliated Org");
    };

    this.clickSelectAllAffiliatedOrg = function(){
        addPerson.clickButton(this.addPersonSelectAllAffiliatedOrg,"Add Person Select All Affiliated Org button");
    };

    this.clickRemoveAllAffiliatedOrg = function(){
        addPerson.clickButton(this.addPersonRemoveAllAffiliatedOrg,"Add Person Remove All Affiliated Org button");
    };


    this.clickSave = function(){
        addPerson.clickButton(this.personSaveButton,"Add Person by Save button");
    };

    this.clickReset = function(){
        addPerson.clickButton(this.personResetButton,"Add Person by Reset button");
    };

    this.getVerifyAddPerFName = function(perFName){
        addPerson.getVerifyValue(this.addPersonFirstName,perFName,"Get Person by first Name field");
    };

    this.getVerifyAddPerMName = function(perMName){
        addPerson.getVerifyValue(this.addPersonSecondName,perMName,"Get Person by Middle Name field");
    };

    this.getVerifyAddPerLName = function(perLName){
        addPerson.getVerifyValue(this.addPersonLastName,perLName,"Get Person by Last Name field");
    };

    this.getVerifyAddPerSourceId = function(sourceId){
        addPerson.getVerifyValue(this.addPersonSourceId,sourceId,"Get Person by Source ID field");
    };

    this.getVerifyAddPerSourceStatus = function(sourceStatus){
        addPerson.getVerifyListValue(this.addPersonSourceStatus,sourceStatus,"Get Person by Source Status field");
    };

    this.getVerifyAddPerSourceContext= function(sourceContext){
        addPerson.getVerifyListValue(this.addPersonSourceContext,sourceContext,"Get Person by Source Context field");
    };

    this.getVerifyAddPerPrefix = function(prefix){
        addPerson.getVerifyValue(this.addPersonPrefix,prefix,"Get Person by Prefix field");
    };

    this.getVerifyAddPerSuffix = function(suffix){
        addPerson.getVerifyValue(this.addPersonSuffix,suffix,"Get Person by Suffix field");
    };

    this.getVerifyAddPerEmail = function(email){
        addPerson.getVerifyValue(this.addPersonEmail,email,"Get Person by Email field");
    };

    this.getVerifyAddPerPhone = function(phone){
        addPerson.getVerifyValue(this.addPersonPhone,phone,"Get Person by Phone field");
    };

    this.verifyPersonAddHeader = function(){
        addPerson.getVerifyheader(this.addPersonHeader,personVerifyAddHeader,"Person by Add header field");
    };

    this.verifyPersonEditHeader = function(){
        addPerson.getVerifyheader(this.editPersonHeader,personVerifyEditHeader,"Person by Edit header field");
    };

};
module.exports = AddPersonPage;