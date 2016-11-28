@PA @global
Feature: PAA F10 Add and Edit Trial Related Documents  

As any CTRP PA User, I can add and edit Trial Related Documents

Scenario: #1 I can add Trial Related Documents 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select add a document
And have browsed and selected file to attach
And have selected the Document type from the list of:
|- Please select a document type ...|
|Change Memo Document|
|Complete Sheet|
|IRB Approval|
|Informed Consent|
|List of Participating Sites|
|Other|
|Protocol Document|
|Protocol Highlighted Document|
|TSR|
And have entered a Description of the Document when the document type is Other
Then the Trial Related Document will be associated with the trail
And the date the document was will be listed with the document 
And the users name that added the document will be listed with the document
And the document will be ordered by date with the newest document first

Scenario: #2 I can Edit(revise) the file name for a Trial Related Document 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select add a document
And have browsed and selected file to attach
And have selected the Document type from the list of:
|- Please select a document type ...|
|Change Memo Document|
|Complete Sheet|
|IRB Approval|
|Informed Consent|
|List of Participating Sites|
|Other|
|Protocol Document|
|Protocol Highlighted Document|
|TSR|
And have entered a Description of the Document when the document type is Other
Then the Trial Related Document will be associated with the trail
And the date the document was will be listed with the document
And the users name that added the document will be listed with the document
When I select Edit a Trial Related Document
And have browsed and selected a new file to attach
And have entered a Description of the Document when the document type is Other
Then the Trial Related edited Document will be associated with the trail
And the date the document was will be listed with the document 
And the users name that added the document will be listed with the document
And the prior file will be annotated as Revised

Scenario: #3 I can Delete Trial Related Documents 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select add a document
And have browsed and selected file to attach
And have selected the Document type from the list of:
|- Please select a document type ...|
|Change Memo Document|
|Complete Sheet|
|IRB Approval|
|Informed Consent|
|List of Participating Sites|
|Other|
|Protocol Document|
|Protocol Highlighted Document|
|TSR|
And have entered a Description of the Document when the document type is Other
Then the Trial Related Document will be associated with the trail
And the date the document was will be listed with the document
And the users name that added the document will be listed with the document
And I select one or more documents to delete
And enter a comment for why the document is deleted
Then the Trial Related Document will not be visible on the Trial Related Documents screen
And the file will be annotated as Deleted

Scenario: #4 Save Trial Related Documents
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When select save documents
Then the information entered or edited on the Trial Related Documents screen will be saved to the trial record

Scenario: #6 Cancel Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select Reset documents
Then the information entered or edited on the Trial Related Documents screen will not be saved to the trial record 
And the Trial Related Document screen will be refreshed with the existing data

Scenario: #7 I can Not Delete the Protocol, IRB Approval Documents and Change Memo Documents
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select Delete one or more documents
And have selected a document with a type of :
|Protocol Document|
|IRB Approval|
|Change Memo Document|
Then the system will display a Error message that the Protocol Document and or IRB Approval Document cannot be deleted

Scenario: #8 Valid Document Formats 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select a document to add
And the document is not one of the valid extensions listed below
|Pdf|
|Doc|
|docx|
|docm|
|Xls|
|xlsx|
|xlsm|
|xlsb|
|Rtf|
|Txt|
Then the system will display a Error message that "The selected document is not a valid document type"

Scenario: #9 Protocol and IRB Approval Documents are required
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
Then the following docuuments will be required
|Protocol Document|
|IRB Approval|

Scenario: #10 Mutliple documents of the same type 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I add a new document
And I have selected the Document type from the list of:
|Protocol Document|
|IRB Approval|
|Informed Consent|
|List of Participating Sites|
|Protocol Highlighted Document|
And select save on the trial related documents screen
And there is already a Document type from the list of:
|Protocol Document|
|IRB Approval|
|Informed Consent|
|List of Participating Sites|
|Protocol Highlighted Document|
Then the system displays a Error message that "Error: The selected document type already exists."
@runthis
Scenario: #11 View Trial Related Documents 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
Then I can see Document that have the following types:
|Protocol Document|
|IRB Approval|
|Informed Consent|
|Protocol Highlighted Document|
|List of Participating Sites|
|TSR|
|Complete Sheet|
|Change Memo Document|
|Other|