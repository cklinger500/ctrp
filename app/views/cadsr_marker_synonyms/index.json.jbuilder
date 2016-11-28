json.array!(@marker_synonyms) do |marker_synonym|
  json.extract! marker_synonym, :id, :alternate_name
  json.url marker_synonym_url(marker_synonym, format: :json)
end
