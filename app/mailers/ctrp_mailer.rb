class CtrpMailer < ApplicationMailer
  default from: "noreply@ctrp.nci.nih.gov"

  def general_email(from, to, cc, bcc, subject, body_text, body_html)
    @body_text = body_text
    @body_html = body_html
    mail(from: from, to: to, cc: cc, bcc: bcc, subject: subject)
  end
end
