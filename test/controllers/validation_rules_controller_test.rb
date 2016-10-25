require 'test_helper'

class ValidationRulesControllerTest < ActionController::TestCase
  setup do
    @validation_rule = validation_rules(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:validation_rules)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create validation_rule" do
    assert_difference('ValidationRule.count') do
      post :create, validation_rule: {  }
    end

    assert_redirected_to validation_rule_path(assigns(:validation_rule))
  end

  test "should show validation_rule" do
    get :show, id: @validation_rule
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @validation_rule
    assert_response :success
  end

  test "should update validation_rule" do
    patch :update, id: @validation_rule, validation_rule: {  }
    assert_redirected_to validation_rule_path(assigns(:validation_rule))
  end

  test "should destroy validation_rule" do
    assert_difference('ValidationRule.count', -1) do
      delete :destroy, id: @validation_rule
    end

    assert_redirected_to validation_rules_path
  end
end
