@PA @global
Feature:  PAS F09 Markers 
As a CTRP Scientific Abstractor, I can add and Biomarkers

Scenario: #1 I can add Markers for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Biomarkers screen
And I select Add
And the Add Biomarkers screen displays
And I have entered a Name
And I have entered 'Protocol Marker Name'
And I have checked <Evaluation Type>
And have checked more than one Evaluation Type
|Evaluation Type|
|Level/Quantity|
|Genetic Analysis|
|Cell Functionality|
|Subtyping|
|Protein Activity|
|Proteolytic Cleavage|
|Phosphorylation|
|Methylation|
|Acetylation|
|Activation Status|
|Loss of Heteozygosity (LOH)|
|Germline Variant|
|Somatic Variant|
|Chromosomal Amplification| 
|Chromosomal Deletion|
|Other|
And I have checked <Assay Type>
And I have checked more than one Assay Type
|Assay Type|
|PCR|
|In Situ Hybridization|
|Microarray|
|ELISA|
|Immunohistochemistry|
|Western Blot (Immunoblot)|
|Flow Cytometry|
|Sequencing|
|Microscopy/Imaging|
|ELISPOT|
|Proliferatoin Assay|
|Cytotoxicity Assay|
|Mass Spectometry|
|TUNEL assay|
|Real-Time RT-PCR (qRT-PCR)|
|HPLC|
|RT-PCR|
|Multiplex Immunoassay|
|Real-Time PCR (quantitative PCR)|
|Unspecified|
|Other|
And I have selected <Biomarker Use>
|Biomarker Use| 
|Integral|
|Integrated| 
And I have checked <Biomarker Purpose>
And I have checked more than one Biomarker Purpose
|Biomarker Purpose|
|Eligibility Criterion|
|Treatment Assignment|
|Stratification Factor|
|Research|
|Response Assessment|
And I have checked Specimen type(s)
And I have checked more than one Specimen type
|Specimen type|
|Serum|
|Plasma|
|Blood|
|Tissue|
|Urine|
|PBMCs|
|CSF|
|Bone Marrow|
|Saliva|
|Cyorpreserved Cells|
|Buccal Mucosa|
|Feces|
|Unspecified|
|Other|

When I click save
Then the Biomarkers list will be displayed
 

      |Name|
      |Protocol Marker Name|
      |Evaluation Type|
      |Assay Type|
      |Biomarker Use                    |
      |Biomarker Purpose  |
      |Specimen Type                   |
      |Record Status                       |
      |Edit| 
      |Delete| 



Scenario: #2 Set Marker Record Status
Given I am on the Add Biomarkers Screen
When I have selected Name from caDSR
Then Record Status is set to Active
And the Record Status displays as Active
When Name is not selected from caDSR
And I select save
Then the record status "Pending" will be displayed on the Biomarkers table
And the pending Biomarkers will be added to the "New Biomarkers Requests" screen



Scenario:  #3 Biomarkers Mandatory Fields Rules
Given I am on theBiomarkers screen
When the Biomarkers <BiomarkerField> is not entered 
And I select Save
Then an error message <BiomarkerErrorMessage> will be displayed

|<BiomarkerField>     |  <BiomarkerErrorMessage>|
| Evaluation Type  | Evaluation Type is Required|
|   Name           |   Name is Required|
|  Assay Type      |   Assay Type is Required|
|Biomarker Use value of "Integral"     |   Biomarker Use is Required|
|Biomarker Purpose | Biomarker Purpose is Required|
|Specimen Type     |  Specimen Type is Required|

  Scenario: #4 Biomarker Use rule
    Given I am on the Add Biomarkers Screen 
     When I select "Integrated" for Biomarker Use
     Then the Biomarker Purpose is not required


Scenario:#5 Selection of Other for Evaluation Type
 Given I am on the Add Biomarker screen
 When I have selected" Other" for Evaluation Type
Then a required text box appears 
When I have not entered text in the Evaluation Type Other Text
Then the error message type "Evaluation Type Other Text is Required" will be displayed

Scenario:#6 Selection of Other for Assay Type
 Given I am on the Add Biomarker screen
 When I have selected Other for Assay Type
Then a required text box appears
When I have not entered text in the Assay Type
Then the error message type "Assay Type Other Text is Required"

Scenario:#7 Selection of Other for Specimen Type
 Given I am on the Add Biomarker screen
 When I have selected Other for Specimen Type
Then a required text box appears 
When I have not entered text in the Specimen Type
Then the error message type "Specimen Type Other Text is Required"


Scenario:  #8 Select Name from caDSR
 Given I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Biomarker Search in caDSR screen 
And Case-Sensitive Search is defaulted to No
And Highlight Query Text is defaulted to Yes
When I have entered a Search Term 
And I can enter a Public ID
And have selected the Search button
Then a results table type will be displayed

      |Permissible Value (with synonyms) |
      |Meaning  |
      |Description  |
      |Public ID  |
      |Select  |

