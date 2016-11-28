require 'test_helper'

class OutcomeMeasuresControllerTest < ActionController::TestCase
=begin
  setup do
    @outcome_measure = outcome_measures(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:outcome_measures)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create outcome_measure" do
    assert_difference('OutcomeMeasure.count') do
      post :create, outcome_measure: {  }
    end

    assert_redirected_to outcome_measure_path(assigns(:outcome_measure))
  end

  test "should show outcome_measure" do
    get :show, id: @outcome_measure
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @outcome_measure
    assert_response :success
  end

  test "should update outcome_measure" do
    patch :update, id: @outcome_measure, outcome_measure: {  }
    assert_redirected_to outcome_measure_path(assigns(:outcome_measure))
  end

  test "should destroy outcome_measure" do
    assert_difference('OutcomeMeasure.count', -1) do
      delete :destroy, id: @outcome_measure
    end

    assert_redirected_to outcome_measures_path
  end
=end
end
