@Acc @global

Feature: Acc F07 Submit Summary Level Accrual
As a CTRP Accrual Submitter, I can submit Summary Level Accrual in the CTRP Accrual Application 



Scenario: #1 I can record the total number of accruals associated with Abbreviated and Other Clinical Trials
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

     
      Scenario: #2 I can update Site Subject Accrual Counts
    Given I am on the Participating Site Accrual Count
     And I can click on the "save" icon in the Actions column to update the "# of Subjects Enrolled"
     When I click on the "Save" icon 
     Then The "# of Subjects Enrolled" will be updated
     And the "Message: Record Updated" will be displayed
     
       Scenario: #3 I can delete Site Subject Accrual Counts
    Given I am on the Participating Site Accrual Count
     When I have cliked on the Delete Icon in the Actions column
     Then The message "Click OK to remove selected site(s) accrual counts. Cancel to abort" will be displayed
     When I click on the OK button
     Then the "# of subjects enrolled" will be deleted 
     And the "Message: Subject Accrual Count Deleted" will be displayed
     
     

      Scenario: #4 I can Submit Summary Level Accrual for a Non-Interventional Trial 
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
      
      
      Scenario: #5 Submit Summary Level Accrual rules
    Given I logged into the Accrual Application
     When I have entered a Summary level Accrual count 
     Then the CTRP system records each COUNT submitted as the TOTAL number of subjects accrued to date
     And the CTRP system does not add the count currently entered to previously-recorded counts
      
