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
    When I am a site admin
    And I am on the Clinical Trials search Results page
    And my affiliated organization is associated with a family
    Then the available Action will be "Manage My Sites"
    And I can add any organization in my family as a participating site
    And I can update any participating site that is an organization in my family after it has been added

     Scenario: #4' Available Actions when Trial is Imported from ClinicalTrials.gov
    Given I am logged into the CTRP Registration application
    When I am a site admin 
    And I am on the Clinical Trials search Results page
    And my affiliated organization is not associated with a family
    Then the available Action will be "Manage My Sites"
    And I can add only my organization as a participating site
    And I can update a participating site only when it is my organization after it has been added

    
 Scenario:#5 Available rules for Drafts when I am a Trial Owner 
    Given I am logged into the CTRP Registration application
    And the Trial is a Protocol Trial
    And the Trial is a Draft
    And I search Trials by
     |Saved Drafts|
    Then the Available Action type displayed
      |Complete |