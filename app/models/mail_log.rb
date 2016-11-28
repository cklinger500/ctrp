# == Schema Information
#
# Table name: mail_logs
#
#  id                  :integer          not null, primary key
#  from                :string
#  to                  :string
#  cc                  :string
#  bcc                 :string
#  subject             :string
#  body                :text
#  email_template_name :string
#  result              :string
#  trial_id            :integer
#  mail_template_id    :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
# Indexes
#
#  index_mail_logs_on_mail_template_id  (mail_template_id)
#  index_mail_logs_on_trial_id          (trial_id)
#

class MailLog < ActiveRecord::Base
  include BasicConcerns

  belongs_to :mail_template
  belongs_to :trial
end
