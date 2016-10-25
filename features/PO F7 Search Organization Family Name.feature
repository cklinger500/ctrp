Feature: PO F7 Search Organization Family Name

  Background:
    Given I am logged in to CTRP PO application
    And  I select the option to search Organization Family

  Scenario Outline: #1 As a PO user, I am able to search with Family Parameters 
    Given I am on the Search Family Screen
    And  I can search with family name <family Name>
    And I can search with Family Status <Family Status> type
      |Active|
      |Inactive|
    And I can search with Family Type <Family Type>
      
      |Cancer Center| 
      |NIH          | 
      |NCTN         | 
      |Research Cancer Center| 
      
    And I click on Search button
    Then In the search result for family name <family name> it shall return result <result>
    And the displayed results should have the family parameters type
     
     |FamilyName|
      |FamilyStatus|
      |FamilyType|
      |OrganizationFamilyMembers|
      |OrganizationFamilyMemberRelationship|

    And the result should be sorted by family name


    Examples:
      |family Name                 |Family Status  |Family Type           |Result    |
      |Albert Einstein Cancer Center|Active         |Cancer Center         |True      |
      |Yale Cancer Center           |Inactive       |NIH                   |True      |
      |shilpi org 546               |Null           |Test                  |False|


  Scenario:#6 As a curator, I can Search Family when the Exact Search box is checked
    Given I am logged in to CTRP PO application
    And I have selected the option to Search Families
    And Exact Search box is selected in Family Search
    When I have entered the "exact" Family name
    Then the Exact entered Family Name will be displayed on the Family search results table

  Scenario:#7  As a curator, I can Search Family when the Exact Search box is NOT checked
    Given I am logged in to CTRP PO application
    And I have selected the option to Search Families
    And Exact Search box is Not selected in Family Search
    When I have entered the the "Exact" Family Name
    Then the exact Family Name will be displayed on the Family search results table