Feature: Reg F05 Register Trial Protocol Identifiers
  As a CTRP User, I can Register a Trial's Protocol Identifiers

  Scenario Outline:#1 I can enter protocol identifiers for a trial
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Protocol Identifiers screen
    When I have entered the lead organization trial identifier
    And I can enter more than one Protocol ID Origin Type:
      |ClinicalTrials.gov Identifier|
      |Obsolete ClinicalTrials.gov Identifier|
      |Other Identifier  |
    And I have to specify every selected Protocol ID Origin's Protocol ID
    Then the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review

    Examples:

      |TrialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |
      
   
      Scenario Outline: #1a Rule for Character length for Trial Protocol Identifiers 
  Given I have selected the option to register a trial <trialType>
  And I am on the Register Trial Protocol Identifiers screen
  Then a comment appears below the field to display the number of characters available to enter into the field
    | Field                                                                | Number of Characters left          |
    | Lead Organization Trial Identifier                                   | 30 characters left                           |
   | Other Trial Identifier                                                | 30 characters left                           |

  And "x characters left" will be displayed as characters are added
  When all the characters mentioned above for field have been entered
  Then no additional text can be entered

  Examples:
    |trialType  |
    |National                 |
    |Externally Peer-Reviewed |
    |Institutional            |



  Scenario Outline: #2 I must enter the lead organization trial identifier
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Protocol Identifiers screen
    When I have not entered the lead organization trial identifier
    And I click on the Review Trial button
    Then the Register Trial Protocol Identifiers section will indicate an error "Lead Organization Trial Identifier is Required"

    Examples:


      |TrialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |

  Scenario Outline: #3 Duplicate and format rules for Other Trial Identifier
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Protocol Identifiers screen
    And I should be allowed to enter only one "ClinicalTrials.gov Identifier"
    And I should be allowed to enter more than one "Obsolete ClinicalTrials.gov Identifier" with unique IDs
    And I should be allowed to enter more than one "Other Identifier" with unique IDs
    And I should check for valid "ClinicalTrials.gov Identifier" format as NCT followed by 8 numeric characters <NCT00000000>
    And I should check for valid "Obsolete ClinicalTrials.gov Identifier" format as NCT followed by 8 numeric characters <NCT00000000>
    Then the Register Trial Protocol Identifiers section will indicate zero errors


    Examples:

      |TrialType  				 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |


  
      
     
      



      
      
