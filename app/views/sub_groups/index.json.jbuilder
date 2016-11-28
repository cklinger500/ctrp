json.array!(@sub_groups) do |sub_group|
  json.extract! sub_group, :id
  json.url sub_group_url(sub_group, format: :json)
end
