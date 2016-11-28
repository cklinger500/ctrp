@PA @global
Feature: PAA F08 Add and Edit Trial Participating Sites

As any CTRP PA User, I can add a Trial Participating Sites
  @runthis
Scenario Outline: #1 I can add a participating site to a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I can select an organization <Organization name> with the Organization look up 
And I can enter the program code <Site Specific Program Code> 
And I can enter the Local Trial Identifier <Local Trial Identifier>
And I can select one or more Site Recruitment Status' <Site Recruitment Status> 
And I can select a Site Recruitment status date for each status<Site Recruitment Status Date> 
And I can enter Site Recruitment status comments for each status<Site Recruitment status comments>
And I can enter a Target Accrual Number <Target Accrual Number>
And I can select one or more Investigators <Site Principal Investigator> for each Participating Site with the person look up 
And I can select the role for each investigator <Site Principal Investigator Role> 
|Principal Investigator|
|Sub Investigator|
And I can select a Central Contact type for the Participating site 
|Site PI|
|Person|
|Generic|
When Central Contact type is "Generic"
Then I can add the phone number for the investigator contact <Phone> 
And I can add  the phone number extension <Ext> for the investigator contact
And I can add  the contact e-mail for the contact <e-mail address> 
Then the participating site information will be associated with the trial
And the organization address information <Org City> <Org State> <Org Country> <Org zip code> will be associated with the trial
And the system will display "Yes" with the investigator is the "Primary Contact?"<Primary Contact?>
And the system will display the list of participating sites ordered ascending alphanumeric by participating site name
And the system will display a message that the Participating Site Has been Updated <Message>
And the Participating Site table can be sorted by
|Organization ID|
|Organization Name|
Examples:
|CTRP ID|Organization name    |Org City|Org State    |Org Country  |Org zip code|Local Trial Identifier|Site Recruitment Status|Site Recruitment Status Date|Site Recruitment status comments|Site Specific Program Code|Target Accrual Number|Site Principal Investigator|Site Principal Investigator Role|Primary Contact?"|Central Contact      |Phone         |Ext |e-mail address  |Warning/Error|Message|
|2222222|Boston Medical Center|Boston  |Massachussets|United States|3849504     |123                   |Approved               |30-September-2015           |Free Text                       |48                        |100                  |Kristi Graves              |Principal Investigator          |Yes              |Kristi Graves        |212-123-4567  |1234|kristi@mayo.com |             |Participating Site Has been Updated|
#|2222212|MD Anderson         |New York|NY           |USA          |10101       |123a                  |approved               |30-September-2015           |comments                        |123abc                    |25                   |john Smith                 |Principal Investigator          |No               |Clinical Trial Center|1-888-123-4567|4567|CTC@mda.com     |             |Participating Site Has been Updated|
#|1212121|Wake Forest         |Trenton |NJ           |USA          |10101       |123b                  |approved               |30-September-2015           |<null>                          |<null>                    |null                 |John Doe                   |Sub  Investigator               |No               |Jane Doe             |212-123-4567  |1111|<null>          |             |Participating Site Has been Updated|

  Scenario: #1'Participating site field's character limit
    Given I can add a participating site to a trial
     When I add a participating site field type <Field>
     Then a comment appears below the Field Type <field> to display the number of characters available to enter into the field <FieldLength>
     And "x characters left" will be displayed as characters are added
     When the field Length <FieldLength> characters have been entered
    Then no additional text can be entered
       
       |Field               |FieldLength|
       |Organization Name   |254        |
       |Contact First Name  |62         |
       |Contact Last Name   |62         |
       |Contact Middle Name |1          |
       |Contact Phone Number|30         |
       |Contact Extension   |14         |
       |Contact Email       |254|

Scenario Outline: #1a I can add one or more participating sites to a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I can select an organization <Organization name> with the Organization look up 
Then the participating site will be associated with the trial

Scenario Outline: #1c Participating site required fields 
Given I am logged into the CTRP Protocol Abstraction application
And I have added a Participating Site
Then the following fields will be required
     # CTRP Org ID=Source ID when Source CTRP org
     |CTRP ID|
     |CTRP Organization Name|
     |Investigators, Role (Principal Investigator or Sub-Investigator)|
     |Local Trial Identifier|
     |Current Site Recruitment Status|
     |Current Site Recruitment Status Date|
     |Primary Contact|
     |Email|
     |Phone Number, Phone Number Extension|
     


