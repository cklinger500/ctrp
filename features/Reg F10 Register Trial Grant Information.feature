@Global @Reg
Feature: Reg F10 Register Trial Grant Information

  As a CTRP User, I can indicate if a trial has an associated grant and if so, enter information about the grant

  Scenario Outline: #1 I can indicate that the trial does not have an associated grant
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Grant Information screen
    When I have selected "No" for the question "Is this trial funded by an NCI grant?"
    Then the Register Trial Grant Information section will not indicate any errors during Trial Review

    Examples:
      |trialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |



  Scenario Outline: #2 I can enter the NCI Grant information for a trial using a Grant Serial Number look-up
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Grant Information screen
    And I have selected "Yes" for the question "Is this trial funded by an NCI grant?"
    When I have selected the Funding Mechanism from a list
    And I have selected the Institute Code from a list
    And I have selected the NCI Division/Program Code from a list
    And I have entered a partial Grant Serial Number
    Then CTRP will search the IMPACII database view of Grant Information for serial numbers that contain the institute code and partial Grant Serial Number entered
    And CTRP will display Grant Serial Number, Organization, Project Title, and Contact Principal Investigator that match the partial Grant Serial Number
    And I can select from the Grant Serial Numbers displayed
    And I can click on the add button to add the grant

    Examples:
      |trialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |


  @runthis
  Scenario Outline: #3 I can enter the NCI Grant information for multiple Grants for a trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Grant Information screen
    And I have selected "Yes" for the question "Is this trial funded by an NCI grant?"
    When I have entered the information for a NCI Grant
    Then I will be able to select "Add Grant" and enter the information for multiple Grants

    Examples:
      |trialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |


  Scenario Outline: #4 I must enter Trial Grant Information for a Trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Grant Information screen
    When I have not selected the Funding Mechanison from the drop down list
    And I have not selected the Institute Code from the drop down list
    And I have not entered a Trial Serial Number
    And I have not selected a NCI Division/Program Code from the drop down list
    Then the Register Trial Grant Information section will indicate the error "Grant is Required"

    Examples:
      |trialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |



  Scenario Outline:#5 Grant Information Validation check rule
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Grant Information screen
    And I have NOT entered ALL Grant NIH Information type
      |Funding Mechanism  |
      |Institute Code  |
      |Serial Number  |
      |NCI Division/Program Code  |
    When I have clicked on the ADD button to add a grant
    Then A message will be displayed "Funding Mechanism, Institute Code, Serial Number and NCI Division/Program Code are Required"

    Examples:
      |trialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |



