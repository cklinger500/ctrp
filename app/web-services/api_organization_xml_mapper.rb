class OrganizationMap;end
class Address;end
class Contacts;end
class ContactXml;end

class ApiOrganizationXmlMapper

  include XML::Mapping

  #def initialize
  #  Rails.logger.info "OOOFFFFFFFFFFFFFF .............."
  #end
  #Rails.logger.info "In ApiOrgCreate "
  object_node :organization, "organization",:class => OrganizationMap,:optional=>true,:default_value=>nil

end

class OrganizationMap
  include XML::Mapping

  #Rails.logger.info "In Organization"

  text_node :source_context_id, "context", :default_value=>nil, :optional=>true,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              if obj.source_context_id.present?
                source_context = SourceContext.find_by_name(obj.source_context_id)
                source_context.present? ? obj.source_context_id = source_context.id :  obj.source_context_id= nil
              else
                obj.obj.source_context_id= nil
              end
              #obj.source_context_id= SourceContext.find_by_name(obj.source_context_id).id if !obj.source_context_id.nil?
            }

  text_node :source_id, "code", :default_value=>nil, :optional=>true

  text_node :ctep_org_type_id, "type", :default_value=>nil, :optional=>true,
            :reader=>proc{|obj,xml,default_reader|
               default_reader.call(obj,xml)
               if obj.ctep_org_type_id.present?
                 ctep_org_type = CtepOrgType.find_by_name(obj.ctep_org_type_id)
                 ctep_org_type.present? ? obj.ctep_org_type_id = ctep_org_type.id :  obj.ctep_org_type_id= nil
               else
                 obj.ctep_org_type_id= nil
               end
            }

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

  text_node :name, "name", :default_value=>nil, :optional=>true

  object_node :address, "address",:class => Address,:optional=>true,:default_value=>nil

  object_node :contacts, "contacts", :class => Contacts,:optional=>true,:default_value=>nil
end



class Address
  include XML::Mapping

  #Rails.logger.info "In Address"

  text_node :address, "address1", :default_value=>nil, :optional=>true
  text_node :address2, "address2", :default_value=>nil, :optional=>true
  text_node :address3, "address3", :default_value=>nil, :optional=>true
  text_node :city, "city", :default_value=>nil, :optional=>true
  text_node :state_province, "state_province", :default_value=>nil, :optional=>true
  text_node :postal_code, "postal_code", :default_value=>nil, :optional=>true
  text_node :country, "country", :default_value=>nil, :optional=>true

end

class Contacts
  include XML::Mapping
  #Rails.logger.info "In Contacts ******"
  hash_node :contact, "contact", "@type" ,:optional=>true, :class => String,:default_value=>[]
end

class ContactXml
  #include XML::Mapping
  #Rails.logger.info "In Contact"
  #hash_node :contact, "contact", "@type" ,:optional=>true, :class => String,:default_value=>[]
end

def errors
  return $errors
end