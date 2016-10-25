json.trials do
  json.array!(@trials) do |trial|
    json.extract! trial, :id, :lead_protocol_id, :nci_id, :official_title, :pilot
    json.phase trial.phase.present? ? trial.phase.name : nil
    json.purpose trial.primary_purpose.present? ? trial.primary_purpose.name : nil
    json.pi trial.pi.present? ? trial.pi.lname + ', ' + trial.pi.fname : nil
    json.lead_org trial.lead_org.present? ? trial.lead_org.name : nil
    json.sponsor trial.sponsor.present? ? trial.sponsor.name : nil
    json.study_source trial.study_source.present? ? trial.study_source.name : nil
    json.current_trial_status trial.trial_status_wrappers.present? ? trial.trial_status_wrappers.last.trial_status.name : nil
    current_submission = trial.current_submission
    if current_submission.present? && current_submission.processing_status_wrappers.last.present?
      json.current_processing_status current_submission.processing_status_wrappers.last.processing_status.name
    else
      json.current_precessing_status nil
    end
    current_milestone = current_submission.milestone_wrappers.present? ? current_submission.milestone_wrappers.last.milestone.name : nil
    json.current_milestone current_milestone
    json.scientific_milestone  ""
    if  trial.milestone_wrappers.present?
      if current_milestone.include?("Scientific")
        json.scientific_milestone current_milestone
      else
        science_milestones = trial.milestone_wrappers.select{|x| x.milestone.name.include?("Scientific")}
        unless science_milestones.empty?
          json.scientific_milestone science_milestones.last.milestone.name
        end
      end
    end

    json.admin_milestone  ""
    if  trial.milestone_wrappers.present?
      if current_milestone.include?("Admin")
        json.admin_milestone current_milestone
      else
        admin_milestones = trial.milestone_wrappers.select{|x| x.milestone.name.include?("Admin")}
        unless admin_milestones.empty?
          json.admin_milestone admin_milestones.last.milestone.name
        end
      end
    end

    json.other_ids  ""
    if trial.other_ids.present?
      other_ids = trial.other_ids
      other_ids_string = ""
      delimiter = ""
      other_ids.each do |o|
        next if o.protocol_id_origin.nil?
        name = o.protocol_id_origin.name
        unless name.nil?
          name.gsub!("Identifier", "")
          other_ids_string = other_ids_string + delimiter + name + o.protocol_id
          delimiter = ";  "
        end
      end
      json.other_ids  other_ids_string
    end

    #json.current_processing_status trial.processing_status_wrappers.present? ? trial.processing_status_wrappers.last.processing_status.name : nil
    json.research_category trial.research_category.present? ? trial.research_category.name : nil

    if !current_submission.nil? && !current_submission.submission_type.nil?
      json.submission_type  current_submission.submission_type.name
    else
      json.submission_type ""
    end
    if !current_submission.nil? && !current_submission.submission_method.nil?
      json.submission_method  current_submission.submission_method.name
    else
      json.submission_method ""
    end
    if !current_submission.nil? && !current_submission.submission_source.nil?
      json.submission_source  current_submission.submission_source.name
    else
      json.submission_source ""
    end
    json.nih_nci_div trial.nih_nci_div.present? ? trial.nih_nci_div : nil
    json.nih_nci_prog trial.nih_nci_prog.present? ? trial.nih_nci_prog : nil
    json.internal_source trial.internal_source.present? ? trial.internal_source.name : nil
    
    json.url trial_url(trial, format: :json)
    #json.actions trial.actions
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @trials.respond_to?(:total_count) ? @trials.total_count : @trials.size
json.sort params[:sort]
json.order params[:order]
