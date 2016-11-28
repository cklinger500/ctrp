json.extract! @associated_trial, :id, :created_at, :updated_at, :trial_identifier, :identifier_type_id, :trial_id,
              :official_title, :lock_version, :research_category_name, :uuid

identifier_obj = @associated_trial.identifier_type_id.nil? ? nil : IdentifierType.find_by_id(@associated_trial.identifier_type_id)
json.set! :identifierTypeStr, identifier_obj.nil? ? '' : identifier_obj.code
