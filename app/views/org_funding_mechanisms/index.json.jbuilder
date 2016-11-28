json.array!(@org_funding_mechanisms) do |org_funding_mechanism|
  json.extract! org_funding_mechanism, :id, :code, :name
  json.url org_funding_mechanism_url(org_funding_mechanism, format: :json)
end

