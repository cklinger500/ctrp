@PA @global
Feature: PAA F04 Add and Edit Regulatory Information Human Subject Safety

As any CTRP PA User, I can add and edit Regulatory Information � Human Subject Safety

Scenario: #1 I can add and edit Regulatory Information - Human Subject Safety for a Regulated Trial with board status approved
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When from the Board Approval Status I have selected the � Approved� from the list of:
  |Select a status|
  |Approved|
  |Pending|
  |Exempt|
  |Denied|
  |Not required|
  
And I have entered a Board Approval Number
And I have entered a Board Name
And I have selected a Board Affiliation using the organization lookup
Then the Board Approval Status , Board Approval Number, Board Name, Board Affiliation will be associated with the trial along with the Board Affiliation�s address (street, city, state, zip, country), Phone # and e-mail address

Scenario: #2 I can add and edit Regulatory Information - Human Subject Safety for a Regulated Trial with board status pending, board status denied, or board status exempt
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When I have selected either of the Board Approval Status� of � Pending�, � Denied�, or � Exempt� from the list of:
  |Select a status|
  |Approved|
  |Pending|
  |Exempt|
  |Denied|
  |Not required|
 
And I have entered a Board Name
And I have selected a Board Affiliation using the organization lookup
Then the Board Approval Status , Board Name, Board Affiliation will be associated with the trial along with the Board Affiliation�s address (street, city, state, zip, country), Phone # and e-mail address

Scenario: #3 I can add and edit Regulatory Information - Human Subject Safety for a Regulated Trial with board status of Not Required
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When from the Board Approval Status I have selected the Not Required� from the list of:
 |Select a status|
  |Approved|
  |Pending|
  |Exempt|
  |Denied|
  |Not required|
  
Then the Board Approval Status will be associated with the trial

Scenario: #4 Save Regulatory Information - Human Subject Safety 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When select save at the Regulatory Information� Human Subject Safety screen
Then the information entered or edited on the Regulatory Information - Human Subject Safety screen will be saved to the trial record

Scenario: #5 Cancel Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When I select Reset
Then the information entered or edited on the Regulatory Information - Human Subject Safety screen will not be saved to the trial record 
And the Regulatory Information� Human Subject Safety screen will be refreshed with the existing data

Scenario: #6 Regulatory Information - Human Subject Safety screen Information must be complete for status of approved
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When I have selected a Board Approval Status of �Submitted, Approved�
And the trial is not Imported (Trials.internal_source_id Internal_Sources.name is not "imported")
And I have not entered an Approval Number
And I have not entered a Board Name
And I have not selected a Board Affiliation 
And selected Save at the Regulatory Information� Human Subject Safety screen
Then the system will display an Error that Approval Number, Board Name, Board Affiliation must be entered in order to associate the Regulatory Information - Human Subject Safety Information for the trial

Scenario: #7 Regulatory Information - Human Subject Safety screen Information must be complete � �Submitted, Pending�, �Submitted. Denied�, or �Submitted, Exempt�
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When I have selected either of the Board Approval Status� of �Submitted, Pending�, �Submitted. Denied�, or �Submitted, Exempt�
And the trial is not Imported
And I have not entered a Board Name
And I have not selected a Board Affiliation
And selected Save at the Regulatory Information� Human Subject Safety screen
Then the system will display an Error that Board Name and Board Affiliation must be entered in order to associate the Regulatory Information - Human Subject Safety Information for the trial




Scenario Outline: #9 Hide non required fields for  Regulatory Information - Human Subject Safety
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When from the Board Approval Status I have selected the following <Status> from the list of:
Then the following fields <Board Approval Status>, <Board Approval Number>, <Board Affiliation and Address>, <Board Name> will be displayed:

Examples:
|Status                 |Board Approval Status|Board Approval Number|Board Affiliation and Address|Board Name|
|Select a status        |Displayed            |Hidden  		        |Hidden                       |Hidden    |
|Approved               |Displayed            |Displayed            |Displayed                    |Displayed |
|Exempt                 |Displayed            |Hidden               |Displayed                    |Displayed |
|Pending                |Displayed            |Hidden               |Displayed                    |Displayed |
|Denied                 |Displayed            |Hidden               |Displayed                    |Displayed |
|Not required           |Displayed            |Hidden               |Hidden                       |Hidden    |


#Scenario: #10 PA Regulatory Information � Human Subject Safety Board Name field character count
#Given I am logged into the CTRP Protocol Abstraction application
#And I am on the Regulatory Information � Human Subject Safety Screen
#Then a comment appears below the Board Name field to display the number of characters available to enter into the field.  
#|160 characters left|
#And "x characters left" will be displayed as characters are added
#When 160 characters have been entered
#Then no additional text can be entered
