@PA @global
Feature:   PAS F05 Add and Edit Eligibility Criteria 
As a CTRP Scientific Abstractor, I can add, edit and Delete Eligibility Criteria

Scenario: #1 I can add and edit Eligibility Criteria for an Interventional trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with clinical research category of interventional
And I am on the Eligibility Criteria screen
And I have selected Accepts Healthy Volunteers 
|Accepts Healthy Volunteers|
|Yes |
|No|
And I have selected Gender
|Gender|
|Male|
|Female|
|Both|
And I have entered a value for ‘Minimum Age’
And I have selected Units
|Units|
|Years|
|Months|
|Days|
|Hours|
|Minutes|
And I have entered a value for ‘Maximum Age’
And I have selected ‘Units’
When I have selected Save
Then Eligibility Criteria will be associated with the interventional trial

Scenario: #2  I can add and edit Eligibility Criteria for an Observational trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with clinical research category of observational
And I am on the Eligibility Criteria screen
And I have selected Accepts Healthy Volunteers 
|Accepts Healthy Volunteers|
|Yes |
|No|
And I have selected Gender
|Gender|
|Male|
|Female|
|Both|
And I have entered a value for Minimum Age
And I have selected Units
|Units|
|Years|
|Months|
|Days|
|Hours|
|Minutes|
And I have entered a value for Maximum Age
And I have selected Units
And I have selected a value for Sampling Method
|Sampling Method|
|Probability Sample|
|Non-Probability Sample|
And I have entered a value for Study Population Description
When I have selected Save
Then Eligibility Criteria will be associated with the observational trial

Scenario: #3  I can add and edit Eligibility Criteria for an Ancillary Correlative trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with clinical research category of Ancillary Correlative
And I am on the Eligibility Criteria screen
And I have selected Accepts Healthy Volunteers 
|Accepts Healthy Volunteers|
|Yes |
|No|
And I have selected Gender
|Gender|
|Male|
|Female|
|Both|
And I have entered a value for Minimum Age
And I have selected Units
|Units|
|Years|
|Months|
|Days|
|Hours|
|Minutes|
And I have entered a value for Maximum Age
And I have selected Units
And I have selected a value for Sampling Method
|Sampling Method|
|Probability Sample|
|Non-Probability Sample|
And I have entered a value for Study Population Description
When I have selected Save
Then Eligibility Criteria will be associated with the ancillary correlative trial

Scenario:  #4 Minimum Age is not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criteria screen
And Min age and Unit is Null
When I select Save 
Then an error message will appear for the null values with the message “Age and Unit are Required.  Enter 0 if no min age is indicated and select ‘Years’ as Unit" 
 
Scenario:  #5 Maximum Age is not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criteria screen
And Maximum Age and Unit is Null
When I select Save 
Then an error message will appear for the null values with the message “ Age and Unit are Required.  Enter 999 if no max age is indicated and select ‘Years’ as Unit 

Scenario:  #6 Accept Healthy Volunteers not Null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criteria screen
And Accepts Healthy Volunteers is Null
When I select Save 
Then an error message will appear "'Accepts Healthy Volunteers' is Required"

Scenario:  #7 Gender not Null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criteria screen
And Gender is Null
When I select Save 
Then an error message will appear 'Gender is Required'

Scenario:  #8 Sampling Method for observational or ancillary correlative trial not Null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a observational or ancillary correlative trial 
And I am on the Eligibility Criteria screen
And Sampling Method is Null
When I select Save 
Then an error message will appear “Sampling Method is Required”

Scenario:  #9 Study Population Description for observational or ancillary correlative trial not Null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a observational or ancillary correlative trial 
And I am on the Eligibility Criteria screen
And Study Population Description is Null
When I select Save 
Then an error message will appear “Study Population is Required”

Scenario: #9'  Study Population Description character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Eligibility Criteria Screen
When I am typing into the Study Polulation Description Field
Then information text appears below the Study Polulation Description Field to display the number of characters available to enter into the field 
|1000 characters left|
When 1000 characters have been entered
Then no additional text can be entered

