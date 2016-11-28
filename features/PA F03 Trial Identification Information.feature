@PA @global
Feature: PA F03 Trail Identification Information
Description:  As any CTRP PA User, I can view the Trail Identification Information and add a priority and processing comments with the appropriate role

Scenario: #1 I can view the Trail Overview and the Trial Identification Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
Then the Trail Identification Overview and the Trial Identification sections will be displayed

Scenario: #2 I can view the Trail Identification Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
Then the Trail Identification Overview and the Trial Identification Information sections will be displayed 
And the Trial Identification Information for the last active submission for the Trial will include the following fields:
|NCI ID|
|Lead Organization Trial ID (Lead Protocol ID)|
|Other Trial Identifiers (source: Protocol_ID_Source_ID and ID: Protocol_ID)|
|Last Verification Date|
|Submission Source|
|Official Title|
|Processing Priority|
|Comments|

Scenario: #3 I can edit Trail Identification Information priority and comments for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identification Information will be displayed 
And I can select and edit the Processing Priority 
And I can Add or edit a comment
Then I can select Save and the changes will be associated with the record

Scenario: #4 I can edit Trail Identification Information priority and comments for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identification Information will be displayed 
And I can select and edit the Processing Priority 
|1- High|
|2-Normal|
|3-Low|
And I can Add or edit a comment
Then I can select Cancel and the changes will not be associated with the record 
And the trail information will be displayed

Scenario: #5 I can return to the search results page
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Trail Identification Overview
And the Trail Identification Overview and the Trial Identification Information will be displayed 
Then I can select Back to Search Results and any changes will not be associated with the record 
And the search Results Screen will be displayed
