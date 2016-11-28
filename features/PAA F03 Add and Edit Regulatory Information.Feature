@PA @global
Feature: PAA F03 Add and Edit Regulatory Information

As any CTRP PA User, I can add and edit Regulatory Information (FDAAA)

Scenario: #1 I can define the Responsible Party Type as either the Sponsor, Principal Investigator, or Sponsor-Investigator
Given I have selected a trial to abstract the Regulatory Information FDAAA
And I am on the Trial Regulatory Information screen
When I select the Responsible Party Type from a list of options as:
  |-Select a Responsible Party-|
  |Sponsor|
  |Principal Investigator|
  |Sponsor-Investigator|
Then the selected value will be recorded as the Responsible Party Type

Scenario: #2 I can select an Investigator when the Responsible Party is the Sponsor-Investigator
Given I have selected a trial to abstract the Regulatory Information FDAAA
And I am on the Trial Regulatory Information screen
When the Responsible Party Type is Sponsor-Investigator
And I have performed a person search
And I have selected a person as the Investigator
Then the person selected will be recorded as the Investigator for the Sponsor-Investigator Responsible Party 
And the Sponsor Organization will be recorded as the Investigator�s Affiliation Organization

Scenario: #3 I can define the Investigator�s Title
Given I have selected a trial to abstract the Regulatory Information FDAAA
And I am on the Trial Regulatory Information screen
When I enter the Title for the Investigator (Field will be prefilled with �Principal Investigator�)
Then the selected value will be recorded as the Responsible Party Type with the Principal Investigator title
Then a comment appears below the Investigator Title field to display the number of characters available to enter into the field.  
|254 characters left|
And "x characters left" will be displayed as characters are added
When 254 characters have been entered
Then no additional text can be entered



Scenario: #4 I can associate an organization as an Affiliation of the Investigator
Given I have selected a trial to abstract the Regulatory Information FDAAA
And I am on the Trial Regulatory Information screen
And I have selected an organization as an Affiliation of the Investigator (defaulted to Sponsor Organization)
And the Responsible Party Type is Principal Investigator
And I have selected organization look-up at the Responsible Party section
When list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
Then the selected organization will be the Affiliation of the Investigator for the trial
And the investigator affiliation should not exceed 160 characters 

Scenario: #5 I can add and edit Regulatory Information for a Regulated Trial
Given I have selected a trial to abstract the Regulatory Information FDAAA
And I am on the Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected one or more Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
And I can select "yes", "No", "NA" FDA Regulated Intervention Indicator
And I can select "Yes", "No", "NA" for Section 801 Indicator
And I can select "Yes", "No", "NA" for Data Monitoring Committee Appointed Indicator
Then the required Regulatory Information for the trial will be associated with the trial

Scenario: #6 I can add and edit Regulatory Information for a non-Regulated Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from a list of all the Trial Oversight Authority Countries
And I have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
And I have selected "No" for FDA Regulated Intervention Indicator
And I have selected "Yes", "No", "N/A" for Data Monitoring Committee Appointed Indicator
Then the required Regulatory Information for the trial will be associated
And the Section 801 Indicator will be associated as "No"

Scenario: #7 I can add and edit Regulatory Information for a Regulated Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from the list of all Trial Oversight Authority Countries
And I have selected one or more Trial Oversight Authority Organization Names from the list based on the selected Trial Oversight Authority Country
And I have selected FDA Regulated Intervention Indicator as "Yes"
Then I have the option to select "Yes", "No" for Section 801 Indicator

Scenario: #8 Save Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information screen
When select save at the Regulatory Information FDAAA screen
Then the information entered or edited on the Regulatory Information screen will be saved to the trial record

Scenario: #9 Cancel Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information screen
When I select Reset at the Regulatory Information FDAAA screen
Then the information entered or edited on the Regulatory Information screen will not be saved to the trial record 
And the screen will be refreshed with the existing Regulatory Information FDAAA data

Scenario: #10 Investigator is not null
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
And the Responsible Party Type is �Sponsor Investigator�
And the Investigator is Null
When I select save to verify warning message
Then a warning message will appear �Investigator is Required�

Scenario: #11 Investigator Title is not null
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
And the Responsible Party Type is �Sponsor Investigator�
And the Investigator Title is Null
When I select save to verify warning message
Then a warning message will appear �Investigator Title is Required�

Scenario: #12 Investigator Affiliation is not null
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
And the Responsible Party Type is �Principal Investigator�
And the Investigator Affiliation is Null
When I select save to verify warning message
Then a warning message will appear �Investigator Affiliation is Required�

Scenario: #13 "Upload from NCI CTRP" Note
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
Then the label should be displayed below the Trial Regulatory Information section header
|The information in this section is REQUIRED to enable "Upload from NCI CTRP" in ClinicalTrials.gov:|
And ClinicalTrials.gov it a link to 
|https://clinicaltrials.gov|

Scenario: #14 Can not have a duplicate trial Oversight Authority Country and Trial Oversight Authority Organization
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information screen
And I have selected a Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected a Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
When I select a Trial Oversight Authority Country and Trial Oversight Authority Organization that has already been associated with this trial
Then a warning message will appear �The Trial Oversight Authority Country and Trial Oversight Authority Organization has already been selected.�

Scenario Outline: #15 Warning for null fields on the Trial Regulatory Information screen
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information screen
And any of the following fields <fields> are null
When I select save to verify warning message
Then the following Warning messages <Warning message> will appear and the information associated with the trial will be associated with the trial

Examples:
|fields                              |Warning message               |
|Responsible Party Type              |Responsible Party Types required for Upload to ClinicalTrials.gov|
|Trial Oversight Authority Country   |Trial Oversight Authority Country is required for Upload to ClinicalTrials.gov|
|Trial Oversight Authority           |Trial Oversight Authority is required for Upload to ClinicalTrials.gov|
|FDA Regulated Intervention Indicator|FDA Regulated Intervention Indicator is required for Upload to ClinicalTrials.gov|
|Section 801 Indicator               |Section 801 Indicator is required for Upload to ClinicalTrials.gov|
