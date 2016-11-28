class CtrpMailerWrapper
  def self.send_email(mail_template, trial)
    if mail_template.present?
      mail_template.subject = "[CTRP AUM: #{Rails.env}] " + mail_template.subject if !Rails.env.production?
      mail_template.body_html =  "<p>[CTRP AUM: #{Rails.env}]</p>" + mail_template.body_html if !Rails.env.production?

      mail_sending_result = 'Mail server failed to send'
      begin
        CtrpMailer.general_email(mail_template.from, mail_template.to, mail_template.cc, mail_template.bcc, mail_template.subject, mail_template.body_text, mail_template.body_html).deliver_now
        mail_sending_result = 'Success'
      rescue  Exception => e
        Rails.logger.warn "Email delivery error: #{e}"
      end

      ## save the mail sending to mail log
      if mail_template.to.nil? || !mail_template.to.include?("@")
        # recipient email not replaced with actual email address (user does not have email)
        mail_sending_result = 'Failed, recipient email is unspecified or user refuses to receive email notification'
      end

      MailLog.create(from: mail_template.from, to: mail_template.to, cc: mail_template.cc, bcc: mail_template.bcc, subject: mail_template.subject, body: mail_template.body_html, email_template_name: mail_template.name, mail_template: mail_template, result: mail_sending_result, trial: trial)
    end
  end
end
