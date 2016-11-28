json.array!(@ctep_org_types) do |ctep_org_type|
  json.extract! ctep_org_type, :id, :code, :name
  json.url ctep_org_type_url(ctep_org_type, format: :json)
end