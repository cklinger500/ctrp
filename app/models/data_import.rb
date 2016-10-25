require 'rubygems'
require 'roo'

class DataImport

  def self.delete_trial_data
    ParticipatingSite.delete_all
    TrialStatusWrapper.delete_all
    MilestoneWrapper.delete_all
    Submission.delete_all
    ProcessingStatusWrapper.delete_all
    OtherId.delete_all
    OversightAuthority.delete_all
    IndIde.delete_all
    Trial.delete_all
  end

  def self.import_trials
    begin
      total_organizations  = Organization.all.size
      total_persons  = Person.all.size
      trial_spreadsheet = Roo::Excel.new(Rails.root.join('db', 'ctrp-dw-trials-random-2014.xls'))
      start_lead_protocol_post_fix = 1776
      trial_spreadsheet.default_sheet = trial_spreadsheet.sheets.first
      ((trial_spreadsheet.first_row+1)..trial_spreadsheet.last_row).each do |row|
        trial = Trial.new
        trial.official_title = trial_spreadsheet.cell(row,'BP')
        nci_id = trial_spreadsheet.cell(row,'BL')
        trial_db_exists = Trial.find_by_nci_id(nci_id)
        if trial_db_exists
          next
        end
        trial.nci_id = nci_id
        trial.phase = Phase.find_by_name(trial_spreadsheet.cell(row,'BS'))
        primary_purpose = trial_spreadsheet.cell(row,'BY')
        unless primary_purpose.blank?
          primary_purpose.gsub! "_", " "
          trial.primary_purpose = PrimaryPurpose.where("lower(name) = ?", primary_purpose.downcase).first
        end
        secondary_purpose = trial_spreadsheet.cell(row,'BZ')
        unless secondary_purpose.blank?
          trial.secondary_purpose = SecondaryPurpose.where("lower(name) = ?", secondary_purpose.downcase).first
        end
=begin
        research_category = trial_spreadsheet.cell(row,'DO')
        unless research_category.blank?
          research_category.gsub! "_", " "
          trial.research_category = ResearchCategory.where("lower(name) = ?", research_category.downcase).first
        end
=end
        study_source = trial_spreadsheet.cell(row,'CZ')
        unless study_source.blank?
          study_source.gsub! "_", " "
          study_source = "EXTERNALLY PEER-REVIEWED" if study_source == "EXTERNALLY PEER REVIEWED"
          trial.study_source = StudySource.where("lower(name) = ?", study_source.downcase).first
        end
        current_trail_status = trial_spreadsheet.cell(row,'T')
        current_trail_status_date = trial_spreadsheet.cell(row,'U')
        unless current_trail_status.blank?
          trial_status = TrialStatus.where("lower(name) = ?", current_trail_status.downcase).first
          tsw = TrialStatusWrapper.new
          tsw.trial = trial
          tsw.trial_status = trial_status
          tsw.status_date = current_trail_status_date
          trial.trial_status_wrappers << tsw
        end
        processing_status = trial_spreadsheet.cell(row,'CC')
        processing_status_date = trial_spreadsheet.cell(row,'CD')
        unless processing_status.blank?
          processing_status = ProcessingStatus.where("lower(name) = ?", processing_status.downcase).first
          #puts "processing_status = #{processing_status.inspect}"
          psw = ProcessingStatusWrapper.new
          psw.trial = trial
          psw.processing_status = processing_status
          #psw.status_date = processing_status_date
          psw.status_date = Time.now
          trial.processing_status_wrappers << psw
        end
        rc= trial_spreadsheet.cell(row,'DO')
        if rc.present?
          research_category = ResearchCategory.where("lower(name) = ?", rc.downcase).first
          trial.research_category = research_category if research_category.present?
        end
        #other_ids
        ctep_id = trial_spreadsheet.cell(row,'R')
        if ctep_id.present?
          other_id_record = OtherId.new
          other_id_record.protocol_id = ctep_id
          other_id_record.protocol_id_origin = ProtocolIdOrigin.find_by_code("CTEP")
          other_id_record.trial = trial
          trial.other_ids << other_id_record
        end
        dcp_id = trial_spreadsheet.cell(row,'Y')
        if dcp_id.present?
          other_id_record = OtherId.new
          other_id_record.protocol_id = dcp_id
          other_id_record.protocol_id_origin = ProtocolIdOrigin.find_by_code("DCP")
          other_id_record.trial = trial
          trial.other_ids << other_id_record
        end
        ccr_id = trial_spreadsheet.cell(row,'DS')
        if ccr_id.present?
          other_id_record = OtherId.new
          other_id_record.protocol_id = ccr_id
          other_id_record.protocol_id_origin = ProtocolIdOrigin.find_by_code("CCR")
          other_id_record.trial = trial
          trial.other_ids << other_id_record
        end
        nct_id = trial_spreadsheet.cell(row,'BM')
        if nct_id.present?
          other_id_record = OtherId.new
          other_id_record.protocol_id = nct_id
          other_id_record.protocol_id_origin = ProtocolIdOrigin.find_by_code("NCT")
          other_id_record.trial = trial
          trial.other_ids << other_id_record
        end
        #Regulatory information
        trial.intervention_indicator = trial_spreadsheet.cell(row,'AM') == "YES" ? "Yes" : "No"
        trial.sec801_indicator = trial_spreadsheet.cell(row,'CN') == "YES" ? "Yes" : "No"
        trial.data_monitor_indicator = trial_spreadsheet.cell(row,'V') == "YES" ? "Yes" : "No"
        # Sponsor
        trial.sponsor = Organization.all[rand(0..total_organizations-1)]
        # Internal Source
        trial.internal_source = InternalSource.all[rand(0..(InternalSource.all.size-1))]

        # Is Rejected trial? No
        #trial.is_rejected = false
        trial_rejected = trial_spreadsheet.cell(row,'DT')
        trial.is_rejected = trial_rejected
        puts "trial is_rejected: #{trial.is_rejected}"
