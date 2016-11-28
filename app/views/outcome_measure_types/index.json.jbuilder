json.array!(@outcome_measure_types) do |outcome_measure_type|
  json.extract! outcome_measure_type, :id, :code, :name
  json.url outcome_measure_type_url(outcome_measure_type, format: :json)
end
