@PA @Global
Feature: PAM F28 I can view Organization Details as "Abstractor" and "Read Only" roles   

     Scenario:#1  I can view an Organization
    Given I am logged in to CTRP
    And I am on the search Organization results screen
     When I select an organization 
     Then the organization details screen will displayed 
When the context is CTRP
Then the following fields will be displayed
|CTRP ID #Grouping ID|
|Organization Name|
|Family Name|
|Context Organization ID  #Primary Key|
|Source Status|
|Source Context|
|Source ID|
|Address 1|
|Address 2|
|City|
|State|
|Country|
|Zip|
|Phone|
|Phone Extension|
|E-mail|
|Processing Status|
|Last Updated By|
|Last Updated Date|
|Alias|
|Comments|
And when there are other contexts for this organization
When the context is CTEP
Then the following fields will be displayed
|CTRP ID #Grouping ID|
|Organization Name|
|CTEP Organization Type|
|Context Organization ID  #Primary Key|
|Source Status|
|Source Context|
|Source ID|
|Address 1|
|Address 2|
|Address 3|
|City|
|State|
|Country|
|Zip|
|Phone|
|Phone Extension|
|E-mail|
|Service Request|
|Processing Status|
|Last Updated By|
|Last Updated Date|
|Alias|
|Comments|
When the context is NLM
Then the following fields will be displayed
|CTRP ID|#Grouping ID
|Organization Name|
|Context Organization ID #Primary Key|
|Source Status|
|Source Context|
|Source ID|
|Service Request|
|Processing Status|
|Last Updated By|
|Last Updated Date|
|Comments|
And I select a different context tab 
Then the organization details screen will displayed for the selected context  
 

