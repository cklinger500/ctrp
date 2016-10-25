/**
 * Created by singhs10 on 7/21/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');

var userProfile = function() {

    this.userProfileFirstName = element(by.model('userDetailView.userDetails.first_name'));
    this.userProfileLastName = element(by.model('userDetailView.userDetails.last_name'));
    this.userProfileEmail = element(by.model('userDetailView.userDetails.email'));
    this.userProfilePhone = element(by.model('userDetailView.userDetails.phone'));
    this.userProfileEmailNotifications = element.all(by.model('userDetailView.userDetails.receive_email_notifications'));
    this.userProfileSaveButton = element(by.id('save_btn'));

    var helper = new helperFunctions();

    this.setAddUserEmail = function(userEmail)  {
        helper.setValue(this.userProfileEmail,userEmail,"Add User Profile by Email field");
    };

    this.setAddUserPhone = function(userPhone)  {
        helper.setValue(this.userProfilePhone,userPhone,"Add User Profile by Phone field");
    };

    this.selectAddUserEmailNotifications = function(emailNotificationOption)  {
        if(emailNotificationOption.toUpperCase() === 'NO'){
            helper.clickRadioButton(this.userProfileEmailNotifications, '1', "Add User Profile by Email Notification NO Option field");
        } else if(emailNotificationOption.toUpperCase() === 'YES'){
            helper.clickRadioButton(this.userProfileEmailNotifications, '0', "Add User Profile by Email Notification YES Option field");
        } else {
            helper.clickRadioButton(this.userProfileEmailNotifications, emailNotificationOption, "Add User Profile by Email Notification Option field");
        }
    };

    this.clickAddUserProfileSaveButton = function(){
        helper.clickButton(this.userProfileSaveButton,"Add User Profile Save button");
    };
};
module.exports = userProfile;
