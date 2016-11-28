@Global @Reg
Feature: Reg F11 Register Trial Dates and Trial Status

  As a CTRP User, I can register a trial's key dates and trial status

  Scenario Outline: #1 Trial Status Transition Rules for Status Zero
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be there 
    
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
      
      Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
  
      
      Scenario Outline: #1a Trial Status Transition Rules for In Review Status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
   
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
      
   Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
  
   
  Scenario Outline: #1b Trial Status Transition Rules for Approved status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
      
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
      
     Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
    
       
  Scenario Outline: #1c Trial Status Transition Rules for Withdrawn status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
      
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
      
      Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
  
  

  Scenario Outline: #1d Trial Status Transition Rules for Active status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
      
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
     
     Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

       Scenario Outline: #1e Trial Status Transition Rules for Enrolling by Invitation Status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
      
      
      
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
     Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

      
 Scenario Outline: #1f Trial Status Transition Rules for Closed to Accrual Status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
      
      
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
     Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
  
      Scenario Outline: #1g Trial Status Transition Rules for Closed to Accrual and Intervention Status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
     
     
     
     
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
      Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
  
     
      Scenario Outline: #1h Trial Status Transition Rules for Temporarily Closed to Accrual status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
     
     
      
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
      Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
  
      
       Scenario Outline: #1i Trial Status Transition Rules for Temporarily Closed to Accrual and Intervention status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
      
      
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
      
      Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
  
      
      
      
      Scenario Outline: #1j Trial Status Transition Rules for Complete status
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
      
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
      
    
   Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
  
      
      Scenario Outline: #1k Trial Status Transition Rules Administratively Complete
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday>  the respective checks <errorsWarnings> will be there 
    
    
      
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

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #2 I can enter a trial status and trial status date for a trial; valid transitions
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a <status date> and status transitions from <statusTransitions>
      |status date                                                      | statusTransitions                                    |
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Withdrawn'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Withdrawn'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual and Intervention' TO 'Enrolling by Invitation' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual and Intervention' TO 'Active' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Enrolling by Invitation' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Active' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|

    Then no errors-warnings will be displayed

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline:#2a I can enter a trial status and trial status date for a trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial date <statusDateFrom> and trial status from <statusFrom> to trial date <statusDateTo> trial status <statusTo> with the <condition> then the respective checks <errorsWarnings> will be there
      |statusDateFrom   |statusFrom                                       |statusDateTo                 |statusTo                                          |condition                                                                                                                  |errorsWarnings                                                  |
