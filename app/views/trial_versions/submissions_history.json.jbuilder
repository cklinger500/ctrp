json.trial_versions do
  json.array!(@submissions) do |submission|

    json.submission_num submission.submission_num
    json.id submission.id
    json.submission_date submission.submission_date
    submission_type = SubmissionType.find_by_id(submission.submission_type_id).name
    Array submission_type_list= Array.new
    submission_type_list.push(submission_type)

    if submission_type=="Amendment"
     reason=AmendmentReason.find_by_id(submission.amendment_reason_id).name if submission.amendment_reason_id
      submission_type_list.push('Date: ' + submission.amendment_date.strftime("%d-%h-%Y").to_s)
      submission_type_list.push('Reason: ' + reason.to_s)
      submission_type_list.push('Number: '  +submission.amendment_num.to_s)
    end

    p submission_type_list

    json.submission_type submission_type
    json.submission_type_list submission_type_list.join("; ")
    json.amendment_reason_id submission.amendment_reason_id
    json.amendment_num submission.amendment_num

    submission_version = TrialVersion.find_by_item_type_and_item_id("Submission", submission.id)

    docs= TrialDocument.where("submission_id = ? and document_type != ? ",submission.id,"TSR");

    docs.each do |doc|
     if doc.source_document == "Registry"
       doc.source_document  = "Original"
     else
       doc.source_document = ""
     end
    end
    json.first_four_docs docs.first(4)
    json.docs docs
    json.docs_size docs.size


    milestone = MilestoneWrapper.where("submission_id = ?", submission.id).reorder("created_at ASC").last

    if milestone
        milestone_date =  milestone.milestone_date
        milestone_name =  Milestone.find_by_id(milestone.milestone_id).name
        Array milestone = Array.new

        milestone.push(milestone_date.strftime("%d-%h-%Y")) if milestone_date
        milestone.push(milestone_name)
        json.milestone milestone
    end

    json.is_rejected submission.trial.is_rejected

  end

end


json.amendement_reasons AmendmentReason.all

json.start params[:start]
json.rows params[:rows]
json.total @submissions.respond_to?(:total_count) ? @submissions.total_count : @submissions.size
