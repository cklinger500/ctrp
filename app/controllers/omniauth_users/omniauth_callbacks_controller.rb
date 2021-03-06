class OmniauthUsers::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    Rails.logger.info "In here callback"
    @user = OmniauthUser.find_for_google_oauth2(request.env["omniauth.auth"], current_omniauth_user)

    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
      sign_in_and_redirect @user, :event => :authentication
    else
      session["devise.google_data"] = request.env["omniauth.auth"]
      redirect_to new_omniauth_user_registration_url
    end
  end
end