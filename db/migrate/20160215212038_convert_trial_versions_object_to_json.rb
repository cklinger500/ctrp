class ConvertTrialVersionsObjectToJson < ActiveRecord::Migration
    def up
      change_column :trial_versions, :object, 'jsonb USING object::jsonb'
      change_column :trial_versions, :object_changes, 'jsonb USING object::jsonb'
    end

    def down
      change_column :trial_versions, :object, 'text USING object::text'
      change_column :trial_versions, :object_changes, 'text USING object::text'
    end

end



