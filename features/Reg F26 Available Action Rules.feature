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
     When my participating site is not added to the Trial 
     And my participating site is "Active"
     Then the only available Action is to add my participating Site to the trial
     When my participating Site is added to the trial
     And my participatin site is "Active"
     Then the only available action is to update my participating site in the trial
    
     Scenario: #3a Available Actions when Trial is Imported from ClinicalTrials.gov
    Given I am logged into the CTRP Registration application
    When I do not have Administrative Privileges
    And I am on the Clinical Trials Search Results page
    When my participating site is not added to the Trial 
     And my participating site is "Inactive"
     Then the action to add my participating site will not be available
     When my participating Site is added to the trial
     And my participatin site is "Inactive"
     Then the action to update my participating site will not be available 

 Scenario: #4 Available Actions when Trial is Imported from ClinicalTrials.gov
    Given I am logged into the CTRP Registration application
    When I am a site admin
    And I am on the Clinical Trials Search Results page
    And my affiliated organization is associated with a family
    And the Family status is "Active"
   And the organization affiliation to the family is not expired
    Then the available Action will be "Manage My Sites"
    And I can add any organization in my family as a participating site
    And I can update any participating site that is an organization in my family after it has been added
    
    Scenario: #4a Available Actions when Trial is Imported from ClinicalTrials.gov
    Given I am logged into the CTRP Registration application
    When I am a site admin
    And I am on the Clinical Trials Search Results page
    And my affiliated organization is associated with a family
    And the Family status is "Active"
    And the organization affiliation to the family is expired
    And my affiliated organization is "Active"
    Then the available Action will be "Manage My Sites"
    And I can add only my organization as a participating site
    And I can update a participating site only when it is my organization after it has been added

    
 Scenario: #4b Available Actions when Trial is Imported from ClinicalTrials.gov
    Given I am logged into the CTRP Registration application
    When I am a site admin 
    And I am on the Clinical Trials Search Results page
    And my affiliated organization is not associated with a family (Orphan)
    And my affiliated organization is "Active"
    Then the available Action will be "Manage My Sites"
    And I can add only my organization as a participating site
    And I can update a participating site only when it is my organization after it has been added

 Scenario: #4c Available Actions when Trial is Imported from ClinicalTrials.gov
    Given I am logged into the CTRP Registration application
    When I am a site admin 
    And I am on the Clinical Trials Search Results page
    And And my affiliated organization is not associated with a family
    And my affiliated organization is "Inactive"
    Then the Action "Manage My Sites" will not be available 
    

    
 Scenario:#5 Available rules for Drafts when I am a Trial Owner 
    Given I am logged into the CTRP Registration application
    And the Trial is a Protocol Trial
    And the Trial is a Draft
    And I search Trials by
     |Saved Drafts|
    Then the Available Action type displayed
      |Complete |