json.array!(@specimen_types) do |specimen_type|
  json.extract! specimen_type, :id,:code,:name
  json.url specimen_type_url(specimen_type, format: :json)
end
