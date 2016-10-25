@PA @global
Feature: PAM F25 Results Reporting Dashboard -Details

As a CTRP PA Abstractor, I can view and edit the CTRP Results Reporting Dashboard

Scenario: #1 I can view the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
Then the side bar menu will be displayed for the selected trial
And the Trial Overview section will be displayed for the selected trial
And the Trial Results section will be displayed for the selected trial including the following elements:
|<Comments>|
|Results Comments|
|Trial Specific Comments|
|NCI Specific Information Comments|

|<Results Designee(s) Assigned>|
|Last Name|
|First Name|
|Family|
|Organization|
|PRS User Name|
|E-mail|
|Phone|
|Phone Extension|
|PRS Access Revoked|

|<PIO Contact(s) Assigned>|
|Last Name|
|First Name|
|Organization|
|PRS User Name|
|E-mail|
|Phone|
|Phone Extension|

|<Results Processing Documents>|
|File Name|
|Document Type|
|Date Added|
|Added By|
|CTRP Review Complete (CTRP Review Complete Date, CTRP Review Complete User)|
|CTRP Approval (CTRP Approval Date, CTRP Approval User)|
|CCCT Review Complete (CCCT Review Complete Date, CCCT Review Complete User)|

|<Record Changes>|
|Change Type|
|Action Taken|
|Change|
|Completion Date|
|Complete By|

|<Summary of XML Errors and Action Taken>| 
|Initial Error Date|
|Last  Error Date|
|NCI Trial ID|
|NCT Trial ID|
|Error Message|
|Reoccurring Error|
|Comments|
|Error Type|
|CMS Ticket ID|
|Acton Taken|
|Resolution Date|
|User|
|Date|

|<Final Record Clean Up and Release>|
|Change Type|
|Action Taken|
|Completion Date|
|Complete By|

Scenario: #2 I can enter Results Comments in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
Then I can enter Result Comments

Scenario: #3 I can edit Results Comments in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
Then I can edit Result Comments 

Scenario: #4 I can add a Results Designee in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I select Add in the Results Designee section
Then a list of all designees associated with the Family for the Lead Organization for the trial will be displayed
And a Designee Look up will be displayed
And I can select one or more designees from the displayed list
And I select Save
And the selected designees will be associated with the trial

Scenario: #5 I can add a Results Designee via look up in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
When I select Add in the Results Designee section
Then a list of all designees associated with the Family for the Lead Organization for the trial will be displayed
And a Designee Look up will be displayed
When I can select Designee Look Up to search for a designee 
Then I can select a Contact Type
|Designee|
|PIO Contact
And I can select a family
And I can select an organization using the organization look up
And I can enter a last name
And I can enter a first name
And I can enter a PRS Username
And I can enter a e-mail address
And I can enter a phone number
When I select Search
Then the designee list will display on those designees that meet the selected criteria
And I can select one or more designees from the displayed list
And I select Save
And the selected designees will be associated with the trial

Scenario: #6 I can delete a Results Designee in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
When I am in the Results Designee section
And I select a Results Designee section
And I select Delete
Then the Results Designee will be deleted from the trial

Scenario: #7 I add a PIO Contact in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I select Add in the PIO Contact section
Then a list of all Results Designee with the contact type = "PIO Contact" will be displayed
And I can select one or more Results Designees from the displayed list
And I select Save
And the selected Results Designee will be associated with the trial in the PIO Contact section

Scenario: #8 I can delete a PIO Contact in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
When I am in the PIO Contact section
And I select a PIO Contact
And I select Delete
Then the Results Designee will be deleted from the trial

Scenario: #9 I can add Results Processing Documents in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
When I select Add a document
Then a pop up window appear where select the document type from 
|Before Comparison|
|After Comparison|
|Comparison|
|Results Coversheet|
And I can browse for a file
When can select save
Then the file will be saved to the trial
And the Document Type will be associated with the document record
And my name will be associated with the document record
And the current date will be associated with the document record

Scenario: #10 I can edit Results Processing Documents in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And a list of document are displayed ordered by Date Added with the newest document first
When I select  Edit a document
Then a pop up window appear where select the document type from 
|Before Comparison|
|After Comparison|
|Comparison|
|Results Coversheet|
And I can browse for a file
When can I select save
Then the file will be saved to the trial
And the Document Type will be associated with the document record
And my name will be associated with the document record
And the current date will be associated with the document record
And the previous document will be marked as deleted

Scenario: #11 I can edit CTRP Results Review in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And the document type is Comparison
Then I can select Add in the CTRP Review Complete column
And a pop up window will appear with a list of CTRO users
And I can select a CTRO User
When I select save
Then the CTRO User name and the current date will be associated with the document record

