json.array!(@trial_statuses) do |trial_status|
  json.extract! trial_status, :id, :code, :name, :explanation
  json.url trial_status_url(trial_status, format: :json)
end
