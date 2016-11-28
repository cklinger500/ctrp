#Trial seed data

puts "Begin seeding trial test records..."

##Grants - Temporary grant information stored in seeds. WIll be replaced by nightly import of Grants information
grant2 = Tempgrants.find_or_create_by(serial_number:134759 , institution_name:'UNIVERSITY OF MINNESOTA' , project_title:'Transposon-based screens for colorectal cancer genes' ,funding_mechanism:'R01' , institute_code: 'CA', pi_full_name: 'KYLIE WALTERS')
grant3 = Tempgrants.find_or_create_by(serial_number:142845 , institution_name: 'MEHARRY MEDICAL COLLEGE', project_title:'Mechanisms for Benzo(a)pyrene-Induced Colon Cancer Exacerbation by Dietary Fat' ,funding_mechanism: 'R01', institute_code: 'CA',  pi_full_name: 'M. Rita		Young')
grant4 = Tempgrants.find_or_create_by(serial_number:133230 , institution_name: 'VANDERBILT UNIVERSITY', project_title:'The alpha2beta1 Integrin and Tumor Metastasis' ,funding_mechanism: 'R01', institute_code: 'CA',  pi_full_name: 'CHUNHAI HAO')

grant6 = Tempgrants.find_or_create_by(serial_number:136921 , institution_name: 'UNIVERSITY OF NEBRASKA MEDICAL CENTER', project_title:'NMR Structural Studies of Ubiquitin Receptor Protein Complexes' ,funding_mechanism: 'R01', institute_code: 'CA', pi_full_name: 'SADHAN MAJUMDER')
grant7 = Tempgrants.find_or_create_by(serial_number:128837 , institution_name: 'MEDICAL UNIVERSITY OF SOUTH CAROLINA', project_title:'Immunotherapy to prevent oral permalignant lesion recurrence and oral cancer.' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'RICHARD WOOD')

grant8 = Tempgrants.find_or_create_by(serial_number:129687 , institution_name: 'EMORY UNIVERSITY', project_title:'Molecular mechanisms of TRAIL resistance in glioblastoma' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'CAROLYN KLINGE')
grant9 = Tempgrants.find_or_create_by(serial_number:136491 , institution_name: 'UNIVERSITY OF TX MD ANDERSON CAN CTR', project_title:'REST/NRSF-mediated medulloblastoma tumorigenesis' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'JASON LEWIS')

grant10 = Tempgrants.find_or_create_by(serial_number:132840 , institution_name: 'UNIVERSITY OF TX MD ANDERSON CAN CTR', project_title:'Function of REV3L in limiting oncogenesis via DNA damage tolerance' ,funding_mechanism: 'R01', institute_code: 'CA', pi_full_name: 'XIZENG WU')
grant11 = Tempgrants.find_or_create_by(serial_number:138410 , institution_name: 'UNIVERSITY OF LOUISVILLE', project_title:'Regulation of miRNA in breast cancer' ,funding_mechanism: 'R01', institute_code: 'CA', pi_full_name: 'CONSTANCE BRINCKERHOFF')

grant12 = Tempgrants.find_or_create_by(serial_number:138468 , institution_name: 'SLOAN-KETTERING INST CAN RESEARCH', project_title:'PET Imaging of Cancer with pH (Low) Insertion Peptide (pHLIP)' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'REBECCA CROWLEY')
grant13 = Tempgrants.find_or_create_by(serial_number: 142587, institution_name: 'UNIVERSITY OF ALABAMA AT BIRMINGHAM', project_title:'Phase-sensitive x-ray breast tomosynthesis' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'Fese Mokube')

grant14 = Tempgrants.find_or_create_by(serial_number: 77267, institution_name: 'DARTMOUTH COLLEGE', project_title:'Invasive Behavior of Tumor Cells Producing Collagenase-1' ,funding_mechanism: 'R01', institute_code: 'CA', pi_full_name: 'Chiswili Chabu')
grant15 = Tempgrants.find_or_create_by(serial_number:132672 , institution_name: 'UNIVERSITY OF PITTSBURGH AT PITTSBURGH', project_title:'Continued Development and Evaluation of caTIES' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'Christine Ambrosone')
grant16 = Tempgrants.find_or_create_by(serial_number: 144563, institution_name: 'INDIANA UNIVERSITY BLOOMINGTON', project_title:'Studies Toward the Total Synthesis of Leiodelide' ,funding_mechanism: 'F31', institute_code: 'CA',pi_full_name: 'Deborah Lang')

