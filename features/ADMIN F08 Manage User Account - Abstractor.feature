@Admin @Global 
Feature: ADMIN F08 Manage User Account - Abstractor

As someone with Abstractor privileges (CTRP Abstractor Role or CTRP Super role),  I can manage account information

Scenario: #1 I can view all CTRP Users 
Given I am logged into CTRP 
And I have Abstractor  privileges
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
And I have Abstractor  privileges
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
Then I will see a list of all CTRP Users that match the search criteria, listing:
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
|Street Address |
|City |
|ZIP/Postal Code |
|Phone Number |
And I select the following required information
|Country |
|State |
And I enter the folowing option fields
|Middle Initial |
|PRS Organization Name |
And I select to either receive or not receive email notifications
And I select the Inactive status when the status is Active
And I can select the roles
|Trial Submitter|
|Site Administratior|
And I can select an Organizational Affiliation
And I can view
|Username|
And I select the Save option
Then the account information will be updated in CTRP

Scenario: #4 I can view a users Trials (See Admin F05 Registered User Details)
Given I am logged into CTRP
And I select the User from the list
Then And the Last Active Submission for all the trials the user is an owner of will be displayed (Protocol Trials)
And the Last Active Submission for all the trials the trials the user submitted can be displayed (Protocol and Imported Trials)
And the Last Active Submission for all the trials the user is a participating site on can be displayed (Protocol and Imported Trials)
