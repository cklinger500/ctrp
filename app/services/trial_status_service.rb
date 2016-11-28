class TrialStatusService

  def initialize(appsetting_value, statuses)
    @appsetting_value = appsetting_value
    @statuses = statuses
  end

  def validate_status
    @validation_msgs = []
    transition_matrix = JSON.parse(AppSetting.find_by_code(@appsetting_value).big_value)
    if @statuses.present? && @statuses.size > 0
      @statuses.each_with_index do |e, i|
        if i == 0
          from_status_code = 'STATUSZERO'
        else
          from_status_code = @statuses[i - 1]['trial_status_code']
        end
        to_status_code = @statuses[i]['trial_status_code']

        # Flag that indicates if the two status dates are the same
        if from_status_code == 'STATUSZERO'
          same_date = false
        else
          same_date = @statuses[i - 1]['status_date'] == @statuses[i]['status_date']
        end

        validation_msg = convert_validation_msg(transition_matrix[from_status_code][to_status_code], from_status_code, to_status_code, same_date)
        @validation_msgs.append(validation_msg)
      end
    end
    return @validation_msgs
  end

  private

  # Convert status code to name in validation messages
  def convert_validation_msg (msg, from_status_code, to_status_code, same_date)
    if msg.has_key?('warnings')
      msg['warnings'].each do |warning|
        statusObj = TrialStatus.find_by_code(warning['status']) if warning.has_key?('status')
        warning['status'] = statusObj.name if statusObj.present?

        if warning.has_key?('message')
          if warning['message'] == 'Invalid Transition'
            fromStatusObj = TrialStatus.find_by_code(from_status_code)
            warning['from'] = fromStatusObj.name if fromStatusObj.present?
            toStatusObj = TrialStatus.find_by_code(to_status_code)
            warning['to'] = toStatusObj.name if toStatusObj.present?
          elsif warning['message'] == 'Duplicate'
            dupStatusObj = TrialStatus.find_by_code(from_status_code)
            warning['dupStatus'] = dupStatusObj.name if dupStatusObj.present?
          elsif warning['message'] == 'Same Day'
            fromStatusObj = TrialStatus.find_by_code(from_status_code)
            warning['from'] = fromStatusObj.name if fromStatusObj.present?
            toStatusObj = TrialStatus.find_by_code(to_status_code)
            warning['to'] = toStatusObj.name if toStatusObj.present?
            warning['sameDate'] = same_date
          end
        end
      end
    end

    if msg.has_key?('errors')
      msg['errors'].each do |error|
        statusObj = TrialStatus.find_by_code(error['status']) if error.has_key?('status')
        error['status'] = statusObj.name if statusObj.present?

        if error.has_key?('message')
          if error['message'] == 'Invalid Transition'
            fromStatusObj = TrialStatus.find_by_code(from_status_code)
            error['from'] = fromStatusObj.name if fromStatusObj.present?
            toStatusObj = TrialStatus.find_by_code(to_status_code)
            error['to'] = toStatusObj.name if toStatusObj.present?
          elsif error['message'] == 'Duplicate'
            dupStatusObj = TrialStatus.find_by_code(from_status_code)
            error['dupStatus'] = dupStatusObj.name if dupStatusObj.present?
          end
        end
      end
    end

     Rails.logger.info "Errors are #{msg['errors']}"
     Rails.logger.info "Warnings are   #{msg['warnings']}"

    return msg
  end


end