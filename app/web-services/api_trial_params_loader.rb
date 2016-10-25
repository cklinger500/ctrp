class ApiTrialParamsLoader

  $rest_params = {}
  $mapperObject

  def initialize
    $errors = {}
    $rest_params = {}
  end

  def load_params(xmlMapperObject,type,trial)
    $rest_params = {}
    $mapperObject =xmlMapperObject

    #$rest_params.push
    case type
      when "create"
        $rest_params[:edit_type] ="create"
        $rest_params[:trial_ownerships_attributes] =[]
        create_owner
      when "update"
        $rest_params[:edit_type] ="update"
      when "amend"
        $rest_params[:edit_type] ="amend"
        $rest_params[:submissions_attributes]=[]
        $rest_params[:submissions_attributes].push({amendment_num:$mapperObject.amendment_number,amendment_date:$mapperObject.amendment_date})
    end

    ##In model to add some custome code use following identifier ; so that active model know from which this request is coming;
    $rest_params[:coming_from] = "rest"

    [:study_source_id,:lead_protocol_id,:official_title,:phase_id,:primary_purpose_id,:accrual_disease_term_id,:program_code,:grant_question,:start_date,
    :start_date_qual,:primary_comp_date,:primary_comp_date_qual,:comp_date,:comp_date_qual].each do |attr|
       if !$mapperObject.send(attr).nil?
         p $mapperObject.send(attr)
         $rest_params[attr] = $mapperObject.send(attr)
       end
    end

    if $rest_params[:edit_type] == "update"
      ##A change to the trial's disease terminology will be ignored if the trial has accrued study subjects with disease codes under the existing terminology.
      $rest_params[:accrual_disease_term_id] = $mapperObject.accrual_disease_term_id if trial.accrual_disease_term_id.nil?
    else
      $rest_params[:accrual_disease_term_id] = $mapperObject.accrual_disease_term_id
    end

      ###Trial Identifiers

    $rest_params[:other_ids_attributes]=[]
    otherProtocolId    = ProtocolIdOrigin.find_by_name("Other Identifier").id
    clinicalProtocolId = ProtocolIdOrigin.find_by_name("ClinicalTrials.gov Identifier").id

    $mapperObject.otherIDs = $mapperObject.otherIDs.uniq
    $mapperObject.otherIDs.each do |oid|
      if ($rest_params[:edit_type] == "update" || $rest_params[:edit_type] == "amend") && !OtherId.find_by_protocol_id_and_protocol_id_origin_id_and_trial_id(oid, otherProtocolId,trial.id)
        $rest_params[:other_ids_attributes].push({protocol_id:oid,protocol_id_origin_id:otherProtocolId})
      elsif $rest_params[:edit_type] == "create"
        $rest_params[:other_ids_attributes].push({protocol_id:oid,protocol_id_origin_id:otherProtocolId})
      end
    end


    ##
    #$rest_params[:other_ids_attributes] = $rest_params[:other_ids_attributes].uniq

    $mapperObject.clinicalIDs.each do |cid|
      if $rest_params[:edit_type] == "update"
        #If the trial does not currently specify a ClinicalTrials.Gov ID (a.k.a NCT ID), you can provide one during the update.
        #If the trial does have a ClinicalTrials.Gov ID already, your update will not be allowed to change it; an attempt to do so will be ignored by CTRP.
        other_ids = trial.other_ids.pluck(:protocol_id_origin_id)
        if !other_ids.include?(clinicalProtocolId)
          $rest_params[:other_ids_attributes].push({protocol_id:cid,protocol_id_origin_id:clinicalProtocolId})
        end
      else
        $rest_params[:other_ids_attributes].push({protocol_id:cid,protocol_id_origin_id:clinicalProtocolId})
      end

    end

   ###


    ###Trial Details

    ##TODO If they donot provide pilot set to NO and give a thought about update and amend case::
    $rest_params[:pilot] = $mapperObject.pilot

    if !$mapperObject.interventionalTrial.nil?
        $rest_params[:research_category_id]=$mapperObject.interventionalTrial.research_category_id
        $rest_params[:secondary_purpose_id] = $mapperObject.interventionalTrial.secondary_purpose_id
      if $mapperObject.interventionalTrial.secondary_purpose_other.nil? && !$mapperObject.interventionalTrial.secondary_purpose_id.nil? && SecondaryPurpose.find_by_id($mapperObject.interventionalTrial.secondary_purpose_id).name == "Other"
        $errors.store("SecondaryPurpose","When Secondary Purpose is Other,Other Description expected")
      else
        $rest_params[:secondary_purpose_other]      =   $mapperObject.interventionalTrial.secondary_purpose_other
      end
    elsif  !$mapperObject.nonInterventionalTrial.nil?
      $rest_params[:research_category_id]=$mapperObject.nonInterventionalTrial.research_category_id
    end


    if !$mapperObject.primary_purpose_id.nil? && PrimaryPurpose.find_by_id($mapperObject.primary_purpose_id).name == "Other" && $mapperObject.primary_purpose_other.nil?
      $errors.store("PrimaryPurpose","When Primary Purpose is Other,Other Description expected")
    else
      $rest_params[:primary_purpose_other]      =      $mapperObject.primary_purpose_other
    end


    ###Lead Org, PI, Sponsor
    ###
    lead_org_id=$mapperObject.leadOrganization.existingOrganization.id if $mapperObject.leadOrganization
    sponsor_id=$mapperObject.sponsor.existingOrganization.id           if $mapperObject.sponsor
    pi_id = $mapperObject.pi.existingPerson.id                         if $mapperObject.pi
    $rest_params[:lead_org_id] = Organization.find_by_ctrp_id(lead_org_id).id    if lead_org_id && valid_org("leadOrganization",lead_org_id)
    $rest_params[:sponsor_id]  = Organization.find_by_ctrp_id(sponsor_id).id     if sponsor_id && valid_org("Sponsor",sponsor_id)
    $rest_params[:pi_id]       = Person.find_by_ctrp_id(pi_id).id                if pi_id && valid_person("pi",pi_id)

    ###Funding Sources
    $rest_params[:trial_funding_sources_attributes] = []
    $mapperObject.fundingSources = $mapperObject.fundingSources.uniq
      $mapperObject.fundingSources.each do |fs|
      organization_id=fs.existingOrganization.id
      $rest_params[:trial_funding_sources_attributes].push({organization_id:organization_id}) if organization_id && valid_org("summary4FundingSponsor",organization_id)
    end


    ###Grants
    ###
    $rest_params[:grants_attributes] = []
    $mapperObject.grants = $mapperObject.grants.uniq
    $mapperObject.grants.each do |grant|
      if validate_grants(grant.funding_mechanism,grant.institute_code,grant.serial_number,grant.nci)
        if ($rest_params[:edit_type] == "update" || $rest_params[:edit_type] == "amend") && !Grant.find_by_funding_mechanism_and_institute_code_and_serial_number_and_nci_and_trial_id(grant.funding_mechanism, grant.institute_code,grant.serial_number, grant.nci,trial.id)
          $rest_params[:grants_attributes].push({funding_mechanism: grant.funding_mechanism, institute_code: grant.institute_code, serial_number: grant.serial_number, nci: grant.nci})
        elsif $rest_params[:edit_type] == "create"
          $rest_params[:grants_attributes].push({funding_mechanism: grant.funding_mechanism, institute_code: grant.institute_code, serial_number: grant.serial_number, nci: grant.nci})
        end
      else
        $errors.store("grant" ,"Given grant info is not valid")
      end
    end

    ###Trial Status
    $rest_params[:trial_status_wrappers_attributes] = []
    trial_status_wrappers_hash= {}
    trial_status_wrappers_hash[:status_date]     = $mapperObject.status_date          if !$mapperObject.status_date.nil?
    trial_status_wrappers_hash[:why_stopped]     = $mapperObject.why_stopped          if !$mapperObject.why_stopped.nil?
    trial_status_wrappers_hash[:trial_status_id] = $mapperObject.trial_status_id      if !$mapperObject.trial_status_id.nil?
    $rest_params[:trial_status_wrappers_attributes].push(trial_status_wrappers_hash)

    validate_dates_conditions


    ###IND,IDE
    $rest_params[:ind_ides_attributes] = []
    $mapperObject.inds = $mapperObject.inds.uniq
    $mapperObject.inds.each do |ind|
      holder_type_id = HolderType.find_by_code(ind.holderType).id
      if ($rest_params[:edit_type] == "update" || $rest_params[:edit_type] == "amend") && !IndIde.find_by_ind_ide_type_and_ind_ide_number_and_grantor_and_holder_type_id_and_trial_id("ind", ind.ind_ide_number,ind.grantor, holder_type_id,trial.id)
        add_ind_ide("ind",ind,holder_type_id)
      elsif $rest_params[:edit_type] == "create"
        add_ind_ide("ind",ind,holder_type_id)
      end
    end

    $mapperObject.ides = $mapperObject.ides.uniq
    $mapperObject.ides.each do |ide|
      holder_type_id = HolderType.find_by_code(ide.holderType).id
      if ($rest_params[:edit_type] == "update" || $rest_params[:edit_type] == "amend") && !IndIde.find_by_ind_ide_type_and_ind_ide_number_and_grantor_and_holder_type_id_and_trial_id("ide", ide.ind_ide_number,ide.grantor, holder_type_id,trial.id)
        add_ind_ide("ide",ide,holder_type_id)
      elsif $rest_params[:edit_type] == "create"
        add_ind_ide("ide",ide,holder_type_id)
      end
    end

    ###Regulatory Information
    save_responsible_party()

    if !$mapperObject.regulatoryInformation.nil?
      save_oversight_authority($mapperObject.regulatoryInformation.country, $mapperObject.regulatoryInformation.authorityName)

      $rest_params[:sec801_indicator]=       $mapperObject.regulatoryInformation.sec801_indicator
      $rest_params[:intervention_indicator]= $mapperObject.regulatoryInformation.intervention_indicator
      $rest_params[:data_monitor_indicator]= $mapperObject.regulatoryInformation.data_monitor_indicator
    end


    ###Trial Docs

    $rest_params[:trial_documents_attributes] = []

    add_file($mapperObject.protocol_document_name,$mapperObject.protocol_document_content,"Protocol Document","tmp_PD")
    add_file($mapperObject.irb_approval_document_name,$mapperObject.irb_approval_document_content,"IRB Approval","tmp_IA")
    add_file($mapperObject.participating_sites_document_name,$mapperObject.participating_sites_document_content,"List of Participating Sites","tmp_PS")
    add_file($mapperObject.informed_consent_document_name,$mapperObject.informed_consent_document_content,"Informed Consent","tmp_IS")
    add_file($mapperObject.change_memo_document_name,$mapperObject.change_memo_document_content,"Change Memo Document","tmp_CMD")
    add_file($mapperObject.protocol_highlight_document_name,$mapperObject.protocol_highlight_document_content,"Protocol Highlighted Document","tmp_PHD")

    i=0;
    $mapperObject.otherDocs.each do |other_file_name, other_file_content|
      i+=1;
      add_file(other_file_name,other_file_content,"Other Document","tmp_OD_"+i.to_s)
    end



  end

  def get_rest_params()
    return $rest_params
  end

  def errors
    return $errors
  end

  def valid_org(type,id)
    trialService=TrialRestService.new
    count = 0
    begin
      count=trialService.active_ctrp_org_count(id)
    rescue Exception=>e
      p e
    end

    if  count > 0
      return true
    else
      $errors.store(type,"Given Organization does not exist in CTRP "+id)
      return false
    end

  end

  def valid_person(type,id)
    count=0
    trialService=TrialRestService.new
    begin
      count=trialService.active_ctrp_person_count(id)
    rescue Exception=>e
      p e
    end
    if count > 0
        return true
    else
      $errors.store(type,"Given Person does not exist in CTRP")
      return false
    end
  end


  def validate_grants(fundingMechanism,nihInstitutionCode,serialNumber,nciDivisionProgramCode)
    isNciPCValid  =    AppSetting.find_by_code("NCI").big_value.split(',').include?(nciDivisionProgramCode)
    isSerialNumValid = Tempgrants.find_by_funding_mechanism_and_institute_code_and_serial_number(fundingMechanism,nihInstitutionCode,serialNumber) ? true : false

    return isSerialNumValid && isNciPCValid ? true:false
  end

  def add_ind_ide(type,ind_ide,holder_type_id)
    ind_ide_hash ={}
    ind_ide_hash[:ind_ide_type]=type
    ind_ide_hash[:ind_ide_number]=ind_ide.ind_ide_number
    ind_ide_hash[:grantor]=ind_ide.grantor
    ind_ide_hash[:holder_type_id]= holder_type_id


    ##If the holder type is NIH, select the NIH Institution.
    if holder_type_id == HolderType.find_by_code("NIH").id
      nihInstitution=ind_ide.nihInstitution
      nihInstMap=get_nih_inst_map
      nihInstMap.has_key?(nihInstitution) ? ind_ide_hash[:nih_nci]=nihInstMap[:nihInstitution] : $errors.store(type,"If holder type is NIH,valid nihInstitution expected ")
    end
    ##If the holder type is NCI, select the NCI Division Program Code.
    if holder_type_id == HolderType.find_by_code("NCI").id
      isNciPCValid  =  AppSetting.find_by_code("NCI").big_value.split(',').include?(ind_ide.nciDivisionProgramCode)
      isNciPCValid ? ind_ide_hash[:nih_nci]=ind_ide.nciDivisionProgramCode : $errors.store(type,"If holder type is NCI,valid nciDivisionProgramCode expected ")
    end
    $rest_params[:ind_ides_attributes].push(ind_ide_hash)
  end

 def get_nih_inst_map
   arr=[]
   hash = {}
   arr=AppSetting.find_by_code("NIH").big_value.split(';')
   arr.each  do |o|
     key=o.split(/-/).first
     val=o.split(/-/).second
     hash[key]=val
   end
   return hash
 end

  def isValidFileFormat(file_name)
    file_extension=File.extname(file_name).delete('.')
    return AppSetting.find_by_code("ACCEPTED_FILE_TYPES_REG").value.split(',').include?(file_extension)
  end


  def delete_x(trialkeys,x,xarray,xname)
    existing_x = Array.new()
    existing_x = x.where(trial_id: @trial.id).pluck(:id)
    len = existing_x.length
    if len > 0
      for i in 0..len-1
        myHash= Hash.new();
        myHash.store("id", existing_x[i])
        myHash.store("_destroy","true")
        xarray.push(myHash);
      end
      @trialMasterMap.store(xname,xarray);

    end
  end



