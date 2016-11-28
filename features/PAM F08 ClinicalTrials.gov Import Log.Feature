@PA @global
Feature: PAM F08 ClinicalTrials.gov Import Log

As a CTRP PA User, I can view  the CTRP ClinicalTrials.gov Import Log

Scenario: #1 I can Search the ClinicalTrials.gov Import Log 
 Given I am logged into the CTRP Protocol Abstraction application
 And I am on the ClinicalTrials.gov Import Log section
 And I can enter official title
 And I can enter the NCT ID
 And I can enter the NCI ID
 And I can select the submitter (username)
 And I can select the action
|New Trial (submission number =1)|
|Update    (submission number >1)|
 And I can select the import status
|Sucess|
|Failure|
And I can select a start date (last action of either new trail import or update)
And I can select an end date (last action of either new trail import or update)
And I can select an Acknowledgement Status (check boxes)
|Acknowledgement Pending|
|Acknowledgement Performed|
And I select Search

Then the following fields will be will displayed for each trial
|NCI Trial Identifier|
|NCT Trial Identifier|
|Official Title|
|Last Action (New Trial, Update)|
|Last Submitted by (Userame for new trial, CTRP System Account for update)|
|Last Action Time/Date|
|Last Import Status(Null, Success, Failure)|#(see list of Failure Errors in Reg F16 Import Trial and import restservice and Batch update)
|Acknowledgement Status|#NA, Pending, Performed
And the default order will be by NCI ID with the most recent NCI ID First
And I can sort the search results by the following fields
|NCI Trial Identifier|
|NCT Trial Identifier|
|Last Action |
|Last Submitted by (Userame for new trial, CTRP System Account for update)|
|Last Action Time/Date|
|Last Import Status|
|Acknowledgement Status|

Scenario: #2 I can select Reset
 Given I am logged into the CTRP Protocol Abstraction application
 And I am on the ClinicalTrials.gov Import Log
 And I select Reset
 Then the searh fields will be reset

Scenario: #3 I can export the ClinicalTrials.gov Import Log 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the ClinicalTrials.gov Import Log
When I select the export to Excel option
Then the trials in the ClinicalTrials.gov Import Log will be exported to an Excel format spreadsheet and include the following fields 
|NCI Trial Identifier|
|NCT Trial Identifier|
|Official Title|
|Last Action (New Trial, Update)|
|Last Submitted by (Userame for new trial, CTRP System Account for update)|
|Last Action Time/Date|
|Last Import Status (Null, Success, Failure))|
|Acknowledgement Status|

Scenario: #4 I can open the abstraction section by selecting the NCI ID 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the ClinicalTrials.gov Import Log
And I have selected the Trial NCT ID
Then the trail abstraction sidebar menu will be displayed
And the trial overview section will be displayed 
And the trial history - Updates section will be displayed

Scenario: #5 I can open the ClinicalTrails.gov record for the Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the ClinicalTrials.gov Import Log
And I have selected the Trial NCT ID 
Then a new browser window is openend displaying the trail record in ClinicalTrials.gov
|https://clinicaltrials.gov/ct2/show/NCT01783171 where NCT01783171 is the NCT ID|

Scenario: #6 I can view the trial import history
Given I am logged into the CTRP Protocol Abstraction application
And I am on the ClinicalTrials.gov Import Log
And I have selected the trial Last Action
Then the detailed trial import history will be displayed for the trial and include the following summary fields
|NCI Trial Identifier|
|NCT Trial Identifier|
|Official Title|
And include the following detailed fields #Grid
|Last Action (New Trial, Update, Acknowledgement)|
|Last Submitted by (Userame for new trial, CTRP System Account for update)|
|Last Action Time/Date|
|Last Import Status (Null, Success, Failure))|
|Acknowledgements Status|
And the default order will be by Last Action Time/Date with the most recent Date/Time First
And I can sort the search results by the following fields
|Last Action (New Trial, Update)|
|Last Submitted by (Userame for new trial, CTRP System Account for update)|
|Last Action Time/Date|
|Last Import Status (Null, Success, Failure))|
|Acknowledgements Status|

Scenario: #7 I can export the ClinicalTrials.gov trial details action Log 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the ClinicalTrials.gov Import Log
And I have seleted the trial Last Action for a trial
When I select the export to Excel option
Then the trial import action details log will be exported to an Excel format spreadsheet and include the following fields 
|NCI Trial Identifier|
|NCT Trial Identifier|
|Last Action (New Trial, Update, Acknowledgement)|
|Last Submitted by (Userame for new trial, CTRP System Account for update)|
|Last Action Time/Date|
|Last Import Status Null, Success, Failure))|
|Acknowledgements Status|

Scenario: #8 Imported trial acknowledgement #NOTE: This would be from Reg F16 Import Trial and import restservice and Batch update
Given I am logged into the CTRP Protocol Abstraction application
And the information source is "Imported"
When any of the following fields of interest were updated
|Trials.Brief_Title|
|Trials.Official_Title|
|eligibility criteria (multiple) other_criteria.criteria_type, other_criteria.criteria_desc |
|arms_groups (multiple) arms_groups.label,type, description|
Then the trail will require to be acknowledged


Scenario: #9 Paging
 Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
And I am on the ClinicalTrials.gov Import Log
And select search
Then the search results will display a list of the trials 
And the trial list will be paganiated  








