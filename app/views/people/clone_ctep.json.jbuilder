ctrp_context_id = SourceContext.find_by_code('CTRP').id
p "clone_ctep jbuilder!"
# matched CTRP person from cloning CTEP person
json.matched do
  json.array!(@matched) do |person|
    json.merge! person.attributes # get all the attributes in person
    json.is_associated Person.where(ctrp_id: person.ctrp_id).size > 1 && person.source_context_id == ctrp_context_id
  end
end

# if @is_cloned
#   associated_persons = Person.where(ctrp_id: @person.ctrp_id) #if !@person.ctrp_id.nil? && @person.source_context_id == ctrp_context_id
#   json.associated_persons associated_persons.reject { |p| p.id == @person.id } # remove self
# end

json.is_cloned @is_cloned