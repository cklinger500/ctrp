@PO @Global
Feature: PO F4 I can edit and Associate Organization Context 

     Scenario:#1 As a Curator, I can Edit created Organization
    Given I am logged in to CTRP PO application
    And I am on the search Organization results screen
     When I select an organization I want to edit
     Then the edit screen will display
     And I can edit fields type
     
      |Name|
      |Source Status|
      |Processing Status|
      |Name Alias|
      |address1|
      |address2|
      |country|
      |State|
      |City|
      |Postal Code|
      |Email|
      |Phone Number|
      |Phone Number: Extension|
     And Source Status"Nullified" can be allowed only from the search Org results 
	When I click on the save button
     Then the edited information will be saved to the trial records
     And my name should be listed as last update <Update By> with the current date and time "ctrpadmin (13-Sep-2016 12:26:23 EDT)" 
   
     
    
  Scenario:#2 As a Curator, I can reset the edit values during the edit process
    Given I am On the Edit Organization screen
    And I want to cancel my changes
    When I select the Reset function
    Then edit form will be refreshed with the last committed values for the selected organization

  Scenario:#3 As a Curator, I am allowed to Edit Organization when I am on the CTRP Context
    Given I know which organization I want to edit
    And I am logged in to the CTRP PO Application
    And I have selected the organization I want to edit
    And I am on the Edit Organization screen
    When I am on the CTRP context and 
    Then I should be allowed to edit editable features
    

  Scenario:#4 As a Curator, I should not be allowed to Edit Organization when I am on the CTEP Context
    Given I know wich organization I want to edit
    And I am logged in to the CTRP PO Application
    And I have selected the organization I want to edit
    And I am on the Edit Organization screen
    When I am on the CTEP Context 
    Then I should not be allowed to edit any features
    
    Scenario:#5 As a Curator, I should not be allowed to Edit Organization when I am on the NLM Context
    Given I know wich organization I want to edit
    And I am logged in to the CTRP PO Application
    And I have selected the organization I want to edit
    And I am on the Edit Organization screen
    When I am on the NLM Context 
    Then I should not be allowed to edit any features
    
    
    Scenario: #6 As a Curator, I can associate a CTRP organization with an Existing CTEP organization
    Given I am a curator 
    And I am on the CTRP PO Application
     And I have created an Organization record in CTRP
     When I click on the Associate Organization Context Button <Associate Organization Context> 
     Then the Search Organizations screen opens
     And I can search for matching organizations with "ACTIVE" Source Status in "CTEP" context type
      When a CTEP organization name, state and country matches the CTRP organization name, state and country
      Then the resulted search will display matching CTEP Organization record with columns type
      And the curator can select the matching CTEP organization to link to CTRP org
      When the curator clicks on Associate Selection Button <AssociateSelection> to associate selection
      Then the CTEP-CTRP association is complete
       And the CTEP Organization will be displayed on the same Edit Organization screen in a new tab labeled "CTEP"
    	And the CTEP Processing status will be "complete"
     And The CTEP Service Request will be "NULL" 
     And CTEP Organization can be associated to only one CTRP organization
      #And BOTH organizations Source Status must be "Active"
      And Organizations can be associated only from the CTRP context 
      And all Associated Organizations will be displayed on the Edit organization CTRP Tab 
   
  
    Scenario: #7 As a Curator, I can associate a CTRP organization with an Existing NLM organization
    Given I am a curator 
    And I am on the CTRP PO Application
     And I have created an Organization record in CTRP
     When I click on the Associate Organization Context Button <Associate Organization Context> 
     Then the Search Organizations screen opens
     And I can search for matching organizations with "ACTIVE" Source Status in "NLM" context 
      When an NLM organization name (Sponsor) matches the CTRP organization name
      Then the resulted search will display matching NLM Organization record 
      And the curator can select the matching NLM organization to associate with the CTRP org
      When the curator clicks on Associate Selection Button <AssociateSelection> to associate selection
      Then the CTRP-NLM association is complete
      And the NLM Organizations will be displayed on the Edit Organization screen in a new tab called "NLM"
      And the NLM Processing status will be "complete" 
      And the NLM Service Request will be NULL 
      And More than one NLM Organizations can be associated to one CTRP organization
      #And Both organizations Source Status must be "Active" 
      And all Associated Organizations will be displayed on the Edit organization CTRP Tab 
     