Scenario: #12 I can edit CTRP Results Approval in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And the document type is Comparison 
Then I can select Add in the CTRP Approval column
And a pop up window will appear with a list of CTRO users
And I can select a CTRO User
When I select save
Then the CTRO User name and the current date will be associated with the document record

Scenario: #13 I can edit CCCT Results Review in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And the document type is Comparison 
Then I can select Add in the CCCT Review Complete column
And a pop up window will appear
And I can enter a name
When I select save
Then the CCCT User name and the current date will be associated with the document record

Scenario: #14 I can delete a Results Processing Document in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
When I select a document
And I select delete
Then then a pop up will appear to enter a comment
And the document will be marked as deleted from the trial

Scenario: #15 I can view deleted documents in Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I have selected Show deleted Documents 
Then a list of the deleted documents will be displayed in including the following
|<Deleted Results Processing Documents>|
|File Name|
|Document Type|
|Date Added|
|Added By|
|CTRP Review Complete (CTRP Review Complete Date, CTRP Review Complete User)|
|CTRP Approval (CTRP Approval Date, CTRP Approval User)|
|CCCT Review Complete (CCCT Review Complete Date, CCCT Review Complete User)|
|Document Deleted Comment|
|Deleted by|
|Deleted date|


Scenario: #16 I can add a Record Change in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I select Add in the Record Change section 
Then I can select a change type from the list of:
|Data Discrepancies|
|Major Changes|
|Minor Changes|
And I can enter a Change
And I can enter an Action Taken
And select Save 
And the Change Type will be associated with the trial record
And the Change will be associated with the trial record
And the Action Taken will be associated with the trial record
And my name will be associated with the Trial record
And the current date will be associated with the trial record

Scenario: #17 I can add more then one Record Change in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I select Add in the Record Change section 
Then I can select a change type from the list of:
|Data Discrepancies|
|Major Changes|
|Minor Changes|
And I can enter a Change
And I can enter an Action Taken
And select Save 
And the Change Type will be associated with the trial record
And the Change will be associated with the trial record
And the Action Taken will be associated with the trial record
And my name will be associated with the Trial record
And the current date will be associated with the trial record

Scenario: #18 I can edit a Record Change in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I select a record in the Record Change section 
Then I can select a different Change Type
And I can edit the change
And I can edit the Action Taken
And select Save 
And the Change Type will be associated with the trial record
And the Change will be associated with the trial record
And the Action Taken will be associated with the trial record
And my name will be associated with the Trial record
And the current date will be associated with the trial record

Scenario: #19 I can delete a Record Change in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I select a record in the Record Change section 
And I select Delete
Then the selected Record will be deleted from the trial 

Scenario: #20 I can edit the XML Error and Action Taken Log in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I have selected an error on the XML Error and Action Taken Log
When the pop up window will appears
Then I can edit 
|Comments|
|Error Type|
|CMS Ticket ID|
|Acton Taken|
|Resolution Date|
And Select Save
And the information will be save to the trial
And my name will be associated with the Trial record
And the current date will be associated with the trial record

Scenario: #21 I can edit the Final Record Clean Up and Release information in the Results Reporting Dashboard -Details
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on on the CTRP Results Reporting Dashboard
And I have select Yes/No for each of the following actions
|<Action Taken>|
|Certain Agreements Action|
|Completion Date entered in PRS |
|Designee Access Revoked? |
|All Changes made Action|
|Confirm �Send to CT.Gov� |
And Select Save
And the information will be saved to the trial
And my name will be associated with the Trial record

Scenario: #22 Record Change Help
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I select Add in the Record Change section 
And I select Record Help
Then a pop up window will be displayed with he following message:
|Change Type|Description|Action/State|
|Data Discrepancies|Status, Status Dates, Accrual|Status matches, dates match, final enrollment entered into PA, etc|
|Major Changes|Changes in the intent of the protocol  e.g., changes in eligibility criteria,  addition of a new intervention and/or treatment arm, etc|Not addressed, sent to CTEP or DCP PIO, waiting for comment, made change in draft clinicaltrials.gov record, etc| 
|Minor Changes|Formatting changes and or clarifications that do not change meaning or intent, e.g., spelling an acronym, inserting punctuation, changing formatting, etc|Not addressed, sent to CTEP or DCP PIO, waiting for comment, made change in draft clinicaltrials.gov record, etc| 

Scenario: #23 Send Coversheet Email
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial on the CTRP Results Reporting Dashboard
And I select the "Email Coversheet" 
Then an email entitled "Trial Results Comparison" will be sent to the CCCT (Email list in the shared drive under Functional/PA: CTRP System Generated PA Emails)
