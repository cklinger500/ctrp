#Static seed data for all environments

require 'rubygems'
require 'roo'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#Remove Data
#.delete_trial_data
#NameAlias.delete_all
#Organization.delete_all
#Person.delete_all
puts "Begin seeding"

############## SEEDING STATIC DATA BEGINS ##################
# NOTE:: In this section insert seeds for static data ,for example source_statuses, family_statuses.It will load minimum required data to create entities for fresh installation of app.So seed file purpose will be served.
#This might be useful in production app also.

puts "Seeding static members"

if CtepOrgType.all.size == 0
  ## Reading and importing ctep org type spreadsheets
  DataImport.import_ctep_org_types
end

if OrgFundingMechanism.all.size == 0
## Reading and Org funding mechanisms spreadsheets
  DataImport.import_org_funding_mechanisms
end


ServiceRequest.find_or_create_by(code: 'CREATE').update(name: 'Create', record_status:'Active')
ServiceRequest.find_or_create_by(code: 'UPDATE').update(name: 'Update', record_status:'Active')
ServiceRequest.find_or_create_by(code: 'MERGE_W_CTEP').update(name: 'Merge with CTEP ID', record_status:'Active')
ServiceRequest.find_or_create_by(code: 'NULLIFY_W_CTEP').update(name: 'Nullify with CTEP ID', record_status:'Active')
ServiceRequest.find_or_create_by(code: 'LINK_W_CTRP').update(name: 'Link with CTRP ID', record_status:'Active')
ServiceRequest.find_or_create_by(code: 'NULL').update(name: 'NULL', record_status:'Active')

SourceContext.find_or_create_by(code: 'CTEP').update(name: 'CTEP')
SourceContext.find_or_create_by(code: 'CTRP').update( name: 'CTRP')
SourceContext.find_or_create_by(code: 'NLM').update( name: 'NLM')

ctrp_context = SourceContext.find_by_code('CTRP')
ctep_context = SourceContext.find_by_code('CTEP')
nlm_context =  SourceContext.find_by_code('NLM')

SourceStatus.create(code: 'ACT' , source_context_id: ctrp_context.id,  name: 'Active', record_status: 'Active') if SourceStatus.find_by_code_and_source_context_id('ACT', ctrp_context.id).nil?
SourceStatus.create(code: 'PEND', source_context_id: ctrp_context.id,  name: 'Pending', record_status: 'Active') if SourceStatus.find_by_code_and_source_context_id('PEND', ctrp_context.id).nil?
SourceStatus.create(code: 'INACT', source_context_id: ctrp_context.id, name: 'InActive', record_status: 'Active') if SourceStatus.find_by_code_and_source_context_id('INACT', ctrp_context.id).nil?
SourceStatus.create(code: 'NULLIFIED', source_context_id: ctrp_context.id, name: 'Nullified', record_status: 'Active') if SourceStatus.find_by_code_and_source_context_id('NULLIFIED', ctrp_context.id).nil?

SourceStatus.create(code: 'ACT', source_context_id: ctep_context.id, name: 'Active', record_status: 'Active') if SourceStatus.find_by_code_and_source_context_id('ACT', ctep_context.id).nil?
SourceStatus.create(code: 'INACT', source_context_id: ctep_context.id, name: 'InActive', record_status: 'Active') if SourceStatus.find_by_code_and_source_context_id('INACT', ctep_context.id).nil?
SourceStatus.create(code: 'LEG', source_context_id: ctep_context.id, name: 'Legacy', record_status: 'Active') if SourceStatus.find_by_code_and_source_context_id('LEG', ctep_context.id).nil?

SourceStatus.create(code: 'ACT', source_context_id: nlm_context.id, name: 'Active', record_status: 'Active') if SourceStatus.find_by_code_and_source_context_id('ACT', nlm_context.id).nil?
SourceStatus.create(code: 'INACT', source_context_id: nlm_context.id, name: 'InActive', record_status: 'Active') if SourceStatus.find_by_code_and_source_context_id('INACT', nlm_context.id).nil?


FamilyRelationship.find_or_create_by(code: 'ORG').update( name: 'Organizational')
FamilyRelationship.find_or_create_by(code: 'AFF').update( name: 'Affiliation')

InternalSource.find_or_create_by(code: 'IMP').update( name: 'Import')
InternalSource.find_or_create_by(code: 'PRO').update( name: 'Protocol')

#family_statuses
FamilyStatus.find_or_create_by(code:'ACTIVE').update(name:'Active')
FamilyStatus.find_or_create_by(code:'INACTIVE').update(name:'Inactive')

#family_types
FamilyType.find_or_create_by(code:'CANCERCENTER').update(name:'Cancer Center')
FamilyType.find_or_create_by(code:'NCTN').update(name:'NCTN')
FamilyType.find_or_create_by(code:'NIH').update(name:'NIH')
FamilyType.find_or_create_by(code:'RESEARCHCENTER').update(name:'Research Cancer Center')

StudySource.find_or_create_by(code: 'NAT').update(name: 'National')
StudySource.find_or_create_by(code: 'EPR').update(name: 'Externally Peer-Reviewed')
StudySource.find_or_create_by(code: 'INS').update(name: 'Institutional')
StudySource.find_or_create_by(code: 'IND').update(name: 'Industrial')
StudySource.find_or_create_by(code: 'OTH').update(name: 'Other')

Phase.find_or_create_by(code: '0').update( name: '0')
Phase.find_or_create_by(code: 'I').update( name: 'I')
Phase.find_or_create_by(code: 'I/II').update( name: 'I/II')
Phase.find_or_create_by(code: 'II').update(name: 'II')
Phase.find_or_create_by(code: 'II/III').update( name: 'II/III')
Phase.find_or_create_by(code: 'III').update( name: 'III')
Phase.find_or_create_by(code: 'IV').update(name: 'IV')
Phase.find_or_create_by(code: 'NA').update(name: 'NA')

PrimaryPurpose.find_or_create_by(code: 'TRM').update(name: 'Treatment')
PrimaryPurpose.find_or_create_by(code: 'PRV').update(name: 'Prevention')
PrimaryPurpose.find_or_create_by(code: 'SUP').update(name: 'Supportive Care')
PrimaryPurpose.find_or_create_by(code: 'SCR').update(name: 'Screening')
PrimaryPurpose.find_or_create_by(code: 'DIA').update(name: 'Diagnostic')
PrimaryPurpose.find_or_create_by(code: 'HSR').update(name: 'Health Services Research')
PrimaryPurpose.find_or_create_by(code: 'BSC').update(name: 'Basic Science')
PrimaryPurpose.find_or_create_by(code: 'OTH').update(name: 'Other')

TimePerspective.find_or_create_by(code: 'PRO').update(name: 'Prospective')
TimePerspective.find_or_create_by(code: 'RET').update(name: 'Retrospective')
TimePerspective.find_or_create_by(code: 'CRO').update(name: 'Cross sectional')
TimePerspective.find_or_create_by(code: 'OTH').update(name: 'Other')

BiospecimenRetention.find_or_create_by(code: 'NONE').update(name: 'None Retained')
BiospecimenRetention.find_or_create_by(code: 'SDNA').update(name: 'Samples With DNA')
BiospecimenRetention.find_or_create_by(code: 'SNODNA').update(name: 'Samples Without DNA')

SecondaryPurpose.find_or_create_by(code: 'ANC').update(name: 'Ancillary-Correlative')
SecondaryPurpose.find_or_create_by(code: 'OTH').update(name: 'Other')

AccrualDiseaseTerm.find_or_create_by(code: 'SDC').update(name: 'SDC')
AccrualDiseaseTerm.find_or_create_by(code: 'ICD9').update(name: 'ICD9')
AccrualDiseaseTerm.find_or_create_by(code: 'ICD10').update(name: 'ICD10')
AccrualDiseaseTerm.find_or_create_by(code: 'ICD-O-3').update(name: 'ICD-O-3')

ResponsibleParty.find_or_create_by(code: 'SPONSOR').update(name: 'Sponsor')
ResponsibleParty.find_or_create_by(code: 'PI').update(name: 'Principal Investigator')
ResponsibleParty.find_or_create_by(code: 'SI').update(name: 'Sponsor-Investigator')

ProtocolIdOrigin.find_or_create_by(code: 'NCI').update(name: 'NCI Identifier', section: 'paSearch')
ProtocolIdOrigin.find_or_create_by(code: 'NCT').update(name: 'ClinicalTrials.gov Identifier', section: 'pa,registry')
ProtocolIdOrigin.find_or_create_by(code: 'LORG').update(name: 'Lead Organization Trial Identifier', section: 'paSearch')
ProtocolIdOrigin.find_or_create_by(code: 'CTEP').update(name: 'CTEP Identifier', section: 'pa')
ProtocolIdOrigin.find_or_create_by(code: 'DCP').update( name: 'DCP Identifier', section: 'pa')
ProtocolIdOrigin.find_or_create_by(code: 'CCR').update(name: 'CCR Identifier', section: 'pa')
ProtocolIdOrigin.find_or_create_by(code: 'CDR').update(name: 'CDR Identifier', section: 'pa')
ProtocolIdOrigin.find_or_create_by(code: 'DNCI').update(name: 'Duplicate NCI Identifier', section: 'pa')
ProtocolIdOrigin.find_or_create_by(code: 'ONCT').update(name: 'Obsolete ClinicalTrials.gov Identifier', section: 'pa,registry')
ProtocolIdOrigin.find_or_create_by(code: 'OTH').update(name: 'Other Identifier', section: 'pa,registry')

HolderType.find_or_create_by(code: 'INV').update(name: 'Investigator')
HolderType.find_or_create_by(code: 'ORG').update(name: 'Organization')
HolderType.find_or_create_by(code: 'IND').update(name: 'Industry')
HolderType.find_or_create_by(code: 'NIH').update(name: 'NIH')
HolderType.find_or_create_by(code: 'NCI').update(name: 'NCI')

TrialStatus.find_or_create_by(code: 'INR').update(name: 'In Review', explanation: 'The trial is in development and waiting for final approval')
TrialStatus.find_or_create_by(code: 'APP').update(name: 'Approved', explanation: 'Trial has been approved')
TrialStatus.find_or_create_by(code: 'ACT').update(name: 'Active', explanation: 'The trial is open for Accrual')
TrialStatus.find_or_create_by(code: 'EBI').update(name: 'Enrolling by Invitation', explanation: '')
TrialStatus.find_or_create_by(code: 'TCL').update(name: 'Temporarily Closed to Accrual', explanation: 'Trial is temporarily not accruing')
TrialStatus.find_or_create_by(code: 'TCA').update(name: 'Temporarily Closed to Accrual and Intervention', explanation: 'Trial has been closed to participant accrual. No participants are receiving treatment/intervention, but participants are still being followed according to the primary objectives of the study')
TrialStatus.find_or_create_by(code: 'CAC').update(name: 'Closed to Accrual', explanation: 'Trial has been closed to participant accrual. Participants are still receiving treatment/intervention')
TrialStatus.find_or_create_by(code: 'CAI').update(name: 'Closed to Accrual and Intervention', explanation: 'Trial is temporarily not accruing. Participants are not receiving intervention')
TrialStatus.find_or_create_by(code: 'COM').update(name: 'Complete', explanation: 'Trial has been closed to accrual; participants have completed treatment/intervention, and the study has met its primary objectives')
TrialStatus.find_or_create_by(code: 'ACO').update(name: 'Administratively Complete', explanation: 'Trial has been completed prematurely (for example, due to poor accrual, insufficient drug supply, IND closure, etc.)')
TrialStatus.find_or_create_by(code: 'WIT').update(name: 'Withdrawn', explanation: 'Trial has been withdrawn from development and review')
TrialStatus.find_or_create_by(code: 'AVA').update(name: 'Available', explanation: 'Currently available for this treatment')
TrialStatus.find_or_create_by(code: 'NLA').update(name: 'No longer available', explanation: 'Was available for this treatment previously but is not currently available and will not be available in the future')
TrialStatus.find_or_create_by(code: 'TNA').update(name: 'Temporarily not available', explanation: 'Not currently available for this treatment, but is expected to be available in the future')
TrialStatus.find_or_create_by(code: 'AFM').update(name: 'Approved for marketing', explanation: 'Treatment has been approved for sale to the public')

ResearchCategory.find_or_create_by(code: 'INT').update(name: 'Interventional')
ResearchCategory.find_or_create_by(code: 'OBS').update(name: 'Observational')
ResearchCategory.find_or_create_by(code: 'EXP').update(name: 'Expanded Access')
ResearchCategory.find_or_create_by(code: 'ANC').update(name: 'Ancillary Correlative')

ProcessingStatus.find_or_create_by(code: 'SUB').update(name: 'Submitted')
ProcessingStatus.find_or_create_by(code: 'STM').update(name: 'Submission Terminated')
ProcessingStatus.find_or_create_by(code: 'SRE').update(name: 'Submission Reactivated')
ProcessingStatus.find_or_create_by(code: 'AMS').update(name: 'Amendment Submitted')
ProcessingStatus.find_or_create_by(code: 'ACC').update(name: 'Accepted')
ProcessingStatus.find_or_create_by(code: 'REJ').update(name: 'Rejected')
ProcessingStatus.find_or_create_by(code: 'ABS').update(name: 'Abstracted')
ProcessingStatus.find_or_create_by(code: 'VFP').update(name: 'Verification Pending')
ProcessingStatus.find_or_create_by(code: 'AVR').update(name: 'Abstraction Verified Response')
ProcessingStatus.find_or_create_by(code: 'VNR').update(name: 'Abstraction Verified No Response')
ProcessingStatus.find_or_create_by(code: 'OHD').update(name: 'On-Hold')

Milestone.find_or_create_by(code: 'SRD').update(name: 'Submission Received Date')
Milestone.find_or_create_by(code: 'VPS').update(name: 'Validation Processing Start Date')
Milestone.find_or_create_by(code: 'VPC').update(name: 'Validation Processing Completed Date')
Milestone.find_or_create_by(code: 'SAC').update(name: 'Submission Acceptance Date')
Milestone.find_or_create_by(code: 'STR').update(name: 'Submission Terminated Date')
Milestone.find_or_create_by(code: 'SRE').update(name: 'Submission Reactivated Date')
Milestone.find_or_create_by(code: 'SRJ').update(name: 'Submission Rejection Date')
Milestone.find_or_create_by(code: 'APS').update(name: 'Administrative Processing Start Date')
Milestone.find_or_create_by(code: 'APC').update(name: 'Administrative Processing Completed Date')
Milestone.find_or_create_by(code: 'RAQ').update(name: 'Ready for Administrative QC Date')
Milestone.find_or_create_by(code: 'AQS').update(name: 'Administrative QC Start Date')
Milestone.find_or_create_by(code: 'AQC').update(name: 'Administrative QC Completed Date')
Milestone.find_or_create_by(code: 'SPS').update(name: 'Scientific Processing Start Date')
Milestone.find_or_create_by(code: 'SPC').update(name: 'Scientific Processing Completed Date')
Milestone.find_or_create_by(code: 'RSQ').update(name: 'Ready for Scientific QC Date')
Milestone.find_or_create_by(code: 'SQS').update(name: 'Scientific QC Start Date')
Milestone.find_or_create_by(code: 'SQC').update(name: 'Scientific QC Completed Date')
Milestone.find_or_create_by(code: 'RTS').update(name: 'Ready for Trial Summary Report Date')
Milestone.find_or_create_by(code: 'TSR').update(name: 'Trial Summary Report Date')
Milestone.find_or_create_by(code: 'STS').update(name: 'Submitter Trial Summary Report Feedback Date')
Milestone.find_or_create_by(code: 'IAV').update(name: 'Initial Abstraction Verified Date')
Milestone.find_or_create_by(code: 'ONG').update(name: 'On-going Abstraction Verified Date')
Milestone.find_or_create_by(code: 'LRD').update(name: 'Late Rejection Date')

MilestoneType.find_or_create_by(code: 'ADM').update(name: 'Administrative')
MilestoneType.find_or_create_by(code: 'SCI').update(name: 'Scientific')
MilestoneType.find_or_create_by(code: 'GEN').update(name: 'General')

SubmissionType.find_or_create_by(code: 'ORI').update(name: 'Original')
SubmissionType.find_or_create_by(code: 'AMD').update(name: 'Amendment')
SubmissionType.find_or_create_by(code: 'UPD').update(name: 'Update')

SubmissionSource.find_or_create_by(code: 'CCR').update(name: 'CCR')
SubmissionSource.find_or_create_by(code: 'CTEP').update(name: 'CTEP')
SubmissionSource.find_or_create_by(code: 'DCP').update(name: 'DCP')
SubmissionSource.find_or_create_by(code: 'CCT').update(name: 'Cancer Center')

SubmissionMethod.find_or_create_by(code: 'REG').update(name: 'Registry')
SubmissionMethod.find_or_create_by(code: 'BAT').update(name: 'Batch')
SubmissionMethod.find_or_create_by(code: 'CTI').update(name: 'ClinicalTrials.gov Import')
SubmissionMethod.find_or_create_by(code: 'GSV').update(name: 'Grid Service')
SubmissionMethod.find_or_create_by(code: 'RSV').update(name: 'REST Service')
SubmissionMethod.find_or_create_by(code: 'OTHER').update(name: 'Other')

SiteRecruitmentStatus.find_or_create_by(code: 'INR').update(name: 'In Review')
SiteRecruitmentStatus.find_or_create_by(code: 'APP').update(name: 'Approved')
SiteRecruitmentStatus.find_or_create_by(code: 'ACT').update(name: 'Active')
SiteRecruitmentStatus.find_or_create_by(code: 'EBI').update(name: 'Enrolling by Invitation')
SiteRecruitmentStatus.find_or_create_by(code: 'CAC').update(name: 'Closed to Accrual')
SiteRecruitmentStatus.find_or_create_by(code: 'CAI').update(name: 'Closed to Accrual and Intervention')
SiteRecruitmentStatus.find_or_create_by(code: 'TCL').update(name: 'Temporarily Closed to Accrual')
SiteRecruitmentStatus.find_or_create_by(code: 'TCA').update(name: 'Temporarily Closed to Accrual and Intervention')
SiteRecruitmentStatus.find_or_create_by(code: 'WIT').update(name: 'Withdrawn')
SiteRecruitmentStatus.find_or_create_by(code: 'ACO').update(name: 'Administratively Complete')
SiteRecruitmentStatus.find_or_create_by(code: 'COM').update(name: 'Complete')

Gender.find_or_create_by(code: 'M').update(name: 'Male')
Gender.find_or_create_by(code: 'F').update(name: 'Female')
Gender.find_or_create_by(code: 'B').update(name: 'Both')

InterventionType.find_or_create_by(code: 'DRUG').update(name: 'Drug', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'DEVI').update(name: 'Device', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'BIOL').update(name: 'Biological/Vaccine', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'PROC').update(name: 'Procedure/Surgery', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'RAD').update(name: 'Radiation', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'BEHA').update(name: 'Behavioral', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'GENE').update(name: 'Genetic', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'DSUP').update(name: 'Dietary Supplement', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'OTH').update(name: 'Other', category: 'clinicaltrials.gov')

NcitStatus.find_or_create_by(code:'ACT').update(name:'Active')
NcitStatus.find_or_create_by(code:'INA').update(name:'Inactive')