Scenario Outline: #2 I can edit a participating site on a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I can select an participating site
And I can edit the program code <Site Specific Program Code> 
And I can edit the Local Trial Identifier <Local Trial Identifier>
And I can edit the Site Recruitment Status' <Site Recruitment Status> 
And I can edit the Site Recruitment status date for each status <Site Recruitment Status Date>
And I can edit Site Recruitment status comments for each status <Site Recruitment status comments>
And I can edit the Target Accrual Number <Target Accrual Number>
And I can delete an investigator from the participation site <Site Principal Investigator> 
And I can select a different role for each investigator <Site Principal Investigator Role> 
And I can select a different Central Contact type for the Participating site
|Site PI|
|Person|
|Generic|
And I can edit the phone number for the investigator contact <Phone> 
And I can edit the phone number extension <Ext> for the investigator contact
And I can edit the contact e-mail for the contact <e-mail address> 
Then the participating site information will be associated with the trial
And the organization address information <Org City> <Org State> <Org Country><Org zip code> will be associated with the trial
And the system will display the list of participating sites ordered ascending alphanumeric by participating site name
And the system will display a message that the Participating Site Has been Updated <Message>
|Organization ID|
|Organization Name|
Examples:
|CTRP ID|Organization name|Org City|Org State|Org Country|Org zip code|Local Trial Identifier|Site Recruitment Status|Site Recruitment Status Date|Site Recruitment status comments|Site Specific Program Code|Target Accrual Number|Site Principal Investigator|Site Principal Investigator Role|Primary Contact?"|Central Contact      |Phone         |Ext  |e-mail address  |Warning/Error|Message|
|1234567|Mayo             |New York|NY       |USA        |10101       |123                   |Approved               |30-Sep-2015                 |Free Text                       |48                        |100                  |Jane Doe                   |Principal Investigator          |No               | Kristi Graves        |212-123-4567  |2222 |kristi@mayo.com |             |Participating Site Has been Updated|
|2345678|MD Anderson      |New York|NY       |USA        |10101       |123a                  |approved               |30-sep-2015                 |comments                        |123abc                    |25                   |john Smith                 |Principal Investigator          |No               |Clinical Trial Center|1-888-123-4567|3333 |CTC@mda.com     |             |Participating Site Has been Updated|
|1231231|Wake Forest      |Trenton |NJ       |USA        |10101       |123b                  |approved               |30-Sep-2015                 |<null>                          |<null>                    |null                 |John Doe                   |Sub  Investigator               |No               |Jane Doe             |212-123-4567  |4444 |<null>          |             |Participating Site Has been Updated|


Scenario: #3 Delete participating site information for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I select one or more participating sites
When I select delete participating site
Then the Participating Site will be removed from the trial record

Scenario: #4 Save participating site information for a trial 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
When select save participating site 
Then the information entered or edited on the Participating Site screen will be saved to the trial record

