@Reg @global
Feature: Reg F25 View Clinical Trials
As any CTRP User, I can view a CTRP clinical trial record after a Clinical Trial Search

  Scenario: #1 I can view my clinical trials registered in CTRP when initially submitted
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen
     When I select the option to search "My Trials"
      And CTRP displays all trials where I am listed as a Trial Owner 
      And the trials match the trial search criteria
      And I select a trial from the Clinical Trial Search Results
     Then I will be able to view the Trial Details type
  
     
      |Trials Identifiers  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Sponsor/Responsible Party  |
      |Data Table 4 Information  |
      |Trial Status|
      |Trial Dates|
      |FDA IND/IDE Information for applicable trials  |
      |NIH Grant Information (for NIH funded Trials)  |
      |Regulatory Information |
      |Trial Related Documents  |  
      |Participating Sites|
      
     
     Scenario: #2 I can search all clinical trials registered in CTRP when initially submitted
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen
     When I select the option to search "All Trials"
      And CTRP displays all trials that match the trial search criteria
      And I select a trial from the Clinical Trial Search Results
     Then I will be able to view the Trial Details Type
     
      |Trials Identifiers  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Sponsor|
      |Data Table 4 Information  |
      |Trial Status|
      |Trial Dates|
      |Participating Sites|
   
  Scenario: #3 Rules for Clinical Trial Record view after Amendment submission 
    Given I am on the Clinical Trial Search Results screen for trials where I am listed as a trial owner
    When I select a trial from the Clinical Trial Search Results
     Then I will be able to view the Trial Details type
      
      |Trials Identifiers  |
      |Amendments Details  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Sponsor/Responsible Party  |
      |Data Table 4 Information  |
      |Trial Status|
      |Trial Dates|
      |FDA IND/IDE Information for applicable trials  |
      |NIH Grant Information (for NIH funded Trials)  |
      |Regulatory Information |
      |Trial Related Documents  |
      |Participating Sites|
     
     Scenario: #4 Rules for Clinical Trial Record view after Amendment submission 
    Given I am on the Clinical Trial Search Results screen for all trials where I am not listed as a trial owner
    When I select a trial from the Clinical Trial Search Results
     Then I will be able to view the Trial Details type
     
      |Trials Identifiers  |
      |Amendment Details  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Data Table 4 Information  |
      |Trial Status  |
      |Trial Dates|
      |Participating Sites|
      
      
        Scenario:#4a Participating Sites Table Columns description 
    Given I am on the View Trial Screen
     And I can view Participating Site Table
     And the table displays the columns type
     
     |CTRP Org ID (Group ID)|
     |CTRP Organization Name|
     |Investigators (Last Name, First Name)|
     |Primary Contact (Last Name, First Name)|
     |Local Trial Identifier|
     |Program Code|
     |Current Site Recruitment Status|
     |Current Site Recruitment Status Date|
     
     
    
       
        Scenario: #5 Trial Identifiers viewed fields
    Given I am on the Trial Details screen
     And I will view the Trial Identifiers type 
     
       
      |Lead Organization Trial Identifier  |
      |NCI Trial Identifier  |
      |Other Trial Identifier  |


      Scenario: #6 Amendment Details Viewed Fields
    Given I am on the Trial Details screen
     And I will view the Amendment Details type 
        
         
      |Amendment Number  |
      |Amendment Date  |
      
      
        Scenario: #7 Trial Details viewed fields
    Given I am on the Trial Details screen
     And I will view the Trial Details type
     
       
      |Title  |
      |Phase  |
      |Trial Type  |
      |Primary Purpose  |
      |Secondary Purpose  |
      |Accrual Disease Terminology |


  Scenario: #8 Lead Organization/Principal Investigator viewed fields
    Given I am on the Trial Details Screen
     And I will view the Lead Organization/ Principal Investigator type

       
      |Lead Organization  |
      |Principal Investigator  |


  Scenario: #9 Data Table 4 Information viewed fields
  Given I am on the Trial Details Screen
   And I will view Data Table 4 Information type
   
      |Data Table 4 Funding Sponsor Type  |
      |Data Table 4 Funding Sponsor/Source |
      |Program Code  |

     Scenario: #10 Trial Status viewed fields
    Given I am on the Trial Details Screen
    And I will view Status/Dates type
    
    
      |Current Trial Status  |
      |Why the Study Stopped  |
      |Current Trial Status Date  |
      
     Scenario: #10 Trial Dates viewed fields
    Given I am on the Trial Details Screen
    And I will view Status/Dates type
      
      
      |Trial Start Date: Actual, Anticipated |
      |Primary Completion Date: Actual, Anticipated  |
      |Completion Date: Actual, Anticipated  |

      Scenario: #11 FDA IND/IDE Information for applicable trials viewed fields
    Given I am on the trial Details screen
     And I will view the FDA IND/IDE Information for applicable trials type
     
      |IND/IDE Type  |
      |IND/IDE Number  |
      |IND Grantor  |
      |IND/IDE Holder Type  |
      |NIH Institution, NCI Division/Program Code  |
      |Has Expanded Access  |
      |Expanded Access Type  |
      |Exempt Indicator  |

     
      Scenario: #12 NIH Grant Information (for NIH funded Trials) viewed fields
    Given I am on the trial Details screen
     And I will view the NIH Grant Information (for NIH funded Trials) type
     
      |Funding Mechanism  |
      |NIH Institute Code  |
      |Serial Number  |
      |NCI Division/Program Code  |

       Scenario:#13 Regulatory Information Viewed fields 
    Given I am on the trial Details screen
    And I will view the Regulatory Information type
    
    
      |Trial Oversight Authority Country  |
      |Trial Oversight Authority Organization Name  |
      |FDA Regulated Intervention Indicator  |
      |Section 801 Indicator  |
      |Delayed Posting Indicator  |
      |Data Monitoring Committee Appointed Indicator  |

 

      Scenario: #14 Trial Related Documents viewed
    Given I am on the trial Details screen
     And I will view Trial Related Documents type
     
      |Protocol Document  |
      |IRB Approval Document  |
      |Change Memo Document  |
      |Protocol Highlighted Document|
      |TSR  |
      |Other|




 

  



