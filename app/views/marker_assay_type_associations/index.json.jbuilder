json.array!(@marker_assay_type_associations) do |marker_assay_type_association|
  json.extract! marker_assay_type_association, :id
  json.url marker_assay_type_association_url(marker_assay_type_association, format: :json)
end