def save_responsible_party

  if $mapperObject.responsible_party.nil?
    return
  end

  responsible_party  =  $mapperObject.responsible_party.type
  investigator_title = $mapperObject.responsible_party.investigator_title

  $rest_params[:responsible_party_id] = ResponsibleParty.find_by_name(responsible_party).id

  if responsible_party != "Sponsor"
   investigator_title.nil? ? $rest_params[:investigator_title] ="Principal Investigator" : $rest_params[:investigator_title] =investigator_title
  end

  case responsible_party
    when "Principal Investigator"
        investigator_aff_id = $mapperObject.responsible_party.investigatorAffiliation.existingOrganization.id
        $rest_params[:investigator_aff_id] = investigator_aff_id  if investigator_aff_id && valid_org("investigatorAffiliation",investigator_aff_id)
    when "Sponsor-Investigator"
          investigator_id = $mapperObject.responsible_party.investigator.existingPerson.id
          $rest_params[:investigator_id] = investigator_id  if investigator_id && valid_person("investigator",investigator_id)
  end

end

  def save_oversight_authority(alpha3, authority)
    authorities = []
    $rest_params[:oversight_authorities_attributes] =[]
    geo_location_service = GeoLocationService.new
    country = geo_location_service.get_country_name_from_alpha3(alpha3)
    authorities = geo_location_service.getAuthorityOrgArr(country) if !country.nil?
    if authorities.size !=0 && authorities.include?(authority)
      oa_hash ={}
      oa_hash[:country]=country
      oa_hash[:organization]=authority
      $rest_params[:oversight_authorities_attributes].push(oa_hash)
    else
      $errors.store("regulatoryInformation","Given country and authority does not match")
    end
  end


  def add_file(file_name, file_content,document_type,tmp_file_name)

     if file_content.nil?
       return
     end

     decode_base64_content = Base64.decode64(file_content)
    file_extension = File.extname(file_name).delete('.') ##sample.pdf will give pdf
    file_format    = File.extname(file_name)             ##sample.pdf will give .pdf

    if !isValidFileFormat(file_name)
       $errors.store(file_name,"Given file format is not valid, refer XSD for acceptable file formats");
       return
     end

    if file_extension == "pdf"
      pdf = Prawn::Document.new
      pdf.text(decode_base64_content)
      pdf.render_file(Rails.root.to_s + "/../../storage/" + tmp_file_name)
      pdf_file = File.open(Rails.root.to_s + "/../../storage/"+ tmp_file_name)
      file_params = {:filename => file_name, :type => "application/pdf", :tempfile => pdf_file}
    else
      temp_file = Tempfile.new(['Sample2',file_format])
      temp_file.binmode
      temp_file <<  decode_base64_content
      #temp_file.rewind
      file_params = {:filename => file_name, :tempfile => temp_file}
    end
    uploaded_file = ActionDispatch::Http::UploadedFile.new(file_params)
    trial_document_params = {:file => uploaded_file, :document_type =>document_type, :file_name => file_name}
    $rest_params[:trial_documents_attributes].push(trial_document_params)

  end

    def validate_dates_conditions
      current_trial_status_id = $mapperObject.trial_status_id
      current_trial_status_date = $mapperObject.status_date
      current_trial_status_name = TrialStatus.find_by_id($mapperObject.trial_status_id).name
      today_date = Date.today


      ##If Current Trial Status is ‘Active’, Trial Start Date must be the same or before the Current Trial Status Date and have ‘actual’ type.
      #Actual
      #Anticipated
      if current_trial_status_name == 'Active'
       if !(Date.parse($rest_params[:start_date]) <= Date.parse(current_trial_status_date) &&  $rest_params[:start_date_qual] == "Actual")
         $errors.store("trialStartDate" ,"If Current Trial Status is Active, Trial Start Date must be the same or before the Current Trial Status Date and have Actual type.")
       end
      end
      ##If Current Trial Status is ‘In Review’ or ‘Approved’, Trial Start Date must have ‘anticipated’ type.
      # Trial Start Date must have ‘actual’ type for any other Current Trial Status value besides ‘In Review’ and ‘Approved’.
      if current_trial_status_name == 'In Review' || current_trial_status_name == 'Approved'
        if $rest_params[:start_date_qual] != "Anticipated"
          $errors.store("trialStartDate" ,"If Current Trial Status is ‘In Review’ or ‘Approved’, Trial Start Date must have ‘Anticipated’ type")
        end
      else
        if $rest_params[:start_date_qual] != "Actual"
          $errors.store("trialStartDate" ,"Trial Start Date must have ‘actual’ type for any other Current Trial Status value besides ‘In Review’ and ‘Approved’")
        end
      end

      ##Primary Completion Date must be the same or bigger that the date of the current trial status preceded Completed or Administratively Completed status.
      ##Not yet implemented

      ##If Current Trial Status is ‘Complete’ or ‘Administratively Complete’, Primary Completion Date must have ‘actual’ type.
      # Primary Completion Date must have ‘anticipated’ type for any other Current Trial Status value besides ‘Complete’ and ‘Administratively Compete’.
      if current_trial_status_name == 'Complete' || current_trial_status_name == 'Administratively Complete'
        if $rest_params[:primary_comp_date_qual] != "Actual"
          $errors.store("primaryCompletionDate" ,"If Current Trial Status is ‘Complete’ or ‘Administratively Complete’, Primary Completion Date must have Actual type")
        end
      else
        if $rest_params[:primary_comp_date_qual] != "Anticipated"
          $errors.store("primaryCompletionDate" ,"Primary Completion Date must have ‘anticipated’ type for any other Current Trial Status value besides ‘Complete’ and ‘Administratively Compete’")
        end
      end

      #Trial Start Date must be same/smaller than Primary Completion Date.
      if !(Date.parse($rest_params[:start_date]) <= Date.parse($rest_params[:primary_comp_date]))
        $errors.store("primaryCompletionDate" ,"Primary Completion Date must be the same or before the Trial Start Date")
      end

      # Primary Completion Date must be current/past if ‘actual’ primary completion date type is provided and must be future if ‘anticipated’ trial primary completion date type is provided.
      if $rest_params[:primary_comp_date_qual] == "Actual"
        if !(Date.parse($rest_params[:primary_comp_date]) <= today_date)
          $errors.store("primaryCompletionDate" ,"If primary completion date type is Actual, Primary Completion Date must be current/past")
        end
      end

      if $rest_params[:primary_comp_date_qual] == "Anticipated"
        if !(Date.parse($rest_params[:primary_comp_date]) > today_date)
          $errors.store("primaryCompletionDate" ,"If primary completion date type is Anticipated, Primary Completion Date must be in the future")
        end
      end
    end

  def create_owner
    $mapperObject.trialOwners = $mapperObject.trialOwners.uniq
    $mapperObject.trialOwners.each do |email|
      user = User.find_by_email(email)
      if !user.nil? && ["ROLE_SITE-SU", "ROLE_TRIAL-SUBMITTER"].include?(user.role)
        $rest_params[:trial_ownerships_attributes].push({user_id:user.id})
      else
        $errors.store("trialOwner" ,"Given trial owner must have known to CTRP AUM with proper priviliges to register trials")
      end
    end
  end


end