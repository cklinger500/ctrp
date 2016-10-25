@Global @Reg
Feature: Reg F14 Register Trial Review and Submit

As a CTRP User, I can review my registration and if no errors, I can submit the registration to CTRP

Scenario Outline: #1 I can review my registration without errors
Given I have selected the option to register a trial <trialType>
And I have completed the registration sections
When I have selected Review Trial
Then the CTRP application will check that all required fields have been entered
| Required Fields |
|Study Source|
|Lead Organization Trial Identifier|
|Title|
|Phase|
|Pilot|
|Clinical Research Category|
|Primary Purpose|
|Accrual Disease Terminology|
|Lead Organization|
|Principal Investigator|
|Sponsor|
|Data Table 4 Funding Source|
|Is this trial funded by an NCI grant?|
|Trial Status Date|
|Trial Status|
|Trial Start Date|
|Trial Start Date Actual or Anticipated qualifier|
|Primary Completion Date|
|Primary Completion Date Actual or Anticipated qualifier|
|Completion Date Actual|
|Completion Date Actual or Anticipated qualifier|
|Does this Trial have an associate IND/IDE|
|Protocol Document|
|IRB Approval Document|
And the CTRP application will check that all conditional fields have been entered
|Condition : Conditional Field|
|Describe "Other" Secondary Purpose|
|Principal Investigator as Responsible Party :Investigator, Investigator Title, Investigator Affiliation|
|Sponsor-Investigator as Responsible Party : Investigator, Investigator Title, Investigator Affiliation|
|Funded by NCI Grant : Funding Mechanism, Institute Code, Serial Number, NCI Division/Program Code|
|IND/IDE : IND/IDE Type, IND/IDE Number, IND/IDE Grantor, IND/IDE Holder Type, NIH Institution or NCI Division|
|Administratively Complete, Withdrawn, Temporarily Closed Trial Status : Why Study Stopped|
And the CTRP application will check if any optional fields have been entered
|Optional Fields|
|Other Identifiers: Protocol ID Type and Protocol ID|
|Secondary Purpose|
|Program Code|
|List of Participating Site Documents|
|Informed Consent Document|
|Other Documents|
And the CTRP application will check that all registration sections have been completed with no errors
And the option to submit trial will be available
And the trial record will have the NCI Identifer with the format NCI-YYYY-NNNNN 
And an email entitled "Trial Registration" will be sent to the trial submitter (Email list in the shared drive under Functional/Registration: CTRP System Generated Emails)

 Examples:
  |trialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |



Scenario Outline: #2 I can review my registration with errors
Given I have selected the option to register a trial <TrialType>
And I have completed the registration sections but with errors
When I have selected Review Trial
Then the registration errors will be displayed
And the option to Submit Trial will be not available

Examples:
  |TrialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |

Scenario Outline: #3 Check for Duplicate trials
Given I have selected the option to register a trial <trialType>
When I have entered the same Lead Organization Trial Identifier for a Lead Organization which exists in another Trial
And the Trial has NOT been Rejected 
Then on review, the error message " A Trial exists in the system with the same Lead Organization Trial identifier for the selected Lead Organization" will be displayed
And the option to Register Trial will be not available

 Examples:
  |trialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |
  
  

Scenario Outline: #3a Check for Duplicate trials
Given I have selected the option to register a trial <trialType>
When I have entered the same Lead Organization Trial Identifier for a Lead Organization which exists in another Trial
And the registered Trial has been Rejected 
Then I should be able to register the new trial 

 Examples:
  |trialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |





Scenario Outline: #4 I can edit my completed trial registration
Given I have selected the option to register a trial <trialType>
When I have performed the Review Trial action without errors
Then I will have the option to continue editing by trial registration

Examples:
  |trialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |

