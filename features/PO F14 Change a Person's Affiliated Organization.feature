@PO @Global
Feature: PO F14 Change a Person's Affiliated Organization

  Scenario:#1 As a Po Curator, I can Update a Person Record Organizational Affiliation information
    Given I know which person's organizational affiliation I want to change
    And I am logged in to CTRP PO application
    And I have searched for a Person record 
    When I have selected a Person to edit
    Then the Edit person screen displays
    And I can update a Person's Affiliated Organization with Effective Date and Expiration Date and save it
    Then the Person record Affiliated Organization information should be updated
   



