require 'test_helper'

class NcitDiseaseCodesControllerTest < ActionController::TestCase
  setup do
    @ncit_disease_code = ncit_disease_codes(:one)
  end

  test "should get index" do
    get :index, format: "json"
    assert_response :success
    assert_not_nil assigns(:ncit_disease_codes)
  end

  test "should create ncit_disease_code" do
    assert_difference('NcitDiseaseCode.count') do
      post :create, ncit_disease_code: { disease_code: @ncit_disease_code.disease_code, menu_display_name: @ncit_disease_code.menu_display_name, nt_term_id: @ncit_disease_code.nt_term_id, preferred_name: @ncit_disease_code.preferred_name }, format: "json"
    end

    #assert_redirected_to ncit_disease_code_path(assigns(:ncit_disease_code))
    assert_template :show
    assert_response :created
  end

  test "should show ncit_disease_code" do
    get :show, id: @ncit_disease_code, format: "json"
    assert_response :success
  end

  test "should update ncit_disease_code" do
    patch :update, id: @ncit_disease_code, ncit_disease_code: { disease_code: @ncit_disease_code.disease_code, menu_display_name: @ncit_disease_code.menu_display_name, nt_term_id: @ncit_disease_code.nt_term_id, preferred_name: @ncit_disease_code.preferred_name }, format: "json"
    #assert_redirected_to ncit_disease_code_path(assigns(:ncit_disease_code))
    assert_template :show
    assert_response :ok
  end

  test "should destroy ncit_disease_code" do
    assert_difference('NcitDiseaseCode.count', -1) do
      delete :destroy, id: @ncit_disease_code, format: "json"
    end

    #assert_redirected_to ncit_disease_codes_path
    assert_response :no_content
  end
end
