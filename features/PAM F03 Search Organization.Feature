@Global @PA
Feature: PAM F03 Search Organization

As a CTRP PA User with the "Read Only" or the "Abstractor" roles, I am able to Search Organizations by various criteria

Scenario: #1 I am able to search for organizations
Given I am logged into the CTRP
And I have selected the option "Search Organizations"
When I selected one or more of the values to search all trials
|Organization Name  #(type ahead)|
|Family Name|
|Context Organization ID #Primary Key|
|Source Status|
|Source Context|
|Source ID|
|City|
|State|
|Country|
|Zip|
|Phone|
|E-mail|
|Processing Status|
|Service Request|
|Last Updated By|
|Last Updated Start Date, Last Updated End Date|
|Alias|#check box to include alias
And I submit my search request by selecting search
Then the system should display the organizations search results for organizatons that have those parameters including
|CTRP ID|#Grouping ID
|CTEP ID|
|Name|# organization name
|Source Status|
|Source Context|
|Source ID|
|Family Name|
|Phone |
|Email|
|City|
|State|
|Country|
|Postal Code|
|Context Organization ID #Primary Key|
|Processing Status|
|Service Request|
|Last Updated By|
|Last Updated Date|



Scenario: #2 I am able to view organizations details
Given I am logged into the CTRP 
When I have selected an Organizations
Then the system should display the organizations details (see feature file PAM F28 View Organization Details)
      
  Scenario:#3 I can enter "*" as a wild card when Exact Search is selected
    Given I want to search for an Organization with wild card
    And I am logged in to CTRP
    And I am on a Organization search screen
    And Exact Search is selected
    When I enter "*" in a search field
    Then Organization Search Results will display all found organizations

  Scenario:#4 I can clear all my search selections
    Given I am logged in to CTRP 
    And I have selected the option to search for an organization
    And I want to clear the organization search fields
    When  I select the Clear option
    Then  all values in all fields will be cleared

Scenario:#5 I can export the list of organizations
    Given I am logged in to CTRP 
    And I have selected the option to search for an organization
    And I have search results
    Then I can secect the option to export the list to Excel and the search results will be exported to excel.
