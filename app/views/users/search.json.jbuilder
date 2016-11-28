if @userSearchAccess
  json.users do
    json.array!(@users) do |user|
      if current_user.role == 'ROLE_ACCOUNT-APPROVER' || current_user.role == 'ROLE_SITE-SU' || current_user.role == 'ROLE_SUPER' || current_user.role == 'ROLE_ADMIN'  || current_user.role == 'ROLE_RO'  || current_user.role == 'ROLE_ABSTRACTOR'
        json.extract! user,
                      :domain,
                      :id,
                      :username,
                      :first_name,
                      :middle_name,
                      :last_name,
                      :email,
                      :user_status_id,
                      :role,
                      :organization_family,
                      :user_org_name,
                      :admin_role,
                      :receive_emails,
                      :status_date,
                      :user_status_name
      else
        json.extract! user, :username, :first_name, :last_name, :organization_name
        json.url user_url(user, format: :json)
      end
    end
  end

  json.search_status @status
  json.search_organization @organization
  json.search_families @families
  json.search_type @searchType

  json.start params[:start]
  json.rows params[:rows]
  json.total @users.respond_to?(:total_count) ? @users.total_count : @users.size
  json.sort params[:sort]
  json.order params[:order]
  json.search_access @userSearchAccess
else
  json.search_access @userSearchAccess
end
