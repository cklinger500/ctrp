@PA @global
Feature: As a CTRP Abstractor, I can add and edit Arms 

Scenario: #1 I can add Arm/Group for an Interventional trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with Clinical Research Category "Interventional"
And I am on the Arms/Groups screen
And I have entered a value for Label
And I have selected a value for <Type>
|Type|
|Experimental|
|Active Comparator|
|Placebo Comparator|
|Sham Comparator |
|No intervention |
|Other|
And I have entered a value for Description
And I have selected a value for Assignment in Intervention Assignment
When I have selected Save
Then the Arm Details for the Interventional Trial will be associated with the trial
And the Arm details will display on the Arms/Group screen


      |Label	  |
      |Type  |
      |Description  |
      |Assigned Interventions  |
      |Edit  |
      |Delete  |


Scenario: #2 I can Edit an Arm for an Interventional trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with Clinical Research Category "Interventional"
And I am on the Arms/Groups screen
And I have clicked on the Edit icon for a specific Arm
And the Edit Arm/Group details display for editing 
And I have entered a different value for  Label
And I have selected a different value for Type
And I have entered a different value for Description
And I have selected a different value for Assignment in Intervention Assignment
When I have selected Save
Then the updated Arm Details for the Interventional Trial will be associated with the trial
And the updated Arm details will display on the Arms/Group screen

Scenario: #3 I can add a Arms/Group for an Observational or Ancillary-Correlative trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with Clinical Research Category type "Observational" or "Ancillary-Correlative"
And I am on the Arms/Groups screen
And I have entered a value for Label
And I have entered a value for Description
And I have selected a value for Assignment in Intervention Assignment table
When I have selected Save
Then the Group Details for the Observational/Ancillary-Correlative Trial will be associated with the trial
And the Group details will display on the Arms/Group screen
      |Label	  |
      |Description  |
      |Assigned Interventions  |
      |Edit  |
      |Delete  |


Scenario: #4 I can Edit a Group for an Observational or Ancillary-Correlative trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with Clinical Research Category type "Observational" or "Ancillary-Correlative" 
And I am on the Arms/Groups screen
And I have clicked on the Edit icon for a specific Group
And the Edit Arm/Group details display for editing 
And I have entered a different value for Label
And I have entered a different value for Description
And I have selected a different value for Assignment in Intervention Assignment
When I have selected Save
Then the updated Group Details for the Observational/Ancillary-Correlative Trial will be associated with the trial
And the Group details will display on the Arms/Group screen

Scenario:  #5 Label not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Arms/Group screen
When I select Save 
And Label is Null
Then an error message will appear 'Label is Required' 

Scenario:  #6 Type is not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with clinical research category = interventional
And I am on the Arm/Group screen
When I select Save 
And Type is Null
Then an error message will appear 'Type is Required' 

Scenario:  #7 Description is not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Arms/Group screen
When I select Save 
And Description is Null
Then an error message will appear 'Description is Required' 

Scenario: #8 Label field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Arm/Group Screen
And I am entering into Label
Then information text appears below the Label field to display the number of characters available to enter into the field.  
|62 characters left|
When 62 characters have been entered
Then no additional text can be entered

Scenario: #9 Description field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Arm/Group Screen
And I am entering into “Description”
Then information text appears below the Description field to display the number of characters available to enter into the field.  
|1000 characters left|
When 1000 characters have been entered
Then no additional text can be entered

Scenario:  #10  Reorder Arm/Group
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Arm/Group Screen
And I am viewing the Arm/Group table
And I click on a record and drag it to a new sequence location in the table
Then the order of the Arm/Group changes.

Scenario:  #11 I can delete Arm/Group for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Arm/Group screen
When I have selected the Delete check box for a specific Arm/Group(s)
And have clicked on Delete button
And the message displays 'click OK to remove selected Arm/Group(s) from the study. Click Cancel to abort'
And I have clicked on OK
Then the Arm/Group(s) is removed from the trial record
When I have Clicked the Select All button
Then the Delete check box is checked for all entries
When I have clicked on Delete button
And the message displays 'click OK to remove selected Arm/Group(s) form the study. Click Cancel to abort'
And I have clicked on  OK
Then the Arm/Group(s) is removed from the trial record

Scenario:  #12 I can reset Arm/Group Details for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Arm/Group screen
When I have selected Reset
Then the information entered or edited on the Add Arm/Group screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.

Scenario:  #13 I can enter duplicateArm/Group for a Trial
Given I am on the Arm/Group screen for a trial
When I have entered a duplicate Arm/Group Label or Description
And have clicked the Save button
Then  the message displays ‘Click OK to add a duplicate Arm/Group  Click Cancel to abort’ 
When I select OK button
Then the duplicate arm/group is saved to the trial record
And the message 'Record Updated' displays
When I select Cancel button
Then the duplicate arm/group is not saved to the trial record 

