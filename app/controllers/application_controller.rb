class ApplicationController < ActionController::Base
  respond_to :html, :xml, :json
  around_filter :global_request_logging
  before_filter :set_time_zone

  def set_time_zone
    Time.zone = 'Eastern Time (US & Canada)'
  end


  #before_filter :wrapper_authenticate_user unless Rails.env.test?
  #check_authorization :unless => :devise_controller?
  rescue_from DeviseLdapAuthenticatable::LdapException do |exception|
    render :text => exception, :status => 500
  end

  rescue_from CanCan::AccessDenied do |exception|
    Rails.logger.debug "Access denied onn #{exception.action} #{exception.subject.inspect}"
    Rails.logger.debug "Access denied onn #{exception.subject.inspect}"
    unless exception.subject ==  :rails_admin
      respond_with do |format|
        if user_signed_in?
          format.json { render json: { message: "You don't have permissions." }, status: :forbidden }
        else
          format.json { render json: { message: "You need to be logged in." }, status: :unauthorized }
        end
      end
    end
  end

  before_action :configure_permitted_parameters, if: :devise_controller?

  #@@current_user = current_user

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  # CSRF protection for AngularJS
  #after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def reset_current_user
    Rails.logger.debug "\nIn Application Controller, reset_current_user, Setting Current User to Nil"
    @current_user = nil
  end

  def parse_request_header
    # Extract JWT token from the request header and check Accept Flag
    auth_string = request.headers['Authorization']
    if auth_string.blank?
      return nil
    end
    #Rails.logger.debug "\n, In Application controller, parse_request_header, auth_string = #{auth_string.inspect}"
    accept_flag = auth_string.split(" ")[0]
    #Rails.logger.debug "In Application controller, parse_request_header, accept_flag = #{accept_flag.inspect}"
    #if accept_flag != "Accept"
     # Rails.logger.error "The User didnot Accept the GSA"
      #Rails.logger.debug "Accept flag is not true"
      #raise CanCan::AccessDenied.new("Not authorized!")
      #redirect_to destroy_session_url
    #end
    token = auth_string.split(" ")[1]
    return token
  end

  def wrapper_authenticate_user
    #Rails.logger.info "In wrapper_authenticate_user session = #{session.inspect}"
    token = parse_request_header
    @token = nil

    ## If the App was accessed with the Angular UI, it will have a token, else the token will be nil
    if token.blank?
      ## The App was signed/accessed via the Rails App (not Angular)
      #Rails.logger.debug "\nIn Application Controller, wrapper_authenticate_user, get_user = #{get_user.inspect} "
      user = @current_user || current_local_user || current_ldap_user
      Rails.logger.debug "\nIn Application Controller, wrapper_authenticate_user, user username = #{user.username.inspect} " unless user.nil?
      Rails.logger.debug "\nIn Application Controller, wrapper_authenticate_user, user current_sign_in_at = #{user.current_sign_in_at.inspect} " unless user.nil?
      if  !user.nil? && !user.current_sign_in_at.nil?
        authenticate_user(user)
      else
        raise CanCan::AccessDenied.new("Not authorized!")
      end
      Rails.logger.debug "\nIn Application Controller, wrapper_authenticate_user, current user  #{@current_user.inspect}" unless @current_user.nil?
      Rails.logger.debug "\nIn Application Controller, wrapper_authenticate_user, current user is NIL " if @current_user.nil?
    else
      # The App was signed in using Angular
      Rails.logger.info "token = " + token
      # Decode the token
      begin
        Rails.logger.info "Getting it #{$redis.get(token)}"
        user_id = $redis.get(token)
        if user_id.nil?
          Rails.logger.info "SERIOUS FLAG Some one trying to hijack the session with this token #{token}"
          raise "Hijackng Session ........."
        else
           user_id = decode_token(token)
        end

      rescue => e
        Rails.logger.debug "Unable to decode token exception #{e.backtrace}"
        raise "Unable to decode token. The Authentication of the user cannot be performed"
      end
      user = User.find_by_id(user_id)
      authenticate_user(user) if user
    end
    #Rails.logger.info "End of wrapper_authenticate_user"
  end

  def authenticate_user(user)
    begin
      # All options given to sign_in is passed forward to the set_user method in warden.
      # The only exception is the :bypass option, which bypass warden callbacks and stores
      # the user straight in session. This option is useful in cases the user is already
      # signed in, but we want to refresh the credentials in session.
      sign_in user, :bypass => true
      set_current_user(user)
    rescue => e
      e.backtrace
      Rails.logger.debug "Unable to authenticate user exception #{e.backtrace}"
      raise "Unable to authenticate User. The Authentication of the user cannot be performed"
    end
  end


  def set_current_user(user)
    Rails.logger.debug "\nApplication Controller, set_current_user, user=#{user.username}, role=#{user.role}" unless user.blank?
    @current_user = user
    set_devise_methods(user)
  end

  def set_devise_methods(user)
    Rails.logger.debug "\nApplication Controller, set_devise_methods, user=#{user.username}, role=#{user.role}" unless user.blank?
    if user.is_a?(LdapUser)
      current_ldap_user = user
    elsif user.is_a?(LocalUser)
      current_local_user = user
    else
      current_user = user
    end
  end


  # This method is used by the non-Angular login
  def get_user
    Rails.logger.debug "In get_user"
    # Rails.logger.info "In get_user USER_ID  = #{session.inspect}"
    unless session.nil? || session["warden.user.user.key"].nil? || session["warden.user.user.key"][0].nil? || session["warden.user.user.key"][0][0].nil?
      user_id  = session["warden.user.user.key"][0][0]
      user = User.find_by_id(user_id)
      if user.nil? || user.current_sign_in_at.nil?
        return nil
      end
      Rails.logger.debug "\nIn Application Controller, get_user, user = #{user.inspect}"
      Rails.logger.debug "\nIn Application Controller, get_user, current_signed= #{user.current_sign_in_at.inspect}"
      @current_user = user
      return @current_user
    end
    return nil
  end

  ## TODO secret must be an environmental variable
  def create_token(token_data)
    hmac_secret = Rails.application.secrets.secret_key_base
    exp = Time.now.to_i + 120*60 # 120 Minutes
    exp_payload = { :token => token_data, :exp => exp }
    JWT.encode(exp_payload, hmac_secret, 'HS256')
    #JWT.encode(token_data, secret)
  end

  ## TODO secret must be an environmental variable
  def decode_token(token)
    hmac_secret = Rails.application.secrets.secret_key_base
    begin
      decoded_token = JWT.decode token, hmac_secret, true, { :algorithm => 'HS256' }
      #decoded_token = JWT.decode token, hmac_secret
      Rails.logger.info "decoded_token = #{decoded_token}"
    rescue JWT::ExpiredSignature
      # Handle expired token, e.g. logout user or deny access
      raise CanCan::AccessDenied.new("Not authorized! Token Expired!")
    end
    if decoded_token.blank? || decoded_token[0]["token"].blank? || decoded_token[0]["token"]["user_id"].blank?
      raise CanCan::AccessDenied.new("Not authorized! No Token!")
    end
    return decoded_token[0]["token"]["user_id"]
  end


  ## TODO secret must be an environmental variable
  def create_authorization_json(user, token)
    begin
      Rails.logger.info "In create_authorization_json user=#{user.inspect}"

      app_version = Rails.configuration.application_version
      auth_json = {
          app_version: app_version,
          token: token,
          role: user.role,
          user_id: user.id,
          privileges: user.get_write_mode,
          user_type: user.type,
          env: Rails.env
                    }

      Rails.logger.info "In create_authorization_json auth_json = #{auth_json.inspect}"
      return auth_json
    rescue => e
      Rails.logger.info "In Application Controller, exception handling"
      Rails.logger.info e.message
      Rails.logger.info e.backtrace
    end
  end



  #############
  ###This section will take care of catching up all general exceptions thrown by rails 4.x app.
  ###RAILS 4 Exception Handling
  ###
  ## STOP STOP STOP, READ FOLLOWING -------->>>>>>>>>>>>>
  # Before placing your code, please aware that specific/child exceptions should be followed by general/parent exceptions
  # THUMB RULE is place Big-Basket first and then Small-Baskets. In Rails Exception class is the BIG BASKET.
  ############


  ### StandardError
  ### \----------------------------/ Big Basket for Active Record
  #rescue_from StandardError do |e|
   # respond_with do |format|
    #  format.json { render json: { errors: "Standard eroors may be restricting to save your form data" }, status:500 }
    #end
  #end


  ### ActiveRecord ####
  ### \----------------------------/ Big Basket for Active Record
  rescue_from ActiveRecord::ActiveRecordError do |e|
    respond_with do |format|
      format.json { render json: { errors: "Currently, Object-relation mapping issues may be restricting to save your form data" }, status:500 }
    end
  end


  ##ActiveRecord::NoDatabaseError
  ##\---/ Small Basket

  rescue_from  ActiveRecord::NoDatabaseError do |exception|
    respond_to do |format|
      format.json { render json: { errors: "Database does not exist" }, status: 500 }
    end
  end

  ##ActiveRecord::ConnectionNotEstablished
  ##\---/ Small Basket
  rescue_from    ActiveRecord::ConnectionNotEstablished do |exception|
    respond_to do |format|
      format.json { render json: { errors: "Connection to the database could not been established" }, status: 500 }
    end
  end

  ##ActiveRecord::StatementInvalid
  ##\---/ Small Basket
  rescue_from   ActiveRecord::StatementInvalid do |exception|
    respond_to do |format|
      format.json { render json: { errors: "The form data is not in a valid state to be saved" }, status: 422 }
    end
  end

  ##ActiveRecord::StaleObjectError
  ##\---/ Small Basket
  rescue_from ActiveRecord::StaleObjectError do |exception|
    respond_to do |format|
      format.html {
        flash.now[:error] = "Another user has updated this record while you were editing"
        render :edit, status: :conflict
      }
      format.json { render json: { "error": "Another user has updated this record while you were editing" }, status: :conflict }
    end
  end

 ###Active Record End ####

  ### ActionView
  ### \----------------------------/ Big Basket for ActionView
  rescue_from  ActionView::ActionViewError do |e|
    respond_to do |format|
      format.json { render json: { errors: "The form data is not in a valid state to be saved" }, status: 500 }
    end
  end





  protected

  def configure_permitted_parameters