## seed 50 NcitIntervention records with C_Code
act = NcitStatus.find_by_code('ACT')
NcitIntervention.create(preferred_name: 'Sivifene', synonyms:  "4,4'-Dihydroxybenzophenone 2,4-dinitrophenylhydrazone; A-007; Aryl Hydrazone A-007 Gel; SIVIFENE; Sivifene", definition: "The phenylhydrazone 4,4'-dihydroxybenzophenone-2,4-dinitrophenylhydrazone formulated as a topical agent with immunomodulating and potential antineoplastic activities. Applied topically as a gel, sivifene may stimulate a local immune response against human papillomavirus (HPV)-induced cervical intraepithelial neoplasia (CIN).", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C61305')
NcitIntervention.create(preferred_name: 'A-65', synonyms:  "A-65", definition: "An amide analogue of Trichostatin A studied for potential antineoplastic activity.  A-65 inhibits zinc-dependent histone deacetylase, inducing terminal cell differentiation and anti-angiogenic activity. (NCI04)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C2048')
NcitIntervention.create(preferred_name: 'ABBV-221', synonyms:  "ABBV-221", definition: "An intravenously-administered agent capable of modulating the activity of epidermal growth factor receptor (EGFR), with potential antineoplastic activity.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C120556')
NcitIntervention.create(preferred_name: 'Paclitaxel Albumin-Stabilized Nanoparticle Formulation', synonyms:  "ABI 007; ABI-007; ABI-007; Abraxane; Abraxane; Albumin-Stabilized Nanoparticle Paclitaxel; Albumin-bound Paclitaxel; Nanoparticle Albumin-bound Paclitaxel; Nanoparticle Paclitaxel; Paclitaxel Albumin-Stabilized Nanoparticle Formulation; nab-paclitaxel; nanoparticle paclitaxel; paclitaxel albumin-stabilized nanoparticle formulation; protein-bound paclitaxel", definition: "A Cremophor EL-free, albumin-stabilized nanoparticle formulation of the natural taxane paclitaxel with antineoplastic activity. Paclitaxel binds to and stabilizes microtubules, preventing their depolymerization and so inhibiting cellular motility, mitosis, and replication. This formulation solubilizes paclitaxel without the use of the solvent Cremophor, thereby permitting the administration of larger doses of paclitaxel while avoiding the toxic effects associated with Cremophor.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C2688')
NcitIntervention.create(preferred_name: 'Navitoclax', synonyms:  "A-855071.0; ABT-263; ABT-263; BcI-2 Family Protein Inhibitor ABT-263; NAVITOCLAX; Navitoclax; navitoclax", definition: "An orally active, synthetic small molecule and an antagonist of a subset of the B-cell leukemia 2 (Bcl-2) family of proteins with potential antineoplastic activity. Navitoclax selectively binds to apoptosis suppressor proteins Bcl-2, Bcl-XL, and Bcl-w, which are frequently overexpressed in a wide variety of cancers, including those of the lymph, breast, lung, prostate, and colon, and are linked to tumor drug resistance. Inhibition of these apoptosis suppressors prevents their binding to the apoptotic effectors Bax and Bak proteins, thereby triggering apoptotic processes in cells overexpressing Bcl-2, Bcl-XL, and Bcl-w. This eventually reduces tumor cell proliferation.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C64776')
NcitIntervention.create(preferred_name: 'ABT-510', synonyms:  "ABT-510; ABT-510; ABT-510", definition: "A synthetic peptide that mimics the anti-angiogenic activity of the endogenous protein thrombospondin-1 (TSP-1).  ABT-510 inhibits the actions of several pro-angiogenic growth factors important to tumor neovascularization; these pro-angiogenic growth factors include vascular endothelial growth factor (VEGF), basic fibroblast growth factor (bFGF)), hepatocyte growth factor (HGF), and interleukin 8 (IL-8). (NCI04)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C37447')
NcitIntervention.create(preferred_name: 'ABT-751', synonyms:  "ABT-751; ABT-751; ABT-751; E7010; N-[2-[(4-Hydroxyphenyl)amino]-3-pyridinyl]-4-methoxybenzenesulfonamide; N-[2-[(4-Hydroxyphenyl)amino]-3-pyridinyl]-4-methoxybenzenesulfonamide", definition: "An orally bioavailable antimitotic sulfonamide. ABT- 751 binds to the colchicine-binding site on beta-tubulin and inhibits the polymerization of microtubules, thereby preventing tumor cell replication. This agent also disrupts tumor neovascularization, reducing tumor blood flow and so inducing a cytotoxic effect. (NCI04)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C2679')
NcitIntervention.create(preferred_name: 'Veliparib', synonyms:  "2-((R)-2-Methylpyrrolidin-2-yl)-1H-benzimidazole-4-carboxamide; ABT-888; ABT-888; PARP-1 inhibitor ABT-888; VELIPARIB; Veliparib; veliparib", definition: "A poly(ADP-ribose) polymerase (PARP) -1 and -2 inhibitor with chemosensitizing and antitumor activities. With no antiproliferative effects as a single agent at therapeutic concentrations, ABT-888 inhibits PARPs, thereby inhibiting DNA repair and potentiating the cytotoxicity of DNA-damaging agents. PARP nuclear enzymes are activated by DNA single or double strand breaks, resulting in the poly(ADP-ribosyl)ation of other nuclear DNA binding proteins involved in DNA repair; poly(ADP-ribosyl)ation contributes to efficient DNA repair and to survival of proliferating cells exposed to mild genotoxic stresses as induced by as oxidants, alkylating agents or ionizing radiation.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C60768')
NcitIntervention.create(preferred_name: 'ACAPHA', synonyms:  "ACAPHA; ACAPHA", definition: "", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C93167')
NcitIntervention.create(preferred_name: 'ACE Inhibitor', synonyms:  "ACE Inhibitor; ACE Inhibitor; ACE inhibitor; Angiotensin-Converting Enzyme Inhibitor; Angiotensin-Converting Enzyme Inhibitor; angiotensin-converting enzyme inhibitor", definition: "Any substance that inhibits angiotensin-converting enzyme (ACE), an enzyme that catalyzes the conversion of angiotensin I to angiotensin II. Inhibition of ACE results in a reduction in angiotensin II and angiotensin II-induced aldosterone secretion, causing vasodilation and natriuresis.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C247')
NcitIntervention.create(preferred_name: 'ADA Transduced T Cell', synonyms:  "ADA Transduced T Cell", definition: "T cells harvested from a patient with adenosine deaminase (ADA) deficiency and transduced with a vector containing the gene for ADA. ADA catalyzes the hydrolysis of adenosine to inosine; ADA deficiency causes a form of severe combined immunodeficiency (SCID).  Following genetic modification, the T cells are returned to the patient, where they produce functional ADA.  ADA-transduced T cells have been shown to improve immune function in individuals with ADA deficiency. (NCI04)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C28797')
NcitIntervention.create(preferred_name: 'ADH-1', synonyms:  "ADH-1; Exherin", definition: "A small, cyclic pentapeptide vascular-targeting agent with potential antineoplastic and antiangiogenic activities. ADH-1 selectively and competitively binds to and blocks N-cadherin, which may result in disruption of tumor vasculature, inhibition of tumor cell growth, and the induction of tumor cell and endothelial cell apoptosis. N-cadherin, a cell- surface transmembrane glycoprotein of the cadherin superfamily of proteins involved in calcium-mediated cell-cell adhesion and signaling mechanisms; may be upregulated in some aggressive tumors and the endothelial cells and pericytes of some tumor blood vessels.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C53399')
NcitIntervention.create(preferred_name: 'AE37 Peptide/GM-CSF Vaccine', synonyms:  "AE37 Peptide/GM-CSF Vaccine", definition: "A vaccine containing HER2/Neu-derived epitope (amino acids 776-790) linked to li-Key peptide (li-Key/HER2/neu hybrid peptide or AE37), and combined with granulocyte-macrophage colony-stimulating factor (GM-CSF), with potential antineoplastic and immunoadjuvant activities. Upon vaccination, AE37 may activate the immune system and stimulate T-helper cells against HER2/Neu expressing cancer cells. GM-CSF may potentiate the immune response against cancer cells expressing the HER2/Neu antigen. The Ii-Key moiety, a 4-amino acid (LRMK) epitope from the MHC class II-associated invariant chain (Ii protein), increases T-helper cell stimulation against HER2/neu antigen when compared to unmodified class II epitopes. HER2/neu, a tumor associated antigen (TAA), is overexpressed in a variety of tumor cell types and is highly immunogenic.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C91719')
NcitIntervention.create(preferred_name: 'AEE788', synonyms:  "AEE 788; AEE-788; AEE788; AEE788", definition: "An orally bioavailable multiple-receptor tyrosine kinase inhibitor. AEE788 inhibits phosphorylation of the tyrosine kinases of epidermal growth factor receptor (EGFR), human epidermal growth factor receptor 2 (HER2), and vascular endothelial growth factor receptor 2 (VEGF2), resulting in receptor inhibition, the inhibition of cellular proliferation, and induction of tumor cell and tumor-associated endothelial cell apoptosis. (NCI05)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C48369')
NcitIntervention.create(preferred_name: 'AEG35156', synonyms:  "AEG35156; AEG35156; GEM640; GEM640", definition: "A second-generation synthetic antisense oligonucleotide with potential antineoplastic activity. AEG35156 selectively blocks the cellular expression of X-linked inhibitor of apoptosis protein (XIAP), a pivotal inhibitor of apoptosis that is overexpressed in many tumors. This agent reduces total levels of XIAP in tumor cells, working synergistically with cytotoxic drugs to overcome tumor cell resistance to apoptosis. XIAP interferes with both the intrinsic and extrinsic program-death signaling pathways, which may render tumor cells resistant to apoptosis.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C49180')
NcitIntervention.create(preferred_name: 'AFP464', synonyms:  "AFP464; AFP464", definition: "A synthetic lysyl prodrug of the amino-substituted flavone derivate aminoflavone with antiproliferative and antineoplastic activities. AFP464 is rapidly converted to aminoflavone in plasma. Aminoflavone activates the aryl hydrocarbon receptor (AhR) signaling pathway leading to an increase in cytochrome P450 1A1 (CYP1A1) and cytochrome P450 1A2 (CYP1A2) expression and, to a lesser extent, an increase in cytochrome P450 1B1 (CYP1B1) expression. Subsequently, aminoflavone is metabolized to toxic metabolites by the cytochromome P450 enzymes that it induces; these toxic metabolites covalently bind to DNA, resulting in the phosphorylation of p53, the induction of the p53 downstream target p21Waf1/Cip1, and apoptosis. Pulmonary toxicity may be dose-limiting.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C48370')
NcitIntervention.create(preferred_name: 'AFP Gene Hepatocellular Carcinoma Vaccine', synonyms:  "AFP Gene Hepatocellular Carcinoma Vaccine; vaccine, AFP gene hepatocellular carcinoma", definition: "A cancer vaccine composed of naked plasmid DNA of the gene for the tumor-associated antigen alpha-fetoprotein (AFP), a macromolecule that acts as a specific immunologic target for hepatocellular carcinoma. This agent exerts an antitumor effect by inducing cytotoxic T-lymphocytes to attack AFP-expressing tumor cells. (NCI04)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C2512')
NcitIntervention.create(preferred_name: 'Axitinib', synonyms:  "AG-013736; AG-013736; AG013736; AXITINIB; Axitinib; Inlyta; N-methyl-2-((3-((1E)-2-(pyridin-2-yl)ethenyl)-1H-indazol-6-yl)sulfanyl)benzamide; axitinib", definition: "An orally bioavailable tyrosine kinase inhibitor. Axitinib inhibits the proangiogenic cytokines vascular endothelial growth factor (VEGF) and platelet-derived growth factor receptor (PDGF), thereby exerting an anti-angiogenic effect.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C38718')
NcitIntervention.create(preferred_name: 'AG-024322', synonyms:  "AG-024322", definition: "A cyclin-dependent kinase (CDK) inhibitor with antineoplastic activity. AG-024322 selectively inhibits cyclin-dependent kinases (particularly CDK1,2 and 4), enzymes that regulate cell cycle progression. Inhibition of CDK may result in cell cycle arrest, induction of apoptosis, and inhibition of DNA replication and tumor cell proliferation.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C52182')
NcitIntervention.create(preferred_name: 'Pelitrexol', synonyms:  "(2S)-2-(((5-(2-((6S)-2-Amino-4-oxo-1,4,5,6,7,8-hexahydropyrido(2,3-d)pyrimidin-6-yl)ethyl)-4-methylthiophen-2-yl)carbonyl)amino)pentanedioic Acid; (2S)-2-[[[5-[2-[(6S)-2-amino-4-oxo-1,4,5,6,7,8-hexahydropyrido[2,3-d]pyrimidin-6-yl]ethyl]-4-methylthiophen-2-yl]carbonyl]amino]pentanedioic Acid; AG2037; AG2037; PELITREXOL; Pelitrexol", definition: "A water soluble antifolate with anti-proliferative activity. Pelitrexol inhibits activity of glycinamide ribonucleotide formyltransferase (GARFT), the first folate-dependent enzyme of the de novo purine synthesis pathway essential for cell proliferation. Enzyme inhibition reduces the purine nucleotides pool required for DNA replication and RNA transcription. As a result, this agent causes cell cycle arrest in S-phase, and ultimately inhibits tumor cell proliferation", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C2633')
NcitIntervention.create(preferred_name: 'AG 1517', synonyms:  "AG 1517; AG 1517", definition: "A quinazoline derivative that selectively inhibits EGFR kinase activity and suppresses the growth of psoriatic keratinocytes.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C1787')
NcitIntervention.create(preferred_name: 'AG 1732', synonyms:  "AG 1732; AG 1732; AG-1732", definition: "A tyrphostin compound inhibiting receptor autophosphorylation by inhibiting protein tyrosine kinase and is used to study receptor function.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C2042')
NcitIntervention.create(preferred_name: 'AICA-Ribotide', synonyms:  "1-(5'-Phosphoribosyl)-5-Amino-4-Imidazolecarboxamide; 1H-Imidazole-4-Carboxamide, 5-Amino-1-(5-O-Phosphono-Beta-D-Ribofuranosyl)- (9CI); 5'-Phospho-Ribosyl-5-Amino-4-Imidazole Carboxamide; 5'-Phosphoribosyl-5-Amino-4-Imidazolecarboxamide; 5-Amino-1-(5-O-Phosphono-Beta-D-Ribofuranosyl)-1H-Imidazole-4-Carboxamide; 5-Amino-1-(5-Phospho-D-Ribosyl)Imidazole-4-Carboxamide; 5-Amino-4-Imidazole Carboxamide Ribonucleotide; 5-Amino-4-Imidazolecarboxamide Ribonucleoside 5'-Monophosphate; 5-Amino-4-Imidazolecarboxamide Ribotide; 5-Aminoimidazole-4-Carboxamide Ribonucleotide; 5-Phosphoribosyl-4-Carbamoyl-5-Aminoimidazole; AICA Ribonucleotide; AICA Ribotide; AICA-Ribotide; AICAR; Aminoimidazole Carboxamide Ribonucleotide; Imidazole-4-Carboxamide, 5-Amino-1-Beta-D-Ribofuranosyl-, 5'-(Dihydrogen Phosphate) (8CI); ZMP; [(2R,3S,4R,5R)-5-(4-Carbamoyl-5-Aminoimidazol-1-yl)-3,4-Dihydroxyoxolan-2-yl]Methyl Dihydrogen Phosphate", definition: "A ribonucleotide analog of adenosine monophosphate that is an intermediate in the synthesis of inosine monophosphate with potential cardioprotective activity. During myocardial ischemia, AICA-ribotide activates AMP-dependent protein kinase (AMPK), inhibits adenosine deaminase (ADA) and causes increased synthesis of both adenosine and adenosine triphosphate (ATP). These activities prevent calcium overload, increase AMPK-dependent glucose uptake and improve blood flow to the heart. AMPK, a protein kinase complex, regulates several cellular systems including the uptake of glucose, the beta-oxidation of fatty acids, protein synthesis, and the biogenesis of both glucose transporter 4 (GLUT4) and mitochondria. ADA is a key enzyme involved in purine metabolism.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C113498')
NcitIntervention.create(preferred_name: 'AIM2(-1)/HT001(-1)/TAF1B(-1) Frameshift Peptide Vaccine', synonyms:  "AIM2(-1)/HT001(-1)/TAF1B(-1) FSP Vaccine; AIM2(-1)/HT001(-1)/TAF1B(-1) Frameshift Peptide Vaccine", definition: "A cancer vaccine containing the three frame shift peptides (FSP) AIM2(-1), HT001(-1) and TAF1B(-1), with potential immunomodulating activity. Upon administration, the AIM2(-1)/HT001(-1)/TAF1B(-1) FSP vaccine may induce an immune response against microsatellite instability (MSI) colorectal cancer-associated antigens. Frame shift mutations of AIM2 (absent in melanoma 2, an interferon-inducible protein), HT001 (asteroid homolog 1 or ASTE1, with an unknown function) and TAF1B (TATA box-binding protein-associated RNA polymerase I B, a transcription factor) are seen in MSI-positive colorectal cancers and may be associated with malignant transformation, tumor progression and the presence of tumor-infiltrating lymphocytes. These FSPs all have one-base deletions.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C99129')
NcitIntervention.create(preferred_name: 'AKT 1/2 Inhibitor BAY1125976', synonyms:  "AKT 1/2 Inhibitor BAY1125976; BAY1125976", definition: "An orally bioavailable inhibitor of the serine/threonine protein kinase AKT (protein kinase B) isoforms 1 and 2 (AKT1/2) with potential antineoplastic activity. AKT1/2 inhibitor BAY1125976 selectively binds to and inhibits the phosphorylation and activity of AKT1/2 in a non-ATP competitive manner, which may result in the inhibition of the phosphatidylinositol 3 (PI3K)/AKT/mammalian target of rapamycin (mTOR) signaling pathway. This may lead to both the reduction of cell proliferation and the induction of cell apoptosis in AKT-overexpressing tumor cells. The AKT signaling pathway is often deregulated in cancer and is associated with tumor cell proliferation, survival and migration.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C111575')
NcitIntervention.create(preferred_name: 'AKT Inhibitor ARQ 092', synonyms:  "AKT Inhibitor ARQ 092; ARQ 092", definition: "An orally bioavailable inhibitor of the serine/threonine protein kinase AKT (protein kinase B) with potential antineoplastic activity. AKT inhibitor ARQ 092 binds to and inhibits the activity of AKT in a non-ATP competitive manner, which may result in the inhibition of the PI3K/AKT signaling pathway. This may lead to the reduction in tumor cell proliferation and the induction of tumor cell apoptosis. The AKT signaling pathway is often deregulated in cancer and is associated with tumor cell proliferation, survival and migration.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C99172')
NcitIntervention.create(preferred_name: 'AK 3012', synonyms:  "AK 3012", definition: "A proprietary topical formulation. Upon subcutaneous administration, the active ingredient in AK 3012 may inhibit actinic keratosis.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C104266')
NcitIntervention.create(preferred_name: 'AL721', synonyms:  "AL-721; AL721; AL721; Altrigen; Egg Lecithin Lipids", definition: "A mixture of neutral lipids (70%), phosphatidylcholine (20%) and phosphatidylethanolamine (10%) extracted from egg yolk. AL721 removes cholesterol from outer cell membranes, increases membrane fluidity, and impairs virus attachment to cell receptors. AL721 has been studied for diseases and conditions where altered membrane fluidity plays a role.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C993')
NcitIntervention.create(preferred_name: 'ALK-FAK Inhibitor CEP-37440', synonyms:  "ALK-FAK Inhibitor CEP-37440; CEP-37440", definition: "An orally available dual kinase inhibitor of the receptor tyrosine kinase anaplastic lymphoma kinase (ALK) and focal adhesion kinase (FAK), with potential antineoplastic activity. Upon administration, ALK-FAK inhibitor CEP-37440 selectively binds to and inhibits ALK kinase and FAK kinase. The inhibition leads to disruption of ALK- and FAK-mediated signal transduction pathways and eventually inhibits tumor cell growth in ALK- and FAK-overexpressing tumor cells. ALK belongs to the insulin receptor superfamily and plays an important role in nervous system development; its dysregulation and gene rearrangements are associated with a variety of tumors. The cytoplasmic tyrosine kinase FAK, a signal transducer for integrins, is upregulated and constitutively activated in various tumor types; it plays a key role in tumor cell migration, proliferation, survival, and tumor angiogenesis.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C111685')
NcitIntervention.create(preferred_name: 'Dalantercept', synonyms:  "ACE-041; ALK1-Fc Fusion Protein ACE-041; Activin Receptor-like Kinase 1 Inhibitor ACE-041; DALANTERCEPT; Dalantercept", definition: "A soluble fusion protein containing the extracellular domain of activin receptor-like kinase-1 (ALK1) fused to a human Fc domain (ALK1-Fc fusion protein), with potential antiangiogenic and antineoplastic activities. Upon administration, dalantercept binds to various ALK1 ligands, preventing activation of tumor cell ALK1 receptors and so inhibiting the ALK1 signaling pathway; growth factor-induced angiogenesis is thus inhibited, which may result in the inhibition of tumor cell proliferation and tumor cell death. ALK1 is a type I cell surface receptor with serine/threonine kinase activity that mediates signaling by members of the transforming growth factor-beta (TGFbeta) superfamily and plays a key role in angiogenesis; ligands for this receptor include TGFbeta1 and TGFbeta2. The Fc moiety of this fusion protein mediates clearance of ligand-fusion protein complexes by the reticuloendothelial system (RES).", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C88296')
NcitIntervention.create(preferred_name: 'ALK5 Inhibitor TEW-7197', synonyms:  "ALK5 Inhibitor TEW-7197; TEW-7197; TEW7197; TGFBR1 Inhibitor TEW-7197", definition: "An orally bioavailable inhibitor of the serine/threonine kinase, transforming growth factor (TGF)-beta receptor type 1 (TGFBR1), also known as activin receptor-like kinase 5 (ALK5), with potential antineoplastic activity. Upon oral administration, ALK5 inhibitor TEW-7197 inhibits the activity of TGFBR1 and prevents TGF-beta/TGFBR1-mediated signaling. This suppresses tumor growth in TGFBR1-overexpressing tumor cells. TGFBR1, which is overexpressed in a variety of tumor cell types, plays a key role in tumor cell proliferation. Expression of TGF-beta promotes tumor cell proliferation, enhances the migration of tumor cells and suppresses the response of the host immune system to tumor cells.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C116357')
NcitIntervention.create(preferred_name: 'ALK/FAK/Pyk2 Inhibitor CT-707', synonyms:  "ALK/FAK/Pyk2 Inhibitor CT-707; CT 707; CT-707", definition: "An orally available inhibitor of the receptor tyrosine kinase anaplastic lymphoma kinase (ALK), focal adhesion kinase (FAK) and proline-rich tyrosine kinase 2 (Pyk2), with potential antineoplastic activity. Upon administration, ALK/FAK/Pyk2 inhibitor CT-707 selectively binds to and inhibits ALK , FAK and Pyk2. The inhibition leads to disruption of ALK- , FAK- and Pyk2-mediated signal transduction pathways and eventually inhibits tumor cell growth in ALK-, FAK- and Pyk2-overexpressing tumor cells. Expression of these tyrosine kinases is dysregulated in various tumor types; they play a key role in tumor cell migration, proliferation, survival, and tumor angiogenesis.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C126648')
NcitIntervention.create(preferred_name: 'ALK Inhibitor ASP3026', synonyms:  "ALK Inhibitor ASP3026; ASP-3026; ASP3026; N2-[2-Methoxy-4-[4-(4-methyl-1-piperazinyl)-1-piperidinyl]phenyl]-N4-[2-[(1-methylethyl)sulfonyl]phenyl]-1,3,5-triazine-2,4-diamine", definition: "An orally available, small molecule inhibitor of the receptor tyrosine kinase anaplastic lymphoma kinase (ALK), with potential antineoplastic activity. Upon oral administration, ASP3026 binds to and inhibits ALK tyrosine kinase, ALK fusion proteins and ALK point mutation variants. Inhibition of ALK leads to the disruption of ALK-mediated signaling and the inhibition of cell growth in ALK-expressing tumor cells. ALK belongs to the insulin receptor superfamily and plays an important role in nervous system development. ALK is not expressed in healthy adult human tissue but ALK dysregulation and gene rearrangements are associated with a series of tumors. Additionally, ALK mutations are associated with acquired resistance to small molecule tyrosine kinase inhibitors.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C116727')
NcitIntervention.create(preferred_name: 'Alectinib', synonyms:  "5H-benzo(b)carbazole-3-carbonitrile, 9-Ethyl-6,11-dihydro-6,6-dimethyl-8-(4-(4-morpholinyl)-1-piperidinyl)-11-oxo-; AF-802; AF802; ALECTINIB; Alecensa; Alecensa; Alectinib; CH5424802; RG7853; RO5424802", definition: "An orally available inhibitor of the receptor tyrosine kinase anaplastic lymphoma kinase (ALK) with antineoplastic activity. Upon administration, alectinib binds to and inhibits ALK kinase, ALK fusion proteins as well as the gatekeeper mutation ALKL1196M known as one of the mechanisms of acquired resistance to small-molecule kinase inhibitors. The inhibition leads to disruption of ALK-mediated signaling and eventually inhibits tumor cell growth in ALK-overexpressing tumor cells. ALK belongs to the insulin receptor superfamily and plays an important role in nervous system development. ALK dysregulation and gene rearrangements are associated with a series of tumors.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C101790')
NcitIntervention.create(preferred_name: 'ALK Inhibitor RO5424802', synonyms:  "ALK Inhibitor RO5424802; RO5424802", definition: "An orally available inhibitor of the receptor tyrosine kinase anaplastic lymphoma kinase (ALK) with antineoplastic activity. Upon administration, ALK inhibitor RO5424802 binds to and inhibits ALK kinase, which leads to a disruption of ALK-mediated signaling and eventually inhibits tumor cell growth in ALK-overexpressing tumor cells. ALK belongs to the insulin receptor superfamily and plays an important role in nervous system development. ALK dysregulation and gene rearrangements are associated with a series of tumors. Additionally, ALK mutations are associated with acquired resistance to small molecule tyrosine kinase inhibitors.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C105615')
NcitIntervention.create(preferred_name: 'ALK Inhibitor X-396', synonyms:  "ALK Inhibitor X-396; Anaplastic Lymphoma Kinase Inhibitor X-396; X-396", definition: "An orally available small molecule inhibitor of the receptor tyrosine kinase anaplastic lymphoma kinase (ALK) with potential antineoplastic activity. Upon oral administration, X-396 binds to and inhibits ALK kinase, ALK fusion proteins and ALK point mutation variants. Inhibition of ALK leads to the disruption of ALK-mediated signaling and eventually inhibits tumor cell growth in ALK-expressing tumor cells. ALK belongs to the insulin receptor superfamily and plays an important role in nervous system development. ALK is not expressed in healthy adult human tissue but ALK dysregulation and gene rearrangements are associated with a series of tumors; ALK mutations are associated with acquired resistance to small molecule tyrosine kinase inhibitors.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C102754')
NcitIntervention.create(preferred_name: 'ALK/ROS1 Inhibitor PF-06463922', synonyms:  "ALK/ROS1 Inhibitor PF-06463922; PF-06463922", definition: "An orally available, ATP-competitive inhibitor of the receptor tyrosine kinases, anaplastic lymphoma kinase (ALK) and C-ros oncogene 1 (Ros1), with potential antineoplastic activity. Upon administration, ALK/ROS1 inhibitor PF-06463922 binds to and inhibits both ALK and ROS1 kinases. The kinase inhibition leads to disruption of ALK- and ROS1-mediated signaling and eventually inhibits tumor cell growth in ALK- and ROS1-overexpressing tumor cells. In addition, PF-06463922 is able to cross the blood brain barrier. ALK belongs to the insulin receptor superfamily and plays an important role in nervous system development; ALK dysregulation and gene rearrangements are associated with a series of tumors. ROS1, overexpressed in certain cancer cells, plays a key role in cell growth and survival of cancer cells.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C113655')
NcitIntervention.create(preferred_name: 'ALK/TRK Inhibitor TSR-011', synonyms:  "ALK/TRK Inhibitor TSR-011; TSR-011", definition: "An orally available inhibitor of both the receptor tyrosine kinase anaplastic lymphoma kinase (ALK) and the tropomyosin-related kinases (TRK) TRKA, TRKB, and TRKC, with potential antineoplastic activity. Upon administration, ALK/TRK inhibitor TSR-011 binds to and inhibits both ALK and TRK kinases. The inhibition leads to disruption of ALK- and TRK-mediated signaling and impedes tumor cell growth in ALK/TRK-overexpressing tumor cells. ALK belongs to the insulin receptor superfamily and plays an important role in nervous system development; ALK dysregulation and gene rearrangements are associated with a series of tumors. TRK, a family of receptor tyrosine kinases activated by neurotrophins, is mutated in a variety of cancer cell types and plays an important role in tumor cell growth and survival.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C114287')
NcitIntervention.create(preferred_name: 'ALVAC-B7-CEA', synonyms:  "ALVAC-B7-CEA", definition: "A cancer vaccine consisting of ALVAC, a highly attenuated poxvirus strain derived from the canarypox virus.  ALVAC-B7-CEA expresses carcinoembryonic antigen (CEA), a protein that is overexpressed by many tumor cells, and B7.1 (also known as CD80), the natural ligand for the T-cell antigen CD28, to augment the host immune response.  This agent has been shown to stimulate a host immune response against tumor cells that express CEA. (NCI04)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C2742')
NcitIntervention.create(preferred_name: 'ALVAC-CEA (6D)-B7.1 Vaccine', synonyms:  "ALVAC-CEA (6D)-B7.1 Vaccine; ALVAC-CEA (6D)-B7.1", definition: "A cancer vaccine consisting of ALVAC, a highly attenuated poxvirus strain derived from the canarypox virus.  ALVAC-CEA (6D)-B7.1 vaccine expresses both a highly immunogenic analogue (6D) of the immunodominant epitope of carcinoembryonic antigen (CEA) and B7.1 (also known as CD80), the natural ligand for the T-cell antigen CD28. This agent was designed to stimulate host immune responses against tumor cells that express CEA. (NCI04)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C29982')
NcitIntervention.create(preferred_name: 'ALVAC-CEA B7.1 Vaccine', synonyms:  "ALVAC CEA B7.1 Vaccine; ALVAC-CEA B7.1 Vaccine", definition: "A cancer vaccine that uses a viral vector system derived from the canarypox virus engineered to target the carcinoembryonic antigen (CEA). It causes infected cells to temporarily display CEA and activates the immune system to attack the tumor cells.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C1977')
NcitIntervention.create(preferred_name: 'ALVAC-CEA (VCP248)', synonyms:  "ALVAC-CEA (VCP248)", definition: "A replication-defective recombinant canarypox virus (ALVAC) that contains the entire human carcinoembryonic antigen (CEA) gene.  Vaccination with ALVAC-CEA (VCP248) may stimulate the host immune system to mount a cytotoxic T lymphocyte (CTL) response against CEA-positive tumor cells, thereby decreasing tumor growth. (NCI04)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C2743')
NcitIntervention.create(preferred_name: 'ALVAC-CEA Vaccine', synonyms:  "ALVAC-CEA Vaccine; ALVAC-CEA vaccine; ALVAC-CEA", definition: "A cancer vaccine consisting of ALVAC, a highly attenuated poxvirus strain derived from the canarypox virus, encoding for the tumor associated antigen (TAA) carcinoembryonic antigen (CEA), with potential antineoplastic activity. Upon administration, ALVAC-CEA vaccine expresses CEA and may stimulate a host immune response against tumor cells expressing CEA. This may result in the inhibition of tumor growth and/or metastasis. CEA is overexpressed in a variety of tumor cell types.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C1648')
NcitIntervention.create(preferred_name: 'ALVAC-ESO-1 Vaccine', synonyms:  "ALVAC-ESO-1 Vaccine", definition: "A cancer vaccine consisting of a replication-defective recombinant canarypox virus (ALVAC) encoding the cancer-testis antigen NY-ESO-1, with potential immunostimulatory and antineoplastic activities. Upon administration, ALVAC-ESO-1 vaccine may stimulate the host immune system to mount a cytotoxic T lymphocyte (CTL) response against NY-ESO-1-expressing cancer cells, which may result in the inhibition of tumor cell proliferation. NY-ESO-1, a tumor associated antigen (TAA), is found in normal testis and on the surface of various tumor cells.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C90558')
NcitIntervention.create(preferred_name: 'ALVAC-MART-1 Vaccine', synonyms:  "ALVAC-MART-1 Vaccine", definition: "A cancer vaccine containing a replication-defective recombinant canarypox virus (ALVAC), encoding an epitope of MART-1 (melanoma antigen recognized by T-cells), with potential immunostimulatory and antineoplastic activities. Upon administration, the MART-1 epitope is expressed by the ALVAC vector in ALVAC-MART-1 vaccine; a host cytotoxic T lymphocyte (CTL) response against MART-1-expressing tumor cells may follow, resulting in tumor cell lysis and decreased tumor cell proliferation.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C73999')
NcitIntervention.create(preferred_name: 'ALVAC-hB7.1', synonyms:  "ALVAC-hB7.1", definition: "A vaccine comprise of a canarypox viral vector that carries the gene for human B7.1 (CD80 antigen) with potential use as an autologous therapeutic cancer vaccine.  Tumor cells harvested from a patient are infected with ALVAC-hB7 1, thereby producing an autologous cell line that exhibits increased expression of HLA class I and class II, CD54 (ICAM), and CD80. Increased expression of these proteins by this autologous cell line may activate an antitumor T-cell response when the modified cells are administered to the patient. (NCI04)", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C2485')
NcitIntervention.create(preferred_name: 'ALVAC(2) Melanoma Multi-antigen Vaccine', synonyms:  "ALVAC(2) Melanoma Multi-antigen Vaccine", definition: "A therapeutic cancer vaccine, based on a replication-defective recombinant canarypox virus (ALVAC) encoding multiple melanoma antigens, with potential immunostimulatory and antineoplastic activities. Vaccination with ALVAC(2) melanoma multi-antigen therapeutic vaccine may stimulate the host immune system to mount an immune response against antigen-expressing melanoma cells, resulting in inhibition of tumor growth and/or metastasis.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C73998')
NcitIntervention.create(preferred_name: 'ALVAC(2)-NY-ESO-1 (M)/TRICOM Vaccine', synonyms:  "ALVAC(2)-NY-ESO-1 (M)/TRICOM Vaccine; vCP2292", definition: "A cancer vaccine consisting of a replication-defective recombinant canarypox virus [ALVAC(2)] encoding the cancer-testis antigen NY-ESO and the TRIad of COstimulatory Molecules (B7-1, ICAM-1 and LFA-3; also called TRICOM), with potential immunostimulatory and antineoplastic activities. Upon administration, ALVAC(2)/NY-ESO (M)/TRICOM vaccine may stimulate the host immune system to mount a cytotoxic T lymphocyte (CTL) response against NY-ESO-expressing cancer cells, which may result in the inhibition of tumor cell proliferation. NY-ESO-1, a tumor associated antigen (TAA), is found in normal testis and on the surface of various tumor cells, including bladder, breast, hepatocellular, melanoma, and prostate tumor cells. TRICOM may enhance antigen presentation and activate cytotoxic T-cells. In addition, ALVAC(2) encodes the vaccinia virus (vv) E3L ad K3L genes, which may potentiate the translation of the NY-ESO and TRICOM genes.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C79832')
NcitIntervention.create(preferred_name: 'ALVAC Vaccine', synonyms:  "ALVAC Vaccine; ALVAC", definition: "A derivative of the Canarypox Virus, ALVAC can infect mammalian cells but it can't replicate.  Thus, it produces a self-limiting infection which does not produce symptoms or harm the host.  When carrying foreign genes it will cause transient expression of protein.", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C1479')
NcitIntervention.create(preferred_name: 'Anti-inflammatory Antibody ALXN1007', synonyms:  "ALXN 1007; ALXN-1007; ALXN1007; Anti-inflammatory Antibody ALXN1007", definition: "A proprietary antibody that targets the complement inflammatory pathway with potential immunomodulating and anti-inflammatory activities. Upon intravenous administration, anti-inflammatory antibody ALXN1007 modulates the complement inflammatory pathway through binding to an as of yet undisclosed target. This may help in the treatment of certain inflammatory-mediated disorders, such as antiphospholipid syndrome (APS). This agent may also influence the progression of graft-versus-host disease (GvHD).", type_code: nil, ct_gov_type_code: nil, ncit_status: act, c_code: 'C118441')



StudyClassification.find_or_create_by(code: 'SAFE').update(name: 'Safety Study')
StudyClassification.find_or_create_by(code: 'EFFI').update(name: 'Efficacy Study')
StudyClassification.find_or_create_by(code: 'SAEF').update(name: 'Safety/Efficacy Study')
StudyClassification.find_or_create_by(code: 'BAV').update(name:  'Bio-availability Study')
StudyClassification.find_or_create_by(code: 'BEQ').update(name:   'Bio-equivalence Study')
StudyClassification.find_or_create_by(code: 'PD').update(name:   'Pharmacodynamics Study')
StudyClassification.find_or_create_by(code: 'PK').update(name:   'Pharmacokinetics Study')
StudyClassification.find_or_create_by(code: 'PKPD').update(name: 'Pharmacokinetics/dynamics Study')
StudyClassification.find_or_create_by(code: 'NA').update(name: 'N/A')

StudyModel.find_or_create_by(code: 'COH').update(name: 'Cohort')
StudyModel.find_or_create_by(code: 'CASECO').update(name: 'Case-control')
StudyModel.find_or_create_by(code: 'CASEON').update(name: 'Case-only')
StudyModel.find_or_create_by(code: 'CASECR').update(name: 'Case-crossover')
StudyModel.find_or_create_by(code: 'EORCS').update(name: 'Ecologic or Community')
StudyModel.find_or_create_by(code: 'FAMB').update(name: 'Family-based')
StudyModel.find_or_create_by(code: 'OTH').update(name: 'Other')

OutcomeMeasureType.find_or_create_by(code: 'PRI').update(name: 'Primary')
OutcomeMeasureType.find_or_create_by(code: 'SEC').update(name: 'Secondary')
OutcomeMeasureType.find_or_create_by(code: 'OTH').update(name: 'Other Prespecified')

Allocation.find_or_create_by(code: 'NA').update(name: 'N/A')
Allocation.find_or_create_by(code: 'RCT').update(name: 'Randomized')
Allocation.find_or_create_by(code: 'NRT').update(name: 'Non-Randomized')

InterventionModel.find_or_create_by(code: 'SG').update(name: 'Single Group Assignment')
InterventionModel.find_or_create_by(code: 'PL').update(name: 'Parallel Assignment')
InterventionModel.find_or_create_by(code: 'CO').update(name: 'Crossover Assignment')
InterventionModel.find_or_create_by(code: 'FT').update(name: 'Factorial Assignment')

Masking.find_or_create_by(code: 'OP').update(name: 'Open Label')
Masking.find_or_create_by(code: 'SB').update(name: 'Single Blind')
Masking.find_or_create_by(code: 'DB').update(name: 'Double Blind')

# AgeUnit.find_or_create_by(code: 'YR').update(name: 'Year')
AgeUnit.find_or_create_by(code: 'YRS').update(name: 'Years')
# AgeUnit.find_or_create_by(code: 'MO').update(name: 'Month')
AgeUnit.find_or_create_by(code: 'MOS').update(name: 'Months')
# AgeUnit.find_or_create_by(code: 'WK').update(name: 'Week')
AgeUnit.find_or_create_by(code: 'WKS').update(name: 'Weeks')
# AgeUnit.find_or_create_by(code: 'DY').update(name: 'Day')
AgeUnit.find_or_create_by(code: 'DYS').update(name: 'Days')
# AgeUnit.find_or_create_by(code: 'HR').update(name: 'Hour')
AgeUnit.find_or_create_by(code: 'HRS').update(name: 'Hours')
# AgeUnit.find_or_create_by(code: 'MN').update(name: 'Minute')
AgeUnit.find_or_create_by(code: 'MNS').update(name: 'Minutes')

AmendmentReason.find_or_create_by(code: 'AA').update(name: 'Administrative')
AmendmentReason.find_or_create_by(code: 'AS').update(name: 'Scientific')
AmendmentReason.find_or_create_by(code: 'AAS').update(name: 'Both')

AnatomicSite.find_or_create_by(code:'AN').update(name: 'Anus')
AnatomicSite.find_or_create_by(code:'BJ').update(name: 'Bones and Joints')
AnatomicSite.find_or_create_by(code:'BN').update(name: 'Brain and Nervous System')
AnatomicSite.find_or_create_by(code:'BF').update(name: 'Breast - Female')
AnatomicSite.find_or_create_by(code:'BM').update(name: 'Breast - Male')
AnatomicSite.find_or_create_by(code:'CE').update(name: 'Cervix')
AnatomicSite.find_or_create_by(code:'CO').update(name: 'Colon')
AnatomicSite.find_or_create_by(code:'CU').update(name: 'Corpus Uteri')
AnatomicSite.find_or_create_by(code:'ES').update(name: 'Esophagus')
AnatomicSite.find_or_create_by(code:'ET').update(name: 'Eye and Orbit')
AnatomicSite.find_or_create_by(code:'HL').update(name: "Hodgkin's Lymphoma")
AnatomicSite.find_or_create_by(code:'IS').update(name: 'Ill-Defined Sites')
AnatomicSite.find_or_create_by(code:'KA').update(name: "Kaposi's Sarcoma")
AnatomicSite.find_or_create_by(code:'KI').update(name: "Kidney")
AnatomicSite.find_or_create_by(code:'LA').update(name: 'Larynx')
AnatomicSite.find_or_create_by(code:'LN').update(name: 'Leukemia, not otherwise specified')
AnatomicSite.find_or_create_by(code:'LO').update(name: 'Leukemia, other')
AnatomicSite.find_or_create_by(code:'LP').update(name: 'Lip, Oral Cavity and Pharynx')
AnatomicSite.find_or_create_by(code:'LR').update(name: 'Liver')
AnatomicSite.find_or_create_by(code:'LU').update(name: 'Lung')
AnatomicSite.find_or_create_by(code:'LY').update(name: 'Lymphoid Leukemia')
AnatomicSite.find_or_create_by(code:'ME').update(name: 'Melanoma, Skin')
AnatomicSite.find_or_create_by(code:'ML').update(name: 'Multiple')
AnatomicSite.find_or_create_by(code:'MM').update(name: 'Multiple Myeloma')
AnatomicSite.find_or_create_by(code:'MY').update(name: 'Mycosis Fungoides')
AnatomicSite.find_or_create_by(code:'MZ').update(name: 'Myeloid and Monocyte Leukemia')
AnatomicSite.find_or_create_by(code:'NL').update(name: "Non-Hodgkin's Lymphoma")
AnatomicSite.find_or_create_by(code:'OD').update(name: "Other Digestive Organ")
AnatomicSite.find_or_create_by(code:'OE').update(name: "Other Endocrine System")
AnatomicSite.find_or_create_by(code:'OF').update(name: "Other Female Genital")
AnatomicSite.find_or_create_by(code:'OH').update(name: "Other Hematopoietic")
AnatomicSite.find_or_create_by(code:'OM').update(name: "Other Male Genital")
AnatomicSite.find_or_create_by(code:'OR').update(name: "Other Respiratory/Intrathoracic Organs")
AnatomicSite.find_or_create_by(code:'OS').update(name: "Other Skin")
AnatomicSite.find_or_create_by(code:'OU').update(name: "Other Urinary")
AnatomicSite.find_or_create_by(code:'OV').update(name: "Ovary")
AnatomicSite.find_or_create_by(code:'PA').update(name: "Pancreas")
AnatomicSite.find_or_create_by(code:'PR').update(name: "Prostate")
AnatomicSite.find_or_create_by(code:'RE').update(name: "Rectum")
AnatomicSite.find_or_create_by(code:'SI').update(name: "Small Intestine")
AnatomicSite.find_or_create_by(code:'SO').update(name: "Soft Tissue / Sarcoma")
AnatomicSite.find_or_create_by(code:'ST').update(name: "Stomach")
AnatomicSite.find_or_create_by(code:'TH').update(name: "Thyroid")
AnatomicSite.find_or_create_by(code:'UM').update(name: "Unknown Sites")
AnatomicSite.find_or_create_by(code:'UR').update(name: "Urinary Bladder")

UserStatus.find_or_create_by(code: 'INR').update(name: 'Pending')
UserStatus.find_or_create_by(code: 'ACT').update(name: 'Active')
UserStatus.find_or_create_by(code: 'INA').update(name: 'Inactive')
UserStatus.find_or_create_by(code: 'REJ').update(name: 'Rejected')
UserStatus.find_or_create_by(code: 'DEL').update(name: 'Deleted')


### MARKER STATIC DATA

CadsrMarkerStatus.find_or_create_by(code: 'ACT').update(name: 'Active')
CadsrMarkerStatus.find_or_create_by(code: 'INA').update(name: 'Inactive')

##### Here ids are important to given statically to display codes in a specific order on front end
AssayType.find_or_create_by(id:21,  code:  'Other' ).update(name:'Other')
AssayType.find_or_create_by(id:16,  code:  'HPLC' ).update(name:'High Performance Liquid Chromatography')
AssayType.find_or_create_by(id:5,   code:  'Immunohistochemistry (IHC)' ).update(name:'Immunohistochemistry Staining Method')
AssayType.find_or_create_by(id:6,   code:  'Western Blot (Immunoblot)' ).update(name:'Western Blotting')
AssayType.find_or_create_by(id:10,  code:  'ELISPOT' ).update(name:'Enzyme-linked Immunosorbent Spot Assay')
AssayType.find_or_create_by(id:17,  code:  'RT-PCR' ).update(name:'RT-PCR')
AssayType.find_or_create_by(id:12,  code:  'Cytotoxicity Assay' ).update(name:'Cytotoxicity Assay')
AssayType.find_or_create_by(id:8,   code:  'Sequencing' ).update(name:'Nucleic Acid Sequencing')
AssayType.find_or_create_by(id:18,  code:  'Multiplex Immunoassay' ).update(name:'Multiple Immunologic Technique')
AssayType.find_or_create_by(id:11,  code:  'Proliferation Assay' ).update(name:'Proliferation Assay')
AssayType.find_or_create_by(id:20,  code:  'Unspecified' ).update(name:'Unspecified')
AssayType.find_or_create_by(id:13,  code:  'Mass Spectrometry' ).update(name:'Mass Spectrometry')
AssayType.find_or_create_by(id:19,  code:  'Real-Time PCR (quantitative PCR)' ).update(name:'Real Time PCR')
AssayType.find_or_create_by(id:3,   code:  'Microarray' ).update(name:'Microarray')
AssayType.find_or_create_by(id:4,   code:  'ELISA' ).update(name:'ELISA')
AssayType.find_or_create_by(id:7,   code:  'Flow Cytometry' ).update(name:'Flow Cytometry')
AssayType.find_or_create_by(id:2,   code:  'In Situ Hybridization' ).update(name:'in situ Hybridization')
AssayType.find_or_create_by(id:14,  code:  'TUNEL assay' ).update(name:'TdT-Mediated dUTP Nick End Labeling Assay')
AssayType.find_or_create_by(id:1,   code:  'PCR' ).update(name:'Polymerase Chain Reaction')
AssayType.find_or_create_by(id:9,   code:  'Microscopy/Imaging' ).update(name:'Microscopy Imaging Technique')
AssayType.find_or_create_by(id:15,  code:  'Real-Time RT-PCR (qRT-PCR)' ).update(name:'Quantitative Reverse Transcriptase PCR')

EvaluationType.find_or_create_by(id:16, code:  'Other').update(name:  'Other')
EvaluationType.find_or_create_by(id:9,  code: 'Acetylation').update(name:  'Acetylation')
EvaluationType.find_or_create_by(id:11,  code: 'Loss of Heterozygosity (LOH)').update(name:  'Loss of Heterozygosity')
EvaluationType.find_or_create_by(id:7,  code: 'Phosphorylation').update(name:  'Phosphorylation Process')
EvaluationType.find_or_create_by(id:6,  code: 'Proteolytic Cleavage').update(name:  'Protein Cleavage')
EvaluationType.find_or_create_by(id:5,  code: 'Protein Activity').update(name:  'Protein or Enzyme Activity')
EvaluationType.find_or_create_by(id:4,  code: 'Subtyping').update(name:  'Subtype')
EvaluationType.find_or_create_by(id:3,  code: 'Cell Functionality').update(name:  'Cell Function')
EvaluationType.find_or_create_by(id:2,  code: 'Genetic Analysis').update(name:  'Genetic Testing')
EvaluationType.find_or_create_by(id:1,  code: 'Level/Quantity').update(name:  'Level Quantity Value')
EvaluationType.find_or_create_by(id:12, code: 'Germline Variant').update(name:  'Germline Mutation')
EvaluationType.find_or_create_by(id:13, code: 'Somatic Variant').update(name:  'Somatic Mutation')
EvaluationType.find_or_create_by(id:14, code: 'Chromosomal Amplification').update(name:  'Chromosomal Duplication')
EvaluationType.find_or_create_by(id:15, code: 'Chromosomal Deletion').update(name:  'Chromosomal Deletion')
EvaluationType.find_or_create_by(id:10,  code: 'Activation Status').update(name:  'Protein Activation Status')
EvaluationType.find_or_create_by(id:8,  code: 'Methylation').update(name:  'Methylation')

SpecimenType.find_or_create_by(id:14, code: 'Other').update(name:'Other')
SpecimenType.find_or_create_by(id:9,  code: 'Saliva').update(name:'Saliva')
SpecimenType.find_or_create_by(id:12, code: 'Feces').update(name:'Feces')
SpecimenType.find_or_create_by(id:1,  code: 'Serum').update(name:'Serum')
SpecimenType.find_or_create_by(id:11, code: 'Buccal Mucosa').update(name:'Buccal Mucosa')
SpecimenType.find_or_create_by(id:4,  code: 'Tissue').update(name:'Tissue')
SpecimenType.find_or_create_by(id:13, code: 'Unspecified').update(name:'Unspecified')
SpecimenType.find_or_create_by(id:7,  code: 'CSF').update(name:'Cerebrospinal Fluid')
SpecimenType.find_or_create_by(id:2,  code: 'Plasma').update(name:'Plasma')
SpecimenType.find_or_create_by(id:3,  code: 'Blood').update(name:'Blood')
SpecimenType.find_or_create_by(id:5,  code: 'Urine').update(name:'Urine')
SpecimenType.find_or_create_by(id:6,  code: 'PBMCs').update(name:'Peripheral Blood Mononuclear Cell')
SpecimenType.find_or_create_by(id:10, code: 'Cryopreserved Cells').update(name:'Cryopreserved Cell')
SpecimenType.find_or_create_by(id:8,  code: 'Bone Marrow').update(name:'Bone Marrow (biopsy/aspirate)')

BiomarkerUse.find_or_create_by(id:2, code:'Integrated').update(name:'Integrated')
BiomarkerUse.find_or_create_by(id:1, code:'Integral').update(name:'Integral')

BiomarkerPurpose.find_or_create_by(id:3, code: 'Stratification Factor').update(name:'Stratification Factor')
BiomarkerPurpose.find_or_create_by(id:2, code: 'Treatment Assignment').update(name:'Therapy Assignment')
BiomarkerPurpose.find_or_create_by(id:1, code: 'Eligibility Criterion').update(name:'Eligibility Determination')
BiomarkerPurpose.find_or_create_by(id:4, code: 'Research').update(name:'Research')
BiomarkerPurpose.find_or_create_by(id:5, code: 'Response Assessment').update(name:'Response Assessment')

IdentifierType.find_or_create_by(code: 'NCI').update(name: 'NCI')
IdentifierType.find_or_create_by(code: 'NCT').update(name: 'NCT')


OnholdReason.find_or_create_by(code: 'SIC').update(name: 'Submission Incomplete')
OnholdReason.find_or_create_by(code: 'SIM').update(name: 'Submission Incomplete - Missing Documents')
OnholdReason.find_or_create_by(code: 'SIG').update(name: 'Submission Invalid Grant')
OnholdReason.find_or_create_by(code: 'SOT').update(name: 'Submission Other (Submitter)')
OnholdReason.find_or_create_by(code: 'PCR').update(name: 'Pending CTRO Review')
OnholdReason.find_or_create_by(code: 'PDC').update(name: 'Pending Disease Curation')
OnholdReason.find_or_create_by(code: 'PPC').update(name: 'Pending Person Curation')
OnholdReason.find_or_create_by(code: 'POC').update(name: 'Pending Organization Curation')
OnholdReason.find_or_create_by(code: 'PIC').update(name: 'Pending Intervention Curation')
OnholdReason.find_or_create_by(code: 'POT').update(name: 'Pending Other (CTRO)')

RegistrationType.find_or_create_by(code: 'INV').update(name: 'Investigator')
RegistrationType.find_or_create_by(code:'NONPIV').update(name: 'Non Physician Investigator')
RegistrationType.find_or_create_by(code:'ASP').update(name: 'Associate Plus')
RegistrationType.find_or_create_by(code:'ASSO').update(name: 'Associate')
RegistrationType.find_or_create_by(code:'ASB').update(name: 'Associate Basic')

########### SEEDING STATIC DATA ENDS #######################

########## SEEDING APP SETTINGS BEGINS ##########

AppSetting.find_or_create_by(code: 'FM').update(name: 'Funding Mechanism List', value: 'see big value', big_value: 'B01,B08,B09,C06,D43,D71,DP1,DP2,DP3,E11,F05,F30,F31,F32,F33,F34,F37,F38,G07,G08,G11,G12,G13,G20,G94,H13,H23,H25,H28,H50,H57,H62,H64,H75,H79,HD4,HR1,HS5,I01,K01,K02,K05,K06,K07,K08,K12,K14,K18,K21,K22,K23,K24,K25,K26,K30,K99,KD1,KL1,KL2,L30,L32,L40,L50,L60,M01,N01,N02,N03,N43,N44,P01,P20,P30,P40,P41,P42,P50,P51,P60,P76,PL1,PN1,PN2,R00,R01,R03,R04,R06,R08,R13,R15,R17,R18,R21,R24,R25,R30,R33,R34,R36,R37,R41,R42,R43,R44,R49,R55,R56,R90,RC1,RC2,RC3,RC4,RL1,RL2,RL5,RL9,RS1,S06,S10,S11,S21,S22,SC1,SC2,SC3,T01,T02,T03,T06,T09,T14,T15,T32,T34,T35,T36,T37,T42,T90,TL1,TU2,U01,U09,U10,U11,U13,U14,U17,U18,U19,U1A,U1Q,U1S,U1T,U1V,U21,U22,U23,U24,U27,U2G,U2R,U30,U32,U34,U36,U38,U41,U42,U43,U44,U45,U47,U48,U49,U50,U51,U52,U53,U54,U55,U56,U57,U58,U59,U60,U61,U62,U65,U66,U75,U79,U81,U82,U83,U84,U87,U88,U90,UA1,UC1,UC2,UC3,UC6,UC7,UD1,UE1,UE2,UG1,UH1,UH2,UH3,UL1,UM1,UR1,UR3,UR6,UR8,US3,US4,UT1,UT2,VF1,X01,X02,X06,X98,Y01,Y02,Z01,Z02,Z1A')

AppSetting.find_or_create_by(code: 'IC').update(name: 'Institute Code List', value: 'see big value', big_value: 'AA,AE,AF,AG,AI,AM,AO,AR,AT,BC,BX,CA,CB,CD,CE,CH,CI,CK,CL,CM,CN,CO,CP,CR,CT,CU,CX,DA,DC,DD,DE,DK,DP,EB,EH,EM,EP,ES,EY,FD,GD,GH,GM,GW,HB,HC,HD,HG,HI,HK,HL,HM,HO,HP,HR,HS,HV,HX,HY,IP,JT,LM,MD,MH,MN,NB,NH,NR,NS,NU,OA,OC,OD,OF,OH,OL,OR,PC,PH,PR,PS,RC,RD,RG,RM,RR,RX,SC,SF,SH,SM,SP,SU,TI,TP,TR,TS,TW,VA,WC,WH,WT')

AppSetting.find_or_create_by(code: 'NCI').update(name: 'NCI Division/Program Code List', value: 'see big value', big_value: 'CCR,CCT/CTB,CIP,CDP,CTEP,DCB,DCCPS,DCEG,DCP,DEA,DTP,OD,OSB/SPOREs,TRP,RRP,N/A')

AppSetting.find_or_create_by(code: 'NIH').update(name: 'NIH Institution Code List', value: 'see big value', big_value: 'NEI-National Eye Institute;NHLBI-National Heart, Lung, and Blood Institute;NHGRI-National Human Genome Research Institute;NIA-National Institute on Aging;NIAAA-National Institute on Alcohol Abuse and Alcoholism;NIAID-National Institute of Allergy and Infectious Diseases;NIAMS-National Institute of Arthritis and Musculoskeletal and Skin Diseases;NIBIB-National Institute of Biomedical Imaging and Bioengineering;NICHD-NICHD-Eunice Kennedy Shriver National Institute of Child Health and Human Development;NIDCD-National Institute on Deafness and Other Communication Disorders;NIDCR-National Institute of Dental and Craniofacial Research;NIDDK-National Institute of Diabetes and Digestive and Kidney Diseases;NIDA-National Institute on Drug Abuse;NIEHS-National Institute of Environmental Health Sciences;NIGMS-National Institute of General Medical Sciences;NIMH-National Institute of Mental Health;NINDS-National Institute of Neurological Disorders and Stroke;NINR-National Institute of Nursing Research;NLM-National Library of Medicine;CIT-Center for Information Technology;CSR-Center for Scientific Review;FIC-John E. Fogarty International Center for Advanced Study in the Health Sciences;NCCAM-National Center for Complementary and Alternative Medicine;NCMHD-National Center on Minority Health and Health Disparities;NCRR-National Center for Research Resources (NCRR);CC-NIH Clinical Center;OD-Office of the Director')

AppSetting.find_or_create_by(code: 'ACCEPTED_FILE_TYPES_REG').update(name: 'Accepted File Types for Registry', value: 'pdf,doc,docx,docm,xls,xlsx,xlsm,xlsb,rtf,txt', big_value: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-word.document.macroenabled.12, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroenabled.12, application/vnd.ms-excel.sheet.binary.macroenabled.12, application/rtf, text/plain')

AppSetting.find_or_create_by(code: 'ACCEPTED_FILE_TYPES').update(name: 'Accepted File Types for PA', value: 'pdf,doc,docx,docm,xls,xlsx,xlsm,xlsb,rtf,txt', big_value: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-word.document.macroenabled.12, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroenabled.12, application/vnd.ms-excel.sheet.binary.macroenabled.12, application/rtf, text/plain')

AppSetting.find_or_create_by(code: 'TRIAL_DOCUMENT_TYPES').update(name: 'Trial Related Documents', value: 'Protocol Document,IRB Approval,TSR,Informed Consent Document,Change Memo,Complete Sheet,Other,List of Participating Sites,Protocol Highlighted Document', big_value: 'nothing here')

AppSetting.find_or_create_by(code: 'NIH_NCI_DIV_PA').update(name: 'NCI Division/Department Code List for PA', value: 'see big value', big_value: 'CCR,CTEP,DCCPS,DCP,NHLBI')

AppSetting.find_or_create_by(code: 'NIH_NCI_PROG_PA').update(name: 'NCI Division/Program Code List for PA', value: 'see big value', big_value: 'BIQSFP,SPORE,Steering Commitee Reviewed')

AppSetting.find_or_create_by(code: 'SAMPLING_METHOD_PA').update(name: 'Sampling Method', value: 'Probability Sample,Non-Probability Sample', big_value: 'see value')

AppSetting.find_or_create_by(code: 'FILE_STORAGE_DIR').update(name: 'Storage directory for uploaded files', value: '../../../storage/trial', big_value: 'see value')

AppSetting.find_or_create_by(code: 'FILE_CACHE_DIR').update(name: 'Cache directory for uploaded files', value: '../../../storage/tmp', big_value: 'see value')


trial_status_transition = '{
                             "STATUSZERO": {
                               "INR": {"valid": "Yes"},
                               "APP": {"warnings": [{"status": "INR"}]},
                               "WIT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "ACT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "EBI": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "CAC": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "CAI": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}]},
                               "TCL": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "TCA": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}]},
                               "COM": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]},
                               "ACO": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]}
                             },
                             "INR": {
                               "INR": {"errors": [{"message": "Duplicate"}]},
                               "APP": {"valid": "Yes", "sameDay": "Yes"},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
                               "EBI": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "APP": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Duplicate"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "WIT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Duplicate"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Duplicate"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "EBI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Duplicate"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAC": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Duplicate"}]},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Duplicate"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"valid": "Yes", "sameDay": "Yes"},
                               "ACO": {"valid": "Yes", "sameDay": "Yes"}
                             },
                             "TCL": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Duplicate"}]},
                               "TCA": {"valid": "Yes", "sameDay": "Yes"},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "TCA": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Duplicate"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "COM": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Duplicate"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACO": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Duplicate"}]}
                             }
                           }'

AppSetting.find_or_create_by(code: 'TRIAL_STATUS_TRANSITION').update(name: 'Trial Status Transition Matrix', value: 'see big value', big_value: trial_status_transition)

paa_trial_status_transition = '{
                             "STATUSZERO": {
                               "INR": {"valid": "Yes"},
                               "APP": {"warnings": [{"status": "INR"}]},
                               "WIT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "ACT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "EBI": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "CAC": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "CAI": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}]},
                               "TCL": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "TCA": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}]},
                               "COM": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]},
                               "ACO": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]}
                             },
                             "INR": {
                               "INR": {"errors": [{"message": "Duplicate"}]},
                               "APP": {"valid": "Yes", "sameDay": "Yes"},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
                               "EBI": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "APP": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Duplicate"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "WIT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Duplicate"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Duplicate"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "EBI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Duplicate"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAC": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Duplicate"}]},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Duplicate"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"valid": "Yes", "sameDay": "Yes"},
                               "ACO": {"valid": "Yes", "sameDay": "Yes"}
                             },
                             "TCL": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Duplicate"}]},
                               "TCA": {"valid": "Yes", "sameDay": "Yes"},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "TCA": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Duplicate"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "COM": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Duplicate"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACO": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Duplicate"}]}
                             }
                           }'

AppSetting.find_or_create_by(code: 'PA_TRIAL_STATUS_TRANSITION').update(name: 'PA Trial Status Transition Matrix', value: 'see big value', big_value: paa_trial_status_transition)

abstraction_validation_trial_status_transition = '{
                             "STATUSZERO": {
                               "INR": {"valid": "Yes"},
                               "APP": {"warnings": [{"status": "INR"}]},
                               "WIT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "ACT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "EBI": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "CAC": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "CAI": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}]},
                               "TCL": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "TCA": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}]},
                               "COM": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]},
                               "ACO": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]}
                             },
                             "INR": {
                               "INR": {"errors": [{"message": "Duplicate"}]},
                               "APP": {"valid": "Yes", "sameDay": "Yes"},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
                               "EBI": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "APP": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Duplicate"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "WIT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Duplicate"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Duplicate"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "EBI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Duplicate"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAC": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Duplicate"}]},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Duplicate"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"valid": "Yes", "sameDay": "Yes"},
                               "ACO": {"valid": "Yes", "sameDay": "Yes"}
                             },
                             "TCL": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Duplicate"}]},
                               "TCA": {"valid": "Yes", "sameDay": "Yes"},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "TCA": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Duplicate"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "COM": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Duplicate"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACO": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Duplicate"}]}
                             }
                           }'

