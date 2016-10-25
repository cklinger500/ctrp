@Admin @Global 


#On Hold- Accrual ownership to be tied to trial ownership


Feature: ADMIN F07 Accrual Access Assignment By Trial

As a CTRP User with Administration privileges, I can view and manage accrual access

Scenario: #1 I can view Accrual Submitters on trials where an organization in my Family has accrual reporting responsibility
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the View Accrual Access feature
Then CTRP will display Externally Peer-Reviewed trials where an organization in my Family is the lead organization and the submitter organization
And CTRP will display Institutional trials where an organization in my Family is the lead organization
And CTRP will display Idustrial trials where an organization in my Family is a participating site
And CTRP will display Other trials where an organization in my Family is a participating site
And the display will include:
|NCI Trial Identifier|
|Title|
|Accrual Submitter(s)|

Scenario: #2 I can assign Accrual Submitter priviledges on trials at my site
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Manage Accrual Access feature
And I select the option to Assign user access to individual trials
And I select one or more CTRP Users that are affiliated with my Site
And I select from a list of trials that are available for accrual submission at my site, displayed as:
|NCI Trial ID|
|Title|
Then the selected CTRP Users will be granted accrual access privileges for the selected trials

Scenario: #2 I can assign Accrual Submitter priviledges on all trials at my site
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Manage Accrual Access feature
And I select the option to Assign Site Submitter privileges
And I select one or more CTRP Users that are affiliated with my Site
Then the selected CTRP Users will be granted accrual access privileges for all accrual reporting at my site

Scenario: #3 I can assign Accrual Submitter priviledges on all trials for the Organizational Family
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Manage Accrual Access feature
And I select the option to Assign Organizational Family Submitter
And I select one or more CTRP Users that are affiliated with my Organizational Family
Then the selected CTRP Users will be granted accrual access privileges for all accrual reporting for the Organizational Family