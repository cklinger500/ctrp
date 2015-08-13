class ApplicationController < ActionController::Base
  #check_authorization :unless => :devise_controller?
  rescue_from DeviseLdapAuthenticatable::LdapException do |exception|
    render :text => exception, :status => 500
  end
  rescue_from CanCan::AccessDenied do |exception|
    Rails.logger.debug "Access denied onn #{exception.action} #{exception.subject.inspect}"
    respond_with do |format|
      if user_signed_in?
        format.json { render json: { message: "You don't have permissions." }, status: :forbidden }
      else

        format.json { render json: { message: "You need to be logged in." }, status: :unauthorized }
      end
      Rails.logger.info "DONE!"
    end
  end
  before_action :configure_permitted_parameters, if: :devise_controller?

  #@@current_user = current_user

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  # CSRF protection for AngularJS
  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def wrapper_authenticate_user
    Rails.logger.info "In authenticate_user!!! params = #{params.inspect} USER_ID 1= #{session.inspect}"

    #token = params["token"]
    #decoded_token = JWT.decode token, "secret"
    token = request.headers['Authorization']
    ## If the App was accessed with the Angular UI, it will have a token, else the token will be nil
    if token.nil?
      ## If it is a GET request
      username = params["username"]
      user = User.find_by_username(username)
=begin
      if local_user_signed_in?
        Rails.logger.info "Hi In authenticate_user! local"
        authenticate_local_user!
      elsif ldap_user_signed_in?
        Rails.logger.info "Hi In authenticate_user! ldap"
        authenticate_ldap_user!
      else
        Rails.logger.info "Hi In authenticate_user! omniauth"
        authenticate_user!
      end
=end

    else
      Rails.logger.info "token = " + token
      decoded_token = JWT.decode token, "secret"
      user_id =  decoded_token[0]["user_id"]
      user = User.find_by_id(user_id)

      #Rails.logger.info "User timeout  = #{user.timedout?(5.minutes.ago).inspect}"
      #Rails.logger.info "User retrieved from token = #{user.inspect}"
      #Rails.logger.info "User session 3 = #{session.inspect}"

      current_user = user
      current_ldap_user = user
    end
    begin
      # All options given to sign_in is passed forward to the set_user method in warden.
      # The only exception is the :bypass option, which bypass warden callbacks and stores
      # the user straight in session. This option is useful in cases the user is already
      # signed in, but we want to refresh the credentials in session.
      sign_in user, :bypass => true
    rescue => e
      e.backtrace
    end
    Rails.logger.info "User session 4 = #{session.inspect}"
    current_user = user
    if user.is_a?(LdapUser)
      current_ldap_user = user
    elsif user.is_a?(LocalUser)
      current_local_user = user
    else
      current_user = user
    end
    @current_user = user
  end

  def get_user
    Rails.logger.info "HIII IN test_user"
    Rails.logger.info "Hi In test_user USER_ID 6 = #{session.inspect}"
    unless session.nil? || session["warden.user.user.key"].nil? || session["warden.user.user.key"][0].nil? || session["warden.user.user.key"][0][0].nil?
      @user_id  = session["warden.user.user.key"][0][0]
      return @current_user = User.find_by_id(@user_id)
    end

    if current_local_user
      @user_id = current_local_user.id
      @current_user = current_local_user
    elsif current_ldap_user
      @user_id = current_ldap_user.id
      @current_user = current_ldap_user
    else
      Rails.logger.info "#{current_omniauth_user.inspect}"
      Rails.logger.info "#{current_user.inspect}"
      @user_id = current_user.id
    end
    @current_user = User.find_by_id(@user_id)
  end


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :role) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:username, :email, :password) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :password, :password_confirmation, :current_password, :role) }
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
end
