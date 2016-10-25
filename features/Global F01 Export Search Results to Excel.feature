@Global(Grids_to_Export_Excel.xlsx) 
Feature: Global F01 Export Search Results to Excel

As a CTRP User, I can export search results to Excel

Scenario: #1 I can export any search results into an Excel spreadsheet
Given I have executed a search in CTRP
And the results are displayed in a table
When I select the export to Excel option
Then the contents of the search result will be export to an Excel format spreadsheet
And I will be able to open and save the spreadsheet

