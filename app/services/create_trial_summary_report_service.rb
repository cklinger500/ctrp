
class CreateTrialSummaryReportService

  NO_DATA_AVAILABLE     =   "No Data Available";

  def initialize(params)
    @trial_id = params[:trial_id]
    @store_file_on_server = params[:store_file_on_server]
    @trial = Trial.find_by_id(@trial_id)

    Hash h = Hash.new
    h1 = {
        'trail_type' => {'required' => true, 'not_displayed_when_no_data' => true},
        'trail_type1' => {'required' => true, 'not_displayed_when_no_data' => true},
    }

  end


  def generate_tsr_in_rtf
    #Fonts
    fonts = [RTF::Font.new(RTF::Font::ROMAN, 'Times New Roman'),
             RTF::Font.new(RTF::Font::MODERN, 'Courier')]

      #Colours
    @foreground_th_text_color        =     RTF::Colour.new(138,21,21)
    @green                           =     RTF::Colour.new(0,255,0)
    @grey       =                          RTF::Colour.new(210,210,210)
    @light_red  =                          RTF::Colour.new(255,175,175)
    @red_shade  =                          RTF::Colour.new(180,0,0)
    @white  =                              RTF::Colour.new(255,255,255)


    #Styles
    @styles = {}
    @styles['PS_HEADING']              = RTF::ParagraphStyle.new
    @styles['PS_NORMAL']               = RTF::ParagraphStyle.new
    @styles['PS_NORMAL'].justification = RTF::ParagraphStyle::FULL_JUSTIFY
    @styles['PS_INDENTED']             = RTF::ParagraphStyle.new
    @styles['PS_INDENTED'].left_indent = 300
    @styles['PS_TITLE']                = RTF::ParagraphStyle.new
    @styles['PS_TITLE'].space_before   = 100
    @styles['PS_TITLE'].space_after    = 200
    @styles['CS_HEADING']              = RTF::CharacterStyle.new
    @styles['CS_HEADING'].bold         = true
    @styles['CS_HEADING'].font_size    = 36
    @styles['CS_CODE']                 = RTF::CharacterStyle.new
    @styles['CS_CODE'].font            = fonts[1]
    @styles['CS_CODE'].font_size       = 16

    style1 = RTF::CharacterStyle.new
    style1.font = RTF::Font.new(RTF::Font::MODERN, 'Calibri')
    style1.foreground =@foreground_th_text_color
    style1.underline = true

     style     = RTF::DocumentStyle.new
     style.paper = RTF::Paper::A4
     style.left_margin =3000
     style.right_margin =3000
     style.bottom_margin =3000
     style.top_margin = 3000


  @document = RTF::Document.new(RTF::Font.new(RTF::Font::MODERN, 'Helvetica'))


    ###### TSR Report start #######################
    ###############################################
    ###############################################




    @document.paragraph(@styles['PS_NORMAL']) do |p2|
      today_date = Date.today()
      @trial.verification_date.nil? ? verification_date="" : verification_date = @trial.verification_date.strftime("%d-%h-%Y").to_s

      p2.foreground(@foreground_th_text_color) << 'Trial Summary Report'
      p2.line_break()
      p2 << 'Date: '+ today_date.strftime("%d-%h-%Y").to_s
      p2.line_break()
      p2  << 'Record Verification Date:' + verification_date
      p2.line_break()
    end




    line_break   = @document.table(1, 1) 
    generate_trial_title_table
    line_break   = @document.table(1, 1) 
    generate_trial_identification_table
    line_break   = @document.table(1, 1) 
    generate_general_trial_details
    line_break   = @document.table(1, 1)

    generate_grants_table
    line_break   = @document.table(1, 1)

    generate_summary_4_information_table
    line_break   = @document.table(1, 1) 
    generate_regulatory_information_table
    line_break   = @document.table(1, 1) 
    trial_design_table
    line_break   = @document.table(1, 1) 

    generate_trial_description_table
    line_break   = @document.table(1, 1) 

    generate_interventions_table
    line_break   = @document.table(1, 1) 

    generate_arm_groups_table
    line_break   = @document.table(1, 1) 

    generate_eligibility_criteria_table
    line_break   = @document.table(1, 1) 

    #disease condition
    generate_disease_condition_table
    line_break   = @document.table(1, 1) 

    #outcome measures
    #generate_outcome_measures_table
    outcome_measure_type_id = OutcomeMeasureType.find_by_code("PRI").id
    generate_outcome_measures_table(outcome_measure_type_id,"Primary Outcome Measures")
    line_break   = @document.table(1, 1) 

    outcome_measure_type_id = OutcomeMeasureType.find_by_code("SEC").id
    generate_outcome_measures_table(outcome_measure_type_id,"Secondary Outcome Measures")
    line_break   = @document.table(1, 1) 

    #subgroups
    generate_sub_groups_table
    line_break   = @document.table(1, 1) 

    #markers
    generate_markers_table
    line_break   = @document.table(1, 1) 

    #Participating Sites
    generate_participating_sites_table
    line_break   = @document.table(1, 1) 

    line_break   = @document.table(1, 1) 

      #And the file name will be "TSR_""CTRP Trial ID""_""Current Date YYYY-MM-DD""-
    # "Current Time HHMM(24hr)""_""Current Submission Type (O for original and A for amendment""_""Amendment Number (for amendments)"<examples>

    temp_file = Tempfile.new(['rtf_temp_file',".rtf"])
    temp_file << @document.to_rtf
    file_name = get_rtf_file_name

    if @store_file_on_server
          trial_document_params = {:file => temp_file, :document_type =>"TSR", :file_name => file_name,:trial_id => @trial_id}
          td = TrialDocument.new(trial_document_params)
          td.save!
     else
          return temp_file
     end

  end

  def get_rtf_file_name
    today_date = Date.today()
    time = Time.now

    @trial.nci_id.nil? ? nci_id = "N/A" : nci_id = @trial.nci_id
    file_name = "TSR_" + nci_id + "_" + time.strftime("%d-%h-%Y").to_s+ "-" + time.strftime("%H %M").to_s
    cur_submission = @trial.submissions.last
    cur_submission.nil? ? cur_submission_type=nil : cur_submission_type = cur_submission.submission_type
    if !cur_submission_type.nil?
      if cur_submission_type.name == "Amendment"
        amendment_number = cur_submission.amendment_num
        file_name = file_name + "_" + "A" + "_"+ amendment_number.to_s
      elsif cur_submission_type.name == "Original"
        file_name = file_name + "_" + "O"
      end
    end

    file_name = file_name + ".rtf"
    return file_name
  end




    def create_a_table_row(shading_color, forground_color,text)
      array1 =@document.table(1,1,8000)
      array1.border_width =10
      array1[0].shading_colour = shading_color if shading_color
      forground_color.nil? ? array1[0][0] << text : array1[0][0].foreground(forground_color) << text

    end

  def create_a_table_row_node(table,text)
    array =@document.table(1,1,8000)
    array.border_width =10
    array[0][0] << text
  end

  def generate_trial_title_table
    num_of_rows=2
    if @trial.acronym
      num_of_rows = num_of_rows + 2
    end

    if @trial.keywords
     num_of_rows = num_of_rows + 2
    end

    array =@document.table(num_of_rows, 1,8000)
    i=0;
    array.border_width =10
    array[i].shading_colour = @grey
    array[i][0].foreground(@foreground_th_text_color) << "Official Title"
    i = i+1

    official_title = ""
    official_title = @trial.official_title if @trial.official_title
    array[i][0] << official_title
    i = i+1


    if @trial.acronym
        array[i][0].foreground(@foreground_th_text_color) << "Acronym"
        array[i].shading_colour = @light_red
        i = i+1
        acronym = @trial.acronym
        array[i][0] << acronym
        i = i+1

    end

    if @trial.keywords
      array[i][0].foreground(@foreground_th_text_color) << "Keywords"
      array[i].shading_colour = @light_red
      i = i+1
      array[i][0] << @trial.keywords
    end

  end

  def get_value_based_on_display_rule(field,rule)
      if rule == "Required"
        field.nil? ? field = NO_DATA_AVAILABLE : field = field
      end
      return field
  end


  def generate_trial_identification_table
    create_a_table_row(@grey,@foreground_th_text_color,"Trial Identification")
    #@trial_identification_table = RTF::TableNode.new(nil, 3, 3, 3000, 2000,2000)
    other_ids = @trial.other_ids.reorder(:protocol_id)
    other_ids_num =0

    other_ids_num = other_ids.size if other_ids
    nct_code = ProtocolIdOrigin.find_by_code("NCT")
    other_ids1 = other_ids.pluck(:protocol_id_origin_id)

    if !other_ids1.include?(nct_code.id)
      other_ids_num = other_ids_num + 1
    end

    amend_count = 0
    cur_submission = @trial.submissions.last
    cur_submission.nil? ? cur_submission_type=nil : cur_submission_type = cur_submission.submission_type
    if !cur_submission_type.nil?
      if cur_submission_type.name == "Amendment"
        amendment_number = cur_submission.amendment_num
        amendment_date  = cur_submission.amendment_date
        amend_count = 2
      end
    end

    array =@document.table(2+other_ids_num+amend_count, 2,4000,4000)
    array.border_width =10

    Hash h = Hash.new
    h.store("NCI Trial Identifier",get_value_based_on_display_rule(@trial.nci_id,"Required"))
    h.store("Lead Organization Identifier",get_value_based_on_display_rule(@trial.lead_protocol_id,"Required"))

    i=0
    h.each do |k,v|
      array[i][0] << k
      array[i][1] << v
      i=i+1
    end

    array[i][0] << nct_code.name
    if other_ids1.include?(nct_code.id)
      array[i][1] << other_ids.find_by_protocol_id_origin_id_and_trial_id(nct_code.id,@trial.id).protocol_id.to_s
    else
      array[i][1] << NO_DATA_AVAILABLE
    end
    i = i +1

    other_ids.each do |oid|
      pid = ProtocolIdOrigin.find_by_id(oid.protocol_id_origin_id)
      if oid.protocol_id_origin_id != nct_code.id
        array[i][1] << oid.protocol_id.to_s
        array[i][0] << pid.name
        i=i+1
      end
    end

    if amend_count > 0
      array[i][0] << "Amendment Number"
      array[i][1] << amendment_number.to_s
      i = i + 1
      array[i][0] << "Amendment Date"
      array[i][1] << amendment_date.strftime("%d-%h-%Y").to_s
    end

  end

  def generate_general_trial_details

    create_a_table_row(@grey,@foreground_th_text_color,"General Trial Details")
    create_a_table_row(@light_red,@foreground_th_text_color,"General Details")




    Hash h = Hash.new
    @trial.research_category_id.nil? ? trial_type = NO_DATA_AVAILABLE : trial_type = ResearchCategory.find_by_id(@trial.research_category_id).name
    @trial.lead_org_id.nil? ? lead_org = NO_DATA_AVAILABLE : lead_org = Organization.find_by_id(@trial.lead_org_id).name
    @trial.sponsor_id.nil? ? sponsor = NO_DATA_AVAILABLE : sponsor = Organization.find_by_id(@trial.sponsor_id).name
    @trial.responsible_party_id.nil? ? responsible_party=NO_DATA_AVAILABLE : responsible_party = ResponsibleParty.find_by_id(@trial.responsible_party_id).name
    h.store("Trial Type",trial_type)
    h.store("Lead Organization",lead_org)
    h.store("Sponsor",sponsor)
    h.store("Responsible Party", responsible_party)
    count = 0



    @trial.investigator_id.nil? ? investigator = nil : investigator = Person.find_by_id(@trial.investigator_id)
    @trial.investigator_aff_id.nil? ? investigator_affiliation = NO_DATA_AVAILABLE : investigator_affiliation = Organization.find_by_id(@trial.investigator_aff_id).name
    @trial.pi_id.nil? ? principle_investigator = nil : principle_investigator = Person.find_by_id(@trial.pi_id)
   # principle_investigator.nil? ? principle_investigator = nil : principle_investigator = principle_investigator.fname + " " + principle_investigator.mname + " " + principle_investigator.lname
   # investigator.nil? ? investigator = nil : investigator = investigator.fname + " " + investigator.mname + " " + investigator.lname

    if principle_investigator.nil?
      principle_investigator_name = NO_DATA_AVAILABLE
    else
      principle_investigator_name = principle_investigator.fname if principle_investigator.fname
      principle_investigator_name = principle_investigator_name + " " + principle_investigator.mname if principle_investigator.mname
      principle_investigator_name = principle_investigator_name + " " + principle_investigator.lname if principle_investigator.lname
    end


    if investigator.nil?
      investigator_name = NO_DATA_AVAILABLE
    else
      investigator_name = investigator.fname if investigator.fname
      investigator_name = investigator_name + " " + investigator.mname if investigator.mname
      investigator_name = investigator_name + " " + investigator.lname if investigator.lname
    end

    if responsible_party == "Sponsor"
      count = 1
      h.store("   Investigator", investigator_name)
    else
      count = 2
      h.store("   Investigator Title", @trial.investigator_title)
      h.store("   Investigator Affiliation", investigator_affiliation)
    end

    h.store("Principal Investigator",principle_investigator_name )
    h.store("Affiliation", "")

    array = @document.table(7+count, 2,4000,4000)
    array.border_width =10
    i=0
    h.each do |k,v|
      array[i][0] << k
      array[i][1] << v
      i = i+1
    end

    collaborators = @trial.collaborators
    #Only display when collabarators are there
    if collaborators
        collaborators_num = 0
        collaborators_num = collaborators.size if collaborators
        if collaborators_num != 0
              create_a_table_row(@light_red,@foreground_th_text_color,"Collaborators")
              create_a_table_row(@grey,@foreground_th_text_color,"Name")
              array =@document.table(collaborators_num, 1,8000)
              array.border_width =10
              i = 0
              collaborators.each do |col|
                array[i][0] << col.org_name
                i= i+1
              end
        end
    end

    create_a_table_row(@light_red,@foreground_th_text_color,"Status/Dates")
    Hash h = Hash.new

    @trial.trial_status_wrappers.present? ? cur_trial_status = @trial.trial_status_wrappers.last.trial_status.name : cur_trial_status = nil
    @trial.trial_status_wrappers.present? ? cur_trial_status_date = @trial.trial_status_wrappers.last.status_date : cur_trial_status_date = nil
    !cur_trial_status_date.nil? ? cur_trial_status = cur_trial_status + " as of " + cur_trial_status_date.strftime("%d-%h-%Y").to_s : cur_trial_status = NO_DATA_AVAILABLE

    start_date = get_value_based_on_display_rule(@trial.start_date,"Required")
    @trial.start_date.nil? ? start_date = NO_DATA_AVAILABLE : start_date = @trial.start_date.strftime("%d-%h-%Y").to_s
    @trial.start_date_qual.nil? ? start_date_qual= "Trial Start Date" : start_date_qual = "Trial Start Date" +  " - " + @trial.start_date_qual

    @trial.primary_comp_date.nil? ? primary_comp_date = NO_DATA_AVAILABLE : primary_comp_date = @trial.primary_comp_date.strftime("%d-%h-%Y").to_s

    @trial.primary_comp_date_qual.nil? ? primary_comp_date_qual= "Primary Completion Date" : primary_comp_date_qual = "Primary Completion Date" +  " - " + @trial.primary_comp_date_qual

    comp_date = @trial.comp_date
    @trial.comp_date_qual.nil? ? comp_date_qual= "Trial Completion Date" : comp_date_qual = "Trial Completion Date" +  " - " + @trial.comp_date_qual



    h.store("Current Trial Status", cur_trial_status)
    h.store(start_date_qual,start_date.to_s)
    h.store(primary_comp_date_qual,primary_comp_date.to_s)
    h.store(comp_date_qual,comp_date.strftime("%d-%h-%Y").to_s) if comp_date

    array =@document.table(4, 2,4000,4000) if comp_date
    array =@document.table(3, 2,4000,4000) if !comp_date

    array.border_width =10

    i =0
    h.each do |k,v|
      array[i][0] << k
      array[i][1] << v
      i = i+1
    end

  end

  def generate_grants_table
    create_a_table_row(@light_red,@foreground_th_text_color,"NIH Grants")

    array =@document.table(1,4,2000,2000,2000,2000)
    array.border_width =10
    array[0].shading_colour = @grey
    array[0][0] << "Funding Mechanism"
    array[0][1] << "NIH Institution Code"
    array[0][2] << "Serial Number"
    array[0][3] << "NCI Division/Program Code"


    grants = @trial.grants
    grants_num = 0
    grants_num = grants.size if grants
    array =@document.table(grants_num, 4,2000,2000,2000,2000)
    array.border_width =10
    i = 0
    grant_question = @trial.grant_question
    if grant_question == "Yes"
      is_required = "Required"
    else
      is_required = "NotRequired"
    end
    grants.each do |col|
      array[i][0] << get_value_based_on_display_rule(col.funding_mechanism,is_required)
      array[i][1] <<  get_value_based_on_display_rule(col.institute_code,is_required)
      array[i][2] << get_value_based_on_display_rule(col.serial_number,is_required)
      array[i][3] << get_value_based_on_display_rule(col.nci,is_required)
      i = i +1
    end

    if grants_num == 0
      create_a_table_row(@white,@foreground_th_text_color,"No Data Available")
    end
  end


  def generate_summary_4_information_table

    create_a_table_row(@grey,@foreground_th_text_color,"Summary 4 Information")

    Hash h = Hash.new
    @trial.study_source_id.nil? ? study_source = NO_DATA_AVAILABLE : study_source = StudySource.find_by_id(@trial.study_source_id).name
    h.store("Funding Category",study_source)
    array =@document.table(1, 2,4000,4000)
    array.border_width =10

    i=0
    h.each do |k,v|
      array[i][0] << k
      array[i][1] << v
      i = i+1
    end



    create_a_table_row(@light_red,@foreground_th_text_color,"Funding Sponsor/Source")
    funding_sources = @trial.trial_funding_sources

    funding_sources_num = 0
    funding_sources_num = funding_sources.size if funding_sources
    array =@document.table(funding_sources_num, 1,8000)
    array.border_width =10
    i = 0

    funding_sources.each do |col|
      org_name = Organization.find_by_id(col.organization_id).name
      array[i][0] << org_name
      i = i+1
    end

    if funding_sources_num == 0
      array =@document.table(1, 1,8000)
      array[0][0] << NO_DATA_AVAILABLE
      array.border_width =10
    end

    create_a_table_row(@light_red,@foreground_th_text_color,"Anatomic Site Code")

    anatomic_sites = @trial.anatomic_site_wrappers
    anatomic_sites_num = 0
    anatomic_sites_num = anatomic_sites.size if anatomic_sites
    array =@document.table(anatomic_sites_num, 1,8000)
    array.border_width =10
    i = 0


    anatomic_sites.each do |col|
      anatomic_site_name = AnatomicSite.find_by_id(col.anatomic_site_id).name
      array[i][0] << anatomic_site_name
      i = i +1
    end


    if anatomic_sites_num == 0
      array =@document.table(1, 1,8000)
      array[0][0] << NO_DATA_AVAILABLE
      array.border_width =10
    end

  end

  def generate_regulatory_information_table

          oversight_authorities =@trial.oversight_authorities
          create_a_table_row(@grey,@foreground_th_text_color,"Regulatory Information")
          create_a_table_row(@light_red, nil,"Oversight Authorities")

          array =@document.table(1, 2,4000,4000)
          array.border_width =10
          array[0][0] << "Country"
          array[0][1] << "Organization"


          oversight_authorities_num = 0
          oversight_authorities_num = oversight_authorities.size if oversight_authorities
          array =@document.table(oversight_authorities_num, 2,4000,4000)
          array.border_width =10
          i = 0

          oversight_authorities.each do |e|
            row = RTF::TableRowNode.new(@regulatory_info_table, 2)
            array[i][0] << e.country
            array[i][1] << e.organization
            i = i+1
          end

          if oversight_authorities_num == 0
            array =@document.table(1, 1,8000)
            array[0][0] << NO_DATA_AVAILABLE
            array.border_width =10
          end




          Hash h = Hash.new
          h.store("FDA Regulated Intervention?", get_value_based_on_display_rule(@trial.intervention_indicator,"Required"))
          h.store("Section 801?",get_value_based_on_display_rule(@trial.sec801_indicator,"Required"))
          h.store("DMC Appointed?",get_value_based_on_display_rule(@trial.data_monitor_indicator,"Required"))
          h.store("IND/IDE Study?",get_value_based_on_display_rule(@trial.ind_ide_question,"Required"))

          array =@document.table(4, 2,4000,4000)
          array.border_width =10
          i=0
          h.each do |k,v|
            array[i][0] << k
            array[i][1] << v
            i = i+1
          end

          array =@document.table(1,1,8000)
          array.border_width =10
          array[0].shading_colour = @light_red
          array[0][0] << "IND/IDE"

          array =@document.table(1,5,1600,1600,1600,1600,1600)
          array.border_width =10
          array[0].shading_colour = @grey
          array[0][0] << "Type"
          array[0][1] << "Grantor"
          array[0][2] << "Number"
          array[0][3] << "Holder Type"
          array[0][4] << "Holder"

          ind_ides = @trial.ind_ides
          ind_ides_num = 0
          ind_ides_num = ind_ides.size if ind_ides
          array =@document.table(ind_ides_num, 5,1600,1600,1600,1600,1600)
          array.border_width =10
          i = 0
          ind_ides.each do |ind_ide|
            ind_ide.ind_ide_type.nil? ? array[i][0] << ind_ide.ind_ide_type=NO_DATA_AVAILABLE : array[i][0] << ind_ide.ind_ide_type
            ind_ide.grantor.nil? ? array[i][1] << ind_ide.grantor=NO_DATA_AVAILABLE : array[i][1] << ind_ide.grantor
            ind_ide.ind_ide_number.nil? ? array[i][2] << ind_ide.ind_ide_number=NO_DATA_AVAILABLE : array[i][2] << ind_ide.ind_ide_number
            ind_ide.holder_type_id.nil? ?  array[i][3]<< NO_DATA_AVAILABLE : array[i][3] << HolderType.find_by_id(ind_ide.holder_type_id).name
            ind_ide.nih_nci.nil? ?  array[i][4] << NO_DATA_AVAILABLE : array[i][4] << ind_ide.nih_nci

            i = i +1
          end

          if ind_ides_num == 0
            array =@document.table(1, 1,8000)
            array[0][0] << NO_DATA_AVAILABLE
            array.border_width =10
          end

          array =@document.table(1,1,8000)
          array.border_width =10
          array[0].shading_colour = @light_red
          array[0][0] << "Human Subject Safety"

          Hash h = Hash.new
          @trial.board_approval_status_id.nil? ? board_approval_status = NO_DATA_AVAILABLE : board_approval_status = BoardApprovalStatus.find_by_id(@trial.board_approval_status_id).name
          h.store("Board Approval Status", board_approval_status)
          h.store("Board Approval Number",get_value_based_on_display_rule(@trial.board_approval_num,"Required"))
          h.store("Board",get_value_based_on_display_rule(@trial.board_name,"Required"))
          @trial.board_affiliation_id.nil? ? org =nil : org = Organization.find_by_id(@trial.board_affiliation_id)

          org.nil? ? address = nil : address = org.address
          org.nil? ? phone = nil : phone = org.phone
          org.nil? ? email = nil : email = org.email
          org.nil? ? affiliation = NO_DATA_AVAILABLE : affiliation = org.name


          num_of_rows= 4
          num_of_rows = num_of_rows +1 if address
          num_of_rows = num_of_rows +1 if phone
          num_of_rows = num_of_rows +1 if email



          h.store("   Address",address) if address
          h.store("   Phone", phone)    if phone
          h.store("   Email", email)    if email
          h.store("Affiliation",affiliation)


          array =@document.table(num_of_rows,2,4000,4000)
          array.border_width =10
          i = 0
          h.each do |k,v|
            array[i][0] << k
            array[i][1] << v
            i = i +1
          end
        end


        def trial_design_table
          array =@document.table(1,1,8000)
          array.border_width =10
          array[0].shading_colour = @light_red
          array[0][0] << "Trial Design"

          Hash h = Hash.new
          #h.store("Type", board_approval_status)
          @trial.primary_purpose_id.nil? ? primary_purpose=NO_DATA_AVAILABLE : primary_purpose = PrimaryPurpose.find_by_id(@trial.primary_purpose_id).name
          @trial.secondary_purpose_id.nil? ? secondary_purpose=NO_DATA_AVAILABLE : secondary_purpose = PrimaryPurpose.find_by_id(@trial.secondary_purpose_id).name
          @trial.phase_id.nil? ? phase=NO_DATA_AVAILABLE : phase = Phase.find_by_id(@trial.phase_id).name
          @trial.intervention_model_id.nil? ? interventional_model=NO_DATA_AVAILABLE : interventional_model = InterventionModel.find_by_id(@trial.intervention_model_id).name
          @trial.masking_id.nil? ? masking = NO_DATA_AVAILABLE : masking = Masking.find_by_id(@trial.masking_id).name
          @trial.allocation_id.nil? ? allocation=NO_DATA_AVAILABLE : allocation = Allocation.find_by_id(@trial.allocation_id).name
          @trial.study_classification_id.nil? ? classification=NO_DATA_AVAILABLE : classification = StudyClassification.find_by_id(@trial.study_classification_id).name

          @trial.study_model_id.nil? ? study_model=NO_DATA_AVAILABLE : study_model = StudyModel.find_by_id(@trial.study_model_id).name
          @trial.time_perspective_id.nil? ? time_perspective=NO_DATA_AVAILABLE : time_perspective = TimePerspective.find_by_id(@trial.time_perspective_id).name
          @trial.biospecimen_retention_id.nil? ? biospecimen_retention=NO_DATA_AVAILABLE : biospecimen_retention = BiospecimenRetention.find_by_id(@trial.biospecimen_retention_id).name
          @trial.biospecimen_desc.nil? ? biospecimen_desc = NO_DATA_AVAILABLE : biospecimen_desc = @trial.biospecimen_desc
          #@trial.allocation_id.nil? ? allocation = NO_DATA_AVAILABLE : allocation = Allocation.find_by_id(@trial.allocation_id).name

          @trial.research_category_id.nil? ? trial_type = NO_DATA_AVAILABLE : trial_type = ResearchCategory.find_by_id(@trial.research_category_id).name



          if trial_type == "Interventional" || trial_type ="Expanded Access"
                h.store("Primary Purpose",primary_purpose)
                h.store("Description of Other Primary Purpose",@trial.primary_purpose_other) if primary_purpose == "Other"
                h.store("Secondary Purpose",secondary_purpose)
                h.store("Description of Other Secondary Purpose",@trial.secondary_purpose_other) if secondary_purpose == "Other"
                h.store("Phase",phase)
                h.store("Intervention Model",interventional_model)
                h.store("Number of Arms",@trial.num_of_arms.to_s)
                h.store("Masking",masking)
                if masking != "Open"
                  masking_roles = Array.new
                  masking_roles.push "Subject" if @trial.masking_role_subject
                  masking_roles.push " Caregiver" if @trial.masking_role_caregiver
                  masking_roles.push " Investigator" if @trial.masking_role_investigator
                  if masking_roles.length == 0
                    masking_roles_str = NO_DATA_AVAILABLE
                  else
                    masking_roles_str =  masking_roles.join(",")
                  end

                  h.store("Masking Roles",masking_roles_str)
                end


                h.store("Allocation",allocation)
                h.store("Study Classification",classification)
                h.store("Target Enrollment",get_value_based_on_display_rule(@trial.target_enrollment.to_s,"Required"))

          elsif trial_type == "Observational" || trial_type ="Ancillary Correlative"
                h.store("Primary Purpose",primary_purpose)
                h.store("Phase",phase)
                h.store("Study Model",study_model)
                h.store("Time Perspective",time_perspective)
                h.store("Description of Other Time Perspective",@trial.time_perspective_other) if time_perspective == "Other"

                h.store("Bio-Specimen Retention",biospecimen_retention)
                h.store("Bio-Specimen Description",biospecimen_desc)
                h.store("Number of Arms",@trial.num_of_arms.to_s)
                h.store("Target Enrollment",get_value_based_on_display_rule(@trial.target_enrollment.to_s,"Required"))
          end





          array =@document.table(h.length,2,4000,4000)
          array.border_width =10
          i = 0



          h.each do |k,v|
            array[i][0] << k
            array[i][1] << v
            i = i +1
          end

        end

        def generate_trial_description_table

          create_a_table_row(@grey,@foreground_th_text_color,"Trial Description")

          @trial.brief_title.nil? ? brief_title = NO_DATA_AVAILABLE : brief_title = @trial.brief_title
          @trial.brief_summary.nil? ? brief_summary = NO_DATA_AVAILABLE : brief_summary = @trial.brief_summary
          @trial.objective.nil? ? objective = NO_DATA_AVAILABLE : objective = @trial.objective
          @trial.detailed_description.nil? ? detailed_description = NO_DATA_AVAILABLE : detailed_description = @trial.detailed_description

          create_a_table_row(@light_red,@foreground_th_text_color,"Brief Title")
          create_a_table_row_node(@trial_description_table,brief_title)

          create_a_table_row(@light_red,@foreground_th_text_color,"Brief Summary")
          create_a_table_row_node(@trial_description_table,brief_summary)

          create_a_table_row(@light_red,@foreground_th_text_color,"Objectives")
          create_a_table_row_node(@trial_description_table,objective)

          create_a_table_row(@light_red,@foreground_th_text_color,"Detailed Description")
          create_a_table_row_node(@trial_description_table,detailed_description)

          #create_a_table_row(@light_red,@foreground_th_text_color,"Other Details")
          #array =@document.table(1,2,4000,4000)


        end


        def generate_interventions_table
          create_a_table_row(@grey,@foreground_th_text_color,"Intervention(s)")

          array =@document.table(1,4,2000,2000,2000,2000)
          array.border_width =10
          array[0][0] << "Type"
          array[0][1] << "Name"
          array[0][2] << "Alternate Name"
          array[0][3] << "Description"

          interventions = @trial.interventions
          interventions_num = 0
          interventions_num = interventions.size if interventions
          array =@document.table(interventions_num, 4,2000,2000,2000,2000)
          array.border_width =10
          i = 0

          interventions.each do |col|
            col.intervention_type_id.nil? ? type = NO_DATA_AVAILABLE :  type = InterventionType.find_by_id(col.intervention_type_id).name
            array[i][0] << type
            array[i][1] <<  get_value_based_on_display_rule(col.name,"Required")
            array[i][2] << get_value_based_on_display_rule(col.other_name,"Required")
            array[i][3] << get_value_based_on_display_rule(col.description,"Required")
            i = i +1
          end
        end



      def generate_arm_groups_table
          create_a_table_row(@grey,@foreground_th_text_color,"Arm/Group(s)")

          array =@document.table(1,3,2800,2600,2600)
          array.border_width =10
          array[0][0] << "Arm Type"
          array[0][1] << "Label"
          array[0][2] << "Description"

          arms_groups = @trial.arms_groups
          arms_groups_num = 0
          arms_groups_num = arms_groups.size if arms_groups
          array =@document.table(arms_groups_num, 3,2800,2600,2600)
          array.border_width =10
          i = 0
          i = 0
          arms_groups.each do |col|
            array[i][0] <<  get_value_based_on_display_rule(col.arms_groups_type,"Required")
            array[i][1] <<  get_value_based_on_display_rule(col.label,"Required")
            array[i][2] <<  get_value_based_on_display_rule(col.description,"Required")
            i=i+1
          end

          create_a_table_row(@grey,@foreground_th_text_color,"Interventions")

          array =@document.table(1,2,4000,4000)
          array.border_width =10
          array[0][0] << "Name"
          array[0][1] << "Description"


          interventions = @trial.interventions
          interventions_num = 0
          interventions_num = interventions.size if interventions
          array =@document.table(interventions_num, 2,4000,4000)
          array.border_width =10
          i = 0
          interventions.each do |col|
            array[i][0] <<  col.name
            array[i][1] << col.description
            i = i +1
           end

      end


      def generate_eligibility_criteria_table


        create_a_table_row(@grey,@foreground_th_text_color,"Eligibility Criteria")

        @trial.gender_id.nil? ? gender= NO_DATA_AVAILABLE : gender = Gender.find_by_id(@trial.gender_id).name
        @trial.min_age_unit_id.nil? ? min_age = NO_DATA_AVAILABLE : min_age = @trial.min_age.to_s + "  " + AgeUnit.find_by_id(@trial.min_age_unit_id).name
        @trial.max_age_unit_id.nil? ? max_age = NO_DATA_AVAILABLE : max_age = @trial.max_age.to_s + "  " + AgeUnit.find_by_id(@trial.max_age_unit_id).name
        @trial.research_category_id.nil? ? trial_type = NO_DATA_AVAILABLE : trial_type = ResearchCategory.find_by_id(@trial.research_category_id).name

        Hash h = Hash.new
        h.store("Accepts Healthy Volunteers?",get_value_based_on_display_rule(@trial.accept_vol,"Required"))
        h.store("Gender",gender)
        h.store("Minimum Age",min_age)
        h.store("Maximum Age",max_age)

        if trial_type == "Observational"
          h.store("Sampling Method",get_value_based_on_display_rule(@trial.sampling_method,"Required"))
          h.store("Study Population",get_value_based_on_display_rule(@trial.study_pop_desc,"Required"))
        end

        array =@document.table(h.length,2,4000,4000)
        array.border_width =10
        i = 0

        h.each do |k,v|
          array[i][0] << k
          array[i][1] << v
          i = i + 1
        end

        create_a_table_row(@light_red,@foreground_th_text_color,"Inclusion Criteria")
        array =@document.table(1,1,8000)
        array.border_width =10
        inclusion_criteria = @trial.other_criteria.where("criteria_type = ?", "Inclusion")

        if inclusion_criteria.size == 0
          array[0][0] << NO_DATA_AVAILABLE
        else
          inclusion_criteria.each do |col|
            array[0][0] << col.criteria_desc
            array[0][0].line_break
          end
        end


        create_a_table_row(@light_red,@foreground_th_text_color,"Exclusion Criteria")
        array =@document.table(1,1,8000)
        array.border_width =10
        exclusion_criteria = @trial.other_criteria.where("criteria_type = ?", "Exclusion")

        if exclusion_criteria.size == 0
          array[0][0] << NO_DATA_AVAILABLE
        else
          exclusion_criteria.each do |col|
            array[0][0] << col.criteria_desc
            array[0][0].line_break
          end
        end

      end


       def generate_disease_condition_table
         create_a_table_row(@grey,@foreground_th_text_color,"Disease/Condition")
         diseases = @trial.diseases
         num_of_rows = diseases.size

         array = @document.table(num_of_rows,1,8000)
         array.border_width =10
         i=0
         diseases.each do |col|
           array[i][0] << col.display_name
           array[i][0].line_break
           i = i+1
         end
       end


        def generate_outcome_measures_table(outcome_measure_type_id,text)
          create_a_table_row(@grey,@foreground_th_text_color,text)
          oms = @trial.outcome_measures
          primary_oms = oms.where("outcome_measure_type_id = ? ", outcome_measure_type_id)
          num_of_rows = primary_oms.size

          array = @document.table(num_of_rows+1,4,2000,2000,2000,2000)
          array[0].shading_colour = @light_red
          array.border_width =10

          array[0][0].foreground(@foreground_th_text_color) << "Title"
          array[0][1].foreground(@foreground_th_text_color) << "Description"
          array[0][2].foreground(@foreground_th_text_color) << "Time Frame"
          array[0][3].foreground(@foreground_th_text_color) << "Safety Issue?"
          if num_of_rows == 0
            array = @document.table(1,1,8000)
            array[0][0] << NO_DATA_AVAILABLE
          end

          i=1

          primary_oms.each do |col|

            array[i][0] << get_value_based_on_display_rule(col.title,"Required")
            array[i][0].line_break

            array[i][1] << get_value_based_on_display_rule(col.description,"Required")
            array[i][1].line_break

            array[i][2] << get_value_based_on_display_rule(col.time_frame,"Required")
            array[i][2].line_break

            array[i][3] << get_value_based_on_display_rule(col.safety_issue,"Required")
            array[i][3].line_break

            i = i+1
          end

        end

        def generate_sub_groups_table
          create_a_table_row(@grey,@foreground_th_text_color,"Sub-groups Stratification Criteria")
          sub_groups = @trial.sub_groups
          num_of_rows = sub_groups.size

          array = @document.table(num_of_rows+1,2,4000,4000)
          array[0].shading_colour = @light_red
          array.border_width =10

          array[0][0].foreground(@foreground_th_text_color) << "Label"
          array[0][1].foreground(@foreground_th_text_color) << "Description"
          i=1

          if num_of_rows == 0
            array = @document.table(1,1,8000)
            array[0][0] << NO_DATA_AVAILABLE
          end

          sub_groups.each do |col|

            array[i][0] << get_value_based_on_display_rule(col.label,"Required")
            array[i][0].line_break

            array[i][1] << get_value_based_on_display_rule(col.description,"Required")
            array[i][1].line_break

            i = i+1
          end
        end

        def generate_markers_table
          create_a_table_row(@grey,@foreground_th_text_color,"Markers")
          markers = @trial.markers
          num_of_rows = markers.size

          array = @document.table(num_of_rows+1,6,1350,1330,1330,1330,1330,1330)
          array[0].shading_colour = @light_red
          array.border_width =10

          array[0][0].foreground(@foreground_th_text_color) << "Marker Name"
          array[0][1].foreground(@foreground_th_text_color) << "Evaluation Type"
          array[0][2].foreground(@foreground_th_text_color) << "Assay Type"
          array[0][3].foreground(@foreground_th_text_color) << "Biomarker Use"
          array[0][4].foreground(@foreground_th_text_color) << "Biomarker Purpose"
          array[0][5].foreground(@foreground_th_text_color) << "Specimen Type"

          i=1

          if num_of_rows == 0
            array = @document.table(1,1,8000)
            array[0][0] << NO_DATA_AVAILABLE
          end

          markers.each do |col|

            array[i][0] << col.name
            array[i][0].line_break


            marker_eval_type_associations = col.marker_eval_type_associations
            marker_eval_type_associations.each do |col|
              col.evaluation_type_id.nil? ? evaluation_type = NO_DATA_AVAILABLE :  evaluation_type = EvaluationType.find_by_id(col.evaluation_type_id).name
              array[i][1] << evaluation_type
              array[i][1].line_break
            end

            marker_assay_type_associations = col.marker_assay_type_associations
            marker_assay_type_associations.each do |col|
              col.assay_type_id.nil? ? assay_type = NO_DATA_AVAILABLE :  assay_type = AssayType.find_by_id(col.assay_type_id).name
              array[i][2] << assay_type
              array[i][2].line_break
            end


            col.biomarker_use_id.nil? ? biomarker_use_name= NO_DATA_AVAILABLE : biomarker_use_name = BiomarkerUse.find_by_id(col.biomarker_use_id).name
            array[i][3] << biomarker_use_name
            array[i][3].line_break

            biomarker_purposes = col.marker_biomarker_purpose_associations
            biomarker_purposes.each do |col|
              col.biomarker_purpose_id.nil? ? biomarker_purpose_name = NO_DATA_AVAILABLE :  biomarker_purpose_name = BiomarkerPurpose.find_by_id(col.biomarker_purpose_id).name
              array[i][4] << biomarker_purpose_name
              array[i][4].line_break
            end

            marker_spec_type_associations = col.marker_spec_type_associations
            marker_spec_type_associations.each do |col|
              col.specimen_type_id.nil? ? specimen_type = NO_DATA_AVAILABLE :  specimen_type = SpecimenType.find_by_id(col.specimen_type_id).name
              array[i][5] << specimen_type
              array[i][5].line_break
            end

            i = i+1
          end

        end

      def generate_participating_sites_table

        create_a_table_row(@grey,@foreground_th_text_color,"Participating Sites")

        participating_sites = @trial.participating_sites
        num_of_rows = participating_sites.size

        array = @document.table(num_of_rows+1,5,1600,1600,1600,1600,1600)
        array.border_width =10
        array[0].shading_colour = @light_red

        array[0][0].foreground(@foreground_th_text_color) << "Facility"
        array[0][1].foreground(@foreground_th_text_color) << "Contact"
        array[0][2].foreground(@foreground_th_text_color) << "Recruitment Status & Date(s)"
        array[0][3].foreground(@foreground_th_text_color) << "Target Accrual"
        array[0][4].foreground(@foreground_th_text_color) << "Investigator(s)"
         i=1

        if num_of_rows == 0
          array = @document.table(1,1,8000)
          array[0][0] << NO_DATA_AVAILABLE
        end

        participating_sites.each do |col|

          col.organization_id.nil? ? facility = NO_DATA_AVAILABLE :  facility = Organization.find_by_id(col.organization_id).name
          col.contact_name.nil? ? contact_name = NO_DATA_AVAILABLE : contact_name = col.contact_name
          array[i][0] << facility

          array[i][1] << "Name: "
          array[i][1] << get_value_based_on_display_rule(contact_name,"Required")
          array[i][1].line_break

          array[i][1] << "Email: "
          array[i][1] << get_value_based_on_display_rule(col.contact_email,"Required")
          array[i][1].line_break

          array[i][1] << "Phone: "
          array[i][1] << get_value_based_on_display_rule(col.contact_phone,"Required")
          array[i][1].line_break

          array[i][1] << "Ext: "
          array[i][1] << col.extension

          col.site_rec_status_wrappers.present? ? current_site_recruitment_status = col.site_rec_status_wrappers.last.site_recruitment_status.name + " as of " + col.site_rec_status_wrappers.last.status_date.strftime("%d-%h-%Y").to_s: current_site_recruitment_status = nil

          array[i][2] << current_site_recruitment_status
          array[i][3] << get_value_based_on_display_rule(@trial.target_enrollment.to_s,"Required")

          participating_site_investigators = col.participating_site_investigators
          participating_site_investigators.each do |col|
            col.person_id.nil? ? investigator = nil : investigator = Person.find_by_id(col.person_id)
            investigator_name = nil
            if investigator.nil?
              investigator = nil
            else
              investigator_name = investigator.fname if investigator.fname
              investigator_name = investigator_name +  " "  + investigator.mname if investigator.mname
              investigator_name = investigator_name +  " "  + investigator.lname if investigator.lname
            end
            investigator_type = col.investigator_type
            investigator_name = investigator_name + " - " + investigator_type if investigator_type

            array[i][4] << get_value_based_on_display_rule(investigator_name,"Required")
            array[i][4].line_break
          end

          i = i+1
        end

      end
end
