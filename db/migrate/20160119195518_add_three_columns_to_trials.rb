class AddThreeColumnsToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :study_model_other, :string, :limit => 255
    add_column :trials, :time_perspective_other, :string, :limit => 255

    add_reference :trials, :study_model, index: true
    add_foreign_key :trials, :study_models
    add_reference :trials, :time_perspective, index: true
    add_foreign_key :trials, :time_perspectives
    add_reference :trials, :biospecimen_retention, index: true
    add_foreign_key :trials, :biospecimen_retentions
  end
end
