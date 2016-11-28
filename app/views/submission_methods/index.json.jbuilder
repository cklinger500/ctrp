json.array!(@submission_methods) do |submission_method|
  json.extract! submission_method, :id, :code, :name
  json.url submission_method_url(submission_method, format: :json)
end
