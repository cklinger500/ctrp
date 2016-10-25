@Admin @Global 
Feature: ADMIN F06 Manage Trial Ownership 

As a CTRP User with Administration privileges, I can grant Trial Ownership privileges to CTRP Users with the same site affiliation

Scenario: #1 I can view CTRP Users that are affiliated with an Organization in my Family and manage their Trial Ownership privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Manage Trial Ownership feature
And the Information Source is "Protocol"
Then the system will display all the CTRP User names that are affiliated with an Organization in my Family including 
|Last Name, First Name |
|Email |
|Organization|
|Family|
And all the trials with an active submission where the Lead Organization is affiliated with my Organizational Family
And the Information Source is "Protocol"
And the NIH/NCI Division/Department Identifier is Null, including
|NCI Trial ID|
|Lead Org ID|
|Organization (Lead Organization)|
And all the associations that I am making between trials with an active submission and users affiliated with my Organizational family including (will be null until selections are made in follwing scenarios)
|Last Name, First Name |
|NCI Trial ID|
|Lead Org ID|
|Organization (Lead Organization)|

Scenario: #2 I can assign a CTRP Users that are affiliated with an Organization in my Family Trial Ownership privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Manage Trial Ownership feature
And I have selected one or more CTRP Users from the list of CTRP Users that are affiliated with an Organization in my Family
And I have selected one or more trials with an active submsssion from a list of trials where the Lead Organization is affiliated with my Organizational family
And the Information Source is "Protocol"
And the NIH/NCI Division/Department Identifier is Null
And I have selected the "Assign" trial ownership operation
Then the CTRP Users selected will be assigned trial ownership on the trials selected
And the system will send the "Added as Trial Owner" email to the users selected to be trial owners (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)

Scenario: #3 I can remove Trial Ownership privileges from CTRP Users that are affiliated with an Organization in my Family
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Manage Trial Ownership feature
And I have selected one or more trial ownership assignments, displayed as:
|Last Name, First Name |
|NCI Trial ID|
|Lead Org ID|
|Organization (Lead Organization)|
Then trial ownership privileges will be removed from the CTRP Users selected
And the system will send the "Removed as Trial Owner" email to the users selected to be trial owners (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)
