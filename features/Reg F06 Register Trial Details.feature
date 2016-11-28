@Global @Reg
Feature: Reg F06 Register Trial Details

  As a CTRP User, I can Register Trial Details

  Scenario Outline: #1 I can enter the trial Details
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Details screen
    When I have entered the trial's title
    And I have selected the trial phase types:
      |0      |
      |I      |
      |I/II   |
      |II     |
      |II/III |
      |III    |
      |IV     |
      |NA     |
    And I have selected the "Yes" if the study is a pilot study or left the option"No" as the default
    And I have selected the appropriate Clinical Research Category Types:
      |Interventional         |
      |Observational          |
      |Ancillary Correlative  |
    And I have selected the Trial's Primary Purpose Type:
      |Treatment               |
      |Prevention              |
      |Supportive Care         |
      |Screening               |
      |Diagnostic              |
      |Health Services Research|
      |Basic Science           |
      |Other                   |
    And I have selected the Trial's Secondary Purpose Type:
      |Ancillary-Correlative|
      |Other                |
    And I have selceted the Trial's Accrual Disease Terminology Type:
      |SDC    |
      |ICD9   |
      |ICD10  |
      |ICD-O-3|
    Then the Trial Details section will be complete

    Examples:
      |TrialType               |
      |National                |
      |Externally Peer-Reviewed|
      |Institutional           |

	
    Scenario Outline: #1a Rule for Character length for Trial Details 
  Given I have selected the option to register a trial <trialType>
  And I am on the Register Trial Details screen
  Then a comment appears below the field to display the number of characters available to enter into the field
| Field                                                                                                                                                                    | Number of Characters left                 |
| Official Title                                                                                                                                                      | 600 characters left                         |
| Describe "Other" Primary Purpose (When Primary Purpose is selected as Other)                  | 200 characters left                         |
| Describe "Other" Secondary Purpose (When Secondary Purpose is selected as Other)      | 1000 characters left                         |

  And "x characters left" will be displayed as characters are added
  When all the characters mentioned above for field have been entered
  Then no additional text can be entered

  Examples:
    |trialType  |
    |National                 |
    |Externally Peer-Reviewed |
    |Institutional            |


 	Scenario Outline: #2 I must enter Trial Details Types
    Given I have selected the option to register a trial <TrialType>
    When I have not entered The official Title
    And I have not entered the trial Phase type
    And I have not entered the Clinical Research Category type
    And I have not entered the trial Primary Purpose
    And I have not entered the Accrual Disease Terminology type
    Then the Trial Details field <FieldType> section will indicate an error <error>

      |FieldType                    |error                                      |
      | Official Title              | Official Title is Required                   |
      | Phase                       | Phase is Required                  |
      | Clinical Research Category  | Clinical Research Category is Required            |
      | Primary Purpose             | Primary Purpose is Required             |
      | Accrual Disease Terminology | Accrual Disease Terminology is Required   |

    Examples:

      |TrialType               |
      |National                |
      |Externally Peer-Reviewed|
      |Institutional           |

  Scenario Outline: #3 Rules for Trial's Primary and Secondary Purpose Type
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Details screen
    When I select "Other" as the Trial Primary Purpose
    Then I must provide the Primary Purpose other description
    And I select "Other" as the Trial Secondary Purpose
    Then I must provide the Secondary Purpose other description

    Examples:

      |TrialType               |
      |National                |
      |Externally Peer-Reviewed|
      |Institutional           |


     