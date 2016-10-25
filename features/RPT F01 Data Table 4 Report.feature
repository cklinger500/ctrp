@Report @global
Feature: RPT F01 Data Table 4 Report

As a NCI staff member, I can generate Data Table 4 Reports for each NCI-designated Cancer Center

  Scenario: NCI Staff member selects a Cancer Center for a Data Table 4 Report
    Given I have access to the CTRP Reporting Utility
     When I select "Data Table 4 Report" report option
     Then the "Input Controls" screen opens
      And I must select a Cancer Center Family from a list 
      And I can enter a report starting date "MM/DD/YYYY" or "leave empty to see 12 month report"
      And I must enter report ending date "MM/DD/YYYY"
      And I must enter a Fiscal Year "YYYY"
      When I click on the "Apply" button
     Then a Data Table 4 report for the Cancer Center Family and the Reporting Period selected will be displayed
     And Data Table 4 report headings will display the elements type at the top of the report page
     
      |Title: Data Table 4 Report  |
      |Cancer Center: Name of Cancer Center selected for the report  |
      |Date Range: [Report Start Date] to [Report End Date]  |
      |Report Date: Date report was created  |
      
     And the CTRP Data Table 4 Report will display one row of each trial where the selected Cancer Center is accruing subjects during the selected reporting periods, including report start date and report end date
     And CTRP Data Table 4 Report will contain the columns 
     
      |FY|
      |GrantNumber|
      |ReportingStartDate|
      |ReportingEndDate|
      |ClinicalResearchCat|
      |StudySource|
      |FundingSource|
      |PrimarySite|
      |NCTNumber|
      |ProtocolID|
      |MultiInst?|
      |LastName|
      |FirstName|
      |MiddleName|
      |ProgCode|
      |OpenDate|
      |CloseDate|
      |Phase|
      |PrimaryPurpose|
      |OfficialTitle|
      |EntireStudy|
      |YourCenterTotal|
      |Center12Mos|
      |CenterToDate|
      |Other12Mos|
      |OtherToDate|
      |Comments| 
      
      And I will be able to export the report to Excel or PDF 
      
      
       Scenario: #2 Data Table 4 Report pagination 
      Given I have access to the CTRP Reporting Utility
     When Data Table 4 report for the Cancer Center Family and the Reporting Period selected will be displayed
     Then the search results will display a list of the trials where the selected Cancer Center is accruing subjects during the selected reporting periods
     And the Trial list will be paganiated 
     
       Scenario:#3 Reset Button Functionality
       
    Given Given I have access to the CTRP Reporting Utility
     When I select "Data Table 4 Report" report option
     Then the "Input Controls" screen opens
      And I must select a Cancer Center Family from a list 
      And I can enter a report starting date "MM/DD/YYYY" or "leave empty to see 12 month report"
      And I must enter report ending date "MM/DD/YYYY"
      And I must enter a Fiscal Year "YYYY"
     When I click on the "Reset" button 
     Then the entered data will be updated with the available original data
     When I click on the "Cancel" button
     Then the report list wil be displayed


