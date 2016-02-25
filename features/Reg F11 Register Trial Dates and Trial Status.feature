@Global @Reg
Feature: Reg F11 Register Trial Dates and Trial Status

As a CTRP User, I can register a trial's key dates and trial status

Scenario Outline: #1 Active Trial Status Transition Rules
  Given I have selected the option to register a trial type 
  
  		
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

    And I am on the Register Trial Status screen
   When I choose a trial status <status-from> from the status drop down box
    And the trial status changes from <Status-from> to status <status-to>
    And a condition < Condition-Text> should be respected for the transition to be valid
	And I click on the add status button
   Then no error or warning should be displayed in the validation messages column 
   
Examples: 

      |Status From                                     |Status to                                      |Condition-Text                                                                                          |
      |In Review                                       |Approved                                       |                                                                                                                                                                          
      |In Review                                       |Active                                         |This can occur when the trial has been Approved and is Active/Enrolling by Invitation on the same day   |
      |In Review                                       |Enrolling by Invitation                        |This can occur when the trial has been Approved and is Active/Enrolling by Invitation on the same day 
      |In Review                                       |Withdrawn                                      |                                                                                                        |
      |Approved                                        |Active                                         |                                                                                                        |
      |Approved                                        |Enrolling by invitation                        |                                                                                                        |
      |Approved                                        |Withdrawn                                      |                                                                                                        |
      |Active                                          |Closed to Accrual                              |                                                                                                        |
      |Active                                          |Temporarily Closed to Accrual                  |                                                                                                        |
      |Active                                          |Temporarily Closed to Accrual and Intervention |                                                                                                        |
      |Active                                          |Closed to Accrual and Intervention             |                                                                                                        |
      |Active                                          |Administratively Completed                     |                                                                                                        |
      |Active                                          |Completed                                      |                                                                                                        |
      |Enrolling by Invitation                         |Closed to Accrual                              |                                                                                                        |
      |Enrolling by Invitation                         |Temporarily Closed to Accrual                  |                                                                                                        |
      |Enrolling by Invitation                         |Temporarily Closed to Accrual and Intervention |                                                                                                        |
      |Enrolling by Invitation                         |Closed to Accrual and Intervention             |                                                                                                        |
      |Enrolling by Invitation                         |Administratively Completed                     |                                                                                                        |
      |Enrolling by Invitation                         |Completed                                      |                                                                                                        |
      |Closed to Accrual                               |Closed to Accrual and Intervention             |                                                                                                        |
      |Closed to Accrual                               |Administratively Completed                     |                                                                                                        |
      |Closed to Accrual and Intervention              |Completed                                      |                                                                                                        |
      |Closed to Accrual and Intervention              |Administratively Completed                     |                                                                                                        |
      |Temporarily Closed to Accrual                   |Temporarily Closed to Accrual and Intervention |                                                                                                        |
      |Temporarily Closed to Accrual                   |Active                 				           |                                                                                                        |
      |Temporarily Closed to Accrual                    Enrolling by Invitation                        |                                                                                                        |                                                   
      |Temporarily Closed to Accrual                   |Closed to Accrual                              |                                                                                                        |
      |Temporarily Closed to Accrual                   |Closed to Accrual and Intervention             |                                                                                                        |
      |Temporarily Closed to Accrual                   |Administratively Completed                     |                                                                                                        |
      |Temporarily Closed to Accrual and Intervention  |Administratively Completed                     |                                                                                                        |
      |Temporarily Closed to Accrual and Intervention  |Active                                         |                                                                                                   
      |Temporarily Closed to Accrual and Intervention   Enrolling by Invitation                        |                                                                                                        |
      |Temporarily Closed to Accrual and Intervention  |Closed to Accrual                              |                                                                                                        |
      |Temporarily Closed to Accrual and Intervention  |Closed to Accrual and Intervention             |                                                                                                        |
                                                                                                                                                                                                                                                                                                                                                     |
      Scenario Outline:#2 Trial Status Rules
    Given I have selected the option to register a trial type 
  
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

    And I am on the Register Trial Status screen 
    When the trial status type
     
      |Administratively Complete    |
      |Withdrawn                    |
      |Temporarily Closed to accrual| for the trial status type
      
    Then I must answer the question Why Study Stopped? and a green bubble will appear in the trial status Actions 
    
    Scenario Outline: #3 Invalid Trial Status Transitions 
   Given I have selected the option to register a trial type
   
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
      
    And I am on the Register Trial Status screen
   When I choose a trial status <status-from> from the status drop down box
    And the trial status changes from <Status-from> to status <status-to>
    And I click on the add status button
   Then and a message <error-warning-text> will be displayed in the validation messages column 
   
   
    Examples: 


      |<Status-From>            |<Status-to>               |<Error-warning-text>                                                         |
      |Review                   |Active                    |Warning: Interim satus [APPROVED] is missing                                 |
      |Review                   |Enrolling by Invitation   |Warning: Interim status [APPROVED] is missing                                |
      |Approved                 |Approved                  |Error: Duplicate [APPROVED] status is not allowed                            |
      |StatusZero               |Closed to Accrual         |Error: Interim status [ACTIVE] is missing                                    |
      |StatusZero               |Closed to Accrual         |Warning: Interim status [IN REVIEW] is missing                               |
      |StatusZero               |Closed to Accrual         |Warning: Interim status [APPROVED] is missing                                |  	
      |Active                   |Enrolling by invitation   |Error: Invalid status transition from [ACTIVE] to [ENROLLING BY INVITATION]  |
      |Active                   |Complete                  |Error: Interim status [CLOSED TO ACCRUAL] is missing                         |
      |Active	                |Complete                  |Warning: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing      |
      |Active	                |Review                    |Error:Invalid status transition from [ACTIVE] to [IN REVIEW]                 |
      |Enrolling by Invitation  |Active                    |Error:Invalid status transition from [ENROLLING BY INVITATION] to [ACTIVE]   |
      
  Scenario: #4 Transition rules 
    Given I have selected the option to register a trial type
   
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
      
    And I am on the Register Trial Status screen
    When Trial Status Transition from <TrialStatusA> to <TrialStatusB> on the same day
    Then 


   
   Scenario Outline:#5 I can enter a trial status and trial status date for a trial
