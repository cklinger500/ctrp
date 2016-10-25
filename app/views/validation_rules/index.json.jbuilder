json.array!(@validation_rules) do |validation_rule|
  json.extract! validation_rule, :id
  json.url validation_rule_url(validation_rule, format: :json)
end
