@Global @Reg
Feature: Reg F18 Amend Trial

As a CTRP User, I can Amend information on a trial which requires IRB approval or substantively alter the treatment and/or study design

Scenario: #1 I search my trials, select the Amend Trial option, and enter trial amendment information
Given I am in the CTRP Registration application
And I have selected the option to search my trials in CTRP (trials where I am listed as owner)
And I am the Trial Owner
When the Amend Trial option is enabled on one of my trials
And I have selected the Amend Trial option
Then all trial information will be displayed for the last active submission
And I will enter the required Amendment Number and Amendment Date
And I will be able to update the Lead Organization Trial Identifier 
And I will be able to update the ClinicalTrials.gov Identifier listed for the trial
And I will be able to add Other Trial Identifiers
And I will be able to update the Trial Title, Phase, Primary and Secondary Purpose
And I will be able to update the Lead Organization and Principal Investigator
And I will be able to update the Funding Sponsor and add additional Funding Sponsors
And I will be able to update the Program Code
And I will be able to add Grant Information
And I will be able to update trial status and trial status dates and edit trial status history
And I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates
And I will be able to add additional IND or IDE information
And I will be able to update participating site status
And I will be able to review existing Trial Related Documents type
And I will enter the required amended Protocol Document
And I will enter the required Change Memo Document or Protocol Highlighted Document
And I will enter the IRB Approval Document
And I will be able to review or cancel my amended information

Scenario: #2 I will be be able to submit an amended trial after reviewing the trial with no errors
Given I am in the CTRP Registration application
And I am on the Amendment Trial screen
And the Submission source is a Cancer Center
And the Submission Method is Registry
And the Submission Type is Amendment 
And I have entered the required trial amendment information
When I select the review option
Then CTRP will check the amended information 
And if there are no errors, I can submit the trial amendment
And the information updates will be submitted as an amendment with the Amendment Number in CTRP
And an email entitled " Amendment Submission" will be sent to the the trial owner (Emails list found on the shared drive under Functional/registration: CTRP System Generated Emails)
And the CTRO will be able to abstract the amended trial information
And the Submission source is a Cancer Center
And the Submission Method is Registry
And the Submission Type is Amendment

Scenario: #3 I will be be able to edit an amended trial after reviewing the trial with no errors
Given I am in the CTRP Registration application
And I am on the Amendment Trial screen
And I have entered the required trial amendment information
When I select the review option
Then CTRP will check the amended information 
And if there are no errors, I can select the option to Edit the trial information before submitting

 Scenario:#4 Documents Displayed during Amendment 
    Given I am in the CTRP Registration Application 
     When I have selected the option to search My Trials in CTRP
     And I am the Trial Owner
     When I have selected the Amend option after an original Submission
     Then the documents type will be displayed 
      
      |Protocol Document- Current Protocol |
      |IRB Approval- Current IRB Approval  |
      |Informed Consent Document- Current Informed Consent Document |
      |Other- Current Other Documents |
      |TSR- Current TSR    |
      

     When I have selected the Amend option after an Amendment 
     Then the documents type will be displayed 
      
      |Protocol Document- Current Protocol |
      |IRB Approval- Current IRB Approval  |
      |Change Memo -Current Change Memo|
      |Protocol Highlighted Document: Current Protocol Highlighted Document|
      |Other- Current Other Documents |
      |TSR- Current TSR    |
      
      
Scenario:#5 Delete option should not be included for existing documents 
    Given I am in the CTRP Registration Application 
     When I Amend a trial 
     Then I can see the most current documents
     And the delete option should not be included for existing documents

Scenario: #6 As a Trial Owner, I can Amend Participating Sites Recruitment Status, Date and general contact
Given I am logged into the CTRP Registration application
And I search for a Trial which has been abstracted and has a Participating site added to it
And I have selected the Amend option
Then I can view participating sites details
     
     |CTRP Org ID|#(Group ID)
     |CTRP Organization Name|
     |Principal Investigator|# (Last Name, First Name)
     |Local Trial Identifier|
     |Program Code|
     |Current Site Recruitment Status|
     |Current Site Recruitment Status Date|
     |Primary Contact|# (Last Name, First Name)
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
     
And only the participating site fields type will be editable
     |Current Site Recruitment Status|
     |Current Site Recruitment Status Date|
     |General Contact|
When I click on the save button
Then the updated participating site details will be saved in the trial record

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