Scenario: #5 Cancel participating site information for a trial 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
When I select Reset participating sites
Then the information entered or edited on the Participating Site screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario Outline: #6 Warning/Error messages for participating sites for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected the Participating site <Organization name>
And I have Not selected the Site Recruitment Status <Site Recruitment Status> 
And I have Not selected the Site Recruitment status date <Site Recruitment Status Date>
And I have Not selected an Investigator <Investigator>
And I have Not selected a role for each investigator <Site Principal Investigator Role>
And I have Not selected a site contact type
And I have Not added a phone number for the investigator contact (when there is no e-mail address)<Phone>
And I have Not added an e-mail address for the contact (when there is no Phone #)<e-mail address>
When I select save
Then the system will display a message that the specified fields are required for the Participating Site <Message>
And the participating site information will not be associated with the trial

Examples:
|Organization name|Org City|Org State|Org Country|Org zip code|Local Trial Identifier|Site Recruitment Status|Site Recruitment Status Date|Site Recruitment status comments|Site Specific Program Code|Target Accrual Number|Site Principal Investigator|Site Principal Investigator Role|Central Contact      |Phone         |Ext   |e-mail address|Warning/Error|Message|
|Mayo             |New York|NY       |USA        |10101       |123                   |Approved               |30-Sep-2015                 |Free Text                       |48                        |100                  |Jane Doe                   |Principal Investigator          |Jane Doe             |212-123-4567  |123   |jane@mayo.com |             |Participating Site Has been Updated|
|Wake Forest      |<null>  |NY       |USA        |10101       |123                   |approved               |30-Sep-2015                 |<null>                          |<null>                    |37                   |John Doe                   |Principal Investigator          |<null>               |212-123-4567  |111   |<null>        |warning      |Address Information is Missing|
|Wake Forest      |New York|<null>   |USA        |10101       |123                   |approved               |30-Sep-2015                 |<null>                          |<null>                    |37                   |John Doe                   |Principal Investigator          |<null>               |212-123-4567  |456   |<null>        |warning      |Address Information is Missing|
|Wake Forest      |New York|NY       |<null>     |10101       |123                   |approved               |30-Sep-2015                 |<null>                          |<null>                    |37                   |John Doe                   |Principal Investigator          |<null>               |212-123-4567  |234   |<null>        |warning      |Address Information is Missing|
|Wake Forest      |New York|NY       |USA        |<null>      |123                   |approved               |30-Sep-2015                 |<null>                          |<null>                    |37                   |John Doe                   |Principal Investigator          |<null>               |212-123-4567  |345   |<null>        |warning      |Address Information is Missing|
|Wake Forest      |New York|NY       |USA        |10101       |<null>                |<null>                 |30-Sep-2015                 |comments                        |abc123                    |48                   |Sam Smith                  |Sub Investigator                |Sam Smith            |<null>        |<null>|sam@WF.com    |Error        |Participating Site Status Missing|
|MDA              |New York|NY       |USA        |10101       |<null>                |approved               |<null>                      |comments                        |123abc                    |25                   |john Smith                 |Principal Investigator          |Clinical Trial Center|1-888-123-4567|456   |CTC@mda.com   |Error        |Participating site status Date is Missing|
|Wake Forest      |New York|NY       |USA        |10101       |123                   |approved               |30-Sep-2015                 |<null>                          |<null>                    |37                   |John Doe                   |<null>                          |<null>               |212-123-4567  |567   |<null>        |warning      |Investigator Role has not been added|
|Wake Forest      |New York|NY       |USA        |10101       |123                   |approved               |30-Sep-2015                 |<null>                          |<null>                    |37                   |<null>                     |Principal Investigator          |<null>               |212-123-4567  |678   |<null>        |error        |Investigator has not been added|
|Wake Forest      |New York|NY       |USA        |10101       |123                   |approved               |30-Sep-2015                 |<null>                          |<null>                    |37                   |John Doe                   |Principal Investigator          |<null>               |<null>        |<null>|<null>        |error        |Contact Phone number or E-mail address has not been added|

Scenario: #7 Only one site contact for a participating site - investigator
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I select "set as site contact" for an investigator
Then the "set as site contact" will be cleared for other investigators
And will be cleared for the site contact

Scenario: #8 Only one site contact for a participating site - contact
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I select "set as site contact" for general contact
Then the "set as site contact" will be cleared for investigators

Scenario: #9 I view the participating site status' for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
Then the Participating Site Status's will be displayed.

Scenario: #10 I can add, edit or delete a trial Status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status History
Then I can delete any status by clinking on the delete button in the Actions column
And I can edit any status by clicking on the edit button
And I can edit a status
And I can edit the status date 
And I can enter a status comment
And I can view the trial Status warnings (same as trail status warnings)

Scenario Outline: #11 Trial Status Transition Rules - Statuszero
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed
   
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                             |   
      |STATUSZERO	                                    |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                            |   
      |STATUSZERO	                                    |In Review	                                    |			        |yes    |                                                                                                                                                                                                                                                                            |   
      |STATUSZERO	                                    |Approved	                                    |		            |yes    | WARNING: Interim status [In Review] is missing	                                                                                                                                                                                                                         |       
      |STATUSZERO	                                    |Withdrawn	                                    |Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                             |   
      |STATUSZERO	                                    |Active	                                        |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                             |   
      |STATUSZERO	                                    |Enrolling by Invitation	                    |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                             |   
      |STATUSZERO                                       |Closed to Accrual	                            |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                             |
      |STATUSZERO	                                    |Closed to Accrual and Intervention	            |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                     |
      |STATUSZERO	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                             |
      |STATUSZERO	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                         |      
      |STATUSZERO	                                    |Complete	                                    |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing|	
      |STATUSZERO	                                    |Administratively Complete	                    |Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing|	
      
Scenario Outline: #11a Trial Status Transition Rules - In Review
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed
 
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped   |Sameday |errorsWarnings	                                                                                                                                                                                                                       |
      |In Review	                                    |STATUSZERO	                                    |			       |yes     |                                                                                                                                                                                                                                      |
      |In Review	                                    |In Review	                                    |			       |yes     |ERROR: Duplicate [In Review] status is not allowed	                                                                                                                                                                                   |
      |In Review	                                    |Approved	                                    |			       |yes     |                                                                                                                                                                                                                                      |
      |In Review	                                    |Withdrawn	                                    |Add Stopped Reason|yes	    |                                                                                                                                                                                                                                      |
      |In Review	                                    |Active                                       	|			       |yes     |WARNING: Interim status [Approved] is missing                                                                                                                                                                                         |
      |In Review	                                    |Enrolling by Invitation                        |			       |yes     |WARNING: Interim status [Approved] is missing                                                                                                                                                                                         |
      |In Review	                                    |Closed to Accrual                            	|			       |yes     |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                           |
      |In Review	                                    |Closed to Accrual and Intervention	            |			       |yes     |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                   |
      |In Review	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason|yes	    |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                           |
      |In Review	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason|yes	    |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing                                                                        |
      |In Review	                                    |Complete	                                    |			       |yes     |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing           |
      |In Review	                                    |Administratively Complete	                    |Add Stopped Reason|yes	    |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	       |
      
 Scenario: #11b Trial Status Transition Rules - Approved status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed
   
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                        |
      |Approved	                                        |STATUSZERO                                   	|			        |yes    |                                                                                                                                                                                                                                                                           |
      |Approved	                                        |In Review	                                    |			        |yes    |ERROR: Invalid status transition from [Approved] to [In Review] 	                                                                                                                                                                                                    |
      |Approved	                                        |Approved	                                    |			        |yes    |ERROR: Duplicate [Approved] status is not allowed	                                                                                                                                                                                                                    |
      |Approved	                                        |Withdrawn	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Approved	                                        |Active	                                        |			        |yes    |                                                                                                                                                                                                                                                                           |
      |Approved	                                        |Enrolling by Invitation	                    |			        |yes    |                                                                                                                                                                                                                                                                           |
      |Approved	                                        |Closed to Accrual	                            |			        |yes    |WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                        |
      |Approved	                                        |Closed to Accrual and Intervention	            |			        |yes    |WARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                |
      |Approved	                                        |Temporarily Closed to Accrual  	            |Add Stopped Reason	|yes    |WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                        |
      |Approved	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                                                                                                                    |
      |Approved	                                        |Complete	                                    |			        |yes    |ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                            |
      |Approved	                                        |Administratively Complete	                    |Add Stopped Reason	|yes    |ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                              |
      
     
Scenario: #11c Trial Status Transition Rules - Withdrawn
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed

      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday   |errorsWarnings	                                                                                                                                               |
      |Withdrawn	                                    |STATUSZERO	                                    |Add Stopped Reason |yes       |                                                                                                                                                               |
      |Withdrawn	                                    |In Review	                                    |Add Stopped Reason |yes       | ERROR: Invalid status transition from [Withdrawn] to [In Review] 	                                                                                           |
      |Withdrawn	                                    |Approved                                     	|Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Approved] 	                                                                                           |
      |Withdrawn	                                    |Withdrawn	                                    |Add Stopped Reason	|yes       | ERROR: Duplicate [Withdrawn] status is not allowed	                                                                                                           |
      |Withdrawn	                                    |Active	                                        |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Active]	                                                                                               |
      |Withdrawn	                                    |Enrolling by Invitation	                    |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Enrolling by Invitation]	                                                                               |
      |Withdrawn	                                    |Closed to Accrual	                            |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual]	                                                                                   |
      |Withdrawn	                                    |Closed to Accrual and Intervention	            |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual and Intervention]                                                                     |
      |Withdrawn	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual]	                                                                       |
      |Withdrawn	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual and Intervention]                                                         |
      |Withdrawn	                                    |Complete	                                    |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Complete]	                                                                                           |
      |Withdrawn	                                    |Administratively Complete	                    |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Administratively Complete]	                                                                                                                                                                                            |
      
  