AppSetting.find_or_create_by(code: 'PA_VALIDATION_TRIAL_STATUS_TRANSITION').update(name: 'PA Validation Trial Status Transition Matrix', value: 'see big value', big_value: abstraction_validation_trial_status_transition)

sr_status_transition = '{
                             "STATUSZERO": {
                               "INR": {"valid": "Yes"},
                               "APP": {"warnings": [{"status": "INR"}]},
                               "WIT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "ACT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "EBI": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "CAC": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "CAI": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}]},
                               "TCL": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "TCA": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}]},
                               "COM": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]},
                               "ACO": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]}
                             },
                             "INR": {
                               "INR": {"errors": [{"message": "Duplicate"}]},
                               "APP": {"valid": "Yes", "sameDay": "Yes"},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
                               "EBI": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "APP": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Duplicate"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "WIT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Duplicate"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Duplicate"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "EBI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Duplicate"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAC": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Duplicate"}]},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Duplicate"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"valid": "Yes", "sameDay": "Yes"},
                               "ACO": {"valid": "Yes", "sameDay": "Yes"}
                             },
                             "TCL": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Duplicate"}]},
                               "TCA": {"valid": "Yes", "sameDay": "Yes"},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "TCA": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Duplicate"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "COM": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Duplicate"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACO": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Duplicate"}]}
                             }
                           }'

