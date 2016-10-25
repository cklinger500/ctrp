@Global @Reg
Feature: Reg F13 Register Trial Documents

As a CTRP User, I can attach various documents to a trial registration

Scenario Outline: #1 I can attach Trial Related Documents to a trial registration
Given I have selected the option to register a trial <TrialType>
And I am on the Register Trial Related Documents screen
And I have noted the message 
     """
     To ensure successful registration, upload a Protocol document and an IRB Approval document. If the Protocol document does not include the Informed Consent and/or participating sites, upload the Informed Consent document and a list of participating sites separately. You can use the Participating Sites template to submit your list of participating sites.
     CTRP accepts most standard document types. For additional information about what document types are accepted, please refer to the Help section.
     """
     
When I have selected a file to attach as the Protocol Document
And I have selected a file to attach as the IRB Approval
And I have selected a file to attach as the list of Participating Sites 
And I have selected a file to attach as the Informed Consent Document 
And I have selected one or more files to attach as Other file and entered the description of the file
Then the Register Trial Related Document for the trial registration will not indicate an errors during Trial Review

Examples: 
      |TrialType                |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline:#2 I must enter the Protocol Document and the IRB Approval
    Given I have selected the option to register a trial <TrialType>
    
    And I am on the Register Trial Related Documents screen
    When I have not attached a file as the Protocol Document
    And I have not attached a file as the IRB Approval 
    And I click on the Review Trial button
    Then Trial Related Documents section will indicate an error 
    
      |Protocol Document is Required  |
      |IRB Approval is Required       |

    
  Examples: 
      |TrialType                |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
 
 
      
     
Scenario Outline: #4 I can only attach documents with permitted document types
Given I have selected the option to register a trial <TrialType>
And I am on the Register Trial Related Documents screen
When I have selected a file to attach from the list below as a trial document
      
      |Pdf|
      |Doc|
      |docx|
      |docm|
      |Xls|
      |xlsx|
      |xlsm|
      |xlsb|
      |Rtf|
      |Txt|
      
Then The Trial Related Documents section will not indicate any errors during Trial Review
When the file selected is not from the file list 
Then an error will be displayed "Valid file is Required. Allowed file types: pdf,doc,docx,docm,xls,xlsx,xlsm,xlsb,rtf,txt" 
      
     
      

Examples: 
      |TrialType                |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |



     
     


