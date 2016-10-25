json.array!(@service_requests) do |service_request|
  json.extract! service_request, :id, :code, :name
  json.url service_request_url(service_request, format: :json)
end