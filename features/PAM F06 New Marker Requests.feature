@Admin @Global 
Feature: PAM F06 New Marker Requests 

As a Research Scientist, I can manage New Marker Requests

Scenario: #1 I can Search for a new Marker request in the list of pending requests
Given I am logged into CTRP PA Application
When I select the option "New Marker Requests"
Then the "Pending Markers Report Marker Search" screen display
And I can Enter a CTRP ID
And I can Enter a Marker Name
When I Select the Search Button
And the CTRP ID or Marker Name is not in the list
Then the Nothing found message displays
| Message.   Nothing found to display |
When either the CTRP ID or the Marker Name is on the list
Then the Marker Search Results table displays

      | CTRP ID with link to the study in CTRP and link to the protocol document |
      | Marker Name|
      | Term Request |
      | caDSR Public ID |
      | Action with Accept button |

Scenario: #2 CTRP ID links
Given I am on the "Pending Markers Report:  Marker Search" screen 
When I click on a CTRP ID 
Then the Marker screen for the selected CTRP study displays
When I click on the protocol document icon for a specific CTRP ID
Then the protocol document displays

Scenario: #3 I can Reset a Marker Search
Given I am on the "Pending Markers Report:  Marker Search" screen 
And I have entered a CTRP ID
And I have entered a Marker Name
When I click on the Reset button 
Then the Marker Search screen is refreshed for a new search 

Scenario: #4 I can submit caDSR Search                          
Given I am on the "Pending Markers Report:  Marker Search" screen 
When I click on the caDSR Search button 
Then the Marker Search in caDSR screen displays
|Case-Sensitive Search|
|Highlight Query Text|
|Search Scope|
|Search Term|
|Public ID (exact match)|
|Search button|
|Reset button|
|Cancel button|

Scenario:  #5 Select Name from caDSR
Given I am on the Marker Search in caDSR screen 
And Case-Sensitive Search is defaulted to No
And Highlight Query Text is defaulted to Yes
And Search Scope is defaulted to Both
When I have entered a Search Term 
And I can enter a Public Id
And I have selected the Search button
Then a results table type will be displayed
|Permissable Value|
|  Meaning |
|Marker Synonym  |
| Description  | 
| Public ID |

Scenario:  #6 Missing Name and Public ID in caDSR Marker Search screen
Given I am on the Marker Search in caDSR screen
When I have not entered a Search Term
And I have not entered a Public ID
And I click the Search button 
Then the error message "At least one search criteria is required" displays

Scenario:  #7 Case Sensitive Search on caDSR search screen
Given I am on the Marker Search in caDSR screen
When I have selected Yes for Case-Sensitive Search
And I have entered a Search Term
When I click Search button
Then a results table displays with markers with the exact case sensitive match on the search term
When I have selected No for Case-Sensitive Search 
And I have entered a Search Term
When I click Search button
Then a results table displays with markers that do not indicate case on the search term


Scenario:  #8 Select Search Scope in caDSR Marker Search screen
Given I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I have selected Primary Term for Search Scope
And I select the Search button
Then a results table displays with Permissable Value that matched the search term 
When I have selected Synonym for Search Scope
And I select the Search button
Then a results table displays with Marker Synonym field that matched the search term 
When I have selected Both for Search Scope
And I select the Search button
Then a results table displays with both Permissable Value and Marker Synonym fields displaying search term


Scenario:  #9 Highlight Query Text in caDSR Marker Search screen
Given I am on the Add Marker screen
And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I select <Highlight Query Text> 
And I select the search button
Then the <Search Term in the results table>

|highlight Query Text |  Search Term result in the results table|
| yes                 | Search term is highlighted 
| No                  | Search term is not highlighted

Scenario:  #10 Enter Public ID in caDSR Marker Search screen
Given I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I enter a valid_Public_ID
And there is a match in caDSR
Then the exact match of the Public ID will be displayed in the result table
When I enter an invalid Publid ID
And there is no match in caDSR
Then a 'Nothing found to display' message is displayed
Example:
|Valid_Public_ID|
|5044197|
|3589771|


Scenario: #11  I can submit a Term Request
Given I am on the "Pending Markers Report:  Marker Search" screen 
And I have selected a CTRP ID/ Marker Name 
When I click on the Term Request Form button
Then the Create Permissable Value Request form type displays

      | CTRP ID | populated |
      |To email	  |populated  |
      | Sender's email |populated  |
      |Marker Name |populated |
      |Found in Hugo   |checkbox |  
      |HUGO| Link to HUGO|
      |Text of marker as written in the protocol| text box|
And I can change the Marker Name
When I check "Found in Hugo"
Then Hugo Marker Code fied will be displayed
And I must enter Hugo Marker Code 
And I can enter "Text of marker as written in the protocol"
When I click Send Email button
Then NCI CTRP: CTRP REQUEST for NEW PERMISSABLE VALUES email is generated
And Pending Markers Report:  Marker Search screen displays
And Term Request displays Date_time type
Example:
|Date_time|
|2016-02-16 11:46:37|
When I click Cancel button
Then Pending Markers Report:  Marker Search screen displays
And Term Request button is present
And no updates have been made


Scenario: #12 I can accept a Marker Name 
Given I am on the "Pending Markers Report:  Marker Search" screen 
WhenI have selected a CTRP ID/ Marker Name 
And I have entered a valid caDSR Public ID
And I click on the Accept button
Then the Marker Search in caDSR screen displays with the following
|Permissable Value|
|Meaning|
|Description|
|Proceed with the change button|
|Cancel button|
When I click "Proceed with the change" button
Then the "Pending Markers Report:  Marker Search" screen displays with the accepted CTRP ID/Marker Name row removed
And the Marker screen for the CTRP study has been updated with the accepted marker Name and the Record Status is "Active"
When I click the "Cancel" button
Then the Marker screen for the CTRP study won't be updated with the Name and the Record Status will remain "Pending"



Scenario: #12 I can accept a Marker Name for a term request
Given I am on the "Pending Markers Report:  Marker Search" screen 
WhenI have selected a CTRP ID/ Marker Name  
And I have entered a valid caDSR Public ID
And I click on the Accept button
Then the Marker Search in caDSR screen displays with the following
|Permissable Value|
|Meaning|
|Description|
When I click "Proceed with the change" button
Then the "Pending Markers Report:  Marker Search" screen displays with the accepted CTRP ID/Marker Name row removed
And the Marker screen for the CTRP study has been updated with the Name and the Record Status is "Active'
When I click "Cancel" button
Then "Pending Markers Report:  Marker Search" screen displays 
And the Marker screen for the CTRP study won't be updated with the Name and the Record Status will remain "Pending"



Scenario: #13 I accept a Marker Name with an invalid caDSR Public ID
Given I am on the "Pending Markers Report:  Marker Search" screen 
When I have selected a CTRP ID/ Marker Name 
And I have entered an invalid caDSR Public ID
And I click on the Accept button
Then the Public_ID_not_found message displays
|Message No match found in caDSR with the Public ID entered|
When I click the OK button