json.array!(@biomarker_purposes) do |biomarker_purpose|
  json.extract! biomarker_purpose, :id,:code,:name
  json.url bio_marker_purpose_url(biomarker_purpose, format: :json)
end
