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
 # Optional Documents should not be displayed when not uploaded
      
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
      |IRB Approval-Current IRB Approval  |
      |List of Participating Sites-Current Participating Sites|
      |Informed Consent Document- Current Informed Consent Document |
      |Complete Sheet: All Complete Sheets|
      |Other- All Other Documents |
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
   