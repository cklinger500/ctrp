Feature: QA Smoke Registry - Import Trial
  This will smoke test:
  Import Trial, Search Imported Trial
  Add Participating Site to Imported Trial
  Update Participating Site

  Background:
    Given I am logged in to CTRP Registry application with User "ctrptrialsubmitter" and email id "ctrptrialsubmitter@gmail.com"

  @smoke
  Scenario Outline: As a Trial submitter, I want to import a Trial
    Given I want to import a Trial with NCT ID <NCTID>
    And After Importing it should display the Imported Trial information
    Then I should be able to search with that Imported NCTID
    And I want to add a Participating Site with Organization name: <PSOrgName>, Local Trial Identifier: <PSLclTrId>, Site Principal Investigator: <PSSitePI>, Program Code: <PSPgmCode>, Trial Recruitment Status Date: <PSStatusDate>, Trial Status: <PSStatus>, Comment: <PSComment>
    Then I should be able to see the added Participating site
    And I want to update the Participating Site
    And I want to update the Local Trial Identifier and Save it
    Then It should display the updated Participating Site Information

    Examples:
      | NCTID       | PSOrgName | PSLclTrId | PSSitePI   | PSPgmCode  | PSStatusDate | PSStatus  | PSComment                              |
      | NCT02841202 |           | SS9987    | PSSitePISS | Pcode 4469 | 15-Jul-2016  | In Review | Comment added by Cuke Script - S Singh |
