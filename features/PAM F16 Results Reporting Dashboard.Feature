@PA @global
Feature: PAM F16 Results Reporting Dashboard

As a CTRP PA Abstractor, I can view and edit the CTRP Results Reporting Dashboard

Scenario: #1 I can view the Results Reporting Dashboard
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
Then all trials with a last active submission will be displayed for the following criteria 
|<Element>|<Value>|
|Sponsor |"National Cancer Institute"|
|Primary Completion Date |Greater Than 26-Dec-2007|
|Clinical Research Category |Interventional|
|Lead Organization |Not "NCI - Center for Cancer Research"|
|Current Milestone |Not "Rejected", Not "Submission Terminated"|
 
And will display the following fields
|NCI ID|
|NCT ID|
|CTEP ID|
|DCP ID|
|Lead Org ID|
|Lead Organization|
|section_801_indicator (Display Yes or No)|
|Results Designee (all)|
|PCD|
|PCD Type ("Act" for actual, "Ant" for anticipated)|
|Last Designee Contact Date|
|Last Designee Response Date|
|Designee Notified|
|Reporting in Process|
|3 Month Reminder|
|5 Month Reminder|
|7 Month Escalation|
|Results Sent to PIO|
|CTRO Trial Comparison Review (CTRO Trial Comparison Review Date and CTRO Trial Comparison Review User)|
|CTRO Trial Comparison Approval (CTRO Trial Comparison Approval Date and CTRO Trial Comparison Approval User)| 
|CCCT Trial Comparison Review (CCCT Trial Comparison Review Date and CCCT Trial Comparison Review User)|
|PRS Release Date|
|QA Comments Released Date|
|Trial Results Published Date|

