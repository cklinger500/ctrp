json.array!(@marker_spec_type_associations) do |marker_spec_type_association|
  json.extract! marker_spec_type_association, :id
  json.url marker_spec_type_association_url(marker_spec_type_association, format: :json)
end
