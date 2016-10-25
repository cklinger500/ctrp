@PA  @global
Feature: PA F07 View and Add Trial Milestones

As any CTRP PA User, I can View and Add Milestones


Scenario: #1 I can add trial milestones
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial Milestones Screen
And I have selected the current submission number
And I can view the trail milestone information for the current 
And I can select a Milestone from the list:
|Submission Received Date|
|Validation Processing Start Date         |
|Validation Processing Completed Date     |
|Submission Acceptance Date|
|Submission Terminated Date|
|Submission Reactivated Date|
|Submission Rejection Date|
|Administrative Processing Start Date|
|Administrative Processing Completed Date|
|Ready for Administrative QC Date|
|Administrative QC Start Date|
|Administrative QC Completed Date|
|Scientific Processing Start Date|
|Scientific Processing Completion Date|
|Ready for Scientific QC Date|
|Scientific QC Start Date|
|Scientific QC Completed Date|
|Ready for TSR Date|
|Trial Summary Report Date|
|Submitter Trial Summary Report Feedback Date|
|Initial Abstraction Verified Date|
|On-going Abstraction Verified Date|
|Late Rejection Date| 
And the current datetime will be associated with the milestone
And I can enter a comment
Then the information will be associated with the trial
 
 Scenario:#2 I can Add Trial Milestones Reason rule
    Given I am on the Add Milestone screen
     When I have selected a milestone type from the Milestone list 
     
      | Submission Rejection Date |
      | Late Rejection Date |

   Then A Rejection Reason field will be displayed
   And I have to select a reason from the dropdown list type
   
      | Out of Scope |
      | Duplicate |
      | Other  |
    And the current datetime will be associated with the milestone
    And I have to enter a comment in the comment box
    And both the rejection reason and the rejection comment will be displayed in the comment column of Trial Milestones table

Scenario: #3 I view current trial milestones
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial Milestones Screen
Then I can view the trail milestone information for the current (most recent) submission number Ordered by Milestone Date and Time with the oldest Date and Time first:
|Submission Number| 
|Milestone|
|Milestone Date and Time| 
|Comment|
|Creator (Last Name, First Name)|
|Creation Date (Date and Time)|


Scenario: #4 I view any submission trial milestones
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial Milestones Screen
And I have selected a submission number
Then I can view the trail milestone information for the selected submission number Ordered by Milestone Date and Time with the oldest  Date and Time first:
|Submission Number| 
|Milestone|
|Milestone Date and Time| 
|Comment|
|Creator (Last Name, First Name)|
|Creation Date (Date and Time)|

Scenario Outline:#5 Trial Milestones Recording Rules
  Given : I am logged into the CTRP Protocol Abstraction Application
    And I have selected a Trial
    And I am on the Trial Milestones Screen
    When Some Trial Milestones <Milestones> will be System Generated automatically <SystemGeneratedRule>
    And Some Trial Milestones <Milestones> will be Recorded by the PA application user manually <UserRecordedRule>
   Then the trial Milestones section will complete

  Examples: 

