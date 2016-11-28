json.array!(@marker_eval_type_associations) do |marker_eval_type_association|
  json.extract! marker_eval_type_association, :id
  json.url marker_eval_type_association_url(marker_eval_type_association, format: :json)
end