#        puts "trial is_rejected: #{trial.is_rejected.to_s}"

        #if trial_spreadsheet.cell(row,'DT').present? && (trial_spreadsheet.cell(row,'DT').to_s == 'true' || trial_spreadsheet.cell(row,'DT') == true || trial_spreadsheet.cell(row,'DT').to_s == 't')
        sub_status = trial.is_rejected ? 'Rejected' : 'Active'
    #    puts "sub_status: #{sub_status}"

        #Responsible party
        #resp_party = trial_spreadsheet.cell(row,'CJ')
        #responsible_party = ResponsibleParty.find_by_code(resp_party)
        # if resp_party.present? && responsible_party.blank?
        #  puts "missed resonsible party = #{resp_party} "
        #else
        #  trial.responsible_party = responsible_party
        #end

        trial.ind_ide_question = "Yes"
        trial.pilot = "Yes"

        # randomly assign the rest of the data
        trial.lead_protocol_id = "CTRP_01_" + start_lead_protocol_post_fix.to_s
        start_lead_protocol_post_fix = start_lead_protocol_post_fix + 1
        trial.lead_org = Organization.all[rand(0..total_organizations-1)]
        trial.pi = Person.all[rand(0..total_persons-1)]
        trial.investigator = Person.all[rand(0..total_persons-1)]

        # Randomly assign a owner
        trial_submitters = [User.find_by_username("ctrptrialsubmitter"),
                            User.find_by_username("ctrptrialsubmitter2"),
                            User.find_by_username("ctrptrialsubmitter3")]
        trial_owner = TrialOwnership.new
        trial_owner.trial = trial
        trial_owner.user = trial_submitters[rand(0..2)]
        trial.trial_ownerships << trial_owner

        #Assign random collaborators
        c1 = Collaborator.new
        c1.organization = Organization.all[rand(0..total_organizations-1)]
        c1.org_name = c1.organization.name
        c2 = Collaborator.new
        c2.organization = Organization.all[rand(0..total_organizations-1)]
        c2.org_name = c2.organization.name
        trial.collaborators << c1
        trial.collaborators << c2

        #Assign Random Anatomic sites
        a1 = AnatomicSiteWrapper.new
        a1.anatomic_site = AnatomicSite.all[rand(0..AnatomicSite.all.size-1)]
        a1.trial = trial
        trial.anatomic_site_wrappers << a1
        a2 = AnatomicSiteWrapper.new
        a2.anatomic_site = AnatomicSite.all[rand(0..AnatomicSite.all.size-1)]
        a2.trial = trial
        trial.anatomic_site_wrappers << a2

        # Assign Interventions and Arm Groups
        arm1 = ArmsGroup.new
        i1 = Intervention.new
        i1.name = "CBP/beta-catenin Antagonist PRI-724"
        i1.description = "Given IV"
       # arm1.intervention_text= i1.name
        trial.interventions << i1
        arm1.label = "Arm I (PRI-724, mFOLFOX6/bevacizumab)"
        arm1.trial = trial
        arm1.description = "Patients receive CBP/beta-catenin antagonist PRI-724 IV continuously on days 1-7, bevacizumab IV over 30 minutes"
        i2 = Intervention.new
        arm2 = ArmsGroup.new
        i2.name = "Bevacizumab"
        i2.description = "Correlative studies"
        #arm2.intervention_text = i2.name
        trial.interventions << i2
        arm2.label = "Arm II (mFOLFOX6/bevacizumab)"
        arm2.description = "Patients receive bevacizumab, leucovorin calcium, oxaliplatin, and fluorouracil as in Arm I. Courses repeat every 14 days in the absence of disease progression or unacceptable toxicity."
        arm2.trial = trial
        trial.arms_groups << arm1
        trial.arms_groups << arm2

        # Submissions

