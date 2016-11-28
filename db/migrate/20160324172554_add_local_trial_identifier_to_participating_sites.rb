class AddLocalTrialIdentifierToParticipatingSites < ActiveRecord::Migration
  def change
    add_column :participating_sites, :local_trial_identifier, :string
  end
end
