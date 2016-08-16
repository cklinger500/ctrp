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
                    :owner_user_id,
                    :current_submission_date

    end
  end

  json.userWriteAccess @userWriteAccess
  json.userReadAccess @userReadAccess
  json.search_access @searchAccess
else
  json.search_access @searchAccess
end
