json.array!(@users) do |user|
  json.extract! user, :id,  :domain, :email, :username, :type, :provider, :uid, :role, :first_name,
                :last_name, :street_address, :zipcode, :country, :state, :middle_name,
                :prs_organization_name, :receive_email_notifications, :role_requested, :organization_id, :user_status_id
  json.url user_url(user, format: :json)
end
