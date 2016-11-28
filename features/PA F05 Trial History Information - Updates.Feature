@PA @global
Feature: PA F05 Trial History Information - Updates.Feature

As any CTRP PA User, I can View and Acknowledge Trial History Information for Updates

Scenario: #1 I can view Trial History Information for Updates
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Updates Screen
Then I can view the Trial History Information each Update for a trial ordered by date with newest update first:
|Submission Number|
|Update Date|
|Update Source|
|Updated Field|
|Old Value|
|New Value|
|Action (Acknowledge)|
|Comment|
|Update Acknowledgment Date|
|Last Name, First Name (of reviewer)|

Scenario: #2 I can Acknowledge Protocol Trial Updates
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information Updates Screen
And the Acknowledge is displayed
When I select the action "Acknowledge"
Then the Trail will be acknowledged 
And the date of acknowledgement will be recorded
And the User ID will be recorded
And I can optionally add a Comment

Scenario: #3 I can Acknowledge Imported Trail Updates 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information Updates Screen
And the Acknowledge is displayed
When I select the action "Acknowledge "
Then the trial will be acknowledged 
And the date of acknowledgement will be recorded
And the User ID will be recorded
And I can optionally add a Comment

Scenario: #4 Protocol trial acknowledgement
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And the information source is "Protocol"
And any of the following fields of for a trial update were updated
|Other Protocol Identifiers|
|Grant Information|
|trial status|
|trial status date|
|start date
|Start date type|
|Primary Completion Date
|Primary Completion Date Type|
|completion date
|completion date type|
|Trial Related Documents|
And I am on the Trial History Information for Updates Screen
Then the Action fields will display "Acknowledge"
And the trial update will need to be acknowledged

Scenario: #5 Imported trial acknowledgement
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And the information source is "Imported"
And the trial was updated
And any of the following fields of interest were updated
|Trials.Brief_Title|
|Trials.Official_Title|
|eligibility criteria (multiple) other_criteria.criteria_type, other_criteria.criteria_desc |
|arms_groups (multiple) arms_groups.label,type, description|
And I am on the Trial History Information for Updates Screen
Then the Action fields will display "Acknowledge"
And the trial update will need to be acknowledged


 Scenario: #6 Paging
      Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a Trial
      And I am on the Trial History Information Update Screen
      Then the Update history will be displayed for the trial 
      And the list will be paginated  

