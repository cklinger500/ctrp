json.array!(@site_recruitment_statuses) do |site_recruitment_status|
  json.extract! site_recruitment_status, :id, :code, :name
  json.url site_recruitment_status_url(site_recruitment_status, format: :json)
end
