if @searchAccess
  json.trial_submissions do
    json.array!(@trial_submissions) do |trial_submission|

      json.extract! trial_submission,
                    :id,
                    :trial_id,
                    :user_id,
                    :nci_id,
                    :checkout,
                    :official_title,
                    :onhold_date,
                    :onhold_name,
                    :onhold_desc,
                    :comp_date,
                    :lead_protocol_id,
                    :lead_org_id,
                    :lead_org_name,
                    :ctep_id,
                    :submission_type_label,
                    :current_milestone_name,
                    :submission_received_date,
                    :validation_processing_start_date,
                    :validation_processing_completed_date,
                    :submission_acceptance_date,
                    :submission_terminated_date,
                    :submission_reactivated_date,
                    :submission_rejected_date,
                    :administrative_processing_start_date,
                    :administrative_processing_completed_date,
                    :administrative_qc_ready_date,
                    :administrative_qc_start_date,
                    :administrative_qc_completed_date,
                    :scientific_processing_start_date,
                    :scientific_processing_completed_date,
                    :scientific_qc_ready_date,
                    :scientific_qc_start_date,
                    :scientific_qc_completed_date,
                    :trial_summary_report_ready_date,
                    :trial_summary_report_date,
                    :submitter_trial_summary_report_feedback_date,
                    :initial_abstraction_verified_date,
                    :ongoing_abstraction_verified_date,
                    :late_rejection_date,
                    :expected_abstraction_completion_date,
                    :expected_abstraction_completion_date_comments,
                    :business_days_since_submitted,
                    :current_submission_date,
                    :current_administrative_milestone,
                    :current_scientific_milestone,
                    :process_priority,
                    :current_processing_status,
                    :current_processing_status_date,
                    :dcp_id,
                    :clinical_research_category,
                    :submission_method_name,
                    :verification_date

    end
  end

  json.start params[:start]
  json.rows params[:rows]
  json.total @trial_submissions.respond_to?(:total_count) ? @trial_submissions.total_count : @trial_submissions.size
  json.sort params[:sort]
  json.order params[:order]

  json.userWriteAccess @userWriteAccess
  json.userReadAccess @userReadAccess
  json.search_access @searchAccess
else
  json.search_access @searchAccess
end
