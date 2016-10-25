json.array!(@source_statuses) do |source_status|
  json.extract! source_status, :id, :code, :name, :source_context_id
  json.url source_status_url(source_status, format: :json)
end
