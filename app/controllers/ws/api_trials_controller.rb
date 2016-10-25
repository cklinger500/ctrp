class Ws::ApiTrialsController < Ws::BaseApiController
  #around_filter :global_request_logging

  ##CONSTANTS FOR REQUEST VALIDATIONS
  ##
  XSD_PATH            =   Rails.root.to_s + "/ws.xsd"
  REGISTER_ACTION     =   "create"
  UPDATE_ACTION       =   "update"
  AMEND_ACTION        =   "amend"
  POST                =   "POST"
  PUT                 =   "PUT"
  REGISTER_ROOT_NODE  =   "CompleteTrialRegistration"
  UPDATE_ROOT_NODE    =   "CompleteTrialUpdate"
  AMEND_ROOT_NODE     =   "CompleteTrialAmendment"

  ## Class Variables
  ##
  $requestString
  $rootElement
  $logDatumId

  before_action only: [:create, :update, :amend] do
    validate_rest_request
  end


  before_filter only: [:create] do
    Rails.logger.info("Restfulservices=> current user #@current_user");
    val_errors = Array.new()

    ## Check Lead_org_id and lead_org_trial_id must be unique otherwise throw error
     ##

    #if !@xmlMapperObject.leadOrganization.newOrganization.nil?
     # val_errors.push("Accepting newOrganization element to create Person/Organization on the fly has been deprecated, please refer 5.x wiki for more details");
    #else
      lead_protocol_id = @xmlMapperObject.lead_protocol_id
      lead_org_id = @xmlMapperObject.leadOrganization.existingOrganization.id
      lead_org_id_pk= Organization.find_by_ctrp_id(lead_org_id).id if Organization.find_by_ctrp_id(lead_org_id)

      @trial = Trial.find_by_lead_protocol_id_and_lead_org_id(lead_protocol_id,lead_org_id_pk)


      if @trial.present?
        val_errors.push("A trial has already been existed with given Lead Org Trial ID and Lead organization ID");
      else
        val_errors=    validate_clinicalTrialsDotGovXmlRequired_dependencies(@xmlMapperObject)
      end
    #end

    if val_errors.any?
      response_body = val_errors.to_xml
      render xml:response_body, status: '404'
      response_logging(nil,"404",response_body)
    end

  end


  before_filter only: [:create] do

    @paramsLoader = ApiTrialParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"create","")

    if !@paramsLoader.errors.empty?
      response_body = @paramsLoader.errors
      render xml:response_body , status: '404'
      response_logging(nil,"404",response_body)
    end
  end # end of before_create



  before_filter only:[:update,:amend] do

    if params[:idType] == "nci"
      @trial = Trial.find_by_nci_id(params[:id])
    else

      response_body = Array.new
      response_body.push "Expected id types are nci,pa,dcp,ctep but currently trial is being identifed"
      render xml: response_body.to_xml, status: :bad_request
      response_logging(@trial,"404",response_body.to_xml)
    end
    response_body = Array.new
    response_body.push "Given trial with NCI_ID does not exist in CTRP "
    render xml: response_body.to_xml , status: :not_found unless @trial.present?
    response_logging(@trial,"404",response_body.to_xml)

  end

  before_filter only: [:update] do

    @paramsLoader = ApiTrialParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"update",@trial)
    if !@paramsLoader.errors.empty?
      response_body = @paramsLoader.errors
      render xml: response_body, status:'404'
      response_logging(@trial,"404",response_body)
    end

  end #end of before_update

  before_filter only: [:amend] do
    Rails.logger.info("Restfulservices=> current user #@current_user");
    val_errors = Array.new()

    #@xmlMapperObject = ApiTrialCreateXmlMapper.load_from_xml(REXML::Document.new($requestString).root)

    ## Check Lead_org_id and lead_org_trial_id must be unique otherwise throw error
    ##

    #if !@xmlMapperObject.leadOrganization.newOrganization.nil?
    # val_errors.push("Accepting newOrganization element to create Person/Organization on the fly has been deprecated, please refer 5.x wiki for more details");
    #else
    lead_protocol_id = @xmlMapperObject.lead_protocol_id
    lead_org_id = @xmlMapperObject.leadOrganization.existingOrganization.id
    lead_org_id_pk= Organization.find_by_ctrp_id(lead_org_id).id if Organization.find_by_ctrp_id(lead_org_id)

    @trial1 = Trial.find_by_lead_protocol_id_and_lead_org_id(lead_protocol_id,lead_org_id_pk)


    if @trial1.present? && @trial.id != @trial1.id
      val_errors.push("A trial has already been existed with given Lead Org Trial ID and Lead organization ID");
    else
      val_errors=    validate_clinicalTrialsDotGovXmlRequired_dependencies(@xmlMapperObject)
    end
    #end

     if val_errors.any?
       response_body = val_errors.to_xml
       render xml:response_body, status: '404'
       response_logging(@trial,"404",response_body)
     end

  end


  before_filter only: [:amend] do

    #@xmlMapperObject = ApiTrialCreateXmlMapper.load_from_xml(REXML::Document.new($requestString).root)
    val_errors=    validate_clinicalTrialsDotGovXmlRequired_dependencies(@xmlMapperObject)
    if val_errors.any?
      response_body = val_errors.to_xml
      render xml:response_body, status: '404'
      response_logging(@trial,"404",response_body)
    end
    @paramsLoader = ApiTrialParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"amend",@trial)
    if !@paramsLoader.errors.empty?
      response_body = @paramsLoader.errors
      render xml: response_body, status: '404'
      response_logging(@trial,"404",response_body)
    end

  end #end of before_update

  def create
    @rest_params = @paramsLoader.get_rest_params
    @rest_params[:current_user] = @current_user
    @rest_params[:created_by]   = @current_user.username unless @current_user.nil?
    @rest_params[:updated_by]   = @current_user.username unless @current_user.nil?

    ##Make rest service user as default trial owner.
    ##$rest_params[:trial_ownerships_attributes].push({user_id:@current_user.id})


    @trial =Trial.new(@rest_params)
    @trial.current_user = @current_user
    if @trial.save!
      response_body = @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
      render xml:response_body
      response_logging(@trial,"200",response_body)
    else
      render nothing: true, status: :bad_request
      response_logging(nil,"404","")
      return
    end
  end

  def update
    @rest_params = @paramsLoader.get_rest_params
    @rest_params[:current_user] = @current_user
    @rest_params[:updated_by]   = @current_user.username unless @current_user.nil?
    @trial.current_user = @current_user
    if @trial.update(@rest_params)
      response_body = @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
      render xml: response_body
      response_logging(nil,"404",response_body)
    else
      render nothing: true, status: :bad_request
      response_logging(nil,"404","")
    end
  end


  def amend
    @rest_params = @paramsLoader.get_rest_params
    @rest_params[:current_user] = @current_user
    @rest_params[:updated_by]   = @current_user.username unless @current_user.nil?
    @trial.current_user = @current_user
    if @trial.update(@rest_params)
      response_body = @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
      render xml:response_body
      response_logging(nil,"404",response_body)
    else
      render nothing: true, status: :bad_request
      response_logging(nil,"404","")
    end
  end

  def import_trial
    @import_trial_service = ImportTrialService.new()
    @import_trial_service.validate_clinical_trials_gov(params[:id])

    if !@import_trial_service.errors.empty?
      render xml: @import_trial_service.errors, status: '404'
    else
      url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
      url = url.sub('NCT********', params[:id])
      xml = Nokogiri::XML(open(url))

      import_trial_service = ImportTrialService.new()
      @trial = Trial.new(import_trial_service.import_params(xml, @current_user))
      @trial.current_user = @current_user


      if @trial.save
          render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
        else
          render xml: @trial.errors, status: :bad_request
        end
    end
  end


  private

  def validate_rest_request


    ##Get action from request header
    action = request.path_parameters[:action]

    ##feed rootElement based on request method and URL
    if action == REGISTER_ACTION && request.request_method.casecmp(POST)
      $rootElement =REGISTER_ROOT_NODE
    elsif action== UPDATE_ACTION  && request.request_method.casecmp(POST)
      $rootElement = UPDATE_ROOT_NODE
    elsif action == AMEND_ACTION && request.request_method.casecmp(PUT)
      $rootElement = AMEND_ROOT_NODE
    end

    $requestString = request.body.read
    xsd = Nokogiri::XML::Schema(File.open(XSD_PATH))
    doc = Nokogiri::XML($requestString)
    xsd_errors =Array.new()
    exception = Array.new



      ## validate wheather root node is correct or not
      if  doc.root.name == $rootElement
        xsd.validate(doc).each do |error|
          #p error.code()
          #p error.column()
          #p error.domain()
          #p error.inspect()
          #p error.level()
          #p error.line()
          xsd_errors.push(error.message.gsub('{gov.nih.nci.pa.webservices.types}',''))
        end
        xsd_errors.push("Refer 5.x WS XSD on wiki for above erros") if xsd_errors.any?
      else
        xsd_errors.push("Refer 5.x WS XSD on wiki for correct request body ")
      end

      request_logging(doc,"Request",action,@current_user.username)

      ##
      ####This is compatibility maintainence with 4.x, if they submitted we will accept it but throw an error
      if !xsd_errors.any?
        a = doc.xpath("//tns:leadOrganization/tns:newOrganization")
        b = doc.xpath("//tns:sponsor/tns:newOrganization")
        c = doc.xpath("//tns:pi/tns:newPerson")
        d = doc.xpath("//tns:summary4FundingSponsor/tns:newOrganization")

        xsd_errors.push("leadOrganization: Creating new Organization feature has been deprecated in 5.x Restservices, refer 5.x wiki for more details") if a.length >= 1
        xsd_errors.push("sponsor: Creating new Organization feature has been deprecated in 5.x Restservices, refer 5.x wiki for more details") if b.length >= 1
        xsd_errors.push("pi: Creating new Person feature has been deprecated in 5.x Restservices, refer 5.x wiki for more details")     if c.length >= 1
        xsd_errors.push("summary4FundingSponsor: Creating new Organization feature has been deprecated in 5.x Restservices, refer 5.x wiki for more details")     if d.length >= 1

        #e = doc.xpath("//")

      end

      if xsd_errors.any?
        render xml:xsd_errors.to_xml, status: '404'
        response_logging(nil,"404",xsd_errors.to_xml)
      else
        ## This block is very important and will thourughly look for a valid XML
            begin

              @xmlMapperObject = ApiTrialCreateXmlMapper.load_from_xml(REXML::Document.new($requestString).root)

            rescue => e
              exception.push(e)
              render xml:exception, status: '404'
            end
      end

  end


  def find_trial

    if params.has_key?("idType")
      if params[:idType] == "nci"
        @trial = Trial.find_by_nci_id(params[:id])
      else
        response_body = "Expected idtypes are nci,pa,dcp,ctep but currently nci is accepting"
        render xml:response_body , status: :bad_request
        response_logging(nil,"404",response_body)
      end
    else
      @trial = Trial.find_by_id(params[:id])
    end
    response_body = ""
    render nothing: true, status: :not_found unless @trial.present?
    response_logging(nil,"404",response_body)

  end

  ## Responsible Party should not be specified if clinicalTrialsDotGovXmlRequired is false.
  ## Regulatory Information is required if clinicalTrialsDotGovXmlRequired is true and should not be specified otherwise.
  ## Sponsor should not be specified if clinicalTrialsDotGovXmlRequired is false.

  def validate_clinicalTrialsDotGovXmlRequired_dependencies(xmlMapperObject)

    val_errors =Array.new()

    if xmlMapperObject.clinical_trial_dot_xml_required == "Yes"

       if xmlMapperObject.regulatoryInformation.nil?
         val_errors.push("Regulatory Information is required if clinicalTrialsDotGovXmlRequired is true")
       end

   end

    if xmlMapperObject.clinical_trial_dot_xml_required == "No"
       if !xmlMapperObject.responsible_party.nil?
         val_errors.push("Responsible Party should not be specified if clinicalTrialsDotGovXmlRequired is false")
       end
       if !xmlMapperObject.sponsor.nil?
         val_errors.push("Sponsor should not be specified if clinicalTrialsDotGovXmlRequired is false")
       end

       if !xmlMapperObject.regulatoryInformation.nil?
         val_errors.push("Regulatory Information should not be specified if clinicalTrialsDotGovXmlRequired is false")
       end
    end

    return val_errors


  end

  def global_request_logging
    http_request_header_keys = request.headers.env.keys.select{|header_name| header_name.match("^HTTP.*")}
    http_request_headers = request.headers.env.select{|header_name, header_value| http_request_header_keys.index(header_name)}
    #requestString1 = request.body.read
    #$xml_body = Nokogiri::XML(requestString1)

    logger.info "Received #{request.method.inspect} to #{request.url.inspect} from #{request.remote_ip.inspect}.  Processing with headers #{http_request_headers.inspect} and params #{$xml_body}"
    begin
      yield
    ensure
      #logger.info "Responding with #{response.status.inspect} => #{response.body.inspect}"
      logger.info "Responding with #{response.status.inspect} "
    end
  end

  def request_logging(doc,action,request_or_response,user)
    add_file("rest_log.xml", doc, "xml", "tmp", action, "","",user)
  end

  def response_logging(trial,status, response_body)
    if trial
      object_id = trial.id
    else
      object_id =""
    end

    logDatum = LogDatum.find_by_id($logDatumId.id) if $logDatumId
    logDatum.update({:status => status, :object_id => object_id, :response_body => response_body}) if logDatum
  end

  def add_file(file_name, file_content,document_type,tmp_file_name, action,status,trial_id,user)

    if file_content.nil?
      return
    end

    decode_base64_content = file_content
    file_extension = File.extname(file_name).delete('.') ##sample.pdf will give pdf
    file_format    = File.extname(file_name)             ##sample.pdf will give .pdf

      temp_file = Tempfile.new(['Sample2',file_format])
      temp_file.binmode
      temp_file <<  decode_base64_content
      #temp_file.rewind
      file_params = {:filename => file_name, :tempfile => temp_file}

    uploaded_file = ActionDispatch::Http::UploadedFile.new(file_params)
    log_datum_params = {:file => uploaded_file, :document_type =>document_type, :file_name => file_name, :context => "REST", :object =>"Trial", :method => action, :status => status, :object_id => trial_id, :user => user}
    $logDatumId = LogDatum.create(log_datum_params)
  end


end #main end