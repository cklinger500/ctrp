class Ws::ApiPeopleController < Ws::BaseApiController
  #around_filter :global_request_logging

  ##CONSTANTS FOR REQUEST VALIDATIONS
  XSD_PATH            =   Rails.root.to_s + "/po-rest.xsd"
  CREATE_ACTION       =   "create"
  UPDATE_ACTION       =   "update"
  POST                =   "POST"
  PUT                 =   "PUT"
  CREATE_ROOT_NODE    =   "createPerson"
  UPDATE_ROOT_NODE    =   "updatePerson"

  ## Class Variables
  ##
  $requestString
  $rootElement
  $logDatumId

  before_action only: [:create, :update] do
    validate_rest_request
  end

  before_filter only: [:create] do
    load_xml_mapper
    Rails.logger.info("Restfulservices=> current user #@current_user");
    val_errors = Array.new()

    if val_errors.any?
      response_body = val_errors.to_xml
      render xml:response_body, status: '404'
      response_logging(nil,"404",response_body)
    end

  end

  before_filter only: [:create] do

    Rails.logger.info "***** Before Calling Loader **********"

    @paramsLoader = ApiPersonParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"create")

    Rails.logger.info "***** After Calling Loader **********"

    if !@paramsLoader.errors.empty?
      response_body = @paramsLoader.errors
      render xml:response_body , status: '404'
      response_logging(nil,"404",response_body)
    end
  end # end of before_create


  before_filter only: [:update] do

    Rails.logger.info("Restfulservices=> current user #@current_user");
    val_errors = Array.new()
    @person = Person.where(id:params[:id])
        #Organization.where(ctrp_id: params[:id])

    if @person.present?
      load_xml_mapper
    else
      val_errors.push(" Person does not exist with the given ID.")
      #elsif @organization.present? && @organization.length > 1
      # val_errors.push(" More than one Organization existed in CTRP, This could be data entry error from CTRP. ")
    end

    if val_errors.any?
      response_body = val_errors.to_xml
      render xml:response_body, status: '404'
      response_logging(nil,"404",response_body)
    end

  end

  before_filter only: [:update] do

    Rails.logger.info "***** Before Calling Loader in update **********"

    @paramsLoader = ApiPersonParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"update")

    Rails.logger.info "***** After Calling Loader update **********"

    if !@paramsLoader.errors.empty?
      response_body = @paramsLoader.errors
      render xml:response_body , status: '404'
      response_logging(nil,"404",response_body)
    end
  end # end of before_update

  def create

    #Rails.logger.info "My XML Body #{request.body.read}"
    #Rails.logger.info "##### My XML Body #{doc.root.name}"
    #@org_params = Hash.from_xml(request.body.read);

    @rest_params = @paramsLoader.get_rest_params
    @rest_params[:current_user] = @current_user
    @rest_params[:created_by]   = @current_user.username unless @current_user.nil?
    @rest_params[:updated_by]   = @current_user.username unless @current_user.nil?


    #Rails.logger.info "calling org_params ### #{org_params}"

    #org_params.store("name", "Rest Org Name");
    #org_params.store("address", "Rest Org Name");
    #org_params.store("city", "Rest Org Name");

    #Rails.logger.info "Params coming from REST request and used to create Organization #{org_params}"

    @person = Person.new(@rest_params)
    @person.current_user = @current_user

    Rails.logger.info "This is inside @person   ### ### ### "
    Rails.logger.info @rest_params
     if @person.save
      response_body = @person.to_xml(only: [:id], root:'PersonCreateConfirmation', :skip_types => true)
      render xml:response_body
      response_logging(@person,"200",response_body)
    else
      render xml: @person.errors.to_xml, status: :bad_request
      response_logging(nil,"404","")
      return
    end

  end

  def update

    #Rails.logger.info "My XML Body #{request.body.read}"
    #Rails.logger.info "##### My XML Body #{doc.root.name}"

    #@org_params = Hash.from_xml(request.body.read);
    @rest_params = @paramsLoader.get_rest_params
    @rest_params[:current_user] = @current_user
    @rest_params[:created_by]   = @current_user.username unless @current_user.nil?
    @rest_params[:updated_by]   = @current_user.username unless @current_user.nil?


    #Rails.logger.info "calling org_params ### #{org_params}"

    #org_params.store("name", "Rest Org Name");
    #org_params.store("address", "Rest Org Name");
    #org_params.store("city", "Rest Org Name");

    #Rails.logger.info "Params coming from REST request and used to create Organization #{org_params}"

    @person = @person.first
    @person.current_user = @current_user

     Rails.logger.info "This is inside update @person   ### ### ### "
    if @person.update(@rest_params)
      response_body = @person.to_xml(only: [:id,:error], root:'PersonUpdateConfirmation', :skip_types => true)
      render xml:response_body
      response_logging(@person,"200",response_body)
    else
      render xml: @person.errors.to_xml, status: :bad_request
      response_logging(nil,"404","")
      return
    end
  end


  private

  def validate_rest_request

    #Rails.logger.info "######  I am insde validate rest request ##### #{CREATE_ACTION}  #{request.request_method.casecmp(POST)}"

    ##Get action from request header
    action = request.path_parameters[:action] ##

    ##feed rootElement based on request method and URL
    if action ==   CREATE_ACTION && request.request_method.casecmp(POST)
      $rootElement =CREATE_ROOT_NODE
    elsif action == UPDATE_ACTION && request.request_method.casecmp(POST)
      $rootElement = UPDATE_ROOT_NODE
    end

    #Rails.logger.info "about rootElement  #{$rootElement}"

    $requestString = request.body.read
    xsd = Nokogiri::XML::Schema(File.open(XSD_PATH))
    doc = Nokogiri::XML($requestString)
    xsd_errors =Array.new()
    exception = Array.new

    Rails.logger.info "about rootElement in request  #{doc.root.name}"
    ## validate if root node is correct or not
    if  doc.root.name == $rootElement
      p  "I am about to validate now "
      xsd.validate(doc).each do |error|
        #p error.code()
        #p error.column()
        #p error.domain()
        #p error.inspect()
        #p error.level()
        #p error.line()
        xsd_errors.push(error.message.gsub('{gov.nih.nci.po.webservices.types}',''))
      end
      xsd_errors.push("Alpha Block:: Refer 5.x WS XSD on wiki for above erros") if xsd_errors.any?
    else
      xsd_errors.push("Beta Block:: Refer 5.x WS XSD on wiki for correct request body ")
    end

    request_logging(doc,"Request",action,@current_user.username)

    if xsd_errors.any?
      render xml:xsd_errors.to_xml, status: '404'
      response_logging(nil,"404",xsd_errors.to_xml)
    else
      ## This block is very important and will look for a valid XML
      begin
        Rails.logger.info "********* ************"
        Rails.logger.info "******** Start of xmlMapperObject ************* "
        Rails.logger.info "********* ************"
        p REXML::Document.new($requestString).root

        @xmlMapperObject = ApiPersonXmlMapper.load_from_xml(REXML::Document.new($requestString).root)
        p $requestString
        p  @xmlMapperObject
        #.address#.city
        Rails.logger.info "******** xmlMapperObject ************* "

      rescue => e
        exception.push(e)
        render xml:exception, status: '404'
      end
    end

  end

  def load_xml_mapper
    ## This block is very important and will thourughly look for a valid XML
    begin
      #Rails.logger.info "********* ************"
      #Rails.logger.info "********* ************"
      p REXML::Document.new($requestString).root

      @xmlMapperObject = ApiPersonXmlMapper.load_from_xml(REXML::Document.new($requestString).root)
        #p $requestString
        p  @xmlMapperObject
        #.address#.city
        Rails.logger.info "******** xmlMapperObject in load_xml_mapper @@@@@@@@@@@@@ "

    rescue => e
      exception.push(e)
      render xml:exception, status: '404'
    end
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

  # Need to optimize this block

  def response_logging(person,status, response_body)
    if person
      object_id = person.id
    else
      object_id =""
    end

    logDatum = LogDatum.find_by_id($logDatumId.id) if $logDatumId
    logDatum.update({:status => status, :object_id => object_id, :response_body => response_body}) if logDatum
  end

  def add_file(file_name, file_content,document_type,tmp_file_name, action,status,person_id,user)

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
    log_datum_params = {:file => uploaded_file, :document_type =>document_type, :file_name => file_name, :context => "REST", :object =>"Person", :method => action, :status => status, :object_id => person_id, :user => user}
    $logDatumId = LogDatum.create(log_datum_params)
  end
end