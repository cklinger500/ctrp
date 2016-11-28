json.trial_versions do
  json.array!(@submissions) do |submission|


    json.submission_num submission.submission_num
    json.id submission.id
    json.submission_date submission.submission_date
    json.submission_source SubmissionSource.find_by_id(submission.submission_source_id).name
    json.acknowledge_comment submission.acknowledge_comment
    json.acknowledge_date submission.acknowledge_date
    json.acknowledged_by submission.acknowledged_by
    json.acknowledge submission.acknowledge

    submission_version = TrialVersion.find_by_item_type_and_item_id("Submission", submission.id)


    Array updated_fields_array = Array.new

    ##bbased on internal source fields of interest will be changed
    ##internal_source_id

    internal_source_id = Trial.find_by_id(submission.trial_id).internal_source_id

    if !internal_source_id.nil? && internal_source_id == InternalSource.find_by_name("Protocol").id

      other_ids = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "OtherId",submission_version.transaction_id) if submission_version

      if !other_ids.nil? && other_ids.size !=0
        Hash h = Hash.new
        h[:updated_filed]="Other Protocol Identifiers";

        other_ids_string_N = ""
        other_ids_string_O = ""

        delimiter = " | "
        other_ids.each do |o|
          case o.event
            when "destroy"
              protocol_id_N = o.object["protocol_id"]
              protocol_id_origin_id_N = o.object["protocol_id_origin_id"]
              destroy_sign = " (D) "

              other_ids_string_N = other_ids_string_N + delimiter + protocol_id_N.to_s + "   " + protocol_id_origin_id_N.to_s + destroy_sign + delimiter
              other_ids_string_O = ""

            when "create" || "update"
              destroy_sign=""

              protocol_id_N = o.object_changes["protocol_id"][1]
              protocol_id_origin_id_N = o.object_changes["protocol_id_origin_id"][1]

              other_ids_string_N = other_ids_string_N + delimiter + protocol_id_N.to_s + "   " + protocol_id_origin_id_N.to_s + destroy_sign + delimiter

              protocol_id_O = o.object_changes["protocol_id"][0]
              protocol_id_origin_id_O = o.object_changes["protocol_id_origin_id"][0]
              other_ids_string_O = other_ids_string_O + delimiter + protocol_id_O.to_s + "   " + protocol_id_origin_id_O.to_s + destroy_sign + delimiter

            else
              other_ids_string_N =""
              other_ids_string_O =""
          end

        end

        h[:new_value] = other_ids_string_N
        h[:old_value] = other_ids_string_O
        updated_fields_array.push(h)

      end

      grants = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "Grant",submission_version.transaction_id) if submission_version

      puts "Grants "
      puts grants

      if !grants.nil? && grants.size !=0
        Hash h = Hash.new
        h[:updated_filed]="Grant Information(Inst Code, Funding , SNo)";


        grants_string_N = ""
        grants_string_O =""
        delimiter = " |"
        grants.each do |o|
          case o.event
            when "destroy"
              p o.event
              institute_code_N = o.object["institute_code"]
              funding_mechanism_N = o.object["funding_mechanism"]
              serial_number_N = o.object["serial_number"]

              destroy_sign = " (D) "
              grants_string_N = grants_string_N + delimiter + institute_code_N.to_s + "   " + funding_mechanism_N.to_s + "  " + serial_number_N.to_s + destroy_sign + delimiter

              grants_string_O=""

            when "create" || "update"
              institute_code_N = o.object_changes["institute_code"][1]
              funding_mechanism_N = o.object_changes["funding_mechanism"][1]
              serial_number_N = o.object_changes["serial_number"][1]

              destroy_sign = " "
              grants_string_N = grants_string_N + delimiter + institute_code_N.to_s + "   " + funding_mechanism_N.to_s + "  " + serial_number_N.to_s + destroy_sign + delimiter

              institute_code_O = o.object_changes["institute_code"][0]
              funding_mechanism_O = o.object_changes["funding_mechanism"][0]
              serial_number_O = o.object_changes["serial_number"][0]

              grants_string_O = grants_string_O + delimiter + institute_code_O.to_s + "   " + funding_mechanism_O.to_s + "  " + serial_number_O.to_s + destroy_sign + delimiter


            else
              grants_string_O =   " "
              grants_string_N =   " "

          end

        end
        #end
        h[:new_value] = grants_string_N
        h[:old_value] = grants_string_O
        updated_fields_array.push(h)
      end


      trial_statuses = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "TrialStatusWrapper",submission_version.transaction_id) if submission_version

      if !trial_statuses.nil? && trial_statuses.size !=0
        Hash h = Hash.new
        h[:updated_filed]="Trial Status (Status, Date)";
        trial_statuses_string_N = ""
        trial_statuses_string_O =""
        delimiter = " |"
        trial_statuses.each do |o|
          case o.event
            when "destroy"
              p o.event
              status_date_N = o.object["status_date"]
              trial_status_id = o.object["trial_status_id"]
              trial_status_N = TrialStatus.find_by_code(trial_status_id) if trial_status_id

              destroy_sign = " (D) "

              trial_statuses_string_N = trial_statuses_string_N + delimiter + status_date_N.to_s + "   " + trial_status_N.to_s + destroy_sign + delimiter
              trial_statuses_string_O = ""

            when "create" || "update"
              status_date_N = o.object_changes["status_date"][1]
              trial_status_id = o.object_changes["trial_status_id"][1]
              trial_status_N = TrialStatus.find_by_code(trial_status_id) if trial_status_id

              destroy_sign = " "
              trial_statuses_string_N = trial_statuses_string_N + delimiter + status_date_N.to_s + "   " + trial_status_N.to_s + destroy_sign + delimiter

              status_date_O = o.object_changes["status_date"][0]
              trial_status_id = o.object_changes["trial_status_id"][0]
              trial_status_O = TrialStatus.find_by_code(trial_status_id) if trial_status_id

              trial_statuses_string_O = trial_statuses_string_O + delimiter + status_date_O.to_s + "   " + trial_status_O.to_s + destroy_sign + delimiter


            else
              trial_statuses_string_O =   " "
              trial_statuses_string_N =   " "

          end

        end
        #end
        h[:new_value] = trial_statuses_string_N
        h[:old_value] = trial_statuses_string_O
        updated_fields_array.push(h)
      end


     trial_version = TrialVersion.find_by_item_type_and_transaction_id("Trial", submission_version.transaction_id) if submission_version


     if trial_version
       start_date_N = trial_version.object_changes["start_date"]?  trial_version.object_changes["start_date"][1] : nil
       start_date_O = trial_version.object_changes["start_date"]?  trial_version.object_changes["start_date"][0] : nil

       if start_date_N || start_date_O
         Hash h = Hash.new
         h[:updated_filed]="Start date"
         h[:old_value] = start_date_O
         h[:new_value] = start_date_N
         updated_fields_array.push(h)
       end



       start_date_type_N = trial_version.object_changes["start_date_qual"]?  trial_version.object_changes["start_date_qual"][1] : nil
       start_date_type_O = trial_version.object_changes["start_date_qual"]?  trial_version.object_changes["start_date_qual"][0] : nil

       if start_date_type_N || start_date_type_O
         Hash h = Hash.new
         h[:updated_filed]="Start date type"
         h[:old_value] = start_date_type_O
         h[:new_value] = start_date_type_N
         updated_fields_array.push(h)
       end



       primary_comp_date_N = trial_version.object_changes["primary_comp_date"]?  trial_version.object_changes["primary_comp_date"][1] : nil
       primary_comp_date_O = trial_version.object_changes["primary_comp_date"]?  trial_version.object_changes["primary_comp_date"][0] : nil

       if primary_comp_date_N || primary_comp_date_O
         Hash h = Hash.new
         h[:updated_filed]="Primary completion date"
         h[:old_value] = primary_comp_date_O
         h[:new_value] = primary_comp_date_N
         updated_fields_array.push(h)
       end



       primary_comp_date_type_N = trial_version.object_changes["primary_comp_date_qual"]?  trial_version.object_changes["primary_comp_date_qual"][1] : nil
       primary_comp_date_type_O = trial_version.object_changes["primary_comp_date_qual"]?  trial_version.object_changes["primary_comp_date_qual"][0] : nil

       if primary_comp_date_type_N || primary_comp_date_type_O
         Hash h = Hash.new
         h[:updated_filed]="Primary completion date type"
         h[:old_value] = primary_comp_date_type_O
         h[:new_value] = primary_comp_date_type_N
         updated_fields_array.push(h)
       end

       comp_date_N = trial_version.object_changes["comp_date"]?  trial_version.object_changes["comp_date"][1] : nil
       comp_date_O = trial_version.object_changes["comp_date"]?  trial_version.object_changes["comp_date"][0] : nil

       if comp_date_N || comp_date_O
         Hash h = Hash.new
         h[:updated_filed]="Completion date"
         h[:old_value] = comp_date_O
         h[:new_value] = comp_date_N
         updated_fields_array.push(h)
       end


       comp_date_type_N = trial_version.object_changes["comp_date_qual"]?  trial_version.object_changes["comp_date_qual"][1] : nil
       comp_date_type_O = trial_version.object_changes["comp_date_qual"]?  trial_version.object_changes["comp_date_qual"][0] : nil

       if comp_date_type_N || comp_date_type_O
         Hash h = Hash.new
         h[:updated_filed]="Completion date type"
         h[:old_value] = comp_date_type_O
         h[:new_value] = comp_date_type_N
         updated_fields_array.push(h)
       end
     end
    elsif !internal_source_id.nil? && internal_source_id == InternalSource.find_by_name("ClinicalTrials.gov Import").id

      trial_version = TrialVersion.find_by_item_type_and_transaction_id("Trial", submission_version.transaction_id) if submission_version

      # |Trials.Brief_Title|
      brief_title_N = trial_version.object_changes["brief_title"]?  trial_version.object_changes["brief_title"][1] : nil
      brief_title_O = trial_version.object_changes["brief_title"]?  trial_version.object_changes["brief_title"][0] : nil

      if brief_title_N || brief_title_O
        Hash h = Hash.new
        h[:updated_filed]="Brief Title"
        h[:old_value] = brief_title_O
        h[:new_value] = brief_title_N
        updated_fields_array.push(h)
      end

      official_title_N = trial_version.object_changes["official_title"]?  trial_version.object_changes["brief_title"][1] : nil
      official_title_O = trial_version.object_changes["official_title"]?  trial_version.object_changes["brief_title"][0] : nil

      if official_title_N || official_title_O
        Hash h = Hash.new
        h[:updated_filed]="Official Title"
        h[:old_value] = official_title_O
        h[:new_value] = official_title_N
        updated_fields_array.push(h)
      end


      #|Trials.Official_Title|
     #|eligibility criteria (multiple) other_criteria.criteria_type, other_criteria.criteria_desc |
     #|arms_groups (multiple) arms_groups.label,type, description|
    end


    json.fields_of_interest do
        json.array!(updated_fields_array) do |h|
          json.field_name h[:updated_filed]
          json.old_value  h[:old_value]
          json.new_value  h[:new_value]
        end
      end

    end

end

json.start params[:start]
json.rows params[:rows]
json.total @submissions.respond_to?(:total_count) ? @submissions.total_count : @submissions.size