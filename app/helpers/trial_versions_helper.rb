module TrialVersionsHelper

  def decorate(o,field)
    Rails.logger.info("In decorate method for the field " +field)
    if field.nil?
      return ""
    end

    if o.event =="update"
      if o.object_changes[field]
        val = o.object_changes[field][1]
        val = val + " (U)" if val
      elsif o.object[field]
        val = o.object[field]
      end
    elsif o.event =="create" && o.object_changes[field]
      val = o.object_changes[field][1]
    elsif o.event == "destroy" && o.object[field]
      val = o.object[field]
    end

    return val
  end

  def decorate_lookup(o,field,lookup)

    Rails.logger.info("In decorate_lookup method for the field " + field)


    if o.event =="update"
      if o.object_changes[field]
        id = o.object_changes[field][1]
      elsif o.object[field]
        id = o.object[field]
      end
    elsif o.event =="create" && o.object_changes[field]
      id = o.object_changes[field][1]
    elsif o.event == "destroy" && o.object[field]
      id = o.object[field]
    end

    if id.nil?
      return " "
    end
    lookup_obj = lookup.find_by_id(id)

    val = lookup_obj.name if lookup_obj
    val = val + " (U) " if o.event == "update"
    return val
  end


  def concatenate(o,string, *args )
    delimiter = " | "
    o.event == "destroy"? destroy_sign = " (D) " : destroy_sign=""
    joined_params = args.join(' , ')
    string = string + delimiter + joined_params + destroy_sign + delimiter
    return string
  end
end
