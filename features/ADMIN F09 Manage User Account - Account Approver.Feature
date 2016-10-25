@Admin @Global 
Feature: ADMIN F09 Manage User Account - Account Approver

As someone with a CTRP Account Approver privileges (Admin or Account approver roles ), I can manage all accounts

Scenario: #1 I can view all CTRP Users 
Given I am logged into CTRP 
And I have Account Approver privileges
When I select the Site Administation feature (User Portal)
Then I will see a list of all CTRP Users listing:
|Username|
| First Name |
| Last Name |
| Email |
| Organizational Affiliation |
| Organization Family|
And the list will display an indicator if the CTRP Users have Site Administrator privileges 
And the list will display an indicator if the CTRP Users will receive e-mails
And Status
And Current Status Date

Scenario: #2 I can search for CTRP Users 
Given I am logged into CTRP 
And I have Account Approver privileges
When I select the Site Administation feature
And I enter search criteria as
|Username|
|Last Name |
|First Name |
|Email |
|Organization|
|Family|
|Site Admin Privilege|
|Status|
And I select the Search option
Then I will see a list of all CTRP Users with the same Site Affiliation as I have, that match the search criteria, listing:
|Username|
|Last Name |
|First Name |
|Email |
|Organization|
|Family|
And the list will display an indicator if the CTRP Users have Site Administrator privileges
And the list will display an indicator if the CTRP Users will receive e-mails
And the list will be ordered by Last Name and then First name
And the list can be sorted by
|Username|
|Last Name |
|First Name |
|Email |
|Organization|
|Family|
|Site Admin Privilege|
|Status|
|Status Date (Current Status Date)|

Scenario: #3 I can enter or update account information
Given I am logged into CTRP
And I have selectd a CTRP User 
When I enter or edit information in the following required fields
|Email Address |
|First Name |
|Last Name |
|Phone Number |
And I select the following required information
|Organizational Affiliation |
|Username|
|Status|
|Role|
And I enter the folowing option fields
|Middle Initial |
|PRS Organization Name |
And I select to either receive or not receive email notifications
And I select the Save option
Then the account information will be updated in CTRP

Scenario: #3 e-mail notification for user account changes
Given I am logged into CTRP
And I select the option to update a user account 
When I select or change 
|Organizational Affiliation|
|role|
|Status|
Then an e-mail "Account Activation(Site User)" will be sent to the user (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)

Scenario: #4 I can disable a CTRP Users with the same site affiliation
Given I am logged into CTRP 
And I have Account Approver privileges
When I select the option to update a user account 
And I change the status of the CTRP User to 
|Inactive|
And the CTRP User will no longer be able to access CTRP
And I will be prompted to assign ownership of the trials with an active submission that that user is currently the owner of (see admin manage ownership feature)

