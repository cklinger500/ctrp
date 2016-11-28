require 'test_helper'

class FamiliesControllerTest < ActionController::TestCase
  setup do
    @family = families(:five)
  end

  test "should get index" do
    get :index, format: "json"
    assert_response :success
    assert_not_nil assigns(:families)
  end

  test "should create family" do
    assert_difference('Family.count') do
      post :create, family: { name: @family.name, family_status_id: @family.family_status_id, family_type_id: @family.family_type_id},  format: "json"
    end
    assert_template :show
    assert_response :created
  end

  test "should show family" do
    get :show, id: @family, format: "json"
    assert_response :success
  end

  test "should update family" do
    patch :update, id: @family, family: { name: @family.name, family_status_id: @family.family_status_id, family_type_id: @family.family_type_id},  format: "json"
    assert_template :show
    assert_response :ok
  end

  test "should destroy family" do
    assert_difference('Family.count', -1) do
      delete :destroy, id: @family, format: "json"
    end

    assert_response :no_content
  end


  # Family search tests
  test "should search family by name" do
    test_data = [{ "result" => "Albert Einstein Cancer Center", "test_values" => ['Albert Einstein Cancer Center', 'Albert*']},
                 { "result" => "Arizona Cancer Center", "test_values" => ['Arizona*', 'Ar*']},
                   { "result" => "Yale Cancer Center", "test_values" => ['Y*', 'YALE*']}]
    test_data.each do |t|
      #puts "name: #{t.inspect}"
      t["test_values"].each do |x|
        test_response = get :search, name: x, format: 'json'
        search_result = JSON.parse(test_response.body)
        #puts "Search Result: #{search_result.inspect}"
        #puts 'Center=', search_result['families'][0]['name']
        assert_equal t["result"], search_result['families'][0]['name']
      end
    end
  end

  test "should search family by type" do
    [ family_types(:one), family_types(:two), family_types(:three), family_types(:four)].each do |x|
      #puts "family_type: #{x.inspect}"
      test_response = get :search, family_type: x.name, format: 'json'
      search_result = JSON.parse(test_response.body)
      #puts "Search Result: #{search_result.inspect}"
      #puts "family_type=#{x.inspect} + search_result_family_type = #{search_result['families'][0]["family_type_id"]}"
      assert_equal x.id, search_result['families'][0]["family_type_id"]
    end
  end

  test "should search family by status" do
    [ family_statuses(:one), family_statuses(:two)].each do |x|
      #puts "family_status: #{x.inspect}"
      test_response = get :search, family_status: x.name, format: 'json'
      search_result = JSON.parse(test_response.body)
      #puts "Search Result: #{search_result.inspect}"
      #puts "family_status=#{x.inspect} + search_result_family_status = #{search_result['families'][0]["family_status_id"]}"
      assert_equal x.id, search_result['families'][0]["family_status_id"]
    end
  end

end
