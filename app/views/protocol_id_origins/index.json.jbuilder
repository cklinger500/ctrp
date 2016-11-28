json.array!(@protocol_id_origins) do |protocol_id_origin|
  json.extract! protocol_id_origin, :id, :code, :name, :section
  json.url protocol_id_origin_url(protocol_id_origin, format: :json)
end
