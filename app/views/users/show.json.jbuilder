
if @userReadAccess
  json.extract! @user,
                :id,
                :domain,
                :username,
                :email,
                :first_name,
                :last_name,
                :middle_name,
                :phone,
                :phone_ext,
                :prs_organization_name,
                :receive_email_notifications,
                :role,
                :organization_id,
                :organization,
                :family_orgs,
                :user_status,
                :user_status_id,
                :status_date,
                :created_at,
                :updated_at
  json.name_change @name_change
  json.org_families @user.organization.present? && @user.organization.families.present? ? @families : []
  json.write_access @userWriteAccess
  json.read_access @userReadAccess
else
  json.write_access @userWriteAccess
  json.read_access @userReadAccess
end