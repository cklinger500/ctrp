@Global@PO

Feature: PO F22 PO Person CTRP-CTEP Context Management Functionality

Scenario:#1 CTEP Context of a new person record created
    Given I am logged into the CTRP 
    When CTRP receives newly created CTEP person record through Restful Services
    Then a new person record will be created in the CTEP Context 
    And a Context Person ID will be sent to CTEP
     And the Person Processing status will be "InComplete"
     And the Service Request will be set to "Create"
       
       
      Scenario:#2 CTEP record details fields
    Given I am on the person search results screen
     When I select a CTEP person record
     Then the CTEP selected person record will display the field type in a CTEP tab
      # Context Person ID = Primary Key ID
      |Context Person ID|
      |CTRP Person ID|
      |Prefix|
      |First Name|
      |Middle Name|
      |Last Name|
      |Suffix|
      |Phone Number|
      |Phone Number Extension|
      |Email|
      |Source Context|
      |Source ID|
      |Source Status|
      |Person Registration Type|
      |Affiliated Organization CTEP ID|
      |Service Request|
      |Processing Status|
      
        Scenario:#3 Person Registration Type Values 
    Given I am on the CTEP Person record Tab
     And I can view Person Registration Type fields
     
     |Investigator|
     |Non Physician Investigator|
     |Associate Plus|
     |Associate|
     |Associate Basic|

       Scenario:#4 Person Source Status CTEP available list
    Given I am logged into the PO application
     When I am on the CTEP Person Tab
     Then the person source status type will be available 
     
     |Active|
     |Inactive|
     
      Scenario:#5 CTEP Person Context Mandatory Fields 
    Given I am logged into the CTRP 
     When CTEP Context of a person record is created
     Then the person record fields type are mandatory

      |CTEP Person ID|
      |Person Registration Type|
      |First Name|
      |Last Name|
      |Source Status|
      |Affiliated Organization CTEP ID|
      |Service Request|
      |Processing Status|
      
      
       Scenario:#6 As I Curator, I can use the Clone function available on the CTEP screen 
    Given I am logged into the PO aplication 
    And I am on the CTEP view of a person
    When the CTEP persos is associated with a person in the CTRP context 
    And the displayed CTRP Person IDon the CTEP context screen is not NULL 
 	Then the "Clone" button will be disabled 
    When the CTEP person is not associated with a person in the CTRP context 
    And the displayed CTRP Person ID  on the CTEP context screen is NULL  
 	Then the "Clone" button will be enabled
 
        
	Scenario: #7 As a PO Curator, I can search a NEW person record to associate it with a person in the CTRP Context
    Given Given I am logged into the CTRP 
    And I am on the Search Persons Screen
    When I select Processing status as"Incomplete"
    And Service Request as "Create"
    And I select Source context as CTEP
    Then I can view Persons in the CTEP Context with "Processing Status" of "Incomplete" and Service request of "Create"
    When When the Curator clicks on the "Clone" button
    Then the CTRP system will search Active CTRP Context for both "First Name", "Last Name", and Person Affiliation "State" and "Country"
    When the CTEP Person does not match any existing CTRP Context person First name, Last Name, Affiliation state and country
    Then the CTRP Person will be created and associated to the CTEP Context 
   And both the CTRP and CTEP context will be linked
   And the CTRP Context will have a "Complete" Processing status
   And the CTRP Context will have an "Active" Source status
   And the Curator will update the CTEP processing status from "Incomplete" to "Complete"
   And the Curator will update the CTEP create requet to "Null"
    When the CTEP Person does match an existing CTRP Context "First Name", "Last Name", and Person Affiliation "State" and "Country"
    Then a warning will be displayed: "Possible Matching CTRP Persons"
    And A list of CTRP Context Person ID will be displayed to show matching person ID
    And the curator will search matching ID(s) provided in the CTRP context
    And the curator will review the displayed options and select a person to associate
    And the curator will click on the Associate Selection Button
    And both contexts will be associated 
	Then the CTEP Processing status will be changed automatically from "Incomplete" to "Complete"
    And  the CTEP Service Request will be changed automatically from "Create" to "Null"
    And both contexts will be displayed in different tabs on the same screen
    And the association record will be added to the person associations table on the CTRP Context screen
    
  
    Scenario: #8 CTRP Person information gets updated with the New information received from CTEP
    Given I am on the Search Person Screen
    When CTEP updated Person information is sent to CTRP via Restful service
    Then the CTEP Service Request will be set to "Update"
    And the CTEP "Processing Status" will be set to "Incomplete"
    Then CTEP Context will be updated automatically with the new information received from the Restful service
    When CTEP updates are new organization Information
    
      |Prefix|
      |Suffix|
      |Phone Number|
      |Phone Number Extension|
      |Email|
      |Source Status|
     
      
   
    And the CTEP Person Status is Active
    And the CTRP Person Status is "Active"
    Then The CTRP Context fields will be automatically Updated
    And the CTRP Context Processing Status will be "Complete"
    And the CTEP processing status will be changed automatically  from" incomplete" to "Complete"
    And  the CTEP Service Request will be changed automatically from "Create" to "Null"
    
    
    Scenario: #9 CTRP Person information gets updated with the New information received from CTEP
    Given I am on the Search Person Screen
    When CTEP updated Person information is sent to CTRP via Restful service
    Then the CTEP Service Request will be set to "Update"
    And the CTEP "Processing Status" will be set to "Incomplete"
    Then CTEP Context will be updated automatically with the new information received from the Restful service
    When the CTEP context update include a New Person Name
    |First Name|
    |Last Name|
    And the CTEP Organization is Active
    Then the CTRP Context field type is not automatically updated
    And the CTRP Processing Status will be "Incomplete"
    When CTRP Curator will determine the updates for the CTRP Context
    Then the CTRP Processing Status will be "Complete"
    And the curator will set the CTEP "Processing Status" to "Complete"
    And the curator will set the CTEP "service request" to "NULL" 
     

     Scenario:#10 Curator can identify when two persons are to be merged 
    Given I am logged into the CTRP 
     When CTEP Indicates via REST Service that two Persons are to be merged
     And the CTEP Person <PersonName> will have CTEP Context Person ID <CTEPContextPersonID>, CTRP Org ID <CTRPPersonIDType>, Service request <CTEPServiceRequestType>, processing status <CTEPProcessingStatusType>, and Person status <CTEPStatusType>nd CTRP Person Status<CTRPPersonStatus>
     
     |<PersonName>                         |<CTEPContextPersonID>     |<CTRPPersonIDType>    |<CTEPServiceRequestType> |<CTEPprocessingStatusType> |<CTEPStatusType>|<CTRPStatusType>|
     |Daniel Evan                          |AB123                     |2026171               |Merge ID AB123            |Incomplete                 |Active          |Active         |         
     |Daniel Epner Evan                    |33303                     |28417522              |Merge ID 33303            |Incomplete                 |Inactive        |Active         |        
      
     Then the curator will search CTEP Context for Person where Service request is "Merge with CTEP ID"
     And the curator will search for matching persons in the CTRP Context
     When Matching CTRP perons found
     Then The CTRP persons matching CTEP persons with inactive status will be Nullified
    And the CTEP Person <PersonName> will have CTEP Context Person ID <CTEPContextPersonID>, CTRP Org ID <CTRPPersonIDType>, Service request <CTEPServiceRequestType>, processing status <CTEPProcessingStatusType>, and Person status <CTEPStatusType> and CTRP Person Status<CTRPPersonStatus>  
     
     |<PersonName>                         |<CTEPContextPersonID>     |<CTRPPersonIDType>    |<CTEPServiceRequestType> |<CTEPprocessingStatusType>  |<CTEPStatusType>|<CTRPStatusType>|
     |Daniel Evan                          |AB123                     |2026171               |NULL                     |complete                    |Active          | Active|        
     |Daniel Epner Evan                    |33303                     |28417522              |NULL                     |complete                    |Inactive        | Nullified|       
      
    
     And the curator will select the CTRP person associated with the CTEP Active person to replace the trial associations of the nullified person
     
    
    
    
    