 @PA @Global
  
  Feature:  PAS F10 Add, Edit and Delete Interventions
As a CTRP Abstractor, I can add, Edit and Delete Trial Interventions 

Scenario: #1 I can add Trial Interventions
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I have clicked on Interventions 
And The Interventions Screen Opens
When I have clicked on the Add button to add Interventions
Then the Add Intervention screen opens
When I have clicked on the Look Up button to select an Intervention Name 
Then the Search Interventions screen is  displayed
And I enter an intervention name (Intervention Name Example: Aspirin)
When I have clicked on the search button
Then the intervention information will be displayed
 

      |Preferred Name                |
      |C Code                        |                       
      |Synonyms                      |
      |Definition                    |
      |Action                        |

When I select an Intervention Name by clicking on the Select button on the Action column
Then the Add Intervention screen displays
And the selected intervention name will be populated in the Intervention name field
And I have entered the Intervention Description in the provided box
And other names will be populated in the other Names field
And the <InterventionType> is identified by the NCIt C-CODE for the selected Intervention
When the <InterventionType> is not null
Then the <InterventionType> will be populated 
      |InterventionType|
      |Drug|
      |Device|
      |Biological/Vaccine|
      |Procedure/Surgery|
      |Radiation|
      |Behavioral|
      |Genetic|
      |Dietary Supplement|
      |Other |
      
      
When the value of <InterventionType> is null 
Then the <InterventionType> field will be blank and grayed out
When I click on the save button to add the Intervention
Then the selected intervention will be added to the intervention table with fields below

      |Preferred Name  |
      |Synonyms  |
      |Description  |
      |Intervention Type  |
      |Edit  |
      |Delete  |

  Scenario: #2 Intervention Search Screen Mandatory field
    Given I am on the the Search Interventions screen 
    When an Intervention name is not entered
    And I have clicked on the Search Button
   Then an error message will be displayed

      |Intervention Name is Required  |


Scenario: #3 Intervention Description field Characters Rule
   Given I am on the Add Intervention screen
   Then a comment appears below the Intervention Description field to display the number of characters available to enter into the field.  
 |1000 characters left|
 And "x characters left" will be displayed as characters are added
 When 1000 characters have been entered
 Then no additional text can be entered
   
       Scenario: #4 I can search Interventions when Exact Match Only is used
    Given I am on the Search Interventions screen
     When the exact Match Only box is checked
     Then only the exact Intervention name should be displayed 
     When The exact Match Only box is NOT checked 
     Then the exact Intervention name will be displayed
     And Other Intervention names may be displayed
     
     
     Scenario: #5 I can search Interventions when Include Synonym search is used
    Given I am on the Search Interventions Screen
     When Include Synonym box is checked
     Then the search Intervention results will include preferred names where the intervention term is in the synonyms 
     When the Intervention name synonym is NOT checked 
     Then the search intervention results will only include entries where the intervention term in the preferred term 
  
   
    Scenario:#6 I can edit Interventions
     Given I am on the intervention Screen 
     When I have Clicked on the edit button on the edit column for the selected intervention name
     Then the edit intervention screen opens
     And I can edit editable fields
     
      | Intervention Description |

     When I click on the save button
     Then the changes made will be saved to the selected Intervention
     
      Scenario:#7 Intervention Type field Edit
    Given I am logged in as a superabstractor or Admin 
    And I am on the Edit Intervention screen
    And the intervention name is not editable
    And I can add or update Intervention Description
    And Synonyms are not editable
    And I can edit and add the Intervention type
    When I click on the save button
    Then the changes made will be saved to the selected Intervention
     
   
    Scenario:#8 I can delete one or multiple Interventions
    Given I am on the intervention screen
     When I have selected the delete box from the delete column for the selected intervention name
     And I have clicked on the delete button
     Then I have to confirm by cliking on the Ok button to remove selected intervention from the study
     And I will receive the message <Record(s) Deleted> 
     When I have clicked on the cancel button to abort removing the selected intervention from the study
     Then the record won't be deleted 
     And I should not get the message <Record(s) Deleted>
     
       Scenario: #9 I can delete all Intervention
        Given I am on the intervention screen
        When I click on the select all button 
        Then All interventions will be selected in the delete column 
        When I have clicked on the delete button 
        Then all recorded interventions will be deleted
        And I have to confirm by cliking on the Ok button to remove all interventions from the study
        And I will receive the message <Record(s) Deleted> 
        When I have clicked on the cancel button to abort removing all intervention from the study
        Then the record won't be deleted 
        And I should not get the message <Record(s) Deleted>
        

      Scenario:#10 I can reorder Interventions 
    Given I am on the Intervention Screen
    And I have the added Interventions listed 
     When I click on an Intervention row
     Then I can hold and drag to reorder the placement of an intervention 
     And  the interventions will be reordered 


     
     
     
     

