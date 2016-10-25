@Global@PO

Feature: PO F21 PO CTRP-CTEP-NLM Organization Context Management Functionality

Scenario:#1 CTEP Context of a new Organization record can be created in CTRP
    Given CTEP creates a new organization and sends it via RESTful Services to CTRP
    When CTRP receives newly created CTEP Organization record through Restful Services
    Then A CTEP record will be created in CTRP 
     And Context Organization ID will be assigned to the CTEP context
    And the assigned Context Organization ID will be sent to CTEP
    And the Service Request will be set to "Create"
    And the Processing Status Will be set to "Incomplete"
    
   
    
      Scenario: #2 CTEP Context Organization list of fields 
    Given I am logged into the PO application
    And I can search CTEP Context organizations
    When I select an org from the search results
  	Then I can view CTEP Context Organization fields below 
   
   #CTRP Organizaiton ID is the Source ID when the Source Context is CTRP
   #Phone Number “|” Extension (#Single Field)
    #Context Organization ID is the Organization Primary Key
    
    |CTRP Organization ID|
    |Source Context: CTEP|
    |Source ID|
    |CTEP Organization Type|
    |Source Status|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State|
    |Postal Code|
    |Country|
    |Email|
    |Phone Number Extension |
    |Context Organization ID |
    |Service Request |
    |Processing Status|
    
  
     Scenario: #2a Phone Number and phone number extension mapping
    Given I am on the CTRP PO application
     When CTRP receives newly created CTEP Organization record through Restful Services
     And phone number, phone extension will be received from CTEP as a single field type
      |Phone Number “|” Extension |
     Then phone number field received from CTEP should be mapped in two separate fields in CTRP
     |Phone Number|
     |Phone Number Extension|

Scenario:#3 Organization Source Status CTEP available list
    Given I am logged into the PO application
     When I am on the CTEP Org tab
     Then the organization source status type will be available 
     
     |Active|
     |Inactive|
     |Legacy|
     
       Scenario Outline:#3a Context Source Status mapping rules 
    Given I am logged into the PO application
     When CTEP Source Status is <CTEPS>
     Then The CTRP Source Status will be <CTRPS>
     
     Examples:
     
     |CTEPS   |CTRPS    |
     |Active  |Active   |
     |Inactive|Nullified|
     |Legacy  |Inactive |

    
