class CreateMailLogs < ActiveRecord::Migration
  def change
    create_table :mail_logs do |t|
      t.string :from
      t.string :to
      t.string :cc
      t.string :bcc
      t.string :subject
      t.text :body
      t.string :email_template_name
      t.integer :email_template_id
      t.string :result
      t.references :trial, index: true
      t.references :mail_template, index: true

      t.timestamps null: false
    end
    add_foreign_key :mail_logs, :trials
    add_foreign_key :mail_logs, :mail_templates
  end
end
