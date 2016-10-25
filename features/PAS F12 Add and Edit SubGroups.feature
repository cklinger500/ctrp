@PA @global
Feature: As a CTRP Abstractor, I can add and edit Subgroups Criteria (6/17/16:  Per JIRA 531 - 'Sub-group' changed to 'Subgroup')

Scenario: #1 I can add Subgroup Criteria for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Subgroups Information screen
And I have selected Add button
And the Add/Edit Subgroup Information screen displays
And I have entered a value for Label
And I have selected a value for Description
When I have selected Save
Then the Subgroup Criteria will be associated with the trial

Scenario: #2 I can edit Subgroup Information for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Subgroup Information screen
When I select the Edit icon for an existing subgroup
Then the Add/Edit Subgroup Information screen displays
And I have changed the value for Label
And I have changed the value for Description
When I have selected Save
Then the Updated Subgroup information will be associated with the trial

Scenario:  #3 Subgroup label not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Subgroup Information screen
When I select Save 
And Label is Null
Then a warning message will appear 'Label is required'

Scenario:  #4 Subgroup Description not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Subgroup Information screen
When I select Save 
And Description is Null
Then a warning message will appear 'Description is required'

Scenario: #5 Label field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Subgroup Information screen
And I am entering into Label
Then information text appears below the Label field to display the number of characters available to enter into the field.  
|62 characters left|
When 62 characters have been entered
Then no additional text can be entered

Scenario: #6 Description field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Subgroup Information screen
And I am entering into Description
Then information text appears below the Description field to display the number of characters available to enter into the field.  
|1000 characters left|
When 1000 characters have been entered
Then no additional text can be entered

Scenario:  #7  Reorder Subgroups Information
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Subgroups Information Screen
When I click on a record and drag it to a new sequence location in the table
Then the order of the Subgroup Information changes

Scenario:  #8 I can Reset Subgroup Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add Edit Subgroup Information screen
When I have selected Reset button 
Then the information entered or edited on the Add/Edit Subgroup Informtion screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.


Scenario:  #9 I can delete  a Subgroups Stratification Criteria for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Subgroup Information screen
And I can select the Delete check box for a SubGroup 
And I can select the Delete check box for another SubGroup
And I can click on the Select All button to check delete check box for all entries
When I have clicked on Delete button
And the message displays 'click OK to remove selected Marker(s) fromm the study. Click Cancel to abort'
When I have clicked the OK button
Then the SubGroup is removed from the trial record
And 'Record(s) deleted' message is displayed
When I have clicked on the Cancel button
Then the SubGroup(s) is not removed from the trial record
And 'Record(s) deleted' message is not displayed

