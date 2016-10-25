@Acc @global

Feature: Acc F01 Search Clinical Trials 
As a CTRP Accrual Submitter, I can search CTRP clinical trial in the CTRP Accrual Application 

    Scenario: # I can submit Accrual Data
    Given I am logged into the CTRP Accrual Application
    And I have permission to submit accrual data 
     And I have been assigned a role type
     
      |Trial Submitter  |
      |Site Accrual Submitter  |
      |Organization Family Accrual Submitter  |
   When I login into the Accrual Application
   Then the list of Trials to which I have been granted access will be displayed automatically 
   

  Scenario: #1 I can search and select CTRP clinical trials   
    Given I am logged into the CTRP Accrual Application 
    And A list of Trials I have been granted access is displayed automatically with information type
      |NCI Trial Identifier  |
      |Official Title  |
      |Current Trial Status  |
      |Clinical Research Category  |
      |Accrual Disease Terminology  |
    And Displayed trials are sorted with most recent NCI Trial Identifier by default 
    And I can search specific Trial
     When I have entered an NCI Trial Identifier
     And I have entered a ClinicalTrials.gov ID
     And I have entered a Trial's Official Title using wildcards and keywords 
     And I have clicked on the Search Trials Button
     Then the searched trial will be displayed 
     When the user does not have accrual access for the searched NCI Trial Identifier 
    Then the message "Nothing found to display" will be displayed 
    And NO trials will be listed
    
      Scenario: # I can choose Acrual Disease Terminology for a Trial
    Given I am logged into the CTRP Accrual Application
    And I am on the List of Trials section
    When the trial have no Added Study Subjects
     Then I have the option to select an Accrual Disease Terminology type from the drop down box
     
      |SDC  |
      |ICD10  |
      |ICD9  |
      |ICD-O-3  |
    And the note "Value Change to "Accrual Disease Terminology"" will be displayed under the 
    When the Accrual Disease Terminology Type is ICD-O-3
    Then the add Study Subject Screen will display the fields type
    
      |Study Subject ID  |
      |Study Subject Birth Date(MM/YYYY)  |
      |Study Subject Gender  |
      |Study Subject Race  |
      |Study Subject Ethnicity  |
      |Study Subject Country  |
      |Study Subject Zip Code  |
      |Registration Date  |
      |Study Subject method of Payment  |
      |Site  |
      |Disease  |
      |Participating Site  |
      |User who created  |
      |Last Updated Date/Time  |
    When The Accrual Disease Terminology Type is 
         
      |SDC  |
      |ICD10  |
      |ICD9  |
     
     Then the add Study Subject Screen will display the fields type
    
      |Study Subject ID  |
      |Study Subject Birth Date(MM/YYYY)  |
      |Study Subject Gender  |
      |Study Subject Race  |
      |Study Subject Ethnicity  |
      |Study Subject Country  |
      |Study Subject Zip Code  |
      |Registration Date  |
      |Study Subject method of Payment  |
      |Disease  |
      |Participating Site  |
      |User who created  |
      |Last Updated Date/Time  |
     
     
     Scenario:# I can search Sites in a Trial
    Given I am on the Add Study Subject
    And the Accrual Disease Terminology Type is ICD-O-3
     When I click on the Look Up button to seach a Trial Site
     Then the Search Site screen will be displayed with search site type
     
      |Site Name  |
      |Site Code  |
      |Site Code System  |
     And the Site Code System will be populated
     And the Site Code System can't be changes
     And I can enter a Site name 
     And I can enter a Site Code
     When I click on the search Button
     Then the site informaiton will be displayed with information type
     
      |Name  |
      |Code  |
      |System  |
      |Menu Display Name  |
      |Select  |
  
     When I click on the select button for a site
     Then the selected Site will be added to the site field
     When I click on the cancel button 
     Then the Add Study Subject screen will be displayed
    
      Scenario:#2 I can choose Trial information to be displayed on the list of trials
    Given I am on the Trial Search screen
     When I have clicked on the Choose column drop down button to filter displayed Trial Information
     Then A drop down list of Trial Information type displays
     
      |NCI Trial Identifier  |
      |Official Title  |
      |Current Trial Status  |
      |Trial Type  |
      |Accrual Disease Terminology  |

     
     When I check a trial information box
     Then the checked trial information will be displayed as a column on the list of trials table
     When I don't check a box
     Then the trial information column won't be displayed on the trial list

       Scenario:#2a I can sort Trial displayed information using a sort capabilities for all columns 
       Given I am on the Trial Search screen
     When I click on the selected trial information column 
     Then Trial Information will be sorted ascendingly or descendingly 



    Scenario: #3 I can view study subjects for Complete Trials
      Given I am on the Trial Search screen 
      And I can view a list of Trials
     When I have clicked on the NCI Trial Identifier of the selected trial
     Then the trial details type will be displayed at the top of the screen
     
      |NCI Trial Identifier:   |
      |Official Title:  |
      |Lead Organization Trial ID: 9672 |
      |Principal Investigator: George,Suzanne  |
      |Lead Organization: Dane-Farber Cancer Institute  |

   And  the Search Study Subject screen will be displayed with data type
     
        
      |Study Subject ID  |
      |Participating Site  |
      |Study Subject Birth Date (MM/YYYY)  |
 
    When Study Subjects were added to the trial
    Then the list of Study Subjects will be displayed with the data type
     
     
      |Study Subject ID  |
      |Registration Date  |
      |Participating Site  |
      |Last Update Date/Time  |
      |Actions  |
  
     Scenario:#5 I Can search Study Subject for a complete Trial
    Given I am on the Search Study Subject Screen
     And I have entered a unique Study Subject ID
     And I have selected a Participating Site
     And I have entered a Study Subject Birth Date
     When I have clicked on the search Button
     Then the study Suject will be displayed
     
   Scenario:#6 I can Add New Study Subject 
    Given I am on the Trial Search screen 
      And I can view a list of Trials
     When I have clicked on the NCI Trial Identifier of the selected trial
     Then  the Search Study Subject Screen will be displayed
     When I click on the Add New Study Subject Button
     Then The Add Study Subject screen will be displayed
     And I have entered a Unique Study Subject ID
     And I have entered a Study Subject Birth Date(MM/YYYY)
     And I have selected a Study Subject Gender Type
     
      |Male  |
      |Female  |
      |Unspecified  |
      |Unknown  |

     And I have selected a Study Subject Race Type
     
     
      |American Indian or Alaska Native  |
      |Asian  |
      |Black or African American  |
      |Native Hawaiian or Other Pacific Islander  |
      |Not Reported  |
      |Unknown  |
      |White  |

    And I can select more than one Study Subject race "To select multiple races, select one race, and then press and hold the CTRL key as you select the other(s)"
    And I have selected Study Subject Ethnicity type
    
      |Hispanic or Latino  |
      |Not Hispanic or Latino  |
      |Not Reported  |
      |Unknown  |
    And I have selected a Study Suject Country
    And I entered a Study Subject Zip Code
    And I have entered a Registration Date
    And I have selected a Study Subject method of payment Type
    
      |Private Insurance  |
      |Medicare  |
      |Medicare and Private Insurance  |
      |Medicaid  |
      |Medicaid and Private Insurance  |
      |Military or Veterans Sponsored, NOS  |
      |Military Sponsored(Including CHAMPUS & TRICARE)  |
      |Veterans Sponsored  |
      |Self-Pay (No Insurance)  |
      |No Means of Payment (No Insurance)  |
      |Managed Care  |
      |State Supplemental Health Insurance  |
      |Other  |
      |Unknown  |
   And I can Look up a Disease
   And I can select the appropriate Participating Site from the drop-down list
   When I have clicked on the save button
   Then the new study subject will be added to the study
   And I can add more study subjects
   When I have clicked on the Cancel button
   Then the new study subject will not be added to the study
   And the search Study Subject will be displayed
   
     Scenario: # Study Subject ID must be a unique ID
    Given I am on the Add Study Subject screen
     When I add an existing Study Suject ID 
     Then the error message "This Study Subject id(1234)has already been added to this site"


   
     Scenario:#7 Look Up Disease Function
    Given I am on the Add Study Subject Screen
     When I have clicked on the Look Up button to select a Disease
     Then the Search Disease sceen will be displayed
     And I can enter Disease Name
     And I can enter Disease Code
     And I can enter Disease Code System Type
     When I have clicked on the search button
     Then a list of Diseases information type will be displayed 
     
      |Name  |
      |Code  |
      |System  |
      |Menu Display Name  |
      |Select  |
    
     When I enter a disease name in the search box provided
     Then a filtered list will display the entered disease name
     When I select a disease name 
     Then the disease name will be populated in the Disease field
     
     
       Scenario:#8 Search Disease Mandatory Fields
    Given I am on the Search Disease Screen
     When I have not entered a Disease Name
     And I have not entered a Disease code
     And The Disease Code System will be populated
     And The Disease Code can't be changed
     Then the error "Please enter a name or code to search" will be displayed
     
    Scenario:#9 Add Study Subject Mandatory fields
    Given I am on the Add Study Subject Screen
     When I have not entered the "AddStudySubjectType"
     Then The "AddStudySubjectErrorType" will be displayed
     
      |<AddStudySubjectType>              |<AddStudySubjectErrorType>  |
      |Study Subject ID                   |Study Subject is required   |
      |Study Subject Birth date(MM/YYYY)  |Birth Date is required  |
      |Study Subject Gender               |Gender is required  |
      |Study Subject Race                 |Race is required  |
      |Study Subject Ethnicity            |Ethnicity is required  |
      |Study Subject Country              |Study Subject Country is required 
      |Registration Date                  |Registration Date is Required  |
      |Site                               |Site is Required  |
      |Disease                            |Disease is required  |
      |Participating Site                 |Participating Site is required  |
     When the Subject Country is "United States"
     Then I must enter a Study Subject Zip Code
    
    Scenario: #10 I can view a Study Subject information details
  	Given I am on the search study subject screen
     When I have clicked on a study subject 
     Then the view study subject screen will be display with the information type
     

      |Study Subject ID  |
      |Study Subject Birth Date(MM/YYYY)  |
      |Study Subject Gender  |
      |Study Subject Race  |
      |Study Subject Ethnicity  |
      |Study Subject Country  |
      |Study Subject Zip Code  |
      |Registration Date  |
      |Study Subject method of Payment  |
      |Disease  |
      |Participating Site  |
      |User who created  |
      |Last Updated Date/Time  |

   And I can click on the Edit Button to update the Study Subject information 
   And I can click on the Back button to go back to the Search Study Subject Screen
   
   
     Scenario:#11 I can Update Study Subject Information
    Given I am on the Search Study Subject screen
    And I can view a list of study Subjects
     When I have clicked on the edit icon on the actions column for the selected study subject
     Then the Update Study Subject screen open
     And I can update Study Subject data type
      |Study Subject ID  |
      |Study Subject Birth Date(MM/YYYY)  |
      |Study Subject Gender  |
      |Study Subject Race  |
      |Study Subject Ethnicity  |
      |Study Subject Country  |
      |Study Subject Zip Code  |
      |Registration Date  |
      |Study Subject method of Payment  |
      |Disease  |
      |Participating Site  |
     When I have clicked on the save button
     Then all the updated data are saved 
     And the "message:Record Updated" will be displayed
     When I have clicked on the cancel button
     Then the study subject last saved data won't be updated 
     And the search Study Subject screen will be displayed

  Scenario: #12 I can delete Study Subject Information 
    Given I am on the Search Study Subject screen
    And I can view a list of study Subjects
     When I have clicked on the delete icon on the actions column for the selected study subject
     Then The subject Delete Reason screen will be displayed
     And I must select a reason type
     
      |Enrolled in Incorrect Study  |
      |Other Administrative Error  |

    When I have clicked on the OK Button
    Then the study subject is deleted
    And the "Message: Record Deleted" will be displayed
    When I have clicked on the Cancel Button
    Then the study subject won't be deleted
    
    
      Scenario: #13 I can record the total number of accruals associated with Abbreviated and Other Clinical Trials
    Given I am a registered member of one or more of the Participating Sites 
    And I am affiliated with the site for a given trial
    And I am on the Trial Search screen
    And I can a list of trials 
     When I click on the NCI Trial Identifier of an Abbreviated Trial
     Then The Participating Site Subject Accrual Count screen will be displayed with the date type
     
      |PO Id  |
      |Site Name  |
      |# of Subjects Enrolled |
      |Date Last Updated|
      |Actions  |

     
     And the trial information type will be displayed at the top of the screen 
     
      |NCI-2015-01718  |Relapse-Prevention Booklets an an Adjunt to a Tobacco Quitline  |
      |Lead Organization Trial ID:  |MCC-15725  |
      |Lead Organization:  |Moffitt Cancer Center   |
      
      And I can enter "# of Subjects Enrolled" currently enrolled in studies at my site
      When I click on the Reset button
      Then the "# of Subjects Enrolled" will be reset to the last entered number
      When I have clicked on the "Save icon" on the actions column
      Then the" # of Asubjects Enrolled" added will be assciated with the trial
      And "the message: Record Updated" will be displayed 
      And the CTRP system records each COUNT submitted as the total number

     
      Scenario: #14 I can update Site Subject Accrual Counts
    Given I am on the Participating Site Accrual Count
     And I can click on the "save" icon in the Actions column to update the "# of Subjects Enrolled"
     When I click on the "Save" icon 
     Then The "# of Subjects Enrolled" will be updated
     And the "Message: Record Updated" will be displayed
     
       Scenario: #15 I can delete Site Subject Accrual Counts
    Given I am on the Participating Site Accrual Count
     When I have cliked on the Delete Icon in the Actions column
     Then The message "Click OK to remove selected site(s) accrual counts. Cancel to abort" will be displayed
     When I click on the OK button
     Then the "# of subjects enrolled" will be deleted 
     And the "Message: Subject Accrual Count Deleted" will be displayed
     
     

      Scenario: #16 I can Submit Summary Level Accrual for a Non-Interventional Trial 
    Given I can view a list of trials on the Trial Search screen
     When I have clicked on the NCI Trial Identifier for a Non-Interventioanl Trial 
     Then the Participating Site Subject Accrual Count screen will display table type
     
      |PO Id  |
      |Site Name  |
      |# of Subjects Enrolled  |
      |Date Last Updated  |
      |Actions  |

      And I can view Trial information type at the top of the screen
     
     
      |NCI-2015-01723  |Protocol For A Research Database For Hematopoietic Stem Cell Transplantation, Other Cellular Therapies and Marrow Toxic Injuries  |
      |Lead Organization Trial ID  |NMDP IRB-1999-0021  |
      |Lead Oganization  |Center for International Blood and Marrow Transplant Research  |
      
      And I can enter "# of Subjects Enrolled"for the displayed Participating sites
      When I click on the save icon
      Then the "# of Subjects Enrolled" added will be recorded 
      

      Scenario:#17 I can Submit Detail Subject Accrual for a Non-Interventioanl Trial
    Given I am on the Participating Site Subject Accrual Count for a Non-Interventional Trial
    When no accrual counts have been added for the selected trial previously
    Then I can elect to submit the accrual data at the subject level instead of the summary level
    And I can view " Switch to Subject Level Accrual" tab at the top right
     When I have clicked on the "Switch to Subject Level Accrual" 
     Then The Search Study Subject screen will display
     And I can enter Study Subjects 
     
     
       Scenario:#18 Non-Interventional Trial Accruals rules
    Given I am on the participating Site Subject Accrual Count
    And Participating Sites can enter accrual data at the summary level by default
     When Currently There are no accrual records for my trial in CTRP
     Then I can enter demographic accrual information at the study subject
     When a participating site has recorded accruals
     Then I can no longer choose which level to use
     And I must enter subsequent accrual data at the same level

 
       Scenario: #19 Submit Summary Level Accrual rules
    Given I logged into the Accrual Application
     When I have entered a Summary level Accrual count 
     Then the CTRP system records each COUNT submitted as the TOTAL number of subjects accrued to date
     And the CTRP system does not add the count currently entered to previously-recorded counts






