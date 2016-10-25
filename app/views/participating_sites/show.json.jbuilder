p "#####################"
json.extract! @participating_site, :id, :protocol_id, :program_code, :contact_name, :contact_phone, :contact_email,
              :trial_id, :trial, :organization_id, :organization, :person_id, :person, :extension,
              :created_at, :updated_at

json.participating_site_investigators do
  json.array!(@participating_site.participating_site_investigators) do |investigator|
    json.extract! investigator, :id, :person_id, :person, :set_as_contact, :investigator_type
  end
end

json.site_rec_status_wrappers do
  json.array!(@participating_site.site_rec_status_wrappers) do |status|
    json.extract! status, :id, :status_date, :site_recruitment_status_id, :site_recruitment_status, :comments
  end
end

person_id = @participating_site.person_id
person = nil
person = Person.find_by_id(person_id) unless person_id.nil?
p "&&&&&&&&&&&&&&&&&"
p @participating_site.contact_name
p @participating_site.contact_type
p "&&&&&&&&&&&&&&&&&"

json.contact_name @participating_site.contact_name
json.contact_phone @participating_site.contact_phone
json.contact_email @participating_site.contact_email
json.contact_type @participating_site.contact_type
json.extension @participating_site.extension
json.protocol_id @participating_site.protocol_id
json.program_code @participating_site.program_code
json.local_trial_identifier @participating_site.local_trial_identifier
json.person person
json.person_id person_id


investigators = ""
delimiter = ""
if @participating_site.participating_site_investigators.length > 1
  delimiter = "; "
end
unless @participating_site.participating_site_investigators.nil?
  @participating_site.participating_site_investigators.each do |inv|
    investigators = investigators + inv.person.fname + " " + inv.person.lname + delimiter
  end
end
json.view_investigators investigators
json.latest_site_recruitment_status  @participating_site.site_rec_status_wrappers.blank? ? "" : (@participating_site.site_rec_status_wrappers.last.site_recruitment_status.nil? ? "" : @participating_site.site_rec_status_wrappers.last.site_recruitment_status.name)
json.latest_site_recruitment_status_date  @participating_site.site_rec_status_wrappers.blank? ? "" : @participating_site.site_rec_status_wrappers.last.status_date
