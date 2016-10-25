@Admin @Global 
Feature: ADMIN F05 Display Trial Ownership (Registered User Details) 

As a CTRP User I view registered user details

Scenario: #1 I can view Registered User Details - CTRP-RO, Abstractor, Super, Admin
Given I am logged into CTRP
And I select the Registered User Details
Then I will see a list of all CTRP Users:
|Username, Last Name, First Name, Organization Affiliation, Family|
And I can select a user
And the user's profile can be be displayed (See feature Admin F03 Manage user Account)
And the Last Active Submission for all the trials the user is an owner of will be displayed (Protocol Trials)
And the Last Active Submission for all the trials the trials the user submitted will be displayed (Protocol and Imported Trials)
And the Last Active Submission for all the trials the user is a participating site on will be displayed (Protocol and Imported Trials)

Scenario: #1a I can view Registered User Details as a Site Administrator
Given I am logged into CTRP
And I select the Registered User Details
Then I will see a list of all CTRP Users in my Family:
|Username, Last Name, First Name, Organization Affiliation, Family|
And I can select a user
And the user's profile can be be displayed (See feature Admin F03 Manage user Account)
And the Last Active Submission for all the trials the user is an owner of will be displayed (Protocol Trials)
And the Last Active Submission for all the trials the trials the user submitted will be displayed (Protocol and Imported Trials)
And the Last Active Submission for all the trials the user is a participating site on will be displayed (Protocol and Imported Trials)

Scenario: #1b I can view Registered User Details as a Site Trial Submitter
Given I am logged into CTRP
And I select the Registered User Details
Then I will only see my name in the list of CTRP Users:
|Username, Last Name, First Name, Organization Affiliation, Family|
And I can select a user
And the user's profile can be be displayed (See feature Admin F03 Manage user Account)
And the Last Active Submission for all the trials the user is an owner of will be displayed (Protocol Trials)
And the Last Active Submission for all the trials the trials the user submitted will be displayed (Protocol and Imported Trials)
And the Last Active Submission for all the trials the user is a participating site on will be displayed (Protocol and Imported Trials


Scenario: #2 I can search for a Registered User 
Given I am logged into CTRP
And I select the Registered User Details
And I will see a list of all CTRP Users:
| Username, Last Name, First Name, Organization Affiliation, Family|
And I can select a user
And I can search for a user by the following fields:
|Username|
|Last Name|
|First Name|
|Organization |
|Organization Family|


Scenario: #3 I can view a users Trials - Owned 
Given I am logged into CTRP
And I select the User from the list
Then the Last Active Submission for all the trials the user is an owner of will be displayed (Protocol Trials) including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
|On Hold Reason (current)|
|On Hold Date (current)|
|current Submission Type (O for Original, A for Amendment, U for Updated)|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
And the default sort order will be by NCI ID with the newest trial ID first
And I can sort the trials by the fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
|On Hold Reason (current)|
|On Hold Date (current)|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
And I can export the list of owned trials to Excel including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|



Scenario: #4 I can view a users Trials - Submitted 
Given I am logged into CTRP
And I select the User from the list
Then the Last Active Submission for all the trials the user is a submitter will be displayed (Protocol and Imported Trials)including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
|On Hold Reason (current)|
|On Hold Date (current)|
|current Submission Type (O for Original, A for Amendment, U for Updated)|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
And the default sort order will be by NCI ID with the newest trial ID first
And I can sort the trials by the fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
|On Hold Reason (current)|
|On Hold Date (current)|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
And I can export the list of owned trials to Excel including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
|On Hold Reason (current)|
|On Hold Date (current)|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by

Scenario: #5 I can view a users Trials - Participating Sites 
Given I am logged into CTRP
And I select the User from the list
Then the Last Active Submission for the user for all the trials user is a participating site on will be displayed (Protocol and Imported Trials)including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Trial Sub-type|
|Record Verification Date|
|On Hold Reason (current)|
|On Hold Date (current)|
|current Submission Type (O for Original, A for Amendment, U for Updated)|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
And the default sort order will be by NCI ID with the newest trial ID first
And I can sort the trials by the fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Trial Sub-type|
|Record Verification Date|
|On Hold Reason (current)|
|On Hold Date (current)|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
And I can export the list of owned trials to Excel including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Trial Sub-type|
|Record Verification Date|
|On Hold Reason (current)|
|On Hold Date (current)|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|


Scenario: #6 I can view the trial details - Site User (Site Admin and Site User) 
Given I am logged into CTRP
And I select the User from the list
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed
And All the trials the user is a participating site on will be displayed
And I select a trial
Then the trial information will be displayed for the selected trial (Reg F25 View Clinical Trails) 

Scenario: #7 I can view the trial details - CTRP User (CTRP-RO, Account Approver, Abstractor, Curator, Super, Admin)
Given I am logged into CTRP
And I select the User from the list
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed
And All the trials the user is a participating site on will be displayed
And I select a trial
Then the system will open the trial abstraction/validation screens for the trial 
And the side bar menu will be displayed for the trial
And the trial overview section will be displayed
And the trial information Identification section will be displayed

Scenario: #8 Paging
Given I am logged into CTRP 
And I select the Registered User Details
And I can select a user
And All the trials the user is an owner of will be displayed
And the trial list will be paginated
And All the trials the user submitted will be displayed
And the list will be paginated
And All the trials the user is a participating site on will be displayed
And the list will be paginated
