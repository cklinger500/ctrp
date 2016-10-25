@Admin @Global 
Feature: ADMIN F02 Request CTRP User Account

As someone without a CTRP User Account, I can request a user account

   Scenario: #1 I can request a user account 
   Given I have access to a CTRP user sign up screen
   And I will select an answer type to the question "Do you have an NIH Account"

      |Yes, I have an NIH Account  |
      |No, I do not have an NIH Account  |

  When I have selected "yes, I have an NIH Account" 
  Then a Username field "Username" will be displayed
  And I must enter a Username "Username" 
  And I must enter my First Name "First Name"
  And I  must enter my Last Name "Last Name"
  And I must enter an Email Address "Email"
  And I must enter a phone Number "Phone Number"
  And I can enter a phone Number Extension "Phone Extension"
  And I must select my Organization Name "Organization Name" from organizations using type ahead
  And I fill in the CAPTCHA correctly
  And I press "Register"
  Then the system will save the User request to the database 
  And the system will send the "CTRP Account Request" email to appsupport for the new request (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)
  When the account request is approved 
  Then the system will send the "Registration Activation(NIH)" email to the user (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)  
  
  
  Scenario: #2 I can request a user account 
   Given I have access to a CTRP user sign up screen
   And I will select an answer type to the question "Do you have an NIH Account"

      |Yes, I have an NIH Account  |
      |No, I do not have an NIH Account  |

  When I have selected "No, I do not have an NIH Account" 
  Then Username field "Username" will not be displayed
  And I must enter my First Name "First Name"
  And I  must enter my Last Name "Last Name"
  And I must enter an Email Address "Email"
  And I must enter a phone Number "Phone Number"
  And I must select my Organization Name "Organization Name" from the organizations using type ahead
  And I fill in the CAPTCHA correctly
  And I press "Register"
  Then the system will save the User request to the database 
  And the system will send the "CTRP Account Request" email to appsupport for the new request (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)
  When the request is approved
  Then Then the system will send the "Account Activation(Site User)" email to the user (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)  
  


 Scenario: #3 User account Required Fields
   Given I am on the CTRP user sign up screen
   And the fields type are required 
   
      |NIH Account      |                                  
      |First Name       |
      |Last Name        |
      |Email            |
      |Phone Number     |
      |Organization Name|
      |CAPTCHA          |

   When the answer to the question "Do you have an NIH Account" is "yes,I have an NIH Account"
   Then the field "Username" is required
   When the answer to the question "Do you have an NIH Account" is "No,I do not have an NIH Account"
   Then the field "Username" is NOT required