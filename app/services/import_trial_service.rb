#
# rubocop:disable ClassLength

class ImportTrialService

  def initialize()
    #@trial = params[:trial]
    $errors = {}
    $search_result = {}
    #$rest_params = {}
  end

  def errors
    return $search_result
  end

  def validate_clinical_trials_gov(nct_id)
    existing_nct_ids = OtherId.joins(:trial).where('protocol_id = ? AND protocol_id_origin_id = ? AND (trials.is_rejected = ? OR trials.is_rejected IS NULL)', nct_id.upcase, ProtocolIdOrigin.find_by_code('NCT').id, FALSE)
    if existing_nct_ids.length > 0
      $search_result[:error_msg] = 'A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page.'
      return
    end

    url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
    url = url.sub('NCT********', nct_id)
    begin
      xml = Nokogiri::XML(open(url))
    rescue OpenURI::HTTPError
      $search_result[:error_msg] = 'A study with the given identifier is not found in ClinicalTrials.gov.'
    else
      lead_protocol_id = xml.xpath('//org_study_id').text
      org_name = xml.xpath('//sponsors/lead_sponsor/agency').text

      dup_trial = Trial.joins(:lead_org).where('organizations.name ilike ? AND lead_protocol_id = ?', org_name, lead_protocol_id)
      dup_trial = dup_trial.filter_rejected
      if dup_trial.length > 0
        $search_result[:error_msg] = 'Combination of Lead Organization Trial ID and Lead Organization must be unique.'
        return
      end

    end
  end

  def import_clinical_trials_gov_rest(nct_id)
    url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
    url = url.sub('NCT********', nct_id)
    xml = Nokogiri::XML(open(url))

    #trial_service = TrialService.new({trial: nil})
    @trial = Trial.new(import_params(xml, @current_user))
    @trial.current_user = @current_user

    respond_to do |format|
      if @trial.save
        format.html { redirect_to @trial, notice: 'Trial was successfully imported.' }
        format.json { render :show, status: :created, location: @trial }

        #TrialDocument.create(document_type: 'Other Document', document_subtype: 'Import XML', trial_id: @trial.id, file: open(url), file_name: 'import.xml')
      else
        format.html { render :new }
        format.json { render json: @trial.errors, status: :unprocessable_entity }
      end
    end
  end

  ###############
  ## The following methods are being used by the bothe TrailController and ApiTrialController to import trials from CT.Gov
  ## Be Advised that while changing any of the following logic take both Rest and Angular end points.
  ##
  ##
  ##############
  def import_params (xml, current_user)
    import_params = {}

    import_params[:edit_type] = 'import'
    import_params[:is_draft] = false
    import_params[:study_source_id] = StudySource.find_by_code('IND').id
    import_params[:lead_protocol_id] = xml.xpath('//org_study_id').text

    import_params[:other_ids_attributes] = []
    xml.xpath('//secondary_id').each do |other_id|
      import_params[:other_ids_attributes].push({protocol_id_origin_id: ProtocolIdOrigin.find_by_code('OTH').id, protocol_id: other_id.text})
    end
    import_params[:other_ids_attributes].push({protocol_id_origin_id: ProtocolIdOrigin.find_by_code('NCT').id, protocol_id: xml.xpath('//nct_id').text})

    import_params[:brief_title] = xml.xpath('//brief_title').text
    if xml.xpath('//official_title').present?
      import_params[:official_title] = xml.xpath('//official_title').text
    elsif xml.xpath('//brief_title').present?
      import_params[:official_title] = xml.xpath('//brief_title').text
    end

    org_name = xml.xpath('//sponsors/lead_sponsor/agency').text

    orgs = Organization.all
    orgs = orgs.matches_name_wc(org_name, true)
    nlm_orgs = orgs.with_source_context("NLM")

    #Log Entry for New Import
    if nlm_orgs.length == 1
      nlm_org_ctrp_id = nlm_orgs[0].ctrp_id
      ctrp_org = Organization.find_by_id_and_source_context_id(nlm_org_ctrp_id,SourceContext.find_by_code('CTRP').id)
      ctrp_org_status = SourceStatus.find_by_id(ctrp_org.source_status_id).code if !ctrp_org.nil?
      if  !ctrp_org.nil? &&  ctrp_org_status == 'ACT'
        #take that CTRP org and make it the Lead org, sponsor, Data table 4 etc.
        import_params[:lead_org_id] = nlm_orgs[0].id
        import_params[:sponsor_id] = nlm_orgs[0].id
        import_params[:trial_funding_sources_attributes] = [{organization_id: nlm_orgs[0].id}]
      elsif !ctrp_org.nil? &&  ctrp_org_status != 'ACT'
        #Import the trial leave the Lead org, sponsor, Data table 4 funding sponsor null
      elsif ctrp_org.nil?
        #Import the trial leave the Lead org, sponsor, Data table 4 funding sponsor null
      else

      end
    elsif nlm_orgs.length > 1
      #Import the trial leave the Lead org, sponsor, Data table 4 funding sponsor null
      #
    else nlm_orgs.length == 0
    #When a trial has been imported with a "Sponsor Name" that does not exist in the NLM Context in the CTRP
    #And that "Sponsor Name" does not match an organization name "Agency" name in CTRP
    #Then an NLM Context with an NLM Context Status of "Active" will be automatically created in CTRP
    #And the processing status is "Incomplete"
    #And the service Request is "Create"

    nlm_context = SourceContext.find_by_code('NLM')
    service_request = ServiceRequest.find_by_code('CREATE')
    processing_status  = "Incomplete"
    nlm_org_for_imported_trial = Organization.new(name:org_name,processing_status:processing_status,service_request_id:service_request.id,source_status_id:SourceStatus.find_by_code_and_source_context_id('ACT',nlm_context.id).id,source_context_id:nlm_context.id)
    nlm_org_for_imported_trial.validations_to_skip = ["address","city"]
    Rails.logger.info nlm_org_for_imported_trial
    ##Creating in before_create method on Trial model thus it inlcudes in the Transaction Block.
    import_params[:nlm_org_for_imported_trial] = nlm_org_for_imported_trial
    end


    import_params[:collaborators_attributes] = []
    xml.xpath('//collaborator/agency').each do |collaborator|
      import_params[:collaborators_attributes].push({org_name: collaborator.text})
    end

    import_params[:oversight_authorities_attributes] = []
    xml.xpath('//oversight_info/authority').each do |authority|
      splits = authority.text.split(':')
      import_params[:oversight_authorities_attributes].push({country: splits[0].strip, organization: splits[1].strip})
    end

    import_params[:data_monitor_indicator] = xml.xpath('//oversight_info/has_dmc').text if xml.xpath('//oversight_info/has_dmc').present?
    import_params[:brief_summary] = xml.xpath('//brief_summary').text.lstrip.chop if xml.xpath('//brief_summary').present?
    import_params[:detailed_description] = xml.xpath('//detailed_description').text.lstrip.chop if xml.xpath('//detailed_description')

    import_params[:trial_status_wrappers_attributes] = []
    ctrp_status_code = map_status(xml.xpath('//overall_status').text)
    ctrp_status = TrialStatus.find_by_code(ctrp_status_code)
    import_params[:trial_status_wrappers_attributes].push({trial_status_id: ctrp_status.id}) if ctrp_status.present?

    import_params[:start_date] = convert_date(xml.xpath('//start_date').text) if xml.xpath('//start_date').present?
    import_params[:start_date_qual] = 'Actual' if xml.xpath('//start_date').present?
    import_params[:comp_date] = convert_date(xml.xpath('//completion_date').text) if xml.xpath('//completion_date').present?
    import_params[:comp_date_qual] = xml.xpath('//completion_date').attr('type') if xml.xpath('//completion_date').present?
    import_params[:primary_comp_date] = convert_date(xml.xpath('//primary_completion_date').text) if xml.xpath('//primary_completion_date').present?
    import_params[:primary_comp_date_qual] = xml.xpath('//primary_completion_date').attr('type') if xml.xpath('//primary_completion_date').present?

    ctrp_phase_code = map_phase(xml.xpath('//phase').text)
    ctrp_phase = Phase.find_by_code(ctrp_phase_code)
    import_params[:phase_id] = ctrp_phase.id if ctrp_phase.present?
    ctgov_research_category = xml.xpath('//study_type').text
    if ctgov_research_category == "Observational [Patient Registry]"
      ctgov_research_category = "Observational"
      biospecimen = xml.xpath('//biospec_retention').text if xml.xpath('//biospec_retention').present?
      ctrp_biospecimen_retention_code = map_biospecimen_retention(biospecimen)
      ctrp_biospecimen_retention = BiospecimenRetention.find_by_code(ctrp_biospecimen_retention_code)
      import_params[:biospecimen_retention_id] = ctrp_biospecimen_retention.id if ctrp_biospecimen_retention.present?
      biospecimen_descr = xml.xpath('//biospec_descr/textblock').text if xml.xpath('//biospec_descr/textblock').present?
      import_params[:biospecimen_desc] = biospecimen_descr
    end
    ctrp_research_category = ResearchCategory.find_by_name(ctgov_research_category)
    import_params[:research_category_id] = ctrp_research_category.id if ctrp_research_category.present?
    #<study_design>Observational Model: Case-Only, Time Perspective: Prospective</study_design>

    xml.xpath('//study_design').text.split(',').each do |study_design|
      splits = study_design.split(':')


      case splits[0].strip
        ###Interventional Trial
        when 'Allocation'
          ctrp_allocation_code = map_allocation(splits[1].strip)
          ctrp_allocation = Allocation.find_by_code(ctrp_allocation_code)
          import_params[:allocation_id] = ctrp_allocation.id if ctrp_allocation.present?
        when 'Endpoint Classification'
          ctrp_study_classification_code = map_study_classification(splits[1].strip)
          ctrp_study_classification = StudyClassification.find_by_code(ctrp_study_classification_code)
          import_params[:study_classification_id] = ctrp_study_classification.id if ctrp_study_classification.present?
        when 'Intervention Model'
          ctrp_intervention_model_code = map_intervention_model(splits[1].strip)
          ctrp_intervention_model = InterventionModel.find_by_code(ctrp_intervention_model_code)
          import_params[:intervention_model_id] = ctrp_intervention_model.id if ctrp_intervention_model.present?
        when 'Masking'
          ctrp_masking_code = map_masking(splits[1].strip)
          ctrp_masking = Masking.find_by_code(ctrp_masking_code)
          import_params[:masking_id] = ctrp_masking.id if ctrp_masking.present?
        when 'Primary Purpose'
          ctrp_primary_purpose_code = map_primary_purpose(splits[1].strip)
          ctrp_primary_purpose = PrimaryPurpose.find_by_code(ctrp_primary_purpose_code)
          import_params[:primary_purpose_id] = ctrp_primary_purpose.id if ctrp_primary_purpose.present?

        ####Observational Trial
        when 'Observational Model'
          #ctrp_study_model_code = map_study_model(splits[1].strip)
          ctrp_study_model_code = StudyModel.find_by_name(splits[1].strip)
          #ctrp_study_model = StudyModel.find_by_code(ctrp_study_model_code)
          import_params[:study_model_id] = ctrp_study_model_code.id if ctrp_study_model_code.present?
        when 'Time Perspective'
          ctrp_time_perspective_code = map_time_perspective(splits[1].strip)
          ctrp_time_perspective = TimePerspective.find_by_code(ctrp_time_perspective_code)
          import_params[:time_perspective_id] = ctrp_time_perspective.id if ctrp_time_perspective.present?
      end
    end

    import_params[:outcome_measures_attributes] = []
    xml.xpath('//primary_outcome').each do |p_outcome|
      import_params[:outcome_measures_attributes].push({title: p_outcome.xpath('measure').text, time_frame: p_outcome.xpath('time_frame').text, safety_issue: p_outcome.xpath('safety_issue').text, description: p_outcome.xpath('description').text, outcome_measure_type_id: OutcomeMeasureType.find_by_code('PRI').id})
    end
    xml.xpath('//secondary_outcome').each do |s_outcome|
      import_params[:outcome_measures_attributes].push({title: s_outcome.xpath('measure').text, time_frame: s_outcome.xpath('time_frame').text, safety_issue: s_outcome.xpath('safety_issue').text, description: s_outcome.xpath('description').text, outcome_measure_type_id: OutcomeMeasureType.find_by_code('SEC').id})
    end
    xml.xpath('//other_outcome').each do |o_outcome|
      import_params[:outcome_measures_attributes].push({title: o_outcome.xpath('measure').text, time_frame: o_outcome.xpath('time_frame').text, safety_issue: o_outcome.xpath('safety_issue').text, description: o_outcome.xpath('description').text, outcome_measure_type_id: OutcomeMeasureType.find_by_code('OTH').id})
    end

    import_params[:num_of_arms] = xml.xpath('//number_of_arms').text if xml.xpath('//number_of_arms').present?
    import_params[:target_enrollment] = xml.xpath('//enrollment').text if xml.xpath('//enrollment').present?

    if xml.xpath('//eligibility/criteria').present?
      import_params[:other_criteria_attributes] = []
      criteria_text = xml.xpath('//eligibility/criteria').text
      criteria_text = criteria_text.sub('Inclusion Criteria', 'INCLUSION CRITERIA')
      criteria_text = criteria_text.sub('Exclusion Criteria', 'EXCLUSION CRITERIA')
      if criteria_text.include? 'INCLUSION CRITERIA:'
        inclusion_partition = criteria_text.partition('INCLUSION CRITERIA:')
        if inclusion_partition[0].include? 'EXCLUSION CRITERIA:'
          import_params[:other_criteria_attributes].push({criteria_type: 'Inclusion', criteria_desc: inclusion_partition[2]})
          sub_inclusion_partition = inclusion_partition[0].partition('EXCLUSION CRITERIA:')
          import_params[:other_criteria_attributes].push({criteria_type: 'Exclusion', criteria_desc: sub_inclusion_partition[2]})
        elsif inclusion_partition[2].include? 'EXCLUSION CRITERIA:'
          sub_inclusion_partition = inclusion_partition[2].partition('EXCLUSION CRITERIA:')
          import_params[:other_criteria_attributes].push({criteria_type: 'Inclusion', criteria_desc: sub_inclusion_partition[0]})
          import_params[:other_criteria_attributes].push({criteria_type: 'Exclusion', criteria_desc: sub_inclusion_partition[2]})
        else
          import_params[:other_criteria_attributes].push({criteria_type: 'Inclusion', criteria_desc: inclusion_partition[2]})
        end
      elsif criteria_text.include? 'EXCLUSION CRITERIA:'
        exclution_partition = criteria_text.partition('EXCLUSION CRITERIA:')
        import_params[:other_criteria_attributes].push({criteria_type: 'Exclusion', criteria_desc: exclution_partition[2]})
      else
        import_params[:other_criteria_attributes].push({criteria_type: 'Inclusion', criteria_desc: criteria_text})
      end
    end

    ctrp_gender = Gender.find_by_name(xml.xpath('//eligibility/gender').text)
    import_params[:gender_id] = ctrp_gender.id if ctrp_gender.present?

    if xml.xpath('//eligibility/minimum_age').present?
      min_age_text = xml.xpath('//eligibility/minimum_age').text
      if !(min_age_text.include? 'N/A')
        splits = min_age_text.split(' ')
        import_params[:min_age] = splits[0]
        ctrp_min_age_unit = AgeUnit.find_by_name(splits[1]) if splits[1].present?
        import_params[:min_age_unit_id] = ctrp_min_age_unit.id if ctrp_min_age_unit.present?
      else
        import_params[:min_age] = 0
        ctrp_min_age_unit = AgeUnit.find_by_code('YRS')
        import_params[:min_age_unit_id] = ctrp_min_age_unit.id if ctrp_min_age_unit.present?
      end
    end

    if xml.xpath('//eligibility/maximum_age').present?
      max_age_text = xml.xpath('//eligibility/maximum_age').text
      if !(max_age_text.include? 'N/A')
        splits = max_age_text.split(' ')
        import_params[:max_age] = splits[0]
        ctrp_max_age_unit = AgeUnit.find_by_name(splits[1]) if splits[1].present?
        import_params[:max_age_unit_id] = ctrp_max_age_unit.id if ctrp_max_age_unit.present?
      else
        import_params[:max_age] = 999
        ctrp_max_age_unit = AgeUnit.find_by_code('YRS')
        import_params[:max_age_unit_id] = ctrp_max_age_unit.id if ctrp_max_age_unit.present?
      end
    end

    if xml.xpath('//healthy_volunteers').present?
      accept_vol = xml.xpath('//healthy_volunteers').text
      import_params[:accept_vol] = CtGovImportExport.find_by_from_and_import_or_export(accept_vol,"import").to
    end
    import_params[:verification_date] = convert_date(xml.xpath('//verification_date').text) if xml.xpath('//verification_date').present?

    submission_params = {}
    submission_params[:updated_at] = Date.today #xml.xpath('//lastchanged_date').text
    submission_params[:created_at] = xml.xpath('//firstreceived_date').text
    submission_params[:submission_num] = 1
    submission_params[:submission_date] = Date.today
    ori = SubmissionType.find_by_code('ORI')
    submission_params[:submission_type_id] = ori.id if ori.present?
    cct = SubmissionSource.find_by_code('CCT')
    submission_params[:submission_source_id] = cct.id if cct.present?
    cti = SubmissionMethod.find_by_code('CTI')
    submission_params[:submission_method_id] = cti.id if cti.present?
    submission_params[:user_id] = current_user.id if current_user.present?
    import_params[:submissions_attributes] = [submission_params]

    ctrp_responsible_party = ResponsibleParty.find_by_name(xml.xpath('//responsible_party/responsible_party_type').text)
    import_params[:responsible_party_id] = ctrp_responsible_party.id if ctrp_responsible_party.present?

    ctrp_keywords = ''
    xml.xpath('//keyword').each_with_index do |keyword, i|
      ctrp_keywords += ', ' if i > 0
      ctrp_keywords += keyword
    end
    import_params[:keywords] = ctrp_keywords if ctrp_keywords.length > 0

    import_params[:intervention_indicator] = xml.xpath('//is_fda_regulated').text if xml.xpath('//is_fda_regulated').present?
    import_params[:sec801_indicator] = xml.xpath('//is_section_801').text if xml.xpath('//is_section_801').present?

    return import_params
  end

  # Maps the ClinicalTrials.gov status to CTRP status code

  def map_time_perspective(ct_time_perspective)
    import_time_perspectives = CtGovImportExport.import_time_perspectives
    return change_code(import_time_perspectives,TimePerspective,ct_time_perspective)
  end

  def map_biospecimen_retention(ct_biospecimen_retention)
    import_biospecimen_retentions = CtGovImportExport.import_biospecimen_retentions
    return change_code(import_biospecimen_retentions,BiospecimenRetention,ct_biospecimen_retention)
  end


  def map_status (ct_status)
    import_trial_statuses = CtGovImportExport.import_trial_statuses
    return change_code(import_trial_statuses,TrialStatus,ct_status)
  end

  def map_phase (ct_phase)
    import_phases = CtGovImportExport.import_phases
    return change_code(import_phases,Phase,ct_phase)
  end

  def map_allocation (ct_allocation)
    import_allocations = CtGovImportExport.import_allocations
    return change_code(import_allocations,Allocation,ct_allocation)
  end

  def map_study_classification (ct_study_classification)
    import_study_classifications = CtGovImportExport.import_study_classifications
    return change_code(import_study_classifications,StudyClassification,ct_study_classification)
  end

  def map_intervention_model (ct_intervention_model)
    import_intervention_models = CtGovImportExport.import_intervention_models
    return change_code(import_intervention_models,InterventionModel,ct_intervention_model)
  end

  def map_primary_purpose (ct_primary_purpose)
    import_primary_purposes = CtGovImportExport.import_primary_purposes
    return change_code(import_primary_purposes,PrimaryPurpose,ct_primary_purpose)
  end

  def change_code(records,model,ct_gov_val)
    ctrp_record = records.find_by_from(ct_gov_val)
    !ctrp_record.nil? ? ctrp_val = ctrp_record.to : ctrp_val = nil
    !ctrp_val.nil? ?  ctrp_code = model.where(name: ctrp_val).pluck(:code) : _ctrp_code =''
    return ctrp_code
  end

  def map_masking (ct_masking)
    if ct_masking.include? 'Open'
      ctrp_masking_code = 'OP'
    elsif ct_masking.include? 'Single Blind'
      ctrp_masking_code = 'SB'
    elsif ct_masking.include? 'Double Blind'
      ctrp_masking_code = 'DB'
    else
      ctrp_masking_code = ''
    end

    return ctrp_masking_code
  end

  def convert_date (ct_date)
    splits = ct_date.split(' ')
    if ['January','February','March','April','May','June','July','August','September','October','November','December'].include? splits[0]
      month = splits[0].slice(0...3)
    else
      month = ''
    end
    return '01-' + month + '-' + splits[1]
  end

end