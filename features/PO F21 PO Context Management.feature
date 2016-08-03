@Global@PO

Feature: PO F21 PO CTRP-CTEP-NLM Context Management Functionality


Scenario:#1 CTEP Context of a new Organization record can be created in CTRP
    Given CTEP creates a new organization and sends it via RESTful Services to CTRP
    When CTRP receives newly created CTEP Organization record through Restful Services
    Then A new Organization in the CTEP Context with CTEP "Processing Status" of "Pending" gets created in CTRP with information type 
    
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Public Research Email|
    |Public Research Phone|
    |Funding Mechanism|
    |CTEP Org PK ID|
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,Legacy,NULL)|
    |Processing Status (Pending, Complete)|
    
    And CTEP Org PK ID will be sent to CTEP  

Scenario: #1a CTEP Context Mandatory Fields--- updated with last three fields---
    Given I am logged into the CTRP 
     When A CTEP Context is created in CTRP
     Then the fields type are mandatory
    
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |City|
    |Country|
    |CTEP Org PK ID|
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,Legacy,NULL)|
    |Processing Status (Pending, Complete)|
     

Scenario: #2 As a PO Curator, I can search a NEW CTEP Organization to create a CTRP Context 
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select Source status as pending
    And I select Source context as CTEP
    Then I can view Organizations in the CTEP Context with Pending status with information Type
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Public Research Email|
    |Public Research Phone|
    |Funding Mechanism|
    |CTEP Org PK ID|
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,Legacy,NULL)|
    |Processing Status (Pending, Complete)|
    

    When the viewed CTEP Organization does not exist in CTRP
    And the Curator clicks on the "Clone" button
    Then a new CTRP Organization associated with the CTEP Context with the information type will be created
   
    
     |CTRP Context|
     |CTRP Organization ID|
     |CTRP Organization Status| 
     |Name|
     |Address|
     |Address2|
     |City|
     |State_province|
     |Postal_code|
     |Country|
     |Public Research Email|
     |Public Research Phone|
     |Aliases|
     |Processing Status (Pending, Complete)|
     
    
    And the Processing Status will be changed from "Pending" to "Complete"
    And both "organization Name" and "Organization Address" will be matched-----?? Curator verification or system match
    And the CTRP Context "Processing Staus" will be "Complete"
    And the "Organization Status" will be "Active"
    And The CTRP Organization ID (PO ID) and CTEP Organization ID is sent to CTEP 
    When Organizations created in CTRP are sent to CTEP as Batch
    Then Sent organizations will be flagged in the CTRP
    And the Curator will review organizations status and CTEP response
      
      
      
      Scenario:#2a CTRP Context Mandatory Fields
    Given I am logged into the CTRP 
     When A CTRP Context is created
     Then the fields type are mandatory 
     
    |CTRP Context|
    |CTRP Organization ID|
    |CTEP Organization Status|
    |Name|
    |Address|
    |City|
    |Country|
    |Processing Status (Pending, Complete)|

    
    Scenario: #3 As a PO Curator,I can associate an existing CTRP Organization with the Organization in the CTEP Context
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select Source status as pending
    And I select Source context as CTEP
    Then I can view Organizations in the CTEP Context with "Processing Status" of "Pending" with information Type
    
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Public Research Email|
    |Public Research Phone|
    |Funding Mechanism|
    |CTEP Org PK ID|
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,Legacy,NULL)|
    |Processing Status (Pending, Complete)|
    
    When the viewed CTEP Organization exists in CTRP
    Then the curator associates the existing CTRP Organization with the Organization in the CTEP Context
    And the CTEP Processing Status will be changed from "Pending" to "Active"
    And every CTRP Organization can be associated with only one Organization in the CTEP Context--- Must be 1 to 1----
    And a list of all organization associations will be displayed with source status type
    
      |Active  |
      |Inactive  |
      |Nullified  |
      |Pending  |

    And The CTRP Organization ID (PO ID) and CTEP Organization ID is sent to CTEP 
    
    
  
 Scenario: #4  CTRP Organization information gets updated with the New information received from CTEP
    Given I am on the Search Organizations Screen
    When CTEP updated organization information is sent to CTRP via Restful service
    Then CTEP Context will be updated automatically with the new information received from the Restful service
    And The CTRP Curator will be able to identify CTEP Organization Context that were updated 
    And the CTRP Curator will determine the updates for the CTRP Context
    
   
 
   Scenario: #5 As a CTRP PO Curator I can approve or deny a request for a new organization in CTRP 
    Given I am logged into the CTRP  
     And I have received a request to create a new organization in CTRP
     When I have searched existing organizations in CTRP
     And the requested organization exists in the CTRP Context
    Then I can deny the request 
    When the requested organization does not exist in the CTRP Context
    Then I can create the requested organization in the CTRP Context
    And I can send the CTRP Organization context to the CTEP-ECM 
    
    
    Scenario:#6 CTRP links CTEP created organization record based on a new organization created in CTRP
    Given I am logged into the CTRP 
    When CTEP creates an organization based on a new organization created in CTRP
    Then CTEP sends organization records to CTRP via Restful Services
    And the CTEP Organization record includes the CTEP Organization ID and the CTRP Organization ID (PO ID) and other information type
    
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Public Research Email|
    |Public Research Phone|
    |Funding Mechanism|
    |CTEP Org PK ID|
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,Legacy,NULL)|
    |Processing Status (Pending, Complete)|
    
   
   Then a CTEP Context for the received organization is created and automatically linked to the CTRP Context

     
       Scenario:#7 I can search a NLM Organization associated with an Organization in the CTRP Context 
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select Source status as pending
    And I select Source context as NLM
    Then I can view Organizations in the NLM Context with Pending status with information Type
     
     |NLM Context|
     |Name (Sponsor)|
     |NLM Org PK ID|
     |Service Request (Create)|
     |Processing Status (Pending, Complete)|
    
    When the Imported organization does not exist in the CTRP Context
    Then I can create a NEW CTRP Organization with information type
     
     |CTRP Context|
     |CTRP Organization ID|
     |CTRP Organization Status| 
     |Name|
     |Address|
     |Address2|
     |City|
     |State_province|
     |Postal_code|
     |Country|
     |Public Research Email|
     |Public Research Phone|
     |Aliases|
     |Processing Status (Pending, Complete)|
     
    And I can associate the created organization with the NLM Context
    And The NLM "Processing Status" is changed from "Pending" to "Active"
    And The new CTRP Context information is sent to CTEP
    When the Imported Organization exists in CTRP
    Then the CTRP Curator clicks on "Associate Organization Context" to associate the existing CTRP Organization with the NLM Context
    And The NLM "Processing Status" is changed from "Pending" to "Active"

  Scenario:#8 Curator can identify when two organizations are to be merged 
    Given I am logged into the CTRP 
     When CTEP Indicates via REST Service that two Organizations are to be merged
     And CTEP identifies one Organization will be Active 
     And CTEP identifies a second Organization to be Inactive as the result of a merger
     Then the pending CTRP Nullification event can be identified by searching CTEP context and Merge with CTEP ID  (New Functionality to dicuss)
      
       Scenario: #9 I can Nullify the Inactive Organization 
    Given I am logged into the CTRP 
     When A curator is notified that a CTEP Organization merger is pending
    Then The curator will select the CTRP organization associated with the CTEP Inactive organization to be nullified
    And the curator will select the CTRP organization associated with the CTEP Active organization to replace the trail associations of the nullified organization
    
    Scenario:#10 CTEP Context of a new person record created
    Given I am logged into the CTRP 
    When CTRP receives newly created CTEP person record through Restful Services
    Then a new person record will be created in the CTEP Context with CTEP Processing Status of "Pending" in CTRP with information type
    
      |CTEP Person ID|
      |CTEP Person Registration Type|
      |CTEP Person Registration Status|
      |Prefix|
      |Suffix|
      |First Name|
      |Middle Name|
      |Last Name|
      |Public Research Phone|
      |Public Research Email|
      |Person Status|
      |Affiliated Organization CTEP ID|
      |CTEP Person PK ID|
      |Service Request (Create, Update, Merge with CTEP ID, NULL)|
      |Processing Status (Pending, Complete)|
      
        Scenario:#10a CTEP Person Context Mandatory Fields 
    Given I am logged into the CTRP 
     When CTEP Context of a person record is created
     Then the person record fields type are mandatory

      |CTEP Person ID|
      |CTEP Person Registration Type|
      |CTEP Person Registration Status|
      |First Name|
      |Last Name|
      |Person Status|
      |Affiliated Organization CTEP ID|
      |CTEP Person PK ID|
      |CTEP Service Request (Create, Update, Merge with CTEP ID, NULL)|
      |Processing Status (Pending, Complete)|
      

      
