ctrp_context_id = SourceContext.find_by_code('CTRP').id

# matched CTRP person from cloning CTEP person
json.matched do
  json.array!(@matched) do |person|
    json.merge! p.attributes # get all the attributes in person
    json.is_associated Person.where(ctrp_id: person.ctrp_id).size > 1 && person.source_context_id == ctrp_context_id
  end
end

json.is_cloned @is_cloned