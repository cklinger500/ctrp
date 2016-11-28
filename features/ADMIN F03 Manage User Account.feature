@Admin @Global 
Feature: ADMIN F03 Manage User Account 

As someone with a CTRP User Account, I can manage my account information

Scenario: #1 I can enter or update my account information #all roles
Given I am logged into CTRP
And I select my username 
And the user account information screen is displayed for my account
When I enter or edit information in the following required fields
| Email Address |
| First Name |
| Last Name |
| Phone Number |
And I select the following required information
| Organizational Affiliation |
And I enter the following optional fields
| Middle Name |
| Phone Extension|
| PRS Organization Name |
And I select to either receive or not receive email notifications (default to Yes)
And I can view the following fields for my account
|Username|
|Status|
|Role|
And I select the Save option
Then my account information will be updated in CTRP


Scenario: #3 Change organization within Family #all roles
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
And the selected organization is in my organization Family
Then the new organization will be affilliated to my account

Scenario: #4 Admin Access for change to an organization not in my Family #SiteSU and Trail Submitter Roles
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
And the selected organization is not my organization Family
When I select save 
Then a warning message will be displayed "If you change your organization, you will lose any existing Site Admin, Report Viewing, Accrual Submission and Trial Ownership privileges and your account will be set to a Pending status requiring reauthorization"
When I select OK
Then the new organization will be affilliated to my account
And my role will be set to Trial Submitter
And my status will be set to Pending
And the system will send the "CTRP Account Request" email to appsupport for an organization change to a different family (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin) #appsupport e-mail address in back office

Scenario: #5 Admin Access for change to a different organization not associated with a family #SiteSU and Trail Submitter Roles 
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
When I select save 
Then a warning message will be displayed "If you change your organization, you will lose any existing Site Admin, Report Viewing, Accrual Submission and Trial Ownership privileges and your account will be set to a Pending status requiring reauthorization" #appsupport e-mail address in back office
When I select OK
Then the new organization will be affilliated to my account
And my role will be set to Trial Submitter
And my status will be set to Pending
And the system will send the "CTRP Account Request" email to appsupport for an organization change to a different family (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)

Scenario: #7 I can view a users Trials (See Admin F05 Registered User Details)
Given I am logged into CTRP
And I select view trials #view my trials from my profile or view this users trails from User Management Search Results Table
Then I will see the users information:
|Username|
|Last Name|
|First Name|
|Organization Affiliation|
And the Last Active Submission for all the trials the user is an owner of can be displayed (Protocol Trials)
And the Last Active Submission for all the trials the trials the user submitted can be displayed (Protocol and Imported Trials)
And the Last Active Submission for all the trials the user is a participating site on can be displayed (Protocol and Imported Trials)
And I can select the Username, Last Name, First Name to open the user's account information #scenario 1