AppSetting.find_or_create_by(code: 'SR_STATUS_TRANSITION').update(name: 'Site Recruitment Status Transition Matrix', value: 'see big value', big_value: sr_status_transition)

AppSetting.find_or_create_by(code: 'CLINICAL_TRIALS_IMPORT_URL').update(name: 'ClinicalTrials.gov import URL', value: 'https://clinicaltrials.gov/show/NCT********?displayxml=true')

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_URL').update(name: 'NCI Thesaurus URL', value: 'https://evs.nci.nih.gov/ftp1/NCI_Thesaurus/Branches/')

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_FILES').update(name: 'NCI Thesaurus files', value: 'see big value', big_value: 'Neoplasm.zip')

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_INFO_URL').update(name: 'NCI Thesaurus page for a term', value: 'https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=NCI_Thesaurus&code=')

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_TREE_URL').update(name: 'NCI Thesaurus tree for a term', value: 'https://ncit.nci.nih.gov/ncitbrowser/ajax?action=search_hierarchy&ontology_node_ns=NCI_Thesaurus&ontology_display_name=NCI_Thesaurus&ontology_node_id=')

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_INTERVENTIONS').update(name: 'NCI Thesaurus files for Interventions', value: 'see big value', big_value: 'Drug_Food_Chemical_or_Biomedical_Material.zip')

