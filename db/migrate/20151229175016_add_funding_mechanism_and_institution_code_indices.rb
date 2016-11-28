class AddFundingMechanismAndInstitutionCodeIndices < ActiveRecord::Migration

  def change
      add_index :tempgrants, :funding_mechanism
      add_index :tempgrants, :institute_code
    end


end
