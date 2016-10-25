@Admin @ Global 
Feature: ADMIN F01 Sign in

As a CTRP User, I can sign in to the CTRP application

Scenario: #1 I can sign in using my NIH credentials 
Given I have a valid account in CTRP
And I am on the CTRP Login Page
And I enter my user id
And I enter my password 
And my user id is NIH Credentialed (LDAP Account, NIH Domain) 
And I select sign in
When the system displays the Government System Authorization acknowledgement: 
|NCI CLINICAL TRIALS REPORTING PROGRAM (CTRP) SYSTEM
This is a U.S. Government computer system, which may be accessed and used only for authorized Government business by authorized personnel. Unauthorized access or use of this computer system may subject violators to criminal, civil, and/or administrative action.
All information on this computer system may be intercepted, recorded, read, copied, and disclosed by and to authorized personnel for official purposes, including criminal investigations. Such information includes sensitive data encrypted to comply with confidentiality and privacy requirements. Access or use of this computer system by any person, whether authorized or unauthorized, constitutes consent to these terms. There is no right of privacy in this system. |
And I select Accept
Then I will be logged in to the system

Scenario: #2 I can sign in using my CTRP credentials
Given I am a valid account in CTRP 
And I am on the CTRP Login Page
And I enter my user id 
And I enter my password 
And I select sign in
When the system displays the Government System Authorization and Estimation of Burden acknowledgements: 
|NCI CLINICAL TRIALS REPORTING PROGRAM (CTRP) SYSTEM
This is a U.S. Government computer system, which may be accessed and used only for authorized Government business by authorized personnel. Unauthorized access or use of this computer system may subject violators to criminal, civil, and/or administrative action.
All information on this computer system may be intercepted, recorded, read, copied, and disclosed by and to authorized personnel for official purposes, including criminal investigations. Such information includes sensitive data encrypted to comply with confidentiality and privacy requirements. Access or use of this computer system by any person, whether authorized or unauthorized, constitutes consent to these terms. There is no right of privacy in this system. 
NOTIFICATION TO RESPONDENT OF ESTIMATED BURDEN
OMB#: 0925-0600 EXP. DATE: 5/31/16 
Public reporting burden for this collection of information is estimated to average sixty (60) minutes for this questionnaire, including the time to review instructions, search existing data sources, gather and maintain the data needed, and complete and review the collection of information. An agency may not conduct or sponsor, and a person is not required to respond to, a collection of information unless it displays a current, valid OMB control number. 
Send comments regarding this burden estimate or any other aspect of this collection of information, including suggestions for reducing the burden to:  NIH, Project Clearance Branch, 6705 Rockledge Drive, MSC 7974, Bethesda, MD 20892-7974, ATTN: PRA (0925-0600). 
Do not return the completed form to this address. |
And I select Accept
Then I will be logged in to the system

Scenario: #3 I do not accept the GSA acknowledgement when signing in using my NIH credentials
Given I am a valid account in CTRP
And I am on the CTRP Login Page
And I enter my user id 
And I enter my password 
And I select sign in
When the system displays the Government System Authorization acknowledgement: 
|NCI CLINICAL TRIALS REPORTING PROGRAM (CTRP) SYSTEM
This is a U.S. Government computer system, which may be accessed and used only for authorized Government business by authorized personnel. Unauthorized access or use of this computer system may subject violators to criminal, civil, and/or administrative action.
All information on this computer system may be intercepted, recorded, read, copied, and disclosed by and to authorized personnel for official purposes, including criminal investigations. Such information includes sensitive data encrypted to comply with confidentiality and privacy requirements. Access or use of this computer system by any person, whether authorized or unauthorized, constitutes consent to these terms. There is no right of privacy in this system. |
And I select Reject
Then I will not be logged in to the system
And I will return to the sign in page

Scenario: #4 I do not accept the GSA acknowledgement when signing in using CTRP credentials
Given I am a valid account in CTRP
And I am on the CTRP Login Page
And I enter my user id 
And I enter my password 
And I select sign in
When the system displays the Government System Authorization and Estimation of Burden acknowledgements: 
|NCI CLINICAL TRIALS REPORTING PROGRAM (CTRP) SYSTEM
This is a U.S. Government computer system, which may be accessed and used only for authorized Government business by authorized personnel. Unauthorized access or use of this computer system may subject violators to criminal, civil, and/or administrative action.
All information on this computer system may be intercepted, recorded, read, copied, and disclosed by and to authorized personnel for official purposes, including criminal investigations. Such information includes sensitive data encrypted to comply with confidentiality and privacy requirements. Access or use of this computer system by any person, whether authorized or unauthorized, constitutes consent to these terms. There is no right of privacy in this system. 
NOTIFICATION TO RESPONDENT OF ESTIMATED BURDEN
OMB#: 0925-0600 EXP. DATE: 5/31/16 
Public reporting burden for this collection of information is estimated to average sixty (60) minutes for this questionnaire, including the time to review instructions, search existing data sources, gather and maintain the data needed, and complete and review the collection of information. An agency may not conduct or sponsor, and a person is not required to respond to, a collection of information unless it displays a current, valid OMB control number. 
Send comments regarding this burden estimate or any other aspect of this collection of information, including suggestions for reducing the burden to:  NIH, Project Clearance Branch, 6705 Rockledge Drive, MSC 7974, Bethesda, MD 20892-7974, ATTN: PRA (0925-0600). 
Do not return the completed form to this address. |
And I select Reject
Then I will not be logged in to the system
And I will return to the sign in page
