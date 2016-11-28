@PA @global
Feature:  PAS F04 Outcome Measures
As a CTRP PA Abstractor, I can add, edit, copy and delete Outcome Measures 

Scenario: #1 I can add Outcome Measures for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
And I have Selected Add Button
And Add/Edit Outcome Measure screen displays
And I have selected a value for Outcome Measure Type
|Primary|
|Secondary|
|Other Pre-specified|
And I have entered a value for Title
And I have entered a value for Time Frame
And I have entered a value for Description
And I have selected a value for Safety Issue
|Yes|
|No|
When select Save
Then the Outcome Measure for the trial will be associated with the trial
And created message displays
|CreatedMessage|
|Record created|
And the Outcome Measures table will display Outcomes Measures values
|Outcome Measure Type|
|Title|
|Time Frame|
|Description|
|Safety Issue|
|Edit|
|Copy|
|Delete|
And I can add another Outcome Measure

Scenario: #2 I can edit Outcome Measures for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
And I have Selected Edit on an existing Outcome Measure 
And I have entered or edited a value for Outcome Measure Type
|Outcome Measure Type|
|Primary|
|Secondary|
|Other Pre-specified|
And I have edited a value for Title
And I have edited a value for Time Frame
And I have entered or edited a value for Description
And I have selected another value for Safety Issue
|Safety Issue|
|Yes|
|No|
When I have selected Save Then the Outcome Measure for the trial will be associated with the trial 
And the message Record Updated displays

Scenario Outline: #3 Add/Edit Outcome Measure rules
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
And I have not entered an <AddEditMeasureFieldType>
When I haved clicked on the save Button
Then The <FieldError> will be displayed

Examples:
|AddEditMeasureFieldType   |FieldError  |
|Outcome Measure Type      |Outcome Measure Type is Required|
|Title                     |Title is Required|
|Time Frame                |Time Frame is Required|
|Safety Issue              |Safety Issue is Required|

Scenario:  #4  Reorder Outcome Measures
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
And I am viewing the Outcome Measures list
When I click on a record to reorder the list
And drag it to a new sequence location in the list
Then the order of the outcome measures list changes

Scenario:  #5  Copy Outcome Measures
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
And I am viewing the Outcome Measures list to copy outcome measures
When I click on a record
And click on copy 
Then the Add/Edit Outcome Measure screen displays
And I can edit all fields 
When I click Save
Then the new Outcome Measure for the trial will be associated with the trial
And the new outcome Measure is displayed on the outcome measure list
And no changes have been made on the original outcome measure

Scenario:  #6 I can reset Outcome Measures for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
When I select Add
And I am on the Add/Edit Outcome Measures screen
And I have entered values 
When I have selected Reset at the Outcome Measures screen
Then the information entered on the Outcome Measures screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save at the Outcome Measures screen

Scenario:  #7 I can delete Outcome Measure for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
When I have selected the delete check box for an outcome measure
Then the information entered or edited on the Outcome Measures screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save the list of outcome measures screen
When I have selected Select All
Then the delete checkbox for all Outcome Measure is checked
When I select Delete
Then the information for the Outcome Measures will be deleted
And the Outcome Measures will not be saved to the trial record

Scenario: #8  Title field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
When I am entering into Title
Then information text appears below the title field to display the number of characters available to enter into the field.
|255 characters left|
 And "x characters left" will be displayed as characters are added
When 255 characters have been entered at the title field
Then no additional text can be entered at the title field

Scenario: #9  Time Frame field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
When I am entering into Time Frame field 
Then information text appears below the Time Frame field to display the number of characters available to enter into the field.  
|255 characters left|
 And "x characters left" will be displayed as characters are added
When 255 characters have been entered at the time frame field
Then no additional text can be entered at the time frame field

Scenario:  #10 Description field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
When I am entering into Description
Then information text appears below the Detailed Description field to display the number of characters available to enter into the field.  
|1000 characters left|
    And "x characters left" will be displayed as characters are added
When 1000 characters have been entered at the description field
Then no additional text can be entered at the description field