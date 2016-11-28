@Acc @global

Feature: Acc F04 Accrual Count Reports
As a CTRP Accrual Submitter, I can download Accrual Count Reports in the CTRP Accrual Application 

  Scenario: #1 I can Download Accrual Count Reports
    Given I am on the CTRP Accrual Application
     When I click on the Accrual Counts on the toolbar
     Then the Accrual Count page displays trials to which I have access with "Accrual Count type"
    
     
     
      |NCI Trial Identifier  |
      |Lead Org Trial Identifier  |
      |ClinicaTrials.gov ID  |
      |Lead Organization  |
      |Participating Site|
      |Participating Site Accrual Count|
      |Trial Accrual Count  |
      |Last Accrual Update Submitted  |
      |Information Source|
      
      And Trials are sorted by NCI Id with newest Trials first
     And the accrual report trial list will be paganiated  
     And I can filter Accrual Count types by using the filter capabilities on the right end of the column headings
     And I can sort column data by clicking on the arrow displayed on every cloumn heading
     And I can click "CSV" at the botton of the list to download the Accrual Count report as a comma-separated-value text file
     And I can click "Excel" to download the Accrual Count report as an Excel spreadsheet
	 
     
     
 Scenario:#2 Participating Site Accrual Count rules 
    Given I am on the Accrual Counts Screen
     When The user is not a Trial Owner
     And the user’s organization is a participating site on a trial
     And there are accrual counts for the users participating site
     Then the Participating Site Accrual Count will be displayed
     And the Trial Accrual Count will be blank


Scenario:#3 Total Accrual Count rules 
    Given I am on the Accrual Counts Screen
     When The user is a Trial Owner
     Then the Participating Site Accrual Count will be displayed for all participating sites with accruals for all trials that the user is an owner
    And the Trial Accrual Count will display for the sum of all accrual counts for the trial



