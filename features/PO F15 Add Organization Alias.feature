@PO @Global
Feature: PO F15 Add Organization Alias

  Scenario:#1 As a Po Curator, I can add an organization name alias
    Given I know the name of the alias I wish to add for an organization
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I enter the alias name of the organization I wish to add for the selected organization
    And I select the Add button
    When I select Save button
    Then the system should add the alias name to the list of alias names for the selected organization

  Scenario:#2 As a Po Curator, I can delete an organization name alias
    Given I know the name of the alias I wish to delete for an organization
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I select the alias name of the organization I wish to delete from the list of alias names
    And I submit my request
    Then the system should delete the alias name from the list of alias names for the selected organization
