@Global @Reg
Feature: Reg F02 View Persons

As any CTRP User, I am able to View Existing Persons


Scenario: #1 I am able to view existing person in CTRP as a Registry user
  Given  Given I am a CTRP user with the the Role Type
     
     |Trial Submitter|
     |Site Administrator: Site SU|
     
  And I am logged into the CTRP Registration application
  And the following parameters of a Person exist:
    |Prefix|PersonFirstName|PersonMiddleName|PersonLastName|Suffix|SourceContext|SourceID|SourceStatus |email |phone|OrgAffiliation|
    |Ms|shiFNameTrRegF02 vw|shiMNameTrial |shiLNameTrial |Suffix|CTRP|shiSID|Active |shiPercukeTrial@pr.com| 420-999-8906|ShiOrg|
  And I have completed a person search 
  When I have cliked on the name of the person I want to view
  Then the View Person screen opens with the page title as "View Person"
  And I will view person details type
      |Prefix  | Ms|
      |First Name  | shiFNameTrRegF02 vw|
      |Middle Name  | shiMNameTrial     |
      |Last Name  | shiLNameTrial  |
      |Suffix  | Suffix|
      |Source Context  | CTRP|
      |Source ID  | shiSID|
      |Source Status  |Active|
      |Email  |shiPercukeTrial@pr.com| 
      |Phone Number  |420-999-8906|
      |Org Affiliation|ShiOrg|
      
And I should not be allowed to edit person parameters
And I should not be allowed to delete a person
And I should not view, edit or delete comments added by curators
And the "Add Affiliated Organization: Search Organizations" button should be invisible to the user
And the following button type should also be invisible to the user

      |Delete This Person Button  |
      |Reset Button  |
      |Save Button  |

