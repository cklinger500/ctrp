# == Schema Information
#
# Table name: onholds
#
#  id                 :integer          not null, primary key
#  onhold_desc        :text
#  onhold_date        :date
#  onhold_reason_id   :integer
#  trial_id           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  uuid               :string(255)
#  lock_version       :integer          default(0)
#  onhold_reason_code :string(255)
#  offhold_date       :date
#
# Indexes
#
#  index_onholds_on_onhold_reason_id  (onhold_reason_id)
#  index_onholds_on_trial_id          (trial_id)
#

class Onhold < ActiveRecord::Base
  include BasicConcerns

  belongs_to :onhold_reason
  belongs_to :trial

  after_save :send_email
  after_save :add_processing_status

  private

  def send_email
    # Original email
    if self.offhold_date.nil? && self.onhold_reason.present? && ['SIC', 'SIM', 'SIG', 'SOT'].include?(self.onhold_reason.code)
      mail_template = MailTemplate.find_by_code('ONHOLD_ORIGINAL')
      if mail_template.present?
        lead_protocol_id = self.trial.lead_protocol_id.present? ? self.trial.lead_protocol_id : ''
        trial_title = self.trial.official_title.present? ? self.trial.official_title : ''
        nci_id = self.trial.nci_id.present? ? self.trial.nci_id : ''
        org_name = ''
        if self.trial.lead_org.present?
          org_name = self.trial.lead_org.name
        end

        mail_template.to = '' if self.trial.users.size > 0
        self.trial.users.each_with_index do |owner, i|
          if owner.email.present? && owner.receive_email_notifications
            mail_template.to += ', ' if i > 0
            mail_template.to += owner.email
          end
        end

        # Populate the trial data in the email body
        mail_template.subject.sub!('${nciTrialIdentifier}', nci_id)
        mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
        mail_template.subject = "[#{Rails.env}] " + mail_template.subject if !Rails.env.production?
        mail_template.body_html.sub!('${trialTitle}', trial_title)

        table = '<table border="0">'
        table += "<tr><td><b>Lead Organization Trial ID:</b></td><td>#{lead_protocol_id}</td></tr>"
        table += "<tr><td><b>Lead Organization:</b></td><td>#{org_name}</td></tr>"
        table += "<tr><td><b>NCI Trial ID:</b></td><td>#{nci_id}</td></tr>"
        self.trial.other_ids.each do |other_id|
          table += "<tr><td><b>#{other_id.protocol_id_origin.name}:</b></td><td>#{other_id.protocol_id}</td></tr>"
        end
        table += "<tr><td><b>Submission Date:</b></td><td>#{Date.today.strftime('%d-%b-%Y')}</td></tr>"
        table += '</table>'
        mail_template.body_html.sub!('${trialIdentifiers}', table)

        mail_template.body_html.gsub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
        owners = ''
        self.trial.users.each_with_index do |owner, i|
          owners += ', ' if i > 0
          owners += owner.first_name + ' ' + owner.last_name
        end
        mail_template.body_html.sub!('${trialOwner}', owners)
        mail_template.body_html.sub!('${onholdReason}', self.onhold_reason.name)
        mail_template.body_html.sub!('${nextDate}', (Date.today + 1).strftime('%d-%b-%Y'))
      end

      mail_sending_result = 'Mail server failed to send'
      if mail_template.present?
        begin
          mail_sending_result = 'Success'
          CtrpMailer.general_email(mail_template.from, mail_template.to, mail_template.cc, mail_template.bcc, mail_template.subject, mail_template.body_text, mail_template.body_html).deliver_now
        rescue  Exception => e
          logger.warn "email delivery error = #{e}"
        end
        ## save the mail sending to mail log
        if mail_template.to.nil? || !mail_template.to.include?("@")
          # recipient email not replaced with actual email address (user does not have email)
          mail_sending_result = 'Failed, recipient email is unspecified or user refuses to receive email notification'
        end
        MailLog.create(from: mail_template.from, to: mail_template.to, cc: mail_template.cc, bcc: mail_template.bcc, subject: mail_template.subject, body: mail_template.body_html, email_template_name: mail_template.name, mail_template: mail_template, result: mail_sending_result, trial: self.trial)
      end
    end
  end

  def add_processing_status
    ohd = ProcessingStatus.find_by_code('OHD')
    if self.offhold_date.nil?
      # Put on hold
      if self.trial.current_submission.present? && ohd.present?
        ProcessingStatusWrapper.create(status_date: Date.today, processing_status: ohd, submission: self.trial.current_submission, trial: self.trial)
      end
    else
      # Put off hold
      if self.trial.current_submission.present?
        target = ProcessingStatusWrapper.where('trial_id = ? AND submission_id = ? AND processing_status_id <> ?', self.trial.id, self.trial.current_submission.id, ohd.id).order('id').last
        if target.present?
          ProcessingStatusWrapper.create(status_date: Date.today, processing_status: target.processing_status, submission: self.trial.current_submission, trial: self.trial)
        end
      end
    end
  end
end
