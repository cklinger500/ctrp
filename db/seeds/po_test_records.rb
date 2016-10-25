#PO seed data

puts "Begin seeding PO test records..."

ctep = SourceContext.find_by_code('CTEP')
ctrp = SourceContext.find_by_code('CTRP')
nlm = SourceContext.find_by_code('NLM')

source_act = SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id)
source_pend = SourceStatus.find_by_code_and_source_context_id('PEND', ctrp.id)
source_inact = SourceStatus.find_by_code_and_source_context_id('INACT', ctrp.id)
source_nullified = SourceStatus.find_by_code_and_source_context_id('NULLIFIED', ctrp.id)

source_act_ctep = SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
source_inact_ctep = SourceStatus.find_by_code_and_source_context_id('INACT', ctep.id)
source_leg_ctep = SourceStatus.find_by_code_and_source_context_id('LEG', ctep.id)

source_act_nlm = SourceStatus.find_by_code_and_source_context_id('ACT', nlm.id),
    source_inact_nlm = SourceStatus.find_by_code_and_source_context_id('INACT', nlm.id)

org = FamilyRelationship.find_by_code('ORG')
aff = FamilyRelationship.find_by_code('AFF')

usa = "United States"

#one org is already loaded for test accounts from root seed file
#if Organization.all.size == 7
  puts "...Seeding orgs"

  org1 = Organization.find_or_create_by( id: 139020,
                                         source_id: 'MN021',
                                         processing_status: 'Active',  name: 'University of Minnesota/Masonic Children\'s Hospital',
                                         phone:'301-999-200f',
                                         source_context: SourceContext.find_by_code('CTEP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                         address: '2450 Riverside Ave', city: 'Minneapolis', state_province: 'Minnesota', country:usa, postal_code: '35465', email: "ahaley@minnhealth.com")
  if !org1.new_record?
    org1.name_aliases.find_or_create_by(name: 'University of Minnesota Children\'s Hospital Fairview')
    org1.name_aliases.find_or_create_by(name: 'University of Minnesota Medical Center-Fairview-Riverside')
  end
  org2 = Organization.find_or_create_by(id: 139049, source_id: 'MN022',
                                        name: 'University of Minnesota Medical Center-Fairview',
                                        phone:'315-425-2707',
                                        source_context: SourceContext.find_by_code('CTEP'),
                                        source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                        address: '516 Delaware St SE', city: 'Minneapolis', state_province:'Minnesota', country:usa, postal_code: '123432', email: "cdickens@minnhealth.com")
  if !org2.new_record?
    org2.name_aliases.find_or_create_by(name: 'Masonic Cancer Center, University of Minnesota')
  end

  org3 = Organization.find_or_create_by(id: 153109, source_id: 'NC164', processing_status: 'Incomplete',  name: 'Coastal Carolina Radiation Oncology', phone:'315-425-2707',
                                        source_context: SourceContext.find_by_code('CTEP'),
                                        source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                        service_request: SourceStatus.find_by_code('CREATE'),
                                        address: '1988 S 16th St', city: 'Wilmington', state_province:'North Carolina', country:usa, postal_code: '56456', email: "rdahl@wilmhealth.com")

  org4 = Organization.find_or_create_by(id: 12733422, processing_status: 'Complete',  name: 'Comprehensive Cancer Center of Wake Forest University', phone:'315-425-2707',
                                        source_context: SourceContext.find_by_code('CTRP'),
                                        source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                        address: '1 Medical Center Blvd', city: '', state_province:'North Carolina', country: usa, postal_code: '12344', email: "fforsyth@wakehealth.com") #labeled unknown in directory

  org5 = Organization.find_or_create_by(id: 117163, source_id: 'LA032', processing_status: 'Incomplete',  name: 'Ochsner Baptist Medical Center', phone:'315-425-2707',
                                        source_context: SourceContext.find_by_code('CTEP'),
                                        source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                        service_request: SourceStatus.find_by_code('CREATE'),
                                        address: '2700 Napoleon Ave', city: 'New Orleans', state_province:'Louisiana', country:usa, postal_code: '082345', email: "jlahiri@loiushealth.com")
  if !org5.new_record?
    org5.name_aliases.find_or_create_by(name: 'Ochsner Baptist Medical Center')
  end
  org6 = Organization.find_or_create_by(id: 173475, source_id: 'NY139', processing_status: 'Incomplete',  name: 'Syracuse Veterans Administration Medical Center',
                                        phone:'315-425-2707',
                                        source_context: SourceContext.find_by_code('CTEP'),
                                        source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                        service_request: SourceStatus.find_by_code('CREATE'),
                                        address: ' 800 Irving Ave', city: 'Syracuse', state_province:'New York', country:usa, postal_code: '12347', email: "kdesai@syrhealth.com")

  org7 = Organization.find_or_create_by(id: 150970, source_id: 'NC088', processing_status: 'Incomplete',  name: 'Veterans Administration Medical Center.', phone:'315-425-2707',
                                        source_context: SourceContext.find_by_code('CTEP'),
                                        source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                        service_request: SourceStatus.find_by_code('CREATE'),
                                        address: '50 Irving St NW', city: '', state_province:'District of Columbia', country:usa, postal_code: '95673', email: "pcoaehlo@columbiahealth.com")

  org8 = Organization.find_or_create_by(id: 213850, source_id: 'WAKE', processing_status: 'Incomplete',  name: 'Wake Forest NCORP Research Base', phone:'315-425-2707',
                                        source_context: SourceContext.find_by_code('CTEP'),
                                        source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                        service_request: SourceStatus.find_by_code('CREATE'),
                                        address: 'Medical Center Blvd', city: 'Winston-Salem', state_province:'North Carolina', country:usa, postal_code: '27157', email: "gmarquez@salemhealth.com")

  if !org8.new_record?
    org8.name_aliases.create(name: 'Wake Forest Cancer Center Research Base')
  end
  org9 = Organization.find_or_create_by(id: 36296220, source_id: 'NC275', processing_status: 'Incomplete',  name: 'Wake Forest University at Clemmons', phone:'315-425-2707',
                                        source_context: SourceContext.find_by_code('CTEP'),
                                        source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                        service_request: SourceStatus.find_by_code('CREATE'),
                                        address: '3540 Clemmons Rd', city: 'Clemmons', state_province:'North Carolina', country:usa, postal_code: '78778', email: "owilde@clemmhealth.com")

  org10 = Organization.find_or_create_by(id: 36296062, source_id: 'NC273', processing_status: 'Incomplete',  name: 'Wake Forest University at Elkin', phone:'315-425-2707',
                                         source_context: SourceContext.find_by_code('NLM'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', nlm.id),
                                         service_request: SourceStatus.find_by_code('CREATE'),
                                         address: '200 Johnson Ridge Medical Park', city: 'Elkin', state_province:'North Carolina', country:usa, postal_code: '27345', email: "rstevenson@elkinhealth.com")

  org11 = Organization.find_or_create_by(id: 36296115, source_id: 'NC274', processing_status: 'Incomplete',  name: 'Wake Forest University at Lexington', phone:'315-425-2707',
                                         source_context: SourceContext.find_by_code('NLM'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', nlm.id),
                                         service_request: SourceStatus.find_by_code('CREATE'),
                                         address: '250 Hospital Drive', city: 'Lexington', state_province:'North Carolina', country:usa, postal_code: '3427157', email: "jswift@lexhealth.com")

  org12 = Organization.find_or_create_by(id: 36296009, source_id: 'NC272', processing_status: 'Incomplete',  name: 'Wake Forest University at Mount Airy', phone:'315-425-2707',
                                         source_context: SourceContext.find_by_code('NLM'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', nlm.id),
                                         service_request: SourceStatus.find_by_code('CREATE'),
                                         address: '910 Worth St.', city: 'Mt. Airy', state_province:'North Carolina', country:usa, postal_code: '5627157', email: "jrrtolkien@airyhealth.com")

  org13 = Organization.find_or_create_by(id: 149074, source_id: 'NC002', processing_status: 'Incomplete',  name: 'Wake Forest University Health Sciences', phone:'315-425-2707',
                                         source_context: SourceContext.find_by_code('CTEP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                         service_request: SourceStatus.find_by_code('CREATE'),
                                         address: '1 Medical Center Blvd', city: 'Winston-Salem', state_province:'North Carolina', country:usa, postal_code: '3427157', email: "mtwain@wakehealth.com") #no source id

  org14 = Organization.find_or_create_by(id: 149221, source_id: 'NC008', processing_status: 'Incomplete',  name: 'Wake Medical Center-Breast Screening and Diagnostic',
                                         phone:'315-425-2707',
                                         source_context: SourceContext.find_by_code('CTEP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                         service_request: SourceStatus.find_by_code('CREATE'),
                                         address: '3000 New Bern Avenue ', city: 'Raleigh', state_province:'North Carolina', country:usa, postal_code: '4527157', email: "jausten@wakehealth.com")

  org15 = Organization.find_or_create_by(id: 23875119, processing_status: 'Complete',  name: 'ACORN Research, LLC', phone:'315-425-2707',
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('PEND', ctrp.id),
                                         service_request: SourceStatus.find_by_code('NULL'),
                                         address: '6555 Quince Rd', city: 'Memphis', state_province:'Tennessee', country: usa, source_id: '23456') #no source id

  org16 = Organization.find_or_create_by(id: 24068, source_id: 'ACT', phone:'315-425-2707', processing_status: 'Incomplete',  name: 'Actelion Pharmaceuticals Switzerland',
                                         source_context: SourceContext.find_by_code('CTEP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                         service_request: SourceStatus.find_by_code('CREATE'),
                                         address: 'Gewerbestrasse 16', city: 'Allschwil', state_province:'Basel-Landschaft', country: 'Switzerland', postal_code: '34527157', email: "ebronte@wakehealth.com")

  if !org16.new_record?
    org16.name_aliases.find_or_create_by(name: 'Actelion')
  end
  org17 = Organization.find_or_create_by(id: 8352734, processing_status: 'Complete',  name: 'Boston University School Of Public Health',
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                         service_request: SourceStatus.find_by_code('NULL'),
                                         address: '715 Albany St', city: 'Boston', state_province:'Massachusetts', country: usa, postal_code: '27157', email: "cbronte@masshealth.com") #no source id

  org18 = Organization.find_or_create_by(id: 34563051, processing_status: 'Complete',  name: 'UCB, Inc.',
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                         service_request: SourceStatus.find_by_code('NULL'),
                                         address: '1950 Lake Park Drive', city: 'Smyrna', state_province:'Georgia', country: usa, email: "enesbit@smyrnahealth.com") #no source id

  if !org18.new_record?
    org18.name_aliases.find_or_create_by(name: 'UCB Pharma')
  end

  org19 = Organization.find_or_create_by(processing_status: 'Complete',  name: 'ACORN Research, LLC',
                                         source_context: SourceContext.find_by_code('CTEP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('INACT', ctep.id),
                                         service_request: SourceStatus.find_by_code('NULL'),
                                         address: '6555 Quince Rd', city: 'Memphis', state_province:'Tennessee', country: usa, source_id: "ACRN", ctrp_id: org15.id, postal_code: '23455', email: "vhugo@memphishealth.com") #no source id

  org20 = Organization.find_or_create_by(id: 226701, source_id: 'TX111', processing_status: 'Complete',  name: 'Texas Health Harris Methodist Hospital Fort Worth',
                                         phone:'865-541-1812',
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                         service_request: SourceStatus.find_by_code('NULL'),
                                         email: "jgrisham@texashealth.com", address: '1300 West Terrell', city: 'Fort Worth', state_province:'Texas', country:usa, postal_code:"147892")

org21 = Organization.find_or_create_by(id: 595150, source_id: 'CO029', processing_status: 'Complete',  name: 'Memorial Hospital Colorado Springs', phone:'865-541-1813',
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                       service_request: SourceStatus.find_by_code('NULL'),
                                       email: "mcrichton@boulderhealth.com", address: '1400 East Boulder', city: 'Colorado Springs', state_province:'Colorado', country:usa, postal_code:"37498")

  org22 = Organization.find_or_create_by(id: 2118412, source_id: 'MA043', processing_status: 'Complete',  name: 'Boston Medical Center', phone:'617-353-7571',
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                         service_request: SourceStatus.find_by_code('NULL'),
                                         email: "rcook@bostonhealth.com",  address: '1 Medical Center Drive', city: 'Boston', state_province:'Massachussets', country:usa, postal_code:"3849504")

  org23 = Organization.find_or_create_by(id: 33699872, source_id: 'NVRF', processing_status: 'Complete',  name: 'Nevada Cancer Research Foundation CCOP', phone:'702-541-1815',
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                         service_request: SourceStatus.find_by_code('NULL'),
                                         email: "rludlum@lasvegashealth.com",  address: '1 Rancho Drive', city: 'Las Vegas', state_province:'Nevada', country:usa, postal_code:"926344")

  org24 = Organization.find_or_create_by(id: 8149074, source_id: 'WA002', processing_status: 'Complete',  name: 'Harborview Medical Center', phone:'865-541-1816',
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                         service_request: SourceStatus.find_by_code('NULL'),
                                         email: "dbrown@seattlehealth.com", address: '23 Wheeling Drive', city: 'Seattle', state_province:'Washington', country:usa, postal_code:"123683") #no source id

  org25 = Organization.find_or_create_by(id: 23170023,  processing_status: 'Active',  name: 'National Cancer Institute', phone:'301-555-0000',
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                         email: "cancerhelp@nih.gov", address: '9609 Medical Center Drive', city: 'Rockville', state_province:'Maryland', country:usa, postal_code:"20850") #no source id

  org26 = Organization.find_or_create_by(id: 16108126,  processing_status: 'Active',  name: 'NCI - Center for Cancer Research', phone:'301-496-4365',
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                         service_request: SourceStatus.find_by_code('NULL'),
                                         email: "cancerhelp@nih.gov", address: '31 Center Drive', city: 'Rockville', state_province:'Maryland', country:usa, postal_code:"20892") #no source id

  org27 = Organization.find_or_create_by(id: 81490749, source_id: 'WA002', processing_status: 'Incomplete',  name: 'Harborview Medical Center', phone:'865-541-1816',
                                       source_context: SourceContext.find_by_code('CTEP'),
                                       source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                         service_request: SourceStatus.find_by_code('CREATE'),
                                       email: "dbrown@seattlehealth.com", address: '23 Wheeling Drive', city: 'Seattle', state_province:'Washington', country:usa, postal_code:"123683") #no source id

  puts "...Seeding families"
  family1 = Family.create(name: 'Masonic Cancer Center')
  if !family1.new_record?
    family1.family_memberships.create(organization: org1, family_relationship: aff)
    family1.family_memberships.create(organization: org2, family_relationship: org)
  end
  family2 = Family.create(name: 'Wake Forest Comprehensive Cancer Center')
  if !family2.new_record?
    family2.family_memberships.create(organization: org3, family_relationship: aff)
    family2.family_memberships.create(organization: org4, family_relationship: org)
    family2.family_memberships.create(organization: org5, family_relationship: aff)
    family2.family_memberships.create(organization: org6, family_relationship: aff)
    family2.family_memberships.create(organization: org7, family_relationship: aff)
    family2.family_memberships.create(organization: org8, family_relationship: org)
    family2.family_memberships.create(organization: org9, family_relationship: org)
    family2.family_memberships.create(organization: org10, family_relationship: org)
    family2.family_memberships.create(organization: org11, family_relationship: org)
    family2.family_memberships.create(organization: org12, family_relationship: org)
    family2.family_memberships.create(organization: org13, family_relationship: org)
    family2.family_memberships.create(organization: org14, family_relationship: org)
  end
#end

if Person.all.size == 0
  puts "...Seeding persons"

  person1 = Person.find_or_create_by(id:1699192, source_id:'33303',
                                     source_context: ctep,
                                     source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                     fname:'Ajeet', lname:'Gajra', prefix:'Dr.', suffix:'', email:'gajraa@upstate.edu', phone:'315-425-2707')

  person2 = Person.find_or_create_by(id:7857011, source_id:'518786',
                                     source_context: ctrp,
                                     source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                     fname:'Alicia', lname:'Kunin-Batson', prefix:'Dr.', suffix:'', email:'kunin003@umn.edu', phone:'612-624-6931')

  person3 = Person.find_or_create_by(id:3567738, source_id:'515762',
                                     source_context: ctep,
                                     source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                     fname:'Amy', mname:'M.', lname:'Linabery', prefix:'Ms.', suffix:'', email:'devr0053@umn.edu', phone:'612-624-0146')

  person4 = Person.find_or_create_by(id:2944806, source_id:'41379',
                                     source_context: ctrp,
                                     source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                     fname:'Amy', mname:'L.', lname:'Jonson', prefix:'Dr.', suffix:'', email:'jonso001@umn.edu', phone:'612-624-2620')

  person5 = Person.find_or_create_by(id:1832268, source_id:'34482',
                                     source_context: ctep,
                                     source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                     fname:'Badrinath', mname:'R.', lname:'Konety', prefix:'Dr.', suffix:'', email:'brkonety@umn.edu', phone:'612-624-2620')

  person6 = Person.find_or_create_by(id:10161459, source_id:'46120',
                                     source_context: ctrp,
                                     source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                     fname:'Christine', lname:'Holmberg', prefix:'Dr.', suffix:'', email:'christine.holmberg@charite.de', phone:'-1152')

  person7 = Person.find_or_create_by(id:366649, source_id:'11640',
                                     source_context: ctep,
                                     source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                     fname:'Christopher', mname:'Yancey', lname:'Thomas', prefix:'Dr.', suffix:'', email:'cythomas@wakehealth.edu', phone:'434-243-6143', registration_type: 'Investigator')

  person8 = Person.find_or_create_by(id:2026171, source_id:'35504',
                                     source_context: ctrp,
                                     source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                     fname:'Daniel', mname:'Evan', lname:'Epner', prefix:'Dr.', suffix:'', email:'depner@mdanderson.org', phone:'713-792-3245', processing_status: 'Complete')

  Person.find_or_create_by(source_id:'AB123',
                           source_context: ctep,
                           source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                           fname:'Daniel', mname:'Evan', lname:'Epner', prefix:'Dr.', suffix:'', email:'depner@ctep', phone:'123-456-7890', ctrp_id: person8.id, service_request_id: 1, processing_status: 'Incomplete', registration_type: 'Investigator', association_start_date: Time.now)

  # Person.find_or_create_by(source_id:'098',
  #                          source_context: SourceContext.find_by_code('NLM'),
  #                          source_status: SourceStatus.find_by_code_and_source_context_id('ACT', nlm.id),
  #                          fname:'Daniel', mname:'Evan', lname:'Epner', prefix:'Dr.', suffix:'', email:'depner@nlm', phone:'098-765-4321', ctrp_id: person8.id)

  person9 = Person.find_or_create_by(id:672434, source_id:'19844',
                                     source_context: ctep,
                                     source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctep.id),
                                     fname:'David', mname:'Marc', lname:'Peereboom', prefix:'Dr.', suffix:'', email:'peerebd@ccf.org', phone:'866-223-8100', service_request_id: 1, registration_type: 'Investigator')

  person10 = Person.find_or_create_by(id:1426655, source_id:'15179',
                                      source_context: ctrp,
                                      source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                      fname:'Gisele', lname:'Sarosy', prefix:'Dr.', suffix:'', email:'gsarosy@mail.nih.gov', phone:'800-411-1222')

  person11 = Person.find_or_create_by(id:28417522, source_id:'15178',
                                      source_context: ctrp,
                                      source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                      fname:'Rachel', lname:'Nusbaum', prefix:'Dr.', suffix:'', email:'rhm23@georgetown.edu', phone:'800-555-1244')

  person12 = Person.find_or_create_by(id:1950481, source_id:'15177',
                                      source_context: ctrp,
                                      source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                      fname:'Alessandra', lname:'Ferrajol', prefix:'Dr.', suffix:'', email:'aferrajo@mdanderson.org', phone:'800-111-1244')

  person13 = Person.find_or_create_by(id:28186245, source_id:'15176',
                                      source_context: ctrp,
                                      source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                      fname:'Kristi', lname:'Graves', prefix:'Dr.', suffix:'', email:'kdg9@georgetown.edu', phone:'800-777-1244')

  person14 = Person.find_or_create_by(id:3561594, source_id:'15175',
                                      source_context: ctrp,
                                      source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                      fname:'Diane', lname:'Roulston', prefix:'Dr.', suffix:'', email:'droulstn@umich.edu', phone:'800-777-1244')

  person15 = Person.find_or_create_by(id:1500960, source_id:'15180',
                                      source_context: ctrp,
                                      source_status: SourceStatus.find_by_code_and_source_context_id('ACT', ctrp.id),
                                      fname:'James', lname:'Lee', prefix:'Mr.', suffix:'', email:'jal2024@med.cornell.edu', phone:'800-777-1244')


  PoAffiliationStatus.find_or_create_by(name: 'Active', code: 'ACTIVE')
  PoAffiliationStatus.find_or_create_by(name: 'Inactive', code: 'INACTIVE')
end
##Families
family1 = Family.find_or_create_by(name: 'Albert Einstein Cancer Center',family_status_id:1,family_type_id:1)#Cancer Center
family2 = Family.find_or_create_by(name: 'Arizona Cancer Center',family_status_id:1,family_type_id:1)#Cancer Center
family3 = Family.find_or_create_by(name: 'David H. Koch Institute for Integrative Cancer Research at MIT',family_status_id:1,family_type_id:4) #Research Center
family4 = Family.find_or_create_by(name: 'NCI Center for Cancer Research (CCR)',family_status_id:1,family_type_id:3) #NIH
family5 = Family.find_or_create_by(name: 'NRG Oncology',family_status_id:1,family_type_id:2)#NCTN
family6 = Family.find_or_create_by(name: 'Yale Cancer Center',family_status_id:2,family_type_id:1)#Cancer Center

