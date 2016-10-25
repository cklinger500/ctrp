@Global @PA
Feature: PAM F02 Search Person

As a CTRP PA User with the "Read Only" or the "Abstractor" roles, I can search CTRP Person records by various criteria

Scenario: #1 I am able to search for persons
Given I am logged into the CTRP 
And I have selected the option "Search Persons"
When I select one or more of the following
|First Name|
|Last Name|
|Context Person ID|
|Affiliation #type ahead|
|Source Context|
|Source ID|
|Source Status|
|Email|
|Phone Number|
|Last Updated Start Date, Last Updated End Date|
|Updated By|#Username
|Processing Status|
|Service Request|
And I submit my search request by selecting search
Then the system will display all Person Search Results that meet the specified criteria including the following
 |CTRP Person ID|
 |CTEP Person ID|
 |Prefix|
 |First Name|
 |Middle Name|
 |Last Name|
 |Suffix|
 |Source Status|
 |Source Context|
 |Source ID|
 |Affiliated Orgs|
 |Email|
 |Phone |
 |Context Person ID|
 |Processing Status|
 |Service Request|
 |Last Updated Date|
 |Last Updated By|

Scenario: #2 I am able to view Person details
Given I am logged into the CTRP 
When I have selected a Person
Then the system should display the Person details (see feature file PAM F29 View Person Details)
      
  Scenario:#3 I can enter "*" as a wild card when Exact Search is selected
    Given I want to search for a Person with a wildcard
    And I am logged in to CTRP
    And I am on the Person search screen
    And Exact Search is selected
    When I enter "*" in a search field
    Then Person Search Results will display all found Persons

  Scenario:#4 I can clear all my search selections
    Given I am logged in to CTRP 
    And I have selected the option to search for a Person
    And I want to clear the Person search fields
    When  I select the Clear option
    Then  all values in all fields will be cleared

Scenario:#5 I can export the list of Persons
    Given I am logged in to CTRP 
    And I have selected the option to search for a Person
    And I have search results
    Then I can secect the option to export the list to Excel and the search results will be exported to excel.