And the default sort order is by NCI ID ordered from oldest to Newest
And the following columns can be sorted
|NCI ID|
|NCT ID|
|CTEP ID|
|DCP ID|
|Lead Org ID|
|Lead Organization|
|section_801_indicator (Display Yes or No)|
|Results Designee (all)|
|PCD|
|PCD Type ("Act" for actual, "Ant" for anticipated)|
|Last Designee Contact Date|
|Last Designee Response Date|
|Designee Notified|
|Reporting in Process|
|3 Month Reminder|
|5 Month Reminder|
|7 Month Escalation|
|Results Sent to PIO|
|CTRO Trial Comparison Review (CTRO Trial Comparison Review Date and CTRO Trial Comparison Review User)|
|CTRO Trial Comparison Approval (CTRO Trial Comparison Approval Date and CTRO Trial Comparison Approval User)| 
|CCCT Trial Comparison Review (CCCT Trial Comparison Review Date and CCCT Trial Comparison Review User|
|PRS Release Date|
|QA Comments Released Date|
|Trial Results Published Date|

And the following columns can be filtered
|NCI ID|
|NCT ID|
|CTEP ID|
|DCP ID|
|Lead Org ID|
|Lead Organization|
|section_801_indicator (Display Yes or No)|
|Results Designee (all)|
|PCD|
|PCD Type ("Act" for actual, "Ant" for anticipated)|
|Last Designee Contact Date|
|Last Designee Response Date|
|Designee Notified|
|Reporting in Process|
|3 Month Reminder|
|5 Month Reminder|
|7 Month Escalation|
|Results Sent to PIO|
|CTRO Trial Comparison Review (CTRO Trial Comparison Review Date and CTRO Trial Comparison Review User)|
|CTRO Trial Comparison Approval (CTRO Trial Comparison Approval Date and CTRO Trial Comparison Approval User)| 
|CCCT Trial Comparison Review (CCCT Trial Comparison Review Date and CCCT Trial Comparison Review User|
|PRS Release Date|
|QA Comments Released Date|
|Trial Results Published Date|

Scenario: #2 I can enter dates in the Results Reporting Dashboard
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
Then all trials with a last active submission will be displayed for the following criteria 
|<Element>|<Value>|
|Sponsor |"National Cancer Institute"|
|Primary Completion Date |Greater Than 26-Dec-2007|
|Clinical Research Category |Interventional|
|Lead Organization |Not "NCI - Center for Cancer Research"|
|Current Milestone |Not "Rejected", Not "Submission Terminated"|
And I can enter enter a date in the following fields
|Last Designee Contact Date|
|Last Designee Response Date|
|Designee Notified|
|Reporting in Process|
|3 Month Reminder|
|5 Month Reminder|
|7 Month Escalation|
|Results Sent to PIO|
|PRS Release Date|
|QA Comments Released Date|
|Trial Results Published Date|
And the date will be associated with the trial

Scenario: #3 I can edit dates in the Results Reporting Dashboard
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
Then all trials with a last active submission will be displayed for the following criteria 
|<Element>|<Value>|
|Sponsor |"National Cancer Institute"|
|Primary Completion Date |Greater Than 26-Dec-2007|
|Clinical Research Category |Interventional|
|Lead Organization |Not "NCI - Center for Cancer Research"|
|Current Milestone |Not "Rejected", Not "Submission Terminated"|
And I can edit a date in the following fields
|Last Designee Contact Date|
|Last Designee Response Date|
|Designee Notified|
|Reporting in Process|
|3 Month Reminder|
|5 Month Reminder|
|7 Month Escalation|
|Results Sent to PIO|
|PRS Release Date|
|QA Comments Released Date|
|Trial Results Published Date|
And the date will be associated with the trial

Scenario: #4 I can view trail details
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select a trial NCT ID
Then the trail validation sidebar menu will appear
And the trial Results Details screen will be displayed (see PAM F25 Results Reporting Details) 

Scenario: #5 I can open the ClinicalTrails.gov record for the Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select a trial NCT ID
Then an new browser window is opened displaying the trail record in ClinicalTrials.gov
|https://clinicaltrials.gov/ct2/show/NCT01783171 where NCT01783171 is the NCT ID|

Scenario: #6 I can export the Results Reporting Dashboard into an Excel spreadsheet
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
When I select the export to Excel option
Then the trials in the Results Reporting Dashboard will be exported to an Excel format spreadsheet 
And will include the following fields:
|NCI ID|
|NCT ID|
|CTEP ID|
|DCP ID|
|Lead Org ID|
|Lead Organization|
|Family (for Lead Organization)|
|Primary Investigator (Last Name, First Name)|
|section_801_indicator (Display Yes or No)|
|Results Designee (all: comma delimited)|
|Results Designee e-mail  (all: comma delimited)|
|Results Designee Phone Number  (all: comma delimited) (Results Designee Phone number and Results Designee Phone extension)|
|Results Processing Comments|
|Phase|
|PCD|
|PCD Type ("Act" for actual, "Ant" for anticipated)|
|Last Designee Contact Date|
|Last Designee Response Date|
|Designee Notified|
|Reporting in Process|
|3 Month Reminder|
|5 Month Reminder|
|7 Month Escalation|
|Results Sent to PIO|
|CTRO Trial Comparison Review (CTRO Trial Comparison Review Date and CTRO Trial Comparison Review User)|
|CTRO Trial Comparison Approval (CTRO Trial Comparison Approval Date and CTRO Trial Comparison Approval User)| 
|CCCT Trial Comparison Review (CCCT Trial Comparison Review Date and CCCT Trial Comparison Review User|
|PRS Release Date|
|QA Comments Released Date|
|Trial Results Published Date|
|Results Comments|
|Trial Specific Comments|
|NCI Specific Information Comments|


Scenario: #7 Latest CTRO Trial Comparison Review
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
Then the CTRO Trial Comparison Review will display the latest CTRO Trial Comparison Review Date and CTRO Trial Comparison Review User
And the CTRO Trial Comparison Approval will display the latest CTRO Trial Comparison Approval that is on or after the latest CTRO Trial Comparison Review Date 
And the CCCT Trial Comparison Review will display the latest CCCT Trial Comparison Review that is on or after the latest CTRO Trial Comparison Approval Date

Scenario: #8 I can Search for trials to be displayed in the Results Reporting Dashboard
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And all trials with a last active submission will be displayed for the following criteria 
|<Element>|<Value>|
|Sponsor |"National Cancer Institute"|
|Primary Completion Date |Greater Than 26-Dec-2007|
|Clinical Research Category |Interventional|
|Lead Organization |Not "NCI - Center for Cancer Research"|
|Current Milestone |Not "Rejected", Not "Submission Terminated"|
And I can enter an NCI ID
And I can select the Section 801 indicator
|Any|
|Yes|
|No|
And I can select if the trial has Results
|Any |
|Yes|
|No|
And I can enter a PCD Date date range
|From Date|
|To Date|
And I can select a PCD type for the to date
|Any|
|Actual|
|Anticipated |
When I select Search
Then the trial list will display on those trials that meet the selected criteria

Scenario: #9 Paging
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And select search
Then the search results will display a list of the trials 
And the trial list will be paginated 

Scenario: #10 I can add a Results Designee
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
And I select Add/Update Results Designee Or PIO Contact
Then the Add/Update Results Designee Or PIO Contact Screen will be displayed (see PAM F26 Results Designee Details) 

Scenario: #11 I can view the XML Upload Error and Actions Taken Log
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Results Reporting Dashboard screen
When I select XML Upload Error and Actions Taken
Then I can select 
|All Errors (to display all records in the XML Error and Actions Taken Log)|
|Errors by Date Range (to select a date range using Initial Error Date(start date to end date and all errors without a resolution date) |
And the XML Upload Error and Actions Taken Log Screen will be displayed (see PAM F27 XML Upload Error and Actions Taken Log)