|Date Entered Now |Approved                                       |Same Date entered later      |In Review                                      |                                                                                                                           |ERROR: Invalid status transition from [Approved] to [In Review]       |
|Date Entered Now |In Review                                      |Same Date entered later      |Approved                                       |                                                                                                                           |                                                                 |
|Date Entered past|Approved                                       |Date entered Now             |In Review                                      |                                                                                                                           |ERROR: Invalid status transition from [Approved] to [In Review]       |
|Date Entered past|In Review                                      |Date entered Now             |Approved                                       |                                                                                                                           |                                                                   |
|Date Entered Now |Active                                         |Same Date entered later      |Temporarily Closed to Accrual                  |all the previous Status before Active has been added                                                                       |WARNING: Statuses [Active] and [Temporarily Closed to Accrual] have the same date  |
|Date Entered past|Active                                         |Date Entered Now             |Temporarily Closed to Accrual                  |all the previous Status before Active has been added                                                                       |                                                                 |
|Date Entered Now |Temporarily Closed to Accrual                  |Same Date entered later      |Active                                         |all the previous Status before Active including Active before Temporarily Closed to Accrual has been added                 |                                                                 |
|Date Entered Now |Temporarily Closed to Accrual                  |Same Date entered later      |Active                                         |all the previous Status before Active has been added                                                                       |WARNING: Interim status [Active] is missing                      |
|Date Entered Now |Active                                         |Same Date entered later      |Temporarily Closed to Accrual and Intervention |all the previous Status before Active has been added                                                                       |WARNING: Statuses [Active] and [Temporarily Closed to Accrual and Intervention] have the same date |
|Date Entered past|Active                                         |Date Entered Now             |Temporarily Closed to Accrual and Intervention |all the previous Status before Active has been added                                                                       |                                                                 |
|Date Entered Now |Temporarily Closed to Accrual and Intervention |Same Date entered later      |Active                                         |all the previous Status before Active including Active before Temporarily Closed to Accrual and Intervention has been added|                                                                 |
|Date Entered Now |Temporarily Closed to Accrual and Intervention |Same Date entered later      |Active                                         |all the previous Status before Active has been added                                                                       |WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual]|
|Date Entered Now |Active                                         |Same Date entered later      |Closed to Accrual                              |all the previous Status before Active has been added                                                                       |WARNING: Statuses [Active] and [Closed to Accrual] have the same date                     |
|Date Entered past|Active                                         |Date Entered Now             |Closed to Accrual                              |all the previous Status before Active has been added                                                                       |                                                                 |
|Date Entered Now |Closed to Accrual                              |Same Date entered later      |Active                                         |all the previous Status before Active including Active before Closed to Accrual has been added                             |ERROR: Invalid status transition from [Closed to Accrual] to [Active] |
|Date Entered Now |Closed to Accrual                              |Same Date entered later      |Active                                         |all the previous Status before Active has been added                                                                       |ERROR: Invalid status transition from [Closed to Accrual] to [Active]                     |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline:#3 Order of Trial status list
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I click on the Trial status list
    Then the order of trial status list should be
      |In Review                                      |
      |Approved                                       |
      |Active                                         |
      |Enrolling by Invitation                        |
      |Temporarily Closed to Accrual                  |
      |Temporarily Closed to Accrual and Intervention |
      |Closed to Accrual                              |
      |Closed to Accrual and Intervention             |
      |Complete                                       |
      |Administratively Complete                      |
      |Withdrawn                                      |


    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline:#3a Validation rule for Trial status fields
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen 
    When I click on Review Trial without any Trial Status
    Then I should get an error message as "Trial Status is Required"
    And On Add Trial Status if Status Date or Status is missing
    Then I should get an error message as "Status Date and Status are Required"
    And On Add Trial Status when the Status selected is
      |Temporarily Closed to Accrual                  |
      |Temporarily Closed to Accrual and Intervention |
      |Withdrawn                                      |
      |Administratively Complete  |                    
    And Why Study Stopped reason is not provided
    Then I should get an error message as "Status Date, Status and Why Study Stopped are Required"

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline:#3b Validation rule for Trial status Dates
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I select a Status Date in Past
    Then It should not give any error message for status date
    And the added date format should be DD-MMM-YYYY format
    When I select a Status Date in Today
    Then It should not give any error message for status date
    And the added date format should be DD-MMM-YYYY format
    When I select a Status Date in Future
    Then It should give an error message for future status date

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #4 I can add and delete a trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When When I add a trial status
    Then a new trial status will appear in the Trial Status History
    When I click on the delete button in the Actions column for a selected status
    Then Please provide a comment box will be displayed
    And I must provide a comment explaining why deleting this trial status
    When the comment is entered in the provided box
    And click on the delete button
    Then the selected status will be marked as deleted
    And the record will be deleted after the trial is submitted

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #5 I can enter a Trial Dates as either Actual or Anticipated
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Section
    And I must enter Trial Dates values type
      |Trial Start Date  |
      |Primary Completion Date  |
      |Completion Date  |
      
   And the added date format should be DD-MMM-YYYY format

    And I must Select Trial Date type for every Trial Date value
      |Actual  |
      |Anticipated  |
    When I have clicked on the review button
    Then no errors should be displayed

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline:#6 Trial Dates Mandatory Fields
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Section
    When I have not entered a Trial Date values for
      |Trial Start Date  |
      |Primary Completion date |
      |Completion Date|
    
    Then an error message type will be displayed
    
      |Trial Start Date is Required  |
      |Primary Completion Date is Required  |
      |Completion Date is Required  |

    
    When I have not entered a Trial Date type for the mandatory Trial Dates
      |Actual |
      |Anticipated  |
    Then the error message type will be displayed
      
      |Trial Start Date Type is Required  |
      |Primary Completion Date Type is Required  |
      |Completion Date Type is Required  |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #7a Rules for Status/Dates relationships for "Trial Start Date"
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Section
    When Current Trial Status is <TrialStatusType> then for the "Trial Start Date" below rules for "Actual" <DateTypeActual> along with the error <DateTypeActualError> should be there
      |TrialStatusType                                  |DateTypeActual                       | DateTypeActualError       |
      |In Review                                        |allowed                              |                           |
      |Approved                                         |allowed                              |                           |
      |Active                                           |allowed                              |                           |
      |Enrolling by Invitation                          |allowed                              |                           |
      |Closed to Accrual                                |allowed                              |                           |
      |Closed to Accrual and Intervention               |allowed                              |                           |
      |Temporarily Closed to Accrual                    |allowed                              |                           |
      |Temporarily Closed to Accrual and Intervention   |allowed                              |                           |
      |Withdrawn                                        |allowed                              |                           |
      |Administratively Complete                        |allowed                              |                           |
      |Complete                                         |allowed                              |                           |
    When Current Trial Status is <TrialStatusType> then for the "Trial Start Date" below rules for "Anticipated" <DateTypeAnticipated> along with the error <DateTypeAnticipatedError> should be there
      |TrialStatusType                                  |DateTypeAnticipated                | DateTypeAnticipatedError|
      |In Review                                        |allowed                            |                           |
      |Approved                                         |allowed                            |                           |
      |Active                                           |not allowed                        |If current Trial Status is Active, Trial Start Date must be Actual                          |
      |Enrolling by Invitation                          |not allowed                        |If current Trial Status is Enrolling by Invitation, Trial Start Date must be Actual                            |
      |Closed to Accrual                                |not allowed                        |If current Trial Status is Closed to Accrual, Trial Start Date must be Actual                            |
      |Closed to Accrual and Intervention               |not allowed                        |If current Trial Status is Closed to Accrual and Intervention, Trial Start Date must be Actual                             |
      |Temporarily Closed to Accrual                    |not allowed                        |If current Trial Status is Temporarily Closed to Accrual, Trial Start Date must be Actual                            |
      |Temporarily Closed to Accrual and Intervention   |not allowed                        |If current Trial Status is Temporarily Closed to Accrual and Intervention, Trial Start Date must be Actual                             |
      |Withdrawn                                        |allowed                            |                             |
      |Administratively Complete                        |not allowed                        |If current Trial Status is Administratively Complete, Trial Start Date must be Actual                             |
      |Complete                                         |not allowed                        |If current Trial Status is Complete, Trial Start Date must be Actual                             |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #7b Rules for Status/Dates relationships for "Primary Completion Date"
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Section
    When Current Trial Status is <TrialStatusType> then for the "Primary Completion Date" below rules for "Actual" <DateTypeActual> along with the error <DateTypeActualError> should be there
      |TrialStatusType                                |DateTypeActual                       | DateTypeActualError     |
      |In Review                                      |allowed                              |                           |
      |Approved                                       |allowed                              |                           |
      |Active                                         |allowed                              |                           |
      |Enrolling by Invitation                        |allowed                              |                           |
      |Closed to Accrual                              |allowed                              |                           |
      |Closed to Accrual and Intervention             |allowed                              |                           |
      |Temporarily Closed to Accrual                  |allowed                              |                           |
      |Temporarily Closed to Accrual and Intervention |allowed                              |                           |
      |Withdrawn                                      |allowed                              |                           |
      |Administratively Complete                      |allowed                              |                           |
      |Complete                                       |allowed                              |                           |
    When Current Trial Status is <TrialStatusType> then for the "Primary Completion Date" below rules for "Anticipated" <DateTypeAnticipated> along with the error <DateTypeAnticipatedError> should be there
      |TrialStatusType                                |DateTypeAnticipated               | DateTypeAnticipatedError|
      |In Review                                      |allowed                           |                           |
      |Approved                                       |allowed                           |                           |
      |Active                                         |allowed                           |                           |
      |Enrolling by Invitation                        |allowed                           |                           |
      |Closed to Accrual                              |allowed                           |                           |
      |Closed to Accrual and Intervention             |allowed                           |                           |
      |Temporarily Closed to Accrual                  |allowed                           |                           |
      |Temporarily Closed to Accrual and Intervention |allowed                           |                           |
      |Withdrawn                                      |allowed                           |                           |
      |Administratively Complete                      |not allowed                       |If current Trial Status is Administratively Complete, Primary Completion Date must be Actual                             |
      |Complete                                       |not allowed                       |If current Trial Status is Complete, Primary Completion Date must be Actual                             |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #7c Rules for Status/Dates relationships for "Completion Date"
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Section
    When Current Trial Status is <TrialStatusType> then for the "Completion Date" below rules for "Actual" <DateTypeActual> along with the error <DateTypeActualError> should be there
      |TrialStatusType                                |DateTypeActual                       | DateTypeActualError    |
      |In Review                                      |not allowed                          |If current Trial Status is In Review, Completion Date must be Anticipated                           |
      |Approved                                       |not allowed                          |If current Trial Status is Approved, Completion Date must be Anticipated                           |
      |Active                                         |not allowed                          |If current Trial Status is Active, Completion Date must be Anticipated                          |
      |Enrolling by Invitation                        |not allowed                          |If current Trial Status is Enrolling by Invitation, Completion Date must be Anticipated                      |
      |Closed to Accrual                              |not allowed                          |If current Trial Status is Closed to Accrual, Completion Date must be Anticipated                          |
      |Closed to Accrual and Intervention             |not allowed                          |If current Trial Status is Closed to Accrual and Intervention, Completion Date must be Anticipated                          |
      |Temporarily Closed to Accrual                  |not allowed                          |If current Trial Status is Temporarily Closed to Accrual, Completion Date must be Anticipated                           |
      |Temporarily Closed to Accrual and Intervention |not allowed                          |If current Trial Status is Temporarily Closed to Accrual and Intervention, Completion Date must be Anticipated                      |
      |Withdrawn                                      |not allowed                          |If current Trial Status is Withdrawn, Completion Date must be Anticipated                           |
      |Administratively Complete                      |allowed                              |                           |
      |Complete                                       |allowed                              |                           |
    When Current Trial Status is <TrialStatusType> then for the "Completion Date" below rules for "Anticipated" <DateTypeAnticipated> along with the error <DateTypeAnticipatedError> should be there
      |TrialStatusType                                |DateTypeAnticipated                  | DateTypeAnticipatedError|
      |In Review                                      |allowed                              |                           |
      |Approved                                       |allowed                              |                           |
      |Active                                         |allowed                              |                           |
      |Enrolling by Invitation                        |allowed                              |                           |
      |Closed to Accrual                              |allowed                              |                           |
      |Closed to Accrual and Intervention             |allowed                              |                           |
      |Temporarily Closed to Accrual                  |allowed                              |                           |
      |Temporarily Closed to Accrual and Intervention |allowed                              |                           |
      |Withdrawn                                      |allowed                              |                           |
      |Administratively Complete                      |not allowed                          |If current Trial Status is Administratively Complete, Completion Date must be Actual                           |
      |Complete                                       |not allowed                          |If current Trial Status is Complete, Completion Date must be Actual                           |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

Scenario Outline: #8 Rules for Study Date types
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Screen
    When the Trial date is in the past
    Then the Trial date type must be actual
    When  the Trial date is today
    Then the Trial Date type could be actual
    And the Trial date Type could be anticipated
    When the Trial date is in the future
    Then the Trial date type must always be anticipated

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline: #9 general rules for Study Date values are as follows
  Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Screen
    And The Trial Start Date can be in the past, present, or future
    And The Primary Completion Date is always the same as, or later than, the Trial Start Date
    And The Completion Date is always the same as, or later than, the Primary Completion Date
    
    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
    
      Scenario Outline: #10 Rule for Character length for Trial Status section 
  Given I have selected the option to register a trial <trialType>
  And I am on the Trial Status Section
  Then a comment appears below the field to display the number of characters available to enter into the field
    | Field                                             | Number of Characters left       |
    | Why Study Stopped                                 | 160 characters left             |
    | Comment                                           | 160 characters left             |

  And "x characters left" will be displayed as characters are added
  When all the characters mentioned above for field have been entered
  Then no additional text can be entered

  Examples:
    |trialType  |
    |National                 |
    |Externally Peer-Reviewed |
    |Institutional            |

   



     
     

 
   
   

 
  

