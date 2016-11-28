@Admin @Global 
Feature: PAM F12 Manage NCIt Disease Terms 

As a CTRP Scientific Abstractor,I can manage NCIt Disease Terms

Scenario: #1 I can Import a term from NCIt that is not in CTRP ? Can we enter a CDR Identifier
Given I am logged into CTRP
And I select the option to Manage NCIt Terms
And I select the option to Manage NCIt Disease Terms
And I select the option to Import/Sync Term With NCIt
When I enter the NCIt Identifier
And click the Look Up button
Then Import New Disease/Condition From NCIt screen displays
| NCIt Identifier |
| CDR Identifier |   
| Preferred Name|
| Synonyms|
| Paent Terms NCIt ids |
| Child Term NCIt ids|
When I click the Import Button
And the message will be displayed "The CTRP system is synching the term C1678 with the NCIt. Depending on the number of parents and children in the disease term hierarchy, it can take from five minutes to two hours or more to sync the term. Please go to the CTRP Disease Term Tree in PA after a few minutes to verify."
Then the intervention term is imported
And the system synchronizes

Scenario: #2 I can Import a term from NCIt that is already in CTRP
Given I have selected the option to Manage NCIt Disease Terms
And I select the option to Import/Sync Term With NCIt
And I am on the Import New Disease/Condition From NCIt screen
When I enter the NCIt Identifier
And click the Look Up button
Then Synchronize Existing Disease Term with NCIt screen displays with the following Attributes
| NCIt Identifier |
| CDR Identifier |
| Preferred Name|
|Display Name
| Synonyms|
| Parent Terms |
| Child Terms|
And the term already present in CTRP message displays
| Message.  Disease with NCIt code 'C1234' already present in CTRP, compare the values below and click 'Sync Term' to update the CTRP term with values from NCIt|
And note displays 
|Note: 'CDR Identifier'attribute is  NOT synchronized from NCIt, its existing CTRP value(s) shown above will be retained.|
When I click the Sync Term Button
Then the system synchronizes
And the pop up message displays
|The CTRP system is synching the term c### with the NCIt.  Depending on the number of parents and children in the disease term hierarchy, it can take from 5 minutes to two hours or more to sync the term.  Please go to the CTRP Term Tree in PA after a few minutes to verifiy  |
When I click the OK button
Then the Manage NCIt Disease/Condition or Intervention Terms screen displays

Scenario: #3 I can complete an EVS new term request form
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

      
     Scenario:#4 Vocabulary value rules
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
      

      Scenario:#5 Rules for Mandatory fields
    Given I am on the Term suggestion screen
     When I have not entered the mandatory <FieldType>
     And I have clicked on the submit button
     Then an error <MessageType> will be displayed
     
      |<FieldType>    |<MessageType>  |
      |Business Email |Please provide an email address.  |
      |Term           |Please enter term information below.  |
      |Security Code  |Please enter the security code appearing in the image.  |

   



Scenario: #6 I can enter term information
Given I select the option Manage NCIt Disease Terms
When I select the option Enter Term Information
Then the Enter New Disease/Condition Details screen displays
And I must enter NCIt Identifier
And I can enter CDR Identifier
And I must enter Preferred Name
And I must enter Display Name
And I can enter Synonym 
And I can look up and add Parent Term NCIt Ids 
And I can look up and add Child Term NCIt Ids 
When I have clicked on the save button
Then the "Message. New Disease c78764 added successfully." will be displayed

  Scenario:#7 Mandatory Fields for Enter New Disease/Condition Details
    Given I am on the Enter New Disease/Condition Details
     When I have not entered <FieldType> 
     Then The error <MessageType> will be displayed
     
      |<FieldType>     |<MessageType>  |
      |NCIt Identifier |NCI Identifier must be entered  |
      |Preferred Name  |Preferred Name must be entered  |
      |Display Name    |Menu Display Name must be entered  |
  And the message "Message. Please correct the errors listed below and resubmit." will be displayed
  
  Scenario: #8 Synonyms Rules
Given I am on the Enter New Disease/Condition Details screen
And I have entered an new synonym
And I can add more than one Synonym 
When I click the Add button
Then the Synonym is moved to the box directly below  
When I select a synonym to be removed
And Click on the Remove button
Then the Synonym is removed from the list of synonyms

    Scenario: #9 I can Reset Enter New Disease Details
Given I am on the New Disease Details form
And I have entered data into the fields
When I select the reset button
Then the message displays
|Click OK to reset the Disease details.  Click Cancel to abort|
When I click OK
Then the data that has been entered since the last save is removed
When I click Cancel
Then the data is not removed

