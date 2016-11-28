@Admin @Global 
Feature: PAM F11 Manage NCIt Intervention Terms 

As a CTRP Scientific Abstractor,I can manage NCIt Intervention Terms

  Scenario: #1 Enter term information for New Intervention details
    Given I am on the Enter New Intervention Details screen 
    And I have entered an NCIt Identifier
    And I have entered a CDR Identifier
    And I have enterred a Preferred Name
    And I have entered Synonyms 
     When I have clicked on the Add button
     Then the entered Synonyms will be added to the provided box
     And I have selected Cancer.gov Type
      
      |Drug  |
      |Procedure/Surgery  |
      |Genetic  |
      |Other  |

      And I have selected ClinicalTrial.gov type
      

      |Drug |
      |Device  |
      |Biological/Vaccine  |
      |Procedure/Surgery  |
      |Radiation  |
      |Behavioral  |
      |Genetic  |
      |Dietary Supplement  |
      |Other  |

	When I have clicked on the Save Button
    Then the "Message. New intervention test01 added successfully." will be displayed
    
Scenario: #2 I can remove synonyms
Given I am on the New Intervention Details form
When I select a synonym to be removed
And Click on the Remove button
Then the Synonym is removed from the list of synonyms
    
  Scenario: #3  Rules for New Intervention Details
    Given I am on the Enter New Intervention Details screen 
    When I have not entered an NCIt Identifier
    Then the error "NCI Identifier must be entered"will be displayed
    When I have not enterred a Preferred Name
    Then the error "Preferred Name must be entered"will be displayed
    And the "Message. Please correct the errors listed below and resubmit." 
    When I enter a duplicate for new intervention details term
    Then  the error "Message. Intervention with NCIt code test already exists!." will be displayed
    
    Scenario: #4 I can Reset Enter New Intervention Details
Given I am on the New Intervention Details form
And I have entered data into the fields
When I select the reset button
Then the message displays
|Click OK to reset the intervention details.  Click Cancel to abort|
When I click OK
Then the data that has been entered since the last save is removed
When I click Cancel
Then the data is not removed
    
Scenario: #5 I can Import a term from NCIt that is not in CTRP
Given I am logged into CTRP
And I select the option to Manage NCIt Intervention Terms
And I select the option to Import/Sync Term With NCIt
And I must enter the NCIt Identifier
When I have clicked on the Look up button
Then Import New Intervention From NCIt screen displays
| NCIt Identifier |
| CDR Identifier |
| Preferred Name|
| Synonyms|
| Cancer.gov Type |
| clinicalTrials.gov Type|
When I have not entered an NCIt Identifier
Then the error "Message. Enter valid NCIt Identifier." will be displayed 
And I can enter the CDR Identifier
And the Preferred name will be populated
And the Synonyms will be populated
And I can select the Cancer.gov Type
|Drug|
| Procedure/Surgery |
| Genetic |
|Other|
And I select the ClinicalTrials.gov Type
|Drug|
|Device |
|Biological/vaccine|
| Procedure/Surgery |
|Radiation|
|Behavioral|
|Genetic|
|Dietary Supplement|
|Other|
When I click the Import Button
And the NCIt code is not present in CTRP
Then the intervention term is imported
And the Message. "New intervention C42933 added successfully". will be displayed
And the system synchronizes

Scenario: #6 I can Import a term from NCIt that is already in CTRP
Given I am logged into the PA application
And I select the option to Manage NCIt Intervention Terms
And I select the option to Import/Sync Term With NCIt
When I enter the NCIt Identifier type

      |C198|
      |    |      
        
Then Synchronize Existing Intervention Term with NCIt screen displays
| NCIt Identifier |
| CDR Identifier |
| Preferred Name|
| Synonyms|
| Cancer.gov Type |
| clinicalTrials.gov Type|
And the term already present in CTRP message displays
| Message.  Intervention with NCIt code 'C1234' already present in CTRP, compare the values below and click 'sync Term' to update the CTRP term with values from NCIt|
And note displays 
|Note: 'CDR Identifier','Cancer.gov Type' and 'Clinical Trials.gov Type' attributes are NOT synchronized from NCIt, their existing CTRP values shown above will be retained.|
When I click the Sync Button
Then the system synchronizes
And the Manage NCIt Disease/Condition or Intervention Terms screen displays
And the sychronize message displays
|Message.  Intervention C1777 synchronized with NCI thesaurus|
When I click on the cancel button
Then the "Import New Intervention From NCIt" screen displayes


Scenario: #7 I can complete an EVS new term request form
Given I select the option Manage NCIt Intervention Terms
When I select the option EVS New Term Request Form
Then the Term Suggestion form displays
And I can enter Contact Information type


      | Business Email |
      | Other |
      
And I can enter Term Information Type

      |Vocabulary  |
      |Term  |
      |Synonym(s)  |
      |Nearest Code/CUI  |
      |Definition Other |
And I can select a value for <Vocabulary>
|NCI Thesaurus|
|NCI Metathesaurus|
|CTCAE|
|NPO|
|Other|
 And the note "Fill in the following fields as appropriate. For multiple terms, please consider emailing an Excel, delimited text, or similar file to ncithesaurus@mail.nih.gov, which can also respond to any questions. " is displayed for multiple terms     
 And I can enter Additional Information Type
	  |Project Product Term needed for  |
      |Reason for suggestion plus any other additional information  |

 And I must enter the security code displayed in the field type
 
      |Enter the characters appearing in the above image: *|
 When I click the Submit button 
 Then the request is submitted
 When I click the Clear button
 Then the message from the webpage displays
    |Are you sure you want to clear this page?|
 When I click the OK button
 Then the information that has been entered on the page is cleared
 When I click the Cancel button
 Then the information that has been entered on the page is not cleared 

      
     Scenario:#8 Vocabulary value rules
     Given I am on the Term Suggestion Screen
     And I can select a value for <Vocabulary>
      |NCI Thesaurus|
      |NCI Metathesaurus|
      |CTCAE|
      |NPO|
      |Other|
     When I have selected the Vocabulary type <VocabularyType> 
     Then The NCI term browser will be displayed <TermBrowserType>
        
      |<VocabularyType>  |<TermBrowserType>  |
      |NCI Thesaurus     |https://ncit.nci.nih.gov/ncitbrowser/  |
      |NCI Metathesaurus |https://ncim.nci.nih.gov/ncimbrowser/  |
      |CTCAE             |https://nciterms.nci.nih.gov/ncitbrowser/pages/vocabulary.jsf?dictionary=CTCAE  |
      |NPO               |https://ncit.nci.nih.gov/ncitbrowser/pages/vocabulary.jsf?dictionary=NPO  |
      |Other             |This vocabulary does not have an associated home page   |
      

      Scenario:#9 Rules for Mandatory fields
    Given I am on the Term suggestion screen
     When I have not entered the mandatory <FieldType>
     And I have clicked on the submit button
     Then an error <MessageType> will be displayed
     
      |<FieldType>    |<MessageType>  |
      |Business Email |Please provide an email address.  |
      |Term           |Please enter term information below.  |
      |Security Code  |Please enter the security code appearing in the image.  |

   


