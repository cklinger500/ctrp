@PA @global
Feature: PAM F17 Abstraction Dashboard - Details

As a CTRP PA User, I can view and edit the CTRP Abstraction Dashboard Details

Scenario: #1 I can view trial details 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard trial details screen
Then the following fields will be displayed 
|Submission Type (Original (Information Source = Protocol and Submission number = 0) , Amendment (Information Source = Protocol and Submission number > 0), Imported (Information Source = Imported)|  
|NCI Trial Identifier|
|ClinicalTrials.gov Identifier - hyperlink to record in clinicaltrials.gov|
|CTEP ID|
|DCP ID|
|CDR ID|
|CCR ID|
|Submitting Organization|
|Submission Date|
|Amendment #|
|Clinical Research Category|
|Funding Source|
|On Hold Date (Latest)|
|Off Hold Date (for Latest on hold date)
|On Hold Resason (for Latest on hold date)
|NCI Sponsored? (Yes of sponsor - is NCI, No if sponsor is not NCI)|
|Submission Method|
|Submission Source|
|Processing Priority|
|Trial Processing Comments|
|Processing status (latest)|
|Processing status date (for latest processing status)|
|Checked Out for Admin. Use by:|
|Checked Out for Scientific Use by:|
|Milestone, Milestone Date, Milestone Creator  (for current submission)|

Scenario: #2 I can edit  the CTRP Abstraction Dashboard WorkLoad
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard trial details screen
Then I can edit the processing priority (same as trial information screen)
And I can enter trial processing comments (same as trial information screen)

Scenario: #3 I can save information in the CTRP Abstraction Dashboard WorkLoad
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard trial details screen
When I select Save
Then the information will be save to the trail  

Scenario: #4 I can reset information in the CTRP Abstraction Dashboard WorkLoad
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard trial details screen
When I select Reset
Then the information will not be saved and the screen will be refresthed with existing trial data

Scenario: #5 I can check out a trial (same as PA F11 trial abstraction check out in)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard trial details screen
And I select one of the check out buttons
|Admin Check Out Button|
|Scientific Check Out Button|
|Admin and Scientific Check Out Button|
Then that section of the trial record will be locked by my user account for editing
And my user name will be displayed in the check out field
|Checked out for Admin Use by - Admin Check Out Button|
|Checked out for Scientific Use by - Scientific Check Out Button|
|Checked out for Admin. Use and Checked out for Scientific Use by – Admin. And Scientific Check Out Button|
And that button will be a check in button
|Admin Check In Button|
|Scientific Check Out Button|
|Admin. And Scientific Check In Button|

Scenario: #6 I can check in a trial (same as PA F11 trial abstraction check out in)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard trial details screen 
When I select one of the check in buttons
|Admin Check In Button|
|Scientific Check In Button|
|Admin and Scientific Check In Button|
Then a check in comment box will be displayed
And I enter a comment 
And select enter
And my check in comment, my user name and the date and time will be recorded
And that section of the trial record will be unlocked for other to check out and edit

Scenario: #7 I can select Check out history
Given I am logged into the CTRP Protocol Abstraction application
And I Select Check out history
Then the trial overview section will be displayed 
And the trial Identificaiton section will be displayed  

Scenario: #8 I can select Validate
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard trial details screen
And the latest trial milestone is "Submission Received Date"
And I have selected Validate
Then the trail validaiton sidebar menu will be displayed
And the trial overview section will be displayed 
And the trial Identificaiton section will be displayed 

Scenario: #9 I can select Absract
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard trial details screen
And the latest trial milestone is not "Submission Received Date"
And I have selected Validate
Then the trail abstraction sidebar menu will be displayed
And the trial overview section will be displayed 
And the trial Identificaiton section will be displayed  

Scenario: #10 I can select View TSR
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard trial details screen
And I have selected View TSR
Then the TSR will be dispalyed for the trial



