@PA @global
Feature: PA F08 On Hold Information
Description:  As any CTRP PA User, I can place a trail on hold and view the on hold history

Scenario: #1 I can View On Hold Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
Then the trial On Hold Information will be displayed and include the following fields ordered accending by On Hold Date/Time (oldest Date first):
|On Hold Reason |
|On Hold Reason Description|
|On Hold Date|
|Off Hold Date|

Scenario: #2 I can place a trial on On Hold 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And I have selected Add to place a trial on hold
When I Select the On Hold Reason Code from the list:
|Submission Incomplete|
|Submission Incomplete -- Missing Documents| 
|Submission Invalid Grant |
|Submission Other (Submitter)|
|Pending CTRO Review |
|Pending Disease Curation |
|Pending Person Curation |
|Pending Organization Curation|
|Pending Intervention Curation|
|Pending Other (CTRO)| 
And I enter a Reason Description
And I the will be the current Date
Then I can select save to place the trail on hold
And the trial processing status will be set On Hold
When the On Hold Reason Code is:
|Submission Incomplete|
|Submission Incomplete -- Missing Documents| 
|Submission Invalid Grant |
|Submission Other (Submitter)|
Then an e-mail "On Hold Trial (Original Notice)" will be sent to the trial owners for the on hold reason (Email list in the shared drive under Functional/PA: CTRP System Generated Emails)


Scenario: #3 Required fields for On Hold Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And I have not entered the field
And Selected Save
Then an error message will appear that "The On Hold Reason must be entered to place trial on hold"

Scenario: #4 PA On Hold Reason note
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Add Trial On Hold Information Screen
Then a comment appears below the On Hold Reason field �Pending� Reasons are for the CTRO, �Submission� Reasons are for the Submitter

Scenario: #5 PA On Hold Reason Description field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Add Trial On Hold Information Screen
Then a comment appears below the On Hold Reason Description field to display the number of characters available to enter into the field.  
|4000 characters left|
And "x characters left" will be displayed as characters are added
 When all the characters mentioned above for field have been entered
 Then no additional text can be entered


Scenario: #6 I can take a trial off Hold 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And I have selected edit to edit the trial on hold status
And I enter the off hold date
And I select Save
Then I the trail will no longer be on hold
And the trial processing status will be set to the processing status when the trail was placed on hold 

Scenario: #7 Off Hold Date Validaiton
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And I have entered an Off Hold Date
And Selected Save
When the Off hold date is a future date
Then an error message will appear that the "Off-hold dates must be only past or current dates."
When the Off hold date preceeds the on hold date
Then an error message will appear that the "Off-hold dates must be the same or after the on-hold dates."

Scenario: #8 Only 1 on hold at a time 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And the trial is On Hold
And the trial has an on hold date
Then I will not be able to add another on hold until the trial is off hold
And the trial has an Off Hold date

Scenario: #9 I cannot place a trial on On Hold when it is rejected
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And the trial is rejected (Late Rejection Date milestone or Submission Rejection Date milesonte with no active submssion)|
Then I can not place the trial on hold




