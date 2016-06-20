@Admin @Global 
Feature: ADMIN F03 Manage User Account

As someone with a CTRP User Account, I can manage my account information

Scenario: #1 I can enter or update my account information
Given I am logged into CTRP
And I select my username 
And the user account information screen is displayed for my account
When I enter or edit information in the following required fields
| Email Address |
| First Name |
| Last Name |
| Street Address |
| City |
| ZIP/Postal Code |
| Phone Number |
And I select the following required information
| Country |
| State |
| Organizational Affiliation |
And I enter the folowing option fields
| Middle Initial |
| PRS Organization Name |
And I select to either receive or not receive email notifications
And I can view the following fields for my account
|Username|
|Domain|
|Status|
|Role|
And I select the Save option
Then my account information will be updated in CTRP

Scenario: #2 I can request Administrative Access privileges
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select the option to request Admin Access
And the system will send an email to the site Admin(s) for the organization family for the organization that is selected for my account

Scenario: #3 Admin Access for change in an organization in Family
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
And the selected organiziton is in my organization Family
Then the new organization will be affilliated to my account

Scenario: #4 Admin Access for change in an organization not in my Family
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
And the selected organiziton is not my organization Family
Then the new organization will be affilliated to my account
And my role will be set to Trial Submitter
And my status will be set to Pending
And the system will send an email to the site Admin(s) for the organization family for the organization that is selected for my account

Scenario: #5 Admin Access for change in an organization 
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
Then the new organization will be affilliated to my account
And my role will be set to Trial Submitter
And my status will be set to Pending
And the system will send an email to the site Admin(s) for the organization family for the organization that is selected for my account

Scenario: #6 I can view a users Trials
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed (Protocol Trials)
And All the trials the user submitted will be displayed (Protocol and Imported Trials)
And All the trials the user is a participationg site on will be displayed (Protocol and Imported Trials)

Scenario: #7 I can view a users Trials - Owned
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed (Protocol Trials)including the following fields:
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
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated)|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
|Action - View TSR|
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
|On Hold Reasons|
|On Hold Dates|
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
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|


Scenario: #8 I can view a users Trials - Submitted
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed (Protocol and Imported Trials)including the following fields:
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
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated)|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
|Action - View TSR|
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
|On Hold Reasons|
|On Hold Dates|
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
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|


Scenario: #9 I can view a users Trials - Participating Sites
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is a a participating site on will be displayed (Protocol and Imported Trials)including the following fields:
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
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated)|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
|Action - View TSR|
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
|On Hold Reasons|
|On Hold Dates|
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
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|

Scenario: #10 I can view the trial details - Site Admin and Site User 
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed
And All the trials the user is a participating site on will be displayed
And I select a trial
Then the trial information will be displayed for the selected trial (Reg F25 View Clinical Trails) 

Scenario: #11 I can view the trial details - CTRP User (CTRP-RO, Account Approver, Abstractor, Curator, Super, Admin)
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed
And All the trials the user is a participating site on will be displayed
And I select a trial
Then the system will open the trial abstraction/validation screens for the trial 
And the side bar menu will be displayed for the trial
And the trial overview section will be displayed

Scenario: #12 Paging
Given I am logged into CTRP 
And I select the Registered User Details
And I can select a user
And the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And the trial list will be paginated
And All the trials the user submitted will be displayed
And the list will be paginated
And All the trials the user is a participating site on will be displayed
And the list will be paginated
       