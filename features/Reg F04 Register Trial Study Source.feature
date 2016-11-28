@Global @Reg
Feature: Reg F04 Register Trial Study Source

  As a CTRP User, I can select the Study Source of the trial I will register

  Scenario Outline: #1 I can select the option to register a protocol for a National, Externally Peer-Reviewed, or Institutional trial
    Given I have selected the option to register a trial <trialType>
    Then I am on the Register Trial screen
    And CTRP will display the required registration elements for a complete protocol registration for the selected <trialType>
    Examples:
      |trialType                                          |
      |National     |
      |Externally Peer-Reviewed  |
      |Institutional   |
     

