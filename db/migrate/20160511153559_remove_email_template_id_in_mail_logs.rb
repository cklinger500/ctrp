class RemoveEmailTemplateIdInMailLogs < ActiveRecord::Migration
  def change
    remove_column :mail_logs, :email_template_id
  end
end
