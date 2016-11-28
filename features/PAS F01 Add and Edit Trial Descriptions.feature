@PA @global
Feature:  PAS F01 Add and Edit Trial descriptions 
As a CTRP PA Abstractor, I can add and edit Trial Descriptions 

Scenario: #1 I can add and edit Trial Description for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
And I have entered a value for Brief Title
And I have entered a value for Brief Summary
And I have entered a value for Objectives
And I have entered a value for Detailed Description
When I select the Save button 
Then the Trial Description for the trial will be associated with the trial
And the message Record Updated displays

Scenario: #2 Brief Title is not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with a Information Source is 'Protocol'
And I am on the Trial Description screen
And information text appears above the Brief Title field as 'Mandatory at Abstraction Validation'
When Brief Title is null 
And I select the Save button
Then an error message will appear with the message “Brief Title is Required”

Scenario: #3 Brief Summary is not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with a Information Source is 'Protocol'
And I am on the Trial Description screen
And information text appears above the Brief Summary field as 'Mandatory at Abstraction Validation'
When Brief Summary is null
And I select the Save button
Then an error message will appear with the message “Summary is Required”

Scenario:  #4 I can reset Trial Description screen for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
Then the information entered or edited on the Trial Description screen will not be saved to the trial record
When I have selected Reset
And the screen will be refreshed with the data since the last save

Scenario: #5  Brief Title field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
And I am entering into Brief Title
Then information text appears below the Brief Title field will display the number of characters available to enter into the field  
|300 characters left|
When 300 characters have been entered
Then no additional text can be entered

Scenario: #6  Brief Summary field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
And I start typing into Brief Summary
Then the character left provided below the Brief Summary field will start to decrement  
|5000 characters left|
When 5000 characters have been entered into Brief Summary
Then no additional text can be entered inti Brief Summary

Scenario:  #7  Detailed Description field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
When I start typing into the Detailed Description field
Then the limited characters provided below the Detailed Description field will start to decrement
|32000 characters left|
When 32000 characters have been entered into Detailed Description
Then no additional text can be entered into Detailed Description

Scenario:  #8  Objectives field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
When I start typing into Objectives field
Then the limited characters provided below the Objectives field will will start to decrement  
|32000 characters left|
When 32000 characters have been entered into Objectives
Then no additional text can be entered into Objectives

