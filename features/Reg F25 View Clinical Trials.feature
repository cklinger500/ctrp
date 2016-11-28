@Reg @global
Feature: Reg F25 View Clinical Trials
As any CTRP User, I can view a CTRP clinical trial record after a Clinical Trial Search

  Scenario: #1 I can view my clinical trials registered in CTRP
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen
     When I select the option to search "My Trials"
      And CTRP displays all protocol trials where I am listed as a Trial Owner
      And CTRP displays all Imported Trials where my site was added as a Participating site
      
       Scenario: #1a I can view All clinical trials registered in CTRP
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen
     When I select the option to search "All Trials"
      And CTRP displays all protocol trials where I am listed as a Trial Owner
      And CTRP displays all Imported Trials where my site was added as a Participating site
      And CTRP displayed all protocol trials where I am not listed as an Owner
      And CTRP displayed all imported trials where my site was not added as a Participating site
      
      
      Scenario: #1 Trials detail view for Protocol Trials when I am listed as a trial owner
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen results
      When I select a protocol trial where I am listed as an owner
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
      #"Description of Other Primary Purpose" only displayed when Primary Purpose is "Other"
      |Description of Other Primary Purpose|
      |Secondary Purpose|
      #"Description of Other Secondary Purpose" only displayed when Secondary Purpose is "Other"
      |Description of Other Secondary Purpose|
      |Accrual Disease Terminology|
      #Section Header
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
      |NIH Grant Information (for NIH Funded Trials)|
      |Funding Mechanism  |
      |NIH Institute Code  |
      |Serial Number  |
      |NCI Division/Program|
      #Section Header
      |Regulatory Information |
      #Check Responsible Party Rules in scenario#1a
      |Responsible Party|
      #Trial Oversight Authority Country and Organization are displayed in a table
      |Trial Oversight Authority: Country , Organization  |
      |FDA Regulated Intervention Indicator  |
      |Section 801 Indicator  |
      |Data Monitoring Committee Appointed Indicator  |
       #Section Header
      |Trial Related Documents  | 
      |Protocol Document  |
      |IRB Approval Document  |
      |Informed Consent|
      |List of Participating Sites|
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
      
      
       Scenario: #1 Trials detail view for Protocol Trials when I am not listed as a trial owner
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen results
      When I select a protocol trial where I am not listed as an owner
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
      #"Description of Other Primary Purpose" only displayed when Primary Purpose is "Other"
      |Description of Other Primary Purpose|
      |Secondary Purpose|
      #"Description of Other Secondary Purpose" only displayed when Secondary Purpose is "Other"
      |Description of Other Secondary Purpose|
      |Accrual Disease Terminology|
      #Section Header
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
      
      
      Scenario: #1a Responsible Party Display Rules
    Given I am logged into the CTRP Registration application
    And I am on the view Trial Details screen 
    When the "Responsible Party" is the 
    |Principal Investigator|
    |Sponsor-Investigator|
    Then the fields below will be displayed 
    |Investigator|
    |Investigator Title|
    |Investigator Affiliation|
    
    Scenario: #1a Trial Design Display Rules 
    Given I am logged into the CTRP Registration application
    And I am on the view Trial Details screen 
    When the "Clinical Trial Category" is 
    |Interventional|
    |Expanded Access|
    Then the Trial Design fields type will be displayed
    |Intervention Model|
    |Maksing|
    |Allocation|
    When the "Clinical Trial Category" is
    |Observational|
    |Ancillary Correlative|
    Then the Trial Design fields type will be displayed
    |Study Model|
    |Time Perspective|
    
    
    Scenario: #1 Trials detail view for Imported Trials 
    Given I am logged into the CTRP Registration application
    And I am on the view Trial Details screen 
    And I can view an imported trial Details type
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
      #"Description of Other Primary Purpose" only displayed when Primary Purpose is "Other"
      |Description of Other Primary Purpose|
      |Secondary Purpose|
      #"Description of Other Secondary Purpose" only displayed when Secondary Purpose is "Other"
      |Description of Other Secondary Purpose|
      |Accrual Disease Terminology|
      #Section Header
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
      #Section Header
      |Trial Status|
      |Current Trial Status  |
      |Current Trial Status Date  |
      #Section Header
      |Trial Dates|
      |Trial Start Date: Actual, Anticipated |
      |Primary Completion Date: Actual, Anticipated  |
      |Completion Date: Actual, Anticipated  |
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
    
     
    
   
  Scenario: #3 Rules for Clinical Trial Record view after Amendment submission 
    Given I am on the Clinical Trial Search Results screen for trials where I am listed as a trial owner
    When I select a trial from the Clinical Trial Search Results
    Then the latest Active Trial information will be displayed
     And I will be able to view the Trial Details type
      
       #All fields should be displayed even when no value exists
      
      #Section Header
      |Amendments Details  |
      |Amendment Number  |
      |Amendment Date  |
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
      #"Description of Other Primary Purpose" only displayed when Primary Purpose is "Other"
      |Description of Other Primary Purpose|
      |Secondary Purpose|
      #"Description of Other Secondary Purpose" only displayed when Secondary Purpose is "Other"
      |Description of Other Secondary Purpose|
      |Accrual Disease Terminology|
      #Section Header
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
      |NIH Grant Information (for NIH Funded Trials)|
      |Funding Mechanism  |
      |NIH Institute Code  |
      |Serial Number  |
      |NCI Division/Program|
      #Section Header
      |Regulatory Information |
      #Check Responsible Party Rules in scenario#1a
      |Responsible Party|
      #Trial Oversight Authority Country and Organization are displayed in a table
      |Trial Oversight Authority: Country , Organization  |
      |FDA Regulated Intervention Indicator  |
      |Section 801 Indicator  |
      |Data Monitoring Committee Appointed Indicator  |
       #Section Header
      |Trial Related Documents  | 
      |Protocol Document  |
      |IRB Approval Document  |
      |Informed Consent|
      |List of Participating Sites|
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
     
     
    
       
       
      
      
       
 

  




