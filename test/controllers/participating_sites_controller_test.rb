require 'test_helper'

class ParticipatingSitesControllerTest < ActionController::TestCase
  setup do
    @participating_site = participating_sites(:one)
  end
=begin
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:participating_sites)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create participating_site" do
    assert_difference('ParticipatingSite.count') do
      post :create, participating_site: {  }
    end

    assert_redirected_to participating_site_path(assigns(:participating_site))
  end

  test "should show participating_site" do
    get :show, id: @participating_site
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @participating_site
    assert_response :success
  end

  test "should update participating_site" do
    patch :update, id: @participating_site, participating_site: {  }
    assert_redirected_to participating_site_path(assigns(:participating_site))
  end

  test "should destroy participating_site" do
    assert_difference('ParticipatingSite.count', -1) do
      delete :destroy, id: @participating_site
    end

    assert_redirected_to participating_sites_path
  end
=end
end
