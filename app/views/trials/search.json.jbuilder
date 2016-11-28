avr_id  = ProcessingStatus.find_by_code("AVR").id
vnr_id = ProcessingStatus.find_by_code("VNR").id
json.trials do
  if params[:trial_ownership]
    json.array!(@trials) do |trial|
      json.extract! trial, :id, :lead_protocol_id, :nci_id, :official_title
    end
  else
    json.array!(@trials) do |trial|
      ##Do not remove these comments, Added by me ti improve performance of the Registry Search ---Murali Dulla
      Rails.logger.info "*********************> START( Dont remove me ) <***********************************"

      json.extract! trial, :id, :lead_protocol_id, :nci_id, :official_title, :pilot, :my_site_id,
                    :ctg_id, :start_date, :verification_date, :primary_comp_date, :submitter,
                    :last_updated_at, :last_updated_by, :last_amended_at, :last_amended_by, :onhold_reason
      Rails.logger.info "*********************> Directs End <***********************************"

      json.phase_name trial.phase.present? ? trial.phase.name : nil
      json.purpose trial.primary_purpose.present? ? trial.primary_purpose.name : nil
      json.pi trial.pi.present? ? trial.pi.lname + ', ' + trial.pi.fname : nil
      json.lead_org_name trial.lead_org.present? ? trial.lead_org.name : nil

      json.sponsor trial.sponsor.present? ? trial.sponsor.name : nil
      json.study_source trial.study_source.present? ? trial.study_source.name : nil
      json.current_trial_status trial.trial_status_wrappers.present? ? trial.trial_status_wrappers.last.trial_status.name : nil
      json.actions trial.actions(avr_id,vnr_id)

      json.current_processing_status trial.current_processing_status.present? ? trial.current_processing_status.name : nil
      json.accrual_disease_term_name trial.accrual_disease_term.present? ? trial.accrual_disease_term.name : nil
      json.research_category_name trial.research_category.present? ? trial.research_category.name : nil
      json.responsible_party_name trial.responsible_party.present? ? trial.responsible_party.name : nil

      json.other_ids  ""
      if trial.other_ids.present?
        other_ids = trial.other_ids
        other_ids_string = ""
        delimiter = ""
        nct = ProtocolIdOrigin.find_by_code('NCT')
        other_ids.each do |o|
          next if o.protocol_id_origin.nil? || o.protocol_id_origin_id == nct.id
          name = o.protocol_id_origin.name
          unless name.nil?
            name.gsub!("Identifier", "")
            other_ids_string = other_ids_string + delimiter + name + o.protocol_id
            delimiter = ";  "
          end
        end
        json.other_ids  other_ids_string
      end

      Rails.logger.info "*********************> END <***********************************"

    end
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @trials.respond_to?(:total_count) ? @trials.total_count : @trials.size
json.sort params[:sort]
json.order params[:order]
