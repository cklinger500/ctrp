
class LeadObj
  include XML::Mapping
  text_node :id , "poID"
end

class ExistingOrganization
  include XML::Mapping
  object_node :existingOrganization, "existingOrganization", :class => LeadObj
end

class ExistingPerson
  include XML::Mapping
  object_node :existingPerson, "existingPerson", :class => LeadObj
end

class InterventionalTrial
  include XML::Mapping

  text_node :secondary_purpose_id,"secondaryPurpose",:optional=>true,:default_value=>nil,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              obj.secondary_purpose_id= SecondaryPurpose.find_by_name(obj.secondary_purpose_id).id if !obj.secondary_purpose_id.nil?
            }
  text_node :secondary_purpose_other, "secondaryPurposeOtherDescription", :optional=>true, :default_value=>nil


  def research_category_id
    return ResearchCategory.find_by_name("Interventional").id
  end

end

class NonInterventionalTrial
  include XML::Mapping
  text_node :research_category_id, "trialType", :optional=>true,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              if !obj.research_category_id.nil?
                p obj.research_category_id
                val1 = obj.research_category_id
                val1 = "Ancillary Correlative" if obj.research_category_id == "Ancillary-Correlative"
                obj.research_category_id= ResearchCategory.find_by_name(val1).id
              end
            }
  #text_node :studyModelCode, "studyModelCode", :optional=>true
  #text_node :timePerspectiveCode, "timePerspectiveCode", :optional=>true

end


class RegulatoryInformationXml
  include XML::Mapping

      text_node :country, "country", :optional=>true
      text_node :authorityName, "authorityName", :optional=>true

      text_node :sec801_indicator, "section801", :default_value=>nil, :optional=>true,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              obj.sec801_indicator=BooleanMapper.map(obj.sec801_indicator)
            }
      text_node :intervention_indicator, "fdaRegulated", :default_value=>nil, :optional=>true,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              obj.intervention_indicator=BooleanMapper.map(obj.intervention_indicator)
            }
      text_node :data_monitor_indicator, "dataMonitoringCommitteeAppointed", :default_value=>nil, :optional=>true,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              obj.data_monitor_indicator=BooleanMapper.map(obj.data_monitor_indicator)
            }

end


class GrantXml
  include XML::Mapping
  text_node :funding_mechanism, "fundingMechanism", :optional=>true
  text_node :institute_code, "nihInstitutionCode",:optional=>true
  text_node :serial_number, "serialNumber",:optional=>true
  text_node :nci, "nciDivisionProgramCode",:optional=>true
end

class IndIdeXml
  include XML::Mapping
  numeric_node :ind_ide_number, "number", :optional=>true
  text_node :grantor, "grantor", :optional=>true
  text_node :holderType, "holderType", :optional=>true
  text_node :nihInstitution, "nihInstitution", :optional=>true
  text_node :nciDivisionProgramCode, "nciDivisionProgramCode", :optional=>true
  boolean_node :expanded_access, "expandedAccess",:optional=>true
  text_node :expandedAccessType, "expandedAccessType", :optional=>true
  boolean_node :exempt, "exempt",:optional=>true
end


class ResponsiblePartyXml
  include XML::Mapping
  text_node   :type, "type", :optional=>true , :default_value=>nil
  text_node   :investigator_title, "investigatorTitle", :optional=>true, :default_value=>nil
  object_node :investigator, "investigator", :class =>ExistingPerson,:optional=>true,:default_value=>nil
  object_node :investigatorAffiliation, "investigatorAffiliation", :class =>ExistingOrganization,:optional=>true,:default_value=>nil
end


class BooleanMapper
  def self.map(_val)
    if _val == "true"
      return "Yes"
    elsif _val == "false"
      return "No"
    end
  end
end



class ApiTrialChildXmlMappers
end