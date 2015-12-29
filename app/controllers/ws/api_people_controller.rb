class Ws::ApiPeopleController < Ws::BaseApiController
  #wrap_parameters format: [:json, :xml]

  before_filter :find_person, only: [:show, :update]
  before_filter :sam, only: [:change_status]

  before_filter only: [:create,:update] do
    string = request.body.read
    case
      when request.content_type == "application/xml"
        @object = Hash.from_xml(string)
        puts @object
        #doc = Nokogiri::XML(string)
        #@object=Hash.from_xml(doc.to_s)

      when request.content_type == "application/json"
        @object = JSON.parse(string)
      else
        render nothing: true, status: :bad_request
    end

    personkeys = @object["person"]

    puts personkeys

    puts personkeys["contact"].select {|h1| h1['type']=='EMAIL'}#.first['__content__']

      if personkeys.assoc("contact").length > 0
        puts "hello"
        #personkeys.store(:key, "email") if @object["person"]["contact"][0]["type"] == "EMAIL"
        #personkeys["email"] = @object["person"]["contact"][0]["value"] if @object["person"]["contact"][0]["type"] == "EMAIL"
        #personkeys.store(:key, "email") if @object["person"]["contact"][0]["type"] == "PHONE"
        #personkeys["email"] = @object["person"]["contact"][0]["value"] if @object["person"]["contact"][0]["type"] == "EMAIL"
        #puts  personkeys["contact"].select {|h1| h1['type']=='PHONE'}.first['value']
        #puts personkeys["contact"].select {|h1| h1['type']=='EMAIL'}.first['value']

        if personkeys["contact"].find {|h1| h1['type']=='EMAIL'}
          #personkeys.store(:key, "email")
          personkeys["email"] = personkeys["contact"].select {|h1| h1['type']=='EMAIL'}.first['value'] if personkeys["contact"].select {|h1| h1['type']=='EMAIL'}.first['value']
          personkeys["email"] = personkeys["contact"].select {|h1| h1['type']=='EMAIL'}.first['__content__'] if personkeys["contact"].select {|h1| h1['type']=='EMAIL'}.first['__content__']

        end
        if personkeys["contact"].find {|h1| h1['type']=='PHONE'}
          #personkeys.store(:key, "phone")
          personkeys["phone"] = personkeys["contact"].select {|h1| h1['type']=='PHONE'}.first['value'] if personkeys["contact"].select {|h1| h1['type']=='PHONE'}.first['value']
          personkeys["phone"] = personkeys["contact"].select {|h1| h1['type']=='PHONE'}.first['__content__'] if personkeys["contact"].select {|h1| h1['type']=='PHONE'}.first['__content__']

        end
        #if personkeys["contact"].find {|h1| h1['type']=='FAX'}
          #personkeys.store(:key, "fax")
          #personkeys["fax"] = personkeys["contact"].select {|h1| h1['type']=='FAX'}.first['value']
        #end

      end



    if personkeys.has_key?("address")
      personkeys.delete("address")
    end

    if personkeys.has_key?("contact")
      personkeys.delete("contact")
    end

    if personkeys.has_key?("status")
      puts SourceStatus.find_by_name(personkeys["status"])
      personkeys["source_status_id"]=SourceStatus.find_by_name(personkeys["status"]).id
      personkeys.delete("status")
    end


    mappings = {"firstName" => "fname", "lastName" => "lname","middleName" => "mname", "prefix" => "prefix", "suffix" => "suffix", "email" => "email", "fax" => "fax", "phone" => "phone"}
    personkeys.keys.each { |k| personkeys[ mappings[k] ] = personkeys.delete(k) if mappings[k] }



  end


  #before_filter only: :update do
   # unless @json.has_key?('person')
    #  render nothing: true, status: :bad_request
    #end
 # end

  #before_filter only: :create do
   # @person = Person.find_by_name(@json['project']['name'])
  #end

  def index
    #render json: Project.where('owner_id = ?', @user.id)
  end

  def show
    if request.content_type == "application/json"
      render json: @person
    elsif request.content_type == "application/xml"
      render xml: @person
    else
      render json: @person
    end
  end

  def create
    puts "**************"
    puts @object["person"]
    @person= Person.new(@object["person"])
    #@person.assign_attributes(@json['person'])
    if @person.save
      if request.content_type == "application/json"
        puts "**********"
        print response
        puts "***********"
        render json: @person
      elsif request.content_type == "application/xml"
        render xml: @person
      else

      end
    else
      render nothing: true, status: :bad_request
    end

    #end
  end


  def update

    @person =Person.find_by_id(params[:id])
    if @person.update(@object["person"])
      if request.content_type == "application/json"
        render json: @person
      elsif request.content_type == "application/xml"
        render xml: @person
      else

      end
    else
      render nothing: true, status: :bad_request
    end
    end

  def change_status
    puts @status
    status_id = SourceStatus.find_by_name(@status.upcase).id
    if @person.update({"source_status_id" => status_id})
      if request.content_type == "application/json"
        render json: @person
      elsif request.content_type == "application/xml"
        render xml: @person
      else
        render json: @person
      end
    else
      render nothing: true, status: :bad_request
    end
  end

  private
  def find_person
    @person = Person.find_by_id(params[:id])
    render nothing: true, status: :not_found unless @person.present?
  end

  def sam
    @status = request.body.read
    @person = Person.find_by_id(params[:id])
    #render nothing: true, status: :not_found unless @person.present? && request.body.read.length > 0  &&  request.content_type == "text/plain"
  end



  def person_params
    params.require(:person).permit(:source_id, :fname, :mname, :lname, :suffix,:prefix, :email, :phone,
                                   :source_status_id,:source_context_id, :lock_version,
                                   po_affiliations_attributes: [:id, :organization_id, :effective_date,
                                                                :expiration_date, :po_affiliation_status_id,
                                                                :lock_version, :_destroy])
  end
end