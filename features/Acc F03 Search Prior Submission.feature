@Acc @global

Feature: Acc F03 Prior Accrual Submission Records
As a CTRP Accrual User, I can search Prior Submissions in the CTRP Accrual Application 

    Scenario:#1 Rules for Accessing Trials with Prior Accruals Records in Complete Trials
    Given Given I am logged into the CTRP Accrual Application 
    When I have clicked on the Prior Submissions tab on the toolbar
     Then the User Access <UserAccess> and Affiliated Organization Role <Role> will control displayed accrual records <SubmissionsView>


      |UserAccess                                                                                                                      |Role               |SubmissionView  |
      |Access to Trial for own site                                                                                                    |Participating Site |Submission for own site only  |
      |Access to trail for own site and other sites that are members of the organization family of user's affiliated organization      |Participating Site |Site submissions and accruals submitted by organization family member sites  |
      |Access to trail for own site and other sites that are NOT members of the organization family of user's affiliated organization  |Participating Site |Submissions for own site only  |
      |Access to a given trial                                                                                                         |Lead Organization  |All accrual submissions for the trial by any and all participating sites |
     And I am able to automatically view all trials to which I have been granted access
     
  Scenario:#2 Rules for Accessing Trials with Prior Accruals Records in Abbreviated Trials
    Given Given I am logged into the CTRP Accrual Application 
    When I have clicked on the Prior Submissions tab on the toolbar
     Then the User Access <UserAccess> and Affiliated Organization Role <Role> will control displayed accrual records <SubmissionsView>
   
      |UserAccess                                                                                                                      |Role               |SubmissionView  |
      |Access to Trial for own site                                                                                                    |Participating Site |Submission for that trial only  |
      |Access to trail for own site and other sites that are members of the organization family of user's affiliated organization      |Participating Site |Site submissions and accruals submitted by organization family member sites  |
      |Access to trail for own site and other sites that are NOT members of the organization family of user's affiliated organization  |Participating Site |Submissions for that trial only  |
     
    And I am able to automatically view all trials to which I have been granted access
     
  
 Scenario: #2 I can search Prior Submissions to limit the list of prior submissions that are displayed to a given date or range of dates
    Given I am logged into the CTRP Accrual Application 
    And I can view all prior Submissions results type
    When I enter the first date of the range or the exact date of the submission I am searching for in the "From" field
    And I enter the last date of the range in the "To" field
    And I click on the search button
    Then submissions entered during the same period of time will be displayed
    And the submissions details type will be viewed
    
      |<detailstype>  |
      |Trial ID  |
      |File/Subject  |
      |Submission Method  |
      |Submission Date/Time  |
      |Submitted By  |
      |Submission Accepted?  |
       
       
     And I can export historical acrrual submission records as listed to Excel spreadsheets  
     And I can export historical acrrual submission records as listed to CSV 
     And I can view/save the documents

         Scenario: # File/Subject column data
    Given I am on the Prior Submissions screen
     When I click on the Study Subject ID link 
     Then I can view s subject's demographic and submission data
     And the view study subject page displays all the data recorded to date with the option to update data
     When I click on the Trial count 
     Then the Participating Site Subject Accrual Count will be displayed 
     And I can choose to update or delete the count
     When I click on a submitted batch file 
     Then I can view or save the document
     
     
        Scenario: # I can sort and filter Submission Records
    Given I am on the Prior Submissions screen
     When I type one or more characters contained in my keywords in the search field
     Then the results are filtered as subsequent characters are typed


      
      
      

    