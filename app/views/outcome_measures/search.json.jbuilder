json.outcome_measures do
  json.array!(@outcome_measures) do |outcome_measure|
    json.extract! outcome_measure, :id, :title, :time_frame
    json.outcome_measure_type outcome_measure.outcome_measure_type.present? ? outcome_measure.outcome_measure_type.name : nil
  end
end