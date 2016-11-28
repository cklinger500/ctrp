@PA @global
Feature: PAS F07  Add and Edit Disease and Condition 

As a CTRP Scientific Abstractor, I can add and edit Disease and Condition  

Scenario: #1 I can add Disease and Condition for a trial 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease/Condition screen
When I have selected the Add button 
Then the Find a Disease/Condition screen displays
And I can select Search Synonyms 
When I have entered a term
And I have entered a second term separated by a pipe deliminator
And click the search icon or click on Enter
Then a list of Preferred Terms that contain the entered terms display
And a message displays with the number of results for the terms entered 

      |1964 results for "cancer" |

    When I select one or more terms from the preferred names listed by clicking on the the Add button to the right of the term
      Then the selected term will be displayed in "Your Selections" 
    And the message displays with the number of diseases selected on the top of "Your Selections" screen
     | 4 diseases selected|
    When I select the add button 
    Then the Disease/Condition screen displays with the term(s) added 

      |Preferred Name  |
      |NCI Thesaurus Concept ID  |
      |Menu Display Name  |
      |Parent Preferred Name(s)  |
      |Disease Code  |
      |Delete Box  |


And the Disease/Condition is associated to the trial
And a message displays "# items found, displaying all items"
 
 Scenario:#2 I can remove Disease/Condition from " Your Selections"
    Given I am on the Find Disease/Condition screen
     When I click on the remove icon on the left side of the Preferred Term in "Your Selections" 
     Then The term will be removed from "Your Selections"
     And the disease selected message decrements 
     |0 diseases selected|
     
     Scenario: #3  Preferred Term link to NCIt  (updated 03MAY2016 to add NCIt display)
Given I have a list of Preferred Term on Find a Disease/Condition page
When I click on the NCIt tree icon
Then the preferred terms displays in its location in the NCIt hierarchy 
When I Click NCIt icon
Then the NCIt page for the term displays  
     
     Scenario: #4  Find a Disease/Condition Search Synonyms selected (03MAY2016 - added HIGHTLIGHTED for term search results; )
Given I am on the Find a Disease/Condition screen
When I have entered a term
And I have selected Search Synonyms
And I Click the search icon or click Enter 
Then a list of Preferred Terms and Synonyms that contain the entered term HIGHLIGHTED displays
And I can select a preferred term to add 


Scenario: #5 Add All, Link to NCIt, Reset button on Find a Disease/Condition page (03MAY2016 - Add all removed)
Given I am on the Find a Disease/Condition screen
When I click NCIt button
Then the NCIt system displays
When I have a list of Preferred Term
And I click Reset button
Then all entries in the Your Selection section and the list of Preferred Term are removed


Scenario: #6 Edit Disease/Condition for a trial- Only the Disease Code field can be edited
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
When I click Primary for Disease Code for a specific disease
Then Primary is designated for the disease
When I click Secondary for Disease Code for a specific disease
Then Secondary is designated for the disease
When I Select the Save Button
Then the Disease/Condition screen displays with the updated Disease Code for the disease/Condition term
And the updated Disease/Condition is associated to the trial
And the message Record Updated displays


Scenario: #7  Find a Disease/Condition Reset
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


Scenario: #8  Delete Disease/Condition for a trial
Given  I am on the Disease and Condition screen
And I have selected Delete box for the selected Disease/Condition
And I have selected another delete check box for another Disease/Condition criteria
And I have the option to select all Disease/Condition entries by clicking on the select all button
When I have clicked on Delete button
Then the message displays 'click OK to remove selected Disease/Condition from the study.Click Cancel to abort'
When I click on the OK button 
Then the selected Disease/Condition(s) is removed from the trial record
And the message ‘Record(s) deleted’ displays
When I have clicked on the cancel button 
Then the selected Disease/Condition criteria is not removed 
And no message displays

Scenario:  #9 I must select Primary designation  
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
And I have not checked the 'Primary' box for Disease Code for any of the displayed diseases 
When I have selected Save
Then a warning message displays 
|One disease must be selected as primary|
When I select 'Primary' for Disease Code multiple entries of the displayed diseases
And I select the Save button
Then an error message displays 
|Only one disease can be selected as primary |

Scenario:  #10 I can select one secondary disease designation  
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
When I select 'Secondary' for Disease Code for multiple entries of the displayed diseases
And I select the Save button
Then an error message displays
| Only one disease can be selected as secondary |