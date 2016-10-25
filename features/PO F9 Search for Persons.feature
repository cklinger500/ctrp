@Global
Feature: PO F9 Search for Persons

  Scenario:#1 As a Curator, search for persons with multiple parameters
    Given I know multiple parameters of the person I wish to search for
      And I am logged in to CTRP PO application
    And I am on the search persons screen
    And I can search with one or more parameters type
    
    |First Name|
    |Last Name|
    |Context Person ID|
    |Affiliation|
    |Source Context|
    |Source ID|
    |Source Status|
    |Email|
    |Phone Number|
    |Last Updated Date:Start Date, End Date|
    |Updated By:Username|
    |Processing Status|
    |Service Request|
    And I submit my search request for Person Search
      
      
      Scenario:#1* I can search person by affiliation and CTRP Org ID (Jira CTRPAUM 189)
    Given I am on the search person screen
    And Affiliation search field <Affiliation> should allow searching by 
   |Affiliation Name|
   |Org CTRP_ID |
   When the user enters the CTRP_ID of an organization in the <Affiliation> field, 
   Then the search results should retrieve all Person records that are affiliated with the Organization (as specified by its ID).

    
      Scenario:#1a Search Person Results 
    Given I am on the search person results screen
     And the search results should display the following columns 
    
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
    
    And the result should be sorted by Person Last Name
    
   
  Scenario:#2 As a Curator, I will get a message if searched with no parameters
    Given I am logged in to CTRP PO application
    And I am on the search persons screen
    When I searched without providing any search parameters
    Then I should get message as "At least one selection value must be entered prior to running the search"
 
 Scenario: #3 A a Curator, I can search PersonExact Search is checked
    Given I know the exact paramater type of the person I want to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for a person
    When I provide the exact parameter I would like to search
    And the Exact search checked
    And I submit my search request
    Then the system should display all the exisiting exact parameter provided
    And the result should be sorted by Person Last Name
    
    Scenario: #4 A a Curator, I can search person when Exact Search is unchecked
   Given I know the exact paramater type of the person I want to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for a person
    When I provide the exact parameter I would like to search
    And the Exact search is unchecked
    And I submit my search request
    Then the system should not display all the existing exact parameter provided
    And the result should be sorted by Person Last Name
   
  
  Scenario:#5 As a curator, I cannot Search Results when the Exact Search box is checked and Exact Match is not provided
    Given I am logged in to CTRP PO application
    And Exact Search is checked on search person
    And I dont provide the Exact criteria for Person
    Then the search result should not be displayed