Scenario: #11 As a PO Curator, I can search a NEW person record to associate it with a person in the CTEP Context
    Given Given I am logged into the CTRP 
    And I am on the Search Persons Screen
    When I select Source status as pending
    And I select Source context as CTEP
    Then I can view Persons in the CTEP Context with "Processing Status" of "Pending"  
    When the viewed CTEP Person does not exist in CTRP
    Then the Curator clicks on "Clone" button to create a new CTRP Person associated with the CTEP Context with the information type
      
      |CTRP Person ID|
      |CTRP Person Status|
      |Prefix|
      |Suffix|
      |First Name|
      |Middle Name|
      |Last Name|
      |Public Research Phone|
      |Public Research Email|
      |Person Status|
      |Affiliated Organization CTRP ID|
      |Processing Status (Pending, Complete)|
      
    
    And the CTEP Context Status is changed from Pending to Active
    And The CTEP Context Person Information is copied into the CTRP Context
    When the viewed CTEP Person exists in CTRP
    Then A CTRP Curator clicks on "Associate Person Context" to associate an existing CTRP Person record with the CTEP Context
    And The CTEP "Processing Status" is changed from "Pending" to "Active"
    
    Scenario:#12 CTRP Person Context Mandatory Fields 
    Given I am logged into the CTRP 
     When CTRP Context of a person record is created
     Then the person record fields type are mandatory
     
      |CTRP Person ID|
      |CTRP Person Status|
      |First Name|
      |Last Name|
      |Person Status|
      |Affiliated Organization CTRP ID|
      |Processing Status (Pending, Complete)|
    
     Scenario: #13 Rules for CTRP Organization Status based on CTEP Organization Status
    Given I am logged into the CTRP 
     When the Organization CTEP context status is Active
     Then the Organization CTRP context status must be active  
     When the Organization CTEP context status is Inactive
     Then the CTRP context can be Inactive OR Nullified
     
      Scenario: #14 I can Nullify a Duplicate Person record in CTRP
     Given I am logged into the CTRP PO application
     And I am on the CTRP PO Curator Review screen
     When I have been notified of a CTEP Duplicate Person Record
     Then I will identify two Person Records in the CTRP Context that are duplicates
     And I select one of the Person Records to be retained per CTEP
     And I select the other Person Record to be nullified
     And the Person Record to be nullified does not have an Active Status
     And all references in CTRP to the nullified Person Record will reference the retained Person Record
     And any unique Person Organization Affiliations on the nullified Person Record will be added to the retained Person Record
     And the status of the Person Record to be nullified will be "Nullified"
  

    
    
    