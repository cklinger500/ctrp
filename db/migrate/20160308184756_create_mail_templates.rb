class CreateMailTemplates < ActiveRecord::Migration
  def change
    create_table :mail_templates do |t|
      t.text :from
      t.text :to
      t.text :cc
      t.text :bcc
      t.text :subject
      t.text :body_text
      t.text :body_html

      t.static_member_base_columns
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
