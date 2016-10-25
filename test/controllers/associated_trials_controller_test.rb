require 'test_helper'

class AssociatedTrialsControllerTest < ActionController::TestCase
  setup do
    @associated_trial = associated_trials(:one)
  end

  test "should get index" do
    get :index
    #assert_response :success
    #assert_not_nil assigns(:associated_trials)
  end

  test "should get new" do
    get :new
    #assert_response :success
  end

  # test "should create associated_trial" do
  #   assert_difference('AssociatedTrial.count') do
  #     post :create, associated_trial: {  }
  #   end
  #
  #   assert_redirected_to associated_trial_path(assigns(:associated_trial))
  # end

  test "should show associated_trial" do
    get :show, id: @associated_trial
    #assert_response :success
  end

  test "should get edit" do
    get :edit, id: @associated_trial
    #assert_response :success
  end

  # test "should update associated_trial" do
  #   patch :update, id: @associated_trial, associated_trial: {  }
  #   assert_redirected_to associated_trial_path(assigns(:associated_trial))
  # end

  test "should destroy associated_trial" do
    assert_difference('AssociatedTrial.count', -1) do
      delete :destroy, id: @associated_trial
    end

    #assert_redirected_to associated_trials_path
  end
end
