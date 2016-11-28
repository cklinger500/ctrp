@PA @global
Feature: PA F01 Search Clinical Trials

As any CTRP PA User, I can search CTRP clinical trials by various criteria and trial ownership
  @runthis
  Scenario: #1 I can search for clinical trials registered in CTRP
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more of the values to search all trials
          |Official Title|
          |Organization Type|
          |Organization|
          |Trial Identifier Type|
          |Trial Identifier|
          |Principle Investigator|
          |Primary Purpose|
          |Trial Phase|
          |Pilot|
          |Trial Status (Current)|
          |Processing Status|
          |Milestone (latest active submission)|
          |On Hold Status|
          |Trials I Have Checked Out|
          |Submission Type|
          |Study Source|
          |Clinical Research Category|
          |Submission Method|
          |NIH/NCI Division/Department Identifier|
          |NIH/NCI Program Identifier|
          |Infofmation Source (Trials.internal_source_id Internal_Sources.name (Protocol, Imported))|
      And the trial is not a Draft     
      Then CTRP will then display the results for all the Clinical Trials Search Results
          |NCI Trial Identifier|
          |Official Title|
          |Trial Status (current)|
          |Lead Organization|
          |Lead Organization Trial Identifier| 
          |Principle Investigator|
          |ClinicalTrials.gov Identifier|
          |Other Identifiers (Other ID Source and Other ID i.e.DCP:  12345, CTEP:  12345)|  
          |Available Action|
          |Processing Priority|
          |Sponsor|
          |Participating Sites|
          |NIH/NCI Division/Department Identifier|
          |NIH/NCI Program Identifier|
          |Milestone (latest active milestone) and Milestone Date (latest active milestone date)|
          |Admin Milestone (latest active milestone) and Admin Milestone Date (latest active milestone date)(Milestone Type = Administrative)|
          |Scientific Milestone (latest active milestone) and Scientific Milestone Date (latest active milestone Date) (Milestone Type = Scientific)|
          |Processing Status|
          |Processing Status Date|
          |Record Verification Date|
          |On Hold Reasons|
          |On Hold Date - (if more than 1 on hold reason, first on hold active is displayed)|
          |Submission Type|
          |Submission Method|
          |Information Source| 
          |Checked Out for Admin Use by|
          |Checked out for Scientific Use by|
          |Super User Action|
          |View TSR |
      And will be sorted by NCI ID ordered with the most recent ID first
      And I can sort the results table by the following fields
          |NCI Trial Identifier|
          |Trial Status (current)|
          |Lead Organization|
          |Lead Organization Identifier|
          |Principle Investigator|
          |ClinicalTrials.gov Identifier|
          |Processing Priority|
          |Sponsor|
          |NIH/NCI Division/Department Identifier|
          |NIH/NCI Program Identifier|
          |Milestone (latest active milestone) and Milestone Date (latest active milestone date)|
          |Admin Milestone (latest active milestone) and Admin Milestone Date (latest active milestone date)(Milestone Type = Administrative)|
          |Scientific Milestone (latest active milestone) and Scientific Milestone Date (latest active milestone Date) (Milestone Type = Scientific)|
          |Processing Status (current)|
          |Processing Status Date (current)|
          |Record Verification Date|
          |On Hold Reasons|
          |On Hold Date - (if more than 1 on hold reason, first on hold active is displayed)|
          |Submission Type|
          |Submission Method|
          |Information Source| 
          |Checked Out for Admin Use by|
          |Checked out for Scientific Use by|
      And I can filter the results table by the following fields
          |NCI Trial Identifier|
          |Trial Status (current)|
          |Lead Organization|
          |Lead Organization Identifier|
          |Principle Investigator|
          |ClinicalTrials.gov Identifier|
          |Processing Priority|
          |Sponsor|
          |NIH/NCI Division/Department Identifier|
          |NIH/NCI Program Identifier|
          |Milestone (latest active milestone) and Milestone Date (latest active milestone date)|
          |Admin Milestone (latest active milestone) and Admin Milestone Date (latest active milestone date)(Milestone Type = Administrative)|
          |Scientific Milestone (latest active milestone) and Scientific Milestone Date (latest active milestone Date) (Milestone Type = Scientific)|
          |Processing Status|
          |Processing Status Date|
          |Record Verification Date|
          |On Hold Reasons|
          |On Hold Date - (if more than 1 on hold reason, first on hold active is displayed)|
          |Submission Type|
          |Submission Method|
          |Information Source| 
          |Checked Out for Admin Use by|
          |Checked out for Scientific Use by|


  Scenario: #2 I can search for clinical trials by Official Title
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I enter text in the official title selection
      And the official title should not be more than 600 characters
      And select a search option
      Then the search results will display all trials that contain the official title search text
      
  Scenario: #3 I can search for clinical trials by Organization
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select an Organization
      And select the search option
      Then the search results will display trials that match the Organization selected for the trial from
          |Sponsor|
          |Lead Organization|
          |Participating Site|
          |IRB|

  Scenario: #4 I can search for clinical trials by Identifier Type
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more Identifier Types
          |Lead Org|
	      |CTRP (NCI)|
          |CTEP|
          |DCP|
          |CCR|
          |ClinicalTrials.gov (NCT)|
          |Other|
      And select search
      Then the search results will display trials that contain that Identifier type

  Scenario: #5 I can search for clinical trials by Identifier
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I enter text in the Identifier
      And The entered identifier text should not be more than 30 characters
      And select search
      Then the search results will display trials that contain the identifier

  Scenario: #6 I can search for clinical trials by Principal Investigator
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select a persons from the person name search
      And select search
      Then the search results will display trials where the person selected is the principal investigator

  Scenario: #7 I can search for clinical trials by primary purpose
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more trial primary purposes
          |Treatment|
          |Prevention|
          |Supportive Care|
          |Screening|
          |Diagnostic|
          |Health Services Research|
          |Basic Science|
          |Other|
      And select search
      Then the search results will display trials that match the primary purpose selected

  Scenario: #8 I can search for Phase
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more Phases (0, I, I/II, II, II/III, III, IV, NA)
      And select search
      Then the search results will display trials that have the selected Phase

  Scenario: #9 I can search for pilot clinical trials
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select the Pilot Option from the is to
          |Yes|
          |No| 
      And select search
      Then the search results will display trials that have the Pilot criteria that was selected

  Scenario: #10 I can search trials by Trial Status
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more  current Trial Status'
          |In Review|
          |Approved|
          |Active|
          |Temporarily Closed to Accrual|
          |Temporarily Closed to Accrual and Intervention|
          |Closed to Accrual|
          |Closed to Accrual and Intervention|
          |Complete|
          |Administratively Complete|
          |Withdrawn|
          |Available|
          |No longer available|
          |Temporarily not available|
          |Approved for marketing|
      And select search
      Then the search results will display trials that have the Current Trial Status

  Scenario: #11 I can search trials by Processing Status
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more Processing Status'
		|Submitted|       
		|Amendment Submitted|
        |Accepted|
        |Abstracted|
        |Verification Pending|
        |Abstraction Verified Response|
        |Abstraction Verified Response/No Response|
        |Submission Terminated|
        |Submission Reactivated|
		|Rejected|
		|On-Hold|
      And select search
      Then the search results will display trials that have that Processing Status

  Scenario: #12 I can search trials by Milestone
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more Milestones
          |Submission Received Date|
          |Submission Acceptance Date|
          |Submission Rejection Date|
          |Submission Terminated Date|
          |Submission Reactivated Date| 
          |Validation processing Start Date         |
          |Validation Processing Completed Date     |
          |Administrative Processing Start Date|
          |Administrative Processing Completed Date|
          |Ready for Administrative QC Date|
          |Administrative QC Start Date |
          |Administrative QC Completed Date|
          |Scientific Processing Start Date|
          |Scientific Processing Completed Date|
          |Ready for Scientific QC Date|
          |Scientific QC Start Date|
          |Scientific QC Completed Date|
          |Ready for Trial Summary Report Date|
          |Trial Summary Report Date|
          |Submitter Trial Summary Report Feedback Date|
          |Initial Abstraction Verified Date|
          |On-going|
          |Abstraction Verified Date|
          |Late Rejection Date |
      And select search
      Then the search results will display trials that have that Milestone

    Scenario: #14 I can search trials by Trials I have checked out
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select Trials I have checked out
      And select search
      Then the search results will display trials that have Trials I have checked out

  Scenario: #15 I can search trials by Submission Type
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more Submission Types
        |<Submission Type>|<rule>|
		|Original         |last active submission is the original submission (may or may not have updates that needs to be acknowledged) |
		|Amendment        |last active submission is not the original submission (may or may not have updates that needs to be acknowledged) |
		|Update           |has at least one update that needs to be acknowledged for the last active submission|
      And select search
      Then the search results will display trials that have that latest active Submission Type

  Scenario: #16 I can search trials by Submission Method
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more Submission Methods
          |Batch|
          |Registry|
          |ClinicalTrials.gov|
          |Grid Service|
          |REST Service Other|
      And select search
      Then the search results will display trials that have that Submission Method

  Scenario: #17 I can search for clinical trials by Study Source
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more Study Sources
          |National|
          |Externally Peer-Reviewed|
          |Institutional|
          |Industrial|
          |Other|
      And select a search option
      Then the search results will display trials with matching Study Sources

  Scenario: #18 I can search for clinical trials by Clinical Research Category
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more Clinical Research Categories
          |Interventional|
          |Observational|
          |Expanded Access|
          |Ancillary Correlative|
      And select a search option
      Then the search results will display trials with matching Clinical Research Category

  Scenario: #19 I can search for clinical trials by NIH/NCI Division/Department Identifier
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more NIH/NCI Division/Department Identifiers
          |CTEP|
          |DCP|
          |CCR|
          |NHLBI|
          |DEA|
          |DCCPS|
      And select a search option
      Then the search results will display trials with matching NIH/NCI Division/Department Identifier

  Scenario: #20 I can search for clinical trials by NIH/NCI Program Identifier
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select one or more NIH/NCI Program Identifiers
          |BIQSFP|
          |SPORE |
          |Steering Committee Reviewed|
      And select a search option
      Then the search results will display trials with matching NIH/NCI Program Identifier

  Scenario: #21 I can search for clinical trials by Identifier Type NCI
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I enter select an Identifier Type "NCI"
      And select search
      Then the search results will display trials that contain that Identifier type NCI and Duplicate NCI ID

  Scenario: #22 I can search for clinical trials by Identifier Type ClinicalTrials.Gov (NCT)
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I enter select a Identifier Type "ClinicalTrails.gov (NCT)"
      And select search
      Then the search results will display trials that contain that Identifier type ClinicalTrails.gov (NCT) and Obsolete ClinicalTrails.gov (NCT) ID

 Scenario: #23 I can search trials by Information Source
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      When I select the information source from the list of:
      |Protocol|
      |Imported|
      And select search
      Then the search results will display trials that have the Information Source that was selected

 Scenario: #24 Paging
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      And select search
      Then the search results will display a list of the trials 
      And the trial list will be paganiated  
	
