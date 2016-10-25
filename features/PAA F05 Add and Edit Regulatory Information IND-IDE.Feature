@PA @global
Feature: PAA F05 Add and Delete Regulatory Information IND-IDE

As any CTRP PA User, I can add and delete Regulatory Information (IND/IDE)

Scenario: #1 I can indicate that the trial does not have an associated IND or IDE
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information (IND/IDE) screen
When I have selected "No" where the question "Does this trial have an associated IND/IDE?"
Then the IND/IDE Information section will allow the entry of an IND/IDE for this trial

Scenario: #2 I can add and edit Regulatory IND or IDE Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information (IND/IDE) screen
And I have selected "Yes" where the question "Does this trial have an associated IND/IDE?"
When selected the IND/IDE Type from a list (Required)
|-Select-|
|IND|
|IDE|
And entered the IND/IDE number (Required)
And selected the IND/IDE Grantor from a list based on IND or IDE selected (Required)
|IND:-Select-,CDER,CBER|
|IDE:-Select-,CDRH,CBER|
And selected the IND/IDE Holder Type from a list (Required)
|-Select-|
|Investigator|
|Organization|
|Industry|
|NIH|
|NCI|
And selected the NCI Division/Program  from a list (Required when IND/IDE Holder Type is "NIH" or "NCI")
|NIH Values Below:|
|NEI-National Eye Institute|
|NHLBI-National Heart, Lung, and Blood Institute|
|NHGRI-National Human Genome Research Institute|
|NIA-National Institute on Aging|
|NIAA-National Institute on Alcohol Abuse and Alcoholism|
|NIAID-National Institute of Allergy and Infectious Diseases|
|NIAMS-National Institute of Arthritis and Musculoskeletal and Skin Diseases|
|NIBIB-National Institute of Biomedical Imaging and Bioengineering|
|NICHD-NICHD-Eunice Kennedy Shriver National Institute of Child Health and Human Development|
|NIDA-National Institute on Drug Abuse|
|NIDCD-National Institute on Deafness and Other Communication Disorders|
|NIDCR-National Institute of Dental and Craniofacial Research|
|NIDDK-National Institute of Diabetes and Digestive and Kidney Diseases|
|NIEHS-National Institute of Environmental Health Sciences|
|NIGMS-National Institute of General Medical Sciences|
|NIMH-National Institute of Mental Health|
|NINDS-National Institute of Neurological Disorders and Stroke|
|NINR-National Institute of Nursing Research|
|NLM-National Library of Medicine|
|CIT-Center for Information Technology|
|CSR-Center for Scientific Review|
|FIC-John E. Fogarty International Center for Advanced Study in the Health Sciences|
|NCCAM-National Center for Complementary and Alternative Medicine|
|NCMHD-National Center on Minority Health and Health Disparities|
|NCRR-National Center for Research Resources (NCRR)|
|CC-NIH Clinical Center|
|OD-Office of the Director|
|NCI Values Below:|
|CCR|
|CCT/CTB|
|CIP|
|CDP|
|CIP|
|CTEP|
|DCB|
|DCCPS|
|DCEG|
|DCP|
|DEA|
|DTP|
|OD|
|OSB/SPOREs|
|RRP|
|TRP|
|N/A|
Then the IND/IDE Information for the trial will be associated with the trial

Scenario: #3 I can add and edit Regulatory IND and IDE information for multiple IND or IDE registrations for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information (IND/IDE) screen
And I have selected "Yes" for the IND/IDE question "Does this trial have an associated IND/IDE?"
When I entered the information for an IND or IDE
Then I am able to select "Add IND/IDE" and enter the information for multiple IND/IDEs

Scenario: #4 I can remove Regulatory IND and IDE information for one or more IND or IDE registrations for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information (IND/IDE) screen
When I have selected the IND or IDE
Then I am able to remove the IND or IDE information for one or more INDs or IDEs

Scenario: #5 Save Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information (IND/IDE) screen
When select save to save (IND/IDE) screen
Then the information entered or edited on the Regulatory Information (IND/IDE) screen will be saved to the trial record

Scenario: #6 Cancel Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information (IND/IDE) screen
When I select Reset to not save (IND/IDE) screen
Then the information entered or edited on the Regulatory Information (IND/IDE) screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario Outline: #7 Regulatory IND or IDE Information must be complete
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information (IND/IDE) screen
And I have selected conditions for the question <Does this trial have an associated IND or IDE>
When selected values the <IND IDE Type>
And entered the <IND IDE number>
And I am able to select Grantor as <IND IDE Grantor>
And I am able to select Holder Type as <IND IDE Holder Type>
And I am able to select NCI Division /Program as <NCI Division / Program>
And selected Save
Then the system will display an Error <Message> that each of values that were not entered must be entered in order to associate the IND/IDE Information for the trial

Examples:
|Does this trial have an associated IND or IDE|IND IDE Type |IND IDE number|IND IDE Grantor|IND IDE Holder Type |NCI Division/Program|Message|
|No|null|null|null|null|null|null|
|Yes|IND|77782|CDER|Investigator|null|null|
|Yes|IND|77782|CDER|NCI|CTEP|null|
|Yes|IND|77782|CDER|NIH|NLM-National Library of Medicine|null|
|Yes|IND|77782|CDER|null|null|Error - The IND IDE Holder Type is Required|
|Yes|IND|77782|null|NCI|CTEP|Error - The IND IDE Grantor is Required|
|Yes|IND|null|CDER|NCI|CTEP|Error - The IND IDE number is Required|
|Yes|IND|77782|null|null|null|Error - The IND IDE Grantor, The IND IDE Holder Type are Required |
|Yes|IND|77782|CDER|NCI|null|Error - The NCI Division/Program is Required|
|Yes|null|77782|null|null|null|Error - The IND/IDE Type, IND Grantor, IND IDE Holder Type are Required|








