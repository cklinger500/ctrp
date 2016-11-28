@PA @global
Feature: PAM F19 Abstraction Dashboard - On Hold

As a CTRP PA User, I can view  the CTRP Abstraction Dashboard On Hold

Scenario: #1 I can view the Abstraction Dashboard On Hold Section
 Given I am logged into the CTRP Protocol Abstraction application
 And I am on the CTRP Abstraction Dashboard On Hold Section
 And the Trial is on Hold
 Then a count of all the trails with On Hold reasons will be displayed for the following on hold reasons
|Submission Incomplete|
|Submission Incomplete -- Missing Documents| 
|Submission Invalid Grant |
|Submission Other (Submitter)|
|Pending CTRO Review |
|Pending Disease Curation |
|Pending Person Curation |
|Pending Organization Curation|
|Pending Intervention Curation|
|Pending Other (CTRO)| 


Scenario: #2 I can view the Abstraction Dashboard On Hold trails
 Given I am logged into the CTRP Protocol Abstraction application
 And I am on the CTRP Abstraction Dashboard On Hold Section
 And I select a specific On Hold Reason and On Hold count
 And the Trial is on Hold
 Then the following fields for all the trails with that On Hold reason will be displayed
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 0) , Amendment (Information Source = Protocol and Submission number > 0), Imported (Information Source = Imported)|  
|CTEP/DCP|
|Submitting Organization|
|Submission Date|
|Last Milestone|
|Last Milestone Date|
|Submission Source|
|Processing Priority|
|This Trial is|
And the default sort order is by NCI Trial id ordered from newest ID to oldest
And the following columns can be sorted
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 0) , Amendment (Information Source = Protocol and Submission number > 0), Imported (Information Source = Imported)|  
|CTEP/DCP|
|Submitting Organization|
|Submission Date|
|Last Milestone|
|Last Milestone Date|
|Submission Source|
|Processing Priority|
|This Trial is|

Scenario: #3 I can view trail details - Validate
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard On Hold Section
And I select a trial ID
And the latest trial milestone is "Submission Received Date"
Then the trail validaiton sidebar menu will appear
And the trial details screen will be displayed (see PAM F17 Abstraction Dashboard - Details) 

Scenario: #4 I can view trail details - Abstract
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard On Hold Section
And I select a trial ID
And the latest trial milestone is not "Submission Received Date"
Then the trail abstraction sidebar menu will appear
And the trial details screen will be displayed (see PAM F17 Abstraction Dashboard - Details)


