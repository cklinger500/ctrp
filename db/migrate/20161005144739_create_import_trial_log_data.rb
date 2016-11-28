class CreateImportTrialLogData < ActiveRecord::Migration
  def change
    create_table :import_trial_log_data do |t|
      t.string :file
      t.string :file_name, :limit => 255
      t.string :document_type, :limit => 255
      t.string :document_subtype, :limit => 255
      t.string :context, :limit => 255
      t.string :object, :limit =>255
      t.string :method, :limit =>255
      t.string :status, :limit =>255
      t.string :object_id, :limit =>255
      t.string :user, :limit =>255
      t.text   :response_body
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
