class UserStatusesController < ApplicationController
  #before_filter :wrapper_authenticate_user unless Rails.env.test?

  swagger_controller :user_statuses, "User Statuses"

  swagger_api :index do
    summary "Fetches all User Status items"
    notes "This lists all User Statuses"
    param :string, :id, :string, :optional, "User Status Id"
    param :string, :code, :string, :optional, "User Status Code"
    param :string, :name, :string, :optional, "User Status Name"
    response :unauthorized
    response :not_acceptable
    response :requested_range_not_satisfiable
  end

  # GET /user_statuses
  # GET /user_statuses.json
  def index
    @user_statuses = UserStatus.all
  end

end
