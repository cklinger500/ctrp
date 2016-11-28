@Global @PA
Feature: PA F09 View Trial Summary Report

As a CTRP User, I can view a trial Trial Summary Report (TSR)

Scenario: #1 I can view a Trial Summary Report (TSR)
Given I am in the CTRP application
And I have selected a trial in CTRP 
And I have selected the View TSR option
And the Trial Summary Report (TSR) screen is display
Then I can select View TSR and the TSR document will downloaded with the data for the last active submission for the trial
And the file name will be "TSR_""CTRP Trial ID""_""Current Date YYYY-MM-DD""-"Current Time HHMM(24hr)""_""Current Submission Type (O for original and A for amendment""_""Amendment Number (for amendments)"<examples>

|Examples:|
|TSR_NCI-2014-00171_2016-05-03-1230_O.rtf| 
|TSR_NCI-2014-00171_2015-05-11-1812_A12.rtf| 
|TSR_NCI-2016-01111_2016-05-02-0230_Amendment#4b.rtf| 