  Acc @global

Feature: Acc F02 Accrual Batch Upload
As a CTRP Accrual User, I can Upload Accrual Batch file 

  
  Scenario: #1 I can Upload Accrual Batch file
    Given I am logged into the CTRP Accrual Application 
    And I am on the Accrual Batch Upload screen
    And the message "Click Browse and select the ZIP or TXT file that contains the accrual data. Then click Submit." is displayed
    And "No file selected" will be displayed next to the Browse button for the Batch File
     When I click on the browse button to select the ZIP ot TXT file that contains the accrual data
     And I click on the Submit button
     Then the ZIP or TXT file that contains the accrual data will be entered in the Batch acrrual processes
     And the message "File Successfully Uploaded - Currently being processed. Email will be received when Processing is complete." will be displayed
     And an email......
    
  Scenario:#2 I must upload a ZIP OR TXT file that contains the accrual data 
    Given I am on the Accrual Batch Upload screen
     When the selected file that contains the accrual data is not a ZIP or TXT file
     Then the error "The batch upload file must be either a plain text file or a zip file." will be displayed
      When the user doesn't upload a file 
      Then the error "Please select a valid file to upload."

  