Scenario: #5 I can export Abstraction Dashboard On Hold into an Excel spreadsheet
GGiven I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard On Hold Section
When I select the export to Excel option
Then the trials in the Abstraction Dashboard On Hold will be exported to an Excel format spreadsheet 
And will includ the following fields:
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 0) , Amendment (Information Source = Protocol and Submission number > 0), Imported (Information Source = Imported)|  
|Submitted On|
|Expected Abstraction Completion Date (Defaulted to Submission Date Plus 10 Business Days and is editible) |
|Accepted|
|Current On-Hold Date|
|Admin Abstraction Completed|
|Admin QC Completed|
|Scientific Abstraction Completed|
|Scientific QC Completed|
|Submission Date Plus 10 Business Days|
|Checked Out By|
|Ready for TSR|
|Business Days Since Submitted|
|Business Days on Hold (CTRP)|
|Business Days on Hold (Submitter)|
|Lead Organization|
|Lead Org PO ID|
|ClinicalTrials.gov Identifier|
|CTEP ID|
|DCP ID|
|CDR ID|
|Amendment #|
|Funding Source|
|On Hold Date (Latest)|
|Off Hold Date (for latest On Hold date)|
|On Hold Reason (for latest On Hold date)|
|On Hold Description (for latest On Hold date)|
|Information Source|
|NCI Sponsored (Yes if the sponsor is NCI, No if the sponsor is not NCI|
|Processing Status (latest)|
|Processing Status Date (for latest Processing status)|
|Admin Check out Name|
|Admin Check out Date (for admin checkout name)|
|Scientific Check out Name|
|Scientific Check out Date (for Scientific checkout name)|
|NIH/NCI Div/Dept Identifier|
|Submitting Organization|
|Submission Date|
|Last Milestone|
|Last Milestone Date|
|Submission Source|
|Submission Method|
|Processing Priority|
|Trial Processing Comments|
|This Trial is (LOV based on processing status, information source, Submission # and Milestone (list below))|
|Submission Received Date|
|Submission Received Date Added By|
|Submission Received Date Added On|
|Submission Acceptance Date|
|Submission Acceptance Added By|
|Submission Acceptance Added On|
|Submission Rejection Date|
|Submission Rejection Added By|
|Submission Rejection Added On|
|Submission Terminated Date|
|Submission Terminated Added By|
|Submission Terminated Added On|
|Submission Reactivated Date|
|Submission Reactivated Added By|
|Submission Reactivated Added On|
|Administrative Processing Completed Date|
|Administrative Processing Completed Date Added By|
|Administrative Processing Completed Date Added On|
|Administrative QC Completed Date|
|Administrative QC Completed Date Added By|
|Administrative QC Completed Date Added On|
|Scientific Processing Completed Date|
|Scientific Processing Completed Date Added By|
|Scientific Processing Completed Date Added On|
|Scientific QC Completed Date|
|Scientific QC Completed Date Added By|
|Scientific QC Completed Date Added On|
|Trial Summary Report Date|
|Trial Summary Report Date Added By|
|Trial Summary Report Date Added On|
|Submitter Trial Summary Report Feedback Date|
|Submitter Trial Summary Report Feedback Date Added By|
|Submitter Trial Summary Report Feedback Date Added On|
|Initial Abstraction Verified Date|
|Initial Abstraction Verified Date Added By|
|Initial Abstraction Verified Date Added On|
|On-going Abstraction Verified Date|
|On-going Abstraction Verified Date Added By|
|On-going Abstraction Verified Date Added On|
|Late Rejection Date|
|Late Rejection Date Added By|
|Late Rejection Date Added On|


Scenario: #6 Logic for This Trial is Field
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard WorkLoad
When I select the export to Excel option
Then the trials in the Abstraction Dashboard WorkLoad will be exported to an Excel format spreadsheet 
And will include the following field:
|This Trial is|

And the This Trial is field will be a concetionation of the following
|Check Out Status|
|Milestones|
|On Hold Date|
|On Hold Reason|

And the Check Out Status will be 
|<Logic>                                 |<Value>          |
|When the trial is check out by my userid|Checked out by me|

And the milestones will be 
|<Logic>                                                                                          |<Value>|
|Last Milestone = Submission Received Date                                                        |Submitted -- Not Accepted|
|Last Milestone = Submission Acceptance Date and no Administrative Processing Start Date milestone|Ready for Admin Processing|
|Last Milestone = Administrative QC Start Date                                                    |Ready for Admin QC|
|Last Milestone = Submission Acceptance Date and no Scientific Processing Start Date milestone    |Ready for Scientific Processing|
|Last Milestone = Scientific QC Start Date                                                        |Ready for Scientific QC|
|Last Milestone = Scientific QC Start Date                                                        |Ready for Scientific QC|
|Last Milestone = Ready for TSR Date                                                              |Ready for TSR Submission|

And the On Hold Status will 
|<Logic>                                                              |<Value>   
|when the trial has an "on hold date" and no "No Longer on hold" date"|On Hold since "on hold date" ; Reasons: "on hold reason" |

Examples:

|Checked out by me; Ready for Admin QC; Ready for Scientific Processing; On Hold since 3/3/2016; Reason:  Other|
|Ready for Admin QC; Ready for Scientific Processing; On Hold since 1/1/2015; Reason: Pending CTRP Review|
|Checked out by me; Ready for Scientific QC|
|Submitted -- Not Accepted|