#        sub = Submission.new(submission_num: 1, submission_date: Date.today, user: trial.users[0], submission_type: SubmissionType.find_by_code('ORI'), submission_source: SubmissionSource.find_by_code('CCT'), submission_method: SubmissionMethod.find_by_code('REG'),status: trial.is_rejected ? 'Rejected' : 'Active')
        sub = Submission.new(submission_num: 1, status: sub_status, acknowledge_comment: 'test', submission_date: Date.today, user: trial.users[0], submission_type: SubmissionType.find_by_code('ORI'), submission_source: SubmissionSource.find_by_code('CCT'), submission_method: SubmissionMethod.find_by_code('REG'))
        trial.submissions << sub

        # Processing status
        pro_status = ProcessingStatusWrapper.new(status_date: Date.today, processing_status: ProcessingStatus.find_by_code('SUB'), submission: sub)
        trial.processing_status_wrappers << pro_status

        # Randomely Assign User statuses
        #User.all.each do |u|
        #  u.user_status = UserStatus.all[rand(0..UserStatus.all.size-1)]
        #  u.save!
        #end
        #save Trial
        trial.edit_type = 'seed'
        trial.save!
      end
    rescue Exception => e
      puts "Exception thrown while reading Trial spreadsheet #{e.inspect}"
    end
    # Massaging data for PAA F02, Scenario 7
    t = Trial.first
    t.sponsor = Organization.find_by_name("National Cancer Institute")
    t.lead_org = Organization.find_by_name("NCI - Center for Cancer Research")
    org27 = Organization.find_or_create_by(name: 'John Hopkins')
    c3 = Collaborator.new
    c3.organization = org27
    c3.org_name = org27.name
    t.collaborators << c3
    t.edit_type = 'seed'
    t.save!

  end

  def self.import_milestones
    missed_milestones = []
    total_submission_types = SubmissionType.all.size
    total_submission_methods = SubmissionMethod.all.size
    total_submission_sources = SubmissionSource.all.size
    total_users = User.all.size
    spreadsheet = Roo::Excel.new(Rails.root.join('db', 'ctrp-dw-milestones_for_20_sample_trials_in_prod.xls'))
    spreadsheet.default_sheet = spreadsheet.sheets.first
    ((spreadsheet.first_row+1)..spreadsheet.last_row).each do |row|
      t = spreadsheet.cell(row,'A')
      trial = Trial.find_by_nci_id(t)
      unless trial.nil?
        submission_num = spreadsheet.cell(row,'E')
        current_submission = Submission.find_by_trial_id_and_submission_num(trial.id, submission_num)
        if current_submission.blank?
          current_submission = Submission.new
          current_submission.submission_num = submission_num
          current_submission.amendment_num = rand(1..20)
          current_submission.amendment_date = Time.now
          current_submission.submission_type = SubmissionType.all[rand(0..total_submission_types-1)]
          current_submission.submission_method = SubmissionMethod.all[rand(0..total_submission_methods-1)]
          current_submission.submission_source = SubmissionSource.all[rand(0..total_submission_sources-1)]
          current_submission.user = User.all[rand(0..total_users-1)]
          trial.submissions << current_submission
          trial.edit_type = 'seed'
          trial.save!
        end
        current_milestone = spreadsheet.cell(row,'B')
        unless current_milestone.nil?
          milestone = Milestone.where("lower(name) = ?", current_milestone.downcase).first
          if milestone.nil?
            missed_milestones << current_milestone
            next
          end
          cmw = MilestoneWrapper.new
          cmw.trial = trial
          cmw.milestone = milestone
          cmw.submission = current_submission
          trial.milestone_wrappers << cmw
          trial.edit_type = 'seed'
          trial.save!
        end
      end
    end
    puts "List of missed milestones = #{missed_milestones.uniq.inspect}" if missed_milestones.count() > 0
  end

  def self.import_participating_sites
    spreadsheet = Roo::Excel.new(Rails.root.join('db', 'participating_sites_for_20_sample_trials_in_prod.xls'))
    spreadsheet.default_sheet = spreadsheet.sheets.first
    ((spreadsheet.first_row+1)..spreadsheet.last_row).each do |row|
      ps = ParticipatingSite.new
      ps.contact_email = spreadsheet.cell(row,'A')
      ps.contact_name = spreadsheet.cell(row,'B')
      ps.contact_phone = spreadsheet.cell(row,'C')
      ps.program_code = spreadsheet.cell(row,'M')
      t = spreadsheet.cell(row,'F')
      #puts "t = #{t.inspect}"
      trial = Trial.find_by_nci_id(t)
      if t.nil? || trial.nil?
        next
      end
      ps.trial = trial
      # Site recruitment data
      srs = SiteRecStatusWrapper.new
      srs.participating_site = ps
      site_recruitment_status = spreadsheet.cell(row,'I')
      #puts "site_recruitment_status = #{site_recruitment_status.inspect}"
      site_recruitment_status.gsub! "_", " "
      #puts "site_recruitment_status = #{site_recruitment_status.inspect}"
      x = SiteRecruitmentStatus.where("lower(name) = ?", site_recruitment_status.downcase).first
      #puts "x = #{x.inspect}"
      srs.site_recruitment_status = x || SiteRecruitmentStatus.all[rand(0..(SiteRecruitmentStatus.all.size-1))]
      srs.status_date =  spreadsheet.cell(row,'J')
      ps.site_rec_status_wrappers <<  srs
      #Organization and Person
      ps.organization =  Organization.all[rand(0..(Organization.all.size-1))]
      #ps.person = Person.all[rand(0..(Person.all.size-1))]
      #ps.contact_name = ps.person.fname + " " + ps.person.lname;
      #ps.contact_type = "PI";
      #ps.contact_email = ps.person.email;
      #ps.contact_phone = ps.person.phone;
      #psi = ParticipatingSiteInvestigator.new
      #psi.person = ps.person;
      #psi.investigator_type = "Principal Investigator"
      #psi.set_as_contact = false;
      #ps.participating_site_investigators << psi

      #psi2 = ParticipatingSiteInvestigator.new
      #psi2.person = Person.all[rand(0..(Person.all.size-1))]
      #psi2.investigator_type = "Principal Investigator"
      #psi2.set_as_contact = false

      #ps.participating_site_investigators << psi2
      trial.participating_sites << ps
      trial.edit_type = 'seed'
      trial.save!
    end
  end

  def self.import_ctep_org_types
    spreadsheet = Roo::Excel.new(Rails.root.join('db', 'ctep_org_types.xls'))
    spreadsheet.default_sheet = spreadsheet.sheets.first
    ((spreadsheet.first_row+1)..spreadsheet.last_row).each do |row|
       code = spreadsheet.cell(row,'A')
       name = spreadsheet.cell(row,'B')
       sent_to_ctrp = spreadsheet.cell(row,'C')

          org = CtepOrgType.new
          org.code = code
          org.name = name
          org.sent_to_ctrp = sent_to_ctrp
          org.record_status = "Active"
          org.save!
        end
  end

  def self.import_org_funding_mechanisms
    spreadsheet = Roo::Excel.new(Rails.root.join('db', 'org_funding_mechanisms.xls'))
    spreadsheet.default_sheet = spreadsheet.sheets.first
    ((spreadsheet.first_row+1)..spreadsheet.last_row).each do |row|
      code = spreadsheet.cell(row,'A')
      name = spreadsheet.cell(row,'B')

      fm = OrgFundingMechanism.new
      fm.code = code
      fm.name = name
      fm.record_status = "Active"
      fm.save!
    end
  end


end

