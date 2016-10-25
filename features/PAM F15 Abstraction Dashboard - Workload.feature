@PA  @global
Feature: PAM F15 Abstraction Dashboard - Workload

As a CTRP PA SuperUser, I can view and edit the CTRP Abstraction Dashboard Workload

Scenario: #1 I can view Workload 
 Given I am logged into the CTRP Protocol Abstraction application
 And I am on the CTRP Abstraction Dashboard Workload screen
 Then all trials that have one of the following latest milestones for the last active submission will be displayed 
|Submission Received Date|
|Validation Processing Start Date|
|Validation Processing Completed Date|
|Submission Acceptance Date|
|Submission Reactivated Date|
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
And will display the following fields
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 1) , Amendment (Information Source = Protocol and Submission number > 1), Imported (Information Source = Imported)|  
|Submitted On (Date of current "Submission Received Date" milestone) |
|Expected Abstraction Completion Date (Defaulted to date of current "Submission Received Date" milestone date Plus 10 Business Days and is editible) |
|Accepted (Date of current "Submission Acceptance Date" milestone)|
|Current On-Hold Date (Date of current "On Hold" date with no "Off Hold" date)|
|Admin Abstraction Completed (Date of current "Administrative Processing Completed Date" milestone)|
|Admin QC Completed (Date of current "Administrative QC Completion Date" milestone)|
|Scientific Abstraction Completed (Date of current "Scientific Processing Completed Date" milestone)|
|Scientific QC Completed (Date of current "Scientific QC Completion Date" milestone)|
|Checked Out By (Userid and check out i.e. smithj AD/SC or smithj AD, doej SC)|
|Ready for TSR (Date of current "Ready for TSR Date Date" milestone)|
|Business Days Since Submitted (Days since date of current "Submission Received Date" milestone date|
And the default sort order is by Submitted On Date ordered from oldest to Newest
And the following columns can be sorted
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 1) , Amendment (Information Source = Protocol and Submission number > 1), Imported (Information Source = Imported)|  
|Submitted On|
|Expected Abstraction Completion Date (Defaulted to "Submission Received Date" Plus 10 Business Days and is editible) |
|Accepted|
|Current On-Hold Date|
|Admin Abstraction Completed|
|Admin QC Completed|
|Scientific Abstraction Completed|
|Scientific QC Completed|
|Checked Out By (Userid and check out i.e. smithj AD/SC)|
|Ready for TSR|
|Business Days Since Submitted|
And the following columns can be filtered
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 1) , Amendment (Information Source = Protocol and Submission number > 1), Imported (Information Source = Imported)|  
|Submitted On|
|Expected Abstraction Completion Date (Defaulted to "Submission Received Date" Plus 10 Business Days and is editible) |
|Accepted|
|Current On-Hold Date|
|Admin Abstraction Completed|
|Admin QC Completed|
|Scientific Abstraction Completed|
|Scientific QC Completed|
|Checked Out By (Userid and check out i.e. smithj AD/SC)|
|Ready for TSR|
|Business Days Since Submitted|


Scenario: #2 I can search the Workload 
 Given I am logged into the CTRP Protocol Abstraction application
 And I am on the CTRP Abstraction Dashboard Workload screen
 And all trials for the last active submission will be displayed (scenario 1) 
 Then I can narrow the list of trials by entering a partical 
 |NCI Trial Identifier|
 And I can narrow the list of trials by selecting one or more Submission Types 
 |Original|
 |Amendment|
 |Imported |
 And I can narrow the list of trials by selecting the "Any Date" (Default), "Date", "No Date" button for any of the following date fields
 |Submitted On|
 |Expected Abstraction Completion Date|
 |Accepted|
 |Current On-Hold Date|
 |Admin Abstraction Completed|
 |Admin QC Completed|
 |Scientific Abstraction Completed|
 |Scientific QC Completed|


Scenario: #3 I can edit Expected Abstraction Completion Date
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Workload screen
And I select a trial "Expected Abstraction Completion Date"
Then I can edit the "Expected Abstraction Completion Date"
And the Expected Abstraction Completion Date will be associated with the trial

Scenario: #4 I can enter an Expected Abstraction Completion Date Comment
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Workload screen
And I select a trial "Expected Abstraction Completion Date"
Then I can edit the "Expected Abstraction Completion Date"
And I can enter an Expected Abstraction Completion Date "Comment"
And the Expected Abstraction Completion Date Comment will be associated with the trial  

Scenario: #5 I can edit an Expected Abstraction Completion Date Comment
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Workload screen
And I select a trial "Expected Abstraction Completion Date"
Then I can edit the "Expected Abstraction Completion Date"
And I can edit the Expected Abstraction Completion Date "Comment"
And the Expected Abstraction Completion Date Comment will be associated with the trial


Scenario: #6 I can export Abstraction Dashboard WorkLoad into an Excel spreadsheet
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard WorkLoad
When I select the export to Excel option
Then the trials in the Abstraction Dashboard WorkLoad will be exported to an Excel format spreadsheet 
And will includ the following fields:
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 1) , Amendment (Information Source = Protocol and Submission number > 1), Imported (Information Source = Imported)|  
|Submitted On|
|Expected Abstraction Completion Date (Defaulted to "Submission Received Date" Plus 10 Business Days and is editible) |
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

Scenario: #7 Logic for This Trial is Field
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

And the "Check Out Status" will be 
|<Logic>                                 |<Value>          |
|When the trial is check out by my userid|Checked out by me|

And the "Milestones" will be 
|<Logic>                                                                                          |<Value>|
|Last Milestone = Submission Received Date                                                        |Submitted -- Not Accepted|
|Last Milestone = Submission Acceptance Date and no Administrative Processing Start Date milestone|Ready for Admin Processing|
|Last Milestone = Administrative QC Start Date                                                    |Ready for Admin QC|
|Last Milestone = Submission Acceptance Date and no Scientific Processing Start Date milestone    |Ready for Scientific Processing|
|Last Milestone = Scientific QC Start Date                                                        |Ready for Scientific QC|
|Last Milestone = Scientific QC Start Date                                                        |Ready for Scientific QC|
|Last Milestone = Ready for TSR Date                                                              |Ready for TSR Submission|

And the "On Hold Date" and "On Hold Reason" will be 
|<Logic>                                                              |<Value>   
|when the trial has an "on hold date" and no "No Longer on hold" date"|On Hold since "on hold date" ; Reasons: "on hold reason" |

|Examples:|
|Checked out by me; Ready for Admin QC; Ready for Scientific Processing; On Hold since 3/3/2016; Reason:  Other|
|Ready for Admin QC; Ready for Scientific Processing; On Hold since 1/1/2015; Reason: Pending CTRP Review|
|Checked out by me; Ready for Scientific QC|
|Submitted -- Not Accepted|
