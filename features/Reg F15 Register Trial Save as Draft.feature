@Global @Reg
Feature: Reg F15 Register Trial Save as Draft

As a CTRP User, I can save my imcomplete registration as a draft, to be completed in the future

Scenario Outline: #1 I can save my incomplete registration as draft
Given I have selected the option to register a trial <TrialType>
And I have entered the Lead Organization Trial ID
And I have entered some other Trial information
When I have selected Save as Draft
Then the CTRP application will save all information that was entered as a draft
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
   