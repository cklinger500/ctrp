Feature: QA Smoke PO Curator
  This will smoke test:
  Create Organization, Search Organization
  Create Family, Search Family, Associate Org to Family
  Create Person, Search Person, Associate Org to Person

  Background:
    Given I am logged in to CTRP PO application with User "ctrpcurator"


  @smoke
  Scenario: As a Curator Create an Organization then search that Organization
    Given I want to create an Organization with parameters
      | orgName    | alias   | address1    | address2         | country | state | city     | postalCode | email          | phone      | fax   |
      | smokeSSOrg | SSalias | smoke test1 | smoke test1 add2 | Nepal   | Mechi | Lalitpur | 87878      | singh@cuke.com | 9841439999 | 77777 |
    When I go to Search Organization page
    Then I should be able to search with the created Organization name
    And I click on the Organization from Search page
    Then It should display Organization with above Organization parameters


  @smoke
  Scenario: As a Curator Create a Family and associate an Org to that Family then search that Family
    Given I want to create a Family with parameters
      | famName    | famStatus | famType |
      | smokeSSFam | Active    | NIH     |
    And I want to associate below Organization with the created Family
      | orgName               | alias   | address1                   | address2                 | country       | state    | city        | postalCode | email             | phone        | fax    |
      | smokeSS Associate Org | SSalias | smoke test associate Org 1 | smoke associate Org add2 | United States | Maryland | Shady Grove | 87878      | singhFam@cuke.com | 609-638-9999 | 242424 |
    And I want to set the parameters for Organization-Family association
      | orgFamRelationship | effectiveDate | expirationDate |
      | Affiliation        | 15-Jul-2016   | 15-Jul-2020    |
    When I go to search Family Page
    Then I should be able to search with the created Family name
    And I click on the Family from Search page
    Then It should display Family and Organization association with above parameters


  @smoke123
  Scenario: As a Curator Create a Person and associate an Org to that Person then search that Person
    Given I want to create a Person with parameters
      | prefix | firstName  | middleName | lastName  | suffix | email             | phone        |
      | Mr     | perSmokeSS | MNsmokeSS  | LNsmokeSS | Jr.    | perSingh@cuke.com | 654-567-7521 |
    And I want to associate an Organization with the created Person
      | orgName            | srcContext | srcStatus | alias | address1                | address2              | country       | state    | city        | postalCode | email             | phone        | fax    |
      | smokeSS Person Org | CTRP       | Active    |       | smoke test Person Org 1 | smoke person Org add2 | United States | Maryland | Shady Grove | 87878      | singhFam@cuke.com | 609-638-9999 | 242424 |
    And I want to set the Person-Organization affiliations date
      | effectiveDate | expirationDate |
      | 15-Jul-2016   | 15-Jul-2020    |
    When I go to search Person Page
    Then I should be able to search with the created Person name
    And I click on the Person from Search page
    Then It should display Person and Organization association with above parameters
