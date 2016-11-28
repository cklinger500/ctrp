json.array!(@onhold_reasons) do |onhold_reason|
  json.extract! onhold_reason, :id, :name, :code
  json.url onhold_reason_url(onhold_reason, format: :json)
end