When I select the Select button
Then the selected Biomarker displays on Add Biomarker screen

  Scenario: #9 Rules for Marker Search in caDSR  
    Given I am on the Marker Search in caDSR screen
     When I have not entered a Search term Value
     And I have not entered a Public ID value
     Then an error message "Please enter at least one search criteria." will be displayed 
     
       Scenario:#10 case sensitive search
    Given I am on the Marker Search in caDSR screen
    And the Case-Sensitive Search will be defaulted to "No"
    When Case-Sensitive Search is changed to "Yes"
    And I click on the search button
    Then the Case-Sensitive Searched term will be highlighted

Scenario:  #11 Highlight Query Text in caDSR Marker Search screen
Given I am on the Add Biomarker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I select Highlight Query Text = No
And I select the search button
Then the Search Term in the Permissable Value field is not highlighted 

Scenario:  #12 Enter Public ID in caDSR Marker Search screen
Given I am on the Add Biomarker screen
 And I have selected the caDSR button
And I am on the Biomarker Search in caDSR screen 
When I enter a valid caDSR Public ID
And there is a match in caDSR
Then the exact valid Public ID will be displayed in the result table
When I enter an invalid Public ID
And there is no match in caDSR
Then a 'Nothing found to display' message is displayed

Scenario:  #13  Create new marker with attributes of existing marker
Given I am on the Biomarker screen 
When I have selected Edit for a specific marker
Then the Edit Biomarker screen displays
When I have selected the Save & Retain Attributes button
Then the Name field is blank
When I have entered a value for Name
And I have selected the Save button
Then the new Biomarker will be associated to the trial
And the Biomarkers screen displays
And a 'Record Created' message is displayed

Scenario:  #14 Edit Marker Attributes  
Given I am on the Biomarker Screen   (Biomarker Screen)
When I have selected Edit for a specific Biomarker
Then the Edit Biomarker Displays
When I have edited Evaluation Type
And I have edited Assay Type
And I have edited Biomarker Use
And I have edited Biomarker Purpose
And I have edited Specimen Type
And I have selected the Save button
Then the updated Biomarker will be associated to the trial
And the Biomarkers screen displays
  
Scenario:  #15 Edit Attributes for Multiple Markers   (FUTURE IMPLEMENTATION)  
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Biomarker screen
And I have selected one Biomarker
And I have selected more than one Biomarker
When I have selected Edit Selected button 
Then Edit Marker screen displays
And Name is 'Multiple Record Edit'
And boxes are checked for attributes that are the same for selected Biomarker for the field type
     
      |Evaluation Type  |
      |Assay Type  |
      |Biomarker Purpose  |
      |Specimen Type  |
 
When I uncheck a box for the field type
      |Evaluation Type  |
      |Assay Type  |
      |Biomarker Purpose  |
      |Specimen Type  | 
Then it is unchecked for all selected markers
When I check the box for the field type
      |Evaluation Type  |
      |Assay Type  |
      |Biomarker Purpose  |
      |Specimen Type  |
Then it is checked for all selected markers
When I have edited Biomarker Use type

      |Integral  |
      |Integrated  |

Then it is edited for all selected Biomarker
When I have selected the Save button
Then the attributes are updated for each Biomarker 
And the updated Biomarkers are associated to the trial
And the Biomarkers screen displays
And a 'Record(s) Updated' message is displayed

Scenario:  #16 I can Delete Markers for a Trial
Given I am on the Biomarkers screen
When I have selected the Delete check box for an individual Biomarkers
And I can select the delete check box for more than one Biomarkers
When have clicked on Delete button
Then the message displays 'click OK to remove selected Biomarker(s) form the study. Click Cancel to abort'
When I have clicked on  OK
Then the Biomarker(s) is removed from the trial record
And 'Record(s) deleted' message is displayed
When I have clicked on the Cancel button
Then the Biomarker(s) is not removed from the trial record
And 'Record(s) deleted' message is not displayed
When I have deleted a Biomarker where Biomarker Status is pending
Then the Biomarker is removed from the "New Biomarker Requests" screen

 Scenario:  #17 I can Reset Add Biomarkers screen for a Trial                    
 Given I am logged into the CTRP Protocol Abstraction application  
 And I have selected a trial
And I am on the Add/edit Biomarkers screen
When I have selected Reset
Then the updated information on the Add Biomarkers screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save

  Scenario: #18 I cannot save duplicate Biomarkers  (added 06JUN2016)
    Given I have entered a duplicate biomarker with duplicate 'Name', 'Assay Type', 'Biomarker Use', 'Biomarker Purpose', 'Specimen Type'
     When I select Save button
     Then an error message is displayed 'Duplicate Planned Markers are not allowed' 

