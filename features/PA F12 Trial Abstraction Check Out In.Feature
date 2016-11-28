@PA @global
Feature: PA F12 Trial Abstraction Check Out In 
Description:  As an Abstractor user, I can check out a trial for abstraction 

Scenario: #1 I can Check Out a trial for both Administration and Scientific Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check Out Both 
Then the Trial Administration and Scientific sections (listed below) will not be editible by other Abstractors until the trial is checked in
|Administrative Data (Section)|
|General Trial Details|
|Collaborators|
|Trial Status|
|Trial Funding|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Participating Sites|
|Trial Related Documents|
|NCI Specific Information|
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms/Groups|
|Eligibility Criteria|
|Associated Trials|
|Disease / Condition|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-Groups Stratification|
|Markers|
And the Check Out Type will be Administrative
And the Administrative Check Out User will be my User ID
And the Administrative Check Out Date will be the current date and time
And the Check Out Type will be Scientific
And the Scientific Check Out User will be my User ID
And the Scientific Check Out Date will be the current date and time

Scenario: #2 I can Check Out a trial for Administration Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check Out Administrative 
Then the Trial Administration sections (listed below) will not be editible by other Abstractors until the administrative sections of the trial are checked in
|Administrative Data (Section)|
|General Trial Details|
|Collaborators|
|Trial Status|
|Trial Funding|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Participating Sites|
|Trial Related Documents|
|NCI Specific Information|
And the Check Out Type will be Administrative
And the Administrative Check Out User will be my User ID
And the Administrative Check Out Date will be the current date and time


Scenario: #3 I can Check Out a trial for Scientific Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check Out Scientific 
Then the Trial Scientific sections (listed below) will not be editible by other Abstractors until the trial is checked in
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms/Groups|
|Eligibility Criteria|
|Associated Trials|
|Disease / Condition|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-GroupsStratification|
|Markers|
And the Check Out Type will be Scientific
And the Scientific Check Out User will be my User ID
And the Scientific Check Out Date will be the current date and time

Scenario: #4 I can Check In a trial from both Administration and Scientific Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And the Administrative and Scientific Abstraction Check out User is my User ID
And I have selected Check In Both 
And there are no Trial Status Warnings
And there are no Trail Abstraction Errors
Then the Trial Administration and Scientific sections (listed below) will be editible and allow Abstractors to check out the trial
|Administrative Data (Section)|
|General Trial Details|
|Collaborators|
|Trial Status|
|Trial Funding|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Participating Sites|
|Trial Related Documents|
|NCI Specific Information|
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms/Groups|
|Eligibility Criteria|
|Associated Trials|
|Disease / Condition|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-Groups Stratification|
|Markers|
And the Check In Type will be Administrative
And the Administrative Check In User will be my User ID
And the Administrative Check In Date will be the current date and time
And the Check In Type will be Scientific
And the Scientific Check In User will be my User ID
And the Scientific Check In Date will be the current date and time
And I must enter a Check In Comment
And The comment will be affilliated with the Administrative Check In 
And The comment will be affilliated with the Scientific Check In

Scenario: #5 I can Check In a trial from Administration Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And the Administrative Check out User is my User ID
And I have selected Check In Administration
And there are no Trial Status Warnings
And there are no Trail Abstraction Errors
Then the Trial Administration sections (listed below) will be editible and allow Abstractors to check out the trial
|Administrative Data (Section)|
|General Trial Details|
|Collaborators|
|Trial Status|
|Trial Funding|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Participating Sites|
|Trial Related Documents|
|NCI Specific Information|
And the Check In Type will be Administrative
And the Administrative Check In User will be my User ID
And the Administrative Check In Date will be the current date and time
And I must enter a Check In Comment
And The comment will be affilliated with the Administrative Check In 

Scenario: #6 I can Check In a trial from  Scientific Abstraction
Given I am logged into the CTRP Protocol  Scientific application
And I have selected a trial 
And the  Scientific Abstraction Check out User is my User ID
And I have selected Check In Scientific 
And there are no Trial Status Warnings
And there are no Trail Abstraction Errors
Then the Trial Scientific sections (listed below) will be editible and allow Abstractors to check out the trial
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms/Groups|
|Eligibility Criteria|
|Associated Trials|
|Disease / Condition|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-Groups Stratification|
|Markers|
And the Check In Type will be Scientific
And the Scientific Check In User will be my User ID
And the Scientific Check In Date will be the current date and time
And I must enter a Check In Comment
And The comment will be affilliated with the Scientific Check In

Scenario: #7 Check In comment required
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check In 
And I do not enter a Comment
Then the system will display the Error Message "Please enter a Check In comment"
And the trail will not be checked in

Scenario: #8 Trial Check In with Warnings and Errors
Given I am logged into the CTRP Abstraction
And I have selected a trial
And the trial has been checked out 
And there are Trial Status Warnings
And there are Trail Abstraction Errors
And I have selected Check In
Then a dialog box will be displayed to allow the user to  
|Proceed with check-in|
|View Trial Staus History|
|View Trial Abstraction Validation|
|Cancel|
When the user selects the following <button> the action will be <Action>
|<Button>|<Action>|
|Proceed with save| proceed with the check in|
|View Trial Status History|Navigate to the Trial Staus Screen for the trial|
|View Trial Abstraction Validation|Navigatle to the Trial Abstraction Validation Screen for the trial|
|Cancel|Closes the dialog box|

Scenario: #9 Trial Check In with Trial Status Warnings
Given I am logged into the CTRP Abstraction
And I have selected a trial
And the trial has been checked out 
And there are Trial Status Warnings
And there are Trail Abstraction Errors
And I have selected Check In
Then a dialog box will be displayed to allow the user to  
|Proceed with check-in|
|View Trial Status History|
|Cancel|
When the user selects the following <button> the action will be <Action>
|<Button>|<Action>|
|Proceed with save| proceed with the check in|
|View Trial Status History|Navigate to the Trial Status Screen for the trial|
|Cancel|Closes the dialog box|

Scenario: #10 Trial Check In with Errors
Given I am logged into the CTRP Abstraction
And I have selected a trial
And the trial has been checked out 
And there are Trial Status Warnings
And there are Trail Abstraction Errors
And I have selected Check In
Then a dialog box will be displayed to allow the user to  
|Proceed with check-in|
|View Trial Abstraction Validation|
|Cancel|
When the user selects the following <button> the action will be <Action>
|<Button>|<Action>|
|Proceed with save| proceed with the check in|
|View Trial Abstraction Validation|Navigatle to the Trial Abstraction Validation Screen for the trial|
|Cancel|Closes the dialog box|