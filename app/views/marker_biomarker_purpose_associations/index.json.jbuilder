json.array!(@marker_biomarker_purpose_associations) do |marker_biomarker_purpose_association|
  json.extract! marker_biomarker_purpose_association, :id
  json.url marker_biomarker_purpose_association_url(marker_biomarker_purpose_association, format: :json)
end
