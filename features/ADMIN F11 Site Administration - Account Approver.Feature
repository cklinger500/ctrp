@Admin @Global  
Feature: ADMIN F11 Site Administration - Account Approver

As a CTRP User with Admin role or Account Approver role, I can grant Site Administrator privileges to CTRP Users

Scenario: #1 I can view CTRP Users with the roles: Admin, Account Approver
Given I am logged into CTRP 
When I select the Site Administration feature (User Management)
Then I will see a list of all CTRP Users 
|Username|
|First Name |
|Last Name |
|Email |
|Organizational Affiliation |
|Organization Family|
|display an indicator if the CTRP Users have Site Administrator privileges |
|display an indicator if the CTRP Users will receive e-mails|
|Status|
|Status Date (Current Status Date)|

Scenario: #2 I can search for CTRP Users with the roles: Admin, Account Approver
Given I am logged into CTRP 
When I select the Site Administration feature (User Management)
And I enter search criteria as
|Username|
|Last Name |
|First Name |
|Email |
|Organization (using the organization Type Ahead)|
|Family|
|Site Admin Privilege|
|Status|
And I select the Search option
Then I will see a list of all CTRP Users
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

Scenario: #3 I can enable Site Administrative privileges for CTRP Trial Submitters with the roles: Admin, Account Approver
Given I am logged into CTRP 
When I select the Site Administration feature
And I will see a list of all CTRP Users 
When I select a site user
Then the CTRP system will display the user profile for the CTRP User
And I can change the privileges for the CTRP User to 
|Site Administrator|
And the CTRP User will be able to access the Administrative features in CTRP
And the "Account Activation(Site User)" e-mail will be sent to the user (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)
 
Scenario: #4 I can disable Site Administrative privileges for CTRP Site Administrators with the roles: Admin, Account Approver
Given I am logged into CTRP 
When I select the Site Administration feature
And I will see a list of all CTRP Users with the same Site Affiliation as I have 
When I select a site user
Then the CTRP system will display the user profile for the CTRP User
And I can change the privileges for the CTRP User to 
|Trial Submitter|
And the CTRP User will not have access the Site Administrative features in CTRP
And the "Account Activation(Site User)" e-mail will be sent to the user (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)

Scenario: #5 I can inactivate a Trial Submitter with the roles: Admin, Account Approver
Given I am logged into CTRP 
When I select the Site Administration feature
And I select a site user
Then the CTRP system will display the user profile for the CTRP User
And I can change the status to inactive
And the system will display a warning message that "The User will no longer be able to access CTRP"
And the system will determine if the user is an owner of any trials with an active submission
And display the message that "The trial(s) owned by this user will need to be reassigned to a new owner"
And the system will display the following action buttons
|Save without transferring ownership|
|Transfer ownership|
When I can Select Save without Transferring ownership
Then the account will be inactivated
And the trials with an active submission owned by the user will have their ownership expired
When I select Transfer Ownership
Then the system will open the trial management screen to allow the site admin to reassign the trials with an active submission(Feature Admin F06)
And the trials displayed will be for selected user
And the account will not be inactivated


Scenario: #6 Change site affiliation with the roles: Admin, Account Approver
Given I am logged into CTRP 
When I select the Site Administration feature (User Management)
Then I will see a list of all CTRP Users 
And I select a user
Then the CTRP system will display the user profile for the CTRP User
And I can change the organization affiliation for the CTRP User to a different organization by selecting organization look up
And the system will determine if the user is an owner of any trials with an active submission
And display the message that "The trial(s) owned by this user will need to be reassigned to a new owner"
And the system will display the following action buttons
|Save without transferring ownership|
|Transfer ownership|
When I can Select Save without Transferring ownership
Then the new organization will be assigned to the user
And the Account Activation(Site User) e-mail will be sent to the user
And the user account status will be Active 
When I select Transfer Ownership
Then the system will open the trial management screen to reassign the trials with an active submission(Feature Admin F06)
And the trials with an active submission wil be displayed for selected user
And the new organization will be assigned to the user

Scenario: #6 I can view a users Trials (See Admin F05 Registered User Details)
Given I am logged into CTRP
And I select the User from the list
Then And the Last Active Submission for all the trials the user is an owner of can be displayed (Protocol Trials)
And the Last Active Submission for all the trials the trials the user submitted can be displayed (Protocol and Imported Trials)
And the Last Active Submission for all the trials the user is a participating site on can be displayed (Protocol and Imported Trials)
