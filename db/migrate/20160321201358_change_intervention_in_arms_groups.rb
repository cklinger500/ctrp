class ChangeInterventionInArmsGroups < ActiveRecord::Migration
    def change
      remove_column :arms_groups, :intervention_id, :string
      add_column :arms_groups, :intervention_text, :string
    end

end
