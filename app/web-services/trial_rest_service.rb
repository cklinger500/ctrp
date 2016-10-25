class TrialRestService

  def active_ctrp_org_count(org_id)

    return Organization.where("ctrp_id=?", org_id).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTRP").id,SourceStatus.find_by_name("Active").id).count;

  end

  def active_ctrp_person_count(per_id)

   return  Person.where("ctrp_id=?", per_id).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTRP").id,SourceStatus.find_by_name("Active").id).count;

  end

end