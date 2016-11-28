class UserStatusesController < ApplicationController
  #before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /user_statuses
  # GET /user_statuses.json
  def index
    @user_statuses = UserStatus.all
  end

end
