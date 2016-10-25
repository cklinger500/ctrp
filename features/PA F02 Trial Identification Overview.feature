@PA  @global
Feature: PA F02 Trail Identification Overview
Description:  As any CTRP PA User, I can view the Trail Identification Overview and check out a trial for abstraction with the appropriate role

Scenario: #1 I can view the Trail Overview and the Trial Identification for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
Then the Trail Identification Overview and the Trial Identification sections will be displayed

Scenario: #2 I can view the Trail Overview for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
Then the Trail Identification Overview and the Trial Identification sections will be displayed 
And the Trail Overview for the last active submission for a Trial will include the following fields:
|NCI ID|
|Brief Title|
|NCT ID|
|Lead Organization|
|Lead Organization Trial ID|
|Amendment Number|
|Submission Method|
|Principal Investigator|
|Last Submitter|
|Last Submitter Organization|
|Clinical Research Category|
|Amendment Date|
|Last Updated by - last user to update the trial|
|Last Updated Date � last date any data for a trial was updated|
|Current Trial Status|
|Current Trial Status Date|
|Processing Status (for the last active submission)|
|Checked Out For Admin. Use By|
|Checked Out For Scientific Use By|
|Admin Check Out Button|
|Scientific Check Out Button|
|Admin and Scientific Check Out Button|
|Information Source (Trials.internal_source_id Internal_Sources.name )|
|Data Table 4 Funding Source|

Scenario: #3 I can view the Lead Organization for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identifications will be displayed 
And I select the Lead Organization for a Trial
Then the details for the Lead Organization will be displayed (from PO Organization)

Scenario: #4 I can view the Principal Investigator for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identifications will be displayed 
And I select the Principal Investigator for a Trial
Then the details for the Principal Investigator will be displayed (from PO Person)

Scenario: #5 I can view the Last Submitter for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identifications will be displayed 
And I select the Last Submitter for a Trial
Then the details for the Last Submitter will be displayed (from User Account Details)

Scenario: #6 I can view the Last Submitter Organization for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identifications will be displayed 
And I select the Last Submitter Organization for a Trial
Then the details for the Organization will be displayed (from PO Organization)

Scenario: #7 I can check out a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identifications will be displayed 
And I select one of the check out buttons
|Admin Check Out Button|
|Scientific Check Out Button|
|Admin and Scientific Check Out Button|
Then that section of the trial record will be locked by my user account for editing
And my user name will be displayed in the check out field
|Checked out for Admin Use by - Admin Check Out Button|
|Checked out for Scientific Use by - Scientific Check Out Button|
| Checked out for Admin. Use and Checked out for Scientific Use by � Admin. And Scientific Check Out Button|
And that button will be a check in button
|Admin Check In Button|
|Scientific Check Out Button|
|Admin. And Scientific Check In Button|

Scenario: #8 I can check in a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identifications will be displayed 
When I select one of the check in buttons
|Admin Check In Button|
|Scientific Check In Button|
|Admin and Scientific Check In Button|
Then a check in comment box will be displayed
And I enter a comment 
And select enter
And my check in comment, my user name and the date and time will be recorded
And that section of the trial record will be unlocked for other to check out and edit

Scenario: #9 Check out history
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identifications will be displayed 
And I select one of the check in buttons
|Admin Check In Button|
|Scientific Check In Button|
|Admin and Scientific Check In Button|
Then my user name and date will be recorded in the trial check out history. 

Scenario: #10 I can open the ClinicalTrails.gov record for the Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And the Trail Identification Overview and is displayed 
And I select the NCT ID
Then an new browser window is openend displaying the trail record in ClinicalTrials.gov
|https://clinicaltrials.gov/ct2/show/NCT01783171 where NCT01783171 is the NCT ID|


