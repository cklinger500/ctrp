# == Schema Information
#
# Table name: users
#
#  id                          :integer          not null, primary key
#  email                       :string(255)      default(""), not null
#  username                    :string(255)      default(""), not null
#  encrypted_password          :string(255)      default(""), not null
#  type                        :string
#  provider                    :string(255)
#  uid                         :string(255)
#  role                        :string(255)
#  reset_password_token        :string(255)
#  reset_password_sent_at      :datetime
#  remember_created_at         :datetime
#  sign_in_count               :integer          default(0), not null
#  current_sign_in_at          :datetime
#  last_sign_in_at             :datetime
#  current_sign_in_ip          :string(255)
#  last_sign_in_ip             :string(255)
#  failed_attempts             :integer          default(0), not null
#  unlock_token                :string(255)
#  locked_at                   :datetime
#  created_at                  :datetime
#  updated_at                  :datetime
#  first_name                  :string
#  last_name                   :string
#  street_address              :text
#  zipcode                     :string
#  country                     :string
#  state                       :string
#  middle_name                 :string
#  prs_organization_name       :string
#  receive_email_notifications :boolean
#  role_requested              :string
#  organization_id             :integer
#  source                      :string
#  user_status_id              :integer
#  phone                       :string
#  city                        :string
#  domain                      :string
#  status_date                 :datetime
#
# Indexes
#
#  index_users_on_organization_id       (organization_id)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#  index_users_on_user_status_id        (user_status_id)
#  index_users_on_username              (username) UNIQUE
#

class OmniauthUser < User
  devise   :omniauthable, :registerable, :recoverable, :trackable, :rememberable

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    Rails.logger.info "In OmniauthUser.find_for_google_oauth2"
    data = access_token.info
    user = OmniauthUser.where(:provider => access_token.provider, :uid => access_token.uid ).first
    if user
      return user
    else
      registered_user = User.where(:email => access_token.info.email).first
      if registered_user
        return registered_user
      else
        user = OmniauthUser.new(provider:access_token.provider,
                        username: data["email"],
                        email: data["email"],
                        uid: access_token.uid ,
                        password: Devise.friendly_token[0,20]
        )
        user.save
        user
      end
    end
  end
end
