json.array!(@cadsr_marker_statuses) do |cadsr_marker_status|
  json.extract! cadsr_marker_status, :id, :code, :name
  json.url cadsr_marker_status_url(cadsr_marker_status, format: :json)
end