Scenario Outline: #11d Trial Status Transition Rules - Active status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed

     
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Active	                                        |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                           |
      |Active	                                        |In Review	                                    |			        |yes    | ERROR: Invalid status transition from [Active] to [In Review]	                                                                                                                                                                                                                |
      |Active	                                        |Approved	                                    |			        |yes    | ERROR: Invalid status transition from [Active] to [Approved]	                                                                                                                                                                                                                |
      |Active	                                        |Withdrawn	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Active	                                        |Active	                                        |			        |yes    | ERROR: Duplicate [Active] status is not allowed	                                                                                                                                                                                                                            |
      |Active	                                        |Enrolling by Invitation	                    |			        |yes    | ERROR: Invalid status transition from [Active] to [Enrolling by Invitation]	                                                                                                                                                                                                |
      |Active	                                        |Closed to Accrual	                            |			        |no     | WARNING: Statuses [Active] and [Closed to Accrual] have the same date                                                                                                                                                                                      |
      |Active	                                        |Closed to Accrual and Intervention             |			        |no     | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Statuses [Active] and [Closed to Accrual and Intervention] have the same date                                                                                                                |
      |Active	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|no     | WARNING: Statuses [Active] and [Temporarily Closed to Accrual] have the same date  	                                                                                                                                                                        |
      |Active	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|no     | WARNING: Statuses [Active] and [Temporarily Closed to Accrual and Intervention] have the same date                                                                                                                                                         |
      |Active	                                        |Complete	                                    |			        |yes    | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |
      |Active	                                        |Administratively Complete	                    |Add Stopped Reason	|yes    | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
     
