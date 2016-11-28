@Acc @global

Feature: Acc F05 Search Diseases
As a CTRP Accrual User, I can Search Diseases in the CTRP Accrual Application 

    Scenario:#1 I can Search Diseases
    Given Given I am logged into the CTRP Accrual Application 
    When I have clicked on the Disease Search tab on the toolbar
    Then the Search Diseases screen displays 
    And I must enter a Disease Name
    And I must enter a Disease Code
    And I can select a Disease Code System type
    
    
      |SDC  |
      |ICD10  |
      |ICD9  |
      |ICD-O-3  |
      |Legacy Codes-CTEP  |

	When I have clicked on the search button
    Then a list of diseases details will be displayed
    
    
      |Name  |
      |Code  |
      |System  |
      |Menu Display Name  |

    
      Scenario:# Disease Search Mandatory Fields
    Given I am on the Search Diseases Screen
    When I have not entered a Disease Name
    And I have not entered a Disease Code
    Then the "error: Please enter a name or code to search." will be displayed