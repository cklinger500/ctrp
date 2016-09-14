@Reg @global
Feature: Reg F26 Available Action Rules
As any CTRP User, I can select available Actions

  Scenario:#1 Available rules for Registered Trials when I am a Trial Owner 
    Given I am logged into the CTRP Registration application
    And the Trial is a Protocol Trial
    And I search Trials by
     |All Trials|
     |My Trials|
     Then the available Action is displayed
     
      |Update	  |
     
     When the Trial Processing Status is
     
      |Verification Pending|
      |Abstraction Verified Response |
      |Abstraction Verified No Response|
      
      Then the additional Available Actions will be displayed (inaddition to update)
 
      |Amend  |
      |View TSR  |
      |Verify Data  |
     
 Scenario:#2 Available Rules for Registered Trials when I am not the Trial Owner
    Given I am logged into the CTRP Registration application
    And I am on the Clinical Trials search Results 
    And I am not the Trial Owner
    And the Trial is a Protocol Trial    
    Then No actions will be available 

  Scenario: #3 Available Actions when Trial is Imported from ClinicalTrials.gov
    Given I am logged into the CTRP Registration application
    And I do not have Administrative Privileges
    And I am on the Clinical Trials search Results
     When my participating Site is added to the trial
     Then the only available action is to update my participating site in the trial
     When my participating site is not added to the Trial 
     Then the only available Action is to add my participating Site to the trial

  Scenario: #4 Available Actions when Trial is Imported from ClinicalTrials.gov
    Given I am logged into the CTRP Registration application
    And I have Site Administrative Privileges
    And I am on the Clinical Trials search Results
     When participating Sites from my Family are added to the trial
     Then the Available Action Update will allow update of any of the participating site from my Family registered on the Trial
     When a participating site from my Family has not been added to the Trial 
     Then the Available Action Add will allow adding any of the participating site from my Family not previously registered on the Trial

 Scenario:#5 Available rules for Drafts when I am a Trial Owner 
    Given I am logged into the CTRP Registration application
    And the Trial is a Protocol Trial
    And the Trial is a Draft
    And I search Trials by
     |Saved Drafts|
    Then the Available Action type displayed
      |Complete |