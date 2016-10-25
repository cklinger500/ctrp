@Global @Reg
Feature: Reg F02 Search Persons

As any CTRP User, I am able to Search for Persons by various criteria


Scenario Outline: #1 I am able to search for person in CTRP as a Registry user
  Given I am logged into the CTRP Registration application
  And I have selected the option "Search Persons"
  And the following parameters of a Person exist:
    |PersonFirstName| |PersonLastName| |Affiliation| |SourceStatus| |email| |phone|
    |shiFNameTrial         | |shiLNameTrial        | |shiPerOrgAffTrial| |Active      | |shiPercukeTrial@pr.com| |420-999-8906|
  And I have selected the option "Search Persons"
  When I provide the First Name <firstName> of the Person
  And I provide the Last Name <lastName> of the Person
  And I provide the Organization Affiliation <organizationAffiliation> of the Person
  And I provide the CTRP Org ID <CTRPOrgID> of the person affiliation
  And I provide the Source ID <sourceID> of the Person
  And I provide the Email <email> of the Person
  And I provide the Phone <phone> of the Person
  And I provide the Exact Match condition <exactMatch>
  And I submit my search request
  Then the system should display Active Person records in the CTRP context matching the search criteria
  And the Person Search Results <result> will display the following sorted by Person Last Name:
    |CTRP ID|
    |CTEP ID|
    |First|
    |Middle|
    |Last 1|
    |Source Context|
    |Source Status|
    |Source ID|
    |Email|
    |Phone|
    |Affiliated Orgs|
    |Prefix|
    |Suffix|

  Examples:
    |sourceID  |firstName     |lastName      |email                  |phone      |organizationAffiliation  |exactMatch |result    |
    |         |             |             |                     |           |                          |checked    |At least one selection value must be entered prior to running the search|
    |23880989  |             |             |                     |           |                          |checked    |true  |
    |         |shiFNameTrial |              |                     |           |                          |checked    |true  |
    |         |             |shiLNameTrial  |                     |           |                          |checked    |true  |
    |         |             |             |shiPercukeTrial@pr.com |            |                          |checked    |true  |
    |         |             |             |                       |420-999-8906 |                          |checked    |true  |
    |         |             |             |                     |           |shiPerOrgAffTrial       |checked    |true  |
    |         |             |             |                     |           |                          |unchecked  |At least one selection value must be entered prior to running the search|
    |23880 |             |             |                     |           |                          |unchecked  |true  |
    |         |shiFNameTr    |              |                     |           |                          |unchecked  |true  |
    |         |             |shiLNameTr     |                     |           |                          |unchecked  |true  |
    |         |             |             |shiPercukeTrial        |            |                          |unchecked  |true  |
    |         |             |             |                       |420-999      |                          |unchecked  |true  |
    |         |             |             |                     |           |shiPerOrgAffTri         |unchecked  |true  |
    |23880 |             |             |                     |           |                          |checked    |false |
    |         |shiFNameTr    |              |                     |           |                          |checked    |false |
    |         |             |shiLNameTr     |                     |           |                          |checked    |false |
    |         |             |             |shiPercukeTrial        |            |                          |checked    |false |
    |         |             |             |                       |420-999      |                          |checked    |false |
    |         |             |             |                     |           |shiPerOrgAffTri         |checked    |false |
    |23880*    |             |             |                     |           |                          |checked    |true  |
    |         |shiFNameTr*       |              |                     |           |                          |checked    |true  |
    |         |             |shiLNameTr*    |                     |           |                          |checked    |true  |
    |         |             |             |shiPercukeTrial*       |            |                          |checked    |true  |
    |         |             |             |                       |420-999*     |                          |checked    |true  |
    |         |             |             |                     |           |shiPerOrgAffTri*        |checked    |true  |
    |23880989  |shiFNameTrial |shiLNameTrial  |shiPercukeTrial@pr.com    |420-999-8906 |shiPerOrgAffTrial      |checked    |true  |
    |23880989  |shiFNameTr*   |shiLNameTri*   |shiPercuke*           |420-999-8906 |shiPerOrgAffTrial      |checked    |true  |
    |23880989  |shiFNameTrial |shiLNameTrial  |shiPercukeTrial@pr.com    |420-999-8906 |shiPerOrgAffTrial      |unchecked  |true  |
    |238809    |shiFNameTr    |shiLName       |shiPercuke            |420-99       |shiPerOrg              |unchecked  |true  |


  Scenario: #2 I am able to search for person in CTRP as a Registry user
  Given I am logged into the CTRP Registration application
  And I have selected the option "Search Persons" 
    And the Exact Search is checked by default
    And I can uncheck the Exact Search
    And the source context will be "CTRP"
    And the source status will be "Active"
    
