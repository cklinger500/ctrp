@Global @Reg
Feature: Reg F22 Manage Participating Site

As a CTRP User I can add/update participating sites

Scenario: #1 As an Site Admin, I can select an organization from my family as a participating site on an Industrial, Other, or Expanded Access Trial
Given I am logged into CTRP Registration application 
And I have performed a trial search for imported Trial
When I select an imported Trial to manage
Then the selected imported trial will display "Manage My Sites" in the available "Action" in the Trial Search Table
When I click on the "Manage My Sites" option
Then the Manage Participating Site screen will display with the following information 

|NCI ID: NCI-2016-00001
|Lead Org Trial Identifier:2013/65|
|Official Title:testtestetest|
|organization Name  |
|Local Trial Identifier  |
|Site Prinicipal Investigator|
|Site Specific Program Code|
|Trial Recruitment Status|
|General Contact Type|
And I will be able to view a list of sites of my Family Organizations in the Add Organization Field
And I can select a participating site I would like to add

Scenario: #2 As a Trial Submitter, I can select my affiliated organization as a participating site on an Industrial, Other, or Expanded Access Trial
Given I am logged into CTRP Registration application 
And I have performed a trial search for imported Trial
When I select an imported Trial to manage
Then the elected imported trial will display "Add My Site" in the available "Action" in the Trial Search Table
When I click on the "Add My Site" option
Then the Add Participating Site screen will display with the following information 

|NCI ID: NCI-2016-00001
|Lead Org Trial Identifier:2013/65|
|Official Title:testtestetest|
|organization Name  |
|Local Trial Identifier  |
|Site Principal Investigator|
|Site Specific Program Code|
|Trial Recruitment Status|
|General Contact Type|
And I will be able to view my affiliated organization in the Add Organization Field
And I can select my affiliated organization to add as a participating site


Scenario Outline: #3 As a CTRP User, I can enter my participating site information after selecting a site as participating on a trial
Given I am on the Add Participating Site screen 
And the participated site fields type wil be populated
|NCI ID: NCI-2016-00001
|Lead Org Trial Identifier:2013/65|
|Official Title:testtestetest|
And I can select a participating site from Organization Name drop list <OrganizationName>
And I can enter a Local Trial Identifier <LocalTrialIdentifier>
And I can search person to add a site principal investigator
And I can add one site principal Investigator 
And I added site investigater role will be defaulted to the "Principal Investigator"
And I can add a site specific program code <SiteSpecificProgramCode>
And I can a general contact type
|Site Investigator|
|Person|
|General|

When I enter one or more Site Recruitment Status type

 |Status Date|
 |Status|
 |Comment|
 
 Then I can click on the add button to add the entered site status
 When I click on the Save button
 Then the added site record entered will be associated with the trial
 Then the View Trial Screen will display with details below
 
 |Trial Identifiers|
 |Trial Details|
 |Lead Organization/Principal Investigator|
 |Sponsor|
 |Data Table 4 Information|
 |Trial Status|
 |Trial Dates|
 |Trial Related Documents|
 |Paticipating Sites Table|
 
   Scenario:#4 Participating Sites Table Columns description
    Given I am on the View Trial Screen
     And I can view Participating Site Table
     And the table displays the columns type
     
     |CTRP Organization ID|
     |Organization Name|
     |Principal Investigator|#(Last Name, First Name)
     |Local Trial Identifier|
     |Program Code|
     |Current Site Recruitment Status|
     |Current Site Recruitment Status Date|
     |Primary Contact|# (Last Name, First Name)
     |Email|
     |Phone Number, Phone Number Extension|
     
     

Scenario: #5 Add Participating Site Mandatory Fields
    Given I am on the Add Participating Site screen
     When Add Participating site fields <PSType> id not added
     Then the error message <PSError> will be displayed
     
     |PSType                   |PSError|
     |Organization Name          |Organization is Required|
     |Local Trial Identifier     |Local Trial Identifier is Required|
     |Site Principal Investigator|Site Principal Investigator is Required|
     |Trial Recruitment Status   |At least one Site Recruitment Status is Required|
     |General Contact            |General Contact is Required|


Scenario: #7 As a CTRP User, I can add a site contact
Given I am on the Add Participating Site feature
And I can select Contact Type 
|Site Investigator|
|Person|
|General|

Scenario: #8 I can add contact when contact type is Site investigator
Given I am on the Contact Screen
When the contact type selected is Site Investigator 
Then I can select the available site principal Investigator 
And the email address will be populated
And Phone Number and Extention will be populated
And the populated parameters can be edited

Scenario: #9 I can add contact when contact type is Person
Given I am on the Contact Screen
When the contact type selected is Person 
Then I can select a person by conducting a Person Search 
And Contact person name will be selected 
And the email address will be populated
And Phone Number and Extention will be populated
And the populated parameters can be edited

Scenario: #10 I can add contact when contact type is General
Given I am on the Contact Screen
When the contact type selected is General
Then I must enter a contact name information
And I must enter an Email Address
And I must enter a Phone Number and Extention
And the entered parameters can be edited

Scenario: #11 As a Site Admin, I can update any added site associated with the admin's family on an Imported trial
Given I am on the manage Participating site
And I can view all participating sites added to an Imported trial
And I can update any sites associated with the site admin  family on an Imported Trial
When I click on the edit button for the site I would like to update
Then a pop up screen will be displayed with the site details
And I can update the Particiapting site details type

|Local Trial Identifier  |
|Site Principal Investigator|
|Site Specific Program Code|
|Trial Recruitment Status|
|General Contact Type|

When I click on the save button 
Then the edited parameters will be saved

Scenario: #12 As a Trial Submitter I can update my participating site I added on an Imported trial
Given I am logged into CTRP Registration application 
And I have performed a trial search for imported Trial
And I select an imported Trial 
When a site was added to the selected imported Trial 
Then the  imported trial will display "Update My Site" in the available "Action" in the Trial Search Table
When I have selected the Available Action to Update My Site
Then the participating site I have added on an Imported trial will be displayed
And I can update any of these data elements:

|Local Trial Identifier  |
|Site Principal Investigator|
|Site Specific Program Code|
|Trial Recruitment Status|
|General Contact Type|
When I click on the save button
Then the updated parameters will be saved