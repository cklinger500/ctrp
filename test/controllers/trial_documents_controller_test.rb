require 'test_helper'

class TrialDocumentsControllerTest < ActionController::TestCase
  setup do
    @trial_document = trial_documents(:one)
  end

  test "should get index" do
    get :index, format: "json"
    assert_response :success
    assert_not_nil assigns(:trial_documents)
  end

  # test "should create trial_document" do
  #   assert_difference('TrialDocument.count') do
  #     post :create, trial_document: { document_subtype: @trial_document.document_subtype, document_type: @trial_document.document_type, file: @trial_document.file, file_name: @trial_document.file_name }, format: "json"
  #   end
  #
  #   assert_template :show
  #   assert_response :created
  # end
  #
  # test "should show trial_document" do
  #   get :show, id: @trial_document, format: "json"
  #   assert_response :success
  # end
  #
  # test "should update trial_document" do
  #   patch :update, id: @trial_document, trial_document: { document_subtype: @trial_document.document_subtype, document_type: @trial_document.document_type, file: @trial_document.file, file_name: @trial_document.file_name }, format: "json"
  #   assert_template :show
  #   assert_response :ok
  # end

  test "should destroy trial_document" do
    assert_difference('TrialDocument.count', -1) do
      delete :destroy, id: @trial_document, format: "json"
    end

    assert_response :no_content
  end
end
