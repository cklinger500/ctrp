class TrialService
  @@is_IND_protocol = true # default to true
  @@cur_trial_status_code = nil
  @@is_cur_trial_status_active = false
  @@is_cur_trial_status_approved = false
  @@is_cur_trial_status_inreview = false
  @@is_cur_trial_status_withdrawn = false

  @@is_interventional_cat = false
  @@is_observational_cat = false
  @@is_expanded_cat = false
  @@is_ancillary_cat = false

  @@arm_label_max_length = 62  # max number of characters

  def initialize(params)
    @trial = params[:trial]

    if @trial.present?
      @@is_IND_protocol = @trial.ind_ide_question == 'Yes' ## find out if this trial is IND protocol
      cur_trial_status = @trial.trial_status_wrappers.last if @trial.trial_status_wrappers.present?
      cur_trial_status_id = cur_trial_status.nil? ? nil : cur_trial_status.trial_status_id
      @@cur_trial_status_code = cur_trial_status_id.nil? ? nil : TrialStatus.find(cur_trial_status_id).code
      @@is_cur_trial_status_active = @@cur_trial_status_code == 'ACT'
      @@is_cur_trial_status_approved = @@cur_trial_status_code == 'APP'
      @@is_cur_trial_status_inreview = @@cur_trial_status_code == 'INR'
      @@is_cur_trial_status_withdrawn = @@cur_trial_status_code == 'WIT'

      @@is_interventional_cat = ResearchCategory.find_by_code('INT') == @trial.research_category
      @@is_observational_cat = ResearchCategory.find_by_code('OBS') == @trial.research_category
      @@is_expanded_cat = ResearchCategory.find_by_code('EXP') == @trial.research_category
      @@is_ancillary_cat = ResearchCategory.find_by_code('ANC') == @trial.research_category
    end
  end

  def get_json
    return @trial.to_json(include: [:other_ids, :ind_ides, :grants, :trial_status_wrappers, :trial_funding_sources,
                                    :oversight_authorities, :onholds, :associated_trials, :alternate_titles,
                                    :central_contacts, :outcome_measures, :other_criteria, :markers, :interventions,
                                    :arms_groups, :sub_groups, :participating_sites, :citations, :links, :diseases,
                                    :collaborators, :trial_ownerships, :anatomic_site_wrappers])
  end

  def save_history(trial_json)
    TrialHistory.create(snapshot: trial_json, submission: @trial.current_submission)
  end

  def validate_abstraction()
    results = []
    if !@trial.present?
      return results
    end

    results |= _validate_general_trial_details() # concatenate array but remove duplicates
    results |= _validate_paa_regulatory_info_fda()
    results |= _validate_paa_regulatory_human_sub_safety()
    results |= _validate_paa_participating_sites()
    results |= _validate_paa_documents()
    results |= _validate_pas_trial_design()
    results |= _validate_pas_trial_description()
    results |= _validate_paa_nci_specific_info()
    results |= _validate_pas_arms_groups()
    results |= _validate_pas_eligibility()
    results |= _validate_pas_disease()
    results |= _validate_pas_outcome()
    results |= _validate_paa_collaborators()
    results |= _validate_pas_biomarkers()
    results |= _validate_paa_trial_funding()

    return results
  end


  def _validate_paa_trial_funding
    paa_trial_funding_rules = ValidationRule.where(model: 'trial', item: 'paa_trial_funding')
    validation_result = []
    is_grant_duplicate = false
    @trial.grants.each do |grant|
      break if is_grant_duplicate
      if !is_grant_duplicate
        is_grant_duplicate = Grant.where(funding_mechanism: grant.funding_mechanism, institute_code: grant.institute_code, trial_id: @trial.id).size > 1
      end
    end

    paa_trial_funding_rules.each do |rule|
      if (rule.code == 'PAA194' and (@trial.grant_question.present? and @trial.grant_question.downcase == 'yes') and @trial.funding_sources.size == 0) ||
         (rule.code == 'PAA195' and is_grant_duplicate)

        validation_result << rule

      end
    end

    return validation_result
  end

  def _validate_pas_biomarkers
    pas_biomarkers_rules = ValidationRule.where(model: 'trial', item: 'pas_biomarkers')
    validation_result = []
    pas_biomarkers_rules.each do |rule|
      if rule.code == 'PAS52' && @trial.markers.size == 0
        validation_result << rule
      end
    end

    return validation_result
  end

  def _validate_paa_collaborators
    paa_collaborators_rules = ValidationRule.where(model: 'trial', item: 'paa_collaborators')
    validation_result = []

    collaborator_ids = @trial.collaborators.pluck(:organization_id)
    uniq_collaborator_ids = collaborator_ids.uniq
    is_collaborator_duplicate = collaborator_ids.size > uniq_collaborator_ids.size

    paa_collaborators_rules.each do |rule|
      if rule.code == 'PAA103' and is_collaborator_duplicate
         validation_result << rule
      end
    end

    return validation_result
  end

  def _validate_pas_outcome
    pas_outcome_rules = ValidationRule.where(model: 'trial', item: 'pas_outcome')
    validation_result = []

    pas_outcome_rules.each do |rule|
      if rule.code == 'PAS40' and (!@trial.outcome_measures.present? || @trial.outcome_measures.size == 0)
        validation_result << rule
      end
    end

    return validation_result
  end

  def _validate_pas_disease
    pas_disease_rules = ValidationRule.where(model: 'trial', item: 'pas_disease')
    validation_result = []
    ## note: 'thesaurus_id' (C-Code) in 'disease' table corresponds to the 'nt_term_id' column in ncit_disease_codes table
    ncit_inactive_status_id = NcitStatus.find_by_code('INA').id
    disease_c_codes = @trial.diseases.pluck(:thesaurus_id) # C code of diseases in the current trial
    cur_disease_status_ids = NcitDiseaseCode.where(nt_term_id: disease_c_codes).pluck(:ncit_status_id)
    is_any_disease_name_inactive = cur_disease_status_ids.include?(ncit_inactive_status_id)

    pas_disease_rules.each do |rule|
      if (rule.code == 'PAS38' and (!@trial.diseases.present? || @trial.diseases.size == 0)) ||
         (rule.code == 'PAS39' and @@is_cur_trial_status_active and is_any_disease_name_inactive)
        validation_result << rule

      end
    end

    return validation_result
  end

  def _validate_pas_eligibility
    pas_eligibility_rules = ValidationRule.where(model: 'trial', item: 'pas_eligibility')
    validation_result = []

    pas_eligibility_rules.each do |rule|
      if (rule.code == 'PAS28' and (!@trial.other_criteria.present? || @trial.other_criteria.size == 0)) ||
         (rule.code == 'PAS29' and !@trial.accept_vol.present?) ||
         (rule.code == 'PAS30' and !@trial.gender_id.present?) ||
         (rule.code == 'PAS31' and (!@trial.min_age.present? || !@trial.min_age_unit.present?)) ||
         (rule.code == 'PAS32' and (!@trial.max_age.present? || !@trial.max_age_unit.present?)) ||
         (rule.code == 'PAS33' and (!@trial.other_criteria.present? || @trial.other_criteria.size == 0)) ||
          (rule.code == 'PAS34' and @@is_observational_cat and !@trial.sampling_method.present?) ||
          (rule.code == 'PAS35' and @@is_ancillary_cat and !@trial.sampling_method.present?) ||
          (rule.code == 'PAS36' and @@is_observational_cat and !@trial.study_pop_desc.present?) ||
          (rule.code == 'PAS37' and @@is_ancillary_cat and !@trial.study_pop_desc.present?)

        validation_result << rule

      end
    end

    return validation_result
  end

  def _validate_pas_arms_groups
    pas_arms_groups_rules = ValidationRule.where(model: 'trial', item: 'pas_arms/groups')
    validation_result = []

    is_arm_label_too_long = false
    all_arm_has_intervention = true # except 'No intervention' arms_group_type
    all_arms_groups = ArmsGroup.where(trial_id: @trial.id)
    inter_arms_groups = ArmsGroup.where(trial_id: @trial.id).where("arms_groups_type != ? OR arms_groups_type IS NULL", "No intervention")  #.where.not("arms_groups_type": 'No intervention')

    inter_arms_groups.each do |arm|
      all_arm_has_intervention = arm.arms_groups_interventions_associations.size > 0  # if 0, no interventions
      break if all_arm_has_intervention == false
    end

    arms_interventions_ids = []  # intervention ids associated with this trial's arms/groups
    all_arms_groups.each do |arm|
      if !is_arm_label_too_long
        is_arm_label_too_long = arm.label.present? && arm.label.length > @@arm_label_max_length # cannot be longer than 62 chars
      end
      cur_intervention_ids = arm.arms_groups_interventions_associations.pluck(:intervention_id)
      arms_interventions_ids |= cur_intervention_ids  # concatenate without duplicate id
    end

    all_interventions_ids_this_trial = Intervention.where(trial_id: @trial.id).pluck(:id)
    is_all_interventions_associated = all_interventions_ids_this_trial.sort() == arms_interventions_ids.sort() # check if every interventions in this trial have been associated with arms/groups

    pas_arms_groups_rules.each do |rule|
      if (rule.code == 'PAS26' and !all_arm_has_intervention) ||
         (rule.code == 'PAS27' and !is_all_interventions_associated) ||
         (rule.code == 'PAS50' and (@trial.arms_groups.nil? || @trial.arms_groups.size == 0)) ||
         (rule.code == 'PAS51' and is_arm_label_too_long)
        validation_result << rule
      end
    end

    return validation_result
  end

  def _validate_paa_nci_specific_info()
    paa_nci_specific_info_rules = ValidationRule.where(model: 'trial', item: 'paa_nci_specific_info')
    is_funding_sponsor_nullified = false

    funding_sources = TrialFundingSource.where(trial_id: @trial.id)
    funding_sources.each do |source|
      if !is_funding_sponsor_nullified
        organization = Organization.find(source.organization_id)
        is_funding_sponsor_nullified = organization.source_status.code == 'NULLIFIED'
      end
    end

    validation_result = []
    paa_nci_specific_info_rules.each do |rule|
      if rule.code == 'PAA208' and is_funding_sponsor_nullified
        validation_result << rule
      end
    end

    return validation_result

  end

  def _validate_pas_trial_description()
    pas_trial_description_rules = ValidationRule.where(model: 'trial', item: 'pas_trial_description')

    is_brief_title_unique = @trial.brief_title.nil? ? false : Trial.where(brief_title: @trial.brief_title).size == 1

    validation_results = []
    pas_trial_description_rules.each do |rule|

      if (rule.code == 'PAS21' and !@trial.brief_title.present?) ||
          (rule.code == 'PAS22' and !is_brief_title_unique) ||
          (rule.code == 'PAS23' and !@trial.brief_summary.present?)
        validation_results << rule

      elsif (rule.code == 'PAS41' and @trial.detailed_description.present? and @trial.detailed_description.length > 32000) ||
          (rule.code == 'PAS42' and @trial.brief_title.present? and @trial.brief_title.length < 18) ||
          (rule.code == 'PAS49' and @trial.brief_title.present? and @trial.brief_title.length > 300)

        ## warnings
        validation_results << rule

      end
    end

    return validation_results
  end

  def _validate_pas_trial_design()

    pas_trial_design_rules = ValidationRule.where(model: 'trial', item: 'pas_trial_design')

    is_open_masking = Masking.find_by_code('OP').id == @trial.masking_id
    is_single_blind_masking = Masking.find_by_code('SB').id == @trial.masking_id
    is_double_blind_masking = Masking.find_by_code('DB').id == @trial.masking_id

    num_masking_roles = 0
    num_masking_roles += 1 if @trial.masking_role_caregiver
    num_masking_roles += 1 if @trial.masking_role_investigator
    num_masking_roles += 1 if @trial.masking_role_outcome_assessor
    num_masking_roles += 1 if @trial.masking_role_subject
    is_primary_purpose_other = PrimaryPurpose.find_by_code('OTH').id == @trial.primary_purpose_id
    is_study_model_other = StudyModel.find_by_code('OTH').id == @trial.study_model_id
    is_time_perspec_other = TimePerspective.find_by_code('OTH').id == @trial.time_perspective_id

    validation_result = []
    pas_trial_design_rules.each do |rule|
      if (rule.code == 'PAS3' and @@is_interventional_cat and @trial.masking_id.nil?) ||
          (rule.code == 'PAS4' and @@is_expanded_cat and @trial.masking_id.nil?) ||
          (rule.code == 'PAS5' and @@is_interventional_cat and is_double_blind_masking and num_masking_roles < 2) ||
          (rule.code == 'PAS6' and @@is_expanded_cat and is_double_blind_masking and num_masking_roles < 2) ||
          (rule.code == 'PAS11' and @@is_interventional_cat and is_single_blind_masking and num_masking_roles != 1) ||
          (rule.code == 'PAS12' and @@is_expanded_cat and is_single_blind_masking and num_masking_roles != 1) ||
          (rule.code == 'PAS13' and @@is_interventional_cat and @trial.intervention_model_id.nil?) ||
          (rule.code == 'PAS14' and @@is_expanded_cat and @trial.intervention_model_id.nil?) ||
          (rule.code == 'PAS15' and !@trial.primary_purpose_id.present?) ||
          (rule.code == 'PAS16' and is_primary_purpose_other and !@trial.primary_purpose_other.present?) ||
          (rule.code == 'PAS17' and !@trial.phase_id.present?) ||
          (rule.code == 'PAS18' and !@trial.num_of_arms.present?) ||
          (rule.code == 'PAS19' and @@is_interventional_cat and !@trial.allocation_id.present?) ||
          (rule.code == 'PAS20' and @@is_expanded_cat and !@trial.allocation_id.present?)
            ## errors block
            validation_result << rule

      elsif (rule.code == 'PAS43' and @@is_observational_cat and !@trial.study_model_id.present?) ||
          (rule.code == 'PAS44' and @@is_ancillary_cat and !@trial.study_model_id.present?) ||
          (rule.code == 'PAS45' and @@is_observational_cat and is_study_model_other and !@trial.study_model_other.present?) ||
          (rule.code == 'PAS46' and @@is_ancillary_cat and is_study_model_other and !@trial.study_model_other.present?) ||
          (rule.code == 'PAS47' and @@is_observational_cat and is_time_perspec_other and !@trial.time_perspective_other.present?) ||
          (rule.code == 'PAS48' and @@is_ancillary_cat and is_time_perspec_other and !@trial.time_perspective_other.present?)
            ## warnings block
            validation_result << rule
      end

    end

    return validation_result
  end

  def _validate_paa_documents()
    paa_documents_rules = ValidationRule.where(model: 'trial', item: 'paa_documents')
    is_protocol_doc_missing = TrialDocument.where(trial_id: @trial.id, document_type: 'Protocol Document', status: 'active').blank? # does it have to active?
    is_irb_approval_doc_missing = TrialDocument.where(trial_id: @trial.id, document_type: 'IRB Approval', status: 'active').blank? # does it have to active?
    validation_result = []

    paa_documents_rules.each do |rule|
      if (rule.code == 'PAA95' and is_protocol_doc_missing) || (rule.code == 'PAA96' and is_irb_approval_doc_missing)
        validation_result << rule
      end
    end

    return validation_result
  end

  def _validate_paa_participating_sites()
    paa_site_rules = ValidationRule.where(model: 'trial', item: 'paa_participating_sites')
    # is_all_sites_uniq = sites.detect {|e| sites.rindex(e) != sites.index(e)}.nil? # boolean, true: unique, false: not unique
    #is_all_sites_uniq = @trial.participating_sites.size == 0

    is_any_site_status_active = false
    is_any_site_status_enroll_by_invitation = false

    site_counts_hash = ParticipatingSite.where(trial_id: @trial.id).group([:organization_id]).having("count(id) > 1").count
    is_all_sites_uniq = site_counts_hash.size == 0 # if duplicate, site_counts_hash.size >= 1
    p "is_all_sites_uniq: #{is_all_sites_uniq}"
    is_all_sites_pi_uniq = []

    @trial.participating_sites.each do |site|

      pi_count_hash = ParticipatingSiteInvestigator.where(participating_site_id: site.id).group([:participating_site_id, :person_id]).having("count(participating_site_id) > 1").count
      is_site_pi_uniq = pi_count_hash.size == 0  # if duplicate, count_hash.size >= 1
      is_all_sites_pi_uniq << is_site_pi_uniq # true or false

      site_status = site.site_rec_status_wrappers.last
      site_status_id = site_status.nil? ? nil : site_status.site_recruitment_status_id

      if !is_any_site_status_active
        is_any_site_status_active = site_status_id == SiteRecruitmentStatus.find_by_code('ACT').id
      end

      if !is_any_site_status_enroll_by_invitation
        is_any_site_status_enroll_by_invitation = site_status_id == SiteRecruitmentStatus.find_by_code('EBI').id
      end
    end

    validation_result = []
    paa_site_rules.each do |rule|
      
      if (rule.code == 'PAA93' && !is_all_sites_uniq) ||
          (rule.code == 'PAA94' && is_all_sites_pi_uniq.include?(false))
        ## errors block
        validation_result << rule

      elsif
      (rule.code == 'PAA196' and @@is_cur_trial_status_approved and is_any_site_status_active) ||
          (rule.code == 'PAA197' and @@is_cur_trial_status_approved and is_any_site_status_enroll_by_invitation) ||
          (rule.code == 'PAA198' and @@is_cur_trial_status_inreview and is_any_site_status_active) ||
          (rule.code == 'PAA199' and @@is_cur_trial_status_inreview and is_any_site_status_enroll_by_invitation) ||
          (rule.code = 'PAA200' and @@is_cur_trial_status_withdrawn and is_any_site_status_active) ||
          (rule.code = 'PAA201' and @@is_cur_trial_status_withdrawn and is_any_site_status_enroll_by_invitation)
          # (rule.code = 'PAA202' and is_any_site_status_active == false) ||
          (rule.code = 'PAA202' and @trial.participating_sites.size == 0)

        ## warnings block
        validation_result << rule
        # TODO: finish this warning block
        # TODO: PAA203, PAA204, PAA205, and PAA206 (ask BA: what is primary xxx ?)

      end
    end

    return validation_result
  end

  def _validate_paa_regulatory_human_sub_safety()
    human_safe_rules = ValidationRule.where(model: 'trial', item: 'paa_regulatory_info_human_subject_safety')
    validation_results = []
    board_approval_status = BoardApprovalStatus.find_by_code('SUBAPPROVED')
    board_approval_status_id = board_approval_status.nil? ? nil : board_approval_status.id
    board_sub_pending_status_id = BoardApprovalStatus.find_by_code('SUBPENDING').id
    board_sub_exempt_status_id = BoardApprovalStatus.find_by_code('SUBEXEMPT').id
    board_sub_denied_status_id = BoardApprovalStatus.find_by_code('SUBDENIED').id
    board_sub_unrequired_status_id = BoardApprovalStatus.find_by_code('SUBUNREQUIRED').id

    p "current trial status code: #{@@cur_trial_status_code} for trial #{@trial.id}"

    human_safe_rules.each do |rule|
      if rule.code == 'PAA92' and !board_approval_status_id.present?
        #error block
        validation_results << rule # board approval status is missing
      elsif (rule.code == 'PAA183' and @@cur_trial_status_code == 'INR' and @trial.board_approval_status_id != board_sub_pending_status_id) ||
            (rule.code == 'PAA184' and @trial.board_approval_status_id == board_sub_denied_status_id and @@cur_trial_status_code == 'ACT') ||
            (rule.code == 'PAA185' and @trial.board_approval_status_id == board_sub_denied_status_id and @@cur_trial_status_code == 'APP') ||
            (rule.code == 'PAA186' and @trial.board_approval_status_id == board_sub_pending_status_id and @@cur_trial_status_code != 'INR') ||
            (rule.code == 'PAA187' and @trial.board_approval_status_id == board_sub_pending_status_id and @@cur_trial_status_code == 'ACT') ||
            (rule.code == 'PAA189' and @trial.board_approval_status_id == board_sub_unrequired_status_id and @@cur_trial_status_code == 'ACT') ||
            (rule.code == 'PAA189' and @trial.board_approval_status_id == board_sub_unrequired_status_id and @@cur_trial_status_code == 'ACT') ||
            (rule.code == 'PAA191' and @@cur_trial_status_code == 'WIT' and @trial.board_approval_status_id != board_sub_denied_status_id) ||
            (rule.code == 'PAA193' and @@cur_trial_status_code == 'INR' and @trial.board_approval_status_id != board_sub_pending_status_id)
        # TODO: PAA 194, and PAA 195
          # warnings block
        ## 1. Review Board Approval must be  SUBMITTED PENDING if Trial Status is   IN REVIEW
        ## 2. Trial Status cannot be  ACTIVE when the  Review Board Approval is ‘Submitted; Denied’
        ## 3. If Review Board is ‘Submitted; Denied’; Trial Status cannot be Approved
        ## 4. If Board Approval Status is Submitted; Pending; Current Trial Status must be IN REVIEW
        ## 5. Current study status cannot be Active when Board Approval Status is submitted, pending'
        ## 6. Current study status cannot be Active when Board Approval Status is not required
        ## 7. If current trial status is withdrawn; Board Approval status in Regulatory Information – HSS must be ‘submitted denied’
        ## 8. Board status has been nullified. Board status is required.
        ## 9. If the current trial status is In Review; the board approval status must be Submitted; Pending.
        validation_results << rule
      end
    end

    return validation_results
  end

  def _validate_paa_regulatory_info_fda()
    pri_rules = ValidationRule.where(model: 'trial', item: 'paa_regulatory_info_fdaaa')
    validation_results = []
    # is_IND_protocol = @trial.ind_ide_question == 'Yes' ## find out if this trial is IND protocol
    if !@@is_IND_protocol
      return validation_results
    end
    is_US_contained = false
    is_FDA_contained = false
    @trial.oversight_authorities.each do |oa|
      if !is_US_contained
        is_US_contained = !oa.country.nil? and (!oa.country.nil? and oa.country.downcase.include?('united states') || !oa.country.nil? and oa.country.downcase.include?('us'))
      end

      if !is_FDA_contained
        is_FDA_contained = oa.organization.present? && oa.organization.downcase == 'food and drug administration'
      end
    end

    pri_rules.each do |rule|
      if (rule.code == 'PAA90' and !is_US_contained) || (rule.code == 'PAA91' and !is_FDA_contained)
        validation_results << rule
      end
    end
    return validation_results
  end

  def _validate_general_trial_details()
    #get general trial details rules
    gt_rules = ValidationRule.where(model: 'trial', item: 'paa_general_trial_details')
    validation_results = []
    # find these ids for validation check
    nct_origin_id = ProtocolIdOrigin.find_by_code('NCT').id
    ctep_origin_id = ProtocolIdOrigin.find_by_code('CTEP').id
    dcp_origin_id = ProtocolIdOrigin.find_by_code('DCP').id
    nctIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == nct_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == nct_origin_id} : nil
    nctIdentifier = nctIdentifierObj.present? ? nctIdentifierObj.protocol_id : nil
    ctepIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == ctep_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == ctep_origin_id} : nil
    ctepIdentifier = ctepIdentifierObj.present? ? ctepIdentifierObj.protocol_id : nil
    dcpIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == dcp_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == dcp_origin_id} : nil
    dcpIdentifier = dcpIdentifierObj.present? ? dcpIdentifierObj.protocol_id : nil

    nci_id = @trial.nci_id
    lead_org_protocol_id = @trial.lead_protocol_id
    keywords = @trial.keywords
    is_centralcontact_missing_email_or_phone = false
    @trial.central_contacts.each do |contact|
      is_centralcontact_missing_email_or_phone = !contact.email.present? && !contact.phone.present?
      break if is_centralcontact_missing_email_or_phone
    end

    gt_rules.each do |rule|
      if (rule.code == 'PAA2' and nctIdentifier.present? and nctIdentifier.length > 30) ||
          (rule.code == 'PAA3' and ctepIdentifier.present? and ctepIdentifier.length > 30) ||
         (rule.code == 'PAA6' and dcpIdentifier.present? and dcpIdentifier.length > 30) ||
          (rule.code == 'PAA7' and lead_org_protocol_id.present? and lead_org_protocol_id.length > 30) ||
         (rule.code == 'PAA8' and keywords.present? and keywords.length > 160)
        ## errors block
        validation_results << rule

      elsif(rule.code == 'PAA97' and !@trial.official_title.present?) ||
           (rule.code == 'PAA98' and (!@trial.lead_org_id.present? or !@trial.lead_protocol_id.present?)) ||
           (rule.code == 'PAA100' and !@trial.pi_id.present?) ||
           (rule.code == 'PAA101' and !@trial.sponsor_id) ||
           (rule.code == 'PAA102' and is_centralcontact_missing_email_or_phone)
        ## warnings block
        validation_results << rule
      end
    end

    return validation_results
  end

  def rollback(submission_id)
    trial_history = TrialHistory.find_by_submission_id(submission_id)
    # Parameters for native fields and deleting existing children
    rollback_params = {}
    # Parameters for reconstructing children
    rollback_params2 = {}
    [:id,:nci_id,:lead_protocol_id,:official_title,:pilot,:primary_purpose_other,:secondary_purpose_other,:program_code,:grant_question,
     :start_date,:start_date_qual,:primary_comp_date,:primary_comp_date_qual,:comp_date,:comp_date_qual,:ind_ide_question,:intervention_indicator,
    :sec801_indicator,:data_monitor_indicator,:history,:study_source_id,:phase_id,:primary_purpose_id,:secondary_purpose_id,:responsible_party_id,
    :lead_org_id,:pi_id,:sponsor_id,:investigator_id,:research_category_id,:accrual_disease_term_id,:investigator_title,:investigator_aff_id,
     :is_draft,:process_priority,:process_comment,:xml_required,:acronym,:keywords,:nih_nci_div,:nih_nci_prog,:send_trial,:board_approval_num,:brief_title,
    :brief_summary,:detailed_description,:objective,:target_enrollment,:final_enrollment,:accruals,:accept_vol,:min_age,:max_age,:assigned_to_id,
    :board_approval_status_id,:intervention_model_id,:masking_id,:allocation_id,:study_classification_id,:gender_id,:min_age_unit_id,:max_age_unit_id,
    :num_of_arms,:verification_date,:sampling_method,:study_pop_desc,:board_name,:board_affiliation_id,:masking_role_caregiver,:masking_role_investigator,
    :masking_role_outcome_assessor,:masking_role_subject,:study_model_other,:time_perspective_other,:study_model_id,:time_perspective_id,:biospecimen_retention_id,
    :biospecimen_desc,:internal_source_id,:nci_specific_comment,:send_trial_flag].each do |attr|
       rollback_params[attr] = trial_history.snapshot[attr]
     end

    # Delete existing children and reconstruct children from snapshot
    other_ids_attributes = []
    @trial.other_ids.each do |other_id|
      other_id_hash = {id: other_id.id, _destroy: true}
      other_ids_attributes.push(other_id_hash)
    end
    rollback_params[:other_ids_attributes] = other_ids_attributes
    other_ids_attributes = []
    trial_history.snapshot['other_ids'].each do |other_id|
      other_id_hash = {protocol_id: other_id['protocol_id'], protocol_id_origin_id: other_id['protocol_id_origin_id']}
      other_ids_attributes.push(other_id_hash)
    end
    rollback_params2[:other_ids_attributes] = other_ids_attributes

    ind_ides_attributes = []
    @trial.ind_ides.each do |ind_ide|
      ind_ide_hash = {id: ind_ide.id, _destroy: true}
      ind_ides_attributes.push(ind_ide_hash)
    end
    rollback_params[:ind_ides_attributes] = ind_ides_attributes
    ind_ides_attributes = []
    trial_history.snapshot['ind_ides'].each do |ind_ide|
      ind_ide_hash = {ind_ide_type: ind_ide['ind_ide_type'], grantor: ind_ide['grantor'], nih_nci: ind_ide['nih_nci'],
                      holder_type_id: ind_ide['holder_type_id'], ind_ide_number: ind_ide['ind_ide_number']}
      ind_ides_attributes.push(ind_ide_hash)
    end
    rollback_params2[:ind_ides_attributes] = ind_ides_attributes

    grants_attributes = []
    @trial.grants.each do |grant|
      grant_hash = {id: grant.id, _destroy: true}
      grants_attributes.push(grant_hash)
    end
    rollback_params[:grants_attributes] = grants_attributes
    grants_attributes = []
    trial_history.snapshot['grants'].each do |grant|
      grant_hash = {funding_mechanism: grant['funding_mechanism'], institute_code: grant['institute_code'],
                    nci: grant['nci'], serial_number: grant['serial_number'],
                    deletion_comment: grant['deletion_comment'], deleted_at: grant['deleted_at'],
                    deleted_by_username: grant['deleted_by_username']}
      grants_attributes.push(grant_hash)
    end
    rollback_params2[:grants_attributes] = grants_attributes

    trial_status_wrappers_attributes = []
    @trial.trial_status_wrappers.each do |trial_status_wrapper|
      trial_status_wrapper_hash = {id: trial_status_wrapper.id, _destroy: true}
      trial_status_wrappers_attributes.push(trial_status_wrapper_hash)
    end
    rollback_params[:trial_status_wrappers_attributes] = trial_status_wrappers_attributes
    trial_status_wrappers_attributes = []
    trial_history.snapshot['trial_status_wrappers'].each do |trial_status_wrapper|
      trial_status_wrapper_hash = {status_date: trial_status_wrapper['status_date'],
                                   why_stopped: trial_status_wrapper['why_stopped'],
                                   trial_status_id: trial_status_wrapper['trial_status_id'],
                                   comment: trial_status_wrapper['comment']}
      trial_status_wrappers_attributes.push(trial_status_wrapper_hash)
    end
    rollback_params2[:trial_status_wrappers_attributes] = trial_status_wrappers_attributes

    trial_funding_sources_attributes = []
    @trial.trial_funding_sources.each do |trial_funding_source|
      trial_funding_source_hash = {id: trial_funding_source.id, _destroy: true}
      trial_funding_sources_attributes.push(trial_funding_source_hash)
    end
    rollback_params[:trial_funding_sources_attributes] = trial_funding_sources_attributes
    trial_funding_sources_attributes = []
    trial_history.snapshot['trial_funding_sources'].each do |trial_funding_source|
      trial_funding_source_hash = {organization_id: trial_funding_source['organization_id']}
      trial_funding_sources_attributes.push(trial_funding_source_hash)
    end
    rollback_params2[:trial_funding_sources_attributes] = trial_funding_sources_attributes

    oversight_authorities_attributes = []
    @trial.oversight_authorities.each do |oversight_authority|
      oversight_authority_hash = {id: oversight_authority.id, _destroy: true}
      oversight_authorities_attributes.push(oversight_authority_hash)
    end
    rollback_params[:oversight_authorities_attributes] = oversight_authorities_attributes
    oversight_authorities_attributes = []
    trial_history.snapshot['oversight_authorities'].each do |oversight_authority|
      oversight_authority_hash = {country: oversight_authority['country'],
                                  organization: oversight_authority['organization']}
      oversight_authorities_attributes.push(oversight_authority_hash)
    end
    rollback_params2[:oversight_authorities_attributes] = oversight_authorities_attributes

    associated_trials_attributes = []
    @trial.associated_trials.each do |associated_trial|
      associated_trial_hash = {id: associated_trial.id, _destroy: true}
      associated_trials_attributes.push(associated_trial_hash)
    end
    rollback_params[:associated_trials_attributes] = associated_trials_attributes
    associated_trials_attributes = []
    trial_history.snapshot['associated_trials'].each do |associated_trial|
      associated_trial_hash = {trial_identifier: associated_trial['trial_identifier'],
                               identifier_type_id: associated_trial['identifier_type_id'],
                               official_title: associated_trial['official_title'],
                               research_category_name: associated_trial['research_category_name']}
      associated_trials_attributes.push(associated_trial_hash)
    end
    rollback_params2[:associated_trials_attributes] = associated_trials_attributes

    alternate_titles_attributes = []
    @trial.alternate_titles.each do |alternate_title|
      alternate_title_hash = {id: alternate_title.id, _destroy: true}
      alternate_titles_attributes.push(alternate_title_hash)
    end
    rollback_params[:alternate_titles_attributes] = alternate_titles_attributes
    alternate_titles_attributes = []
    trial_history.snapshot['alternate_titles'].each do |alternate_title|
      alternate_title_hash = {category: alternate_title['category'], title: alternate_title['title'],
                              source: alternate_title['source']}
      alternate_titles_attributes.push(alternate_title_hash)
    end
    rollback_params2[:alternate_titles_attributes] = alternate_titles_attributes

    central_contacts_attributes = []
    @trial.central_contacts.each do |central_contact|
      central_contact_hash = {id: central_contact.id, _destroy: true}
      central_contacts_attributes.push(central_contact_hash)
    end
    rollback_params[:central_contacts_attributes] = central_contacts_attributes
    central_contacts_attributes = []
    trial_history.snapshot['central_contacts'].each do |central_contact|
      central_contact_hash = {phone: central_contact['phone'], email: central_contact['email'],
                              central_contact_type_id: central_contact['central_contact_type_id'],
                              person_id: central_contact['person_id'], extension: central_contact['extension'],
                              fullname: central_contact['fullname']}
      central_contacts_attributes.push(central_contact_hash)
    end
    rollback_params2[:central_contacts_attributes] = central_contacts_attributes

    outcome_measures_attributes = []
    @trial.outcome_measures.each do |outcome_measure|
      outcome_measure_hash = {id: outcome_measure.id, _destroy: true}
      outcome_measures_attributes.push(outcome_measure_hash)
    end
    rollback_params[:outcome_measures_attributes] = outcome_measures_attributes
    outcome_measures_attributes = []
    trial_history.snapshot['outcome_measures'].each do |outcome_measure|
      outcome_measure_hash = {title: outcome_measure['title'], time_frame: outcome_measure['time_frame'],
                              description: outcome_measure['description'],
                              safety_issue: outcome_measure['safety_issue'],
                              outcome_measure_type_id: outcome_measure['outcome_measure_type_id'],
                              index: outcome_measure['index']}
      outcome_measures_attributes.push(outcome_measure_hash)
    end
    rollback_params2[:outcome_measures_attributes] = outcome_measures_attributes

    other_criteria_attributes = []
    @trial.other_criteria.each do |other_criterium|
      other_criterium_hash = {id: other_criterium.id, _destroy: true}
      other_criteria_attributes.push(other_criterium_hash)
    end
    rollback_params[:other_criteria_attributes] = other_criteria_attributes
    other_criteria_attributes = []
    trial_history.snapshot['other_criteria'].each do |other_criterium|
      other_criterium_hash = {criteria_type: other_criterium['criteria_type'],
                              criteria_desc: other_criterium['criteria_desc'], index: other_criterium['index']}
      other_criteria_attributes.push(other_criterium_hash)
    end
    rollback_params2[:other_criteria_attributes] = other_criteria_attributes

    markers_attributes = []
    @trial.markers.each do |marker|
      marker_hash = {id: marker.id, _destroy: true}
      markers_attributes.push(marker_hash)
    end
    rollback_params[:markers_attributes] = markers_attributes
    markers_attributes = []
    trial_history.snapshot['markers'].each do |marker|
      marker_hash = {name: marker['name'], record_status: marker['record_status'],
                     biomarker_use_id: marker['biomarker_use_id'],
                     evaluation_type_other: marker['evaluation_type_other'],
                     assay_type_other: marker['assay_type_other'], specimen_type_other: marker['specimen_type_other'],
                     protocol_marker_name: marker['protocol_marker_name'], cadsr_marker_id: marker['cadsr_marker_id']}
      markers_attributes.push(marker_hash)
    end
    rollback_params2[:markers_attributes] = markers_attributes

    interventions_attributes = []
    @trial.interventions.each do |intervention|
      intervention_hash = {id: intervention.id, _destroy: true}
      interventions_attributes.push(intervention_hash)
    end
    rollback_params[:interventions_attributes] = interventions_attributes
    interventions_attributes = []
    trial_history.snapshot['interventions'].each do |intervention|
      intervention_hash = {name: intervention['name'], other_name: intervention['other_name'],
                           description: intervention['description'],
                           intervention_type_id: intervention['intervention_type_id'],
                           index: intervention['index'], c_code: intervention['c_code']}
      interventions_attributes.push(intervention_hash)
    end
    rollback_params2[:interventions_attributes] = interventions_attributes

    arms_groups_attributes = []
    @trial.arms_groups.each do |arms_group|
      arms_group_hash = {id: arms_group.id, _destroy: true}
      arms_groups_attributes.push(arms_group_hash)
    end
    rollback_params[:arms_groups_attributes] = arms_groups_attributes
    arms_groups_attributes = []
    trial_history.snapshot['arms_groups'].each do |arms_group|
      arms_group_hash = {label: arms_group['label'], description: arms_group['description'],
                         arms_groups_type: arms_group['arms_groups_type']}
      arms_groups_attributes.push(arms_group_hash)
    end
    rollback_params2[:arms_groups_attributes] = arms_groups_attributes

    sub_groups_attributes = []
    @trial.sub_groups.each do |sub_group|
      sub_group_hash = {id: sub_group.id, _destroy: true}
      sub_groups_attributes.push(sub_group_hash)
    end
    rollback_params[:sub_groups_attributes] = sub_groups_attributes
    sub_groups_attributes = []
    trial_history.snapshot['sub_groups'].each do |sub_group|
      sub_group_hash = {label: sub_group['label'], description: sub_group['description'], index: sub_group['index']}
      sub_groups_attributes.push(sub_group_hash)
    end
    rollback_params2[:sub_groups_attributes] = sub_groups_attributes

    participating_sites_attributes = []
    @trial.participating_sites.each do |participating_site|
      participating_site_hash = {id: participating_site.id, _destroy: true}
      participating_sites_attributes.push(participating_site_hash)
    end
    rollback_params[:participating_sites_attributes] = participating_sites_attributes
    participating_sites_attributes = []
    trial_history.snapshot['participating_sites'].each do |participating_site|
      participating_site_hash = {protocol_id: participating_site['protocol_id'],
                                 program_code: participating_site['program_code'],
                                 contact_name: participating_site['contact_name'],
                                 contact_phone: participating_site['contact_phone'],
                                 contact_email: participating_site['contact_email'],
                                 organization_id: participating_site['organization_id'],
                                 person_id: participating_site['person_id'], extension: participating_site['extension'],
                                 contact_type: participating_site['contact_type'],
                                 local_trial_identifier: participating_site['local_trial_identifier']}
      participating_sites_attributes.push(participating_site_hash)
    end
    rollback_params2[:participating_sites_attributes] = participating_sites_attributes

    citations_attributes = []
    @trial.citations.each do |citation|
      citation_hash = {id: citation.id, _destroy: true}
      citations_attributes.push(citation_hash)
    end
    rollback_params[:citations_attributes] = citations_attributes
    citations_attributes = []
    trial_history.snapshot['citations'].each do |citation|
      citation_hash = {pub_med_id: citation['pub_med_id'], description: citation['description'],
                       results_reference: citation['results_reference']}
      citations_attributes.push(citation_hash)
    end
    rollback_params2[:citations_attributes] = citations_attributes

    links_attributes = []
    @trial.links.each do |link|
      link_hash = {id: link.id, _destroy: true}
      links_attributes.push(link_hash)
    end
    rollback_params[:links_attributes] = links_attributes
    links_attributes = []
    trial_history.snapshot['links'].each do |link|
      link_hash = {url: link['url'], description: link['description']}
      links_attributes.push(link_hash)
    end
    rollback_params2[:links_attributes] = links_attributes

    diseases_attributes = []
    @trial.diseases.each do |disease|
      disease_hash = {id: disease.id, _destroy: true}
      diseases_attributes.push(disease_hash)
    end
    rollback_params[:diseases_attributes] = diseases_attributes
    diseases_attributes = []
    trial_history.snapshot['diseases'].each do |disease|
      disease_hash = {preferred_name: disease['preferred_name'], code: disease['code'],
                      thesaurus_id: disease['thesaurus_id'], display_name: disease['display_name'],
                      parent_preferred: disease['parent_preferred'], rank: disease['rank']}
      diseases_attributes.push(disease_hash)
    end
    rollback_params2[:diseases_attributes] = diseases_attributes

    collaborators_attributes = []
    @trial.collaborators.each do |collaborator|
      collaborator_hash = {id: collaborator.id, _destroy: true}
      collaborators_attributes.push(collaborator_hash)
    end
    rollback_params[:collaborators_attributes] = collaborators_attributes
    collaborators_attributes = []
    trial_history.snapshot['collaborators'].each do |collaborator|
      collaborator_hash = {org_name: collaborator['org_name'], organization_id: collaborator['organization_id']}
      collaborators_attributes.push(collaborator_hash)
    end
    rollback_params2[:collaborators_attributes] = collaborators_attributes

    trial_ownerships_attributes = []
    @trial.trial_ownerships.each do |trial_ownership|
      trial_ownership_hash = {id: trial_ownership.id, _destroy: true}
      trial_ownerships_attributes.push(trial_ownership_hash)
    end
    rollback_params[:trial_ownerships_attributes] = trial_ownerships_attributes
    trial_ownerships_attributes = []
    trial_history.snapshot['trial_ownerships'].each do |trial_ownership|
      trial_ownership_hash = {user_id: trial_ownership['user_id']}
      trial_ownerships_attributes.push(trial_ownership_hash)
    end
    rollback_params2[:trial_ownerships_attributes] = trial_ownerships_attributes

    anatomic_site_wrappers_attributes = []
    @trial.anatomic_site_wrappers.each do |anatomic_site_wrapper|
      anatomic_site_wrapper_hash = {id: anatomic_site_wrapper.id, _destroy: true}
      anatomic_site_wrappers_attributes.push(anatomic_site_wrapper_hash)
    end
    rollback_params[:anatomic_site_wrappers_attributes] = anatomic_site_wrappers_attributes
    anatomic_site_wrappers_attributes = []
    trial_history.snapshot['anatomic_site_wrappers'].each do |anatomic_site_wrapper|
      anatomic_site_wrapper_hash = {anatomic_site_id: anatomic_site_wrapper['anatomic_site_id']}
      anatomic_site_wrappers_attributes.push(anatomic_site_wrapper_hash)
    end
    rollback_params2[:anatomic_site_wrappers_attributes] = anatomic_site_wrappers_attributes

    ActiveRecord::Base.transaction do
      @trial.update(rollback_params)
      @trial.update(rollback_params2)

      # Mark documents uploaded in this submission as 'deleted'
      docs = TrialDocument.where('trial_id = ? AND submission_id = ?', @trial.id, submission_id)
      docs.each do |doc|
        doc.status = 'deleted'
        doc.save
      end
    end
  end

  def send_email(edit_type)

    if !['original', 'complete', 'update', 'amend', 'submission_rejected_ori', 'submission_rejected_amd', 'submission_accepted_ori', 'submission_accepted_amd'].include?(edit_type)
      # do not send email for other types of update
      return
    end

    last_submission = @trial.submissions.last
    last_sub_type = last_submission.submission_type if last_submission.present?
    last_sub_method = last_submission.submission_method if last_submission.present?
    last_submitter = last_submission.user if last_submission.present?
    last_submitter_name = last_submitter.nil? ? '' : "#{last_submitter.first_name} #{last_submitter.last_name}"
    last_submitter_name.strip!
    last_submitter_name = 'CTRP User' if last_submitter_name.blank?
    last_submission_date = last_submission.nil? ? '' : (last_submission.submission_date.nil? ? '' : last_submission.submission_date.strftime('%d-%b-%Y'))
    lead_protocol_id = @trial.lead_protocol_id.present? ? @trial.lead_protocol_id : ''
    trial_title = @trial.official_title.present? ? @trial.official_title : ''
    nci_id = @trial.nci_id.present? ? @trial.nci_id : ''
    org_name = ''
    org_id = ''
    if @trial.lead_org.present?
      org_name = @trial.lead_org.name
      org_id = @trial.lead_org.id.to_s
    end

    # find all those identifiers and populate the fields in the email template
    nct_origin_id = ProtocolIdOrigin.find_by_code('NCT').id
    ctep_origin_id = ProtocolIdOrigin.find_by_code('CTEP').id
    dcp_origin_id = ProtocolIdOrigin.find_by_code('DCP').id
    nctIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == nct_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == nct_origin_id} : nil
    nctIdentifier = nctIdentifierObj.present? ? nctIdentifierObj.protocol_id : nil
    ctepIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == ctep_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == ctep_origin_id} : nil
    ctepIdentifier = ctepIdentifierObj.present? ? ctepIdentifierObj.protocol_id : nil
    dcpIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == dcp_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == dcp_origin_id} : nil
    dcpIdentifier = dcpIdentifierObj.present? ? dcpIdentifier.protocol_id : nil

    otherIdStr = ''
    @trial.other_ids.each do |other_id|
      otherIdStr += "<p><b>#{other_id.protocol_id_origin.name}: </b>#{other_id.protocol_id}</p>"
    end

    last_amend_num = last_submission.nil? ? '' : (last_submission.amendment_num.present? ? last_submission.amendment_num : '')
    trial_amend_date = last_submission.nil? ? '' : (last_submission.amendment_date.present? ? Date.strptime(last_submission.amendment_date.to_s, "%Y-%m-%d").strftime("%d-%b-%Y") : '')

    mail_template = nil

    if last_sub_type.present? && last_sub_method.present?
      if last_sub_type.code == 'ORI' && last_sub_method.code == 'REG' && !@trial.edit_type.include?('submission')
        mail_template = MailTemplate.find_by_code('TRIAL_REG')

        if mail_template.present?

          ## populate the mail_template with data for trial registration
          mail_template.to = @trial.current_user.present? && @trial.current_user.email.present? && @trial.current_user.receive_email_notifications ? @trial.current_user.email : nil

          unless (mail_template.to.blank?)

            # Populate the trial data in the email body
            mail_template.subject.sub!('${nciTrialIdentifier}', nci_id)
            mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
            mail_template.body_html.sub!('${trialTitle}', trial_title)

            table = '<table border="0">'
            table += "<tr><td><b>Lead Organization Trial ID:</b></td><td>#{lead_protocol_id}</td></tr>"
            table += "<tr><td><b>Lead Organization:</b></td><td>#{org_name}</td></tr>"
            table += "<tr><td><b>NCI Trial ID:</b></td><td>#{nci_id}</td></tr>"
            @trial.other_ids.each do |other_id|
              table += "<tr><td><b>#{other_id.protocol_id_origin.name}:</b></td><td>#{other_id.protocol_id}</td></tr>"
            end
            table += '</table>'
            mail_template.body_html.sub!('${trialIdentifiers}', table)

            mail_template.body_html.sub!('${submissionDate}', last_submission_date)
            mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
            mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)
            mail_template.body_html.sub!('${nciTrialIdentifier}', nci_id)

          end
        end

      elsif last_sub_type.code == 'UPD' && !@trial.edit_type.include?('submission')
        mail_template = MailTemplate.find_by_code('TRIAL_UPDATE')

        if mail_template.present?

          ## populate the mail_template with data for trial update
          mail_template.to =  @trial.current_user.present? && @trial.current_user.email.present? && @trial.current_user.receive_email_notifications ? @trial.current_user.email : nil

          unless (mail_template.to.blank?)
            mail_template.from = 'ncictro@mail.nih.gov'
            mail_template.subject.sub!('${nciTrialIdentifier}', nci_id)
            mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
            mail_template.body_html.sub!('${trialTitle}', trial_title)
            mail_template.body_html.sub!('${nciTrialIdentifier}', nci_id)
            mail_template.body_html.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
            mail_template.body_html.sub!('${ctrp_assigned_lead_org_id}', org_id)
            mail_template.body_html.sub!('${submitting_organization}', org_name)
            mail_template.body_html.sub!('${submissionDate}', last_submission_date)
            mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
            mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)
          end
        end

      elsif @trial.edit_type.include?('submission')
        if @trial.edit_type == 'submission_accepted_ori'
          mail_template = MailTemplate.find_by_code('ORI_SUB_ACCEPTED')
        elsif @trial.edit_type == 'submission_rejected_ori'
          mail_template = MailTemplate.find_by_code('ORI_SUB_REJECTED')
        elsif @trial.edit_type == 'submission_accepted_amd'
          mail_template = MailTemplate.find_by_code('AMEND_SUB_ACCEPTED')
        elsif @trial.edit_type == 'submission_rejected_amd'
          mail_template = MailTemplate.find_by_code('AMEND_SUB_REJECTED')
        end

        trial_owner = TrialOwnership.find_by_trial_id(@trial.id) # send email to trial owner
        trial_owners_email = trial_owner.nil? ? nil : trial_owner.user.email

        if mail_template.present?

          ## populate the mail_template with data for trial update
          mail_template.to =  trial_owners_email.present? && trial_owner.user.receive_email_notifications ? trial_owners_email : nil

          unless (mail_template.to.blank?)
            mail_template.from = 'ncictro@mail.nih.gov'

            mail_template.subject.sub!('${amendNum}', last_amend_num)  # for amendment trials
            mail_template.body_html.sub!('${amendNum}', last_amend_num) # for amendment trials
            mail_template.body_html.sub!('${submissionDate}', trial_amend_date) # for amendment trials

            mail_template.subject.sub!('${nciTrialIdentifier}', nci_id)
            mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
            mail_template.body_html.sub!('${trialTitle}', trial_title)
            mail_template.body_html.sub!('${nciTrialIdentifier}', nci_id)
            mail_template.body_html.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
            mail_template.body_html.sub!('${ctrp_assigned_lead_org_id}', org_id)
            mail_template.body_html.sub!('${leadOrgName}', org_name)
            mail_template.body_html.sub!('${submissionDate}', last_submission_date)
            mail_template.body_html.sub!('${nctId}', nctIdentifier.nil? ? '' : nctIdentifier)
            mail_template.body_html.sub!('${ctepId}', ctepIdentifier.nil? ? '' : ctepIdentifier)
            mail_template.body_html.sub!('${dcpId}', dcpIdentifier.nil? ? '' : dcpIdentifier)
            mail_template.body_html.sub!('${otherIds}', otherIdStr)
            mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
            mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)
          end
        end

      elsif last_sub_type.code == 'AMD' && !@trial.edit_type.include?('submission')  # must not be submission_accepted/rejected
        mail_template = MailTemplate.find_by_code('TRIAL_AMEND')

        if mail_template.present?

          ## populate the mail_template with data for trial amendment
          mail_template.to =  @trial.current_user.present? && @trial.current_user.email.present? && @trial.current_user.receive_email_notifications ? @trial.current_user.email : nil

          unless (mail_template.to.blank?)
            mail_template.from = 'ncictro@mail.nih.gov'
            mail_template.subject.sub!('${trialAmendNumber}', last_amend_num)
            mail_template.subject.sub!('${nciTrialIdentifier}', nci_id)
            mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
            mail_template.body_html.sub!('${trialTitle}', trial_title)
            mail_template.body_html.sub!('${nciTrialIdentifier}', nci_id)
            mail_template.body_html.sub!('${lead_organization}', org_name)
            mail_template.body_html.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
            mail_template.body_html.sub!('${ctrp_assigned_lead_org_id}', org_id)

            mail_template.body_html.sub!('${nctId}', nctIdentifier.nil? ? '' : nctIdentifier)
            mail_template.body_html.sub!('${ctepId}', ctepIdentifier.nil? ? '' : ctepIdentifier)
            mail_template.body_html.sub!('${dcpId}', dcpIdentifier.nil? ? '' : dcpIdentifier)

            mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
            mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)

            mail_template.body_html.sub!('${trialAmendNumber}', last_amend_num)
            mail_template.body_html.sub!('${trialAmendmentDate}', trial_amend_date)
          end
        end
      end

    elsif @trial.is_draft == TRUE  && !@trial.edit_type.include?('submission')
      mail_template = MailTemplate.find_by_code('TRIAL_DRAFT')

      if mail_template.present?

        ## populate the mail_template with data for trial draft
        mail_template.to =  @trial.current_user.present? && @trial.current_user.email.present? && @trial.current_user.receive_email_notifications ? @trial.current_user.email : nil

        unless (mail_template.to.blank?)
          mail_template.from = 'ncictro@mail.nih.gov'
          mail_template.to = @trial.current_user.email if @trial.current_user.present? && @trial.current_user.email.present? && @trial.current_user.receive_email_notifications
          mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
          mail_template.body_html.sub!('${trialTitle}', trial_title)
          mail_template.body_html.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
          mail_template.body_html.sub!('${lead_organization}', org_name)
          mail_template.body_html.sub!('${ctrp_assigned_lead_org_id}', org_id)
          mail_template.body_html.sub!('${submissionDate}', last_submission_date)
          mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
          mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)
        end
      end

    end

    CtrpMailerWrapper.send_email(mail_template, @trial)
  end
end
