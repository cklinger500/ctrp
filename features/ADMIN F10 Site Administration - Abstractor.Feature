@Admin @Global  
Feature: ADMIN F10 Site Administration - Abstractor

As a CTRP User with Abstractor, Super, Admin, Account Approver roles, I can grant Site Administrator roles to CTRP Users

Scenario: #1 I can view CTRP Users (with roles:  CTRP-RO, Abstractor, Super, Admin, Account Approver)
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
|Status Date (Current status date)|

Scenario: #2 I can search for CTRP Users (with the roles: CTRP-RO, Abstractor, Super, Admin, Account Approver)
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
|Status Date (Current status date)|

Scenario: #3 I can enable Site Administrative role for CTRP Trial Submitters (with the roles: Abstractor, Super, Admin, Account Approver)
Given I am logged into CTRP 
When I select the Site Administration feature
And I will see a list of all CTRP Users 
When I select a site user
Then the CTRP system will display the user profile for the CTRP User
And I can change the privileges for the CTRP User to 
|Site Administrator|
And the CTRP User will be able to access the Administrative features in CTRP
And an e-mail "Account Activation(Site User)" will be sent to the user (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)

Scenario: #4 I can disable Site Administrative role for CTRP Site Administrators (with the roles: Abstractor, Super, Admin, Account Approver)
Given I am logged into CTRP 
When I select the Site Administration feature
And I will see a list of all CTRP Users with the same Site Affiliation as I have 
When I select a site user
Then the CTRP system will display the user profile for the CTRP User
And I can change the privileges for the CTRP User to 
|Trial Submitter|
And the CTRP User will not have access the Site Administrative features in CTRP

Scenario: #5 I can inactivate a Trial Submitter (with the roles: Abstractor, Super, Admin, Account Approver)
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
Then the system will open the trial management screen to allow the site admin to reassign the trials (Feature Admin F06)
And the trials displayed will be for selected user
And the account will not be inactivated


Scenario: #6 Change site affiliation (with the roles: Abstractor, Super, Admin, Account Approver)
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
And the user account status will be Active 
When I select Transfer Ownership
Then the system will open the trial management screen to reassign the trials with an active submission (Feature Admin F06)
And the trials displayed with an active submission will be for selected user
And the new organization will be assigned to the user

