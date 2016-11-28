@PA @global
Feature: PAA F01 Add and Edit General Trial Details

As any CTRP PA User, I can enter general trial details

Scenario: #1 I can enter the different Protocol Identifiers for a trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I can edit the lead organization trial identifier
And I can optionally enter or edit one or more Other Trial Identifiers
Then the Protocol Identifier section will be complete

Scenario: #1a Duplicate and format rules for Other Trial Identifiers
Given I have selected a trial to abstract
And I am on the General Trial Details screen
Then I should be allowed to enter one "ClinicalTrials.gov Identifier"
And I should be allowed to enter more than one unique IDs with "Obsolete ClinicalTrials.gov Identifier"
And the "Obsolete ClinicalTrials.gov Identifier" must not be the same as the "ClinicalTrials.gov Identifier"
And I should verify for valid "ClinicalTrials.gov Identifier" format as NCT followed by 8 numeric characters <NCT00000000>
And I should verify for valid "Obsolete ClinicalTrials.gov Identifier" format as NCT followed by 8 numeric characters <NCT00000000>
And I should be allowed to enter more than one unique IDs with "Duplicate NCI Identifier"
And the "Duplicate NCI Identifier" must not be the same as the "NCI Trial ID"
And I should check for valid "Duplicate NCI Identifier" format as NCI-YYYY-nnnnn <NCI-2016-00123>
And I should be allowed to enter more than one unique IDs with "Other Identifier"
And I should be allowed to enter more than one unique IDs with "Duplicate NCI Identifier"
And I should be allowed to enter one "DCP Identifier" with unique IDs
And I should be allowed to enter one "CTEP Identifier" with unique IDs
And I should be allowed to enter one "CCR Identifier" with unique IDs
And I should be allowed to enter one "CDR Identifier" with unique IDs
Then a comment appears below the all identifiers fields to display the number of characters available to enter into the field.  
|30 characters left|
And "x characters left" will be displayed as characters are added
When 30 characters have been entered
Then no additional text can be entered

And all Trial Identifiers should not be more than 30 characters in Length
Then the Protocol Identifiers section will indicate zero errors

Scenario: #2 I can enter the Acronym and Official Title for a trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I edit the Official Title for the trial
Then a comment appears below the Official Title field to display the number of characters available to enter into the field.  
|600 characters left|
And "x characters left" will be displayed as characters are added
When 600 characters have been entered
Then no additional text can be entered
And I can optionally enter or edit the Acronym for the trial
Then a comment appears below the Acronym field to display the number of characters available to enter into the field.  
|14 characters left|
And "x characters left" will be displayed as characters are added
When 14 characters have been entered
Then no additional text can be entered
Then the title section will be complete

Scenario: #3 I can enter the Keywords for a trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I can enter or edit the Keywords for the trial identifier
Then the Keywords section will be complete

Scenario: #4 I can associate an organization as the Lead Organization on a clinical trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I have selected organization look-up
Then I can search for an organization and select one from the list 
And the selected organization will be associated to the trail as the Lead Organization

Scenario: #5 I can associate a person as the Principal Investigator on a clinical trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I have performed a person look-up
And I have selected a person as the trial's Principal Investigator in the General Trial Details Screens
Then the selected person will be associated to the trial as Principal Investigator

Scenario: #6 I can associate an organization as the Sponsor Organization on a clinical trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I have selected Sponsor organization look-up
Then I can select an organization from the list 
And the selected organization will be associated to the trail as the Sponsor

Scenario: #7 I can associate the Primary Investigator as the Central Contact or for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And selected the radio button for PI
And the phone #, extension and e-mail address is displayed 
Then I can edit the phone #, extension and e-mail address 
And the PI, phone #, extension and e-mail address will be associated with this trail

Scenario: #8 I can associate a person as the Central Contact or for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I select the radio button for Person
And preform a person look up and select a person
And the selected Person, their phone #, extension and e-mail address will be displayed
Then I can edit the phone # and e-mail address 
And the Person, phone #, extension and e-mail address will be associated with this trail

Scenario: #9 I can associate General Central Contact for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I select the radio button for General Contact
And I enter the Central Contact Name
And I enter either a Central Contact Phone Number and extension or Central Contact E-Mail Address or both
Then the selected Central Contact, Phone #, extension and e-mail address will be Central contact for the trial

Scenario: #10 Save General Trials Details information
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When select save 
Then the information entered or edited on the General Trails Details screen will be saved to the trial record

Scenario: #11 Cancel General Trials Details information
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When select Reset
Then the information entered or edited on the General Trails Details screen will not be saved to the trial record 
And the General Trial Details screen will be refreshed with the existing data

Scenario: #12 Protocol ID not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And the protocol ID is Null
When I select save
Then a warning message will appear "Protocol Identifier is Reqiured"

Scenario: #13 Official Title not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And the Official Title is Null
When I select save
Then a warning message will appear �Official Title is Required�

Scenario: #14 Lead Organization is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And the Lead Organization is Null
When I select save
Then a warning message will appear �Lead Organization is Required�

Scenario: #15 Principal Investigator is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And the Principal Investigator is Null
When I select save
Then a warning message will appear �Principal Investigator is Required�

Scenario: #16 Sponsor is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And the Sponsor is Null
When I select save
Then a warning message will appear �Sponsor is Required�

Scenario: # 17 e-mail address format
Given I have selected a trial to abstract
And I am on the General Trial Details screen
And I have selected e-mail address field 
And I change the e-mail address in the format "text"@"text"."text" 
When I change the e-mail address and the format is not "text"@"text"."text"
Then the system displays a warning message that says "The E-mail address is incorrect"

Scenario: #18 PA General Trials Details Keywords field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the General Trails Details Screen
Then a comment appears below the Keywords field to display the number of characters available to enter into the field.  
|4000 characters left|
And "x characters left" will be displayed as characters are added
When 4000 characters have been entered
Then no additional text can be entered




