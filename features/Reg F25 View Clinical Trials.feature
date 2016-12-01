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
      And CTRP displays all protocol trials 
      And CTRP displays all Imported Trials 
      
      
      Scenario: #1 Trials detail view for Protocol Trials when I am listed as a trial owner 
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen results
      When I select a protocol trial where I am listed as an owner
     Then I will be able to view the Trial Details type
      # Can be Viewed from "My Trials" or "All Trials"
      #All fields should be displayed even when no value exists
      # Optional Documents should not be displayed when not uploaded
      
      # Displayed after Amendment Submission
      |Amendments Details(Section) |
      # Displayed after Amendment Submission
      |Amendment Number  |
      # Displayed after Amendment Submission
      |Amendment Date  |
      |Trials Identifiers (Section) |
      |Lead Organization Trial Identifier|
      |NCI Trial Identifier|
      |Other Trial Indentifier|
      |Trial Details(Section)|
      |Official Title|
      |Phase|
      |Pilot|
      |Clinical Research Category|
      #Displayed when Clinical Research Category is " Interventional" or "Expanded Access"
      |Intervention Model|
       #Displayed when Clinical Research Category is " Interventional" or "Expanded Access"
      |Masking|
       #Displayed when Clinical Research Category is " Interventional" or "Expanded Access"
      |Allocation|
      #Displayed when Clinical Research Category is "Observational" or "Ancillary Correlative"
      |Study Model|
      #Displayed when Clinical Research Category is "Observational" or "Ancillary Correlative"
      |Time Perspective|
      |Primary Purpose|
      #"Description of Other Primary Purpose" only displayed when Primary Purpose is "Other"
      |Description of Other Primary Purpose|
      |Secondary Purpose|
      #"Description of Other Secondary Purpose" only displayed when Secondary Purpose is "Other"
      |Description of Other Secondary Purpose|
      |Accrual Disease Terminology|
      |Lead Organization/Principal Investigator(Section)  |
      |Lead Organization|
      |Principal Investigator|
      |Sponsor(Section)|
      |Sponsor|
      |Data Table 4 Information (Section) |
      |Study Source|
      |Data Table 4 Funding Source|
      |Program Code|
      |NIH Grant Information (for NIH Funded Trials)(Section)|
      |Funding Mechanism  |
      |NIH Institute Code  |
      |Serial Number  |
      |NCI Division/Program|
      |Trial Status(Section)|
      |Current Trial Status  |
      |Why the Study Stopped  |
      |Current Trial Status Date  |
      |Trial Dates (Section)|
      |Trial Start Date: Actual, Anticipated |
      |Primary Completion Date: Actual, Anticipated  |
      |Completion Date: Actual, Anticipated  |
      |FDA IND/IDE Information for applicable trials (Section)  |
      |IND/IDE Type  |
      |IND/IDE Number  |
      |IND Grantor  |
      |IND/IDE Holder Type  |
      |NIH Institution, NCI Division/Program |
      |Regulatory Information(Section) |
      |Responsible Party|
      #Displayed when "Responsible Party" is the "Principal Investigator" or "Sponsor-Investigator"
      |Investigator|
      #Displayed when "Responsible Party" is the "Principal Investigator" or "Sponsor-Investigator"
      |Investigator Title|
      #Displayed when "Responsible Party" is the "Principal Investigator" or "Sponsor-Investigator"
      |Investigator Affiliation|
      #Trial Oversight Authority Country and Organization are displayed in a table
      |Trial Oversight Authority: Country , Organization  |
      |FDA Regulated Intervention Indicator  |
      |Section 801 Indicator  |
      |Data Monitoring Committee Appointed Indicator  |
      |Trial Related Documents (Section) | 
      |Protocol Document- Current Protocol |
       #Change Memo only viewed when prior submission is an amendment
      |Change Memo -Current Change Memo|
      #Change Memo only viewed when prior submission is an amendment
      |Protocol Highlighted Document: Current Protocol Highlighted Document|
      |IRB Approval-Current IRB Approval  |
      |List of Participating Sites-Current Participating Sites|
      |Informed Consent Document- Current Informed Consent Document |
      |Complete Sheet: All Complete Sheets|
      |Other- All Other Documents |
      |TSR- All TSR   |
      |Participating Sites (Section)|
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
      
      
      |Trials Identifiers (Section) |
      |Lead Organization Trial Identifier|
      |NCI Trial Identifier|
      |Other Trial Indentifier|
      |Trial Details(Section) |
      |Official Title|
      |Phase|
      |Pilot|
      |Clinical Research Category|
       #Displayed when Clinical Research Category is " Interventional" or "Expanded Access"
      |Intervention Model|
       #Displayed when Clinical Research Category is " Interventional" or "Expanded Access"
      |Masking|
       #Displayed when Clinical Research Category is " Interventional" or "Expanded Access"
      |Allocation|
      #Displayed when Clinical Research Category is "Observational" or "Ancillary Correlative"
      |Study Model|
      #Displayed when Clinical Research Category is "Observational" or "Ancillary Correlative"
      |Time Perspective|
      |Primary Purpose|
      #"Description of Other Primary Purpose" only displayed when Primary Purpose is "Other"
      |Description of Other Primary Purpose|
      |Secondary Purpose|
      #"Description of Other Secondary Purpose" only displayed when Secondary Purpose is "Other"
      |Description of Other Secondary Purpose|
      |Accrual Disease Terminology|
      |Lead Organization/Principal Investigator(Section)  |
      |Lead Organization|
      |Principal Investigator|
      |Sponsor(Section)|
      |Sponsor|
      |Data Table 4 Information(Section) |
      |Study Source|
      |Data Table 4 Funding Source|
      |Program Code|
      |Trial Status(Section)|
      |Current Trial Status  |
      |Why the Study Stopped  |
      |Current Trial Status Date  |
      |Trial Dates(Section)|
      |Trial Start Date: Actual, Anticipated |
      |Primary Completion Date: Actual, Anticipated  |
      |Completion Date: Actual, Anticipated  |
      |Participating Sites (Section)|
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
      
    
    Scenario: #1 Trials detail view for Imported Trials 
    Given I am logged into the CTRP Registration application
    And I am on the view Trial Details screen 
    And I can view an imported trial Details type
    #All fields should be displayed even when no value exists
      
     
      |Trials Identifiers (Section) |
      |Lead Organization Trial Identifier|
      |NCI Trial Identifier|
      |Other Trial Indentifier|
      |Trial Details(Section) |
      |Official Title|
      |Phase|
      |Pilot|
      |Clinical Research Category|
       #Displayed when Clinical Research Category is " Interventional" or "Expanded Access"
      |Intervention Model|
       #Displayed when Clinical Research Category is " Interventional" or "Expanded Access"
      |Masking|
       #Displayed when Clinical Research Category is " Interventional" or "Expanded Access"
      |Allocation|
      #Displayed when Clinical Research Category is "Observational" or "Ancillary Correlative"
      |Study Model|
      #Displayed when Clinical Research Category is "Observational" or "Ancillary Correlative"
      |Time Perspective|
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
     
     
    
       
       
      
      
       
 

  




