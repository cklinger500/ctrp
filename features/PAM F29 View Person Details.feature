@PA @Global
Feature: PAM F28 I can view Person Details as "Abstractor" and "Read Only" roles   

Scenario:#1  I can view a Person
Given I am logged in to CTRP
And I am on the search Person results screen
When I select a Person 
Then the Person details screen will displayed 
When the context is CTEP
Then the following fields will be displayed
|CTRP ID  #Grouping ID|
|Prefix|
|First Name|
|Middle Name|
|Last Name|
|Suffix|
|Context Person ID #Primary Key|
|Source Status|
|Source Context|
|Source ID|
|Phone Extension|
|E-mail|
|Affiliated Organization CTRP ID|
|Affiliated Organization Name|
|Affiliation Start Date|
|Affiliation End Date|
|Processing Status|
|Last Updated By|
|Last Updated Date|
|Comments|
And when there are other contexts for this Person
When the context is CTEP
Then the following fields will be displayed
|CTRP ID #Grouping ID|
|Prefix|
|First Name|
|Middle Name|
|Last Name|
|Suffix|
|Context Person ID #Primary Key|
|Source Status|
|Source Context|
|Source ID|
|Phone Extension|
|E-mail|
|Person Registration Type|
|Affiliated Organization CTEP ID|
|Service Request|
|Processing Status|
|Last Updated By|
|Last Updated Date|
|Comments|
When there are other contexts for this Person
And I select a different context tab 
Then the Person details screen will displayed for the selected context   

