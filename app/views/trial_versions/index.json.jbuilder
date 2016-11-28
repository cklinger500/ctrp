json.array!(@trial_versions) do |trial_version|
  json.extract! trial_version, :id , :object_changes
  json.url trial_version_url(trial_version, format: :json)
end
