class PersonMap;end
class Name;end
class PoAffiliationMap;end
class Contacts;end

class ApiPersonXmlMapper
  include XML::Mapping

  #def initialize
  #  Rails.logger.info "OOOFFFFFFFFFFFFFF .............."
  #end
  #Rails.logger.info "In ApiPersonXmlMapper "
  object_node :person, "person",:class => PersonMap,:optional=>true,:default_value=>nil
end

class PersonMap
  include XML::Mapping

  #Rails.logger.info "In PersonMap"
  #object_node :Organization, "organization", :class => Organization

  text_node :source_context_id, "context", :default_value=>nil, :optional=>true,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              obj.source_context_id= SourceContext.find_by_name(obj.source_context_id).id if !obj.source_context_id.nil?
              #p " this is context id " + obj.source_context_id
            }

  #p " outside  context id " + obj.source_context_id
  #Rails.logger.info " outside source context id #{source_context_id}"
  text_node :source_id, "code", :default_value=>nil, :optional=>true

  text_node :registration_type, "registrationtype", :default_value=>nil, :optional=>true

  text_node :source_status_id, "status", :default_value=>nil, :optional=>true,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              if obj.source_status_id.present?
                source_status = SourceStatus.find_by_name(obj.source_status_id)
                source_status.present? ? obj.source_status_id = source_status.id : obj.source_status_id = nil
              else
                obj.source_status_id= nil
              end
            }

  #text_node :name, "name", :default_value=>nil, :optional=>true

  object_node :name, "name",:class => Name,:optional=>true,:default_value=>nil

  object_node :poaffiliation, "poaffiliation", :class => PoAffiliationMap,:optional=>true,:default_value=>nil

  object_node :contacts, "contacts", :class => Contacts,:optional=>true,:default_value=>nil
end



class Name

  include XML::Mapping

  #Rails.logger.info "In Name"

  text_node :prefix, "prefix", :default_value=>nil, :optional=>true
  text_node :fname, "fname", :default_value=>nil, :optional=>true
  text_node :mname, "mname", :default_value=>nil, :optional=>true
  text_node :lname, "lname", :default_value=>nil, :optional=>true
  text_node :suffix, "suffix", :default_value=>nil, :optional=>true
end

class PoAffiliationMap

  include XML::Mapping

  #Rails.logger.info "In Afforgs ******"

  array_node :orgid, "orgid",:optional=>true, :class => String,:default_value=>[]
end

class Contacts

  include XML::Mapping

  #Rails.logger.info "In Contacts ******"

  hash_node :contact, "contact", "@type" ,:optional=>true, :class => String,:default_value=>[]
end

