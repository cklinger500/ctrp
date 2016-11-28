json.array!(@outcome_measures) do |outcome_measure|
  json.extract! outcome_measure, :id
  json.url outcome_measure_url(outcome_measure, format: :json)
end
