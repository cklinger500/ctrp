@PA @global
Feature: PAA F07 Add and Edit Trial Funding

As any CTRP PA User, I can add and edit a grant and its information

Scenario: #1 I can indicate that the trial does not have an associated grant
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I have selected trial
And I am on the Trial Funding Screen
When I have selected "No" for the NCI Grant question "Is this trial funded by a NCI Grant?"
Then the FDAAA required Grant Information for the trial will not be complete

Scenario: #2 I can indicate that the trial has one or more associated grant
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I have selected trial
And I am on the Trial Funding Screen
And I have selected "Yes" for the NCI Grant question "Is this trial funded by a NCI Grant?"
When I have selected the Funding Mechanism from a list
And I have selected the Institute Code from a list
And I have selected the NCI Division/Program Code from a list
And I have look for the funding mechanism serial number and entered the serial number
Then the FDAAA required Grant Information for the trial will be complete

Scenario: #3 I can enter the NCI Grant information for one or more trials using a Grant Serial Number look-up
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I have selected trial
And I am on the Trial Funding Screen
And I have selected "Yes" for the NCI Grant question "Is this trial funded by a NCI Grant?"
When I have selected the Funding Mechanism from a list
And I have selected the Institute Code from a list
And I have selected the NCI Division/Program Code from a list
And I have entered a partial Grant Serial Number
Then CTRP will search the IMPACII database view of Grant Information for serial numbers that contain the institute code and partial Grant Serial Number
And CTRP will display Grant Serial Number, Organization, Project Title, and Contact Principal Investigator that match the partial Grant Serial Number
And I can select from the Grant Serial Numbers displayed or I can enter a different Grant Serial Number
And the FDAAA required Grant Information for the trial will be complete

Scenario: #4 I can delete one or more grants that are associated with trial
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I have selected a trial
And I am on the Trial Funding Screen
When I have selected one or more grants 
And I selected delete grants
And I entered a comment for why the grant(s) were deleted
Then the selected Grant Information for the trial will listed as deleted grants for the trials along with the Comment, Date of deletion, and user name of the user that deleted the grant 

Scenario: #5 Save Trial Funding Information
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I am on the Trial Funding screen
When I select Save grants
Then the information entered or edited on the Trial Funding screen will be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #6 PA Grant Deletion Comments field character count
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I am on the Trial Grant Screen
Then a comment appears below the Why Grant Deleted Comments field to display the number of characters available to enter into the field.  
|160 characters left|

Scenario: #7 Grant Information not null
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I am on the Trial Funding screen
When I select save
And any of the following are Null
|Funding Mechanism|
|Institute Code|
|NCI Division/Program Code|
|Grant Serial Number|
Then a warning message will appear for the null values with the message �Grant Information is Required�

Scenario: #8 Is this trial funded by a NCI Grant? Update
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I have selected trial
And I am on the Trial Funding Screen
When I have change the selected from �Yes� to "No" for the question "Is this trial funded by a NCI Grant?"
And there are one or more grants listed with this trial
Then a message will appear �This trial has one or more associated grants�

Scenario: #9 Save Trial Funding Information
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I am on the Trial Funding screen
When select Save
And the Trial is Funded by an NCI Grant
And no grant is listed
Then a message will appear �Grant Information is Required�

Scenario: #10 I must enter a comment when I delete a grant
Given I am logged into the CTRP Protocol Abstraction application to abstract
And I have selected a trial
And I am on the Trial Funding Screen
When I have selected one or more grants 
And selected delete
And have not entered a comment for why the grant(s) were deleted
Then the system will display a warning �Reason for Deleting the Grant is Required�
