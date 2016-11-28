json.array!(@associated_trials) do |associated_trial|
  json.extract! associated_trial, :id
  json.url associated_trial_url(associated_trial, format: :json)
end
