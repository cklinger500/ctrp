json.array!(@anatomic_sites) do |anatomic_site|
  json.extract! anatomic_site, :id, :code, :name
  json.url anatomic_site_url(anatomic_site, format: :json)
end