Scenario: #24 Export to Excel
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      And select search
      Then the search results will display a list of the trials 
      And the trial list can be exported to Excel
      And will include the following fields
          |NCI Trial Identifier|
          |Official Title|
          |Trial Status (current)|
          |Lead Organization|
          |Lead Organization Trial Identifier| 
          |Principle Investigator|
          |ClinicalTrials.gov Identifier|
          |Other Identifiers (Other ID Source and Other ID i.e.DCP:  12345, CTEP:  12345)|  
          |Processing Priority|
          |Sponsor|
          |Participating Sites|
          |NIH/NCI Division/Department Identifier|
          |NIH/NCI Program Identifier|
          |Current Trial Status|
          |Milestone (latest active milestone) and Milestone Date (latest active milestone date)|
          |Admin Milestone (latest active milestone) and Admin Milestone Date (latest active milestone date)(Milestone Type = Administrative)|
          |Scientific Milestone (latest active milestone) and Scientific Milestone Date (latest active milestone Date) (Milestone Type = Scientific)|
          |Processing Status (current)|
          |Processing Status Date (current)|
          |Record Verification Date (current)|
          |On Hold Reasons|
          |On Hold Date - (if more than 1 on hold reason, first on hold active is displayed)|
          |Submission Type|
          |Submission Method|
          |Information Source| 
          |Checked Out for Admin Use by|
          |Checked out for Scientific Use by|
       And will be sorted by NCI ID ordered with the most recent ID first

Scenario: #25 No Search Criteria
      Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Search Clinical Trials Screen
      And select search
      Then a error message will be displayed that at least 1 seach paramter must be selected
