json.array!(@assay_types) do |assay_type|
  json.extract! assay_type, :id,:code,:name
  json.url assay_type_url(assay_type, format: :json)
end