grant17 = Tempgrants.find_or_create_by(serial_number:142118 , institution_name: 'YALE UNIVERSITY', project_title:'Live analysis of tumor-host cells interactions' ,funding_mechanism: 'F32', institute_code: 'CA',pi_full_name: 'Jonna Frasor')
grant18 = Tempgrants.find_or_create_by(serial_number:139426 , institution_name: 'ROSWELL PARK CANCER INSTITUTE CORP', project_title:'Genome-Wide Predictors of Treatment-Related Toxicities' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'LIANG ZHU')
grant19 = Tempgrants.find_or_create_by(serial_number:130202 , institution_name: 'UNIVERSITY OF CHICAGO', project_title:'Pax3, Melanocyte Stem Cells and Melanoma' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'LESLIE GUNATILAKA')
grant20 = Tempgrants.find_or_create_by(serial_number:130932 , institution_name: 'UNIVERSITY OF ILLINOIS AT CHICAGO', project_title:'Crosstalk between estrogen receptor and NFkB in target gene regulation' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'JESSE MARTINEZ')

grant21 = Tempgrants.find_or_create_by(serial_number: 131421, institution_name: 'ALBERT EINSTEIN COLLEGE OF MEDICINE', project_title:'Role of Skp2-cyclin A Interaction in Normal Physiology and Cancer' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'Cecile	A	Lengacher')
grant22 = Tempgrants.find_or_create_by(serial_number:90265 , institution_name: 'UNIVERSITY OF ARIZONA', project_title:'Anticancer Agents from Plant- and Lichen-Associated Fungi of the Sonoran Desert' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'Neetu Singh')

grant23 = Tempgrants.find_or_create_by(serial_number:129688 , institution_name: 'UNIVERSITY OF ARIZONA', project_title:'Mechanisms of colon cancer chemoprevention by ursodeoxycholic acid' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'DAVID STEWART')
grant24 = Tempgrants.find_or_create_by(serial_number:131080 , institution_name: 'UNIVERSITY OF SOUTH FLORIDA', project_title:'MBSR Symptom Cluster Trial for Breast Cancer Survivors' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'DAVID JARRARD')
grant25 = Tempgrants.find_or_create_by(serial_number:153978 , institution_name: 'MASSACHUSETTS GENERAL HOSPITAL', project_title:'Proliferation-promoting activities of pRB' ,funding_mechanism: 'F32', institute_code: 'CA',pi_full_name: 'BARRY SLECKMAN')
grant26 = Tempgrants.find_or_create_by(serial_number:150295 , institution_name: 'COLD SPRING HARBOR LABORATORY', project_title:'2010 Cold Spring Harbor Laboratory Conference on Systems Biology: Global Regulati' ,funding_mechanism: 'R13', institute_code: 'CA',pi_full_name: 'XIONGBIU LU')
grant27 = Tempgrants.find_or_create_by(serial_number: 97131, institution_name:'UNIVERSITY OF WISCONSIN-MADISON', project_title: 'Modulation of IGF-II Imprinting in the Aging Prostate' ,funding_mechanism: 'R01', institute_code: 'CA',pi_full_name: 'Rafael Fridman')


## Central Contact Types
contact_type1 = CentralContactType.find_or_create_by(code: 'NONE', name: 'None')
contact_type2 = CentralContactType.find_or_create_by(code: 'PI', name: 'PI')
contact_type3 = CentralContactType.find_or_create_by(code: 'PERSON', name: 'Person')
contact_type4 = CentralContactType.find_or_create_by(code: 'GENERAL', name: 'General')


## Board Approval Statuses
approval_status2 = BoardApprovalStatus.find_or_create_by(code: 'SUBPENDING', name: 'Pending')
approval_status3 = BoardApprovalStatus.find_or_create_by(code: 'SUBAPPROVED', name: 'Approved')
approval_status4 = BoardApprovalStatus.find_or_create_by(code: 'SUBEXEMPT', name: 'Exempt')
approval_status5 = BoardApprovalStatus.find_or_create_by(code: 'SUBDENIED', name: 'Denied')
approval_status6 = BoardApprovalStatus.find_or_create_by(code: 'SUBUNREQUIRED', name: 'Not required')
approval_status7 = BoardApprovalStatus.find_or_create_by(code: 'SUBUNREQUIRED', name: 'Not yet submitted')

total_orgs = Organization.all.size


## Trials
## Delete existing Trial data
if Trial.all.size == 0
  DataImport.delete_trial_data
  ## Reading and importing Trial related spreadsheets
  puts "...Parsing trial spreadsheet"
  DataImport.import_trials
  # Temporarily commenting out import of Milestons
  #puts "...Parsing milestone spreadsheet"
  #DataImport.import_milestones
  puts "...Parsing participating sites spreadsheet"
  DataImport.import_participating_sites
end
