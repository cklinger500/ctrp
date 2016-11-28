@Global @Reg
Feature: Reg F21 Verify Trial Data

As a CTRP User, I can verify my trial data

Scenario: #1 I search my trials and select the Verify Trial Data option
Given I am in the CTRP Registration application
And I have selected the option to search my trials in CTRP (trials where I am listed as owner)
When I select the Verify Data option on one of my trial from the trial results available actions
Then the Trial Verification Data information will be displayed including

|NCI Trial Identifier (Always display even when data is missing)|
|ClinicalTrials.gov Identifier(Always display even when data is missing) |
|Lead Organization Trial Identifier(Always display even when data is missing) |
|Official Title (Always display even when data is missing) |
|Current Verification Date (Always display even when data is missing)|

When I click on the Save Verification Record Button
And I click on the "OK" button for "Are you sure you would like to save a Data Verification record with today's date"
Then the current Verification Date will be saved with today's date
And I can view the current Verification Date displayed on the Trial Data Verification Screen

|NCI Trial Identifier|
|ClinicalTrials.gov Identifier|
|Lead Organization Trial Identifier|
|Official Title|
|Current Verification Date: 02-Sep-2016 |

  Scenario:#2 I can cancel Trial Data Verification record update
    Given I am on the Trial Data Verification Screen
     When When I click on the Save Verification Record Button
     And I click on the "Cancel" Button for "Are you sure you would like to save a Data Verification record with today's date" 
    Then the Last Verified Date will not be changed



  

