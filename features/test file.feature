@Global @test
Feature: Test search for persons



  @runthis
  Scenario: #1 As CTRP User, I am able to search for persons by first name
    Given the user login into the ctrp application
    Then step definition test first attempt

  @runthis
  Scenario: #2 As CTRP User, I am able to look for persons by first name
    Given the user login into the ctrp application
    Then step definition test second attempt

  @runthis
  Scenario: #3 As any CTRP User, I am able to find persons by first name
    Given the user login into the ctrp application
    Then step definition test third attempt

  @runthis
  Scenario: #4 As any CTRP User, I am able to lookup persons by first name
    Given the user login into the ctrp application
    Then step definition test fourth attempt