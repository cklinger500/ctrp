# == Schema Information
#
# Table name: mail_templates
#
#  id           :integer          not null, primary key
#  from         :text
#  to           :text
#  cc           :text
#  bcc          :text
#  subject      :text
#  body_text    :text
#  body_html    :text
#  code         :string(255)
#  name         :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

require 'test_helper'

class MailTemplateTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
