json.array!(@marker_cadsrs) do |marker_cadsr|
  json.extract! marker_cadsr, :id, :name, :meaning, :description, :cadsr_id, :source_status_id, :nv_term_identifier, :pv_name
  json.url marker_cadsr_url(marker_cadsr, format: :json)
end
