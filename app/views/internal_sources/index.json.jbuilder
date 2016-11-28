json.array!(@internal_sources) do |internal_source|
  json.extract! internal_source, :id, :code, :name
  json.url internal_source_url(internal_source, format: :json)
end
