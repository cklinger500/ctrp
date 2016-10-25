@PO @Global
Feature: PO F11 Edit Person Information

  Scenario:#1 As a Po Curator, I can Edit Person record 
    Given I know which Person record I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a Person record and found the one I wish to edit
    When I select a person from the person search results
    Then the edit person screen will display
    And I can edit fields type
    |Prefix|
    |First Name|
    |Middle Name|
    |Last Name|
    |Suffix|
    |Email|
    |Phone Number-Extension|
    |Source Status|# Active, Inactive, Nullified, Pending
    And I change Affiliated Organizations Information Type
    |Effective Date|
    |Expiration Date|
   And I can add an affiliated Organization
   And I can delete an affiliated organization
    And I click on the save button
   Then the system will save the new updated person record
   

     Scenario: #1a reset button functionality
    Given I am on the edit person screen
     When I make update to one or more person parameters
     And I click on the reset button
     Then the updated made will not be saved
     And the screen will be refreshed with the person records existing before the updates

  Scenario:#3 As a PO Curator, I can Edit a Person record and add an Affiliated Organization
    Given I know which Person with affiliated Organization record I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a Person record and found the one I wish to edit
    And I have selected the function Edit Person
    And I am on the edit Person information screen
    And I select the function to add an Affiliated Organization
    When I select an additional Affiliated organization
    And I enter the Affiliate organization effective date
    And I submit my edit request for Person
    Then the system should add the Affiliated Organization with the effective date in the Person Record
  
 
    Scenario: #4 As a Curator, I can associate a CTRP person with an Existing CTEP Person
    Given I am a curator 
    And I am on the CTRP PO Application
     And I have created an Person record in CTRP
     When I click on the Associate Person Context Button <Associate Person Context> 
     Then the Search Person screen opens
     And I can search for matching Persons with "ACTIVE" Source Status in "CTEP" context type
      When a CTEP Person information type matches same information in CTEP context
      |First Name|
      |Last Name|
      |Affiliated Organization State|
      |Affiliated Organization Country|
     
      
      Then the resulted search will display matching CTEP Person records
      And the curator can select the matching CTEP Person to link to CTRP person 
      When the curator clicks on Associate Selection Button <AssociateSelection> to associate selection
      Then the CTEP-CTRP association is complete
      And the CTEP Person will be displayed on the same Edit Person screen in a new tab labeled "CTEP"
    And the CTEP Processing status will be "complete"
     And The CTEP Service Request will be "NULL" 
     And CTEP Person Record can be associated to only one CTRP Person Record
      #And BOTH Person Source Status must be "Active"
      And Persons can be associated only from the CTRP context 
      And all Associated Persons will be displayed on the Edit person CTRP Tab 
      
     
        Scenario:#5 Associated Persons grid details 
    Given I am on the edit Person CTRP screen
     When a CTRP person is associated with CTEP person recor
     Then I can view Asscocited person grid details

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
    |Email|
    |Phone |
    |Affiliated Orgs|
    |Context person ID|
    |Processing Status|
    |Service Request|
    |Last Updated Date|
    |Last Updated By|
    |Association Start Date|
    |Delete|
    
    And Person associations might have any source status 
    And I can delete person association


