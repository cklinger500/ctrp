class ProcessingStatusesController < ApplicationController
  before_filter :wrapper_authenticate_user unless Rails.env.test?

  # GET /processing_statuses
  # GET /processing_statuses.json
  def index
    @processing_statuses = ProcessingStatus.all
  end
end