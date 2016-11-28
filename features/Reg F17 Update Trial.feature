@Global @Reg
Feature: Reg F17 Update Trial

As a CTRP User, I can update information on a trial that does not require IRB approval or an amendment

Scenario: #1 I search my trials and select the update option
Given I am logged into the CTRP Registration application
And I have selected the option to search my trials in CTRP
And I am the Trial Owner
When the Update option is enabled on one of my trials
And I have selected the Update option
Then all trial information for the latest submission will be displayed as in Registration with only Update fields enabled Type
      
      |Other Trial Identifier Field   |
      |NIH Grant Information Section  |
      |Trial Status Section           |
      |Trial Dates                    | 
      |Trial Related Documents        |


And I will be able to Update Other Protocol Identifiers to allow both additional Other Protocol Identifiers as well as removing existing
And I will be able to Update Grant Information to allow both additional Grants as well as removing existing
And I can delete existing and add new Trial Status and Trial Status Dates
And I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates
And I will be able to review all existing Trial Related Documents type
And I will be able to add all Trial Related Documents 
When the trial has errors 
Then the Review Button will be displayed to Review the errors
When the trial has no errors
Then the Submit button will be displayed
And I can click on the submit button
And  my trial will be updated in the CTRP application
And the Submission source is a Cancer Center 
And the Submission method is Registry
And Submission type is Update


  Scenario: #2 As a Trial Owner, I can Update Participating Sites Recruitment Status, Date and general contact
Given I am logged into the CTRP Registration application
And I search for a Trial which has been accepted and has a Participating site added to it
And I have selected the Update option
Then I can view participating sites details
     
     #CTRP Org ID = Group ID
     |CTRP ID|
     |CTRP Organization Name|
     # Principal Investigator Format (Last Name, First Name)
     |Principal Investigator|
     |Local Trial Identifier|
     |Program Code|
     |Current Site Recruitment Status|
     |Current Site Recruitment Status Date|
     # Primary Contact format (Last Name, First Name)
     |Primary Contact|
     |Email|
     |Phone Number-Extension|
     
When I select a participating site to edit
Then an edit site pop up screen displays with field type
     |NCI ID|
     |Lead Org Trial Identifier|
     |Official Title|
     |Organization Name|
     |Local Trial Identifier|
     |Site Principal Investigator|
     |Site Specific Program Code|
     |Trial Recruitment Status:Status Date-Status|
     |Contact Type|
     |Contact Name|
     |Contact Email Address|
     |Contact Phone Number-Extension|
     
And only the participating site fields type will be editable
     |Current Site Recruitment Status|
     |Current Site Recruitment Status Date|
     |Contact Type|
     |Contact Name|
     |Contact Email Address|
     |Contact Phone Number-Extension|
     
When I click on the save button
Then the updated participating site details will be saved in the trial record

Scenario: #3 As a CTRP User, I can Update a site contact
Given I am on the Add Participating Site feature
And I can select Contact Type 
|Site Investigator|
|Person|
|General|

Scenario: #4 I can update contact when contact type is Site investigator
Given I am on the Update Participating Sites screen 
When the contact type selected is Site Investigator 
Then the Contact Name gets populated with the Site Principal Investigator name
And the email address will be populated
And Phone Number and Extension will be populated
And only the information type can be edited
     |Contact Email Address|
     |Contact Phone Number-Extension|

Scenario: #5 I can Update contact when contact type is Person
Given I am on the Update Participating Sites screen
When the contact type selected is Person 
Then I can select a person by conducting a Person Search 
And Contact Name will be selected 
And the email address will be populated
And Phone Number and Extension will be populated
And the populated parameters can be edited

Scenario: #6 I can Update contact when contact type is General
Given I am on the Update Participating Sites screen
When the contact type selected is General
Then I must enter a contact name information
And I must enter a contact Email Address
And I must enter a Phone Number and Extension
And the entered parameters can be edited


Scenario: #7 I can reset entered updates
Given I am logged into the CTRP Registration application
And I am on the Trial Update screen
When I update fields on the Trial Update screen
And I click on the reset button
Then all fields updated will be cancelled 
And the new changes will not be saved


Scenario: #8 I search my trials and select the update option
Given I am logged into the CTRP Registration application
And I have selected the option to search my trials in CTRP 
And I am the Trial owner
And I have selected the Update option
And I have made enabled Trial Updates
When I select the review option
Then CTRP will check the updated information 
And if there are no errors, I can submit the trial with indication of a successful submission
And the information updates will be registered in CTRP
And the "Current Verification Date" will be updated
And an email entitled "Updated Trial" will be sent to the trial owner (Locate Email list on the shared drive under Functional/registration as: CTRP System Generated Emails)


  Scenario: #9 Documents Displayed during Update after an Original Submission
    Given I am logged into the CTRP Registration application
     When I have selected the option to search My Trials in CTRP
     And I am the Trial Owner
     When I have selected the Update option before when Submission Accepted milestone is entered
     Then the documents type will be displayed during update
     
     
      |Protocol Document- Current Protocol |
      |IRB Approval- Current IRB Approval  |
      |Informed Consent Document- Current Informed Consent Document |
      |Other- All Other Documents |
      

      When I have selected the Update option when Trial Summary Report Date Milestone is entered
      Then the documents type will be displayed during update
       
      |Protocol Document- Current Protocol |
      |IRB Approval- Current IRB Approval  |
      |Informed Consent Document- Current Informed Consent Document |
      |Other- All Other Documents |
      |TSR- Current TSR    |
      


    Scenario:#10 Documents Displayed during Updated after an Amendment
    Given I am logged into the CTRP Registration application
     When I have selected the option to search My Trials in CTRP
     And I am the Trial Owner
     When I have selected the Update option when Amendment Submission Accepted is entered
     Then the documents type will be displayed during update
      
      |Protocol Document- Current Protocol |
      |IRB Approval- Current IRB Approval  |
      |Change Memo |
      |Protocol Highlighted Document|
      |Other- All Other Documents |
      
      When I have selected the Update option when Trial Summary Report Date Milestone is entered for an Amendment
     Then the documents type will be displayed during update
      |Protocol Document- Current Protocol |
      |IRB Approval- Current IRB Approval  |
      |Change Memo |
      |Protocol Highlighted Document|
      |Other- All Other Documents |
      |TSR- Current TSR (Generated after Trial Summary report Date Milestone)   |   
      

         Scenario:#11 Delete option should not be included for existing documents 
    Given I am logged into the CTRP Registration application
     When I update a trial 
     Then I can see the most current documents
     And the delete option should not be included for existing documents

