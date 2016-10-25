@Global @Reg
Feature: Reg F20 View Trial Summary Report

As a CTRP User, I can view my trial Trial Summary Report (TSR)

Scenario: #1 I search My trials and select the View TSR 
Given I am in the CTRP Registration applicatin
And I have selected the option to view My trials in CTRP (trials where I am listed as owner)
And the current processing status type is displayed
      |Verification Pending|
      |Abstraction Verified Response   |
      |Abstraction Verified No Response  |
When I select Action from the Available Actions
Then the View TSR option will available
When I click on the view TSR option
Then the TSR document will be downloaded with data for the last active submission for the trial
And I can view TSR document



  Scenario: #1 TSR Heading Section Display Rules
    Given I can view TSR document
    And the document heading will display the data type
    
      |Trial Summary Report  |
      |Date  |
      |Record Verification Date  |

     And the TSR heading will be displayed following the rules below
     
     |	TSR Section |	Field	             |Always displayed	|
     |		        |		                 |		            |		
     |TSR HEADING   |Trial Summary Report    |Required	        |		  
     |		       	|Date                    |Required		    |	
     |		        |Record Verification Date(Trials.Verification_Date)|Required		    |
     
      Scenario: #2 Official Title Section Display Rules
    Given I can view TSR document
    And the TSR Official Title section fields will be displayed following the rules below
     
     |TSR Section    |Field          |Field Required |Display Rule when Field Blank |       
     |Official Title |Official Title |Required    	 |Display "No data available"	|
	 |	             |Acronym	     |Not Required   |Field not Displayed           |
	 |	             |Keywords	     |Not Required	 |Field not displayed  	        |

     
       Scenario: #3 Trial Identification Section Display Rules
    Given I can view TSR document
    And the TSR Trial Identification Section fields will be displayed following the rules below
    
    |TSR Section         |Field                        |Field Required|Display Rule when Field Blank |
    |Trial Identification|NCI Trial Identifier         |Required      |Display "No data available"   |
    |                    |Lead Org Identifier          |Required      |Display "No data available"   |
    |                    |ClinicalTrials.gov Identifier|Required      |Display "No data available"   | 
    |                    |CTEP Identifier              |Not Required  |Field not displayed           |
    |                    |DCP Identifier               |Not Required  |Field not displayed           |
    |                    |Other Identifier             |Not Required  |Field not displayed           |
    |                    |Other Identifier             |Not Required  |Field not displayed           |
    |                    |Amendment Number             |Not Required  |Field not displayed           |
    |                    |Amendment Date               |Not Required  |Field not displayed           |
   

 
      Scenario:#4 General Trial Details Section Display Rules 
     Given I can View TSR document
     And the TSR Trial Details Section fields will be displayed following the rules below
     
     
      |TSR Section     |Field                                        |Field Required  |Conditional Fields                                      |Display Rule when Field t  |
      |                |Lead Organization                            |Required        |                                                        |Display "No data available"    |
      |                |Sponsor                                      |Required        |                                                        |Display "No data available"    |
      |                |Responsible Party                            |Required        |                                                        |Display "No data available"    |
      |                |Investigator                                 |Required        |Only Displayed when Responsible Party is not the Sponsor|Display "No data available"    |
      |                |Investigator Title                           |Required        |Only Displayed when Responsible Party is not the Sponsor|Display "No data available"    |
      |                |Investigator Affiliation                     |Required        |Only Displayed when Responsible Party is not the Sponsor|Display "No data available"    |
      |                |Principal Investigator                       |Required        |                                                        |Display "No data available"    |
      |                |Affiliation                                  |Required        |                                                        |Display "No data available"    |
      |Collaborators   |Name                                         |Not Required    |                                                        |Field not Displayed            |
      |Status/Dates    |Current Trial Status                         |Required        |                                                        |Display "No data available"    |
      |                |Trial Start Date-Actual/Anticipated          |Required        |                                                        |Display "No data available"    |
      |                |Primary Completion Date-Actual/Anticipated/NA|Required        |                                                        |Display "No data available"    |                 
      |                |Trial Completion Date-Actual/Anticipated     |Not Required    |                                                        |Field not Displayed            |
      
     
      Scenario:#5 HIN Grants Section Display Rules 
     Given I can View TSR document
     And the NIH Grants Section fields will be displayed following the rules below
      
      
     |TSR Section     |Field                    |Field Required  |Conditional Fields                                                               |Display Rule when Field Blank  | 
     |NIH Grants      |Funding Mechanism        |Required        |When the answer to the questions "Is this trial funded by an NCI grant?" is "yes"|Display "No data available"    |  
     |                |NIH Institution Code     |Required        |When the answer to the questions "Is this trial funded by an NCI grant?" is "yes"|Display "No data available"    |
     |                |Serial Number            |Required        |When the answer to the questions "Is this trial funded by an NCI grant?" is "yes"|Display "No data available"    |
     |                |NCI Division/Progarm Code|Required        |When the answer to the questions "Is this trial funded by an NCI grant?" is "yes"|Display "No data available"    |     
     |NIH Grants      |Funding Mechanism        |Not Required    |When the answer to the questions "Is this trial funded by an NCI grant?" is "No" |Field not Displayed            |  
     |                |NIH Institution Code     |Not Required    |When the answer to the questions "Is this trial funded by an NCI grant?" is "No" |Field not Displayed            |
     |                |Serial Number            |Not Required    |When the answer to the questions "Is this trial funded by an NCI grant?" is "No" |Field not Displayed            |
     |                |NCI Division/Progarm Code|Not Required    |When the answer to the questions "Is this trial funded by an NCI grant?" is "No" |Field not Displayed            |     


     Scenario:#6 Summary 4 Information Section Display Rules 
     Given I can View TSR document
     And the TSR Summary 4 Information Section fields will be displayed following the rules below

      |TSR Section             |Field                              |Field Required  |Display Rule when Field Blank  |
      |Data Table 4 Information|Study Source                       |Required        |Display "No data available"    |
      |                        |Funding Sponsor/Source             |Required        |Display "No data available"    |
      |                        |Anatomic Site Code                 |Required        |Display "No data available"    |
   
   
   Scenario:#7 Regulatory Information Section Display Rules 
     Given I can View TSR document
     And the Regulatory Information Section fields will be displayed following the rules below
     
      |TSR Section           |Field                     |Field Required  |Display Rule when Field Blank  |
      |Regulatory Information|Oversight Authorities     |Required        |Display "No data available"    |
      |                      |FDA Regulated Intervention|Required        |Display "No data available"    |
      |                      |Section 801               |Required        |Display "No data available"    |
      |                      |DMC Appointed             |Required        |Display "No data available"    |
      |                      |IND/IDE Study             |Required        |Display "No data available"    |
      |IND/IDE               |Type                      |Required        |Display "No data available"    |
      |                      |Grantor                   |Required        |Display "No data available"    |
      |                      |Number                    |Required        |Display "No data available"    |
      |                      |Holder Type               |Required        |Display "No data available"    |
      |                      |Holder                    |Required        |Display "No data available"    |
      |Human Subject Safety  |Board Approval Status     |Required        |Display "No data available"    |
      |                      |Board Approval Number     |Required        |Display "No data available"    |
      |                      |Board                     |Required        |Display "No data available"    |
      |                      |Address                   |Not Required    |Field not Displayed            |
      |                      |Phone                     |Not Required    |Field not Displayed            |
      |                      |Email                     |Not Required    |Field not Displayed            |
      |                      |Affiliation               |Required        |Display "No data available"    |  
      
      
  Scenario:#8 Trial Design Section Display Rules Associated with Interventional/Expanded Access Clinical Research Category
     Given I can View TSR document
     And the Trial Design Section fields will be displayed following the rules below
     
     |TSR Section    |Field                                 |Field Required  |Conditional Fields                |Display Rule when Field Blank|
     |Trial Design   |Primary Purpose                       |Required        |                                  |Display "No data available"   
     |               |Description of Other Primary Purpose  |Not Required    |                                  |Field not Displayed
     |               |Secondary Purpose                     |Not Required    |                                  |Field not Displayed
     |               |Description of Other Secondary Purpose|Not Required    |                                  |Field not Displayed
     |               |Phase                                 |Required        |                                  |Display "No data available" 
     |               |Intervention Model                    |Required        |                                  |Display "No data available" 
     |               |Number of Arms/Groups                 |Required        |                                  |Display "No data available" 
     |               |Masking                               |Required        |                                  |Display "No data available" 
     |               |Masking Roles                         |Required        |Conditional if Masking is not Open|Display "No data available" 
     |               |Allocation                            |Required        |                                  |Display "No data available" 
     |               |Study Classification                  |Required        |                                  |Display "No data available" 
     |               |Target Enrollment                     |Required        |                                  |Display "No data available" 
    
         
      
    Scenario:#8a Trial Design Section Display Rules Associated with Observational/Ancillary Correlative Clinical Research Category
     Given I can View TSR document
     And the Trial Design Section fields will be displayed following the rules below 
     
      |TSR Section    |Field                                 |Field Required |Display Rule when Field Blank|
      |Trial Design   |Primary purpose                       |Required       |Display "No data available"  |
      |               |Description of Other Primary Purpose  |Not Required   |Field not Displayed          |  
      |               |Trial Phase                           |Required       |Display "No data available"  |  
      |               |Study Model                           |Required       |Display "No data available"  |  
      |               |Time Perspective                      |Required       |Display "No data available"  |  
      |               |Description for Other Time Perspective|Not Required   |Field not Displayed          | 
      |               |Bio-Specimen Retention                |Required       |Display "No data available"  |  
      |               |Bio-Specimen Description              |Required       |Display "No data available"  |  
      |               |Number of Arms/Groups                 |Required       |Display "No data available"  |  
      |               |Target Enrollment                     |Required       |Display "No data available"  |  

      
     Scenario:#9 Trial Description Section Display Rules 
     Given I can View TSR document
     And the Trial Description Section fields will be displayed following the rules below  
     
      |TSR Section       |Field                 |Field Required |Display Rule when Field Blank|
      |Trial Description |Brief Title           |Required       |Display "No data available"  |
      |                  |Brief Summary         |Required       |Display "No data available"  |
      |                  |Objectives            |Required       |Display "No data available"  |
      |                  |Detailed Description  |Required       |Display "No data available"  |
 
      Scenario:#10 Intervention (s) Section Display Rules 
     Given I can View TSR document
     And the Intervention (s) Section fields will be displayed following the rules below  
     
      |TSR Section       |Field                 |Field Required |Display Rule when Field Blank|
      |Intervention (s)  |Intervention Type     |Required       |Display "No data available"  |
      |                  |Preferred Name        |Required       |Display "No data available"  |
      |                  |Synonyms              |Required       |Display "No data available"  |
      |                  |Description           |Required       |Display "No data available"  |

      
      
      Scenario:#11 Arms/Groups Section Display Rules 
     Given I can View TSR document
     And the Arms/Groups Section fields will be displayed following the rules below  
     
      |TSR Section       |Field         |Field Required |Display Rule when Field Blank|
      |Arms/Groups       |Arm Type      |Required       |Display "No data available"  |
      |                  |Label         |Required       |Display "No data available"  |
      |                  |Description   |Required       |Display "No data available"  |
      |                  |Intervention  |Required       |Display "No data available"  |

      
      Scenario:#12 Eligibility Criteria Section Display Rules 
     Given I can View TSR document
     And the Eligibility Criteria Section fields will be displayed following the rules below
      
      |TSR Section           |Field                       |Field Required |Conditional Fields                                        |Display Rule when Field Blank|
      |Eligibility Criteria  |Accepts Healthy Volunteers  |Required       |                                                          |Display "No data available"
      |                      |Gender                      |Required       |                                                          |Display "No data available"
      |                      |Minimum Age                 |Required       |                                                          |Display "No data available"
      |                      |Maximum Age                 |Required       |                                                          |Display "No data available"
      |                      |Sampling Method             |Required       |Conditional if Clinical Research Category is Observational|Display "No data available"
      |                      |Study Population            |Required       |Conditional if Clinical Research Category is Observational|Display "No data available"
      |                      |Inclusion Criteria          |Required       |                                                          |Display "No data available"
      |                      |Exclusion Criteria          |Required       |                                                          |Display "No data available"



     Scenario:#13 Diseases/Conditions Section Display Rules 
     Given I can View TSR document
     And the Diseases/Conditions Section fields will be displayed following the rules below

      |TSR Section           |Field               |Field Required |Display Rule when Field Blank| 
      |Diseases/Conditions   |Diseases/Conditions |Required       |Display "No data available"  |
      |                      |Disease Code        |Required       |Display "No data available"  |
 

     Scenario:#14 Primary Outcome Measures Section Display Rules 
     Given I can View TSR document
     And the Primary Outcome Measures Section fields will be displayed following the rules below
     
     
      |TSR Section               |Field        |Field Required |Display Rule when Field Blank| 
      |Primary Outcome Measures  |Title        |Required       |Display "No data available"  |
      |                          |Description  |Required       |Display "No data available"  |
      |                          |Time Frame   |Required       |Display "No data available"  |
      |                          |Safety       |Required       |Display "No data available"  |
 
     
      Scenario:#15 Secondary Outcome Measures Section Display Rules 
     Given I can View TSR document
     And the Secondary Outcome Measures Section fields will be displayed following the rules below
     
      |TSR Section               |Field        |Field Required |Display Rule when Field Blank| 
      |Secondary Outcome Measures|Title        |Required       |Display "No data available"  |
      |                          |Description  |Required       |Display "No data available"  |
      |                          |Time Frame   |Required       |Display "No data available"  |
      |                          |Safety Issue |Required       |Display "No data available"  |
      
     
     
      Scenario:#16 Sub-Groups Stratification Criteria Section Display Rules 
     Given I can View TSR document
     And the Sub-Groups Stratification Criteria Section fields will be displayed following the rules below
     
      |TSR Section                         |Field        |Field Required |Display Rule when Field Blank|
      |Sub-Groups Stratification Criteria  |Label        |Required       |Display "No data available"  |
      |                                    |Description  |Required       |Display "No data available"  |
     
      
      
     Scenario:#17 Biomarkers Section Display Rules 
     Given I can View TSR document
     And the Biomarkers Section fields will be displayed following the rules below
     
      |TSR Section |Field            |Field Required |Display Rule when Field Blank| 
      |Biomarkers  |Protocol Name    |Required       |Display "No data available"  |
      |            |Evaluation Type  |Required       |Display "No data available"  |
      |            |Assay Type       |Required       |Display "No data available"  |
      |            |Biomarker Use    |Required       |Display "No data available"  |
      |            |Biomarker Purpose|Required       |Display "No data available"  |
      |            |Specimen Type    |Required       |Display "No data available"  |

      
       
     Scenario:#18 Participating Sites Section Display Rules 
     Given I can View TSR document
     And the Participating Sites  Section fields will be displayed following the rules below
     
      |TSR Section         |Field                         |Field Required |Display Rule when Field Blank|
      |Participating Sites |Facility                      |Required       |Display "No data available"  |
      |                    |Contact                       |Required       |Display "No data available"  |
      |                    |Recruitment Status & Date(s)  |Required       |Display "No data available"  |
      |                    |Target Accrual                |Required       |Display "No data available"  |
      |                    |Investigator(s)               |Required       |Display "No data available"  |

     
     
     
     
     
     
      