#    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:domain, :organization_name, :organization_id, :username, :email, :first_name, :last_name, :password, :password_confirmation, selected_functions: []) }
#    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:username, :email, :password) }
#    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :password, :password_confirmation, :current_password, :role) }
  end

=begin
  def verified_request?
    if respond_to?(:valid_authenticity_token?, true)
      # Rails 4.2 and above
      super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
    else
      # Rails 4.1 and below
      super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
    end
  end
=end

  def after_sign_out_path_for(resource)
    request.referrer
  end

 # def after_sign_up_path_for(resource)
 #   Rails.logger.info "In after_sign_up_path_for"
 #   redirect_to users_path
 # end


  def current_ctrp_user
    user = get_user
    Rails.logger.debug "\nIn Application Controller, current_ctrp_user, user obtained from get_user = #{user.inspect}"
    current_local_user || current_ldap_user || user
  end

  def current_ctrp_user_role_details user_role
    role_details = {}
    all_roles = AppSetting.find_by_code('USER_ROLES') ?
        (JSON.parse (AppSetting.find_by_code('USER_ROLES')["big_value"].gsub("\n",'').gsub("\\",'').split.join(" "))) : nil
    if !all_roles.nil?
      role_details = all_roles.select { |role| role["id"] == user_role }[0]
    end
    return role_details
  end

  def global_request_logging
    http_request_header_keys = request.headers.env.keys.select{|header_name| header_name.match("^HTTP.*")}
    http_request_headers = request.headers.env.select{|header_name, header_value| http_request_header_keys.index(header_name)}
    logger.info "Received #{request.method.inspect} to #{request.url.inspect} from #{request.remote_ip.inspect}.  Processing with headers #{http_request_headers.inspect} and params #{params.inspect}"
    begin
      yield
    ensure
      #logger.info "Responding with #{response.status.inspect} => #{response.body.inspect}"
      logger.info "Responding with #{response.status.inspect} "
    end
  end

end