Scenario: #4 CTEP Context Mandatory Fields
    Given I am logged into the CTRP 
     When A CTEP Context is created in CTRP
     Then the fields type are mandatory
    
    |Source Context: CTEP|
    |Source ID|
    |CTEP Organization Type|
    |Source Status|
    |Name|
    |Address|
    |City|
    |Country|
    |Service Request |
    |Processing Status|
    
    
      Scenario:#5 As I Curator, I can use the Clone function available on the CTEP screen 
    Given I am logged into the PO aplication 
    And I am on the CTEP view of an organization
    When the CTEP organization is associated with a CTRP Organization
    And the displayed CTRP Organization ID on the CTEP context screen is not NULL 
 	Then the "Clone" button will be disabled 
    When the CTEP organization is NOT associated with a CTRP Organization
    And the displayed CTRP Organization ID on the CTEP context screen is NULL 
 	Then the "Clone" button will be enabled
    
   
   Scenario: #6 As a PO Curator, I can search a NEW CTEP Organization to create a CTRP Context 
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select"Incomplete" from Processing Status field
    And I select Source context as CTEP
    And I select "Create" from Service Request field
     And the organization search results will display 
    Then I can view CTEP Organizations with Processing Status of "Incomplete" and a Service Request of "Create" 
     When I click on the selected CTEP Organization 
    Then the CTEP context will be displayed in the view Organization screen in a CTEP Tab
   When the curator clicks on the "Clone" button
    Then the CTRP system will search Active CTRP organizations with  matching "organization Name" and "Organization State and Country" 
    When the CTEP Organization does not match an existing CTRP Context Organization name and Organization State and Country
    Then a new CTRP Organization will be created  
   And the Created CTRP Context will be associated with the selected CTEP Organization
   And the CTRP Org will have an "Active" source status and a "Complete" Processing status
   And the CTEP Processing status will be updated automatically from "Incomplete" to "Complete"
   And the CTEP Service Request will be updated automatically from "Create" to "Null" 
    
    
   
    Scenario: #7 As a PO Curator,I can associate an existing CTRP Organization with a CTEP Organization 
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select"Incomplete" from "Processing Status" 
    And I select Source context as CTEP
    And I select "Create" from "Service Request"
    Then I can view Organizations in the CTEP Context with Processing Status of "Incomplete" and a Service Request of "Create" 
    When I select a CTEP organization from the search results
    Then the CTEP context will be displayed in the view Organization screen in a CTEP Tab
    When the Curator clicks on the "Clone" button
    Then the CTRP system will search Active CTRP Organizations with matching CTEP "organization Name" and CTEP "Organization State and Country" 
    When the CTEP Organization matches an existing CTRP Context Organization name and Organization State and Country
   Then a Warning:"Possible Matching CTRP Organization" 
    And a list of CTRP Context Organization ID(s) will be displayed
    And the curator will search matching CTRP Organization to complete the association to CTEP
   And the CTEP Processing status will be updated automatically from "Incomplete" to "Complete"
   And the CTEP Service Request will be updated automatically from "Create" to "Null" 
   And the CTRP Org will have an "Active" source status and a "Complete" Processing status 
    
    
    Scenario: #8 CTRP Organization information gets updated with the New Address information received from CTEP
    Given I am on the Search Organizations Screen
    When CTEP updated organization information is sent to CTRP via Restful service
    And the CTRP processing status is "Complete"
    Then the CTEP Service Request will be set to "Update"
    And the CTEP "Processing Status" will be set to "Incomplete"
    Then CTEP Context will be updated automatically with the new information received from the Restful service
    When CTEP updates the organization Information fields type
    
    |Source ID|
    |Source Status|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State|
    |Postal Code|
    |Country|
    |Email|
    |Phone Number Extension |
    
    When the CTRP Context is NOT "Nullified"
    Then The CTRP Context information fields will be automatically Updated with the information from the CTEP Context information fields
    And the CTRP Processing status will remain "Complete"
    And the CTEP processing Status will be automatically changed from "Incomplete" to "Complete"
    And  the CTEP Service Request will be automatically changed from "Update" To "Null"
    
    
    
    
    Scenario: #9  CTRP Organization information gets updated with the New Org Name information received from CTEP
    Given I am on the Search Organizations Screen
    When CTEP updated organization information is sent to CTRP via Restful service
    And the CTEP Service Request will be set to "Update"
    And the CTEP "Processing Status" will be set to "Incomplete"
    Then CTEP Context will be updated automatically with the new information received from the Restful service
    When the CTEP context update IS a New Organization Name
    Then the CTRP Context Organization name field is NOT automatically updated
    And the CTRP Processing Status will be "Incomplete"
    When the curator saves their changes to the CTRP context
    And the CTRP Processing Status will be set to "Complete"
   Then the curator will update the CTEP Processing Status from "Incomplete" to "Complete"
   And the curator will update the CTEP Service Request from "Update" to "Null"
   
 
   Scenario: #10 As a CTRP PO Curator I can approve or deny a CTRP request for creating a new organization in CTRP
    Given I am logged into the CTRP  
     And I have received a request to create a new organization in CTRP
    When the requested organization does not exist in the CTRP Context
    Then I can create the requested organization in the CTRP Context
    And the CTRP Context Organization Status is "Active"
    And the CTRP Context Processing Status is "Complete"
    And I can send the CTRP Organization context to the CTEP-ECM

    
    Scenario:#11 CTRP links CTEP created organization record based on a new organization created in CTRP
    Given I am logged into the CTRP 
    When CTEP creates an organization based on a new organization created in CTRP
    Then CTEP sends organization records to CTRP via Restful Services including the CTRP Organization ID 
    And CTEP Context for the received organization is created and automatically linked to the CTRP Context
   And CTEP Context Organization ID  will be sent to CTEP
   And the CTEP processing status will be "Complete"
   And the CTEP service request will be set to "Null"
   And the CTRP processing status will be"Complete"
   And the CTRP source status will be "Active"

       Scenario: #12 NLM context created in CTRP
    Given I am logged into the CTEP
     When A trial is imported with a Sponsor Name that does not exist in the NLM Context
     Then CTRP automatically creates an NLM Context with an "Incomplete" Processing Status and "Create" Service Request with information type
     And a Unique Context Org ID will be assigned to the NLM context
     And an NLM Org Status will be "Active"
     
       Scenario: #13 NLM Fields List
    Given I am on view organization NLM tab 
     Then I can view NLM fields details
     #Name = Sponsor
	 |Source Context: NLM|
     |Name|
     |NLM Context Organization ID|
     |Source Status|
     |Service Request|
     |Processing Status|

    Scenario:#14 I can search a NLM Organization to be associated with an Organization in the CTRP Context 
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select Processing status of "Incomplete"
    And I select Source context of "NLM"
    And I select a Service Request of "Create"
    Then I can view Organizations in the NLM Context with Incomplete status 
     And the curator can search matching CTRP organizations
    When the Imported organization name does not match an existing CTRP Org name
    Then I can create a NEW CTRP Organization 
    And the CTRP source status will be "Active"
    And the CTRP processing status will be "Complete"
    And the created CTRP org will be associated with the NLM org
    And the curator will update NLM processing status to "Complete"
    And the curator will update the NLM service request to "NULL"
     When the imported Organization name matches an existing CTRP org
     Then the NLM organization can be associated with the selected CTRP organization 
    And the CTRP source status will be "Active"
    And the CTRP processing status will be changes from" Incomplete" to "Complete"
    And the NLM processing status to "Complete"
    And the NLM service request will be changed from "Create "to "NULL"
    
    Scenario:#15 Curator can identify when two organizations are to be merged 
    Given I am logged into the CTRP 
     When CTEP Indicates via REST Service that two Organizations are to be merged
     And the CTEP Organizations <OrganizationnName> will have CTEP Context Org ID <CTEPContextOrgID>, CTRP Org ID <CTRPOrgID>, Service request <CTEPServiceRequest>, processing status <CTEPProcessingStatus>, and Organization status <CTEPStatus>and CTRP Organization Status <CTRPOrgStatus>
    
     |OrganizationName                     |CTEPContextOrgID  |CTRPOrgID          |CTEPServiceRequest       |CTEPprocessingStatus       |CTEPStatus      |CTRPStatusType  |
     |ACORN Research,LLC                   |65016645          |8352734            |Merge ID                 |Incomplete                 |Active          |Active          |       
     |Actelion Pharmaceuticals Switzerland |76983647          |8149074            |Merge ID                 |Incomplete                 |Inactive        |Active          |       
      
     Then the curator will search CTEP Context for organization where Service request is "Merge with CTEP ID"
     And the curator will search for matching organizations in the CTRP Context
     When Matching CTRP organizations found
     Then The CTRP organization matching CTEP organization with inactive status will be Nullified
    And  the organizations <OrganizationName> will have PK ID <CTEPContextOrgID>, CTRP ID <CTRPOrgID>, Service request <CTEPServiceRequest>, processing status <CTEPProcessingStatus>, and CTEP Organization status <CTEPStatus> and CTRP Organization Status <CTRPOrgStatus> 
     
     |OrganizationName                     |CTEPContextOrgID  |CTRPOrgID          |CTEPServiceRequest       |CTEPprocessingStatus       |CTEPStatus      |CTRPStatus      |
     |ACORN Research,LLC                   |65016645          |8352734            |NULL                     |Complete                   |Active          |Active          |         
     |Actelion Pharmaceuticals Switzerland |76983647          |8149074            |NULL                     |complete                   |Inactive        |Nullified       |        
      
     And the curator will select the CTRP organization associated with the CTEP Active organization to replace the trial associations of the nullified organization
     And the CTRP Organization with the Nullified status will be added to the Aliases of the CTRP Organization with the Active Status
     
    
    
   
    
    