Feature: PO F16 Search Organization Family Name Addendum

Background: 
Given I am logged in to CTRP PO application
And I have selected the option to Search Organization Family Name

Scenario: #1 Rules for Search Families
    Given I am logged in to CTRP PO application
    And I am on the search Family screen
    When I have completed a family search 
    Then Only Active Organization count will be displayed on the Family Search "Membership Size" column Results
    When I have selected a family name from the family search results table
    Then All affiliated organizations will be displayed
    And Only Active Organization count will be displayed for the Membership size on the Edit Family screen
    And Inactive Organization count will not be included in the Membership size 
    And Expired Organization count will not be included in the Membership size
    And Pending Organization count will not be included in the Membership size
    And the organization type will be displayed at the botton of the organizations list
       
      |Inactive Relationship |
      |Expired Relationship  |
      |Pending Organizations  |
      |Nullified Organizations  |

    And Organizations information types will be displayed
    
      |CTRP ID        |
      |CTEP ID        |
      |Organization (Hyperlink to Org Details)   |
      |Relationship   |
      |Effective Date |
      |Expiration Date|

    And Expiration date will be displayed for Expired Relationships
  


