@Global @Reg
Feature: Reg F03 Search Organizations

  As a CTRP User, I am able to Search Organizations by various criteria


  Scenario Outline: #1 I am able to search for organizations in CTRP
    Given I am logged into the CTRP Registration application
    And the following parameters of an Organization exist:

      |Name|Alias |FamilyName |SourceStatus| City| State|Country |PostalCode |Phone |Email|
      |SopNameCancer |SopAlias |sopFName| Active | SopCity| Ifrane| Morocco |22306 |420-999-8906 |SopPercukeTrial@pr.com|

    And I have selected the option "Search Organizations"
    When I provide the name <Name> of the organization
    And I have checked the condition for Search Alias <Alias> of the organization
    And I provide the Family Name <Family Name> of the organization
    And I provide the Source ID <Source ID> of the organization
    And I provide the City <City> of the organization
    And I provide the Country <Country> of the organization where the default is "All Countries"
    And I provide the State <State> of the organization
    And I provide the Postal Code <Postal Code> of the organization
    And I provide the Phone <phone> of the organization
    And I provide the Email <email> of the organization
    And I have checked the exact macth <ExactMatch> of the organization
    And I submit my search request
    Then the system should display the organization with that PO Organization ID
    And the <Organization Search Results> will display Organizations with an Active status in the CTRP Context sorted by Organization Name:
      |CTRP ID|
      |CTEP ID|
      |Name|
      |Source Status|
      |Source Context|
      |Source ID|
      |Family Name|
      |Phone|
      |Email|
      |City|
      |State|
      |Country|
      |Postal Code|



    Examples:
      |Source ID|Name             |Alias       |Family Name|City   |State |Country|Postal Code|phone       |email                  |ExactMatch|Organization Search Results |
      |         |                 | Checked    |           |       |      |       |           |            |                       | Checked  |At least one selection value must be entered prior to running the search|
      |         |                 | Unchecked  |           |       |      |       |           |            |                       | Checked  |At least one selection value must be entered prior to running the search|
      |23654    |                 | Checked    |           |       |      |       |           |            |                       | Checked  |true   |
      |         |SopNameCancer    | Checked    |           |       |      |       |           |            |                       | Checked  |true   |
      |         |SopAlias         | Checked    |           |       |      |       |           |            |                       | Checked  |true   |
      |         |SopAlias         | Unchecked  |           |       |      |       |           |            |                       | Checked  |false  |
      |         |                 | Checked    |SopFName   |       |      |       |           |            |                       | Checked  |true   |
      |         |                 | Checked    |           |SopCity|      |       |           |            |                       | Checked  |true   |
      |         |                 | Checked    |           |       |Ifrane|Morocco|           |            |                       | Checked  |true   |
      |         |                 | Checked    |           |       |      |Morocco|           |            |                       | Checked  |true   |
      |         |                 | Checked    |           |       |      |       |22306      |            |                       | Checked  |true   |
      |         |                 | Checked    |           |       |      |       |           |420-999-8906|                       | Checked  |true   |
      |         |                 | Checked    |           |       |      |       |           |            |SopPercukeTrial@pr.com | Checked  |true   |
      |         |                 | Checked    |           |       |      |       |           |            |                       | Unchecked  |At least one selection value must be entered prior to running the search|
      |         |                 | Unchecked  |           |       |      |       |           |            |                       | Unchecked  |At least one selection value must be entered prior to running the search|
      |236      |                 | Unchecked  |           |       |      |       |           |            |                       | Unchecked|true|
      |         |SopNameCan       | Unchecked  |           |       |      |       |           |            |                       | Unchecked|true   |
      |         |SopAl            | Checked    |           |       |      |       |           |            |                       | Unchecked|true  |
      |         |SopAl            | Unchecked  |           |       |      |       |           |            |                       | Unchecked|false  |
      |         |                 | Unchecked  |SopFNa     |       |      |       |           |            |                       | Unchecked|true   |
      |         |                 | Unchecked  |           |SopCi  |      |       |           |            |                       | Unchecked|true   |
      |         |                 | Unchecked  |           |       |Ifrane|Morocco|           |            |                       | Unchecked|true   |
      |         |                 | Unchecked  |           |       |      |Morocco|           |            |                       | Unchecked|true   |
      |         |                 | Unchecked  |           |       |      |       |223        |            |                       | Unchecked|true   |
      |         |                 | Unchecked  |           |       |      |       |           |420-999-89  |                       | Unchecked|true   |
      |         |                 | Unchecked  |           |       |      |       |           |            |SopPercukeTrial@pr     | Unchecked|true   |
      |236      |                 | Unchecked  |           |       |      |       |           |            |                       | Checked|false   |
      |         |SopNameCan       | Unchecked  |           |       |      |       |           |            |                       | Checked|false   |
      |         |SopAl            | Checked    |           |       |      |       |           |            |                       | Checked|false  |
      |         |SopAl            | Unchecked  |           |       |      |       |           |            |                       | Checked|false  |
      |         |                 | Unchecked  |SopFNa     |       |      |       |           |            |                       | Checked|false   |
      |         |                 | Unchecked  |           |SopCi  |      |       |           |            |                       | Checked|false   |
      |         |                 | Unchecked  |           |       |      |       |223        |            |                       | Checked|false   |
      |         |                 | Unchecked  |           |       |      |       |           |420-999-89  |                       | Checked|false   |
      |         |                 | Unchecked  |           |       |      |       |           |            |SopPercukeTrial@pr     | Checked|false   |
      |236*     |                 | Unchecked  |           |       |      |       |           |            |                       | Checked|true   |
      |         |SopNameCan*      | Unchecked  |           |       |      |       |           |            |                       | Checked|true   |
      |         |SopAl*           | Checked    |           |       |      |       |           |            |                       | Checked|true  |
      |         |SopAl*           | Unchecked  |           |       |      |       |           |            |                       | Checked|false  |
      |         |                 | Unchecked  |SopFNa*    |       |      |       |           |            |                       | Checked|true   |
      |         |                 | Unchecked  |           |SopCi* |      |       |           |            |                       | Checked|true   |
      |         |                 | Unchecked  |           |       |      |       |223*       |            |                       | Checked|true   |
      |         |                 | Unchecked  |           |       |      |       |           |420-999-8*  |                       | Checked|true   |
      |         |                 | Unchecked  |           |       |      |       |           |            |SopPercukeTrial*       | Checked|true   |
      |23654    |SopNameCancer    | Checked    |SopFName   |SopCity|Ifrane|Morocco|22306      |420-999-8906|SopPercukeTrial@pr.com | Checked|true   |
      |2365     |SopNameCan       | Checked    |SopFNa     |SopCi  |Ifrane|Morocco|223        |420-999-89  |SopPercukeTrial@pr     | UnChecked|true   |
      |236*     |SopNameCan*      | Checked    |SopFNa*    |SopCi* |Ifrane|Morocco|223*       |420-999-89  |SopPercukeTrial@pr     | Checked|true   |
      |2365     |xyzzz            | Checked    |           |       |Ifrane|Morocco|           |420-999-89  |SopPercukeTrial@pr     | UnChecked|false   |
      |2365     |xyzzz            | Checked    |           |       |      |       |           |420-999-89  |SopPercukeTrial@pr     | Checked|false   |


Scenario: #2 I am able to search for Organizations in CTRP as a Registry user
  Given I am logged into the CTRP Registration application
  And I have selected the option "Search Organizations"
    And the Exact Search is checked by default
    And I can uncheck the Exact Search
    And the source context will be "CTRP"
    And the source status will be "Active"




