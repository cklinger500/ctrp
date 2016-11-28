
@Global @Reg
Feature: Reg F24 Request New Person

 As a CTRP User I can request the creation of a new person record

Scenario: #1 I can request the creation of a new Person record
Given I am logged into the CTRP Registration application
And I have selected the option "Search Person"
And I searched for the desired Person
When I do not find the Person that I need for registration
Then I can select the Request New Person option under the Person menu
And the process and information to request a new person record will be displayed as
|To request the creation of a new Person record, please contact the Clinical Trials Reporting Office (CTRO) at ncictro@mail.nih.gov |
|The required information is First Name, Last Name, Email, City, State/Province, Country and Organization Affiliation of the Person |