AppSetting.find_or_create_by(code: 'NIH_GSA_MSG').update(name: 'User Login GSA Message for user', value: 'see big value',
                             big_value: '
                                  This is a U.S. Government computer system, which may be accessed and used only for authorized Government business by authorized personnel. Unauthorized access or use of this computer system may subject violators to criminal, civil, and/or administrative action.

                                  All information on this computer system may be intercepted, recorded, read, copied, and disclosed by and to authorized personnel for official purposes, including criminal investigations. Such information includes sensitive data encrypted to comply with confidentiality and privacy requirements. Access or use of this computer system by any person, whether authorized or unauthorized, constitutes consent to these terms.

                                  There is no right of privacy in this system.
                             ')

AppSetting.find_or_create_by(code: 'NON_NIH_GSA_MSG').update(name: 'User Login GSA Message for user', value: 'see big value',
                             big_value: '
                                  This is a U.S. Government computer system, which may be accessed and used only for authorized Government business by authorized personnel. Unauthorized access or use of this computer system may subject violators to criminal, civil, and/or administrative action.

                                  All information on this computer system may be intercepted, recorded, read, copied, and disclosed by and to authorized personnel for official purposes, including criminal investigations. Such information includes sensitive data encrypted to comply with confidentiality and privacy requirements. Access or use of this computer system by any person, whether authorized or unauthorized, constitutes consent to these terms. There is no right of privacy in this system.


                                  NOTIFICATION TO RESPONDENT OF ESTIMATED BURDEN
                                  OMB#: 0925-0600 EXP. DATE: 5/31/16
                                  Public reporting burden for this collection of information is estimated to average sixty (60) minutes for this questionnaire, including the time to review instructions, search existing data sources, gather and maintain the data needed, and complete and review the collection of information. An agency may not conduct or sponsor, and a person is not required to respond to, a collection of information unless it displays a current, valid OMB control number.

                                  Send comments regarding this burden estimate or any other aspect of this collection of information, including suggestions for reducing the burden to:  NIH, Project Clearance Branch, 6705 Rockledge Drive, MSC 7974, Bethesda, MD 20892-7974, ATTN: PRA (0925-0600).

                                  Do not return the completed form to this address.
                             ')
#AUM Role Matrix (roles will be assigned per environment i.e. prod, qa, demo)
AppSetting.find_or_create_by(code: 'USER_ROLES', description: 'Double pipe delimited values').update(name: 'User Roles', value: 'see big value',
                             big_value:
                                 '[
                                     {
                                        "id": "ROLE_RO",
                                        "name": "Read Only",
                                        "assign_access": "",
                                        "org_source_status_search_access": "ACT"
                                     },
                                     {
                                        "id": "ROLE_ACCOUNT-APPROVER",
                                        "name": "Account Approver",
                                        "assign_access": "ROLE_ACCOUNT-APPROVER,ROLE_RO,ROLE_SUPER,ROLE_ADMIN,ROLE_CURATOR,ROLE_ABSTRACTOR,ROLE_TRIAL-SUBMITTER,ROLE_SITE-SU,ROLE_SERVICE-REST",
                                        "org_source_status_search_access": "ACT"
                                     },
                                     {
                                        "id": "ROLE_CURATOR",
                                        "name": "Curator",
                                        "assign_access": "",
                                        "org_source_status_access": "ACT,PEND,INACT",
                                        "org_source_status_search_access": "ACT,PEND,INACT,NULLIFIED,LEG"
                                     },
                                     {
                                        "id": "ROLE_ABSTRACTOR",
                                        "name": "Abstractor",
                                        "assign_access": "ROLE_TRIAL-SUBMITTER,ROLE_SITE-SU",
                                        "org_source_status_access": "ACT,PEND,INACT",
                                        "org_source_status_search_access": "ACT,PEND,INACT,NULLIFIED,LEG"
                                     },
                                     {
                                        "id": "ROLE_SUPER",
                                        "name": "Super",
                                        "assign_access": "ROLE_TRIAL-SUBMITTER,ROLE_SITE-SU",
                                        "org_source_status_access": "ACT,PEND,INACT",
                                        "org_source_status_search_access": "ACT,PEND,INACT,NULLIFIED,LEG"
                                     },
                                     {
                                        "id": "ROLE_ADMIN",
                                        "name": "Admin",
                                        "assign_access": "ROLE_ACCOUNT-APPROVER,ROLE_RO,ROLE_SUPER,ROLE_ADMIN,ROLE_CURATOR,ROLE_ABSTRACTOR,ROLE_TRIAL-SUBMITTER,ROLE_SITE-SU,ROLE_SERVICE-REST",
                                        "org_source_status_access": "ACT,PEND,INACT",
                                        "org_source_status_search_access": "ACT,PEND,INACT,NULLIFIED,LEG"
                                     },
                                     {
                                        "id": "ROLE_TRIAL-SUBMITTER",
                                        "name": "Trial Submitter",
                                        "assign_access": "",
                                        "org_source_status_search_access": "ACT"
                                     },
                                     {
                                        "id": "ROLE_SITE-SU",
                                        "name": "Site Administrator",
                                        "assign_access": "ROLE_TRIAL-SUBMITTER,ROLE_SITE-SU",
                                        "org_source_status_search_access": "ACT"
                                     },
                                     {
                                        "id": "ROLE_SERVICE-REST",
                                        "name": "Service Rest",
                                        "assign_access": ""
                                     }
                                 ]'
)

AppSetting.find_or_create_by(code: 'NIH_USER_FUNCTIONS').update(description: 'Double pipe delimited values', name: 'NIH User Functions', value: 'see big value', big_value: 'View Information||Manage and Curate Persons, Organizations and Families||Manage and Abstract Trial Registrations and Results||Manage Abstraction functionally||Administer/Approve CTRP Accounts||Administer and Manage all Functionality and Configurations')

AppSetting.find_or_create_by(code: 'NIHEXT_USER_FUNCTIONS').update(description: 'Double pipe delimited values', name: 'NIHEXT User Functions', value: 'see big value', big_value: 'Submit Trials||Manage/Approve Trial ownership, Accruals, Site accounts')

AppSetting.find_or_create_by(code: 'Federated_USER_FUNCTIONS').update(description: 'Double pipe delimited values', name: 'Federated User Functions', value: 'see big value', big_value: 'Submit Trials')

########## SEEDING APP SETTINGS ENDS ##########

########## SEEDING CTGOV IMPORT EXPORT STARTS ##########

CtGovImportExport.find_or_create_by(from:'N/A', from:'N/A',import_or_export:'import' ,model:'Allocation')
CtGovImportExport.find_or_create_by(from:'Randomized', from:'Randomized',import_or_export:'import' ,model:'Allocation')
CtGovImportExport.find_or_create_by(to:'Non-Randomized', from:'Non-Randomized',import_or_export:'import' ,model:'Allocation')


CtGovImportExport.find_or_create_by(from:'N/A', to:'N/A',import_or_export:'import' ,model:'StudyClassification')
CtGovImportExport.find_or_create_by(from:'Safety Study', to:'Safety Study',import_or_export:'import' ,model:'StudyClassification')
CtGovImportExport.find_or_create_by(from:'Efficacy Study', to:'Efficacy Study',import_or_export:'import' ,model:'StudyClassification')
CtGovImportExport.find_or_create_by(from:'Safety/Efficacy Study', to:'Safety/Efficacy Study',import_or_export:'import' ,model:'StudyClassification')
CtGovImportExport.find_or_create_by(from:'Bio-availability StudY', to:'Bioavailability Study',import_or_export:'import' ,model:'StudyClassification')
CtGovImportExport.find_or_create_by(from:'Bio-equivalence Study', to:'Bioequivalence Study',import_or_export:'import' ,model:'StudyClassification')
CtGovImportExport.find_or_create_by(from:'Pharmacodynamics Study', to:'Pharmacodynamics Study',import_or_export:'import' ,model:'StudyClassification')
CtGovImportExport.find_or_create_by(from:'Pharmacokinetics Study', to:'Pharmacokinetics Study',import_or_export:'import' ,model:'StudyClassification')
CtGovImportExport.find_or_create_by(from:'Pharmacokinetics/dynamics Study', to:'Pharmacokinetics/Pharmacodynamics Study',import_or_export:'import' ,model:'StudyClassification')

CtGovImportExport.find_or_create_by(from:'Single Group Assignment', to:'Single Group Assignment',import_or_export:'import' ,model:'InterventionModel')
CtGovImportExport.find_or_create_by(from:'Parallel Assignment', to:'Parallel Assignment',import_or_export:'import' ,model:'InterventionModel')
CtGovImportExport.find_or_create_by(from:'Crossover Assignment', to:'Crossover Assignment',import_or_export:'import' ,model:'InterventionModel')
CtGovImportExport.find_or_create_by(from:'Factorial Assignment', to:'Factorial Assignment',import_or_export:'import' ,model:'InterventionModel')

CtGovImportExport.find_or_create_by(from:'Treatment', to:'Treatment',import_or_export:'import' ,model:'PrimaryPurpose')
CtGovImportExport.find_or_create_by(from:'Prevention', to:'Prevention',import_or_export:'import' ,model:'PrimaryPurpose')
CtGovImportExport.find_or_create_by(from:'Supportive Care', to:'Supportive Care',import_or_export:'import' ,model:'PrimaryPurpose')
CtGovImportExport.find_or_create_by(from:'Screening', to:'Screening',import_or_export:'import' ,model:'PrimaryPurpose')
CtGovImportExport.find_or_create_by(from:'Diagnostic', to:'Diagnostic',import_or_export:'import' ,model:'PrimaryPurpose')
CtGovImportExport.find_or_create_by(from:'Health Services Research', to:'Health Services Research',import_or_export:'import' ,model:'PrimaryPurpose')
CtGovImportExport.find_or_create_by(from:'Basic Science', to:'Basic Science',import_or_export:'import' ,model:'PrimaryPurpose')
CtGovImportExport.find_or_create_by(from:'Other', to:'Other',import_or_export:'import' ,model:'PrimaryPurpose')


CtGovImportExport.find_or_create_by(from:'Submitted', to:'Approved',import_or_export:'import' ,model:'Board Approval Status')
CtGovImportExport.find_or_create_by(from:'Approved', to:'Approved',import_or_export:'import' ,model:'Board Approval Status')
CtGovImportExport.find_or_create_by(from:'Submitted', to:'Pending',import_or_export:'import' ,model:'Board Approval Status')
CtGovImportExport.find_or_create_by(from:'Pending', to:'Pending',import_or_export:'import' ,model:'Board Approval Status')
CtGovImportExport.find_or_create_by(from:'Submitted', to:'Exempt',import_or_export:'import' ,model:'Board Approval Status')
CtGovImportExport.find_or_create_by(from:'Exempt', to:'Exempt',import_or_export:'import' ,model:'Board Approval Status')
CtGovImportExport.find_or_create_by(from:'Submitted', to:'Approved',import_or_export:'import' ,model:'Board Approval Status')
CtGovImportExport.find_or_create_by(from:'Denied', to:'Denied',import_or_export:'import' ,model:'Board Approval Status')
CtGovImportExport.find_or_create_by(from:'Submission Not required', to:'Not required',import_or_export:'import' ,model:'Board Approval Status')


CtGovImportExport.find_or_create_by(from:'Not yet recruiting', to:'In Review',import_or_export:'import' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(from:'Withdrawn', to:'Withdrawn',import_or_export:'import' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(from:'Recruiting', to:'Active',import_or_export:'import' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(from:'Enrolling by Invitation', to:'Enrolling by Invitation',import_or_export:'import' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(from:'Suspended', to:'Temporarily Closed to Accrual',import_or_export:'import' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(from:'Active, not recruiting', to:'Closed to Accrual',import_or_export:'import' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(from:'Terminated', to:'Administratively Complete',import_or_export:'import' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(from:'Completed', to:'Complete',import_or_export:'import' ,model:'Trial Status')


CtGovImportExport.find_or_create_by(to:'Not yet recruiting', from:'In Review',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Withdrawn', from:'Withdrawn',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Recruiting', from:'Active',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Enrolling by Invitation', from:'Enrolling by Invitation',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Suspended', from:'Temporarily Closed to Accrual',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Active, not recruiting', from:'Closed to Accrual',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Terminated', from:'Administratively Complete',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Completed', from:'Completed',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Not yet recruiting', from:'Approved',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Suspended', from:'Temporarily Closed to Accrual and Intervention',import_or_export:'export' ,model:'Trial Status')
CtGovImportExport.find_or_create_by(to:'Active, not recruiting', from:'Closed to Accrual and Intervention',import_or_export:'export' ,model:'Trial Status')


CtGovImportExport.find_or_create_by(from:'Phase 0', to:'O',import_or_export:'import' ,model:'Phase')
CtGovImportExport.find_or_create_by(from:'Phase 1', to:'I',import_or_export:'import' ,model:'Phase')
CtGovImportExport.find_or_create_by(from:'Phase 1/2', to:'I/II',import_or_export:'import' ,model:'Phase')
CtGovImportExport.find_or_create_by(from:'Phase 2', to:'II',import_or_export:'import' ,model:'Phase')
CtGovImportExport.find_or_create_by(from:'Phase 2/3', to:'II/III',import_or_export:'import' ,model:'Phase')
CtGovImportExport.find_or_create_by(from:'Phase 3', to:'III',import_or_export:'import' ,model:'Phase')
CtGovImportExport.find_or_create_by(from:'Phase 4', to:'IV',import_or_export:'import' ,model:'Phase')
CtGovImportExport.find_or_create_by(from:'N/A', to:'N/A',import_or_export:'import' ,model:'Phase')

CtGovImportExport.find_or_create_by(to:'Phase 0', from:'O',import_or_export:'export' ,model:'Phase')
CtGovImportExport.find_or_create_by(to:'Phase 1', from:'I',import_or_export:'export' ,model:'Phase')
CtGovImportExport.find_or_create_by(to:'Phase 1/2', from:'I/II',import_or_export:'export' ,model:'Phase')
CtGovImportExport.find_or_create_by(to:'Phase 2', from:'II',import_or_export:'export' ,model:'Phase')
CtGovImportExport.find_or_create_by(to:'Phase 2/3', from:'II/III',import_or_export:'export' ,model:'Phase')
CtGovImportExport.find_or_create_by(to:'Phase 3', from:'III',import_or_export:'export' ,model:'Phase')
CtGovImportExport.find_or_create_by(to:'Phase 4', from:'IV',import_or_export:'export' ,model:'Phase')
CtGovImportExport.find_or_create_by(to:'N/A', from:'N/A',import_or_export:'export' ,model:'Phase')

CtGovImportExport.find_or_create_by(from:'In Review',                     to:'Not yet recruiting',import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Withdrawn',                     to:'Withdrawn',import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Active',                        to:'Recruiting', import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Enrolling by Invitation',       to:'Enrolling by Invitation', import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Temporarily Closed to Accrual', to:'Suspended', import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Closed to Accrual',             to:'Active, not recruiting', import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Administratively Complete',     to:'Terminated', import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Completed',                     to:'Completed', import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Not yet recruiting',            to:'Approved', import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Temporarily Closed to Accrual and Intervention',  to:'Suspended', import_or_export:'export' ,model:'Site Recruitement Status')
CtGovImportExport.find_or_create_by(from:'Closed to Accrual and Intervention',   to:'Active, not recruiting', import_or_export:'export' ,model:'Site Recruitement Status')

CtGovImportExport.find_or_create_by(from:'Years', to:'Years',import_or_export:'export' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Months', to:'Months',import_or_export:'export' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Weeks', to:'Weeks',import_or_export:'export' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Days', to:'Days',import_or_export:'export' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Hours', to:'Hours',import_or_export:'export' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Minutes', to:'Minutes',import_or_export:'export' ,model:'AgeUnit')

CtGovImportExport.find_or_create_by(from:'Years', to:'Years',import_or_export:'import' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Months', to:'Months',import_or_export:'import' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Weeks', to:'Weeks',import_or_export:'import' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Days', to:'Days',import_or_export:'import' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Hours', to:'Hours',import_or_export:'import' ,model:'AgeUnit')
CtGovImportExport.find_or_create_by(from:'Minutes', to:'Minutes',import_or_export:'import' ,model:'AgeUnit')


CtGovImportExport.find_or_create_by(from:'Male', to:'Male',import_or_export:'import' ,model:'Gender')
CtGovImportExport.find_or_create_by(from:'Female', to:'Female',import_or_export:'import' ,model:'Gender')
CtGovImportExport.find_or_create_by(from:'Both', to:'Both',import_or_export:'import' ,model:'Gender')

CtGovImportExport.find_or_create_by(from:'Male', to:'Male',import_or_export:'export' ,model:'Gender')
CtGovImportExport.find_or_create_by(from:'Female', to:'Female',import_or_export:'export' ,model:'Gender')
CtGovImportExport.find_or_create_by(from:'Both', to:'Both',import_or_export:'export' ,model:'Gender')

CtGovImportExport.find_or_create_by(from:'Drug', to:'Drug',import_or_export:'export' ,model:'InterventionType')
CtGovImportExport.find_or_create_by(from:'Device', to:'Device',import_or_export:'export' ,model:'InterventionType')
CtGovImportExport.find_or_create_by(from:'Biological/Vaccine', to:'Biological/Vaccine',import_or_export:'export' ,model:'InterventionType')
CtGovImportExport.find_or_create_by(from:'Procedure/Surgery', to:'Procedure/Surgery',import_or_export:'export' ,model:'InterventionType')
CtGovImportExport.find_or_create_by(from:'Radiation', to:'Radiation',import_or_export:'export' ,model:'InterventionType')
CtGovImportExport.find_or_create_by(from:'Behavioral', to:'Behavioral',import_or_export:'export' ,model:'InterventionType')
CtGovImportExport.find_or_create_by(from:'Genetic', to:'Genetic',import_or_export:'export' ,model:'InterventionType')
CtGovImportExport.find_or_create_by(from:'Dietary Supplement', to:'Dietary Supplement',import_or_export:'export' ,model:'InterventionType')
CtGovImportExport.find_or_create_by(from:'Other', to:'Other',import_or_export:'export' ,model:'InterventionType')



CtGovImportExport.find_or_create_by(from:'None Retained', to:'None Retained',import_or_export:'export' ,model:'BiospecimenRetention')
CtGovImportExport.find_or_create_by(from:'Samples With DNA', to:'Samples With DNA',import_or_export:'export' ,model:'BiospecimenRetention')
CtGovImportExport.find_or_create_by(from:'Samples Without DNA', to:'Samples Without DNA',import_or_export:'export' ,model:'BiospecimenRetention')

CtGovImportExport.find_or_create_by(from:'None Retained', to:'None Retained',import_or_export:'import' ,model:'BiospecimenRetention')
CtGovImportExport.find_or_create_by(from:'Samples With DNA', to:'Samples With DNA',import_or_export:'import' ,model:'BiospecimenRetention')
CtGovImportExport.find_or_create_by(from:'Samples Without DNA', to:'Samples Without DNA',import_or_export:'import' ,model:'BiospecimenRetention')



CtGovImportExport.find_or_create_by(from:'Prospective', to:'Prospective',import_or_export:'import' ,model:'TimePerspectives')
CtGovImportExport.find_or_create_by(from:'Retrospective', to:'Retrospective',import_or_export:'import' ,model:'TimePerspectives')
CtGovImportExport.find_or_create_by(from:'Cross sectional', to:'Cross sectional',import_or_export:'import' ,model:'TimePerspectives')
CtGovImportExport.find_or_create_by(from:'Other', to:'Other',import_or_export:'import' ,model:'TimePerspectives')

CtGovImportExport.find_or_create_by(from:'Prospective', to:'Prospective',import_or_export:'export' ,model:'TimePerspectives')
CtGovImportExport.find_or_create_by(from:'Retrospective', to:'Retrospective',import_or_export:'export' ,model:'TimePerspectives')
CtGovImportExport.find_or_create_by(from:'Cross sectional', to:'Cross sectional',import_or_export:'export' ,model:'TimePerspectives')
CtGovImportExport.find_or_create_by(from:'Other', to:'Other',import_or_export:'export' ,model:'TimePerspectives')

CtGovImportExport.find_or_create_by(from:'No', to:'No',import_or_export:'import' ,model:'AcceptVol')
CtGovImportExport.find_or_create_by(from:'Accepts Healthy Volunteers', to:'Yes',import_or_export:'import' ,model:'AcceptVol')
CtGovImportExport.find_or_create_by(from:'No', to:'No',import_or_export:'export' ,model:'AcceptVol')
CtGovImportExport.find_or_create_by(from:'Yes', to:'Accepts Healthy Volunteers',import_or_export:'export' ,model:'AcceptVol')



########## SEEDING CTGOV IMPORT EXPORT ENDS ##########





########## SEEDING MAIL TEMPLATES STARTS ##########

MailTemplate.find_or_create_by(
                code: 'TRIAL_REG',
                name: 'Trial Registration',
                from: 'noreply@ctrp.nci.nih.gov',
                to: 'noreply@ctrp.nci.nih.gov',
                subject: 'NCI CTRP: Trial RECORD CREATED for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
                body_text: 'Text version.',
                body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body><hr> <p><b>Title: </b>${trialTitle}</p> ${trialIdentifiers} <table border="0"> <tr> <td><b>Submission Date:</b></td> <td>${submissionDate}</td> </tr> </table> <hr> <p>Date: ${CurrentDate}</p> <p>Dear ${SubmitterName},</p> <p>You have successfully created a record in the NCI Clinical Trials Reporting Program (CTRP) for the trial identified above.</p> <p>The CTRP has assigned your trial the following unique NCI Trial Identification (Trial ID) number:<br> <b>${nciTrialIdentifier}</b><br><br> Please reference this number in all future correspondence with the Clinical Trials Reporting Office (CTRO).</p> <p><b>NEXT STEPS:</b><br> The Clinical Trials Reporting Office (CTRO) staff is reviewing your trial to ensure that it meets all of the requirements for registration in the CTRP system. They will email you their findings within two (2) business days. </p> <p>In the meantime, if you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov.</p> <p>Thank you for submitting your trial for registration in the Clinical Trials Reporting Program.</p></body></html>'
)

MailTemplate.find_or_create_by(
    code: 'TRIAL_UPDATE',
    name: 'Trial Update',
    from: 'noreply@ctrp.nci.nih.gov',
    to: '${trialSubmitterEmail}',
    subject: 'NCI CTRP: Trial RECORD UPDATED for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>
                                <p><b>NCI Trial ID: </b>${nciTrialIdentifier}</p>
                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>Submitting Organization: </b>${submitting_organization}</p>
                                <p><b>Submission Date: </b>${submissionDate}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>The NCI Clinical Trials Reporting Program (CTRP) received updates for the trial identified above.</p>
                            <p><b>Update Information: </b></p>
                            <p>Other Identifiers: new identifier(s) added</p>
                            <p>Grant Information: Added</p>
                            <p>Trial Status: Added</p>
                            <p>Trial Status Date: Added</p>
                            <p>Start Date and Type: Added</p>
                            <p>Primary Completion Date and Type: Added</p>
                            <p>Participating Site status: Added</p>
                            <p>Trial Related Documents: Added</p>

                            <p><b>NEXT STEPS:</b></p>
                            <p>If you have questions about this or other CTRP topics, please contact us at <a href="mailto:ncictro@mail.nih.gov">ncictro@mail.nih.gov</a>.</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            </body></html>'
)


MailTemplate.find_or_create_by(
    code: 'TRIAL_AMEND',
    name: 'Trial Amendment',
    from: 'noreply@ctrp.nci.nih.gov',
    to: '${trialAmendSubmitterEmail}',
    subject: 'NCI CTRP: Trial AMENDMENT ${trialAmendNumber} for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>

                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>Lead Organization: </b>${lead_organization}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>NCI Trial ID: </b>${nciTrialIdentifier}</p>
                                <p><b>NCT ID: </b>${nctId}</p>
                                <p><b>CTEP ID: </b>${ctepId}</p>
                                <p><b>DCP ID: </b>${dcpId}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>The NCI Clinical Trials Reporting Program (CTRP) received the amendment you submitted for the trial identified above.</p>
                            <p><b>Amendment Information: </b></p>
                            <p>Amendment Number: ${trialAmendNumber}</p>
                            <p>Amendment Date: ${trialAmendmentDate}</p>

                            <p><b>NEXT STEPS:</b></p>
                            <p>The Clinical Trials Reporting Office (CTRO) staff is reviewing the amended information to ensure that it meets all of the requirements for registration in the CTRP system. The CTRO will send you a separate email that indicates whether they have accepted or rejected your trial within two (2) business days.</p>
                            <p>If you have questions about this or other CTRP topics, please contact us at <a href="mailto:ncictro@mail.nih.gov">ncictro@mail.nih.gov</a>.</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            </body></html>'
)


MailTemplate.find_or_create_by(
    code: 'TRIAL_DRAFT',
    name: 'Trial Draft',
    from: 'noreply@ctrp.nci.nih.gov',
    to: '${trialSubmitterEmail}',
    subject: 'NCI CTRP: Trial RECORD SAVED as DRAFT for ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>
                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>Lead Organization: </b>${lead_organization}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>Submission Date: </b>${submissionDate}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>You have saved a draft of the trial identified above for submission to the NCI Clinical Trials Reporting Program (CTRP).</p>

                            <p><b>NEXT STEPS:</b></p>
                            <p>To retrieve and complete your submission, use the "Search Saved Drafts" feature on the "Search Trials" page in the CTRP Registration application.</p>
                            <p>Clinical Trials Reporting Office (CTRO) staff will not access or process your trial until you have completed the submission. </p>
                            <p><b>Important!</b> You can save your draft for a maximum of 30 days.</p>
                            <p>If you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'ORI_SUB_ACCEPTED',
    name: 'Submission Accepted Trial',
    from: 'ncictro@mail.nih.gov',
    to: '${trialOwnerEmail}',
    subject: 'NCI CTRP: Trial REGISTRATION ACCEPTED for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>
                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>Lead Organization: </b>${leadOrgName}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>NCI Trial ID: </b>${nciTrialIdentifier}</p>
                                <p><b>CTEP ID: </b>${ctepId}</p>
                                <p><b>NCT ID: </b>${nctId}</p>
                                <p><b>DCP ID: </b>${dcpId}</p>
                                ${otherIds}
                                <p><b>Submission Date: </b>${submissionDate}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>The NCI Clinical Trials Reporting Office (CTRO) has accepted the trial identified above for registration in the NCI Clinical Trials Reporting Program (CTRP).</p>
                            <p><b>NEXT STEPS:</b></p>
                            <ul>
                                <li>CTRO staff process your trial, including abstracting the protocol document, to produce a CTRP trial record within ten (10) business days*. </li>
                                <li>CTRO staff email you a Trial Summary Report (TSR) for review. The XML file attached to that email contains data formatted for submission to ClinicalTrials.gov (if required). This file contains a subset of the information contained in the TSR. It is important that you review and validate the XML file independently. </li>
                           </ul>
                            <p>If you have questions about this or other CTRP topics, please contact us at <a href="mailto:ncictro@mail.nih.gov">ncictro@mail.nih.gov</a>.</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            <p>
                               <abbr>
                                * The NCI Clinical Trials Reporting Office (CTRO) makes every effort to process and return a Trial Summary Report (TSR) and XML file for all trials within a ten (10) day period. This ten-day period begins after a complete submission, and therefore the submitter should be available during that time to resolve any discrepancies (for example, missing documentation, regulatory information, etc.)  Additionally, the potential variability of submission volume at any given time and/or complexity of a protocol can impact the processing time. If trial submission volume exceeds the CTRO\'s capacity for processing, the CTRO will prioritize submissions based on submitter need. If a CTRP registrant requires expedited processing of a protocol submission, please contact the CTRO. Be sure to reference the NCI CTRP ID, and request priority processing.
                               </abbr>
                            </p>
                            </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'ORI_SUB_REJECTED',
    name: 'Submission Rejected Trial',
    from: 'ncictro@mail.nih.gov',
    to: '${trialOwnerEmail}',
    subject: 'NCI CTRP: Trial REGISTRATION REJECTED for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>
                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>Lead Organization: </b>${leadOrgName}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>NCI Trial ID: </b>${nciTrialIdentifier}</p>
                                <p><b>CTEP ID: </b>${ctepId}</p>
                                <p><b>NCT ID: </b>${nctId}</p>
                                <p><b>DCP ID: </b>${dcpId}</p>
                                ${otherIds}
                                <p><b>Submission Date: </b>${submissionDate}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>The Clinical Trials Reporting Office (CTRO) staff cannot register the trial identified above in the NCI Clinical Trials Reporting Program (CTRP) for the following reason(s): </p>
                            <p><b>NEXT STEPS:</b></p>
                            <p>If you feel that this trial has been rejected in error, please contact us at <a href="mailto:ncictro@mail.nih.gov">ncictro@mail.nih.gov</a> at your earliest convenience to resolve the issue.</p>
                            <p>If you have questions about this or other CTRP topics, please contact us at <a href="mailto:ncictro@mail.nih.gov">ncictro@mail.nih.gov</a>.</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'AMEND_SUB_ACCEPTED',
    name: 'Amendment Submission Accepted',
    from: 'ncictro@mail.nih.gov',
    to: '${trialOwnerEmail}',
    subject: 'NCI CTRP: Trial AMENDMENT ${amendNum} RECORD ACCEPTED for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>
                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>Lead Organization: </b>${leadOrgName}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>NCI Trial ID: </b>${nciTrialIdentifier}</p>
                                <p><b>CTEP ID: </b>${ctepId}</p>
                                <p><b>NCT ID: </b>${nctId}</p>
                                <p><b>DCP ID: </b>${dcpId}</p>
                                ${otherIds}
                                <p><b>Amendment Number: </b>${amendNum}</p>
                                <p><b>Amendment Date: </b>${submissionDate}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>Thank you for submitting your trial amendment to the NCI Clinical Trials Reporting Office (CTRO). The amendment to the trial record identified above has been accepted for processing.</p>
                            <p><b>NEXT STEPS:</b></p>
                            <p>The Clinical Trials Reporting Office (CTRO) staff is abstracting the amendment that you submitted to update your trial record in the NCI Clinical Trials Reporting Program (CTRP).</p>
                            <p>When finished, they will send you a new Trial Summary Report (TSR) that reflects the changes indicated in the trial amendment. The new XML file attached to that message contains data formatted for submission to ClinicalTrials.gov (if required). </p>
                            <p>It is important that you review and validate the XML file independently. </p>
                            <p>If you have questions about this or other CTRP topics, please contact us at <a href="mailto:ncictro@mail.nih.gov">ncictro@mail.nih.gov</a>.</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'AMEND_SUB_REJECTED',
    name: 'Amendment Submission Rejected',
    from: 'ncictro@mail.nih.gov',
    to: '${trialOwnerEmail}',
    subject: 'NCI CTRP: Trial AMENDMENT ${amendNum} RECORD REJECTED for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>
                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>Lead Organization: </b>${leadOrgName}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>NCI Trial ID: </b>${nciTrialIdentifier}</p>
                                <p><b>CTEP ID: </b>${ctepId}</p>
                                <p><b>NCT ID: </b>${nctId}</p>
                                <p><b>DCP ID: </b>${dcpId}</p>
                                ${otherIds}
                                <p><b>Amendment Number: </b>${amendNum}</p>
                                <p><b>Amendment Date: </b>${submissionDate}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>The Clinical Trials Reporting Office (CTRO) staff cannot amend the NCI Clinical Trials Reporting Program (CTRP) trial identified above for the following reason(s): </p>
                            <p><b>NEXT STEPS:</b></p>
                            <p>Please contact us at <a href="mailto:ncictro@mail.nih.gov">ncictro@mail.nih.gov</a> at your earliest convenience to resolve the issue.</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'USER_REGISTRATION',
    name: 'User Registration',
    from: 'ncictro@mail.nih.gov',
    to:   'ctrpaccountapprover1@ctrp-ci.nci.nih.gov,ctrpaccountapprover2@ctrp-ci.nci.nih.gov',
    subject: 'NCI Clinical Trials Reporting Program (CTRP) Account Request',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body>
                <p>Date: ${date}</p>
                <p>Dear Appsupport,</p>
                <p>${user_name} has requested access to the Clinical Trials Reporting Program (CTRP) application.</p>
                <p>Please review the provided user account information and forward to CCCT with the desired role if approved, if not approved please reply back to ${user_name}.</p>
                <p>
                Sign Up Form:<br>
                NIH Account User Name:    ${user_username}<br>
                Name:                     ${user_name}<br>
                Email Address:            ${user_email}<br>
                Phone Number/Extension:   ${user_phone}<br>
                Organization Affiliation: ${user_org}<br>
                </p>
                <p>If you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov or visit our website at http://www.cancer.gov/ncictrp.</p>
                <p>Thank you for participating in the NCI Clinical Trials Reporting Program.</p>
                </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'USER_ACCOUNT_ACTIVATION',
    name: 'User Activation',
    from: 'ncictro@mail.nih.gov',
    to:   '${user_email}',
    subject: 'Your NCI CTRP Account has been activated',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body>
                <p>Date: ${date}</p>
                <p>Dear ${user_name},</p>
                <p>Your NCI CTRP Account has been activated as a ${user_role} at ${user_org}.   You should be able to log in with your LDAP User ID: ${user_username}.</p>
                <p>If you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov or visit our website at http://www.cancer.gov/ncictrp.</p>
                <p>Thank you for participating in the NCI Clinical Trials Reporting Program.</p>
                </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'USER_REGISTRATION_ACTIVATION',
    name: 'User Registration',
    from: 'ncictro@mail.nih.gov',
    to:   '${user_email}',
    subject: 'Your NCI CTRP Account has been activated',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body>
                <p>Date: ${date}</p>
                <p>Dear ${user_name},</p>
                <p>Your NCI CTRP Account has been activated as a ${user_role}.   You should be able to log in with your LDAP User ID: ${user_username}.</p>
                <p>If you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov or visit our website at http://www.cancer.gov/ncictrp.</p>
                <p>Thank you for participating in the NCI Clinical Trials Reporting Program.</p>
                </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'USER_ADMIN_REQUEST',
    name: 'User Admin Request',
    from: 'noreply@ctrp.nci.nih.gov',
    to:   'ctrpaccountapprover1@ctrp-ci.nci.nih.gov,ctrpaccountapprover2@ctrp-ci.nci.nih.gov',
    subject: 'New NCI CTRP User Admin Request',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body><p>Dear Sir/Madam,<br><br><b>${username}</b>, a user in the  Clinical Trials Reporting Program (CTRP) Clinical Trials Registration application, is requesting admin access.</p><p>Please Navigate to http://ctrp-ci.nci.nih.gov/ for the user\'s details and assign new role to grant access.<p></body></html>'
)

MailTemplate.find_or_create_by(
    code: 'TRIAL_OWNER_ADD',
    name: 'Trial Ownerships Added',
    from: 'noreply@ctrp.nci.nih.gov',
    subject: 'NCI CTRP: Trial RECORD OWNER ADDED',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body>
                <style>
                  table {
                    border:1px solid #C0C0C0;
                    border-collapse:collapse;
                    padding:5px;
                  }
                  table th {
                    border:1px solid #C0C0C0;
                    padding:5px;
                    background:#F0F0F0;
                  }
                  table td {
                    border:1px solid #C0C0C0;
                    padding:5px;
                  }
                </style>
                <div>${trialcontent}</div>
                <p>Date: ${date}</p>
                <p>Dear ${username},</p>
                <p>The Clinical Trials Reporting Office (CTRO) has added you as an owner of the NCI Clinical Trials Reporting Program (CTRP) trial record identified above.</p>
                <p>As a trial record owner, you can update or amend the trial in the CTRP Clinical Trials Registration application.</p>
                <p><b>NEXT STEPS:</b></p>
                <p>If you do not want ownership of the trial record(s), or if you have questions about this or other CTRP topics, please contact the CTRO at ncictro@mail.nih.gov.</p>
                <p>Thank you for participating in the NCI Clinical Trials Reporting Program.</p>
                </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'TRIAL_OWNER_REMOVE',
    name: 'Trial Ownerships Removed',
    from: 'ncictro@mail.nih.gov',
    subject: 'NCI CTRP: Trial RECORD OWNERSHIP CANCELLED',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body>
                <style>
                  table {
                    border:1px solid #C0C0C0;
                    border-collapse:collapse;
                    padding:5px;
                  }
                  table th {
                    border:1px solid #C0C0C0;
                    padding:5px;
                    background:#F0F0F0;
                  }
                  table td {
                    border:1px solid #C0C0C0;
                    padding:5px;
                  }
                </style>
                <div>${trialcontent}</div>
                <p>Date: ${date}</p>
                <p>Dear ${username},</p>
                <p>The Clinical Trials Reporting Office (CTRO) cancelled your ownership of the NCI Clinical Trials Reporting Program (CTRP) trial record(s) identified above.</p>
                <p><b>NEXT STEPS:</b></p>
                <p>If you believe this is an error, or if you have additional questions about this or other CTRP topics, please contact the CTRO at ncictro@mail.nih.gov.</p>
                <p>Thank you for participating in the NCI Clinical Trials Reporting Program.</p>
                </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'SITE-ADMIN-ACCESS-GRANTED',
    name: 'Trial Registration',
    from: 'noreply@ctrp.nci.nih.gov',
    to: '${adminAccessRecepient}',
    subject: 'Site Administrator Access Has Been Granted',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body><p>You have been granted Site Administrator Access.</p></body></html>'
)

MailTemplate.find_or_create_by(
    code: 'ONHOLD_ORIGINAL',
    name: 'On Hold Trial (original notice)',
    from: 'noreply@ctrp.nci.nih.gov',
    to: 'noreply@ctrp.nci.nih.gov',
    subject: 'NCI CTRP: Trial PROCESSING ON HOLD  for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head>
                  <body><hr> <p><b>Title: </b>${trialTitle}</p> ${trialIdentifiers}<hr>
                    <p>Date: ${CurrentDate}</p>
                    <p>Dear ${trialOwner},</p>
                    <p>Processing of the NCI Clinical Trials Reporting Program (CTRP) trial identified above is on hold as of ${CurrentDate} for the following reason: <br><i>${onholdReason}</i></p>
                    <p><b>NEXT STEPS:</b><br>
                      Please contact us at ncictro@mail.nih.gov at your earliest convenience, but no later than close of business on ${nextDate}. We are unable to resume processing your trial without further information from you.
                    </p>
                    <p>If you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov.</p>
                    <p>Thank you for participating in the NCI Clinical</p>
                  </body></html>'
)

########## SEEDING MAIL TEMPLATES ENDS ############

puts "Seeding ldap and local users"
#Add LDAP and local test users
#Need dummy org for LDAP users
org0 = Organization.find_or_create_by( id: 9999999,
                                       source_id: '9999999',
                                       name: 'ZZZ test org for test accounts',
                                       phone:'240-276-0000',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp_context.id),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

org1 = Organization.find_or_create_by( id: 9999997,
                                       source_id: '9999997',
                                       name: 'ZZZ test org for test accounts 2',
                                       phone:'240-276-0000',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp_context.id),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

org2 = Organization.find_or_create_by( id: 9999996,
                                       source_id: '9999996',
                                       name: 'ZZZ test org for test accounts 3',
                                       phone:'240-276-0000',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp_context.id),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

family0 = Family.find_or_create_by( name: 'ZZZ family',
                                    family_status: FamilyStatus.find_by_code('ACTIVE'),
                                    family_type: FamilyType.find_by_code('CANCERCENTER')
)

family0.organizations << org0
family0.organizations << org1
family0.organizations << org2

ctep_org1 = Organization.find_or_create_by( id: 999000009,
                                       source_id: '9999995',
                                       name: 'CTEP ORG For Testing 1',
                                       phone:'240-276-0000',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', SourceContext.find_by_code('CTEP').id),
                                       source_context: SourceContext.find_by_code('CTEP'),
                                       ctep_org_type_id: 7,
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

ctep_org2 = Organization.find_or_create_by( id: 99000008,
                                       source_id: '9999995',
                                       name: 'CTEP ORG For Testing 3',
                                       phone:'240-276-0000',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', SourceContext.find_by_code('CTEP').id),
                                       source_context: SourceContext.find_by_code('CTEP'),
                                       ctep_org_type_id: 2,
                                       address: '9606 Medical Center Dr',
                                       city: 'Germantown',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

ctep_org3 = Organization.find_or_create_by( id: 9990007,
                                       source_id: '9999995',
                                       name: 'CTEP ORG For Testing 3',
                                       phone:'240-276-0000',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', SourceContext.find_by_code('CTEP').id),
                                       source_context: SourceContext.find_by_code('CTEP'),
                                       ctep_org_type_id: 1,
                                       address: '9607 Medical Center Dr',
                                       city: 'Frederick',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)


org3 = Organization.find_or_create_by( id: 9999995,
                                       source_id: '9999995',
                                       name: 'AAA test org for test accounts',
                                       phone:'240-276-0000',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp_context.id),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

org4 = Organization.find_or_create_by( id: 9999994,
                                       source_id: '9999994',
                                       name: 'AAA test org for test accounts 2',
                                       phone:'240-276-0000',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp_context.id),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

org5 = Organization.find_or_create_by( id: 9999993,
                                       source_id: '9999993',
                                       name: 'AAA test org for test accounts 3',
                                       phone:'240-276-0000',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp_context.id),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

family1 = Family.find_or_create_by( name: 'AAA family',
                                    family_status: FamilyStatus.find_by_code('ACTIVE'),
                                    family_type: FamilyType.find_by_code('NIH')
)

family1.organizations << org3
family1.organizations << org4
family1.organizations << org5

ctep = Organization.find_or_create_by( id: 10000000,
                                       source_id: '10000000',
                                       name: 'CTEP',
                                       phone:'240-276-0001',
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep_context.id),
                                       source_context: SourceContext.find_by_code('CTEP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)
ccr = Organization.find_or_create_by( id: 10000001,
                                       source_id: '10000001',
                                       name: 'CCR',
                                       phone:'240-276-0002',
                                      source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp_context.id),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

dcp = Organization.find_or_create_by( id: 10000002,
                                       source_id: '10000002',
                                       name: 'DCP',
                                       phone:'240-276-0003',
                                      source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp_context.id),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)


CadsrMarker.find_or_create_by(id:659).update(
    name: 'SLC2A4 (GLUT4, name:  solute carrier family 2 (facilitated glucose transporter), member 4)',
    meaning: 'SLC2A4 Gene',
    description: 'This gene plays a role in glucose transport regulation.',
    cadsr_id: 3335290,
    cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'),
    nv_term_identifier: 'C89034',
    pv_name: 'SLC2A4')

CadsrMarker.find_or_create_by(id:47).update(
    name: 'AFP (FETA, name:  alpha-fetoprotein)',
    meaning: 'Alpha-Fetoprotein',
    description: 'This gene plays a role in glucose transport regulation.',
    cadsr_id: 3335290,
    cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'),
    nv_term_identifier: 'C89034',
    pv_name: 'SLC2A4')




CadsrMarker.find_or_create_by(id:3543).update(
    name: 'Citrate',
    meaning: 'Citrate',
    description: 'A salt or ester of citric acid.',
    cadsr_id: 3192535,
    cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C63374', pv_name: 'Citrate')

CadsrMarker.find_or_create_by(id:169).update(
    name: 'PDE5A (PDE5, name:  CN5A, name:  phosphodiesterase 5A (cGMP-specific), name:  CGB-PDE)',
    meaning: 'cGMP-Specific 3,5-Cyclic Phosphodiesterase',
    description: 'cGMP-specific 3,5-cyclic phosphodiesterase (875 aa, ~100 kDa) is encoded by the human PDE5A gene. This protein plays a role in the mediation of cyclic GMP metabolism.',
    cadsr_id: 3243311, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C96469', pv_name: 'PDE5A')

CadsrMarker.find_or_create_by(id:375).update(
    name: 'ITGAM (integrin, alpha M, name:  CR3A, name:  MAC-1, name:  CD11b)',
    meaning: 'ITGAM gene',
    description: 'This gene plays a role in extracellular matrix interactions and cellular adhesion.',
    cadsr_id: 3279303, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1366562', pv_name: 'ITGAM')


CadsrMarker.find_or_create_by(id:394).update(
    name: 'CD24 (CD24 antigen (small cell lung carcinoma cluster 4 antigen), name:  CD24A)',
    meaning: 'CD24 gene',
    description: 'This gene is involved in the immune responsiveness of B-cells.',
    cadsr_id: 3281849, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1413212', pv_name: 'CD24')

CadsrMarker.find_or_create_by(id:494).update(
    name: 'TNFAIP3 (A20, name:  OTUD7C, name:  tumor necrosis factor alpha-induced protein 3)',
    meaning: 'TNFAIP3 gene',
    description: 'This gene may play a role in the regulation of apoptosis.',
    cadsr_id: 3288476, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1420799', pv_name: 'TNFAIP3');

CadsrMarker.find_or_create_by(id:568).update(
    name: 'tumor protein p53 binding protein 1 (TP53BP1, name:  53BP1)',
    meaning: 'TP53BP1 Gene',
    description: 'This gene may play a role in the modulation of the response to DNA damage.',
    cadsr_id: 3302801,
    cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C88925', pv_name: 'tumor protein p53 binding protein 1')

CadsrMarker.find_or_create_by(id:702).update(
    name: 'BCL2A1 (BCL2-related protein A1, name:  ACC-1, name:  GRS, name:  BCL2L5, name:  BFL1, name:  HBPA1, name:  ACC-2)',
    meaning: 'BCL2A1 gene',
    description: 'No Value Exists',
    cadsr_id: 3351678,
    cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1412761', pv_name: 'BCL2A1')

CadsrMarker.find_or_create_by(id:724).update(
    name: 'MIR382 (MIRN382, name:  microRNA 382, name:  hsa-mir-382)',
    meaning: 'MIR382 gene',
    description: 'No Value Exists',
    cadsr_id: 3359747,
    cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1537903', pv_name: 'MIR382')

CadsrMarker.find_or_create_by(id:374).update(
    name: 'CD33 (SIGLEC3, name:  CD33 antigen (gp67), name:  sialic acid binding Ig-like lectin 3).update(name:  FLJ00391, name:  SIGLEC-3, name:  p67)',
    meaning: 'CD33 gene',
    description: 'No Value Exists',
    cadsr_id: 3279301,
    cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1439292', pv_name: 'CD33')

CadsrMarker.find_or_create_by(id:856).update(
    name: 'AKT2',
    meaning: 'AKT2 Gene',
    description: 'This gene plays a role in glucose homeostasis and the inhibition of apoptosis.',
    cadsr_id: 3412274,
    cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C18352', pv_name: 'AKT2')

CadsrMarker.find_or_create_by(id:924).update(
    name: 'IGHV3-21 (immunoglobulin heavy variable 3-21)',
    meaning: 'IGHV3-21 gene',
    description: 'No Value Exists',
    cadsr_id: 3430847, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'),
    nv_term_identifier: 'C1416035', pv_name: 'IGHV3-21')
CadsrMarker.find_or_create_by(id:1781).update(
    name: 'SPIB (SPI-B, name:  Transcription Factor Spi-B, name:  Spi-B Transcription Factor (Spi-1/PU.1 Related))',
    meaning: 'SPIB Gene',
    description: 'This gene is involved in the modulation of gene transcription.',
    cadsr_id: 3684777,
    cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C99651', pv_name: 'SPIB')



CadsrMarkerSynonym.find_or_create_by(id: 678).update(alternate_name:  'CGB-PDE',cadsr_marker_id:  169,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 677).update(alternate_name:  'phosphodiesterase 5A (cGMP-specific)',cadsr_marker_id:  169,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 676).update(alternate_name:  'CN5A',cadsr_marker_id:  169,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 675).update(alternate_name:  'PDE5',cadsr_marker_id:  169,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))


CadsrMarkerSynonym.find_or_create_by(id: 1914).update(alternate_name:  'tumor necrosis factor alpha-induced protein 3',cadsr_marker_id:  494,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1912).update(alternate_name:  'A20',cadsr_marker_id:  494,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1913).update(alternate_name:  'OTUD7C',cadsr_marker_id:  494,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))

CadsrMarkerSynonym.find_or_create_by(id: 1563).update(alternate_name:  'CD24 antigen (small cell lung carcinoma cluster 4 antigen)',cadsr_marker_id:  394,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1564).update(alternate_name:  'CD24A',cadsr_marker_id:  394,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))

CadsrMarkerSynonym.find_or_create_by(id: 2740).update(alternate_name:  'BCL2L5',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2737).update(alternate_name:  'BCL2-related protein A1',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2739).update(alternate_name:  'GRS',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2742).update(alternate_name:  'HBPA1',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2738).update(alternate_name:  'ACC-1',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2743).update(alternate_name:  'ACC-2',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2741).update(alternate_name:  'BFL1',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1431).update(alternate_name:  'sialic acid binding Ig-like lectin 3',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1432).update(alternate_name:  'FLJ00391',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1429).update(alternate_name:  'SIGLEC3',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1430).update(alternate_name:  'CD33 antigen (gp67)',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1434).update(alternate_name:  'SIGLEC-3',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1433).update(alternate_name:  'p67',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2800).update(alternate_name:  'microRNA 382',cadsr_marker_id:  724,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2801).update(alternate_name:  'hsa-mir-382',cadsr_marker_id:  724,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2799).update(alternate_name:  'MIRN382',cadsr_marker_id:  724,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 3554).update(alternate_name:  'immunoglobulin heavy variable 3-21',cadsr_marker_id:  924,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2296).update(alternate_name:  '53BP1',cadsr_marker_id:  568,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2295).update(alternate_name:  'TP53BP1',cadsr_marker_id:  568,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 7725).update(alternate_name:  'Spi-B Transcription Factor (Spi-1/PU.1 Related)',cadsr_marker_id:  1781,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 7723).update(alternate_name:  'SPI-B',cadsr_marker_id:  1781,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 7724).update(alternate_name:  'Transcription Factor Spi-B',cadsr_marker_id:  1781,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))

# ValidationRule.find_or_create_by(code: 'POE001', section: 'PO', model: 'organization', category: 'error', item: 'organization', rule: 'organization name cannot be null', description: 'organization name is required', remark: 'no remark here')
# ValidationRule.find_or_create_by(code: 'PAAE001', section: 'PAA', model: 'trial', category: 'error', item: 'trial_general_details', rule: 'Trial official title cannot be null', description: 'Trial official title is required', remark: 'Follow the menus to Trial General Details screen to do the correction')
# ValidationRule.find_or_create_by(code: 'PASE001', section: 'PAS', model: 'trial', category: 'error', item: 'trial_design', rule: 'Research category cannot be null', description: 'Research category is required', remark: 'Follow the menus to do the correction')

ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA2', item: 'paa_general_trial_details', rule: 'NCT Number cannot be more than 30 characters', description: 'NCT Number cannot be more than 30 characters', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA3', item: 'paa_general_trial_details', rule: 'CTEP Number cannot be more than 30 characters', description: 'CTEP Number cannot be more than 30 characters', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA6', item: 'paa_general_trial_details', rule: 'DCP Number cannot be more than 30 characters', description: 'DCP Number cannot be more than 30 characters', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA7', item: 'paa_general_trial_details', rule: 'Lead Organization Trial Identifier  cannot be more than 30 characters', description: 'Lead Organization Trial Identifier  cannot be more than 30 characters', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA8', item: 'paa_general_trial_details', rule: 'Keywords cannot be more than  160 characters', description: 'Keywords cannot be more than  160 characters', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA9', item: 'paa_status', rule: 'Duplicate IN REVIEW status is not allowed', description: 'Duplicate ‘In Review status’', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA10', item: 'paa_status', rule: 'Invalid status transition from APPROVED to  IN REVIEW', description: 'study status has [IN REVIEW] after [APPROVED]', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA11', item: 'paa_status', rule: 'Duplicate APPROVED status is not allowed', description: 'Duplicate ‘Approved’ status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA12', item: 'paa_status', rule: 'Study has Interim statuses of ACTIVE and CLOSED TO ACCRUAL but is missing CLOSED TO ACCRUAL AND INTERVENTION', description: 'study has  APPROVED and COMPLETE status but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA13', item: 'paa_status', rule: 'Study has Interim statuses of ACTIVE and CLOSED TO ACCRUAL but  is missing CLOSED TO ACCRUAL AND INTERVENTION', description: 'study has  APPROVED and COMPLETE status but missing CLOSED TO ACCRUAL AND INTERVENTION status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA14', item: 'paa_status', rule: 'Interim statuses of ACTIVE is missing', description: 'study has statuses APPROVED and ADMINISTRATIVELY COMPLETE  but ACTIVE is missing', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA15', item: 'paa_status', rule: 'Interim statuses of  CLOSED TO ACCRUAL is missing', description: 'study has statuses APPROVED and ADMINISTRATIVELY COMPLETE  but missing CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA16', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to IN REVIEW', description: 'status transitions from WITHDRAWN to IN REVIEW', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA17', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to APPROVED', description: 'study status transitions from WITHDRAWN to APPROVED', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA18', item: 'paa_status', rule: 'Duplicate WITHDRAWN status is not allowed', description: 'Duplicate ‘Withdrawn’ study status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA19', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to ACTIVE', description: 'study status transitions from WITHDRAWN to ACTIVE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA20', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to ENROLLING BY INVITATION', description: 'status transitions from WITHDRAWN to ENROLLING BY INVITATION', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA21', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to CLOSED TO ACCRUAL', description: 'status transitions from WITHDRAWN to CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA22', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to CLOSED TO ACCRUAL AND INTERVENTIONS', description: 'status transitions from WITHDRAWN to CLOSED TO ACCRUAL AND INTERVENTIONS', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA23', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to TEMPORARILY  CLOSED TO ACCRUAL', description: 'status transitions from WITHDRAWN to TEMPORARILY CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA24', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to TEMPORARILY  CLOSED TO ACCRUAL AND INTERVENTIONS', description: 'status transitions from WITHDRAWN to TEMPORARILY CLOSED TO ACCRUAL  AND INTERVENTIONS', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA25', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to COMPLETE', description: 'status transitions from WITHDRAWN to COMPLETE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA26', item: 'paa_status', rule: 'Invalid status transition from WITHDRAWN to ADMINSTRATIVELY COMPLETE', description: 'status transitions from WITHDRAWN to ADMINSTRATIVELY COMPLETE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA27', item: 'paa_status', rule: 'Invalid status transition from ACTIVE to IN REVIEW', description: 'status transitions from ACTIVE to IN REVIEW', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA28', item: 'paa_status', rule: 'Invalid status transition from ACTIVE to APPROVED', description: 'status transitions from ACTIVE to APPROVED', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA29', item: 'paa_status', rule: 'Duplicate ACTIVE  status is not allowed', description: 'Duplicate ACTIVE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA30', item: 'paa_status', rule: 'Invalid status transition from ACTIVE to ENROLLING BY INVITATION', description: 'status transitions from ACTIVE to ENROLLING BY INVITATION', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA31', item: 'paa_status', rule: 'Invalid status transition from ENROLLING BY INVITATION to IN REVIEW', description: 'status transitions from  ENROLLING BY INVITATION to IN REVIEW', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA32', item: 'paa_status', rule: 'Invalid status transition from ENROLLING BY INVITATION to APPROVED', description: 'status transitions from  ENROLLING BY INVITATION to APPROVED', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA33', item: 'paa_status', rule: 'Invalid status transition from ENROLLING BY INVITATION to ACTIVE', description: 'status transitions from  ENROLLING BY INVITATION to ACTIVE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA34', item: 'paa_status', rule: 'Duplicate ENROLLING BY INVITATION status is not allowed', description: 'Duplicate  ENROLLING BY INVITATION status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA35', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL  to IN REVIEW', description: 'status transitions from CLOSED TO ACCRUAL  to IN REVIEW', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA36', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL  to APPROVED', description: 'status transitions from CLOSED TO ACCRUAL  to APPROVED', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA37', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL  to WITHDRAWN', description: 'status transitions  from CLOSED TO ACCRUAL  to WITHDRAWN', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA38', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL  to ACTIVE', description: 'status transitions  from CLOSED TO ACCRUAL  to ACTIVE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA39', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL  to ENROLLING BY INVITATION', description: 'status transitions from CLOSED TO ACCRUAL  to ENROLLING BY INVITATION', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA40', item: 'paa_status', rule: 'Duplicate CLOSED TO ACCRUAL  status is not allowed', description: 'Duplicate CLOSED TO ACCRUAL  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS2', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL AND INTERVENTIONS  to IN REVIEW', description: 'status transitions from CLOSED TO ACCRUAL AND INTERVENTIONS  to IN REVIEW', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA41', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL AND INTERVENTIONS  to APPROVED', description: 'status transitions from CLOSED TO ACCRUAL AND INTERVENTIONS  to APPROVED', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA42', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL AND INTERVENTIONS  to WITHDRAWN', description: 'status transitions from CLOSED TO ACCRUAL  AND INTERVENTIONS to WITHDRAWN', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA43', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL AND INTERVENTIONS to ACTIVE', description: 'status transitions from CLOSED TO ACCRUAL AND INTERVENTIONS  to ACTIVE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA44', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL AND INTERVENTIONS  to ENROLLING BY INVITATION', description: 'status transitions from CLOSED TO ACCRUAL AND INTERVENTIONS  to ENROLLING BY INVITATION', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA45', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL AND INTERVENTIONS  to CLOSED TO ACCRUAL', description: 'status transitions from CLOSED TO ACCRUAL AND INTERVENTIONS  to CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA46', item: 'paa_status', rule: 'Duplicate CLOSED TO ACCRUAL AND INTERVENTIONS status is not allowed', description: 'Duplicate  CLOSED TO ACCRUAL AND INTERVENTIONS  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA47', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL AND INTERVENTIONS  to TEMPORARILY  CLOSED TO ACCRUAL', description: 'status transitions from CLOSED TO ACCRUAL AND INTERVENTIONS  to TEMPORARILY CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA48', item: 'paa_status', rule: 'Invalid status transition from CLOSED TO ACCRUAL AND INTERVENTIONS  to TEMPORARILY  CLOSED TO ACCRUAL AND INTERVENTIONS', description: 'status transitions from CLOSED TO ACCRUAL AND INTERVENTIONS  to TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA49', item: 'paa_status', rule: 'Invalid status transition from TEMPORARILY CLOSED TO ACCRUAL to IN REVIEW', description: 'status transitions from TEMPORARILY CLOSED TO ACCRUAL  to IN REVIEW', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA50', item: 'paa_status', rule: 'Invalid status transition from TEMPORARILY CLOSED TO ACCRUAL  to APPROVED', description: 'status transitions from  TEMPORARILY CLOSED TO ACCRUAL to APPROVED', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')

ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA51', item: 'paa_status', rule: 'Invalid status transition from TEMPORARILY CLOSED TO ACCRUAL to WITHDRAWN', description: 'status transitions from TEMPORARILY CLOSED TO ACCRUAL to WITHDRAWN', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA52', item: 'paa_status', rule: 'Duplicate TEMPORARILY CLOSED TO ACCRUAL status is not allowed', description: 'Duplicate   TEMPORARILY CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA53', item: 'paa_status', rule: 'Invalid status transition from TEMPORARILY CLOSED TO ACCRUAL to COMPLETE', description: 'status transitions from TEMPORARILY CLOSED TO ACCRUAL to COMPLETE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA54', item: 'paa_status', rule: 'Invalid status transition from TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION  to IN REVIEW', description: 'status transitions  from TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION  to IN REVIEW', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA55', item: 'paa_status', rule: 'Invalid status transition from TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION  to APPROVED', description: 'status transitions from  TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION  to APPROVED', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA56', item: 'paa_status', rule: 'Invalid status transition from TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION to TEMPORARILY CLOSED TO ACCRUAl', description: 'status transitions from TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION to TEMPORARILY CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA57', item: 'paa_status', rule: 'Invalid status transition from TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION to WITHDRAWN', description: 'status transitions from TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION to WITHDRAWN', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA58', item: 'paa_status', rule: 'Duplicate TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION status is not allowed', description: 'Duplicate TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA59', item: 'paa_status', rule: 'Invalid status transition from TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION to COMPLETE', description: 'status transitions from TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION to COMPLETE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA60', item: 'paa_status', rule: 'Invalid status transition from COMPLETE to IN REVIEW', description: 'status transitions from COMPLETE  to IN REVIEW', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA61', item: 'paa_status', rule: 'Invalid status transition from COMPLETE  to APPROVED', description: 'status transitions from  COMPLETE  to APPROVED', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA62', item: 'paa_status', rule: 'Invalid status transition from COMPLETE to WITHDRAWN', description: 'status transitions from COMPLETE to WITHDRAWN', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA63', item: 'paa_status', rule: 'Invalid status transition from COMPLETE to ACTIVE', description: 'status transitions from COMPLETE to ACTIVE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA64', item: 'paa_status', rule: 'Invalid status transition from COMPLETE to ENROLLING BY INVITATION', description: 'status transitions from COMPLETE to ENROLLING BY INVITATION', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA65', item: 'paa_status', rule: 'Invalid status transition from COMPLETE to CLOSED TO ACCRUAL', description: 'status transitions from COMPLETE to CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA66', item: 'paa_status', rule: 'Invalid status transition from COMPLETE to CLOSED TO ACCRUAL AND INTERVENTIONS', description: 'status transitions from COMPLETE to CLOSED TO ACCRUAL AND INTERVENTIONS', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA67', item: 'paa_status', rule: 'Invalid status transition from COMPLETE to TEMPORARILY CLOSED TO ACCRUAL', description: 'status transitions from COMPLETE to TEMPORARILY CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA68', item: 'paa_status', rule: 'Invalid status transition from COMPLETE to TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS', description: 'status transitions from COMPLETE to TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA69', item: 'paa_status', rule: 'Duplicate COMPLETE status is not allowed', description: 'Duplicate COMPLETE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA70', item: 'paa_status', rule: 'Invalid status transition from COMPLETE to ADMINISTRATIVELY COMPLETE', description: 'status transitions from COMPLETE to ADMINISTRATIVELY COMPLETE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA71', item: 'paa_status', rule: 'Invalid status transition from ADMINISTRATIVELY  COMPLETE to IN REVIEW', description: 'status transitions  from ADMINISTRATIVELY COMPLETE  to IN REVIEW', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA72', item: 'paa_status', rule: 'Invalid status transition from ADMINISTRATIVELY  COMPLETE  to APPROVED', description: 'status transitions from  ADMINISTRATIVELY COMPLETE  to APPROVED', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA73', item: 'paa_status', rule: 'Invalid status transition from ADMINISTRATIVELY  COMPLETE to WITHDRAWN', description: 'status transitions from ADMINISTRATIVELY  COMPLETE to WITHDRAWN', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA74', item: 'paa_status', rule: 'Invalid status transition from ADMINISTRATIVELY  COMPLETE to ACTIVE', description: 'status transitions from ADMINISTRATIVELY  COMPLETE to ACTIVE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA75', item: 'paa_status', rule: 'Invalid status transition from  ADMINISTRATIVELY  COMPLETE to ENROLLING BY INVITATION', description: 'status transitions from ADMINISTRATIVELY  COMPLETE to ENROLLING BY INVITATION', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA76', item: 'paa_status', rule: 'Invalid status transition from ADMINISTRATIVELY  COMPLETE to CLOSED TO ACCRUAL', description: 'status transitions from ADMINISTRATIVELY COMPLETE to CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA77', item: 'paa_status', rule: 'Invalid status transition from  ADMINISTRATIVELY  COMPLETE to CLOSED TO ACCRUAL AND INTERVENTIONS', description: 'status transitions from ADMINISTRATIVELY COMPLETE to CLOSED TO ACCRUAL AND INTERVENTIONS', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA78', item: 'paa_status', rule: 'Invalid status transition from ADMINISTRATIVELY', description: 'status transitions from ADMINISTRATIVELY  COMPLETE to TEMPORARILY CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA79', item: 'paa_status', rule: 'Invalid status transition from ADMINISTRATIVELY  COMPLETE to TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS', description: 'status transitions from  ADMINISTRATIVELY COMPLETE to TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA80', item: 'paa_status', rule: 'Invalid status transition from ADMINISTRATIVELY COMPLETE to COMPLETE', description: 'status transitions from ADMINISTRATIVELY COMPLETE to COMPLETE', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA81', item: 'paa_status', rule: 'Duplicate ADMINISTRATIVELY COMPLETE status is not allowed', description: 'Duplicate ADMINISTRATIVELY COMPLETE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA82', item: 'paa_status', rule: 'Primary Completion Date of ‘NA’only applies to DCP trials', description: 'Primary Completion Date = ‘NA’ and trial not equal  ‘DCP’.', remark: '[Select Trial Status] from Administrative Data menu	to view Trial Status')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA83', item: 'paa_status', rule: '‘Anticipated Primary Completion Date must be current or in the future’', description: 'Primary Completion date = Anticipated and DATE > or = to current date', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA84', item: 'paa_status', rule: 'If Study Status is Active; at least one participating site status must be active.', description: 'Study Status = ACTIVE and  Site Recruitment Status  not equal Active', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA85', item: 'paa_status', rule: 'Data inconsistency. Study Start Date cannot be in the past if the overall recruitment status is APPROVED', description: 'Study Status = APPROVED   then Trial Start Date is  < current date', remark: '[Select Trial Status] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA86', item: 'paa_status', rule: 'Data inconsistency. Study Start Date cannot be in the past if the overall recruitment status is  IN REVIEW', description: 'Study Status =  IN REVIEW  then Trial Start Date is  < current date', remark: '[Select Trial Status] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA87', item: 'paa_status', rule: 'No Trial Status exists for the trial', description: 'No Trial Status exists for the trial', remark: '[Select Trial Status] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA88', item: 'paa_status', rule: 'In Trial Status; Active or Anticipated must be selected for Trial Start Date.', description: 'both Trial Start Date Actual or Anticipated are not checked', remark: '[Select Trial Status] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA89', item: 'paa_status', rule: 'Current trial Status Date must be entered.', description: 'Trial Status Date is null', remark: '[Select Trial Status] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA90', item: 'paa_regulatory_info_fdaaa', rule: 'for IND protocols; Oversight Authorities must include the Country United States', description: 'for IND protocols; Oversight Authorities must include the Country United States', remark: 'Select [Regulatory Information FDAAA] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA91', item: 'paa_regulatory_info_fdaaa', rule: 'for IND protocols; Oversight Authorities must include organization:  Food and Drug Administration', description: 'for IND protocols; Oversight Authorities must include organization:  Food and Drug Administration', remark: 'Select [Regulatory Information FDAAA] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA92', item: 'paa_regulatory_info_human_subject_safety', rule: 'Review Board Approval Status is missing.', description: 'Review Board Approval Status is null', remark: 'Select [Regulatory Information - Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA93', item: 'paa_participating_sites', rule: 'Duplicate Sites are not allowed', description: 'duplicate sites are not allowed', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA94', item: 'paa_participating_sites', rule: 'Duplicate investigators for same site are not allowed.', description: 'Duplicate investigators for same site are not allowed.', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA95', item: 'paa_documents', rule: 'Protocol_Document is required', description: '‘Protocol_Document’ Document Type is required', remark: '[Select Trial Related Documents] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAA', code: 'PAA96', item: 'paa_documents', rule: 'IRB Approval document is required', description: '‘IRB Approval Document’ Document  Type is required', remark: '[Select Trial Related Documents] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS3', item: 'pas_trial_design', rule: 'IF Clinical Research Category=Interventional; Masking is required', description: 'Clinical Research Category is Interventional, Masking is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS4', item: 'pas_trial_design', rule: 'IF Clinical Research Category=Expanded Access; Masking is required', description: 'Clinical Research Category is Expanded Access, Masking is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS5', item: 'pas_trial_design', rule: 'IF Clinical Research Category=Interventional; If Double blind masking is selected; at least two masking roles must be specified', description: 'Clinical Research Category is Interventional, Double blind masking is selected, at least two masking roles must be specified ', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS6', item: 'pas_trial_design', rule: 'IF Clinical Research Category=Expanded Access; If Double blind masking is selected; at least two masking roles must be specified', description: 'Clinical Research Category is Expanded Access, Double blind masking is selected, at least two masking roles must be specified', remark: '[Select Trial Design] from Scientific Data menu.')

# duplicate  ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS7', item: 'pas_trial_design', rule: 'IF Clinical Research Category = ‘Interventional’ ; Masking is required', description: 'Clinical Research Category = ‘Interventional’; AND Masking is null', remark: '[Select Trial Design] from Scientific Data menu.')
# duplicate  ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS8', item: 'pas_trial_design', rule: 'IF Clinical Research Category =  ‘expanded access’; Masking is required', description: 'Clinical Research Category = ‘expanded access’; AND Masking is null', remark: '[Select Trial Design] from Scientific Data menu.')
# duplicate  ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS9', item: 'pas_trial_design', rule: 'Clinical Research Category of ‘Interventional’ ; If Double blind masking is selected; at least two masking roles must be specified.', description: 'Clinical Research Category = ‘Interventional’  AND Masking = ‘Double blind’; AND masking roles count < 2', remark: '[Select Trial Design] from Scientific Data menu.')
# duplicate  ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS10', item: 'pas_trial_design', rule: 'Clinical Research Category of  ‘expanded access’; If Double blind masking is selected; at least two masking roles must be specified', description: 'Clinical Research Category = ‘expanded access’ AND Masking = ‘Double blind’; AND masking roles count < 2', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS11', item: 'pas_trial_design', rule: 'Clinical Research Category of ‘Interventional’; If single blind masking is selected; there should be only one masking role.', description: 'Clinical Research Category is Expanded Access, Double blind masking is selected, at least two masking roles must be specified', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS12', item: 'pas_trial_design', rule: 'Clinical Research Category of‘expanded access’; If single blind masking is selected; there should be only one masking role.', description: 'Clinical Research Category of Expanded Access, Single blind masking is selected, there should be only one masking role.', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS13', item: 'pas_trial_design', rule: 'Clinical Research Category is Interventional ; Intervention Model is required', description: 'Clinical Research Category is Interventional, Intervention Model is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS14', item: 'pas_trial_design', rule: 'Clinical Research Category is  Expanded access; Intervention Model is required', description: 'Clinical Research Category is  Expanded Access, Intervention Model is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS15', item: 'pas_trial_design', rule: 'Primary Purpose is required', description: 'Primary Purpose is required.', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS16', item: 'pas_trial_design', rule: 'IF Primary Purpose is ‘Other’;  Primary Purpose Description  is required', description: 'Primary Purpose is ‘Other’; Primary Purpose Description is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS17', item: 'pas_trial_design', rule: 'Trial Phase is required', description: 'Trial Phase is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS18', item: 'pas_trial_design', rule: 'Number of Arms / Groups is required', description: 'Number of Arms / Groups is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS19', item: 'pas_trial_design', rule: 'Clinical Research Category is Interventional; Allocations is required', description: 'Clinical Research Category is Interventional ; Allocations is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS20', item: 'pas_trial_design', rule: 'Clinical Research Category is Expanded access; Allocations is required', description: 'Clinical Research Category is Expanded access; Allocations is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS21', item: 'pas_trial_description', rule: 'Brief Title is required', description: 'Brief Title is required', remark: '[Select Trial Description] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS22', item: 'pas_trial_description', rule: 'Brief Title must be Unique', description: 'Brief Title must be unique', remark: '[Select Trial Description] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS23', item: 'pas_trial_description', rule: 'Brief Summary is required', description: 'Brief Summary is required', remark: '[Select Trial Description] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS24', item: 'pas_intervention', rule: 'For clinical research Category of ‘Interventional’; at least one Intervention is required', description: 'For clinical research Category of ‘Interventional’, at least one Intervention is required', remark: '[Select Interventions] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS25', item: 'pas_intervention', rule: 'Intervention term [INTERVENTION NAME] is INACTIVE.  Another term is required.', description: 'Intervention term [INTERVENTION NAME] is INACTIVE.  Another term is required', remark: '[Select Interventions] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS26', item: 'pas_arms/groups', rule: 'Every arm must have one intervention UNLESS arm type is ‘no intervention’', description: 'Every arm must have one intervention UNLESS arm type is ‘no intervention’', remark: '[Select Arms/ Groups] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS27', item: 'pas_arms/groups', rule: 'Every intervention must be associated with at least one arm.', description: 'Every intervention must be associated with at least one arm.', remark: '[Select Arms/ Groups] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS28', item: 'pas_eligibility', rule: 'Eligibility Criteria is required', description: 'Eligibility Criteria is required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS29', item: 'pas_eligibility', rule: 'Accepts Healthy Volunteersis required', description: 'Accepts Healthy Volunteers on Eligibility is required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS30', item: 'pas_eligibility', rule: 'Gender is required', description: 'Gender is required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS31', item: 'pas_eligibility', rule: 'Minimum Age and Unit is required', description: 'Minimum Age and Unit are required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS32', item: 'pas_eligibility', rule: 'Maximum Age and Unitis required', description: 'Maximum Age and Unit are required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS33', item: 'pas_eligibility', rule: 'At least one Other Criteria is required', description: 'At least one Other Criteria is required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS34', item: 'pas_eligibility', rule: 'If Clinical Reasearch Category = ‘Observational’ ; Sampling Method is required', description: 'Clinical Reasearch Category is ‘Observational’, Sampling Method is required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS35', item: 'pas_eligibility', rule: 'If Clinical Reasearch Category = ‘Ancillary Correlative’; Sampling Method is required', description: 'Clinical Reasearch Category is ‘Ancillary Correlative’, Sampling Method is required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS36', item: 'pas_eligibility', rule: 'If Clinical Reasearch Category of ‘Observational’ ; Study Population Description is required', description: 'Clinical Reasearch Category of ‘Observational’ , Study Population Description is required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS37', item: 'pas_eligibility', rule: 'If Clinical Reasearch Category of  ‘Ancillary Correlative’; Study Population Description is required', description: 'Clinical Reasearch Category of  ‘Ancillary Correlative’, Study Population Description is required', remark: '[Select Eligibility Criteria] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS38', item: 'pas_disease', rule: 'At least one Disease/Condition must be entered', description: 'At least one Disease/Condition must be entered', remark: '[Select Diseases/Conditions] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS39', item: 'pas_disease', rule: 'Disease/Condition [DISEASE NAME] is INACTIVE.  Another term is required.', description: 'Disease/Condition [DISEASE NAME] is INACTIVE.  Another term is required.', remark: '[Select Diseases/Conditions] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'error', model: 'trial', section: 'PAS', code: 'PAS40', item: 'pas_outcome', rule: 'At least one primary outcomeis required', description: 'At least one primary outcome is required', remark: '[Select Outcome Measures] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA97', item: 'paa_general_trial_details', rule: 'Official Title is blank', description: 'Official Title is required', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA98', item: 'paa_general_trial_details', rule: 'Lead Organization is blank', description: 'Lead Organization Trial Identifier is required', remark: '[Select General Trial Details] from Administrative Data menu.')
# duplicate ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA99', item: 'paa_general_trial_details', rule: 'Lead Organization is required', description: 'Lead Organization Trial Identifier is null', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA100', item: 'paa_general_trial_details', rule: 'Principal Investigator  is required', description: 'Principal Investigator  is required', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA101', item: 'paa_general_trial_details', rule: 'Sponsor is required', description: 'Sponsor is required', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA102', item: 'paa_general_trial_details', rule: 'Contact Email address or phone number is required', description: 'contact = PI or Person or General; email address and phone number is required', remark: '[Select General Trial Details] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA103', item: 'paa_collaborators', rule: 'Duplicate collaborators are not allowed', description: 'Duplicate collaborators', remark: '[Select Collaborators] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA104', item: 'paa_status', rule: 'Interim status IN REVIEW is missing', description: 'Status Is APPROVED but  missing IN REVIEW status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA105', item: 'paa_status', rule: 'Interim status IN REVIEW is missing', description: 'Trial Status of WITHDRAWN but missing IN REVIEW  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA106', item: 'paa_status', rule: 'Interim status APPROVED is missing', description: 'Trial Status of WITHDRAWN but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA107', item: 'paa_status', rule: 'Interim status IN REVIEW is missing', description: 'Trial Status Is ACTIVE but missing IN REVIEW  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA108', item: 'paa_status', rule: 'Interim status APPROVED is missing', description: 'Trial Status Is ACTIVE but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA109', item: 'paa_status', rule: 'Interim status IN REVIEW is missing', description: 'Trial Status Is ENROLLING BY INVITATION but missing IN REVIEW status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA110', item: 'paa_status', rule: 'Interim status APPROVED is missing', description: 'Trial Status Is ENROLLING BY INVITATION but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA111', item: 'paa_status', rule: 'Interim status IN REVIEW is missing', description: 'Trial Status Is CLOSED TO ACCRUAL but missing IN REVIEW  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA112', item: 'paa_status', rule: 'Interim status APPROVED is missing', description: 'Trial Status Is CLOSED TO ACCRUAL but missing APPROVED  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')

ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA113', item: 'paa_status', rule: 'Interim status  ACTIVE is missing', description: 'Trial Status Is CLOSED TO ACCRUAL but missing ACTIVE  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA114', item: 'paa_status', rule: 'Interim status IN REVIEW is missing', description: 'Trial Status Is CLOSED TO ACCRUAL AND INTERVENTIONS but missing IN REVIEW status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA115', item: 'paa_status', rule: 'Interim status APPROVED is  missing', description: 'Trial Status Is CLOSED TO ACCRUAL AND INTERVENTIONS but  missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA116', item: 'paa_status', rule: 'Interim status ACTIVE is missing', description: 'Trial Status Is CLOSED TO ACCRUAL AND INTERVENTIONS but missing  missing ACTIVE  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA117', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is missing', description: 'Trial Status Is CLOSED TO ACCRUAL AND INTERVENTIONS but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA118', item: 'paa_status', rule: 'Interim status IN REVIEW is missing', description: 'Trial Status Is TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS but missing IN REVIEW status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA119', item: 'paa_status', rule: 'Interim status APPROVED is  missing', description: 'Trial Status Is TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS but missing APPROVED  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA120', item: 'paa_status', rule: 'Interim status ACTIVE is missing', description: 'Trial Status Is TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS but missing ACTIVE  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA121', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is missing', description: 'Trial Status Is TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS but  missing CLOSED TO ACCRUAL  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA122', item: 'paa_status', rule: 'Interim status  TEMPORARILY CLOSED TO ACCRUAL is missing', description: 'Trial Status Is TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS but missing TEMPORARILY CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA123', item: 'paa_status', rule: 'Interim status IN REVIEW is  missing', description: 'Trial Status Is COMPLETE but missing IN REVIEW status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA124', item: 'paa_status', rule: 'Interim status APPROVED is missing', description: 'Trial Status Is COMPLETE but missing  APPROVED  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA125', item: 'paa_status', rule: 'Interim status ACTIVE is  missing', description: 'Trial Status Is COMPLETE but   missing ACTIVE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA126', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL  is missing', description: 'Trial Status Is COMPLETE but  missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA127', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL AND INTERVENTIONS is  missing', description: 'Trial Status Is COMPLETE but missing CLOSED TO ACCRUAL AND INTERVENTIONS status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA128', item: 'paa_status', rule: 'Interim status APPROVED is missing', description: 'Trial Status of IN REVIEW and ACTIVE but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA129', item: 'paa_status', rule: 'Interim status APPROVED is missing', description: 'Trial Status of IN REVIEW and ENROLLING BY INVITATION  but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA130', item: 'paa_status', rule: 'Interim statuses  APPROVED is missing', description: 'Trial Status of IN REVIEW and CLOSED TO ACCRUAL but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA131', item: 'paa_status', rule: 'Interim status ACTIVE is missing', description: 'Trial Status of IN REVIEW and CLOSED TO ACCRUAL but missing ACTIVE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA132', item: 'paa_status', rule: 'Interim status  APPROVED is missing', description: 'Trial Status of IN REVIEW and CLOSED TO ACCRUAL AND INTERVENTIONS but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA133', item: 'paa_status', rule: 'Interim status ACTIVE is missing', description: 'Trial Status of IN REVIEW and CLOSED TO ACCRUAL AND INTERVENTIONS but missing ACTIVE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA134', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is missing', description: 'Trial Status of IN REVIEW and CLOSED TO ACCRUAL AND INTERVENTIONS but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA135', item: 'paa_status', rule: 'Interim status  APPROVED is missing', description: 'Trial Status of IN REVIEW and TEMPORARILY CLOSED TO ACCRUAL but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA136', item: 'paa_status', rule: 'Interim status ACTIVE is missing', description: 'Trial Status of IN REVIEW and TEMPORARILY CLOSED TO ACCRUAL but missing ACTIVE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA137', item: 'paa_status', rule: 'Interim status  APPROVED is missing', description: 'Trial Status of IN REVIEW and TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS but missing APPROVED  statuses', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA138', item: 'paa_status', rule: 'Interim status ACTIVE is missing', description: 'Trial Status of IN REVIEW and TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS but  missing ACTIVE  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA139', item: 'paa_status', rule: 'Interim status TEMPORARILY CLOSED TO ACCRUAL is missing', description: 'Trial Status of IN REVIEW and TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS but missing   TEMPORARILY CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA140', item: 'paa_status', rule: 'Interim status  APPROVED is missing', description: 'Trial Status of IN REVIEW and COMPLETE but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA141', item: 'paa_status', rule: 'Interim status  ACTIVE is missing', description: 'Trial Status of IN REVIEW and COMPLETE but missing ACTIVE  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA142', item: 'paa_status', rule: 'Interim statuses  CLOSED TO ACCRUAL AND INTERVENTION is missing', description: 'Trial Status of IN REVIEW and COMPLETE but missing  CLOSED TO ACCRUAL AND INTERVENTION status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA143', item: 'paa_status', rule: 'Interim status  APPROVED is missing', description: 'Trial Status of IN REVIEW and ADMINISTRATIVELY COMPLETE but missing APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA144', item: 'paa_status', rule: 'Interim status ACTIVE is missing', description: 'Trial Status of IN REVIEW and ADMINISTRATIVELY COMPLETE but missing ACTIVE  statuses', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA145', item: 'paa_status', rule: 'Interim status  CLOSED TO ACCRUAL  is missing', description: 'Trial Status of IN REVIEW and ADMINISTRATIVELY COMPLETE but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA146', item: 'paa_status', rule: 'Interim status APPROVED is missing', description: 'Trial Status of IN REVIEW and ADMINISTRATIVELY COMPLETE missing  APPROVED status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA147', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL AND INTERVENTION is missing', description: 'Trial Status of IN REVIEW and ADMINISTRATIVELY COMPLETE missing  CLOSED TO ACCRUAL AND INTERVENTION status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA148', item: 'paa_status', rule: 'Interim status ACTIVE is  missing', description: 'Trial Status APPROVED and CLOSED TO ACCRUAL  but missing ACTIVE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA149', item: 'paa_status', rule: 'Interim status  ACTIVE is  missing', description: 'Trial Status APPROVED and CLOSED TO ACCRUAL AND INTERVENTIONS but missing ACTIVE  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA150', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is  missing', description: 'Trial Status APPROVED and CLOSED TO ACCRUAL AND INTERVENTIONS but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA151', item: 'paa_status', rule: 'Interim status ACTIVE is  missing', description: 'Trial Status APPROVED and TEMPORARILY CLOSED TO ACCRUAL but missing ACTIVE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA152', item: 'paa_status', rule: 'Interim status ACTIVE is missing', description: 'Trial Status APPROVED and TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS but missing ACTIVE status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA153', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL AND INTERVENTION is missing', description: 'Trial Status APPROVED and COMPLETE but missing CLOSED TO ACCRUAL AND INTERVENTION', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA154', item: 'paa_status', rule: 'Interim status  CLOSED TO ACCRUAL AND INTERVENTION is missing', description: 'Trial Status APPROVED and ADMINISTRATIVELY COMPLETE but missing CLOSED TO ACCRUAL AND INTERVENTION status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA155', item: 'paa_status', rule: 'Invalid Transition from ACTIVE to CLOSED TO ACCRUAL on the same day', description: 'Trial Status ACTIVE and CLOSED TO ACCRUAL on the same day', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA156', item: 'paa_status', rule: 'Invalid Transition from ACTIVE to CLOSED TO ACCRUAL AND INTERVENTIONS on the same day', description: 'Trial Status ACTIVE and CLOSED TO ACCRUAL AND INTERVENTIONS on the same day', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA157', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL status is missing', description: 'Trial Status ACTIVE and CLOSED TO ACCRUAL AND INTERVENTIONS and missing CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA158', item: 'paa_status', rule: 'Interim Transition from ACTIVE to TEMPORARILY CLOSED TO ACCRUAL on the same day', description: 'Trial Status ACTIVE and TEMPORARILY CLOSED TO ACCRUAL on the same day', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA159', item: 'paa_status', rule: 'Invalid Transition from ACTIVE to TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS on the same day', description: 'Trial Status ACTIVE and TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS on the same day', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA160', item: 'paa_status', rule: 'Invalid Status CLOSED TO ACCRUAL is missing', description: 'Trial Status ACTIVE and COMPLETE  but missing CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA161', item: 'paa_status', rule: 'Invalid Status CLOSED TO ACCRUAL AND INTERVENTIONS is missing', description: 'Trial Status ACTIVE and COMPLETE  but missing CLOSED TO ACCRUAL AND INTERVENTIONS', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA162', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is missing', description: 'Trial Status ACTIVE and ADMINISTRATIVELY COMPLETE  but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')

ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA163', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL AND INTERVENTION  is missing', description: 'Trial Status ACTIVE and ADMINISTRATIVELY COMPLETE  but CLOSED TO ACCRUAL AND INTERVENTION  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA164', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is  missing', description: 'Trial Status ENROLLING BY INVITATION and CLOSED TO ACCRUAL AND INTERVENTIONS but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA165', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is missing', description: 'Trial Status ENROLLING BY INVITATION and COMPLETE but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA166', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL AND INTERVENTIONS is  missing', description: 'Trial Status ENROLLING BY INVITATION and COMPLETE but missing CLOSED TO ACCRUAL AND INTERVENTIONS status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA167', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is  missing', description: 'Trial Status ENROLLING BY INVITATION and ADMINISTRATIVELY  COMPLETE but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA168', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL AND INTERVENTIONS is  missing', description: 'Trial Status ENROLLING BY INVITATION and ADMINISTRATIVELY  COMPLETE but missing CLOSED TO ACCRUAL AND INTERVENTIONS status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA169', item: 'paa_status', rule: 'Invalid Status transition from CLOSED TO ACCRUAL to TEMPORARILY CLOSED TO ACCRUAL', description: 'Trial Status CLOSED TO ACCRUAL  before TEMPORARILY CLOSED TO ACCRUAL', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA170', item: 'paa_status', rule: 'Invalid Status transition from CLOSED TO ACCRUAL to TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS', description: 'Trial Status CLOSED TO ACCRUAL  before TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA171', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL AND INTERVENTIONS is  missing', description: 'Trial Status CLOSED TO ACCRUAL and COMPLETE but missing CLOSED TO ACCRUAL and missing CLOSED TO ACCRUAL AND INTERVENTIONS status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA172', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL AND INTERVENTIONS is  missing', description: 'Trial Status CLOSED TO ACCRUAL and ADMINISTRATIVELY COMPLETE but missing CLOSED TO ACCRUAL and missing CLOSED TO ACCRUAL AND INTERVENTIONS status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA173', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is missing', description: 'Trial Status TEMPORARILY CLOSED TO ACCRUAL and ADMINISTRATIVELY COMPLETE but missing CLOSED TO ACCRUAL  status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA174', item: 'paa_status', rule: 'Interim status  CLOSED TO ACCRUAL AND INTERVENTIONS is missing', description: 'Trial Status TEMPORARILY CLOSED TO ACCRUAL and ADMINISTRATIVELY COMPLETE but  missing CLOSED TO ACCRUAL AND INTERVENTIONS status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA175', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is  missing', description: 'Trial Status TEMPORARILY CLOSED TO ACCRUAL and CLOSED TO ACCRUAL AND INTERVENTIONS but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA176', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL is  missing', description: 'Trial Status TEMPORARILY CLOSED TO ACCRUAL and ADMINISTRATIVELY COMPLETE but missing CLOSED TO ACCRUAL status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA177', item: 'paa_status', rule: 'Interim status CLOSED TO ACCRUAL AND INTERVENTIONS is missing', description: 'Trial Status TEMPORARILY CLOSED TO ACCRUAL and ADMINISTRATIVELY COMPLETE but missing CLOSED TO ACCRUAL AND INTERVENTION status', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA178', item: 'paa_status', rule: 'Data inconsistency. Study Start Date cannot be in the past if the overall recruitment status is Approved', description: 'Trial Status = APPROVED; Actual Trial  Start Date cannot be in the past', remark: '[Select Trial Status] from Administrative Data menu to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA179', item: 'paa_status', rule: 'Why Study Stopped cannot be more than 160 characters', description: '‘Why Study Stopped’ > 160 characters', remark: '[Select Trial Status] from Administrative Data menu	to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA180', item: 'paa_status', rule: 'When Primary Completion Date is set to ‘N/A’; the Primary Completion Date must be Null.', description: 'Primary Completion Date = ‘N/A’  AND Primary Completion Date is not Null.', remark: '[Select Trial Status] from Administrative Data menu	to view Trial Status.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA181', item: 'paa_on_hold', rule: 'Off Hold Dates must be current or past dates', description: 'Off Hold date is future date', remark: '[Select On-hold Info ] from Trial Overview menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA182', item: 'paa_on_hold', rule: 'Only one On-hold Date without Off-hold Date is allowed', description: '> 1 On-hold Date without Off-hold Date', remark: '[Select On-hold Info ] from Trial Overview menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA183', item: 'paa_regulatory_info_human_subject_safety', rule: 'Review Board Approval must be  SUBMITTED PENDING if Trial Status is   IN REVIEW', description: 'Current Trial Status = IN REVIEW and Board Approval Status is not Submitted; Pending', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA184', item: 'paa_regulatory_info_human_subject_safety', rule: 'Trial Status cannot be  ACTIVE when the  Review Board Approval is ‘Submitted; Denied’', description: 'Current Trial Status = ACTIVE; Board Approval Status = Submitted; Denied', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA185', item: 'paa_regulatory_info_human_subject_safety', rule: 'If Review Board is ‘Submitted; Denied’; Trial Status cannot be Approved', description: 'Review Board is ‘Submitted, Denied’, Trial Status cannot be Approved', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA186', item: 'paa_regulatory_info_human_subject_safety', rule: 'If Board Approval Status is Submitted; Pending; Current Trial Status must be IN REVIEW', description: 'Board Approval Status is Submitted, Pending, Current Trial Status must be IN REVIEW', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA187', item: 'paa_regulatory_info_human_subject_safety', rule: 'Current study status cannot be Active when Board Approval Status is submitted, pending', description: 'Current trial status cannot be Active when Board Approval Status is Submitted, Pending', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
# duplicate ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA188', item: 'paa_regulatory_info_human_subject_safety', rule: 'Current study status cannot be Active when Board Approval Status is denied', description: 'Board Approval Status = ‘denied’ And the  current study status  Active', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA189', item: 'paa_regulatory_info_human_subject_safety', rule: 'Current study status cannot be Active when Board Approval Status is not required.', description: 'Current trial status cannot be Active when Board Approval Status is Submitted, Not Required', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
# duplicate ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA190', item: 'paa_regulatory_info_human_subject_safety', rule: 'Current study status cannot be Active when Board Approval Status is submitted; pending', description: 'Board Approval Status = ‘Submitted Pending’  And the  current study status  Active', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA191', item: 'paa_regulatory_info_human_subject_safety', rule: 'If current trial status is withdrawn; Board Approval status in Regulatory Information – HSS must be ‘submitted denied’', description: 'Current trial status is Withdrawn, Board Approval status must be Submitted Denied', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA192', item: 'paa_regulatory_info_human_subject_safety', rule: 'Board status has been nullified. Board status is required.', description: 'Review Board status is required', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA193', item: 'paa_regulatory_info_human_subject_safety', rule: 'If the current trial status is In Review; the board approval status must be Submitted; Pending.', description: 'Trial Status is In Review and Board Approval Status is not Submitted; Pending', remark: '[Select Regulatory Information Human Subject Safety] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA194', item: 'paa_trial_funding', rule: 'A grant is required if the trial is funded by NCI', description: 'A grant is required if the trial is funded by NCI', remark: '[Select Trial Funding] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA195', item: 'paa_trial_funding', rule: 'Duplicate grants are not allowed', description: 'Duplicate grants are not allowed', remark: '[Select Trial Funding] from Administrative Data menu.')
# duplicate ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA196', item: 'paa_participating_sites', rule: 'Data inconsistency. No site can recruit patients if the overall recruitment status is Approved', description: 'Study Status = APPROVED and Site Status = ACTIVE', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA197', item: 'paa_participating_sites', rule: 'Data inconsistency. No site can recruit patients if the overall recruitment status is Approved', description: 'Data inconsistency. No site can recruit patients if the overall recruitment status is Approved', remark: '[Select Participating Sites] from Administrative Data menu.')
# duplicate ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA198', item: 'paa_participating_sites', rule: 'Data inconsistency. No site can recruit patients if the overall recruitment status is In Review', description: 'Study Status = IN REVIEW and Site Status = ACTIVE', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA199', item: 'paa_participating_sites', rule: 'Data inconsistency. No site can recruit patients if the overall recruitment status is In Review', description: 'Data inconsistency. No site can recruit patients if the overall recruitment status is In Review', remark: '[Select Participating Sites] from Administrative Data menu.')
# duplicate ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA200', item: 'paa_participating_sites', rule: 'Data inconsistency. No site can recruit patients if the overall recruitment status is Withdrawn', description: 'Study Status WITHDRAWN and Site Status = ACTIVE', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA201', item: 'paa_participating_sites', rule: 'Data inconsistency. No site can recruit patients if the overall recruitment status is Withdrawn', description: 'Data inconsistency. No site can recruit patients if the overall recruitment status is Withdrawn', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA202', item: 'paa_participating_sites', rule: 'There are no Active Participating Sites exists for the trial.', description: 'There are no Active Participating Sites exists for the trial.', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA203', item: 'paa_participating_sites', rule: 'Primary Site  status has been Nullified. Primary site status is required', description: 'Primary Site status is required', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA204', item: 'paa_participating_sites', rule: 'Primary Investigator has been Nullified.  Primary Investigator is required', description: 'Primary Investigator is required', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA205', item: 'paa_participating_sites', rule: 'Primary Contact status has been Nullified', description: 'Primary Contact status is required', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA206', item: 'paa_participating_sites', rule: 'Each participating site playing treating site role must have primary contact info (person; phone; email) for not-completed study if central contact is required', description: 'Each participating site playing treating site role must have primary contact info (person; phone; email) for not-completed study if central contact is required', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA207', item: 'paa_participating_sites', rule: 'Target accrual is required', description: 'Target accrual is required', remark: '[Select Participating Sites] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAA', code: 'PAA208', item: 'paa_nci_specific_info', rule: 'Data Table 4 Funding Sponsor status has been nullified.  Data Table 4 Funding Sponsor is required', description: 'Data Table 4 Funding Sponsor status is required', remark: '[Select [NCI Specific Information] from Administrative Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS41', item: 'pas_trial_description', rule: 'Detailed Description cannot be more than 32000 characters', description: 'Detailed Description cannot be more than 32000 characters', remark: '[Select Trial Description] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS42', item: 'pas_trial_description', rule: 'Brief Title must be more than 18 characters', description: 'Brief Title must be more than 18 characters', remark: '[Select Trial Description] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS43', item: 'pas_trial_design', rule: 'Clinical Research Category is Observational; Study Model is blank', description: 'Clinical Research Category is Observational, Study Model is blank', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS44', item: 'pas_trial_design', rule: 'Clinical Research Category is  Ancillary Correlative; Study Model is blank', description: 'Clinical Research Category is  Ancillary Correlative, Study Model is blank	', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS45', item: 'pas_trial_design', rule: 'Clinical Research Category is Observational ;if Study Model = ‘Other’; Description is required', description: 'Clinical Research Category is Observational ,Study Model is‘Other’, AND Description is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS46', item: 'pas_trial_design', rule: 'Clinical Research Category is  Ancillary Correlative; if Study Model = ‘Other’; Description is required', description: 'Clinical Research Category is  Ancillary Correlative, Study Model is ‘Other’, ADN Description is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS47', item: 'pas_trial_design', rule: 'Clinical Research Category is Observational ;if Time Perspective = ‘Other’; Description is required', description: 'Clinical Research Category is Observational ,Time Perspective is‘Other’, AND Description is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS48', item: 'pas_trial_design', rule: 'Clinical Research Category is  Ancillary Correlative; if Time Perspective = ‘Other’; Description is required', description: 'Clinical Research Category is  Ancillary Correlative,Time Perspective is‘Other’, AND Description is required', remark: '[Select Trial Design] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS49', item: 'pas_trial_description', rule: 'Brief Title must be less than 300 characters', description: 'Brief Title cannot be more than  300 characters', remark: '[Select Trial Description ] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS50', item: 'pas_arms/groups', rule: 'At least one Arm is required', description: 'Arm is required', remark: '[Select Arms/Groups] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS51', item: 'pas_arms/groups', rule: 'Arm label cannot be more than 62 characters', description: 'Arm Label cannot be more than 62 characters', remark: '[Select Arms/Groups] from Scientific Data menu.')
ValidationRule.find_or_create_by(category: 'warning', model: 'trial', section: 'PAS', code: 'PAS52', item: 'pas_biomarkers', rule: 'At least one pending biomarker must exist on the trial.', description: 'At least one pending biomarker must exist on the trial.', remark: '[Select Biomarkers] from Scientific Data menu.')


  test_users = [ {"username" => "ctrpsuper", "role" => "ROLE_SUPER", "first_name" => "Fred", "last_name" => "Lathiramalaynathan"},
                 {"username" => "ctrpsuper2", "role" => "ROLE_SUPER", "first_name" => "Frank", "last_name" => "Lee"},
                 {"username" => "ctrpsuper3", "role" => "ROLE_SUPER", "first_name" => "Fiona", "last_name" => "Layman-Ligramman"},
                 {"username" => "ctrpadmin", "role" => "ROLE_ADMIN", "first_name" => "Fifi", "last_name" => "Lineburgh"},
                 {"username" => "ctrpcurator", "role" => "ROLE_CURATOR", "first_name" => "Fox", "last_name" => "Links-Hyphenn"},
                 {"username" => "testercurator", "role" => "ROLE_CURATOR", "first_name" => "F", "last_name" => "Lever"},
                 {"username" => "ctrpro", "role" => "ROLE_RO", "first_name" => "Frederick", "last_name" => "Lathiramalaynathan"},
                 {"username" => "ctrptrialsubmitter", "role" => "ROLE_TRIAL-SUBMITTER", "first_name" => "Fred", "last_name" => "Luggz"},
                 {"username" => "ctrptrialsubmitter2", "role" => "ROLE_TRIAL-SUBMITTER", "first_name" => "Frank", "last_name" => "Layman"},
                 {"username" => "ctrptrialsubmitter3", "role" => "ROLE_TRIAL-SUBMITTER", "first_name" => "Fiona", "last_name" => "Lighthouse"},
                 {"username" => "ctrpaccrualsubmitter", "role" => "ROLE_ACCRUAL-SUBMITTER", "first_name" => "Fifi", "last_name" => "L"},
                 {"username" => "ctrpsitesu", "role" => "ROLE_SITE-SU", "first_name" => "Flower", "last_name" => "Leinmann"},
                 {"username" => "ctrpsitesu2", "role" => "ROLE_SITE-SU", "first_name" => "Fox", "last_name" => "Lilongwe"},
                 {"username" => "ctrpsitesu3", "role" => "ROLE_SITE-SU", "first_name" => "Fedro", "last_name" => "Piuz"},
                 {"username" => "ctrpabstractor", "role" => "ROLE_ABSTRACTOR", "first_name" => "Frederick", "last_name" => "Lathiramalaynathan"},
                 {"username" => "ctrpabstractor2", "role" => "ROLE_ABSTRACTOR", "first_name" => "Fils", "last_name" => "Litmus"},
                 {"username" => "ctrpabstractor3", "role" => "ROLE_ABSTRACTOR", "first_name" => "Fred", "last_name" => "Lizdenburgh"},
                 {"username" => "ctrpabstractorsu", "role" => "ROLE_ABSTRACTOR-SU", "first_name" => "Frank", "last_name" => "Legal"},
                 {"username" => "ctepservice", "role" => "ROLE_SERVICE-REST", "first_name" => "Fiona", "last_name" => "Lee"},
                 {"username" => "ccrservice", "role" => "ROLE_SERVICE-REST", "first_name" => "Fifi", "last_name" => "Lever"},
                 {"username" => "dcpservice", "role" => "ROLE_SERVICE-REST", "first_name" => "Fox", "last_name" => "Layman"},
                 {"username" => "ctrpaccountapprover1", "role" => "ROLE_ACCOUNT-APPROVER", "first_name" => "Frederick", "last_name" => "Links"},
                 {"username" => "ctrpaccountapprover2", "role" => "ROLE_ACCOUNT-APPROVER", "first_name" => "Freed", "last_name" => "Lathiramalaynathan"}
  ]

  test_users.each do |u|
   user = LocalUser.new
   user.username = u["username"]
   user.role = u["role"]
   user.first_name = u["first_name"]
   user.last_name  = u["last_name"]
   user.domain = "NIH"
   user.email = "#{user.username}@ctrp-ci.nci.nih.gov"
   user.password = "Welcome01"
   user.encrypted_password = "$2a$10$Kup4LOl1HMoxIDrqxeUbNOsh3gXJhMz/FYPPJyVAPbY0o3DxuFaXK"
   user.user_status = UserStatus.find_by_code('ACT')
   user.receive_email_notifications = true
   user.status_date = Time.zone.now
   user.phone = "111-111-1111"
   does_user_exists = User.find_by_username(user.username)
   user.save! if !does_user_exists
  end

  test_users.each do |u|
    user = User.find_by_username(u["username"])
    unless user.blank?
      user.role = u["role"]
      unless user.role == "ROLE_SERVICE-REST"
        if user.username == 'ctrpsitesu2'
          user.organization = org3
        elsif user.username == 'ctrpsitesu3'
            user.organization = dcp
        else
          user.organization = org0
        end
      end
      if user.role == "ROLE_SERVICE-REST"
        case user.username
          when "ctepservice"
            user.organization = ctep

          when "dcpservice"
            user.organization = dcp

          when "ccrservice"
            user.organization = ccr
        end
      end
      user.save!
      #puts "Updated role of user = #{user.username}, role = #{user.role}"
    end
  end

  ##Add NCICTRPDEV team
  LdapUser.delete_all

  charlie = {"email" => "shivece@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Charlie", "last_name" => "Shive" }
  mahesh = {"email" => "yelisettim@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Mahesh", "last_name" => "Yelisetti" }
  shilpi = {"email" => "singhs10@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Shilpi", "last_name" => "Singh" }
  shamim = {"email" => "ahmeds6@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Shamim", "last_name" => "Ahmed" }
  murali = {"email" => "dullam@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Murali", "last_name" => "Dulla" }
  tony = {"email" => "wangg5@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Tony", "last_name" => "Wang" }
  shenpei = {"email" => "wus4@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Shenpei", "last_name" => "Wu" }
  sarada = {"email" => "schintal@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Sarada", "last_name" => "Chintala" }
  hemant = {"email" => "undalehv@mail.nih.gov", "role" => "ROLE_CURATOR", "first_name" => "Hemant", "last_name" => "Undale" }
  radhika = {"email" => "tekumall@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Radhika", "last_name" => "Tekumalla"}
  vasu = {"email" => "nalluruvn@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Vasu", "last_name" => "Nalluru"}
  barry = {"email" => "alkisbd@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Barry", "last_name" => "Alkis"}


  ncictrpdev_users = [charlie, mahesh, shilpi, shamim, murali, tony, shenpei, sarada, hemant, radhika, vasu, barry]

  ##Add CTRP Business Analysts

  joe = {"email" => "martuccijj@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Joe", "last_name" => "Martucci" }
  michael = {"email" => "izbickimj@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Michael", "last_name" => "Izbicki"}
  sandy = {"email" => "lightbodysj@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Sandy", "last_name" => "Lightbody" }
  susan = {"email" => "nonemakersl@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Susan", "last_name" => "Nonemaker"  }
  sophia = {"email" => "rarhais@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Sophia", "last_name" => "Rarhai"  }

  ba_users = [joe, michael, sandy, susan, sophia]

  ##Add CTRO and Curator users

  stephanie = {"email" => "whitleys@mail.nih.gov", "role" => "ROLE_ABSTRACTOR-SU", "first_name" => "Stephanie", "last_name" => "Whitley" }
  kirsten = {"email" => "larcokl@mail.nih.gov", "role" => "ROLE_CURATOR", "first_name" => "Kirsten", "last_name" => "Larco" }
  andrea = {"email" => "mooreaj@mail.nih.gov", "role" => "ROLE_ABSTRACTOR-SU", "first_name" => "Andrea", "last_name" => "Moore" }
  graysonra = {"email" => "graysonra@mail.nih.gov", "role" => "ROLE_ABSTRACTOR-SU", "first_name" => "Rachel", "last_name" => "Grayson" }

  ctro_users = [stephanie, kirsten, andrea, graysonra]

  #Add Fed users

  jose = {"email" => "galvezjj@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Jose", "last_name" => "Galvez" }
  gene = {"email" => "krausg@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Gene", "last_name" => "Kraus" }

  fed_users = [jose, gene]

  all_users = ncictrpdev_users + ba_users + ctro_users + fed_users

  ## Save the users by bypassing validation. We want to save the user without the password
  begin
    all_users.each do |u|
      ldap_user = LdapUser.new
      ldap_user.email = u["email"]
      ldap_user.username = u["email"].split("@")[0]
      ldap_user.role = u["role"]
      ldap_user.domain = "NIH"
      ldap_user.first_name = u["first_name"]
      ldap_user.last_name = u["last_name"]
      ldap_user.organization = org0
      ldap_user.user_status = UserStatus.find_by_code('ACT')
      ldap_user.receive_email_notifications = true
      ldap_user.status_date = Time.zone.now
      ldap_user.phone = "111-111-1111"
      ldap_user.save(validate: false)
      #puts "Saved user = #{ldap_user.username}  role = #{ldap_user.role}"
    end
  rescue Exception => e
    Rails.logger.info "Exception thrown #{e.inspect}"
  end


#Line to include seeds from passed environment variable
puts "Begin seeding environment-specfic data"
load(Rails.root.join( 'db', 'seeds', "#{Rails.env.downcase}.rb"))
puts "Seeding complete"
