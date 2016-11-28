json.array!(@user_statuses) do |user_status|
  json.extract!  user_status, :id, :code, :name
end
