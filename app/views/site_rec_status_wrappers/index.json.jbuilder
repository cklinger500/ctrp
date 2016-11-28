json.array!(@site_rec_status_wrappers) do |site_rec_status_wrapper|
  json.extract! site_rec_status_wrapper, :id
  json.url site_rec_status_wrapper_url(site_rec_status_wrapper, format: :json)
end