Scenario: #10  Add Inclusion Criteria
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Eligibility Criteria screen
And I have entered the Eligibility Criteria
And I have saved the Eligibility Criteria
When I have selected the Add Inclusion Criterion button 
Then the Add/Edit Eligibility screen displays 
And Eligibility Criterion Type is defaulted to Inclusion
And I have entered a value in Eligibility Criterion Description
When I have selected Save
Then the Inclusion Eligibility Criteria will be Displayed as

      |Eligibility Criterion Type  |
      |Eligibility Criterion Description  |


And ‘Record Created’ message displays

Scenario: #11  Add Exclusion Criteria
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Eligibility Criteria screen
And I have entered the Eligibility Criteria
And I have saved the Eligibility Criteria
When I have selected the Add Exclusion Criterion button 
Then the Add/Edit Eligibility screen displays 
And Eligibility Criterion Type is defaulted to Exclusion
And I have entered a value in Eligibility Criterion Description
When I have selected Save
Then the Exclusion Eligibility Criteria will be displayed

      |Eligibility Criterion Type  |
      |Eligibility Criterion Description  | 

And ‘Record Created’ message displays

Scenario: #12  Edit  Other Criteria
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Eligibility Criteria screen
When I select Edit for any eligibility Criteria 
Then the Add/Edit Eligibility screen displays 
And I can edit eligibility criterion type
And I can edit eligibility criterion description 
When I have selected Save
Then the updated Eligibility Criteria will be associated with the trial
And the eligibility screen displays with the updated other criteria
And the message Record Updated displays

Scenario: #13  Enter Duplicate Eligibility Criteria
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Add/Edit Eligibility screen
When I enter a duplicate eligibility Criterion 
And I select the Save button 
Then  the message displays ‘Click OK to add a duplicate Eligibility Criterion Description.  Click Cancel to abort’ 
When I select OK button
Then the duplicate eligibility criterion is saved to the trial record
And the message Record Updated displays
When I select Cancel button
Then the duplicate eligibility criterion is not saved to the trial record 

Scenario:  #14 Character display for Eligibility Criterion Description
    Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
      And I am on the Add/Edit Eligibility Criteria screen
  When I am entering text for Eligibility Criteria Description
   Then information text appears below the Eligibility Criteria Description field to display the number of characters available to enter into the field.
|5000 characters left|
 And "x characters left" will be displayed as characters are added
When 5000 characters have been entered into the Eligibility Criteria Description field
Then no additional text can be entered at the Eligibility Criteria Description field  
 And a cumulative message displays with the Total Character of all Eligibility Criterion Descriptions that have been saved 
     "Total characters for all 'Other Criteria is x"   

Scenario:  #15 I can Delete Eligibility Criterion for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criterion screen
When I have selected the Delete check box for one or more eligibility criteria 
And I have clicked on the delete Criterion Button
And the message displays 'click OK to remove selected eligibility criteria(s) fromm the study. Click Cancel to abort'
When I have clicked on OK
Then the Eligibility Criterion (s) is removed from the trial record
When I have clicked on Cancel
Then the Eligibility Criterion will not be deleted

  Scenario: #16 I can delete all Eligibility Criterion for a Trial
    Given I am logged into the CTRP Protocol Abstraction Application
    And I am on the Eligibility Criteria Screen
    When I click on the Select All Button on the Other Criteria section
    Then the Delete check box is checked for all entries
    When I have clicked on Delete Criterion button
   Then the message displays 'click OK to remove selected eligibility criteria(s) form the study. Click Cancel to abort'
    When I click on the OK button 
    Then the eligibility criteria(s) is removed from the trial record
    And the message ‘Record(s) deleted’ displays
    When I have clicked on the cancel button 
    Then the eligibility criteria is not removed 
    And no message displays


Scenario:  #17 I can reset on the Add/Edit Eligibility Criteria screen
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Eligibility Criteria screen
And I have updated the Eligibility Criteria 
When I select the Reset button 
Then the Eligibility Criteria that was entered or updated will not be saved to the trial record
And the screen will be refreshed with data since the last save
And the Add/Edit Eligibility Criteria screen displays

Scenario:  #18  Reorder Eligibility Criteria
Given I am on the Eligibility Criteria screen
And I am viewing the Eligibility Criteria  table
When I click on a record 
And drag it to a new sequence location in the table
Then the order of the Eligibility Criteria changes
