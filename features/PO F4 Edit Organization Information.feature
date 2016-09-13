@PO @Global
Feature: PO F4 Edit Organization Information


  Scenario:#1 As a Curator, I can Edit organization name
    Given I know which organization I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I am on the edit organization information screen
    And I change the name of the organization I wish to edit
    And I set the organization status to either Pending or Active
    And I submit my edit request
    Then the system should change the organization name in the organization record to the new name
    And my name should be listed as last update with the current date and time
    And the organization status should be Pending or Active as indicated

  Scenario:#2 As a Curator, I can Edit organization address
    Given I know which organization I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I am on the edit organization information screen
    And I change the address of the organization I wish to edit
    And I set the organization status to either Pending or Active
    And I submit my edit request
    Then the system should change the organization address in the organization record to the new address
    And my name should be listed as last update with the current date and time
    And the organization status should be Pending or Active as indicated

  Scenario:#3 As Curator, I can Edit organization phone number
    Given I know which organization I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I am on the edit organization information screen
    And I change the phone number of the organization I wish to edit
    And I set the organization status to either Pending or Active
    And I submit my edit request
    Then the system should change the organization phone number in the organization record to the new phone number
    And my name should be listed as last update with the current date and time
    And the organization status should be Pending or Active as indicated

  Scenario:#4 As a Curator, I can Edit organization email
    Given I know which organization I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I am on the edit organization information screen
    And I change the email of the organization I wish to edit
    And I set the organization status to either Pending or Active
    And I submit my edit request
    Then the system should change the organization email in the organization record to the new email
    And my name should be listed as last update with the current date and time
    And the organization status should be Pending or Active as indicated

  Scenario:#5 As a Curator, I can Edit organization city
    Given I know which organization I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I am on the edit organization information screen
    And I change the city of the organization I wish to edit
    And I set the organization status to either Pending or Active
    And I submit my edit request
    Then the system should change the city in the organization record to the new city
    And my name should be listed as last update with the current date and time
    And the organization status should be Pending or Active as indicated

  Scenario:#6 As a Curator, I can Edit organization state
    Given I know which organization I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I am on the edit organization information screen
    And I change the state of the organization I wish to edit
    And I set the organization status to either Pending or Active
    And I submit my edit request
    Then the system should change the state in the organization record to the new state
    And my name should be listed as last update with the current date and time
    And the organization status should be Pending or Active as indicated

  Scenario:#7 As a Curator, I can Edit organization country
    Given I know which organization I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I am on the edit organization information screen
    And I change the country of the organization I wish to edit
    And I set the organization status to either Pending or Active
    And I submit my edit request
    Then the system should change the country in the organization record to the new country
    And my name should be listed as last update with the current date and time
    And the organization status should be Pending or Active as indicated

  Scenario:#8 As a Curator, I can Edit organization zip code
    Given I know which organization I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I am on the edit organization information screen
    And I change the zip code of the organization I wish to edit
    And I set the organization status to either Pending or Active
    And I submit my edit request
    Then the system should change the zip code in the organization record to the new zip code
    And my name should be listed as last update with the current date and time
    And the organization status should be Pending or Active as indicated

  Scenario:#9 As a Curator, I can Edit organizations with multiple parameters
    Given I know which organization I want to edit
    And I am logged in to CTRP PO application
    And I have searched for a CTRP organization and found the one I wish to edit
    And I have selected the function Edit Organization
    And I am on the edit organization information screen
    And I change multiple parameters of the organization I wish to edit
    And I set the organization status to either Pending or Active
    And I submit my edit request
    Then the system should change all the parameters in the organization record
    And my name should be listed as last update with the current date and time
    And the organization status should be Pending or Active as indicated
    
    
    Scenario:#9a As a Curator, I can Edit created Organization
    Given I am logged in to CTRP PO application
    And I am on the search Organization results screen
     When I select an organization I want to edit
     Then the edit screen will display
     And I can edit all fields except
     
     |CTRP Organization ID|
     |Context Organization ID|
     |Source ID|
     |Source Context|
     When I click on the save button
     Then the edited information will be saved to the trial records
     When I select Reset 
     Then the information entered or edited on the Add Organization screen fields will not be saved to the trial record 
      And the Add Organization information screen will be refreshed with the existing data
     

  Scenario:#10 As a Curator, I can reset the edit values during the edit process
    Given I am in the Edit Organization feature
    And I want to cancel my changes
    When I select the Reset function
    Then edit form will be refreshed with the last committed values for the selected organization

  Scenario:#11 As a Curator, I am allowed to Edit Organization when I am on the CTRP Context
    Given I know which organization I want to edit
    And I am logged in to the CTRP PO Application
    And I have selected the organization I want to edit
    And I am on the Edit Organization screen
    When I am on the CTRP context and my write mode should be on
    Then I should be allowed to edit editable features
    When I am on the CTRP Context and my write mode is off
    Then I will not be able to edit editable features

  Scenario:#12 As a Curator, I should not be allowed to Edit Organization when I am on the CTEP Context
    Given I know wich organization I want to edit
    And I am logged in to the CTRP PO Application
    And I have selected the organization I want to edit
    And I am on the Edit Organization screen
    When I am on the CTEP or NLM Context and my write mode is on
    Then I should not be allowed to edit any features
    When I am on the CTEP or NLM Context and my write mode is off
    Then I should not be allowed to edit any features


