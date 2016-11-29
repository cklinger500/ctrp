@Global @Reg
Feature: Reg F15 Register Trial Save as Draft

As a CTRP User, I can save my imcomplete registration as a draft, to be completed in the future

Scenario Outline: #1 I can save my incomplete registration as draft
Given I have selected the option to register a trial <TrialType>
And I have entered the Lead Organization Trial ID
And I have entered some other Trial information
When I have selected Save as Draft
Then the CTRP application will save all information that was entered as a draft
And I will be able to view the Trial Details type
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
      |NIH Grant Information (for NIH Funded Trials)|
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
And I will be able to search for saved draft registrations
And I will be able to complete the registration at a future date
And the an email entitled " Trial Partial Registration" will be sent to the user ( Emails list can be found on the share drive under functional/Registartion: CTRP System Generated Emails)

Examples:

  
      |TrialType               |
      |National                |
      |Externally Peer-Reviewed|
      |Institutional           |
   
   
   Scenario Outline:#2 Required fields to save a draft
    Given I have selected the option to register a trial <TrialType>
  And I have not entered the Lead Organization Trial ID
      When I have selected Save as Draft
     Then an error will be displayed "Lead Organization Trial Identifier is Required" 

Examples:

  
      |TrialType               |
      |National                |
      |Externally Peer-Reviewed|
      |Institutional           |
   