@PO @Global
Feature: PO F12 Delete Person record

  Scenario:#1 As a PO Curator, I can Delete a Person record with no Trial Record associations
    Given I know which Person Record I want to delete
    And I am logged in to CTRP PO application
    And I have searched for a Person Record and found the one I wish to delete
    When I have selected the function Delete Person Record
    And I submit my delete request
    And there are no occurrences of the Person Record in use in CTRP
    Then the system will delete the Person Record

  Scenario:#2 As a PO Curator, I cannot Delete Person Records with Trial Record associations
    Given I know which Person Record I want to delete
    And I am logged in to CTRP PO application
    And I have searched for a Person Record
    And there are occurrences of the Person Record as a Principle Investigator on a trial
    And there are occurrences of the Person Record as a Principle Investigator on a participating site
    Then the Delete operation will fail and the message "This person cannot be deleted" will be displayed