Given I have selected the option to register a trial type 

      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
      
And I am on the Register Trial Status screen
When I have selected a date <status date> and a status <status> and explained why study stopped <why study stopped>
Then I click on the add status button
When the system will check the entered <date> and <status> against validation rules 
@https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Transition+Rules
Then the <date> and <status> will be validated and displayed on the trial status history table with any errors and warnings 


	 Examples:
     
      |Status Date | Status                                        |Why study stopped      |
      |11-05-2015  | Approved                                      |                       
      |11-06-2015  | Active                                        |                   	   |
      |11-06-2015  | Enrolling by invitation                       |                       |
      |11-05-2016  | Closed to accrual                             |                       |
      |11-05-2016  | Close to accrual and Intervention             |                       |
      |11-08-2015  | Temporarily Closed to accrual                 |Text                   |
      |11-08-2015  | Temporarily closed to accrual and Intervention|Text                   |
      |11-08-2015  | Withdrawn                                     |Text                   |
      |11-08-2015  | Administratively Complete                     |Text                   |
      |11-05-2017  | Complete                                      |                       |

   
    Scenario Outline: #6 I can add and delete a trial
    Given I have selected the option to register a trial type 

      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
      
   And I am on the Register Trial Status screen
   When When I add a trial status 
   Then a new trial status will appear in the Trial Status History
   When I click on the delete button in the Actions column for a selected status
   Then Please provide a comment box will be displayed
   And I must provide a comment explaining why deleting this trial status
   When the comment is entered in the provided box
   And click on the delete button
   Then the selected status will be deleted
   
 
   Then the Trial Status history will be updated and no errors will be indicated during Trial Review
   
     Scenario Outline: #7 I can Edit Trial Status
    Given I have selected the option to register a trial type 

      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
     
     And I am on the Register trial Status History table
     When I click on the edit button in the Actions column for the trial status I want to edit
     And I must have entered a Status Date 
     And I must have entered a Trial status
     And I have entered Why Study Stopped 
     And I must have entered a comment 
     And I have clicked on the save button
     Then the trial status section will not indicate any errors during Trial Review
     
     
       Scenario Outline: #8 I can enter a Trial Dates as either Actual or Anticipated
    Given I have selected the option to register a trial type 

      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
     And I am on the Trial Dates Section
     And I must enter Trial Dates values type
     
      |Trial Start Date  |
      |Primary Completion Date  |
      |Completion Date  |
      
      And I must Select Trial Date type for every Trial Date value
      
       |Actual  |
       |Anticipated  |

      When I have clicked on the review button
      Then no errors should be displayed 
      

      Scenario:# 9 Trial Dates Mandatory Fields
    Given I am on the Trial Dates Section
     When I have not entered a Trial Date values for
          
      |Trial Start Date  |
      |Primary Completion date  |
	
    Then an error message " Please Enter a valid date " will be displayed 
    When I have not entered a Trial Date type for the mandatory Trial Dates
    
    
      |Actual |
      |Anticipated  |
      
      Then the error message " Please enter a valid date type " will be displayed 


  Scenario Outline: #10 Rules for Status/Dates relationships
    Given I am on the Trial Dates Section 
     When Current Trial Status is <TrialStatusType>
     Then The Trial date Type is <DateType>
     
     Example:
     
     
      |<TrialStatusType                         |<DateType>  |
      |Active                                   |Trial Start Date must be Actual (solid band)  |
      |EBI                                      |Trial Start Date must be Actual (solid band)  |
      |Closed to Accrual                        |Trial Start Date must be Actual (solid band)  |
      |Closed to Accrual and Intervention       |Trial Start Date must be Actual (solid band)  |
      |Temp Closed to Accrual                   |Trial Start Date must be Actual (solid band)  |
      |Temp Closed to Accrual and Intervention  |Trial Start Date must be Actual (solid band)  |
      |Complete                                 |All date types must be Actual (solid band)    |
      |Administratively Complete                |Trial Start Date must be Actual (solid band)  |
      |In Review                                |Trial Start Date could be Actual or Anticipated (diagonal stripes band)|
      |Approved                                 |Trial Start Date could be Actual or Anticipated (diagonal stripes band)  |
     
     
       Scenario: #11 Rules for Study Date types
    Given I am on the Trial Dates Screen
     When the Trial date is in the past
     Then the Trial date type must be actual
      When  the Trial date is today
      Then the Trial Date type could be actual
      And the Trial date Type could be anticipated
      When the Trial date is in the future
      Then the Trial date type must always be anticipated

       Scenario: #12 general rules for Study Date values are as follows
    Given I am on the trial date section
    And The Trial Start Date can be in the past, present, or future
    And The Trial Start Date can be in the past, present, or future
    And The Completion Date is always the same as, or later than, the Primary Completion Date
    And The Primary Completion Date is always the same as, or later than, the Trial Start Date
    And The Primary Completion Date can be earlier than the Current Trial Status Dates Complete
    When the Primary Completion Date is Actual
    Then the primary Completion Date can be earlier than the Current Trial Status Dates Administratively Complete 
    And The Completion Date is always the same as, or later than, the Primary Completion Date

     




     
     

 
   
   

 
  

