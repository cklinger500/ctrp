# == Schema Information
#
# Table name: submissions
#
#  id                   :integer          not null, primary key
#  submission_num       :integer
#  submission_date      :date
#  amendment_date       :date
#  amendment_reason_id  :integer
#  trial_id             :integer
#  created_at           :datetime
#  updated_at           :datetime
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#  amendment_num        :string(255)
#  submission_type_id   :integer
#  submission_source_id :integer
#  submission_method_id :integer
#  user_id              :integer
#  acknowledge          :string(255)
#  acknowledge_comment  :text
#  acknowledge_date     :date
#  acknowledged_by      :string(255)
#  status               :string
#
# Indexes
#
#  index_submissions_on_amendment_reason_id   (amendment_reason_id)
#  index_submissions_on_submission_method_id  (submission_method_id)
#  index_submissions_on_submission_source_id  (submission_source_id)
#  index_submissions_on_submission_type_id    (submission_type_id)
#  index_submissions_on_trial_id              (trial_id)
#  index_submissions_on_user_id               (user_id)
#
# rubocop:disable ClassLength
#

class Submission < TrialBase
  include BasicConcerns

  belongs_to :amendment_reason
  belongs_to :trial
  belongs_to :submission_type
  belongs_to :submission_source
  belongs_to :submission_method
  belongs_to :user
  has_many :milestone_wrappers, -> { order 'milestone_wrappers.id' }
  has_many :processing_status_wrappers, -> { order 'processing_status_wrappers.id' }
  has_many :trial_documents, -> { order 'trial_documents.id' }

  before_create :set_acknowledge_as_no
  before_create :set_submission_status
  before_create :set_expected_abstraction_completion_date

  ## Audit Trail Callbacks
  #after_save :touch_trial      ##Commented out since When a trial updated , amended, or created then only submission create.
  #after_destroy :touch_trial   ##Commented out since A submission will never be destroyed

  def set_acknowledge_as_no
    self.acknowledge = 'No'
  end

  def set_submission_status
    self.status = 'Active' if self.status.nil?
  end

  def set_expected_abstraction_completion_date
    self.expected_abstraction_completion_date = 10.business_days.from_now
  end

  def business_days_since_submitted
    business_days = nil
    date = DateTime.now.to_date
    createDate = self.submission_date
    if !createDate
      createDate = self.amendment_date
    end
    if createDate
      business_days = 0
      date2 = createDate.to_date
      while date > date2
        business_days = business_days + 1 unless !date.workday?
        date = date - 1.day
      end
    end
    business_days
  end

  scope :matches, -> (column, value) { where("#{column} = ?", "#{value}") }

  scope :matchesTrialSubmissions, -> (params, protocol_source_id_imp, protocol_source_id_pro) {
    time_parser_start = "to_char((("
    time_parser_end = " AT TIME ZONE 'UTC') AT TIME ZONE '" + Time.now.in_time_zone(Rails.application.config.time_zone).strftime('%Z') + "'),  'DD-Mon-yyyy')"
    join_clause  = "INNER JOIN trials ON submissions.trial_id = trials.id "
    join_clause += "LEFT JOIN users ON submissions.user_id = users.id "
    join_clause += "LEFT JOIN research_categories as trial_research_category ON trials.research_category_id = trial_research_category.id "
    join_clause += "LEFT JOIN submission_methods as submission_method ON submissions.submission_method_id = submission_method.id "
    join_clause += "LEFT JOIN organizations as trial_lead_org ON trial_lead_org.id = trials.lead_org_id "

    ## for onholds we are first filtering all future dates
    ## we will not filter out older dates because we need to keep track of trials that were 'ever' onhold.
    join_clause += "LEFT JOIN (
                        select DISTINCT ON (trial_id) " + time_parser_start + "onhold_date" + time_parser_end + " as onhold_date, offhold_date, onhold_code, onhold_name, onhold_desc, trial_id from
                            (
                              select onholds.trial_id, onholds.onhold_date, onhold_reasons.code as onhold_code, onhold_reasons.name as onhold_name, onholds.onhold_desc, onholds.offhold_date from onholds
                              LEFT JOIN onhold_reasons on onhold_reasons.id = onhold_reason_id
                            ) as on_holds
                        where (on_holds.offhold_date is null OR on_holds.offhold_date <= now()::date)
                        AND (on_holds.onhold_date is null OR on_holds.onhold_date <= now()::date)
                        order by trial_id, onhold_date desc
                    ) as trial_onholds ON trials.id = trial_onholds.trial_id "

    join_clause += "INNER JOIN (
                        with temp as (
                            select milestone_wrappers.id, milestone_wrappers.trial_id, milestone_wrappers.created_at, submission_id, milestones.name, milestones.code
                              from milestone_wrappers inner join milestones
                              on milestones.id = milestone_wrappers.milestone_id
                              order by trial_id desc, id desc
                        )
                        select DISTINCT ON (trial_id)
                            submission_id,
                            current_milestone_code,
                            current_milestone_name,
                            current_processing_status,
                            current_processing_status_code,
                            dcp_id,
                            ctep_id,
                            " + time_parser_start + "current_processing_status_date" + time_parser_end + " as current_processing_status_date,
                            " + time_parser_start + "submission_current_date" + time_parser_end + " as current_submission_date,
                            " + time_parser_start + "submission_received_date" + time_parser_end + " as SRD,
                            " + time_parser_start + "validation_processing_start_date" + time_parser_end + " as VPS,
                            " + time_parser_start + "validation_processing_completed_date" + time_parser_end + " as VPC,
                            " + time_parser_start + "submission_acceptance_date" + time_parser_end + " as SAC,
                            " + time_parser_start + "submission_terminated_date" + time_parser_end + " as STR,
                            " + time_parser_start + "submission_reactivated_date" + time_parser_end + " as SRE,
                            " + time_parser_start + "submission_rejected_date" + time_parser_end + " as SRJ,
                            " + time_parser_start + "administrative_processing_start_date" + time_parser_end + " as APS,
                            " + time_parser_start + "administrative_processing_completed_date" + time_parser_end + " as APC,
                            " + time_parser_start + "administrative_qc_ready_date" + time_parser_end + " as RAQ,
                            " + time_parser_start + "administrative_qc_start_date" + time_parser_end + " as AQS,
                            " + time_parser_start + "administrative_qc_completed_date" + time_parser_end + " as AQC,
                            " + time_parser_start + "scientific_processing_start_date" + time_parser_end + " as SPS,
                            " + time_parser_start + "scientific_processing_completed_date" + time_parser_end + " as SPC,
                            " + time_parser_start + "scientific_qc_ready_date" + time_parser_end + " as RSQ,
                            " + time_parser_start + "scientific_qc_start_date" + time_parser_end + " as SQS,
                            " + time_parser_start + "scientific_qc_completed_date" + time_parser_end + " as SQC,
                            " + time_parser_start + "trial_summary_report_ready_date" + time_parser_end + " as RTS,
                            " + time_parser_start + "trial_summary_report_date" + time_parser_end + " as TSR,
                            " + time_parser_start + "submitter_trial_summary_report_feedback_date" + time_parser_end + " as STS,
                            " + time_parser_start + "initial_abstraction_verified_date" + time_parser_end + " as IAV,
                            " + time_parser_start + "ongoing_abstraction_verified_date" + time_parser_end + " as ONG,
                            " + time_parser_start + "late_rejection_date" + time_parser_end + " as LRD,
                            CASE GREATEST(administrative_processing_start_date,
                                          administrative_processing_completed_date,
                                          administrative_qc_ready_date,
                                          administrative_qc_start_date,
                                          administrative_qc_completed_date)
                                WHEN administrative_processing_start_date       THEN ('Administrative Processing Start, ' || " + time_parser_start + "administrative_processing_start_date" + time_parser_end + ")
                                WHEN administrative_processing_completed_date   THEN ('Administrative Processing Completed, ' || " + time_parser_start + "administrative_processing_completed_date" + time_parser_end + ")
                                WHEN administrative_qc_ready_date               THEN ('Administrative QC Ready, ' || " + time_parser_start + "administrative_qc_ready_date" + time_parser_end + ")
                                WHEN administrative_qc_start_date               THEN ('Administrative QC Start, ' || " + time_parser_start + "administrative_qc_start_date" + time_parser_end + ")
                                WHEN administrative_qc_completed_date           THEN ('Administrative QC Completed, ' || " + time_parser_start + "administrative_qc_completed_date" + time_parser_end + ")
                            END as current_administrative_milestone,
                            CASE GREATEST(scientific_processing_start_date,
                                          scientific_processing_completed_date,
                                          scientific_qc_ready_date,
                                          scientific_qc_start_date,
                                          scientific_qc_completed_date)
                                WHEN scientific_processing_start_date       THEN ('Scientific Processing Start, ' || " + time_parser_start + "scientific_processing_start_date" + time_parser_end + ")
                                WHEN scientific_processing_completed_date   THEN ('Scientific Processing Completed, ' || " + time_parser_start + "scientific_processing_completed_date" + time_parser_end + ")
                                WHEN scientific_qc_ready_date               THEN ('Scientific QC Ready, ' || " + time_parser_start + "scientific_qc_ready_date" + time_parser_end + ")
                                WHEN scientific_qc_start_date               THEN ('Scientific QC Start, ' || " + time_parser_start + "scientific_qc_start_date" + time_parser_end + ")
                                WHEN scientific_qc_completed_date           THEN ('Scientific QC Completed, ' || " + time_parser_start + "scientific_qc_completed_date" + time_parser_end + ")
                            END as current_scientific_milestone



                        from (
                            temp
                            left join
                            (select DISTINCT ON (submission_id) submission_id as id1, created_at as submission_received_date from temp where code = 'SRD'
                             order by submission_id, id desc) as submission_received_milestone
                             on submission_received_milestone.id1 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id2, created_at as validation_processing_start_date from temp where code = 'VPS'
                             order by submission_id, id desc) as validation_processing_started_milestone
                            on validation_processing_started_milestone.id2 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id3, created_at as validation_processing_completed_date from temp where code = 'VPC'
                             order by submission_id, id desc) as validation_processing_completed_milestone
                            on validation_processing_completed_milestone.id3 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id4, created_at as submission_acceptance_date from temp where code = 'SAC'
                             order by submission_id, id desc) as submission_acceptance_milestone
                            on submission_acceptance_milestone.id4 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id5, created_at as submission_terminated_date from temp where code = 'STR'
                             order by submission_id, id desc) as submission_terminated_milestone
                            on submission_terminated_milestone.id5 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id6, created_at as submission_reactivated_date from temp where code = 'SRE'
                             order by submission_id, id desc) as submission_reactivated_milestone
                            on submission_reactivated_milestone.id6 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id7, created_at as submission_rejected_date from temp where code = 'SRJ'
                             order by submission_id, id desc) as submission_rejected_milestone
                            on submission_rejected_milestone.id7 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id8, created_at as administrative_processing_start_date from temp where code = 'APS'
                             order by submission_id, id desc) as administrative_processing_start_milestone
                            on administrative_processing_start_milestone.id8 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id9, created_at as administrative_processing_completed_date from temp where code = 'APC'
                             order by submission_id, id desc) as administrative_processing_completed_milestone
                            on administrative_processing_completed_milestone.id9 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id10, created_at as administrative_qc_ready_date from temp where code = 'RAQ'
                             order by submission_id, id desc) as administrative_qc_ready_milestone
                            on administrative_qc_ready_milestone.id10 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id11, created_at as administrative_qc_start_date from temp where code = 'AQS'
                             order by submission_id, id desc) as administrative_qc_start_milestone
                            on administrative_qc_start_milestone.id11 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id12, created_at as administrative_qc_completed_date from temp where code = 'AQC'
                             order by submission_id, id desc) as administrative_qc_completed_milestone
                            on administrative_qc_completed_milestone.id12 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id13, created_at as scientific_processing_start_date from temp where code = 'SPS'
                             order by submission_id, id desc) as scientific_processing_start_milestone
                            on scientific_processing_start_milestone.id13 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id14, created_at as scientific_processing_completed_date from temp where code = 'SPC'
                             order by submission_id, id desc) as scientific_processing_completed_milestone
                            on scientific_processing_completed_milestone.id14 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id15, created_at as scientific_qc_ready_date from temp where code = 'RSQ'
                             order by submission_id, id desc) as scientific_qc_ready_milestone
                            on scientific_qc_ready_milestone.id15 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id16, created_at as scientific_qc_start_date from temp where code = 'SQS'
                             order by submission_id, id desc) as scientific_qc_start_milestone
                            on scientific_qc_start_milestone.id16 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id17, created_at as scientific_qc_completed_date from temp where code = 'SQC'
                             order by submission_id, id desc) as scientific_qc_completed_milestone
                            on scientific_qc_completed_milestone.id17 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id18, created_at as trial_summary_report_ready_date from temp where code = 'RTS'
                             order by submission_id, id desc) as trial_summary_report_ready_milestone
                            on trial_summary_report_ready_milestone.id18 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id19, created_at as trial_summary_report_date from temp where code = 'TSR'
                             order by submission_id, id desc) as trial_summary_report_milestone
                            on trial_summary_report_milestone.id19 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id20, created_at as submitter_trial_summary_report_feedback_date from temp where code = 'STS'
                             order by submission_id, id desc) as submitter_trial_summary_report_feedback_milestone
                            on submitter_trial_summary_report_feedback_milestone.id20 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id21, created_at as initial_abstraction_verified_date from temp where code = 'IAV'
                             order by submission_id, id desc) as initial_abstraction_verified_milestone
                            on initial_abstraction_verified_milestone.id21 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id22, created_at as ongoing_abstraction_verified_date from temp where code = 'ONG'
                             order by submission_id, id desc) as ongoing_abstraction_verified_milestone
                            on ongoing_abstraction_verified_milestone.id22 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id23, created_at as late_rejection_date from temp where code = 'LRD'
                             order by submission_id, id desc) as late_rejection_milestone
                            on late_rejection_milestone.id23 = temp.submission_id

                            left join
                            (select DISTINCT ON (submission_id) submission_id as id24, code as current_milestone_code, name as current_milestone_name, created_at as submission_current_date, id as mileston_wrapper_id from temp
                             order by submission_id, mileston_wrapper_id desc) as current_milestone
                            on current_milestone.id24 = temp.submission_id


                            left join
                            (
                                with current_processing_statuses as (
                                  select DISTINCT ON (trial_id) trial_id, processing_status_id, processing_status_wrappers.created_at
                                    from processing_status_wrappers
                                    order by trial_id, processing_status_wrappers.created_at desc
                                 )
                                select processing_statuses.name as current_processing_status, processing_statuses.code as current_processing_status_code,
                                  current_processing_statuses.trial_id as processing_trial_id,
                                  current_processing_statuses.created_at as current_processing_status_date
                                from processing_statuses
                                inner join current_processing_statuses
                                on current_processing_statuses.processing_status_id = processing_statuses.id
                            ) as current_processing
                            on current_processing.processing_trial_id = temp.trial_id

                            left join
                            (
                              select trial_id as protocol_trial_id, protocol_id as dcp_id from other_ids
                              inner join
                              ( select id, code from protocol_id_origins where code = 'DCP') as dcp_protocols
                              on dcp_protocols.id = other_ids.protocol_id_origin_id
                            ) as dcp_protocol_id
                            on dcp_protocol_id.protocol_trial_id = temp.trial_id

                            left join
                            (
                              select trial_id as protocol_trial_id, protocol_id as ctep_id from other_ids
                              inner join
                              ( select id, code from protocol_id_origins where code = 'CTEP') as ctep_protocols
                              on ctep_protocols.id = other_ids.protocol_id_origin_id
                            ) as ctep_protocol_id
                            on ctep_protocol_id.protocol_trial_id = temp.trial_id

                        )

                        order by trial_id desc, submission_id desc, id desc

                    ) AS latest_milestones
                   ON submissions.id = latest_milestones.submission_id "

    where_clause = "trials.internal_source_id in
                      (#{protocol_source_id_pro}#{ params[:type] != 'own' ? ("," + protocol_source_id_imp.to_s) : ""})
                    AND submissions.trial_id is not null AND submissions.status = 'Active'
                    AND trials.is_rejected IS NOT true "

    if params[:checked_out_by].present?
      where_clause += "AND LOWER(trials.admin_checkout) like LOWER('%#{params[:checked_out_by]}%') OR LOWER(trials.scientific_checkout) like LOWER('%#{params[:checked_out_by]}%') "
    end
    if params[:submission_date_range_from].present?
      where_clause += "AND to_date(latest_milestones.SRD, 'DD-Mon-yyyy') >= '#{params[:submission_date_range_from]}' "
    end
    if params[:submission_date_range_to].present?
      where_clause += "AND to_date(latest_milestones.SRD, 'DD-Mon-yyyy') <= '#{params[:submission_date_range_to]}' "
    end
    if params[:organization_id].present?
      where_clause += "AND users.organization_id = '#{params[:organization_id]}' "
    end
    if params[:priorities].present? && params[:priorities].select {|_k,v| v == true}.keys.size > 0
      where_clause += "AND trials.process_priority in ('#{params[:priorities].select {|_k,v| v == true}.keys.join("','")}') "
    end
    if params[:submission_types].present?
      #where_clause += "AND submission_type_label in ('#{params[:submission_types].select {|k,v| v == true}.keys.join("','")}') "
    end

    if params[:org_id] && params[:type] == 'participating'
      join_clause += "inner join (
                            select distinct on (participating_sites.trial_id) participating_sites.trial_id
                            from participating_sites where participating_sites.organization_id=#{params[:org_id]}
                        ) as distinct_participating_sites on submissions.trial_id = distinct_participating_sites.trial_id "
    end

    if params[:user_id]
      if params[:type] == 'own'
        where_clause += " AND trial_ownership.user_id = #{params[:user_id]} "
      else
        where_clause += " AND submissions.user_id = #{params[:user_id]} "
      end
      join_clause += "LEFT JOIN (select id as trial_ownership_id, trial_id, user_id from trial_ownerships where ended_at is null) as trial_ownership ON trial_ownership.trial_id = trials.id "
    end

    filter_clause = []
    if !params[:find_submission_received].nil?
      filter_clause.push("latest_milestones.SRD " + ( if params[:find_submission_received] === true then "IS NOT null" else "IS null" end))
    end
    if !params[:find_accepted].nil?
      filter_clause.push("latest_milestones.SAC " + ( if params[:find_accepted] === true then "IS NOT null" else "IS null" end))
    end
    if !params[:find_onhold].nil?
      not_currently_onhold_query = "(trial_onholds.onhold_date IS NULL OR trial_onholds.offhold_date IS NOT NULL)"
      filter_clause.push((params[:find_onhold] == true)? "NOT #{not_currently_onhold_query}" : "#{not_currently_onhold_query}")
    end
    if !params[:find_admin_abstraction_completed].nil?
      filter_clause.push("latest_milestones.APC " + ( (params[:find_admin_abstraction_completed] == true)? "IS NOT null" : "IS null"))
    end
    if !params[:find_admin_qc_completed].nil?
      filter_clause.push("latest_milestones.AQC " + ( (params[:find_admin_qc_completed] == true)? "IS NOT null" : "IS null"))
    end
    if !params[:find_scientific_abstraction_completed].nil?
      filter_clause.push("latest_milestones.SPC " + ( (params[:find_scientific_abstraction_completed] == true)? "IS NOT null" : "IS null"))
    end
    if !params[:find_scientific_qc_completed].nil?
      filter_clause.push("latest_milestones.SQS " + ( (params[:find_scientific_qc_completed] == true)? "IS NOT null" : "IS null"))
    end


    if filter_clause.length > 0
      where_clause += " AND (" + filter_clause.join(" AND ") + ")"
    end
    joins(join_clause).where(where_clause).select("
       DISTINCT submissions.*,

       submission_method.name as submission_method_name,

       trial_research_category.name as clinical_research_category,

       trials.nci_id,
       trials.lead_protocol_id,
       trials.official_title,
       trials.start_date,
       trials.process_priority,
       trials.primary_comp_date,
       " + time_parser_start + "trials.verification_date" + time_parser_end + " as verification_date,
       trials.comp_date,
       trials.admin_checkout,
       trials.scientific_checkout,
	     trim(trailing ', ' from
          concat(
		          substring(trials.admin_checkout, 'by\":\"(.*?)\",\"date') || ' AD, ',
		          substring(trials.scientific_checkout, 'by\":\"(.*?)\",\"date') || ' SC'
		      )
        ) as checkout,

       onhold_date,
       onhold_name,
       onhold_desc,

       latest_milestones.current_milestone_code,
       latest_milestones.current_milestone_name,
       latest_milestones.current_processing_status,
       latest_milestones.current_processing_status_code,
       latest_milestones.dcp_id,
       latest_milestones.ctep_id,
       latest_milestones.current_processing_status_date,
       latest_milestones.current_submission_date,
       latest_milestones.SRD as submission_received_date,
       latest_milestones.VPS as validation_processing_start_date,
       latest_milestones.VPC as validation_processing_completed_date,
       latest_milestones.SAC as submission_acceptance_date,
       latest_milestones.STR as submission_terminated_date,
       latest_milestones.SRE as submission_reactivated_date,
       latest_milestones.SRJ as submission_rejected_date,
       latest_milestones.APS as administrative_processing_start_date,
       latest_milestones.APC as administrative_processing_completed_date,
       latest_milestones.RAQ as administrative_qc_ready_date,
       latest_milestones.AQS as administrative_qc_start_date,
       latest_milestones.AQC as administrative_qc_completed_date,
       latest_milestones.SPS as scientific_processing_start_date,
       latest_milestones.SPC as scientific_processing_completed_date,
       latest_milestones.RSQ as scientific_qc_ready_date,
       latest_milestones.SQS as scientific_qc_start_date,
       latest_milestones.SQC as scientific_qc_completed_date,
       latest_milestones.RTS as trial_summary_report_ready_date,
       latest_milestones.TSR as trial_summary_report_date,
       latest_milestones.STS as submitter_trial_summary_report_feedback_date,
       latest_milestones.IAV as initial_abstraction_verified_date,
       latest_milestones.ONG as ongoing_abstraction_verified_date,
       latest_milestones.LRD as late_rejection_date,
       latest_milestones.current_administrative_milestone,
       latest_milestones.current_scientific_milestone,

       trial_lead_org.id as lead_org_id,
       trial_lead_org.name as lead_org_name,
       (
          CASE
            #{ params[:type] != 'own' ? "WHEN trials.internal_source_id =  " + protocol_source_id_imp.to_s + "THEN 'Imported' " : "" }
            WHEN trials.internal_source_id =  #{protocol_source_id_pro}
              THEN CASE
                WHEN submissions.submission_num = 1
                THEN 'Original'
                WHEN submissions.submission_num > 1
                THEN 'Amendment'
              END
            ELSE ''
          END
       ) as submission_type_label,
       ctep_id,
       dcp_id
    ")
  }

end
