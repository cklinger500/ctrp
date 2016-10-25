@Global

Feature: Global F05 Main Menus

Description:  As any CTRP User, I can view the menus for my role

Scenario: #1 View Menu Tabs
Given I am logged into the CTRP application
And I am on the home screen
Then the menus from left to right will be:
|Home|
|Dashboards|
|Organizations and Families|
|Persons|
|Trials|
|Accrual|
|Administrative|
|Back Office|

Scenario: #2 View Home Tab
Given I am logged into the CTRP application
And I am on the home screen
When I select the Home menu item
Then all menus are closed 

Scenario: #3 View Dashboards Tab
Given I am logged into the CTRP application
And I am on the home screen
When I select the Dashboards menu item
Then the Dashboards menu is expanded and includes:
|Abstraction Dashboard|
|Results Reporting Dashboard|
|ClinicalTrials.gov Import Log| 

Scenario: #4 View Organizations and Families Tab
Given I am logged into the CTRP application
And I am on the home screen
When I select the Organizations and Families menu item
Then the Organizations and Families menu is expanded and includes:
|Search Organizations|
|Add Organizations|
|Request a New Organization|
|Search Families|
|Add Families|

Scenario: #5 View Persons and Families Tab
Given I am logged into the CTRP application
And I am on the home screen
When I select the Organizations and Families menu item
Then the Person menu is expanded and includes:
|Search Persons|
|Add Persons|
|Request a Person|

Scenario: #6 View Trials Tab
Given I am logged into the CTRP application
And I am on the home screen
When I select the Trials menu item
Then the Trials menu is expanded and includes:
|Search Trials|
|Register Trial|

Scenario: #7 View Accrual Tab
Given I am logged into the CTRP application
And I am on the home screen
When I select the Accrual menu item
Then the Accrual menu is expanded and includes:
|Pending Accrual Queue|
|Accruals Out-Of-Scope Trials|
|Manage Flagged Trials|
|Manage Accrual Access|


Scenario: #7 View Administrative Tab
Given I am logged into the CTRP application
And I am on the home screen
When I select the Administrative menu item
Then the Administrative menu is expanded and includes:
| Registered User Details|
| User Management| 
| Assign Trial Ownership|
| New Biomarker Requests|
| Manage NCIt Terms|

Scenario: #8 View Back Office Tab
Given I am logged into the CTRP application
And I am on the home screen
When I select the Back Office menu item
Then the Back Office menu is expanded and includes:
|Dropdown Lists|

Scenario: #9 Close Menu
Given I am logged into the CTRP application
And I am on the home screen
When I select the Home menu item that is already expanded
Then the menu will be closed 

Scenario: #10 View Trials Register sub menu
Given I am logged into the CTRP application
And I am on the home screen
And I am on Trials menu item
When I select the Register Trials sub menu
Then the Register Trials menu is expanded and includes:
|National|
|Externally Peer-Reviewed|
|Institutional|
|Industrial/Other|

Scenario: #11 View Abstraction Dashboard Submenu 
Given I am logged into the CTRP application
And I am on the home screen
And I select the Dashboards menu item
When I select the Abstraction item
Then the Dashboard Sub-menu is expanded and includes:
|Workload (for the abstraction dashboard in PAM F15)|
|Search (for the abstraction dashboard search in PAM F22)|
