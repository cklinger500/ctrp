@PA @global
Feature: PAM F26 Results Reporting Dashboard - Designees

As a CTRP PA Abstractor, I can view and edit the CTRP Results Reporting Dashboard

Scenario: #1 I can view the Results Reporting Dashboard - Designees
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select Add/Update Results Designee Or PIO Contact
Then a list of all designees will be displayed 
 
And will display the following fields
|Contact Type|
|Family|
|Organization|
|Last Name|
|First Name|
|PRS User Name|
|E-mail|
|Phone|
|Phone Extension|
|PRS Access Revoked|

And the default sort order is by Contact type, then Family alphabetically and then by Last Name alphabetically
And the following columns can be sorted
|Contact Type|
|Family|
|Organization|
|Last Name|
|First Name|
|PRS User Name|
|E-mail|
|Phone|
|Phone Extension|
|PRS Access Revoked|

And the following columns can be filtered
|Contact Type|
|Family|
|Organization|
|Last Name|
|First Name|
|PRS User Name|
|E-mail|
|Phone|
|Phone Ext|
|PRS Access Revoked|

Scenario: #2 I can Search the Results Reporting Dashboard - Designees
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select Add/Update Results Designee Or PIO Contact
And a list of all designees will be displayed
And I can select a Contact Type
|Designee|
|PIO Contact
And I can select a family
And I can select an organization using the organization look up
And I can enter a last name
And I can enter a first name
And I can enter a PRS Username
And I can enter a e-mail address
And I can enter a phone number
When I select Search
Then the designee list will display on those designees that meet the selected criteria

Scenario: #3 I can edit a Designee
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select Add/Update Results Designee Or PIO Contact
And a list of all designees will be displayed
When I select a Designee
Then I can select a different Contact Type
|Designee|
|PIO Contact
And I can select a different organization using the organization look up
And I can edit the last name
And I can edit the first name
And I can edit the PRS Username
And I can edit the e-mail address
And I can edit the phone number
And I can edit the phone extension
And I can select a PRS Access Revoked
|Yes|
|No|
And I select Save
Then the edited information will be associated with the designee 

Scenario: #4 I can add a new Designee - General
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select Add/Update Results Designee Or PIO Contact
And a list of all designees will be displayed
And I select Add
When I select General from the list of 
|Person|
|CTRP User|
|General|
Then I can select a Contact Type
|Designee|
|PIO Contact
And I can select a organization using the organization look up
And I can enter a last name
And I can enter a first name
And I can enter the PRS Username
And I can enter an e-mail address
And I can enter a phone number
And I can enter a phone extension
And I can select a PRS Access Revoked
|Yes|
|No|
And I select Save
Then a new designee will be created and the information will be associated with the new designee
And a new Designee ID will be associated with the designee in the format RD0001
And the source will be General

Scenario: #5 I can add a new Designee - Person
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select Add/Update Results Designee Or PIO Contact
And I select Add
And I select Person from the list of 
|Person|
|CTRP User|
|General|
When I select a person using the Person Look Up
Then I can select a Contact Type
|Designee|
|PIO Contact
And I can edit the PRS Username
And I can edit the e-mail address
And I can edit the phone number
And I can edit the hone extension
And I can select a PRS Access Revoked
|Yes|
|No|
And I select Save
Then a new designee will be created and the information will be associated with the new designee
And the organization associated with Person will be the organization for the designee
And the first name associated with the Person will be the first name for the designee
And the last name associated with the Person will be the last name for the designee
And the source will be Person
And the source ID will be the Person ID
And a new Designee ID will be associated with the designee in the format RD0001

Scenario: #6 I can add a new Designee - CTRP User
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select Add/Update Results Designee Or PIO Contact
And a list of all designees will be displayed
And I select Add
And I select Person from the list of 
|Person|
|CTRP User|
|General|
When I select a CTRP User from list of CTRP Users
Then I can select a Contact Type
|Designee|
|PIO Contact
And I can edit the PRS Username
And I can edit the e-mail address
And I can edit the phone number
And I can edit the hone extension
And I can select a PRS Access Revoked
|Yes|
|No|
And I select Save
Then a new designee will be created and the information will be associated with the new designee
And the organization associated with CTRP User will be the organization for the designee
And the first name associated with the CTRP User will be the first name for the designee
And the last name associated with the CTRP User will be the last name for the designee
And the source will be CTRP User
And the source ID will be the CTRP User ID
And a new Designee ID will be associated with the designee in the format RD0001

Scenario: #7 I can export the designees into an Excel spreadsheet
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select Add/Update Results Designee Or PIO Contact
And a list of all designees will be displayed
And I select Export to Excel
Then the list of designees will be exported to an Excel format spreadsheet 
And will include the following fields:
|Designee ID|
|Contact Type|
|Family|
|Organization|
|Last Name|
|First Name|
|PRS User Name|
|E-mail|
|Phone|
|Phone Extension|
|PRS Access Revoked|

Scenario: #8 Required fields for a designee
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select Add/Update Results Designee Or PIO Contact
And a list of all designees will be displayed
And I select a designee
Then the following fields are required: 
|Contact Type|
|Organization|
|Last Name|
|E-mail|
|Phone|