Scenario Outline: #11e Trial Status Transition Rules - Enrolling by Invitation
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed

        
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday   |errorsWarnings	                                                                                                                                                                                                                                                                |
      |Enrolling by Invitation	                        |STATUSZERO	                                    |			        |yes       |                                                                                                                                                                                                                                                                        |
      |Enrolling by Invitation	                        |In Review	                                    |			        |yes       |  ERROR: Invalid status transition from [Enrolling by Invitation] to [In Review]	                                                                                                                                                                                                |           
      |Enrolling by Invitation	                        |Approved	                                    |			        |yes       |  ERROR: Invalid status transition from [Enrolling by Invitation] to [Approved]	                                                                                                                                                                                                |           
      |Enrolling by Invitation	                        |Withdrawn	                                    |Add Stopped Reason	|yes       |                                                                                                                                                                                                                                                                        |
      |Enrolling by Invitation	                        |Active	                                        |			        |yes       | ERROR: Invalid status transition from [Enrolling by Invitation] to [Active]                                                                                                                                                                                                    |                  
      |Enrolling by Invitation	                        |Enrolling by Invitation	                    |			        |yes       | ERROR: Duplicate [Enrolling by Invitation] status is not allowed	                                                                                                                                                                                                            |
      |Enrolling by Invitation	                        |Closed to Accrual	                            |			        |no        | WARNING: Statuses [Enrolling by Invitation] and [Closed to Accrual] have the same date                                                                                                                                                                                                                                                                        |
      |Enrolling by Invitation	                        |Closed to Accrual and Intervention             |			        |no        | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Statuses [Enrolling by Invitation] and [Closed to Accrual and Intervention] have the same date 	                                                                                                                                                                                                                        |
      |Enrolling by Invitation	                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|no        | WARNING: Statuses [Enrolling by Invitation] and [Temporarily Closed to Accrual] have the same date                                                                                                                                                                                                                                                                       |
      |Enrolling by Invitation	                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|no        | WARNING: Statuses [Enrolling by Invitation] and [Temporarily Closed to Accrual and Intervention] have the same date                                                                                                                                                                                                                                                                       |
      |Enrolling by Invitation	                        |Complete	                                    |			        |yes       | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
      |Enrolling by Invitation	                        |Administratively Complete	                    |Add Stopped Reason	|yes       | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
              |
