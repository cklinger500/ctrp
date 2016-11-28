@Global @Reg
Feature: Reg F16 Import Trial

As a CTRP User,  I can identify a trial by NCT ID for import from ClinicalTrials.gov

Scenario: #1 I can search for an Industrial or Other trial by NCT ID from ClinicalTrials.gov
Given I have selected the option to Import an Industrial or Other Trial
And I am on the Import ClinicalTrials.gov Trials screen
When I have entered a NCT Number
Then the Search Studies feature will indicate if the NCT ID is a valid NCT ID in ClinicalTrials.gov
And the Search Studies feature will indicate if a trial with the NCT ID has been registered in CTRP

Scenario: #2 I can import an Industrial or Other trial by NCT ID from ClinicalTrials.gov
Given I have selected the option to Import an Industrial or Other Trial
And I am on the Import ClinicalTrials.gov Trials screen
And the notes below will be displayed on the Import ClinicalTrials.gov Trials Screen
"To register a trial under the Industrial/Other submission category in CTRP, please enter the ClinicalTrials.gov identifier below and click Search Studies. If you do not have the ClinicalTrials.gov identifier or if the trial does not have one yet then please contact CTRO staff at ncictro@mail.nih.gov."
"Note: Any trials imported using this feature will be registered as Abbreviated in CTRP system. If the trial should be classified as "Other" then please contact the Clinical Trials Reporting Office staff at ncictro@mail.nih.gov after importing/registering this trial in the CTRP system."
#Review Mock up:M:\NCICB\CTRP-Refactor\CTRP AUM\Functional\Registration: Import Trial
When I have entered a NCT Number
And the Search Studies feature indicates that the trial has not been registered in CTRP
And the trial NCT ID, Status, and Study Title, Conditions, and Interventions are displayed
When the imported Clinical Trial does not have an Official Title 
Then the Clinical Trial Brief Title should be displayed in the search results
Then I can import the trial information from ClinicalTrials.gov into CTRP
And the trial Study Souce will be listed as Industrial
And the view trial screen will display imported trial details 
And the "Add My Site" button will be displayed (# Reg F22 Register Participating Site)
 And the XML from ClinicalTrials.gov will be saved internally
 And The saved XML won't be be displayed in registration application (#But the XML document should be displayed and viewed in PA)
And The file name will be "import_””NCT ID””_””Current Date YYYY-MM-DD””_””Current Time HHMM(24HR)””.xml" "Example: import_NCT09809876_2016-05-03-1230.xml"
And the trial milestone "Submission Received Date" will be added with the date of the import
|Import Mappings are in CTRP AUM\Functional\Registration\ClinicalTrials Import Data Element Mapping v6.docx|

Scenario:#2a  NLM Context will be created for an Imported trial  
    Given I am logged into the CTRP
    When a trial has been imported with a "Sponsor Name" that exists in the NLM Context in CTRP
    And the NLM context is mapped to a CTRP Organization Context
    And the CTRP Organization is "Active"
    Then the CTRP Organization will be used as 
    
    |Trial Sponsor|
    |Trial Funding Source|
    |Lead Org|
    
   Scenario:#2a' NLM Context will be created for an Imported trial  
    Given I am logged into the CTRP
    When a trial has been imported with a "Sponsor Name" that exists in the NLM Context in CTRP
    And the NLM context is mapped to a CTRP Organization Context
    And the CTRP Organization is "Inactive"
    And the CTRP Organization will be used as NULL values for the fields below until curated
    
    |Trial Sponsor: Null|
    |Trial Funding Source: Null|
    |Lead org: Null|
    
    
    
   Scenario:#2b NLM Context will be created for an Imported trial  
    Given I am logged into the CTRP
    When a trial has been imported with a "Sponsor Name" that exists in the NLM Context in CTRP
    And there are more than one NLM organization that matches the "Sponsor Name"
    Then the trial will be imported
    And the CTRP Organization will be used as NULL values for the fields below until curated
    
    |Trial Sponsor: Null|
    |Trial Funding Source: Null|
    |Lead org: Null|
    
    
    Scenario:#2c NLM Context will be created for an Imported trial  
    Given I am logged into the CTRP
     When a trial has been imported with a "Sponsor Name" that exists in the NLM Context in CTRP
    And the NLM context is not mapped to a CTRP Organization Context
    Then CTRP organization fields below will be NULL until the NLM Organization context is affiliated to a CTRP Organization Context
    
    |Trial Sponsor: Null|
    |Trial Funding Source: Null|
    |Lead org: Null|
    
     Scenario:#2d NLM Context will be created for an Imported trial  
    Given I am logged into the CTRP
      When a trial has been imported with a "Sponsor Name" that does not match an organization name in the NLM Context record in CTRP
     Then an NLM Context with an NLM Context Status of "Active" will be automatically created in CTRP
     And the processing status is "Incomplete"
     And the service Request is "Create"
     Then the CTRP organizaiton fields below will be NULL until the NLM Organization context is affiliated to a CTRP Organization Context
    
    |Trial Sponsor: Null|
    |Trial Funding Source: Null|
    |Lead org: Null|
  
    
Scenario: #3 I can import an Expanded Access trial by NCT ID from ClinicalTrials.gov
Given I have selected the option to Import an Industrial or Other Trial
And I am on the Import ClinicalTrials.gov Trials screen
When I have entered a NCT Number where Study Type is ClinicalTrials.gov is Expanded Access
And the Search Studies feature indicates that the trial has not been registered in CTRP
And the trial NCT ID, Status, and Study Title, Conditions, and Interventions are displayed
Then I can import the trial information from ClinicalTrials.gov into CTRP
And the trial Study Souce will be listed as Industrial
And the trial Clinical Research Category will be listed as Expanded Access
And the XML from ClinicalTrials.gov will be added to the trial related document
And the trial milestone "Submission Received Date" will be added with date of the import
And the trial status will match the trial status in ClinicalTrials.gov as:
|Available|
|No Longer Available|
|Temporarily not Available|
|Approved for Marketing|


Scenario: #4c I will not be able to Import a trial previously registered in CTRP
Given I have selected the option to Import an Industrial or Other Trial
And I have entered a NCT Number
When the NCT Number is associated with a Trial which has NOT been Rejected 
Then the Trial with the entered NCT number should NOT be allowed to be imported
Then the error message will be displayed "A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page."

Scenario: #4c.1 I will be able to import a trial previously registered in CTRP
Given I have selected the option to Import an Industrial or Other Trial
And I have entered a NCT Number
When the NCT Number is associated with a Trial which has been Rejected 
Then the Trial with the entered NCT number should be allowed to be imported

Scenario: #4d I will not be able to Import a trial for the same lead organization and lead organization ID
Given I have selected the option to Import an Industrial or Other Trial
And I have entered a NCT Number
When the lead organization and lead organization ID for the trial to be imported match the lead organization and lead organization ID for a trial registered in CTRP which has NOT been Rejected 
Then The Trial with the associated lead organization and lead organization ID should not be allowed to be imported
And the error message will be displayed "A trial exists in the system with the same Lead Organization Trial Identifier for the selected Lead Organization" 


Scenario: #4d.1 I will be able to Import a trial for the same lead organization and lead organization ID
Given I have selected the option to Import an Industrial or Other Trial
And I have entered a NCT Number
When the lead organization and lead organization ID for the trial to be imported match the lead organization and lead organization ID for a trial registered in CTRP which has been Rejected 
Then The Trial with the associated lead organization and lead organization ID should be allowed to be imported



