require 'test_helper'

class SiteRecStatusWrappersControllerTest < ActionController::TestCase
  setup do
    @site_rec_status_wrapper = site_rec_status_wrappers(:one)
  end
=begin
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:site_rec_status_wrappers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create site_rec_status_wrapper" do
    assert_difference('SiteRecStatusWrapper.count') do
      post :create, site_rec_status_wrapper: {  }
    end

    assert_redirected_to site_rec_status_wrapper_path(assigns(:site_rec_status_wrapper))
  end

  test "should show site_rec_status_wrapper" do
    get :show, id: @site_rec_status_wrapper
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @site_rec_status_wrapper
    assert_response :success
  end

  test "should update site_rec_status_wrapper" do
    patch :update, id: @site_rec_status_wrapper, site_rec_status_wrapper: {  }
    assert_redirected_to site_rec_status_wrapper_path(assigns(:site_rec_status_wrapper))
  end

  test "should destroy site_rec_status_wrapper" do
    assert_difference('SiteRecStatusWrapper.count', -1) do
      delete :destroy, id: @site_rec_status_wrapper
    end

    assert_redirected_to site_rec_status_wrappers_path
  end
=end
end
