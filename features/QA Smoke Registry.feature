Feature: QA Smoke Registry
  This will smoke test:
  Create Trial, Search Trial
  Create Draft Trial, Search draft Trial

  Background:
    Given I am logged in to CTRP Registry application with User "ctrptrialsubmitter" and email id "ctrptrialsubmitter@gmail.com"

  @smoke
  Scenario Outline: As a Trial submitter, create a Trial then search that Trial
    Given I want to create a Trial with Study Source <trialType>
    And Lead Organization Trial Identifier: <leadOrgIdentifier>, Other Clinical Trial ID:  <otherClinicalTrialID>, Other Obsolete Clinical Trial ID: <otherObsoleteClinicalTrialID>, Other Identifier: <otherIdentifier>
    And Official Title: <officialTitle>, Phase: <phase>, Pilot: <pilotOption>, Research Category: <researchCategory>, Primary Purpose: <primaryPurpose>, Secondary Purpose <secondaryPurpose>, Accrual Disease Terminology: <accrualDisease>
    And Lead Organization: <leadOrg> Principal Investigator: <principalInv> Sponsor: <sponsorOrg> Data Table Funding Source: <dataTableOrg> Program code: <programCode>
    And NCI Grant: <grantOption>, Funding Mechanism: <grantFundingMechanism>, Institute Code: <grantInstituteCode>, Serial Number: <grantSerialNumber>, NCI Division: <grantNCIDivisionCode>
    And Trial status: <trialStatus>, Comment: <trialComment>, Why Study Stopped: <trialWhyStudyStopped>
    And IND IDE info: <INDIDEOption>,IND IDE Type: <INDIDEType>,IND IDE Number: <INDIDENumber>, IND IDE Grantor: <INDIDEGrantor>, IND IDE Holder: <INDIDEHolder>, IND IDE Institution: <INDIDEInstitution>
    And Responsible party: <responsibleParty>, Trial Oversight Country: <trialOversightCountry>, Trial Oversight Organization: <trialOversightOrg>, FDA Regulated Indicator: <FDARegulatedIndicator>, section Indicator: <section801Indicator>, data Monitoring Indicator: <dataMonitoringIndicator>
    And Protocol Document: <protocolDoc>, IRB Approval: <IRBDoc>, List of Participating Sites: <participatingSiteDoc>, Informed Consent Document: <informedConsentDoc>, Other: <otherDoc>
  #  Step to create Trial
    Then I should be either able to Submit Trial OR Save as Draft <saveDraftOrSubmitTrial>
    When I go to Search Trial page
    Then I should be able to search with the created Trial Lead Org Identifier
    And I click on the Trial from Search page
    Then It should display Trial with above Trial parameters
    Examples:
      | trialType                | leadOrgIdentifier | otherClinicalTrialID | otherObsoleteClinicalTrialID | otherIdentifier | officialTitle                            | phase | pilotOption | researchCategory | primaryPurpose | secondaryPurpose      | accrualDisease | leadOrg        | principalInv  | sponsorOrg     | dataTableOrg   | programCode | grantOption | grantFundingMechanism | grantInstituteCode | grantSerialNumber | grantNCIDivisionCode | trialStatus | trialComment | trialWhyStudyStopped | INDIDEOption | INDIDEType | INDIDENumber | INDIDEGrantor | INDIDEHolder | INDIDEInstitution | responsibleParty | trialOversightCountry | trialOversightOrg  | FDARegulatedIndicator | section801Indicator | dataMonitoringIndicator | protocolDoc            | IRBDoc                | participatingSiteDoc | informedConsentDoc | otherDoc | saveDraftOrSubmitTrial |
      | National                 | smkSSLdOrg        |                      |                              | smoke1234       | SS smoke Test Create Trial               | I     | yes         | Interventional   | Diagnostic     |                       | ICD9           | smoke TrialOrg | smoke TrialPI | smoke TrialOrg | smoke TrialOrg | pc1234      | yes         | R01                   | CA                 | 131421            | CDP                  | In Review   | smokeComment |                      | yes          | IND        | 998855       | CDER          | Investigator |                   | Sponsor          | Canada                | Health Canada      | Yes                   | No                  | Yes                     | testSampleDocFile.docx | testSampleXlsFile.xls |                      |                    |          | SubmitTrial            |
      | Institutional            | smkSSLdOrg IN     |                      |                              |                 | SS smoke Test Create Institutional Trial | II    | no          | Observational    | Treatment      | Ancillary-Correlative | ICD10          | smoke TrialOrg | smoke TrialPI | smoke TrialOrg | smoke TrialOrg | pc1234      | no          |                       |                    |                   |                      | In Review   | smokeComment |                      | no           |            |              |               |              |                   | Sponsor          | United States         | Federal Government | Yes                   | Yes                 | Yes                     | testSampleDocFile.docx | testSampleXlsFile.xls |                      |                    |          | SubmitTrial            |
      | Externally Peer-Reviewed | smkSS Dft         |                      |                              |                 | SS smoke Test Create Draft Trial         |       |             |                  |                |                       |                |                |               |                |                |             |             |                       |                    |                   |                      |             |              |                      |              |            |              |               |              |                   |                  |                       |                    |                       |                     |                         |                        | testSampleXlsFile.xls |                      |                    |          | saveDraft              |

