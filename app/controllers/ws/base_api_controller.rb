class Ws::BaseApiController < ApplicationController
  #force_ssl

  CONTENT_TYPE        =   "application/xml"
  IMPORT_TRIAL_ACTION = "import_trial"

  before_filter :check_auth, :is_valid_mime

  def indicate_source
    @api = true
  end

  private
  def authenticate_user_from_token!

    if !@json['api_token']
      render nothing: true, status: :unauthorized
    else
      @user = nil
      User.find_each do |u|
        if Devise.secure_compare(u.api_token, @json['api_token'])
          @user = u
        end
      end
    end
  end

  def parse_request
    @json = JSON.parse(request.body.read)
  end


  def check_auth
    begin
    authenticate_or_request_with_http_basic do |username,password|
      resource = User.find_by_username_and_role(username,"ROLE_SERVICE-REST")

      @current_user = resource

      if resource && resource.valid_password?(password)
        sign_in :user, resource
      end

    end
    rescue Errors::UnauthorizedAccessError => error
      render(xml: error, status: error.status)
    end

  end

  def is_valid_mime
    action = request.path_parameters[:action]
    p request.content_type

    ##check content_type
    if  action != IMPORT_TRIAL_ACTION &&request.content_type != CONTENT_TYPE
      render nothing:true, status: '415'
    elsif action == IMPORT_TRIAL_ACTION && !request.content_type.nil?
      render nothing:true, status: '415'
    end


  end


end