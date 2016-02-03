@PA @global
Feature:  PAS F09 Markers 
As a CTRP Scientific Abstractor, I can add and Markers

Scenario: #1 I can add Markers for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Markers screen
And I select Add
And the Add Marker screen displays
And I have entered a Name
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
Then the Markers list will be displayed
 

      |Name                |
      |Evaluation Type                   |
      |Biomarker Use                    |
      |Biomarker Purpose  |
      |Specimen Type                   |
      |Record Status                       |
      |Edit| 
      |Delete| 



Scenario: #2 Set Marker Status
Given I am on the Add Marker Screen
When I have selected Name from caDSR
Then Record Status is set to Active
And the Record Status displays as Active
When Name is not selected from caDSR
And I select Save

Scenario:  #3 Marker Mandatory Fields Rules
Given I am on the Markers screen
When the Marker <MarkerField> is not entered 
And I select Save
Then an error message <MarkerErrorMessage> will be displayed

|<MarkerField>     |  <MarkerErrorMessage>|
| Evaluation Type  | Evaluation Type must be entered|
|   Name           |   Name must be entered|
|  Assay Type      |   Assay Type must be entered|
|Biomarker Use     |   Biomarker Use must be entered|
|Biomarker Purpose | Biomarker Purpose must be entered|
|Specimen Type     |  Specimen Type must be entered|

Scenario:#4 Selection of Other for Evaluation Type
 Given I am on the Add Marker screen
 When I have selected" Other" for Evaluation Type
Then a required text box appears 
When I have not entered text in the Evaluation Type Other Text
Then the error message type "Evaluation Type Other Text is required" will be displayed

Scenario:#5 Selection of Other for Assay Type
 Given I am on the Add Marker screen
 When I have selected Other for Assay Type
Then a required text box appears
When I have not entered text in the Assay Type
Then the error message type "Assay Type Other Text is required"

Scenario:#6 Selection of Other for Specimen Type
 Given I am on the Add Marker screen
 When I have selected Other for Specimen Type
Then a required text box appears 
When I have not entered text in the Specimen Type
Then the error message type "Specimen Type Other Text is required"


Scenario:  #7 Select Name from caDSR
 Given I am logged into the CTRP Protocol Abstraction application
 And I have selected a trial
 And I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
And Case-Sensitive Search is defaulted to No
And Highlight Query Text is defaulted to Yes
And Search Scope is defaulted to Both
When I have entered a Search Term 
And have selected the Search button
Then a results table with Permissable Value with Search Term highlighted displays
And Meaning displays in the results table
And Marker Synonym displays in the results table
And Description displays in the results table
And Public ID displays in the results table
When I select the Select button
Then the selected marker displays on Add Marker screen

Scenario:  #8 Select Search Scope in caDSR Marker Search screen
Given I am logged into the CTRP Protocol Abstraction application
 And I have selected a trial
 And I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I have selected Primary Term for Search Scope
And I select the Search button
Then a results table displays with markers with the Search Term in the Permissable Value field
When I have selected Synonym for Search Scope
And I select the Search button
Then a results table displays with markers with the Search Term in the Marker Synonym field

Scenario:  #9 Highlight Query Text in caDSR Marker Search screen
Given I am logged into the CTRP Protocol Abstraction application
 And I have selected a trial
 And I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I select Highlight Query Text = No
And I select the search button
Then the Search Term in th ePermissable Value field is not highlighted 

Scenario:  #10 Enter Public ID in caDSR Marker Search screen
Given I am logged into the CTRP Protocol Abstraction application
 And I have selected a trial
 And I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I enter a Public ID
And there is a match in caDSR
Then there is one result in the result table
When I enter and Publid ID
And there is no match in caDSR
Then a 'Nothing found to display' message is displayed

Scenario:  #11  Create new marker with attributes of existing marker
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add Marker screen
When I have selected Edit for a specific marker
Then the Edit Marker screen displays
When I have selected the Save & Retain Attributes button
Then the Name field is blank
When I have entered a value for Name
And I have selected the Save button
Then the new marker will be associated to the trial
And the Markers screen displays
And a 'Record Created' message is displayed

Scenario:  #12 Edit Marker Attributes  
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add Marker screen
When I have selected Edit for a specific marker
Then the Edit Marker Displays
When I have edited Evaluation Type
And I have edited Assay Type
And I have edited Biomarker Use
And I have edited Biomarker Purpose
And I have edited Specimen Type
And I have selected the Save button
Then the updated marker will be associated to the trial
And the Markers screen displays
  
Scenario:  #13 Edit Attributes for Multiple Markers 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Marker screen
And I have selected one marker
And I have selected more than one marker
When I have selected Edit Selected button 
Then Edit Marker screen displays
And Name is Multiple Marker
And boxes are checked for attributes that are the same for selected markers
When I uncheck a box for Evaluation Type
And I uncheck a box for Assay Type
And I uncheck a box for Biomarker Purpose
And I uncheck a box for Specimen Type
Then it is unchecked for all selected markers
When I check the box for Evaluation Type
And I check the box for Assay Type
And I check the box for Biomarker Purpose
And I check the box for Specimen Type
Then it is checked for all selected markers
When I have edited Biomarker Use
Then it is edited for all selected markers
When I have selected the Save button
Then the attributes are updated for each marker 
And the updated markers are associated to the trial
And the Markers screen displays
And a 'Record(s) Updated' message is displayed

Scenario:  #14 I can Delete Markers for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Markers screen
When I have selected the Delete check box for an individual Marker 
And have clicked on Delete button
And the message displays 'click OK to remove selected Marker(s) form the study. Click Cancel to abort'
And I have clicked on  OK
Then the Marker(s) is removed from the trial record
When I have Clicked the Select All button
And the Delete check box is checked for all entries
And have clicked on Delete button
And the message displays 'click OK to remove selected Marker(s) from the study. Click Cancel to abort'
And I have clicked on OK
Then the Marker(s) is removed from the trial record
And 'Record(s) deleted' message is displayed
When I have Clicked on the Delete button
And the message displays 'click OK to remove selected SubGroups from the study. Click Cancel to abort'
And I have clicked on the Cancel button
Then the Marker(s) is not removed from the trial record
And 'Record(s) deleted' message is not displayed
When Marker Status = pending
Then the marker is removed from the New Marker Requests screen

 Scenario:  #15 I can Reset Add Markers screen for a Trial
 Given I am logged into the CTRP Protocol Abstraction application
 And I have selected a trial
And I am on the Add Markers screen
When I have selected Reset
Then the updated information on the Add Markers screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save