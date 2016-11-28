@Global @Reg
Feature: Reg F23 Request New Organization

 As a CTRP User I can request a new organization in CTRP

Scenario: #1 I can request the creation of a new organization
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
And I searched for the desired organization
When I do not find the organization that I need for registration
Then I can select the Request New Organization option under the Organization menu
And the process and information to request a new organization will be displayed as
|To request the creation of a new organization record, please contact the Clinical Trials Reporting Office (CTRO) at ncictro@mail.nih.gov |
|The required information is Organization Name, Street Address, City, State, Country, phone, and email |