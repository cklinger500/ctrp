class DmzUtilsController < ActionController::Base

  def get_app_version
      @app_version = Rails.configuration.application_version
  end

  def get_git_info
    @git_full_revision = CTRP::GIT_FULL_REVISION
    @git_short_revision = CTRP::GIT_SHORT_REVISION
    @git_branch = CTRP::GIT_BRANCH
  end

end
