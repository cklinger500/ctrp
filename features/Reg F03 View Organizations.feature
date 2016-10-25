@Global @Reg
Feature: Reg F03 View Organizations

As a Trial Submitter or a Site Admin, I am able to View Organizations


     Scenario: #1 AS a Trial Submitter or a Site Admin I am able to View organizations 
    Given I am a CTRP user with the the Role Type
     
     |Trial Submitter|
     |Site Administrator|
     
    And I am logged into the CTRP Registration application
    And the following parameters of an Organization exist:
    |CTRPID |Name|SourceContext|SourceID|SourceStatus|NameAlias|Address1|Address2|Country|State|City|PostalCode|Email|Phone|FamilyName|
    |9999999|SopNameCancer RegF03vw|CTRP|999999|Active|SopAlias |SopAddress1|SopAddress2|USA|VA|SopCity|22306|SopPercukeTrial@pr.com|420-999-8906|SopFamilies|
    And I have completed an organization search 
    And the Organization search screen displays field type
    
      |CTRP ID  |
      |CTEP ID  |
      |Name (Hyperlink to Org Details)  |
      |Source Status  |
      |Source Context  |
      |Source ID  |
      |Family Name  |
      |Phone   |
      |Email |
      |City  |
      |State  |
      |Country  |
      |Postal Code  |

    When I click on the organization name from the results table 
    Then the View Organization screen opens with the page title as "View Organization"
    And I will be able to view organizations in all context type
    
    |CTRP|
    |CTEP|
    |NLM|
    
   When I am on the CTRP tab
   Then I will be able to view Organization details type 
    
    
      |CTRPID  |999999  |
      |Name  |SopNameCancer  RegF03vw|
      |SourceContext  |CTRP  |
      |SourceID  |999999  |
      |SourceStatus  |Active  |
      |NameAlias  |SopAlias  |  
      |Address1  |SopAddress1|
      |Address2  |SopAddress2  |
      |Country  |USA  |
      |State  |Alexandria  |
      |City  |SopCity  |
      |PostalCode  |22306  |
      |Email  |SopPercukeTrial@pr.com  |
      |Phone: Extension  |420-999-8906: 4567  |
      |FamilyName  |SopFamilies  |
     
    And I can view organization details type once on the CTEP tab
    
    |Source Context: CTEP|
    |CTRP Organization ID|
    |Source ID|
    |CTEP Organization Type|
    |CTEP Organization Status|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State|
    |Postal Code|
    |Country|
    |Email|
    |Phone|
    |Funding Mechanism|
    
    And I can view organization details type once on the NLM tab
    
     |Source Context: NLM|
    |CTRP Organization ID|
    |Name: Sponsor Name|
    |Source Status: Active|
   
  And I should not be allowed to edit organization parameters
And I should not view, edit or delete comments added by curators
And the following button type should also be invisible to the user

      
      |Reset Button  |
      |Save Button  |

When I click on Family Name Link
Then I will view family details type

      |Family Name  |
      |Family Status  |
      |Family Type  |
      |Membership Size  |

And I will view Organization details type

      |CTRPID  |
      |CTEPID|
      |Organization Name  |
      |Relationship  |
      |Effective Date  |
      |Expiration Date  |
      

And family detail might include all Organization statuses type

      |Active|
      |Inactive  |
      |Pending  |
      |Nullified  |
      

And user can click to view details of these Organizations
And Once on Family View page, user can also Search for another Family by going to Search Family

