@Global @PA

Feature: PA F16 Sidebar Menu

Description:  As any CTRP User, I can view the menus for my role

Scenario: #1 Abstaction Sidebar Menu Tabs
Given I am logged into the CTRP application
And I have selected a trial to abstract
And the current milestone for the last active submission is
|Submission Acceptance Date|
|Administrative Processing Start Date|
|Administrative Processing Completed Date|
|Ready for Administrative QC Date|
|Administrative QC Start Date|
|Administrative QC Completed Date|
|Scientific Processing Start Date|
|Scientific Processing Completion Date|
|Ready for Scientific QC Date|
|Scientific QC Start Date|
|Scientific QC Completed Date|
|Ready for TSR Date|
|Trial Summary Report Date|
|Submitter Trial Summary Report Feedback Date|
|Initial Abstraction Verified Date|
|On-going Abstraction Verified Date|
Then the sidebar menu will be displayed expanded:
|NCI Trial ID: <Current Trial ID>|
|Trial Overview (Section)|
|Trial Identification|
|Trial History|
|Trial Milestones|
|On Hold Info|
|View TSR|
|Assign Ownership|
|Check Out History|
|Administrative Data (Section)|
|General Trial Details|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Trial Status|
|Trial Funding|
|Participating Sites|
|Collaborators|
|Trial Related Documents|
|NCI Specific Information|
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms/Groups|
|Eligibility Criteria|
|Associated Trials|
|Diseases / Conditions|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-Groups Stratification|
|Biomarkers|
|Completion (Section)|
|Abstraction Validation|
|Results Information|

Scenario: #2 Abstaction Sidebar Menu Tabs collapsed
Given I am logged into the CTRP application
And I have selected a trial
And I have selected the unexpand arrow on the Trial Abstraction menu item
Then the sidebar menu will collapse displayed the section headers:
|NCI Trial ID: <Current Trial ID>|
|Trial Overview|
|Administrative Data|
|Scientific Data|
|Completion|

Scenario: #3 Expand Abstaction Sidebar Menu Tab
Given I am logged into the CTRP application
And I have selected a trial
And the side bar is collapsed
And I have selected the expand arrow on the Trial Abstraction menu item
Then the sidebar menu will be fully expanded collapse displayed the section headers:
|NCI Trial ID: <Current Trial ID>|
|Trial Overview|
|Administrative Data|
|Scientific Data|
|Completion|

Scenario: #4 Expand Abstaction Sidebar Menu Tab sections
Given I am logged into the CTRP application
And I have selected a trial to abstract
And the side bar is collapsed
And I have selected the expand arrow on the the side bar section
Then that sidebar menu section will be expanded"
|NCI Trial ID: <Current Trial ID>|
|Trial Overview|
|Administrative Data|
|Scientific Data|
|Completion|

Scenario: #5 Trial Validation Sidebar Menu Tab for Imported trails
Given I am logged into the CTRP application
And I have selected a trial to Validate
And the current milestone for the last active submission is
|Submission Received Date|
|Validation Processing Start Date|
|Validation Processing Completed Date|
And the trial information source is
|Imported|
Then the sidebar menu will be displayed expanded:
|NCI Trial ID: <Current Trial ID>|
|Trial Overview (Section)|
|Trial Identification|
|Trial History|
|Trial Milestones|
|On Hold Info|
|View TSR|
|Assign Ownership|
|Check Out History|
|Administrative Data (Section)|
|General Trial Details|
|Participating Sites|
|NCI Specific Information|
|Trial Validation (section)|
|Submission Validation|

Scenario: #6 Trial Validation Sidebar Menu Tab for Protocol trials
Given I am logged into the CTRP application
And I have selected a trial to Validate
And the current milestone for the last active submission is
|Submission Received Date|
|Validation Processing Start Date|
|Validation Processing Completed Date|
And the trial information source is
|Protocol|
Then the sidebar menu will be displayed expanded:
|NCI Trial ID: <Current Trial ID>|
|Trial Overview (Section)|
|Trial Identification|
|Trial History|
|Trial Milestones|
|On Hold Info|
|View TSR|
|Assign Ownership|
|Check Out History|
|Administrative Data (Section)|
|General Trial Details|
|Regulatory Information - FDAAA|
|Regulatory Information - IND/IDE|
|Trial Status|
|Trial Funding|
|Trial Related Documents|
|NCI Specific Information|
|Trial Validation (section)|
|Submission Validation|

Scenario: #7 Trial Sidebar Menu for rejected trials
Given I am logged into the CTRP application
And I have selected a trial
And the current milestone is
|Submission Terminated Date|
|Late Rejection Date|
And the trial information source is
|Protocol|
Then the sidebar menu will be displayed expanded:
|NCI Trial ID: <Current Trial ID>|
|Trial Overview (Section)|
|Trial Identification|
|Trial History|
|Trial Milestones|
|On Hold Info|
|View TSR|
|Assign Ownership|
|Check Out History|

Scenario: #8 Trial Sidebar Menu for Submission Reactivated Trials
Given I am logged into the CTRP application
And I have selected a trial
And the current milestone is
|Submission Reactivated Date|
Then the milesone to be used for determining the sidebar menu will the be the latest milestone prior to Submission Terminated Date milestone 

Scenario: #9 Trial Sidebar Menu for Submission Rejection Trials
Given I am logged into the CTRP application
And I have selected a trial
And the current milestone for the last active submission is
|Submission Rejection Date|
When the submission is an amendment
Then the milesone to be used for determining the sidebar menu will the latest milestone in the prior active Submission  
When the submission is the original
Then the milesone to be used for determining the sidebar menu will the latest milestone prior to the Submission Rejection Date Milestone



