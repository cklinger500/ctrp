@PA @global
Feature: PAM F27 Results Reporting Dashboard - XML Upload Error and Actions Taken Log

As a CTRP PA Abstractor, I can view and edit the CTRP Results Reporting Dashboard

Scenario: #1 I can view the Results Reporting Dashboard - XML Upload Error and Actions Taken Log - All
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select XML Upload Error and Actions Taken - All
And I select All Errors (to display all records in the XML Error and Actions Taken Log) 
Then a list of all XML Upload Errors and Actions Taken will be displayed 

And will display the following fields
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

And the default sort order is by Initial Error Date from oldest to newest, and then Last Error Date, from oldest to newest
And the following columns can be sorted
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

And the following columns can be filtered
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

Scenario: #2 I can view the Results Reporting Dashboard - XML Upload Error and Actions Taken Log - Open
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select XML Upload Error and Actions Taken - Open
Then a list of all XML Upload Errors and Actions Taken will be displayed that includes the following
|Any error when the Resolution Date is null|

And will display the following fields
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

And the default sort order is by Initial Error Date from oldest to newest, and then Last Error Date, from oldest to newest
And the following columns can be sorted
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

And the following columns can be filtered
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

Scenario: #3 I can view the Results Reporting Dashboard - XML Upload Error and Actions Taken Log - Date Range
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select XML Upload Error and Actions Taken
And I select Errors by Date Range - Date Range (to display all Open records and all records within the specified date range)
Then I can enter a start date for the date range for the Inital Error Date 
And I can enter a end date for the date range for the Inital Error Date
And Select OK
Then a list of all XML Upload Errors and Actions Taken will be displayed that includes the following
|All errors within the specified date range using Initial Error Date|

And will display the following fields
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

And the default sort order is by Initial Error Date from oldest to newest, and then Last Error Date, from oldest to newest
And the following columns can be sorted
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

And the following columns can be filtered
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

Scenario: #4 I can enter updates in the XML Upload Error and Actions Taken Log 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select XML Upload Error and Actions Taken
And a list of all XML Upload Errors and Actions Taken will be displayed 
And  I select a trail
When I can enter Comments
And I can enter an Error Type
And I can enter a CMS Ticket ID
And I can enter Actions Taken
And I can enter a Resolution Date
And I select Save
Then the entered information will be associated with the trial
And my user name will be associated with the trial
And the current date will be associated with the trial

Scenario: #5 I can edit errors in the XML Upload Error and Actions Taken Log 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select XML Upload Error and Actions Taken
And a list of all XML Upload Errors and Actions Taken will be displayed 
And  I select a trail
When I can edit Comments
And I can edit an Error Type
And I can edit a CMS Ticket ID
And I can edit Actions Taken
And I can edit a Resolution Date
And I select Save
Then the entered information will be associated with the trial
And my user name will be associated with the trial
And the current date will be associated with the trial


Scenario: #6 I can export the XML Upload Error and Actions Taken Log into an Excel spreadsheet
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select XML Upload Error and Actions Taken Log
And a list of all XML Upload Error and Actions Taken are displayed
And I select Export to Excel
Then the list of XML Upload Error and Actions Taken will be exported to an Excel format spreadsheet 
And will include the following fields:
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

Scenario: #7 I can view trail details
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select XML Upload Error and Actions Taken Log
And a list of all XML Upload Error and Actions Taken are displayed
And I select a trial NCT ID
Then the trail validation sidebar menu will appear
And the trial Results Details screen will be displayed (see PAM F25 Results Reporting Details) 

Scenario: #8 I can open the ClinicalTrails.gov record for the Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select XML Upload Error and Actions Taken Log
And a list of all XML Upload Error and Actions Taken are displayed
And I select a trial NCT ID
Then an new browser window is opened displaying the trail record in ClinicalTrials.gov
|https://clinicaltrials.gov/ct2/show/NCT01783171 where NCT01783171 is the NCT ID|
