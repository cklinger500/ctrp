@PO @Global
Feature: PO F13 Curator review of a Pending Person Record

  Scenario:#1 As a PO Curator, I can display all Person Records with Pending status
    Given I am logged in to the CTRP PO application
    And I am on the CTRP PO Curator Search screen
    When I select Display Pending Person Records
    Then a list of all Person Records in CTRP with a Pending Status should be displayed
    And I can sort the list by PO Person ID, Person Name, Phone Number, Email Address, Affiliated Organization, Creator Name, and Creation Date

  Scenario:#2 As a PO Curator, I can Search for Duplicate Person Records
    Given I am logged in to the CTRP PO application
    And I am on the CTRP PO Curator Review screen
    When I have selected a Pending Person Record
    Then I can search for possible duplicate Person Records by CTEP ID, Person Name, Phone Number, Email Address, and Affiliated Organization

  Scenario:#3 As a PO Curator, I can review all instances where a Person Record is referenced
    Given I am logged in to the CTRP PO application
    And I am on the CTRP PO Curator Review screen
    When I select a Pending Person Record 
    And I select the report usage option
    Then all occurrences in CTRP where the Pending Person Record are Principal Investigator on a trial will be displayed
    And all occurrences in CTRP where the Pending Person Record are Principal Investigator on a participating site will be displayed
    And all occurrences in CTRP where the Pending Person Record are Responsible Party will be displayed

  Scenario:#4 As a PO Curator, I can Activate a Pending Person Record
    Given I am logged in to the CTRP PO application
    And I am on the CTRP PO Curator Review screen
    And I have completed review of a Pending Person Record
    When I select Activate Person Record
    Then the Person Records status will be Active
    And the Person Record will be available for use in CTRP

  Scenario:#5 As a PO Curator, I can Nullify an Person Record
    Given I am logged in to the CTRP PO Application
    And I am on the CTRP PO Curator Review screen
    And I have identified two Person Records in the CTRP Context that are duplicates
    When I select one of the Person Records to be retained
    And I select the other Person Record to be nullified
    And the Person Record to be nullified does not have an Active Status
    Then all references in CTRP to the nullified Person Record will reference the retained Person Record in the field type
    
    |Trial Principle Investigator|
    |Trial co-investigators|
    |Participating Site Contact|
    |Person affiliated organization|
    |Participating site Investigator|
    |Central contact|

    And the status of the Person Record to be nullified will be "Nullified"

  Scenario:#6 As a PO Curator, I cannot Nullify a Person Record with an Active CTEP Person ID
    Given I am logged in to the CTRP PO Application
    And I am on the CTRP PO Curator Review screen
    And I have identified two Person Records that are duplicates
    When I select one of the Person Records to be retained
    And I select one of the Person Records to be nullified that has an active CTEP Context Person Record
    Then a warning will be displayed "Active CTEP Person ID"
    And the nullification process will be terminated

