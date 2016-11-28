class ApiPersonParamsLoader
  $rest_params = {}
  $mapperObject

  def initialize
    $errors = {}
    $rest_params = {}
  end

  def load_params(xmlMapperObject,type)
    $rest_params = {}
    $mapperObject =xmlMapperObject.person

    #$rest_params.push
    case type
      when "create"
        $rest_params[:edit_type] ="create"
      #$rest_params[:trial_ownerships_attributes] =[]
      #create_owner
      when "update"
        $rest_params[:edit_type] ="update"
    end


    #p "this is mapper object "
    #p $mapperObject

    ##In model to add some custom code use following identifier ; so that active model know from where this request is coming;
    $rest_params[:coming_from] = "rest"
    [:source_context_id,:source_id,:registration_type,:source_status_id].each do |attr|
      if !$mapperObject.send(attr).nil?
        p attr
        p $mapperObject.send(attr)
        $rest_params[attr] = $mapperObject.send(attr)
      end
    end

    [:prefix,:fname,:mname,:lname,:suffix].each do |attr|
      if !$mapperObject.name.send(attr).nil?
        p $mapperObject.name.send(attr)
        $rest_params[attr] = $mapperObject.name.send(attr)
      end
    end
    $rest_params[:po_affiliations_attributes] =[]
    rest_ser = PersonRestService.new
    aff_org_status= PoAffiliationStatus.find_by_code('ACTIVE')

    if  $mapperObject.poaffiliation.present?
      $mapperObject.poaffiliation.orgid.each do |org_id|
        count = rest_ser.active_ctep_org_count(org_id)
        Hash po_aff_hash = Hash.new
        po_aff_hash.store("organization_id",org_id)
        po_aff_hash.store("po_affiliation_status_id",aff_org_status.id) if aff_org_status.present?
        if count > 0
          $rest_params[:po_affiliations_attributes].push(po_aff_hash)
        else
            $errors.store(org_id,"This Organization is not Active")
        end
      end
    end

    if $mapperObject.contacts.present?
      $mapperObject.contacts.contact.each do |_key,_val|
        p _key
        p _val
        case _key
          when "email"
            $rest_params[:email] = _val
          when "phone"
            $rest_params[:phone] = _val
        end
      end
    end

    p "printing rest params "
    p $rest_params
  end

  def errors
    return $errors
  end
  def get_rest_params()
    return $rest_params
  end

end