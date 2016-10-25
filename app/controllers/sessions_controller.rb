class SessionsController < Devise::SessionsController
  skip_before_filter :verify_signed_out_user

  def create

    begin
      user_class = nil
      error_string = 'Login failed'
      Rails.logger.debug "In SessionController's create method"
      #Rails.logger.debug "#{request.inspect}"
      #Rails.logger.debug "request params = #{request.params.inspect} "
      #Rails.logger.debug "user = #{request.params['user']} "

      source = ""
      # Get the source of the Login, Rails or Angular. It is set on the devise login screen
      unless request.params.blank? || request.params["source"].blank?
        source = request.params["source"]
        Rails.logger.debug "source = #{source.inspect}"
      end

      # Copy user data to ldap_user and local_user
      request.params['ldap_user'] = request.params['local_user'] = request.params['user']

      user = nil
      if request.params['user'].blank? || request.params['user']["username"].blank?
        self.raise_login_failed(error_text)
      end

      user = User.custom_find_by_username(request.params['user']["username"])

      if user.blank? || user.user_status_id != UserStatus.find_by_code('ACT').id
        error_text = "The User does not exist in the database as an LdapUser or a LocalUser"
        self.raise_login_failed(error_text)
      end

      if user.role == "ROLE_SERVICE-REST"
        error_text = "This User role does not have access to UI"
        self.raise_login_failed(error_text)
      end


      ## Print informational login messages
      user.log_debug

      if user.is_a?(LdapUser)
        # First try logging in as an LDAP user
        user_class = :ldap_user
        error_string = 'LDAP details incorrect'
        # Use Warden to authenticate the user, if we get nil back, it failed.
        Rails.logger.info "Before warden authenticate for LDAP =  #{self.resource.inspect}"
        begin
          self.resource = warden.authenticate scope: user_class
        rescue
          Rails.logger.info "LDAP Authentication failed."
        end
        Rails.logger.info "Result of warden authenticate for LDAP = #{self.resource.inspect}"
      end
      # If the user is a localUser or LDAP Authentication has failed, try logging in as a Local user
      if self.resource.nil? || user.is_a?(LocalUser)
        if self.resource.nil?
          Rails.logger.info "LDAP Authentication failed. Logging in as an local user"
        end
        user_class = :local_user
        self.resource = warden.authenticate({ scope: resource_name, recall: "#{controller_path}#new" })
        Rails.logger.info "Result of warden authenticate = #{self.resource.inspect}"
        if self.resource.nil?
          raise "Unable to login user=#{user.inspect}"
        end
        set_flash_message(:notice, :signed_in) if is_flashing_format?
        sign_in(resource_name, resource)
        yield resource if block_given?
      else
        # Now we know the LDAP user is authenticated, sign them in to the site with Devise
        # At this point, self.resource is a valid user account.
        Rails.logger.info "#{self.resource.inspect}"
        sign_in(user_class, self.resource)
        #respond_with self.resource, :location => after_sign_in_path_for(self.resource)
      end

      ## Generate JWT token
      token = create_token({:user_id => self.resource.id})

      ############################### ****REDIS CODE**** #######################
      Rails.logger.info("In the process of setting token to REDIS-SERVER")
      $redis.set(token,self.resource.id)
      Rails.logger.info "yes it is #{$redis.get(token)} "

      ############################# //End of REDIS CODE // #####################

      #user = User.find_by_id(self.resource.id)
      #user.token = token
      #user.save!
      Rails.logger.info "Result of warden authenticate JWT token = #{token.inspect}"
      #self.resource.current_role = self.resource.role
      set_current_user(self.resource)
      auth_json = create_authorization_json(self.resource, token)
      Rails.logger.info "authjson= #{auth_json.inspect}"
      if source == "Rails"
        redirect_to users_path
      else
        render json: auth_json
      end
    rescue  => e
      Rails.logger.info "In Session Controller, exception handling"
      Rails.logger.info "Unable to Login user"
      Rails.logger.info e.backtrace
      Rails.logger.info "#{self.resource.inspect}" unless self.resource.nil?
      flash[:error] = error_string
      render :status => 403,
             :json => { :success => false,
                        :info => "Login Failure",
             }
    ensure
    end

  end

  def destroyrailslogin
    Rails.logger.info "In Session Controller, destroy method, without Angular"
      method(:destroy).super_method.call
  end

  def destroy
    Rails.logger.info "In Session Controller, destroy method"
    Rails.logger.info "params = #{request.params} "


    user = User.find_by_id(request.params["user_id"]) || User.custom_find_by_username(request.params["username"]) || User.custom_find_by_username(request.params['user']["username"])
    Rails.logger.info "user = #{user.inspect} "
    source = request.params["source"] || ""
    sign_out(user)

    ############################### ****REDIS CODE**** #######################
    Rails.logger.info("In the process of deleting token from REDIS-SERVER")

    current_token = parse_request_header

    Rails.logger.info "yes it is #{$redis.get(current_token)} "

    Rails.logger.info("Token #{current_token}")
    $redis.del(current_token)
    ############################# //End of REDIS CODE // #####################

    user.current_sign_in_at = nil
    user.save!
    reset_current_user
    current_user = nil
    current_ldap_user = nil
    current_local_user = nil
    # Destroy session
    #method(:destroy).super_method.call
    if source == "Angular"
      render :status => 200,
             :json => { :success => true,
                        :info => "Logged out",
             }
    else
      method(:destroy).super_method.call
    end
  end

  def new
    # Set up a blank resource for the view rendering
    #Rails.logger.info "#{self.inspect}"
    self.resource = User.new
  end

  def raise_login_failed(error_text)
    error_string = error_text || 'Login failed'
    Rails.logger.error error_text
    raise error_text
  end
end
