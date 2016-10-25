Feature: PO F7 Create Organization Family Name

  Background:
    Given I am logged in to CTRP PO application
    And  I select the option to add Organization Family

  Scenario Outline: #1 As a PO Curator, I am able to create a new Family name
    Given I am on the Add family screen
    And I have entered a new family name <family Name>
    And I have entered a family status <family status>
    And I have entered a family type <family Type>
    And the Membership size will be blank until family membership is added
    And I have added a family membership by searching organizations
    When the family membership is added
    Then the membership size will be populated to reflect the number of added organizations to the family
    When I save the family information
    Then a new family name <family Name> with family status <family status> and  family type <family Type> will be created and return result <result>
    When the entered family Name exists in the system
    Then  a Warning displays "Family exists in the database. Please verify and create a new Family record."
    
    Examples:
      |family Name                    |family Type         |family status  |result |
      |Albert Einstein Cancer Center  |Cancer Center       |Active         |true   |
      |Masonic Cancer Center          |Cancer Center       |Inactive       |true   |

 
  Scenario:#2 Add Family Mandatory fields
    Given I am on the Add Family screen
    When I have not entered a family parameter <FamilyParameter> type
    Then the error type <Error> will be displayed
    
    |<FamilyParameter>|<Error>            |
    |Family Name      |Family Name is Required|
    |Family Status    |Family Status is Required|
    |Family Type      |Family Type is Required  |


  Scenario: #3 Add Family Duplicate rules
    Given I am on the Add Family Screen
     When The added name exists in the database
     Then the warning: "Family exists in the database. Please verify and create a new Family record." will be displayed

  
