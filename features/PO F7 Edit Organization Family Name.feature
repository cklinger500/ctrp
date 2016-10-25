Feature: PO F7 Edit Organization Family Name

  Background:
    Given I am logged in to CTRP PO application
    And  I select the option to edit Organization Family

  Scenario Outline: #1 As a PO Curator, I am able to edit a Organization Family
    Given I am on the PO Application
    And I complete a family search
    When I have selected family name to edit
    Then the Edit family screen will display
    And I have changed the family name < Family Name>
    And I have changed the family status <family status>
    And I have changed the family type <family Type>
    And I save the Family information
    Then the Updated family parameters will be updated in the family record

    Scenario: #2 Reset Button Functionality
    Given I am on the Edit Family screen
     When I have edited family parameters
     And I click on the Reset button
     Then The edited information will not saved  
     And the edit family paramaters will be refreshed  with the last committed values for the selected organization
     


  