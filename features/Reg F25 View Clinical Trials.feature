@Reg @global
Feature: Reg F25 View Clinical Trials
As any CTRP User, I can view a CTRP clinical trial record after a Clinical Trial Search

  Scenario: #1 I can view my clinical trials registered in CTRP
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen
     When I select the option to search "My Trials"
      And CTRP displays all trials where I am listed as a Trial Owner
      And CTRP displays all Imported Trials where my site was added as a Participating site
      
       Scenario: #1a I can view All clinical trials registered in CTRP
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen
     When I select the option to search "All Trials"
      And CTRP displays all trials where I am listed as a Trial Owner
      And CTRP displays all Imported Trials where my site was added as a Participating site
      And CTRP displayed all trials other trials where I am not listed as an Owner
      
      
      Scenario: #1 Trials detail view when I am listed as a trial owner
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen results
      When I select a a trial where I am listed as an owner
     Then I will be able to view the Trial Details type
  
      #All fields should be displayed even when no value exists
      
      #Section Header
      |Trials Identifiers |
      |Lead Organization Trial Identifier|
      |NCI Trial Identifier|
      |Other Trial Indentifier|
      #Section Header
      |Trial Details |
      |Official Title|
      |Phase|
      |Pilot|
      |Clinical Research Category|
      |Primary Purpose|
      # "Description of Other Primary Purpose" only displayed when Primary Purpose is "Other"
      |Description of Other Primary Purpose|
      |Secondary Purpose|
      #"Description of Other Secondary Purpose" only displayed when Secondary Purpose is "Other"
      |Description of Other Secondary Purpose|
      |Accrual Disease Terminology|
      |Lead Organization/Principal Investigator  |
      |Lead Organization|
      |Principal Investigator|
      #Section Header
      |Sponsor|
      |Sponsor|
      #Section header
      |Data Table 4 Information |
      |Study Source|
      |Data Table 4 Funding Source|
      |Program Code|
      #Section Header
      |NIH Grant Information (for NIH funded Trials)|
      |Funding Mechanism  |
      |NIH Institute Code  |
      |Serial Number  |
      |NCI Division/Program|
      #Section Header
      |Trial Status|
      |Current Trial Status  |
      |Why the Study Stopped  |
      |Current Trial Status Date  |
      #Section Header
      |Trial Dates|
      |Trial Start Date: Actual, Anticipated |
      |Primary Completion Date: Actual, Anticipated  |
      |Completion Date: Actual, Anticipated  |
      #Section Header
      |FDA IND/IDE Information for applicable trials  |
      |IND/IDE Type  |
      |IND/IDE Number  |
      |IND Grantor  |
      |IND/IDE Holder Type  |
      |NIH Institution, NCI Division/Program |
      #Section Header
      |Regulatory Information |
      #Check Responsible Party Rules in scenario#
      |Responsible Party|
      |Trial Oversight Authority: Country , Organization  |
      |FDA Regulated Intervention Indicator  |
      |Section 801 Indicator  |
      |Data Monitoring Committee Appointed Indicator  |
       #Section Header
      |Trial Related Documents  | 
      |Protocol Document  |
      |IRB Approval Document  |
      |Change Memo Document  |
      |Protocol Highlighted Document|
      |TSR  |
      |All Other|
       #Section Header
      |Participating Sites|
      |CTRP ID|
     # CTRP ID=Source ID when Source CTRP org
      |CTRP Organization Name|
      |Principal Investigator|
     # Principal Investigator Format (Last Name, First Name)
      |Local Trial Id|
      |Current Site Recruitment Status|
      |Current Site Recruitment Status Date|
      |Primary Contact|
     #Primary Contact Format (Last Name, First Name)
      |Email|
      |Phone Number-Extension|
     
     Scenario: #2 I can search all clinical trials registered in CTRP when initially submitted
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen
     When I select the option to search "All Trials"
      And CTRP displays all trials that match the trial search criteria
      And I select a trial from the Clinical Trial Search Results
     Then I will be able to view the Trial Details Type
     
      #All fields should be displayed even when no value exists
      |Trials Identifiers  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Sponsor|
      |Data Table 4 Information  |
      |Trial Status|
      |Trial Dates|
      |Participating Sites|
   
   All trials "I am an owner" my trials
   
  Scenario: #3 Rules for Clinical Trial Record view after Amendment submission 
    Given I am on the Clinical Trial Search Results screen for trials where I am listed as a trial owner
    When I select a trial from the Clinical Trial Search Results
    Then the latest Active Trial information will be displayed
     And I will be able to view the Trial Details type
      
       #All fields should be displayed even when no value exists
      |Trials Identifiers  |
      |Amendments Details  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Sponsor|
      |Data Table 4 Information  |
      |Trial Status|
      |Trial Dates|
      |FDA IND/IDE Information for applicable trials  |
      |NIH Grant Information (for NIH funded Trials)  |
      |Regulatory Information |# Responsible Pa
      |Trial Related Documents  |
      |Participating Sites|
     
     Scenario: #4 Rules for Clinical Trial Record view after Amendment submission 
    Given I am on the Clinical Trial Search Results screen for all trials where I am not listed as a trial owner
    When I select a trial from the Clinical Trial Search Results
    Then the latest Active Trial information will be displayed
     And  I will be able to view the Trial Details type
     
       #All fields should be displayed even when no value exists
      |Trials Identifiers  |
      |Amendment Details  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Sponsor|
      |Data Table 4 Information  |
      |Trial Status  |
      |Trial Dates|
      |Participating Sites|
      
      
      
        Scenario:#4a Participating Sites Table Columns description for all trials (Protocol and Imported)--------Program code deleted from the view details PS table
    Given I am on the View Trial Screen
     And I can view Participating Site Table for all trials
     And the table displays the columns type
     
      #All fields should be displayed even when no value exists
     |CTRP ID|
     # CTRP ID=Source ID when Source CTRP org
     |CTRP Organization Name|
     |Principal Investigator|
     # Principal Investigator Format (Last Name, First Name)
     |Local Trial Id|
     |Current Site Recruitment Status|
     |Current Site Recruitment Status Date|
     |Primary Contact|
     #Primary Contact Format (Last Name, First Name)
     |Email|
     |Phone Number-Extension|
     
     
    
       
        Scenario: #5 Trial Identifiers viewed fields
    Given I am on the Trial Details screen
     And I will view the Trial Identifiers type 
     
       #All fields should be displayed even when no value exists 
      |Lead Organization Trial Identifier  |
      |NCI Trial Identifier  |
      |Other Trial Identifier  |


      Scenario: #6 Amendment Details Viewed Fields
    Given I am on the Trial Details screen
     And I will view the Amendment Details type 
        
       #All fields should be displayed even when no value exists   
      |Amendment Number  |
      |Amendment Date  |
      
      
        Scenario: #7 Trial Details viewed fields
    Given I am on the Trial Details screen
     And I will view the Trial Details type
     
       #All fields should be displayed even when no value exists 
      |Title  |
      |Phase  |
      |Clinical Research Category  |
      |Primary Purpose  |
      |Secondary Purpose  |
      |Accrual Disease Terminology |


  Scenario: #8 Lead Organization/Principal Investigator viewed fields
    Given I am on the Trial Details Screen
     And I will view the Lead Organization/ Principal Investigator type

       #All fields should be displayed even when no value exists 
      |Lead Organization  |
      |Principal Investigator  |


  Scenario: #9 Data Table 4 Information viewed fields
  Given I am on the Trial Details Screen
   And I will view Data Table 4 Information type
   
       #All fields should be displayed even when no value exists
      |Data Table 4 Funding Sponsor Type  |
      |Data Table 4 Funding Sponsor/Source |
      |Program Code  |

     Scenario: #10 Trial Status viewed fields
    Given I am on the Trial Details Screen
    And I will view Status/Dates type
    
     #All fields should be displayed even when no value exists
      |Current Trial Status  |
      |Why the Study Stopped  |
      |Current Trial Status Date  |
      
     Scenario: #10 Trial Dates viewed fields
    Given I am on the Trial Details Screen
    And I will view Status/Dates type
      
       #All fields should be displayed even when no value exists
      |Trial Start Date: Actual, Anticipated |
      |Primary Completion Date: Actual, Anticipated  |
      |Completion Date: Actual, Anticipated  |

      Scenario: #11 FDA IND/IDE Information for applicable trials viewed fields
    Given I am on the trial Details screen
     And I will view the FDA IND/IDE Information for applicable trials type
     
      #All fields should be displayed even when no value exists
      |IND/IDE Type  |
      |IND/IDE Number  |
      |IND Grantor  |
      |IND/IDE Holder Type  |
      |NIH Institution, NCI Division/Program   |
     
     
      Scenario: #12 NIH Grant Information (for NIH funded Trials) viewed fields
    Given I am on the trial Details screen
     And I will view the NIH Grant Information (for NIH funded Trials) type
     
       #All fields should be displayed even when no value exists
      |Funding Mechanism  |
      |NIH Institute Code  |
      |Serial Number  |
      |NCI Division/Program Code  |

       Scenario:#13 Regulatory Information Viewed fields 
    Given I am on the trial Details screen
    And I will view the Regulatory Information type
    
     #All fields should be displayed even when no value exists
      |Responsible Party|
      #|Trial Oversight Authority Country  |
      |Trial Oversight Authority Organization Name  |
      |FDA Regulated Intervention Indicator  |
      |Section 801 Indicator  |
      |Delayed Posting Indicator  |
      |Data Monitoring Committee Appointed Indicator  |

 

      Scenario: #14 Trial Related Documents viewed
    Given I am on the trial Details screen
     And I will view Trial Related Documents type
      
      #All fields should be displayed even when no value exists
      |Protocol Document  |
      |IRB Approval Document  |
      |Change Memo Document  |
      |Protocol Highlighted Document|
      |TSR  |
      |All Other|


      Scenario: #15 I can add my site as a participating site after a trial is imported from ClinicalTrials.gov
Given I have selected the option to Import an Industrial or Other Trial
And I am on the Import ClinicalTrials.gov Trials screen
And I have entered a NCT Number
And I have imported the trial successfully
Then the trial information will be displayed including
|Trial Identifiers (Title)| 
|Lead Organization Trial Identifier|
|NCI ID|
|ClinicalTrial.gov ID|
|Other IDs|
|Trial Details (Title)|
|Official Title|
|Phase|
|Clinical Research Category|
|Primary Purpose|
|Trial Status (Title)|
|Current Trial Status|
|Trial Dates (Title)|
|Trial Start Date: Date Type (Actual or Anticipated)|
|Primary Completion Date : Date Type (Actual or Anticipated)|
|Completion Date: Date Tye (Actual or Anticipated)|
|Lead Organization (Title)|
|Lead Organization|
|Data Table 4 Information (Title)|
|Study Source|
|Data Table 4 Funding Sponsor/Source|






 

  