|Milestones                                    |SystemGeneratedRules                                                                                                                                                                   |    UserRecordedRules                                                                                                                  |
|Submission Received Date                      |Triggered by Trial Submission                                                                                                                                                          |                                                                                                                                       |                   
|Submission Received Date                      |Triggered By an Amendment Submission                                                                                                                                                   |                                                                                                                                       |
|Validation Processing Start Date              |N/A                                                                                                                                                                                    |    Recorded when starting Submission Validation                                                                                       |
|Validation Processing Completed Date          |N/A                                                                                                                                                                                    |    Recorded when completing Submission Validation                                                                                     |               
|Submission Acceptance Date                    |Triggered by Acceptance after Validation                                                                                                                                               |    Recorded at trial Validation (submission)                                                                                          |
|Submission Acceptance Date                    |Triggers setting the Processing Status to "Accepted"                                                                                                                                   |    As an exception for trial validation (submission)                                                                                  |
|Submission Terminated Date                    |Triggered if on hold more than 21 Business days and Submission Acceptance Date has not been recorded (after the hold reminder was sent out 7 times waiting 3 days after each reminder) |    Added at any point except after milestone "Submission Rejection Date" or "Late Rejection Date"                                     |
|Submission Terminated Date                    |Triggers setting the Processing Status to "Submission Terminated"                                                                                                                      |                                                                                                                                       |
|Submission Reactivated Date                   |N/A                                                                                                                                                                                    |    Added only if the processing status is "Submission Terminated"                                                                     |
|Submission Reactivated Date                   |Triggers setting the Processing Status to "Submission Reactivated"                                                                                                                     |                                                                                                                                       |
|Submission Rejection Date                     |Recorded at Trial Rejection including Late Rejection if "Submission Received Date" recorded  (Generated after Trial Summary report Date Milestone)                                     |                                                                                                                                       |                                                            
|Submission Rejection Date                     |Triggers rollback of submission to prior non rejected submission                                                                                                                       |    N/A                                                                                                                                |
|Submission Rejection Date                     |Triggers setting the documents for the submission to be deleted                                                                                                                        |    N/A                                                                                                                                |
|Administrative Processing Start Date          |N/A                                                                                                                                                                                    |    Recorded when starting Administration Abstraction and after trail is validated and accepted                                        |
|Administrative Processing Completed Date      |N/A                                                                                                                                                                                    |    Recorded after completing Administrative Abstraction                                                                               |
|Ready for Administrative QC date              |Triggered by Administrative Processing Completed Date Milestone record entered                                                                                                         |                                                                                                                                        |
|Administrative QC Start Date                  |N/A                                                                                                                                                                                    |    Recorded when starting Administrative QC                                                                                           |
|Administrative QC Completed Date              |N/A                                                                                                                                                                                    |    Recorded when completing Administrative QC                                                                                         |
|Administrative QC Completed Date              |Triggers recording "Ready for TSR Date" milestone if "Scientific QC Completed Date" milestone is recorded and the abstraction validation has no errors (see PA F13) when it is an amendment| submission and it has a reason of both Administrative and Scientific                                                              |
|Administrative QC Completed Date              |Triggers recording "Ready for TSR Date" milestone if the abstraction validation has no errors (see PA F13) when Amendment submission has an amendment reason "Administrative"          |                                                                                                                                       |
|Scientific Processing Start Date              |N/A                                                                                                                                                                                    |    Recorded when starting Scientific Abstraction and after trail is validated and accepted                                            |
|Scientific Processing Completed Date          |N/A                                                                                                                                                                                    |    Recorded after completing Scientific Abstraction                                                                                   |
|Ready for Scientific QC Date                  |Triggered by Scientific Processing Completed Date Milestone record entered                                                                                                             |                                                                                                                                       |
|Scientific QC Start Date                      |N/A                                                                                                                                                                                    |    Recorded when starting Scientific QC                                                                                               |
|Scientific QC Completed Date                  |N/A                                                                                                                                                                                    |    Recorded when completing Scientific QC                                                                                             |
|Scientific QC Completed Date                  |Triggers recording "Ready for TSR Date" milestone if "Administrative QC Completed Date" milestone is recorded and the abstraction validation has no errors (see PA F13) when  it is an amendment submission and it has a reason of both Administrative and Scientific|                                                         |
|Scientific QC Completed Date                  |Triggers recording "Ready for TSR Date" milestone if the abstraction is valid when Amendment submission has an amendment reason "Scientific"                                           |                                                                                                                                  |
|Ready for TSR Date                            |Triggered by "Administrative QC Complete Date" if "Scientific QC Completed Date" recorded or "Scientific QC Complete Date" if "Administrative QC Completed Date"                       |                                                                                                                                      |
|Ready for TSR Date                            |Recording this milestone updates the trial record verification date to the date of the milestone                                                                                       |                                                                                                                                       |
|Ready for TSR Date                            |Triggers setting the Processing Status to "Abstracted"                                                                                                                                 |                                                                                                                                       |
|Trial Summary Report Date                     |N/A                                                                                                                                                                                    | Recorded when completing Administrative and Scientific QC and Validation successful and TSR and XML sent to submitter              |
|Trial Summary Report Date                     |Triggers adding the "Verification Pending" processing status                                                                                                                           |                                                                                                                                       |
|Trial Summary Report Date                     |Triggers sending e-mail using template "Submission Trial Summary Report"  with TSR as an attachment to the submitter when recorded for original Submission for protocol trials         |                                                                                                                                       |                                                                  
|Trial Summary Report Date                     |Triggers sending e-mail using template "Amendment Trial Summary Report"  with TSR as an attachment to the submitter when recorded for all amendments to a trial for protocol trials    |                                                                                                                                       |                                                                   
|Trial Summary Report Date                     |Triggers creating a Trial Summary Report (TSR) for Protocol Trials and saving it the trial related documents (see PA F09 View trial summary Report for file name)                      |                                                                                                                                       |
|Submitter Trial Summary Report Feedback Date  |N/A                                                                                                                                                                                    | Recorded if feedback is received                                                                                                   |
|Initial Abstraction Verified Date             |N/A                                                                                                                                                                                    |Recorded if feedback is received within 5 business days and the information source is "Protocol"                                   |
|Initial Abstraction Verified Date             |Triggered if the submitter's feedback is not received within 5 business days and the information source is "Protocol" and the "Initial Abstraction Verified Date" Milestone does not exist for this submission  |                                                                                                              |                                       
|Initial Abstraction Verified Date             |Triggers adding "Abstraction Verified-Response" processing status if is done manually upon receiving submitter's feedback and recording corresponding milestone and if the most current processing status is "Abstracted" or "Verification Pending" |                                                                          |
|Initial Abstraction Verified Date             |Triggers adding "Abstraction Verified-No Response" processing status if recorded by the system in case if no submitter's feedback is received within 6 business days (no corresponding milestone recorded) and the most current processing status is "Abstracted" or "Verification Pending" |                                   |
|Initial Abstraction Verified Date             |Triggers updating 'Trial Record Verification Date" to the date of this milestone recording                                                                                             |                                                                                                                                       |                                     
|On-going Abstraction Verified Date            |N/A                                                                                                                                                                                    | Completed at completing abstraction update                                                                                         |
|On-going Abstraction Verified Date            |Triggered if the submitter's feedback is not received within 5 business days and the information source is "Protocol" and the "Initial Abstraction Verified Date" Milestone exists for this submission |                                                                                                                       |
|On-going Abstraction Verified Date            |Triggers adding "Abstraction Verified-Response" processing status if the most current processing status is "Abstraction verified-No Response" and "Trial Summary Report Feedback Date" milestone exist|                                                                                                                        |
|On-going Abstraction Verified Date            |Triggers updating "Trial Record verification Date" to the date of this milestone recording                                                                                             |                                                                                                                                       |
|Late Rejection Date                           |N/A                                                                                                                                                                                    |    Recorded at any step of the originally submitted trial processing, can only be applied after trail was accepted                    |
|Late Rejection Date                           |Triggers sending "Submission Rejected Trial" email and adding "Rejected" processing status                                                                                             |                                                                                                                                       |
                                                                                                                                                                                                                                            