Scenario: #11f Trial Status Transition Rules - Closed to Accrual
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed  
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Closed to Accrual	                            |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                           |
      |Closed to Accrual	                            |In Review	                                    |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [In Review]	                                                                                                                                                                                                    |
      |Closed to Accrual                                |Approved	                                    |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [Approved]	                                                                                                                                                                                                    |
      |Closed to Accrual                            	|Withdrawn	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                                    |
      |Closed to Accrual                            	|Active	                                        |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [Active]	                                                                                                                                                                                                        |
      |Closed to Accrual                            	|Enrolling by Invitation	                    |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [Enrolling by Invitation]	                                                                                                                                                                                        |
      |Closed to Accrual                            	|Closed to Accrual	                            |			        |yes    |  ERROR: Duplicate [Closed to Accrual] status is not allowed 	                                                                                                                                                                                                                |
      |Closed to Accrual                            	|Closed to Accrual and Intervention             |			        |yes    |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual	                            |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |  WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual]	                                                                                                                                                                                |
      |Closed to Accrual	                            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |  WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                |
      |Closed to Accrual	                            |Complete	                                    |			        |yes    |  WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |
      |Closed to Accrual	                            |Administratively Complete	                    |Add Stopped Reason	|yes    |  WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |
    
Scenario Outline: #11g Trial Status Transition Rules - Closed to Accrual and Intervention
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed  
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Closed to Accrual and Intervention	            |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                          |
      |Closed to Accrual and Intervention	            |In Review	                                    |			        |yes    | ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Approved	                                    |			        |yes    | ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Withdrawn	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Active	                                        |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Active]	                                                                                                                                                                                        |
      |Closed to Accrual and Intervention	            |Enrolling by Invitation	                    |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Enrolling by Invitation]	                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Closed to Accrual	                            |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Closed to Accrual]	                                                                                                                                                                            |
      |Closed to Accrual and Intervention	            |Closed to Accrual and Intervention             |			        |yes    |  ERROR: Duplicate [Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                                |
      |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                                |
      |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                 |
      |Closed to Accrual and Intervention	            |Complete	                                    |			        |yes    |                                                                                                                                                                                                                                                                        |
      |Closed to Accrual and Intervention	            |Administratively Complete	                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                        |

    
Scenario Outline : #11h Trial Status Transition Rules - Temporarily Closed to Accrual
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed  
 
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Temporarily Closed to Accrual                  	|STATUSZERO	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                            |
      |Temporarily Closed to Accrual                  	|In Review	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [In Review]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Approved	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Approved]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Withdrawn	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Active	                                        |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                                 |
      |Temporarily Closed to Accrual                  	|Enrolling by Invitation	                    |Add Stopped Reason	|yes    || 
      |Temporarily Closed to Accrual                  	|Closed to Accrual	                            |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Temporarily Closed to Accrual  	                |Closed to Accrual and Intervention             |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Temporarily Closed to Accrual                  	|Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |   ERROR: Duplicate [Temporarily Closed to Accrual] status is not allowed	                                                                                                                                                                                                        |
      |Temporarily Closed to Accrual  	                |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Temporarily Closed to Accrual  	                |Complete	                                    |Add Stopped Reason	|yes    |   ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Complete]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual  	                |Administratively Complete	                    |Add Stopped Reason	|yes    |   WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |
                |
  
      
