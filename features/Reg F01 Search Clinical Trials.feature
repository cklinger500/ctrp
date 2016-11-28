@Reg @global
Feature: Reg F01 Search Clinical Trials
As any CTRP User, I can search CTRP clinical trial by various criteria and trial ownership

Scenario: #1 I can search for my clinical trials registered in CTRP where I am listed as a Trial Owner
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select the option to search "My Trials"
Then CTRP will display all trials with a last active submission where I am listed as a Trial Owner and the trials match the trial search criteria
And the Clinical Trials Search Results will display the following sorted by NCI Trial Identifier:
|NCI Trial Identifier|
|Official Title|
|Lead Organization|
|Lead Org Trial Identifier|
|Principal Investigator|
|ClinicalTrials.gov Identifier|
#(Other ID Source and Other ID i.e.DCP:  12345, CTEP:  12345)
# Clinical Trial Identifier should not be included in other identifiers
|Other Identifiers |
|Current Trial Status|
|Current Processing Status|
|Available Actions|
|Accrual Disease Terminology|
|Phase|
|Primary Purpose|
|Clinical Research Category|
|Trial Start Date|
|Responsible Party|
|Sponsor|
|Study Source|
|Record Verification Date|
|Submitter|
|Primary Completion Date|
|Last Update Submitted|
|Last Updater Name|
|Last Amendment Submitted|
|Last Amender Name|
|On-Hold Reason|

  
   Scenario: #1a I can search for my clinical trials registered in CTRP where my Org is listed as participating site on Imported Trials
  Given I am logged into the CTRP Registration application
  And I am on the Search Clinical Trials Screen
  And I know the search Parameters of trial
  When I select the option to search "My Trials"
  Then CTRP will display imported trials with a last active submission where my affiliated org is registered as participating site 
  
  Scenario: #1b As a Site Admin I can search for Imported Clinical Trials in CTRP 
  Given I am logged into the CTRP Registration application
  And my role is a Site Admin
  And I am on the Search Clinical Trials Screen
   And I know the search Parameters of trial
   When I select the option to search Trials "My Trials" 
  Then CTRP will display imported Trials with a last active submission where any affiliated organization in my family is registered as a participating site

  
Scenario: #2 I can search all clinical trials registered in CTRP
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select the option to search "All Trials"
Then CTRP will display all trials with a last active submission that match the trial search criteria
And the Clinical Trials Search Results will display the following sorted by NCI Trial Identifier:

|NCI Trial Identifier|
|Official Title|
|Current Trial Status|
|Lead Organization|
|Lead Org Trial Identifier|
|Principal Investigator|
|ClinicalTrials.gov Identifier|
#(Other ID Source and Other ID i.e.DCP:  12345, CTEP:  12345)
# Clinical Trial Identifier should not be included in other identifiers
|Other Identifiers |
|Available Actions|


Scenario: #3 I can search for my saved draft clinical trials registrations in CTRP
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select the option to search "Saved Drafts"
Then CTRP will display all of my draft registrations that match the trial search criteria
And the Clinical Trials Search Results will display the following sorted by "Lead Org Trial Identifier"

|Official Title|
|Lead Organization|
|Lead Org Trial Identifier|
|Available Actions |


Scenario: #4 I can search for clinical trials by Title
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I enter text in the title selection
And select a search option
Then the search results will display trials with a last active submission that contain the title search text

Scenario: #5 I can search for clinical trials by Phase
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select one or more trial Phase type
      |0      |
      |I      |
      |I/II   |
      |II     |
      |II/III |
      |III    |
      |IV     |
      |NA    |
And select a search option
Then the search results will display trials with a last active submission that match the Phase selected

Scenario: #6 I can search for pilot clinical trials
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select a Pilot type

      |No  |
      |Yes |

And select a search option
Then the search results will display trials with a last active submission that have the Pilot criteria equal to the option selected type
      
      |No  |
      |Yes  |


Scenario: #7 I can search for clinical trials by Trial Primary Purpose
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select one or more trial primary purpose type
      |Treatment                |
      |Prevention               |
      |Supportive Care          |
      |Screening                |
      |Diagnostic               |
      |Health Services Research |
      |Basic Science            |
      |Other                    |

And select a search option
Then the search results will display trials with a last active submission that match the primary purpose selected

Scenario: #8 I can search for clinical trials by Trial ID
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I enter text in the protocol identifier selection
And select a search option
Then the search results will display trials with a last active submission that contain the protocol identifier search text

Scenario: #9 I can search for clinical trials by associated organization
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select an organization from the organization name search look-ahead
And select a search option
Then the system will search all organization where Organization type is

      |Lead Organization  |
      |Sponsor  |
      |Participating Site  |

And Trials with a last active submission that has the selected organization will be displayed

      

Scenario: #10 I can search for clinical trials by associated organization role
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select an organizations from an organization name search look-ahead
And I select one or more Organization type as 

      |Lead Organization  |
      |Sponsor  |
      |Participating Site  |
And select a search option
Then the search results will display trials with a last active submission where the organization selected has the organization role selected


Scenario: #11 I can search for clinical trials by Principal Investigator
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select a person from a person name search
And select a search option
Then the search results will display trials with a last active submission where the person selected is principal investigator

Scenario: #12 I can search for clinical trials by Study Source
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I select one or more Study Source type
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |
      |Industrial                |
      |Other                     |
And select a search option
Then the search results will display trials with a last active submission with a matching Study Source

Scenario: #13 I can search for clinical trials by multiple criteria
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I know the search Parameters of trial
When I have selected or entered multiple search criteria
And selected a search option
Then the search results will display the trials with a last active submission that match all the search criteria selected

  
  Scenario: #14 Search Trials Rules
    Given I am logged into the CTRP Registration application
    And I am on the Search Clinical Trials Screen
    And I know the search Parameters of trial
    And I have clicked on the search button to find any trial type
         
      |My Trials  |
      |All Trials  |
      |Saved Drafts  |
    When I have not selected or entered any search criteria
   Then the message "At least one selection value must be entered prior to running the search" will be displayed
   And no Trials will be found in the results