Scenario: #10 I can add Parent Term NCIt Ids
Given I am on the Enter New Disease/Condition Details form
When I click the Look Up & Add button for Parent Term NCIt Ids
Then the Look Up Parent Diseases screen displays
And the Find a Disease/Condition screen displays
And I can select Search Synonyms 
And I can select Exact match only
When I have started entering a term
Then a list of type ahead terms displays
When I Select a term in the list
And click the search icon or click on Enter
Then a list of Preferred Terms that contain the entered term display
And a message displays with the number of results for the term entered 

      |1964 results for "cancer" |

    When I select one or more terms from the preferred names listed by clicking on the the Add button to the right of the term
    And I can select terms by clicking directly on the term selected
    And I can click on "Add All" button to add all preferred terms to "Your Selections"
    Then the selected term will be displayed in "Your Selections" 
    And the message displays with the number of diseases selected on the top of "Your Selections" screen
     | 3 diseases selected|
    When I select the add button 
    Then the selected terms will be added to the Parent Term NCIt Ids field
 
 Scenario:#11 I can remove Disease/Condition from " Your Selections" 
    Given I am on Find a Disease/Condition screen
     When I click on the remove icon on the left side of the Preferred Term in "Your Selections" 
     Then The term will be removed from "Your Selections"
     And the disease selected message decrements 
     |0 diseases selected|
     
     Scenario: #12  Find a Disease/Condition Search Synonyms selected
Given I am on Find a Disease/Condition screen
When I have entered a term
And I have selected Search Synonyms
And I Click the search icon or click Enter 
Then a list of Preferred Terms and Synonyms that contain the entered term displays
And a can select a preferred term to add 

Scenario: #13  Find a Disease/Condition Exact Match 
Given I am on Find a Disease/Condition Screen
When I have entered a term
And I have selected Exact match only
And I Click the search icon or click Enter 
Then only exact term will be displayed 
And a message displays with the number of results for the entered term


Scenario: #14 Find a Disease/Condition Reset
Given I am on the Find a Disease/Condition screen
When I have entered a term
And I Click the search icon or click Enter 
Then a list of Preferred Terms will be displayed
And a message displays with the number of results for the entered term
When I select a term for the list 
Then the term is displayed in 'Your Selections' 
When I select the Reset button 
Then the term is not displayed in 'Your Selections'
And I get a refreshed screen 


Scenario: #15 I can add Child Term NCIt Ids 
Given I am on the Enter New Disease/Condition Details form
When I click the Look Up & Add button for Child Term NCIt Ids
Then the Look Up Child Diseases screen displays
And the Find a Disease/Condition screen displays
And I can select Search Synonyms 
And I can select Exact match only
When I have started entering a term
Then a list of type ahead terms display
When I Select a term in the list
And click the search icon or click on Enter
Then a list of Preferred Terms that contain the entered term display
And a message displays with the number of results for the term entered 

      |1964 results for "cancer" |

    When I select one or more terms from the preferred names listed by clicking on the the Add button to the right of the term
    And I can click on "Add All" button to add all preferred terms to "Your Selections"
    Then the selected term will be displayed in "Your Selections" 
    And the message displays with the number of diseases selected on the top of "Your Selections" screen
     | 3 diseases selected|
    When I select the add button 
    Then the Enter New Disease/Condition Details form displays with the term(s) added in the Child Term NCIt ids
    
    Scenario: #16 NCIt terms details info button
    Given I am on the Find a Disease/Condition screen
    And I have a list of terms
    When I click on the NCIt terms details info button
    Then NCIthesaurus new screen opens "https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=NCI_Thesaurus&code=C89412"

	Scenario: #17 Display PDQ disease tree
    Given I am on Find a Disease/Condition screen
    When I click on the Show Tree icon
    Then the NCIt/CTRP tree displays 
    
Scenario: #18  Show Tree for a term
Given I am on Find a Disease/Condition screen
And I have a list of terms
When I click on the Show Tree icon to the right of the term
Then the location of the term in the CTRP Disease hierachy displays 
And Other Disease Terms display in the NCIt/CTRP Tree
When I select other terms that are displayed in the NCIt/CTRP Tree
Then the term is added to "Your Selections" 
 
Scenario: #19 I can remove Parent Term NCIt Ids
Given I am on the Enter New Disease/Condition Details form
When I select a Parent Term NCIt Id to be removed
And Click on the Remove button
Then the Parent Term NCIt Id is removed from the list of terms

Scenario: #20 I can remove Child Term NCIt Ids
Given I am on the Enter New Disease/Condition Details form
When I select a Child Term NCIt Ids to be removed
And Click on the Remove button
Then the Child Term NCIt Ids is removed from the list of terms




