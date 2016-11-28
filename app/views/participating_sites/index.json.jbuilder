json.array!(@participating_sites) do |participating_site|
  json.extract! participating_site, :id
  json.url participating_site_url(participating_site, format: :json)
end