Scenario Outline: #6 Trials Milestones validation rules
  Given I am logged into the CTRP Protocol Abstraction application
    And I have selected a Trial
    And I am on the Trial Milestones Screen
    When I add a milestone <Milestone> 
    And the specific milestone rule <MilestoneRule> is verified
    Then the milestone <Milestone> is valid and can be recorded
	
 Examples: 
     
      |<Milestone>                                 |<MilestoneRule>                                                                                                                                                                |
      |Submission Received Date                    |Trial Submitted via the Trial registration portal                                                                                                                              |
      |Validation Processing Start Date            |Submission Received Date milestone exists                                                                                                                                    |
      |Validation Processing Completed Date        |Validation Processing Start Date milestone exists                                                                                                                                         |
      |Validation Processing Completed Date        |Cannot be recorded if at least one active "On Hold"record exists                                                                                                               |                            
      |Validation Processing Completed Date        |Cannot be recorded if at least one update needs to be acknowledged                                                                                                               |
      |Submission Acceptance Date                  |Only if milestone "Validation Processing Completed Date" exists                                                                                                                           |
      |Submission Terminated Date                  |1.If milestone "Submission Rejected Date" does not exist                                                                                                                       |
      |Submission Terminated Date                  |2.If milestone "Late Rejection Date" does not exist                                                                                                                            |
      |Submission Reactivated Date                 |If Milestone "Submission Terminated Date" exists (must be preceded by"Submission Terminated Date")                                                                                                                                                                                                                                                 |
      |Submission Rejection Date                   |If milestone "Submission Received Date " exists                                                                                                                                                                                                                                             |
      |Administrative Processing Start Date        |If "Submission Acceptance Date" milestone exists                                                                                                                                                                                                                                            |
      |Administrative Processing Completed Date    |1.If "Administrative Processing Start Date" milestone exists                                                                                                                                                                                                                                |
      |Administrative Processing Completed Date    |2.Cannot be recorded if at least one active "On Hold"record exists                                                                                                                                                                                                                          |
      |Administrative Processing Completed Date    |3.Cannot be recorded if at least one update needs to be acknowledged                                                                                                                                                                                                                           |
      |Administrative Processing Completed Date    |4.Cannot be recorded if if Trail is checked out for Administrative processing                                                                                                                                                                                                               |
      |Ready for Administrative QC Date            |1.If "Administrative Processing Completion Date" milestone exists                                                                                                                                                                                                                             |
      |Ready for Administrative QC Date            |2.Cannot be recorded if at least one update needs to be acknowledged                                                                                                                                                                                                                                         |
      |Ready for Administrative QC Date            |3.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                                                                                                         |
      |Administrative QC Start Date                |1.If "Ready for Administrative QC Date" milestone exists                                                                                                                                                                                                                                    |
      |Administrative QC Start Date                |2.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                                                                                                         |
      |Administrative QC Start Date                |3.Cannot be recorded if at least at least one update needs to be acknowledged                                                                                                                                                                                                                       |
      |Administrative QC Completed Date            |1.If "Administrative QC Start Date" milestone exists                                                                                                                                                                                                                                        |
      |Administrative QC Completed Date            |2.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                                                                                                         |
      |Administrative QC Completed Date            |3.Cannot be recorded if at least at least one update needs to be acknowledged                                                                                                                                                                                                                       |
      |Administrative QC Completed Date            |4.Cannot be recorded if trail is checked out for Administrative processing                                                                                                                                                                                                                  |
      |Scientific Processing Start Date            |If "Submission Acceptance Date" milestone exists                                                                                                                                                                                                                                            |
      |Scientific Processing Completed Date        |1.If "Scientific Processing Start Date" milestone exists                                                                                                                                                                                                                                    |
      |Scientific Processing Completed Date        |2.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                                                                                                         |
      |Ready for Scientific QC Date                |1.If "Scientific Processing Completed Date" milestone exists                                                                                                                                                                                                                                |
      |Ready for Scientific QC Date                |2.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                                                                                                         |
      |Ready for Scientific QC Date                |3.Cannot be recorded if trail is checked out for Scientific Processing                                                                                                                                                                                                                      |
      |Scientific QC Start Date                    |1.If "Ready for Scientific QC Date" milestone exists                                                                                                                                                                                                                                        |
      |Scientific QC Start Date                    |2.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                                                                                                         |
      |Scientific QC Completed Date                |1.If "Scientific QC Start Date" milestone exists                                                                                                                                                                                                                                            |
      |Scientific QC Completed Date                |2.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                                                                                                         |
      |Scientific QC Completed Date                |3.Cannot be recorded if Trail is checked out for Scientific processing                                                                                                                                                                                                                      |
      |Ready for TSR Date                          |1.If "Administrative QC Completed Date" and "Scientific QC Completed Date" milestones exists and abstraction validation has no errors (see PA F13)(must be preceded by either "Administrative QC Completed Date" or "Scientific QC Completed Date")                                                                                                                                          |
      |Ready for TSR Date                          |2.Cannot be recorded if both "Administrative QC Completed Date" and "Scientific Completed Date" milestones do not exist in case of an original submission or when an amendment with both amendment submission reasons                                                                       |
      |Ready for TSR Date                          |3.Cannot be recorded if "Administrative QC Completed Date" milestone does not exist for an amendment submission with "Administrative" Reason for amendment                                                                                                                                  |
      |Ready for TSR Date                          |4.Cannot be recorded if "Scientific QC Completed Date" milestone does not exist for an amendment submission with "Scientific" reason for amendment                                                                                                                                          |
      |Ready for TSR Date                          |5.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                                                                                                         |
      |Ready for TSR Date                          |6.Cannot be recorded if at least one update needs to be acknowledged                                                                                                                                                                                                                        |
      |Ready for TSR Date                          |7.Cannot be recorded if abstraction in invalid                                                                                                                                                                                                                                              |
      |Trial Summary Report Date                   |1.If "Ready for TSR Date" milestone exists & abstraction validation is a success                                                                                                                                                                                                            |
      |Trial Summary Report Date                   |2.Cannot be recorded if the most current processing status is "Submitted", "Amendment Submitted", "Accepted" or "Rejected"                                                                                                                                                                  |                                                                                                                                                                                                                                           
      |Trial Summary Report Date                   |3.Cannot be recorded if "Ready for TSR Date" milestone does not exist                                                                                                                                                                                                                       |
      |Trial Summary Report Date                   |4.Cannot be recorded if abstraction validation fails                                                                                                                                                                                                                                        |
      |Trial Summary Report Date                   |5.Cannot be recorded if if at least one unprocessed update record exists                                                                                                                                                                                                                    |
      |Trial Summary Report Date                   |6.Cannot be recorded if at least one active "On Hold" record exist                                                                                                                                                                                                                          |
      |Submitter Trial Summary Report Feedback Date|If "Trial Summary Report Date" exists (must be preceded by "Trial Summary Report Date ")                                                                                                                                                                                                                                                        |
      |Initial Abstraction Verified Date           |1.If the submitter's feedback is received within 5 business days                                                                                                                                                                                                                            |
      |Initial Abstraction Verified Date           |2.Cannot be recorded if "Ready for TSR Date" milestone does not exist                                                                                                                                                                                                                       |
      |Initial Abstraction Verified Date           |3.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                                                                                                         |
      |Initial Abstraction Verified Date           |4.Cannot be recorded if at least one unprocessed update record exists                                                                                                                                                                                                                       |
      |Initial Abstraction Verified Date           |5.Recorded once per submission                                                                                                                                                                                                                                                              |
      |On-going Abstraction Verified Date          |1.Cannot be recorded if Abstraction Validation Fails                                                                                                                                                    |                                                                                   |
      |On-going Abstraction Verified Date          |2.Cannot be recorded if at least one active "On Hold" record exists                                                                                                                                      |                                                                                   |
      |On-going Abstraction Verified Date          |3.Cannot be recorded if at least one unprocessed update record exist                                                                                                                                    |                                                                                   |
      |On-going Abstraction Verified Date          |4.Cannot be recorded if "Initial Abstraction Verified Date" milestone does not exist
      |Late Rejection Date                         |1.Can be recorded at any step of trial processing after trial was accepted                                                            |                                                                                   |                                                                                                                                            |
      |Late Rejection Date                         |2.Cannot be recorded if the reason for rejection is not provided                                                                                                                                         |                                                                                   |
      |Late Rejection Date                         |3.Can only be recorded by the Abstractor, Super and Admin users                                                                                                                                                             |                                                                                   |
      |Late Rejection Date                         |4.Cannot be recorded if at least one unprocessed update record exists                                                                                                                                   |                                                                                   |
      |                                            |                                                                                                                                                                                                        |                                                                                   |
    
    
    Scenario:#7 Multiple Milestones can be entered per Trial per submission
  Given : I am logged into the CTRP Protocol Abstraction Application
   When I have selected a Trial
    And I am on the Trial Milestones Screen
    And I am on the Add Milestone Screen
    And I can Add Milestone Type
    And I am on the same submission
     
      |Milestone  |
      |Datetime (automatically associated)|
      |Comment    |
    And I can enter multiple Milestones per trial for the <MilestoneType> and milestone comment won't be required
    	
      |Submission Terminated Date               |
      |Submission Reactivated Date              |
      |Trial Summary Report Date                |
      |Submitter Trial Summary Report Feedback   |
      |On-going Abstraction Verified Date       |
      
     And I can enter "Late Rejection Milestone" milestone only one time during a Trial and "Late Rejection milestone" comment will be required 

   Scenario:#8 Submission Rejection Date Milestone Warning
  Given : I am logged into the CTRP Protocol Abstraction Application
   When I have selected a Trial
    And I am on the Trial Milestones Screen
    And I add the Submission Rejection Date milestone
    Then a warning message will appear "Adding the Submission Rejection Date will Reject this submission"
    And the user can select OK to continue 
    And the user can select Cancel

 Scenario:#9 Late Rejection Date Milestone Warning
  Given : I am logged into the CTRP Protocol Abstraction Application
   When I have selected a Trial
    And I am on the Trial Milestones Screen
    And I add the Late Rejection Date milestone
    Then a warning message will appear "Adding the Late Rejection Date will Reject this Trial Completely.  Use the "Submission Rejection Date" milesotne to Reject the submission"
    And the user can select OK to continue 
    And the user can select Cancel 
     
 Scenario:#10 Un-Reject Milestone
  Given : I am logged into the CTRP Protocol Abstraction Application
   When I have selected a Trial
    And I am on the Trial Milestones Screen
    And the "Late Rejection Date" milestone exist for the current submission
    Then the the system will display the "Un-Reject Trail" button
    When the user selects "Un-Reject Trail"
    Then I have to enter a comment in the comment box 
    And the comment and the current datetime will be added to the comment field for prior milestone for this trial
    And the "Late Rejection Date" milestone will be deleted
    And the "Processing Status" will be set to the processing status associated with the trial prior to the addition of the "Late Rejection Milestone"
   

 Scenario:#11 Submission Rejection Date Milestone Roll back
  Given : I am logged into the CTRP Protocol Abstraction Application
   When I have selected a Trial
    And I am on the Trial Milestones Screen
    And the "Submission Rejection Date" milestone is added to the current submission
    When the curent submission is the original submission
    Then a warning message will appear "Adding the Submission Rejection Date will reject this Trial"
    And I select OK
    Then the Submission Rejection Date milestone will be added
    And the processing status will be set to Rejected
    When the curent submission is not the original submission (it is an amendment)
    Then a warning message will appear "Adding the Submission Rejection Date will reject this submission and roll back the trial to the prior submission"
    And I select OK
    Then the Submission Rejection Date milestone will be added for the current submisson
    And the processing status will be set to Rejected will be added for the current submisson
    And the Trail data elements will be rolled back the data elements for the prior submission (that does not have a Submission Rejection Date milestone or a Late Rejection Date Milestone) 
    And the current processing status will be the latest processing status for the prior submission
    And the current milestone will be the latest processing status for the prior submission
     
