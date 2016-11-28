class CreateSubmissionSources < ActiveRecord::Migration
  def change
    create_table :submission_sources do |t|

      t.static_member_base_columns
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
