class AddMaskingColumnsToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :masking_role_caregiver, :boolean
    add_column :trials, :masking_role_investigator, :boolean
    add_column :trials, :masking_role_outcome_assessor, :boolean
    add_column :trials, :masking_role_subject, :boolean
  end
end
