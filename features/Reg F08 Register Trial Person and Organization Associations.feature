@Global @Reg
Feature: Reg F08 Register Trial Person and Organization Associations
  As a CTRP User, I can associate a Lead Organization/Principal Investigator with a Clinical Trial

  Scenario Outline:#1 I can associate a Lead Organization/Principal Investigator with a Clinical Trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Lead Organization/Principal Investigator screen
    When I have performed a Lead Organization look-up in Search Organization
    And I have selected an Organization as the trial's Lead Organization
    And I have performed a person look-up in Search persons
    And I have selected a person as the trial's Principal Investigator
    Then Selected persons name will be displayed as Last Name, First Name as the trial's Principal Investigator
    Then the Register Lead Organization/Principal Investigator section will not indicate any errors during Trial Review

    Examples:
      |trialType              |
      |National                 |
      |Externally Peer-Reviewed  |
      |Institutional            |


  Scenario Outline:#2 I must associate a Lead Organization/Principal Investigator with a Clinical Trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Lead Organization/Principal Investigator screen
    When I have not selected an Organization as the trial's Lead Organization
    And I have not selected a person as the trial's Principal Investigator
    Then the Register Trial Lead Organization/Principal Investigator screen will indicate errors as:

      |Lead Organization is Required|
      |Principal Investigator is Required|

    Examples:
      |trialType              |
      |National                 |
      |Externally Peer-Reviewed  |
      |Institutional            |


  Scenario Outline:#3 I can associate an organization as the Sponsor Party on a clinical trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Sponsor Party screen
    When I have performed a Sponsor organization look-up in Search Organizations
    And I have selected an organization as the trial's Sponsor
    Then the Register Trial Sponsor Party section will not indicate any errors during Trial Review

    Examples:

      |trialType              |
      |National                 |
      |Externally Peer-Reviewed  |
      |Institutional            |


  Scenario Outline:#4 I must associate an organization as the Sponsor Party on a clinical trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Sponsor Party screen
    When I have not selected an organization as the trial's Sponsor from the lookup
    Then the Register Trial Sponsor Party section will indicate errors during Trial Review as:


      |Sponsor is Required  |

    Examples:

      |trialType              |
      |National                 |
      |Externally Peer-Reviewed  |
      |Institutional            |


  Scenario Outline:#5 I can associate an organization as the Funding Source on a clinical trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Funding Source screen
    When I have performed a Funding Source organization look-up
    And I have selected one or more organizations as the trial's Funding Source
    And I have entered a trial's Program Code
    Then the Register Trial Funding Source screen will not indicate any errors during Trial Review

    Examples:

      |trialType              |
      |National                 |
      |Externally Peer-Reviewed  |
      |Institutional            |


  Scenario Outline:#6 I must associate one or more organizations as the Funding Source on a clinical trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Funding Source screen
    When I have not entered one or more organizations as the trial's Funding Source
    Then The Register Trial Funding Source will indicate a error as "Funding Source is Required"

    Examples:

      |trialType              |
      |National                 |
      |Externally Peer-Reviewed  |
      |Institutional            |





