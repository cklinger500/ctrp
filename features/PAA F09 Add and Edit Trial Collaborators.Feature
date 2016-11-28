@PA  @global
Feature: PAA F09 Add and Edit Trial Collaborators

As any CTRP PA User, I can add and edit Trial Collaborators

Scenario: #1 I can add a Collaborators to a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
And I can select an organization (using the Organization look-up)
Then I can select an organization from the list of organization
And the selected organization will be associated to the trail as a Trial Collaborator
And the system will list 
  |CTRP ID|
  |Name|
  |Deletion|
And the organizations will be displayed ordered ascending alphanumeric by Collaborator Name

Scenario: #2 I can edit a Collaborator for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
And the list of collaborators is displayed
Then I can edit the name of a collaborator that does not have a CTRP organization ID
And the system will list
  |CTRP ID|
  |Name|
  |Deletion|
And the edited organizations will be displayed ordered ascending alphanumeric by Collaborator Name
Then a comment appears below the Collaborators Name field to display the number of characters available to enter into the field.  
|160 characters left|
And "x characters left" will be displayed as characters are added
When 160 characters have been entered
Then no additional text can be entered


Scenario: #3 I can Delete one or more Collaborators for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When I have selected one or more collaborators
And have selected Delete Collaborator 
Then the collaborator(s) will be unassociated with the trial

Scenario: #4 Save Trial Collaborators 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When select save Collaborator
Then the information entered or edited on the Trial Collaborators screen will be saved to the trial record

Scenario: #5 Cancel Trial Collaborators
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When I select Cancel Collaborator
Then the information entered or edited on the Collaborators screen will not be saved to the trial record 
And the Trial Collaborators screen will be refreshed with the existing list of Collaborators data