Scenario Outline: #11i Trial Status Transition Rules - Temporarily Closed to Accrual and Intervention
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed  
    
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday  |errorsWarnings	                                                                                                                                                                                                                                                                |
      |Temporarily Closed to Accrual and Intervention	|STATUSZERO	                                    |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
      |Temporarily Closed to Accrual and Intervention	|In Review	                                    |Add Stopped Reason	|yes      |  ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Approved	                                    |Add Stopped Reason	|yes      |  ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Withdrawn	                                    |Add Stopped Reason	|yes      |  ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Active	                                        |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
      |Temporarily Closed to Accrual and Intervention	|Enrolling by Invitation	                    |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual	                            |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual and Intervention             |Add Stopped Reason	|yes      |   WARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual                  |Add Stopped Reason	|yes      |   ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                    |
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes      |   ERROR: Duplicate [Temporarily Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                    |
      |Temporarily Closed to Accrual and Intervention	|Complete	                                    |Add Stopped Reason	|yes      |   ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Complete]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Administratively Complete	                    |Add Stopped Reason	|yes      |   WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
   
 Scenario Outline: #11h Trial Status Transition Rules - Complete
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed   
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday |errorsWarnings	                                                                                                                                                                                                                                                                |
      |Complete	                                        |STATUSZERO	                                    |			        |yes     |                                                                                                                                                                                                                                                                           | 
      |Complete	                                        |In Review	                                    |			        |yes     | ERROR: Invalid status transition from [Complete] to [In Review]	                                                                                                                                                                                                            |
      |Complete                                    	    |Approved	                                    |			        |yes     | ERROR: Invalid status transition from [Complete] to [Approved]	                                                                                                                                                                                                                |
      |Complete                                    	    |Withdrawn	                                    |Add Stopped Reason	|yes     | ERROR: Invalid status transition from [Complete] to [Withdrawn]	                                                                                                                                                                                                            |
      |Complete                                    	    |Active	                                        |			        |yes     | ERROR: Invalid status transition from [Complete] to [Active]	                                                                                                                                                                                                                |
      |Complete	                                        |Enrolling by Invitation	                    |			        |yes     | ERROR: Invalid status transition from [Complete] to [Enrolling by Invitation]	                                                                                                                                                                                                |
      |Complete	                                        |Closed to Accrual	                            |			        |yes     | ERROR: Invalid status transition from [Complete] to [Closed to Accrual]	                                                                                                                                                                                                    |
      |Complete	                                        |Closed to Accrual and Intervention             |			        |yes     | ERROR: Invalid status transition from [Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                                       |
      |Complete	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes     | ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                                        |
      |Complete	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes     | ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                           |
      |Complete	                                        |Complete	                                    |			        |yes     | ERROR: Duplicate [Complete] status is not allowed	                                                                                                                                                                                                                            |
      |Complete	                                        |Administratively Complete	                    |Add Stopped Reason	|yes     | ERROR: Invalid status transition from [Complete] to [Administratively Complete]	                                                                                                                                                                                            |
      

  Scenario Outline: #11k Trial Status Transition Rules - Administratively Complete
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed   
       
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Administratively Complete	                    |STATUSZERO	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Administratively Complete	                    |In Review	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [In Review]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Approved	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Approved]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Withdrawn	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Withdrawn]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Active	                                        |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Active]	                                                                                                                                                                                                |
      |Administratively Complete	                    |Enrolling by Invitation	                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Enrolling by Invitation]	                                                                                                                                                                                |
      |Administratively Complete	                    |Closed to Accrual	                            |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual]	                                                                                                                                                                                    |
      |Administratively Complete	                    |Closed to Accrual and Intervention             |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                      |
      |Administratively Complete	                    |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                        |
      |Administratively Complete	                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual and Intervention]	                                                                                                                                                        |
      |Administratively Complete	                    |Complete	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Complete]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Administratively Complete	                    |Add Stopped Reason	|yes    |  ERROR: Duplicate [Administratively Complete] status is not allowed	                                                                                                                                                                                                            |

Scenario: #12 Delete Trial Status Comment not null
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status History
And I have selected a status to delete
And I have not entered a Comment
Then the will display the error "A comment must be entered"  

Scenario: #13 Participating sites can not be duplicated for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization <Organization name> with the Organization look up 
And the organization is already listed as a participating site for this this trial (duplicte PO ID)
Then an error message will be displayed "The participating site has already been associated with this trial"
And the duplicte participating site will not be added to this trial

Scenario: #14 I can select a Site PI from the contact page
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Contact Page
And I select the contact type "Site PI"
Then I will be able to select from a list of the Site PI's associated with this participating site
And I select a Site PI
Then the selected Site PI's Phone Number, Phone extension and e-mail address will be displayed for the contact.

Scenario: #15 I can view the Participating Site details for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I select the Particiating Site 
Then the details for the Particiating Site will be displayed (from PO Organization)

Scenario: #16 Warning when removing a Site Investigator that is used as a site contact
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Investigator Page
And a Site Investigator is also a Contact
And I delete the Site Investigator that is also a Contact
Then the system will display a warning message "The Site Investigator is also the contact for the Participating Site."

Scenario: #17 I can view the Participation Site organization for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I am on the Participating Site Page
And the list of Participating sites are displayed 
And I select a Participating Site
Then the details for the Participating Site will be displayed (from PO Organization)