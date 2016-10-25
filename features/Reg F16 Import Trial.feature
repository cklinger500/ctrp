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
When I have entered a NCT Number
And the Search Studies feature indicates that the trial has not been registered in CTRP
And the trial NCT ID, Status, and Study Title, Conditions, and Interventions are displayed
When the imported Clinical Trial does not have an Official Title 
Then the Clinical Trial Brief Title should be displayed in the search results
Then I can import the trial information from ClinicalTrials.gov into CTRP
And the trial Study Souce will be listed as Industrial
And the XML from ClinicalTrials.gov will be attached to the trial document
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
    And the information type will be NULL until the curated
    
    |Trial Sponsor: Null|
    |Trial Funding Source: Null|
    |Lead org: Null|
    
    
    
   Scenario:#2b NLM Context will be created for an Imported trial  
    Given I am logged into the CTRP
    When a trial has been imported with a "Sponsor Name" that exists in the NLM Context in CTRP
    And there are more than one NLM organization that matches the "Sponsor Name"
    Then the trial will be imported
    And the information type will be NULL until the curated
    
    |Trial Sponsor: Null|
    |Trial Funding Source: Null|
    |Lead org: Null|
    
    
    Scenario:#2c NLM Context will be created for an Imported trial  
    Given I am logged into the CTRP
     When a trial has been imported with a "Sponsor Name" that exists in the NLM Context in CTRP
    And the NLM context is not mapped to a CTRP Organization Context
    Then the information type will be NULL until the NLM Organization context is affiliated to a CTRP Organization Context
    
    |Trial Sponsor: Null|
    |Trial Funding Source: Null|
    |Lead org: Null|
    
     Scenario:#2d NLM Context will be created for an Imported trial  
    Given I am logged into the CTRP
      When a trial has been imported with a "Sponsor Name" that does not exist in the NLM Context in the CTRP
     And that "Sponsor Name" does not match an organization name "Agency" name in CTRP
     Then an NLM Context with an NLM Context Status of "Active" will be automatically created in CTRP
     And the processing status is "Incomplete"
     And the service Request is "Create"
     Then the information type will be NULL until the NLM Organization context is affiliated to a CTRP Organization Context
    
    |Trial Sponsor: Null|
    |Trial Funding Source: Null|
    |Lead org: Null|
  
  Scenario:#2e Organization Source Status NLM available list
    Given I am logged into the CTRP Application
     When an NLM Organization is created in the CTRP 
     Then the available organization source status will be
     
     |Active|
     |Inactive|
    
     
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
When the lead organization and lead organization ID for the trial to be imported match the lead organization and lead organization ID for a trial registered in CTRP which has been Rejected OR Submission Terminated
Then The Trial with the associated lead organization and lead organization ID should be allowed to be imported


Scenario: #5 I can add my site as a participating site after a trial is imported from ClinicalTrials.gov
Given I have selected the option to Import an Industrial or Other Trial
And I am on the Import ClinicalTrials.gov Trials screen
And I have entered a NCT Number
And I have imported the trial successfully
Then the trial information will be displayed including
|Trial Identifiers (Title)| 
|Lead Organization Trial Identifier|
|NCI ID|
|ClinicalTrial.gov ID|
|Other IDs|
|Trial Details (Title)|
|Official Title|
|Phase|
|Clinical Research Category|
|Primary Purpose|
|Trial Status (Title)|
|Current Trial Status|
|Trial Dates (Title)|
|Trial Start Date: Date Type (Actual or Anticipated)|
|Primary Completion Date : Date Type (Actual or Anticipated)|
|Completion Date: Date Tye (Actual or Anticipated)|
|Lead Organization (Title)|
|Lead Organization|
|Data Table 4 Information (Title)|
|Study Source|
|Data Table 4 Funding Sponsor/Source|


And I can select the "Add My Site" function to add my site as a participating site

Scenario: #6 I can enter my site information as a participating site after a trial is imported from ClinicalTrials.gov
Given I have selected the option to Import an Industrial or Other Trial
And I have completed the import
And I have selected the option to "Add My Site"
Then I can enter my Local Trial Identifier
And look-up and add the Site Principal Investigator
And enter a Program Code
And enter the Recruitment Status and and Recruitment Status Date
